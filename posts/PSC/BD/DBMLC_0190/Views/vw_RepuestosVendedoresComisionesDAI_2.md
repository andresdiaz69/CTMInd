# View: vw_RepuestosVendedoresComisionesDAI_2

## Usa los objetos:
- [[vw_RepuestosVendedoresComisionesDAI_1]]

```sql

CREATE VIEW [dbo].[vw_RepuestosVendedoresComisionesDAI_2]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, SUM(ValorBaseMostrador) AS ValorBaseMostrador, SUM(ComisionMostrador) AS ComisionMostrador, ValorVariable
FROM            dbo.vw_RepuestosVendedoresComisionesDAI_1
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, ValorVariable





```
