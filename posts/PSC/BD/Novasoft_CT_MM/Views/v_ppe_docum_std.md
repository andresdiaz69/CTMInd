# View: v_ppe_docum_std

## Usa los objetos:
- [[cxp_provee]]
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_monedas]]
- [[gen_sucursal]]
- [[gen_terceros]]
- [[gen_ubicacion]]
- [[inv_bodegas]]
- [[inv_items]]
- [[ppe_activos]]
- [[ppe_cabdoc]]
- [[ppe_cuedoc]]
- [[ppe_entidades]]
- [[ppe_tipoadq]]

```sql

/* VISTA DE LAS TABLAS DE DOCUMENTOS DE PROPIEDAD PLANTA Y EQUIPO CON LAS FORANEAS DE DOCUMENTOS CON SUS DESCRIPCIONES
 JSARMIENTO DICIEMBRE/2013
 -- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)*/
CREATE VIEW [dbo].[v_ppe_docum_std]
AS
SELECT     a.ano_doc, a.per_doc, a.tip_doc, a.sub_tip, a.num_doc, a.fec_doc, a.det_doc, a.ano_ref, a.per_ref, a.sub_ref, a.num_ref, a.cambio, a.cod_pro, a.num_fac, a.fec_tas, 
                      a.tasa, a.ind_mp, a.apl_ori, a.cod_suc, a.cod_cco, a.cod_cl1, a.cod_cl2, a.cod_cl3, a.tip_adq, a.cod_ent, a.cod_cia, a.cod_cl4, a.cod_cl5, a.cod_cl6, a.cod_cl7, 
                      a.ind_tas, a.usuario, a.fec_grab, b.reg_doc, b.trans, b.cod_pla, b.cod_item, b.can_doc, b.pre_vta, b.pre_tot, b.por_iva, b.mon_iva, b.val_uni, b.val_tot, b.pla_ref, b.cod_ter, b.cod_bod, 
                      b.fec_asi, b.cod_con, b.ind_ctr, b.num_cuo, b.ind_ter, b.reg_ref, b.tot_area, b.und_pro, b.cod_ubi, b.cod_uni,b.mprdp,b.por_dep,b.mes_dep,b.ind_top,b.hu_sal,b.hu_vida,b.acum_dep_a,
				      b.met_dep,b.cant_hu,b.por_des,b.mon_des,b.ven_net,b.val_ctd,b.por_ret,b.mon_ret,b.ret_iva,b.ret_ica,b.val_def,b.costo,b.origen,b.val_des,b.val_fle,b.estado_a,b.tipoadq_a,b.fec_ad_a,
					  b.factura_a,b.sucursal_a,b.respon_a,b.cod_dep_a,b.seccion_a,b.fec_ven_a,b.mes_dep_a,b.fec_dbaja,b.por_sal,b.val_sal,b.descrip,b.pla_fis,b.tip_dep_a,b.mes_depb,
					  i.des_item, d.nom_bod, f.des_cor, t.ter_nombre, s.nom_suc, 
                      o.nom_cco, c1.nombre AS nom_cl1, c2.nombre AS nom_cl2, c3.nombre AS nom_cl3, p.rso, at.des_ent, ad.nom_adq, m.des_mon, f.cto_pes,
					  ub.nom_ubi,u.ter_nombre as tercab 
FROM         dbo.ppe_cabdoc AS a WITH (NOLOCK) INNER JOIN
                      dbo.ppe_cuedoc AS b WITH (NOLOCK) ON a.ano_doc = b.ano_doc AND a.per_doc = b.per_doc AND a.sub_tip = b.sub_tip AND a.num_doc = b.num_doc INNER JOIN
                      dbo.ppe_activos AS f WITH (NOLOCK) ON b.cod_pla = f.cod_pla INNER JOIN
                      dbo.inv_items AS i WITH (NOLOCK) ON b.cod_item = i.cod_item INNER JOIN
                      dbo.inv_bodegas AS d WITH (NOLOCK) ON b.cod_bod = d.cod_bod INNER JOIN
                      dbo.gen_terceros AS t WITH (NOLOCK) ON b.cod_ter = t.ter_nit INNER JOIN
					  dbo.gen_terceros AS u WITH (NOLOCK) ON a.cod_pro = u.ter_nit INNER JOIN
                      dbo.gen_sucursal AS s WITH (NOLOCK) ON a.cod_suc = s.cod_suc INNER JOIN
                      dbo.gen_ccosto AS o WITH (NOLOCK) ON a.cod_cco = o.cod_cco INNER JOIN
                      dbo.gen_clasif1 AS c1 WITH (NOLOCK) ON a.cod_cl1 = c1.codigo INNER JOIN
                      dbo.gen_clasif2 AS c2 WITH (NOLOCK) ON a.cod_cl2 = c2.codigo INNER JOIN
                      dbo.gen_clasif3 AS c3 WITH (NOLOCK) ON a.cod_cl3 = c3.codigo LEFT OUTER JOIN
                      dbo.cxp_provee AS p WITH (NOLOCK) ON a.cod_pro = p.provee LEFT OUTER JOIN
                      dbo.ppe_entidades AS at WITH (NOLOCK) ON a.cod_ent = at.cod_ent LEFT OUTER JOIN
                      dbo.ppe_tipoadq AS ad WITH (NOLOCK) ON a.tip_adq = ad.cod_adq INNER JOIN
                      dbo.gen_monedas AS m WITH (NOLOCK) ON a.ind_mp = m.cod_mon INNER JOIN
					  dbo.gen_ubicacion AS ub WITH (NOLOCK) ON ub.cod_ubi=b.cod_ubi

```