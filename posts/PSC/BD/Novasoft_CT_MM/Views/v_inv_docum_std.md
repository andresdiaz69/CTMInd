# View: v_inv_docum_std

## Usa los objetos:
- [[cxc_caunotacre]]
- [[cxc_cliente]]
- [[cxc_contcli_entpub]]
- [[cxc_succli]]
- [[cxp_afectacion]]
- [[cxp_procprov]]
- [[cxp_provee]]
- [[cxp_sucprov]]
- [[fac_estadofacelec]]
- [[fac_tipofactura]]
- [[fac_tipoOpera]]
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
- [[gen_sucursal]]
- [[gen_terceros]]
- [[gen_vendedor]]
- [[inv_bodegas]]
- [[inv_cabdoc]]
- [[inv_conceptos]]
- [[inv_contmarco]]
- [[inv_cuedoc]]
- [[inv_items]]
- [[inv_listas]]
- [[inv_tabconv]]
- [[opr_contratos]]
- [[opr_sitios]]
- [[ptv_egresos]]
- [[rhh_ConvCco]]
- [[rhh_ConvCl1]]
- [[rhh_ConvCl2]]
- [[rhh_ConvCl3]]
- [[rhh_ConvCl4]]
- [[rhh_ConvCl5]]
- [[rhh_ConvCl6]]
- [[rhh_ConvCl7]]
- [[rhh_ConvCl8]]
- [[rhh_Convenio]]
- [[rhh_ConvSuc]]

