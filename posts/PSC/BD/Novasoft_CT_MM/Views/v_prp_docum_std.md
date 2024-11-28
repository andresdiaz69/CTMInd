# View: v_prp_docum_std

## Usa los objetos:
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_subtipodoc]]
- [[gen_sucursal]]
- [[gen_terceros]]
- [[gen_tipodoc]]
- [[prp_cabdoc]]
- [[prp_cuedoc]]
- [[prp_rubro]]
- [[pry_proyectos]]
- [[v_gen_subtip_prp]]

```sql

CREATE VIEW [dbo].[v_prp_docum_std]
AS
SELECT cue.ano_doc,cue.per_doc,cue.tip_doc,cue.sub_tip,cue.num_doc,cue.reg_doc,cue.cod_des,cue.trans,cue.cod_rub,cue.tip_rub,cue.cod_rec,cue.cod_cco,
		cue.cod_cue,cue.rub_des,cue.tip_des,cue.rec_des,cue.cue_des,cue.cco_des,cue.sec_des,cue.ano_ref,cue.per_ref,cue.tip_ref,cue.num_ref,cue.fch_pac,
		cue.val_doc,cue.fch_pag,cue.sal_doc,cue.val_aux,cue.cod_uso,cue.cod_cl1,cue.cod_cl2,cue.cod_cl3,cue.uso_des,cue.cl1_des,cue.cl2_des,cue.cl3_des,
		cue.SALDO_APR,cue.sub_ref,cab.fch_doc,cab.det_uno,cab.det_dos,cab.det_tre,cab.det_cua,cab.cod_cia,cab.cod_sec,cab.cod_prv,cab.cambio,cab.num_mem,
		cab.num_con,cab.fch_ven,cab.fch_pro,cab.val_tot,cab.apl_ori,cab.ano_ori,cab.per_ori,cab.tip_ori,cab.sub_ori,cab.num_ori,cab.hora,cab.usuario,
		cab.fch_aud,cab.cod_ide,cab.inf_ad1,cab.inf_ad2,cab.ano_rel,cab.per_rel,cab.tip_rel,cab.num_rel,cab.ind_rel,cab.ind_cum,cab.sub_rel,ter.ter_nit,ter.ter_nombre,
		subrel.nom_sub AS nom_sub_rel, subrel.des_tip AS des_tip_rel,subori.nom_sub AS nom_sub_ori, tipori.des_tip AS des_tip_ori,
		subref.nom_sub AS nom_sub_ref, tipref.des_tip AS des_tip_ref, suc.nom_suc, sucdes.nom_suc AS nom_suc_des,
		cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, rub.nom_rub,
		ccodes.nom_cco AS nom_cco_des, cl1des.nombre AS nom_cl1_des, cl2des.nombre AS nom_cl2_des, cl3des.nombre AS nom_cl3_des, rubdes.nom_rub AS nom_rub_des,
		cue.cod_rub_ref,cab.num_proy,cue.obs_ref,cab.num_pry,proy.des_pry
FROM prp_cuedoc AS cue WITH(NOLOCK)
	INNER JOIN prp_cabdoc AS cab WITH(NOLOCK) ON cue.ano_doc=cab.ano_doc AND cue.per_doc=cab.per_doc AND cue.tip_doc=cab.tip_doc AND cue.sub_tip=cab.sub_tip AND cue.num_doc=cab.num_doc
	LEFT JOIN gen_terceros AS ter WITH(NOLOCK) ON cab.cod_prv=ter.ter_nit
	LEFT JOIN v_gen_subtip_prp AS subrel WITH(NOLOCK) ON cab.tip_rel=subrel.cod_tip AND cab.sub_rel=subrel.cod_sub
	LEFT JOIN gen_tipodoc AS tipref WITH(NOLOCK) ON cue.tip_ref=tipref.cod_tip
	LEFT JOIN gen_subtipodoc AS subref WITH(NOLOCK) ON cue.tip_ref=subref.cod_tip AND cue.sub_ref=subref.cod_sub
	LEFT JOIN gen_tipodoc AS tipori WITH(NOLOCK) ON cab.tip_ori=tipori.cod_tip
	LEFT JOIN gen_subtipodoc AS subori WITH(NOLOCK) ON cab.tip_ori=subori.cod_tip AND cab.sub_ori=subori.cod_sub	
	LEFT JOIN gen_sucursal AS suc WITH(NOLOCK) ON cab.cod_sec=suc.cod_suc
	LEFT JOIN gen_sucursal AS sucdes WITH(NOLOCK) ON cue.sec_des=sucdes.cod_suc
	LEFT JOIN gen_ccosto AS cco WITH(NOLOCK) ON cue.cod_cco=cco.cod_cco
	LEFT JOIN gen_ccosto AS ccodes WITH(NOLOCK) ON cue.cco_des=ccodes.cod_cco
	LEFT JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON cue.cod_cl1= cl1.codigo
	LEFT JOIN gen_clasif1 AS cl1des WITH(NOLOCK) ON cue.cl1_des= cl1des.codigo
	LEFT JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON cue.cod_cl2= cl2.codigo
	LEFT JOIN gen_clasif2 AS cl2des WITH(NOLOCK) ON cue.cl2_des= cl2des.codigo
	LEFT JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON cue.cod_cl3= cl3.codigo
	LEFT JOIN gen_clasif3 AS cl3des WITH(NOLOCK) ON cue.cl3_des= cl3des.codigo
	LEFT JOIN prp_rubro AS rub WITH(NOLOCK) ON cue.cod_rub=rub.cod_rub
	LEFT JOIN prp_rubro AS rubdes WITH(NOLOCK) ON cue.rub_des=rubdes.cod_rub
	LEFT JOIN pry_proyectos AS proy WITH(NOLOCK) ON cab.num_pry=proy.cod_pry;

```
