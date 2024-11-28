# View: v_Requisiciones_Observaciones_Reclutador

## Usa los objetos:
- [[Requisiciones_HistoricoReclutador]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_Observaciones_Reclutador] AS 
SELECT IdSolicitud	,CedulaCandidato
	--Candidato Pendiente de Entrevista
	,Estado_PendienteEntrevista = MAX(Estado_PendienteEntrevista)
	,Observaciones_PendienteEntrevista = MAX(Observaciones_PendienteEntrevista)
	,Fecha_PendienteEntrevista = MAX(Fecha_PendienteEntrevista)
	,User_PendienteEntrevista = MAX(User_PendienteEntrevista)

	--Candidato Pendiente de Preseleccion
	,Estado_PendientePreseleccionado = MAX(Estado_PendientePreseleccionado)
	,Observaciones_PendientePreseleccionado = MAX(Observaciones_PendientePreseleccionado)
	,Fecha_PendientePreseleccionado = MAX(Fecha_PendientePreseleccionado)
	,User_PendientePreseleccionado = MAX(User_PendientePreseleccionado)

	--Inicio de Proceso de Evaluación
	,Estado_InicioProcesoEvaluacion = MAX(Estado_InicioProcesoEvaluacion)
	,Observaciones_InicioProcesoEvaluacion = MAX(Observaciones_InicioProcesoEvaluacion)
	,Fecha_InicioProcesoEvaluacion = MAX(Fecha_InicioProcesoEvaluacion)
	,User_InicioProcesoEvaluacion = MAX(User_InicioProcesoEvaluacion)

	--Estudio de Poligrafo
	,Estado_Poligrafo = MAX(Estado_Poligrafo)
	,Observaciones_Poligrafo = MAX(Observaciones_Poligrafo)
	,Fecha_Poligrafo = MAX(Fecha_Poligrafo)
	,User_Poligrafo = MAX(User_Poligrafo)

	--Estudio de Seguridad
	,Estado_EstudioSeguridad = MAX(Estado_EstudioSeguridad)
	,Observaciones_EstudioSeguridad = MAX(Observaciones_EstudioSeguridad)
	,Fecha_EstudioSeguridad = MAX(Fecha_EstudioSeguridad)
	,User_EstudioSeguridad = MAX(User_EstudioSeguridad)

	--Examen Medico
	,Estado_ExamenMedico = MAX(Estado_ExamenMedico)
	,Observaciones_ExamenMedico = MAX(Observaciones_ExamenMedico)
	,Fecha_ExamenMedico = MAX(Fecha_ExamenMedico)
	,User_ExamenMedico = MAX(User_ExamenMedico)

	--Candidato Seleccionado
	,Estado_CandidatoSeleccionado = MAX(Estado_CandidatoSeleccionado)
	,Observaciones_CandidatoSeleccionado = MAX(Observaciones_CandidatoSeleccionado)
	,Fecha_CandidatoSeleccionado = MAX(Fecha_CandidatoSeleccionado)
	,User_CandidatoSeleccionado = MAX(User_CandidatoSeleccionado)

	--Candidato Rechazado
	,Estado_CandidatoRechazado = MAX(Estado_CandidatoRechazado)
	,Observaciones_CandidatoRechazado = MAX(Observaciones_CandidatoRechazado)
	,Fecha_CandidatoRechazado = MAX(Fecha_CandidatoRechazado)
	,User_CandidatoRechazado = MAX(User_CandidatoRechazado)

	--Candidato Contratado
	,Estado_CandidatoContratado = MAX(Estado_CandidatoContratado)
	,Observaciones_CandidatoContratado = MAX(Observaciones_CandidatoContratado)
	,Fecha_CandidatoContratado = MAX(Fecha_CandidatoContratado)
	,User_CandidatoContratado = MAX(User_CandidatoContratado)

	--Candidato Potencial
	,Estado_CandidatoPotencial = MAX(Estado_CandidatoPotencial)
	,Observaciones_CandidatoPotencial = MAX(Observaciones_CandidatoPotencial)
	,Fecha_CandidatoPotencial = MAX(Fecha_CandidatoPotencial)
	,User_CandidatoPotencial = MAX(User_CandidatoPotencial)

	--Proceso Devuelto
	,Estado_ProcesoDevuelto = MAX(Estado_ProcesoDevuelto)
	,Observaciones_ProcesoDevuelto = MAX(Observaciones_ProcesoDevuelto)
	,Fecha_ProcesoDevuelto = MAX(Fecha_ProcesoDevuelto)
	,User_ProcesoDevuelto = MAX(User_ProcesoDevuelto)

	--Candidato Citado a Firma de Contrato
	,Estado_CitadoFirmaContrato = MAX(Estado_CitadoFirmaContrato)
	,Observaciones_CitadoFirmaContrato = MAX(Observaciones_CitadoFirmaContrato)
	,Fecha_CitadoFirmaContrato = MAX(Fecha_CitadoFirmaContrato)
	,User_CitadoFirmaContrato = MAX(User_CitadoFirmaContrato)

	--Pendiente Asociar Proveedor
	,Estado_PendienteAsociarProveedor = MAX(Estado_PendienteAsociarProveedor)
	,Observaciones_PendienteAsociarProveedor = MAX(Observaciones_PendienteAsociarProveedor)
	,Fecha_PendienteAsociarProveedor = MAX(Fecha_PendienteAsociarProveedor)
	,User_PendienteAsociarProveedor = MAX(User_PendienteAsociarProveedor)

	--Solicitud Cancelada o Rechazada
	,Estado_SolicitudCanceladaRechazada = MAX(Estado_SolicitudCanceladaRechazada)
	,Observaciones_SolicitudCanceladaRechazada = MAX(Observaciones_SolicitudCanceladaRechazada)
	,Fecha_SolicitudCanceladaRechazada = MAX(Fecha_SolicitudCanceladaRechazada)
	,User_SolicitudCanceladaRechazada = MAX(User_SolicitudCanceladaRechazada)

	--Solicitud en Proceso de Autorizacion
	,Estado_SolicitudProcesoAutorizacion = MAX(Estado_SolicitudProcesoAutorizacion)
	,Observaciones_SolicitudProcesoAutorizacion = MAX(Observaciones_SolicitudProcesoAutorizacion)
	,Fecha_SolicitudProcesoAutorizacion = MAX(Fecha_SolicitudProcesoAutorizacion)
	,User_SolicitudProcesoAutorizacion = MAX(User_SolicitudProcesoAutorizacion)

	--Solicitud en Proceso de Autorizacion
	,Estado_BusquedaCandidatos = MAX(Estado_BusquedaCandidatos)
	,Observaciones_BusquedaCandidatos = MAX(Observaciones_BusquedaCandidatos)
	,Fecha_BusquedaCandidatos = MAX(Fecha_BusquedaCandidatos)
	,User_BusquedaCandidatos = MAX(User_BusquedaCandidatos)

