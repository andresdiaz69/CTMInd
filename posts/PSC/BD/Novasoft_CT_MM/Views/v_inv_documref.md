# View: v_inv_documref

## Usa los objetos:
- [[gen_subtipodoc]]
- [[inv_cuedoc]]

```sql

/* SE AGREGA LA DESCRIPCION DEL SUBTIPO DE REFERENCIA
-- JSARMIENTO FEBRERO/2011
	AFLOREZ SRS2020-0426 Cambio para agregar el campo registro de documento y de referencia*/
CREATE VIEW [dbo].[v_inv_documref] AS 
SELECT ano_doc,per_doc,tip_doc,sub_tip,num_doc,reg_doc,ano_ped as ano_ref,per_ped as per_ref,sub_ped as sub_ref,pedido as num_ref,nom_sub,reg_ped AS reg_ref
FROM inv_cuedoc WITH(NOLOCK) 
	INNER JOIN gen_subtipodoc WITH(NOLOCK) ON inv_cuedoc.sub_ped=gen_subtipodoc.cod_sub
WHERE pedido IS NOT NULL 
	AND pedido<>'0' 
	AND pedido<>'' 
	AND tip_doc NOT BETWEEN '400' AND '412'
UNION ALL
SELECT ano_doc,per_doc,tip_doc,sub_tip,num_doc,reg_doc,ano_des as ano_ref,per_des as per_ref,sub_des as sub_ref,despa as num_ref,nom_sub,reg_des AS reg_ref
FROM inv_cuedoc   WITH(NOLOCK)
INNER JOIN gen_subtipodoc WITH(NOLOCK) ON inv_cuedoc.sub_des=gen_subtipodoc.cod_sub
WHERE despa IS NOT NULL 
	AND despa<>'0' and despa<>'' 
	AND tip_doc NOT BETWEEN '400' AND '412';

```
