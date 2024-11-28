# View: v_gen_sumdebycre_nif

## Usa los objetos:
- [[v_gen_infnif]]

```sql

CREATE VIEW [dbo].[v_gen_sumdebycre_nif]
AS
SELECT ano_doc,per_doc,sub_tip,num_doc,aplic,SUM(deb_mov) AS sum_deb,SUM(cre_mov)  AS sum_cre
FROM v_gen_infnif WITH(NOLOCK)
GROUP BY ano_doc,per_doc,sub_tip,num_doc,aplic

```
