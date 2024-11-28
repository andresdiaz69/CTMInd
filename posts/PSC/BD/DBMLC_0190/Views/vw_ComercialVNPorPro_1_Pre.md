# View: vw_ComercialVNPorPro_1_Pre

## Usa los objetos:
- [[vw_ComercialVNPorPro_1_Pre_VN]]
- [[vw_ComercialVNPorPro_1_Pre_VOVN]]

```sql




CREATE VIEW [dbo].[vw_ComercialVNPorPro_1_Pre]
AS
SELECT        ISNULL(dbo.vw_ComercialVNPorPro_1_Pre_VN.Ano_Periodo, dbo.vw_ComercialVNPorPro_1_Pre_VOVN.Ano_Periodo) AS Ano_Periodo, 
              ISNULL(dbo.vw_ComercialVNPorPro_1_Pre_VN.Mes_Periodo, dbo.vw_ComercialVNPorPro_1_Pre_VOVN.Mes_Periodo) AS Mes_Periodo, 
			  ISNULL(dbo.vw_ComercialVNPorPro_1_Pre_VN.Codigoempresa, dbo.vw_ComercialVNPorPro_1_Pre_VOVN.Codigoempresa) AS Codigoempresa, 
              ISNULL(dbo.vw_ComercialVNPorPro_1_Pre_VN.CedulaVendedor, dbo.vw_ComercialVNPorPro_1_Pre_VOVN.CedulaVendedor) AS CedulaVendedor, 
			  
			  ISNULL(dbo.vw_ComercialVNPorPro_1_Pre_VN.NumerEntregasCount, 0) AS NumerEntregasCountVN, 
			  ISNULL(dbo.vw_ComercialVNPorPro_1_Pre_VOVN.NumerEntregasCount, 0) AS NumerEntregasCountVOVN, 
			  ISNULL(dbo.vw_ComercialVNPorPro_1_Pre_VN.NumerEntregasCount, 0) + ISNULL(dbo.vw_ComercialVNPorPro_1_Pre_VOVN.NumerEntregasCount, 0) AS NumerEntregasCount,

			  ISNULL(dbo.vw_ComercialVNPorPro_1_Pre_VN.NumerEntregasCount_VehUtil, 0) AS NumerEntregasCountVN_VehUtil, 
			  ISNULL(dbo.vw_ComercialVNPorPro_1_Pre_VOVN.NumerEntregasCount_VehUtil, 0) AS NumerEntregasCountVOVN_VehUtil, 
			  ISNULL(dbo.vw_ComercialVNPorPro_1_Pre_VN.NumerEntregasCount_VehUtil, 0) + ISNULL(dbo.vw_ComercialVNPorPro_1_Pre_VOVN.NumerEntregasCount_VehUtil, 0) AS NumerEntregasCount_VehUtil

FROM            dbo.vw_ComercialVNPorPro_1_Pre_VN FULL OUTER JOIN
                         dbo.vw_ComercialVNPorPro_1_Pre_VOVN ON dbo.vw_ComercialVNPorPro_1_Pre_VN.Ano_Periodo = dbo.vw_ComercialVNPorPro_1_Pre_VOVN.Ano_Periodo AND 
                         dbo.vw_ComercialVNPorPro_1_Pre_VN.Mes_Periodo = dbo.vw_ComercialVNPorPro_1_Pre_VOVN.Mes_Periodo AND 
                         dbo.vw_ComercialVNPorPro_1_Pre_VN.Codigoempresa = dbo.vw_ComercialVNPorPro_1_Pre_VOVN.Codigoempresa AND 
                         dbo.vw_ComercialVNPorPro_1_Pre_VN.CedulaVendedor = dbo.vw_ComercialVNPorPro_1_Pre_VOVN.CedulaVendedor



```
