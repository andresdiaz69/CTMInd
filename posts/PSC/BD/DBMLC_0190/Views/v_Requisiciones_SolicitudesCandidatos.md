# View: v_Requisiciones_SolicitudesCandidatos

## Usa los objetos:
- [[Cargos]]
- [[EmpleadosActivos]]
- [[Requisiciones_DireccionCandidato]]
- [[Requisiciones_Entrevista]]
- [[Requisiciones_Estados]]
- [[Requisiciones_EstadosCandidatos]]
- [[Requisiciones_EstadosReclutador]]
- [[Requisiciones_Jefes]]
- [[Requisiciones_RelacionesPersonales]]
- [[Requisiciones_Solicitudes]]
- [[Requisiciones_SolicitudesCandidatos]]
- [[v_Requisiciones_Candidatos_Docs]]
- [[v_Requisiciones_CiudadDepto]]
- [[v_Requisiciones_ParametrizacionTipoValor]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_SolicitudesCandidatos] as
SELECT	 DISTINCT					 num_solicitud				,IdEstadoSolicitud			,EstadoSolicitud			,OrdenSeleccion			
		,IdEstadoCandidato			,EstadoCandidato			,Cedula						,Nombres					,Apellido1				
		,Apellido2					,NombreCompleto				,CodTipoIdentificacion		,TipoIdentificacion			,Telefono					
		,Celular					,Correo						,Direccion					,FechaNacimiento			,ObservacionesCandidato	
		,CodigoCargo				,NombreCargo				,CodigoUnidadNegocio		,UnidadNegocio				,CodCentro
		,Centro						,CodSeccion					,Seccion					,ArchivoHV					,CertificadoSena
		,Antecedentes				,Entrevista					,ReferenciasLaborales		,VisitaDomiciliaria			,ExamenMedico
		,Poligrafo					,PruebasPsicotecnicas		,LicenciaConduccion			,PruebasConocimiento		,EntrevistaReclutador
		,CC_Jefe1					,NombreJefe1				,CC_Jefe2					,CC_Jefe3					,CC_Jefe4
		,CC_Jefe5					,ObservacionesEntrevista	,ObservacionesDevolucion	,ObservacionesRechazo		,DescripcionTrabajo
		,RequisitosObligatorios		,ObservacionesIniciales		,IdEstadoReclutador			,EstadoReclutador			,FamiliarActivo
		,TrabajoAnteriormente		,CodTipoCalle				,NombreCalle				,NumCalle					,Piso
		,Bloque						,Puerta						,Complemento				,DireccionCompleta			,ExisteEntrevista
		,CodCiudadLabor				,NombreCiudadLabor			,InHouse					,InHouseProyect				,InHouseNombreProyect
		,InHouseConfir				,Unica						,TipoEstadoSolicitud
