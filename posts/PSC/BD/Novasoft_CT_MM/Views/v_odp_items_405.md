# View: v_odp_items_405

## Usa los objetos:
- [[inv_items]]
- [[inv_param_cnt]]

```sql

CREATE VIEW [dbo].[v_odp_items_405]
AS
SELECT  ite.cod_tipo, ite.cod_item,ite.des_item ,'Mano de Obra Directa' AS 'Tip_Inventario'
FROM inv_items AS ite WITH(NOLOCK)
	INNER JOIN	inv_param_cnt AS par WITH(NOLOCK) ON ite.cod_tipo=par.tip_manobradir
UNION ALL
SELECT  ite.cod_tipo, ite.cod_item,ite.des_item ,'Mano de Obra Indirecta' AS 'Tip_Inventario'
FROM inv_items AS ite WITH(NOLOCK)
	INNER JOIN	inv_param_cnt AS par WITH(NOLOCK) ON ite.cod_tipo=par.tip_manobraindir
UNION ALL
SELECT  ite.cod_tipo, ite.cod_item,ite.des_item ,'Costos Indirectos de Fabricación' AS 'Tip_Inventario'
FROM inv_items AS ite WITH(NOLOCK)
	INNER JOIN	inv_param_cnt AS par WITH(NOLOCK) ON ite.cod_tipo=par.tip_costindfab
UNION ALL
SELECT  ite.cod_tipo,ite.cod_item,ite.des_item ,'Máquina' AS 'Tip_Inventario'
FROM inv_items AS ite WITH(NOLOCK)
	INNER JOIN	inv_param_cnt AS par WITH(NOLOCK) ON ite.cod_tipo=par.tip_maquina

```
