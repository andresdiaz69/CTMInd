# View: vw_ComisionesManualesEmpleados

## Usa los objetos:
- [[Cargos]]
- [[Empleados]]
- [[Empresas]]

```sql

CREATE VIEW [com].[vw_ComisionesManualesEmpleados]
AS
SELECT  e.CodigoEmpleado, e.Nombres, e.Apellido1, e.Apellido2, CONCAT(e.Nombres, ' ', e.Apellido1, ' ', e.Apellido2) NombreEmpleado, 
		e.CodigoEmpresa, emp.NombreEmpresa, e.CodigoCargo, c.NombreCargo, FechaIngreso, FechaRetiro, CodigoCentro, cod_marca, 
		nombre_marca, e_mail, FechaNacimiento 

FROM Empleados as e 
  join Cargos c on c.CodigoCargo = e.CodigoCargo
  join Empresas emp on  emp.CodigoEmpresa = e.CodigoEmpresa

```
