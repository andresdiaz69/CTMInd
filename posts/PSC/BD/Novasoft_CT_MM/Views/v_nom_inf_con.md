# View: v_nom_inf_con

## Usa los objetos:
- [[nom_inf_con]]
- [[nom_inf_conIIF]]

```sql

CREATE VIEW [dbo].[v_nom_inf_con]
AS
SELECT DISTINCT num_doc, tip_doc, sub_tip, ano_doc, per_doc
FROM            dbo.nom_inf_con
UNION ALL 
SELECT DISTINCT num_doc, tip_doc, sub_tip, ano_doc, per_doc
FROM            dbo.nom_inf_conIIF


```
