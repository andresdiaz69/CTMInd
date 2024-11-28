# View: vw_RepuestosVendedoresBonPorExcMM_3

## Usa los objetos:
- [[vw_RepuestosVendedoresBonPorExcMM_1]]
- [[vw_RepuestosVendedoresBonPorExcMM_2]]

```sql
CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorExcMM_3]
AS
SELECT        dbo.vw_RepuestosVendedoresBonPorExcMM_1.Ano_Periodo, dbo.vw_RepuestosVendedoresBonPorExcMM_1.Mes_Periodo, dbo.vw_RepuestosVendedoresBonPorExcMM_1.CodigoEmpresa, 
                         dbo.vw_RepuestosVendedoresBonPorExcMM_2.CedulaVendedorRepuestos, SUM(dbo.vw_RepuestosVendedoresBonPorExcMM_2.ValorBase) AS ValorBaseTotal, 
                         SUM(dbo.vw_RepuestosVendedoresBonPorExcMM_2.ValorNeto) AS ValorNetoTotal, dbo.vw_RepuestosVendedoresBonPorExcMM_2.ValorVariable
FROM            dbo.vw_RepuestosVendedoresBonPorExcMM_1 INNER JOIN
                         dbo.vw_RepuestosVendedoresBonPorExcMM_2 ON dbo.vw_RepuestosVendedoresBonPorExcMM_1.Ano_Periodo = dbo.vw_RepuestosVendedoresBonPorExcMM_2.Ano_Periodo AND 
                         dbo.vw_RepuestosVendedoresBonPorExcMM_1.Mes_Periodo = dbo.vw_RepuestosVendedoresBonPorExcMM_2.Mes_Periodo AND 
                         dbo.vw_RepuestosVendedoresBonPorExcMM_1.CodigoEmpresa = dbo.vw_RepuestosVendedoresBonPorExcMM_2.CodigoEmpresa AND 
                         dbo.vw_RepuestosVendedoresBonPorExcMM_1.NumeroFactura = dbo.vw_RepuestosVendedoresBonPorExcMM_2.NumeroFactura
GROUP BY dbo.vw_RepuestosVendedoresBonPorExcMM_1.Ano_Periodo, dbo.vw_RepuestosVendedoresBonPorExcMM_1.Mes_Periodo, dbo.vw_RepuestosVendedoresBonPorExcMM_1.CodigoEmpresa, 
                         dbo.vw_RepuestosVendedoresBonPorExcMM_2.CedulaVendedorRepuestos, dbo.vw_RepuestosVendedoresBonPorExcMM_2.ValorVariable
HAVING        (dbo.vw_RepuestosVendedoresBonPorExcMM_2.CedulaVendedorRepuestos IS NOT NULL)



```
