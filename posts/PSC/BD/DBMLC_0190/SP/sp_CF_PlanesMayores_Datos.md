# Stored Procedure: sp_CF_PlanesMayores_Datos

## Usa los objetos:
- [[v_CF_PlanesMayores_Datos]]

```sql
CREATE PROC [dbo].[sp_CF_PlanesMayores_Datos]
(
	@FechaConsulta DATE,
	@IdEmpresa SMALLINT
) AS

BEGIN
	-- =============================================
	-- Control de Cambios
	-- 2024|09|12 - ALEXIS - Se cambio la estrutura para que los bancos sean los generales del historico que se han ingresado.
	-- =============================================

	SET NOCOUNT ON
	SET FMTONLY OFF

	-- Declarar el parámetro de fecha
	--DECLARE @FechaConsulta DATE, @IdEmpresa SMALLINT;
	--SET @FechaConsulta = DATEFROMPARTS(2024, 8, 3)-- '20240601';
	--set @IdEmpresa = 6;

	IF OBJECT_ID('tempdb..#FechasDelMes', 'U') IS NOT NULL
		DROP TABLE #FechasDelMes;

	IF OBJECT_ID('tempdb..#DataGeneral', 'U') IS NOT NULL
		DROP TABLE #DataGeneral;

	-- Crear la tabla temporal con todas las fechas del mes basado en @FechaConsulta
	WITH Dates AS (
		SELECT CAST(DATEADD(DAY, 1 - DAY(@FechaConsulta), @FechaConsulta) AS DATE) AS Fecha
		UNION ALL
		SELECT DATEADD(DAY, 1, Fecha)
		FROM Dates
		WHERE Fecha < @FechaConsulta
	)
	SELECT Fecha INTO #FechasDelMes FROM Dates
	OPTION (MAXRECURSION 31); 


	-- Crear la tabla temporal que contenga la información general de la relación fabrica - banco - linea
	SELECT	DISTINCT			IdEmpresa,		IdBanco,		NombreBanco, 
		NombreBancoAlterno,		Linea,			Fabrica,		NombreGeneral
	INTO #DataGeneral
	FROM v_CF_PlanesMayores_Datos
	WHERE IdEmpresa = @IdEmpresa


	-- Resultado de consulta final
	SELECT	DISTINCT				dataGeneral.Año,				dataGeneral.Mes,				dataGeneral.Fecha,
		dataGeneral.IdEmpresa,		dataGeneral.IdBanco,			dataGeneral.NombreBanco,		dataGeneral.NombreBancoAlterno,
		dataGeneral.Linea,			dataGeneral.Fabrica,
		ValorSinCosto = CONVERT(DECIMAL(20,4), ISNULL(dataValores.ValorSinCosto, 0)),
		ValorConCosto = CONVERT(DECIMAL(20,4), ISNULL(dataValores.ValorConCosto, 0)),
		ValorSinCostoRep = CONVERT(DECIMAL(20,4), ISNULL(dataValores.ValorSinCostoRep, 0)),
		ValorConCostoRep = CONVERT(DECIMAL(20,4), ISNULL(dataValores.ValorConCostoRep, 0)),
		dataGeneral.NombreGeneral
	FROM (
		SELECT	DISTINCT				Año = YEAR(Fechas.Fecha),			Mes = MONTH(Fechas.Fecha),			Fechas.Fecha,
			DataInicial.IdEmpresa,		DataInicial.Linea,					DataInicial.Fabrica,				DataInicial.IdBanco,			
			DataInicial.NombreBanco,	DataInicial.NombreGeneral,			DataInicial.NombreBancoAlterno
		FROM #FechasDelMes Fechas
		CROSS JOIN #DataGeneral DataInicial
	) AS dataGeneral
	LEFT JOIN v_CF_PlanesMayores_Datos	AS dataValores ON dataValores.Fecha		  = dataGeneral.Fecha
														AND dataValores.IdEmpresa = dataGeneral.IdEmpresa
														AND dataValores.IdBanco	  = dataGeneral.IdBanco
														AND dataValores.Linea	  = dataGeneral.Linea
														AND dataValores.Fabrica	  = dataGeneral.Fabrica



	IF OBJECT_ID('tempdb..#FechasDelMes', 'U') IS NOT NULL
		DROP TABLE #FechasDelMes;

	IF OBJECT_ID('tempdb..#DataGeneral', 'U') IS NOT NULL
		DROP TABLE #DataGeneral;

END

```
