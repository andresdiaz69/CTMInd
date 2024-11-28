# View: V_rhh_ConceptoModo

## Usa los objetos:
- [[rhh_ConceptoModo]]
- [[rhh_tbModLiq]]

```sql
CREATE VIEW [dbo].[V_rhh_ConceptoModo]
AS
SELECT     CM.cod_con, CM.mod_liq, M.des_mod
FROM         dbo.rhh_ConceptoModo AS CM INNER JOIN
					  dbo.rhh_tbModLiq AS M ON M.mod_liq = CM.mod_liq


```
