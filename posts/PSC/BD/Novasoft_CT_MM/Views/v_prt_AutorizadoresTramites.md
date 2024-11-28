# View: v_prt_AutorizadoresTramites

## Usa los objetos:
- [[prt_autorizadores]]
- [[rhh_emplea]]

```sql


CREATE VIEW [dbo].[v_prt_AutorizadoresTramites]
AS
	SELECT        RTRIM(emp.nom_emp) + ' ' + RTRIM(emp.ap1_emp) + ' ' + RTRIM(emp.ap2_emp) AS Nombre, emp.e_mail_alt AS Correo, dor.usu_win, dor.estado,emp.cod_emp 
	FROM            dbo.rhh_emplea AS emp INNER JOIN
							 dbo.prt_autorizadores AS dor ON emp.cod_emp = dor.codAutorizador
	WHERE        (emp.est_lab NOT IN ('00', '99'))


```
