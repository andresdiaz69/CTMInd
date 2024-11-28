# View: v_act_placas

## Usa los objetos:
- [[act_activos]]
- [[act_clases]]
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_sucursal]]
- [[gen_terceros]]
- [[inv_bodegas]]

```sql

CREATE VIEW [dbo].[v_act_placas]
AS
SELECT     dbo.act_activos.cod_pla, dbo.act_activos.des_cor, dbo.act_activos.cod_ter, dbo.act_activos.cod_bod, dbo.act_activos.cod_suc, 
                      dbo.act_activos.cod_cco, dbo.act_activos.cod_cl1, dbo.act_activos.cod_cl2, dbo.act_activos.cod_cl3, dbo.act_activos.fec_asig, 
                      dbo.act_activos.num_asig, dbo.act_activos.fec_sal, dbo.act_activos.num_sal, dbo.act_activos.tip_adq, dbo.act_activos.cod_prv, 
                      dbo.act_activos.fec_adq, dbo.act_activos.num_fac, dbo.act_activos.cto_pes, dbo.act_activos.cto_uss, dbo.act_activos.num_ctt, 
                      dbo.act_activos.obs_gen, dbo.act_activos.cod_ite, dbo.act_activos.cod_clas, dbo.act_activos.cod_ent, dbo.act_activos.cod_est, 
                      dbo.act_activos.fec_lim, dbo.act_activos.por_dep, dbo.act_activos.pla_ref, dbo.act_activos.pla_fis, dbo.act_activos.tas_com, dbo.act_activos.des_det, 
                      dbo.act_activos.ano_ing, dbo.act_activos.per_ing, dbo.act_activos.sub_ing, dbo.act_activos.num_ing, dbo.act_activos.ind_proc, 
                      dbo.act_activos.ind_rec, dbo.act_activos.ind_ctr, dbo.act_activos.dia_dep, dbo.act_activos.cuo_dep, dbo.act_activos.val_aval, 
                      dbo.act_activos.reg_ing, dbo.act_activos.fec_cor, dbo.act_activos.fec_proc, dbo.act_activos.TIP_DEP, dbo.act_activos.por_sal, 
                      dbo.act_activos.cod_ubi, dbo.act_activos.cod_cia, dbo.act_activos.sal_und, dbo.act_activos.area_tot, dbo.act_activos.area_seg, 
                      dbo.act_activos.cod_cl4, dbo.act_activos.cod_cl5, dbo.act_activos.cod_cl6, dbo.act_activos.cod_cl7, dbo.gen_terceros.ter_nombre, 
                      dbo.inv_bodegas.nom_bod, dbo.gen_clasif1.nombre, dbo.gen_clasif2.nombre AS nom_cl2, dbo.gen_clasif3.nombre AS nom_cl3, dbo.gen_ccosto.nom_cco, 
                      dbo.gen_sucursal.nom_suc, dbo.act_clases.des_clas
FROM         dbo.act_activos WITH(NOLOCK)
	INNER JOIN dbo.gen_terceros WITH(NOLOCK) ON dbo.act_activos.cod_ter = dbo.gen_terceros.ter_nit 
	LEFT OUTER JOIN dbo.inv_bodegas WITH(NOLOCK) ON dbo.act_activos.cod_bod = dbo.inv_bodegas.cod_bod AND dbo.gen_terceros.ter_nit = dbo.inv_bodegas.cod_ter 
	INNER JOIN dbo.gen_clasif1 WITH(NOLOCK) ON dbo.act_activos.cod_cl1 = dbo.gen_clasif1.codigo 
	INNER JOIN dbo.gen_clasif2 WITH(NOLOCK) ON dbo.act_activos.cod_cl2 = dbo.gen_clasif2.codigo 
	INNER JOIN dbo.gen_clasif3 WITH(NOLOCK) ON dbo.act_activos.cod_cl3 = dbo.gen_clasif3.codigo 
	INNER JOIN dbo.gen_ccosto WITH(NOLOCK) ON dbo.act_activos.cod_cco = dbo.gen_ccosto.cod_cco 
	INNER JOIN dbo.gen_sucursal WITH(NOLOCK) ON dbo.act_activos.cod_suc = dbo.gen_sucursal.cod_suc 
	INNER JOIN dbo.act_clases WITH(NOLOCK) ON dbo.act_activos.cod_clas = dbo.act_clases.cod_clas

```
