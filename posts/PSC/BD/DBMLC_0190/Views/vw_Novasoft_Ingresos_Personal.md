# View: vw_Novasoft_Ingresos_Personal

## Usa los objetos:
- [[EmpleadosActivos]]
- [[EmpleadosRetirados]]

```sql
CREATE view [dbo].[vw_Novasoft_Ingresos_Personal] as
select CodigoEmpleado,Nombres,Apellido1,Apellido2,Codigo_Cargo,Nombre_Cargo,Fecha_Ingreso,
CodigoMarca,Marca,codigo_centro,nombre_centro,codigo_seccion,nombre_seccion,Codigo_Sucursal,Nombre_Sucursal,
codigo_departamento,nombre_departamento,email,Email_Corporativo,Celular,Telefono_fijo
from(
		select distinct CodigoEmpleado,Nombres,Apellido1,Apellido2,Codigo_Cargo,Nombre_Cargo,Fecha_Ingreso,
		CodigoMarca,Marca,codigo_centro,nombre_centro,codigo_seccion,nombre_seccion,Codigo_Sucursal,Nombre_Sucursal,
		codigo_departamento,nombre_departamento,email,Email_Corporativo,Celular,Telefono_fijo
		from EmpleadosActivos
		where Ano_Periodo = year(getdate())
		and mes_periodo = month(getdate())
		--and fecha_ingreso >= '20210101'
		--and Fecha_Ingreso <= '20210831'
		--order by CodigoEmpleado

		union all

		select distinct CodigoEmpleado,Nombres,Apellido1,Apellido2,Codigo_Cargo,Nombre_Cargo,Fecha_Ingreso,
		CodigoMarca,Marca,codigo_centro,nombre_centro,codigo_seccion,nombre_seccion,Codigo_Sucursal,Nombre_Sucursal,
		codigo_departamento,nombre_departamento,email,Email_Corporativo='',Celular='',Telefono_fijo=''
		from EmpleadosRetirados
		--where fecha_ingreso >= '20210101'
		--and Fecha_Ingreso <= '20210831'
		--order by CodigoEmpleado
)a
```
