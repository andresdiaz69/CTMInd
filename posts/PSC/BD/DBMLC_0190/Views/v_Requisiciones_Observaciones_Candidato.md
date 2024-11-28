# View: v_Requisiciones_Observaciones_Candidato

## Usa los objetos:
- [[Requisiciones_HistoricoCandidato]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_Observaciones_Candidato] AS
SELECT IdSolicitud	,CedulaCandidato
	--Candidato Pendiente de Entrevista
	,Estado_PendienteEntrevista = MAX(Estado_PendienteEntrevista)
	,Observaciones_PendienteEntrevista = MAX(Observaciones_PendienteEntrevista)
	,Fecha_PendienteEntrevista = MAX(Fecha_PendienteEntrevista)
	,User_PendienteEntrevista = MAX(User_PendienteEntrevista)
	
	--Candidato Entrevistado
	,Estado_Entrevistado = MAX(Estado_Entrevistado)
	,Observaciones_Entrevistado = MAX(Observaciones_Entrevistado)
	,Fecha_Entrevistado = MAX(Fecha_Entrevistado)
	,User_Entrevistado = MAX(User_Entrevistado)
	
	--Candidato Potencial
	,Estado_Potencial = MAX(Estado_Potencial)
	,Observaciones_Potencial = MAX(Observaciones_Potencial)
	,Fecha_Potencial = MAX(Fecha_Potencial)
	,User_Potencial = MAX(User_Potencial)
	
	--Candidato Seleccionado
	,Estado_Seleccionado = MAX(Estado_Seleccionado)
	,Observaciones_Seleccionado = MAX(Observaciones_Seleccionado)
	,Fecha_Seleccionado = MAX(Fecha_Seleccionado)
	,User_Seleccionado = MAX(User_Seleccionado)
	
	--Candidato No Seleccionado
	,Estado_NoSeleccionado = MAX(Estado_NoSeleccionado)
	,Observaciones_NoSeleccionado = MAX(Observaciones_NoSeleccionado)
	,Fecha_NoSeleccionado = MAX(Fecha_NoSeleccionado)
	,User_NoSeleccionado = MAX(User_NoSeleccionado)
	
	--Candidato Preseleccionado
	,Estado_Preseleccionado = MAX(Estado_Preseleccionado)
	,Observaciones_Preseleccionado = MAX(Observaciones_Preseleccionado)
	,Fecha_Preseleccionado = MAX(Fecha_Preseleccionado)
	,User_Preseleccionado = MAX(User_Preseleccionado)
	
	--Candidato Devuelto a Selección
	,Estado_DevueltoSeleccion = MAX(Estado_DevueltoSeleccion)
	,Observaciones_DevueltoSeleccion = MAX(Observaciones_DevueltoSeleccion)
	,Fecha_DevueltoSeleccion = MAX(Fecha_DevueltoSeleccion)
	,User_DevueltoSeleccion = MAX(User_DevueltoSeleccion)
	
	--Candidato Contratado
	,Estado_CandidatoContratado = MAX(Estado_CandidatoContratado)
	,Observaciones_CandidatoContratado = MAX(Observaciones_CandidatoContratado)
	,Fecha_CandidatoContratado = MAX(Fecha_CandidatoContratado)
	,User_CandidatoContratado = MAX(User_CandidatoContratado)

