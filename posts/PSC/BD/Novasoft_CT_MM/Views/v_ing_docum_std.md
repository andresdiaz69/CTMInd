# View: v_ing_docum_std

## Usa los objetos:
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_subtipodoc]]
- [[gen_sucursal]]
- [[gen_terceros]]
- [[gen_tipodoc]]
- [[ing_cabdoc]]
- [[ing_cuedoc]]
- [[ing_rubros]]
- [[sis_aplicacion]]

```sql

CREATE VIEW [dbo].[v_ing_docum_std]
AS
SELECT cue.ano_doc,cue.per_doc,cue.tip_doc,cue.sub_tip,cue.num_doc,cue.reg_doc,cue.fch_doc AS fch_doc_cue,cue.cod_suc,cue.cod_ter AS cod_ter_cue,tercue.ter_nombre AS ter_nombre_cue,cue.cod_rub,rub.descripci,cue.des_mov AS des_mov_cue,cue.val_mov,
		cue.ano_abo,cue.per_abo,cue.tip_abo,tipabo.des_tip AS des_tip_abo,cue.sub_abo,subabo.nom_sub AS nom_sub_abo,cue.num_abo,cue.trans,cue.cod_cco,cco.nom_cco,cue.cod_cl1,cl1.nombre AS nom_cl1,cue.cod_cl2,cl2.nombre AS nom_cl2,cue.cod_cl3,cl3.nombre AS nom_cl3,
		cab.fch_doc,cab.cod_ter AS cod_ter_cab ,tercab.ter_nombre AS ter_nombre_cab,cab.cambio,cab.des_mov AS des_mov_cab,cab.val_tot,cab.hora,cab.usuario,cab.apl_ori,apl.nom_mod AS nom_apl_ori,cab.ano_ori,cab.per_ori,
		cab.tip_ori,tipori.des_tip AS nom_tip_ori,cab.sub_ori,subori.nom_sub AS nom_sub_ori,cab.num_ori,cab.fch_aud,cab.cod_ide, suc.nom_suc
FROM ing_cuedoc AS cue WITH(NOLOCK)
	INNER JOIN ing_cabdoc AS cab WITH(NOLOCK) ON cue.ano_doc=cab.ano_doc AND cue.per_doc=cab.per_doc AND cue.tip_doc=cab.tip_doc AND cue.sub_tip=cab.sub_tip AND cue.num_doc=cab.num_doc
	LEFT JOIN gen_terceros AS tercue WITH(NOLOCK) ON cue.cod_ter=tercue.ter_nit	
	LEFT JOIN gen_terceros AS tercab WITH(NOLOCK) ON cab.cod_ter=tercab.ter_nit	
	LEFT JOIN gen_tipodoc AS tipabo WITH(NOLOCK) ON cue.tip_abo=tipabo.cod_tip
	LEFT JOIN gen_subtipodoc AS subabo WITH(NOLOCK) ON cue.tip_abo=subabo.cod_tip AND cue.sub_abo=subabo.cod_sub
	LEFT JOIN gen_tipodoc AS tipori WITH(NOLOCK) ON cab.tip_ori=tipori.cod_tip
	LEFT JOIN gen_subtipodoc AS subori WITH(NOLOCK) ON cab.tip_ori=subori.cod_tip AND cab.sub_ori=subori.cod_sub			
	LEFT JOIN gen_ccosto AS cco WITH(NOLOCK) ON cue.cod_cco=cco.cod_cco	
	LEFT JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON cue.cod_cl1= cl1.codigo	
	LEFT JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON cue.cod_cl2= cl2.codigo
	LEFT JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON cue.cod_cl3= cl3.codigo
	LEFT JOIN sis_aplicacion AS apl WITH(NOLOCK) ON cab.apl_ori= apl.cod_apl
	LEFT JOIN ing_rubros AS rub WITH(NOLOCK) ON cue.cod_rub=rub.cod_rubro
	LEFT JOIN gen_sucursal AS suc WITH(NOLOCK) ON cue.cod_suc = suc.cod_suc

```
