# View: V_GTH_EmpEvaExternos

## Usa los objetos:
- [[GTH_EvaExternos]]
- [[rhh_emplea]]
- [[rhh_tbestlab]]

```sql

CREATE VIEW [dbo].[V_GTH_EmpEvaExternos]
AS
SELECT        E.cod_emp, RTRIM(E.ap1_emp) + RTRIM(' ' + E.ap2_emp) + RTRIM(' ' + E.nom_emp) + ' (' + RTRIM(nom_est) + ')' AS nom_emp
FROM            dbo.rhh_emplea AS E INNER JOIN
                         dbo.rhh_tbestlab AS EL ON E.est_lab = EL.est_lab
UNION ALL
SELECT        E.Cod_Eva_Ext AS cod_emp, E.Nom_Eva_Ext + ' - Eval. Externo' AS nom_emp
FROM            dbo.GTH_EvaExternos AS E

```
