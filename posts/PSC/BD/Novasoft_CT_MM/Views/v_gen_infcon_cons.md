# View: v_gen_infcon_cons

## Usa los objetos:
- [[act_inf_con]]
- [[cnt_inf_con]]
- [[cnt_puc]]
- [[cxc_inf_con]]
- [[cxp_inf_con]]
- [[inv_inf_con]]
- [[nom_inf_con]]
- [[tes_inf_con]]

```sql

-- SE AGREGA A LA CONSULTA DE DOCUMENTOS DE TESORERIA EL NUMERO DE CONCILIACION
-- JSARMIENTO MARZO/2013 SRS:2013-0332
CREATE VIEW [dbo].[v_gen_infcon_cons]
AS
SELECT cxc_inf_con.ano_doc,cxc_inf_con.per_doc,cxc_inf_con.sub_tip,cxc_inf_con.tip_doc,cxc_inf_con.num_doc,
cxc_inf_con.reg_doc,cxc_inf_con.fch_doc,cxc_inf_con.cod_suc,cxc_inf_con.cod_cco,cxc_inf_con.cod_cl1,cxc_inf_con.cod_cl2,
cxc_inf_con.cod_cl3,cxc_inf_con.cod_cta,cxc_inf_con.cod_ter,cxc_inf_con.deb_mov,cxc_inf_con.cre_mov,
cxc_inf_con.des_mov,cxc_inf_con.bas_mov,cxc_inf_con.num_che,cxc_inf_con.ind_cos,cxc_inf_con.ind_tra,
cnt_puc.nom_cta,'cxc' AS aplic,cxc_inf_con.ind_mr,cxc_inf_con.fec_tas,cxc_inf_con.tasa,cxc_inf_con.usuario,
cxc_inf_con.fec_grab,cxc_inf_con.ind_tas,ISNULL(cnt_puc.ind_cco,0) AS ind_cco,ISNULL(cnt_puc.ind_bas,0) AS ind_bas,
ISNULL(cnt_puc.ind_ter,0) AS ind_ter,ISNULL(cnt_puc.ind_cl1,0) AS ind_cl1,ISNULL(cnt_puc.ind_cl2,0) AS ind_cl2,
ISNULL(cnt_puc.ind_cl3,0) AS ind_cl3,ISNULL(tip_cta,0) AS tip_cta,'' AS num_concil
FROM cxc_inf_con LEFT OUTER JOIN cnt_puc ON cxc_inf_con.cod_cta = cnt_puc.cod_cta
WHERE (cxc_inf_con.ind_tra <> 'X') OR (cxc_inf_con.ind_tra IS NULL)
UNION ALL 
SELECT cxp_inf_con.ano_doc,cxp_inf_con.per_doc,cxp_inf_con.sub_tip,cxp_inf_con.tip_doc,cxp_inf_con.num_doc,
cxp_inf_con.reg_doc,cxp_inf_con.fch_doc,cxp_inf_con.cod_suc,cxp_inf_con.cod_cco,cxp_inf_con.cod_cl1,cxp_inf_con.cod_cl2,
cxp_inf_con.cod_cl3,cxp_inf_con.cod_cta,cxp_inf_con.cod_ter,cxp_inf_con.deb_mov,cxp_inf_con.cre_mov,
cxp_inf_con.des_mov,cxp_inf_con.bas_mov,cxp_inf_con.num_che,cxp_inf_con.ind_cos,cxp_inf_con.ind_tra,
cnt_puc.nom_cta,'cxp' AS aplic,cxp_inf_con.ind_mr,cxp_inf_con.fec_tas,cxp_inf_con.tasa,cxp_inf_con.usuario,
cxp_inf_con.fec_grab,cxp_inf_con.ind_tas,ISNULL(cnt_puc.ind_cco,0) AS ind_cco,ISNULL(cnt_puc.ind_bas,0) AS ind_bas,
ISNULL(cnt_puc.ind_ter,0) AS ind_ter,ISNULL(cnt_puc.ind_cl1,0) AS ind_cl1,ISNULL(cnt_puc.ind_cl2,0) AS ind_cl2,
ISNULL(cnt_puc.ind_cl3,0) AS ind_cl3,ISNULL(tip_cta,0) AS tip_cta,'' AS num_concil
FROM cxp_inf_con LEFT OUTER JOIN cnt_puc ON cxp_inf_con.cod_cta = cnt_puc.cod_cta
WHERE (cxp_inf_con.ind_tra <> 'X') OR (cxp_inf_con.ind_tra IS NULL)
UNION ALL 
SELECT inv_inf_con.ano_doc,inv_inf_con.per_doc,inv_inf_con.sub_tip,inv_inf_con.tip_doc,inv_inf_con.num_doc,
inv_inf_con.reg_doc,inv_inf_con.fch_doc,inv_inf_con.cod_suc,inv_inf_con.cod_cco,inv_inf_con.cod_cl1,inv_inf_con.cod_cl2,
inv_inf_con.cod_cl3,inv_inf_con.cod_cta,inv_inf_con.cod_ter,inv_inf_con.deb_mov,inv_inf_con.cre_mov,
inv_inf_con.des_mov,inv_inf_con.bas_mov,inv_inf_con.num_che,inv_inf_con.ind_cos,inv_inf_con.ind_tra,
cnt_puc.nom_cta,'inv' AS aplic,inv_inf_con.ind_mr,inv_inf_con.fec_tas,inv_inf_con.tasa,inv_inf_con.usuario,
inv_inf_con.fec_grab,inv_inf_con.ind_tas,ISNULL(cnt_puc.ind_cco,0) AS ind_cco,ISNULL(cnt_puc.ind_bas,0) AS ind_bas,
ISNULL(cnt_puc.ind_ter,0) AS ind_ter,ISNULL(cnt_puc.ind_cl1,0) AS ind_cl1,ISNULL(cnt_puc.ind_cl2,0) AS ind_cl2,
ISNULL(cnt_puc.ind_cl3,0) AS ind_cl3,ISNULL(tip_cta,0) AS tip_cta,'' AS num_concil
FROM inv_inf_con LEFT OUTER JOIN cnt_puc ON inv_inf_con.cod_cta = cnt_puc.cod_cta
WHERE (inv_inf_con.ind_tra <> 'X') OR (inv_inf_con.ind_tra IS NULL)
UNION ALL 
SELECT tes_inf_con.ano_doc,tes_inf_con.per_doc,tes_inf_con.sub_tip,tes_inf_con.tip_doc,tes_inf_con.num_doc,tes_inf_con.reg_doc,
tes_inf_con.fch_doc,tes_inf_con.cod_suc,tes_inf_con.cod_cco,tes_inf_con.cod_cl1,tes_inf_con.cod_cl2,
tes_inf_con.cod_cl3,tes_inf_con.cod_cta,tes_inf_con.cod_ter,tes_inf_con.deb_mov,tes_inf_con.cre_mov,
tes_inf_con.des_mov,tes_inf_con.bas_mov,tes_inf_con.num_che,'0' AS ind_cos,tes_inf_con.ind_tra,
cnt_puc.nom_cta,'tes' AS aplic,tes_inf_con.ind_mr,tes_inf_con.fec_tas,tes_inf_con.tasa,tes_inf_con.usuario,
tes_inf_con.fec_grab,tes_inf_con.ind_tas,ISNULL(cnt_puc.ind_cco,0) AS ind_cco,ISNULL(cnt_puc.ind_bas,0) AS ind_bas,
ISNULL(cnt_puc.ind_ter,0) AS ind_ter,ISNULL(cnt_puc.ind_cl1,0) AS ind_cl1,ISNULL(cnt_puc.ind_cl2,0) AS ind_cl2,
ISNULL(cnt_puc.ind_cl3,0) AS ind_cl3,ISNULL(tip_cta,0) AS tip_cta,num_concil
FROM tes_inf_con LEFT OUTER JOIN cnt_puc ON tes_inf_con.cod_cta = cnt_puc.cod_cta
WHERE (tes_inf_con.ind_tra <> 'X') OR (tes_inf_con.ind_tra IS NULL)
UNION ALL
SELECT cnt_inf_con.ano_doc,cnt_inf_con.per_doc,cnt_inf_con.sub_tip,cnt_inf_con.tip_doc,cnt_inf_con.num_doc,cnt_inf_con.reg_doc,
cnt_inf_con.fch_doc,cnt_inf_con.cod_suc,cnt_inf_con.cod_cco,cnt_inf_con.cod_cl1,cnt_inf_con.cod_cl2,
cnt_inf_con.cod_cl3,cnt_inf_con.cod_cta,cnt_inf_con.cod_ter,cnt_inf_con.deb_mov,cnt_inf_con.cre_mov,
cnt_inf_con.des_mov,cnt_inf_con.bas_mov,cnt_inf_con.num_che,'0' AS ind_cos,cnt_inf_con.ind_tra,
cnt_puc.nom_cta,'cnt' AS aplic,cnt_inf_con.ind_mr,cnt_inf_con.fec_tas,cnt_inf_con.tasa,cnt_inf_con.usuario,
cnt_inf_con.fec_grab,cnt_inf_con.ind_tas,ISNULL(cnt_puc.ind_cco,0) AS ind_cco,ISNULL(cnt_puc.ind_bas,0) AS ind_bas,
ISNULL(cnt_puc.ind_ter,0) AS ind_ter,ISNULL(cnt_puc.ind_cl1,0) AS ind_cl1,ISNULL(cnt_puc.ind_cl2,0) AS ind_cl2,
ISNULL(cnt_puc.ind_cl3,0) AS ind_cl3,ISNULL(tip_cta,0) AS tip_cta,num_concil
FROM cnt_inf_con LEFT OUTER JOIN cnt_puc ON cnt_inf_con.cod_cta = cnt_puc.cod_cta
WHERE (cnt_inf_con.ind_tra <> 'X') OR (cnt_inf_con.ind_tra IS NULL)
UNION ALL
SELECT nom_inf_con.ano_doc,nom_inf_con.per_doc,nom_inf_con.sub_tip,nom_inf_con.tip_doc,nom_inf_con.num_doc,nom_inf_con.reg_doc,
nom_inf_con.fch_doc,nom_inf_con.cod_suc,nom_inf_con.cod_cco,nom_inf_con.cod_cl1,nom_inf_con.cod_cl2,
nom_inf_con.cod_cl3,nom_inf_con.cod_cta,nom_inf_con.cod_ter,nom_inf_con.deb_mov,nom_inf_con.cre_mov,
nom_inf_con.des_mov,nom_inf_con.bas_mov,nom_inf_con.num_che,'0' AS ind_cos,nom_inf_con.ind_tra,
cnt_puc.nom_cta,'nom' AS aplic,nom_inf_con.ind_mr,nom_inf_con.fec_tas,nom_inf_con.tasa,nom_inf_con.usuario,
nom_inf_con.fec_grab,nom_inf_con.ind_tas,ISNULL(cnt_puc.ind_cco,0) AS ind_cco,ISNULL(cnt_puc.ind_bas,0) AS ind_bas,
ISNULL(cnt_puc.ind_ter,0) AS ind_ter,ISNULL(cnt_puc.ind_cl1,0) AS ind_cl1,ISNULL(cnt_puc.ind_cl2,0) AS ind_cl2,
ISNULL(cnt_puc.ind_cl3,0) AS ind_cl3,ISNULL(tip_cta,0) AS tip_cta,'' AS num_concil
FROM nom_inf_con LEFT OUTER JOIN cnt_puc ON nom_inf_con.cod_cta = cnt_puc.cod_cta
WHERE (nom_inf_con.ind_tra <> 'X') OR (nom_inf_con.ind_tra IS NULL)
UNION ALL
SELECT act_inf_con.ano_doc,act_inf_con.per_doc,act_inf_con.sub_tip,act_inf_con.tip_doc,act_inf_con.num_doc,act_inf_con.reg_doc,
act_inf_con.fch_doc,act_inf_con.cod_suc,act_inf_con.cod_cco,act_inf_con.cod_cl1,act_inf_con.cod_cl2,
act_inf_con.cod_cl3,act_inf_con.cod_cta,act_inf_con.cod_ter,act_inf_con.deb_mov,act_inf_con.cre_mov,
act_inf_con.des_mov,act_inf_con.bas_mov,act_inf_con.num_che,'0' AS ind_cos,act_inf_con.ind_tra,
cnt_puc.nom_cta,'act' AS aplic,act_inf_con.ind_mr,act_inf_con.fec_tas,act_inf_con.tasa,act_inf_con.usuario,
act_inf_con.fec_grab,act_inf_con.ind_tas,ISNULL(cnt_puc.ind_cco,0) AS ind_cco,ISNULL(cnt_puc.ind_bas,0) AS ind_bas,
ISNULL(cnt_puc.ind_ter,0) AS ind_ter,ISNULL(cnt_puc.ind_cl1,0) AS ind_cl1,ISNULL(cnt_puc.ind_cl2,0) AS ind_cl2,
ISNULL(cnt_puc.ind_cl3,0) AS ind_cl3,ISNULL(tip_cta,0) AS tip_cta,'' AS num_concil
FROM act_inf_con LEFT OUTER JOIN cnt_puc ON act_inf_con.cod_cta = cnt_puc.cod_cta
WHERE (act_inf_con.ind_tra <> 'X') OR (act_inf_con.ind_tra IS NULL)


```
