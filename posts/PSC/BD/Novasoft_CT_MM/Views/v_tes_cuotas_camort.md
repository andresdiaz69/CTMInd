# View: v_tes_cuotas_camort

## Usa los objetos:
- [[gen_subtipodoc]]
- [[tes_cuo_cre]]
- [[tes_inv_cre]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_tes_cuotas_camort]
AS

WITH cuotas AS (SELECT	ven.ano_doc, ven.per_doc, ven.sub_tip, ven.num_doc, ROW_NUMBER() OVER(PARTITION BY ven.ano_doc, ven.per_doc, ven.sub_tip, ven.num_doc ORDER BY ven.ano_doc, ven.per_doc, ven.sub_tip, ven.num_doc) AS rango,'Inversiones' AS tip_cau
						FROM tes_inv_cre AS ven WITH (NOLOCK)
							INNER JOIN tes_cuo_cre AS cuo WITH (NOLOCK) ON cuo.ano_doc=ven.ano_doc AND cuo.per_doc=ven.per_doc AND cuo.sub_tip=ven.sub_tip AND cuo.num_doc=ven.num_doc
							INNER JOIN gen_subtipodoc AS sub WITH (NOLOCK) ON ven.sub_tip = sub.cod_sub
						WHERE cuo.num_cnt IS NULL
							AND cuo.num_nif IS NULL
							AND sub.cod_tip IN ('240','260','310')
						UNION ALL
						SELECT	ven.ano_doc, ven.per_doc, ven.sub_tip, ven.num_doc, ROW_NUMBER() OVER(PARTITION BY ven.ano_doc, ven.per_doc, ven.sub_tip, ven.num_doc ORDER BY ven.ano_doc, ven.per_doc, ven.sub_tip, ven.num_doc) AS rango,'Créditos' AS tip_cau
						FROM tes_inv_cre AS ven WITH (NOLOCK)
							INNER JOIN tes_cuo_cre AS cuo WITH (NOLOCK) ON cuo.ano_doc=ven.ano_doc AND cuo.per_doc=ven.per_doc AND cuo.sub_tip=ven.sub_tip AND cuo.num_doc=ven.num_doc
							INNER JOIN gen_subtipodoc AS sub WITH (NOLOCK) ON ven.sub_tip = sub.cod_sub
						WHERE cuo.num_cnt IS NULL
							AND cuo.num_nif IS NULL
							AND sub.cod_tip ='410'
						)

SELECT *
FROM cuotas WITH (NOLOCK)
WHERE rango=1;

```
