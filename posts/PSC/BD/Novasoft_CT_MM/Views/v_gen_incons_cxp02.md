# View: v_gen_incons_cxp02

## Usa los objetos:
- [[cxp_cuedoc]]
- [[cxp_inf_cxp]]

```sql

CREATE VIEW [dbo].[v_gen_incons_cxp02]
AS
SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, 
	RTRIM(ano_ref)+'-'+RTRIM(per_ref)+'-'+RTRIM(sub_ref)+'-'+RTRIM(num_ref)+'-'+RTRIM(CONVERT(CHAR,reg_ref))+' Documento de referencia no existe' AS error 
FROM cxp_inf_cxp WITH(NOLOCK)
WHERE tip_doc BETWEEN '140' AND '169' 
	AND ano_ref<>'0' 
	AND RTRIM(ano_ref)+RTRIM(per_ref)+RTRIM(sub_ref)+RTRIM(num_ref)+RTRIM(CONVERT(CHAR,reg_ref)) NOT IN 
		(SELECT RTRIM(ano_doc)+RTRIM(per_doc)+RTRIM(sub_tip)+RTRIM(num_doc)+RTRIM(CONVERT(CHAR,reg_doc)) 
			FROM cxp_cuedoc WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, 
	RTRIM(ano_ant)+'-'+RTRIM(per_ant)+'-'+RTRIM(sub_ant)+'-'+RTRIM(doc_ant)+'-'+RTRIM(CONVERT(CHAR,reg_ant))+' Anticipo no existe' AS error 
FROM cxp_inf_cxp WITH(NOLOCK)
WHERE tip_doc BETWEEN '110' AND '139' 
	AND doc_ant<>'0' 
	AND RTRIM(ano_ant)+RTRIM(per_ant)+RTRIM(sub_ant)+RTRIM(doc_ant)+RTRIM(CONVERT(CHAR,reg_ant)) NOT IN 
		(SELECT RTRIM(ano_doc)+RTRIM(per_doc)+RTRIM(sub_tip)+RTRIM(num_doc)+RTRIM(CONVERT(CHAR,reg_doc)) 
			FROM cxp_cuedoc WITH(NOLOCK));

```
