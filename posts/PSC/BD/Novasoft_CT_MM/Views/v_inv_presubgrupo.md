# View: v_inv_presubgrupo

## Usa los objetos:
- [[inv_items]]
- [[inv_preitem]]
- [[inv_subgrupos]]

```sql

CREATE VIEW [dbo].[v_inv_presubgrupo]
AS
SELECT     dbo.inv_preitem.ano_acu, dbo.inv_preitem.per_acu, dbo.inv_subgrupos.cod_gru, dbo.inv_items.cod_subgrupo, dbo.inv_subgrupos.nom_sub, SUM(dbo.inv_preitem.pre_uni) AS pre_uni, 
				SUM(dbo.inv_preitem.pre_val) AS pre_val
FROM         dbo.inv_preitem WITH(NOLOCK)
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_preitem.cod_item = dbo.inv_items.cod_item 
	INNER JOIN dbo.inv_subgrupos WITH(NOLOCK) ON dbo.inv_items.cod_grupo=dbo.inv_subgrupos.cod_gru AND dbo.inv_items.cod_subgrupo=dbo.inv_subgrupos.cod_sub
GROUP BY dbo.inv_preitem.ano_acu, dbo.inv_preitem.per_acu, dbo.inv_subgrupos.cod_gru, dbo.inv_items.cod_subgrupo, dbo.inv_subgrupos.nom_sub

```
