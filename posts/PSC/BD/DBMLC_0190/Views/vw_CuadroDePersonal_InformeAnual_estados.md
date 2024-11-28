# View: vw_CuadroDePersonal_InformeAnual_estados

## Usa los objetos:
- [[EmpleadosActivos]]

```sql
CREATE view [dbo].[vw_CuadroDePersonal_InformeAnual_estados] 
--MS:081123 vista del procedimiento sp_CuadroDePersonal_InformeAnual_estados poder filtrar la informacion
AS
select row_number() over( order by Nombre_Unidad_Negocio asc) Orden,* from ( 
 SELECT Distinct Nombre_Unidad_Negocio, t1.ano_periodo,
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 12 and Ano_Periodo = t1.Ano_Periodo-1 and Unidad_Negocio=t1.Unidad_Negocio and estado='activo') Diciembre_Anterior_Act, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 12 and Ano_Periodo = t1.Ano_Periodo-1 and Unidad_Negocio=t1.Unidad_Negocio and estado='Suspension de Contrato') Diciembre_Anterior_Sus, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 12 and Ano_Periodo = t1.Ano_Periodo-1 and Unidad_Negocio=t1.Unidad_Negocio and estado='Licencia No Remunerada') Diciembre_Anterior_Lic, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 12 and Ano_Periodo = t1.Ano_Periodo-1 and Unidad_Negocio=t1.Unidad_Negocio and estado='Medio Tiempo') Diciembre_Anterior_MT, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 1 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='activo') Enero_Act, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 1 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Suspension de Contrato') Enero_Sus, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 1 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Licencia No Remunerada') Enero_Lic, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 1 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Medio Tiempo') Enero_MT, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 2 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='activo') Febrero_Act, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 2 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Suspension de Contrato') Febrero_Sus, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 2 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Licencia No Remunerada') Febrero_Lic, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 2 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Medio Tiempo') Febrero_MT, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 3 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='activo') Marzo_Act, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 3 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Suspension de Contrato') Marzo_Sus, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 3 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Licencia No Remunerada') Marzo_Lic, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 3 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Medio Tiempo') Marzo_MT, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 4 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='activo') Abril_Act, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 4 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Suspension de Contrato') Abril_Sus, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 4 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Licencia No Remunerada') Abril_Lic, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 4 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Medio Tiempo') Abril_MT, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 5 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='activo') Mayo_Act, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 5 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Suspension de Contrato') Mayo_Sus, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 5 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Licencia No Remunerada') Mayo_Lic, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 5 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Medio Tiempo') Mayo_MT, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 6 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='activo') Junio_Act, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 6 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Suspension de Contrato') Junio_Sus, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 6 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Licencia No Remunerada') Junio_Lic, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 6 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Medio Tiempo') Junio_MT, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 7 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='activo') Julio_Act, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 7 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Suspension de Contrato') Julio_Sus, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 7 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Licencia No Remunerada') Julio_Lic, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 7 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Medio Tiempo') Julio_MT, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 8 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='activo') Agosto_Act, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 8 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Suspension de Contrato') Agosto_Sus, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 8 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Licencia No Remunerada') Agosto_Lic, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 8 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Medio Tiempo') Agosto_MT, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 9 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='activo') Septiembre_Act, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 9 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Suspension de Contrato') Septiembre_Sus, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 9 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Licencia No Remunerada') Septiembre_Lic, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 9 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Medio Tiempo') Septiembre_MT, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 10 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='activo') Octubre_Act, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 10 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Suspension de Contrato') Octubre_Sus, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 10 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Licencia No Remunerada') Octubre_Lic, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 10 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Medio Tiempo') Octubre_MT, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 11 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='activo') Noviembre_Act, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 11 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Suspension de Contrato') Noviembre_Sus, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 11 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Licencia No Remunerada') Noviembre_Lic, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 11 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Medio Tiempo') Noviembre_MT, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 12 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='activo') Diciembre_Act, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 12 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Suspension de Contrato') Diciembre_Sus, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 12 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Licencia No Remunerada') Diciembre_Lic, 
(SELECT Count(*) FROM [EmpleadosActivos] 
WHERE Mes_Periodo = 12 and Ano_Periodo = t1.Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado='Medio Tiempo') Diciembre_MT
 FROM [EmpleadosActivos] t1
-- where t1.ano_periodo = 2023
 ) A 
WHERE Nombre_Unidad_Negocio <> 'DAIMLER PC (Vehiculos Pasajeros)'



```
