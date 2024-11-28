# View: vw_AccesoriosVendedoresBonMM_1

## Usa los objetos:
- [[vw_AccesoriosVendedoresBonMM_1_Detalle]]

```sql
CREATE VIEW [dbo].[vw_AccesoriosVendedoresBonMM_1]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, CedulaVendedorRepuestos, SUM(TotalAlmacenAlbaran) AS TotalAlmacenAlbaran
FROM            dbo.vw_AccesoriosVendedoresBonMM_1_Detalle
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, CedulaVendedorRepuestos


```
