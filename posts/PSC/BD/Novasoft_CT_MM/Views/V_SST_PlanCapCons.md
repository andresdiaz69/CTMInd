# View: V_SST_PlanCapCons

## Usa los objetos:
- [[SST_DetPlanAnualCapac]]
- [[SST_TipoCapacitacion]]

```sql
CREATE VIEW [dbo].[V_SST_PlanCapCons]
AS
SELECT        P.anio, P.version, P.cons, TC.des_cap, P.cod_cia, P.cod_suc, P.cod_cli
FROM            dbo.SST_DetPlanAnualCapac AS P INNER JOIN
                         dbo.SST_TipoCapacitacion AS TC ON P.tip_cap = TC.tip_cap
GROUP		BY  P.anio, P.version, P.cons, TC.des_cap, P.cod_cia, P.cod_suc, P.cod_cli

```
