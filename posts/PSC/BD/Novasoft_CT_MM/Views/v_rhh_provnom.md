# View: v_rhh_provnom

## Usa los objetos:
- [[cxp_provee]]
- [[rhh_prov_cxp]]

```sql

CREATE VIEW [dbo].[v_rhh_provnom]
AS
SELECT  cod_prv, rso 
FROM	   rhh_prov_cxp R
INNER JOIN  cxp_provee P on R.cod_prv = P.provee
WHERE   cod_prv <> 0
```
