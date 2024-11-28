# View: v_GTH_EvenCapac

## Usa los objetos:
- [[GTH_Eventos]]

```sql

CREATE VIEW [dbo].[v_GTH_EvenCapac]
AS
SELECT        cod_even, nom_even, cod_cia, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_cl4, cod_cl5, cod_cl6, cod_cl7, cod_area, tip_eve, Descrip_even, nom_instruc, fch_prog, fec_eje, Eval_Even, Obs_Even, val_pre, val_eje, 
                         Asist_pre, Asist_real, Fec_cierre, Entidad, Cod_est, Dura_even, cod_estud, cod_ins, cod_conv, tip_Comp_Org, cod_comp, cod_eva, ind_abierto, niv_aprob, cod_eje_tema, fec_insc_ini, fec_insc_fin, ind_insc_vol,
						 cod_prov, doc_anx, nom_anx, cod_rel_clima
FROM            dbo.GTH_Eventos
WHERE        (tip_eve = '001')

```
