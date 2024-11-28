# View: v_odp_items

## Usa los objetos:
- [[inv_cuedoc]]
- [[inv_items]]
- [[inv_param_cnt]]

```sql

CREATE VIEW [dbo].[v_odp_items]
AS
SELECT cue.ano_doc,cue.per_doc,cue.sub_tip,cue.num_doc,cue.reg_doc,ite.cod_tipo,cue.item AS cod_item,cue.sustide,ite.des_item,cue.etapa, ite.ind_lote,'Materia Prima' AS 'Tip_Inventario'
FROM inv_cuedoc AS cue WITH(NOLOCK)
	INNER JOIN inv_items AS ite WITH(NOLOCK) ON cue.item = ite.cod_item
	INNER JOIN	inv_param_cnt AS par WITH(NOLOCK) ON ite.cod_tipo=par.tip_matpri
WHERE cue.tip_doc='401'
UNION ALL
SELECT cue.ano_doc,cue.per_doc,cue.sub_tip,cue.num_doc,cue.reg_doc,ite.cod_tipo,cue.item AS cod_item,cue.sustide,ite.des_item,cue.etapa, ite.ind_lote,'Insumos' AS 'Tip_Inventario'
FROM inv_cuedoc AS cue WITH(NOLOCK)
	INNER JOIN inv_items AS ite WITH(NOLOCK) ON cue.item = ite.cod_item
	INNER JOIN	inv_param_cnt AS par WITH(NOLOCK) ON ite.cod_tipo=par.tip_insumos
WHERE cue.tip_doc='401'
UNION ALL
SELECT cue.ano_doc,cue.per_doc,cue.sub_tip,cue.num_doc,cue.reg_doc,ite.cod_tipo,cue.item AS cod_item,cue.sustide,ite.des_item,cue.etapa, ite.ind_lote,'Mano de Obra Directa' AS 'Tip_Inventario'
FROM inv_cuedoc AS cue WITH(NOLOCK)
	INNER JOIN inv_items AS ite WITH(NOLOCK) ON cue.item = ite.cod_item
	INNER JOIN	inv_param_cnt AS par WITH(NOLOCK) ON ite.cod_tipo=par.tip_manobradir
WHERE cue.tip_doc='401'
UNION ALL
SELECT cue.ano_doc,cue.per_doc,cue.sub_tip,cue.num_doc,cue.reg_doc,ite.cod_tipo,cue.item AS cod_item,cue.sustide,ite.des_item,cue.etapa, ite.ind_lote,'Mano de Obra Indirecta' AS 'Tip_Inventario'
FROM inv_cuedoc AS cue WITH(NOLOCK)
	INNER JOIN inv_items AS ite WITH(NOLOCK) ON cue.item = ite.cod_item
	INNER JOIN	inv_param_cnt AS par WITH(NOLOCK) ON ite.cod_tipo=par.tip_manobraindir
WHERE cue.tip_doc='401'
UNION ALL
SELECT cue.ano_doc,cue.per_doc,cue.sub_tip,cue.num_doc,cue.reg_doc,ite.cod_tipo,cue.item AS cod_item,cue.sustide,ite.des_item,cue.etapa, ite.ind_lote,'Costos Indirectos de Fabricacion' AS 'Tip_Inventario'
FROM inv_cuedoc AS cue WITH(NOLOCK)
	INNER JOIN inv_items AS ite WITH(NOLOCK) ON cue.item = ite.cod_item
	INNER JOIN	inv_param_cnt AS par WITH(NOLOCK) ON ite.cod_tipo=par.tip_costindfab
WHERE cue.tip_doc='401'
UNION ALL
SELECT cue.ano_doc,cue.per_doc,cue.sub_tip,cue.num_doc,cue.reg_doc,ite.cod_tipo,cue.item AS cod_item,cue.sustide,ite.des_item,cue.etapa, ite.ind_lote,'Maquina' AS 'Tip_Inventario'
FROM inv_cuedoc AS cue WITH(NOLOCK)
	INNER JOIN inv_items AS ite WITH(NOLOCK) ON cue.item = ite.cod_item
	INNER JOIN	inv_param_cnt AS par WITH(NOLOCK) ON ite.cod_tipo=par.tip_maquina
WHERE cue.tip_doc='401'

```
