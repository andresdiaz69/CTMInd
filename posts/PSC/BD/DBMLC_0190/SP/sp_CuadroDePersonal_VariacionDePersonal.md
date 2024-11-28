# Stored Procedure: sp_CuadroDePersonal_VariacionDePersonal

```sql
CREATE PROCEDURE [dbo].[sp_CuadroDePersonal_VariacionDePersonal]
	@Ano_Periodo as int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
	declare @cmd as nvarchar(MAX)


set @cmd=''

set @cmd = @cmd + ' declare @Ano_Periodo as int '
set @cmd = @cmd + ' set @Ano_Periodo = '+cast(@Ano_Periodo as char(4))+' '
set @cmd = @cmd + ' select row_number() over( order by Nombre_unidad_negocio asc) Orden,* from ( '
set @cmd = @cmd + ' SELECT Distinct Nombre_unidad_negocio, '
set @cmd = @cmd + ' (SELECT Count(*) FROM [v_EmpleadosActivosRetirados] '
set @cmd = @cmd + ' WHERE month(fecha_ingreso) = 1 and year(fecha_ingreso) = @Ano_Periodo and Ano_Periodo = @Ano_Periodo and Mes_Periodo =1 and Unidad_Negocio=t1.Unidad_Negocio) Enero_ing, '
set @cmd = @cmd + ' (SELECT Count(*) FROM [Empleadosretirados] '
set @cmd = @cmd + ' WHERE month(fecha_retiro) = 1 and year(fecha_retiro) = @Ano_Periodo and Ano_Periodo = @Ano_Periodo and Mes_Periodo =1 and Unidad_Negocio=t1.Unidad_Negocio) Enero_ret, '
set @cmd = @cmd + ' (SELECT Count(*) FROM [v_EmpleadosActivosRetirados] '
set @cmd = @cmd + ' WHERE month(fecha_ingreso) = 2 and year(fecha_ingreso) = @Ano_Periodo and Ano_Periodo = @Ano_Periodo and Mes_Periodo =2 and Unidad_Negocio=t1.Unidad_Negocio) Febrero_ing, '
set @cmd = @cmd + ' (SELECT Count(*) FROM [Empleadosretirados] '
set @cmd = @cmd + ' WHERE month(fecha_retiro) = 2 and year(fecha_retiro) = @Ano_Periodo and Ano_Periodo = @Ano_Periodo and Mes_Periodo =2 and Unidad_Negocio=t1.Unidad_Negocio) Febrero_ret, '
set @cmd = @cmd + ' (SELECT Count(*) FROM [v_EmpleadosActivosRetirados] '
set @cmd = @cmd + ' WHERE month(fecha_ingreso) = 3 and year(fecha_ingreso) = @Ano_Periodo and Ano_Periodo = @Ano_Periodo and Mes_Periodo =3 and Unidad_Negocio=t1.Unidad_Negocio) Marzo_ing, '
set @cmd = @cmd + ' (SELECT Count(*) FROM [Empleadosretirados] '
set @cmd = @cmd + ' WHERE month(fecha_retiro) = 3 and year(fecha_retiro) = @Ano_Periodo and Ano_Periodo = @Ano_Periodo and Mes_Periodo =3 and Unidad_Negocio=t1.Unidad_Negocio) Marzo_ret, '
set @cmd = @cmd + ' (SELECT Count(*) FROM [v_EmpleadosActivosRetirados] '
set @cmd = @cmd + ' WHERE month(fecha_ingreso) = 4 and year(fecha_ingreso) = @Ano_Periodo and Ano_Periodo = @Ano_Periodo and Mes_Periodo =4 and Unidad_Negocio=t1.Unidad_Negocio) Abril_ing, '
set @cmd = @cmd + ' (SELECT Count(*) FROM [Empleadosretirados] '
set @cmd = @cmd + ' WHERE month(fecha_retiro) = 4 and year(fecha_retiro) = @Ano_Periodo and Ano_Periodo = @Ano_Periodo and Mes_Periodo =4 and Unidad_Negocio=t1.Unidad_Negocio) Abril_ret, '
set @cmd = @cmd + ' (SELECT Count(*) FROM [v_EmpleadosActivosRetirados] '
set @cmd = @cmd + ' WHERE month(fecha_ingreso) = 5 and year(fecha_ingreso) = @Ano_Periodo and Ano_Periodo = @Ano_Periodo and Mes_Periodo =5 and Unidad_Negocio=t1.Unidad_Negocio) Mayo_ing, '
set @cmd = @cmd + ' (SELECT Count(*) FROM [Empleadosretirados] '
set @cmd = @cmd + ' WHERE month(fecha_retiro) = 5 and year(fecha_retiro) = @Ano_Periodo and Ano_Periodo = @Ano_Periodo and Mes_Periodo =5 and Unidad_Negocio=t1.Unidad_Negocio) Mayo_ret, '
set @cmd = @cmd + ' (SELECT Count(*) FROM [v_EmpleadosActivosRetirados] '
set @cmd = @cmd + ' WHERE month(fecha_ingreso) = 6 and year(fecha_ingreso) = @Ano_Periodo and Ano_Periodo = @Ano_Periodo and Mes_Periodo =6 and Unidad_Negocio=t1.Unidad_Negocio) Junio_ing, '
set @cmd = @cmd + ' (SELECT Count(*) FROM [Empleadosretirados] '
set @cmd = @cmd + ' WHERE month(fecha_retiro) = 6 and year(fecha_retiro) = @Ano_Periodo and Ano_Periodo = @Ano_Periodo and Mes_Periodo =6 and Unidad_Negocio=t1.Unidad_Negocio) Junio_ret, '
set @cmd = @cmd + ' (SELECT Count(*) FROM [v_EmpleadosActivosRetirados] '
set @cmd = @cmd + ' WHERE month(fecha_ingreso) = 7 and year(fecha_ingreso) = @Ano_Periodo and Ano_Periodo = @Ano_Periodo and Mes_Periodo =7 and Unidad_Negocio=t1.Unidad_Negocio) Julio_ing, '
set @cmd = @cmd + ' (SELECT Count(*) FROM [Empleadosretirados] '
set @cmd = @cmd + ' WHERE month(fecha_retiro) = 7 and year(fecha_retiro) = @Ano_Periodo and Ano_Periodo = @Ano_Periodo and Mes_Periodo =7 and Unidad_Negocio=t1.Unidad_Negocio) Julio_ret, '
set @cmd = @cmd + ' (SELECT Count(*) FROM [v_EmpleadosActivosRetirados] '
set @cmd = @cmd + ' WHERE month(fecha_ingreso) = 8 and year(fecha_ingreso) = @Ano_Periodo and Ano_Periodo = @Ano_Periodo and Mes_Periodo =8 and Unidad_Negocio=t1.Unidad_Negocio) Agosto_ing, '
set @cmd = @cmd + ' (SELECT Count(*) FROM [Empleadosretirados] '
set @cmd = @cmd + ' WHERE month(fecha_retiro) = 8 and year(fecha_retiro) = @Ano_Periodo and Ano_Periodo = @Ano_Periodo and Mes_Periodo =8 and Unidad_Negocio=t1.Unidad_Negocio) Agosto_ret, '
set @cmd = @cmd + ' (SELECT Count(*) FROM [v_EmpleadosActivosRetirados] '
set @cmd = @cmd + ' WHERE month(fecha_ingreso) = 9 and year(fecha_ingreso) = @Ano_Periodo and Ano_Periodo = @Ano_Periodo and Mes_Periodo =9 and Unidad_Negocio=t1.Unidad_Negocio) Septiembre_ing, '
set @cmd = @cmd + ' (SELECT Count(*) FROM [Empleadosretirados] '
set @cmd = @cmd + ' WHERE month(fecha_retiro) = 9 and year(fecha_retiro) = @Ano_Periodo and Ano_Periodo = @Ano_Periodo and Mes_Periodo =9 and Unidad_Negocio=t1.Unidad_Negocio) Septiembre_ret, '
set @cmd = @cmd + ' (SELECT Count(*) FROM [v_EmpleadosActivosRetirados] '
set @cmd = @cmd + ' WHERE month(fecha_ingreso) = 10 and year(fecha_ingreso) = @Ano_Periodo and Ano_Periodo = @Ano_Periodo and Mes_Periodo =10 and Unidad_Negocio=t1.Unidad_Negocio) Octubre_ing, '
set @cmd = @cmd + ' (SELECT Count(*) FROM [Empleadosretirados] '
set @cmd = @cmd + ' WHERE month(fecha_retiro) = 10 and year(fecha_retiro) = @Ano_Periodo and Ano_Periodo = @Ano_Periodo and Mes_Periodo =10 and Unidad_Negocio=t1.Unidad_Negocio) Octubre_ret, '
set @cmd = @cmd + ' (SELECT Count(*) FROM [v_EmpleadosActivosRetirados] '
set @cmd = @cmd + ' WHERE month(fecha_ingreso) = 11 and year(fecha_ingreso) = @Ano_Periodo and Ano_Periodo = @Ano_Periodo and Mes_Periodo =11 and Unidad_Negocio=t1.Unidad_Negocio) Noviembre_ing, '
set @cmd = @cmd + ' (SELECT Count(*) FROM [Empleadosretirados] '
set @cmd = @cmd + ' WHERE month(fecha_retiro) = 11 and year(fecha_retiro) = @Ano_Periodo and Ano_Periodo = @Ano_Periodo and Mes_Periodo =11 and Unidad_Negocio=t1.Unidad_Negocio) Noviembre_ret, '
set @cmd = @cmd + ' (SELECT Count(*) FROM [v_EmpleadosActivosRetirados] '
set @cmd = @cmd + ' WHERE month(fecha_ingreso) = 12 and year(fecha_ingreso) = @Ano_Periodo and Ano_Periodo = @Ano_Periodo and Mes_Periodo =12 and Unidad_Negocio=t1.Unidad_Negocio) Diciembre_ing, '
set @cmd = @cmd + ' (SELECT Count(*) FROM [Empleadosretirados] '
set @cmd = @cmd + ' WHERE month(fecha_retiro) = 12 and year(fecha_retiro) = @Ano_Periodo and Ano_Periodo = @Ano_Periodo and Mes_Periodo =12 and Unidad_Negocio=t1.Unidad_Negocio) Diciembre_ret '

set @cmd = @cmd + ' FROM [v_EmpleadosActivosRetirados] t1

where Nombre_Unidad_Negocio <>''DAIMLER PC (Vehiculos Pasajeros)'')  A '

exec(@cmd)


END


```
