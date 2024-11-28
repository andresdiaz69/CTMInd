# View: vw_GerenteDeRepuestos_MM_Liquidacion

## Usa los objetos:
- [[vw_EmpleadosDetalle]]
- [[vw_GerenteDeRepuestos_MM_1]]
- [[vw_GerenteDeRepuestos_MM_2]]
- [[vw_GerenteDeRepuestos_MM_3]]

```sql

CREATE VIEW [dbo].[vw_GerenteDeRepuestos_MM_Liquidacion] AS 

SELECT DISTINCT T.CodigoEmpleado, T.Nombres, T.Ano, T.Mes, T.RotacionInventario, T.DesdeRotacion, T.HastaRotacion, T.ComisionRotacion, T.CodigoConcepto_1, T.UtilidadBruta, T.DesdeUtilidad, T.HastaUtilidad, T.ComisionUtilidad, T.CodigoConcepto_2, T.ValorVentas, T.Presupuesto, T.Cumplimiento, T.DesdeCumplimiento, T.HastaCumplimiento, T.ComisionCumplimiento, T.CodigoConcepto_3
, (T.ComisionRotacion + T.ComisionUtilidad + T.ComisionCumplimiento) AS ComisionTOTAL
, vw_EmpleadosDetalle.FechaRetiro, vw_EmpleadosDetalle.CodigoEmpresa, vw_EmpleadosDetalle.NombreEmpresa
, IdLiquidacion, IdHistorico, FechaLiquidacion
FROM
(
	SELECT ISNULL(ISNULL(A1.CodigoEmpleado, A2.CodigoEmpleado),A3.CodigoEmpleado) AS CodigoEmpleado, ISNULL(ISNULL(A1.Nombres, A2.Nombres),A3.Nombres) AS Nombres, ISNULL(ISNULL(A1.Ano, A2.Ano),A3.Ano) AS Ano, ISNULL(ISNULL(A1.Mes, A2.Mes),A3.Mes) AS Mes, ISNULL(A1.RotacionInventario,0) AS RotacionInventario, ISNULL(A1.Desde,0) AS DesdeRotacion, ISNULL(A1.Hasta,0) AS HastaRotacion, ISNULL(A1.ValorComision,0) AS ComisionRotacion, A1.CodigoConcepto AS CodigoConcepto_1
	,ISNULL(A2.UtilidadBruta,0) AS UtilidadBruta, ISNULL(A2.Desde,0) AS DesdeUtilidad, ISNULL(A2.Hasta,0) AS HastaUtilidad, ISNULL(A2.ValorComision,0) AS ComisionUtilidad, A2.CodigoConcepto AS CodigoConcepto_2
	,ISNULL(A3.Cumplimiento,0) AS Cumplimiento, ISNULL(A3.Desde,0) AS DesdeCumplimiento, ISNULL(A3.Hasta,0) AS HastaCumplimiento, ISNULL(A3.ValorComision,0) AS ComisionCumplimiento, A3.CodigoConcepto AS CodigoConcepto_3
	,ISNULL(A3.ValorVentas,0) AS ValorVentas, ISNULL(A3.Presupuesto,0) AS Presupuesto
	, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
	FROM vw_GerenteDeRepuestos_MM_1 AS A1
	FULL JOIN vw_GerenteDeRepuestos_MM_2 AS A2 ON A1.CodigoEmpleado = A2.CodigoEmpleado AND A1.Ano = A2.Ano AND A1.Mes = A2.Mes 
	FULL JOIN vw_GerenteDeRepuestos_MM_3 AS A3 ON A1.CodigoEmpleado = A3.CodigoEmpleado AND A1.Ano = A3.Ano AND A1.Mes = A3.Mes
)AS T
INNER JOIN vw_EmpleadosDetalle ON T.CodigoEmpleado = vw_EmpleadosDetalle.CodigoEmpleado

```
