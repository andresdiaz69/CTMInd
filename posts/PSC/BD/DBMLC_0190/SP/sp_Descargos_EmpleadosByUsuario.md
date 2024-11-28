# Stored Procedure: sp_Descargos_EmpleadosByUsuario

## Usa los objetos:
- [[Descargos_SolicitudDescargos]]
- [[Descargos_Solicitudes]]
- [[Descargos_User_Departamento]]
- [[Descargos_User_UnidadCentro]]
- [[EmpleadosActivos]]
- [[vw_Descargos_Usuarios]]

```sql

CREATE PROC [dbo].[sp_Descargos_EmpleadosByUsuario]
(
	@UserID NVARCHAR(50)
) AS
BEGIN 

	SET NOCOUNT ON
	SET FMTONLY OFF

	DECLARE 
	--	@UserID NVARCHAR(50),
		@Depto smallint
	--SET 
	--	@UserID = 'df8e3e59-db1a-4a5f-a030-acafae6d7ab8'
	--	--@UserID = '4133c1ff-cb3a-4b2e-b5cb-de4c3ee8ccaa'
	SET
		@Depto = (SELECT COUNT(*) FROM Descargos_User_Departamento WHERE UserID = @UserID)
	
	
	IF @Depto > 0
	BEGIN 
		SELECT IdSolicitante,CodigoEmpleado,NombreCompleto,CodUnidad,CodCentro,codigo_seccion,codigo_departamento
		FROM
		(
			SELECT (UC.UserID)IdSolicitante,UC.CodigoEmpleado,UC.NombreCompleto,UC.CodUnidad,UC.CodCentro,UC.codigo_seccion,UC.codigo_departamento
			FROM 
			(
				SELECT * 
				FROM 
				(
					SELECT * FROM Descargos_User_UnidadCentro 
					WHERE UserID = @UserID
				) AS Usuario
				INNER JOIN 
				(
					SELECT DISTINCT CodigoEmpleado,Unidad_Negocio,codigo_centro,codigo_departamento,codigo_seccion,
						NombreCompleto=REPLACE(REPLACE(REPLACE(Nombres+' '+Apellido1+' '+Apellido2,' ','<>'),'><',''),'<>',' ')
					FROM EmpleadosActivos
					WHERE Ano_Periodo = YEAR(GETDATE())
						AND Mes_Periodo = MONTH(GETDATE())
				) AS Empleados ON CONVERT(SMALLINT,Empleados.Unidad_Negocio) = Usuario.CodUnidad
					AND CONVERT(SMALLINT,Empleados.codigo_centro) = Usuario.CodCentro
			) UC
			INNER JOIN 
			(
				SELECT UserID, CodDepto
				FROM Descargos_User_Departamento 
				WHERE UserID = @UserID
			)D ON UC.codigo_departamento = D.CodDepto
		)A
		WHERE CodigoEmpleado NOT IN (SELECT DISTINCT CedulaEmpleado
										FROM 
										(
											SELECT CONVERT(BIGINT,B.CedulaEmpleado)CedulaEmpleado
											FROM Descargos_SolicitudDescargos A
											INNER JOIN  Descargos_Solicitudes B			
												ON A.IdDescargo = B.IdDescargo
											WHERE A.IdEstado NOT IN (12,13,14,15)

											UNION ALL 

											SELECT CONVERT(BIGINT,RTRIM(LTRIM(UserName)))CedulaEmpleado 
											FROM vw_Descargos_Usuarios
											WHERE Id = @UserID
										) A)
	END
	
	ELSE
	BEGIN
		SELECT IdSolicitante,CodigoEmpleado,NombreCompleto,CodUnidad,CodCentro,codigo_seccion,codigo_departamento
		FROM 
		(
			SELECT (Usuario.UserID)IdSolicitante, Empleados.CodigoEmpleado, Usuario.CodUnidad, Usuario.CodCentro, 
				Empleados.codigo_departamento,Empleados.NombreCompleto,codigo_seccion
			FROM 
			(
				SELECT * FROM Descargos_User_UnidadCentro 
				WHERE UserID = @UserID
			) AS Usuario
			INNER JOIN 
			(
				SELECT DISTINCT CodigoEmpleado,Unidad_Negocio,codigo_centro,codigo_departamento,codigo_seccion,
					NombreCompleto=REPLACE(REPLACE(REPLACE(Nombres+' '+Apellido1+' '+Apellido2,' ','<>'),'><',''),'<>',' ')
				FROM EmpleadosActivos
				WHERE Ano_Periodo = YEAR(GETDATE())
					AND Mes_Periodo = MONTH(GETDATE())
			) AS Empleados ON CONVERT(SMALLINT,Empleados.Unidad_Negocio) = Usuario.CodUnidad
				AND CONVERT(SMALLINT,Empleados.codigo_centro) = Usuario.CodCentro
		)A
		WHERE CodigoEmpleado NOT IN (SELECT DISTINCT CedulaEmpleado
										FROM 
										(
											SELECT CONVERT(BIGINT,B.CedulaEmpleado)CedulaEmpleado
											FROM Descargos_SolicitudDescargos A
											INNER JOIN  Descargos_Solicitudes B			
												ON A.IdDescargo = B.IdDescargo
											WHERE A.IdEstado NOT IN (12,13,14,15)

											UNION ALL 

											SELECT CONVERT(BIGINT,RTRIM(LTRIM(UserName)))CedulaEmpleado 
											FROM vw_Descargos_Usuarios
											WHERE Id = @UserID
										) A)
	END
	
END 

```
