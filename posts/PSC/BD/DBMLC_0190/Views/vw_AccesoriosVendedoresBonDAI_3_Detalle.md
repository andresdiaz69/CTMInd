# View: vw_AccesoriosVendedoresBonDAI_3_Detalle

## Usa los objetos:
- [[vw_AccesoriosVendedoresBonDAI_1_Detalle]]
- [[vw_AccesoriosVendedoresBonDAI_2_Detalle]]

```sql
CREATE VIEW [dbo].[vw_AccesoriosVendedoresBonDAI_3_Detalle]
AS
SELECT        ISNULL(dbo.vw_AccesoriosVendedoresBonDAI_1_Detalle.Ano_Periodo, dbo.vw_AccesoriosVendedoresBonDAI_2_Detalle.Ano_Periodo) AS Ano_Periodo, ISNULL(dbo.vw_AccesoriosVendedoresBonDAI_1_Detalle.Mes_Periodo, 
                         dbo.vw_AccesoriosVendedoresBonDAI_2_Detalle.Mes_Periodo) AS Mes_Periodo, ISNULL(dbo.vw_AccesoriosVendedoresBonDAI_1_Detalle.CodigoEmpresa, dbo.vw_AccesoriosVendedoresBonDAI_2_Detalle.CodigoEmpresa) 
                         AS CodigoEmpresa, ISNULL(dbo.vw_AccesoriosVendedoresBonDAI_1_Detalle.Empresa, dbo.vw_AccesoriosVendedoresBonDAI_2_Detalle.Empresa) AS Empresa, 
                         ISNULL(dbo.vw_AccesoriosVendedoresBonDAI_1_Detalle.Centro, dbo.vw_AccesoriosVendedoresBonDAI_2_Detalle.Centro) AS Centro, ISNULL(dbo.vw_AccesoriosVendedoresBonDAI_1_Detalle.NumeroFactura, 
                         dbo.vw_AccesoriosVendedoresBonDAI_2_Detalle.NumeroFacturaTaller) AS NumeroFactura, ISNULL(dbo.vw_AccesoriosVendedoresBonDAI_1_Detalle.FechaFactura, 
                         dbo.vw_AccesoriosVendedoresBonDAI_2_Detalle.FechaFactura) AS FechaFactura, ISNULL(dbo.vw_AccesoriosVendedoresBonDAI_1_Detalle.CedulaVendedorRepuestos, 
                         dbo.vw_AccesoriosVendedoresBonDAI_2_Detalle.CedulaVendedorRepuestos) AS CedulaVendedorRepuestos, ISNULL(dbo.vw_AccesoriosVendedoresBonDAI_1_Detalle.TotalAlmacenAlbaran, 0) AS TotalAlmacenAlbaran, 
                         ISNULL(dbo.vw_AccesoriosVendedoresBonDAI_2_Detalle.TotalTallerPorOT, 0) AS TotalTallerPorOT, ISNULL(dbo.vw_AccesoriosVendedoresBonDAI_1_Detalle.TotalAlmacenAlbaran, 0) 
                         + ISNULL(dbo.vw_AccesoriosVendedoresBonDAI_2_Detalle.TotalTallerPorOT, 0) AS Total, dbo.vw_AccesoriosVendedoresBonDAI_1_Detalle.TipoAlmacen, dbo.vw_AccesoriosVendedoresBonDAI_2_Detalle.TipoTaller
FROM            dbo.vw_AccesoriosVendedoresBonDAI_1_Detalle FULL OUTER JOIN
                         dbo.vw_AccesoriosVendedoresBonDAI_2_Detalle ON dbo.vw_AccesoriosVendedoresBonDAI_1_Detalle.Centro = dbo.vw_AccesoriosVendedoresBonDAI_2_Detalle.Centro AND 
                         dbo.vw_AccesoriosVendedoresBonDAI_1_Detalle.FechaFactura = dbo.vw_AccesoriosVendedoresBonDAI_2_Detalle.FechaFactura AND 
                         dbo.vw_AccesoriosVendedoresBonDAI_1_Detalle.NumeroFactura = dbo.vw_AccesoriosVendedoresBonDAI_2_Detalle.NumeroFacturaTaller AND 
                         dbo.vw_AccesoriosVendedoresBonDAI_1_Detalle.Ano_Periodo = dbo.vw_AccesoriosVendedoresBonDAI_2_Detalle.Ano_Periodo AND 
                         dbo.vw_AccesoriosVendedoresBonDAI_1_Detalle.Mes_Periodo = dbo.vw_AccesoriosVendedoresBonDAI_2_Detalle.Mes_Periodo AND 
                         dbo.vw_AccesoriosVendedoresBonDAI_1_Detalle.CodigoEmpresa = dbo.vw_AccesoriosVendedoresBonDAI_2_Detalle.CodigoEmpresa AND 
                         dbo.vw_AccesoriosVendedoresBonDAI_1_Detalle.Empresa = dbo.vw_AccesoriosVendedoresBonDAI_2_Detalle.Empresa AND 
                         dbo.vw_AccesoriosVendedoresBonDAI_1_Detalle.CedulaVendedorRepuestos = dbo.vw_AccesoriosVendedoresBonDAI_2_Detalle.CedulaVendedorRepuestos


```
