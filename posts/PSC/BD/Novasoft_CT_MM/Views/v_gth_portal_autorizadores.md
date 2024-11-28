# View: v_gth_portal_autorizadores

## Usa los objetos:
- [[gen_usuarios]]
- [[prt_autorizadores]]
- [[rhh_emplea]]

```sql

CREATE VIEW [dbo].[v_gth_portal_autorizadores]
AS
SELECT        dor.codAutorizador AS cod_emp, RTRIM(emp.nom_emp) + ' ' + RTRIM(emp.ap1_emp) + ' ' + RTRIM(emp.ap2_emp) AS nombre, dor.estado
FROM            dbo.prt_autorizadores AS dor INNER JOIN
                         dbo.rhh_emplea AS emp ON dor.codAutorizador = emp.cod_emp INNER JOIN
                         dbo.gen_usuarios ON emp.cod_emp = dbo.gen_usuarios.cod_emp
WHERE        (dor.estado = 1)


```
