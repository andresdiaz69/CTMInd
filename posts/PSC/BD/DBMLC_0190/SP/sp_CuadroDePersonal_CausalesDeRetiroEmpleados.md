# Stored Procedure: sp_CuadroDePersonal_CausalesDeRetiroEmpleados

## Usa los objetos:
- [[EmpleadosActivos]]

```sql

CREATE PROCEDURE [dbo].[sp_CuadroDePersonal_CausalesDeRetiroEmpleados]
	-- Add the parameters for the stored procedure here
	@Ano_Periodo as int,
	@Mes_Periodo as int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
select 'Empleados Actuales' as [CAUSAS DE RETIRO], [BONAPARTE RAL] as TotalBonaparte ,[CASA TORO DE LA SABANA] as TotalCasaToroSabana, [CASATORO S.A.] as TotalCasaToro,
	[Fomenta] as TotalFomenta,[Israriego] as TotalIsrariego,[MOTORES Y MAQUINAS S.A. - MOTORYSA] as TotalMotorysa, [BELLPI SAS] as TotalBellpi
	--into #tabla2
	from(
			select distinct Empresa, CodigoEmpleado
			from EmpleadosActivos  
			where Ano_Periodo = @Ano_Periodo and Mes_Periodo = @Mes_Periodo

	) b  pivot (count(codigoempleado) for empresa in 
	([BONAPARTE RAL],[CASA TORO DE LA SABANA],[CASATORO S.A.],[Fomenta],[Israriego],[MOTORES Y MAQUINAS S.A. - MOTORYSA], [BELLPI SAS])) as pivottable


END
```
