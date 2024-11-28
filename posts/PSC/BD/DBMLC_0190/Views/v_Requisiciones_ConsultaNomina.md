# View: v_Requisiciones_ConsultaNomina

## Usa los objetos:
- [[Requisiciones_Documentos]]
- [[Requisiciones_SolicitudesDocumentos]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_ConsultaNomina] AS
SELECT a.IdSolicitud, a.Cedula, a.IdDocumento, c.Documento, a.Archivo, a.Seleccionado, a.Observaciones 
FROM Requisiciones_SolicitudesDocumentos		AS a
LEFT JOIN Requisiciones_Documentos				AS c ON a.IdDocumento = c.IdDocumento

```
