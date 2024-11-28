# View: V_GTH_EvalSolCargo

## Usa los objetos:
- [[GTH_EvalSolCargo]]
- [[GTH_Evalua]]

```sql

CREATE VIEW [dbo].[V_GTH_EvalSolCargo]
AS
SELECT        dbo.GTH_EvalSolCargo.num_req, dbo.GTH_EvalSolCargo.cod_emp, dbo.GTH_EvalSolCargo.cod_eva, dbo.GTH_Evalua.Nom_eva
FROM            dbo.GTH_Evalua INNER JOIN
                         dbo.GTH_EvalSolCargo ON dbo.GTH_Evalua.cod_eva = dbo.GTH_EvalSolCargo.cod_eva


```
