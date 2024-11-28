# View: v_cxc_docum_std

## Usa los objetos:
- [[cxc_cabdoc]]
- [[cxc_caunotacre]]
- [[cxc_cliente]]
- [[cxc_contcli_entpub]]
- [[cxc_cuedoc]]
- [[cxc_succli]]
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
- [[gen_retencion]]
- [[gen_sucursal]]
- [[gen_vendedor]]

```sql

CREATE VIEW [dbo].[v_cxc_docum_std] AS
SELECT  a.fch_doc,a.cod_pai,a.cod_dep,a.cod_ciu,a.det_doc,a.cod_ban,a.num_che as num_che_cab,a.for_pag,a.dia_pla,a.por_ret_iv,a.por_ica as por_ica_cab,
a.cod_ven,a.por_com,a.cambio,a.fec_cpf,a.fec_tas,a.tasa,a.ind_mp,a.apl_ori,a.ind_tas,a.ano_anu,a.per_anu,a.tip_anu,a.num_anu,a.fec_grab,
a.usuario,b.ano_doc,b.per_doc,b.tip_doc,b.sub_tip,b.num_doc,b.reg_doc,b.trans,b.cod_cli,b.ano_ref,b.per_ref,b.sub_ref,b.num_ref,b.fec_ven,
b.val_fac,b.val_doc,b.sal_doc,b.por_iva,b.val_iva,b.ret_iva,b.sub_doc,b.por_des,b.val_des,b.net_doc,b.por_ret,b.val_ret,b.ant_doc,b.doc_ant,
b.dia_ven,b.val_com,b.val_ica,b.may_val,b.men_val,b.por_ica,b.por_riv,b.ano_ant,b.per_ant,b.sub_ant,b.cod_suc,b.cod_cco,b.ind_con,b.cod_cl1,
b.cod_cl2,b.cod_cl3,b.final,b.reg_ant,b.numche,b.ban_pos,b.fec_che,b.num_che,b.reg_ref,b.cod_cat,b.por_tim,b.val_tim,b.val_pag,b.fec_pag,
c.nom_cli,s.nom_suc,o.nom_cco,c1.nombre AS nom_cl1,c2.nombre AS nom_cl2,c3.nombre AS nom_cl3,v.nom_ven,m.des_mon,p.nom_ciu,ban.nom_ban,t.des_cau,
a.cau_nota,dp.nom_dep,pa.nom_pai,b.mon_sum1,b.mon_sum2,b.mon_sum3,b.mon_sum4,b.mon_res1,b.mon_res2,b.mon_res3,b.mon_res4,suc.suc_cli,suc.nom_suc AS nom_suc_cli,
b.cod_ica,act.nom_act,b.cod_ret,ret.nombre AS nom_retfte, a.num_ctr, contcli.num_ent,
a.nro_resol,a.est_dian,a.est_cliente,a.cod_cufe,a.cod_cude,a.guid_envio,a.LDF_fe,a.link_fe,a.fto_fac,a.lote_facture
FROM cxc_cabdoc AS a  WITH (NOLOCK) 
INNER JOIN cxc_cuedoc AS b  WITH (NOLOCK) on a.ano_doc=b.ano_doc and a.per_doc=b.per_doc and a.sub_tip=b.sub_tip and a.num_doc=b.num_doc
INNER JOIN cxc_cliente AS c  WITH (NOLOCK) ON b.cod_cli = c.cod_cli
INNER JOIN gen_sucursal AS s  WITH (NOLOCK) ON b.cod_suc = s.cod_suc
INNER JOIN gen_ccosto AS o  WITH (NOLOCK) ON b.cod_cco = o.cod_cco
INNER JOIN gen_clasif1 AS c1  WITH (NOLOCK) ON b.cod_cl1 = c1.codigo
INNER JOIN gen_clasif2 AS c2  WITH (NOLOCK) ON b.cod_cl2 = c2.codigo
INNER JOIN gen_clasif3 AS c3  WITH (NOLOCK) ON b.cod_cl3 = c3.codigo
INNER JOIN gen_vendedor AS v  WITH (NOLOCK) ON a.cod_ven = v.cod_ven
INNER JOIN gen_monedas AS m  WITH (NOLOCK) ON a.ind_mp=m.cod_mon
LEFT OUTER JOIN gen_ciudad AS p  WITH (NOLOCK) ON a.cod_ciu=p.cod_ciu AND a.cod_dep=p.cod_dep AND a.cod_pai=p.cod_pai
LEFT OUTER JOIN gen_bancos AS ban  WITH (NOLOCK) ON b.ban_pos=ban.cod_ban  
LEFT OUTER JOIN cxc_caunotacre AS t  WITH (NOLOCK) ON a.cau_nota=t.cod_cau
LEFT OUTER JOIN gen_deptos AS dp  WITH (NOLOCK) ON a.cod_dep=dp.cod_dep AND a.cod_pai=dp.cod_pai
LEFT OUTER JOIN gen_paises AS pa  WITH (NOLOCK) ON a.cod_pai=pa.cod_pai
LEFT OUTER JOIN cxc_succli AS suc  WITH (NOLOCK) ON a.cliente=suc.cod_cli AND a.suc_cli=suc.suc_cli
LEFT OUTER JOIN gen_actividad AS act  WITH (NOLOCK) ON a.cod_pai=act.cod_pai AND a.cod_dep=act.cod_dep AND a.cod_ciu=act.cod_ciu AND b.cod_ica=act.cod_act
LEFT OUTER JOIN gen_retencion AS ret  WITH (NOLOCK) ON b.cod_ret=ret.cod_ret
LEFT OUTER JOIN dbo.cxc_contcli_entpub AS contcli WITH(NOLOCK) ON contcli.cod_cli = a.cliente AND contcli.num_ctr = a.num_ctr

```
