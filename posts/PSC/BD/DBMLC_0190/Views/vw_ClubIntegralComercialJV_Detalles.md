# View: vw_ClubIntegralComercialJV_Detalles

## Usa los objetos:
- [[ClubIntegralComercialCentros_Detalles]]
- [[v_ClubIntegral_empleados]]
- [[vw_ClubIntegralRangoMaestrasVersionMax]]

```sql
CREATE VIEW [dbo].[vw_ClubIntegralComercialJV_Detalles] as
SELECT d.Ano_Periodo,e.CodigoEmpleado,e.nombres
,e.CodigoMarcaGrupo,e.MarcaGrupo
,d.CodigoCentro,d.NombreCentro,d.Trimestre,sum(d.VehiculosRecaudados)VehiculosRecaudados
,sum(d.BANCO_DE_BOGOTA)BANCO_DE_BOGOTA,sum(d.BBVA)BBVA,sum(d.FINANZAUTO)FINANZAUTO,sum(d.DAVIVIENDA)DAVIVIENDA,sum(d.FINANDINA)FINANDINA,sum(d.OCCIDENTE)OCCIDENTE,sum(d.BANCOLOMBIA)BANCOLOMBIA,sum(d.RCI)RCI,sum(d.AUTORIZADAS)AUTORIZADAS,sum(d.NO_AUTORIZADAS)NO_AUTORIZADAS,sum(d.TotalCreditos)TotalCreditos
,v.IdRangoMaestra,v.IdRangoVersionMax
FROM ClubIntegralComercialCentros_Detalles d
left join v_ClubIntegral_empleados e on d.CodigoCentro = e.CodigoCentro
left join vw_ClubIntegralRangoMaestrasVersionMax v on e.CodigoEmpleado = v.CodigoEmpleado
where e.IdClubIntegralModeloSub='3'
group by d.Ano_Periodo,d.CodigoCentro,d.NombreCentro,d.Trimestre,e.CodigoEmpleado,e.nombres
,e.CodigoMarcaGrupo,e.MarcaGrupo,v.IdRangoMaestra,v.IdRangoVersionMax

```
