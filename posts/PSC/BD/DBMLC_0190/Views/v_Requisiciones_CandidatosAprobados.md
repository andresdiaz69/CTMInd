# View: v_Requisiciones_CandidatosAprobados

## Usa los objetos:
- [[Requisiciones_HistoricoCandidato]]
- [[v_Requisiciones_ConsultaSolicitudes]]
- [[v_Requisiciones_SolicitudesCandidatos]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_CandidatosAprobados] AS
SELECT DISTINCT b.IdEstadoCandidato, b.EstadoCandidato, b.Cedula, b.Nombres, Apellidos = b.Apellido1 + ' ' +  b.Apellido2, b.Num_solicitud, c.Estado, 
	c.NombreCargo, c.CargoCritico, b.Telefono, b.Celular, b.Correo, b.Direccion, a.FechaModificacion AS FechaProcesoNomina,
	CASE WHEN C.IdEstadoNomina = 9 AND (FechaCitacionFirmaContrato IS NOT NULL OR FechaCitacionFirmaContratoAplazada IS NOT NULL)
		THEN 'Si' WHEN c.IdEstadoNomina IN (5,6,8) THEN 'Si' ELSE 'No' END AS Citado
FROM	v_Requisiciones_SolicitudesCandidatos	AS b
LEFT JOIN v_Requisiciones_ConsultaSolicitudes	AS c ON b.num_solicitud = c.Numero_solicitud 
LEFT JOIN 
(
	SELECT DISTINCT CedulaCandidato, FechaModificacion = MIN(FechaModificacion)
	FROM Requisiciones_HistoricoCandidato
	WHERE IdEstadoCandidato = 4
	GROUP BY CedulaCandidato
) AS A ON A.CedulaCandidato = B.Cedula
WHERE IdEstadoCandidato = 4
AND c.estado = 3

```
