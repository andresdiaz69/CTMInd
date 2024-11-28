# View: v_opr_empleados

## Usa los objetos:
- [[inv_item_cargos]]
- [[rhh_emplea]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_opr_empleados]
AS
SELECT        '%' AS cod_emp, SPACE(1) AS ap1_emp, SPACE(1) AS ap2_emp, SPACE(1) AS nom_emp, 'TODOS' AS n_completo, '%' cod_car, SPACE(1) AS tel_cel,  SPACE(1) AS fec_ing
UNION ALL
SELECT        '0' AS cod_emp, SPACE(1) AS ap1_emp, SPACE(1) AS ap2_emp, SPACE(1) AS nom_emp, 'NO APLICA' AS n_completo, '0' cod_car, SPACE(1) AS tel_cel,  SPACE(1) AS fec_ing
UNION ALL
SELECT DISTINCT emp.cod_emp, emp.ap1_emp, emp.ap2_emp, emp.nom_emp, 
RTRIM(emp.nom_emp) + ' ' + RTRIM(emp.ap1_emp) + ' ' + RTRIM(emp.ap2_emp) AS n_completo, 
emp.cod_car, emp.tel_cel, emp.fec_ing
FROM rhh_emplea AS emp WITH (NOLOCK) 
INNER JOIN inv_item_cargos AS ite WITH (NOLOCK) ON ite.cod_car = emp.cod_car
WHERE ite.cod_car <> '0'

```
