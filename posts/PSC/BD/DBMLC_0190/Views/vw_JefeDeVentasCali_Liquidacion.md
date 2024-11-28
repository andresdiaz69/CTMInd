# View: vw_JefeDeVentasCali_Liquidacion

## Usa los objetos:
- [[Centros]]
- [[vw_EmpleadosDetalle]]
- [[vw_JefeDeVentasCali_11]]
- [[vw_JefedeVentasCali_21]]
- [[vw_JefedeVentasCali_31]]

```sql


CREATE VIEW [dbo].[vw_JefeDeVentasCali_Liquidacion] AS

SELECT T.CodigoEmpleado, vw_EmpleadosDetalle.Empleado,  T.Ano_Periodo, T.Mes_Periodo,  T.CodigoCentro, CASE WHEN T.CodigoCentro = 9999 THEN 'TOTAL' ELSE Centros.NombreCentro END AS NombreCentro , T.EntregasEfectivas, T.Desde_Entregas, T.Hasta_Entregas
, CASE WHEN T.CodigoCentro <> 9999 THEN NULL ELSE T.Comision_Ventas END AS Comision_Ventas , T.CodigoConcepto_1,  T.Valor_Creditos, T.Valor_Seguros, t.Valor_VentasNetas
, T.ColocacionCreditosYSeguros, t.Desde_Colocacion, T.Hasta_Colocacion
, CASE WHEN T.CodigoCentro <> 9999 THEN NULL ELSE T.Comision_Colocacion END AS Comision_Colocacion, T.CodigoConcepto_2, T.EficienciaAdministrativa, T.Desde_Eficiencia, T.Hasta_Eficiencia
, CASE WHEN T.CodigoCentro <> 9999 THEN NULL ELSE T.Comision_EficienciaAdministrativa END AS Comision_EficienciaAdministrativa , T.CodigoConcepto_3
, CASE WHEN T.CodigoCentro <> 9999 THEN NULL ELSE ISNULL(T.Comision_Ventas, 0) + ISNULL(T.Comision_Colocacion, 0) + ISNULL(T.Comision_EficienciaAdministrativa, 0) END AS Comision_TOTAL
, vw_EmpleadosDetalle.CodigoEmpresa, vw_EmpleadosDetalle.NombreEmpresa, vw_EmpleadosDetalle.FechaIngreso, vw_EmpleadosDetalle.FechaRetiro
, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM
(
	SELECT ISNULL(ISNULL(A.CodigoEmpleado, B.CodigoEmpleado), C.CodigoEmpleado) AS CodigoEmpleado, ISNULL(A.Nombres, B.Nombres) AS Nombres, ISNULL(ISNULL(A.Ano_Periodo, B.Ano), C.Ano_Periodo) AS Ano_Periodo, ISNULL(ISNULL(A.Mes_Periodo, B.Mes), C.Mes_Periodo) AS Mes_Periodo
	, ISNULL(ISNULL(A.CodigoCentro, B.CodigoCentro), C.CodigoCentro) AS CodigoCentro, ISNULL(A.EntregasEfectivas, 0) AS EntregasEfectivas, ISNULL(A.Desde, 0) AS Desde_Entregas, ISNULL(A.Hasta, 0) AS Hasta_Entregas, ISNULL(A.Comision_Ventas, 0) AS Comision_Ventas
	, A.CodigoConcepto AS CodigoConcepto_1, ISNULL(B.Valor_Creditos, 0) AS Valor_Creditos, ISNULL(B.Valor_Seguros, 0) AS Valor_Seguros, ISNULL(B.Valor_VentasNetas, 0) AS Valor_VentasNetas, ISNULL(B.ColocacionCreditosYSeguros, 0) AS ColocacionCreditosYSeguros, ISNULL(B.Desde, 0) AS Desde_Colocacion
	, ISNULL(B.Hasta, 0) AS Hasta_Colocacion, ISNULL(B.Comision_Colocacion, 0) AS Comision_Colocacion, B.CodigoConcepto AS CodigoConcepto_2, ISNULL(C.EficienciaAdministrativa, 0) AS EficienciaAdministrativa, ISNULL(C.Desde, 0) AS Desde_Eficiencia, ISNULL(C.Hasta, 0) AS Hasta_Eficiencia
	, ISNULL(C.Comision_EficienciaAdministrativa, 0) AS Comision_EficienciaAdministrativa, C.CodigoConcepto AS CodigoConcepto_3
	FROM vw_JefeDeVentasCali_11 AS A
	FULL JOIN vw_JefeDeVentasCali_21 AS B ON A.CodigoEmpleado = B.CodigoEmpleado AND A.Ano_Periodo = B.Ano AND A.Mes_Periodo = B.Mes AND A.CodigoCentro = B.CodigoCentro
	FULL JOIN vw_JefeDeVentasCali_31 AS C ON ISNULL(A.CodigoEmpleado, B.CodigoEmpleado) = C.CodigoEmpleado AND ISNULL(A.Ano_Periodo, B.Ano) = C.Ano_Periodo AND ISNULL(A.Mes_Periodo, b.Mes) = C.Mes_Periodo AND ISNULL(A.CodigoCentro, B.CodigoCentro) = C.CodigoCentro
)AS T
LEFT OUTER JOIN vw_EmpleadosDetalle ON T.CodigoEmpleado = dbo.vw_EmpleadosDetalle.CodigoEmpleado
LEFT JOIN Centros ON T.CodigoCentro = Centros.CodigoCentro
WHERE Ano_Periodo >= 2020

```
