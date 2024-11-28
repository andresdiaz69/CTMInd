# View: vw_AsesorComercialVehiculosUsados_Liquidacion_OLD

## Usa los objetos:
- [[vw_AsesorComercialVehiculosUsados_1]]
- [[vw_AsesorComercialVehiculosUsados_2]]
- [[vw_AsesorComercialVehiculosUsados_4]]
- [[vw_AsesorComercialVehiculosUsados_5]]
- [[vw_AsesorComercialVehiculosUsadosAcc_Liquidacion]]
- [[vw_EmpleadosDetalle]]

```sql
CREATE VIEW [dbo].[vw_AsesorComercialVehiculosUsados_Liquidacion]
AS
SELECT        dbo.vw_AsesorComercialVehiculosUsados_1.Ano_Periodo, dbo.vw_AsesorComercialVehiculosUsados_1.Mes_Periodo, dbo.vw_AsesorComercialVehiculosUsados_1.CodigoEmpleado, dbo.vw_EmpleadosDetalle.Empleado, 
                         dbo.vw_EmpleadosDetalle.CodigoEmpresa, dbo.vw_EmpleadosDetalle.NombreEmpresa, dbo.vw_EmpleadosDetalle.FechaIngreso, dbo.vw_EmpleadosDetalle.FechaRetiro, 
                         dbo.vw_AsesorComercialVehiculosUsados_1.IdComisionModeloSub, ISNULL(dbo.vw_AsesorComercialVehiculosUsados_1.CantidadEntregas, 0) AS CantidadEntregas, 
                         dbo.vw_AsesorComercialVehiculosUsados_1.TotalFacturas, dbo.vw_AsesorComercialVehiculosUsados_1.Desde, dbo.vw_AsesorComercialVehiculosUsados_1.Hasta, dbo.vw_AsesorComercialVehiculosUsados_1.Valor, 
                         ISNULL(dbo.vw_AsesorComercialVehiculosUsados_1.Valor_ComisionEntregas, 0) AS Valor_ComisionEntregas, dbo.vw_AsesorComercialVehiculosUsados_2.PromedioFacturas, 
                         ISNULL(dbo.vw_AsesorComercialVehiculosUsados_2.Valor_IncentivoVolumenUnitario, 0) AS Valor_ComisionVolumenUnitario, ISNULL(dbo.vw_AsesorComercialVehiculosUsados_2.Valor_IncentivoVolumen, 0) 
                         AS Valor_ComisionVolumen, dbo.vw_AsesorComercialVehiculosUsadosAcc_Liquidacion.ValorVariable AS ValorVariableAccesorios, dbo.vw_AsesorComercialVehiculosUsadosAcc_Liquidacion.ValorNetoMostrador, 
                         dbo.vw_AsesorComercialVehiculosUsadosAcc_Liquidacion.BonificacionMostrador, dbo.vw_AsesorComercialVehiculosUsadosAcc_Liquidacion.ValorNetoTaller, 
                         dbo.vw_AsesorComercialVehiculosUsadosAcc_Liquidacion.BonificacionTaller, ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAcc_Liquidacion.BonificacionTotal, 0) AS Valor_ComisionAccesorios, 
                         dbo.vw_AsesorComercialVehiculosUsados_4.ComprasUsados, dbo.vw_AsesorComercialVehiculosUsados_4.ValorVariable AS ValorVariableCompra, ISNULL(dbo.vw_AsesorComercialVehiculosUsados_4.ComisionCompra, 0) 
                         AS Valor_ComisionCompra, dbo.vw_AsesorComercialVehiculosUsados_5.RetomasUsados, dbo.vw_AsesorComercialVehiculosUsados_5.ValorVariable AS ValorVariableRetoma, 
                         ISNULL(dbo.vw_AsesorComercialVehiculosUsados_5.ComisionRetoma, 0) AS Valor_ComisionRetoma, ISNULL(dbo.vw_AsesorComercialVehiculosUsados_1.Valor_ComisionEntregas, 0) 
                         + ISNULL(dbo.vw_AsesorComercialVehiculosUsados_2.Valor_IncentivoVolumen, 0) + ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAcc_Liquidacion.BonificacionTotal, 0) 
                         + ISNULL(dbo.vw_AsesorComercialVehiculosUsados_4.ComisionCompra, 0) + ISNULL(dbo.vw_AsesorComercialVehiculosUsados_5.ComisionRetoma, 0) AS Valor_ComisionTotal, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() 
                         AS FechaLiquidacion
FROM            dbo.vw_AsesorComercialVehiculosUsados_1 LEFT OUTER JOIN
                         dbo.vw_AsesorComercialVehiculosUsados_5 ON dbo.vw_AsesorComercialVehiculosUsados_1.CodigoEmpleado = dbo.vw_AsesorComercialVehiculosUsados_5.CodigoEmpleado AND 
                         dbo.vw_AsesorComercialVehiculosUsados_1.Mes_Periodo = dbo.vw_AsesorComercialVehiculosUsados_5.Mes_Periodo AND 
                         dbo.vw_AsesorComercialVehiculosUsados_1.Ano_Periodo = dbo.vw_AsesorComercialVehiculosUsados_5.Ano_Periodo LEFT OUTER JOIN
                         dbo.vw_AsesorComercialVehiculosUsados_4 ON dbo.vw_AsesorComercialVehiculosUsados_1.CodigoEmpleado = dbo.vw_AsesorComercialVehiculosUsados_4.CodigoEmpleado AND 
                         dbo.vw_AsesorComercialVehiculosUsados_1.Mes_Periodo = dbo.vw_AsesorComercialVehiculosUsados_4.Mes_Periodo AND 
                         dbo.vw_AsesorComercialVehiculosUsados_1.Ano_Periodo = dbo.vw_AsesorComercialVehiculosUsados_4.Ano_Periodo LEFT OUTER JOIN
                         dbo.vw_AsesorComercialVehiculosUsadosAcc_Liquidacion ON dbo.vw_AsesorComercialVehiculosUsados_1.CodigoEmpleado = dbo.vw_AsesorComercialVehiculosUsadosAcc_Liquidacion.CodigoEmpleado AND 
                         dbo.vw_AsesorComercialVehiculosUsados_1.Mes_Periodo = dbo.vw_AsesorComercialVehiculosUsadosAcc_Liquidacion.Mes_Periodo AND 
                         dbo.vw_AsesorComercialVehiculosUsados_1.Ano_Periodo = dbo.vw_AsesorComercialVehiculosUsadosAcc_Liquidacion.Ano_Periodo LEFT OUTER JOIN
                         dbo.vw_AsesorComercialVehiculosUsados_2 ON dbo.vw_AsesorComercialVehiculosUsados_1.CodigoEmpleado = dbo.vw_AsesorComercialVehiculosUsados_2.CodigoEmpleado AND 
                         dbo.vw_AsesorComercialVehiculosUsados_1.Mes_Periodo = dbo.vw_AsesorComercialVehiculosUsados_2.Mes_Periodo AND 
                         dbo.vw_AsesorComercialVehiculosUsados_1.Ano_Periodo = dbo.vw_AsesorComercialVehiculosUsados_2.Ano_Periodo LEFT OUTER JOIN
                         dbo.vw_EmpleadosDetalle ON dbo.vw_AsesorComercialVehiculosUsados_1.CodigoEmpleado = dbo.vw_EmpleadosDetalle.CodigoEmpleado

```
