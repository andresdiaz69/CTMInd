# View: v_cxc_saldocs

## Usa los objetos:
- [[cxc_cuedoc]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_cxc_saldocs]
AS
SELECT     ano_doc,per_doc,sub_tip,num_doc,cod_cli,SUM(val_doc) AS val_doc,SUM(sal_doc) as SAL_DOC,0 AS ind_pago
FROM         dbo.cxc_cuedoc  WITH (NOLOCK)
WHERE tip_doc BETWEEN '010' AND '039'
GROUP BY  ano_doc,per_doc,sub_tip,num_doc,cod_cli

```
