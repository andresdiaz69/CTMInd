# Stored Procedure: sp_CuadroDePersonal_InformeAnual_estados

```sql

CREATE PROCEDURE [dbo].[sp_CuadroDePersonal_InformeAnual_estados] 
@Ano_Periodo as int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

--declare @Ano_Periodo as int
--set @Ano_Periodo = 2023

declare @cmd as nvarchar(MAX)
set @cmd=''
set @cmd = @cmd + ' declare @Ano_Periodo as int '
set @cmd = @cmd + ' set @Ano_Periodo = '+cast(@Ano_Periodo as char(4))+' '
set @cmd = @cmd + ' select row_number() over( order by Nombre_Unidad_Negocio asc) Orden,* from ( '
set @cmd = @cmd + ' SELECT Distinct Nombre_Unidad_Negocio, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 12 and Ano_Periodo = @Ano_Periodo-1 and Unidad_Negocio=t1.Unidad_Negocio and estado=''activo'') Diciembre_Anterior_Act, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 12 and Ano_Periodo = @Ano_Periodo-1 and Unidad_Negocio=t1.Unidad_Negocio and estado=''Suspension de Contrato'') Diciembre_Anterior_Sus, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 12 and Ano_Periodo = @Ano_Periodo-1 and Unidad_Negocio=t1.Unidad_Negocio and estado=''Licencia No Remunerada'') Diciembre_Anterior_Lic, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 12 and Ano_Periodo = @Ano_Periodo-1 and Unidad_Negocio=t1.Unidad_Negocio and estado=''Medio Tiempo'') Diciembre_Anterior_MT, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 1 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''activo'') Enero_Act, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 1 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Suspension de Contrato'') Enero_Sus, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 1 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Licencia No Remunerada'') Enero_Lic, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 1 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Medio Tiempo'') Enero_MT, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 2 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''activo'') Febrero_Act, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 2 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Suspension de Contrato'') Febrero_Sus, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 2 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Licencia No Remunerada'') Febrero_Lic, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 2 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Medio Tiempo'') Febrero_MT, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 3 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''activo'') Marzo_Act, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 3 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Suspension de Contrato'') Marzo_Sus, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 3 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Licencia No Remunerada'') Marzo_Lic, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 3 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Medio Tiempo'') Marzo_MT, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 4 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''activo'') Abril_Act, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 4 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Suspension de Contrato'') Abril_Sus, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 4 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Licencia No Remunerada'') Abril_Lic, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 4 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Medio Tiempo'') Abril_MT, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 5 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''activo'') Mayo_Act, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 5 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Suspension de Contrato'') Mayo_Sus, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 5 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Licencia No Remunerada'') Mayo_Lic, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 5 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Medio Tiempo'') Mayo_MT, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 6 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''activo'') Junio_Act, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 6 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Suspension de Contrato'') Junio_Sus, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 6 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Licencia No Remunerada'') Junio_Lic, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 6 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Medio Tiempo'') Junio_MT, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 7 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''activo'') Julio_Act, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 7 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Suspension de Contrato'') Julio_Sus, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 7 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Licencia No Remunerada'') Julio_Lic, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 7 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Medio Tiempo'') Julio_MT, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 8 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''activo'') Agosto_Act, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 8 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Suspension de Contrato'') Agosto_Sus, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 8 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Licencia No Remunerada'') Agosto_Lic, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 8 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Medio Tiempo'') Agosto_MT, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 9 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''activo'') Septiembre_Act, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 9 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Suspension de Contrato'') Septiembre_Sus, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 9 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Licencia No Remunerada'') Septiembre_Lic, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 9 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Medio Tiempo'') Septiembre_MT, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 10 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''activo'') Octubre_Act, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 10 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Suspension de Contrato'') Octubre_Sus, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 10 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Licencia No Remunerada'') Octubre_Lic, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 10 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Medio Tiempo'') Octubre_MT, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 11 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''activo'') Noviembre_Act, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 11 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Suspension de Contrato'') Noviembre_Sus, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 11 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Licencia No Remunerada'') Noviembre_Lic, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 11 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Medio Tiempo'') Noviembre_MT, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 12 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''activo'') Diciembre_Act, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 12 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Suspension de Contrato'') Diciembre_Sus, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 12 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Licencia No Remunerada'') Diciembre_Lic, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 12 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and estado=''Medio Tiempo'') Diciembre_MT'
set @cmd = @cmd + ' FROM [EmpleadosActivos] t1) A 
WHERE Nombre_Unidad_Negocio <> ''DAIMLER PC (Vehiculos Pasajeros)''
'



exec(@cmd)

END

```