# View: vw_AccesoriosVendedoresBonDAI_3

## Usa los objetos:
- [[vw_AccesoriosVendedoresBonDAI_1]]
- [[vw_AccesoriosVendedoresBonDAI_2]]

```sql

CREATE VIEW [dbo].[vw_AccesoriosVendedoresBonDAI_3]
AS
SELECT        ISNULL(dbo.vw_AccesoriosVendedoresBonDAI_1.Ano_Periodo, dbo.vw_AccesoriosVendedoresBonDAI_2.Ano_Periodo) AS Ano_Periodo, ISNULL(dbo.vw_AccesoriosVendedoresBonDAI_1.Mes_Periodo, 
                         dbo.vw_AccesoriosVendedoresBonDAI_2.Mes_Periodo) AS Mes_Periodo, ISNULL(dbo.vw_AccesoriosVendedoresBonDAI_1.CodigoEmpresa, dbo.vw_AccesoriosVendedoresBonDAI_2.CodigoEmpresa) AS CodigoEmpresa, 
                         ISNULL(dbo.vw_AccesoriosVendedoresBonDAI_1.Empresa, dbo.vw_AccesoriosVendedoresBonDAI_2.Empresa) AS Empresa, ISNULL(dbo.vw_AccesoriosVendedoresBonDAI_1.CedulaVendedorRepuestos, 
                         dbo.vw_AccesoriosVendedoresBonDAI_2.CedulaVendedorRepuestos) AS CedulaVendedorRepuestos, ISNULL(dbo.vw_AccesoriosVendedoresBonDAI_1.TotalAlmacenAlbaran, 0) AS TotalAlmacenAlbaran, 
                         ISNULL(dbo.vw_AccesoriosVendedoresBonDAI_2.TotalTallerPorOT, 0) AS TotalTallerPorOT, ISNULL(dbo.vw_AccesoriosVendedoresBonDAI_1.TotalAlmacenAlbaran, 0) 
                         + ISNULL(dbo.vw_AccesoriosVendedoresBonDAI_2.TotalTallerPorOT, 0) AS Total
FROM            dbo.vw_AccesoriosVendedoresBonDAI_1 FULL OUTER JOIN
                         dbo.vw_AccesoriosVendedoresBonDAI_2 ON dbo.vw_AccesoriosVendedoresBonDAI_1.Ano_Periodo = dbo.vw_AccesoriosVendedoresBonDAI_2.Ano_Periodo AND 
                         dbo.vw_AccesoriosVendedoresBonDAI_1.Mes_Periodo = dbo.vw_AccesoriosVendedoresBonDAI_2.Mes_Periodo AND 
                         dbo.vw_AccesoriosVendedoresBonDAI_1.CodigoEmpresa = dbo.vw_AccesoriosVendedoresBonDAI_2.CodigoEmpresa AND 
                         dbo.vw_AccesoriosVendedoresBonDAI_1.Empresa = dbo.vw_AccesoriosVendedoresBonDAI_2.Empresa AND 
                         dbo.vw_AccesoriosVendedoresBonDAI_1.CedulaVendedorRepuestos = dbo.vw_AccesoriosVendedoresBonDAI_2.CedulaVendedorRepuestos





```
