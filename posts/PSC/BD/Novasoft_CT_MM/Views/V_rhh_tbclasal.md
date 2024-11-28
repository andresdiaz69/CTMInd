# View: V_rhh_tbclasal

## Usa los objetos:
- [[rhh_tbclasal]]

```sql
CREATE VIEW [dbo].[V_rhh_tbclasal]
AS SELECT 0 AS Cla_Sal,
		'No Aplica' AS Descripción
   UNION ALL
   SELECT Cla_Sal,
		descripcion
   FROM rhh_tbclasal;

```
