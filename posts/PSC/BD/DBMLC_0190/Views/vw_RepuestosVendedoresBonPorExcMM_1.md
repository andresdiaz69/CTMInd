# View: vw_RepuestosVendedoresBonPorExcMM_1

## Usa los objetos:
- [[ComisionesSpigaAlmacenFactura]]

```sql

CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorExcMM_1]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, NumeroFactura
FROM            dbo.ComisionesSpigaAlmacenFactura
WHERE        
(CodigoEmpresa = 6) 
AND (VentaCampaña IS NOT NULL)
AND (dbo.ComisionesSpigaAlmacenFactura.FechaFactura <= '20191031')

GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, NumeroFactura



```
