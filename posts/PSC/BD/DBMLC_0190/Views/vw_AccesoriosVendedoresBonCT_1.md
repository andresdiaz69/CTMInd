# View: vw_AccesoriosVendedoresBonCT_1

## Usa los objetos:
- [[vw_AccesoriosVendedoresBonCT_1_Detalle]]

```sql
CREATE VIEW [dbo].[vw_AccesoriosVendedoresBonCT_1]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, CedulaVendedorRepuestos, SUM(TotalAlmacenAlbaran) AS TotalAlmacenAlbaran
FROM            dbo.vw_AccesoriosVendedoresBonCT_1_Detalle
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, CedulaVendedorRepuestos


```
