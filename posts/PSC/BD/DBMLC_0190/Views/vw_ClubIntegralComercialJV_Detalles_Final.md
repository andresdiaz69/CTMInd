# View: vw_ClubIntegralComercialJV_Detalles_Final

## Usa los objetos:
- [[ClubIntegralComercialAC_Creditos_Detalles_Final]]
- [[v_ClubIntegral_empleados]]
- [[vw_ClubIntegralRangoMaestrasVersionMax]]

```sql

create view [dbo].[vw_ClubIntegralComercialJV_Detalles_Final] as

select a.Ano_Periodo,e.CodigoEmpleado,e.nombres,e.CodigoMarcaGrupo,e.MarcaGrupo,a.CodigoCentro,a.NombreCentro,a.Trimestre,a.VehiculosRecaudados
,BANCOLOMBIA,BBVA,DAVIVIENDA,FINANDINA,FINANZAUTO,NO_AUTORIZADAS,OCCIDENTE,RCI,AUTORIZADAS,TotalCreditos
,v.IdRangoMaestra,v.IdRangoVersionMax
from 
(
select distinct  d.Ano_Periodo,d.CodigoCentro,d.NombreCentro,d.Trimestre,d.VehiculosRecaudados
,sum(d.BANCOLOMBIA)BANCOLOMBIA,sum(d.BBVA)BBVA,sum(d.DAVIVIENDA)DAVIVIENDA,sum(d.FINANDINA)FINANDINA,sum(d.FINANZAUTO)FINANZAUTO,sum(d.NO_AUTORIZADAS)NO_AUTORIZADAS,sum(d.OCCIDENTE)OCCIDENTE,sum(d.RCI)RCI,sum(d.AUTORIZADAS)AUTORIZADAS,sum(d.TotalCreditos)TotalCreditos
from ClubIntegralComercialAC_Creditos_Detalles_Final D
group by  d.Ano_Periodo,d.CodigoCentro,d.NombreCentro,d.Trimestre,d.VehiculosRecaudados
)a
left join v_ClubIntegral_empleados e on a.CodigoCentro = e.CodigoCentro
left join vw_ClubIntegralRangoMaestrasVersionMax v on e.CodigoEmpleado = v.CodigoEmpleado
where e.IdCLubIntegralModeloSub = '3'


```
