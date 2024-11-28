# View: v_odp_item_412

## Usa los objetos:
- [[inv_cabdoc]]
- [[inv_items]]
- [[inv_param_cnt]]

```sql

CREATE VIEW [dbo].[v_odp_item_412]
AS
SELECT cab.ano_doc,cab.per_doc,cab.sub_tip,cab.num_doc,cab.codpt AS cod_item,ite.des_item
FROM inv_cabdoc AS cab WITH(NOLOCK)
	INNER JOIN inv_items AS ite WITH(NOLOCK) ON cab.codpt = ite.cod_item
	INNER JOIN	inv_param_cnt AS par WITH(NOLOCK) ON ite.cod_tipo=par.tip_prodter
WHERE cab.tip_doc='401'

```
