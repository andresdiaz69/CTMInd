# View: vw_RepuestosVendedoresComisionesMM_4_Detalle

## Usa los objetos:
- [[vw_RepuestosVendedoresComisionesMM_1]]
- [[vw_RepuestosVendedoresComisionesMM_3_Detalle]]

```sql
CREATE VIEW [dbo].[vw_RepuestosVendedoresComisionesMM_4_Detalle]
AS
SELECT        ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_1.Ano_Periodo, dbo.vw_RepuestosVendedoresComisionesMM_3_Detalle.Ano_Periodo) AS Ano_Periodo, 
                         ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_1.Mes_Periodo, dbo.vw_RepuestosVendedoresComisionesMM_3_Detalle.Mes_Periodo) AS Mes_Periodo, 
                         ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_1.CodigoEmpresa, dbo.vw_RepuestosVendedoresComisionesMM_3_Detalle.CodigoEmpresa) AS CodigoEmpresa, 
                         ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_1.Centro, dbo.vw_RepuestosVendedoresComisionesMM_3_Detalle.Centro) AS Centro, ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_1.NumeroFactura, 
                         dbo.vw_RepuestosVendedoresComisionesMM_3_Detalle.NumeroFacturaTaller) AS NumeroFactura, ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_1.FechaFactura, 
                         dbo.vw_RepuestosVendedoresComisionesMM_3_Detalle.FechaFactura) AS FechaFactura, ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_1.TotalFactura, 
                         dbo.vw_RepuestosVendedoresComisionesMM_3_Detalle.ValorTotalFactura) AS TotalFactura, ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_1.ImporteEfecto, 
                         dbo.vw_RepuestosVendedoresComisionesMM_3_Detalle.ImporteEfecto) AS ImporteEfecto, ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_1.PorcentajeRecaudo, 
                         dbo.vw_RepuestosVendedoresComisionesMM_3_Detalle.PorcentajeRecaudo) AS PorcentajeRecaudo, ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_1.CedulaVendedorRepuestos, 
                         dbo.vw_RepuestosVendedoresComisionesMM_3_Detalle.CedulaVendedorRepuestos) AS CedulaVendedorRepuestos, ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_1.ValorVariable, 
                         dbo.vw_RepuestosVendedoresComisionesMM_3_Detalle.ValorVariable) AS ValorVariable, ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_1.ValorBaseMostrador, 0) AS ValorBaseMostrador, 
                         ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_1.ComisionMostrador, 0) AS ComisionMostrador, ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_3_Detalle.ValorBaseTaller, 0) AS ValorBaseTaller, 
                         ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_3_Detalle.ComisionTaller, 0) AS ComisionTaller, ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_1.ValorBaseMostrador, 0) 
                         + ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_3_Detalle.ValorBaseTaller, 0) AS ValorBaseTotal, ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_1.ComisionMostrador, 0) 
                         + ISNULL(dbo.vw_RepuestosVendedoresComisionesMM_3_Detalle.ComisionTaller, 0) AS Comision, dbo.vw_RepuestosVendedoresComisionesMM_1.TipoAlmacen, 
                         dbo.vw_RepuestosVendedoresComisionesMM_3_Detalle.TipoTaller
FROM            dbo.vw_RepuestosVendedoresComisionesMM_1 FULL OUTER JOIN
                         dbo.vw_RepuestosVendedoresComisionesMM_3_Detalle ON dbo.vw_RepuestosVendedoresComisionesMM_1.PorcentajeRecaudo = dbo.vw_RepuestosVendedoresComisionesMM_3_Detalle.PorcentajeRecaudo AND 
                         dbo.vw_RepuestosVendedoresComisionesMM_1.ImporteEfecto = dbo.vw_RepuestosVendedoresComisionesMM_3_Detalle.ImporteEfecto AND 
                         dbo.vw_RepuestosVendedoresComisionesMM_1.TotalFactura = dbo.vw_RepuestosVendedoresComisionesMM_3_Detalle.ValorTotalFactura AND 
                         dbo.vw_RepuestosVendedoresComisionesMM_1.FechaFactura = dbo.vw_RepuestosVendedoresComisionesMM_3_Detalle.FechaFactura AND 
                         dbo.vw_RepuestosVendedoresComisionesMM_1.Centro = dbo.vw_RepuestosVendedoresComisionesMM_3_Detalle.Centro AND 
                         dbo.vw_RepuestosVendedoresComisionesMM_1.NumeroFactura = dbo.vw_RepuestosVendedoresComisionesMM_3_Detalle.NumeroFacturaTaller AND 
                         dbo.vw_RepuestosVendedoresComisionesMM_1.Ano_Periodo = dbo.vw_RepuestosVendedoresComisionesMM_3_Detalle.Ano_Periodo AND 
                         dbo.vw_RepuestosVendedoresComisionesMM_1.Mes_Periodo = dbo.vw_RepuestosVendedoresComisionesMM_3_Detalle.Mes_Periodo AND 
                         dbo.vw_RepuestosVendedoresComisionesMM_1.CodigoEmpresa = dbo.vw_RepuestosVendedoresComisionesMM_3_Detalle.CodigoEmpresa AND 
                         dbo.vw_RepuestosVendedoresComisionesMM_1.CedulaVendedorRepuestos = dbo.vw_RepuestosVendedoresComisionesMM_3_Detalle.CedulaVendedorRepuestos


```
