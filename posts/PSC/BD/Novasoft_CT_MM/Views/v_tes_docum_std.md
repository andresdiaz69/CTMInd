# View: v_tes_docum_std

## Usa los objetos:
- [[cie_alumnos]]
- [[cie_conceptos]]
- [[cnt_puc]]
- [[cxc_cliente]]
- [[cxp_provee]]
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_monedas]]
- [[gen_sucursal]]
- [[gen_terceros]]
- [[gen_vendedor]]
- [[nif_puc]]
- [[tes_bancos]]
- [[tes_cabdoc]]
- [[tes_caudevol]]
- [[tes_chequeras]]
- [[tes_cuedoc]]
- [[tes_flujos]]

```sql

/*	AYVEGA SRS2019-0442 MAYO/2019 SE AGREGA CAMPPO PARA BANCO TRASLADO
	2020/01/21 Inclusión Instrucción WITH (NOLOCK)
	AFLOREZ JUNIO/2022 SNR2022-0116 SE AGREGA CAMPO VENDEDOR*/
CREATE VIEW [dbo].[v_tes_docum_std]
AS
SELECT     a.fch_doc, a.banco, a.num_cue, a.num_che AS num_che_cab, a.descrip, a.con_doc, a.nom_gir, a.cambio, a.fec_cpf, a.fec_tas, a.tasa, a.ind_mp, 
                      a.marca, a.apl_ori, a.ind_ent, a.ind_tas, a.ano_anu, a.per_anu, a.sub_anu, a.num_anu, a.usuario, a.fec_grab, b.ano_doc, b.per_doc, b.tip_doc, 
                      b.sub_tip, b.num_doc, b.reg_doc, b.trans, b.ban_dos, b.cod_pro, b.cod_cli, b.cod_ter, b.ano_ref, b.per_ref, b.sub_ref, b.num_ref, b.cuenta_con, b.cuenta_con_niif,
                      b.cod_flu, b.tot_doc, b.des_doc, b.net_doc, b.ret_doc, b.ica_doc, b.iva_ret, b.tip_gir, b.cod_rub, b.no_doc, b.may_val, b.men_val, b.final, b.cod_suc, 
                      b.cod_cco, b.cod_cl1, b.cod_cl2, b.cod_cl3, b.ind_con, b.for_pag, b.cod_ban, b.num_che, b.fec_che, b.val_com, b.val_ret, b.val_riv, b.cta_com, 
                      b.cta_ret, b.cta_riv, b.ano_ped, b.per_ped, b.tip_ped, b.num_ped, b.ban_pos, b.numche, b.bas_doc, b.reg_ref, b.cod_pre, c.nombre, s.nom_suc, 
                      o.nom_cco, c1.nombre AS nom_cl1, c2.nombre AS nom_cl2, c3.nombre AS nom_cl3, x.nom_cli, p.rso, t.ter_nombre, w.nom_cta, d.nombre AS nom_bdos,
                       m.des_mon, h.che_act, a.ind_pago, c.ctactb,v.des_cau,a.ach_control,b.cod_alu,b.cod_fam,b.conc_cie,n.nom_alu,q.nom_con,e.nom_flu, a.num_lote,
					   b.num_concil,f.nom_cta AS nom_cta_nif,b.cod_ben,d.nombre AS nombre_tras, a.cod_ven, ven.nom_ven
FROM	dbo.tes_cabdoc AS a WITH (NOLOCK)
					INNER JOIN dbo.tes_cuedoc AS b WITH (NOLOCK) ON a.ano_doc = b.ano_doc AND a.per_doc = b.per_doc AND a.sub_tip = b.sub_tip AND a.num_doc = b.num_doc
					INNER JOIN dbo.tes_bancos AS c WITH (NOLOCK) ON a.banco = c.bancos
					INNER JOIN dbo.gen_sucursal AS s WITH (NOLOCK) ON b.cod_suc = s.cod_suc
					INNER JOIN dbo.gen_ccosto AS o WITH (NOLOCK) ON b.cod_cco = o.cod_cco
					INNER JOIN dbo.gen_clasif1 AS c1 WITH (NOLOCK) ON b.cod_cl1 = c1.codigo
					INNER JOIN dbo.gen_clasif2 AS c2 WITH (NOLOCK) ON b.cod_cl2 = c2.codigo
					INNER JOIN dbo.gen_clasif3 AS c3 WITH (NOLOCK) ON b.cod_cl3 = c3.codigo
					INNER JOIN dbo.cxc_cliente AS x WITH (NOLOCK) ON b.cod_cli = x.cod_cli
					INNER JOIN dbo.cxp_provee AS p WITH (NOLOCK) ON b.cod_pro = p.provee
					INNER JOIN dbo.gen_terceros AS t WITH (NOLOCK) ON b.cod_ter = t.ter_nit
					INNER JOIN dbo.cnt_puc AS w WITH (NOLOCK) ON b.cuenta_con = w.cod_cta
					INNER JOIN dbo.nif_puc AS f WITH (NOLOCK) ON b.cuenta_con_niif = f.cod_cta
					INNER JOIN dbo.tes_bancos AS d WITH (NOLOCK) ON b.ban_dos = d.bancos
					INNER JOIN dbo.gen_monedas AS m WITH (NOLOCK) ON a.ind_mp = m.cod_mon
					LEFT OUTER JOIN dbo.tes_chequeras AS h WITH (NOLOCK) ON a.banco = h.cod_ban AND a.cod_che = h.cod_che
					LEFT OUTER JOIN tes_caudevol AS v WITH (NOLOCK) ON a.cau_dev=v.cod_cau
					LEFT OUTER JOIN cie_alumnos AS n WITH (NOLOCK) ON b.cod_alu=n.cod_alu
					LEFT OUTER JOIN cie_conceptos AS q WITH (NOLOCK) ON b.conc_cie=q.cod_con
					LEFT OUTER JOIN tes_flujos AS e WITH (NOLOCK) ON e.cod_flu=b.cod_flu
					INNER JOIN dbo.gen_vendedor AS ven WITH (NOLOCK) ON a.cod_ven=ven.cod_ven;

```
