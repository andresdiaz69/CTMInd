# View: vw_ClubIntegralComercialF_I_Participacion_otras_fin_Puntos

## Usa los objetos:
- [[vw_ClubIntegralComercialF_I_NumeroCreditos]]
- [[vw_ClubIntegralRangosMaestrasFull]]

```sql

CREATE view [dbo].[vw_ClubIntegralComercialF_I_Participacion_otras_fin_Puntos] as 

select  b.*,mf.Puntos

from 
(
	SELECT t.*
	,case when t.TotalCreditos <> 0 then convert(decimal(5,2),t.NO_AUTORIZADAS) / convert(decimal(5,2),t.TotalCreditos)*100 else 0 end as Participacion_otras_fin
	FROM vw_ClubIntegralComercialF_I_NumeroCreditos t
	where  t.IdRangoMaestra='8'
)b
left join vw_ClubIntegralRangosMaestrasFull mf on b.IdRangoVersionMax = mf.IdRangoVersion
where (mf.Desde < b.Participacion_otras_fin) and (mf.Hasta >= b.Participacion_otras_fin)

```
