# View: v_ppe_placas

## Usa los objetos:
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_sucursal]]
- [[gen_terceros]]
- [[inv_bodegas]]
- [[ppe_activos]]
- [[ppe_clases]]

```sql

/*2020/01/21 Inclusión Instrucción WITH (NOLOCK)
AFLOREZ DICIEMBRE/2020 Se agregan campos faltantes de activos*/
CREATE VIEW [dbo].[v_ppe_placas]
AS
SELECT  act.cod_pla, act.des_cor, act.cod_ter, act.cod_bod, act.cod_suc, act.cod_cco, act.cod_cl1, act.cod_cl2, act.cod_cl3, act.fec_asig, 
        act.num_asig, act.fec_sal, act.num_sal, act.tip_adq, act.cod_prv, act.fec_adq, act.num_fac, act.cto_pes, act.cto_uss, act.num_ctt, 
		act.obs_gen, act.cod_ite, act.cod_clas, act.cod_ent, act.cod_est, act.fec_lim, act.por_dep, act.pla_ref, act.pla_fis, act.tas_com, 
		act.des_det, act.ano_ing, act.per_ing, act.sub_ing, act.num_ing, act.ind_proc, act.ind_rec, act.ind_ctr, act.dia_dep, act.cuo_dep, 
		act.val_aval, act.reg_ing, act.fec_cor, act.fec_proc, act.tip_dep, act.por_sal, act.cod_ubi, act.cod_cia, act.sal_und, act.area_tot, 
		act.area_seg, act.cod_cl4, act.cod_cl5, act.cod_cl6, act.cod_cl7, act.mesdep, act.mprdp, act.hu_dmes, act.hu_sal, act.hu_vida, act.met_val,
		act.val_act, act.val_des, act.val_fle, act.val_fin, act.cos_dep, act.val_sal, act.costo, act.val_mej, act.val_rev, act.val_rcd, act.val_det,
		act.cos_def, act.fec_ven, act.val_ven, act.fec_dbaja, act.val_baj, act.fec_dpv, act.val_raz, act.val_gas, act.val_vdv, act.deprec, 
		act.acumdep, act.val_net, act.mes_dep_dv, act.val_dep_dv, act.tip_ing, act.cod_serie, act.cod_cli, act.sit_cli,
		ter.ter_nombre, bod.nom_bod, cl1.nombre, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, cco.nom_cco, suc.nom_suc, cla.des_clas
FROM    ppe_activos AS act WITH (NOLOCK) 
		INNER JOIN dbo.gen_terceros AS ter WITH (NOLOCK) ON act.cod_ter = ter.ter_nit 
		LEFT OUTER JOIN dbo.inv_bodegas AS bod WITH (NOLOCK) ON act.cod_bod = bod.cod_bod AND ter.ter_nit = bod.cod_ter 
		INNER JOIN dbo.gen_clasif1 AS cl1 WITH (NOLOCK) ON act.cod_cl1 = cl1.codigo 
		INNER JOIN dbo.gen_clasif2 AS cl2 WITH (NOLOCK) ON act.cod_cl2 = cl2.codigo 
		INNER JOIN dbo.gen_clasif3 AS cl3 WITH (NOLOCK) ON act.cod_cl3 = cl3.codigo 
		INNER JOIN dbo.gen_ccosto AS cco WITH (NOLOCK) ON act.cod_cco = cco.cod_cco 
		INNER JOIN dbo.gen_sucursal AS suc WITH (NOLOCK) ON act.cod_suc = suc.cod_suc 
		INNER JOIN dbo.ppe_clases AS cla WITH (NOLOCK) ON act.cod_clas = cla.cod_clas;

```
