# View: v_gth_LiderEmplea

## Usa los objetos:
- [[Fn_rhh_NombreCompleto]]
- [[rhh_emplea]]

```sql
CREATE VIEW [dbo].[v_gth_LiderEmplea]
AS
SELECT        cod_emp AS cod_lider, dbo.Fn_rhh_NombreCompleto(cod_emp, 2) AS nom_lider
FROM            dbo.rhh_emplea
WHERE        (ind_lider = 1)

```
