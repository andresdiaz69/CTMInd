# View: vw_ClubIntegralRepuestosCartera_CalculoPuntos

## Usa los objetos:
- [[vw_ClubIntegralRepuestos_Cartera]]

```sql
create view [dbo].[vw_ClubIntegralRepuestosCartera_CalculoPuntos] as
select ca.CodigoCentro,ca.NombreCentro,ca.Trimestre,ca.Rango,ca.TotalFacturas
,case	when Rango ='31 > 9999' then 0 
		when Rango ='16 - 30' then 120 
		when Rango ='0 - 15' then 180
else  0
end as puntos
from vw_ClubIntegralRepuestos_Cartera ca

```
