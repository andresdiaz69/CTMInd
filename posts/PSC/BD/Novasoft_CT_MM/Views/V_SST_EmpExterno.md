# View: V_SST_EmpExterno

## Usa los objetos:
- [[GTH_Emplea_Externo]]
- [[rhh_emplea]]
- [[rhh_tbestlab]]
- [[SST_ClasificaExterno]]

```sql

CREATE VIEW [dbo].[V_SST_EmpExterno]
AS
SELECT        E.cod_emp, RTRIM(E.ap1_emp) + RTRIM(' ' + E.ap2_emp) + RTRIM(' ' + E.nom_emp) AS nom_emp
FROM            dbo.rhh_emplea AS E INNER JOIN
                         dbo.rhh_tbestlab AS EL ON E.est_lab = EL.est_lab
UNION ALL
SELECT        E.cod_emp_ext AS cod_emp, E.nom_emp_ext AS nom_emp
FROM            GTH_Emplea_Externo AS E INNER JOIN
                         SST_ClasificaExterno AS C ON E.cod_clas = C.cod_clas


```
