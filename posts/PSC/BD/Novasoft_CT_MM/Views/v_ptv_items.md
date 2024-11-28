# View: v_ptv_items

## Usa los objetos:
- [[inv_items]]

```sql

-- 2020/01/23 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_ptv_items]
AS

	SELECT     cod_item,des_item,cod_alterno
	FROM       dbo.inv_items WITH (NOLOCK)
	WHERE	   cod_est=1


```