FROM
(
	SELECT IdSolicitud	,CedulaCandidato
		,CASE WHEN IdEstadoReclutador = 1  THEN IdEstadoReclutador ELSE NULL END Estado_PendienteEntrevista
		,CASE WHEN IdEstadoReclutador = 2  THEN IdEstadoReclutador ELSE NULL END Estado_PendientePreseleccionado
		,CASE WHEN IdEstadoReclutador = 3  THEN IdEstadoReclutador ELSE NULL END Estado_InicioProcesoEvaluacion
		,CASE WHEN IdEstadoReclutador = 4  THEN IdEstadoReclutador ELSE NULL END Estado_Poligrafo
		,CASE WHEN IdEstadoReclutador = 5  THEN IdEstadoReclutador ELSE NULL END Estado_EstudioSeguridad
		,CASE WHEN IdEstadoReclutador = 6  THEN IdEstadoReclutador ELSE NULL END Estado_ExamenMedico
		,CASE WHEN IdEstadoReclutador = 7  THEN IdEstadoReclutador ELSE NULL END Estado_CandidatoSeleccionado
		,CASE WHEN IdEstadoReclutador = 8  THEN IdEstadoReclutador ELSE NULL END Estado_CandidatoRechazado
		,CASE WHEN IdEstadoReclutador = 9  THEN IdEstadoReclutador ELSE NULL END Estado_CandidatoContratado
		,CASE WHEN IdEstadoReclutador = 10 THEN IdEstadoReclutador ELSE NULL END Estado_CandidatoPotencial
		,CASE WHEN IdEstadoReclutador = 11 THEN IdEstadoReclutador ELSE NULL END Estado_ProcesoDevuelto
		,CASE WHEN IdEstadoReclutador = 12 THEN IdEstadoReclutador ELSE NULL END Estado_CitadoFirmaContrato
		,CASE WHEN IdEstadoReclutador = 13 THEN IdEstadoReclutador ELSE NULL END Estado_PendienteAsociarProveedor
		,CASE WHEN IdEstadoReclutador = 14 THEN IdEstadoReclutador ELSE NULL END Estado_SolicitudCanceladaRechazada
		,CASE WHEN IdEstadoReclutador = 15 THEN IdEstadoReclutador ELSE NULL END Estado_SolicitudProcesoAutorizacion
		,CASE WHEN IdEstadoReclutador = 16 THEN IdEstadoReclutador ELSE NULL END Estado_BusquedaCandidatos
	
		,CASE WHEN IdEstadoReclutador = 1  THEN Observaciones ELSE NULL END Observaciones_PendienteEntrevista
		,CASE WHEN IdEstadoReclutador = 2  THEN Observaciones ELSE NULL END Observaciones_PendientePreseleccionado
		,CASE WHEN IdEstadoReclutador = 3  THEN Observaciones ELSE NULL END Observaciones_InicioProcesoEvaluacion
		,CASE WHEN IdEstadoReclutador = 4  THEN Observaciones ELSE NULL END Observaciones_Poligrafo
		,CASE WHEN IdEstadoReclutador = 5  THEN Observaciones ELSE NULL END Observaciones_EstudioSeguridad
		,CASE WHEN IdEstadoReclutador = 6  THEN Observaciones ELSE NULL END Observaciones_ExamenMedico
		,CASE WHEN IdEstadoReclutador = 7  THEN Observaciones ELSE NULL END Observaciones_CandidatoSeleccionado
		,CASE WHEN IdEstadoReclutador = 8  THEN Observaciones ELSE NULL END Observaciones_CandidatoRechazado
		,CASE WHEN IdEstadoReclutador = 9  THEN Observaciones ELSE NULL END Observaciones_CandidatoContratado
		,CASE WHEN IdEstadoReclutador = 10 THEN Observaciones ELSE NULL END Observaciones_CandidatoPotencial
		,CASE WHEN IdEstadoReclutador = 11 THEN Observaciones ELSE NULL END Observaciones_ProcesoDevuelto
		,CASE WHEN IdEstadoReclutador = 12 THEN Observaciones ELSE NULL END Observaciones_CitadoFirmaContrato
		,CASE WHEN IdEstadoReclutador = 13 THEN Observaciones ELSE NULL END Observaciones_PendienteAsociarProveedor
		,CASE WHEN IdEstadoReclutador = 14 THEN Observaciones ELSE NULL END Observaciones_SolicitudCanceladaRechazada
		,CASE WHEN IdEstadoReclutador = 15 THEN Observaciones ELSE NULL END Observaciones_SolicitudProcesoAutorizacion
		,CASE WHEN IdEstadoReclutador = 16 THEN Observaciones ELSE NULL END Observaciones_BusquedaCandidatos
	
		,CASE WHEN IdEstadoReclutador = 1  THEN FechaModificacion ELSE NULL END Fecha_PendienteEntrevista
		,CASE WHEN IdEstadoReclutador = 2  THEN FechaModificacion ELSE NULL END Fecha_PendientePreseleccionado
		,CASE WHEN IdEstadoReclutador = 3  THEN FechaModificacion ELSE NULL END Fecha_InicioProcesoEvaluacion
		,CASE WHEN IdEstadoReclutador = 4  THEN FechaModificacion ELSE NULL END Fecha_Poligrafo
		,CASE WHEN IdEstadoReclutador = 5  THEN FechaModificacion ELSE NULL END Fecha_EstudioSeguridad
		,CASE WHEN IdEstadoReclutador = 6  THEN FechaModificacion ELSE NULL END Fecha_ExamenMedico
		,CASE WHEN IdEstadoReclutador = 7  THEN FechaModificacion ELSE NULL END Fecha_CandidatoSeleccionado
		,CASE WHEN IdEstadoReclutador = 8  THEN FechaModificacion ELSE NULL END Fecha_CandidatoRechazado
		,CASE WHEN IdEstadoReclutador = 9  THEN FechaModificacion ELSE NULL END Fecha_CandidatoContratado
		,CASE WHEN IdEstadoReclutador = 10 THEN FechaModificacion ELSE NULL END Fecha_CandidatoPotencial
		,CASE WHEN IdEstadoReclutador = 11 THEN FechaModificacion ELSE NULL END Fecha_ProcesoDevuelto
		,CASE WHEN IdEstadoReclutador = 12 THEN FechaModificacion ELSE NULL END Fecha_CitadoFirmaContrato
		,CASE WHEN IdEstadoReclutador = 13 THEN FechaModificacion ELSE NULL END Fecha_PendienteAsociarProveedor
		,CASE WHEN IdEstadoReclutador = 14 THEN FechaModificacion ELSE NULL END Fecha_SolicitudCanceladaRechazada
		,CASE WHEN IdEstadoReclutador = 15 THEN FechaModificacion ELSE NULL END Fecha_SolicitudProcesoAutorizacion
		,CASE WHEN IdEstadoReclutador = 16 THEN FechaModificacion ELSE NULL END Fecha_BusquedaCandidatos
	
		,CASE WHEN IdEstadoReclutador = 1  THEN Usermodifico ELSE NULL END User_PendienteEntrevista
		,CASE WHEN IdEstadoReclutador = 2  THEN Usermodifico ELSE NULL END User_PendientePreseleccionado
		,CASE WHEN IdEstadoReclutador = 3  THEN Usermodifico ELSE NULL END User_InicioProcesoEvaluacion
		,CASE WHEN IdEstadoReclutador = 4  THEN Usermodifico ELSE NULL END User_Poligrafo
		,CASE WHEN IdEstadoReclutador = 5  THEN Usermodifico ELSE NULL END User_EstudioSeguridad
		,CASE WHEN IdEstadoReclutador = 6  THEN Usermodifico ELSE NULL END User_ExamenMedico
		,CASE WHEN IdEstadoReclutador = 7  THEN Usermodifico ELSE NULL END User_CandidatoSeleccionado
		,CASE WHEN IdEstadoReclutador = 8  THEN Usermodifico ELSE NULL END User_CandidatoRechazado
		,CASE WHEN IdEstadoReclutador = 9  THEN Usermodifico ELSE NULL END User_CandidatoContratado
		,CASE WHEN IdEstadoReclutador = 10 THEN Usermodifico ELSE NULL END User_CandidatoPotencial
		,CASE WHEN IdEstadoReclutador = 11 THEN Usermodifico ELSE NULL END User_ProcesoDevuelto
		,CASE WHEN IdEstadoReclutador = 12 THEN Usermodifico ELSE NULL END User_CitadoFirmaContrato
		,CASE WHEN IdEstadoReclutador = 13 THEN Usermodifico ELSE NULL END User_PendienteAsociarProveedor
		,CASE WHEN IdEstadoReclutador = 14 THEN Usermodifico ELSE NULL END User_SolicitudCanceladaRechazada
		,CASE WHEN IdEstadoReclutador = 15 THEN Usermodifico ELSE NULL END User_SolicitudProcesoAutorizacion
		,CASE WHEN IdEstadoReclutador = 16 THEN Usermodifico ELSE NULL END User_BusquedaCandidatos

	FROM Requisiciones_HistoricoReclutador
)A
GROUP BY IdSolicitud, CedulaCandidato

```
