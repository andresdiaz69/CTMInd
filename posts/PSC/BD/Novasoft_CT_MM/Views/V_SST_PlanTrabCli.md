# View: V_SST_PlanTrabCli

## Usa los objetos:
- [[cxc_cliente]]
- [[SST_PlanAnualTrabajo]]

```sql
CREATE VIEW [dbo].[V_SST_PlanTrabCli]
	AS
	SELECT        P.anio, P.version, P.cod_cia, P.cod_suc, P.cod_cli, C.nom_cli
	FROM            dbo.SST_PlanAnualTrabajo AS P INNER JOIN
                         dbo.cxc_cliente AS C ON P.cod_cli = C.cod_cli
	GROUP		BY P.anio, P.version, P.cod_cia, P.cod_suc, P.cod_cli, C.nom_cli

```
