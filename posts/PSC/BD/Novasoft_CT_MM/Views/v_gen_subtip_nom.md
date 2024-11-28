# View: v_gen_subtip_nom

## Usa los objetos:
- [[gen_configtipo]]
- [[gen_subtipodoc]]
- [[gen_tipodoc]]

```sql

CREATE VIEW	[dbo].[v_gen_subtip_nom] 
AS
SELECT T.cod_tip, t.des_tip, a.cod_sub,a.nom_sub,b.nat_doc
FROM gen_subtipodoc AS a WITH(NOLOCK)
	INNER JOIN gen_configtipo AS b WITH(NOLOCK) ON a.cod_tip=b.cod_tip
	INNER JOIN gen_tipodoc AS T WITH(NOLOCK) ON T.cod_tip = A.cod_tip
WHERE	cod_apl='nom';

```
