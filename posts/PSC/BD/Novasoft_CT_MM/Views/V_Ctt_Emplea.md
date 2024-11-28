# View: V_Ctt_Emplea

## Usa los objetos:
- [[rhh_emplea]]
- [[rhh_foto]]

```sql

CREATE VIEW [dbo].[V_Ctt_Emplea]
AS
SELECT     dbo.rhh_emplea.cod_emp, dbo.rhh_emplea.ap1_emp, dbo.rhh_emplea.ap2_emp, dbo.rhh_emplea.nom_emp, dbo.rhh_emplea.tip_ide, dbo.rhh_emplea.pai_exp, 
                      dbo.rhh_emplea.ciu_exp, dbo.rhh_emplea.fec_nac, dbo.rhh_emplea.cod_pai, dbo.rhh_emplea.cod_dep, dbo.rhh_emplea.cod_ciu, dbo.rhh_emplea.sex_emp, 
                      dbo.rhh_emplea.num_lib, dbo.rhh_emplea.cla_lib, dbo.rhh_emplea.dim_lib, dbo.rhh_emplea.gru_san, dbo.rhh_emplea.fac_rhh, dbo.rhh_emplea.est_civ, 
                      dbo.rhh_emplea.nac_emp, dbo.rhh_emplea.dir_res, dbo.rhh_emplea.tel_res, dbo.rhh_emplea.pai_res, dbo.rhh_emplea.dpt_res, dbo.rhh_emplea.ciu_res, 
                      dbo.rhh_emplea.per_car, dbo.rhh_emplea.fec_ing, dbo.rhh_emplea.fec_egr, dbo.rhh_emplea.cod_cia, dbo.rhh_emplea.cod_suc, dbo.rhh_emplea.cod_cco, 
                      dbo.rhh_emplea.cod_cl1, dbo.rhh_emplea.cod_cl2, dbo.rhh_emplea.cod_cl3, dbo.rhh_emplea.cod_cl4, dbo.rhh_emplea.cod_cl5, dbo.rhh_emplea.cod_cl6, 
                      dbo.rhh_emplea.cod_cl7, dbo.rhh_emplea.cod_car, dbo.rhh_emplea.tip_con, dbo.rhh_emplea.tip_pag, dbo.rhh_emplea.met_ret, dbo.rhh_emplea.por_ret, 
                      dbo.rhh_emplea.tip_ded, dbo.rhh_emplea.mto_dto, dbo.rhh_emplea.cod_ban, dbo.rhh_emplea.cta_ban, dbo.rhh_emplea.reg_sal, dbo.rhh_emplea.cod_tlq, 
                      dbo.rhh_emplea.est_lab, dbo.rhh_emplea.pen_emp, dbo.rhh_emplea.emp_pen, dbo.rhh_emplea.cau_pen, dbo.rhh_emplea.fdo_ate, dbo.rhh_emplea.por_ate, 
                      dbo.rhh_emplea.fdo_pen, dbo.rhh_emplea.fdo_sal, dbo.rhh_emplea.fdo_ces, dbo.rhh_emplea.fec_aum, dbo.rhh_emplea.sal_bas, dbo.rhh_emplea.sal_ant, 
                      dbo.rhh_emplea.niv_ocu, dbo.rhh_emplea.tam_emp, dbo.rhh_emplea.pes_emp, dbo.rhh_emplea.est_soc, dbo.rhh_emplea.gas_men, dbo.rhh_emplea.per_beb, 
                      dbo.rhh_emplea.pro_fum, dbo.rhh_emplea.ind_vac, dbo.rhh_emplea.dia_vac, dbo.rhh_emplea.pje_sue, dbo.rhh_emplea.avi_emp, dbo.rhh_emplea.ind_pva, 
                      dbo.rhh_emplea.ind_sab, dbo.rhh_emplea.ind_m31, dbo.rhh_emplea.cat_car, dbo.rhh_emplea.fec_car, dbo.rhh_emplea.fec_bon, dbo.rhh_emplea.ccf_emp, 
                      dbo.rhh_emplea.cal_ser, dbo.rhh_emplea.met_tpt, dbo.rhh_emplea.cal_sv2, dbo.rhh_emplea.cal_sv3, dbo.rhh_emplea.cal_sv4, dbo.rhh_emplea.nom_rem, 
                      dbo.rhh_emplea.car_enc, dbo.rhh_emplea.cta_gas, dbo.rhh_emplea.ind_pdias, dbo.rhh_emplea.sue_var, dbo.rhh_emplea.ind_svar, dbo.rhh_emplea.tip_nom, 
                      dbo.rhh_emplea.ded_horas, dbo.rhh_emplea.val_hora, dbo.rhh_emplea.clasif_cat, dbo.rhh_emplea.apo_pen, dbo.rhh_emplea.apo_sal, dbo.rhh_emplea.apo_rie, 
                      dbo.rhh_emplea.ind_discco, dbo.rhh_emplea.ind_evalua, dbo.rhh_emplea.reg_pres, dbo.rhh_emplea.e_mail, dbo.rhh_emplea.tel_cel, dbo.rhh_emplea.cod_reloj, 
                      dbo.rhh_emplea.suc_ban, dbo.rhh_emplea.tot_hor, dbo.rhh_emplea.tip_cot, dbo.rhh_emplea.ind_extjero, dbo.rhh_emplea.ind_resi_extjero, 
                      dbo.rhh_emplea.SubTip_Cot, dbo.rhh_emplea.dpt_exp, dbo.rhh_emplea.asp_sal, dbo.rhh_emplea.disp_asp, dbo.rhh_emplea.pto_gas, dbo.rhh_emplea.deudas, 
                      dbo.rhh_emplea.cpto_Deudas, dbo.rhh_emplea.Niv_aca, dbo.rhh_emplea.prm_sal, dbo.rhh_emplea.num_ide, dbo.rhh_emplea.barrio, dbo.rhh_foto.fto_emp,
				      dbo.rhh_emplea.ind_estlabref,dbo.rhh_emplea.cod_pagelec,dbo.rhh_emplea.gradodisc_ec,dbo.rhh_emplea.ind_ctt,dbo.rhh_emplea.nom1_emp,dbo.rhh_emplea.nom2_emp,
					  dbo.rhh_emplea.tip_pen,dbo.rhh_emplea.Aut_Dat,dbo.rhh_emplea.Fec_Aut,dbo.rhh_emplea.cod_ranvac,dbo.rhh_emplea.Tip_sindclzdo,dbo.rhh_emplea.ind_Embz,
					  dbo.rhh_emplea.ind_IncPm,dbo.rhh_emplea.mto_dtoNA,dbo.rhh_emplea.ind_pencomp,dbo.rhh_emplea.ind_penpagext,dbo.rhh_emplea.ind_EmpleapenEmp,dbo.rhh_emplea.ind_DecRenta,
					  dbo.rhh_emplea.fec_priming,dbo.rhh_emplea.cod_est,dbo.rhh_emplea.e_mail_alt,dbo.rhh_emplea.login_portal,dbo.rhh_emplea.fec_ult_act,dbo.rhh_emplea.num_req,
					  dbo.rhh_emplea.Tip_VincDian,dbo.rhh_emplea.Concepto_DIAN2280,dbo.rhh_emplea.ind_discconif,dbo.rhh_emplea.cta_gasnif
FROM         dbo.rhh_emplea  WITH (NOLOCK) 
LEFT OUTER JOIN   dbo.rhh_foto WITH (NOLOCK) ON dbo.rhh_emplea.cod_emp = dbo.rhh_foto.cod_emp

```
