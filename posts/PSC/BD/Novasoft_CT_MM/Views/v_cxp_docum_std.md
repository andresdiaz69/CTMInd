# View: v_cxp_docum_std

## Usa los objetos:
- [[cxp_cabdoc]]
- [[cxp_categinfcon]]
- [[cxp_cuedoc]]
- [[cxp_mlegaliza]]
- [[cxp_procprov]]
- [[cxp_provee]]
- [[cxp_sucprov]]
- [[fac_tipofactura]]
- [[gen_actividad]]
- [[gen_bancos]]
- [[gen_ccosto]]
- [[gen_ciudad]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_deptos]]
- [[gen_monedas]]
- [[gen_paises]]
- [[gen_sucursal]]

```sql

CREATE VIEW [dbo].[v_cxp_docum_std]
AS
SELECT        a.fch_doc, a.cod_ciu, a.cod_dep, a.cod_pai, a.det_doc, a.num_che AS num_che_cab, a.for_pag, a.dia_pla, a.cambio, a.fec_tas, a.tasa, a.ind_mp, a.apl_ori, a.ano_anu, a.per_anu, a.sub_anu, a.num_anu, b.ano_doc, b.per_doc, 
                         b.tip_doc, b.sub_tip, b.num_doc, b.reg_doc, b.trans, b.cod_pro, b.ano_ref, b.per_ref, b.sub_ref, b.num_ref, b.fec_ven, b.val_fac, b.val_doc, b.sal_doc, b.por_iva, b.val_iva, b.ret_iva, b.sub_doc, b.por_des, b.val_des, b.net_doc, 
                         b.por_ret, b.val_ret, b.ant_doc, b.doc_ant, b.dia_ven, b.val_ica, b.por_ica, b.por_riv, b.ano_ant, b.per_ant, b.sub_ant, b.cod_cl1, b.cod_cl2, b.cod_cl3, b.cod_suc, b.cod_cco, b.ind_con, b.final, b.reg_ant, b.numche, b.ban_pos, 
                         b.fec_che, b.num_che, b.may_val, b.men_val, b.tip_ret, b.reg_ref, b.cod_cat, b.ind_afe, b.por_tim, b.val_tim, b.pre_fac, b.val_pag, b.fec_pag, p.rso, s.nom_suc, o.nom_cco, c1.nombre AS nom_cl1, c2.nombre AS nom_cl2, 
                         c3.nombre AS nom_cl3, m.des_mon, t.nom_ciu, bn.nom_ban, a.num_fac, p.nce, p.di1, p.te1, de.nom_dep, pa.nom_pai, cat.des_cat, leg.des_leg, a.cod_leg, b.por_sum1, b.por_sum2, b.por_sum3, b.por_sum4, b.por_res1, 
                         b.por_res2, b.por_res3, b.por_res4, b.mon_sum1, b.mon_sum2, b.mon_sum3, b.mon_sum4, b.mon_res1, b.mon_res2, b.mon_res3, b.mon_res4, a.fec_grab, scp.suc_pro, scp.nom_suc AS nom_suc_pro, b.cod_ica, act.nom_act, 
                         b.val_iva_ng,a.ind_aju1819,nro_resol, a.cod_proc, pro.nom_proc, a.tipo_fact, tfac.descrip_tipo, a.cod_cuds,a.est_dian,a.est_cliente,a.lote_facture,a.LDF_fe,a.link_fe,a.guid_envio,a.cau_devol
FROM            dbo.cxp_cabdoc AS a WITH (NOLOCK) INNER JOIN
                         dbo.cxp_cuedoc AS b WITH (NOLOCK) ON a.ano_doc = b.ano_doc AND a.per_doc = b.per_doc AND a.sub_tip = b.sub_tip AND a.num_doc = b.num_doc INNER JOIN
                         dbo.cxp_provee AS p WITH (NOLOCK) ON b.cod_pro = p.provee INNER JOIN
                         dbo.gen_sucursal AS s WITH (NOLOCK) ON b.cod_suc = s.cod_suc INNER JOIN
                         dbo.gen_ccosto AS o WITH (NOLOCK) ON b.cod_cco = o.cod_cco INNER JOIN
                         dbo.gen_clasif1 AS c1 WITH (NOLOCK) ON b.cod_cl1 = c1.codigo INNER JOIN
                         dbo.gen_clasif2 AS c2 WITH (NOLOCK) ON b.cod_cl2 = c2.codigo INNER JOIN
                         dbo.gen_clasif3 AS c3 WITH (NOLOCK) ON b.cod_cl3 = c3.codigo INNER JOIN
                         dbo.gen_monedas AS m WITH (NOLOCK) ON a.ind_mp = m.cod_mon INNER JOIN
                         dbo.gen_ciudad AS t WITH (NOLOCK) ON a.cod_ciu = t.cod_ciu AND a.cod_dep = t.cod_dep AND a.cod_pai = t.cod_pai LEFT OUTER JOIN
                         dbo.gen_bancos AS bn WITH (NOLOCK) ON b.ban_pos = bn.cod_ban INNER JOIN
                         dbo.gen_deptos AS de WITH (NOLOCK) ON de.cod_pai = t.cod_pai AND de.cod_dep = t.cod_dep INNER JOIN
                         dbo.gen_paises AS pa WITH (NOLOCK) ON pa.cod_pai = t.cod_pai LEFT OUTER JOIN
                         dbo.cxp_categinfcon AS cat WITH (NOLOCK) ON b.cod_cat = cat.cod_cat LEFT OUTER JOIN
                         dbo.cxp_mlegaliza AS leg WITH (NOLOCK) ON a.cod_leg = leg.cod_leg LEFT OUTER JOIN
                         dbo.cxp_sucprov AS scp WITH (NOLOCK) ON a.proveedor = scp.cod_pro AND a.suc_pro = scp.suc_pro LEFT OUTER JOIN
                         dbo.gen_actividad AS act WITH (NOLOCK) ON a.cod_pai = act.cod_pai AND a.cod_dep = act.cod_dep AND a.cod_ciu = act.cod_ciu AND b.cod_ica = act.cod_act LEFT OUTER JOIN
						 dbo.cxp_procprov AS pro WITH (NOLOCK) ON a.cod_proc = pro.cod_proc LEFT OUTER JOIN
						 dbo.fac_tipofactura AS tfac WITH (NOLOCK) ON a.tipo_fact = tfac.tipo_fact

```
