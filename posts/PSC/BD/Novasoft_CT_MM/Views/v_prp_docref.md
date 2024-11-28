# View: v_prp_docref

## Usa los objetos:
- [[gen_subtipodoc]]
- [[prp_cabdoc]]
- [[prp_cuedoc]]

```sql

CREATE VIEW [dbo].[v_prp_docref]
AS
SELECT cue.ano_doc,cue.per_doc,cue.tip_doc,cue.sub_tip,tip.nom_sub,cue.num_doc,cab.fch_doc,cab.cod_prv,SUM(cue.val_doc) AS val_doc, ISNULL(SUM(sal_doc),0) AS sal_doc 
FROM prp_cuedoc AS cue WITH(NOLOCK)
	INNER JOIN prp_cabdoc AS cab WITH(NOLOCK) ON cue.ano_doc=cab.ano_doc AND cue.per_doc=cab.per_doc AND cue.tip_doc=cab.tip_doc AND cue.sub_tip=cab.sub_tip AND cue.num_doc=cab.num_doc
	INNER JOIN gen_subtipodoc AS tip WITH(NOLOCK) ON cue.tip_doc=tip.cod_tip AND cue.sub_tip=tip.cod_sub
GROUP BY cue.ano_doc,cue.per_doc,cue.tip_doc,cue.sub_tip,tip.nom_sub,cue.num_doc,cab.fch_doc,cab.cod_prv
UNION ALL
SELECT '0' AS  ano_doc,'0' AS per_doc,'0' AS tip_doc,'0' AS sub_tip,'NO APLICA' AS nom_sub,'0' AS num_doc,'1900-01-01' as fch_doc, '0' AS cod_prv,'0' AS val_doc, '0' AS sal_doc;

```
