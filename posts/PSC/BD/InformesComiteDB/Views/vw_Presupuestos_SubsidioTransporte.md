# View: vw_Presupuestos_SubsidioTransporte

## Usa los objetos:
- [[v_MLC_consulta_empleados_activos]]
- [[v_Salario_NoVariable_Promedio_AnoActual]]

```sql


CREATE  view [dbo].[vw_Presupuestos_SubsidioTransporte] as   
--****************************
--Autor: Manuel Suarez
-- Date: 22/07/2024
--Descr: Create VW para proyecto presupuestos con el subdidio de transporte cuando el empleado gana menos de dos salarios minimos.
--****************************

select Cedula, Nombres = nombres + ' ' +  apellido1 + ' ' +  apellido2, Fecha_Ingreso, Codigo_Compañia, Nombre_Compañia, codigo_marca, a.nombre_marca, 
       codigo_centro, nombre_centro, codigo_seccion, nombre_seccion,codigo_departamento, nombre_departamento,   Unidad_Negocio, Nombre_Unidad_Negocio, 
	   Codigo_Cargo, Nombre_Cargo, Codigo_Cargo_Generico, Nombre_Cargo_generico, Nombre_Tipo_Contrato, Indicador_salario_variable, Indicador_comisiones, 
	   Codigo_clase_salario, Nombre_Clase_salario, fecha_Ult_Aumento,SalarioBasico,SalarioVariableAnoActual, SalarioBasico+SalarioVariableAnoActual Total ,
	   case when SalarioBasico+SalarioVariableAnoActual < 2600000 then 162000  else 0 end Subsidio_Transporte
  from (
		SELECT a.Cedula, a.Nombres, a.apellido1, a.apellido2, a.Fecha_Ingreso, a.Codigo_Compañia, a.Nombre_Compañia, a.codigo_marca, a.nombre_marca, 
		       a.codigo_centro, a.nombre_centro, a.codigo_seccion, a.nombre_seccion,a.codigo_departamento, a.nombre_departamento,  
		       a.Unidad_Negocio, a.Nombre_Unidad_Negocio, a.Codigo_Cargo, a.Nombre_Cargo, a.Codigo_Cargo_Generico, a.Nombre_Cargo_generico, 
		       a.Nombre_Tipo_Contrato, a.Indicador_salario_variable, a.Indicador_comisiones,  a.Codigo_clase_salario, a.Nombre_Clase_salario, a.SalarioBasico,a.fecha_Ult_Aumento,	
		       SalarioVariableAnoActual=isnull(paa.SalarioVariablePromedio,0)
			   
		  FROM Novasoft_CT_MM.dbo.v_MLC_consulta_empleados_activos	a

		  left join [DBMLC_0190]..v_Salario_NoVariable_Promedio_AnoActual				paa	on	paa.cod_emp = a.Cedula		  

		group by a.Cedula, a.Nombres, a.apellido1, a.apellido2, a.Fecha_Ingreso, a.Codigo_Compañia, a.Nombre_Compañia, a.codigo_marca, a.nombre_marca, 
		         a.codigo_centro, a.nombre_centro, a.codigo_seccion, a.nombre_seccion,a.codigo_departamento, a.nombre_departamento, a.Codigo_Sucursal, a.Nombre_Sucursal, 
		         a.Unidad_Negocio, a.Nombre_Unidad_Negocio, a.Codigo_Cargo, a.Nombre_Cargo, a.Codigo_Cargo_Generico, a.Nombre_Cargo_generico, a.Codigo_Cargo_Junta, 		 
		         a.Nombre_Tipo_Contrato, a.Indicador_salario_variable, a.Indicador_comisiones,a.Codigo_clase_salario, a.Nombre_Clase_salario, a.SalarioBasico,a.fecha_Ult_Aumento,
		         paa.SalarioVariablePromedio
       ) a		
--where cedula in('1010181580','1022957010','52477030')
 where Indicador_salario_variable = 'NO'
   and Indicador_comisiones = 'NO'

 group by Cedula, Nombres, apellido1, apellido2, Fecha_Ingreso, Codigo_Compañia, Nombre_Compañia, codigo_marca, a.nombre_marca, 
       codigo_centro, nombre_centro, codigo_seccion, nombre_seccion,codigo_departamento, nombre_departamento, Unidad_Negocio, Nombre_Unidad_Negocio, Codigo_Cargo, Nombre_Cargo, Codigo_Cargo_Generico, Nombre_Cargo_generico,  
       Nombre_Tipo_Contrato, Indicador_salario_variable,Indicador_comisiones,  Codigo_clase_salario, Nombre_Clase_salario, SalarioBasico,fecha_Ult_Aumento,SalarioVariableAnoActual

--order by cedula

```
