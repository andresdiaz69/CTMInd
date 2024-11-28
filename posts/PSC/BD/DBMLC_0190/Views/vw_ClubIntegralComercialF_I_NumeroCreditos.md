# View: vw_ClubIntegralComercialF_I_NumeroCreditos

## Usa los objetos:
- [[ClubIntegralComercialAC_Creditos_Detalles_Final]]
- [[vw_ClubIntegralRangoMaestrasVersionMax]]

```sql


create view [dbo].[vw_ClubIntegralComercialF_I_NumeroCreditos] as

SELECT eje.Ano_Periodo,eje.CodigoEmpleado,eje.Nombres,eje.CodigoCentro,eje.NombreCentro,eje.Trimestre,eje.VehiculosRecaudados
,[BANCOLOMBIA],[BBVA],[DAVIVIENDA],[FINANDINA],[FINANZAUTO],[NO_AUTORIZADAS],[OCCIDENTE],[RCI],[AUTORIZADAS],[TotalCreditos]
,v.IdRangoMaestra,v.IdRangoVersionMax
FROM ClubIntegralComercialAC_Creditos_Detalles_Final  eje
left join vw_ClubIntegralRangoMaestrasVersionMax v on eje.CodigoEmpleado = v.CodigoEmpleado


```
