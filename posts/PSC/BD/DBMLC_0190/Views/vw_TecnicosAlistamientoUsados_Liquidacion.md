# View: vw_TecnicosAlistamientoUsados_Liquidacion

## Usa los objetos:
- [[vw_EmpleadosDetalle]]
- [[vw_TecnicosAlistamientoUsados_1]]

```sql



CREATE VIEW [dbo].[vw_TecnicosAlistamientoUsados_Liquidacion] AS 
SELECT T.CodigoEmpleado, T.Nombres, T.Ano, T.Mes, T.IdRangoMaestra, T.NombreMaestra, T.Cantidad, T.Desde, T.Hasta, T.ValorRango, T.ValorComision, T.CodigoConcepto
, vw_EmpleadosDetalle.FechaRetiro, vw_EmpleadosDetalle.CodigoEmpresa, vw_EmpleadosDetalle.NombreEmpresa
, IdLiquidacion, IdHistorico, FechaLiquidacion
FROM
(
	SELECT CodigoEmpleado, Nombres, Ano, Mes, IdRangoMaestra, NombreMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio, IdRangoVersion, Desde, Hasta, Cantidad, ValorRango, ValorComision, CodigoConcepto
	, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
	FROM vw_TecnicosAlistamientoUsados_1
)AS T
INNER JOIN vw_EmpleadosDetalle ON T.CodigoEmpleado = vw_EmpleadosDetalle.CodigoEmpleado

```
