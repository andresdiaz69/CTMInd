# View: v_cxp_docs_amortiza

## Usa los objetos:
- [[cxp_cabdoc]]
- [[cxp_com_cre]]

```sql

CREATE VIEW [dbo].[v_cxp_docs_amortiza]
-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
AS
WITH amortiza AS (	SELECT ano_doc, per_doc, sub_tip, num_doc, 1 AS valor
								FROM cxp_cabdoc WITH(NOLOCK)
								WHERE tip_doc BETWEEN '110' AND '139'
								UNION 
								SELECT ano_doc, per_doc, sub_tip, num_doc,-1
								FROM cxp_com_cre WITH(NOLOCK)
							)
SELECT ano_doc, per_doc, sub_tip, num_doc, SUM(valor) AS valor
FROM amortiza WITH (NOLOCK)
GROUP BY ano_doc, per_doc, sub_tip, num_doc
HAVING SUM(valor) > 0;

```
