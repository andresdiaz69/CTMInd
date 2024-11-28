# Stored Procedure: sp_InformesConsultaPresentacionJunta

## Usa los objetos:
- [[InformesDefinitivosJunta]]

```sql

-- =======================================================================================================================================
-- Author:		LUIS FREDDY GUERRERO LOPEZ
-- Create date: 2018-10-16 ultima actualizacion
-- Description:	consulta los datos de Junta segun parametros
--				y realiza el formateo de una presentacion
-- =======================================================================================================================================

CREATE PROCEDURE [dbo].[sp_InformesConsultaPresentacionJunta] 

	@CodigoPresentacion as smallint,
	@Año as smallint,
	@Mes as smallint,
	@Redondeo as bit = 0 --0 Sin Redondeo o 1 Con Redondeo

	AS
	BEGIN

	SET NOCOUNT ON
	SET FMTONLY OFF 

	Declare @formato as int

	Set @formato = 1
	if @Redondeo = 1
		Set @formato = 1000000

	SELECT [CodigoPresentacion]
			,[Tipo]
			,[Año1]
			,[MesInicial1]
			,[Mesfinal1]
			,[Año2]
			,[MesInicial2]
			,[MesFinal2]
			,[CodigoJunta]
			,[NombreJunta]
			,[CodigoCuadro]
			,[NombreCuadro]
			,[Renglon]
			,[Balance]
			,[AnteriorTotal]/@Formato AnteriorTotal
			,[AntPorcentajeTotal]
			,[VariacionAnt]/@Formato VariacionAnt
			,[VarAntPorcentaje]
			,[NombreRenglon]
			,[ActualTotal]/@Formato ActualTotal
			,[ActPorcentajeTotal]
			,[PresupuestoTotal]/@Formato PresupuestoTotal
			,[PrePorcentajeTotal]
			,[VariacionPre]/@Formato VariacionPre
			,[VarPrePorcentaje]
			,[AnteriorTotalm]/@Formato AnteriorTotalm
			,[AntPorcentajeTotalm]
			,[Año3]
			,[MesFinal3]
			,[ColorFila]
		FROM InformesDefinitivosJunta
		where CodigoPresentacion = @CodigoPresentacion and Año2 = @Año and MesFinal2 = @Mes
		order by CodigoPresentacion,Año2,MesFinal2,tipo, CodigoCuadro,Renglon

END



```
