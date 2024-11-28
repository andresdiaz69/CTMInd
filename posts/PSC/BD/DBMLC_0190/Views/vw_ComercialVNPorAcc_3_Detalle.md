# View: vw_ComercialVNPorAcc_3_Detalle

## Usa los objetos:
- [[vw_ComercialVNPorAcc_1_Detalle]]
- [[vw_ComercialVNPorAcc_2_Detalle]]

```sql


CREATE VIEW [dbo].[vw_ComercialVNPorAcc_3_Detalle]
AS
SELECT        ISNULL(dbo.vw_ComercialVNPorAcc_1_Detalle.Ano_Periodo, dbo.vw_ComercialVNPorAcc_2_Detalle.Ano_Periodo) AS Ano_Periodo, ISNULL(dbo.vw_ComercialVNPorAcc_1_Detalle.Mes_Periodo, 
                         dbo.vw_ComercialVNPorAcc_2_Detalle.Mes_Periodo) AS Mes_Periodo, ISNULL(dbo.vw_ComercialVNPorAcc_1_Detalle.CodigoEmpresa, dbo.vw_ComercialVNPorAcc_2_Detalle.CodigoEmpresa) AS CodigoEmpresa, 
                         ISNULL(dbo.vw_ComercialVNPorAcc_1_Detalle.CedulaVendedorRepuestos, dbo.vw_ComercialVNPorAcc_2_Detalle.CedulaVendedorRepuestos) AS CedulaVendedorRepuestos, 
                         ISNULL(dbo.vw_ComercialVNPorAcc_1_Detalle.NumeroFactura, dbo.vw_ComercialVNPorAcc_2_Detalle.NumeroFacturaTaller) AS NumeroFactura, ISNULL(dbo.vw_ComercialVNPorAcc_1_Detalle.ValorVariableCT, 
                         dbo.vw_ComercialVNPorAcc_2_Detalle.ValorVariableCT) AS ValorVariableCT, ISNULL(dbo.vw_ComercialVNPorAcc_1_Detalle.ValorVariableMM, dbo.vw_ComercialVNPorAcc_2_Detalle.ValorVariableMM) AS ValorVariableMM, 
                         ISNULL(dbo.vw_ComercialVNPorAcc_1_Detalle.ValorNetoMostrador, 0) AS ValorNetoMostrador, ISNULL(dbo.vw_ComercialVNPorAcc_1_Detalle.BonificacionMostrador, 0) AS BonificacionMostrador, 
                         ISNULL(dbo.vw_ComercialVNPorAcc_2_Detalle.ValorNetoTaller, 0) AS ValorNetoTaller, ISNULL(dbo.vw_ComercialVNPorAcc_2_Detalle.BonificacionTaller, 0) AS BonificacionTaller, 
                         ISNULL(dbo.vw_ComercialVNPorAcc_1_Detalle.BonificacionMostrador, 0) + ISNULL(dbo.vw_ComercialVNPorAcc_2_Detalle.BonificacionTaller, 0) AS BonificacionTotal, 0 AS IdLiquidacion, 0 AS IdHistorico
FROM            dbo.vw_ComercialVNPorAcc_1_Detalle FULL OUTER JOIN
                         dbo.vw_ComercialVNPorAcc_2_Detalle ON dbo.vw_ComercialVNPorAcc_1_Detalle.NumeroFactura = dbo.vw_ComercialVNPorAcc_2_Detalle.NumeroFacturaTaller AND 
                         dbo.vw_ComercialVNPorAcc_1_Detalle.Ano_Periodo = dbo.vw_ComercialVNPorAcc_2_Detalle.Ano_Periodo AND dbo.vw_ComercialVNPorAcc_1_Detalle.Mes_Periodo = dbo.vw_ComercialVNPorAcc_2_Detalle.Mes_Periodo AND 
                         dbo.vw_ComercialVNPorAcc_1_Detalle.CodigoEmpresa = dbo.vw_ComercialVNPorAcc_2_Detalle.CodigoEmpresa AND 
                         dbo.vw_ComercialVNPorAcc_1_Detalle.CedulaVendedorRepuestos = dbo.vw_ComercialVNPorAcc_2_Detalle.CedulaVendedorRepuestos


```
