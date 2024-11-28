# View: v_GTH_EvalDescEvador

## Usa los objetos:
- [[GTH_EvaDesemAsig]]
- [[V_GTH_EVALDESEM]]

```sql
CREATE VIEW [dbo].[v_GTH_EvalDescEvador]
AS
SELECT        A.cod_emp_evador, E.nom_emp_evador, A.cod_eva_des, A.cod_emp_evado, A.cod_cia, A.cod_grup_val
FROM            dbo.GTH_EvaDesemAsig AS A INNER JOIN
                         dbo.V_GTH_EVALDESEM AS E ON A.cod_emp_evador = E.cod_evador
GROUP BY A.cod_emp_evador, E.nom_emp_evador, A.cod_eva_des, A.cod_emp_evado, A.cod_cia, A.cod_grup_val

```
