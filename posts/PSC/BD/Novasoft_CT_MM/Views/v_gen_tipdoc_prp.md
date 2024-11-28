# View: v_gen_tipdoc_prp

## Usa los objetos:
- [[gen_configtipo]]
- [[gen_tipodoc]]

```sql

CREATE VIEW [dbo].[v_gen_tipdoc_prp]
AS
SELECT  a.cod_tip, a.des_tip, b.nat_doc
FROM dbo.gen_configtipo AS b WITH(NOLOCK) 
	INNER JOIN dbo.gen_tipodoc AS a WITH(NOLOCK) ON a.cod_tip = a.cod_tip AND b.cod_tip = a.cod_tip
WHERE (b.cod_apl = 'PRP')
UNION ALL 
SELECT '0','NO APLICA',NULL;

```
