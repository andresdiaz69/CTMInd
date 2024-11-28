# View: vw_Viaticos_JerarquiaEmpleados

## Usa los objetos:
- [[JerarquiaEmpleados]]

```sql

 CREATE VIEW vw_Viaticos_JerarquiaEmpleados
 AS
 SELECT a.Cedula CedulaEmpleado,      a.Nombre NombreEmpleado,      a.CC_Jefe1 CedulaJefeEmpelado, 
	    b.Cedula CedulaJefe,          b.Nombre NombreJefe,          b.CC_Jefe1 CedulaJefedelJefe,
		c.Nombre Nombre_JefedelJefe,  c.Cedula Cedula_JefedelJefe,  c.CC_Jefe1 Cedula_Jefe_JefedelJefe
   FROM JerarquiaEmpleados a
   JOIN JerarquiaEmpleados b ON a.CC_Jefe1 = b.Cedula
   JOIN JerarquiaEmpleados c ON b.CC_Jefe1 = c.Cedula
```
