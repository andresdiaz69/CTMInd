# View: v_cxp_saldocs

## Usa los objetos:
- [[cxp_cuedoc]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_cxp_saldocs]
AS
SELECT	ano_doc,per_doc,sub_tip,num_doc,cod_pro,SUM(val_doc) AS val_doc,SUM(sal_doc) AS sal_doc,0 AS ind_pago
FROM	dbo.cxp_cuedoc WITH (NOLOCK)
WHERE	tip_doc BETWEEN '110' AND '139'
GROUP BY ano_doc,per_doc,sub_tip,num_doc,cod_pro

```
