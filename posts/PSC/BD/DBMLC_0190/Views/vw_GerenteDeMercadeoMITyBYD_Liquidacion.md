# View: vw_GerenteDeMercadeoMITyBYD_Liquidacion

## Usa los objetos:
- [[vw_EmpleadosDetalle]]
- [[vw_GerenteDeMercadeoMITyBYD_11]]
- [[vw_GerenteDeMercadeoMITyBYD_22]]

```sql


CREATE VIEW [dbo].[vw_GerenteDeMercadeoMITyBYD_Liquidacion] AS

SELECT T.CodigoEmpleado, vw_EmpleadosDetalle.Empleado,  T.Ano_Periodo, T.Mes_Periodo,  T.CodigoCentro, T.NombreCentro, T.EntregasEfectivas, T.Desde_Entregas, T.Hasta_Entregas
, CASE WHEN T.CodigoCentro <> 9999 THEN NULL ELSE T.Comision_Entregas END AS Comision_Entregas
, T.Valor as Valor_FacturacionPosventa, T.Desde_Facturacion, T.Hasta_Facturacion
, CASE WHEN T.CodigoCentro <> 9999 THEN NULL ELSE T.Comision_Facturacion END AS Comision_Facturacion
, T.CodigoConcepto
, CASE WHEN T.CodigoCentro <> 9999 THEN NULL ELSE T.Comision_TOTAL END AS Comision_TOTAL
, vw_EmpleadosDetalle.CodigoEmpresa, vw_EmpleadosDetalle.NombreEmpresa, vw_EmpleadosDetalle.FechaIngreso, vw_EmpleadosDetalle.FechaRetiro
, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM
(
	SELECT ISNULL(A.CodigoEmpleado, B.CodigoEmpleado) AS CodigoEmpleado, ISNULL(A.Nombres, B.Nombres) AS Nombres, ISNULL(A.Ano_Periodo, B.Ano_Periodo) AS Ano_Periodo, ISNULL(A.Mes_Periodo, B.Mes_Periodo) AS Mes_Periodo, ISNULL(A.CodigoCentro, B.CodigoCentro) AS CodigoCentro, ISNULL(A.NombreCentro, B.NombreCentro) AS NombreCentro
	, ISNULL(A.EntregasEfectivas, 0) AS EntregasEfectivas, ISNULL(A.Desde, 0) AS Desde_Entregas, ISNULL(A.Hasta, 0) AS Hasta_Entregas, ISNULL(A.Comision_Entregas, 0) AS Comision_Entregas
	, B.Valor, ISNULL(B.Desde, 0) AS Desde_Facturacion, ISNULL(B.Hasta, 0) AS Hasta_Facturacion, ISNULL(B.Comision_Facturacion, 0) AS Comision_Facturacion, ISNULL(A.CodigoConcepto, B.CodigoConcepto) AS CodigoConcepto
	, ISNULL(A.Comision_Entregas, 0) + ISNULL(B.Comision_Facturacion, 0) AS Comision_TOTAL
	FROM vw_GerenteDeMercadeoMITyBYD_11 AS A
	FULL JOIN vw_GerenteDeMercadeoMITyBYD_22 AS B ON A.CodigoEmpleado = B.CodigoEmpleado AND A.Ano_Periodo = B.Ano_Periodo AND A.Mes_Periodo = B.Mes_Periodo AND A.CodigoCentro = B.CodigoCentro

)AS T
LEFT OUTER JOIN vw_EmpleadosDetalle ON T.CodigoEmpleado = dbo.vw_EmpleadosDetalle.CodigoEmpleado
WHERE Ano_Periodo >= 2020


```
