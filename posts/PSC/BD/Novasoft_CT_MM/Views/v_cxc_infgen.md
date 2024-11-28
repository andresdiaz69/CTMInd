# View: v_cxc_infgen

## Usa los objetos:
- [[cxc_cliente]]
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_sucursal]]
- [[gen_vendedor]]
- [[v_cxc_docum_std]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_cxc_infgen]
AS
SELECT     d.fch_doc, d.cod_ciu, d.det_doc, d.cod_ban, d.num_che_cab, d.for_pag, d.dia_pla, d.por_ret_iv, d.por_ica_cab, d.cod_ven, d.por_com, d.cambio, d.sub_tip, 
                      d.fec_cpf, d.fec_tas, d.tasa, d.ind_mp, d.apl_ori, d.ind_tas, d.ano_anu, d.per_anu, d.tip_anu, d.num_anu, d.fec_grab, d.usuario, d.ano_doc, d.per_doc, 
                      d.tip_doc, d.num_doc, d.reg_doc, d.trans, d.cod_cli, d.ano_ref, d.per_ref, d.sub_ref, d.num_ref, d.fec_ven, d.val_fac, d.val_doc, d.sal_doc, d.por_iva, 
                      d.val_iva, d.ret_iva, d.sub_doc, d.por_des, d.val_des, d.net_doc, d.por_ret, d.val_ret, d.ant_doc, d.doc_ant, d.dia_ven, d.val_com, d.val_ica, 
                      d.may_val, d.men_val, d.por_ica, d.por_riv, d.ano_ant, d.per_ant, d.sub_ant, d.cod_suc, d.cod_cco, d.ind_con, d.cod_cl1, d.cod_cl2, d.cod_cl3, d.final, 
                      d.reg_ant, d.numche, d.ban_pos, d.fec_che, d.num_che, d.reg_ref, d.cod_cat, c.nom_cli, s.nom_suc, o.nom_cco, c1.nombre AS nom_cl1, 
                      c2.nombre AS nom_cl2, c3.nombre AS nom_cl3, v.nom_ven
FROM         dbo.v_cxc_docum_std AS d  WITH (NOLOCK) INNER JOIN
                      dbo.cxc_cliente AS c  WITH (NOLOCK) ON d.cod_cli = c.cod_cli INNER JOIN
                      dbo.gen_sucursal AS s  WITH (NOLOCK) ON d.cod_suc = s.cod_suc INNER JOIN
                      dbo.gen_ccosto AS o  WITH (NOLOCK) ON d.cod_cco = o.cod_cco INNER JOIN
                      dbo.gen_clasif1 AS c1  WITH (NOLOCK) ON d.cod_cl1 = c1.codigo INNER JOIN
                      dbo.gen_clasif2 AS c2  WITH (NOLOCK) ON d.cod_cl2 = c2.codigo INNER JOIN
                      dbo.gen_clasif3 AS c3  WITH (NOLOCK) ON d.cod_cl3 = c3.codigo INNER JOIN
                      dbo.gen_vendedor AS v  WITH (NOLOCK) ON d.cod_ven = v.cod_ven

```
