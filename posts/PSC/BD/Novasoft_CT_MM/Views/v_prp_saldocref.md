# View: v_prp_saldocref

## Usa los objetos:
- [[prp_cuedoc]]
- [[prp_rubro]]

```sql

CREATE VIEW [dbo].[v_prp_saldocref]
AS
SELECT cue.ano_doc,cue.per_doc,cue.tip_doc,cue.sub_tip,cue.num_doc,cue.cod_rub,rub.nom_rub,SUM(cue.val_doc) AS val_doc, ISNULL(SUM(sal_doc),0) AS sal_doc 
FROM prp_cuedoc AS cue WITH(NOLOCK)
	INNER JOIN prp_rubro AS rub WITH(NOLOCK) ON cue.cod_rub=rub.cod_rub
GROUP BY cue.ano_doc,cue.per_doc,cue.tip_doc,cue.sub_tip,cue.num_doc,cue.cod_rub,rub.nom_rub
UNION ALL
SELECT '0' AS  ano_doc,'0' AS per_doc,'0' AS tip_doc,'0' AS sub_tip,'0' AS num_doc,'0' AS cod_rub,'NO APLICA' AS nom_rub,'0' AS val_doc, '0' AS sal_doc;

```
