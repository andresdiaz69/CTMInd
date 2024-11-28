# View: vw_Presupuestos_DistribucionSalarios

## Usa los objetos:
- [[v_analisis_salarios]]
- [[v_distribucion_por_empleado]]

```sql

CREATE view [dbo].[vw_Presupuestos_DistribucionSalarios] as

--****************************
--Autor: Manuel Suarez
-- Date: 16/07/2024
--Descr: Create VW para proyecto presupuestos con la distribucion de los salarios en los centros de costo y cargos.

--****************************

select Nombre_Clase_salario,dd.Cedula,dd.Nombres,dd.Codigo_Cargo,Nombre_Cargo,Codigo_Cargo_Generico,
       Nombre_Cargo_generico,dd.codigo_departamento,dd.nombre_departamento,
       sum(SalarioBasico * isnull(Porcentaje_Distribucion,100)/100) salario,  de.Codigo_Distribucion, de.Descripcion_Distribucion, dd.Nombre_Compañia,
	   isnull(de.Codigo_Centro,dd.Codigo_Centro) codCentro, ISNULL(de.nombre_centro, dd.nombre_centro) nombre_centro ,ISNULL(de.Codigo_Marca, dd.Codigo_Marca) Codigo_Marca ,
	   ISNULL(de.nombre_marca, dd.nombre_marca) nombre_marca,sum(isnull(Porcentaje_Distribucion,100))/100 Porcentaje_Distribucion
  from [dbmlc_0190]..v_analisis_salarios dd
  left join [Novasoft_CT_MM]..v_distribucion_por_empleado de on de.Cedula = dd.Cedula		
  
 --where dd.cedula = '79694102'
 group by Nombre_Clase_salario, dd.Cedula, dd.Nombres, dd.Codigo_Cargo,Nombre_Cargo,Codigo_Cargo_Generico,   Nombre_Cargo_generico,dd.codigo_departamento,
       dd.nombre_departamento,  de.Codigo_Distribucion, de.Descripcion_Distribucion, dd.Nombre_Compañia,de.Codigo_Centro,dd.Codigo_Centro , de.nombre_centro,
	   dd.nombre_centro,de.Codigo_Marca, dd.Codigo_Marca,de.nombre_marca, dd.nombre_marca

```
