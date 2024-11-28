# View: vw_Viaticos_ArchivosLegalizacion

## Usa los objetos:
- [[Viaticos_EnvioArchivos]]
- [[Viaticos_Solicitudes]]

```sql

CREATE VIEW [dbo].[vw_Viaticos_ArchivosLegalizacion]
AS
SELECT A.Id,						A.IdEstado,				b.ArchivoContabilizacion, 
	   b.ArchivoGastosViaje,		b.FechaEnvTesoreria,	b.FechaEnvNovedades,
	   b.FechaEnvLegalizacion
  FROM Viaticos_Solicitudes A
  LEFT JOIN Viaticos_EnvioArchivos B ON A.Id = b.IdSolicitud
 WHERE A.IdEstado				= 13 
   AND ArchivoContabilizacion	= 1
   AND ArchivoGastosViaje		= 1

```
