# View: v_gen_incons_tes02

## Usa los objetos:
- [[cxc_cuedoc]]
- [[cxp_cuedoc]]
- [[tes_inf_tes]]

```sql

CREATE VIEW [dbo].[v_gen_incons_tes02]
AS
SELECT ano_doc,per_doc,sub_tip,num_doc,reg_doc,
	RTRIM(ano_ref)+'-'+RTRIM(per_ref)+'-'+RTRIM(sub_ref)+'-'+RTRIM(num_ref)+'-'+RTRIM(CONVERT(CHAR,reg_ref))+' Documento de referencia no existe' AS error 
FROM tes_inf_tes WITH(NOLOCK)
WHERE tip_doc BETWEEN '040' AND '069' 
	AND ano_ref<>'0' 
	AND RTRIM(ano_ref)+RTRIM(per_ref)+RTRIM(sub_ref)+RTRIM(num_ref)+RTRIM(CONVERT(CHAR,reg_ref)) NOT IN 
		(SELECT RTRIM(ano_doc)+RTRIM(per_doc)+RTRIM(sub_tip)+RTRIM(num_doc)+RTRIM(CONVERT(CHAR,reg_doc)) 
			FROM cxc_cuedoc WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, 
RTRIM(ano_ref)+'-'+RTRIM(per_ref)+'-'+RTRIM(sub_ref)+'-'+RTRIM(num_ref)+'-'+RTRIM(CONVERT(CHAR,reg_ref))+' Documento de referencia no existe' AS error 
FROM tes_inf_tes WITH(NOLOCK)
WHERE tip_doc BETWEEN '140' AND '169' 
	AND ano_ref<>'0' 
	AND RTRIM(ano_ref)+RTRIM(per_ref)+RTRIM(sub_ref)+RTRIM(num_ref)+RTRIM(CONVERT(CHAR,reg_ref)) NOT IN 
		(SELECT RTRIM(ano_doc)+RTRIM(per_doc)+RTRIM(sub_tip)+RTRIM(num_doc)+RTRIM(CONVERT(CHAR,reg_doc)) 
			FROM cxp_cuedoc WITH(NOLOCK));

```
