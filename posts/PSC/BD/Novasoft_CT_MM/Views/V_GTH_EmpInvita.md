# View: V_GTH_EmpInvita

## Usa los objetos:
- [[rhh_emplea]]
- [[rhh_tbestlab]]

```sql

CREATE VIEW [dbo].[V_GTH_EmpInvita]
AS
SELECT        E.cod_emp, RTRIM(E.ap1_emp) + RTRIM(' ' + E.ap2_emp) + RTRIM(' ' + E.nom_emp) + ' (' + RTRIM(EL.nom_est) + ')' AS Nom_Emp
FROM            dbo.rhh_emplea AS E INNER JOIN
                         dbo.rhh_tbestlab AS EL ON E.est_lab = EL.est_lab

```
