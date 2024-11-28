# View: vw_Seedz_Facturas

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[spiga_InformeFacturas]]

```sql
--DROP VIEW vw_Seedz_Facturas
CREATE VIEW [dbo].[vw_Seedz_Facturas] AS
SELECT NumeroFactura, SerieFactura, TotalFactura, NumFactura, AñoFactura, NifCifTercero 
FROM(
	SELECT DISTINCT a.NumeroFactura, b.SerieFactura, b.TotalFactura , b.NumFactura, b.AñoFactura, b.NifCifTercero 
	FROM [DBMLC_0190].dbo.ComisionesSpigaAlmacenAlbaran a
	LEFT JOIN(
				SELECT NifCifTercero, SerieFactura, TotalFactura=BaseImponible, NumFactura, AñoFactura, 
				fact=convert(varchar, SerieFactura) + '\' + convert(varchar, NumFactura) + '\' + convert(varchar, AñoFactura) 
				from [PSCService_DB].dbo.spiga_InformeFacturas) b 
	ON a.NumeroFactura=fact
)a
	 

```
