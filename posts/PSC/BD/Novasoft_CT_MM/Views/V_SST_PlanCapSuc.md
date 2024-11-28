# View: V_SST_PlanCapSuc

## Usa los objetos:
- [[gen_sucursal]]
- [[SST_PlanAnualCapac]]

```sql
CREATE VIEW [dbo].[V_SST_PlanCapSuc]
AS
SELECT        P.anio, P.version, P.cod_cia, P.cod_suc, S.nom_suc
FROM            dbo.SST_PlanAnualCapac AS P INNER JOIN
                         dbo.gen_sucursal AS S ON P.cod_suc = S.cod_suc
GROUP		BY P.anio, P.version, P.cod_cia, P.cod_suc, S.nom_suc

```
