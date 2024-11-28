# View: v_odp_docum_std

## Usa los objetos:
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_sucursal]]
- [[inv_bodegas]]
- [[inv_cabdoc]]
- [[inv_cuedoc]]
- [[inv_items]]
- [[inv_odp_001]]
- [[odp_etapas]]
- [[odp_respon]]
- [[v_gen_subtipos]]
- [[v_odp_clases]]

```sql

/* =====================================================
    Author:		ADRIAN FLOREZ
    Create date: JUNIO / 2020
    Description: VISTA DE LAS TABLAS DE DOCUMENTOS  
	 =====================================================*/
CREATE VIEW [dbo].[v_odp_docum_std]
AS

SELECT cab.ano_doc,cab.per_doc,cab.tip_doc,cab.sub_tip,cab.num_doc,cab.activa,cab.bod_ped,bodped.nom_bod AS nombre_bod_ped,cab.can_ent,cab.canprod,
	cab.cod_cco,cco.nom_cco,cab.cod_cl1,cl1.nombre AS nombre1,cab.cod_cl2,cl2.nombre AS nombre2,cab.cod_cl3,cl3.nombre AS nombre3,cab.cod_res,resp.nom_res,
	cab.cod_suc,suc.nom_suc,cab.codpt,iteop.des_item AS des_item_codpt,cab.con_odp,conodp.nom_con,cab.fec_eop,cab.fecha,cab.num_pro,cab.obs_orc,cab.ord_pro,cab.suc_ped,cab.num_fac,
	cue.reg_doc,cue.item AS cod_item,ite.des_item,cue.numop,
	cue.bodega AS cod_bod,bod.nom_bod AS des_bod,cue.etapa,eta.des_etapa,cue.clase,cla.nom_clase,cue.cantidad,cue.cos_uni,cue.cos_tot,cue.candesp,cue.vcifitem,
	cue.ind_des,cue.descrip_cue AS des_cue,cue.cos_unai,cue.cos_toa, cue.sustide, cue.itemop,cue.ano_des,cue.per_des,cue.sub_des,cue.despa,cue.reg_des,cue.cod_lote,cue.ven_lote,
	subori.des_tip,subori.nom_sub
	FROM dbo.inv_cabdoc AS cab  WITH (NOLOCK)
		INNER JOIN dbo.inv_cuedoc AS cue WITH(NOLOCK) ON cab.ano_doc = cue.ano_doc AND cab.per_doc = cue.per_doc AND cab.tip_doc = cue.tip_doc AND cab.sub_tip = cue.sub_tip AND cab.num_doc = cue.num_doc 
		LEFT JOIN odp_respon AS resp WITH (NOLOCK) ON cab.cod_res=resp.cod_res
		LEFT JOIN gen_sucursal AS suc WITH (NOLOCK) ON cab.cod_suc = suc.cod_suc
		LEFT JOIN gen_ccosto AS cco WITH (NOLOCK) ON cab.cod_cco = cco.cod_cco
		LEFT JOIN gen_clasif1 AS cl1 WITH (NOLOCK) ON cab.cod_cl1 = cl1.codigo
		LEFT JOIN gen_clasif2 AS cl2 WITH (NOLOCK) ON cab.cod_cl2 = cl2.codigo
		LEFT JOIN gen_clasif3 AS cl3 WITH (NOLOCK) ON cab.cod_cl3 = cl3.codigo
		LEFT JOIN inv_bodegas AS bodped WITH (NOLOCK) ON cab.BOD_PED = bodped.cod_bod
		LEFT JOIN inv_bodegas AS bod WITH (NOLOCK) ON cue.bodega = bod.cod_bod
		LEFT JOIN inv_items AS iteop WITH (NOLOCK) ON cab.codpt = iteop.cod_item
		LEFT JOIN inv_items AS ite ON cue.item=ite.cod_item
		LEFT JOIN inv_odp_001 AS conodp WITH (NOLOCK) ON conodp.cod_con = cab.con_odp
		LEFT JOIN odp_etapas AS eta WITH (NOLOCK) ON cue.etapa=eta.cod_etapa
		LEFT JOIN v_odp_clases AS cla WITH (NOLOCK) ON cue.clase=cla.cod_clase
		LEFT JOIN v_gen_subtipos AS subori WITH(NOLOCK) ON cab.tip_doc=subori.cod_tip AND cab.sub_tip=subori.cod_sub
	WHERE subori.cod_apl='ODP';

```
