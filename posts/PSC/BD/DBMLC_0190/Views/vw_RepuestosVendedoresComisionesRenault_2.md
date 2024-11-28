# View: vw_RepuestosVendedoresComisionesRenault_2

## Usa los objetos:
- [[vw_RepuestosVendedoresComisionesRenault_1]]

```sql





CREATE VIEW [dbo].[vw_RepuestosVendedoresComisionesRenault_2]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, SUM(ValorBaseMostrador) AS ValorBaseMostrador
FROM            dbo.vw_RepuestosVendedoresComisionesRenault_1
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos










```
