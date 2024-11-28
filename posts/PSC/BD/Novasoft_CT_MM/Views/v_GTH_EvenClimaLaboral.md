# View: v_GTH_EvenClimaLaboral

## Usa los objetos:
- [[GTH_Eventos]]

```sql
CREATE VIEW [dbo].[v_GTH_EvenClimaLaboral]
AS
SELECT     cod_even, nom_even, cod_cia, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_cl4, cod_cl5, cod_cl6, cod_cl7, cod_area, tip_eve, Descrip_even, 
                      nom_instruc, fch_prog, Eval_Even, Obs_Even, val_pre, val_eje, Asist_pre, Asist_real, Fec_cierre, Entidad, 
                      cod_eva, niv_aprob, Cod_Dependencia, Cod_grupo_interno
FROM         dbo.GTH_Eventos
WHERE     (tip_eve = '006')

```
