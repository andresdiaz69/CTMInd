# View: V_Rhh_HisLab

## Usa los objetos:
- [[rhh_hislab]]

```sql

CREATE VIEW [dbo].[V_Rhh_HisLab]
AS
SELECT  TOP 100 PERCENT 
		  dbo.rhh_hislab.[cod_emp], 
		  dbo.rhh_hislab.[cod_cia], 
		  dbo.rhh_hislab.[cod_suc], 
		  dbo.rhh_hislab.[cod_cco], 
		  dbo.rhh_hislab.[cod_cl1], 
		  dbo.rhh_hislab.[cod_cl2], 
		  dbo.rhh_hislab.[cod_cl3], 
		  dbo.rhh_hislab.[cod_cl4], 
		  dbo.rhh_hislab.[cod_cl5], 
		  dbo.rhh_hislab.[cod_cl6], 
		  dbo.rhh_hislab.[cod_cl7], 
		  dbo.rhh_hislab.[cod_car], 
		  dbo.rhh_hislab.[cod_ciu], 
		  dbo.rhh_hislab.[cod_dep], 
		  dbo.rhh_hislab.[cod_pai], 
		  dbo.rhh_hislab.[fec_ini], 
		  dbo.rhh_hislab.[fec_fin], 
		  dbo.rhh_hislab.[cau_ret], 
		  dbo.rhh_hislab.[fec_ret], 
		  dbo.rhh_hislab.[res_ret], 
		  dbo.rhh_hislab.[ret_liq], 
		  dbo.rhh_hislab.[sal_bas], 
		  dbo.rhh_hislab.[tip_con], 
		  dbo.rhh_hislab.[tie_ded], 
		  dbo.rhh_hislab.[tip_pag], 
		  dbo.rhh_hislab.[sec_car], 
		  dbo.rhh_hislab.[cod_ins], 
		  dbo.rhh_hislab.[cod_nov], 
		  dbo.rhh_hislab.[tip_nov], 
		  dbo.rhh_hislab.[cod_empleo], 
		  dbo.rhh_hislab.[ind_nov], 
		  dbo.rhh_hislab.[nue_con], 
		  dbo.rhh_hislab.[ind_con], 
		  dbo.rhh_hislab.[fec_pba], 
		  dbo.rhh_hislab.[Cla_nom], 
		  dbo.rhh_hislab.[nom_con], 
		  dbo.rhh_hislab.[nom_rem], 
		  dbo.rhh_hislab.[nom_prm], 
		  dbo.rhh_hislab.[fec_nov], 
		  dbo.rhh_hislab.[res_nom], 
		  dbo.rhh_hislab.[fre_nom], 
		  dbo.rhh_hislab.[ded_horas], 
		  dbo.rhh_hislab.[val_hora], 
		  dbo.rhh_hislab.[clasif_cat], 
		  dbo.rhh_hislab.[des_fun], 
		  dbo.rhh_hislab.[fch_retro], 
		  dbo.rhh_hislab.[obs_retiro], 
		  dbo.rhh_hislab.[Act_Pose], 
		  dbo.rhh_hislab.[num_sec], 
		  dbo.rhh_hislab.[cod_area], 
		  dbo.rhh_hislab.[cod_con], 
		  dbo.rhh_hislab.[suc_SS], 
		  dbo.rhh_hislab.[sal_ant_flex], 
		  dbo.rhh_hislab.[por_flex], 
		  dbo.rhh_hislab.[cod_CT], 
		  dbo.rhh_hislab.[cod_mon], 
		  dbo.rhh_hislab.[sal_MonExt], 
		  dbo.rhh_hislab.[cod_CauPro], 
		  dbo.rhh_hislab.[Cod_esc], 
		  dbo.rhh_hislab.[Tip_Docente], 
		  dbo.rhh_hislab.[ded_horasTot], 
		  dbo.rhh_hislab.[fch_ajustesal], 
		  dbo.rhh_hislab.[cod_jus_ret], 
		  dbo.rhh_hislab.[id_proceso], 
		  dbo.rhh_hislab.[Ind_ValNeto], 
		  dbo.rhh_hislab.[region_ec]
FROM      dbo.rhh_hislab  WITH (NOLOCK)
ORDER BY dbo.rhh_hislab.cod_emp,dbo.rhh_hislab.fec_ini,dbo.rhh_hislab.cod_car    


```
