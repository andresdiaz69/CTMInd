# View: v_inv_ventas

## Usa los objetos:
- [[cxc_cliente]]
- [[cxc_zona]]
- [[gen_ccosto]]
- [[gen_ciudad]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_sucursal]]
- [[gen_vendedor]]
- [[inv_cabdoc]]
- [[inv_cuedoc]]
- [[inv_items]]

```sql

CREATE VIEW [dbo].[v_inv_ventas] AS
SELECT     cli.nom_cli, cli.cod_zon, cli.tip_mon, cab.fecha, cab.vendedor, cab.cambio, cab.cod_suc, cab.cod_cco, cab.cod_cl1, cab.cod_cl2, cab.cod_cl3, 
                      cab.cliente, cab.lista, cab.fec_tas, cab.tasa, cue.ano_doc, cue.per_doc, cue.tip_doc, cue.num_doc, cue.reg_doc, cue.serie, cue.despa, cue.pedido, 
                      cue.bodega, cue.bod_des, cue.cant_uni, cue.item, cue.alterno, cue.trans, cue.cantidad, cue.fac_con, cue.cos_uni, cue.cos_tot, cue.pre_vta, cue.pre_tot, 
                      cue.por_des, cue.mon_des, cue.ven_net, cue.imp_con, cue.por_iva, cue.por_iva_ng, cue.mon_iva, cue.mon_iva_ng, cue.val_tot, cue.val_uni, 
                      cue.por_ret, cue.mon_ret, cue.ret_iva, cue.ret_ica, cue.cob_ica, cue.val_def, cue.por_com, cue.mon_com, cue.sal_ped, cue.des_ped, cue.fin_cap, 
                      cue.cos_toa, cue.cos_unai, cue.fec_ent, cue.etapa, cue.cod_prt, cue.clase, cue.candesp, cue.ind_des, cue.sustide, cue.numop, cue.vcifitem, 
                      cue.itemop, cue.ano_ped, cue.per_ped, cue.sub_ped, cue.ano_des, cue.per_des, cue.sub_des, cue.suc_des, cue.reg_ped, cue.reg_des, cue.cou_ext, 
                      cue.cot_ext, cue.prv_ext, cue.prt_ext, cue.des_ext, cue.pre_cnv, cue.ven_lote, cue.cod_lote, cue.valor_pesos, cue.cod_pla, cue.cod_ter, cue.ref_item, 
                      cue.cod_talla, cue.cod_color, cue.val_flete1, cue.val_flete2, cue.val_flete3, cue.por_seg1, cue.por_seg2, cue.por_seg3, cue.val_seg1, cue.val_seg2, 
                      cue.val_seg3, cue.pes_bruto, cue.pes_neto, cue.num_bultos, cue.cod_emba, cue.und_com, cue.cod_mer, cue.por_otros1, cue.por_otros2, 
                      cue.por_otros3, cue.val_otros1, cue.val_otros2, cue.val_otros3, cue.can_leg, cue.cod_ori, cue.no_caja, cue.no_bulto, cue.pais_origen, cue.prt_fob, 
                      cue.pais_proc, cue.prv_ori, cue.prt_ori, cue.und_reg, cue.val_fleori1, cue.val_fleori2, cue.val_fleori3, cue.val_segori1, cue.val_segori2, 
                      cue.val_segori3, cue.val_otrori1, cue.val_otrori2, cue.val_otrori3, cue.pru_fob, cue.val_fleteuni1, cue.val_fleteuni2, cue.val_fleteuni3, cue.mar_dec, 
                      cue.paq_dec, cue.flete, cue.seguro, cue.otros, cue.val_ant, cue.cod_egr, cue.num_ant, cue.reg_ant, item.des_item, cli.cod_ciu, ciu.nom_ciu, 
                      ven.nom_ven, zona.nom_zon, suc.nom_suc, ccosto.nom_cco, cab.sub_tip, cab.ind_mp,
					cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, ciu.cod_pai
FROM         dbo.inv_cabdoc AS cab WITH(NOLOCK) 
	INNER JOIN dbo.inv_cuedoc AS cue WITH(NOLOCK) ON cab.ano_doc = cue.ano_doc AND cab.per_doc = cue.per_doc AND cab.tip_doc = cue.tip_doc AND cab.num_doc = cue.num_doc 
	INNER JOIN dbo.cxc_cliente AS cli WITH(NOLOCK) ON cab.cliente = cli.cod_cli 
	INNER JOIN dbo.inv_items AS item WITH(NOLOCK) ON cue.item = item.cod_item 
	INNER JOIN dbo.gen_ciudad AS ciu WITH(NOLOCK) ON cli.cod_ciu = ciu.cod_ciu AND cli.cod_dep=ciu.cod_dep AND cli.cod_pai=ciu.cod_pai 
	INNER JOIN dbo.gen_vendedor AS ven WITH(NOLOCK) ON cab.vendedor = ven.cod_ven 
	INNER JOIN dbo.cxc_zona AS zona WITH(NOLOCK) ON cli.cod_zon = zona.cod_zon 
	INNER JOIN dbo.gen_sucursal AS suc WITH(NOLOCK) ON cab.cod_suc = suc.cod_suc 
	INNER JOIN dbo.gen_ccosto AS ccosto WITH(NOLOCK) ON cab.cod_cco = ccosto.cod_cco
	INNER JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON cab.cod_cl1 =cl1.codigo
	INNER JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON cab.cod_cl2 =cl2.codigo
	INNER JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON cab.cod_cl3 =cl3.codigo
WHERE     (cue.tip_doc IN ('010', '510')) AND (cab.cambio = '0')
UNION ALL SELECT     cli.nom_cli, cli.cod_zon, cli.tip_mon, cab.fecha, cab.vendedor, cab.cambio, cab.cod_suc, cab.cod_cco, cab.cod_cl1, cab.cod_cl2, cab.cod_cl3, 
                      cab.cliente, cab.lista, cab.fec_tas, cab.tasa, cue.ano_doc, cue.per_doc, cue.tip_doc, cue.num_doc, cue.reg_doc, cue.serie, cue.despa, cue.pedido, 
                      cue.bodega, cue.bod_des, cue.cant_uni, cue.item, cue.alterno, cue.trans, cue.cantidad, cue.fac_con, cue.cos_uni, cue.cos_tot, cue.pre_vta, -(cue.pre_tot) AS pre_tot, 
                      cue.por_des, cue.mon_des, -(cue.ven_net) as ven_net, cue.imp_con, cue.por_iva, cue.por_iva_ng, cue.mon_iva, cue.mon_iva_ng, cue.val_tot, cue.val_uni, 
                      cue.por_ret, cue.mon_ret, cue.ret_iva, cue.ret_ica, cue.cob_ica, -(cue.val_def) as val_def, cue.por_com, cue.mon_com, cue.sal_ped, cue.des_ped, cue.fin_cap, 
                      cue.cos_toa, cue.cos_unai, cue.fec_ent, cue.etapa, cue.cod_prt, cue.clase, cue.candesp, cue.ind_des, cue.sustide, cue.numop, cue.vcifitem, 
                      cue.itemop, cue.ano_ped, cue.per_ped, cue.sub_ped, cue.ano_des, cue.per_des, cue.sub_des, cue.suc_des, cue.reg_ped, cue.reg_des, cue.cou_ext, 
                      cue.cot_ext, cue.prv_ext, cue.prt_ext, cue.des_ext, cue.pre_cnv, cue.ven_lote, cue.cod_lote, cue.valor_pesos, cue.cod_pla, cue.cod_ter, cue.ref_item, 
                      cue.cod_talla, cue.cod_color, cue.val_flete1, cue.val_flete2, cue.val_flete3, cue.por_seg1, cue.por_seg2, cue.por_seg3, cue.val_seg1, cue.val_seg2, 
                      cue.val_seg3, cue.pes_bruto, cue.pes_neto, cue.num_bultos, cue.cod_emba, cue.und_com, cue.cod_mer, cue.por_otros1, cue.por_otros2, 
                      cue.por_otros3, cue.val_otros1, cue.val_otros2, cue.val_otros3, cue.can_leg, cue.cod_ori, cue.no_caja, cue.no_bulto, cue.pais_origen, cue.prt_fob, 
                      cue.pais_proc, cue.prv_ori, cue.prt_ori, cue.und_reg, cue.val_fleori1, cue.val_fleori2, cue.val_fleori3, cue.val_segori1, cue.val_segori2, 
                      cue.val_segori3, cue.val_otrori1, cue.val_otrori2, cue.val_otrori3, cue.pru_fob, cue.val_fleteuni1, cue.val_fleteuni2, cue.val_fleteuni3, cue.mar_dec, 
                      cue.paq_dec, cue.flete, cue.seguro, cue.otros, cue.val_ant, cue.cod_egr, cue.num_ant, cue.reg_ant, item.des_item, cli.cod_ciu, ciu.nom_ciu, 
                      ven.nom_ven, zona.nom_zon, suc.nom_suc, ccosto.nom_cco, cab.sub_tip, cab.ind_mp,
					cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, ciu.cod_pai
FROM         dbo.inv_cabdoc AS cab WITH(NOLOCK) 
		INNER JOIN dbo.inv_cuedoc AS cue WITH(NOLOCK) ON cab.ano_doc = cue.ano_doc AND cab.per_doc = cue.per_doc AND cab.tip_doc = cue.tip_doc AND cab.num_doc = cue.num_doc 
		INNER JOIN dbo.cxc_cliente AS cli WITH(NOLOCK) ON cab.cliente = cli.cod_cli 
		INNER JOIN dbo.inv_items AS item WITH(NOLOCK) ON cue.item = item.cod_item 
		INNER JOIN dbo.gen_ciudad AS ciu WITH(NOLOCK) ON cli.cod_ciu = ciu.cod_ciu AND cli.cod_dep=ciu.cod_dep AND cli.cod_pai=ciu.cod_pai 
		INNER JOIN dbo.gen_vendedor AS ven WITH(NOLOCK) ON cab.vendedor = ven.cod_ven 
		INNER JOIN dbo.cxc_zona AS zona WITH(NOLOCK) ON cli.cod_zon = zona.cod_zon 
		INNER JOIN dbo.gen_sucursal AS suc WITH(NOLOCK) ON cab.cod_suc = suc.cod_suc 
		INNER JOIN dbo.gen_ccosto AS ccosto WITH(NOLOCK) ON cab.cod_cco = ccosto.cod_cco
		INNER JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON cab.cod_cl1 =cl1.codigo
		INNER JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON cab.cod_cl2 =cl2.codigo
		INNER JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON cab.cod_cl3 =cl3.codigo
WHERE     (cue.tip_doc IN ('302')) AND (cab.cambio = '0')

```
