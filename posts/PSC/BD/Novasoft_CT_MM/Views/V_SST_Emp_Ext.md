# View: V_SST_Emp_Ext

## Usa los objetos:
- [[Fn_rhh_NombreCompleto]]
- [[GTH_Emplea_Externo]]
- [[rhh_emplea]]

```sql
CREATE VIEW V_SST_Emp_Ext AS
	SELECT cod_emp AS 'codigo', dbo.Fn_rhh_NombreCompleto(cod_emp, 2) AS 'nombre', cod_cia
	FROM rhh_emplea
	UNION
	SELECT cod_emp_ext, nom_emp_ext, '9999'
	FROM GTH_Emplea_Externo;
```
