# View: V_SST_PlanTrabCons

## Usa los objetos:
- [[cxc_cliente]]
- [[gen_sucursal]]
- [[SST_DetPlanAnualTrabajo]]
- [[SST_PlanAnualTrabajo]]
- [[SST_Subprocesos]]

```sql

CREATE VIEW [dbo].[V_SST_PlanTrabCons]
AS
SELECT DET.cod_cia, DET.anio, PAT.des_anio, DET.version, DET.cod_cli, CLI.nom_cli, DET.cod_suc, SUC.nom_suc, DET.cons, SUB.des_subproc
FROM SST_DetPlanAnualTrabajo AS DET
INNER JOIN SST_PlanAnualTrabajo AS PAT ON DET.cod_cia = PAT.cod_cia AND DET.anio = PAT.anio AND DET.version = PAT.version AND DET.cod_cli = PAT.cod_cli AND DET.cod_suc = PAT.cod_suc
INNER JOIN SST_Subprocesos AS SUB ON DET.sub_proc = SUB.sub_proc
INNER JOIN cxc_cliente AS CLI ON DET.cod_cli = CLI.cod_cli
INNER JOIN gen_sucursal AS SUC ON DET.cod_suc = SUC.cod_suc
GROUP BY DET.cod_cia, DET.anio, PAT.des_anio, DET.version, DET.cod_cli, CLI.nom_cli, DET.cod_suc, SUC.nom_suc, DET.cons, SUB.des_subproc;

```
