# View: v_inv_acuvta_pre

## Usa los objetos:
- [[inv_cabdoc]]
- [[inv_cuedoc]]
- [[inv_grupos]]
- [[inv_items]]
- [[inv_preitem]]
- [[inv_subgrupos]]

```sql

CREATE VIEW [dbo].[v_inv_acuvta_pre]
AS
SELECT inv_cabdoc.ano_doc AS ano_acu, inv_cabdoc.per_doc AS per_acu, SUM(inv_cuedoc.cantidad) AS cantidad, 
			SUM(inv_cuedoc.pre_tot) AS pre_tot, inv_items.des_item, inv_items.cod_grupo, inv_grupos.nom_gru, 
			inv_cuedoc.item AS cod_item, inv_cabdoc.cod_suc, inv_cuedoc.bodega,
			CONVERT(MONEY,0)  AS pre_uni,
			CONVERT(MONEY,0)  AS pre_val,inv_subgrupos.cod_sub,inv_subgrupos.nom_sub
FROM inv_cabdoc 
	INNER JOIN inv_cuedoc WITH(NOLOCK) ON inv_cabdoc.ano_doc = inv_cuedoc.ano_doc AND inv_cabdoc.num_doc = inv_cuedoc.num_doc AND 
											inv_cabdoc.per_doc = inv_cuedoc.per_doc AND inv_cabdoc.tip_doc = inv_cuedoc.tip_doc 
	INNER JOIN inv_items WITH(NOLOCK) ON inv_cuedoc.item = inv_items.cod_item 
	INNER JOIN inv_grupos WITH(NOLOCK) ON inv_items.cod_grupo = inv_grupos.cod_gru  
	INNER JOIN inv_subgrupos WITH(NOLOCK) ON inv_items.cod_grupo=inv_subgrupos.cod_gru AND inv_items.cod_subgrupo=inv_subgrupos.cod_sub
WHERE inv_cabdoc.tip_doc IN ('010','510')
GROUP BY inv_cabdoc.ano_doc, inv_cabdoc.per_doc, inv_items.des_item, inv_items.cod_grupo, inv_grupos.nom_gru, 
				inv_cuedoc.item, inv_cabdoc.cod_suc, inv_cuedoc.bodega,inv_subgrupos.cod_sub,inv_subgrupos.nom_sub
UNION ALL
SELECT inv_cabdoc.ano_doc AS ano_acu, inv_cabdoc.per_doc AS per_acu, SUM(inv_cuedoc.cantidad)*-1 AS cantidad, 
			SUM(inv_cuedoc.pre_tot)*-1 AS pre_tot, inv_items.des_item, inv_items.cod_grupo, inv_grupos.nom_gru, 
			inv_cuedoc.item AS cod_item, inv_cabdoc.cod_suc, inv_cuedoc.bodega,
			CONVERT(MONEY,0) AS pre_uni,
			CONVERT(MONEY,0) AS pre_val,inv_subgrupos.cod_sub,inv_subgrupos.nom_sub
FROM inv_cabdoc 
	INNER JOIN inv_cuedoc WITH(NOLOCK) ON inv_cabdoc.ano_doc = inv_cuedoc.ano_doc AND inv_cabdoc.num_doc = inv_cuedoc.num_doc AND 
											inv_cabdoc.per_doc = inv_cuedoc.per_doc AND inv_cabdoc.tip_doc = inv_cuedoc.tip_doc 
		INNER JOIN inv_items WITH(NOLOCK) ON inv_cuedoc.item = inv_items.cod_item 
		INNER JOIN inv_grupos WITH(NOLOCK) ON inv_items.cod_grupo = inv_grupos.cod_gru 
		INNER JOIN inv_subgrupos WITH(NOLOCK) ON inv_items.cod_grupo=inv_subgrupos.cod_gru AND inv_items.cod_subgrupo=inv_subgrupos.cod_sub 
WHERE inv_cabdoc.tip_doc = '302'
GROUP BY inv_cabdoc.ano_doc, inv_cabdoc.per_doc, inv_items.des_item, inv_items.cod_grupo, inv_grupos.nom_gru, 
				inv_cuedoc.item, inv_cabdoc.cod_suc, inv_cuedoc.bodega,inv_subgrupos.cod_sub,inv_subgrupos.nom_sub
UNION ALL
SELECT inv_preitem.ano_acu,inv_preitem.per_acu,CONVERT(MONEY,0)  AS cantidad,CONVERT(MONEY,0)  AS pre_tot,
			inv_items.des_item, inv_items.cod_grupo, inv_grupos.nom_gru, 
			inv_preitem.cod_item, inv_preitem.cod_suc, inv_preitem.cod_bod AS bodega,
			SUM(inv_preitem.pre_uni) AS pre_uni,
			SUM(inv_preitem.pre_val) AS pre_val,inv_subgrupos.cod_sub,inv_subgrupos.nom_sub
FROM inv_preitem 
	INNER JOIN inv_items WITH(NOLOCK) ON inv_preitem.cod_item = inv_items.cod_item 
	INNER JOIN inv_grupos WITH(NOLOCK) ON inv_items.cod_grupo = inv_grupos.cod_gru 
	INNER JOIN inv_subgrupos WITH(NOLOCK) ON inv_items.cod_grupo=inv_subgrupos.cod_gru AND inv_items.cod_subgrupo=inv_subgrupos.cod_sub
GROUP BY inv_preitem.ano_acu, inv_preitem.per_acu, inv_items.des_item, inv_items.cod_grupo, inv_grupos.nom_gru, 
				inv_preitem.cod_item, inv_preitem.cod_suc, inv_preitem.cod_bod,inv_subgrupos.cod_sub,inv_subgrupos.nom_sub

```
