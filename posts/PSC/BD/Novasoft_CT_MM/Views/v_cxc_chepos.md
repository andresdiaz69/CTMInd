# View: v_cxc_chepos

## Usa los objetos:
- [[cxc_cabdoc]]
- [[cxc_cuedoc]]

```sql

--	REVISION DE LA ASIGNACION DEL ESTADO
--	JCESARS		JUNIO/2009
-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_cxc_chepos]
AS
SELECT cue.cod_cli,cue.ban_pos,cue.num_che,val_doc,
cab.fch_doc,CASE WHEN sal_doc=0 AND final IS NULL THEN 'C'
						WHEN sal_doc=0 AND final='D' THEN 'D'
						WHEN sal_doc<>val_doc AND sal_doc<>0 THEN 'I'
						WHEN sal_doc=val_doc THEN 'P' 
						END  AS est_che,cue.fec_che,sal_doc
FROM         cxc_cuedoc AS cue WITH (NOLOCK) INNER JOIN cxc_cabdoc AS cab WITH (NOLOCK) ON cab.ano_doc=cue.ano_doc AND  cab.per_doc=cue.per_doc AND  cab.sub_tip=cue.sub_tip AND  cab.num_doc=cue.num_doc 
WHERE     cue.tip_doc = '070'

```