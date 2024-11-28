# Stored Procedure: sp_CuadroDePersonal_CausalesDeRetiroSinJustaCausa

## Usa los objetos:
- [[EmpleadosRetirados]]

```sql



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE  [dbo].[sp_CuadroDePersonal_CausalesDeRetiroSinJustaCausa]
	-- Add the parameters for the stored procedure here
	@Ano_Periodo as int, 
	@Mes_Periodo as int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @periodoActual datetime = dateadd(month, 1, DATEFROMPARTS(@Ano_Periodo, @Mes_Periodo, 1))
	DECLARE @periodoAnterior datetime = dateadd(month, -6, @periodoActual)


	select 'Despido Sin Justa Causa (6 Meses)' as [CAUSAS DE RETIRO], [BONAPARTE RAL] as TotalBonaparte ,[CASA TORO DE LA SABANA] as TotalCasaToroSabana, [CASATORO S.A.] as TotalCasaToro,
	[Fomenta] as TotalFomenta,[Israriego] as TotalIsrariego,[MOTORES Y MAQUINAS S.A. - MOTORYSA] as TotalMotorysa,[BELLPI SAS] as TotalBellpi
	--into #tabla2
	from(
			select distinct CausaRetiro,Empresa, CodigoEmpleado
			from EmpleadosRetirados 
			where CausaRetiro = 'Despido Sin Justa Causa' and  Fecha_retiro >= @periodoAnterior and Fecha_retiro < @periodoActual
	

	) b  pivot (count(codigoempleado) for empresa in 
	([BONAPARTE RAL],[CASA TORO DE LA SABANA],[CASATORO S.A.],[Fomenta],[Israriego],[MOTORES Y MAQUINAS S.A. - MOTORYSA],[BELLPI SAS])) as pivottable

END

```
