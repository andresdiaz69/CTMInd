# View: v_cxp_cuotas_camort

## Usa los objetos:
- [[cxp_com_cre]]
- [[cxp_cuo_cre]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_cxp_cuotas_camort]
AS

WITH cuotas AS (SELECT	com.ano_doc, com.per_doc, com.sub_tip, com.num_doc, ROW_NUMBER() OVER(PARTITION BY com.ano_doc, com.per_doc, com.sub_tip, com.num_doc ORDER BY com.ano_doc, com.per_doc, com.sub_tip, com.num_doc) AS rango
						FROM cxp_com_cre AS com WITH (NOLOCK)
							INNER JOIN cxp_cuo_cre AS cuo WITH (NOLOCK) ON cuo.ano_doc=com.ano_doc AND cuo.per_doc=com.per_doc AND cuo.sub_tip=com.sub_tip AND cuo.num_doc=com.num_doc
						WHERE cuo.num_ncd IS NULL)

SELECT *
FROM cuotas WITH (NOLOCK)
WHERE rango=1;

```
