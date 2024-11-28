# View: vw_ClubIntegralRangoMaestrasVersionMax

## Usa los objetos:
- [[vw_ClubIntegralModelosSub_Empleados]]
- [[vw_ClubIntegralRangosVersionesMax]]

```sql
CREATE view [dbo].[vw_ClubIntegralRangoMaestrasVersionMax] as
select distinct me.CodigoEmpleado,me.NombreEmpleado,me.IdRangoMaestra,me.NombreMaestra,vm.IdRangoVersionMax
from vw_ClubIntegralModelosSub_Empleados me
left join vw_ClubIntegralRangosVersionesMax vm on me.IdRangoMaestra = vm.IdRangoMaestra
--where me.IdRangoMaestra = 5 and codigoempleado ='79972683'

```
