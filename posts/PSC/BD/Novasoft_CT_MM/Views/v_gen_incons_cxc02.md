# View: v_gen_incons_cxc02

## Usa los objetos:
- [[cxc_cuedoc]]
- [[cxc_inf_cxc]]

```sql

CREATE VIEW [dbo].[v_gen_incons_cxc02]
AS
SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, 
	RTRIM(ano_ref)+'-'+RTRIM(per_ref)+'-'+RTRIM(sub_ref)+'-'+RTRIM(num_ref)+'-'+RTRIM(CONVERT(CHAR,reg_ref))+' Documento de referencia no existe' AS error 
FROM cxc_inf_cxc WITH(NOLOCK)
WHERE tip_doc BETWEEN '040' AND '069' 
	AND ano_ref<>'0' 
	AND	RTRIM(ano_ref)+RTRIM(per_ref)+RTRIM(sub_ref)+RTRIM(num_ref)+RTRIM(CONVERT(CHAR,reg_ref)) NOT IN 
		(SELECT RTRIM(ano_doc)+RTRIM(per_doc)+RTRIM(sub_tip)+RTRIM(num_doc)+RTRIM(CONVERT(CHAR,reg_doc)) 
			FROM cxc_cuedoc WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc,RTRIM(ano_ant)+'-'+RTRIM(per_ant)+'-'+RTRIM(sub_ant)+'-'+RTRIM(doc_ant)+'-'+RTRIM(CONVERT(CHAR,reg_ant))+' Anticipo no existe' AS error 
FROM cxc_inf_cxc WITH(NOLOCK)
WHERE tip_doc BETWEEN '010' AND '039' 
	AND doc_ant<>'0' 
	AND RTRIM(ano_ant)+RTRIM(per_ant)+RTRIM(sub_ant)+RTRIM(doc_ant)+RTRIM(CONVERT(CHAR,reg_ant)) NOT IN 
		(SELECT RTRIM(ano_doc)+RTRIM(per_doc)+RTRIM(sub_tip)+RTRIM(num_doc)+RTRIM(CONVERT(CHAR,reg_doc)) 
			FROM cxc_cuedoc WITH(NOLOCK));

```