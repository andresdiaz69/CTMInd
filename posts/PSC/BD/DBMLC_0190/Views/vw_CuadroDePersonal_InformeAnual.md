# View: vw_CuadroDePersonal_InformeAnual

## Usa los objetos:
- [[EmpleadosActivos]]

```sql
CREATE view [dbo].[vw_CuadroDePersonal_InformeAnual] 
--MS:081123 vista del procedimiento sp_CuadroDePersonal_InformeAnual poder filtrar la informacion
AS

select row_number() over( order by Nombre_Unidad_Negocio asc) Orden,*
  from ( SELECT Distinct Nombre_Unidad_Negocio, t1.Ano_Periodo,
	(SELECT Count(*) FROM [EmpleadosActivos] 
	WHERE Mes_Periodo = 12  and Ano_Periodo = t1.Ano_Periodo -1 and Unidad_Negocio=t1.Unidad_Negocio) Diciembre_Anterior, 
	(SELECT convert(int,round(convert(decimal,Count(*),0)/12,0)) FROM [EmpleadosActivos] 
	WHERE Ano_Periodo = t1.Ano_Periodo-1 and Unidad_Negocio=t1.Unidad_Negocio) Promedio_Año_Anterior, 
	(SELECT Count(*) FROM [EmpleadosActivos] 
	WHERE Mes_Periodo = 1  and Unidad_Negocio=t1.Unidad_Negocio and Ano_Periodo = t1.Ano_Periodo) Enero, 
	(SELECT Count(*) FROM [EmpleadosActivos] 
	WHERE Mes_Periodo = 2  and Unidad_Negocio=t1.Unidad_Negocio and Ano_Periodo = t1.Ano_Periodo) Febrero, 
	(SELECT Count(*) FROM [EmpleadosActivos] 
	WHERE Mes_Periodo = 3  and Unidad_Negocio=t1.Unidad_Negocio and Ano_Periodo = t1.Ano_Periodo) Marzo, 
	(SELECT Count(*) FROM [EmpleadosActivos] 
	WHERE Mes_Periodo = 4  and Unidad_Negocio=t1.Unidad_Negocio and Ano_Periodo = t1.Ano_Periodo) Abril, 
	(SELECT Count(*) FROM [EmpleadosActivos] 
	WHERE Mes_Periodo = 5  and Unidad_Negocio=t1.Unidad_Negocio and Ano_Periodo = t1.Ano_Periodo) Mayo, 
	(SELECT Count(*) FROM [EmpleadosActivos] 
	WHERE Mes_Periodo = 6  and Unidad_Negocio=t1.Unidad_Negocio and Ano_Periodo = t1.Ano_Periodo) Junio, 
	(SELECT Count(*) FROM [EmpleadosActivos] 
	WHERE Mes_Periodo = 7  and Unidad_Negocio=t1.Unidad_Negocio and Ano_Periodo = t1.Ano_Periodo) Julio, 
	(SELECT Count(*) FROM [EmpleadosActivos] 
	WHERE Mes_Periodo = 8  and Unidad_Negocio=t1.Unidad_Negocio and Ano_Periodo = t1.Ano_Periodo) Agosto, 
	(SELECT Count(*) FROM [EmpleadosActivos] 
	WHERE Mes_Periodo = 9  and Unidad_Negocio=t1.Unidad_Negocio and Ano_Periodo = t1.Ano_Periodo) Septiembre, 
	(SELECT Count(*) FROM [EmpleadosActivos] 
	WHERE Mes_Periodo = 10  and Unidad_Negocio=t1.Unidad_Negocio and Ano_Periodo = t1.Ano_Periodo) Octubre, 
	(SELECT Count(*) FROM [EmpleadosActivos] 
	WHERE Mes_Periodo = 11  and Unidad_Negocio=t1.Unidad_Negocio and Ano_Periodo = t1.Ano_Periodo) Noviembre, 
	(SELECT Count(*) FROM [EmpleadosActivos] 
	WHERE Mes_Periodo = 12  and Unidad_Negocio=t1.Unidad_Negocio and Ano_Periodo = t1.Ano_Periodo) Diciembre 

FROM [EmpleadosActivos] t1
where Nombre_Unidad_Negocio <>'DAIMLER PC (Vehiculos Pasajeros)'
--and t1.Ano_Periodo =2023
) A 


```
