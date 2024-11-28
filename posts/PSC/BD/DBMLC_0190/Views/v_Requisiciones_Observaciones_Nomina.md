# View: v_Requisiciones_Observaciones_Nomina

## Usa los objetos:
- [[Requisiciones_HistoricoNomina]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_Observaciones_Nomina] AS
SELECT IdSolicitud	,CedulaCandidato
	--Pendiente 
	,Estado_Pendiente = MAX(Estado_Pendiente)
	,Observaciones_Pendiente = MAX(Observaciones_Pendiente)
	,Fecha_Pendiente = MAX(Fecha_Pendiente)
	,User_Pendiente = MAX(User_Pendiente)

	--Contrato Firmado
	,Estado_ContratoFirmado = MAX(Estado_ContratoFirmado)
	,Observaciones_ContratoFirmado = MAX(Observaciones_ContratoFirmado)
	,Fecha_ContratoFirmado = MAX(Fecha_ContratoFirmado)
	,User_ContratoFirmado = MAX(User_ContratoFirmado)

	--Candidato No Firma el Contrato
	,Estado_CandidatoNoFirmaContrato = MAX(Estado_CandidatoNoFirmaContrato)
	,Observaciones_CandidatoNoFirmaContrato = MAX(Observaciones_CandidatoNoFirmaContrato)
	,Fecha_CandidatoNoFirmaContrato = MAX(Fecha_CandidatoNoFirmaContrato)
	,User_CandidatoNoFirmaContrato = MAX(User_CandidatoNoFirmaContrato)

	--Candidato Devuelto a Seleccion
	,Estado_DevueltoSeleccion = MAX(Estado_DevueltoSeleccion)
	,Observaciones_DevueltoSeleccion = MAX(Observaciones_DevueltoSeleccion)
	,Fecha_DevueltoSeleccion = MAX(Fecha_DevueltoSeleccion)
	,User_DevueltoSeleccion = MAX(User_DevueltoSeleccion)

	--Candidato Aplaza Firma del Contrato
	,Estado_CandidatoAplazaFirma = MAX(Estado_CandidatoAplazaFirma)
	,Observaciones_CandidatoAplazaFirma = MAX(Observaciones_CandidatoAplazaFirma)
	,Fecha_CandidatoAplazaFirma = MAX(Fecha_CandidatoAplazaFirma)
	,User_CandidatoAplazaFirma = MAX(User_CandidatoAplazaFirma)

	--Candidato Citado a Firma de Contrato
	,Estado_Citado = MAX(Estado_Citado)
	,Observaciones_Citado = MAX(Observaciones_Citado)
	,Fecha_Citado = MAX(Fecha_Citado)
	,User_Citado = MAX(User_Citado)

	--Cancelación del Contrato
	,Estado_CancelacionContrato = MAX(Estado_CancelacionContrato)
	,Observaciones_CancelacionContrato = MAX(Observaciones_CancelacionContrato)
	,Fecha_CancelacionContrato = MAX(Fecha_CancelacionContrato)
	,User_CancelacionContrato = MAX(User_CancelacionContrato)

	--Jefe Aplaza la Firma del Contrato
	,Estado_JefeAplazaFirma = MAX(Estado_JefeAplazaFirma)
	,Observaciones_JefeAplazaFirma = MAX(Observaciones_JefeAplazaFirma)
	,Fecha_JefeAplazaFirma = MAX(Fecha_JefeAplazaFirma)
	,User_JefeAplazaFirma = MAX(User_JefeAplazaFirma)

	--Esquema de Remuneración Variable no Autorizado 
	,Estado_EsquemaNoAutorizado = MAX(Estado_EsquemaNoAutorizado)
	,Observaciones_EsquemaNoAutorizado = MAX(Observaciones_EsquemaNoAutorizado)
	,Fecha_EsquemaNoAutorizado = MAX(Fecha_EsquemaNoAutorizado)
	,User_EsquemaNoAutorizado = MAX(User_EsquemaNoAutorizado)

