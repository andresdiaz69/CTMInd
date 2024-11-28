# Stored Procedure: sp_Requisiciones_EnvioCorreos

## Usa los objetos:
- [[Cargos]]
- [[EmpleadosActivos]]
- [[Requisiciones_Candidatos]]
- [[Requisiciones_Estados]]
- [[Requisiciones_EstadosCandidatos]]
- [[Requisiciones_EstadosNomina]]
- [[Requisiciones_Jefes]]
- [[Requisiciones_Solicitudes]]
- [[Requisiciones_SolicitudesCandidatos]]
- [[v_Requisiciones_CiudadDepto]]
- [[v_Requisiciones_Clase]]
- [[v_Requisiciones_EmailUsers]]
- [[v_Requisiciones_ParametrizacionTipoValor]]

```sql

CREATE PROCEDURE [dbo].[sp_Requisiciones_EnvioCorreos]
(
	@IdSolicitud int
) AS
BEGIN
	--DECLARE @IdSolicitud int
	--SET @IdSolicitud = 2920

	SELECT DISTINCT 
		 Numero_solicitud			,Estado						,DetalleEstado			,TipoSolicitud			,FechaCreacion
		,CodigoCargo				,NombreCargo				,Salario				,IdSolicitante			,CedulaSolicitante
		,Solicitante				,CodEmpresa					,Empresa				,CodMarca				,Marca
		,CodCentro					,Centro						,CodigoUnidadNegocio	,UnidadNegocio			,CodSeccion
		,Seccion					,CodDepartamento			,Departamento			,CodSede				,Sede
		,Observaciones				,IdEstadoNomina				,EstadoNomina			,FechaInicioContrato	,tip_con
		,nom_con					,DuracionContratoMeses		,DescripcionTrabajo		,Requisitos				,HorarioDiurno
		,Unica						,OrdenSeleccion				,IdEstadoCandidato		,EstadoCandidato		,Cedula
		,Nombres					,Apellido1					,Apellido2				,NombreCompleto			,CodTipoIdentificacion
		,TipoIdentificacion			,Telefono					,Celular				,Correo					,Direccion
		,FechaNacimiento			,CC_Jefe1					,NombreJefe1			,CodCiudadLabor			,NombreCiudadLabor
		,InHouse					,InHouseProyect				,InHouseNombreProyect	,InHouseConfir 
	FROM 
	(
		SELECT DISTINCT 
			 Numero_solicitud		,Estado						,DetalleEstado			,TipoSolicitud			,FechaCreacion
			,CodigoCargo			,NombreCargo				,Salario				,IdSolicitante			,CedulaSolicitante
			,Solicitante			,CodEmpresa					,Empresa				,CodMarca				,Marca
			,CodCentro				,Centro						,CodSeccion				,Seccion				,CodigoUnidadNegocio	
			,UnidadNegocio			,CodDepartamento			,Departamento			,CodSede				,Sede
			,S.Observaciones		,IdEstadoNomina				,EstadoNomina			,tip_con				,nom_con				
			,FechaInicioContrato	,DuracionContratoMeses		,DescripcionTrabajo		,Requisitos				,HorarioDiurno
			,S.Unica				,SC.OrdenSeleccion			,SC.IdEstadoCandidato	,EC.EstadoCandidato		,C.Cedula
			,C.Nombres				,C.Apellido1				,C.Apellido2			,C.Telefono				,C.Celular
			,C.Correo				,C.Direccion				,c.FechaNacimiento		,J.CC_Jefe1				,NombreJefe1 = EM.NombreJefe
			,S.CodCiudadLabor		,NombreCiudadLabor			,S.InHouse				,S.InHouseProyect		,InHouseNombreProyect
			,InHouseConfir 
			
			,CodTipoIdentificacion = C.TipIdentificacion		,TipoIdentificacion = TD.SubClase
			,NombreCompleto=UPPER(REPLACE(REPLACE(REPLACE(C.Nombres+' '+C.Apellido1+' '+C.Apellido2,' ','<>'),'><',''),'<>',' '))
		
		FROM 
		(
			SELECT	DISTINCT				 s.TipoSolicitud					,Estado=s.idEstado		,Numero_solicitud = s.idsolicitud				
				,DetalleEstado=e.Estado		,s.CodigoCargo						,c.NombreCargo			,FechaCreacion=CONVERT(date,s.FechaCreacion)	
				,s.CodigoUnidadNegocio		,s.UnidadNegocio					,s.Salario				,CedulaSolicitante=EM.UserName	
				,IdSolicitante=em.Id		,s.CodEmpresa						,s.Empresa				,Solicitante=em.NombreCompleto
				,s.FechaInicioContrato		,s.tip_con							,s.nom_con				,s.DuracionContratoMeses
				,s.DescripcionTrabajo		,s.CodMarca							,s.Marca				,s.CodDepartamento
				,s.CodCentro				,s.Centro							,s.CodSeccion			,s.Seccion
				,s.Departamento				,s.CodSede							,s.Sede					,s.Observaciones
				,s.IdEstadoNomina			,n.EstadoNomina						,s.Requisitos			,S.HorarioDiurno
				,s.Unica					,S.CodCiudadLabor					,S.InHouse				,NombreCiudadLabor = Ciudad.NombreCiudad
				,S.InHouseProyect			,InHouseNombreProyect = TV.Nombre	
				,InHouseConfir = CASE WHEN InHouse = 1 THEN 'Si' ELSE 'No' END
			
			FROM		Requisiciones_Solicitudes AS s
			LEFT JOIN   Requisiciones_Estados AS e ON s.IdEstado = e.IdEstado
			LEFT JOIN   Cargos AS c ON  c.CodigoCargo = s.CodigoCargo
			LEFT JOIN	Requisiciones_EstadosNomina AS n ON s.IdEstadoNomina = n.IdEstadoNomina
			LEFT JOIN	v_Requisiciones_EmailUsers AS em ON s.UserIdCreo = em.Id	
			LEFT JOIN	v_Requisiciones_CiudadDepto AS Ciudad ON Ciudad.CodigoCiudad = S.CodCiudadLabor AND Ciudad.CodigoPais = '057'
			LEFT JOIN	v_Requisiciones_ParametrizacionTipoValor AS TV ON TV.Id = S.InHouseProyect AND TV.Tipo = 'InHouse'
			WHERE s.idsolicitud = @IdSolicitud	
		) AS S

		LEFT JOIN	Requisiciones_SolicitudesCandidatos	AS SC ON SC.IdSolicitud = S.Numero_solicitud

		LEFT JOIN	Requisiciones_Candidatos			AS C  ON SC.Cedula = C.Cedula

		LEFT JOIN	Requisiciones_EstadosCandidatos		AS EC ON SC.IdEstadoCandidato = EC.IdEstadoCandidato

		LEFT JOIN	Requisiciones_Jefes					AS J  ON J.IdSolicitud = S.Numero_solicitud 

		LEFT JOIN	
		(
			SELECT DISTINCT CodigoEmpleado, NombreJefe = Nombres+' '+Apellido1+' '+Apellido2
			FROM EmpleadosActivos
			WHERE Ano_Periodo = YEAR(GETDATE()) AND Mes_Periodo = MONTH(GETDATE())
		) AS EM ON J.CC_Jefe1 = EM.CodigoEmpleado
	
		LEFT JOIN v_Requisiciones_Clase	AS TD ON  C.TipIdentificacion = TD.CodSubClase AND TD.CodClase = 1
	) ASS
END

```
