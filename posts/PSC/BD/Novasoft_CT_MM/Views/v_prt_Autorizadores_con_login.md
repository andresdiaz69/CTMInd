# View: v_prt_Autorizadores_con_login

## Usa los objetos:
- [[gen_usuarios]]
- [[prt_autorizadores]]
- [[rhh_emplea]]

```sql
CREATE VIEW [dbo].[v_prt_Autorizadores_con_login]
AS
SELECT        aut.codAutorizador, aut.nombre
FROM            dbo.prt_autorizadores AS aut INNER JOIN
                         dbo.gen_usuarios AS usu ON aut.codAutorizador = usu.cod_emp INNER JOIN
                         dbo.rhh_emplea ON usu.cod_emp = dbo.rhh_emplea.cod_emp
WHERE        (aut.estado = 1) AND (dbo.rhh_emplea.est_lab <> '99')

```
