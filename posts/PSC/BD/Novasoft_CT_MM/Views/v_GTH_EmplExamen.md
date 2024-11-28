# View: v_GTH_EmplExamen

## Usa los objetos:
- [[Fn_rhh_NombreCompleto]]
- [[GTH_RequisicionEmp]]
- [[GTH_RptEmplea]]
- [[rhh_emplea]]

```sql
CREATE VIEW [dbo].[v_GTH_EmplExamen]
AS
SELECT	cod_emp, dbo.Fn_rhh_NombreCompleto(cod_emp, 1) AS NOM_EMP, e_mail
FROM	rhh_emplea
UNION	ALL
SELECT	E.cod_emp, ISNULL(RTRIM(E.ap1_emp), '') + SPACE(1) + ISNULL(RTRIM(E.ap2_emp), '') + SPACE(1) + ISNULL(RTRIM(E.nom_emp), '') AS NOM_EMP, e_mail
FROM	GTH_RptEmplea AS E
INNER	JOIN GTH_RequisicionEmp AS RE ON E.cod_emp = RE.cod_emp
WHERE	E.cod_est != '03'
		AND RE.cod_est_cand NOT IN ('01', '02')
		AND E.cod_emp NOT IN (SELECT cod_emp FROM rhh_emplea)
UNION	ALL
SELECT	cod_emp, ISNULL(RTRIM(ap1_emp), '') + SPACE(1) + ISNULL(RTRIM(ap2_emp), '') + SPACE(1) + ISNULL(RTRIM(nom_emp), '') AS NOM_EMP, e_mail
FROM	GTH_RptEmplea
WHERE	cod_est != '03'
		AND cod_emp NOT IN (SELECT cod_emp FROM rhh_emplea)
		AND cod_emp NOT IN (SELECT cod_emp FROM GTH_RequisicionEmp)

```
