# View: V_SST_Instructor

## Usa los objetos:
- [[GTH_Emplea_Externo]]
- [[rhh_emplea]]
- [[rhh_tbestlab]]
- [[SST_ClasificaExterno]]

```sql
CREATE VIEW [dbo].[V_SST_Instructor]
AS
SELECT        E.cod_emp, RTRIM(E.ap1_emp) + RTRIM(' ' + E.ap2_emp) + RTRIM(' ' + E.nom_emp) + ' (' + RTRIM(EL.nom_est) + ')' AS nom_emp
FROM            dbo.rhh_emplea AS E WITH (NOLOCK) INNER JOIN
                         dbo.rhh_tbestlab AS EL WITH (NOLOCK) ON E.est_lab = EL.est_lab
UNION ALL
SELECT        E.cod_emp_ext AS cod_emp, RTRIM(E.nom_emp_ext) + ' (' + RTRIM(C.des_clas) + ')' AS nom_emp
FROM            GTH_Emplea_Externo AS E WITH (NOLOCK) INNER JOIN
                         SST_ClasificaExterno AS C WITH (NOLOCK) ON E.cod_clas = C.cod_clas
WHERE        E.cod_clas = 4

```
