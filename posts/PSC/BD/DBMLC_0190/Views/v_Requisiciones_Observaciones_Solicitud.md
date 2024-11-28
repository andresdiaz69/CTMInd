# View: v_Requisiciones_Observaciones_Solicitud

## Usa los objetos:
- [[Requisiciones_HistoricoSolicitud]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_Observaciones_Solicitud] AS 
SELECT IdSolicitud
		--Soliciado
		,Estado_Solicitado = MAX(Estado_Solicitado)		
		,Observaciones_Solicitado = MAX(Observaciones_Solicitado)
		,Fecha_Solicitado = MAX(Fecha_Solicitado)
		,User_Solicitado = MAX(User_Solicitado)
	
		--En Busqueda de Candidatos
		,Estado_BusquedaCandidatos = MAX(Estado_BusquedaCandidatos)
		,Observaciones_BusquedaCandidatos = MAX(Observaciones_BusquedaCandidatos)
		,Fecha_BusquedaCandidatos = MAX(Fecha_BusquedaCandidatos)
		,User_BusquedaCandidatos = MAX(User_BusquedaCandidatos)
	
		--Candidato Seleccionado
		,Estado_CandidatoSeleccionado = MAX(Estado_CandidatoSeleccionado)
		,Observaciones_CandidatoSeleccionado = MAX(Observaciones_CandidatoSeleccionado)
		,Fecha_CandidatoSeleccionado = MAX(Fecha_CandidatoSeleccionado)
		,User_CandidatoSeleccionado = MAX(User_CandidatoSeleccionado)

		--Nuevo Salario Aceptado
		,Estado_NuevoSalarioAceptado = MAX(Estado_NuevoSalarioAceptado)
		,Observaciones_NuevoSalarioAceptado = MAX(Observaciones_NuevoSalarioAceptado)
		,Fecha_NuevoSalarioAceptado = MAX(Fecha_NuevoSalarioAceptado)
		,User_NuevoSalarioAceptado = MAX(User_NuevoSalarioAceptado)
	
		--Pendiente Asociar Proveedor a la Solicitud
		,Estado_PendienteAsociarProveedor = MAX(Estado_PendienteAsociarProveedor)
		,Observaciones_PendienteAsociarProveedor = MAX(Observaciones_PendienteAsociarProveedor)
		,Fecha_PendienteAsociarProveedor = MAX(Fecha_PendienteAsociarProveedor)
		,User_PendienteAsociarProveedor = MAX(User_PendienteAsociarProveedor)
	
		--Candidato Contratado
		,Estado_CandidatoContratado = MAX(Estado_CandidatoContratado)
		,Observaciones_CandidatoContratado = MAX(Observaciones_CandidatoContratado)
		,Fecha_CandidatoContratado = MAX(Fecha_CandidatoContratado)
		,User_CandidatoContratado = MAX(User_CandidatoContratado)
	
		--Solicitud Rechazada
		,Estado_Rechazada = MAX(Estado_Rechazada)
		,Observaciones_Rechazada = MAX(Observaciones_Rechazada)
		,Fecha_Rechazada = MAX(Fecha_Rechazada)
		,User_Rechazada = MAX(User_Rechazada)
	
		--Solicitud Cancelada
		,Estado_Cancelada = MAX(Estado_Cancelada)
		,Observaciones_Cancelada = MAX(Observaciones_Cancelada)
		,Fecha_Cancelada = MAX(Fecha_Cancelada)
		,User_Cancelada = MAX(User_Cancelada)
	
		--Pendiente Autorización de Salario
		,Estado_PendienteAutorizarSalario = MAX(Estado_PendienteAutorizarSalario)
		,Observaciones_PendienteAutorizarSalario = MAX(Observaciones_PendienteAutorizarSalario)
		,Fecha_PendienteAutorizarSalario = MAX(Fecha_PendienteAutorizarSalario)
		,User_PendienteAutorizarSalario = MAX(User_PendienteAutorizarSalario)
	
		--Candidato Devuelto a Selección
		,Estado_CandidatoDevueltoSeleccion = MAX(Estado_CandidatoDevueltoSeleccion)
		,Observaciones_CandidatoDevueltoSeleccion = MAX(Observaciones_CandidatoDevueltoSeleccion)
		,Fecha_CandidatoDevueltoSeleccion = MAX(Fecha_CandidatoDevueltoSeleccion)
		,User_CandidatoDevueltoSeleccion = MAX(User_CandidatoDevueltoSeleccion)
	
		--Solicitud Finalizada por Falta de Respuesta
		,Estado_FinalizadaFaltaRespuesta = MAX(Estado_FinalizadaFaltaRespuesta)
		,Observaciones_FinalizadaFaltaRespuesta = MAX(Observaciones_FinalizadaFaltaRespuesta)
		,Fecha_FinalizadaFaltaRespuesta = MAX(Fecha_FinalizadaFaltaRespuesta)
		,User_FinalizadaFaltaRespuesta = MAX(User_FinalizadaFaltaRespuesta)
	
		--Solicitud Pendiente de Aprobacion de CB y Nomina
		,Estado_PendienteCByN = MAX(Estado_PendienteCByN)
		,Observaciones_PendienteCByN = MAX(Observaciones_PendienteCByN)
		,Fecha_PendienteCByN = MAX(Fecha_PendienteCByN)
		,User_PendienteCByN = MAX(User_PendienteCByN)
	FROM
	(
		SELECT IdSolicitud, 
			--Estados
			CASE WHEN IdEstado = 1 THEN IdEstado ELSE NULL END Estado_Solicitado,
			CASE WHEN IdEstado = 2 THEN IdEstado ELSE NULL END Estado_BusquedaCandidatos,
			CASE WHEN IdEstado = 3 THEN IdEstado ELSE NULL END Estado_CandidatoSeleccionado,
			CASE WHEN IdEstado = 4 THEN IdEstado ELSE NULL END Estado_NuevoSalarioAceptado,
			CASE WHEN IdEstado = 5 THEN IdEstado ELSE NULL END Estado_PendienteAsociarProveedor,
			CASE WHEN IdEstado = 7 THEN IdEstado ELSE NULL END Estado_CandidatoContratado,
			CASE WHEN IdEstado = 8 THEN IdEstado ELSE NULL END Estado_Rechazada,
			CASE WHEN IdEstado = 9 THEN IdEstado ELSE NULL END Estado_Cancelada,
			CASE WHEN IdEstado = 10 THEN IdEstado ELSE NULL END Estado_PendienteAutorizarSalario,
			CASE WHEN IdEstado = 11 THEN IdEstado ELSE NULL END Estado_CandidatoDevueltoSeleccion,
			CASE WHEN IdEstado = 12 THEN IdEstado ELSE NULL END Estado_FinalizadaFaltaRespuesta,
			CASE WHEN IdEstado = 13 THEN IdEstado ELSE NULL END Estado_PendienteCByN,

			--Observaciones
			CASE WHEN IdEstado = 1 THEN Observaciones ELSE NULL END Observaciones_Solicitado,
			CASE WHEN IdEstado = 2 THEN Observaciones ELSE NULL END Observaciones_BusquedaCandidatos,
			CASE WHEN IdEstado = 3 THEN Observaciones ELSE NULL END Observaciones_CandidatoSeleccionado,
			CASE WHEN IdEstado = 4 THEN Observaciones ELSE NULL END Observaciones_NuevoSalarioAceptado,
			CASE WHEN IdEstado = 5 THEN Observaciones ELSE NULL END Observaciones_PendienteAsociarProveedor,
			CASE WHEN IdEstado = 7 THEN Observaciones ELSE NULL END Observaciones_CandidatoContratado,
			CASE WHEN IdEstado = 8 THEN Observaciones ELSE NULL END Observaciones_Rechazada,
			CASE WHEN IdEstado = 9 THEN Observaciones ELSE NULL END Observaciones_Cancelada,
			CASE WHEN IdEstado = 10 THEN Observaciones ELSE NULL END Observaciones_PendienteAutorizarSalario,
			CASE WHEN IdEstado = 11 THEN Observaciones ELSE NULL END Observaciones_CandidatoDevueltoSeleccion,
			CASE WHEN IdEstado = 12 THEN Observaciones ELSE NULL END Observaciones_FinalizadaFaltaRespuesta,
			CASE WHEN IdEstado = 13 THEN Observaciones ELSE NULL END Observaciones_PendienteCByN,

			--Fecha Modificacion
			CASE WHEN IdEstado = 1 THEN FechaModificacion ELSE NULL END Fecha_Solicitado,
			CASE WHEN IdEstado = 2 THEN FechaModificacion ELSE NULL END Fecha_BusquedaCandidatos,
			CASE WHEN IdEstado = 3 THEN FechaModificacion ELSE NULL END Fecha_CandidatoSeleccionado,
			CASE WHEN IdEstado = 4 THEN FechaModificacion ELSE NULL END Fecha_NuevoSalarioAceptado,
			CASE WHEN IdEstado = 5 THEN FechaModificacion ELSE NULL END Fecha_PendienteAsociarProveedor,
			CASE WHEN IdEstado = 7 THEN FechaModificacion ELSE NULL END Fecha_CandidatoContratado,
			CASE WHEN IdEstado = 8 THEN FechaModificacion ELSE NULL END Fecha_Rechazada,
			CASE WHEN IdEstado = 9 THEN FechaModificacion ELSE NULL END Fecha_Cancelada,
			CASE WHEN IdEstado = 10 THEN FechaModificacion ELSE NULL END Fecha_PendienteAutorizarSalario,
			CASE WHEN IdEstado = 11 THEN FechaModificacion ELSE NULL END Fecha_CandidatoDevueltoSeleccion,
			CASE WHEN IdEstado = 12 THEN FechaModificacion ELSE NULL END Fecha_FinalizadaFaltaRespuesta,
			CASE WHEN IdEstado = 13 THEN FechaModificacion ELSE NULL END Fecha_PendienteCByN,

			--User Modifico
			CASE WHEN IdEstado = 1 THEN UserModifico ELSE NULL END User_Solicitado,
			CASE WHEN IdEstado = 2 THEN UserModifico ELSE NULL END User_BusquedaCandidatos,
			CASE WHEN IdEstado = 3 THEN UserModifico ELSE NULL END User_CandidatoSeleccionado,
			CASE WHEN IdEstado = 4 THEN UserModifico ELSE NULL END User_NuevoSalarioAceptado,
			CASE WHEN IdEstado = 5 THEN UserModifico ELSE NULL END User_PendienteAsociarProveedor,
			CASE WHEN IdEstado = 7 THEN UserModifico ELSE NULL END User_CandidatoContratado,
			CASE WHEN IdEstado = 8 THEN UserModifico ELSE NULL END User_Rechazada,
			CASE WHEN IdEstado = 9 THEN UserModifico ELSE NULL END User_Cancelada,
			CASE WHEN IdEstado = 10 THEN UserModifico ELSE NULL END User_PendienteAutorizarSalario,
			CASE WHEN IdEstado = 11 THEN UserModifico ELSE NULL END User_CandidatoDevueltoSeleccion,
			CASE WHEN IdEstado = 12 THEN UserModifico ELSE NULL END User_FinalizadaFaltaRespuesta,
			CASE WHEN IdEstado = 13 THEN UserModifico ELSE NULL END User_PendienteCByN

		FROM Requisiciones_HistoricoSolicitud
		--WHERE IdSolicitud = @IdSolicitud--IdSolicitud = 8432
	) A
	GROUP BY IdSolicitud

```
