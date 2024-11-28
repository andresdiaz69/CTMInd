# View: v_rhh_hisantic

## Usa los objetos:
- [[rhh_hisantic]]

```sql

CREATE VIEW [dbo].[v_rhh_hisantic]
AS
SELECT     cod_emp, num_rad, reg_sal, fdo_ces, fec_sol, tip_sol, ind_int, ind_sol, val_sol, ind_des, ind_pag, fec_pag, res_pag, res_fec, val_pag, int_ces, 
                      int_antic, ide_ben, ind_tut, fec_tut, mot_tut, juz_tut, fal_tut, obs_tut, fac_tut, per_ini, per_fin, bas_l01, bas_l02, bas_l03, bas_l04, bas_l05, bas_l06, 
                      bas_l07, bas_l08, bas_l09, bas_l10, bas_l11, bas_l12, bas_l13, bas_l14, bas_l15, bas_l16, bas_l17, bas_l18, bas_l19, bas_l20, ces_bru, val_ant, 
                      val_mor, dia_cau, dia_lic, base, ind_cie, val_pag AS ValPag, int_ces AS IntCes, NroResol, Tip_Nov, Fec_Nov, Tip_Doc, Nro_TipDoc, cod_JefeI, Observ
FROM         dbo.rhh_hisantic

```
