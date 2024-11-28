# View: vw_ClubIntegralPosventaJT_Pasa_Ocupacion

## Usa los objetos:
- [[ClubIntegralJefeDeTallerPro_Ocu]]
- [[vw_ClubIntegralPosventaJT_Ticket]]
- [[vw_ClubIntegralRangoMaestrasVersionMax]]

```sql

CREATE view [dbo].[vw_ClubIntegralPosventaJT_Pasa_Ocupacion] as

select t.CodigoEmpleado,t.Nombres,t.CodigoCentro,t.NombreCentro,t.CodigoMarca,t.Marca,t.IdCLubIntegralModeloSub,t.NombreModeloSub,t.Ano,t.Trimestre
,o.Ocupacion,vm.IdRangoMaestra,vm.IdRangoVersionMax
from vw_ClubIntegralPosventaJT_Ticket t 
left join ClubIntegralJefeDeTallerPro_Ocu o on t.CodigoEmpleado = o.CodigoEmpleado and t.CodigoMarca= o.CodigoMarca and t.Ano = o.Ano and t.Trimestre = o.Trimestre
left join vw_ClubIntegralRangoMaestrasVersionMax  vm	 on	t.CodigoEmpleado = vm.CodigoEmpleado
where IdRangoMaestra in ('44','51') and t.resultado ='pasa'



```
