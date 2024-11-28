# View: v_pre_docum

## Usa los objetos:
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_monedas]]
- [[gen_sucursal]]
- [[gen_terceros]]
- [[pre_cabdoc]]
- [[pre_cuedoc]]
- [[pre_rubro]]

```sql



CREATE VIEW [dbo].[v_pre_docum]
AS
SELECT a.apl_ori,a.fec_doc,a.cambio,a.fec_tas,a.tasa,a.ind_mp,b.ano_doc,b.per_doc,b.tip_doc,b.sub_tip,b.num_doc,b.reg_doc,
b.trans,b.cod_rubro,b.cod_suc,b.cod_cco,b.cod_cl1,b.cod_cl2,b.cod_cl3,b.cod_ter,b.apr_ini,b.apr_adi,b.apr_red,b.apr_com,
b.apr_fac,b.apr_pag,b.fec_doc AS fec_doc_cue,b.efe,c.nom_rub,d.nom_suc,e.nom_cco,f.nombre AS nom_cl1,g.nombre AS nom_cl2,
h.nombre AS nom_cl3,i.ter_nombre,j.des_mon
FROM pre_cabdoc a INNER JOIN pre_cuedoc b ON a.ano_doc=b.ano_doc AND a.per_doc=b.per_doc AND a.sub_tip=b.sub_tip AND a.num_doc=b.num_doc
INNER JOIN pre_rubro c ON b.cod_rubro=c.cod_rub
INNER JOIN gen_sucursal d ON d.cod_suc=b.cod_suc
INNER JOIN gen_ccosto e ON b.cod_cco=e.cod_cco
INNER JOIN gen_clasif1 f ON b.cod_cl1=f.codigo
INNER JOIN gen_clasif2 g ON b.cod_cl2=g.codigo
INNER JOIN gen_clasif3 h ON b.cod_cl3=h.codigo
INNER JOIN gen_terceros i ON b.cod_ter=i.ter_nit
INNER JOIN gen_monedas j ON a.ind_mp=j.cod_mon




```
