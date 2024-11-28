# View: vw_CuadroDePersonal_VariacionDePersonal

## Usa los objetos:
- [[EmpleadosRetirados]]
- [[v_EmpleadosActivosRetirados]]

```sql

CREATE view [dbo].[vw_CuadroDePersonal_VariacionDePersonal]
--MS:161123 vista del procedimiento sp_CuadroDePersonal_VariacionDePersonal para poder filtrar la informacion
AS
 select  row_number() over( order by Nombre_unidad_negocio asc) Orden,* 
 from ( 
 SELECT Distinct Ano_Periodo,Nombre_unidad_negocio, 
 (SELECT Count(*) FROM [v_EmpleadosActivosRetirados] 
 WHERE month(fecha_ingreso) = 1 
 and year(fecha_ingreso) =  t1.Ano_Periodo 
 and Ano_Periodo =  t1.Ano_Periodo 
 and Mes_Periodo =1 
 and Unidad_Negocio=t1.Unidad_Negocio) Enero_ing, 
 (SELECT Count(*) FROM [Empleadosretirados] 
 WHERE month(fecha_retiro) = 1 and year(fecha_retiro) =  t1.Ano_Periodo and Ano_Periodo =  t1.Ano_Periodo and Mes_Periodo =1 and Unidad_Negocio=t1.Unidad_Negocio) Enero_ret, 
 (SELECT Count(*) FROM [v_EmpleadosActivosRetirados] 
 WHERE month(fecha_ingreso) = 2 and year(fecha_ingreso) =  t1.Ano_Periodo and Ano_Periodo =  t1.Ano_Periodo and Mes_Periodo =2 and Unidad_Negocio=t1.Unidad_Negocio) Febrero_ing, 
 (SELECT Count(*) FROM [Empleadosretirados] 
 WHERE month(fecha_retiro) = 2 and year(fecha_retiro) =  t1.Ano_Periodo and Ano_Periodo =  t1.Ano_Periodo and Mes_Periodo =2 and Unidad_Negocio=t1.Unidad_Negocio) Febrero_ret, 
 (SELECT Count(*) FROM [v_EmpleadosActivosRetirados] 
 WHERE month(fecha_ingreso) = 3 and year(fecha_ingreso) =  t1.Ano_Periodo and Ano_Periodo =  t1.Ano_Periodo and Mes_Periodo =3 and Unidad_Negocio=t1.Unidad_Negocio) Marzo_ing, 
 (SELECT Count(*) FROM [Empleadosretirados] 
 WHERE month(fecha_retiro) = 3 and year(fecha_retiro) =  t1.Ano_Periodo and Ano_Periodo =  t1.Ano_Periodo and Mes_Periodo =3 and Unidad_Negocio=t1.Unidad_Negocio) Marzo_ret, 
 (SELECT Count(*) FROM [v_EmpleadosActivosRetirados] 
 WHERE month(fecha_ingreso) = 4 and year(fecha_ingreso) =  t1.Ano_Periodo and Ano_Periodo =  t1.Ano_Periodo and Mes_Periodo =4 and Unidad_Negocio=t1.Unidad_Negocio) Abril_ing, 
 (SELECT Count(*) FROM [Empleadosretirados] 
 WHERE month(fecha_retiro) = 4 and year(fecha_retiro) =  t1.Ano_Periodo and Ano_Periodo =  t1.Ano_Periodo and Mes_Periodo =4 and Unidad_Negocio=t1.Unidad_Negocio) Abril_ret, 
 (SELECT Count(*) FROM [v_EmpleadosActivosRetirados] 
 WHERE month(fecha_ingreso) = 5 and year(fecha_ingreso) =  t1.Ano_Periodo and Ano_Periodo =  t1.Ano_Periodo and Mes_Periodo =5 and Unidad_Negocio=t1.Unidad_Negocio) Mayo_ing, 
 (SELECT Count(*) FROM [Empleadosretirados] 
 WHERE month(fecha_retiro) = 5 and year(fecha_retiro) =  t1.Ano_Periodo and Ano_Periodo =  t1.Ano_Periodo and Mes_Periodo =5 and Unidad_Negocio=t1.Unidad_Negocio) Mayo_ret, 
 (SELECT Count(*) FROM [v_EmpleadosActivosRetirados] 
 WHERE month(fecha_ingreso) = 6 and year(fecha_ingreso) =  t1.Ano_Periodo and Ano_Periodo =  t1.Ano_Periodo and Mes_Periodo =6 and Unidad_Negocio=t1.Unidad_Negocio) Junio_ing, 
 (SELECT Count(*) FROM [Empleadosretirados] 
 WHERE month(fecha_retiro) = 6 and year(fecha_retiro) =  t1.Ano_Periodo and Ano_Periodo =  t1.Ano_Periodo and Mes_Periodo =6 and Unidad_Negocio=t1.Unidad_Negocio) Junio_ret, 
 (SELECT Count(*) FROM [v_EmpleadosActivosRetirados] 
 WHERE month(fecha_ingreso) = 7 and year(fecha_ingreso) =  t1.Ano_Periodo and Ano_Periodo =  t1.Ano_Periodo and Mes_Periodo =7 and Unidad_Negocio=t1.Unidad_Negocio) Julio_ing, 
 (SELECT Count(*) FROM [Empleadosretirados] 
 WHERE month(fecha_retiro) = 7 and year(fecha_retiro) =  t1.Ano_Periodo and Ano_Periodo =  t1.Ano_Periodo and Mes_Periodo =7 and Unidad_Negocio=t1.Unidad_Negocio) Julio_ret, 
 (SELECT Count(*) FROM [v_EmpleadosActivosRetirados] 
 WHERE month(fecha_ingreso) = 8 and year(fecha_ingreso) =  t1.Ano_Periodo and Ano_Periodo =  t1.Ano_Periodo and Mes_Periodo =8 and Unidad_Negocio=t1.Unidad_Negocio) Agosto_ing, 
 (SELECT Count(*) FROM [Empleadosretirados] 
 WHERE month(fecha_retiro) = 8 and year(fecha_retiro) =  t1.Ano_Periodo and Ano_Periodo =  t1.Ano_Periodo and Mes_Periodo =8 and Unidad_Negocio=t1.Unidad_Negocio) Agosto_ret, 
 (SELECT Count(*) FROM [v_EmpleadosActivosRetirados] 
 WHERE month(fecha_ingreso) = 9 and year(fecha_ingreso) =  t1.Ano_Periodo and Ano_Periodo =  t1.Ano_Periodo and Mes_Periodo =9 and Unidad_Negocio=t1.Unidad_Negocio) Septiembre_ing, 
 (SELECT Count(*) FROM [Empleadosretirados] 
 WHERE month(fecha_retiro) = 9 and year(fecha_retiro) =  t1.Ano_Periodo and Ano_Periodo =  t1.Ano_Periodo and Mes_Periodo =9 and Unidad_Negocio=t1.Unidad_Negocio) Septiembre_ret, 
 (SELECT Count(*) FROM [v_EmpleadosActivosRetirados] 
 WHERE month(fecha_ingreso) = 10 and year(fecha_ingreso) =  t1.Ano_Periodo and Ano_Periodo =  t1.Ano_Periodo and Mes_Periodo =10 and Unidad_Negocio=t1.Unidad_Negocio) Octubre_ing, 
 (SELECT Count(*) FROM [Empleadosretirados] 
 WHERE month(fecha_retiro) = 10 and year(fecha_retiro) =  t1.Ano_Periodo and Ano_Periodo =  t1.Ano_Periodo and Mes_Periodo =10 and Unidad_Negocio=t1.Unidad_Negocio) Octubre_ret, 
 (SELECT Count(*) FROM [v_EmpleadosActivosRetirados] 
 WHERE month(fecha_ingreso) = 11 and year(fecha_ingreso) =  t1.Ano_Periodo and Ano_Periodo =  t1.Ano_Periodo and Mes_Periodo =11 and Unidad_Negocio=t1.Unidad_Negocio) Noviembre_ing, 
 (SELECT Count(*) FROM [Empleadosretirados] 
 WHERE month(fecha_retiro) = 11 and year(fecha_retiro) =  t1.Ano_Periodo and Ano_Periodo =  t1.Ano_Periodo and Mes_Periodo =11 and Unidad_Negocio=t1.Unidad_Negocio) Noviembre_ret, 
 (SELECT Count(*) FROM [v_EmpleadosActivosRetirados] 
 WHERE month(fecha_ingreso) = 12 and year(fecha_ingreso) =  t1.Ano_Periodo and Ano_Periodo =  t1.Ano_Periodo and Mes_Periodo =12 and Unidad_Negocio=t1.Unidad_Negocio) Diciembre_ing, 
 (SELECT Count(*) FROM [Empleadosretirados] 
 WHERE month(fecha_retiro) = 12 and year(fecha_retiro) =  t1.Ano_Periodo and Ano_Periodo =  t1.Ano_Periodo and Mes_Periodo =12 and Unidad_Negocio=t1.Unidad_Negocio) Diciembre_ret 

 FROM [v_EmpleadosActivosRetirados] t1

where Nombre_Unidad_Negocio <>'DAIMLER PC (Vehiculos Pasajeros)'
                             )  A 
--where Ano_Periodo = 2023


```
