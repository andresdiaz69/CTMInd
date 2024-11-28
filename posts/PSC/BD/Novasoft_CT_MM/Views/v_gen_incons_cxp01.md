# View: v_gen_incons_cxp01

## Usa los objetos:
- [[cxp_afectacion]]
- [[cxp_categinfcon]]
- [[cxp_inf_cxp]]
- [[cxp_param_cnt]]
- [[cxp_provee]]
- [[cxp_sucprov]]
- [[gen_actividad]]
- [[gen_ccosto]]
- [[gen_ciudad]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_retencion]]
- [[gen_subtipodoc]]
- [[gen_sucursal]]

```sql

CREATE VIEW [dbo].[v_gen_incons_cxp01]
AS
SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_pro)+' Proveedor no existe' AS error 
FROM cxp_inf_cxp AS a WITH(NOLOCK) 
	LEFT OUTER JOIN cxp_provee AS p WITH(NOLOCK) ON a.cod_pro=p.provee
WHERE P.provee IS NULL

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_cl1)+' Clasific 1 no existe' AS error 
FROM cxp_inf_cxp AS a WITH(NOLOCK) 
	LEFT OUTER JOIN gen_clasif1 AS b WITH(NOLOCK) ON a.cod_cl1=b.codigo
WHERE b.codigo IS NULL

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_cl2)+' Clasific 2 no existe' AS error 
FROM cxp_inf_cxp AS a WITH(NOLOCK) 
	LEFT OUTER JOIN gen_clasif2 AS b WITH(NOLOCK) ON a.cod_cl2=b.codigo
WHERE b.codigo IS NULL

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_cl3)+' Clasific 3 no existe' AS error 
FROM cxp_inf_cxp AS a WITH(NOLOCK) 
	LEFT OUTER JOIN gen_clasif3 AS b WITH(NOLOCK) ON a.cod_cl3=b.codigo
WHERE b.codigo IS NULL

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(a.cod_cco)+' Ccosto  no existe' AS error 
FROM cxp_inf_cxp AS a WITH(NOLOCK) 
	LEFT OUTER JOIN gen_ccosto AS b WITH(NOLOCK) ON a.cod_cco=b.cod_cco
WHERE b.cod_cco IS NULL

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(a.cod_suc)+' Sucursal  no existe' AS error 
FROM cxp_inf_cxp AS a WITH(NOLOCK) 
	LEFT OUTER JOIN gen_sucursal AS b WITH(NOLOCK) ON a.cod_suc=b.cod_suc
WHERE b.cod_suc IS NULL

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(sub_tip)+' SubTipo documento  no existe' AS error 
FROM cxp_inf_cxp AS a WITH(NOLOCK) 
	LEFT OUTER JOIN gen_subtipodoc AS b WITH(NOLOCK) ON a.sub_tip=b.cod_sub
WHERE b.cod_sub IS NULL

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(a.cod_cat)+' Categoría Contable no existe' AS error 
FROM cxp_inf_cxp AS a WITH(NOLOCK) 
	LEFT OUTER JOIN cxp_categinfcon AS b WITH(NOLOCK) ON a.cod_cat=b.cod_cat
WHERE b.cod_cat IS NULL

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(a.ind_afe)+' Plantilla de Distribución no existe' AS error 
FROM cxp_inf_cxp AS a WITH(NOLOCK) 
	LEFT OUTER JOIN cxp_afectacion AS b WITH(NOLOCK) ON a.ind_afe=b.Cod_afe
WHERE b.Cod_afe IS NULL

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(a.ind_con)+' Plantilla Contable no existe' AS error 
FROM cxp_inf_cxp AS a WITH(NOLOCK) 
	LEFT OUTER JOIN cxp_param_cnt AS b WITH(NOLOCK) ON a.ind_con=b.llave
WHERE b.llave IS NULL

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(a.cod_ciu)+' País-Departamento-Ciudad no existe' AS error 
FROM cxp_inf_cxp AS a WITH(NOLOCK) 
	LEFT OUTER JOIN gen_ciudad AS b WITH(NOLOCK) ON a.cod_pai=b.cod_pai AND a.cod_dep=b.cod_dep AND a.cod_ciu=b.cod_ciu
WHERE b.cod_ciu IS NULL

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(a.tip_ret)+' Tipo de Retención no existe' AS error 
FROM cxp_inf_cxp AS a WITH(NOLOCK) 
	LEFT OUTER JOIN gen_retencion AS p WITH(NOLOCK) ON a.tip_ret=p.cod_ret
WHERE P.cod_ret IS NULL

UNION ALL

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(suc_prov)+' Sucursal proveedor no existe' AS error 
FROM cxp_inf_cxp WITH(NOLOCK)
WHERE RTRIM(cod_pro)+RTRIM(suc_prov) NOT IN 
		(SELECT RTRIM(cod_pro)+RTRIM(suc_pro)
			FROM cxp_sucprov WITH(NOLOCK))

UNION ALL 

SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_ica)+' Código ICA no existe' AS error 
FROM cxp_inf_cxp
WHERE RTRIM(cod_ica) 
		NOT IN (SELECT RTRIM(cod_act) 
				FROM gen_actividad WITH(NOLOCK));

```
