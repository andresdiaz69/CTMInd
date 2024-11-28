# View: v_Requisiciones_ConsultaSolicitudes

## Usa los objetos:
- [[Cargos]]
- [[Profiles]]
- [[Requisiciones_Cargos]]
- [[Requisiciones_Estados]]
- [[Requisiciones_EstadosNomina]]
- [[Requisiciones_EstadosReclutador]]
- [[Requisiciones_HistoricoNomina]]
- [[Requisiciones_HistoricoSolicitud]]
- [[Requisiciones_RazonesCancelacion]]
- [[Requisiciones_Solicitudes]]
- [[Requisiciones_SolicitudesCandidatos]]
- [[Requisiciones_SolicitudesEsquema]]
- [[Requisiciones_SolicitudProveedor]]
- [[v_Requisiciones_CiudadDepto]]
- [[v_Requisiciones_ParametrizacionTipoValor]]
- [[vw_DiasFestivos]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_ConsultaSolicitudes] AS
SELECT	DISTINCT									 Numero_solicitud						,Estado									,DetalleEstado				
	,TipoSolicitud									,NITProveedor							,FechaAutorizacionGteLinea				,FechaCreacion				
	,CodigoCargo									,NombreCargo							,CargoCritico							,Salario
	,IdSolicitante									,Solicitante							,CodEmpresa								,Empresa
	,CodMarca										,Marca									,CodCentro								,Centro
	,CodigoUnidadNegocio							,UnidadNegocio							,CodSeccion								,Seccion
	,CodDepartamento								,Departamento							,CodSede								,Sede
	,Unica											,Observaciones							,IdEstadoReclutador						,EstadoReclutador
	,IdEstadoNomina									,EstadoNomina							,FechaInicioContrato					,FechaCitacionFirmaContrato
	,FechaCitacionFirmaContratoAplazada				,tip_con								,nom_con								,DuracionContratoMeses
	,BonoAlimentacion								,BonoCelular							,BonoGasolina							,AuxMovilizacion
	,SalarioGarantizado								,FinSalario								,DescripcionTrabajo						,Requisitos	
	,PrimerEsquema									,SegundoEsquema							,TercerEsquema							,CuartoEsquema
	,QuintoEsquema									,SextoEsquema							,ObservacionesGteUSC					,ObservacionesGteLinea
	,ObservacionesCancelacionSolicitud				,CandidatoNoFirmaContrato				,CandidatoDevueltoSeleccion				,CandidatoAplazaFirmaContrato
	,JefeAplazaFirmaContrato						,Candidatos_PendienteEntrevista			,Candidatos_Entrevistado				,Candidatos_Potencial
	,Candidatos_Seleccionado						,Candidatos_Rechazados					,Candidatos_Preseleccionado				,Candidatos_DevueltoSeleccion
	,Candidatos_Contratados							,CancelacionInactividad					,HorarioDiurno							,Horario
	,EstadoGeneral									,DescEstadoGeneral						,IdRazonCancelacion						,NombreRazonCancelacion
	,CodCiudadLabor									,NombreCiudadLabor						,InHouse								,InHouseProyect
	,InHouseNombreProyect							,InHouseConfir
	,TiempoTranscurrido = CASE WHEN CONVERT(DATE,FechaCreacion) = CONVERT(DATE,GETDATE()) THEN 0
							WHEN (TiempoTranscurrido - 1) < 0 THEN 0
							ELSE (TiempoTranscurrido - 1) END
	
