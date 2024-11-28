# View: v_odp_ordenesprod

## Usa los objetos:
- [[inv_cabdoc]]

```sql

CREATE VIEW [dbo].[v_odp_ordenesprod]
AS
SELECT ano_doc,per_doc,tip_doc,sub_tip,num_doc,activa,num_fac
FROM inv_cabdoc WITH(NOLOCK)
WHERE tip_doc='401' 
	AND cambio='0'
UNION ALL
SELECT '0','0','0','0','0','A','0';

```
