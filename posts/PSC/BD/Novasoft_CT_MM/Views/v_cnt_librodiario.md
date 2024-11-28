# View: v_cnt_librodiario

## Usa los objetos:
- [[cnt_cuedoc]]
- [[cnt_puc]]
- [[gen_tipodoc]]

```sql

CREATE VIEW [dbo].[v_cnt_librodiario]
AS
SELECT cue.ano_doc, cue.per_doc, cue.tip_doc, cue.cod_cta, puc.nom_cta, tip.des_tip, puc.niv_cta, 
SUM(cue.deb_mov) AS deb_mov, SUM(cue.cre_mov) AS cre_mov
FROM dbo.cnt_cuedoc AS cue WITH(NOLOCK) 
	INNER JOIN dbo.cnt_puc AS puc WITH(NOLOCK) ON cue.cod_cta = puc.cod_cta 
	INNER JOIN gen_tipodoc AS tip WITH(NOLOCK) ON cue.tip_doc=tip.cod_tip
GROUP BY cue.ano_doc, cue.per_doc, cue.tip_doc, cue.cod_cta, puc.nom_cta, tip.des_tip, puc.niv_cta;

```
