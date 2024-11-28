# View: vw_ExpertoDeProductoDaimlerPC_Liquidacion

## Usa los objetos:
- [[vw_EmpleadosDetalle]]
- [[vw_ExpertoDeProductoDaimlerPC_1]]
- [[vw_ExpertoDeProductoDaimlerPC_2]]
- [[vw_ExpertoDeProductoDaimlerPC_3]]

```sql

CREATE VIEW [dbo].[vw_ExpertoDeProductoDaimlerPC_Liquidacion] AS 

SELECT T.Ano_Periodo, T.Mes_Periodo, T.CedulaVendedor, T.NombreVendedor, T.CodigoConcepto_1, T.VehiculosRecaudados, T.ComisionPersonales, T.CodigoConcepto_2, T.VehiculosEntregados, T.ValorVariable, T.ComisionGerencia, T.CodigoConcepto_3, T.Satisfaccion_CSI, T.Desde_Satisfaccion, T.Hasta_Satisfaccion, T.ComisionSatisfaccion, T.ComisionTotal, T.IdLiquidacion, T.IdHistorico, T.FechaLiquidacion
, vw_EmpleadosDetalle.FechaRetiro, vw_EmpleadosDetalle.CodigoEmpresa, vw_EmpleadosDetalle.NombreEmpresa
FROM
(
	SELECT ISNULL(ISNULL(C1.Ano_Periodo, C2.Ano_Periodo),C3.Ano)AS Ano_Periodo, ISNULL(ISNULL(C1.Mes_Periodo, C2.Mes_Periodo),C3.Mes)AS Mes_Periodo, ISNULL(ISNULL(C1.CedulaVendedor,C2.CodigoEmpleado),C3.CodigoEmpleado) AS CedulaVendedor, ISNULL(ISNULL(C1.NombreVendedor, C2.Nombres), C3.Nombres)AS NombreVendedor
	, C1.CodigoConcepto AS CodigoConcepto_1, ISNULL(C1.VehiculosRecaudados,0)AS VehiculosRecaudados, ISNULL(C1.ComisionRecaudo,0) AS ComisionPersonales
	, C2.CodigoConcepto AS CodigoConcepto_2, ISNULL(C2.Cantidad,0)AS VehiculosEntregados, C2.ValorVariable, ISNULL(C2.Comision,0) AS ComisionGerencia
	, C3.CodigoConcepto AS CodigoConcepto_3, ISNULL(C3.Satisfaccion_CSI,0)as Satisfaccion_CSI, ISNULL(C3.ValorComision,0) AS ComisionSatisfaccion, ISNULL(C3.Desde,0) AS Desde_Satisfaccion, ISNULL(C3.Hasta, 0) AS Hasta_Satisfaccion
	, ISNULL(C1.ComisionRecaudo,0) + ISNULL(C2.Comision,0) + ISNULL(C3.ValorComision,0) AS ComisionTotal
	, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
	FROM vw_ExpertoDeProductoDaimlerPC_1 AS C1
	FULL JOIN vw_ExpertoDeProductoDaimlerPC_2 AS C2 ON C1.CodigoEmpleado = C2.CodigoEmpleado AND C1.Ano_Periodo = C2.Ano_Periodo AND C1.Mes_Periodo = C2.Mes_Periodo
	FULL JOIN vw_ExpertoDeProductoDaimlerPC_3 AS C3 ON ISNULL(C1.CodigoEmpleado,C2.CodigoEmpleado) = C3.CodigoEmpleado AND ISNULL(C1.Ano_Periodo,C2.Ano_Periodo) = C3.Ano AND ISNULL(C1.Mes_Periodo,C2.Mes_Periodo) = C3.Mes
)AS T
INNER JOIN vw_EmpleadosDetalle ON T.CedulaVendedor = vw_EmpleadosDetalle.CodigoEmpleado



```
