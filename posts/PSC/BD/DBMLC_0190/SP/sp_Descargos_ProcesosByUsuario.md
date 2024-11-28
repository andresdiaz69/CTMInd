# Stored Procedure: sp_Descargos_ProcesosByUsuario

## Usa los objetos:
- [[AspNetUsers]]
- [[Descargos_Empleado]]
- [[Descargos_SolicitudDescargos]]
- [[Descargos_Solicitudes]]
- [[EmpleadosActivos]]
- [[Profiles]]
- [[vw_Descargos_Estados]]

```sql

CREATE PROC [dbo].[sp_Descargos_ProcesosByUsuario]
(
	@Usuario NVARCHAR(20)
) AS

BEGIN 
	--DECLARE @Usuario NVARCHAR(20)
	--SET @Usuario = 'SOLICITANTE'

	SET NOCOUNT ON
	SET FMTONLY OFF

	--SOLICITANTE	
	IF @Usuario = 'SOLICITANTE'
		BEGIN
			SELECT DISTINCT	Usuario='SOLICITANTE', S.IdDescargo,D.IdEstado,D.NombreEstado,DetalleEstado,D.FechaSolicitud,
				E.CedulaEmpleado,E.NombreEmpleado,S.IdSolicitante,S.CedulaSolicitante,S.NombreSolicitante
			FROM 
			(
				SELECT D.IdDescargo, D.IdEstado, E.NombreEstado, DetalleEstado=E.Descripcion, D.FechaSolicitud
				FROM Descargos_SolicitudDescargos D
				INNER JOIN vw_Descargos_Estados E ON E.IdEstado = D.IdEstado
				WHERE E.EstadoUsuario = 'Solicitante'
			) D

			LEFT JOIN 
			(
				SELECT S.IdSolicitante,CedulaSolicitante=(U.UserName),NombreSolicitante=(p.Nombres+' '+p.Apellidos),
					S.IdDescargo, S.CedulaEmpleado
				FROM Descargos_Solicitudes S
				LEFT JOIN AspNetUsers U ON U.Id = S.IdSolicitante
				LEFT JOIN Profiles P ON S.IdSolicitante = P.UserId
			) S ON S.IdDescargo = D.IdDescargo

			LEFT JOIN 
			(
				SELECT E.CedulaEmpleado, E.NombreEmpleado, CodCargoEmpleado=E.CodCargo
				FROM Descargos_Empleado E	
			) E ON E.CedulaEmpleado = S.CedulaEmpleado
		END


	--NOMINA
	ELSE IF @Usuario = 'NOMINA'
		BEGIN
			SELECT DISTINCT	Usuario='NOMINA', S.IdDescargo,D.IdEstado,D.NombreEstado,DetalleEstado,D.FechaSolicitud,
				E.CedulaEmpleado,E.NombreEmpleado,S.IdSolicitante,S.CedulaSolicitante,S.NombreSolicitante
			FROM 
			(
				SELECT D.IdDescargo, D.IdEstado, E.NombreEstado, DetalleEstado=E.Descripcion, D.FechaSolicitud
				FROM Descargos_SolicitudDescargos D
				INNER JOIN vw_Descargos_Estados E ON E.IdEstado = D.IdEstado
				WHERE E.EstadoUsuario = 'Nomina'
			) D

			LEFT JOIN 
			(
				SELECT S.IdSolicitante,CedulaSolicitante=(U.UserName),NombreSolicitante=(p.Nombres+' '+p.Apellidos),
					S.IdDescargo, S.CedulaEmpleado
				FROM Descargos_Solicitudes S
				LEFT JOIN AspNetUsers U ON U.Id = S.IdSolicitante
				LEFT JOIN Profiles P ON S.IdSolicitante = P.UserId
			) S ON S.IdDescargo = D.IdDescargo

			LEFT JOIN 
			(
				SELECT E.CedulaEmpleado, E.NombreEmpleado, CodCargoEmpleado=E.CodCargo
				FROM Descargos_Empleado E	
			) E ON E.CedulaEmpleado = S.CedulaEmpleado
		END


	--ABOGADO
	ELSE IF @Usuario = 'ABOGADO'
		BEGIN
			SELECT DISTINCT	Usuario='ABOGADO', S.IdDescargo,D.IdEstado,D.NombreEstado,DetalleEstado,D.FechaSolicitud,
				E.CedulaEmpleado,E.NombreEmpleado,S.IdSolicitante,S.CedulaSolicitante,S.NombreSolicitante
			FROM 
			(
				SELECT D.IdDescargo, D.IdEstado, E.NombreEstado, DetalleEstado=E.Descripcion, D.FechaSolicitud
				FROM Descargos_SolicitudDescargos D
				INNER JOIN vw_Descargos_Estados E ON E.IdEstado = D.IdEstado
				WHERE E.EstadoUsuario = 'Abogado'
			) D

			LEFT JOIN 
			(
				SELECT S.IdSolicitante,CedulaSolicitante=(U.UserName),NombreSolicitante=(p.Nombres+' '+p.Apellidos),
					S.IdDescargo, S.CedulaEmpleado
				FROM Descargos_Solicitudes S
				LEFT JOIN AspNetUsers U ON U.Id = S.IdSolicitante
				LEFT JOIN Profiles P ON S.IdSolicitante = P.UserId
			) S ON S.IdDescargo = D.IdDescargo

			LEFT JOIN 
			(
				SELECT E.CedulaEmpleado, E.NombreEmpleado, CodCargoEmpleado=E.CodCargo
				FROM Descargos_Empleado E	
			) E ON E.CedulaEmpleado = S.CedulaEmpleado
		END


	--SST
	ELSE IF @Usuario = 'SST'
		BEGIN
			SELECT DISTINCT	Usuario='SST', S.IdDescargo,D.IdEstado,D.NombreEstado,DetalleEstado,D.FechaSolicitud,
				E.CedulaEmpleado,E.NombreEmpleado,S.IdSolicitante,S.CedulaSolicitante,S.NombreSolicitante
			FROM 
			(
				SELECT D.IdDescargo, D.IdEstado, E.NombreEstado, DetalleEstado=E.Descripcion, D.FechaSolicitud
				FROM Descargos_SolicitudDescargos D
				INNER JOIN vw_Descargos_Estados E ON E.IdEstado = D.IdEstado
				WHERE E.EstadoUsuario = 'SST'
			) D

			LEFT JOIN 
			(
				SELECT S.IdSolicitante,CedulaSolicitante=(U.UserName),NombreSolicitante=(p.Nombres+' '+p.Apellidos),
					S.IdDescargo, S.CedulaEmpleado
				FROM Descargos_Solicitudes S
				LEFT JOIN AspNetUsers U ON U.Id = S.IdSolicitante
				LEFT JOIN Profiles P ON S.IdSolicitante = P.UserId
			) S ON S.IdDescargo = D.IdDescargo

			LEFT JOIN 
			(
				SELECT E.CedulaEmpleado, E.NombreEmpleado, CodCargoEmpleado=E.CodCargo
				FROM Descargos_Empleado E	
			) E ON E.CedulaEmpleado = S.CedulaEmpleado
		END


	--GESTION HUMANA JOHN DEERE
	ELSE IF @Usuario = 'GESTION HUMANA JD'
		BEGIN
			SELECT DISTINCT 
				Usuario,			IdDescargo,			IdEstado,			NombreEstado,			DetalleEstado,		
				FechaSolicitud,		CedulaEmpleado,		NombreEmpleado,		IdSolicitante,			CedulaSolicitante,		
				NombreSolicitante
			FROM
			(
				SELECT DISTINCT	Usuario='GESTION HUMANA JOHN DEERE', S.IdDescargo,D.IdEstado,D.NombreEstado,DetalleEstado,
					D.FechaSolicitud,E.CedulaEmpleado,E.NombreEmpleado,S.IdSolicitante,S.CedulaSolicitante,S.NombreSolicitante
				FROM 
				(
					SELECT IdSolicitante,CedulaSolicitante,NombreSolicitante,IdDescargo,CedulaEmpleado
					FROM
					(
						SELECT S.IdSolicitante,CedulaSolicitante=(U.UserName),NombreSolicitante=(p.Nombres+' '+p.Apellidos),
							S.IdDescargo, S.CedulaEmpleado, Unidad_Negocio
						FROM Descargos_Solicitudes S
						LEFT JOIN AspNetUsers U ON U.Id = S.IdSolicitante
						LEFT JOIN Profiles P ON S.IdSolicitante = P.UserId
						LEFT JOIN (SELECT * FROM EmpleadosActivos WHERE Ano_Periodo = YEAR(GETDATE()) AND Mes_Periodo = MONTH(GETDATE())) 
							AS E ON E.CodigoEmpleado = U.UserName
					)A
					WHERE LTRIM(RTRIM(Unidad_Negocio)) IN ('410', '411', '520')
				) S 

				INNER JOIN 
				(
					SELECT D.IdDescargo, D.IdEstado, E.NombreEstado, DetalleEstado=E.Descripcion, D.FechaSolicitud
					FROM Descargos_SolicitudDescargos D
					INNER JOIN vw_Descargos_Estados E ON E.IdEstado = D.IdEstado
					WHERE E.EstadoUsuario = 'GestionHumana'
				) D ON S.IdDescargo = D.IdDescargo

				INNER JOIN 
				(
					SELECT E.CedulaEmpleado, E.NombreEmpleado, CodCargoEmpleado=E.CodCargo
					FROM Descargos_Empleado E	
				) E ON E.CedulaEmpleado = S.CedulaEmpleado

				UNION ALL

				SELECT DISTINCT	Usuario='GESTION HUMANA JOHN DEERE', S.IdDescargo,D.IdEstado,D.NombreEstado,DetalleEstado,D.FechaSolicitud,
					E.CedulaEmpleado,E.NombreEmpleado,S.IdSolicitante,S.CedulaSolicitante,S.NombreSolicitante
				FROM 
				(
					SELECT E.CedulaEmpleado, E.NombreEmpleado, CodCargoEmpleado=E.CodCargo
					FROM Descargos_Empleado E	
					WHERE E.CodUnidadNegocio IN ('410', '411', '520')
				) E 

				INNER JOIN 
				(
					SELECT S.IdSolicitante,CedulaSolicitante=(U.UserName),NombreSolicitante=(p.Nombres+' '+p.Apellidos),
						S.IdDescargo, S.CedulaEmpleado
					FROM Descargos_Solicitudes S
					LEFT JOIN AspNetUsers U ON U.Id = S.IdSolicitante
					LEFT JOIN Profiles P ON S.IdSolicitante = P.UserId
				) S ON E.CedulaEmpleado = S.CedulaEmpleado
		
				INNER JOIN 
				(
					SELECT D.IdDescargo, D.IdEstado, E.NombreEstado, DetalleEstado=E.Descripcion, D.FechaSolicitud
					FROM Descargos_SolicitudDescargos D
					INNER JOIN vw_Descargos_Estados E ON E.IdEstado = D.IdEstado
					WHERE E.EstadoUsuario = 'GestionHumana'
				) D ON S.IdDescargo = D.IdDescargo
			)A		
		END


	--GESTION HUMANA
	ELSE 
		BEGIN
			SELECT DISTINCT	Usuario='GESTION HUMANA JEFE', S.IdDescargo,D.IdEstado,D.NombreEstado,DetalleEstado,D.FechaSolicitud,
				E.CedulaEmpleado,E.NombreEmpleado,S.IdSolicitante,S.CedulaSolicitante,S.NombreSolicitante
			FROM 
			(
				SELECT D.IdDescargo, D.IdEstado, E.NombreEstado, DetalleEstado=E.Descripcion, D.FechaSolicitud
				FROM Descargos_SolicitudDescargos D
				INNER JOIN vw_Descargos_Estados E ON E.IdEstado = D.IdEstado
				WHERE E.EstadoUsuario = 'GestionHumana'
			) D

			LEFT JOIN 
			(
				SELECT S.IdSolicitante,CedulaSolicitante=(U.UserName),NombreSolicitante=(p.Nombres+' '+p.Apellidos),
					S.IdDescargo, S.CedulaEmpleado
				FROM Descargos_Solicitudes S
				LEFT JOIN AspNetUsers U ON U.Id = S.IdSolicitante
				LEFT JOIN Profiles P ON S.IdSolicitante = P.UserId
			) S ON S.IdDescargo = D.IdDescargo

			LEFT JOIN 
			(
				SELECT E.CedulaEmpleado, E.NombreEmpleado, CodCargoEmpleado=E.CodCargo
				FROM Descargos_Empleado E	
			) E ON E.CedulaEmpleado = S.CedulaEmpleado
		END

END

```
