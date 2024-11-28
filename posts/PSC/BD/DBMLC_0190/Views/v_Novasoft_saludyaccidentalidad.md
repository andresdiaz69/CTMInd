# View: v_Novasoft_saludyaccidentalidad

## Usa los objetos:
- [[rhh_emplea]]
- [[rhh_tbfondos]]
- [[v_EmpleadosActivosRetirados]]

```sql


CREATE view [dbo].[v_Novasoft_saludyaccidentalidad] as
select distinct e.estado,cedula = CodigoEmpleado,Nombre = e.nombres + ' ' + e.Apellido1 + ' ' + e.Apellido2,e.Codigo_Cargo,e.Nombre_Cargo,
e.CodigoEmpresa,e.Empresa,e.CodigoMarca,e.Marca,e.codigo_centro,e.nombre_centro,e.codigo_seccion,e.nombre_seccion,e.codigo_departamento,
e.nombre_departamento,e.Codigo_Sucursal,e.Nombre_Sucursal,e.fecha_ingreso,e.Fecha_retiro,e.Codigo_Ciudad_trabajo,e.Nombre_Ciudad_trabajo,
n.fdo_PEN,Nombre_AFP=f.nom_fdo,n.fdo_sal,Nombre_EPS=t.nom_fdo,e.Fecha_Nacimiento,n.tel_cel,n.tel_res,n.dir_res,e.email
from		v_EmpleadosActivosRetirados				e
left join	[Novasoft_CT_MM].[dbo].[rhh_emplea]		n	on	e.CodigoEmpleado = n.cod_emp 
left join 	[Novasoft_CT_MM].[dbo].[rhh_tbfondos]	f	on	n.fdo_pen = f.cod_fdo											
left join 	[Novasoft_CT_MM].[dbo].[rhh_tbfondos]	t	on	n.fdo_sal = t.cod_fdo	
--where Ano_Periodo = 2019
--and Mes_Periodo = 3
--and CodigoEmpleado = '79578100'


```
