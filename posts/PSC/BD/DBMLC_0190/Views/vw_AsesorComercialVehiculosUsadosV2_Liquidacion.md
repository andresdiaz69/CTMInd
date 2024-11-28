# View: vw_AsesorComercialVehiculosUsadosV2_Liquidacion

## Usa los objetos:
- [[vw_AsesorComercialVehiculosUsadosAccV2_Liquidacion]]
- [[vw_AsesorComercialVehiculosUsadosCompraV2_Liquidacion]]
- [[vw_AsesorComercialVehiculosUsadosPorComV2_Liquidacion]]
- [[vw_AsesorComercialVehiculosUsadosRetomaV2_Liquidacion]]
- [[vw_EmpleadosDetalleModeloSubPeriodos]]

```sql



CREATE VIEW [dbo].[vw_AsesorComercialVehiculosUsadosV2_Liquidacion]
AS
SELECT        EMPLEADOS.Ano_Periodo, EMPLEADOS.Mes_Periodo, EMPLEADOS.CodigoEmpleado, EMPLEADOS.Empleado, EMPLEADOS.CodigoEmpresa, EMPLEADOS.NombreEmpresa, EMPLEADOS.FechaIngreso, 
                         EMPLEADOS.FechaRetiro, EMPLEADOS.IdComisionModeloSub, EMPLEADOS.NombreModeloSub, 
						 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsadosPorComV2_Liquidacion.VehiculosRecaudados, 0) AS VehiculosRecaudados, 
                         ISNULL(dbo.vw_AsesorComercialVehiculosUsadosPorComV2_Liquidacion.ModelosVehSinComision, 0) AS ModelosVehSinComision, 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsadosPorComV2_Liquidacion.ComisionRecaudo, 0) AS Valor_ComisionRecaudo, 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsadosPorComV2_Liquidacion.IdRangoMaestra, 0) AS IdRangoMaestra_ComisionRecaudo, 
						 100160 AS CodigoConcepto_ComisionRecaudo, 

                         ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAccV2_Liquidacion.ValorVariable, 0) AS ValorVariableAccesorios, 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAccV2_Liquidacion.ValorNetoMostrador, 0) AS ValorNetoMostrador, 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAccV2_Liquidacion.BonificacionMostrador, 0) AS BonificacionMostrador, 
                         ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAccV2_Liquidacion.ValorNetoTaller, 0) AS ValorNetoTaller, 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAccV2_Liquidacion.BonificacionTaller, 0) AS BonificacionTaller, 
                         ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAccV2_Liquidacion.BonificacionTotal, 0) AS Valor_ComisionAccesorios, 
						 0 AS IdRangoMaestra_ComisionAccesorios, 
						 100002 AS CodigoConcepto_ComisionAccesorios, 

                         ISNULL(dbo.vw_AsesorComercialVehiculosUsadosCompraV2_Liquidacion.ComprasUsados, 0) AS ComprasUsados, 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsadosCompraV2_Liquidacion.ValorVariable, 0) AS ValorVariableCompra, 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsadosCompraV2_Liquidacion.ComisionCompra, 0) AS Valor_ComisionCompra, 
                         0 AS IdRangoMaestra_ComisionCompra, 
						 100161 AS CodigoConcepto_ComisionCompra, 

						 ISNULL(dbo.vw_AsesorComercialVehiculosUsadosRetomaV2_Liquidacion.RetomasUsados, 0) AS RetomasUsados, 
                         ISNULL(dbo.vw_AsesorComercialVehiculosUsadosRetomaV2_Liquidacion.ValorVariable, 0) AS ValorVariableRetoma, 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsadosRetomaV2_Liquidacion.ComisionRetoma, 0) AS Valor_ComisionRetoma, 
						 0 AS IdRangoMaestra_ComisionRetoma, 
                         100003 AS CodigoConcepto_ComisionRetoma, 

						 ISNULL(dbo.vw_AsesorComercialVehiculosUsadosPorComV2_Liquidacion.ComisionRecaudo, 0) +
                         ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAccV2_Liquidacion.BonificacionTotal, 0) + 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsadosCompraV2_Liquidacion.ComisionCompra, 0) + 
                         ISNULL(dbo.vw_AsesorComercialVehiculosUsadosRetomaV2_Liquidacion.ComisionRetoma, 0)
						 AS Valor_ComisionTotal,
						 
						 0 AS IdLiquidacion,
						 0 AS IdHistorico, 
						 GETDATE() AS FechaLiquidacion

FROM            (SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpleado, IdComisionModeloSub, NombreModeloSub, Empleado, CodigoEmpresa, NombreEmpresa, FechaIngreso, FechaRetiro
                          FROM            dbo.vw_EmpleadosDetalleModeloSubPeriodos
                          WHERE        (IdComisionModeloSub = 99)) AS EMPLEADOS LEFT OUTER JOIN
                         dbo.vw_AsesorComercialVehiculosUsadosRetomaV2_Liquidacion ON EMPLEADOS.Ano_Periodo = dbo.vw_AsesorComercialVehiculosUsadosRetomaV2_Liquidacion.Ano_Periodo AND 
                         EMPLEADOS.Mes_Periodo = dbo.vw_AsesorComercialVehiculosUsadosRetomaV2_Liquidacion.Mes_Periodo AND 
                         EMPLEADOS.CodigoEmpleado = dbo.vw_AsesorComercialVehiculosUsadosRetomaV2_Liquidacion.CodigoEmpleado LEFT OUTER JOIN
                         dbo.vw_AsesorComercialVehiculosUsadosCompraV2_Liquidacion ON EMPLEADOS.Ano_Periodo = dbo.vw_AsesorComercialVehiculosUsadosCompraV2_Liquidacion.Ano_Periodo AND 
                         EMPLEADOS.Mes_Periodo = dbo.vw_AsesorComercialVehiculosUsadosCompraV2_Liquidacion.Mes_Periodo AND 
                         EMPLEADOS.CodigoEmpleado = dbo.vw_AsesorComercialVehiculosUsadosCompraV2_Liquidacion.CodigoEmpleado LEFT OUTER JOIN
                         dbo.vw_AsesorComercialVehiculosUsadosAccV2_Liquidacion ON EMPLEADOS.Ano_Periodo = dbo.vw_AsesorComercialVehiculosUsadosAccV2_Liquidacion.Ano_Periodo AND 
                         EMPLEADOS.Mes_Periodo = dbo.vw_AsesorComercialVehiculosUsadosAccV2_Liquidacion.Mes_Periodo AND 
                         EMPLEADOS.CodigoEmpleado = dbo.vw_AsesorComercialVehiculosUsadosAccV2_Liquidacion.CodigoEmpleado LEFT OUTER JOIN
                         dbo.vw_AsesorComercialVehiculosUsadosPorComV2_Liquidacion ON EMPLEADOS.Ano_Periodo = dbo.vw_AsesorComercialVehiculosUsadosPorComV2_Liquidacion.Ano_Periodo AND 
                         EMPLEADOS.Mes_Periodo = dbo.vw_AsesorComercialVehiculosUsadosPorComV2_Liquidacion.Mes_Periodo AND 
                         EMPLEADOS.CodigoEmpleado = dbo.vw_AsesorComercialVehiculosUsadosPorComV2_Liquidacion.CodigoEmpleado

						 WHERE

						 (ISNULL(dbo.vw_AsesorComercialVehiculosUsadosPorComV2_Liquidacion.ComisionRecaudo, 0) +
                         ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAccV2_Liquidacion.BonificacionTotal, 0) + 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsadosCompraV2_Liquidacion.ComisionCompra, 0) + 
                         ISNULL(dbo.vw_AsesorComercialVehiculosUsadosRetomaV2_Liquidacion.ComisionRetoma, 0)) > 0

```
