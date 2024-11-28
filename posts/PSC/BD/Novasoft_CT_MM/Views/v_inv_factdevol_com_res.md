# View: v_inv_factdevol_com_res

## Usa los objetos:
- [[v_inv_factdevol_com]]

```sql

CREATE VIEW [dbo].[v_inv_factdevol_com_res] 
AS 

SELECT ano_doc,per_doc,sub_tip,num_doc,reg_doc,item,
			1 AS cantidad,SUM(pre_tot) AS pre_tot,cod_conv,por_adm,conv_suc,conv_cco,conv_cl1,conv_cl2,conv_cl3,conv_cl4,conv_cl5,conv_cl6,conv_cl7,conv_cl8,
			ind_refac,ord_fact,num_fact,tip_doc,cod_cco,cod_cl1,cod_cl2,cod_cl3,SUM(cos_tot) AS cos_tot
FROM v_inv_factdevol_com WITH(NOLOCK)
GROUP BY ano_doc,per_doc,sub_tip,num_doc,reg_doc,item,
	cod_conv,por_adm,conv_suc,conv_cco,conv_cl1,conv_cl2,conv_cl3,conv_cl4,conv_cl5,conv_cl6,conv_cl7,conv_cl8,ind_refac,ord_fact,num_fact,
	tip_doc,cod_cco,cod_cl1,cod_cl2,cod_cl3

```
