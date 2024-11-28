# View: vw_ClubIntegralComercialF_I_Detalles

## Usa los objetos:
- [[ClubIntegralComercialCentros_Detalles]]
- [[vw_ClubIntegralComercialF_I_Ejecutivos]]
- [[vw_ClubIntegralRangoMaestrasVersionMax]]

```sql
CREATE VIEW [dbo].[vw_ClubIntegralComercialF_I_Detalles] as

SELECT  t.Ano_periodo,eje.CodigoEmpleado,eje.Nombres,t.CodigoCentro,t.NombreCentro,t.Trimestre
,sum(t.[VehiculosRecaudados])VehiculosRecaudados,sum(t.[BANCO_DE_BOGOTA])'BANCO_DE_BOGOTA',sum(t.[BBVA])BBVA
,sum(t.[FINANZAUTO])FINANZAUTO,sum(t.[DAVIVIENDA])DAVIVIENDA,sum(t.[FINANDINA])FINANDINA
,sum(t.[OCCIDENTE])OCCIDENTE,sum(t.[BANCOLOMBIA])BANCOLOMBIA,sum(t.[RCI])RCI
,sum(t.[AUTORIZADAS])AUTORIZADAS,sum(t.[NO_AUTORIZADAS])NO_AUTORIZADAS,sum(t.[TotalCreditos])TotalCreditos
,v.IdRangoMaestra,v.IdRangoVersionMax
FROM ClubIntegralComercialCentros_Detalles t
left join vw_ClubIntegralComercialF_I_Ejecutivos eje on t.CodigoCentro = eje.CodigoCentro
left join vw_ClubIntegralRangoMaestrasVersionMax v on eje.CodigoEmpleado = v.CodigoEmpleado
where eje.CodigoEmpleado is not null
group by t.Ano_periodo,eje.CodigoEmpleado,eje.Nombres,t.CodigoCentro,t.NombreCentro,t.Trimestre,v.IdRangoMaestra,v.IdRangoVersionMax

```
