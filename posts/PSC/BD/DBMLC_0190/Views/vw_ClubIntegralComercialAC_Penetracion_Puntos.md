# View: vw_ClubIntegralComercialAC_Penetracion_Puntos

## Usa los objetos:
- [[ClubIntegralComercialAC_Creditos_Detalles]]
- [[vw_ClubIntegralRangoMaestrasVersionMax]]
- [[vw_ClubIntegralRangosMaestrasFull]]

```sql
CREATE view [dbo].[vw_ClubIntegralComercialAC_Penetracion_Puntos] as 
select e.*,mf.Puntos as PuntosPenetracion
from 
(
	select d.*,v.IdRangoMaestra,v.IdRangoVersionMax
	from ClubIntegralComercialAC_Creditos_Detalles d
	left join vw_ClubIntegralRangoMaestrasVersionMax v on d.CedulaVendedor = v.CodigoEmpleado
	where v.IdRangoMaestra = '1'
)e
left join vw_ClubIntegralRangosMaestrasFull mf
on e.IdRangoVersionMax = mf.IdRangoVersion
where (mf.Desde < e.Penetracion) and (mf.Hasta >= e.Penetracion) 

```
