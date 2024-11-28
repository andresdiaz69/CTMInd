# View: V_rhh_conLiq

## Usa los objetos:
- [[rhh_concliq]]
- [[V_rhh_concep]]

```sql

CREATE VIEW [dbo].[V_rhh_conLiq]
AS
SELECT     dbo.V_rhh_concep.cod_con, dbo.V_rhh_concep.nom_con, dbo.rhh_concliq.tip_liq, dbo.V_rhh_concep.nov_rel
FROM         dbo.V_rhh_concep INNER JOIN
                      dbo.rhh_concliq ON dbo.V_rhh_concep.cod_con = dbo.rhh_concliq.cod_con AND dbo.V_rhh_concep.mod_liq = dbo.rhh_concliq.mod_liq


```
