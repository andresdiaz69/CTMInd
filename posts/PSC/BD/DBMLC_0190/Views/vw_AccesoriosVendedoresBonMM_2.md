# View: vw_AccesoriosVendedoresBonMM_2

## Usa los objetos:
- [[vw_AccesoriosVendedoresBonMM_2_Detalle]]

```sql
CREATE VIEW [dbo].[vw_AccesoriosVendedoresBonMM_2]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, CedulaVendedorRepuestos, SUM(TotalTallerPorOT) AS TotalTallerPorOT
FROM            dbo.vw_AccesoriosVendedoresBonMM_2_Detalle
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, CedulaVendedorRepuestos


```
