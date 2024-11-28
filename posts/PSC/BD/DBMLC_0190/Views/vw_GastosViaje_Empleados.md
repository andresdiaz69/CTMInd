# View: vw_GastosViaje_Empleados

## Usa los objetos:
- [[EmpleadosActivos]]

```sql
create view vw_GastosViaje_Empleados as
select distinct s.CodigoEmpleado,s.Ano_Periodo,s.Mes_Periodo,Nombre = isnull(Nombres,'')+' '+ isnull(Apellido1,'')+ ' '+isnull( Apellido2,''),  
Marca,Nombre_Cargo,Unidad_Negocio,Nombre_Unidad_Negocio                           
from (	select a.CodigoEmpleado,   a.Ano_Periodo,  MAX(Mes_Periodo) Mes_Periodo
		from (select distinct max (Ano_Periodo) ano_periodo, CodigoEmpleado
              from EmpleadosActivos  (nolock)                      
              group by CodigoEmpleado
			) a inner join EmpleadosActivos b  on	a.codigoempleado = b.codigoempleado
													and a.ano_periodo    = b.ano_periodo
               group by a.CodigoEmpleado,  a.Ano_Periodo
) s inner join EmpleadosActivos (nolock)     c  on	s.codigoempleado = c.codigoempleado
													and s.ano_periodo    = c.ano_periodo
													and s.Mes_Periodo    = c.Mes_Periodo 
```
