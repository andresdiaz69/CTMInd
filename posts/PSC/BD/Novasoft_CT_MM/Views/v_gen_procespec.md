# View: v_gen_procespec

## Usa los objetos:
- [[web_procesosgen]]

```sql

CREATE VIEW [dbo].[v_gen_procespec] 
AS 
	SELECT SUBSTRING(cod_proc,1,3) AS cod_apl, cod_proc,nom_proc, nom_sp, nom_aspx
	FROM web_procesosgen WITH(NOLOCK)
	UNION ALL
	SELECT '0', '0','No Aplica','','';

```
