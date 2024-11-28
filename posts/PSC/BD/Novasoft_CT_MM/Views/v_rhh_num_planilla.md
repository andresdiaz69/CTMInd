# View: v_rhh_num_planilla

## Usa los objetos:
- [[Rhh_Djo_hras]]

```sql

CREATE VIEW [dbo].[v_rhh_num_planilla]
AS
SELECT	num_planilla 
FROM	Rhh_Djo_hras 
group by num_planilla


```
