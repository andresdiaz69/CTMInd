# View: v_cxc_docs_amortiza

## Usa los objetos:
- [[cxc_cabdoc]]
- [[cxc_ven_cre]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_cxc_docs_amortiza]
AS
WITH amortiza AS (	SELECT ano_doc, per_doc, sub_tip, num_doc, 1 AS valor
								FROM cxc_cabdoc WITH(NOLOCK)
								WHERE tip_doc BETWEEN '010' AND '039'
								UNION 
								SELECT ano_doc, per_doc, sub_tip, num_doc,-1
								FROM cxc_ven_cre WITH(NOLOCK)
							)
SELECT ano_doc, per_doc, sub_tip, num_doc, SUM(valor) AS valor
FROM amortiza  WITH (NOLOCK)
GROUP BY ano_doc, per_doc, sub_tip, num_doc
HAVING SUM(valor) > 0;

```
