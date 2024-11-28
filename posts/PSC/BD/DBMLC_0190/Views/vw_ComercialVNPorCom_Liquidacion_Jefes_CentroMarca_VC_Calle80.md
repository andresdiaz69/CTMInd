# View: vw_ComercialVNPorCom_Liquidacion_Jefes_CentroMarca_VC_Calle80

## Usa los objetos:
- [[Empleados]]
- [[vw_ComercialVNPorCom_1_Jefes_VC_Calle80]]

```sql



CREATE VIEW [dbo].[vw_ComercialVNPorCom_Liquidacion_Jefes_CentroMarca_VC_Calle80] AS

SELECT        dbo.vw_ComercialVNPorCom_1_Jefes_VC_Calle80.Ano_Periodo, dbo.vw_ComercialVNPorCom_1_Jefes_VC_Calle80.Mes_Periodo, dbo.vw_ComercialVNPorCom_1_Jefes_VC_Calle80.CodigoEmpresa, dbo.vw_ComercialVNPorCom_1_Jefes_VC_Calle80.Empresa, 
                         dbo.vw_ComercialVNPorCom_1_Jefes_VC_Calle80.CodigoCentro, dbo.vw_ComercialVNPorCom_1_Jefes_VC_Calle80.Centro, dbo.vw_ComercialVNPorCom_1_Jefes_VC_Calle80.CodigoMArca, dbo.vw_ComercialVNPorCom_1_Jefes_VC_Calle80.Marca, 
                         COUNT(dbo.vw_ComercialVNPorCom_1_Jefes_VC_Calle80.ValorComision) AS VehiculosRecaudados, SUM(dbo.vw_ComercialVNPorCom_1_Jefes_VC_Calle80.ValorComision) AS ComisionRecaudo, 
                         SUM(dbo.vw_ComercialVNPorCom_1_Jefes_VC_Calle80.ModeloVehSinComision) AS ModelosVehSinComision, SUM(dbo.vw_ComercialVNPorCom_1_Jefes_VC_Calle80.TotalFactura) AS Facturacion, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() 
                         AS FechaLiquidacion
FROM            dbo.Empleados RIGHT OUTER JOIN
                         dbo.vw_ComercialVNPorCom_1_Jefes_VC_Calle80 ON dbo.Empleados.CodigoEmpleado = dbo.vw_ComercialVNPorCom_1_Jefes_VC_Calle80.CedulaVendedor
GROUP BY dbo.vw_ComercialVNPorCom_1_Jefes_VC_Calle80.Ano_Periodo, dbo.vw_ComercialVNPorCom_1_Jefes_VC_Calle80.Mes_Periodo, dbo.vw_ComercialVNPorCom_1_Jefes_VC_Calle80.Empresa, dbo.vw_ComercialVNPorCom_1_Jefes_VC_Calle80.CodigoEmpresa, 
                         dbo.vw_ComercialVNPorCom_1_Jefes_VC_Calle80.CodigoCentro, dbo.vw_ComercialVNPorCom_1_Jefes_VC_Calle80.Centro, dbo.vw_ComercialVNPorCom_1_Jefes_VC_Calle80.CodigoMArca, dbo.vw_ComercialVNPorCom_1_Jefes_VC_Calle80.Marca

```
