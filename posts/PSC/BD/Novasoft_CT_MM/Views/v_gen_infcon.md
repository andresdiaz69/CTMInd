# View: v_gen_infcon

## Usa los objetos:
- [[act_inf_con]]
- [[cie_inf_con]]
- [[cnt_inf_con]]
- [[cnt_puc]]
- [[cxc_inf_con]]
- [[cxp_inf_con]]
- [[inv_inf_con]]
- [[nom_inf_con]]
- [[tes_inf_con]]

```sql

CREATE VIEW [dbo].[v_gen_infcon]
AS
SELECT dbo.cxc_inf_con.ano_doc, dbo.cxc_inf_con.per_doc, dbo.cxc_inf_con.sub_tip, dbo.cxc_inf_con.tip_doc, dbo.cxc_inf_con.num_doc, dbo.cxc_inf_con.reg_doc, 
			dbo.cxc_inf_con.fch_doc, dbo.cxc_inf_con.cod_suc, dbo.cxc_inf_con.cod_cco, dbo.cxc_inf_con.cod_cl1, dbo.cxc_inf_con.cod_cl2, 
			dbo.cxc_inf_con.cod_cl3, dbo.cxc_inf_con.cod_cta, dbo.cxc_inf_con.cod_ter, dbo.cxc_inf_con.deb_mov, dbo.cxc_inf_con.cre_mov, 
			dbo.cxc_inf_con.des_mov, dbo.cxc_inf_con.bas_mov, dbo.cxc_inf_con.num_che, dbo.cxc_inf_con.ind_cos, dbo.cxc_inf_con.ind_tra, 
			dbo.cnt_puc.nom_cta, 'cxc' AS aplic, dbo.cxc_inf_con.ind_mr, dbo.cxc_inf_con.fec_tas, dbo.cxc_inf_con.tasa, dbo.cxc_inf_con.usuario, 
			dbo.cxc_inf_con.fec_grab, dbo.cxc_inf_con.ind_tas,CONVERT(BIT,0) AS asig_num, num_concil,difcam_doc AS difcam_doc
FROM dbo.cxc_inf_con WITH(NOLOCK)
	LEFT OUTER JOIN dbo.cnt_puc WITH(NOLOCK) ON dbo.cxc_inf_con.cod_cta = dbo.cnt_puc.cod_cta
WHERE (dbo.cxc_inf_con.ind_tra <> 'X') 
	OR (dbo.cxc_inf_con.ind_tra IS NULL)

UNION ALL

SELECT dbo.cxp_inf_con.ano_doc, dbo.cxp_inf_con.per_doc, dbo.cxp_inf_con.sub_tip, dbo.cxp_inf_con.tip_doc, dbo.cxp_inf_con.num_doc, dbo.cxp_inf_con.reg_doc, 
			dbo.cxp_inf_con.fch_doc, dbo.cxp_inf_con.cod_suc, dbo.cxp_inf_con.cod_cco, dbo.cxp_inf_con.cod_cl1, dbo.cxp_inf_con.cod_cl2, 
			dbo.cxp_inf_con.cod_cl3, dbo.cxp_inf_con.cod_cta, dbo.cxp_inf_con.cod_ter, dbo.cxp_inf_con.deb_mov, dbo.cxp_inf_con.cre_mov, 
			dbo.cxp_inf_con.des_mov, dbo.cxp_inf_con.bas_mov, dbo.cxp_inf_con.num_che, dbo.cxp_inf_con.ind_cos, dbo.cxp_inf_con.ind_tra, 
			cnt_puc_6.nom_cta, 'cxp' AS aplic, dbo.cxp_inf_con.ind_mr, dbo.cxp_inf_con.fec_tas, dbo.cxp_inf_con.tasa, dbo.cxp_inf_con.usuario, 
			dbo.cxp_inf_con.fec_grab, dbo.cxp_inf_con.ind_tas,CONVERT(BIT,0) AS asig_num, num_concil,difcam_doc AS difcam_doc
FROM dbo.cxp_inf_con WITH(NOLOCK) 
	LEFT OUTER JOIN dbo.cnt_puc AS cnt_puc_6 WITH(NOLOCK) ON dbo.cxp_inf_con.cod_cta = cnt_puc_6.cod_cta
WHERE (dbo.cxp_inf_con.ind_tra <> 'X') 
	OR (dbo.cxp_inf_con.ind_tra IS NULL)

UNION ALL

SELECT dbo.inv_inf_con.ano_doc, dbo.inv_inf_con.per_doc, dbo.inv_inf_con.sub_tip, dbo.inv_inf_con.tip_doc, dbo.inv_inf_con.num_doc, dbo.inv_inf_con.reg_doc, 
			dbo.inv_inf_con.fch_doc, dbo.inv_inf_con.cod_suc, dbo.inv_inf_con.cod_cco, dbo.inv_inf_con.cod_cl1, dbo.inv_inf_con.cod_cl2, 
			dbo.inv_inf_con.cod_cl3, dbo.inv_inf_con.cod_cta, dbo.inv_inf_con.cod_ter, dbo.inv_inf_con.deb_mov, dbo.inv_inf_con.cre_mov, 
			dbo.inv_inf_con.des_mov, dbo.inv_inf_con.bas_mov, dbo.inv_inf_con.num_che, dbo.inv_inf_con.ind_cos, dbo.inv_inf_con.ind_tra, cnt_puc_5.nom_cta, 
			'inv' AS aplic, dbo.inv_inf_con.ind_mr, dbo.inv_inf_con.fec_tas, dbo.inv_inf_con.tasa, dbo.inv_inf_con.usuario, dbo.inv_inf_con.fec_grab, 
			dbo.inv_inf_con.ind_tas,CONVERT(BIT,0) AS asig_num, num_concil,0 AS difcam_doc
FROM dbo.inv_inf_con WITH(NOLOCK) 
	LEFT OUTER JOIN dbo.cnt_puc AS cnt_puc_5 WITH(NOLOCK) ON dbo.inv_inf_con.cod_cta = cnt_puc_5.cod_cta
WHERE (dbo.inv_inf_con.ind_tra <> 'X') 
	OR (dbo.inv_inf_con.ind_tra IS NULL)

UNION ALL

SELECT dbo.tes_inf_con.ano_doc, dbo.tes_inf_con.per_doc, dbo.tes_inf_con.sub_tip, dbo.tes_inf_con.tip_doc, dbo.tes_inf_con.num_doc, dbo.tes_inf_con.reg_doc, 
			dbo.tes_inf_con.fch_doc, dbo.tes_inf_con.cod_suc, dbo.tes_inf_con.cod_cco, dbo.tes_inf_con.cod_cl1, dbo.tes_inf_con.cod_cl2, 
			dbo.tes_inf_con.cod_cl3, dbo.tes_inf_con.cod_cta, dbo.tes_inf_con.cod_ter, dbo.tes_inf_con.deb_mov, dbo.tes_inf_con.cre_mov, 
			dbo.tes_inf_con.des_mov, dbo.tes_inf_con.bas_mov, dbo.tes_inf_con.num_che, '0' AS ind_cos, dbo.tes_inf_con.ind_tra, cnt_puc_4.nom_cta, 
			'tes' AS aplic, dbo.tes_inf_con.ind_mr, dbo.tes_inf_con.fec_tas, dbo.tes_inf_con.tasa, dbo.tes_inf_con.usuario, dbo.tes_inf_con.fec_grab, 
			dbo.tes_inf_con.ind_tas,CONVERT(BIT,0) AS asig_num,num_concil,difcam_doc AS difcam_doc
FROM dbo.tes_inf_con WITH(NOLOCK) 
	LEFT OUTER JOIN dbo.cnt_puc AS cnt_puc_4 WITH(NOLOCK) ON dbo.tes_inf_con.cod_cta = cnt_puc_4.cod_cta
WHERE (dbo.tes_inf_con.ind_tra <> 'X') 
	OR (dbo.tes_inf_con.ind_tra IS NULL)

UNION ALL

SELECT dbo.cnt_inf_con.ano_doc, dbo.cnt_inf_con.per_doc, dbo.cnt_inf_con.sub_tip, dbo.cnt_inf_con.tip_doc, dbo.cnt_inf_con.num_doc, dbo.cnt_inf_con.reg_doc, 
			dbo.cnt_inf_con.fch_doc, dbo.cnt_inf_con.cod_suc, dbo.cnt_inf_con.cod_cco, dbo.cnt_inf_con.cod_cl1, dbo.cnt_inf_con.cod_cl2, 
			dbo.cnt_inf_con.cod_cl3, dbo.cnt_inf_con.cod_cta, dbo.cnt_inf_con.cod_ter, dbo.cnt_inf_con.deb_mov, dbo.cnt_inf_con.cre_mov, 
			dbo.cnt_inf_con.des_mov, dbo.cnt_inf_con.bas_mov, dbo.cnt_inf_con.num_che, '0' AS ind_cos, dbo.cnt_inf_con.ind_tra, cnt_puc_3.nom_cta, 
			'cnt' AS aplic, dbo.cnt_inf_con.ind_mr, dbo.cnt_inf_con.fec_tas, dbo.cnt_inf_con.tasa, dbo.cnt_inf_con.usuario, dbo.cnt_inf_con.fec_grab, 
			dbo.cnt_inf_con.ind_tas,asig_num,num_concil,0 AS difcam_doc
FROM dbo.cnt_inf_con WITH(NOLOCK) 
	LEFT OUTER JOIN dbo.cnt_puc AS cnt_puc_3 WITH(NOLOCK) ON dbo.cnt_inf_con.cod_cta = cnt_puc_3.cod_cta
WHERE (dbo.cnt_inf_con.ind_tra <> 'X') 
	OR (dbo.cnt_inf_con.ind_tra IS NULL)

UNION ALL

SELECT dbo.nom_inf_con.ano_doc, dbo.nom_inf_con.per_doc, dbo.nom_inf_con.sub_tip, dbo.nom_inf_con.tip_doc, dbo.nom_inf_con.num_doc, dbo.nom_inf_con.reg_doc, 
            dbo.nom_inf_con.fch_doc, dbo.nom_inf_con.cod_suc, dbo.nom_inf_con.cod_cco, dbo.nom_inf_con.cod_cl1, dbo.nom_inf_con.cod_cl2, 
            dbo.nom_inf_con.cod_cl3, dbo.nom_inf_con.cod_cta, dbo.nom_inf_con.cod_ter, dbo.nom_inf_con.deb_mov, dbo.nom_inf_con.cre_mov, 
            dbo.nom_inf_con.des_mov, dbo.nom_inf_con.bas_mov, dbo.nom_inf_con.num_che, '0' AS ind_cos, dbo.nom_inf_con.ind_tra, cnt_puc_2.nom_cta, 
            'nom' AS aplic, dbo.nom_inf_con.ind_mr, dbo.nom_inf_con.fec_tas, dbo.nom_inf_con.tasa, dbo.nom_inf_con.usuario, dbo.nom_inf_con.fec_grab, 
            dbo.nom_inf_con.ind_tas,CONVERT(BIT,0) AS asig_num,'' AS num_concil,0 AS difcam_doc
FROM dbo.nom_inf_con WITH(NOLOCK) 
	LEFT OUTER JOIN dbo.cnt_puc AS cnt_puc_2 WITH(NOLOCK) ON dbo.nom_inf_con.cod_cta = cnt_puc_2.cod_cta
WHERE (dbo.nom_inf_con.ind_tra <> 'X') 
	OR (dbo.nom_inf_con.ind_tra IS NULL)

UNION ALL

SELECT dbo.act_inf_con.ano_doc, dbo.act_inf_con.per_doc, dbo.act_inf_con.sub_tip, dbo.act_inf_con.tip_doc, dbo.act_inf_con.num_doc, dbo.act_inf_con.reg_doc, 
            dbo.act_inf_con.fch_doc, dbo.act_inf_con.cod_suc, dbo.act_inf_con.cod_cco, dbo.act_inf_con.cod_cl1, dbo.act_inf_con.cod_cl2, 
            dbo.act_inf_con.cod_cl3, dbo.act_inf_con.cod_cta, dbo.act_inf_con.cod_ter, dbo.act_inf_con.deb_mov, dbo.act_inf_con.cre_mov, 
            dbo.act_inf_con.des_mov, dbo.act_inf_con.bas_mov, dbo.act_inf_con.num_che, '0' AS ind_cos, dbo.act_inf_con.ind_tra, cnt_puc_1.nom_cta, 
            'act' AS aplic, dbo.act_inf_con.ind_mr, dbo.act_inf_con.fec_tas, dbo.act_inf_con.tasa, dbo.act_inf_con.usuario, dbo.act_inf_con.fec_grab, 
            dbo.act_inf_con.ind_tas,CONVERT(BIT,0) AS asig_num, num_concil,0 AS difcam_doc
FROM dbo.act_inf_con WITH(NOLOCK) 
	LEFT OUTER JOIN dbo.cnt_puc AS cnt_puc_1 WITH(NOLOCK) ON dbo.act_inf_con.cod_cta = cnt_puc_1.cod_cta
WHERE (dbo.act_inf_con.ind_tra <> 'X') 
	OR (dbo.act_inf_con.ind_tra IS NULL)

UNION ALL

SELECT dbo.cie_inf_con.ano_doc, dbo.cie_inf_con.per_doc, dbo.cie_inf_con.sub_tip, dbo.cie_inf_con.tip_doc, dbo.cie_inf_con.num_doc, dbo.cie_inf_con.reg_doc, 
            dbo.cie_inf_con.fch_doc, dbo.cie_inf_con.cod_suc, dbo.cie_inf_con.cod_cco, dbo.cie_inf_con.cod_cl1, dbo.cie_inf_con.cod_cl2, 
            dbo.cie_inf_con.cod_cl3, dbo.cie_inf_con.cod_cta, dbo.cie_inf_con.cod_ter, dbo.cie_inf_con.deb_mov, dbo.cie_inf_con.cre_mov, 
            dbo.cie_inf_con.des_mov, dbo.cie_inf_con.bas_mov, dbo.cie_inf_con.num_che, dbo.cie_inf_con.ind_cos, dbo.cie_inf_con.ind_tra, 
            cnt_puc_7.nom_cta, 'cie' AS aplic, dbo.cie_inf_con.ind_mr, dbo.cie_inf_con.fec_tas, dbo.cie_inf_con.tasa, dbo.cie_inf_con.usuario, 
            dbo.cie_inf_con.fec_grab, dbo.cie_inf_con.ind_tas,CONVERT(BIT,0) AS asig_num, num_concil,0 AS difcam_doc
FROM dbo.cie_inf_con WITH(NOLOCK) 
	LEFT OUTER JOIN dbo.cnt_puc AS cnt_puc_7 WITH(NOLOCK) ON dbo.cie_inf_con.cod_cta = cnt_puc_7.cod_cta
WHERE (dbo.cie_inf_con.ind_tra <> 'X') 
	OR (dbo.cie_inf_con.ind_tra IS NULL);

```
