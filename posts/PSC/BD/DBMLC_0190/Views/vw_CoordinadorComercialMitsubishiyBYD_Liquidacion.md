# View: vw_CoordinadorComercialMitsubishiyBYD_Liquidacion

## Usa los objetos:
- [[Centros]]
- [[vw_CoordinadorComercialMitsubishiyBYD_11]]
- [[vw_EmpleadosDetalle]]

```sql




CREATE VIEW [dbo].[vw_CoordinadorComercialMitsubishiyBYD_Liquidacion] AS

SELECT T.CodigoEmpleado, vw_EmpleadosDetalle.Empleado,  T.Ano_Periodo, T.Mes_Periodo,  T.CodigoCentro, CASE WHEN T.CodigoCentro = 9999 THEN 'TOTAL' ELSE Centros.NombreCentro END AS NombreCentro , T.EntregasEfectivas, T.Desde_Entregas, T.Hasta_Entregas
, CASE WHEN T.CodigoCentro <> 9999 THEN NULL ELSE T.Comision_Entregas END AS Comision_Entregas, CASE WHEN T.CodigoCentro <> 9999 THEN NULL ELSE T.Comision_Entregas END AS Comision_TOTAL, T.CodigoConcepto
, vw_EmpleadosDetalle.CodigoEmpresa, vw_EmpleadosDetalle.NombreEmpresa, vw_EmpleadosDetalle.FechaIngreso, vw_EmpleadosDetalle.FechaRetiro
, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM
(
	SELECT A.CodigoEmpleado, A.Nombres, A.Ano_Periodo, A.Mes_Periodo, A.CodigoCentro, A.EntregasEfectivas, ISNULL(A.Desde, 0) AS Desde_Entregas, ISNULL(A.Hasta, 0) AS Hasta_Entregas, ISNULL(A.Comision_Entregas, 0) AS Comision_Entregas
	, A.CodigoConcepto AS CodigoConcepto
	FROM vw_CoordinadorComercialMitsubishiyBYD_11 AS A
)AS T
LEFT OUTER JOIN vw_EmpleadosDetalle ON T.CodigoEmpleado = dbo.vw_EmpleadosDetalle.CodigoEmpleado
LEFT JOIN Centros ON T.CodigoCentro = Centros.CodigoCentro
WHERE Ano_Periodo >= 2020

```
