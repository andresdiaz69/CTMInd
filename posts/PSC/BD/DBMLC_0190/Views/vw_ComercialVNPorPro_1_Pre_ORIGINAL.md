# View: vw_ComercialVNPorPro_1_Pre_ORIGINAL

## Usa los objetos:
- [[vw_ComercialVNPorPro_1_Pre_VN]]
- [[vw_ComercialVNPorPro_1_Pre_VOVN]]

```sql


CREATE VIEW [dbo].[vw_ComercialVNPorPro_1_Pre_ORIGINAL]
AS
SELECT        ISNULL(dbo.vw_ComercialVNPorPro_1_Pre_VN.Ano_Periodo, dbo.vw_ComercialVNPorPro_1_Pre_VOVN.Ano_Periodo) AS Ano_Periodo, ISNULL(dbo.vw_ComercialVNPorPro_1_Pre_VN.Mes_Periodo, 
                         dbo.vw_ComercialVNPorPro_1_Pre_VOVN.Mes_Periodo) AS Mes_Periodo, ISNULL(dbo.vw_ComercialVNPorPro_1_Pre_VN.Codigoempresa, dbo.vw_ComercialVNPorPro_1_Pre_VOVN.Codigoempresa) AS Codigoempresa, 
                         ISNULL(dbo.vw_ComercialVNPorPro_1_Pre_VN.CedulaVendedor, dbo.vw_ComercialVNPorPro_1_Pre_VOVN.CedulaVendedor) AS CedulaVendedor, ISNULL(dbo.vw_ComercialVNPorPro_1_Pre_VN.NumerEntregasCount, 0) 
                         AS NumerEntregasCountVN, ISNULL(dbo.vw_ComercialVNPorPro_1_Pre_VOVN.NumerEntregasCount, 0) AS NumerEntregasCountVOVN, ISNULL(dbo.vw_ComercialVNPorPro_1_Pre_VN.NumerEntregasCount, 0) 
                         + ISNULL(dbo.vw_ComercialVNPorPro_1_Pre_VOVN.NumerEntregasCount, 0) AS NumerEntregasCount
FROM            dbo.vw_ComercialVNPorPro_1_Pre_VN FULL OUTER JOIN
                         dbo.vw_ComercialVNPorPro_1_Pre_VOVN ON dbo.vw_ComercialVNPorPro_1_Pre_VN.Ano_Periodo = dbo.vw_ComercialVNPorPro_1_Pre_VOVN.Ano_Periodo AND 
                         dbo.vw_ComercialVNPorPro_1_Pre_VN.Mes_Periodo = dbo.vw_ComercialVNPorPro_1_Pre_VOVN.Mes_Periodo AND 
                         dbo.vw_ComercialVNPorPro_1_Pre_VN.Codigoempresa = dbo.vw_ComercialVNPorPro_1_Pre_VOVN.Codigoempresa AND 
                         dbo.vw_ComercialVNPorPro_1_Pre_VN.CedulaVendedor = dbo.vw_ComercialVNPorPro_1_Pre_VOVN.CedulaVendedor
GROUP BY ISNULL(dbo.vw_ComercialVNPorPro_1_Pre_VN.Ano_Periodo, dbo.vw_ComercialVNPorPro_1_Pre_VOVN.Ano_Periodo), ISNULL(dbo.vw_ComercialVNPorPro_1_Pre_VN.Mes_Periodo, 
                         dbo.vw_ComercialVNPorPro_1_Pre_VOVN.Mes_Periodo), ISNULL(dbo.vw_ComercialVNPorPro_1_Pre_VN.Codigoempresa, dbo.vw_ComercialVNPorPro_1_Pre_VOVN.Codigoempresa), 
                         ISNULL(dbo.vw_ComercialVNPorPro_1_Pre_VN.CedulaVendedor, dbo.vw_ComercialVNPorPro_1_Pre_VOVN.CedulaVendedor), ISNULL(dbo.vw_ComercialVNPorPro_1_Pre_VN.NumerEntregasCount, 0), 
                         ISNULL(dbo.vw_ComercialVNPorPro_1_Pre_VOVN.NumerEntregasCount, 0), ISNULL(dbo.vw_ComercialVNPorPro_1_Pre_VN.NumerEntregasCount, 0) + ISNULL(dbo.vw_ComercialVNPorPro_1_Pre_VOVN.NumerEntregasCount, 0)


```
