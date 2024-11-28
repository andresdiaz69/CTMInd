# Stored Procedure: sp_CuadroDePersonal_PromedioEmpleados

## Usa los objetos:
- [[EmpleadosActivos]]

```sql
CREATE PROCEDURE [dbo].[sp_CuadroDePersonal_PromedioEmpleados]
@Ano_Periodo int,
@Mes_Periodo int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
		SET FMTONLY OFF

	select 'Promedio Empleados (6 Meses)' as [DESCRIPCION], [BONAPARTE RAL] as TotalBonaparte ,[CASA TORO DE LA SABANA] as TotalCasaToroSabana, [CASATORO S.A.] as TotalCasaToro,
	[Fomenta] as TotalFomenta,[Israriego] as TotalIsrariego,[MOTORES Y MAQUINAS S.A. - MOTORYSA] as TotalMotorysa,[BELLPI SAS] as TotalBellpi
	--into #tabla2
	from(		
				Select Empresa, Nombres
				from EmpleadosActivos
				where Ano_Periodo = @Ano_Periodo and Mes_Periodo = @Mes_Periodo

	) b  pivot (COUNT(Nombres) for Empresa in 
	([BONAPARTE RAL],[CASA TORO DE LA SABANA],[CASATORO S.A.],[Fomenta],[Israriego],[MOTORES Y MAQUINAS S.A. - MOTORYSA],[BELLPI SAS])) as pivottable

END
```
