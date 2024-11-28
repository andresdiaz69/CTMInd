# View: v_act_items

## Usa los objetos:
- [[inv_grupos]]
- [[inv_items]]

```sql

CREATE VIEW [dbo].[v_act_items]

AS

SELECT        dbo.inv_items.cod_item,dbo.inv_items.des_item
FROM          dbo.inv_items WITH(NOLOCK)
	INNER JOIN dbo.inv_grupos WITH(NOLOCK) ON dbo.inv_items.cod_grupo = dbo.inv_grupos.cod_gru
WHERE		  dbo.inv_items.cod_item='0' OR (dbo.inv_grupos.cod_clas>'0' 
	AND dbo.inv_grupos.cla_nif IS NOT NULL) 
	AND dbo.inv_items.cod_est=1

```
