# View: v_gen_incons_act01

## Usa los objetos:
- [[act_activos]]
- [[act_inf_act]]
- [[act_tipoadq]]
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_subtipodoc]]
- [[gen_sucursal]]
- [[gen_terceros]]
- [[inv_bodegas]]
- [[inv_items]]

```sql

CREATE VIEW [dbo].[v_gen_incons_act01]
AS
SELECT ano_doc, per_doc, sub_tip, tip_doc, num_doc, 'El subtipo ' + RTRIM(sub_tip)  +' de documento no pertenece al tipo definido o no existe.' AS error
FROM act_inf_act WITH(NOLOCK)
WHERE tip_doc+RTRIM(sub_tip) 
	NOT IN (	SELECT cod_tip+RTRIM(cod_sub) 
				FROM gen_subtipodoc WITH(NOLOCK))

UNION ALL

SELECT ano_doc, per_doc, sub_tip, tip_doc, num_doc, 'El proveedor '+ RTRIM(cod_pro) +' no existe en el maestro de terceros.' AS error
FROM act_inf_act WITH(NOLOCK)
WHERE cod_pro NOT IN (	SELECT ter_nit 
						FROM gen_terceros WITH(NOLOCK))

UNION ALL

SELECT ano_doc, per_doc, sub_tip, tip_doc, num_doc, 'El tipo de adquisición ' + RTRIM(tip_adq)  +' no existe.' AS error
FROM act_inf_act WITH(NOLOCK)
WHERE tip_adq NOT IN (	SELECT cod_adq 
						FROM act_tipoadq WITH(NOLOCK))

UNION ALL

SELECT ano_doc, per_doc, sub_tip, tip_doc, num_doc, 'El código de sucursal ' + RTRIM(cod_suc)  +' no existe.' AS error
FROM act_inf_act WITH(NOLOCK)
WHERE cod_suc NOT IN (	SELECT cod_suc 
						FROM gen_sucursal WITH(NOLOCK))

UNION ALL

SELECT ano_doc, per_doc, sub_tip, tip_doc, num_doc, 'El código de centro de costo ' + RTRIM(cod_cco)  +' no existe.' AS error
FROM act_inf_act WITH(NOLOCK)
WHERE cod_cco NOT IN (	SELECT cod_cco 
						FROM gen_ccosto WITH(NOLOCK))

UNION ALL

SELECT ano_doc, per_doc, sub_tip, tip_doc, num_doc, 'El código de clasificador 1 ' + RTRIM(cod_cl1)  +' no existe.' AS error
FROM act_inf_act WITH(NOLOCK)
WHERE cod_cl1 NOT IN (	SELECT codigo 
						FROM gen_clasif1 WITH(NOLOCK))

UNION ALL

SELECT ano_doc, per_doc, sub_tip, tip_doc, num_doc, 'El código de clasificador 2 ' + RTRIM(cod_cl2)  +' no existe.' AS error
FROM act_inf_act WITH(NOLOCK)
WHERE cod_cl2 NOT IN (	SELECT codigo 
						FROM gen_clasif2 WITH(NOLOCK))

UNION ALL

SELECT ano_doc, per_doc, sub_tip, tip_doc, num_doc, 'El código de clasificador 3 ' + RTRIM(cod_cl3)  +' no existe.' AS error
FROM act_inf_act WITH(NOLOCK)
WHERE cod_cl3 NOT IN (	SELECT codigo 
						FROM gen_clasif3 WITH(NOLOCK))

UNION ALL

SELECT ano_doc, per_doc, sub_tip, tip_doc, num_doc, 'El código de ítem ' + RTRIM(cod_item)  +' no existe.' AS error
FROM act_inf_act WITH(NOLOCK)
WHERE cod_item NOT IN (	SELECT cod_item 
						FROM inv_items  WITH(NOLOCK))

UNION ALL

SELECT ano_doc, per_doc, sub_tip, tip_doc, num_doc, 'La placa de referencia ' + RTRIM(pla_ref)  +' no existe.' AS error
FROM act_inf_act WITH(NOLOCK)
WHERE pla_ref NOT IN (	SELECT cod_pla 
						FROM act_activos WITH(NOLOCK))

UNION ALL

SELECT ano_doc, per_doc, sub_tip, tip_doc, num_doc, 'El código de tercero ' + RTRIM(cod_ter)  +' no existe.' AS error
FROM act_inf_act WITH(NOLOCK)
WHERE cod_ter NOT IN (	SELECT ter_nit 
						FROM gen_terceros WITH(NOLOCK))

UNION ALL

SELECT ano_doc, per_doc, sub_tip, tip_doc, num_doc, 'El código de bodega ' + RTRIM(cod_bod)  +' no existe.' AS error
FROM act_inf_act WITH(NOLOCK)
WHERE cod_bod NOT IN (	SELECT cod_bod 
						FROM inv_bodegas WITH(NOLOCK));

```
