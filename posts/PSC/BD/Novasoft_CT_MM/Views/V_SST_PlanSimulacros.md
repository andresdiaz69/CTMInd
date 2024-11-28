# View: V_SST_PlanSimulacros

## Usa los objetos:
- [[GTH_Evalua]]
- [[SST_PlanSimulacro]]
- [[V_SST_EmpExterno]]

```sql
CREATE VIEW [dbo].[V_SST_PlanSimulacros]
AS
SELECT	P.cod_cia, P.anio, P.version, P.cod_cli, P.cod_suc, P.cons, P.cod_plan, P.emp_resp, V.nom_emp, P.cod_eva, E.Nom_eva
FROM	SST_PlanSimulacro AS P
INNER	JOIN V_SST_EmpExterno AS V ON P.emp_resp = V.cod_emp
INNER	JOIN GTH_Evalua AS E ON P.cod_eva = E.cod_eva

```
