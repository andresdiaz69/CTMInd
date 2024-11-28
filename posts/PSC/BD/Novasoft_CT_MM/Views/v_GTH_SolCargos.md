# View: v_GTH_SolCargos

## Usa los objetos:
- [[cxc_cliente]]
- [[gen_compania]]
- [[GTH_Requisicion]]
- [[rhh_cargos]]
- [[rhh_Convenio]]
- [[rhh_emplea]]

```sql

CREATE VIEW [dbo].[v_GTH_SolCargos]
AS
SELECT        R.num_req, C.nom_car, R.fec_sol, R.car_sol, R.cod_cia, CP.nom_cia, R.cod_cli, CL.nom_cli, R.cod_conv, CV.nom_conv, R.emp_resp, RTRIM(E.nom_emp) + ' ' + RTRIM(E.ap1_emp) + ' ' + RTRIM(E.ap2_emp) 
                         AS nom_resp, R.cod_est
FROM            dbo.GTH_Requisicion AS R INNER JOIN
                         dbo.rhh_cargos AS C ON R.car_sol = C.cod_car INNER JOIN
                         dbo.rhh_emplea AS E ON R.emp_resp = E.cod_emp INNER JOIN
                         dbo.gen_compania AS CP ON R.cod_cia = CP.cod_cia INNER JOIN
                         dbo.rhh_Convenio AS CV ON R.cod_conv = CV.cod_conv LEFT OUTER JOIN
                         dbo.cxc_cliente AS CL ON R.cod_cli = CL.cod_cli

```