FROM 
(
	SELECT	 DISTINCT				 Numero_solicitud				,Estado							,DetalleEstado				,TipoSolicitud
		,NITProveedor				,FechaCreacion					,CodigoCargo					,NombreCargo				,CargoCritico
		,Salario					,IdSolicitante					,Solicitante					,CodEmpresa					,Empresa
		,CodMarca					,Marca							,CodCentro						,Centro						,CodigoUnidadNegocio
		,UnidadNegocio				,CodSeccion						,Seccion						,CodDepartamento			,Departamento
		,CodSede					,Sede							,Unica							,Observaciones				,IdEstadoReclutador
		,EstadoReclutador			,IdEstadoNomina					,EstadoNomina					,FechaInicioContrato		,tip_con
		,nom_con					,DuracionContratoMeses			,BonoAlimentacion				,BonoCelular				,BonoGasolina
		,AuxMovilizacion			,SalarioGarantizado				,FinSalario						,DescripcionTrabajo			,Requisitos
		,PrimerEsquema				,SegundoEsquema					,TercerEsquema					,CuartoEsquema				,QuintoEsquema
		,SextoEsquema				,ObservacionesGteUSC			,ObservacionesGteLinea			,HorarioDiurno				,EstadoGeneral				
		,DescEstadoGeneral			,IdRazonCancelacion				,NombreRazonCancelacion			,CodCiudadLabor				,NombreCiudadLabor
		,InHouse					,InHouseProyect					,InHouseNombreProyect			
	
		,FechaCitacionFirmaContrato					,FechaCitacionFirmaContratoAplazada			,FechaAutorizacionGteLinea=CONVERT(date,FechaAutorizacionGteLinea)
		,ObservacionesCancelacionSolicitud			,CandidatoNoFirmaContrato					,CandidatoDevueltoSeleccion
		,CandidatoAplazaFirmaContrato				,JefeAplazaFirmaContrato					,Candidatos_PendienteEntrevista
		,Candidatos_Entrevistado					,Candidatos_Potencial						,Candidatos_Seleccionado
		,Candidatos_Rechazados						,Candidatos_Preseleccionado					,Candidatos_DevueltoSeleccion
		,Candidatos_Contratados						,CancelacionInactividad
		
		,InHouseConfir = CASE WHEN InHouse = 1 THEN 'Si' ELSE 'No' END

		,Horario = CASE WHEN HorarioDiurno = 1 THEN 'Diurno' ELSE 'Nocturno' END

		,TiempoTranscurrido = (SELECT  SUM(CASE WHEN F.DiaSemana BETWEEN 1 AND 5 THEN F.Cant ELSE 0 END) - 
						(SELECT COUNT(Fechafestivo) FROM vw_DiasFestivos where Fechafestivo >= FechaAutorizacionGteLinea and Fechafestivo <= GETDATE()) AS 'TiempoTranscurrido'
							FROM  (
								SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, GETDATE())/7-DATEDIFF(DAY, -6, FechaAutorizacionGteLinea)/7 AS Cant UNION
								SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, GETDATE())/7-DATEDIFF(DAY, -5, FechaAutorizacionGteLinea)/7 AS Cant UNION
								SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, GETDATE())/7-DATEDIFF(DAY, -4, FechaAutorizacionGteLinea)/7 AS Cant UNION
								SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, GETDATE())/7-DATEDIFF(DAY, -3, FechaAutorizacionGteLinea)/7 AS Cant UNION
								SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, GETDATE())/7-DATEDIFF(DAY, -2, FechaAutorizacionGteLinea)/7 AS Cant UNION
								SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, GETDATE())/7-DATEDIFF(DAY, -1, FechaAutorizacionGteLinea)/7 AS Cant UNION
								SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, GETDATE())/7-DATEDIFF(DAY,  0, FechaAutorizacionGteLinea)/7 AS Cant	
							) F) 		

	FROM 
	(
		SELECT	 DISTINCT										 Numero_solicitud = s.idsolicitud						,Estado=s.idEstado
			,DetalleEstado=e.Estado								,s.TipoSolicitud										,NITProveedor = ISNULL(sp.Nit, 0)
			,FechaCreacion=CONVERT(date,s.FechaCreacion)		,s.CodigoCargo											,c.NombreCargo
			,CargoCritico = ISNULL(CC.Critico,0)				,s.Salario												,IdSolicitante = p.UserId
			,s.CodEmpresa										,s.Empresa												,s.CodMarca
			,s.Marca											,s.CodCentro											,s.Centro
			,s.CodigoUnidadNegocio								,s.UnidadNegocio										,s.CodSeccion
			,s.Seccion											,s.CodDepartamento										,s.Departamento
			,s.CodSede											,s.Sede													,s.Unica
			,Observaciones = s.Observaciones					,s.IdEstadoNomina										,n.EstadoNomina
			,s.FechaInicioContrato								,s.FechaCitacionFirmaContrato							,s.tip_con
			,s.nom_con											,s.DuracionContratoMeses								,s.FechaCitacionFirmaContratoAplazada
			,s.BonoAlimentacion									,s.BonoCelular											,s.BonoGasolina
			,AuxMovilizacion									,SalarioGarantizado										,s.FinSalario
			,s.DescripcionTrabajo								,s.Requisitos											,Esq.PrimerEsquema
			,Esq.SegundoEsquema									,Esq.TercerEsquema										,Esq.CuartoEsquema
			,Esq.QuintoEsquema									,Esq.SextoEsquema										,ObservacionesGteUSC=Obs_USC.Observaciones
			,CancelacionInactividad=Obs_CSAI.Observaciones		,S.HorarioDiurno										,Con_can.Candidatos_Preseleccionado
			,Solicitante = p.Nombres + ' ' + p.Apellidos		,CandidatoNoFirmaContrato=Obs_CNFC.Observaciones		,s.IdEstadoReclutador
			,Con_can.Candidatos_DevueltoSeleccion				,CandidatoDevueltoSeleccion=Obs_CDS.Observaciones		,CandidatoAplazaFirmaContrato=Obs_CAFC.Observaciones
			,EstadoReclutador=er.Estado							,Con_can.Candidatos_Potencial							,JefeAplazaFirmaContrato=Obs_JAFC.Observaciones
			,Con_can.Candidatos_PendienteEntrevista				,Con_can.Candidatos_Entrevistado						,Con_can.Candidatos_Seleccionado
			,Con_can.Candidatos_Rechazados						,Con_can.Candidatos_Contratados							,ObservacionesCancelacionSolicitud=Obs_CS.Observaciones
			,RC.IdRazonCancelacion								,RC.NombreRazonCancelacion								,s.CodCiudadLabor
			,NombreCiudadLabor = Ciudad.NombreCiudad			,InHouse												,InHouseProyect
			,InHouseNombreProyect = TV.Nombre
				
			,FechaAutorizacionGteLinea = CASE WHEN Obs_LineaCon.IdEstado IS NOT NULL THEN Obs_LineaCon.FechaModificacion
											ELSE Obs_LineaSin.FechaModificacion END 
				
			,ObservacionesGteLinea = CASE WHEN Obs_LineaCon.IdEstado IS NOT NULL THEN Obs_LineaCon.Observaciones
										ELSE Obs_LineaSin.Observaciones END 
				
			,EstadoGeneral = CASE WHEN s.IdEstado = 2 AND s.IdEstadoReclutador IN (1,2,3,4,5,6) THEN er.Estado
								WHEN s.IdEstado = 3 AND s.IdEstadoNomina IN (5,6,8,9) THEN n.EstadoNomina
								ELSE e.Estado END
				
			,DescEstadoGeneral = CASE WHEN s.IdEstado = 2 AND s.IdEstadoReclutador IN (1,2,3,4,5,6) THEN er.Descripcion
									WHEN s.IdEstado = 3 AND s.IdEstadoNomina IN (5,6,8,9) THEN n.Descripcion
									ELSE e.Descripcion END


		
		FROM		Requisiciones_Solicitudes AS s

		LEFT JOIN	Requisiciones_RazonesCancelacion AS RC ON RC.IdRazonCancelacion = S.RazonCancelacion

		LEFT JOIN   Requisiciones_Estados AS e ON s.IdEstado = e.IdEstado

		LEFT JOIN   Requisiciones_EstadosReclutador AS er ON s.IdEstadoReclutador = er.IdEstado

		LEFT JOIN   Cargos AS c ON  c.CodigoCargo = s.CodigoCargo

		LEFT JOIN   Requisiciones_Cargos AS CC ON  cc.CodigoCargo = s.CodigoCargo and s.CodigoUnidadNegocio = CC.CodigoMarca

		LEFT JOIN   Profiles AS p ON s.UserIdCreo = p.UserId

		LEFT JOIN	Requisiciones_EstadosNomina AS n ON s.IdEstadoNomina = n.IdEstadoNomina

		LEFT JOIN	v_Requisiciones_CiudadDepto AS Ciudad ON Ciudad.CodigoCiudad = S.CodCiudadLabor AND Ciudad.CodigoPais = '057'

		LEFT JOIN	v_Requisiciones_ParametrizacionTipoValor AS TV ON TV.Id = S.InHouseProyect AND TV.Tipo = 'InHouse'

		LEFT JOIN	
		(
			SELECT *
			FROM Requisiciones_SolicitudProveedor 
			WHERE Nit <> 0
		) AS sp ON s.IdSolicitud = sp.Solicitud

		--Consulta Esquemas Variables
		LEFT JOIN (
			SELECT DISTINCT IdSolicitud, 
				(SELECT TOP(1) Esquema FROM Requisiciones_SolicitudesEsquema WHERE NumeroEsquema = 1 AND IdSolicitud = a.IdSolicitud)PrimerEsquema,
				(SELECT TOP(1) Esquema FROM Requisiciones_SolicitudesEsquema WHERE NumeroEsquema = 2 AND IdSolicitud = a.IdSolicitud)SegundoEsquema,
				(SELECT TOP(1) Esquema FROM Requisiciones_SolicitudesEsquema WHERE NumeroEsquema = 3 AND IdSolicitud = a.IdSolicitud)TercerEsquema,
				(SELECT TOP(1) Esquema FROM Requisiciones_SolicitudesEsquema WHERE NumeroEsquema = 4 AND IdSolicitud = a.IdSolicitud)CuartoEsquema,
				(SELECT TOP(1) Esquema FROM Requisiciones_SolicitudesEsquema WHERE NumeroEsquema = 5 AND IdSolicitud = a.IdSolicitud)QuintoEsquema,
				(SELECT TOP(1) Esquema FROM Requisiciones_SolicitudesEsquema WHERE NumeroEsquema = 6 AND IdSolicitud = a.IdSolicitud)SextoEsquema
			FROM Requisiciones_SolicitudesEsquema AS a
		) Esq ON s.IdSolicitud = Esq.IdSolicitud
	
		--Observaciones Gerente de la USC
		LEFT JOIN 
		(
			SELECT DISTINCT IdSolicitud, IdEstado,
				(SELECT TOP(1) FechaModificacion FROM Requisiciones_HistoricoSolicitud WHERE IdEstado = 4 AND IdSolicitud = a.IdSolicitud ORDER BY IdHistorico DESC)	FechaModificacion,
				(SELECT TOP(1) Observaciones FROM Requisiciones_HistoricoSolicitud WHERE IdEstado = 4 AND IdSolicitud = a.IdSolicitud ORDER BY IdHistorico DESC)	Observaciones
			FROM Requisiciones_HistoricoSolicitud AS a
			WHERE IdEstado = 4
		) AS Obs_USC ON s.IdSolicitud = Obs_USC.IdSolicitud

		--Observaciones Gerente de Línea Sin Candidato
		LEFT JOIN 
		(
			SELECT DISTINCT IdSolicitud, IdEstado,
				(SELECT TOP(1) FechaModificacion FROM Requisiciones_HistoricoSolicitud WHERE IdEstado = 2 AND IdSolicitud = a.IdSolicitud ORDER BY IdHistorico DESC)	FechaModificacion,
				(SELECT TOP(1) Observaciones FROM Requisiciones_HistoricoSolicitud WHERE IdEstado = 2 AND IdSolicitud = a.IdSolicitud ORDER BY IdHistorico DESC)	Observaciones
			FROM Requisiciones_HistoricoSolicitud AS a
			WHERE IdEstado = 2
		) AS Obs_LineaSin ON s.IdSolicitud = Obs_LineaSin.IdSolicitud

		--Observaciones Gerente de Línea Con Candidato
		LEFT JOIN 
		(
			SELECT DISTINCT IdSolicitud, IdEstado,
				(SELECT TOP(1) FechaModificacion FROM Requisiciones_HistoricoSolicitud WHERE IdEstado = 5 AND IdSolicitud = a.IdSolicitud ORDER BY IdHistorico DESC)	FechaModificacion,
				(SELECT TOP(1) Observaciones FROM Requisiciones_HistoricoSolicitud WHERE IdEstado = 5 AND IdSolicitud = a.IdSolicitud ORDER BY IdHistorico DESC)	Observaciones
			FROM Requisiciones_HistoricoSolicitud AS a
			WHERE IdEstado = 5
		) AS Obs_LineaCon ON s.IdSolicitud = Obs_LineaCon.IdSolicitud

		--Observaciones Cancelación de Solicitud
		LEFT JOIN 
		(
			SELECT DISTINCT IdSolicitud, IdEstado,
				(SELECT TOP(1) FechaModificacion FROM Requisiciones_HistoricoSolicitud WHERE IdEstado = 9 AND IdSolicitud = a.IdSolicitud ORDER BY IdHistorico DESC)	FechaModificacion,
				(SELECT TOP(1) Observaciones FROM Requisiciones_HistoricoSolicitud WHERE IdEstado = 9 AND IdSolicitud = a.IdSolicitud ORDER BY IdHistorico DESC)	Observaciones
			FROM Requisiciones_HistoricoSolicitud AS a
			WHERE IdEstado = 9				
		) AS Obs_CS ON s.IdSolicitud = Obs_CS.IdSolicitud

		--Observaciones Cancelación de Solicitud Automatica por Inactividad
		LEFT JOIN 
		(
			SELECT DISTINCT IdSolicitud, IdEstado,
				(SELECT TOP(1) FechaModificacion FROM Requisiciones_HistoricoSolicitud WHERE IdEstado = 12 AND IdSolicitud = a.IdSolicitud ORDER BY IdHistorico DESC)	FechaModificacion,
				(SELECT TOP(1) Observaciones FROM Requisiciones_HistoricoSolicitud WHERE IdEstado = 12 AND IdSolicitud = a.IdSolicitud ORDER BY IdHistorico DESC)	Observaciones
			FROM Requisiciones_HistoricoSolicitud AS a
			WHERE IdEstado = 12
		) AS Obs_CSAI ON s.IdSolicitud = Obs_CSAI.IdSolicitud

		--Observaciones Nómina Estado Candidato no firma el contrato.
		LEFT JOIN 
		(
			SELECT DISTINCT IdSolicitud, CedulaCandidato, 
				(SELECT TOP(1) Observaciones FROM Requisiciones_HistoricoNomina WHERE IdEstadoNomina = 3 AND IdSolicitud = a.IdSolicitud ORDER BY IdHistorico DESC)	Observaciones
			FROM Requisiciones_HistoricoNomina AS a
			WHERE IdEstadoNomina = 3
		) AS Obs_CNFC ON s.IdSolicitud = Obs_CNFC.IdSolicitud

		--Observaciones Nómina Estado Devuelto a selección.
		LEFT JOIN 
		(
			SELECT DISTINCT IdSolicitud, 
				(SELECT TOP(1) Observaciones FROM Requisiciones_HistoricoNomina	WHERE IdEstadoNomina = 4 AND IdSolicitud = a.IdSolicitud ORDER BY IdHistorico DESC)	Observaciones
			FROM Requisiciones_HistoricoNomina AS a
			WHERE IdEstadoNomina = 4
		) AS Obs_CDS ON s.IdSolicitud = Obs_CDS.IdSolicitud

		--Observaciones Nómina Estado Candidato Aplaza la Firma del Contrato.
		LEFT JOIN 
		(
			SELECT DISTINCT IdSolicitud,
				(SELECT TOP(1) Observaciones FROM Requisiciones_HistoricoNomina	WHERE IdEstadoNomina = 5 AND IdSolicitud = a.IdSolicitud ORDER BY IdHistorico DESC)	Observaciones
			FROM Requisiciones_HistoricoNomina AS a
			WHERE IdEstadoNomina = 5
		) AS Obs_CAFC ON s.IdSolicitud = Obs_CAFC.IdSolicitud

		--Observaciones Nómina Estado Jefe Aplaza la Firma del Contrato.
		LEFT JOIN 
		(
			SELECT DISTINCT IdSolicitud, 
				(SELECT TOP(1) Observaciones FROM Requisiciones_HistoricoNomina WHERE IdEstadoNomina = 8 AND IdSolicitud = a.IdSolicitud ORDER BY IdHistorico DESC)	Observaciones
			FROM Requisiciones_HistoricoNomina AS a
			WHERE IdEstadoNomina = 8
		) AS Obs_JAFC ON s.IdSolicitud = Obs_JAFC.IdSolicitud

		LEFT JOIN --Cantidad de Candidatos anexados en la solicitud
		(
			SELECT DISTINCT IdSolicitud, 
				(SELECT TOP(1) count(Cedula) FROM Requisiciones_SolicitudesCandidatos WHERE IdEstadoCandidato = 1 AND IdSolicitud = a.IdSolicitud)Candidatos_PendienteEntrevista,
				(SELECT TOP(1) count(Cedula) FROM Requisiciones_SolicitudesCandidatos WHERE IdEstadoCandidato = 2 AND IdSolicitud = a.IdSolicitud)Candidatos_Entrevistado,
				(SELECT TOP(1) count(Cedula) FROM Requisiciones_SolicitudesCandidatos WHERE IdEstadoCandidato = 3 AND IdSolicitud = a.IdSolicitud)Candidatos_Potencial,
				(SELECT TOP(1) count(Cedula) FROM Requisiciones_SolicitudesCandidatos WHERE IdEstadoCandidato = 4 AND IdSolicitud = a.IdSolicitud)Candidatos_Seleccionado,
				(SELECT TOP(1) count(Cedula) FROM Requisiciones_SolicitudesCandidatos WHERE IdEstadoCandidato = 5 AND IdSolicitud = a.IdSolicitud)Candidatos_Rechazados,
				(SELECT TOP(1) count(Cedula) FROM Requisiciones_SolicitudesCandidatos WHERE IdEstadoCandidato = 6 AND IdSolicitud = a.IdSolicitud)Candidatos_Preseleccionado,
				(SELECT TOP(1) count(Cedula) FROM Requisiciones_SolicitudesCandidatos WHERE IdEstadoCandidato = 7 AND IdSolicitud = a.IdSolicitud)Candidatos_DevueltoSeleccion,
				(SELECT TOP(1) count(Cedula) FROM Requisiciones_SolicitudesCandidatos WHERE IdEstadoCandidato = 8 AND IdSolicitud = a.IdSolicitud)Candidatos_Contratados	
			FROM Requisiciones_SolicitudesCandidatos AS a
		) Con_can ON S.IdSolicitud = Con_can.IdSolicitud
	) AS A
)A

```