FROM 
(
	SELECT IdSolicitud	,CedulaCandidato
		,CASE WHEN IdEstadoCandidato = 1 THEN IdEstadoCandidato ELSE NULL END Estado_PendienteEntrevista
		,CASE WHEN IdEstadoCandidato = 2 THEN IdEstadoCandidato ELSE NULL END Estado_Entrevistado
		,CASE WHEN IdEstadoCandidato = 3 THEN IdEstadoCandidato ELSE NULL END Estado_Potencial
		,CASE WHEN IdEstadoCandidato = 4 THEN IdEstadoCandidato ELSE NULL END Estado_Seleccionado
		,CASE WHEN IdEstadoCandidato = 5 THEN IdEstadoCandidato ELSE NULL END Estado_NoSeleccionado
		,CASE WHEN IdEstadoCandidato = 6 THEN IdEstadoCandidato ELSE NULL END Estado_Preseleccionado
		,CASE WHEN IdEstadoCandidato = 7 THEN IdEstadoCandidato ELSE NULL END Estado_DevueltoSeleccion
		,CASE WHEN IdEstadoCandidato = 8 THEN IdEstadoCandidato ELSE NULL END Estado_CandidatoContratado

		,CASE WHEN IdEstadoCandidato = 1 THEN Observaciones ELSE NULL END Observaciones_PendienteEntrevista
		,CASE WHEN IdEstadoCandidato = 2 THEN Observaciones ELSE NULL END Observaciones_Entrevistado
		,CASE WHEN IdEstadoCandidato = 3 THEN Observaciones ELSE NULL END Observaciones_Potencial
		,CASE WHEN IdEstadoCandidato = 4 THEN Observaciones ELSE NULL END Observaciones_Seleccionado
		,CASE WHEN IdEstadoCandidato = 5 THEN Observaciones ELSE NULL END Observaciones_NoSeleccionado
		,CASE WHEN IdEstadoCandidato = 6 THEN Observaciones ELSE NULL END Observaciones_Preseleccionado
		,CASE WHEN IdEstadoCandidato = 7 THEN Observaciones ELSE NULL END Observaciones_DevueltoSeleccion
		,CASE WHEN IdEstadoCandidato = 8 THEN Observaciones ELSE NULL END Observaciones_CandidatoContratado

		,CASE WHEN IdEstadoCandidato = 1 THEN FechaModificacion ELSE NULL END Fecha_PendienteEntrevista
		,CASE WHEN IdEstadoCandidato = 2 THEN FechaModificacion ELSE NULL END Fecha_Entrevistado
		,CASE WHEN IdEstadoCandidato = 3 THEN FechaModificacion ELSE NULL END Fecha_Potencial
		,CASE WHEN IdEstadoCandidato = 4 THEN FechaModificacion ELSE NULL END Fecha_Seleccionado
		,CASE WHEN IdEstadoCandidato = 5 THEN FechaModificacion ELSE NULL END Fecha_NoSeleccionado
		,CASE WHEN IdEstadoCandidato = 6 THEN FechaModificacion ELSE NULL END Fecha_Preseleccionado
		,CASE WHEN IdEstadoCandidato = 7 THEN FechaModificacion ELSE NULL END Fecha_DevueltoSeleccion
		,CASE WHEN IdEstadoCandidato = 8 THEN FechaModificacion ELSE NULL END Fecha_CandidatoContratado

		,CASE WHEN IdEstadoCandidato = 1 THEN UserModifico ELSE NULL END User_PendienteEntrevista
		,CASE WHEN IdEstadoCandidato = 2 THEN UserModifico ELSE NULL END User_Entrevistado
		,CASE WHEN IdEstadoCandidato = 3 THEN UserModifico ELSE NULL END User_Potencial
		,CASE WHEN IdEstadoCandidato = 4 THEN UserModifico ELSE NULL END User_Seleccionado
		,CASE WHEN IdEstadoCandidato = 5 THEN UserModifico ELSE NULL END User_NoSeleccionado
		,CASE WHEN IdEstadoCandidato = 6 THEN UserModifico ELSE NULL END User_Preseleccionado
		,CASE WHEN IdEstadoCandidato = 7 THEN UserModifico ELSE NULL END User_DevueltoSeleccion
		,CASE WHEN IdEstadoCandidato = 8 THEN UserModifico ELSE NULL END User_CandidatoContratado

	FROM Requisiciones_HistoricoCandidato
) A
GROUP BY IdSolicitud, CedulaCandidato

```
