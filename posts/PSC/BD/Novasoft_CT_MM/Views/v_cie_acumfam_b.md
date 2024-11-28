# View: v_cie_acumfam_b

## Usa los objetos:
- [[cie_cuedoc]]

```sql

CREATE VIEW [dbo].[v_cie_acumfam_b]
AS

SELECT cue.cod_fam,cue.ano_doc AS ano_acu,cue.per_doc AS per_acu,cue.tip_doc,
	CASE WHEN cue.tip_doc BETWEEN '010' AND '039' THEN SUM(cue.val_doc) ELSE 0 END AS acu_deb,
	CASE WHEN cue.tip_doc BETWEEN '040' AND '069' THEN SUM(cue.val_doc) ELSE 0 END AS acu_cre,
	CASE WHEN cue.tip_doc BETWEEN '010' AND '039' THEN SUM(cue.val_doc) 
			WHEN cue.tip_doc BETWEEN '040' AND '069' THEN SUM(-cue.val_doc) 
			ELSE 0 
		END AS sal_fin
FROM cie_cuedoc AS cue WITH(NOLOCK)
GROUP BY cue.cod_fam,cue.ano_doc,cue.per_doc,cue.tip_doc;

```
