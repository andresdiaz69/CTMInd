# Stored Procedure: sp_CuadroDePersonal_InformeAnual

```sql
CREATE PROCEDURE [dbo].[sp_CuadroDePersonal_InformeAnual] 
	-- Add the parameters for the stored procedure here
	@Ano_Periodo as int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

--declare @ano_periodo int
--set @ano_periodo = 2023

declare @cmd as nvarchar(MAX)

set @cmd=''

set @cmd = @cmd + ' declare @Ano_Periodo as int '
set @cmd = @cmd + ' set @Ano_Periodo = '+cast(@Ano_Periodo as char(4))+' '
set @cmd = @cmd + ' select row_number() over( order by Nombre_Unidad_Negocio asc) Orden,* from ( '
set @cmd = @cmd + ' SELECT Distinct Nombre_Unidad_Negocio, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 12 and Ano_Periodo = @Ano_Periodo-1 and Unidad_Negocio=t1.Unidad_Negocio) Diciembre_Anterior, '
set @cmd = @cmd + ' 	(SELECT convert(int,round(convert(decimal,Count(*),0)/12,0)) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Ano_Periodo = @Ano_Periodo-1 and Unidad_Negocio=t1.Unidad_Negocio) Promedio_Año_Anterior, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 1 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio) Enero, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 2 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio) Febrero, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 3 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio) Marzo, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 4 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio) Abril, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 5 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio) Mayo, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 6 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio) Junio, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 7 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio) Julio, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 8 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio) Agosto, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 9 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio) Septiembre, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 10 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio) Octubre, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 11 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio) Noviembre, '
set @cmd = @cmd + ' 	(SELECT Count(*) FROM [EmpleadosActivos] '
set @cmd = @cmd + ' 	WHERE Mes_Periodo = 12 and Ano_Periodo = @Ano_Periodo and Unidad_Negocio=t1.Unidad_Negocio) Diciembre '



set @cmd = @cmd + ' FROM [EmpleadosActivos] t1

where Nombre_Unidad_Negocio <>''DAIMLER PC (Vehiculos Pasajeros)'') A '


exec(@cmd)

END


```
