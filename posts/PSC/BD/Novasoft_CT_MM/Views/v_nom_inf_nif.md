# View: v_nom_inf_nif

## Usa los objetos:
- [[nom_inf_coniif]]

```sql
CREATE VIEW [dbo].[v_nom_inf_nif]
AS
SELECT DISTINCT num_doc, tip_doc, sub_tip, ano_doc, per_doc
FROM            dbo.nom_inf_coniif


```
