# View: v_gth_AutorizadoresTramites

## Usa los objetos:
- [[prt_autorizadores]]
- [[rhh_emplea]]

```sql


CREATE VIEW [dbo].[v_gth_AutorizadoresTramites]
AS
	
	SELECT   dor.codAutorizador AS cod_emp, RTRIM(emp.nom_emp) + ' ' + RTRIM(emp.ap1_emp) + ' ' + RTRIM(emp.ap2_emp) AS Nombre
	FROM     dbo.rhh_emplea AS emp INNER JOIN
	         dbo.prt_autorizadores AS dor ON emp.cod_emp = dor.codAutorizador

```
