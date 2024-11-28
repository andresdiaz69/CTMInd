# View: v_nif_librodiario

## Usa los objetos:
- [[gen_tipodoc]]
- [[nif_cuedoc]]
- [[nif_puc]]

```sql

CREATE VIEW [dbo].[v_nif_librodiario]
AS
SELECT	cue.ano_doc, cue.per_doc, cue.tip_doc, cue.cod_cta, puc.nom_cta, tip.des_tip, puc.niv_cta, 
			SUM(cue.deb_mov) AS deb_mov, SUM(cue.cre_mov) AS cre_mov
FROM	dbo.nif_cuedoc AS cue WITH(NOLOCK) 
	INNER JOIN dbo.nif_puc AS puc WITH(NOLOCK) ON cue.cod_cta = puc.cod_cta 
	INNER JOIN gen_tipodoc AS tip WITH(NOLOCK) ON cue.tip_doc=tip.cod_tip
GROUP BY cue.ano_doc, cue.per_doc, cue.tip_doc, cue.cod_cta, puc.nom_cta, tip.des_tip, puc.niv_cta

```
