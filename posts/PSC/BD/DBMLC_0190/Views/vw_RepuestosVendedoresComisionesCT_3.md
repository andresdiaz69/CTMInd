# View: vw_RepuestosVendedoresComisionesCT_3

## Usa los objetos:
- [[vw_RepuestosVendedoresComisionesCT_3_Detalle]]

```sql
CREATE VIEW [dbo].[vw_RepuestosVendedoresComisionesCT_3]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, SUM(ValorBaseTaller) AS ValorBaseTaller
FROM            dbo.vw_RepuestosVendedoresComisionesCT_3_Detalle
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos


```
