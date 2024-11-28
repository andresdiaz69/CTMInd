# View: v_gen_incons_cxc01

## Usa los objetos:
- [[cxc_categinfcon]]
- [[cxc_cliente]]
- [[cxc_inf_cxc]]
- [[cxc_param_cnt]]
- [[cxc_succli]]
- [[gen_actividad]]
- [[gen_ccosto]]
- [[gen_ciudad]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_deptos]]
- [[gen_monedas]]
- [[gen_paises]]
- [[gen_retencion]]
- [[gen_subtipodoc]]
- [[gen_sucursal]]

```sql

CREATE VIEW [dbo].[v_gen_incons_cxc01]
AS
SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_cli)+' Cliente no existe' AS error 
FROM cxc_inf_cxc WITH(NOLOCK)
WHERE cod_cli NOT IN (SELECT cod_cli 
						FROM cxc_cliente WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_cl1)+' Clasific 1 no existe' AS error 
FROM cxc_inf_cxc WITH(NOLOCK)
WHERE cod_cl1 NOT IN (SELECT codigo 
						FROM gen_clasif1 WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_cl2)+' Clasific 2 no existe' AS error 
FROM cxc_inf_cxc  WITH(NOLOCK)
WHERE cod_cl2 NOT IN (SELECT codigo 
						FROM gen_clasif2 WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_cl3)+' Clasific 3 no existe' AS error 
FROM cxc_inf_cxc WITH(NOLOCK)
WHERE cod_cl3 NOT IN (SELECT codigo 
						FROM gen_clasif3 WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_cco)+' Ccosto  no existe' AS error 
FROM cxc_inf_cxc WITH(NOLOCK)
WHERE cod_cco NOT IN (SELECT cod_cco 
						FROM gen_ccosto WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_suc)+' Sucursal  no existe' AS error 
FROM cxc_inf_cxc WITH(NOLOCK)
WHERE cod_suc NOT IN (SELECT cod_suc 
						FROM gen_sucursal WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(sub_tip)+' Tipo documento  no existe' AS error 
FROM cxc_inf_cxc WITH(NOLOCK)
WHERE sub_tip NOT IN (SELECT cod_sub 
						FROM gen_subtipodoc WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_cat)+' Categoría no existe' AS error 
FROM cxc_inf_cxc WITH(NOLOCK)
WHERE cod_cat NOT IN (SELECT cod_cat 
						FROM cxc_categinfcon WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(ind_con)+' Indicador contable no existe' AS error 
FROM cxc_inf_cxc WITH(NOLOCK)
WHERE ind_con NOT IN (SELECT llave 
						FROM cxc_param_cnt WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(ind_mp)+' Tipo moneda no existe' AS error 
FROM cxc_inf_cxc WITH(NOLOCK)
WHERE ind_mp NOT IN (SELECT cod_mon 
						FROM gen_monedas WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_pai)+' Código país no existe' AS error 
FROM cxc_inf_cxc WITH(NOLOCK)
WHERE cod_pai NOT IN (SELECT cod_pai 
						FROM gen_paises WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_dep)+' Código departamento no existe' AS error 
FROM cxc_inf_cxc WITH(NOLOCK)
WHERE cod_pai+cod_dep NOT IN (SELECT cod_pai+cod_dep 
								FROM gen_deptos WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_ciu)+' Código ciudad no existe' AS error 
FROM cxc_inf_cxc WITH(NOLOCK)
WHERE cod_pai+cod_dep+cod_ciu NOT IN (SELECT cod_pai+cod_dep+cod_ciu 
										FROM gen_ciudad WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(suc_cli)+' Sucursal cliente no existe' AS error 
FROM cxc_inf_cxc WITH(NOLOCK)
WHERE RTRIM(cod_cli)+RTRIM(suc_cli) NOT IN (SELECT RTRIM(cod_cli)+RTRIM(suc_cli) 
												FROM cxc_succli WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_ica)+' Código ICA no existe' AS error 
FROM cxc_inf_cxc WITH(NOLOCK)
WHERE RTRIM(cod_ica) NOT IN (SELECT RTRIM(cod_act) 
								FROM gen_actividad WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc,reg_doc,RTRIM(cod_ret)+' Código Retención en la fuente no existe' AS error 
FROM cxc_inf_cxc WITH(NOLOCK)
WHERE cod_ret NOT IN (SELECT cod_ret 
						FROM gen_retencion WITH(NOLOCK));

```
