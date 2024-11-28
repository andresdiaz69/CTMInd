# View: v_gen_sumdebycre

## Usa los objetos:
- [[v_gen_infcon]]

```sql

/*Adecuación versión web	JCESARS	spetiembre/2007.*/
CREATE VIEW [dbo].[v_gen_sumdebycre]
AS
SELECT ano_doc,per_doc,sub_tip,num_doc,aplic,SUM(deb_mov) AS sum_deb,SUM(cre_mov)  AS sum_cre
FROM v_gen_infcon WITH(NOLOCK)
GROUP BY ano_doc,per_doc,sub_tip,num_doc,aplic;

```
