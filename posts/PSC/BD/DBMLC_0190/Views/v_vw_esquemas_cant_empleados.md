# View: v_vw_esquemas_cant_empleados

## Usa los objetos:
- [[vw_EmpleadosRangosMaestras]]

```sql
create view v_vw_esquemas_cant_empleados as
select cantidad = count(CodigoEmpleado)
from(
		select distinct CodigoEmpleado
		from(
				select * 
				from vw_EmpleadosRangosMaestras
				where FechaRetiro is null
				and IdRangoMaestra is not null
		)a
)b
```
