# View: vw_RepuestosVendedoresComisionesDAI_3

## Usa los objetos:
- [[vw_RepuestosVendedoresComisionesDAI_3_Detalle]]

```sql
CREATE VIEW [dbo].[vw_RepuestosVendedoresComisionesDAI_3]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, SUM(ValorBaseTaller) AS ValorBaseTaller, SUM(ComisionTaller) AS ComisionTaller, MAX(ValorVariable) AS ValorVariable
FROM            dbo.vw_RepuestosVendedoresComisionesDAI_3_Detalle
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos


```
