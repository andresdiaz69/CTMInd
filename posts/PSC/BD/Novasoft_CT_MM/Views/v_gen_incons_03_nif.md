# View: v_gen_incons_03_nif

## Usa los objetos:
- [[nif_cabdoc]]
- [[nif_cuedoc]]

```sql

/*ADECUACION VERSION WEB
JCESARS		MARZO/2009*/
CREATE VIEW [dbo].[v_gen_incons_03_nif]
AS
SELECT cab.ano_doc,cab.per_doc,cab.sub_tip,cab.num_doc,cab.fch_doc,SUM(cue.deb_mov) AS deb_mov,SUM(cue.cre_mov) AS cre_mov,SUM(cue.deb_mov - cue.cre_mov) AS dif_mov
FROM nif_cabdoc AS cab WITH(NOLOCK)
	INNER JOIN dbo.nif_cuedoc AS cue WITH(NOLOCK) ON cab.ano_doc=cue.ano_doc AND cab.per_doc=cue.per_doc AND cab.sub_tip=cue.sub_tip AND cab.num_doc=cue.num_doc
WHERE cab.sub_tip<>'900'
GROUP BY cab.ano_doc,cab.per_doc,cab.sub_tip,cab.num_doc,cab.fch_doc
HAVING (SUM(cue.deb_mov - cue.cre_mov) <> 0);

```
