# View: v_gen_infcon_cons_nif

## Usa los objetos:
- [[cie_inf_nif]]
- [[cxc_inf_nif]]
- [[cxp_inf_nif]]
- [[inv_inf_nif]]
- [[nif_inf_con]]
- [[nif_puc]]
- [[nom_inf_con]]
- [[ppe_inf_con]]
- [[tes_inf_nif]]

```sql

/*SE AGREGA A LA CONSULTA DE DOCUMENTOS DE TESORERIA EL NUMERO DE CONCILIACION
JSARMIENTO MARZO/2013 SRS:2013-0332
AYVEGA DICIEMBRE/2018 SNR2019-0088 SE AGREGA TABLA CONTABILIZACION NIIF DE CARTERA DE COLEGIOS*/
CREATE VIEW [dbo].[v_gen_infcon_cons_nif]
AS
SELECT cxc_inf_nif.ano_doc,cxc_inf_nif.per_doc,cxc_inf_nif.sub_tip,cxc_inf_nif.tip_doc,cxc_inf_nif.num_doc,
	cxc_inf_nif.reg_doc,cxc_inf_nif.fch_doc,cxc_inf_nif.cod_suc,cxc_inf_nif.cod_cco,cxc_inf_nif.cod_cl1,cxc_inf_nif.cod_cl2,
	cxc_inf_nif.cod_cl3,cxc_inf_nif.cod_cta,cxc_inf_nif.cod_ter,cxc_inf_nif.deb_mov,cxc_inf_nif.cre_mov,
	cxc_inf_nif.des_mov,cxc_inf_nif.bas_mov,cxc_inf_nif.num_che,cxc_inf_nif.ind_cos,cxc_inf_nif.ind_tra,
	nif_puc.nom_cta,'cxc' AS aplic,cxc_inf_nif.ind_mr,cxc_inf_nif.fec_tas,cxc_inf_nif.tasa,cxc_inf_nif.usuario,
	cxc_inf_nif.fec_grab,cxc_inf_nif.ind_tas,ISNULL(nif_puc.ind_cco,0) AS ind_cco,ISNULL(nif_puc.ind_bas,0) AS ind_bas,
	ISNULL(nif_puc.ind_ter,0) AS ind_ter,ISNULL(nif_puc.ind_cl1,0) AS ind_cl1,ISNULL(nif_puc.ind_cl2,0) AS ind_cl2,
	ISNULL(nif_puc.ind_cl3,0) AS ind_cl3,ISNULL(tip_cta,0) AS tip_cta,'' AS num_concil
FROM cxc_inf_nif WITH (NOLOCK) 
	LEFT OUTER JOIN nif_puc WITH (NOLOCK) ON cxc_inf_nif.cod_cta = nif_puc.cod_cta
WHERE (cxc_inf_nif.ind_tra <> 'X') 
	OR (cxc_inf_nif.ind_tra IS NULL)

UNION ALL 

SELECT cxp_inf_nif.ano_doc,cxp_inf_nif.per_doc,cxp_inf_nif.sub_tip,cxp_inf_nif.tip_doc,cxp_inf_nif.num_doc,
	cxp_inf_nif.reg_doc,cxp_inf_nif.fch_doc,cxp_inf_nif.cod_suc,cxp_inf_nif.cod_cco,cxp_inf_nif.cod_cl1,cxp_inf_nif.cod_cl2,
	cxp_inf_nif.cod_cl3,cxp_inf_nif.cod_cta,cxp_inf_nif.cod_ter,cxp_inf_nif.deb_mov,cxp_inf_nif.cre_mov,
	cxp_inf_nif.des_mov,cxp_inf_nif.bas_mov,cxp_inf_nif.num_che,cxp_inf_nif.ind_cos,cxp_inf_nif.ind_tra,
	nif_puc.nom_cta,'cxp' AS aplic,cxp_inf_nif.ind_mr,cxp_inf_nif.fec_tas,cxp_inf_nif.tasa,cxp_inf_nif.usuario,
	cxp_inf_nif.fec_grab,cxp_inf_nif.ind_tas,ISNULL(nif_puc.ind_cco,0) AS ind_cco,ISNULL(nif_puc.ind_bas,0) AS ind_bas,
	ISNULL(nif_puc.ind_ter,0) AS ind_ter,ISNULL(nif_puc.ind_cl1,0) AS ind_cl1,ISNULL(nif_puc.ind_cl2,0) AS ind_cl2,
	ISNULL(nif_puc.ind_cl3,0) AS ind_cl3,ISNULL(tip_cta,0) AS tip_cta,'' AS num_concil
FROM cxp_inf_nif WITH (NOLOCK) 
	LEFT OUTER JOIN nif_puc WITH (NOLOCK) ON cxp_inf_nif.cod_cta = nif_puc.cod_cta
WHERE (cxp_inf_nif.ind_tra <> 'X') 
	OR (cxp_inf_nif.ind_tra IS NULL)

UNION ALL 

SELECT inv_inf_nif.ano_doc,inv_inf_nif.per_doc,inv_inf_nif.sub_tip,inv_inf_nif.tip_doc,inv_inf_nif.num_doc,
	inv_inf_nif.reg_doc,inv_inf_nif.fch_doc,inv_inf_nif.cod_suc,inv_inf_nif.cod_cco,inv_inf_nif.cod_cl1,inv_inf_nif.cod_cl2,
	inv_inf_nif.cod_cl3,inv_inf_nif.cod_cta,inv_inf_nif.cod_ter,inv_inf_nif.deb_mov,inv_inf_nif.cre_mov,
	inv_inf_nif.des_mov,inv_inf_nif.bas_mov,inv_inf_nif.num_che,inv_inf_nif.ind_cos,inv_inf_nif.ind_tra,
	nif_puc.nom_cta,'inv' AS aplic,inv_inf_nif.ind_mr,inv_inf_nif.fec_tas,inv_inf_nif.tasa,inv_inf_nif.usuario,
	inv_inf_nif.fec_grab,inv_inf_nif.ind_tas,ISNULL(nif_puc.ind_cco,0) AS ind_cco,ISNULL(nif_puc.ind_bas,0) AS ind_bas,
	ISNULL(nif_puc.ind_ter,0) AS ind_ter,ISNULL(nif_puc.ind_cl1,0) AS ind_cl1,ISNULL(nif_puc.ind_cl2,0) AS ind_cl2,
	ISNULL(nif_puc.ind_cl3,0) AS ind_cl3,ISNULL(tip_cta,0) AS tip_cta,'' AS num_concil
FROM inv_inf_nif WITH (NOLOCK) 
	LEFT OUTER JOIN nif_puc WITH (NOLOCK) ON inv_inf_nif.cod_cta = nif_puc.cod_cta
WHERE (inv_inf_nif.ind_tra <> 'X') 
	OR (inv_inf_nif.ind_tra IS NULL)

UNION ALL 

SELECT tes_inf_nif.ano_doc,tes_inf_nif.per_doc,tes_inf_nif.sub_tip,tes_inf_nif.tip_doc,tes_inf_nif.num_doc,tes_inf_nif.reg_doc,
	tes_inf_nif.fch_doc,tes_inf_nif.cod_suc,tes_inf_nif.cod_cco,tes_inf_nif.cod_cl1,tes_inf_nif.cod_cl2,
	tes_inf_nif.cod_cl3,tes_inf_nif.cod_cta,tes_inf_nif.cod_ter,tes_inf_nif.deb_mov,tes_inf_nif.cre_mov,
	tes_inf_nif.des_mov,tes_inf_nif.bas_mov,tes_inf_nif.num_che,'0' AS ind_cos,tes_inf_nif.ind_tra,
	nif_puc.nom_cta,'tes' AS aplic,tes_inf_nif.ind_mr,tes_inf_nif.fec_tas,tes_inf_nif.tasa,tes_inf_nif.usuario,
	tes_inf_nif.fec_grab,tes_inf_nif.ind_tas,ISNULL(nif_puc.ind_cco,0) AS ind_cco,ISNULL(nif_puc.ind_bas,0) AS ind_bas,
	ISNULL(nif_puc.ind_ter,0) AS ind_ter,ISNULL(nif_puc.ind_cl1,0) AS ind_cl1,ISNULL(nif_puc.ind_cl2,0) AS ind_cl2,
	ISNULL(nif_puc.ind_cl3,0) AS ind_cl3,ISNULL(tip_cta,0) AS tip_cta,num_concil
FROM tes_inf_nif WITH (NOLOCK) 
	LEFT OUTER JOIN nif_puc WITH (NOLOCK) ON tes_inf_nif.cod_cta = nif_puc.cod_cta
WHERE (tes_inf_nif.ind_tra <> 'X') 
	OR (tes_inf_nif.ind_tra IS NULL)

UNION ALL

SELECT nif_inf_con.ano_doc,nif_inf_con.per_doc,nif_inf_con.sub_tip,nif_inf_con.tip_doc,nif_inf_con.num_doc,nif_inf_con.reg_doc,
	nif_inf_con.fch_doc,nif_inf_con.cod_suc,nif_inf_con.cod_cco,nif_inf_con.cod_cl1,nif_inf_con.cod_cl2,
	nif_inf_con.cod_cl3,nif_inf_con.cod_cta,nif_inf_con.cod_ter,nif_inf_con.deb_mov,nif_inf_con.cre_mov,
	nif_inf_con.des_mov,nif_inf_con.bas_mov,nif_inf_con.num_che,'0' AS ind_cos,nif_inf_con.ind_tra,
	nif_puc.nom_cta,'cnt' AS aplic,nif_inf_con.ind_mr,nif_inf_con.fec_tas,nif_inf_con.tasa,nif_inf_con.usuario,
	nif_inf_con.fec_grab,nif_inf_con.ind_tas,ISNULL(nif_puc.ind_cco,0) AS ind_cco,ISNULL(nif_puc.ind_bas,0) AS ind_bas,
	ISNULL(nif_puc.ind_ter,0) AS ind_ter,ISNULL(nif_puc.ind_cl1,0) AS ind_cl1,ISNULL(nif_puc.ind_cl2,0) AS ind_cl2,
	ISNULL(nif_puc.ind_cl3,0) AS ind_cl3,ISNULL(tip_cta,0) AS tip_cta, ' ' num_concil
FROM nif_inf_con WITH (NOLOCK) 
	LEFT OUTER JOIN nif_puc WITH (NOLOCK) ON nif_inf_con.cod_cta = nif_puc.cod_cta
WHERE (nif_inf_con.ind_tra <> 'X') 
	OR (nif_inf_con.ind_tra IS NULL)

UNION ALL

SELECT nom_inf_con.ano_doc,nom_inf_con.per_doc,nom_inf_con.sub_tip,nom_inf_con.tip_doc,nom_inf_con.num_doc,nom_inf_con.reg_doc,
	nom_inf_con.fch_doc,nom_inf_con.cod_suc,nom_inf_con.cod_cco,nom_inf_con.cod_cl1,nom_inf_con.cod_cl2,
	nom_inf_con.cod_cl3,nom_inf_con.cod_cta,nom_inf_con.cod_ter,nom_inf_con.deb_mov,nom_inf_con.cre_mov,
	nom_inf_con.des_mov,nom_inf_con.bas_mov,nom_inf_con.num_che,'0' AS ind_cos,nom_inf_con.ind_tra,
	nif_puc.nom_cta,'nom' AS aplic,nom_inf_con.ind_mr,nom_inf_con.fec_tas,nom_inf_con.tasa,nom_inf_con.usuario,
	nom_inf_con.fec_grab,nom_inf_con.ind_tas,ISNULL(nif_puc.ind_cco,0) AS ind_cco,ISNULL(nif_puc.ind_bas,0) AS ind_bas,
	ISNULL(nif_puc.ind_ter,0) AS ind_ter,ISNULL(nif_puc.ind_cl1,0) AS ind_cl1,ISNULL(nif_puc.ind_cl2,0) AS ind_cl2,
	ISNULL(nif_puc.ind_cl3,0) AS ind_cl3,ISNULL(tip_cta,0) AS tip_cta,'' AS num_concil
FROM nom_inf_con WITH (NOLOCK) 
	LEFT OUTER JOIN nif_puc WITH (NOLOCK) ON nom_inf_con.cod_cta = nif_puc.cod_cta
WHERE (nom_inf_con.ind_tra <> 'X') 
	OR (nom_inf_con.ind_tra IS NULL)

UNION ALL

SELECT ppe_inf_con.ano_doc,ppe_inf_con.per_doc,ppe_inf_con.sub_tip,ppe_inf_con.tip_doc,ppe_inf_con.num_doc,ppe_inf_con.reg_doc,
	ppe_inf_con.fch_doc,ppe_inf_con.cod_suc,ppe_inf_con.cod_cco,ppe_inf_con.cod_cl1,ppe_inf_con.cod_cl2,
	ppe_inf_con.cod_cl3,ppe_inf_con.cod_cta,ppe_inf_con.cod_ter,ppe_inf_con.deb_mov,ppe_inf_con.cre_mov,
	ppe_inf_con.des_mov,ppe_inf_con.bas_mov,ppe_inf_con.num_che,'0' AS ind_cos,ppe_inf_con.ind_tra,
	nif_puc.nom_cta,'act' AS aplic,ppe_inf_con.ind_mr,ppe_inf_con.fec_tas,ppe_inf_con.tasa,ppe_inf_con.usuario,
	ppe_inf_con.fec_grab,ppe_inf_con.ind_tas,ISNULL(nif_puc.ind_cco,0) AS ind_cco,ISNULL(nif_puc.ind_bas,0) AS ind_bas,
	ISNULL(nif_puc.ind_ter,0) AS ind_ter,ISNULL(nif_puc.ind_cl1,0) AS ind_cl1,ISNULL(nif_puc.ind_cl2,0) AS ind_cl2,
	ISNULL(nif_puc.ind_cl3,0) AS ind_cl3,ISNULL(tip_cta,0) AS tip_cta,'' AS num_concil
FROM ppe_inf_con WITH (NOLOCK) 
	LEFT OUTER JOIN nif_puc WITH (NOLOCK) ON ppe_inf_con.cod_cta = nif_puc.cod_cta
WHERE (ppe_inf_con.ind_tra <> 'X') 
	OR (ppe_inf_con.ind_tra IS NULL)

UNION ALL

SELECT cie_inf_nif.ano_doc,cie_inf_nif.per_doc,cie_inf_nif.sub_tip,cie_inf_nif.tip_doc,cie_inf_nif.num_doc,cie_inf_nif.reg_doc,
	cie_inf_nif.fch_doc,cie_inf_nif.cod_suc,cie_inf_nif.cod_cco,cie_inf_nif.cod_cl1,cie_inf_nif.cod_cl2,
	cie_inf_nif.cod_cl3,cie_inf_nif.cod_cta,cie_inf_nif.cod_ter,cie_inf_nif.deb_mov,cie_inf_nif.cre_mov,
	cie_inf_nif.des_mov,cie_inf_nif.bas_mov,cie_inf_nif.num_che,'0' AS ind_cos,cie_inf_nif.ind_tra,
	nif_puc.nom_cta,'cie' AS aplic,cie_inf_nif.ind_mr,cie_inf_nif.fec_tas,cie_inf_nif.tasa,cie_inf_nif.usuario,
	cie_inf_nif.fec_grab,cie_inf_nif.ind_tas,ISNULL(nif_puc.ind_cco,0) AS ind_cco,ISNULL(nif_puc.ind_bas,0) AS ind_bas,
	ISNULL(nif_puc.ind_ter,0) AS ind_ter,ISNULL(nif_puc.ind_cl1,0) AS ind_cl1,ISNULL(nif_puc.ind_cl2,0) AS ind_cl2,
	ISNULL(nif_puc.ind_cl3,0) AS ind_cl3,ISNULL(tip_cta,0) AS tip_cta,'' AS num_concil
FROM cie_inf_nif WITH (NOLOCK) 
	LEFT OUTER JOIN nif_puc WITH (NOLOCK) ON cie_inf_nif.cod_cta = nif_puc.cod_cta
WHERE (cie_inf_nif.ind_tra <> 'X') 
	OR (cie_inf_nif.ind_tra IS NULL);

```
