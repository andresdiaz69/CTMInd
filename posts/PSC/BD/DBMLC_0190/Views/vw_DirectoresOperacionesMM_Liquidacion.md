# View: vw_DirectoresOperacionesMM_Liquidacion

## Usa los objetos:
- [[Empleados]]
- [[vw_DirectoresOperacionesMM_5]]
- [[vw_DirectoresOperacionesMM_6]]

```sql
CREATE VIEW [dbo].[vw_DirectoresOperacionesMM_Liquidacion]
AS
SELECT        LIQUIDACION.Ano_Periodo, LIQUIDACION.Mes_Periodo, LIQUIDACION.CodigoEmpleado, dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, 
                         dbo.Empleados.CodigoEmpresa, dbo.Empleados.FechaIngreso, dbo.Empleados.FechaRetiro, LIQUIDACION.ValorNetoMostrador_VentasPosventa, LIQUIDACION.ValorNetoTaller_VentasPosventa, 
                         LIQUIDACION.ValorNetoTotal_VentasPosventa, LIQUIDACION.ValorNetoTaller_MOColision, LIQUIDACION.IdComisionModeloSub, LIQUIDACION.CodigoMarcaGrupo, LIQUIDACION.MarcaGrupo, 
                         LIQUIDACION.Comision_VentasPosventa, LIQUIDACION.Comision_MOColision, LIQUIDACION.Comision_TOTAL, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            (SELECT        ISNULL(dbo.vw_DirectoresOperacionesMM_5.Ano_Periodo, dbo.vw_DirectoresOperacionesMM_6.Ano_Periodo) AS Ano_Periodo, ISNULL(dbo.vw_DirectoresOperacionesMM_5.Mes_Periodo, 
                                                    dbo.vw_DirectoresOperacionesMM_6.Mes_Periodo) AS Mes_Periodo, ISNULL(dbo.vw_DirectoresOperacionesMM_5.CodigoEmpleado, dbo.vw_DirectoresOperacionesMM_6.CodigoEmpleado) AS CodigoEmpleado, 
                                                    ISNULL(dbo.vw_DirectoresOperacionesMM_5.ValorNetoMostrador, 0) AS ValorNetoMostrador_VentasPosventa, ISNULL(dbo.vw_DirectoresOperacionesMM_5.ValorNetoTaller, 0) AS ValorNetoTaller_VentasPosventa, 
                                                    ISNULL(dbo.vw_DirectoresOperacionesMM_5.ValorNetoTotal, 0) AS ValorNetoTotal_VentasPosventa, ISNULL(dbo.vw_DirectoresOperacionesMM_6.ValorNetoTaller, 0) AS ValorNetoTaller_MOColision, 
                                                    ISNULL(dbo.vw_DirectoresOperacionesMM_5.IdComisionModeloSub, dbo.vw_DirectoresOperacionesMM_6.IdComisionModeloSub) AS IdComisionModeloSub, 
                                                    ISNULL(dbo.vw_DirectoresOperacionesMM_5.CodigoMarcaGrupo, dbo.vw_DirectoresOperacionesMM_6.CodigoMarcaGrupo) AS CodigoMarcaGrupo, ISNULL(dbo.vw_DirectoresOperacionesMM_5.MarcaGrupo, 
                                                    dbo.vw_DirectoresOperacionesMM_6.MarcaGrupo) AS MarcaGrupo, ISNULL(dbo.vw_DirectoresOperacionesMM_5.Valor, 0) AS Comision_VentasPosventa, ISNULL(dbo.vw_DirectoresOperacionesMM_6.Valor, 0) 
                                                    AS Comision_MOColision, ISNULL(dbo.vw_DirectoresOperacionesMM_5.Valor, 0) + ISNULL(dbo.vw_DirectoresOperacionesMM_6.Valor, 0) AS Comision_TOTAL
                          FROM            dbo.vw_DirectoresOperacionesMM_5 FULL OUTER JOIN
                                                    dbo.vw_DirectoresOperacionesMM_6 ON dbo.vw_DirectoresOperacionesMM_5.Ano_Periodo = dbo.vw_DirectoresOperacionesMM_6.Ano_Periodo AND 
                                                    dbo.vw_DirectoresOperacionesMM_5.Mes_Periodo = dbo.vw_DirectoresOperacionesMM_6.Mes_Periodo AND 
                                                    dbo.vw_DirectoresOperacionesMM_5.CodigoEmpleado = dbo.vw_DirectoresOperacionesMM_6.CodigoEmpleado) AS LIQUIDACION LEFT OUTER JOIN
                         dbo.Empleados ON LIQUIDACION.CodigoEmpleado = dbo.Empleados.CodigoEmpleado


```
