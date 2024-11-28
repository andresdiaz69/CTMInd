# View: V_GTH_CandCambCed

## Usa los objetos:
- [[GTH_RptEmplea]]
- [[rhh_emplea]]

```sql


CREATE VIEW [dbo].[V_GTH_CandCambCed]
AS
SELECT        RTRIM(cod_emp) AS cod_emp, RTRIM(ap1_emp) + RTRIM(' ' + ap2_emp) + RTRIM(' ' + nom_emp) AS nom_emp
FROM            dbo.GTH_RptEmplea
WHERE        (cod_emp NOT IN
                             (SELECT        cod_emp
                               FROM            dbo.rhh_emplea))

```
