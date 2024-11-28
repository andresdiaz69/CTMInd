# View: v_vw_esquemas_cant_cargos

## Usa los objetos:
- [[v_vw_esquemas_cant_cargos_empleados]]

```sql
create view v_vw_esquemas_cant_cargos as
select cantidad =count(CodigoCargo)
from(
	select distinct CodigoCargo
	from v_vw_esquemas_cant_cargos_empleados
) a
```
