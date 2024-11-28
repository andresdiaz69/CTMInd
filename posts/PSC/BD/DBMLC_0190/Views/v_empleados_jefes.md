# View: v_empleados_jefes

## Usa los objetos:
- [[EmpleadosActivos]]
- [[Jerarquia_EmpleadosNoNomina]]
- [[Jerarquia_EmpleadosNoNomina_Info]]
- [[JerarquiaEmpleados]]

```sql
CREATE view [dbo].[v_empleados_jefes] as
select Cedula_Empleado,Nombre_Empleado,Nombre_Unidad_Negocio,Nombre_Marca,Nombre_Centro,Nombre_Seccion,Nombre_Cargo,
Jefe_1  = case when Jefe_1 is not null and Nombre_Jefe_1 is null then 'VACANTE' + ' '  +convert(varchar,Jefe_1) else convert(varchar,Jefe_1) end,
Nombre_Jefe_1,nombre_unidad_negocio_Jefe1,Nombre_Marca_Jefe1,nombre_centro_Jefe1,nombre_seccion_Jefe1,nombre_cargo_Jefe1,
Jefe_2  = case when Jefe_2 is not null and Nombre_Jefe_2 is null then 'VACANTE' + ' '  +convert(varchar,Jefe_2) else convert(varchar,Jefe_2) end, 
Nombre_Jefe_2,nombre_unidad_negocio_Jefe2,Nombre_Marca_Jefe2,nombre_centro_Jefe2,nombre_seccion_Jefe2,nombre_cargo_Jefe2,
Jefe_3  = case when Jefe_3 is not null and Nombre_Jefe_3 is null then 'VACANTE' + ' '  +convert(varchar,Jefe_3) else convert(varchar,Jefe_3) end, 
Nombre_Jefe_3,nombre_unidad_negocio_Jefe3,Nombre_Marca_Jefe3,nombre_centro_Jefe3,nombre_seccion_Jefe3,nombre_cargo_Jefe3,
Jefe_4  = case when Jefe_4 is not null and Nombre_Jefe_4 is null then 'VACANTE' + ' '  +convert(varchar,Jefe_4) else convert(varchar,Jefe_4) end, 
Nombre_Jefe_4,nombre_unidad_negocio_Jefe4,Nombre_Marca_Jefe4,nombre_centro_Jefe4,nombre_seccion_Jefe4,nombre_cargo_Jefe4
from(
		select  Cedula_Empleado=j.cedula,
		Nombre_Empleado=replace(replace(replace(replace(replace(replace(j.nombre,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
		nombre_unidad_negocio=isnull(a.nombre_unidad_negocio,ie.Unidadnegocio),
		Nombre_Marca=isnull(a.marca,ie.Marca),
		nombre_centro=isnull(a.nombre_centro,ie.Centro),
		nombre_seccion=isnull(a.nombre_seccion,ie.seccion),
		nombre_cargo=isnull(a.nombre_cargo,ie.CArgo),
		
		Jefe_1=J.CC_Jefe1,Nombre_Jefe_1=isnull(n1.nombre,a1.nombres + ' ' + a1.apellido1 + ' ' +  a1.apellido2),
		nombre_unidad_negocio_Jefe1=isnull(i1.unidadnegocio,a1.nombre_unidad_negocio),
		Nombre_Marca_Jefe1=isnull(i1.Marca,a1.marca),
		nombre_centro_Jefe1=isnull(i1.centro,a1.nombre_centro),
		nombre_seccion_Jefe1=isnull(i1.Seccion,a1.nombre_seccion),
		nombre_cargo_Jefe1=isnull(i1.cargo,a1.nombre_cargo),
				
		Jefe_2=J.CC_Jefe2,Nombre_Jefe_2=isnull(n2.nombre,a2.nombres + ' ' + a2.apellido1 + ' ' +  a2.apellido2),
		nombre_unidad_negocio_Jefe2=isnull(i2.unidadnegocio,a2.nombre_unidad_negocio),
		Nombre_Marca_Jefe2=isnull(i2.Marca,a2.marca),
		nombre_centro_Jefe2=isnull(i2.Centro,a2.nombre_centro),
		nombre_seccion_Jefe2=isnull(i2.seccion,a2.nombre_seccion),
		nombre_cargo_Jefe2=isnull(i2.cargo,a2.nombre_cargo),
					
		Jefe_3=J.CC_Jefe3,Nombre_Jefe_3=isnull(n3.nombre,a3.nombres + ' ' + a3.apellido1 + ' ' +  a3.apellido2),
		nombre_unidad_negocio_Jefe3=isnull(i3.unidadnegocio,a3.nombre_unidad_negocio),
		Nombre_Marca_Jefe3=isnull(i3.Marca,a3.marca),
		nombre_centro_Jefe3=isnull(i3.Centro,a3.nombre_centro),
		Nombre_Seccion_Jefe3=isnull(i3.seccion,a3.nombre_seccion),
		nombre_cargo_Jefe3=isnull(i3.cargo,a3.nombre_cargo),
				
		Jefe_4=J.CC_Jefe4,Nombre_Jefe_4=isnull(n4.nombre,a4.nombres + ' ' + a4.apellido1 + ' ' +  a4.apellido2),
		nombre_unidad_negocio_Jefe4=isnull(i4.unidadnegocio,a4.nombre_unidad_negocio),
		Nombre_Marca_Jefe4=isnull(i4.marca,a4.marca),
		nombre_centro_Jefe4=isnull(i4.Centro,a4.nombre_centro),
		Nombre_seccion_Jefe4=isnull(i4.seccion,a4.nombre_seccion),
		nombre_cargo_Jefe4=isnull(i4.cargo,a4.nombre_cargo)
		
		from JerarquiaEmpleados		j
		left join empleadosactivos	a	on	j.cedula = a.codigoempleado				and a.ano_periodo = year(getdate())
																					and a.mes_periodo = month(getdate())		
		
		left join empleadosactivos	a1	on	J.CC_Jefe1 = a1.codigoempleado
																					and a1.ano_periodo = year(getdate())
																					and a1.mes_periodo = month(getdate())
		left join Jerarquia_EmpleadosNoNomina n1	on	convert(varchar,J.CC_Jefe1) = convert(varchar,n1.cedula) and n1.estado = 1
		left join Jerarquia_EmpleadosNoNomina_Info i1	on convert(varchar,J.CC_Jefe1) = convert(varchar, i1.cedula)
		left join Jerarquia_EmpleadosNoNomina_Info ie	on convert(varchar,J.cedula) = convert(varchar, ie.cedula)


		left join empleadosactivos	a2	on	J.CC_Jefe2 = a2.codigoempleado			and a2.ano_periodo = year(getdate())
																					and a2.mes_periodo = month(getdate())
		left join Jerarquia_EmpleadosNoNomina n2	on	convert(varchar,J.CC_Jefe2) = convert(varchar,n2.cedula) and n2.estado = 1
		left join Jerarquia_EmpleadosNoNomina_Info i2	on convert(varchar,J.CC_Jefe2) = convert(varchar, i2.cedula)
		
		left join empleadosactivos	a3	on	J.CC_Jefe3 = a3.codigoempleado			and a3.ano_periodo = year(getdate())
																					and a3.mes_periodo = month(getdate())
		left join Jerarquia_EmpleadosNoNomina n3	on	convert(varchar,J.CC_Jefe3) = convert(varchar,n3.cedula) and n3.estado = 1
		left join Jerarquia_EmpleadosNoNomina_Info i3	on convert(varchar,J.CC_Jefe3) = convert(varchar, i3.cedula)

		left join empleadosactivos	a4	on	J.CC_Jefe4 = a4.codigoempleado			and a4.ano_periodo = year(getdate())
																					and a4.mes_periodo = month(getdate())
		left join Jerarquia_EmpleadosNoNomina n4	on	convert(varchar,J.CC_Jefe4) = convert(varchar,n4.cedula) and n4.estado = 1
		left join Jerarquia_EmpleadosNoNomina_Info i4	on convert(varchar,J.CC_Jefe4) = convert(varchar, i4.cedula)

		where (a.Nombre_Unidad_Negocio <>  'PENSIONADOS' or  a.Nombre_Unidad_Negocio is null)
		--and j.cedula in ('52972762')
)a
where nombre_unidad_negocio is not null and Jefe_1 is not null


```
