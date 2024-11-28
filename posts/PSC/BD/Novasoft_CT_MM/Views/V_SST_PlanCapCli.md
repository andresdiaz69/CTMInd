# View: V_SST_PlanCapCli

## Usa los objetos:
- [[cxc_cliente]]
- [[SST_PlanAnualCapac]]

```sql
CREATE VIEW [dbo].[V_SST_PlanCapCli]
AS
SELECT        P.anio, P.version, P.cod_cia, P.cod_suc, P.cod_cli, C.nom_cli
FROM            dbo.SST_PlanAnualCapac AS P INNER JOIN
                         dbo.cxc_cliente AS C ON P.cod_cli = C.cod_cli
GROUP		BY P.anio, P.version, P.cod_cia, P.cod_suc, P.cod_cli, C.nom_cli

```
