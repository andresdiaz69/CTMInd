# View: V_SST_HvBrigadista

## Usa los objetos:
- [[rhh_emplea]]
- [[SST_IntegraBrigada]]

```sql
CREATE VIEW [dbo].[V_SST_HvBrigadista]
AS
SELECT        I.cod_emp, E.ap1_emp, E.ap2_emp, E.nom_emp, DATEDIFF(yy, E.fec_nac, GETDATE()) AS edad, E.fec_nac, E.cod_ciu, E.cod_dep, E.cod_pai, E.num_ide, E.tip_ide, E.ciu_exp, E.dpt_exp, E.pai_exp, E.dir_res, E.tel_res, E.tel_cel, 
                         E.avi_emp, E.est_civ, E.tam_emp, E.pes_emp, E.cod_car, E.tip_con, E.Niv_aca, I.exp_brigada, I.fto_emp, I.id_uniq
FROM            dbo.rhh_emplea AS E INNER JOIN
                         dbo.SST_IntegraBrigada AS I ON E.cod_emp = I.cod_emp

```
