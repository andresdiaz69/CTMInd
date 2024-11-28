# View: v_inv_pregrupo

## Usa los objetos:
- [[inv_items]]
- [[inv_preitem]]

```sql

CREATE VIEW [dbo].[v_inv_pregrupo]
AS
SELECT     dbo.inv_preitem.ano_acu, dbo.inv_preitem.per_acu, dbo.inv_items.cod_grupo, dbo.inv_preitem.cod_suc, dbo.inv_preitem.cod_bod, SUM(dbo.inv_preitem.pre_uni) AS pre_uni, 
				SUM(dbo.inv_preitem.pre_val) AS pre_val
FROM         dbo.inv_preitem WITH(NOLOCK)
	INNER JOIN dbo.inv_items WITH(NOLOCK) ON dbo.inv_preitem.cod_item = dbo.inv_items.cod_item
GROUP BY dbo.inv_preitem.ano_acu, dbo.inv_preitem.per_acu, dbo.inv_items.cod_grupo, dbo.inv_preitem.cod_suc, dbo.inv_preitem.cod_bod

```
