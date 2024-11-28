# View: vw_ClubIntegralPosventaJT_Pasa_Productividad

## Usa los objetos:
- [[ClubIntegralJefeDeTallerPro_Ocu]]
- [[vw_ClubIntegralPosventaJT_Ticket]]
- [[vw_ClubIntegralRangoMaestrasVersionMax]]

```sql


CREATE view [dbo].[vw_ClubIntegralPosventaJT_Pasa_Productividad] as

select t.CodigoEmpleado,t.Nombres,t.CodigoCentro,t.NombreCentro,t.CodigoMarca,t.Marca,t.IdClubIntegralModeloSub,t.NombreModeloSub,t.Ano,t.Trimestre
,p.Productividad,vm.IdRangoMaestra,vm.IdRangoVersionMax
from vw_ClubIntegralPosventaJT_Ticket t
left join ClubIntegralJefeDeTallerPro_Ocu p on t.CodigoEmpleado = p.CodigoEmpleado and t.CodigoMarca = p.CodigoMarca and t.IdClubIntegralModeloSub = p.IdCLubIntegralModeloSub and t.Ano = p.Ano and t.Trimestre = p.Trimestre
left join vw_ClubIntegralRangoMaestrasVersionMax  vm	 on	p.CodigoEmpleado = vm.CodigoEmpleado
where IdRangoMaestra in ('43','50') and resultado ='pasa'

```