```sql

CREATE VIEW [dbo].[v_inv_docum_std]
AS
SELECT a.ano_doc, a.per_doc, a.sub_tip, a.num_doc, a.num_fac, a.fecha, a.hora, a.tasa, a.vendedor, a.vendedor2, a.cod_suc, a.cod_cco, a.cod_cl1, a.cod_cl2, 
	a.cod_cl3, a.cliente, a.provee, a.ind_aut, a.por_riv, a.por_ica, a.ind_tip, a.lista, a.dia_pla, a.anticipo, a.marca, a.cambio, a.cod_cif, a.valorcif, a.orden, 
	a.codpt, a.activa, a.canprod, a.ord_pro, a.can_ent, a.ano_odp, a.per_odp, a.cod_con, conc.nom_con, a.ant_doc, a.ind_mp, a.fec_tas, a.abono, a.tip_rec, a.num_rec, 
	a.val_efe, a.val_che, a.val_tar, a.val_otr, a.fec_cot, a.ano_dev, a.per_dev, a.sub_dev, a.num_dev, a.ano_ant, a.per_ant, a.sub_ant, 
	a.num_ant AS num_ant_cab, a.for_pag, a.req_orc, a.obs_orc, a.fac_pro, a.ind_pre, a.ind_ext, a.tip_act, a.ind_pri, a.doc_ref, a.age_ret, a.ind_tas, 
	a.cod_inco, a.fec_emb, a.fec_dec, a.fec_imp, a.num_emb, a.num_guia, a.via_tra, a.fec_ven, a.fec_entrega, a.dec_impo, a.nun_man, a.fec_man, 
	a.doc_tra, a.fec_tra, a.peso_tot, a.por_flete1, a.por_flete2, a.por_flete3, a.fac_ven, a.fac_fec, a.fec_guia, a.fec_zadu, a.emp_tra, a.mon_ori, a.fac_usd, 
	a.peso_real, a.cod_etrans, a.FechaRecFac, a.FechaRadVB, a.FechaAprVB, a.FechaEnCla, a.FechaLlaBo, a.cod_embala, a.pai_proc, a.cnt_dec, 
	a.usuario, a.fec_grab, a.cod_caja, a.est_doc AS est_doc_cab, a.ana_req, a.rep_veh, a.tip_res, a.ind_gas, a.cod_res, a.num_pro, a.sub_odp, a.suc_ped, 
	a.bod_ped, a.fec_eop, b.reg_doc, b.serie, b.despa, b.pedido, b.bodega, b.bod_des, b.cant_uni, b.item, b.alterno, b.trans, b.cantidad, b.fac_con, 
	b.cos_uni, b.cos_tot, b.pre_vta, b.pre_tot, b.por_des, b.mon_des, b.ven_net, b.imp_con, b.por_iva, b.por_iva_ng, b.mon_iva, b.mon_iva_ng, b.val_tot, 
	b.val_uni, b.por_ret, b.mon_ret, b.ret_iva, b.ret_iva_ng, b.ret_ica, b.cob_ica, b.val_def, b.por_com, b.mon_com, b.sal_ped, b.des_ped, b.fin_cap, b.cos_toa, 
	b.cos_unai, b.fec_ent, b.etapa, b.cod_prt, b.clase, b.candesp, b.ind_des, b.sustide, b.numop, b.vcifitem, b.itemop, b.ano_ped, b.per_ped, b.sub_ped, 
	b.ano_des, b.per_des, b.sub_des, b.suc_des, b.reg_ped, b.reg_des, b.cou_ext, b.cot_ext, b.prv_ext, b.prt_ext, b.des_ext, b.pre_cnv, b.ven_lote, 
	b.cod_lote, b.valor_pesos, b.cod_pla, b.cod_ter, b.ref_item, b.cod_talla, b.cod_color, b.val_flete1, b.val_flete2, b.val_flete3, b.por_seg1, b.por_seg2, 
	b.por_seg3, b.val_seg1, b.val_seg2, b.val_seg3, b.pes_bruto, b.pes_neto, b.num_bultos, b.cod_emba, b.und_com, b.cod_mer, b.por_otros1, 
	b.por_otros2, b.por_otros3, b.val_otros1, b.val_otros2, b.val_otros3, b.can_leg, b.cod_ori, b.no_caja, b.no_bulto, b.pais_origen, b.prt_fob, b.pais_proc, 
	b.prv_ori, b.prt_ori, b.und_reg, b.val_fleori1, b.val_fleori2, b.val_fleori3, b.val_segori1, b.val_segori2, b.val_segori3, b.val_otrori1, b.val_otrori2, 
	b.val_otrori3, b.pru_fob, b.val_fleteuni1, b.val_fleteuni2, b.val_fleteuni3, b.mar_dec, b.paq_dec, b.flete, b.seguro, b.otros, b.val_ant, b.cod_egr, 
	b.num_ant, b.reg_ant, b.est_doc, b.cod_vehi, b.factor_usd, b.fecha_factor, b.valor_tasa, b.val_flepes1, b.val_flepes2, b.val_segpes1, b.val_segpes2, 
	b.val_otrpes1, b.val_otrpes2, b.val_ajuori1, b.val_aju1, b.val_ajupes1, b.descrip_cue, a.tip_doc, s.nom_suc, c.nom_cco, c1.nombre AS nom_cl1, 
	c2.nombre AS nom_cl2, c3.nombre AS nom_cl3, i.des_item, d.nom_bod, f.des_con, cli.nom_cli, cli.di1_cli AS dir_cli, cli.te1_cli AS tel_cli, pro.rso, 
	pro.di1 AS dir_pro, pro.te1 AS tel_pro, v.nom_ven, lis.des_lis, mon.des_mon, cli.nit_cli, cnv.nom_conv,a.cod_ter AS ter_cab,ter.ter_nombre,
	a.usu_autoriza,b.ind_aut AS aut_cue,b.key_prc,b.cod_conv,b.conv_suc,b.conv_cco,b.conv_cl1,b.conv_cl2,b.conv_cl3,cnvs.conv_suc_des,cnvc.conv_cco_des,
	cnv1.conv_cl1_des,cnv2.conv_cl2_des,cnv3.conv_cl3_des,b.cod_rubro,b.ind_refac,bdes.nom_bod AS nom_bod_des,sdes.nom_suc AS nom_suc_des,ac.Nom_afe, x.nom_cco AS nom_ccocue,
	x1.nombre AS nom_cl1cue,x2.nombre AS nom_cl2cue,x3.nombre AS nom_cl3cue,b.cod_cco AS cco_cue,b.cod_cl1 AS cl1_cue,b.cod_cl2 AS cl2_cue,b.cod_cl3 AS cl3_cue, 
	ccdes.nom_cco AS nom_ccodes,c1des.nombre AS nom_cl1des,c2des.nombre AS nom_cl2des,c3des.nombre AS nom_cl3des,
	b.cco_des,b.cl1_des,b.cl2_des,b.cl3_des,b.tar_ica,t.nom_ciu,pa.nom_pai,de.nom_dep,pro.rep,pro.fax AS fax_pro,pro.e_mail AS mail_prov,
	cli.jef_com,cli.fax_cli,cli.e_mail AS mail_cli,a.cau_devol,cau.des_cau,b.tar_rii,b.tar_rii_ng,b.por_sum1,b.por_sum2,b.por_sum3,b.por_sum4,b.por_res1,
	b.por_res2,b.por_res3,b.por_res4,b.mon_sum1,b.mon_sum2,b.mon_sum3,b.mon_sum4,b.mon_res1,b.mon_res2,b.mon_res3,b.mon_res4,b.cod_ret,ret.nombre AS nom_ret,b.usu_aut_req,
	b.por_vol,b.des_vol,b.conv_cl4,b.conv_cl5,b.conv_cl6,b.conv_cl7,b.conv_cl8,cnv4.conv_cl4_des,cnv5.conv_cl5_des,cnv6.conv_cl6_des,cnv7.conv_cl7_des,cnv8.conv_cl8_des,
	a.suc_cli,scc.nom_suc AS nom_succli,scp.nom_suc AS nom_sucpro,b.cod_ica,act.nom_act,b.num_cto,con.descripcion AS des_cto,b.sit_cli,sit.nom_sit,b.pla_opr, b.val_def_fis,
	b.base_iva_aiu, egr.descrip AS nom_egreso,a.nro_resol, a.est_dian, estd.des_est AS des_est_dian, a.est_cliente, estc.des_est AS des_est_cliente, a.cod_cufe, a.guid_envio, a.LDF_fe,
	b.ano_ant AS ano_ant_cue, b.per_ant AS per_ant_cue, b.sub_ant AS sub_ant_cue, b.num_ant AS num_ant_cue, b.reg_ant AS reg_ant_cue, a.tipo_fact, tipf.descrip_tipo,
	a.tipo_oper, toper.descrip_oper, a.cont_marco, contm.nom_cont,a.cod_cude,b.ocom_cli,b.fec_Ocomcli, a.num_ctr, contcli.num_ent, a.cod_proc, procp.nom_proc,
	a.Link_fe,a.fto_fac,a.lote_facture,a.Nro_SVT,a.cod_cuds,a.obs_orc1,a.obs_orc2,a.obs_orc3,a.obs_orc4,a.obs_orc5
FROM dbo.inv_cabdoc AS a WITH(NOLOCK)
INNER JOIN dbo.inv_cuedoc AS b WITH(NOLOCK) ON a.ano_doc = b.ano_doc AND a.per_doc = b.per_doc AND a.sub_tip = b.sub_tip AND a.num_doc = b.num_doc 
INNER JOIN dbo.gen_sucursal AS s WITH(NOLOCK) ON a.cod_suc = s.cod_suc 
INNER JOIN dbo.gen_ccosto AS c WITH(NOLOCK) ON a.cod_cco = c.cod_cco 
INNER JOIN dbo.gen_clasif1 AS c1 WITH(NOLOCK) ON a.cod_cl1 = c1.codigo 
INNER JOIN dbo.gen_clasif2 AS c2 WITH(NOLOCK) ON a.cod_cl2 = c2.codigo 
INNER JOIN dbo.gen_clasif3 AS c3 WITH(NOLOCK) ON a.cod_cl3 = c3.codigo 
INNER JOIN dbo.inv_items AS i WITH(NOLOCK) ON b.item = i.cod_item 
INNER JOIN dbo.inv_bodegas AS d WITH(NOLOCK) ON b.bodega = d.cod_bod 
LEFT OUTER JOIN dbo.gen_vendedor AS v WITH(NOLOCK) ON a.vendedor = v.cod_ven 
LEFT OUTER JOIN dbo.inv_tabconv AS f WITH(NOLOCK) ON b.item = f.cod_item AND b.fac_con = f.cod_con 
LEFT OUTER JOIN dbo.cxc_cliente AS cli WITH(NOLOCK) ON a.cliente = cli.cod_cli 
LEFT OUTER JOIN dbo.cxp_provee AS pro WITH(NOLOCK) ON a.provee = pro.provee 
LEFT OUTER JOIN dbo.inv_listas AS lis WITH(NOLOCK) ON a.lista = lis.cod_lis 
LEFT OUTER JOIN dbo.gen_monedas AS mon WITH(NOLOCK) ON a.ind_mp = mon.cod_mon 
LEFT OUTER JOIN dbo.rhh_Convenio As cnv WITH(NOLOCK) ON b.cod_conv=cnv.cod_conv 
LEFT OUTER JOIN dbo.gen_terceros AS ter WITH(NOLOCK) ON a.cod_ter=ter.ter_nit 
LEFT OUTER JOIN dbo.rhh_ConvSuc AS cnvs WITH(NOLOCK) ON b.cod_conv=cnvs.cod_conv AND b.conv_suc=cnvs.conv_suc 
LEFT OUTER JOIN dbo.rhh_ConvCco AS cnvc WITH(NOLOCK) ON b.cod_conv=cnvc.cod_conv AND b.conv_suc=cnvc.conv_suc AND b.conv_cco=cnvc.conv_cco
LEFT OUTER JOIN dbo.rhh_ConvCl1 AS cnv1 WITH(NOLOCK) ON b.cod_conv=cnv1.cod_conv AND b.conv_suc=cnv1.conv_suc AND b.conv_cco=cnv1.conv_cco AND b.conv_cl1=cnv1.conv_cl1
LEFT OUTER JOIN dbo.rhh_ConvCl2 AS cnv2 WITH(NOLOCK) ON b.cod_conv=cnv2.cod_conv AND b.conv_suc=cnv2.conv_suc AND b.conv_cco=cnv2.conv_cco AND b.conv_cl1=cnv2.conv_cl1 AND b.conv_cl2=cnv2.conv_cl2
LEFT OUTER JOIN dbo.rhh_ConvCl3 AS cnv3 WITH(NOLOCK) ON b.cod_conv=cnv3.cod_conv AND b.conv_suc=cnv3.conv_suc AND b.conv_cco=cnv3.conv_cco AND b.conv_cl1=cnv3.conv_cl1 AND b.conv_cl2=cnv3.conv_cl2 AND b.conv_cl3=cnv3.conv_cl3
LEFT OUTER JOIN dbo.inv_bodegas AS bdes WITH(NOLOCK) ON b.bod_des = bdes.cod_bod 
LEFT OUTER JOIN dbo.gen_sucursal AS sdes WITH(NOLOCK) ON b.suc_des = sdes.cod_suc 
LEFT OUTER JOIN dbo.cxp_afectacion AS ac WITH(NOLOCK) ON b.ind_afe=ac.Cod_afe
LEFT OUTER JOIN dbo.gen_ccosto AS x WITH(NOLOCK) ON b.cod_cco = x.cod_cco 
LEFT OUTER JOIN dbo.gen_clasif1 AS x1 WITH(NOLOCK) ON b.cod_cl1 = x1.codigo
LEFT OUTER JOIN dbo.gen_clasif2 AS x2 WITH(NOLOCK) ON b.cod_cl2 = x2.codigo
LEFT OUTER JOIN dbo.gen_clasif3 AS x3 WITH(NOLOCK) ON b.cod_cl3 = x3.codigo
LEFT OUTER JOIN dbo.gen_ccosto AS ccdes WITH(NOLOCK) ON b.cco_des = ccdes.cod_cco 
LEFT OUTER JOIN dbo.gen_clasif1 AS c1des WITH(NOLOCK) ON b.cl1_des = c1des.codigo
LEFT OUTER JOIN dbo.gen_clasif2 AS c2des WITH(NOLOCK) ON b.cl2_des = c2des.codigo
LEFT OUTER JOIN dbo.gen_clasif3 AS c3des WITH(NOLOCK) ON b.cl3_des = c3des.codigo
LEFT OUTER JOIN dbo.gen_ciudad AS t WITH(NOLOCK) ON a.ciu_doc = t.cod_ciu AND a.dep_doc = t.cod_dep AND a.pai_doc = t.cod_pai 
LEFT OUTER JOIN dbo.gen_deptos AS de WITH(NOLOCK) ON de.cod_pai=t.cod_pai AND de.cod_dep=t.cod_dep  
LEFT OUTER JOIN dbo.gen_paises AS pa WITH(NOLOCK) ON pa.cod_pai=t.cod_pai 
LEFT OUTER JOIN dbo.cxc_caunotacre AS cau WITH(NOLOCK) ON cau.cod_cau=a.cau_devol
LEFT OUTER JOIN dbo.inv_conceptos AS conc WITH(NOLOCK) ON conc.cod_con = a.cod_con
LEFT OUTER JOIN dbo.gen_retencion AS ret WITH(NOLOCK) ON ret.cod_ret=b.cod_ret
LEFT OUTER JOIN dbo.rhh_ConvCl4 AS cnv4 WITH(NOLOCK) ON b.cod_conv=cnv4.cod_conv AND b.conv_suc=cnv4.conv_suc AND b.conv_cco=cnv4.conv_cco AND b.conv_cl1=cnv4.conv_cl1 AND b.conv_cl2=cnv4.conv_cl2 
				AND b.conv_cl3=cnv4.conv_cl3 AND b.conv_cl4=cnv4.conv_cl4
LEFT OUTER JOIN dbo.rhh_ConvCl5 AS cnv5 WITH(NOLOCK) ON b.cod_conv=cnv5.cod_conv AND b.conv_suc=cnv5.conv_suc AND b.conv_cco=cnv5.conv_cco AND b.conv_cl1=cnv5.conv_cl1 AND b.conv_cl2=cnv5.conv_cl2 
				AND b.conv_cl3=cnv5.conv_cl3 AND b.conv_cl4=cnv5.conv_cl4 AND b.conv_cl5=cnv5.conv_cl5
LEFT OUTER JOIN dbo.rhh_ConvCl6 AS cnv6 WITH(NOLOCK) ON b.cod_conv=cnv6.cod_conv AND b.conv_suc=cnv6.conv_suc AND b.conv_cco=cnv6.conv_cco AND b.conv_cl1=cnv6.conv_cl1 AND b.conv_cl2=cnv6.conv_cl2 
				AND b.conv_cl3=cnv6.conv_cl3 AND b.conv_cl4=cnv6.conv_cl4 AND b.conv_cl5=cnv6.conv_cl5 AND b.conv_cl6=cnv6.conv_cl6
LEFT OUTER JOIN dbo.rhh_ConvCl7 AS cnv7 WITH(NOLOCK) ON b.cod_conv=cnv7.cod_conv AND b.conv_suc=cnv7.conv_suc AND b.conv_cco=cnv7.conv_cco AND b.conv_cl1=cnv7.conv_cl1 AND b.conv_cl2=cnv7.conv_cl2 
				AND b.conv_cl3=cnv7.conv_cl3 AND b.conv_cl4=cnv7.conv_cl4 AND b.conv_cl5=cnv7.conv_cl5 AND b.conv_cl6=cnv7.conv_cl6 AND b.conv_cl7=cnv7.conv_cl7
LEFT OUTER JOIN dbo.rhh_ConvCl8 AS cnv8 WITH(NOLOCK) ON b.cod_conv=cnv8.cod_conv AND b.conv_suc=cnv8.conv_suc AND b.conv_cco=cnv8.conv_cco AND b.conv_cl1=cnv8.conv_cl1 AND b.conv_cl2=cnv8.conv_cl2 
				AND b.conv_cl3=cnv8.conv_cl3 AND b.conv_cl4=cnv8.conv_cl4 AND b.conv_cl5=cnv8.conv_cl5 AND b.conv_cl6=cnv8.conv_cl6 AND b.conv_cl7=cnv8.conv_cl7 AND b.conv_cl8=cnv8.conv_cl8
LEFT OUTER JOIN dbo.cxc_succli AS scc WITH(NOLOCK) ON a.cliente=scc.cod_cli AND a.suc_cli=scc.suc_cli 
LEFT OUTER JOIN dbo.cxp_sucprov AS scp WITH(NOLOCK) ON a.provee=scp.cod_pro AND a.suc_pro=scp.suc_pro
LEFT OUTER JOIN dbo.gen_actividad AS act WITH(NOLOCK) ON a.pai_doc=act.cod_pai AND a.dep_doc=act.cod_dep AND a.ciu_doc=act.cod_ciu AND b.cod_ica=act.cod_act 
LEFT OUTER JOIN dbo.opr_contratos AS con WITH(NOLOCK) ON con.num_cto=b.num_cto
LEFT OUTER JOIN dbo.opr_sitios AS sit WITH(NOLOCK) ON sit.sit_cli = b.sit_cli AND sit.cod_cli=a.cliente
LEFT OUTER JOIN dbo.ptv_egresos AS egr WITH(NOLOCK) ON egr.cod_egr=b.cod_egr
LEFT OUTER JOIN dbo.fac_estadofacelec AS estd WITH(NOLOCK) ON estd.cod_est = a.est_dian
LEFT OUTER JOIN dbo.fac_estadofacelec AS estc WITH(NOLOCK) ON estc.cod_est = a.est_cliente
LEFT OUTER JOIN dbo.fac_tipofactura AS tipf WITH(NOLOCK) ON tipf.tipo_fact = a.tipo_fact
LEFT OUTER JOIN dbo.fac_tipoOpera AS toper WITH(NOLOCK) ON toper.tipo_oper = a.tipo_oper
LEFT OUTER JOIN dbo.inv_contmarco AS contm WITH(NOLOCK) ON contm.cod_cont = a.cont_marco
LEFT OUTER JOIN dbo.cxc_contcli_entpub AS contcli WITH(NOLOCK) ON contcli.cod_cli = a.cliente AND contcli.num_ctr = a.num_ctr
LEFT OUTER JOIN dbo.cxp_procprov AS procp WITH(NOLOCK) ON procp.cod_proc = a.cod_proc
UNION ALL
SELECT a.ano_doc, a.per_doc, '004' as sub_tip, a.num_doc, a.num_fac, a.fecha, a.hora, a.tasa, a.vendedor, a.vendedor2, a.cod_suc, a.cod_cco, a.cod_cl1, a.cod_cl2, 
	a.cod_cl3, a.cliente, a.provee, a.ind_aut, a.por_riv, a.por_ica, a.ind_tip, a.lista, a.dia_pla, a.anticipo, a.marca, a.cambio, a.cod_cif, a.valorcif, a.orden, 
	a.codpt, a.activa, a.canprod, a.ord_pro, a.can_ent, a.ano_odp, a.per_odp, a.cod_con, conc.nom_con, a.ant_doc, a.ind_mp, a.fec_tas, a.abono, a.tip_rec, a.num_rec, 
	a.val_efe, a.val_che, a.val_tar, a.val_otr, a.fec_cot, a.ano_dev, a.per_dev, a.sub_dev, a.num_dev, a.ano_ant, a.per_ant, a.sub_ant, 
	a.num_ant AS num_ant_cab, a.for_pag, a.req_orc, a.obs_orc, a.fac_pro, a.ind_pre, a.ind_ext, a.tip_act, a.ind_pri, a.doc_ref, a.age_ret, a.ind_tas, 
	a.cod_inco, a.fec_emb, a.fec_dec, a.fec_imp, a.num_emb, a.num_guia, a.via_tra, a.fec_ven, a.fec_entrega, a.dec_impo, a.nun_man, a.fec_man, 
	a.doc_tra, a.fec_tra, a.peso_tot, a.por_flete1, a.por_flete2, a.por_flete3, a.fac_ven, a.fac_fec, a.fec_guia, a.fec_zadu, a.emp_tra, a.mon_ori, a.fac_usd, 
	a.peso_real, a.cod_etrans, a.FechaRecFac, a.FechaRadVB, a.FechaAprVB, a.FechaEnCla, a.FechaLlaBo, a.cod_embala, a.pai_proc, a.cnt_dec, 
	a.usuario, a.fec_grab, a.cod_caja, a.est_doc AS est_doc_cab, a.ana_req, a.rep_veh, a.tip_res, a.ind_gas, a.cod_res, a.num_pro, a.sub_odp, a.suc_ped, 
	a.bod_ped, a.fec_eop, b.reg_doc, b.serie, b.despa, b.pedido, b.bodega, b.bod_des, b.cant_uni, b.item, b.alterno, b.trans, b.cantidad, b.fac_con, 
	b.cos_uni, b.cos_tot, b.pre_vta, b.pre_tot, b.por_des, b.mon_des, b.ven_net, b.imp_con, b.por_iva, b.por_iva_ng, b.mon_iva, b.mon_iva_ng, b.val_tot, 
	b.val_uni, b.por_ret, b.mon_ret, b.ret_iva, b.ret_iva_ng, b.ret_ica, b.cob_ica, b.val_def, b.por_com, b.mon_com, b.sal_ped, b.des_ped, b.fin_cap, b.cos_toa, 
	b.cos_unai, b.fec_ent, b.etapa, b.cod_prt, b.clase, b.candesp, b.ind_des, b.sustide, b.numop, b.vcifitem, b.itemop, b.ano_ped, b.per_ped, b.sub_ped, 
	b.ano_des, b.per_des, b.sub_des, b.suc_des, b.reg_ped, b.reg_des, b.cou_ext, b.cot_ext, b.prv_ext, b.prt_ext, b.des_ext, b.pre_cnv, b.ven_lote, 
	b.cod_lote, b.valor_pesos, b.cod_pla, b.cod_ter, b.ref_item, b.cod_talla, b.cod_color, b.val_flete1, b.val_flete2, b.val_flete3, b.por_seg1, b.por_seg2, 
	b.por_seg3, b.val_seg1, b.val_seg2, b.val_seg3, b.pes_bruto, b.pes_neto, b.num_bultos, b.cod_emba, b.und_com, b.cod_mer, b.por_otros1, 
	b.por_otros2, b.por_otros3, b.val_otros1, b.val_otros2, b.val_otros3, b.can_leg, b.cod_ori, b.no_caja, b.no_bulto, b.pais_origen, b.prt_fob, b.pais_proc, 
	b.prv_ori, b.prt_ori, b.und_reg, b.val_fleori1, b.val_fleori2, b.val_fleori3, b.val_segori1, b.val_segori2, b.val_segori3, b.val_otrori1, b.val_otrori2, 
	b.val_otrori3, b.pru_fob, b.val_fleteuni1, b.val_fleteuni2, b.val_fleteuni3, b.mar_dec, b.paq_dec, b.flete, b.seguro, b.otros, b.val_ant, b.cod_egr, 
	b.num_ant, b.reg_ant, b.est_doc, b.cod_vehi, b.factor_usd, b.fecha_factor, b.valor_tasa, b.val_flepes1, b.val_flepes2, b.val_segpes1, b.val_segpes2, 
	b.val_otrpes1, b.val_otrpes2, b.val_ajuori1, b.val_aju1, b.val_ajupes1, b.descrip_cue, '004' as tip_doc, s.nom_suc, c.nom_cco, c1.nombre AS nom_cl1, 
	c2.nombre AS nom_cl2, c3.nombre AS nom_cl3, i.des_item, d.nom_bod, f.des_con, cli.nom_cli, cli.di1_cli AS dir_cli, cli.te1_cli AS tel_cli, pro.rso, 
	pro.di1 AS dir_pro, pro.te1 AS tel_pro, v.nom_ven, lis.des_lis, mon.des_mon, cli.nit_cli, cnv.nom_conv,a.cod_ter AS ter_cab,ter.ter_nombre,
	a.usu_autoriza,b.ind_aut AS aut_cue,b.key_prc,b.cod_conv,b.conv_suc,b.conv_cco,b.conv_cl1,b.conv_cl2,b.conv_cl3,cnvs.conv_suc_des,cnvc.conv_cco_des,
	cnv1.conv_cl1_des,cnv2.conv_cl2_des,cnv3.conv_cl3_des,b.cod_rubro,b.ind_refac,bdes.nom_bod AS nom_bod_des,sdes.nom_suc AS nom_suc_des,ac.Nom_afe, x.nom_cco AS nom_ccocue,
	x1.nombre AS nom_cl1cue,x2.nombre AS nom_cl2cue,x3.nombre AS nom_cl3cue,b.cod_cco AS cco_cue,b.cod_cl1 AS cl1_cue,b.cod_cl2 AS cl2_cue,b.cod_cl3 AS cl3_cue, 
	ccdes.nom_cco AS nom_ccodes,c1des.nombre AS nom_cl1des,c2des.nombre AS nom_cl2des,c3des.nombre AS nom_cl3des,
	b.cco_des,b.cl1_des,b.cl2_des,b.cl3_des,b.tar_ica,t.nom_ciu,pa.nom_pai,de.nom_dep,pro.rep,pro.fax AS fax_pro,pro.e_mail AS mail_prov,
	cli.jef_com,cli.fax_cli,cli.e_mail AS mail_cli,a.cau_devol,cau.des_cau,b.tar_rii,b.tar_rii_ng,b.por_sum1,b.por_sum2,b.por_sum3,b.por_sum4,b.por_res1,
	b.por_res2,b.por_res3,b.por_res4,b.mon_sum1,b.mon_sum2,b.mon_sum3,b.mon_sum4,b.mon_res1,b.mon_res2,b.mon_res3,b.mon_res4,b.cod_ret,ret.nombre AS nom_ret,b.usu_aut_req,
	b.por_vol,b.des_vol,b.conv_cl4,b.conv_cl5,b.conv_cl6,b.conv_cl7,b.conv_cl8,cnv4.conv_cl4_des,cnv5.conv_cl5_des,cnv6.conv_cl6_des,cnv7.conv_cl7_des,cnv8.conv_cl8_des,
	a.suc_cli,scc.nom_suc AS nom_succli,scp.nom_suc AS nom_sucpro,b.cod_ica,act.nom_act,b.num_cto,con.descripcion AS des_cto,b.sit_cli,sit.nom_sit,b.pla_opr, b.val_def_fis,
	b.base_iva_aiu, egr.descrip AS nom_egreso,a.nro_resol, a.est_dian, estd.des_est AS des_est_dian, a.est_cliente, estc.des_est AS des_est_cliente, a.cod_cufe, a.guid_envio, a.LDF_fe,
	b.ano_ant AS ano_ant_cue, b.per_ant AS per_ant_cue, b.sub_ant AS sub_ant_cue, b.num_ant AS num_ant_cue, b.reg_ant AS reg_ant_cue, a.tipo_fact, tipf.descrip_tipo,
	a.tipo_oper, toper.descrip_oper, a.cont_marco, contm.nom_cont,a.cod_cude,b.ocom_cli,b.fec_Ocomcli, a.num_ctr, contcli.num_ent, a.cod_proc, procp.nom_proc,
	a.Link_fe,a.fto_fac,a.lote_facture,a.Nro_SVT,a.cod_cuds,a.obs_orc1,a.obs_orc2,a.obs_orc3,a.obs_orc4,a.obs_orc5
FROM dbo.inv_cabdoc AS a WITH(NOLOCK) 
INNER JOIN dbo.inv_cuedoc AS b WITH(NOLOCK) ON a.ano_doc = b.ano_doc AND a.per_doc = b.per_doc AND a.sub_tip = b.sub_tip AND a.num_doc = b.num_doc 
INNER JOIN dbo.gen_sucursal AS s WITH(NOLOCK) ON a.cod_suc = s.cod_suc 
INNER JOIN dbo.gen_ccosto AS c WITH(NOLOCK) ON a.cod_cco = c.cod_cco 
INNER JOIN dbo.gen_clasif1 AS c1 WITH(NOLOCK) ON a.cod_cl1 = c1.codigo 
INNER JOIN dbo.gen_clasif2 AS c2 WITH(NOLOCK) ON a.cod_cl2 = c2.codigo 
INNER JOIN dbo.gen_clasif3 AS c3 WITH(NOLOCK) ON a.cod_cl3 = c3.codigo 
INNER JOIN dbo.inv_items AS i WITH(NOLOCK) ON b.item = i.cod_item 
INNER JOIN dbo.inv_bodegas AS d WITH(NOLOCK) ON b.bodega = d.cod_bod 
LEFT OUTER JOIN dbo.gen_vendedor AS v WITH(NOLOCK) ON a.vendedor = v.cod_ven 
LEFT OUTER JOIN dbo.inv_tabconv AS f WITH(NOLOCK) ON b.item = f.cod_item AND b.fac_con = f.cod_con 
LEFT OUTER JOIN dbo.cxc_cliente AS cli WITH(NOLOCK) ON a.cliente = cli.cod_cli 
LEFT OUTER JOIN dbo.cxp_provee AS pro WITH(NOLOCK) ON a.provee = pro.provee 
LEFT OUTER JOIN dbo.inv_listas AS lis WITH(NOLOCK) ON a.lista = lis.cod_lis 
LEFT OUTER JOIN dbo.gen_monedas AS mon WITH(NOLOCK) ON a.ind_mp = mon.cod_mon 
LEFT OUTER JOIN dbo.rhh_Convenio As cnv WITH(NOLOCK) ON b.cod_conv=cnv.cod_conv 
LEFT OUTER JOIN dbo.gen_terceros AS ter WITH(NOLOCK) ON a.cod_ter=ter.ter_nit 
LEFT OUTER JOIN dbo.rhh_ConvSuc AS cnvs WITH(NOLOCK) ON b.cod_conv=cnvs.cod_conv AND b.conv_suc=cnvs.conv_suc 
LEFT OUTER JOIN dbo.rhh_ConvCco AS cnvc WITH(NOLOCK) ON b.cod_conv=cnvc.cod_conv AND b.conv_suc=cnvc.conv_suc AND b.conv_cco=cnvc.conv_cco
LEFT OUTER JOIN dbo.rhh_ConvCl1 AS cnv1 WITH(NOLOCK) ON b.cod_conv=cnv1.cod_conv AND b.conv_suc=cnv1.conv_suc AND b.conv_cco=cnv1.conv_cco AND b.conv_cl1=cnv1.conv_cl1
LEFT OUTER JOIN dbo.rhh_ConvCl2 AS cnv2 WITH(NOLOCK) ON b.cod_conv=cnv2.cod_conv AND b.conv_suc=cnv2.conv_suc AND b.conv_cco=cnv2.conv_cco AND b.conv_cl1=cnv2.conv_cl1 AND b.conv_cl2=cnv2.conv_cl2
LEFT OUTER JOIN dbo.rhh_ConvCl3 AS cnv3 WITH(NOLOCK) ON b.cod_conv=cnv3.cod_conv AND b.conv_suc=cnv3.conv_suc AND b.conv_cco=cnv3.conv_cco AND b.conv_cl1=cnv3.conv_cl1 AND b.conv_cl2=cnv3.conv_cl2 AND b.conv_cl3=cnv3.conv_cl3
LEFT OUTER JOIN dbo.inv_bodegas AS bdes WITH(NOLOCK) ON b.bod_des = bdes.cod_bod 
LEFT OUTER JOIN dbo.gen_sucursal AS sdes WITH(NOLOCK) ON b.suc_des = sdes.cod_suc 
LEFT OUTER JOIN dbo.cxp_afectacion AS ac WITH(NOLOCK) ON b.ind_afe=ac.Cod_afe
LEFT OUTER JOIN dbo.gen_ccosto AS x WITH(NOLOCK) ON b.cod_cco = x.cod_cco 
LEFT OUTER JOIN dbo.gen_clasif1 AS x1 WITH(NOLOCK) ON b.cod_cl1 = x1.codigo
LEFT OUTER JOIN dbo.gen_clasif2 AS x2 WITH(NOLOCK) ON b.cod_cl2 = x2.codigo
LEFT OUTER JOIN dbo.gen_clasif3 AS x3 WITH(NOLOCK) ON b.cod_cl3 = x3.codigo
LEFT OUTER JOIN dbo.gen_ccosto AS ccdes WITH(NOLOCK) ON b.cco_des = ccdes.cod_cco 
LEFT OUTER JOIN dbo.gen_clasif1 AS c1des WITH(NOLOCK) ON b.cl1_des = c1des.codigo
LEFT OUTER JOIN dbo.gen_clasif2 AS c2des WITH(NOLOCK) ON b.cl2_des = c2des.codigo
LEFT OUTER JOIN dbo.gen_clasif3 AS c3des WITH(NOLOCK) ON b.cl3_des = c3des.codigo
LEFT OUTER JOIN dbo.gen_ciudad AS t WITH(NOLOCK) ON a.ciu_doc = t.cod_ciu AND a.dep_doc = t.cod_dep AND a.pai_doc = t.cod_pai 
LEFT OUTER JOIN dbo.gen_deptos AS de WITH(NOLOCK) ON de.cod_pai=t.cod_pai AND de.cod_dep=t.cod_dep  
LEFT OUTER JOIN dbo.gen_paises AS pa WITH(NOLOCK) ON pa.cod_pai=t.cod_pai 
LEFT OUTER JOIN dbo.cxc_caunotacre AS cau WITH(NOLOCK) ON cau.cod_cau=a.cau_devol
LEFT OUTER JOIN dbo.inv_conceptos AS conc WITH(NOLOCK) ON conc.cod_con = a.cod_con
LEFT OUTER JOIN dbo.gen_retencion AS ret WITH(NOLOCK) ON ret.cod_ret=b.cod_ret
LEFT OUTER JOIN dbo.rhh_ConvCl4 AS cnv4 WITH(NOLOCK) ON b.cod_conv=cnv4.cod_conv AND b.conv_suc=cnv4.conv_suc AND b.conv_cco=cnv4.conv_cco AND b.conv_cl1=cnv4.conv_cl1 AND b.conv_cl2=cnv4.conv_cl2 
				AND b.conv_cl3=cnv4.conv_cl3 AND b.conv_cl4=cnv4.conv_cl4
LEFT OUTER JOIN dbo.rhh_ConvCl5 AS cnv5 WITH(NOLOCK) ON b.cod_conv=cnv5.cod_conv AND b.conv_suc=cnv5.conv_suc AND b.conv_cco=cnv5.conv_cco AND b.conv_cl1=cnv5.conv_cl1 AND b.conv_cl2=cnv5.conv_cl2 
				AND b.conv_cl3=cnv5.conv_cl3 AND b.conv_cl4=cnv5.conv_cl4 AND b.conv_cl5=cnv5.conv_cl5
LEFT OUTER JOIN dbo.rhh_ConvCl6 AS cnv6 WITH(NOLOCK) ON b.cod_conv=cnv6.cod_conv AND b.conv_suc=cnv6.conv_suc AND b.conv_cco=cnv6.conv_cco AND b.conv_cl1=cnv6.conv_cl1 AND b.conv_cl2=cnv6.conv_cl2 
				AND b.conv_cl3=cnv6.conv_cl3 AND b.conv_cl4=cnv6.conv_cl4 AND b.conv_cl5=cnv6.conv_cl5 AND b.conv_cl6=cnv6.conv_cl6
LEFT OUTER JOIN dbo.rhh_ConvCl7 AS cnv7 WITH(NOLOCK) ON b.cod_conv=cnv7.cod_conv AND b.conv_suc=cnv7.conv_suc AND b.conv_cco=cnv7.conv_cco AND b.conv_cl1=cnv7.conv_cl1 AND b.conv_cl2=cnv7.conv_cl2 
				AND b.conv_cl3=cnv7.conv_cl3 AND b.conv_cl4=cnv7.conv_cl4 AND b.conv_cl5=cnv7.conv_cl5 AND b.conv_cl6=cnv7.conv_cl6 AND b.conv_cl7=cnv7.conv_cl7
LEFT OUTER JOIN dbo.rhh_ConvCl8 AS cnv8 WITH(NOLOCK) ON b.cod_conv=cnv8.cod_conv AND b.conv_suc=cnv8.conv_suc AND b.conv_cco=cnv8.conv_cco AND b.conv_cl1=cnv8.conv_cl1 AND b.conv_cl2=cnv8.conv_cl2 
				AND b.conv_cl3=cnv8.conv_cl3 AND b.conv_cl4=cnv8.conv_cl4 AND b.conv_cl5=cnv8.conv_cl5 AND b.conv_cl6=cnv8.conv_cl6 AND b.conv_cl7=cnv8.conv_cl7 AND b.conv_cl8=cnv8.conv_cl8
LEFT OUTER JOIN dbo.cxc_succli AS scc WITH(NOLOCK) ON a.cliente=scc.cod_cli AND a.suc_cli=scc.suc_cli
LEFT OUTER JOIN dbo.cxp_sucprov AS scp WITH(NOLOCK) ON a.provee=scp.cod_pro AND a.suc_pro=scp.suc_pro
LEFT OUTER JOIN dbo.gen_actividad AS act WITH(NOLOCK) ON a.pai_doc=act.cod_pai AND a.dep_doc=act.cod_dep AND a.ciu_doc=act.cod_ciu AND b.cod_ica=act.cod_act
LEFT OUTER JOIN dbo.opr_contratos AS con WITH(NOLOCK) ON con.num_cto=b.num_cto
LEFT OUTER JOIN dbo.opr_sitios AS sit WITH(NOLOCK) ON sit.sit_cli = b.sit_cli AND sit.cod_cli=a.cliente
LEFT OUTER JOIN dbo.ptv_egresos AS egr WITH(NOLOCK) ON egr.cod_egr=b.cod_egr
LEFT OUTER JOIN dbo.fac_estadofacelec AS estd WITH(NOLOCK) ON estd.cod_est = a.est_dian
LEFT OUTER JOIN dbo.fac_estadofacelec AS estc WITH(NOLOCK) ON estc.cod_est = a.est_cliente
LEFT OUTER JOIN dbo.fac_tipofactura AS tipf WITH(NOLOCK) ON tipf.tipo_fact = a.tipo_fact
LEFT OUTER JOIN dbo.fac_tipoOpera AS toper WITH(NOLOCK) ON toper.tipo_oper = a.tipo_oper
LEFT OUTER JOIN dbo.inv_contmarco AS contm WITH(NOLOCK) ON contm.cod_cont = a.cont_marco
LEFT OUTER JOIN dbo.cxc_contcli_entpub AS contcli WITH(NOLOCK) ON contcli.cod_cli = a.cliente AND contcli.num_ctr = a.num_ctr
LEFT OUTER JOIN dbo.cxp_procprov AS procp WITH(NOLOCK) ON procp.cod_proc = a.cod_proc
WHERE a.tip_doc='003'

```
