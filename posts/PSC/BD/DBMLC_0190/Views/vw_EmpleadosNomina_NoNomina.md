# View: vw_EmpleadosNomina_NoNomina

## Usa los objetos:
- [[Jerarquia_EmpleadosNoNomina]]
- [[JerarquiaEmpleados]]

```sql
CREATE VIEW [dbo].[vw_EmpleadosNomina_NoNomina] AS
SELECT DISTINCT Cedula, Nombre = REPLACE(REPLACE(REPLACE(Nombre,' ','<>'),'><',''),'<>',' ')
FROM 
(
	SELECT Cedula, Nombre FROM Jerarquia_EmpleadosNoNomina
	UNION ALL
	SELECT Cedula, Nombre FROM JerarquiaEmpleados
)a

```
