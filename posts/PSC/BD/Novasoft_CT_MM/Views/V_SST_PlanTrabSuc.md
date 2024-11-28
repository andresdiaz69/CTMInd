# View: V_SST_PlanTrabSuc

## Usa los objetos:
- [[gen_sucursal]]
- [[SST_PlanAnualTrabajo]]

```sql
CREATE VIEW [dbo].[V_SST_PlanTrabSuc]
	AS
	SELECT        P.anio, P.version, P.cod_cia, P.cod_suc, S.nom_suc
	FROM            dbo.SST_PlanAnualTrabajo AS P INNER JOIN
                         dbo.gen_sucursal AS S ON P.cod_suc = S.cod_suc
	GROUP		BY P.anio, P.version, P.cod_cia, P.cod_suc, S.nom_suc

```
