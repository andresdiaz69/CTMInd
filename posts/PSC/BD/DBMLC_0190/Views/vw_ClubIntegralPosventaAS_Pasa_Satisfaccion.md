# View: vw_ClubIntegralPosventaAS_Pasa_Satisfaccion

## Usa los objetos:
- [[ClubIntegralAsesorDeServicio]]
- [[v_ClubIntegral_empleados]]
- [[vw_ClubIntegralPosventaAS_Ticket]]
- [[vw_ClubIntegralRangoMaestrasVersionMax]]

```sql
CREATE VIEW [dbo].[vw_ClubIntegralPosventaAS_Pasa_Satisfaccion] AS


select s.CodigoEmpleado,e.nombres,s.IdCLubIntegralModeloSub,s.Ano,s.Trimestre,s.CodigoMarca,s.Satisfaccion,vm.IdRangoMaestra,vm.IdRangoVersionMax
,t.Resultado
from ClubIntegralAsesorDeServicio s
left join v_ClubIntegral_empleados e on s.CodigoEmpleado = e.CodigoEmpleado 
left join vw_ClubIntegralRangoMaestrasVersionMax vm on s.CodigoEmpleado = vm.CodigoEmpleado
left join vw_ClubIntegralPosventaAS_Ticket t on s.CodigoEmpleado = t.CodigoEmpleado and s.Ano = t.Ano and s.Trimestre = t.Trimestre
where IdRangoMaestra ='26'



```
