# View: v_inv_acucom

## Usa los objetos:
- [[cxp_provee]]
- [[inv_cabdoc]]
- [[inv_cuedoc]]
- [[inv_grupos]]
- [[inv_items]]

```sql

CREATE VIEW [dbo].[v_inv_acucom]
AS
SELECT     dbo.inv_cabdoc.ano_doc, dbo.inv_cabdoc.per_doc, SUM(dbo.inv_cuedoc.cantidad) AS cantidad, SUM(dbo.inv_cuedoc.pre_tot) AS pre_tot, 
                      dbo.inv_items.des_item, dbo.inv_items.cod_grupo, dbo.inv_grupos.nom_gru, dbo.cxp_provee.rso, dbo.inv_cabdoc.provee, dbo.inv_cuedoc.item
FROM         dbo.inv_cabdoc WITH(NOLOCK) 
	INNER JOIN dbo.inv_cuedoc WITH(NOLOCK) ON dbo.inv_cabdoc.ano_doc = dbo.inv_cuedoc.ano_doc AND dbo.inv_cabdoc.num_doc = dbo.inv_cuedoc.num_doc AND 
                      dbo.inv_cabdoc.per_doc = dbo.inv_cuedoc.per_doc AND dbo.inv_cabdoc.tip_doc = dbo.inv_cuedoc.tip_doc 
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_cuedoc.item = dbo.inv_items.cod_item 
	INNER JOIN dbo.inv_grupos WITH(NOLOCK) ON dbo.inv_items.cod_grupo = dbo.inv_grupos.cod_gru 
	INNER JOIN dbo.cxp_provee WITH(NOLOCK) ON dbo.inv_cabdoc.provee = dbo.cxp_provee.provee
WHERE     (dbo.inv_cabdoc.tip_doc = '110')
GROUP BY dbo.inv_cabdoc.ano_doc, dbo.inv_cabdoc.per_doc, dbo.inv_items.des_item, dbo.inv_items.cod_grupo, dbo.inv_grupos.nom_gru, 
                      dbo.cxp_provee.rso, dbo.inv_cabdoc.provee, dbo.inv_cuedoc.item

```