FROM 
(
	SELECT	DISTINCT				 num_solicitud = S.Numero_solicitud		,IdEstadoSolicitud = S.Estado		,EstadoSolicitud = S.DetalleEstado
		,R.OrdenSeleccion			,R.IdEstadoCandidato					,E.EstadoCandidato					,C.Cedula
		,C.Nombres					,C.Apellido1							,C.Apellido2						,C.TipoIdentificacion		
		,C.Telefono					,C.Celular								,C.Correo							,C.Direccion			
		,c.FechaNacimiento			,C.ObservacionesCandidato				,C.ArchivoHV						,C.CertificadoSena		
		,C.Antecedentes				,C.Entrevista							,C.ReferenciasLaborales				,C.VisitaDomiciliaria		
		,C.ExamenMedico				,C.Poligrafo							,C.PruebasPsicotecnicas				,C.LicenciaConduccion	
		,S.CodigoCargo				,C.PruebasConocimiento					,J.CC_Jefe1							,J.CC_Jefe2								
		,J.CC_Jefe3					,J.CC_Jefe4								,J.CC_Jefe5							,C.ObservacionesEntrevista					
		,s.DescripcionTrabajo		,C.ObservacionesDevolucion				,C.ObservacionesRechazo				,RequisitosObligatorios = s.Requisitos		
		,s.CodigoUnidadNegocio		,s.CodCentro							,s.CodSeccion						,ObservacionesIniciales = s.Observaciones
		,R.IdEstadoReclutador		,EstadoReclutador = ER.Estado			,DC.CodTipoCalle					,DC.NombreCalle
		,DC.NumCalle				,DC.Piso								,DC.Bloque							,DC.Puerta		
		,DC.Complemento				,DC.DireccionCompleta					,S.CodCiudadLabor					,NombreCiudadLabor
		,S.InHouse					,S.InHouseProyect						,InHouseNombreProyect				,Unica
		,TipoEstadoSolicitud		,C.EntrevistaReclutador
		,InHouseConfir = CASE WHEN InHouse = 1 THEN 'Si' ELSE 'No' END
		,ExisteEntrevista = CASE WHEN EN.IdEntrevista IS NOT NULL THEN 1 ELSE 0 END
		,CodTipoIdentificacion = CONVERT(NVARCHAR(10),LTRIM(RTRIM(C.CodTipoIdentificacion)))
		,NombreCompleto = LTRIM(RTRIM(UPPER(REPLACE(REPLACE(REPLACE(C.NombreCompleto,' ','<>'),'><',''),'<>',' '))))
		,UnidadNegocio = LTRIM(RTRIM(REPLACE(REPLACE(REPLACE(s.UnidadNegocio,' ','<>'),'><',''),'<>',' ')))
		,Centro = LTRIM(RTRIM(REPLACE(REPLACE(REPLACE(s.Centro,' ','<>'),'><',''),'<>',' ')))
		,Seccion = LTRIM(RTRIM(REPLACE(REPLACE(REPLACE(s.Seccion,' ','<>'),'><',''),'<>',' ')))
		,NombreCargo= LTRIM(RTRIM(REPLACE(REPLACE(REPLACE(s.NombreCargo,' ','<>'),'><',''),'<>',' ')))
		,NombreJefe1 = LTRIM(RTRIM(UPPER(REPLACE(REPLACE(REPLACE(EM.NombreJefe,' ','<>'),'><',''),'<>',' '))))
		,FamiliarActivo = CASE WHEN RP.Familiar_Activos = 1 THEN 'SI' ELSE 'NO' END
		,TrabajoAnteriormente = CASE WHEN RP.TrabajoAnteriormente = 1 THEN 'SI' ELSE 'NO' END 
	FROM		
	(
		SELECT	 DISTINCT					 Numero_solicitud		,Estado				,DetalleEstado			,CodigoCargo		,NombreCargo		
				,CodigoUnidadNegocio		,UnidadNegocio			,CodCentro			,Centro					,CodSeccion			,Seccion			
				,DescripcionTrabajo			,Requisitos				,Observaciones		,CodCiudadLabor			,NombreCiudadLabor	,InHouse			
				,InHouseProyect				,InHouseNombreProyect	,Unica				,TipoEstadoSolicitud
		FROM 
		(
			SELECT	 DISTINCT				 Numero_solicitud=S.idsolicitud				,Estado = S.idEstado		,DetalleEstado=E.Estado
					,S.CodigoCargo			,C.NombreCargo								,S.CodigoUnidadNegocio		,S.UnidadNegocio
					,S.CodCentro			,S.Centro									,S.CodSeccion				,s.Seccion
					,S.DescripcionTrabajo	,S.Requisitos								,Observaciones				,S.InHouse					
					,S.CodCiudadLabor		,NombreCiudadLabor=Ciudad.NombreCiudad		,S.InHouseProyect			,InHouseNombreProyect=TV.Nombre
					,Unica					,E.TipoProceso AS TipoEstadoSolicitud
			FROM		Requisiciones_Solicitudes	AS S	
			LEFT JOIN   Requisiciones_Estados		AS E ON s.IdEstado = e.IdEstado	
			LEFT JOIN   Cargos						AS C ON  c.CodigoCargo = s.CodigoCargo	
			LEFT JOIN	v_Requisiciones_CiudadDepto	AS Ciudad ON Ciudad.CodigoCiudad = S.CodCiudadLabor AND Ciudad.CodigoPais = '057'
			LEFT JOIN	v_Requisiciones_ParametrizacionTipoValor AS TV ON TV.Id = S.InHouseProyect AND TV.Tipo = 'InHouse'
		) AS A
	)	AS S

	INNER JOIN	Requisiciones_SolicitudesCandidatos			AS R ON r.IdSolicitud = s.Numero_solicitud

	INNER JOIN	Requisiciones_EstadosCandidatos				AS E ON r.IdEstadoCandidato = e.IdEstadoCandidato

	LEFT JOIN	Requisiciones_EstadosReclutador				AS ER ON R.IdEstadoReclutador = ER.IdEstado

	INNER JOIN	v_Requisiciones_Candidatos_Docs				AS C ON R.Cedula = C.Cedula AND C.IdSolicitud = R.IdSolicitud

	LEFT JOIN	Requisiciones_DireccionCandidato			AS DC ON DC.Cedula = CONVERT(BIGINT,LTRIM(RTRIM(R.Cedula)))
	

	LEFT JOIN Requisiciones_Jefes AS J ON s.Numero_solicitud = J.IdSolicitud 

	LEFT JOIN	
	(
		SELECT DISTINCT CodigoEmpleado, NombreJefe = Nombres+' '+Apellido1+' '+Apellido2
		FROM EmpleadosActivos
		WHERE Ano_Periodo = YEAR(GETDATE()) AND Mes_Periodo = MONTH(GETDATE())
	) AS EM ON J.CC_Jefe1 = EM.CodigoEmpleado

	LEFT JOIN Requisiciones_RelacionesPersonales AS RP ON R.Cedula = RP.CedulaCandidato AND S.Numero_solicitud = RP.IdSolicitud

	LEFT JOIN Requisiciones_Entrevista EN ON EN.IdSolicitud = R.IdSolicitud AND EN.CedulaCandidato = R.Cedula
) A

```
