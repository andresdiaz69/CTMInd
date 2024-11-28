# Stored Procedure: sp_Requisiciones_Autorizaciones

## Usa los objetos:
- [[AspNetUsers]]
- [[Cargos]]
- [[EmpleadosActivos]]
- [[Requisiciones_Cargos]]
- [[Requisiciones_Estados]]
- [[Requisiciones_Solicitudes]]
- [[Requisiciones_SolicitudProveedor]]
- [[Requisiciones_UsuariosUnidadNegocio]]
- [[v_Requisiciones_CiudadDepto]]
- [[v_Requisiciones_ParametrizacionTipoValor]]
- [[vw_Ultimo_Registro_Usuario]]

```sql
CREATE PROC [dbo].[sp_Requisiciones_Autorizaciones] 
(
	@UserId NVARCHAR(50), 
	@IdEstado SMALLINT, 
	@Tipo NVARCHAR(10)
) AS

BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	--DECLARE @UserId NVARCHAR(50), @IdEstado SMALLINT, @Tipo NVARCHAR(10);
	--SET @UserId = 'df8e3e59-db1a-4a5f-a030-acafae6d7ab8';
	--SET @IdEstado = 10;
	--SET @Tipo = 'USC';

	IF @Tipo = 'USC' --CONSULTA DEL GERENTE DE LA USC
		BEGIN
			SELECT	Solicitud			,TipoSolicitud			,IdEstado				,Estado					,CodigoCargo				,NombreCargo
				,CargoCritico			,Cod_Contrato			,TipoContrato			,SalarioSolicitado		,CodEmpresa					,Empresa
				,CodigoUnidadNegocio	,UnidadNegocio			,CodMarca				,Marca					,CodCentro					,Centro
				,CodSeccion				,Seccion				,CodDepartamento		,Departamento			,CodSede					,Sede
				,UserIdCreo				,CedulaSolicitante		,NombreSolicitante		,DescripcionTrabajo		,RequisitosObligaciones		,ObservacionSolicitud
				,Unica					,NITProveedor			,CodCiudadLabor			,NombreCiudadLabor		,InHouse					,InHouseProyect
				,InHouseNombreProyect	,InHouseConfir
			FROM 
			(
				SELECT 
					Solicitud=a.IdSolicitud						,a.TipoSolicitud								,a.IdEstado
					,b.Estado									,a.CodigoCargo									,c.NombreCargo
					,ISNULL(CC.Critico,0)CargoCritico			,Cod_Contrato=a.tip_con							,TipoContrato=nom_con
					,SalarioSolicitado=a.Salario				,a.CodEmpresa									,a.Empresa
					,a.CodigoUnidadNegocio						,a.UnidadNegocio								,a.CodMarca
					,a.Marca									,a.CodCentro									,a.Centro
					,a.CodSeccion								,a.Seccion										,a.CodDepartamento
					,a.Departamento								,a.CodSede										,a.Sede
					,A.UserIdCreo								,CedulaSolicitante=d.UserName					,NombreSolicitante=e.Nombres+' '+e.Apellidos
					,a.DescripcionTrabajo						,a.Requisitos AS RequisitosObligaciones			,a.Observaciones AS ObservacionSolicitud
					,a.Unica									,ISNULL(sp.Nit,0) AS NITProveedor				,a.CodCiudadLabor
					,NombreCiudadLabor = Ciudad.NombreCiudad	,a.InHouse										,InHouseProyect
					,InHouseNombreProyect = TV.Nombre			
					,InHouseConfir = CASE WHEN InHouse = 1 THEN 'Si' ELSE 'No' END
				FROM 
				(
					SELECT *
					FROM 
					(
						SELECT S.*, E.REGISTRO
						FROM Requisiciones_Solicitudes S
						LEFT JOIN 
						(
							SELECT TOP 1 REGISTRO='EXISTE', E.* 
							FROM EmpleadosActivos E
							INNER JOIN 
							(
								SELECT TOP 1 * 
								FROM AspNetUsers 
								WHERE Id = @UserId
							) U ON U.UserName = E.CodigoEmpleado
							WHERE Ano_Periodo = YEAR(GETDATE())
								AND Mes_Periodo = MONTH(GETDATE())
						) E ON S.CodCentro = E.codigo_centro
							AND S.CodigoUnidadNegocio = E.Unidad_Negocio
							AND S.CodigoCargo = E.Codigo_Cargo
					)A
					WHERE A.REGISTRO IS NULL
				) AS a
				INNER JOIN	Requisiciones_Estados				AS b	  ON a.IdEstado		= b.IdEstado
				INNER JOIN	Cargos								AS c	  ON a.CodigoCargo	= c.CodigoCargo
				INNER JOIN	AspNetUsers							AS d	  ON a.UserIdCreo	= d.Id
				INNER JOIN	vw_Ultimo_Registro_Usuario			AS e	  ON d.UserName		= e.UserName	
				LEFT JOIN	Requisiciones_Cargos				AS Cc	  ON a.CodigoCargo	= Cc.CodigoCargo AND a.CodigoUnidadNegocio = CC.CodigoMarca
				LEFT JOIN	v_Requisiciones_CiudadDepto			AS Ciudad ON Ciudad.CodigoCiudad = A.CodCiudadLabor AND Ciudad.CodigoPais = '057'
				LEFT JOIN	v_Requisiciones_ParametrizacionTipoValor AS TV ON TV.Id = A.InHouseProyect AND TV.Tipo = 'InHouse'
				LEFT JOIN	(
					SELECT * FROM Requisiciones_SolicitudProveedor WHERE Nit <> 0
				) AS sp	ON a.IdSolicitud	= sp.Solicitud
			) A
			WHERE IdEstado IN (1,4) AND a.CodigoUnidadNegocio = 4
		END

	ELSE IF @Tipo = 'LINEA' --CONSULTA DEL GERENTE DE LINEA (LINEAS ASOCIADAS)
		BEGIN 
			SELECT	Solicitud			,TipoSolicitud			,IdEstado				,Estado					,CodigoCargo				,NombreCargo
				,CargoCritico			,Cod_Contrato			,TipoContrato			,SalarioSolicitado		,CodEmpresa					,Empresa
				,CodigoUnidadNegocio	,UnidadNegocio			,CodMarca				,Marca					,CodCentro					,Centro
				,CodSeccion				,Seccion				,CodDepartamento		,Departamento			,CodSede					,Sede
				,UserIdCreo				,CedulaSolicitante		,NombreSolicitante		,DescripcionTrabajo		,RequisitosObligaciones		,ObservacionSolicitud
				,Unica					,NITProveedor			,CodCiudadLabor			,NombreCiudadLabor		,InHouse					,InHouseProyect
				,InHouseNombreProyect	,InHouseConfir
			FROM 
			(
				SELECT 
					Solicitud=a.IdSolicitud						,a.TipoSolicitud								,a.IdEstado
					,b.Estado									,a.CodigoCargo									,c.NombreCargo
					,ISNULL(CC.Critico,0)CargoCritico			,Cod_Contrato=a.tip_con							,TipoContrato=nom_con
					,SalarioSolicitado=a.Salario				,a.CodEmpresa									,a.Empresa
					,a.CodigoUnidadNegocio						,a.UnidadNegocio								,a.CodMarca
					,a.Marca									,a.CodCentro									,a.Centro
					,a.CodSeccion								,a.Seccion										,a.CodDepartamento
					,a.Departamento								,a.CodSede										,a.Sede
					,A.UserIdCreo								,CedulaSolicitante=d.UserName					,NombreSolicitante=e.Nombres+' '+e.Apellidos
					,a.DescripcionTrabajo						,a.Requisitos AS RequisitosObligaciones			,a.Observaciones AS ObservacionSolicitud
					,a.Unica									,ISNULL(sp.Nit,0) AS NITProveedor				,a.CodCiudadLabor
					,NombreCiudadLabor = Ciudad.NombreCiudad	,a.InHouse										,InHouseProyect
					,InHouseNombreProyect = TV.Nombre			
					,InHouseConfir = CASE WHEN InHouse = 1 THEN 'Si' ELSE 'No' END
				FROM 
				(
					SELECT *
					FROM 
					(
						SELECT S.*, E.REGISTRO
						FROM Requisiciones_Solicitudes S
						LEFT JOIN 
						(
							SELECT TOP 1 REGISTRO='EXISTE', E.* 
							FROM EmpleadosActivos E
							INNER JOIN 
							(
								SELECT TOP 1 * 
								FROM AspNetUsers 
								WHERE Id = @UserId
							) U ON U.UserName = E.CodigoEmpleado
							WHERE Ano_Periodo = YEAR(GETDATE())
								AND Mes_Periodo = MONTH(GETDATE())
						) E ON S.CodCentro = E.codigo_centro
							AND S.CodigoUnidadNegocio = E.Unidad_Negocio
							AND S.CodigoCargo = E.Codigo_Cargo
					)A
					WHERE A.REGISTRO IS NULL
				) AS a
				INNER JOIN	Requisiciones_Estados				AS b	  ON a.IdEstado		= b.IdEstado
				INNER JOIN	Cargos								AS c	  ON a.CodigoCargo	= c.CodigoCargo
				INNER JOIN	AspNetUsers							AS d	  ON a.UserIdCreo	= d.Id
				INNER JOIN	vw_Ultimo_Registro_Usuario			AS e	  ON d.UserName		= e.UserName	
				LEFT JOIN	Requisiciones_Cargos				AS Cc	  ON a.CodigoCargo	= Cc.CodigoCargo AND a.CodigoUnidadNegocio = CC.CodigoMarca
				LEFT JOIN	v_Requisiciones_CiudadDepto			AS Ciudad ON Ciudad.CodigoCiudad = A.CodCiudadLabor AND Ciudad.CodigoPais = '057'
				LEFT JOIN	v_Requisiciones_ParametrizacionTipoValor AS TV ON TV.Id = A.InHouseProyect AND TV.Tipo = 'InHouse'
				LEFT JOIN	
				(
					SELECT *
					FROM Requisiciones_SolicitudProveedor 
					WHERE Nit <> 0
				) AS sp	ON a.IdSolicitud	= sp.Solicitud
			) A
			INNER JOIN 	(
				SELECT * FROM Requisiciones_UsuariosUnidadNegocio 
				WHERE UserID = @UserId
			) AS UU ON A.CodigoUnidadNegocio = UU.CodUnidadNegocio
			WHERE IdEstado IN (1,4) AND a.CodigoUnidadNegocio <> 4
		END

	ELSE --CONSULTA AUTORIZACIONES POR ID
		BEGIN
			SELECT	 DISTINCT					 Solicitud				,TipoSolicitud					,IdEstado					,Estado
					,CodigoCargo				,NombreCargo			,CargoCritico					,Cod_Contrato				,TipoContrato
					,SalarioSolicitado			,CodEmpresa				,Empresa						,CodigoUnidadNegocio		,UnidadNegocio
					,CodMarca					,Marca					,CodCentro						,Centro						,CodSeccion
					,Seccion					,CodDepartamento		,Departamento					,CodSede					,Sede
					,UserIdCreo					,CedulaSolicitante		,NombreSolicitante				,DescripcionTrabajo			,RequisitosObligaciones
					,ObservacionSolicitud		,Unica					,NITProveedor					,CodCiudadLabor				,NombreCiudadLabor
					,InHouse					,InHouseProyect			,InHouseNombreProyect			,InHouseConfir 
			FROM 
			(
				SELECT	 Solicitud=a.IdSolicitud				,a.IdEstado				,a.TipoSolicitud		,CedulaSolicitante = d.UserName						
						,TipoContrato=nom_con					,a.CodigoCargo			,c.NombreCargo			,CargoCritico = ISNULL(CC.Critico,0)		
						,Cod_Contrato=a.tip_con					,a.CodEmpresa			,a.Empresa				,SalarioSolicitado = a.Salario
						,a.CodigoUnidadNegocio					,b.Estado				,a.UnidadNegocio		,NombreSolicitante=e.Nombres+' '+e.Apellidos
						,a.DescripcionTrabajo					,a.CodMarca				,a.Marca				,RequisitosObligaciones = a.Requisitos
						,a.CodDepartamento						,a.Departamento			,a.CodCentro			,ObservacionSolicitud = a.Observaciones
						,A.UserIdCreo							,a.Centro				,a.CodSeccion			,NITProveedor = ISNULL(sp.Nit,0)
						,a.Seccion								,CodSede				,a.Sede					,a.Unica
						,A.CodCiudadLabor						,A.InHouse				,A.InHouseProyect		,NombreCiudadLabor = Ciudad.NombreCiudad
						,InHouseNombreProyect = TV.Nombre
						,InHouseConfir = CASE WHEN InHouse = 1 THEN 'Si' ELSE 'No' END
				FROM Requisiciones_Solicitudes		AS a
				INNER JOIN	Requisiciones_Estados				AS b	  ON a.IdEstado		     = b.IdEstado
				INNER JOIN	Cargos								AS c	  ON a.CodigoCargo	     = c.CodigoCargo
				INNER JOIN	AspNetUsers							AS d	  ON a.UserIdCreo	     = d.Id
				INNER JOIN	vw_Ultimo_Registro_Usuario			AS e	  ON d.UserName		     = e.UserName	
				LEFT JOIN	Requisiciones_Cargos				AS Cc	  ON a.CodigoCargo	     = Cc.CodigoCargo AND a.CodigoUnidadNegocio = CC.CodigoMarca
				LEFT JOIN	Requisiciones_SolicitudProveedor	AS sp	  ON a.IdSolicitud	     = sp.Solicitud
				LEFT JOIN	v_Requisiciones_CiudadDepto			AS Ciudad ON Ciudad.CodigoCiudad = A.CodCiudadLabor AND Ciudad.CodigoPais = '057'
				LEFT JOIN	v_Requisiciones_ParametrizacionTipoValor AS TV ON TV.Id = A.InHouseProyect AND TV.Tipo = 'InHouse'
			) A
			WHERE IdEstado = @IdEstado
		END


END

```
