# View: vw_AsesoresComercialesFinanciacionYSeguros_Liquidacion_Feb2024

## Usa los objetos:
- [[vw_AsesoresComercialesFinanciacionYSeguros_1_Feb2024]]
- [[vw_AsesoresComercialesFinanciacionYSeguros_2_Feb2024]]
- [[vw_EmpleadosDetalle]]

```sql
create VIEW [dbo].[vw_AsesoresComercialesFinanciacionYSeguros_Liquidacion_Feb2024] AS

SELECT Ano_Periodo, Mes_Periodo, IdEmpresas AS CodigoEmpresa, T.CodigoEmpleado, T.Nombres, IdTercerosFinanciera, NombreFinanciera
, ImporteFinanciado_1, Financiacion_1, Desde_1, Hasta_1, ValorRango_1, ISNULL(ValorComision_1, 0)AS ValorComision_1, ImporteFinanciado_2, Desde_2, Hasta_2, ValorRango_2, ISNULL(ValorComision_2, 0)AS ValorComision_2, Comision_TOTAL
,CodigoConcepto_1, CodigoConcepto_2
, vw_EmpleadosDetalle.FechaRetiro, vw_EmpleadosDetalle.NombreEmpresa
, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM 
(
	SELECT ISNULL(A.Ano_Periodo, B.Ano_Periodo)AS Ano_Periodo, ISNULL(A.Mes_Periodo, B.Mes_Periodo)AS Mes_Periodo, ISNULL(A.IdEmpresas, B.IdEmpresas)AS IdEmpresas, ISNULL(A.CodigoEmpleado, B.CodigoEmpleado)AS CodigoEmpleado, ISNULL(A.Nombres, B.Nombres)AS Nombres, ISNULL(A.IdTercerosFinanciera, B.IdTerceros)AS IdTercerosFinanciera, ISNULL(A.NombreFinanciera, B.NombreFinanciera)AS NombreFinanciera
	, ISNULL(A.ImporteFinanciado,0) AS ImporteFinanciado_1, ISNULL(A.Financiacion,0) AS Financiacion_1, A.Desde AS Desde_1, A.Hasta AS Hasta_1, A.Valor AS ValorRango_1, A.ValorComision AS ValorComision_1
	, ISNULL(B.Importe,0) AS ImporteFinanciado_2, B.Desde AS Desde_2, B.Hasta AS Hasta_2, B.Valor AS ValorRango_2, B.ValorComision AS ValorComision_2
	, ISNULL(A.ValorComision,0) + ISNULL(B.ValorComision,0) AS Comision_TOTAL
	, A.CodigoConcepto AS CodigoConcepto_1
	, B.CodigoConcepto AS CodigoConcepto_2
	FROM vw_AsesoresComercialesFinanciacionYSeguros_1_FEb2024 AS A
	FULL JOIN vw_AsesoresComercialesFinanciacionYSeguros_2_Feb2024 AS B ON
	A.Ano_Periodo = B.Ano_Periodo AND A.Mes_Periodo = B.Mes_Periodo AND A.IdEmpresas = B.IdEmpresas AND A.CodigoEmpleado = B.CodigoEmpleado AND A.IdTercerosFinanciera = B.IdTerceros

	UNION ALL 

	
SELECT 
	 A.Ano_Periodo, A.Mes_Periodo, A.IdEmpresas, A.CodigoEmpleado, MAX(A.Nombres) AS Nombres, '9999' AS IdTerceros, 'TOTAL' AS NombreFinanciera
	, ImporteFinanciado_1, Financiacion_1, Desde_1, Hasta_1, ValorRango_1, SUM(ValorComision_1) AS ValorComision_1
	, ImporteFinanciado_2, Desde_2, Hasta_2, ValorRango_2, SUM(ValorComision_2) AS ValorComision_2
	, SUM(TOTAL_Comision) AS TOTAL_Comision
	, max(CodigoConcepto_1) as CodigoConcepto_1, max(CodigoConcepto_2) as CodigoConcepto_2
	FROM
	(
		SELECT ISNULL(A.Ano_Periodo, B.Ano_Periodo)AS Ano_Periodo, ISNULL(A.Mes_Periodo, B.Mes_Periodo)AS Mes_Periodo, ISNULL(A.IdEmpresas, B.IdEmpresas)AS IdEmpresas, ISNULL(A.CodigoEmpleado, B.CodigoEmpleado)AS CodigoEmpleado, ISNULL(A.Nombres, B.Nombres)AS Nombres, '9999' AS IdTercerosFinanciera, 'TOTAL' AS NombreFinanciera
		, 0 AS ImporteFinanciado_1, 0 AS Financiacion_1, 0 AS Desde_1, 0 AS Hasta_1, 0 AS ValorRango_1, a.ValorComision AS ValorComision_1
		, 0 AS ImporteFinanciado_2, 0 AS Financiacion_2, 0 AS Desde_2, 0 AS Hasta_2, 0 AS ValorRango_2, B.ValorComision AS ValorComision_2
		, ISNULL(A.ValorComision,0) + ISNULL(B.ValorComision,0) AS TOTAL_Comision
		, A.CodigoConcepto AS CodigoConcepto_1
		, B.CodigoConcepto AS CodigoConcepto_2
		FROM vw_AsesoresComercialesFinanciacionYSeguros_1_FEb2024 AS A
		FULL JOIN vw_AsesoresComercialesFinanciacionYSeguros_2_Feb2024 AS B ON
		A.Ano_Periodo = B.Ano_Periodo AND A.Mes_Periodo = B.Mes_Periodo AND A.IdEmpresas = B.IdEmpresas AND A.CodigoEmpleado = B.CodigoEmpleado AND A.IdTercerosFinanciera = B.IdTerceros

	)AS A
	--GROUP BY A.Ano_Periodo, A.Mes_Periodo, A.IdEmpresas, A.CodigoEmpleado, A.Nombres, ImporteFinanciado_1, Financiacion_1, Desde_1, Hasta_1, ValorRango_1
	--, ImporteFinanciado_2, Financiacion_2, Desde_2, Hasta_2, ValorRango_2
	GROUP BY A.Ano_Periodo, A.Mes_Periodo, A.IdEmpresas, A.CodigoEmpleado, ImporteFinanciado_1, Financiacion_1, Desde_1, Hasta_1, ValorRango_1
	, ImporteFinanciado_2, Financiacion_2, Desde_2, Hasta_2, ValorRango_2
)AS T
INNER JOIN vw_EmpleadosDetalle ON T.CodigoEmpleado = vw_EmpleadosDetalle.CodigoEmpleado
--where total.Codigoempleado= '7699659' 

```
