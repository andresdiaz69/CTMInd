# View: V_SST_EmpleEstado

## Usa los objetos:
- [[rhh_emplea]]
- [[rhh_tbestlab]]

```sql
CREATE VIEW [dbo].[V_SST_EmpleEstado]
AS
SELECT        E.cod_emp, RTRIM(E.ap1_emp) + RTRIM(' ' + E.ap2_emp) + RTRIM(' ' + E.nom_emp) + ' (' + RTRIM(EL.nom_est) + ')' AS nom_emp
FROM            dbo.rhh_emplea AS E WITH (NOLOCK) INNER JOIN
                         dbo.rhh_tbestlab AS EL WITH (NOLOCK) ON E.est_lab = EL.est_lab

```
