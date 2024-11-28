# View: v_gen_infnif

## Usa los objetos:
- [[cie_inf_nif]]
- [[cxc_inf_nif]]
- [[cxp_inf_nif]]
- [[inv_inf_nif]]
- [[nif_inf_con]]
- [[nif_puc]]
- [[nom_inf_coniif]]
- [[ppe_inf_con]]
- [[tes_inf_nif]]

```sql

/*AYVEGA DICIEMBRE/2018 SNR2019-0088 SE AGREGA TABLA CONTABILIZACION NIIF DE CARTERA DE COLEGIOS*/
CREATE VIEW [dbo].[v_gen_infnif]
AS
SELECT dbo.nif_inf_con.ano_doc, dbo.nif_inf_con.per_doc, dbo.nif_inf_con.tip_doc, dbo.nif_inf_con.sub_tip, dbo.nif_inf_con.num_doc, dbo.nif_inf_con.reg_doc, 
			dbo.nif_inf_con.fch_doc, dbo.nif_inf_con.cod_suc, dbo.nif_inf_con.cod_cco, dbo.nif_inf_con.cod_cl1, dbo.nif_inf_con.cod_cl2, 
			dbo.nif_inf_con.cod_cl3, dbo.nif_inf_con.cod_cta, dbo.nif_inf_con.cod_ter, dbo.nif_inf_con.deb_mov, dbo.nif_inf_con.cre_mov, 
			dbo.nif_inf_con.des_mov, dbo.nif_inf_con.bas_mov, dbo.nif_inf_con.num_che, dbo.nif_inf_con.ind_cos, dbo.nif_inf_con.ind_tra, 
			dbo.nif_puc.nom_cta, 'nif' AS aplic, dbo.nif_inf_con.ind_mr, dbo.nif_inf_con.fec_tas, dbo.nif_inf_con.tasa, dbo.nif_inf_con.usuario, 
			dbo.nif_inf_con.fec_grab, dbo.nif_inf_con.ind_tas, asig_num,dbo.nif_inf_con.num_concil,0 AS difcam_doc
FROM dbo.nif_inf_con WITH(NOLOCK)
	LEFT OUTER JOIN dbo.nif_puc WITH(NOLOCK) ON dbo.nif_inf_con.cod_cta = dbo.nif_puc.cod_cta
WHERE (dbo.nif_inf_con.ind_tra <> 'X') 
	OR (dbo.nif_inf_con.ind_tra IS NULL)

UNION ALL

SELECT dbo.cxc_inf_nif.ano_doc, dbo.cxc_inf_nif.per_doc, dbo.cxc_inf_nif.tip_doc, dbo.cxc_inf_nif.sub_tip, dbo.cxc_inf_nif.num_doc, dbo.cxc_inf_nif.reg_doc, 
            dbo.cxc_inf_nif.fch_doc, dbo.cxc_inf_nif.cod_suc, dbo.cxc_inf_nif.cod_cco, dbo.cxc_inf_nif.cod_cl1, dbo.cxc_inf_nif.cod_cl2, 
            dbo.cxc_inf_nif.cod_cl3, dbo.cxc_inf_nif.cod_cta, dbo.cxc_inf_nif.cod_ter, dbo.cxc_inf_nif.deb_mov, dbo.cxc_inf_nif.cre_mov, 
            dbo.cxc_inf_nif.des_mov, dbo.cxc_inf_nif.bas_mov, dbo.cxc_inf_nif.num_che, dbo.cxc_inf_nif.ind_cos, dbo.cxc_inf_nif.ind_tra, 
            dbo.nif_puc.nom_cta, 'cxc' AS aplic, dbo.cxc_inf_nif.ind_mr, dbo.cxc_inf_nif.fec_tas, dbo.cxc_inf_nif.tasa, dbo.cxc_inf_nif.usuario, 
            dbo.cxc_inf_nif.fec_grab, dbo.cxc_inf_nif.ind_tas, CONVERT(BIT,0) AS asig_num,dbo.cxc_inf_nif.num_concil,difcam_doc AS difcam_doc
FROM dbo.cxc_inf_nif WITH(NOLOCK) 
	LEFT OUTER JOIN dbo.nif_puc WITH(NOLOCK) ON dbo.cxc_inf_nif.cod_cta = dbo.nif_puc.cod_cta
WHERE (dbo.cxc_inf_nif.ind_tra <> 'X') 
	OR (dbo.cxc_inf_nif.ind_tra IS NULL)

UNION ALL

SELECT dbo.cxp_inf_nif.ano_doc, dbo.cxp_inf_nif.per_doc, dbo.cxp_inf_nif.tip_doc, dbo.cxp_inf_nif.sub_tip, dbo.cxp_inf_nif.num_doc, dbo.cxp_inf_nif.reg_doc, 
            dbo.cxp_inf_nif.fch_doc, dbo.cxp_inf_nif.cod_suc, dbo.cxp_inf_nif.cod_cco, dbo.cxp_inf_nif.cod_cl1, dbo.cxp_inf_nif.cod_cl2, 
            dbo.cxp_inf_nif.cod_cl3, dbo.cxp_inf_nif.cod_cta, dbo.cxp_inf_nif.cod_ter, dbo.cxp_inf_nif.deb_mov, dbo.cxp_inf_nif.cre_mov, 
            dbo.cxp_inf_nif.des_mov, dbo.cxp_inf_nif.bas_mov, dbo.cxp_inf_nif.num_che, dbo.cxp_inf_nif.ind_cos, dbo.cxp_inf_nif.ind_tra, 
            cnt_puc_6.nom_cta, 'cxp' AS aplic, dbo.cxp_inf_nif.ind_mr, dbo.cxp_inf_nif.fec_tas, dbo.cxp_inf_nif.tasa, dbo.cxp_inf_nif.usuario, 
            dbo.cxp_inf_nif.fec_grab, dbo.cxp_inf_nif.ind_tas, CONVERT(BIT,0) AS asig_num,dbo.cxp_inf_nif.num_concil,difcam_doc AS difcam_doc
FROM dbo.cxp_inf_nif WITH(NOLOCK) 
	LEFT OUTER JOIN dbo.nif_puc AS cnt_puc_6 WITH(NOLOCK) ON dbo.cxp_inf_nif.cod_cta = cnt_puc_6.cod_cta
WHERE (dbo.cxp_inf_nif.ind_tra <> 'X') 
	OR (dbo.cxp_inf_nif.ind_tra IS NULL)

UNION ALL

SELECT dbo.inv_inf_nif.ano_doc, dbo.inv_inf_nif.per_doc, dbo.inv_inf_nif.tip_doc, dbo.inv_inf_nif.sub_tip, dbo.inv_inf_nif.num_doc, dbo.inv_inf_nif.reg_doc, 
			dbo.inv_inf_nif.fch_doc, dbo.inv_inf_nif.cod_suc, dbo.inv_inf_nif.cod_cco, dbo.inv_inf_nif.cod_cl1, dbo.inv_inf_nif.cod_cl2, 
			dbo.inv_inf_nif.cod_cl3, dbo.inv_inf_nif.cod_cta, dbo.inv_inf_nif.cod_ter, dbo.inv_inf_nif.deb_mov, dbo.inv_inf_nif.cre_mov, 
			dbo.inv_inf_nif.des_mov, dbo.inv_inf_nif.bas_mov, dbo.inv_inf_nif.num_che, dbo.inv_inf_nif.ind_cos, dbo.inv_inf_nif.ind_tra, cnt_puc_5.nom_cta, 
			'inv' AS aplic, dbo.inv_inf_nif.ind_mr, dbo.inv_inf_nif.fec_tas, dbo.inv_inf_nif.tasa, dbo.inv_inf_nif.usuario, dbo.inv_inf_nif.fec_grab, 
			dbo.inv_inf_nif.ind_tas, CONVERT(BIT,0) AS asig_num, dbo.inv_inf_nif.num_concil,0 AS difcam_doc
FROM dbo.inv_inf_nif WITH(NOLOCK) 
	LEFT OUTER JOIN dbo.nif_puc AS cnt_puc_5 WITH(NOLOCK) ON dbo.inv_inf_nif.cod_cta = cnt_puc_5.cod_cta
WHERE (dbo.inv_inf_nif.ind_tra <> 'X') 
	OR (dbo.inv_inf_nif.ind_tra IS NULL)

UNION ALL

SELECT dbo.tes_inf_nif.ano_doc, dbo.tes_inf_nif.per_doc, dbo.tes_inf_nif.tip_doc, dbo.tes_inf_nif.sub_tip, dbo.tes_inf_nif.num_doc, dbo.tes_inf_nif.reg_doc, 
			dbo.tes_inf_nif.fch_doc, dbo.tes_inf_nif.cod_suc, dbo.tes_inf_nif.cod_cco, dbo.tes_inf_nif.cod_cl1, dbo.tes_inf_nif.cod_cl2, 
			dbo.tes_inf_nif.cod_cl3, dbo.tes_inf_nif.cod_cta, dbo.tes_inf_nif.cod_ter, dbo.tes_inf_nif.deb_mov, dbo.tes_inf_nif.cre_mov, 
			dbo.tes_inf_nif.des_mov, dbo.tes_inf_nif.bas_mov, dbo.tes_inf_nif.num_che, '0' AS ind_cos, dbo.tes_inf_nif.ind_tra, cnt_puc_4.nom_cta, 
			'tes' AS aplic, dbo.tes_inf_nif.ind_mr, dbo.tes_inf_nif.fec_tas, dbo.tes_inf_nif.tasa, dbo.tes_inf_nif.usuario, dbo.tes_inf_nif.fec_grab, 
			dbo.tes_inf_nif.ind_tas, CONVERT(BIT,0) AS asig_num, dbo.tes_inf_nif.num_concil,difcam_doc AS difcam_doc
FROM dbo.tes_inf_nif WITH(NOLOCK) 
	LEFT OUTER JOIN dbo.nif_puc AS cnt_puc_4 WITH(NOLOCK) ON dbo.tes_inf_nif.cod_cta = cnt_puc_4.cod_cta
WHERE (dbo.tes_inf_nif.ind_tra <> 'X') 
	OR (dbo.tes_inf_nif.ind_tra IS NULL)

UNION ALL

SELECT dbo.ppe_inf_con.ano_doc, dbo.ppe_inf_con.per_doc, dbo.ppe_inf_con.tip_doc, dbo.ppe_inf_con.sub_tip, dbo.ppe_inf_con.num_doc, dbo.ppe_inf_con.reg_doc, 
            dbo.ppe_inf_con.fch_doc, dbo.ppe_inf_con.cod_suc, dbo.ppe_inf_con.cod_cco, dbo.ppe_inf_con.cod_cl1, dbo.ppe_inf_con.cod_cl2, 
            dbo.ppe_inf_con.cod_cl3, dbo.ppe_inf_con.cod_cta, dbo.ppe_inf_con.cod_ter, dbo.ppe_inf_con.deb_mov, dbo.ppe_inf_con.cre_mov, 
            dbo.ppe_inf_con.des_mov, dbo.ppe_inf_con.bas_mov, dbo.ppe_inf_con.num_che, '0' AS ind_cos, dbo.ppe_inf_con.ind_tra, cnt_puc_1.nom_cta, 
            'ppe' AS aplic, dbo.ppe_inf_con.ind_mr, dbo.ppe_inf_con.fec_tas, dbo.ppe_inf_con.tasa, dbo.ppe_inf_con.usuario, dbo.ppe_inf_con.fec_grab, 
            dbo.ppe_inf_con.ind_tas, CONVERT(BIT,0) AS asig_num,dbo.ppe_inf_con.num_concil,0 AS difcam_doc
FROM dbo.ppe_inf_con WITH(NOLOCK) 
	LEFT OUTER JOIN dbo.nif_puc AS cnt_puc_1 WITH(NOLOCK) ON dbo.ppe_inf_con.cod_cta = cnt_puc_1.cod_cta
WHERE (dbo.ppe_inf_con.ind_tra <> 'X') 
	OR (dbo.ppe_inf_con.ind_tra IS NULL)

UNION ALL

SELECT dbo.nom_inf_coniif.ano_doc, dbo.nom_inf_coniif.per_doc, dbo.nom_inf_coniif.tip_doc, dbo.nom_inf_coniif.sub_tip, dbo.nom_inf_coniif.num_doc, dbo.nom_inf_coniif.reg_doc, 
			dbo.nom_inf_coniif.fch_doc, dbo.nom_inf_coniif.cod_suc, dbo.nom_inf_coniif.cod_cco, dbo.nom_inf_coniif.cod_cl1, dbo.nom_inf_coniif.cod_cl2, 
			dbo.nom_inf_coniif.cod_cl3, dbo.nom_inf_coniif.cod_cta, dbo.nom_inf_coniif.cod_ter, dbo.nom_inf_coniif.deb_mov, dbo.nom_inf_coniif.cre_mov, 
			dbo.nom_inf_coniif.des_mov, dbo.nom_inf_coniif.bas_mov, dbo.nom_inf_coniif.num_che, '0' AS ind_cos, dbo.nom_inf_coniif.ind_tra,nif_puc.nom_cta, 
			'nom' AS aplic, dbo.nom_inf_coniif.ind_mr, dbo.nom_inf_coniif.fec_tas, dbo.nom_inf_coniif.tasa, dbo.nom_inf_coniif.usuario, dbo.nom_inf_coniif.fec_grab, 
			dbo.nom_inf_coniif.ind_tas, CONVERT(BIT,0) AS asig_num,'' AS num_concil,0 AS difcam_doc
FROM dbo.nom_inf_coniif WITH(NOLOCK) 
	LEFT OUTER JOIN dbo.nif_puc AS nif_puc WITH(NOLOCK) ON dbo.nom_inf_coniif.cod_cta = nif_puc.cod_cta
WHERE (dbo.nom_inf_coniif.ind_tra <> 'X') 
	OR (dbo.nom_inf_coniif.ind_tra IS NULL)

UNION ALL

SELECT dbo.cie_inf_nif.ano_doc, dbo.cie_inf_nif.per_doc, dbo.cie_inf_nif.tip_doc, dbo.cie_inf_nif.sub_tip, dbo.cie_inf_nif.num_doc, dbo.cie_inf_nif.reg_doc, 
            dbo.cie_inf_nif.fch_doc, dbo.cie_inf_nif.cod_suc, dbo.cie_inf_nif.cod_cco, dbo.cie_inf_nif.cod_cl1, dbo.cie_inf_nif.cod_cl2, 
            dbo.cie_inf_nif.cod_cl3, dbo.cie_inf_nif.cod_cta, dbo.cie_inf_nif.cod_ter, dbo.cie_inf_nif.deb_mov, dbo.cie_inf_nif.cre_mov, 
            dbo.cie_inf_nif.des_mov, dbo.cie_inf_nif.bas_mov, dbo.cie_inf_nif.num_che, '0' AS ind_cos, dbo.cie_inf_nif.ind_tra,nif_puc.nom_cta, 
            'cie' AS aplic, dbo.cie_inf_nif.ind_mr, dbo.cie_inf_nif.fec_tas, dbo.cie_inf_nif.tasa, dbo.cie_inf_nif.usuario, dbo.cie_inf_nif.fec_grab, 
            dbo.cie_inf_nif.ind_tas, CONVERT(BIT,0) AS asig_num,dbo.cie_inf_nif.num_concil,0 AS difcam_doc
FROM dbo.cie_inf_nif WITH(NOLOCK) 
	LEFT OUTER JOIN dbo.nif_puc AS nif_puc WITH(NOLOCK) ON dbo.cie_inf_nif.cod_cta = nif_puc.cod_cta
WHERE (dbo.cie_inf_nif.ind_tra <> 'X') 
	OR (dbo.cie_inf_nif.ind_tra IS NULL);

```
