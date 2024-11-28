# View: v_inv_acucomtot

## Usa los objetos:
- [[cxp_provee]]
- [[inv_cabdoc]]
- [[inv_cuedoc]]
- [[inv_grupos]]
- [[inv_items]]
- [[inv_preitem]]

```sql

CREATE VIEW [dbo].[v_inv_acucomtot]
AS
SELECT     dbo.inv_cabdoc.ano_doc, dbo.inv_cabdoc.per_doc, SUM(dbo.inv_cuedoc.cantidad) AS cantidad, SUM(dbo.inv_cuedoc.pre_tot) AS pre_tot, 
                   dbo.inv_items.des_item, dbo.inv_items.cod_grupo, dbo.inv_grupos.nom_gru, dbo.cxp_provee.rso, dbo.inv_cabdoc.provee, dbo.inv_cuedoc.item, 
	     dbo.inv_cabdoc.cod_suc, dbo.inv_cuedoc.bodega,SUM(dbo.inv_preitem.com_uni) AS com_uni,SUM(dbo.inv_preitem.com_val) AS com_val,
	     CASE WHEN ISNULL(SUM(com_uni),0)<>0 THEN SUM(cantidad)/SUM(com_uni)*100 ELSE 0 END AS eje_und,
	     SUM(cantidad)-ISNULL(SUM(com_uni),0) AS dif_und,
	     CASE WHEN ISNULL(SUM(com_val),0)<>0 THEN SUM(pre_tot)/SUM(com_val)*100 ELSE 0 END AS eje_val,
	     SUM(pre_tot)-ISNULL(SUM(com_val),0) AS dif_val
FROM         dbo.inv_cabdoc WITH(NOLOCK) 
	INNER JOIN dbo.inv_cuedoc WITH(NOLOCK) ON dbo.inv_cabdoc.ano_doc = dbo.inv_cuedoc.ano_doc AND dbo.inv_cabdoc.num_doc = dbo.inv_cuedoc.num_doc AND 
                      dbo.inv_cabdoc.per_doc = dbo.inv_cuedoc.per_doc AND dbo.inv_cabdoc.tip_doc = dbo.inv_cuedoc.tip_doc 
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_cuedoc.item = dbo.inv_items.cod_item 
	INNER JOIN dbo.inv_grupos WITH(NOLOCK) ON dbo.inv_items.cod_grupo = dbo.inv_grupos.cod_gru 
	INNER JOIN dbo.cxp_provee WITH(NOLOCK) ON dbo.inv_cabdoc.provee = dbo.cxp_provee.provee 
	INNER JOIN dbo.inv_preitem WITH(NOLOCK) ON dbo.inv_cabdoc.ano_doc = dbo.inv_preitem.ano_acu and dbo.inv_cabdoc.per_doc = dbo.inv_preitem.per_acu
WHERE     (dbo.inv_cabdoc.tip_doc = '110')
GROUP BY dbo.inv_cabdoc.ano_doc, dbo.inv_cabdoc.per_doc, dbo.inv_items.des_item, dbo.inv_items.cod_grupo, dbo.inv_grupos.nom_gru, 
                dbo.cxp_provee.rso, dbo.inv_cabdoc.provee, dbo.inv_cuedoc.item, inv_cabdoc.cod_suc, inv_cuedoc.bodega
UNION ALL
SELECT dbo.inv_cabdoc.ano_doc, dbo.inv_cabdoc.per_doc, SUM(dbo.inv_cuedoc.cantidad)*-1 AS cantidad, SUM(dbo.inv_cuedoc.pre_tot)*-1 AS pre_tot, 
            dbo.inv_items.des_item, dbo.inv_items.cod_grupo, dbo.inv_grupos.nom_gru, dbo.cxp_provee.rso, dbo.inv_cabdoc.provee, dbo.inv_cuedoc.item, 
			dbo.inv_cabdoc.cod_suc, dbo.inv_cuedoc.bodega,SUM(dbo.inv_preitem.com_uni)*-1 AS com_uni,SUM(dbo.inv_preitem.com_val)*-1 AS com_val,
			CASE WHEN ISNULL(SUM(com_uni),0)<>0 THEN (SUM(cantidad)/SUM(com_uni)*100)*-1 ELSE 0 END AS eje_und,
			(SUM(cantidad)-ISNULL(SUM(com_uni),0))*-1 AS dif_und,
			CASE WHEN ISNULL(SUM(com_val),0)<>0 THEN (SUM(pre_tot)/SUM(com_val)*100)*-1 ELSE 0 END AS eje_val,
			(SUM(pre_tot)-ISNULL(SUM(com_val),0))*-1 AS dif_val
FROM   dbo.inv_cabdoc WITH(NOLOCK) 
	INNER JOIN dbo.inv_cuedoc WITH(NOLOCK) ON dbo.inv_cabdoc.ano_doc = dbo.inv_cuedoc.ano_doc AND dbo.inv_cabdoc.num_doc = dbo.inv_cuedoc.num_doc AND 
                      dbo.inv_cabdoc.per_doc = dbo.inv_cuedoc.per_doc AND dbo.inv_cabdoc.tip_doc = dbo.inv_cuedoc.tip_doc 
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_cuedoc.item = dbo.inv_items.cod_item 
	INNER JOIN dbo.inv_grupos WITH(NOLOCK) ON dbo.inv_items.cod_grupo = dbo.inv_grupos.cod_gru 
	INNER JOIN dbo.cxp_provee WITH(NOLOCK) ON dbo.inv_cabdoc.provee = dbo.cxp_provee.provee 
	INNER JOIN dbo.inv_preitem WITH(NOLOCK) ON dbo.inv_cabdoc.ano_doc = dbo.inv_preitem.ano_acu and dbo.inv_cabdoc.per_doc = dbo.inv_preitem.per_acu
WHERE     (dbo.inv_cabdoc.tip_doc = '301')
GROUP BY dbo.inv_cabdoc.ano_doc, dbo.inv_cabdoc.per_doc, dbo.inv_items.des_item, dbo.inv_items.cod_grupo, dbo.inv_grupos.nom_gru, 
                dbo.cxp_provee.rso, dbo.inv_cabdoc.provee, dbo.inv_cuedoc.item, inv_cabdoc.cod_suc, inv_cuedoc.bodega

```
