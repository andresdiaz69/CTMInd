# View: vw_RepuestosV2_VendedoresBoutiques_4

## Usa los objetos:
- [[vw_RepuestosV2_VendedoresBoutiques_2]]
- [[vw_RepuestosV2_VendedoresBoutiques_3]]

```sql



CREATE VIEW [dbo].[vw_RepuestosV2_VendedoresBoutiques_4]
AS
SELECT        ISNULL(dbo.vw_RepuestosV2_VendedoresBoutiques_2.Ano_Periodo, dbo.vw_RepuestosV2_VendedoresBoutiques_3.Ano_Periodo) AS Ano_Periodo, ISNULL(dbo.vw_RepuestosV2_VendedoresBoutiques_2.Mes_Periodo, 
                         dbo.vw_RepuestosV2_VendedoresBoutiques_3.Mes_Periodo) AS Mes_Periodo, ISNULL(dbo.vw_RepuestosV2_VendedoresBoutiques_2.CodigoEmpresa, dbo.vw_RepuestosV2_VendedoresBoutiques_3.CodigoEmpresa) 
                         AS CodigoEmpresa, ISNULL(dbo.vw_RepuestosV2_VendedoresBoutiques_2.CedulaVendedorRepuestos, dbo.vw_RepuestosV2_VendedoresBoutiques_3.CedulaVendedorRepuestos) AS CedulaVendedorRepuestos,
                         ISNULL(dbo.vw_RepuestosV2_VendedoresBoutiques_2.ValorBaseMostrador, 0) AS ValorBaseMostrador,  
                         ISNULL(dbo.vw_RepuestosV2_VendedoresBoutiques_3.ValorBaseTaller, 0) AS ValorBaseTaller
FROM            dbo.vw_RepuestosV2_VendedoresBoutiques_2 FULL OUTER JOIN
                         dbo.vw_RepuestosV2_VendedoresBoutiques_3 ON dbo.vw_RepuestosV2_VendedoresBoutiques_2.Ano_Periodo = dbo.vw_RepuestosV2_VendedoresBoutiques_3.Ano_Periodo AND 
                         dbo.vw_RepuestosV2_VendedoresBoutiques_2.Mes_Periodo = dbo.vw_RepuestosV2_VendedoresBoutiques_3.Mes_Periodo AND 
                         dbo.vw_RepuestosV2_VendedoresBoutiques_2.CodigoEmpresa = dbo.vw_RepuestosV2_VendedoresBoutiques_3.CodigoEmpresa AND 
                         dbo.vw_RepuestosV2_VendedoresBoutiques_2.CedulaVendedorRepuestos = dbo.vw_RepuestosV2_VendedoresBoutiques_3.CedulaVendedorRepuestos





```
