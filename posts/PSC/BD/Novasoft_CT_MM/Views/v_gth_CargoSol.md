# View: v_gth_CargoSol

## Usa los objetos:
- [[GTH_Requisicion]]
- [[GTH_RequisicionEmp]]
- [[rhh_cargos]]
- [[v_GTH_EmplCand]]

```sql

CREATE VIEW [dbo].[v_gth_CargoSol]
AS
SELECT        R.num_req, R.car_sol, C.nom_car, Re.cod_emp, EC.NOM_EMP, R.cod_cia, R.cod_cli
FROM            dbo.GTH_Requisicion AS R INNER JOIN
                         dbo.GTH_RequisicionEmp AS Re ON R.num_req = Re.num_req INNER JOIN
                         dbo.rhh_cargos AS C ON R.car_sol = C.cod_car INNER JOIN
                         dbo.v_GTH_EmplCand AS EC ON Re.cod_emp = EC.cod_emp

```
