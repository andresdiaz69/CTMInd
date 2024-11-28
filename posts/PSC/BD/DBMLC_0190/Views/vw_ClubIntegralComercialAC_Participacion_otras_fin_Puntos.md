# View: vw_ClubIntegralComercialAC_Participacion_otras_fin_Puntos

## Usa los objetos:
- [[ClubIntegralComercialAC_Creditos_Detalles]]
- [[vw_ClubIntegralRangoMaestrasVersionMax]]
- [[vw_ClubIntegralRangosMaestrasFull]]

```sql
CREATE view [dbo].[vw_ClubIntegralComercialAC_Participacion_otras_fin_Puntos] as 

select a.* ,mf.Puntos as PuntosParticipacion_otras_fin
from 
(
	select d.*,v.IdRangoMaestra,v.IdRangoVersionMax
	from ClubIntegralComercialAC_Creditos_Detalles d
	left join vw_ClubIntegralRangoMaestrasVersionMax v on d.CedulaVendedor = v.CodigoEmpleado
	where v.IdRangoMaestra = '3'
)a
left join vw_ClubIntegralRangosMaestrasFull mf 
on a.IdRangoVersionMax = mf.IdRangoVersion
where (mf.Desde < a.Participacion_otras_fin) and (mf.Hasta >= a.Participacion_otras_fin) 

```
