# View: vw_ItemSinIva

## Usa los objetos:
- [[spiga_ItemsSinIva]]

```sql
CREATE view [dbo].[vw_ItemSinIva] as 
SELECT isnull(ROW_NUMBER() OVER (ORDER BY PkFkEmpresas, Pkfkañofactura), 0) AS Row, PkFkEmpresas,Pkfkañofactura,MONTH(FechaAlbaran) as MesPeriodo,FkCentros, PkFkSeries, PkFkNumFactura,FechaAlbaran, FkMR, FkReferencias, Unidades,PrecioUnidad, PorcDto, 
SUM(Unidades*PrecioUnidad) AS Subtotal
FROM  [PSCService_DB].[dbo].[spiga_ItemsSinIva]
GROUP BY FkCentros,PkFkSeries, PkFkNumFactura,FechaAlbaran, FkMr,FkReferencias, Unidades,PrecioUnidad, PorcDto,PkFkEmpresas,Pkfkañofactura


```
