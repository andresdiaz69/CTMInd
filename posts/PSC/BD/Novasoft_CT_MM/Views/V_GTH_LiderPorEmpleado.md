# View: V_GTH_LiderPorEmpleado

## Usa los objetos:
- [[Fn_rhh_NombreCompleto]]
- [[gth_RolLider]]
- [[rhh_emplea]]

```sql
CREATE VIEW [dbo].[V_GTH_LiderPorEmpleado]
AS
SELECT        E.cod_emp AS cod_lider, dbo.Fn_rhh_NombreCompleto(E.cod_emp, 1) AS nom_lider, RL.cod_emp
FROM            dbo.rhh_emplea AS E INNER JOIN
                         dbo.gth_RolLider AS RL ON E.cod_emp = RL.cod_lider
WHERE        (E.ind_lider = 1) AND (RL.fecha_fin IS NULL)

```
