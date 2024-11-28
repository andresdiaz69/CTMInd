# Stored Procedure: sp_CuadroDePersonal_JuntaDirectivaCT

```sql
CREATE PROCEDURE [dbo].[sp_CuadroDePersonal_JuntaDirectivaCT] 
	-- Add the parameters for the stored procedure here
	@Ano_Periodo as int

AS

	--declare @Ano_Periodo as int
	--set @Ano_Periodo = 2023

BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
declare @cmd as nvarchar(MAX)
	SET FMTONLY OFF

set @cmd=''

set @cmd = @cmd + ' declare @Ano_Periodo as int '
set @cmd = @cmd + ' set @Ano_Periodo = '+cast(@Ano_Periodo as char(4))+' '
set @cmd = @cmd + ' select row_number() over( order by Nombre_unidad_negocio asc) Orden,*  from ( '
set @cmd = @cmd + ' SELECT Distinct Nombre_unidad_negocio,'
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 12 and Ano_Periodo = @Ano_Periodo-1 and Unidad_Negocio=t1.Unidad_Negocio and CodigoEmpresa <> 6) Diciembre_Anterior, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 1 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and CodigoEmpresa <> 6) Enero, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 2 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and CodigoEmpresa <> 6) Febrero, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 3 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and CodigoEmpresa <> 6) Marzo, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 4 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and CodigoEmpresa <> 6) Abril, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 5 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and CodigoEmpresa <> 6) Mayo, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 6 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and CodigoEmpresa <> 6) Junio, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 7 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and CodigoEmpresa <> 6) Julio, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 8 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and CodigoEmpresa <> 6) Agosto, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 9 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and CodigoEmpresa <> 6) Septiembre, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 10 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and CodigoEmpresa <> 6) Octubre, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 11 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and CodigoEmpresa <> 6) Noviembre, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 12 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio and CodigoEmpresa <> 6) Diciembre '

set @cmd = @cmd + ' FROM [EmpleadosActivos] t1  where Nombre_Unidad_Negocio <>''DAIMLER PC (Vehiculos Pasajeros)'') A'

exec(@cmd)

END


```
