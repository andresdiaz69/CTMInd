# View: vw_ClubIntegralComercialJV_Retomas_Puntos

## Usa los objetos:
- [[vw_ClubIntegralComercialJV_Detalles_Final]]
- [[vw_ClubIntegralComercialJV_Retomas]]
- [[vw_ClubIntegralRangosMaestrasFull]]

```sql

CREATE VIEW [dbo].[vw_ClubIntegralComercialJV_Retomas_Puntos] as
select  b.Ano_periodo,b.CodigoEmpleado,b.Nombres,b.CodigoCentro,b.NombreCentro,b.Trimestre,b.VehiculosRecaudados
,b.BBVA,b.FINANZAUTO,b.DAVIVIENDA,b.FINANDINA,b.OCCIDENTE,b.BANCOLOMBIA,b.RCI,b.AUTORIZADAS,b.NO_AUTORIZADAS,b.TotalCreditos
,b.Retomas,b.PenetracionRetomas,mf.Puntos
,b.IdRangoMaestra,b.IdRangoVersionMax
from 
(
	SELECT distinct t.Ano_periodo,t.CodigoEmpleado,t.Nombres,t.CodigoCentro,t.NombreCentro,t.Trimestre
	,t.[VehiculosRecaudados],t.[BBVA],t.[FINANZAUTO],t.[DAVIVIENDA],t.[FINANDINA],t.[OCCIDENTE],t.[BANCOLOMBIA],t.[RCI]
	,t.[AUTORIZADAS],t.[NO_AUTORIZADAS],t.[TotalCreditos]
	,re.Retomas
	,case when t.VehiculosRecaudados <> 0 then convert(decimal(5,2),re.Retomas) / convert(decimal(5,2),t.VehiculosRecaudados)*100 else 0 end as PenetracionRetomas
	,t.IdRangoMaestra,t.IdRangoVersionMax
	FROM vw_ClubIntegralComercialJV_Detalles_Final t
	left join vw_ClubIntegralComercialJV_Retomas re
	on t.CodigoEmpleado = re.CodigoEmpleado and t.CodigoCentro = re.CodigoCentro and t.Trimestre = re.Trimestre and t.Ano_periodo = re.Ano
	where t.CodigoEmpleado is not null and t.IdRangoMaestra='13'
)b
left join vw_ClubIntegralRangosMaestrasFull mf on b.IdRangoVersionMax = mf.IdRangoVersion
where (mf.Desde < b.PenetracionRetomas) and (mf.Hasta >= b.PenetracionRetomas)

```
