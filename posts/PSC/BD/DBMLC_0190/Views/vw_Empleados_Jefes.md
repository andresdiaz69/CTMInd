# View: vw_Empleados_Jefes

## Usa los objetos:
- [[EmpleadosActivos]]
- [[JerarquiaEmpleados]]

```sql
CREATE VIEW vw_Empleados_Jefes AS 
SELECT docEmpleado, nomnreEmpleado, correoEmpleado, docJefe, nombreJefe, correoJefe
FROM(
	SELECT docEmpleado=a.Documento, nomnreEmpleado=a.nombre, correoEmpleado=a.Email_Corporativo, docJefe= d.CC_Jefe1, nombreJefe=e.nombre , correoJefe=e.Email_Corporativo
	FROM(
		SELECT Documento, nombre, Email_Corporativo 
		FROM( SELECT orden=row_number() OVER (PARTITION BY a.Documento ORDER BY Ano_Periodo desc), a.Documento, a.Ano_Periodo, a.Mes_Periodo
		, nombre=a.Nombres+' '+a.Apellido1+' '+a.Apellido2
		,Email_Corporativo =CASE WHEN a.Email_Corporativo =''     THEN a.email 
								 WHEN a.Email_Corporativo IS NULL THEN a.email  ELSE a.Email_Corporativo end
		FROM [DBMLC_0190].dbo.EmpleadosActivos a )b WHERE orden = 1  
	)a
	LEFT JOIN [DBMLC_0190].dbo.JerarquiaEmpleados d ON a.Documento=d.Cedula
	LEFT JOIN (SELECT Documento, Email_Corporativo, nombre 
			   FROM( SELECT orden=row_number() OVER (PARTITION BY a.Documento ORDER BY Ano_Periodo desc), a.Documento, a.Ano_Periodo, a.Mes_Periodo
			   , nombre=a.Nombres+' '+a.Apellido1+' '+a.Apellido2, Email_Corporativo =case when  a.Email_Corporativo ='' or a.Email_Corporativo is null then a.email else a.Email_Corporativo end
			   FROM [DBMLC_0190].dbo.EmpleadosActivos a )b WHERE orden = 1)  e ON d.CC_Jefe1=e.Documento
)b
```
