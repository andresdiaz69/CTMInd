# View: vw_CompradoresVehiculosUsados_Liquidacion

## Usa los objetos:
- [[vw_CompradoresVehiculosUsados_1]]
- [[vw_CompradoresVehiculosUsados_2]]
- [[vw_EmpleadosDetalle]]

```sql



CREATE VIEW [dbo].[vw_CompradoresVehiculosUsados_Liquidacion]
AS
SELECT        dbo.vw_CompradoresVehiculosUsados_1.Ano_Periodo, dbo.vw_CompradoresVehiculosUsados_1.Mes_Periodo, dbo.vw_CompradoresVehiculosUsados_1.CodigoEmpleado, dbo.vw_EmpleadosDetalle.Empleado, 
                         dbo.vw_EmpleadosDetalle.CodigoEmpresa, dbo.vw_EmpleadosDetalle.NombreEmpresa, dbo.vw_EmpleadosDetalle.FechaIngreso, dbo.vw_EmpleadosDetalle.FechaRetiro, 
                         dbo.vw_CompradoresVehiculosUsados_1.IdComisionModeloSub, vw_CompradoresVehiculosUsados_1.Valor as Valor_Comision,ISNULL(dbo.vw_CompradoresVehiculosUsados_1.ComprasUsados, 0) AS Unidades, ISNULL(dbo.vw_CompradoresVehiculosUsados_1.ComisionCompra, 0) 
                         AS Comision_Compradores, ISNULL(dbo.vw_CompradoresVehiculosUsados_2.Valor, 0) AS BonificacionVM,
                         ISNULL(dbo.vw_CompradoresVehiculosUsados_1.ComisionCompra, 0) + ISNULL(dbo.vw_CompradoresVehiculosUsados_2.Valor, 0) AS Comision_TOTAL, 
                         0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_CompradoresVehiculosUsados_1 LEFT OUTER JOIN
                         dbo.vw_CompradoresVehiculosUsados_2 ON dbo.vw_CompradoresVehiculosUsados_2.CodigoEmpleado = dbo.vw_CompradoresVehiculosUsados_1.CodigoEmpleado AND 
                         dbo.vw_CompradoresVehiculosUsados_2.Ano_Periodo = dbo.vw_CompradoresVehiculosUsados_1.Ano_Periodo AND 
                         dbo.vw_CompradoresVehiculosUsados_2.Mes_Periodo = dbo.vw_CompradoresVehiculosUsados_1.Mes_Periodo LEFT OUTER JOIN
                         dbo.vw_EmpleadosDetalle ON dbo.vw_CompradoresVehiculosUsados_1.CodigoEmpleado = dbo.vw_EmpleadosDetalle.CodigoEmpleado

```
