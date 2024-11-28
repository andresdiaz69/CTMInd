# View: v_Requisiciones_Informe_EstadoCandidatos

## Usa los objetos:
- [[Requisiciones_HistoricoSolicitud]]
- [[v_Requisiciones_SolicitudesCandidatos]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_Informe_EstadoCandidatos] AS
SELECT DISTINCT a.num_solicitud,a.IdEstadoSolicitud,a.EstadoSolicitud,a.NombreCargo,a.IdEstadoCandidato,a.EstadoCandidato,
	a.Cedula,a.NombreCompleto,a.Telefono,a.Celular,a.Correo,a.Direccion,FechaFinalizacion=CONVERT(date,b.FechaModificacion)
FROM v_Requisiciones_SolicitudesCandidatos as a
LEFT JOIN Requisiciones_HistoricoSolicitud b ON a.num_solicitud = b.IdSolicitud AND a.IdEstadoSolicitud = b.IdEstado
WHERE TipoEstadoSolicitud = 'CERRADO'

```
