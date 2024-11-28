# View: v_gen_incons_tes01

## Usa los objetos:
- [[cnt_puc]]
- [[cxc_cliente]]
- [[cxp_provee]]
- [[gen_actividad]]
- [[gen_ccosto]]
- [[gen_ciudad]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_monedas]]
- [[gen_retencion]]
- [[gen_subtipodoc]]
- [[gen_sucursal]]
- [[gen_terceros]]
- [[nif_puc]]
- [[tes_bancos]]
- [[tes_flujos]]
- [[tes_inf_tes]]

```sql

CREATE VIEW [dbo].[v_gen_incons_tes01]
AS
SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_cli)+' Cliente no existe' AS error FROM tes_inf_tes
WHERE cod_cli NOT IN (SELECT cod_cli FROM cxc_cliente)
UNION ALL
SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_pro)+' Proveedor no existe' AS error FROM tes_inf_tes
WHERE cod_pro NOT IN (SELECT cod_pro FROM cxp_provee)
UNION ALL
SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_ter)+' Tercero no existe' AS error FROM tes_inf_tes
WHERE cod_ter NOT IN (SELECT ter_nit FROM gen_terceros)
UNION ALL
SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(banco)+' Banco no existe' AS error FROM tes_inf_tes
WHERE banco NOT IN (SELECT bancos FROM tes_bancos)
UNION ALL
SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(ban_dos)+' Banco 2 no existe' AS error FROM tes_inf_tes
WHERE ban_dos NOT IN (SELECT bancos FROM tes_bancos)
UNION ALL
SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_cl1)+' Clasific 1 no existe' AS error FROM tes_inf_tes
WHERE cod_cl1 NOT IN (SELECT codigo FROM gen_clasif1)
UNION ALL
SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_cl2)+' Clasific 2 no existe' AS error FROM tes_inf_tes
WHERE cod_cl2 NOT IN (SELECT codigo FROM gen_clasif2)
UNION ALL
SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_cl3)+' Clasific 3 no existe' AS error FROM tes_inf_tes
WHERE cod_cl3 NOT IN (SELECT codigo FROM gen_clasif3)
UNION ALL
SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_cco)+' Ccosto  no existe' AS error FROM tes_inf_tes
WHERE cod_cco NOT IN (SELECT cod_cco FROM gen_ccosto)
UNION ALL
SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_suc)+' Sucursal  no existe' AS error FROM tes_inf_tes
WHERE cod_suc NOT IN (SELECT cod_suc FROM gen_sucursal)
UNION ALL
SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(sub_tip)+' Tipo documento  no existe' AS error FROM tes_inf_tes
WHERE sub_tip NOT IN (SELECT cod_sub FROM gen_subtipodoc)
UNION ALL
SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cuenta_con)+' Código de cuenta local no existe' AS error FROM tes_inf_tes
WHERE cuenta_con NOT IN (SELECT cod_cta FROM cnt_puc)
UNION ALL
SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_flu)+' Flujo no existe' AS error FROM tes_inf_tes
WHERE cod_flu NOT IN (SELECT cod_flu FROM tes_flujos)
UNION ALL
SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_flu)+' Moneda no existe' AS error FROM tes_inf_tes
WHERE ind_mp NOT IN (SELECT cod_mon FROM gen_monedas)
UNION ALL
SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(a.cod_ciu)+' País-Departamento-Ciudad no existe' AS error 
FROM tes_inf_tes AS a LEFT OUTER JOIN gen_ciudad AS b ON a.cod_pai=b.cod_pai AND a.cod_dep=b.cod_dep AND a.cod_ciu=b.cod_ciu
WHERE b.cod_ciu IS NULL
UNION ALL
SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(a.cod_ret)+' Tipo de Retención no existe' AS error 
FROM tes_inf_tes AS a LEFT OUTER JOIN gen_retencion AS p ON a.cod_ret=p.cod_ret
WHERE P.cod_ret IS NULL
UNION ALL
SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cod_ica)+' Código ICA no existe' AS error FROM tes_inf_tes
WHERE RTRIM(cod_ica) NOT IN (SELECT RTRIM(cod_act) FROM gen_actividad)
UNION ALL
SELECT ano_doc,per_doc,sub_tip,num_doc, reg_doc, RTRIM(cuenta_con_niif)+' Código de cuenta NIIF no existe' AS error FROM tes_inf_tes
WHERE RTRIM(cuenta_con_niif) NOT IN (SELECT RTRIM(cod_cta) FROM nif_puc)

```
