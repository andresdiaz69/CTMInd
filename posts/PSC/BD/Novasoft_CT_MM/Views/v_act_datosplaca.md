# View: v_act_datosplaca

## Usa los objetos:
- [[act_activos]]
- [[act_ftarmas]]
- [[act_ftcomputo]]
- [[act_ftedificios]]
- [[act_ftequipos]]
- [[act_ftlibros]]
- [[act_ftmaquinas]]
- [[act_ftmedicos]]
- [[act_ftmuebles]]
- [[act_ftobrasarte]]
- [[act_ftsemovientes]]
- [[act_ftterrenos]]
- [[Act_ftvehiculos]]
- [[act_marcas]]
- [[gen_terceros]]

```sql

/*AFLOREZ NOVIEMBRE/2020 Se agrega el campo registro de ingreso*/
CREATE VIEW [dbo].[v_act_datosplaca]
AS
	SELECT	act.cod_pla, act.cod_clas, act.des_cor, act.fec_adq, act.cod_ter, ter.ter_nombre, act.cod_suc, 
			act.cod_cco, act.cod_cl1, act.cod_cl2, act.cod_cl3, mar.nom_mar AS marca, FicTec.mod_eqp AS modelo, 
			FicTec.ser_eqp AS serie, act.cod_est, act.cto_pes, act.ano_ing, act.per_ing, act.sub_ing, act.num_ing, 
			act.area_tot, act.area_seg, act.sal_und,act.reg_ing
	FROM    act_activos AS act WITH(NOLOCK) 
		INNER JOIN act_ftequipos AS FicTec WITH(NOLOCK) ON act.cod_pla = FicTec.cod_pla 
		INNER JOIN act_marcas AS mar WITH(NOLOCK) ON FicTec.mar_eqp = mar.cod_mar 
		INNER JOIN gen_terceros AS ter WITH(NOLOCK) ON act.cod_ter = ter.ter_nit
	UNION ALL
	SELECT	act.cod_pla, act.cod_clas, act.des_cor, act.fec_adq, act.cod_ter, ter.ter_nombre, act.cod_suc, 
			act.cod_cco, act.cod_cl1, act.cod_cl2, act.cod_cl3, mar.nom_mar AS marca, FicTec.mod_veh, 
			FicTec.num_ser, act.cod_est, act.cto_pes, act.ano_ing, act.per_ing, act.sub_ing, act.num_ing, 
			act.area_tot, act.area_seg, act.sal_und,act.reg_ing
	FROM    act_activos AS act WITH(NOLOCK) 
		INNER JOIN Act_ftvehiculos AS FicTec WITH(NOLOCK) ON act.cod_pla = FicTec.cod_pla 
		INNER JOIN act_marcas AS mar WITH(NOLOCK) ON FicTec.mar_veh = mar.cod_mar 
		INNER JOIN gen_terceros AS ter WITH(NOLOCK) ON act.cod_ter = ter.ter_nit
	UNION ALL
	SELECT  act.cod_pla, act.cod_clas, act.des_cor, act.fec_adq, act.cod_ter, ter.ter_nombre, act.cod_suc, 
			act.cod_cco, act.cod_cl1, act.cod_cl2, act.cod_cl3, mar.nom_mar AS marca, FicTec.mod_arm, '', act.cod_est, 
			act.cto_pes, act.ano_ing, act.per_ing, act.sub_ing, act.num_ing, act.area_tot, act.area_seg, 
			act.sal_und,act.reg_ing
	FROM    act_activos AS act WITH(NOLOCK) 
		INNER JOIN act_ftarmas AS FicTec WITH(NOLOCK) ON act.cod_pla = FicTec.cod_pla 
		INNER JOIN act_marcas AS mar WITH(NOLOCK) ON FicTec.mod_arm = mar.cod_mar 
		INNER JOIN gen_terceros AS ter WITH(NOLOCK) ON act.cod_ter = ter.ter_nit
	UNION ALL
	SELECT  act.cod_pla, act.cod_clas, act.des_cor, act.fec_adq, act.cod_ter, ter.ter_nombre, act.cod_suc, 
			act.cod_cco, act.cod_cl1, act.cod_cl2, act.cod_cl3, mar.nom_mar AS marca, FicTec.mod_com, FicTec.ser_com, 
			act.cod_est, act.cto_pes, act.ano_ing, act.per_ing, act.sub_ing, act.num_ing, act.area_tot, 
			act.area_seg, act.sal_und,act.reg_ing
	FROM    act_activos AS act WITH(NOLOCK) 
		INNER JOIN act_ftcomputo AS FicTec WITH(NOLOCK) ON act.cod_pla = FicTec.cod_pla 
		INNER JOIN act_marcas AS mar WITH(NOLOCK) ON FicTec.mod_com = mar.cod_mar 
		INNER JOIN gen_terceros AS ter WITH(NOLOCK) ON act.cod_ter = ter.ter_nit
	UNION ALL
	SELECT  act.cod_pla, act.cod_clas, act.des_cor, act.fec_adq, act.cod_ter, ter.ter_nombre, act.cod_suc, 
			act.cod_cco, act.cod_cl1, act.cod_cl2, act.cod_cl3, mar.nom_mar AS marca, FicTec.mod_maq, 
			FicTec.ser_maq, act.cod_est, act.cto_pes, act.ano_ing, act.per_ing, act.sub_ing, act.num_ing, 
			act.area_tot, act.area_seg, act.sal_und,act.reg_ing
	FROM    act_activos AS act WITH(NOLOCK) 
		INNER JOIN act_ftmaquinas AS FicTec WITH(NOLOCK) ON act.cod_pla = FicTec.cod_pla 
		INNER JOIN act_marcas AS mar WITH(NOLOCK) ON FicTec.mod_maq = mar.cod_mar 
		INNER JOIN gen_terceros AS ter WITH(NOLOCK) ON act.cod_ter = ter.ter_nit
	UNION ALL
	SELECT	act.cod_pla, act.cod_clas, act.des_cor, act.fec_adq, act.cod_ter, ter.ter_nombre, act.cod_suc, 
			act.cod_cco, act.cod_cl1, act.cod_cl2, act.cod_cl3, mar.nom_mar AS marca, FicTec.mod_med, FicTec.ser_med,
			act.cod_est, act.cto_pes, act.ano_ing, act.per_ing, act.sub_ing, act.num_ing, act.area_tot, 
			act.area_seg, act.sal_und,act.reg_ing
	FROM    act_activos AS act WITH(NOLOCK) 
		INNER JOIN act_ftmedicos AS FicTec WITH(NOLOCK) ON act.cod_pla = FicTec.cod_pla 
		INNER JOIN act_marcas AS mar WITH(NOLOCK) ON FicTec.mod_med = mar.cod_mar 
		INNER JOIN gen_terceros AS ter WITH(NOLOCK) ON act.cod_ter = ter.ter_nit
	UNION ALL
	SELECT  act.cod_pla, act.cod_clas, act.des_cor, act.fec_adq, act.cod_ter, ter.ter_nombre, act.cod_suc, 
			act.cod_cco, act.cod_cl1, act.cod_cl2, act.cod_cl3, mar.nom_mar AS marca, FicTec.mod_mue, '', act.cod_est, 
			act.cto_pes, act.ano_ing, act.per_ing, act.sub_ing, act.num_ing, act.area_tot, act.area_seg, 
			act.sal_und,act.reg_ing
	FROM    act_activos AS act WITH(NOLOCK) 
		INNER JOIN act_ftmuebles AS FicTec WITH(NOLOCK) ON act.cod_pla = FicTec.cod_pla 
		INNER JOIN act_marcas AS mar WITH(NOLOCK) ON FicTec.mod_mue = mar.cod_mar 
		INNER JOIN gen_terceros AS ter WITH(NOLOCK) ON act.cod_ter = ter.ter_nit
	UNION ALL
	SELECT  act.cod_pla, act.cod_clas, act.des_cor, act.fec_adq, act.cod_ter, ter.ter_nombre, act.cod_suc, 
			act.cod_cco, act.cod_cl1, act.cod_cl2, act.cod_cl3, '' AS marca, '' AS modelo, '' AS serie, act.cod_est, act.cto_pes, 
			act.ano_ing, act.per_ing, act.sub_ing, act.num_ing, act.area_tot, act.area_seg, act.sal_und,act.reg_ing
	FROM    act_activos AS act WITH(NOLOCK) 
		INNER JOIN act_ftedificios AS FicTec WITH(NOLOCK) ON act.cod_pla = FicTec.cod_pla 
		INNER JOIN gen_terceros AS ter WITH(NOLOCK) ON act.cod_ter = ter.ter_nit
	UNION ALL
	SELECT  act.cod_pla, act.cod_clas, act.des_cor, act.fec_adq, act.cod_ter, ter.ter_nombre, act.cod_suc, 
			act.cod_cco, act.cod_cl1, act.cod_cl2, act.cod_cl3, '' AS marca, '' AS modelo, '' AS serie, act.cod_est, act.cto_pes, 
			act.ano_ing, act.per_ing, act.sub_ing, act.num_ing, act.area_tot, act.area_seg, act.sal_und,act.reg_ing
	FROM    act_activos AS act WITH(NOLOCK) 
		INNER JOIN act_ftlibros AS FicTec WITH(NOLOCK) ON act.cod_pla = FicTec.cod_pla 
		INNER JOIN gen_terceros AS ter WITH(NOLOCK) ON act.cod_ter = ter.ter_nit
	UNION ALL
	SELECT  act.cod_pla, act.cod_clas, act.des_cor, act.fec_adq, act.cod_ter, ter.ter_nombre, act.cod_suc, 
			act.cod_cco, act.cod_cl1, act.cod_cl2, act.cod_cl3, '' AS marca, '' AS modelo, '' AS serie, act.cod_est, act.cto_pes, 
			act.ano_ing, act.per_ing, act.sub_ing, act.num_ing, act.area_tot, act.area_seg, act.sal_und,act.reg_ing
	FROM    act_activos AS act WITH(NOLOCK) 
		INNER JOIN act_ftobrasarte AS FicTec WITH(NOLOCK) ON act.cod_pla = FicTec.cod_pla 
		INNER JOIN gen_terceros AS ter WITH(NOLOCK) ON act.cod_ter = ter.ter_nit
	UNION ALL
	SELECT  act.cod_pla, act.cod_clas, act.des_cor, act.fec_adq, act.cod_ter, ter.ter_nombre, act.cod_suc, 
			act.cod_cco, act.cod_cl1, act.cod_cl2, act.cod_cl3, '' AS marca, '' AS modelo, '' AS serie, act.cod_est, act.cto_pes, 
			act.ano_ing, act.per_ing, act.sub_ing, act.num_ing, act.area_tot, act.area_seg, act.sal_und,act.reg_ing
	FROM    act_activos AS act WITH(NOLOCK) 
		INNER JOIN act_ftsemovientes AS FicTec WITH(NOLOCK) ON act.cod_pla = FicTec.cod_pla 
		INNER JOIN gen_terceros AS ter WITH(NOLOCK) ON act.cod_ter = ter.ter_nit
	UNION ALL
	SELECT  act.cod_pla, act.cod_clas, act.des_cor, act.fec_adq, act.cod_ter, ter.ter_nombre, act.cod_suc, 
			act.cod_cco, act.cod_cl1, act.cod_cl2, act.cod_cl3, '' AS marca, '' AS modelo, '' AS serie, act.cod_est, act.cto_pes, 
			act.ano_ing, act.per_ing, act.sub_ing, act.num_ing, act.area_tot, act.area_seg, act.sal_und,act.reg_ing
	FROM    act_activos AS act WITH(NOLOCK) 
		INNER JOIN act_ftterrenos AS FicTec WITH(NOLOCK) ON act.cod_pla = FicTec.cod_pla 
		INNER JOIN gen_terceros AS ter WITH(NOLOCK) ON act.cod_ter = ter.ter_nit;

```
