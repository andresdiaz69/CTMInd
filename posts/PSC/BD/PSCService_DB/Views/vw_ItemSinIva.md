# View: vw_ItemSinIva

## Usa los objetos:
- [[FacturaDetalles]]

```sql





CREATE view [dbo].[vw_ItemSinIva] as
SELECT  PkFkEmpresas,Pkfkañofactura,MONTH(FechaAlbaran) as MesPeriodo,FkCentros, PkFkSeries, PkFkNumFactura,FechaAlbaran, FkMR, FkReferencias, Unidades,PrecioUnidad, PorcDto, 
SUM(Unidades*PrecioUnidad) AS Subtotal
FROM [192.168.90.10\SPIGAPLUS].[DMS00280].RE.FacturaDetalles
WHERE IvaPorc = 0 

--and PkFkAñoFactura  = '2020' 
--and PkFkEmpresas = 6 

--AND MONTH(FechaAlbaran) IN (6)
GROUP BY FkCentros,PkFkSeries, PkFkNumFactura,FechaAlbaran, FkMr,FkReferencias, Unidades,PrecioUnidad, PorcDto,PkFkEmpresas,Pkfkañofactura,IvaPorc
--ORDER BY  PkFkSeries, PkFkNumFactura,FechaAlbaran


```
