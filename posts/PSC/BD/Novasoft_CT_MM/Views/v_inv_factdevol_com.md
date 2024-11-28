# View: v_inv_factdevol_com

## Usa los objetos:
- [[inv_cuedoc]]
- [[inv_param_cnt]]

```sql

CREATE VIEW [dbo].[v_inv_factdevol_com] AS

SELECT a.ano_doc,a.per_doc,a.sub_tip,a.num_doc,a.reg_doc,a.item,a.cantidad,a.pre_tot,a.cod_conv,
	a.por_adm, a.conv_suc, a.conv_cco, a.conv_cl1, a.conv_cl2, a.conv_cl3, a.conv_cl4, a.conv_cl5, a.conv_cl6, a.conv_cl7, a.conv_cl8,
	a.ind_refac, a.ord_fact, a.num_fact, 
	CASE WHEN par.ind_desp_refac = 0 THEN '110' ELSE '008' END AS tip_doc,
	a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,a.pre_tot AS cos_tot
FROM inv_cuedoc AS a WITH(NOLOCK)
    LEFT JOIN inv_param_cnt AS par ON par.llave = '0'
WHERE a.tip_doc IN ('008','110' )
UNION ALL 
SELECT a.ano_doc,a.per_doc,a.sub_tip,a.num_doc,a.reg_doc,a.item,b.cantidad*-1,b.pre_tot*-1,a.cod_conv,
	a.por_adm, a.conv_suc, a.conv_cco, a.conv_cl1, a.conv_cl2, a.conv_cl3, a.conv_cl4, a.conv_cl5, a.conv_cl6, a.conv_cl7, a.conv_cl8,
	a.ind_refac, a.ord_fact, a.num_fact,
	CASE WHEN par.ind_desp_refac = 0 THEN '110' ELSE '008' END AS tip_doc,
	a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,b.pre_tot*-1
FROM inv_cuedoc AS a WITH(NOLOCK)
	INNER JOIN inv_cuedoc AS b WITH(NOLOCK) ON a.ano_doc=b.ano_ped AND a.per_doc=b.per_ped AND a.sub_tip=b.sub_ped AND a.num_doc=b.pedido AND a.reg_doc=b.reg_ped
	LEFT JOIN inv_param_cnt AS par ON par.llave = '0'
WHERE a.tip_doc IN ('008','110' )
	AND b.tip_doc IN ('005','301')

```
