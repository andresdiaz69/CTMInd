# View: V_SST_EvaluaProvCont

## Usa los objetos:
- [[SST_ProveedorEvalua]]
- [[V_SST_EmpExterno]]
- [[V_SST_EvalProvCont]]

```sql
CREATE VIEW [dbo].[V_SST_EvaluaProvCont]
AS
SELECT        E.cod_prov, convert(char, E.fec_asig, 103) AS fec_asig, E.cod_eva, EV.Nom_eva, E.cod_emp_evado, EE.nom_emp
FROM            dbo.SST_ProveedorEvalua AS E INNER JOIN
                         dbo.V_SST_EvalProvCont AS EV ON E.cod_eva = EV.cod_eva INNER JOIN
                         dbo.V_SST_EmpExterno AS EE ON E.cod_emp_evado = EE.cod_emp

```
