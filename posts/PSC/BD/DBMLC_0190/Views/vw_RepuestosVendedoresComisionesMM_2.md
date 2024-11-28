# View: vw_RepuestosVendedoresComisionesMM_2

## Usa los objetos:
- [[vw_RepuestosVendedoresComisionesMM_1]]

```sql
CREATE VIEW [dbo].[vw_RepuestosVendedoresComisionesMM_2]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, SUM(ValorBaseMostrador) AS ValorBaseMostrador, SUM(ComisionMostrador) AS ComisionMostrador, ValorVariable
FROM            dbo.vw_RepuestosVendedoresComisionesMM_1
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, ValorVariable



```
