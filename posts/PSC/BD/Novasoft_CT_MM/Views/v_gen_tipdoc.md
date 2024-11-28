# View: v_gen_tipdoc

## Usa los objetos:
- [[gen_configtipo]]
- [[gen_subtipodoc]]

```sql

CREATE VIEW [dbo].[v_gen_tipdoc]
AS
SELECT a.cod_sub, a.nom_sub, b.cod_apl
FROM dbo.gen_subtipodoc AS a WITH(NOLOCK)
	INNER JOIN dbo.gen_configtipo AS b WITH(NOLOCK) ON a.cod_tip = b.cod_tip;

```
