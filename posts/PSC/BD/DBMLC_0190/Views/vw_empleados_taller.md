# View: vw_empleados_taller

## Usa los objetos:
- [[v_EmpleadosActivosRetirados]]

```sql
CREATE view [dbo].[vw_empleados_taller] as
select  distinct CodigoEmpleado=rtrim(ltrim(CodigoEmpleado)),codigo_departamento,Ano_Periodo,Mes_Periodo
from v_EmpleadosActivosRetirados


```
