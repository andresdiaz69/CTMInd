# View: vw_GerenteDeLineaMinoristaMitsubishiDaimlerBYD_Liquidacion

## Usa los objetos:
- [[vw_EmpleadosDetalle]]
- [[vw_GerenteDeLineaMinoristaMitsubishiDaimlerBYD_1]]
- [[vw_GerenteDeLineaMinoristaMitsubishiDaimlerBYD_2]]

```sql
CREATE VIEW [dbo].[vw_GerenteDeLineaMinoristaMitsubishiDaimlerBYD_Liquidacion] AS

SELECT T.* , vw_EmpleadosDetalle.Empleado, 
vw_EmpleadosDetalle.CodigoEmpresa, vw_EmpleadosDetalle.NombreEmpresa, vw_EmpleadosDetalle.FechaIngreso, vw_EmpleadosDetalle.FechaRetiro
FROM
(
	SELECT ISNULL(A.CodigoEmpleado, B.CodigoEmpleado)AS CodigoEmpleado, ISNULL(A.Ano_Periodo, B.Ano_Periodo) AS Ano_Periodo, ISNULL(A.Mes_Periodo, B.Mes_Periodo) AS Mes_Periodo, ISNULL(A.EntregasEfectivas, 0) AS EntregasEfectivas, ISNULL(A.Desde, 0) As Desde_Ventas, ISNULL(A.Hasta,0) AS Hasta_Ventas, ISNULL(A.Comision_Entregas, 0) AS Comision_Entregas, A.CodigoConcepto AS CodigoConcepto_1,
	ISNULL(B.EficienciaAdministrativa, 0) AS EficienciaAdministrativa, ISNULL(B.Desde, 0) AS Desde_Eficiencia, ISNULL(B.Hasta, 0) AS Hasta_Eficiencia, ISNULL(B.Comision_EficienciaAdministrativa, 0) AS Comision_EficienciaAdministrativa, B.CodigoConcepto AS CodigoConcepto_2
	,ISNULL(A.Comision_Entregas, 0) + ISNULL(B.Comision_EficienciaAdministrativa, 0)  AS Comision_TOTAL
	, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
	FROM vw_GerenteDeLineaMinoristaMitsubishiDaimlerBYD_1 AS A
	FULL JOIN vw_GerenteDeLineaMinoristaMitsubishiDaimlerBYD_2 AS B ON A.Ano_Periodo = B.Ano_Periodo AND A.Mes_Periodo = B.Mes_Periodo AND A.CodigoEmpleado = B.CodigoEmpleado
)AS T
LEFT OUTER JOIN vw_EmpleadosDetalle ON T.CodigoEmpleado = dbo.vw_EmpleadosDetalle.CodigoEmpleado

```
