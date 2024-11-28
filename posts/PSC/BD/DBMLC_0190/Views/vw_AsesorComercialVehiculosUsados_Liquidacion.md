# View: vw_AsesorComercialVehiculosUsados_Liquidacion

## Usa los objetos:
- [[vw_AsesorComercialVehiculosUsados_1]]
- [[vw_AsesorComercialVehiculosUsados_2]]
- [[vw_AsesorComercialVehiculosUsados_4]]
- [[vw_AsesorComercialVehiculosUsados_5]]
- [[vw_AsesorComercialVehiculosUsados_6]]
- [[vw_AsesorComercialVehiculosUsadosAcc_Liquidacion]]
- [[vw_EmpleadosDetalleModeloSubPeriodos]]

```sql



CREATE VIEW [dbo].[vw_AsesorComercialVehiculosUsados_Liquidacion]
AS
SELECT        EMPLEADOS.Ano_Periodo, EMPLEADOS.Mes_Periodo, EMPLEADOS.CodigoEmpleado, EMPLEADOS.Empleado, EMPLEADOS.CodigoEmpresa, EMPLEADOS.NombreEmpresa, EMPLEADOS.FechaIngreso, 
                         EMPLEADOS.FechaRetiro, EMPLEADOS.IdComisionModeloSub, EMPLEADOS.NombreModeloSub, 
						 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsados_1.CantidadEntregas, 0) AS CantidadEntregas, 
                         ISNULL(dbo.vw_AsesorComercialVehiculosUsados_1.TotalFacturas, 0) AS TotalFacturas, 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsados_1.Desde, 0) AS Desde, 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsados_1.Hasta, 0) AS Hasta, 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsados_1.Valor, 0) AS Valor, 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsados_1.Valor_ComisionEntregas, 0) AS Valor_ComisionEntregas, 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsados_1.IdRangoMaestra, 0) AS IdRangoMaestra_ComisionEntregas, 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsados_1.CodigoConcepto, 0) AS CodigoConcepto_ComisionEntregas, 

                         ISNULL(dbo.vw_AsesorComercialVehiculosUsados_2.PromedioFacturas, 0) AS PromedioFacturas, 						 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsados_2.Valor_IncentivoVolumenUnitario, 0) AS Valor_ComisionVolumenUnitario, 
                         ISNULL(dbo.vw_AsesorComercialVehiculosUsados_2.Valor_IncentivoVolumen, 0) AS Valor_ComisionVolumen, 
						 0 AS IdRangoMaestra_ComisionVolumen, 
						 100160 AS CodigoConcepto_ComisionVolumen,
						 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAcc_Liquidacion.ValorVariable, 0) AS ValorVariableAccesorios, 
                         ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAcc_Liquidacion.ValorNetoMostrador, 0) AS ValorNetoMostrador,						 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAcc_Liquidacion.BonificacionMostrador, 0) AS BonificacionMostrador,						 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAcc_Liquidacion.ValorNetoTaller, 0) AS ValorNetoTaller, 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAcc_Liquidacion.BonificacionTaller, 0) AS BonificacionTaller,						 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAcc_Liquidacion.BonificacionTotal, 0) AS Valor_ComisionAccesorios, 
						 0 AS IdRangoMaestra_ComisionAccesorios, 
						 100002 AS CodigoConcepto_ComisionAccesorios,
						 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsados_4.ComprasUsados, 0) AS ComprasUsados,						 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsados_4.ValorVariable, 0) AS ValorVariableCompra, 						 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsados_4.ComisionCompra, 0) AS Valor_ComisionCompra, 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsados_4.IdRangoMaestra, 0) AS IdRangoMaestra_ComisionCompra, 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsados_4.CodigoConcepto, 0) AS CodigoConcepto_ComisionCompra, 

                         ISNULL(dbo.vw_AsesorComercialVehiculosUsados_5.RetomasUsados, 0) AS RetomasUsados,
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsados_5.ValorVariable, 0) AS ValorVariableRetoma, 
                         ISNULL(dbo.vw_AsesorComercialVehiculosUsados_5.ComisionRetoma, 0) AS Valor_ComisionRetoma, 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsados_5.IdRangoMaestra, 0) AS IdRangoMaestra_ComisionRetoma, 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsados_5.CodigoConcepto, 0) AS CodigoConcepto_ComisionRetoma, 
						 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsados_6.TotalVentaEquirent, 0) AS TotalVentaEquirent, 
                         ISNULL(dbo.vw_AsesorComercialVehiculosUsados_6.ValorVariable, 0) AS ValorVariableEquirent, 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsados_6.ComisionEquirent, 0) AS Valor_ComisionEquirent, 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsados_6.IdRangoMaestra, 0) AS IdRangoMaestra_ComisionEquirent, 
						 ISNULL(dbo.vw_AsesorComercialVehiculosUsados_6.CodigoConcepto, 0) AS CodigoConcepto_ComisionEquirent, 

                         ISNULL(dbo.vw_AsesorComercialVehiculosUsados_1.Valor_ComisionEntregas, 0) + ISNULL(dbo.vw_AsesorComercialVehiculosUsados_2.Valor_IncentivoVolumen, 0) 
                         + ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAcc_Liquidacion.BonificacionTotal, 0) + ISNULL(dbo.vw_AsesorComercialVehiculosUsados_4.ComisionCompra, 0) 
                         + ISNULL(dbo.vw_AsesorComercialVehiculosUsados_5.ComisionRetoma, 0) + ISNULL(dbo.vw_AsesorComercialVehiculosUsados_6.ComisionEquirent, 0) AS Valor_ComisionTotal, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() 
                         AS FechaLiquidacion
FROM            dbo.vw_AsesorComercialVehiculosUsados_6 RIGHT OUTER JOIN
                             (SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpleado, IdComisionModeloSub, NombreModeloSub, Empleado, CodigoEmpresa, NombreEmpresa, FechaIngreso, FechaRetiro
                               FROM            dbo.vw_EmpleadosDetalleModeloSubPeriodos
                               WHERE        (IdComisionModeloSub = 39)) AS EMPLEADOS ON dbo.vw_AsesorComercialVehiculosUsados_6.CodigoEmpleado = EMPLEADOS.CodigoEmpleado AND 
                         dbo.vw_AsesorComercialVehiculosUsados_6.Mes_Periodo = EMPLEADOS.Mes_Periodo AND dbo.vw_AsesorComercialVehiculosUsados_6.Ano_Periodo = EMPLEADOS.Ano_Periodo LEFT OUTER JOIN
                         dbo.vw_AsesorComercialVehiculosUsados_5 ON EMPLEADOS.Ano_Periodo = dbo.vw_AsesorComercialVehiculosUsados_5.Ano_Periodo AND 
                         EMPLEADOS.Mes_Periodo = dbo.vw_AsesorComercialVehiculosUsados_5.Mes_Periodo AND EMPLEADOS.CodigoEmpleado = dbo.vw_AsesorComercialVehiculosUsados_5.CodigoEmpleado LEFT OUTER JOIN
                         dbo.vw_AsesorComercialVehiculosUsados_4 ON EMPLEADOS.Ano_Periodo = dbo.vw_AsesorComercialVehiculosUsados_4.Ano_Periodo AND 
                         EMPLEADOS.Mes_Periodo = dbo.vw_AsesorComercialVehiculosUsados_4.Mes_Periodo AND EMPLEADOS.CodigoEmpleado = dbo.vw_AsesorComercialVehiculosUsados_4.CodigoEmpleado LEFT OUTER JOIN
                         dbo.vw_AsesorComercialVehiculosUsadosAcc_Liquidacion ON EMPLEADOS.Ano_Periodo = dbo.vw_AsesorComercialVehiculosUsadosAcc_Liquidacion.Ano_Periodo AND 
                         EMPLEADOS.Mes_Periodo = dbo.vw_AsesorComercialVehiculosUsadosAcc_Liquidacion.Mes_Periodo AND 
                         EMPLEADOS.CodigoEmpleado = dbo.vw_AsesorComercialVehiculosUsadosAcc_Liquidacion.CodigoEmpleado LEFT OUTER JOIN
                         dbo.vw_AsesorComercialVehiculosUsados_2 ON EMPLEADOS.Ano_Periodo = dbo.vw_AsesorComercialVehiculosUsados_2.Ano_Periodo AND 
                         EMPLEADOS.Mes_Periodo = dbo.vw_AsesorComercialVehiculosUsados_2.Mes_Periodo AND EMPLEADOS.CodigoEmpleado = dbo.vw_AsesorComercialVehiculosUsados_2.CodigoEmpleado LEFT OUTER JOIN
                         dbo.vw_AsesorComercialVehiculosUsados_1 ON EMPLEADOS.Ano_Periodo = dbo.vw_AsesorComercialVehiculosUsados_1.Ano_Periodo AND 
                         EMPLEADOS.Mes_Periodo = dbo.vw_AsesorComercialVehiculosUsados_1.Mes_Periodo AND EMPLEADOS.CodigoEmpleado = dbo.vw_AsesorComercialVehiculosUsados_1.CodigoEmpleado
WHERE        (ISNULL(dbo.vw_AsesorComercialVehiculosUsados_1.Valor_ComisionEntregas, 0) + ISNULL(dbo.vw_AsesorComercialVehiculosUsados_2.Valor_IncentivoVolumen, 0) 
                         + ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAcc_Liquidacion.BonificacionTotal, 0) + ISNULL(dbo.vw_AsesorComercialVehiculosUsados_4.ComisionCompra, 0) 
                         + ISNULL(dbo.vw_AsesorComercialVehiculosUsados_5.ComisionRetoma, 0) + ISNULL(dbo.vw_AsesorComercialVehiculosUsados_6.ComisionEquirent, 0) > 0)

```
