# View: vw_ComercialVNPorCom_Liquidacion_Jefes_Centro

## Usa los objetos:
- [[Empleados]]
- [[vw_ComercialVNPorCom_1_Jefes]]

```sql
CREATE VIEW dbo.vw_ComercialVNPorCom_Liquidacion_Jefes_Centro
AS
SELECT        dbo.vw_ComercialVNPorCom_1_Jefes.Ano_Periodo, dbo.vw_ComercialVNPorCom_1_Jefes.Mes_Periodo, dbo.vw_ComercialVNPorCom_1_Jefes.CodigoEmpresa, dbo.vw_ComercialVNPorCom_1_Jefes.Empresa, 
                         dbo.vw_ComercialVNPorCom_1_Jefes.CodigoCentro, dbo.vw_ComercialVNPorCom_1_Jefes.Centro, COUNT(dbo.vw_ComercialVNPorCom_1_Jefes.ValorComision) AS VehiculosRecaudados, 
                         SUM(dbo.vw_ComercialVNPorCom_1_Jefes.ValorComision) AS ComisionRecaudo, SUM(dbo.vw_ComercialVNPorCom_1_Jefes.ModeloVehSinComision) AS ModelosVehSinComision, 0 AS IdLiquidacion, 0 AS IdHistorico, 
                         GETDATE() AS FechaLiquidacion
FROM            dbo.Empleados RIGHT OUTER JOIN
                         dbo.vw_ComercialVNPorCom_1_Jefes ON dbo.Empleados.CodigoEmpleado = dbo.vw_ComercialVNPorCom_1_Jefes.CedulaVendedor
WHERE        (dbo.vw_ComercialVNPorCom_1_Jefes.FechaEntregaCliente >= '20180701')
GROUP BY dbo.vw_ComercialVNPorCom_1_Jefes.Ano_Periodo, dbo.vw_ComercialVNPorCom_1_Jefes.Mes_Periodo, dbo.vw_ComercialVNPorCom_1_Jefes.Empresa, dbo.vw_ComercialVNPorCom_1_Jefes.CodigoEmpresa, 
                         dbo.vw_ComercialVNPorCom_1_Jefes.CodigoCentro, dbo.vw_ComercialVNPorCom_1_Jefes.Centro

```
