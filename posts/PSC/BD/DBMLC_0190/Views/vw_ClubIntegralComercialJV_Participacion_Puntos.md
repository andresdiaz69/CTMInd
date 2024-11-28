# View: vw_ClubIntegralComercialJV_Participacion_Puntos

## Usa los objetos:
- [[vw_ClubIntegralComercialJV_Detalles_Final]]
- [[vw_ClubIntegralRangosMaestrasFull]]

```sql

CREATE view [dbo].[vw_ClubIntegralComercialJV_Participacion_Puntos] as
 
select  b.Ano_periodo,b.CodigoEmpleado,b.Nombres,b.CodigoCentro,b.NombreCentro,b.Trimestre,b.VehiculosRecaudados
,b.BBVA,b.FINANZAUTO,b.DAVIVIENDA,b.FINANDINA,b.OCCIDENTE,b.BANCOLOMBIA,b.RCI,b.AUTORIZADAS,b.NO_AUTORIZADAS,b.TotalCreditos
,b.Participacion,mf.Puntos,b.IdRangoMaestra,b.IdRangoVersionMax
from 
(
	SELECT t.Ano_periodo,t.CodigoEmpleado,t.Nombres,t.CodigoCentro,t.NombreCentro,t.Trimestre
	,t.[VehiculosRecaudados],t.[BBVA],t.[FINANZAUTO],t.[DAVIVIENDA],t.[FINANDINA],t.[OCCIDENTE],t.[BANCOLOMBIA],t.[RCI]
	,t.[AUTORIZADAS],t.[NO_AUTORIZADAS],t.[TotalCreditos]
	,t.IdRangoMaestra,t.IdRangoVersionMax
	,case when t.TotalCreditos <> 0 then convert(decimal(5,2),t.AUTORIZADAS) / convert(decimal(5,2),t.TotalCreditos)*100 else 0 end as Participacion
	FROM vw_ClubIntegralComercialJV_Detalles_Final t
	where t.IdRangoMaestra='11'
)b
left join vw_ClubIntegralRangosMaestrasFull mf on b.IdRangoVersionMax = mf.IdRangoVersion
where (mf.Desde < b.Participacion) and (mf.Hasta >= b.Participacion)

```
