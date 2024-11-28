# View: vw_CuadroDePersonal_JuntaDirectivaCT

## Usa los objetos:
- [[EmpleadosActivos]]

```sql
CREATE view [dbo].[vw_CuadroDePersonal_JuntaDirectivaCT] 
--MS:081123 vista del procedimiento sp_CuadroDePersonal_JuntaDirectivaCT poder filtrar la informacion
AS

select row_number() over( order by Nombre_unidad_negocio asc) Orden,*  from ( 
SELECT Distinct Ano_Periodo,Mes_Periodo, Nombre_unidad_negocio,
	(SELECT Count(*) FROM [EmpleadosActivos] 
	WHERE Mes_Periodo = 12 and Ano_Periodo = t1.Ano_Periodo-1 and Unidad_Negocio=t1.Unidad_Negocio and CodigoEmpresa <> 6) Diciembre_Anterior, 
	(SELECT Count(*) FROM [EmpleadosActivos] 
	WHERE Mes_Periodo = 1 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and CodigoEmpresa <> 6) Enero, 
	(SELECT Count(*) FROM [EmpleadosActivos] 
	WHERE Mes_Periodo = 2 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and CodigoEmpresa <> 6) Febrero, 
	(SELECT Count(*) FROM [EmpleadosActivos] 
	WHERE Mes_Periodo = 3 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and CodigoEmpresa <> 6) Marzo, 
	(SELECT Count(*) FROM [EmpleadosActivos] 
	WHERE Mes_Periodo = 4 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and CodigoEmpresa <> 6) Abril, 
	(SELECT Count(*) FROM [EmpleadosActivos] 
	WHERE Mes_Periodo = 5 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and CodigoEmpresa <> 6) Mayo, 
	(SELECT Count(*) FROM [EmpleadosActivos] 
	WHERE Mes_Periodo = 6 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and CodigoEmpresa <> 6) Junio, 
	(SELECT Count(*) FROM [EmpleadosActivos] 
	WHERE Mes_Periodo = 7 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and CodigoEmpresa <> 6) Julio, 
	(SELECT Count(*) FROM [EmpleadosActivos] 
	WHERE Mes_Periodo = 8 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and CodigoEmpresa <> 6) Agosto, 
	(SELECT Count(*) FROM [EmpleadosActivos] 
	WHERE Mes_Periodo = 9 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and CodigoEmpresa <> 6) Septiembre, 
	(SELECT Count(*) FROM [EmpleadosActivos] 
	WHERE Mes_Periodo = 10 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and CodigoEmpresa <> 6) Octubre, 
	(SELECT Count(*) FROM [EmpleadosActivos] 
	WHERE Mes_Periodo = 11 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and CodigoEmpresa <> 6) Noviembre, 
	(SELECT Count(*) FROM [EmpleadosActivos] 
	WHERE Mes_Periodo = 12 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and CodigoEmpresa <> 6) Diciembre 

FROM [EmpleadosActivos] t1  
where Nombre_Unidad_Negocio <>'DAIMLER PC (Vehiculos Pasajeros'
--and t1.ano_periodo=2023

) A


```
