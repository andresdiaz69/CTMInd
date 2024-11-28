# Stored Procedure: sp_Presupuestos_Calculo_CFC

## Usa los objetos:
- [[Presupuestos_Definitivos_Balances]]
- [[Presupuestos_VariablesParametrizacionesPorLineas_Trimestres]]
- [[vw_Presupuestos_BalancePre]]

```sql

CREATE PROCEDURE [dbo].[sp_Presupuestos_Calculo_CFC] 
(
	-- =============================================
	-- Control de Cambios
	-- 2024|11|09 - Alexis Barreto - Creado para calcular el valor del CFC
	-- Modulo - Presupuestos
	-- =============================================
	@IdClase SMALLINT, 
	@CodigoLinea SMALLINT, 
	@CodigoCentro SMALLINT, 
	@Ano_Periodo SMALLINT
) AS

BEGIN

	SET NOCOUNT ON;
	SET FMTONLY OFF;

	--DECLARE @IdClase SMALLINT = 1, @CodigoLinea SMALLINT = 19, @CodigoCentro SMALLINT = 1, @Ano_Periodo SMALLINT = 2025;
	DECLARE @Mes_Periodo SMALLINT = (CASE WHEN @Ano_Periodo <= YEAR(GETDATE()) THEN 12 ELSE MONTH(DATEADD(MONTH, -1, GETDATE())) END), 
			@IdTipo SMALLINT = (CASE WHEN @CodigoLinea = 4 THEN 167 ELSE 163 END);
		
	DECLARE @T1 DECIMAL(18,2) = (SELECT TOP 1 Valor_T1 FROM Presupuestos_VariablesParametrizacionesPorLineas_Trimestres WHERE IdTipo = @IdTipo AND IdClase = @IdClase AND Ano_Periodo = @Ano_Periodo)
	DECLARE @T2 DECIMAL(18,2) = (SELECT TOP 1 Valor_T2 FROM Presupuestos_VariablesParametrizacionesPorLineas_Trimestres WHERE IdTipo = @IdTipo AND IdClase = @IdClase AND Ano_Periodo = @Ano_Periodo)
	DECLARE @T3 DECIMAL(18,2) = (SELECT TOP 1 Valor_T3 FROM Presupuestos_VariablesParametrizacionesPorLineas_Trimestres WHERE IdTipo = @IdTipo AND IdClase = @IdClase AND Ano_Periodo = @Ano_Periodo)
	DECLARE @T4 DECIMAL(18,2) = (SELECT TOP 1 Valor_T4 FROM Presupuestos_VariablesParametrizacionesPorLineas_Trimestres WHERE IdTipo = @IdTipo AND IdClase = @IdClase AND Ano_Periodo = @Ano_Periodo)

	DECLARE @M1 DECIMAL(18,2) = (SELECT TOP 1 ValorAct FROM vw_Presupuestos_BalancePre WHERE CodigoLinea = @CodigoLinea AND CodSede = @CodigoCentro AND Año = (@Ano_Periodo - 1) AND Mes = @Mes_Periodo AND Orden = 152);
	DECLARE @M2 DECIMAL(18,2) = (SELECT TOP 1 Valor FROM Presupuestos_Definitivos_Balances WHERE IdClase = @IdClase AND CodigoLinea = @CodigoLinea AND CodigoCentro = @CodigoCentro AND Ano_Periodo = @Ano_Periodo AND IdJerarquia = 152 AND Mes_Periodo = 1);
	DECLARE @M3 DECIMAL(18,2) = (SELECT TOP 1 Valor FROM Presupuestos_Definitivos_Balances WHERE IdClase = @IdClase AND CodigoLinea = @CodigoLinea AND CodigoCentro = @CodigoCentro AND Ano_Periodo = @Ano_Periodo AND IdJerarquia = 152 AND Mes_Periodo = 2);
	DECLARE @M4 DECIMAL(18,2) = (SELECT TOP 1 Valor FROM Presupuestos_Definitivos_Balances WHERE IdClase = @IdClase AND CodigoLinea = @CodigoLinea AND CodigoCentro = @CodigoCentro AND Ano_Periodo = @Ano_Periodo AND IdJerarquia = 152 AND Mes_Periodo = 3);
	DECLARE @M5 DECIMAL(18,2) = (SELECT TOP 1 Valor FROM Presupuestos_Definitivos_Balances WHERE IdClase = @IdClase AND CodigoLinea = @CodigoLinea AND CodigoCentro = @CodigoCentro AND Ano_Periodo = @Ano_Periodo AND IdJerarquia = 152 AND Mes_Periodo = 4);
	DECLARE @M6 DECIMAL(18,2) = (SELECT TOP 1 Valor FROM Presupuestos_Definitivos_Balances WHERE IdClase = @IdClase AND CodigoLinea = @CodigoLinea AND CodigoCentro = @CodigoCentro AND Ano_Periodo = @Ano_Periodo AND IdJerarquia = 152 AND Mes_Periodo = 5);
	DECLARE @M7 DECIMAL(18,2) = (SELECT TOP 1 Valor FROM Presupuestos_Definitivos_Balances WHERE IdClase = @IdClase AND CodigoLinea = @CodigoLinea AND CodigoCentro = @CodigoCentro AND Ano_Periodo = @Ano_Periodo AND IdJerarquia = 152 AND Mes_Periodo = 6);
	DECLARE @M8 DECIMAL(18,2) = (SELECT TOP 1 Valor FROM Presupuestos_Definitivos_Balances WHERE IdClase = @IdClase AND CodigoLinea = @CodigoLinea AND CodigoCentro = @CodigoCentro AND Ano_Periodo = @Ano_Periodo AND IdJerarquia = 152 AND Mes_Periodo = 7);
	DECLARE @M9 DECIMAL(18,2) = (SELECT TOP 1 Valor FROM Presupuestos_Definitivos_Balances WHERE IdClase = @IdClase AND CodigoLinea = @CodigoLinea AND CodigoCentro = @CodigoCentro AND Ano_Periodo = @Ano_Periodo AND IdJerarquia = 152 AND Mes_Periodo = 8);
	DECLARE @M10 DECIMAL(18,2) = (SELECT TOP 1 Valor FROM Presupuestos_Definitivos_Balances WHERE IdClase = @IdClase AND CodigoLinea = @CodigoLinea AND CodigoCentro = @CodigoCentro AND Ano_Periodo = @Ano_Periodo AND IdJerarquia = 152 AND Mes_Periodo = 9);
	DECLARE @M11 DECIMAL(18,2) = (SELECT TOP 1 Valor FROM Presupuestos_Definitivos_Balances WHERE IdClase = @IdClase AND CodigoLinea = @CodigoLinea AND CodigoCentro = @CodigoCentro AND Ano_Periodo = @Ano_Periodo AND IdJerarquia = 152 AND Mes_Periodo = 10);
	DECLARE @M12 DECIMAL(18,2) = (SELECT TOP 1 Valor FROM Presupuestos_Definitivos_Balances WHERE IdClase = @IdClase AND CodigoLinea = @CodigoLinea AND CodigoCentro = @CodigoCentro AND Ano_Periodo = @Ano_Periodo AND IdJerarquia = 152 AND Mes_Periodo = 11);
	
	SELECT IdJerarquiaPyG = 296, IdClase = @IdClase, CodigoLinea = @CodigoLinea, CodigoCentro = @CodigoCentro, Ano_Periodo = @Ano_Periodo, Mes_Periodo, Valor
	FROM (
		SELECT Mes_Periodo = 1, Valor = @M1 * (@T1 / 100) UNION ALL
		SELECT Mes_Periodo = 2, Valor = @M2 * (@T1 / 100) UNION ALL
		SELECT Mes_Periodo = 3, Valor = @M3 * (@T1 / 100) UNION ALL
		SELECT Mes_Periodo = 4, Valor = @M4 * (@T2 / 100) UNION ALL
		SELECT Mes_Periodo = 5, Valor = @M5 * (@T2 / 100) UNION ALL
		SELECT Mes_Periodo = 6, Valor = @M6 * (@T2 / 100) UNION ALL
		SELECT Mes_Periodo = 7, Valor = @M7 * (@T3 / 100) UNION ALL
		SELECT Mes_Periodo = 8, Valor = @M8 * (@T3 / 100) UNION ALL
		SELECT Mes_Periodo = 9, Valor = @M9 * (@T3 / 100) UNION ALL
		SELECT Mes_Periodo = 10, Valor = @M10 * (@T4 / 100) UNION ALL
		SELECT Mes_Periodo = 11, Valor = @M11 * (@T4 / 100) UNION ALL
		SELECT Mes_Periodo = 12, Valor = @M12 * (@T4 / 100) 
	) A

END 

```
