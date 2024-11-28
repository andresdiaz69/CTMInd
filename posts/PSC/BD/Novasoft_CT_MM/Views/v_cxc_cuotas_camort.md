# View: v_cxc_cuotas_camort

## Usa los objetos:
- [[cxc_cuo_cre]]
- [[cxc_ven_cre]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_cxc_cuotas_camort]
AS

WITH cuotas AS (SELECT	ven.ano_doc, ven.per_doc, ven.sub_tip, ven.num_doc, ROW_NUMBER() OVER(PARTITION BY ven.ano_doc, ven.per_doc, ven.sub_tip, ven.num_doc ORDER BY ven.ano_doc, ven.per_doc, ven.sub_tip, ven.num_doc) AS rango
						FROM cxc_ven_cre AS ven WITH (NOLOCK)
							INNER JOIN cxc_cuo_cre AS cuo  WITH (NOLOCK) ON cuo.ano_doc=ven.ano_doc AND cuo.per_doc=ven.per_doc AND cuo.sub_tip=ven.sub_tip AND cuo.num_doc=ven.num_doc
						WHERE cuo.num_ndb IS NULL)

SELECT *
FROM cuotas WITH (NOLOCK)
WHERE rango=1;

```
