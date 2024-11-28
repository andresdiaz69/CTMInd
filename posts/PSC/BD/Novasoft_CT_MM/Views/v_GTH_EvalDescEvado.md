# View: v_GTH_EvalDescEvado

## Usa los objetos:
- [[GTH_EvaDesemAsig]]
- [[rhh_emplea]]

```sql
CREATE VIEW [dbo].[v_GTH_EvalDescEvado]
AS
SELECT        EDA.cod_emp_evado, RTRIM(E.nom_emp) + ' ' + RTRIM(E.ap1_emp) + ' ' + RTRIM(E.ap2_emp) AS nom_emp, EDA.cod_eva_des, EDA.cod_cia, EDA.cod_grup_val
FROM            dbo.GTH_EvaDesemAsig AS EDA INNER JOIN
                         dbo.rhh_emplea AS E ON EDA.cod_emp_evado = E.cod_emp
GROUP BY EDA.cod_emp_evado, E.nom_emp, E.ap2_emp, E.ap1_emp, EDA.cod_eva_des, EDA.cod_cia, EDA.cod_grup_val

```
