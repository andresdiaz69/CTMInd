# View: v_vw_esquemas_cant_cargos_empleados

## Usa los objetos:
- [[EmpleadosActivos]]
- [[EmpleadosRangosMaestras_Historico]]
- [[vw_EmpleadosRangosMaestras]]

```sql
create view v_vw_esquemas_cant_cargos_empleados as
select *
from(
		select distinct m.CodigoEmpleado,--m.IdRangoMaestra,
		m.CodigoCargo,
		año=year(h.FechaModificacion),mes= month(h.FechaModificacion),
		cantidad= case when comentarios = 'CREAR' THEN 1 ELSE -1 END 
		from		vw_EmpleadosRangosMaestras			m
		left join	EmpleadosRangosMaestras_Historico	h	on	m.CodigoEmpleado = h.CodigoEmpleado
		join		EmpleadosActivos					e	on	h.CodigoEmpleado = e.CodigoEmpleado
																and year(h.FechaModificacion)=Ano_Periodo
																and  month(h.FechaModificacion)=Mes_Periodo
		where comentarios = 'crear'	
		and m.IdRangoMaestra = h.IdRangoMaestra
		and m.FechaRetiro is null
)a 

```
