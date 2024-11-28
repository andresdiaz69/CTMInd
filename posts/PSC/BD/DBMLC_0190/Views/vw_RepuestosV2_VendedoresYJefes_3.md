# View: vw_RepuestosV2_VendedoresYJefes_3

## Usa los objetos:
- [[vw_RepuestosV2_VendedoresYJefes_3_Detalle]]

```sql

CREATE VIEW [dbo].[vw_RepuestosV2_VendedoresYJefes_3]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, SUM(ValorBaseTaller) AS ValorBaseTaller
FROM            dbo.vw_RepuestosV2_VendedoresYJefes_3_Detalle
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos


```
