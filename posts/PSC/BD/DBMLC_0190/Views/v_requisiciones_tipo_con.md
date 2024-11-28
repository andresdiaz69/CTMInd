# View: v_requisiciones_tipo_con

## Usa los objetos:
- [[rhh_tipcon]]

```sql

CREATE VIEW [dbo].[v_requisiciones_tipo_con] as 
SELECT * FROM [novasoft_ct_mm].[dbo].[rhh_tipcon] WHERE tip_con IN ('01','02','09','10')

```
