# View: vw_RepuestosVendedoresBonPorAccMM_2

## Usa los objetos:
- [[vw_RepuestosVendedoresBonPorAccMM_2_Detalle]]

```sql
CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorAccMM_2]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, SUM(ValorNetoTaller) AS ValorNetoTaller, SUM(BonificacionTaller) AS BonificacionTaller, MAX(ValorVariable1) AS ValorVariable1, MAX(ValorVariable2) 
                         AS ValorVariable2
FROM            dbo.vw_RepuestosVendedoresBonPorAccMM_2_Detalle
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos


```
