# View: vw_RepuestosVendedoresBonPorAccMM_1

## Usa los objetos:
- [[vw_RepuestosVendedoresBonPorAccMM_1_Detalle]]

```sql
CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorAccMM_1]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, SUM(ValorNetoMostrador) AS ValorNetoMostrador, SUM(BonificacionMostrador) AS BonificacionMostrador, MAX(ValorVariable1) AS ValorVariable1, 
                         MAX(ValorVariable2) AS ValorVariable2
FROM            dbo.vw_RepuestosVendedoresBonPorAccMM_1_Detalle
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos


```
