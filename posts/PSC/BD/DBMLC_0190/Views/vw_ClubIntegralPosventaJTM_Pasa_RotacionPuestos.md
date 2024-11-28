# View: vw_ClubIntegralPosventaJTM_Pasa_RotacionPuestos

## Usa los objetos:
- [[ClubIntegralJefeDeTaller]]
- [[vw_ClubIntegralPosventaJT_Ticket]]
- [[vw_ClubIntegralRangoMaestrasVersionMax]]

```sql

CREATE VIEW [dbo].[vw_ClubIntegralPosventaJTM_Pasa_RotacionPuestos] AS


select r.CodigoEmpleado,t.Nombres,t.CodigoMarca,t.Marca,r.IdCLubIntegralModeloSub,t.NombreModeloSub,r.Ano,r.Trimestre,r.RotacionPuestos,vm.IdRangoMaestra,vm.IdRangoVersionMax
from ClubIntegralJefeDeTaller r 
left join vw_ClubIntegralPosventaJT_Ticket        t		 on	r.CodigoEmpleado = t.CodigoEmpleado	and r.Trimestre = t.Trimestre and r.Ano = t.Ano and r.IdCLubIntegralModeloSub = t.IdCLubIntegralModeloSub
left join vw_ClubIntegralRangoMaestrasVersionMax  vm	 on	r.CodigoEmpleado = vm.CodigoEmpleado
where vm.IdRangoMaestra ='36' and t.CodigoMarca='12' and Resultado='pasa'

union all

select r.CodigoEmpleado,t.Nombres,t.CodigoMarca,t.Marca,r.IdCLubIntegralModeloSub,t.NombreModeloSub,r.Ano,r.Trimestre,r.RotacionPuestos,vm.IdRangoMaestra,vm.IdRangoVersionMax
from ClubIntegralJefeDeTaller r 
left join vw_ClubIntegralPosventaJT_Ticket        t		 on	r.CodigoEmpleado = t.CodigoEmpleado	and r.Trimestre = t.Trimestre and r.Ano = t.Ano and r.IdCLubIntegralModeloSub = t.IdCLubIntegralModeloSub
left join vw_ClubIntegralRangoMaestrasVersionMax  vm	 on	r.CodigoEmpleado = vm.CodigoEmpleado
where vm.IdRangoMaestra='37' and t.CodigoMarca ='19' and Resultado='pasa'

union all

select r.CodigoEmpleado,t.Nombres,t.CodigoMarca,t.Marca,r.IdCLubIntegralModeloSub,t.NombreModeloSub,r.Ano,r.Trimestre,r.RotacionPuestos,vm.IdRangoMaestra,vm.IdRangoVersionMax
from ClubIntegralJefeDeTaller r 
left join vw_ClubIntegralPosventaJT_Ticket        t		 on	r.CodigoEmpleado = t.CodigoEmpleado	and r.Trimestre = t.Trimestre and r.Ano = t.Ano and r.IdCLubIntegralModeloSub = t.IdCLubIntegralModeloSub
left join vw_ClubIntegralRangoMaestrasVersionMax  vm	 on	r.CodigoEmpleado = vm.CodigoEmpleado
where vm.IdRangoMaestra='38' and t.CodigoMarca ='22' and Resultado='pasa'

union all

select r.CodigoEmpleado,t.Nombres,t.CodigoMarca,t.Marca,r.IdCLubIntegralModeloSub,t.NombreModeloSub,r.Ano,r.Trimestre,r.RotacionPuestos,vm.IdRangoMaestra,vm.IdRangoVersionMax
from ClubIntegralJefeDeTaller r 
left join vw_ClubIntegralPosventaJT_Ticket        t		 on	r.CodigoEmpleado = t.CodigoEmpleado	and r.Trimestre = t.Trimestre and r.Ano = t.Ano and r.IdCLubIntegralModeloSub = t.IdCLubIntegralModeloSub
left join vw_ClubIntegralRangoMaestrasVersionMax  vm	 on	r.CodigoEmpleado = vm.CodigoEmpleado
where vm.IdRangoMaestra='39' and t.CodigoMarca ='2' and Resultado='pasa'

union all

select r.CodigoEmpleado,t.Nombres,t.CodigoMarca,t.Marca,r.IdCLubIntegralModeloSub,t.NombreModeloSub,r.Ano,r.Trimestre,r.RotacionPuestos,vm.IdRangoMaestra,vm.IdRangoVersionMax
from ClubIntegralJefeDeTaller r 
left join vw_ClubIntegralPosventaJT_Ticket        t		 on	r.CodigoEmpleado = t.CodigoEmpleado	and r.Trimestre = t.Trimestre and r.Ano = t.Ano and r.IdCLubIntegralModeloSub = t.IdCLubIntegralModeloSub
left join vw_ClubIntegralRangoMaestrasVersionMax  vm	 on	r.CodigoEmpleado = vm.CodigoEmpleado
where vm.IdRangoMaestra='42' and t.CodigoMarca ='20' and Resultado='pasa'







```
