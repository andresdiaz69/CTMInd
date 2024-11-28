# View: vw_RepuestosV2_VendedoresBoutiques_2_ORIGINAL

## Usa los objetos:
- [[vw_RepuestosV2_VendedoresBoutiques_1]]

```sql







CREATE VIEW [dbo].[vw_RepuestosV2_VendedoresBoutiques_2_ORIGINAL]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, SUM(ValorBaseMostrador) AS ValorBaseMostrador, Centro
FROM            dbo.vw_RepuestosV2_VendedoresBoutiques_1
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, Centro







```
