# View: v_opr_emplea_sinfiltro

## Usa los objetos:
- [[rhh_emplea]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_opr_emplea_sinfiltro]
AS

SELECT	emp.cod_emp, emp.ap1_emp, emp.ap2_emp, emp.nom_emp, RTRIM(emp.nom_emp) + ' ' + RTRIM(emp.ap1_emp) + ' ' + RTRIM(emp.ap2_emp) AS n_completo
FROM    rhh_emplea AS emp WITH (NOLOCK) 
WHERE	est_lab NOT IN ('00','99')

```
