# View: vw_spiga_InformeFacturas

## Usa los objetos:
- [[spiga_InformeFacturas]]

```sql


CREATE VIEW [dbo].[vw_spiga_InformeFacturas] AS
SELECT  

    s.IdSincronizacionSpiga,
	s.IdConsecutivo,
	s.FechaFactura,
	s.SerieFactura,
	s.NumFactura,
	s.AñoFactura,
	s.IdTerceroFactura,
	s.NifCifTercero,
	s.NombreTerceroFactura,
	s.Apellido1TerceroFactura,
	s.Apellido2TerceroFactura,
	s.IdTerceroPagador,
	s.NifCifTerceroPagador,
	s.NombreTerceroPagador,
	s.Apellido1TerceroPagador,
	s.Apellido2TerceroPagador,
	s.TotalFactura,
	s.ImportePendiente,
	s.ConceptoAsiento,
	s.NombreCentro
    

FROM [PSCService_DB].dbo.spiga_InformeFacturas s


```
