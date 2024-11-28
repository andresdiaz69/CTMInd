# View: v_GTH_RespSolCargo

## Usa los objetos:
- [[GTH_Emplea_Externo]]
- [[rhh_emplea]]

```sql

CREATE VIEW [dbo].[v_GTH_RespSolCargo]
AS
SELECT        cod_emp AS CODIGO, RTRIM(nom_emp) + ' ' + RTRIM(ap1_emp) + ' ' + RTRIM(ap2_emp) AS NOMBRE, e_mail
FROM            rhh_emplea
UNION ALL
SELECT        cod_emp_ext AS CODIGO, nom_emp_ext AS NOMBRE, e_mail
FROM            GTH_Emplea_Externo
WHERE        cod_emp_ext NOT IN
                             (SELECT        cod_emp
                               FROM            rhh_emplea)

```
