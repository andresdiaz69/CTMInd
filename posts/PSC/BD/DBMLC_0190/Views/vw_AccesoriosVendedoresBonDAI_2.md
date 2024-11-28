# View: vw_AccesoriosVendedoresBonDAI_2

## Usa los objetos:
- [[vw_AccesoriosVendedoresBonDAI_2_Detalle]]

```sql
CREATE VIEW [dbo].[vw_AccesoriosVendedoresBonDAI_2]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, CedulaVendedorRepuestos, SUM(TotalTallerPorOT) AS TotalTallerPorOT
FROM            dbo.vw_AccesoriosVendedoresBonDAI_2_Detalle
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, CedulaVendedorRepuestos


```
