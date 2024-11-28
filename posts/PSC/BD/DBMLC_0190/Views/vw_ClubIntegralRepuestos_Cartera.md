# View: vw_ClubIntegralRepuestos_Cartera

## Usa los objetos:
- [[ClubIntegralCarteraRepuestosSede]]

```sql

CREATE view [dbo].[vw_ClubIntegralRepuestos_Cartera] as


select ct.CodigoCentro,ct.NombreCentro,ct.Trimestre,c.Rango,ct.TotalFacturas
from (
select CodigoCentro,NombreCentro,Trimestre,max(TotalFacturas)TotalFacturas
from ClubIntegralCarteraRepuestosSede ct
group by CodigoCentro,NombreCentro,Trimestre
)ct
left join  ClubIntegralCarteraRepuestosSede   c on ct.CodigoCentro = c.CodigoCentro and ct.Trimestre = c.Trimestre and ct.TotalFacturas = c.TotalFacturas


```
