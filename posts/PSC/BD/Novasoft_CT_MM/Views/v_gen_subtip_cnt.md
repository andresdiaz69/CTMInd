# View: v_gen_subtip_cnt

## Usa los objetos:
- [[gen_configtipo]]
- [[gen_subtipodoc]]
- [[gen_tipodoc]]

```sql

CREATE VIEW [dbo].[v_gen_subtip_cnt]
AS
SELECT a.cod_sub, a.nom_sub, b.nat_doc, a.cod_tip, dbo.gen_tipodoc.des_tip
FROM dbo.gen_subtipodoc AS a WITH(NOLOCK)
	INNER JOIN dbo.gen_configtipo AS b WITH(NOLOCK) ON a.cod_tip = b.cod_tip 
	INNER JOIN dbo.gen_tipodoc WITH(NOLOCK) ON a.cod_tip = dbo.gen_tipodoc.cod_tip AND b.cod_tip = dbo.gen_tipodoc.cod_tip
WHERE (b.cod_apl = 'CNT');

```
