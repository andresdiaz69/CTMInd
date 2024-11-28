# View: vw_RepuestosVendedoresBonPorRepMM_Liquidacion_ANTERIOR

## Usa los objetos:
- [[vw_RepuestosVendedoresBonPorRepMM_Liquidacion_FULL]]
- [[vw_RepuestosVendedoresBonPorRepMM_Liquidacion_OLD]]

```sql






CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorRepMM_Liquidacion]
AS

SELECT * FROM vw_RepuestosVendedoresBonPorRepMM_Liquidacion_OLD
UNION ALL
SELECT * FROM vw_RepuestosVendedoresBonPorRepMM_Liquidacion_FULL


```
