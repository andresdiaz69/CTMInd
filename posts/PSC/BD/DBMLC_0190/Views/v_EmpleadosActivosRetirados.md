# View: v_EmpleadosActivosRetirados

## Usa los objetos:
- [[EmpleadosActivos]]
- [[EmpleadosRetirados]]

```sql
CREATE view [dbo].[v_EmpleadosActivosRetirados] as
select distinct  *
from(
	select Estado='activo',CodigoEmpleado,Ano_Periodo,Mes_Periodo,CodigoEmpresa,Empresa,Nombres,Apellido1,Apellido2,Fecha_Ingreso,CodigoMarca,Marca,codigo_centro,
	nombre_centro,codigo_seccion,nombre_seccion,Codigo_Sucursal,Nombre_Sucursal,codigo_departamento,nombre_departamento,Codigo_Cargo,Nombre_Cargo,
	Codigo_Cargo_Generico,Nombre_Cargo_generico,email,Email_Corporativo,Codigo_Departamento_trabajo,Nombre_Departamento_trabajo,Codigo_Ciudad_trabajo,Nombre_Ciudad_trabajo,
	Codigo_Cargo_Junta,Nombre_Cargo_Junta,Codigo_Tipo_Contrato,Nombre_Tipo_Contrato,Fecha_retiro= NULL,Codigo_Causa_retiro=NULL,CausaRetiro=NULL,
	Unidad_Negocio, Nombre_Unidad_Negocio, Fecha_Nacimiento, Genero, Indicador_salario_variable, Indicador_comisiones,
	Prefijo_Cuenta_contable, Codigo_CNO, Descripcion_CNO, Codigo_clase_salario, Nombre_Clase_salario, Documento
	from EmpleadosActivos
	UNION ALL
	select distinct Estado='Retirado',r.CodigoEmpleado,r.Ano_Periodo,r.Mes_Periodo,CodigoEmpresa,Empresa,Nombres,Apellido1,Apellido2,r.Fecha_Ingreso,CodigoMarca,Marca,codigo_centro,nombre_centro,
	codigo_seccion,nombre_seccion,Codigo_Sucursal,Nombre_Sucursal,codigo_departamento,nombre_departamento,Codigo_Cargo,Nombre_Cargo,Codigo_Cargo_Generico,
	Nombre_Cargo_generico,email,Email_Corporativo=m.Email_Corporativo,Codigo_Departamento_trabajo,Nombre_Departamento_trabajo,Codigo_Ciudad_trabajo,Nombre_Ciudad_trabajo,Codigo_Cargo_Junta,
	Nombre_Cargo_Junta,Codigo_Tipo_Contrato,Nombre_Tipo_Contrato,Fecha_retiro,Codigo_Causa_retiro,CausaRetiro,
	Unidad_Negocio, Nombre_Unidad_Negocio, Fecha_Nacimiento, Genero, Indicador_salario_variable, Indicador_comisiones='',Prefijo_Cuenta_contable, Codigo_CNO, Descripcion_CNO, Codigo_clase_salario, Nombre_Clase_salario, Documento
	from EmpleadosRetirados r
	left join	(select CodigoEmpleado,Email_Corporativo
				from(
					select orden=row_number() over (partition by codigoempleado order by cantidad desc),CodigoEmpleado,Email_Corporativo
					from(
						select cantidad= max(cantidad),CodigoEmpleado,Email_Corporativo
						from (
								select distinct cantidad=row_number() over (partition by codigoempleado order by ano_periodo,mes_periodo ), ano_periodo,mes_periodo,CodigoEmpleado,Email_Corporativo
								from EmpleadosActivos	
								where (Email_Corporativo is not null and Email_Corporativo  like '%@%')
								--and CodigoEmpleado = '1192923513'
						)a group by CodigoEmpleado,Email_Corporativo
					)b 
				)c where orden = 1) m	on	r.CodigoEmpleado = m.CodigoEmpleado
	--where r.Ano_Periodo = 2024
	--and r.Mes_Periodo = 1
)a 
--where Ano_Periodo = 2020
--and Mes_Periodo = 9



```
