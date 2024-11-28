# View: vw_ClubIntegralComercialF_I_Participacion_Puntos

## Usa los objetos:
- [[vw_ClubIntegralComercialF_I_NumeroCreditos]]
- [[vw_ClubIntegralRangosMaestrasFull]]

```sql

CREATE view [dbo].[vw_ClubIntegralComercialF_I_Participacion_Puntos] as
 
select  b.*,mf.Puntos
from 
(
	SELECT t.*
	,case when t.TotalCreditos <> 0 then convert(decimal(5,2),t.AUTORIZADAS) / convert(decimal(5,2),t.TotalCreditos)*100 else 0 end as Participacion
	FROM vw_ClubIntegralComercialF_I_NumeroCreditos t
	where t.IdRangoMaestra='7'
)b
left join vw_ClubIntegralRangosMaestrasFull mf on b.IdRangoVersionMax = mf.IdRangoVersion
where (mf.Desde < b.Participacion) and (mf.Hasta >= b.Participacion)

```
