# View: vw_Seedz_id_Terceros

## Usa los objetos:
- [[spiga_ContabilidadMovimientos]]
- [[vw_TercerosUltimaFechaActualizacion]]

```sql
CREATE VIEW [dbo].[vw_Seedz_id_Terceros]  AS
SELECT DISTINCT id=CONVERT(INT,cod)
  FROM(
	 SELECT cod=a.CodigoTercero 
	 FROM [PSCService_DB].dbo.spiga_ContabilidadMovimientos a					  
	 LEFT JOIN vw_TercerosUltimaFechaActualizacion b ON b.PkTerceros=a.CodigoTercero
	 WHERE a.TipoFactura='E' AND a.IdEmpresas = 1 AND a.NombreCentro LIKE 'JD%' AND a.CodigoTercero IS NOT NULL  
   )b 
```
