# View: v_Organigramas

## Usa los objetos:
- [[Cargos]]
- [[EmpleadosActivos]]
- [[Jerarquia_EmpleadosNoNomina]]
- [[Jerarquia_EmpleadosNoNomina_Info]]
- [[v_empleados_jefes]]

```sql
CREATE view [dbo].[v_Organigramas] as
select  top 5000 [Full Name],Bio,EMail, Mobile,[Start Date], [Job Title],Birthday,[Reports to],[Group], [Location],[Deparments],Nombre_Cargo_generico,orden
from (
		select [Full Name] = ltrim(rtrim(REPLACE(REPLACE(REPLACE(a.Nombres, ' ', CHAR(8)+' '), ' '+CHAR(8), ''), CHAR(8)+' ', ' '))) + ' ' + RTRIM(LTRIM(a.Apellido1)) + ' ' + RTRIM(LTRIM(a.Apellido2)) , Bio=a.CodigoEmpleado,  
		EMail=a.Email_Corporativo, Mobile=  a.Celular,[Start Date]= convert(varchar,a.Fecha_Ingreso,103) , [Job Title]= a.Nombre_Cargo, 
		Birthday= convert(varchar,a.Fecha_Nacimiento,103),[Reports to] = j.Nombre_Jefe_1,[Group] = a.nombre_seccion, [Location]= a.Nombre_Sucursal, 
		[Deparments]= case	when a.CodigoEmpleado = '79703011'	then 'PRESIDENCIA' 
							when a.CodigoEmpleado = '41641115'	then 'PRESIDENCIA'
							when a.codigoempleado = '437730'	then 'GERENCIA CT'
							when a.codigoempleado = '1107051226' then 'BELLPI  - NEBULA'
							when a.codigoempleado = '80414667' then 'MAQUINARIA'
							when a.codigoempleado = '80017774' then 'VEHICULOS 1'
							when a.codigoempleado = '80408452' then 'VEHICULOS A'
							when a.codigoempleado = '80420582' then 'MAYORISTA VEHICULOS IMPORTADOS'
							when a.CodigoEmpleado = '79778163' then 'PRESIDENCIA'
							--when a.codigoempleado = '1107051226'	then 'BELLPI'
							--when a.codigoempleado = '437730'	then 'GERENCIA CT'
							--when a.codigoempleado = '437730'	then 'GERENCIA CT'
							--when a.codigoempleado = '437730'	then 'GERENCIA CT'
							--when a.codigoempleado = '437730'	then 'GERENCIA CT'


								else a.Nombre_Unidad_Negocio 
							end,
		Nombre_Cargo_generico,orden=convert(int,c.sal_bas)
		from EmpleadosActivos		a
		left join v_empleados_jefes j	on	a.CodigoEmpleado = j.Cedula_Empleado
		left join Cargos			c	on  a.Codigo_Cargo = c.CodigoCargo
		where a.Ano_Periodo = YEAR(GETDATE()) and a.Mes_Periodo = MONTH(GETDATE())
		and a.codigo_cargo <> 120
		--order by convert(int,sal_bas)

		union all

		select [Full Name] = RTRIM(LTRIM(a.Nombre)), Bio=a.Cedula,  EMail=j.EmailCorporativo, Mobile=  j.CelularCorporativo,[Start Date]= convert(varchar,j.FechaIniComp,103), 
		[Job Title]= j.Cargo, Birthday= convert(varchar,j.FechaCumpleaños,103),[Reports to] = v.Nombre_Jefe_1,[Group] = j.seccion, [Location]= j.Sucursal, 
		[Deparments]= case when a.cedula = '80414441' then 'PRESIDENCIA' else j.UnidadNegocio end,
		Nombre_Cargo_generico= '',
		orden=	case	when RTRIM(LTRIM(a.Nombre)) like '%VACANTE%' then '100000'  
						when a.nombre like '%JUNTA DIRECTIVA%' then 0
						when a.cedula = '80414441' then 1 
						when a.cedula = '80408452' then 140
				else convert(int,c.sal_bas) end
		from Jerarquia_EmpleadosNoNomina			a
		left join Jerarquia_EmpleadosNoNomina_Info	j	on	a.Cedula = j.Cedula
		left join v_empleados_jefes					v	on	a.cedula = v.Cedula_Empleado
		left join Cargos							c	on  j.IdCargo = c.CodigoCargo
		where a.estado = 1

		--union all

		--select distinct [Full Name] = 'JUNTA DIRECTIVA', Bio='',  EMail='', Mobile= '',[Start Date]= '', [Job Title]= '', Birthday= '',[Reports to] = ' ',
		--[Group] = '', [Location]= '', [Deparments]='JUNTA DIRECTIVA',NombreCargoGenerico='',orden=0
		--from Jerarquia_EmpleadosNoNomina		
) a 
--where [Full Name] like '%pedro%'
--and [Full Name] like '%mejia%'
order by orden asc

```
