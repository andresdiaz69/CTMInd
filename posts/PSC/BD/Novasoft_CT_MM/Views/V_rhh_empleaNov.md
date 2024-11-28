# View: V_rhh_empleaNov

## Usa los objetos:
- [[fn_rhh_Empleados_Usuario]]
- [[fn_sis_GetUsuActual]]
- [[rhh_emplea]]

```sql

 CREATE VIEW [dbo].[V_rhh_empleaNov]
 AS
 SELECT rhh_emplea.cod_emp,ap1_emp,ap2_emp,nom_emp 
 FROM	rhh_emplea 
 INNER	JOIN dbo.fn_rhh_Empleados_Usuario(dbo.fn_sis_GetUsuActual(),null,null) F on F.cod_emp = rhh_emplea.cod_emp

```
