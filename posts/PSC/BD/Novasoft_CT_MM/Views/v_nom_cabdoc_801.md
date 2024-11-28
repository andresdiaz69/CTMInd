# View: v_nom_cabdoc_801

## Usa los objetos:
- [[nom_cabdoc]]

```sql
CREATE VIEW [dbo].[v_nom_cabdoc_801]
AS
SELECT     ano_doc, per_doc, tip_doc, sub_tip, num_doc, cod_emp, cod_con, fec_doc, tip_liq, cambio, des_doc
FROM         dbo.nom_cabdoc
WHERE     (sub_tip = '801')

```
