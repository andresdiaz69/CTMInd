# View: vw_DotacionesEmpleados

## Usa los objetos:
- [[empleadosactivos]]
- [[empresas]]

```sql

create view [dbo].[vw_DotacionesEmpleados] as
select CodigoEmpleado,	Nombres	,Apellido1	,Apellido2	,Fecha_Ingreso	,e.CodigoEmpresa	,c.nombreEmpresa,Unidad_Negocio	,Nombre_Unidad_Negocio	,codigo_centro	,nombre_centro	,codigo_seccion	,
nombre_seccion	,codigo_departamento	,nombre_departamento	,Codigo_Cargo	,Nombre_Cargo	,Codigo_Cargo_Generico,Nombre_Cargo_generico,Codigo_Ciudad_trabajo	,Nombre_Ciudad_trabajo	,Genero	,Email_Corporativo	,Celular
from [DBMLC_0190].dbo.empleadosactivos	e
left join	[DBMLC_0190].dbo.empresas	c	on	e.CodigoEmpresa = c.CodigoEmpresa
where ano_periodo = year(getdate())
and mes_periodo = month(getdate())
and codigo_departamento in ('TC','TM','RE','VN','VO')

```
