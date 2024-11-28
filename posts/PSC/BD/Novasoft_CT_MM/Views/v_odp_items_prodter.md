# View: v_odp_items_prodter

## Usa los objetos:
- [[inv_items]]
- [[inv_param_cnt]]

```sql

CREATE VIEW [dbo].[v_odp_items_prodter]
AS
SELECT  ite.cod_item,ite.des_item,ite.cod_tipo,'Producto Terminado' AS 'Tip_Inventario'
FROM inv_items AS ite WITH(NOLOCK)
	INNER JOIN	inv_param_cnt AS par WITH(NOLOCK) ON ite.cod_tipo=par.tip_prodter

```
