# View: V_GTH_OtroActores

## Usa los objetos:
- [[Fn_rhh_NombreCompleto]]
- [[GTH_Emplea_Externo]]
- [[rhh_emplea]]

```sql
CREATE VIEW [dbo].[V_GTH_OtroActores]
	AS
	SELECT cod_emp AS codigo, UPPER(RTRIM(dbo.Fn_rhh_NombreCompleto(cod_emp, 2))) AS descripcion FROM rhh_emplea
	UNION
	SELECT cod_emp_ext AS codigo, nom_emp_ext AS descripcion FROM GTH_Emplea_Externo;

```
