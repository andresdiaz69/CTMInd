# View: vw_RepuestosV2_VendedoresDeTienda_4_Detalle

## Usa los objetos:
- [[vw_RepuestosV2_VendedoresDeTienda_1]]
- [[vw_RepuestosV2_VendedoresDeTienda_3_Detalle]]

```sql



CREATE VIEW [dbo].[vw_RepuestosV2_VendedoresDeTienda_4_Detalle]
AS
SELECT        ISNULL(dbo.vw_RepuestosV2_VendedoresDeTienda_1.Ano_Periodo, dbo.vw_RepuestosV2_VendedoresDeTienda_3_Detalle.Ano_Periodo) AS Ano_Periodo, 
                         ISNULL(dbo.vw_RepuestosV2_VendedoresDeTienda_1.Mes_Periodo, dbo.vw_RepuestosV2_VendedoresDeTienda_3_Detalle.Mes_Periodo) AS Mes_Periodo, 
                         ISNULL(dbo.vw_RepuestosV2_VendedoresDeTienda_1.CodigoEmpresa, dbo.vw_RepuestosV2_VendedoresDeTienda_3_Detalle.CodigoEmpresa) AS CodigoEmpresa, 
                         ISNULL(dbo.vw_RepuestosV2_VendedoresDeTienda_1.Centro, dbo.vw_RepuestosV2_VendedoresDeTienda_3_Detalle.Centro) AS Centro, ISNULL(dbo.vw_RepuestosV2_VendedoresDeTienda_1.NumeroFactura, 
                         dbo.vw_RepuestosV2_VendedoresDeTienda_3_Detalle.NumeroFacturaTaller) AS NumeroFactura, ISNULL(dbo.vw_RepuestosV2_VendedoresDeTienda_1.FechaFactura, 
                         dbo.vw_RepuestosV2_VendedoresDeTienda_3_Detalle.FechaFactura) AS FechaFactura, ISNULL(dbo.vw_RepuestosV2_VendedoresDeTienda_1.TotalFactura, 
                         dbo.vw_RepuestosV2_VendedoresDeTienda_3_Detalle.ValorTotalFactura) AS TotalFactura, ISNULL(dbo.vw_RepuestosV2_VendedoresDeTienda_1.ImporteEfecto, 
                         dbo.vw_RepuestosV2_VendedoresDeTienda_3_Detalle.ImporteEfecto) AS ImporteEfecto, ISNULL(dbo.vw_RepuestosV2_VendedoresDeTienda_1.PorcentajeRecaudo, 
                         dbo.vw_RepuestosV2_VendedoresDeTienda_3_Detalle.PorcentajeRecaudo) AS PorcentajeRecaudo, ISNULL(dbo.vw_RepuestosV2_VendedoresDeTienda_1.CedulaVendedorRepuestos, 
                         dbo.vw_RepuestosV2_VendedoresDeTienda_3_Detalle.CedulaVendedorRepuestos) AS CedulaVendedorRepuestos, ISNULL(dbo.vw_RepuestosV2_VendedoresDeTienda_1.ValorBaseMostrador, 0) AS ValorBaseMostrador, 
                         ISNULL(dbo.vw_RepuestosV2_VendedoresDeTienda_3_Detalle.ValorBaseTaller, 0) AS ValorBaseTaller, ISNULL(dbo.vw_RepuestosV2_VendedoresDeTienda_1.ValorBaseMostrador, 0) 
                         + ISNULL(dbo.vw_RepuestosV2_VendedoresDeTienda_3_Detalle.ValorBaseTaller, 0) AS ValorBaseTotal, dbo.vw_RepuestosV2_VendedoresDeTienda_1.TipoAlmacen, 
                         dbo.vw_RepuestosV2_VendedoresDeTienda_3_Detalle.TipoTaller
FROM            dbo.vw_RepuestosV2_VendedoresDeTienda_1 FULL OUTER JOIN
                         dbo.vw_RepuestosV2_VendedoresDeTienda_3_Detalle ON dbo.vw_RepuestosV2_VendedoresDeTienda_1.Centro = dbo.vw_RepuestosV2_VendedoresDeTienda_3_Detalle.Centro AND 
                         dbo.vw_RepuestosV2_VendedoresDeTienda_1.PorcentajeRecaudo = dbo.vw_RepuestosV2_VendedoresDeTienda_3_Detalle.PorcentajeRecaudo AND 
                         dbo.vw_RepuestosV2_VendedoresDeTienda_1.ImporteEfecto = dbo.vw_RepuestosV2_VendedoresDeTienda_3_Detalle.ImporteEfecto AND 
                         dbo.vw_RepuestosV2_VendedoresDeTienda_1.TotalFactura = dbo.vw_RepuestosV2_VendedoresDeTienda_3_Detalle.ValorTotalFactura AND 
                         dbo.vw_RepuestosV2_VendedoresDeTienda_1.FechaFactura = dbo.vw_RepuestosV2_VendedoresDeTienda_3_Detalle.FechaFactura AND 
                         dbo.vw_RepuestosV2_VendedoresDeTienda_1.NumeroFactura = dbo.vw_RepuestosV2_VendedoresDeTienda_3_Detalle.NumeroFacturaTaller AND 
                         dbo.vw_RepuestosV2_VendedoresDeTienda_1.Ano_Periodo = dbo.vw_RepuestosV2_VendedoresDeTienda_3_Detalle.Ano_Periodo AND 
                         dbo.vw_RepuestosV2_VendedoresDeTienda_1.Mes_Periodo = dbo.vw_RepuestosV2_VendedoresDeTienda_3_Detalle.Mes_Periodo AND 
                         dbo.vw_RepuestosV2_VendedoresDeTienda_1.CodigoEmpresa = dbo.vw_RepuestosV2_VendedoresDeTienda_3_Detalle.CodigoEmpresa AND 
                         dbo.vw_RepuestosV2_VendedoresDeTienda_1.CedulaVendedorRepuestos = dbo.vw_RepuestosV2_VendedoresDeTienda_3_Detalle.CedulaVendedorRepuestos


```
