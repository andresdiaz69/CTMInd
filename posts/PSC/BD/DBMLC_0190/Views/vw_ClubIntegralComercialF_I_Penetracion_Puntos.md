# View: vw_ClubIntegralComercialF_I_Penetracion_Puntos

## Usa los objetos:
- [[vw_ClubIntegralComercialF_I_NumeroCreditos]]
- [[vw_ClubIntegralRangosMaestrasFull]]

```sql

CREATE VIEW [dbo].[vw_ClubIntegralComercialF_I_Penetracion_Puntos] as 

select b.*,mf.Puntos
from 
(
	SELECT t.*
	,case when t.VehiculosRecaudados <> 0 then convert(decimal(5,2),t.TotalCreditos) / convert(decimal(5,2),t.VehiculosRecaudados)*100 else 0 end as Penetracion
	FROM vw_ClubIntegralComercialF_I_NumeroCreditos t
	where  t.IdRangoMaestra='6'
)b
left join vw_ClubIntegralRangosMaestrasFull mf on b.IdRangoVersionMax = mf.IdRangoVersion
where (mf.Desde < b.Penetracion) and (mf.Hasta >= b.Penetracion)

```
