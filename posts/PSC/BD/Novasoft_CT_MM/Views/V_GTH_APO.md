# View: V_GTH_APO

## Usa los objetos:
- [[rhh_estudio]]
- [[rhh_tbinsti]]

```sql

CREATE VIEW [dbo].[V_GTH_APO]
AS
SELECT EST.cod_emp
FROM rhh_estudio AS EST
INNER JOIN dbo.rhh_tbinsti AS INS ON EST.cod_ins = INS.cod_ins
WHERE tipo_est IN ('03', '04')
GROUP BY EST.cod_emp;

```
