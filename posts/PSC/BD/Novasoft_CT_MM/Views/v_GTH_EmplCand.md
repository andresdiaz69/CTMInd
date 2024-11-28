# View: v_GTH_EmplCand

## Usa los objetos:
- [[GTH_RptEmplea]]
- [[rhh_emplea]]

```sql
CREATE VIEW [dbo].[v_GTH_EmplCand]
AS
SELECT        cod_emp, ISNULL(RTRIM(ap1_emp), '') + SPACE(1) + ISNULL(RTRIM(ap2_emp), '') + SPACE(1) + ISNULL(RTRIM(nom_emp), '') AS NOM_EMP, e_mail
FROM            rhh_emplea
UNION ALL
SELECT        cod_emp, ISNULL(RTRIM(ap1_emp), '') + SPACE(1) + ISNULL(RTRIM(ap2_emp), '') + SPACE(1) + ISNULL(RTRIM(nom_emp), '') AS NOM_EMP, e_mail
FROM            GTH_RptEmplea
WHERE        cod_est != '03' AND cod_emp NOT IN (SELECT cod_emp FROM rhh_emplea)

```