FROM
(
	SELECT IdSolicitud	,CedulaCandidato
		,CASE WHEN IdEstadoNomina = 1 THEN IdEstadoNomina ELSE NULL END Estado_Pendiente
		,CASE WHEN IdEstadoNomina = 2 THEN IdEstadoNomina ELSE NULL END Estado_ContratoFirmado
		,CASE WHEN IdEstadoNomina = 3 THEN IdEstadoNomina ELSE NULL END Estado_CandidatoNoFirmaContrato
		,CASE WHEN IdEstadoNomina = 4 THEN IdEstadoNomina ELSE NULL END Estado_DevueltoSeleccion
		,CASE WHEN IdEstadoNomina = 5 THEN IdEstadoNomina ELSE NULL END Estado_CandidatoAplazaFirma
		,CASE WHEN IdEstadoNomina = 6 THEN IdEstadoNomina ELSE NULL END Estado_Citado
		,CASE WHEN IdEstadoNomina = 7 THEN IdEstadoNomina ELSE NULL END Estado_CancelacionContrato
		,CASE WHEN IdEstadoNomina = 8 THEN IdEstadoNomina ELSE NULL END Estado_JefeAplazaFirma
		,CASE WHEN IdEstadoNomina = 9 THEN IdEstadoNomina ELSE NULL END Estado_EsquemaNoAutorizado

		,CASE WHEN IdEstadoNomina = 1 THEN Observaciones ELSE NULL END Observaciones_Pendiente
		,CASE WHEN IdEstadoNomina = 2 THEN Observaciones ELSE NULL END Observaciones_ContratoFirmado
		,CASE WHEN IdEstadoNomina = 3 THEN Observaciones ELSE NULL END Observaciones_CandidatoNoFirmaContrato
		,CASE WHEN IdEstadoNomina = 4 THEN Observaciones ELSE NULL END Observaciones_DevueltoSeleccion
		,CASE WHEN IdEstadoNomina = 5 THEN Observaciones ELSE NULL END Observaciones_CandidatoAplazaFirma
		,CASE WHEN IdEstadoNomina = 6 THEN Observaciones ELSE NULL END Observaciones_Citado
		,CASE WHEN IdEstadoNomina = 7 THEN Observaciones ELSE NULL END Observaciones_CancelacionContrato
		,CASE WHEN IdEstadoNomina = 8 THEN Observaciones ELSE NULL END Observaciones_JefeAplazaFirma
		,CASE WHEN IdEstadoNomina = 9 THEN Observaciones ELSE NULL END Observaciones_EsquemaNoAutorizado

		,CASE WHEN IdEstadoNomina = 1 THEN FechaModificacion ELSE NULL END Fecha_Pendiente
		,CASE WHEN IdEstadoNomina = 2 THEN FechaModificacion ELSE NULL END Fecha_ContratoFirmado
		,CASE WHEN IdEstadoNomina = 3 THEN FechaModificacion ELSE NULL END Fecha_CandidatoNoFirmaContrato
		,CASE WHEN IdEstadoNomina = 4 THEN FechaModificacion ELSE NULL END Fecha_DevueltoSeleccion
		,CASE WHEN IdEstadoNomina = 5 THEN FechaModificacion ELSE NULL END Fecha_CandidatoAplazaFirma
		,CASE WHEN IdEstadoNomina = 6 THEN FechaModificacion ELSE NULL END Fecha_Citado
		,CASE WHEN IdEstadoNomina = 7 THEN FechaModificacion ELSE NULL END Fecha_CancelacionContrato
		,CASE WHEN IdEstadoNomina = 8 THEN FechaModificacion ELSE NULL END Fecha_JefeAplazaFirma
		,CASE WHEN IdEstadoNomina = 9 THEN FechaModificacion ELSE NULL END Fecha_EsquemaNoAutorizado

		,CASE WHEN IdEstadoNomina = 1 THEN UserModifico ELSE NULL END User_Pendiente
		,CASE WHEN IdEstadoNomina = 2 THEN UserModifico ELSE NULL END User_ContratoFirmado
		,CASE WHEN IdEstadoNomina = 3 THEN UserModifico ELSE NULL END User_CandidatoNoFirmaContrato
		,CASE WHEN IdEstadoNomina = 4 THEN UserModifico ELSE NULL END User_DevueltoSeleccion
		,CASE WHEN IdEstadoNomina = 5 THEN UserModifico ELSE NULL END User_CandidatoAplazaFirma
		,CASE WHEN IdEstadoNomina = 6 THEN UserModifico ELSE NULL END User_Citado
		,CASE WHEN IdEstadoNomina = 7 THEN UserModifico ELSE NULL END User_CancelacionContrato
		,CASE WHEN IdEstadoNomina = 8 THEN UserModifico ELSE NULL END User_JefeAplazaFirma
		,CASE WHEN IdEstadoNomina = 9 THEN UserModifico ELSE NULL END User_EsquemaNoAutorizado

	FROM Requisiciones_HistoricoNomina
) A
GROUP BY IdSolicitud, CedulaCandidato

```
