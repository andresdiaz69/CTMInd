# View: v_odp_pro_sus

## Usa los objetos:
- [[inv_items]]
- [[odp_pro_sus]]

```sql

CREATE VIEW [dbo].[v_odp_pro_sus]
AS
SELECT sus.pro_sus, ite.des_item, sus.coditem AS cod_item,sus.orden AS por_sustitucion,ite.ind_lote
FROM odp_pro_sus AS sus WITH(NOLOCK)
	INNER JOIN inv_items AS ite  WITH(NOLOCK) ON sus.pro_sus=ite.cod_item
UNION ALL 
SELECT '0','No Aplica','0','0',2;

```
