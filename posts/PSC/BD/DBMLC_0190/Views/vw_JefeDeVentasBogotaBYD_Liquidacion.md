# View: vw_JefeDeVentasBogotaBYD_Liquidacion

## Usa los objetos:
- [[vw_EmpleadosDetalle]]
- [[vw_JefeDeVentasBogotaBYD_1]]
- [[vw_JefeDeVentasBogotaBYD_21]]
- [[vw_JefeDeVentasBogotaBYD_3]]

```sql

CREATE VIEW [dbo].[vw_JefeDeVentasBogotaBYD_Liquidacion] AS 
SELECT 
ISNULL(ISNULL(A.CodigoEmpleado, B.CodigoEmpleado), C.CodigoEmpleado) AS CodigoEmpleado
, ISNULL(ISNULL(A.Nombres, B.Nombres), C.Nombres) AS Nombres
, ISNULL(ISNULL(A.IdComisionModeloSub, B.IdComisionModeloSub), C.IdComisionModeloSub) AS IdComisionModeloSub
, ISNULL(ISNULL(A.Ano_Periodo, B.Ano_Periodo), C.Ano_periodo)AS Ano_Periodo
, ISNULL(ISNULL(A.Mes_Periodo, B.Mes_Periodo), C.Mes_Periodo)AS Mes_Periodo
, vw_EmpleadosDetalle.CodigoEmpresa, vw_EmpleadosDetalle.NombreEmpresa, vw_EmpleadosDetalle.FechaIngreso, vw_EmpleadosDetalle.FechaRetiro
, A.CantidadPresupuestada, A.UnidadesEntregadas, A.ValorVariable, A.Comision AS Comision_1, A.CodigoConcepto AS CodigoConcepto_1
, B.EntregasEfectivas, B.CreditosDesembolsados, B.ColocacionCreditos, B.Desde AS Desde_2, B.Hasta AS Hasta_2, B.Comision AS Comision_2, B.CodigoConcepto AS CodigoConcepto_2
, C.Satisfaccion_Cliente, C.Desde AS Desde_3, C.Hasta AS Hasta_3, C.Comision AS Comision_3, C.CodigoConcepto AS CodigoConcepto_3
, ISNULL(A.Comision,0) + ISNULL(B.Comision, 0) + ISNULL(C.Comision, 0) AS Comision_TOTAL
, 0 AS IdLiquidacion
, 0 AS IdHistorico
, GETDATE() AS FechaLiquidacion
FROM vw_JefeDeVentasBogotaBYD_1 AS A 
FULL JOIN vw_JefeDeVentasBogotaBYD_21 AS B ON A.CodigoEmpleado = B.CodigoEmpleado AND A.Ano_Periodo = B.Ano_Periodo AND A.Mes_Periodo = B.Mes_Periodo 
FULL JOIN vw_JefeDeVentasBogotaBYD_3 AS C ON A.CodigoEmpleado = C.CodigoEmpleado AND A.Ano_Periodo = C.Ano_Periodo AND A.Mes_Periodo = C.Mes_Periodo
LEFT JOIN dbo.vw_EmpleadosDetalle ON ISNULL(ISNULL(A.CodigoEmpleado, B.CodigoEmpleado), C.CodigoEmpleado) = dbo.vw_EmpleadosDetalle.CodigoEmpleado

```
