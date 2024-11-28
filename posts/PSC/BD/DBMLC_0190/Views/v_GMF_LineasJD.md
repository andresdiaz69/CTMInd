# View: v_GMF_LineasJD

## Usa los objetos:
- [[v_GMF_1_JD_ValoresVentasNetas]]

```sql


CREATE VIEW [dbo].[v_GMF_LineasJD]
AS
SELECT DISTINCT
ROW_NUMBER() OVER(
       ORDER BY CodigoPresentacion) as Id,
 CodigoPresentacion, nombrepresentacion
FROM            dbo.v_GMF_1_JD_ValoresVentasNetas
group by CodigoPresentacion,nombrepresentacion

```
