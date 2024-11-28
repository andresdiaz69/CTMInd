# View: v_tes_docs_amortiza

## Usa los objetos:
- [[tes_cabdoc]]
- [[tes_inv_cre]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_tes_docs_amortiza]
AS
WITH amortiza AS (	SELECT ano_doc, per_doc, sub_tip, num_doc, 1 AS valor
								FROM tes_cabdoc WITH(NOLOCK)
								WHERE cambio='0'
									AND tip_doc IN ('240','260','310','410')
								UNION 
								SELECT ano_doc, per_doc, sub_tip, num_doc,-1
								FROM tes_inv_cre WITH(NOLOCK)
							)
SELECT ano_doc, per_doc, sub_tip, num_doc, SUM(valor) AS valor
FROM amortiza WITH (NOLOCK)
GROUP BY ano_doc, per_doc, sub_tip, num_doc
HAVING SUM(valor) > 0;

```
