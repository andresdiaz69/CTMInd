# View: vw_AccesoriosVendedoresBonMM_3

## Usa los objetos:
- [[vw_AccesoriosVendedoresBonMM_1]]
- [[vw_AccesoriosVendedoresBonMM_2]]

```sql
CREATE VIEW [dbo].[vw_AccesoriosVendedoresBonMM_3]
AS
SELECT        ISNULL(dbo.vw_AccesoriosVendedoresBonMM_1.Ano_Periodo, dbo.vw_AccesoriosVendedoresBonMM_2.Ano_Periodo) AS Ano_Periodo, ISNULL(dbo.vw_AccesoriosVendedoresBonMM_1.Mes_Periodo, 
                         dbo.vw_AccesoriosVendedoresBonMM_2.Mes_Periodo) AS Mes_Periodo, ISNULL(dbo.vw_AccesoriosVendedoresBonMM_1.CodigoEmpresa, dbo.vw_AccesoriosVendedoresBonMM_2.CodigoEmpresa) AS CodigoEmpresa, 
                         ISNULL(dbo.vw_AccesoriosVendedoresBonMM_1.Empresa, dbo.vw_AccesoriosVendedoresBonMM_2.Empresa) AS Empresa, ISNULL(dbo.vw_AccesoriosVendedoresBonMM_1.CedulaVendedorRepuestos, 
                         dbo.vw_AccesoriosVendedoresBonMM_2.CedulaVendedorRepuestos) AS CedulaVendedorRepuestos, ISNULL(dbo.vw_AccesoriosVendedoresBonMM_1.TotalAlmacenAlbaran, 0) AS TotalAlmacenAlbaran, 
                         ISNULL(dbo.vw_AccesoriosVendedoresBonMM_2.TotalTallerPorOT, 0) AS TotalTallerPorOT, ISNULL(dbo.vw_AccesoriosVendedoresBonMM_1.TotalAlmacenAlbaran, 0) 
                         + ISNULL(dbo.vw_AccesoriosVendedoresBonMM_2.TotalTallerPorOT, 0) AS Total
FROM            dbo.vw_AccesoriosVendedoresBonMM_1 FULL OUTER JOIN
                         dbo.vw_AccesoriosVendedoresBonMM_2 ON dbo.vw_AccesoriosVendedoresBonMM_1.Ano_Periodo = dbo.vw_AccesoriosVendedoresBonMM_2.Ano_Periodo AND 
                         dbo.vw_AccesoriosVendedoresBonMM_1.Mes_Periodo = dbo.vw_AccesoriosVendedoresBonMM_2.Mes_Periodo AND 
                         dbo.vw_AccesoriosVendedoresBonMM_1.CodigoEmpresa = dbo.vw_AccesoriosVendedoresBonMM_2.CodigoEmpresa AND 
                         dbo.vw_AccesoriosVendedoresBonMM_1.Empresa = dbo.vw_AccesoriosVendedoresBonMM_2.Empresa AND 
                         dbo.vw_AccesoriosVendedoresBonMM_1.CedulaVendedorRepuestos = dbo.vw_AccesoriosVendedoresBonMM_2.CedulaVendedorRepuestos



```
