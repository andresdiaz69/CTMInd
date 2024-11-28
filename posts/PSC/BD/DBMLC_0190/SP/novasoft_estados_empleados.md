# Stored Procedure: novasoft_estados_empleados

## Usa los objetos:
- [[EmpleadosActivos]]
- [[MLC_suspension_contratos]]

```sql
CREATE procedure [dbo].[novasoft_estados_empleados] 
(
	@Fecha datetime
)
as


--declare @fecha datetime
declare @fecha_ini datetime
--set @fecha = '20200531'
set @fecha_ini = DATEADD(month, DATEDIFF(month, 0, @fecha), 0)

select s.cod_emp,e.Nombres,e.Apellido1,e.Apellido2,
Estado =case     when convert(date,s.ini_aus) >= convert(date,@fecha_ini) and  convert(date,s.ini_aus) <= convert(date,@fecha)
				then 
					case		when s.cod_aus = 21 then 'Licencia No Remunerada'
								when s.cod_aus = 22 then 'Suspension de Contrato'
								when s.cod_aus = 120 then 'Medio Tiempo'
                    else 'Activo'
                end 
        else 'Activo'
end, 
s.ini_aus,s.fin_aus,e.CodigoEmpresa,e.Empresa,e.Fecha_Ingreso,e.CodigoMarca,e.Marca,e.codigo_centro,e.nombre_centro,codigo_seccion,e.nombre_seccion,
e.Codigo_Sucursal,e.Nombre_Sucursal,e.codigo_departamento,e.nombre_departamento,e.Codigo_Cargo,e.Nombre_Cargo,
Codigo_Cargo_Generico,Nombre_Cargo_generico,email,Codigo_Departamento_trabajo,Nombre_Departamento_trabajo,
Codigo_Ciudad_trabajo,Nombre_Ciudad_trabajo,Codigo_Cargo_Junta, Nombre_Cargo_Junta,Codigo_Tipo_Contrato,Nombre_Tipo_Contrato,Fecha_Nacimiento,
genero,Indicador_salario_variable,Indicador_comisiones,Prefijo_Cuenta_contable,Codigo_CNO,Descripcion_CNO,Codigo_clase_salario,Nombre_Clase_salario,
Email_Corporativo,Celular,Telefono_fijo
from		[Novasoft_CT_MM].dbo.MLC_suspension_contratos   s              
left join	EmpleadosActivos								e	on          s.cod_emp = e.CodigoEmpleado
																			and year(@Fecha) = e.Ano_Periodo
																			and month(@Fecha) = e.Mes_Periodo 
																			
where 
s.ini_aus >= @fecha_ini
and s.ini_aus <= @fecha
and e.nombres is not null
--and s.cod_emp = '79976847'
order by cod_emp
```
