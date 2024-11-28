# View: vw_JefesDeColision_Liquidacion

## Usa los objetos:
- [[vw_EmpleadosDetalle]]
- [[vw_JefesDeColision_1]]
- [[vw_JefesDeColision_22]]

```sql

CREATE VIEW [dbo].[vw_JefesDeColision_Liquidacion] AS 

SELECT T.*
,vw_EmpleadosDetalle.CodigoEmpresa, vw_EmpleadosDetalle.NombreEmpresa, vw_EmpleadosDetalle.FechaIngreso, vw_EmpleadosDetalle.FechaRetiro
, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM
(
	SELECT ISNULL(C1.CodigoEmpleado, C2.CodigoEmpleado)AS CodigoEmpleado, ISNULL(C1.Nombres, C2.Nombres)AS Nombres, ISNULL(C1.Ano_Periodo, C2.Ano_Periodo) AS Ano_Periodo, ISNULL(C1.Mes_Periodo, C2.Mes_Periodo) AS Mes_Periodo, ISNULL(C1.Cantidad,0) AS VehiculosFacturados, C1.Desde AS Desde_1, C1.Hasta AS Hasta_1, ISNULL(C1.Comision_Vehiculos,0)AS Comision_Vehiculos, C1.CodigoConcepto AS CodigoConcepto_1,
	ISNULL(C2.Ventas, 0) AS Ventas, ISNULL(C2.Presupuesto, 0) AS Presupuesto, ISNULL(C2.PorcentajeCumplimiento,0) AS PorcentajeCumplimiento, C2.Desde AS Desde_2, C2.Hasta AS Hasta_2, ISNULL(C2.Comision_Presupuesto,0) AS Comision_Presupuesto, C2.CodigoConcepto AS CodigoConcepto_2,
	ISNULL(C1.Comision_Vehiculos,0) + ISNULL(C2.Comision_Presupuesto,0) AS Comision_TOTAL
	FROM vw_JefesDeColision_1 AS C1
	FULL JOIN vw_JefesDeColision_22 AS C2 ON C1.CodigoEmpleado = C2.CodigoEmpleado AND C1.Ano_Periodo = C2.Ano_Periodo AND C1.Mes_Periodo = C2.Mes_Periodo 
)AS T
LEFT OUTER JOIN vw_EmpleadosDetalle ON t.CodigoEmpleado = dbo.vw_EmpleadosDetalle.CodigoEmpleado

```
