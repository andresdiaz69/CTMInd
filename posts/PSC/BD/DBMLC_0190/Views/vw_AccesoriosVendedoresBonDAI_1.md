# View: vw_AccesoriosVendedoresBonDAI_1

## Usa los objetos:
- [[vw_AccesoriosVendedoresBonDAI_1_Detalle]]

```sql
CREATE VIEW [dbo].[vw_AccesoriosVendedoresBonDAI_1]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, CedulaVendedorRepuestos, SUM(TotalAlmacenAlbaran) AS TotalAlmacenAlbaran
FROM            dbo.vw_AccesoriosVendedoresBonDAI_1_Detalle
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, CedulaVendedorRepuestos


```
