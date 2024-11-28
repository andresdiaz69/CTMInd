# View: vw_EmpleadosDetalle

## Usa los objetos:
- [[Cargos]]
- [[Centros]]
- [[Empleados]]
- [[Empresas]]

```sql
CREATE VIEW [dbo].[vw_EmpleadosDetalle]
AS
SELECT        dbo.Empleados.CodigoEmpleado, dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, dbo.Empleados.Nombres, dbo.Empleados.Apellido1, dbo.Empleados.Apellido2, 
                         dbo.Empleados.FechaIngreso, dbo.Empleados.FechaRetiro, dbo.Empleados.CodigoCentro, dbo.Empleados.e_mail, dbo.Empleados.FechaNacimiento, dbo.Empresas.CodigoEmpresa, dbo.Empresas.NombreEmpresa, 
                         dbo.Empresas.NITEmpresa, 'Images\Reportes\' + CAST(dbo.Empleados.CodigoEmpresa AS varchar(2)) + '.png' AS UrlLogo, dbo.Cargos.CodigoCargo, dbo.Cargos.NombreCargo, dbo.Centros.NombreCentro, 
                         dbo.Empleados.nombre_marca
FROM            dbo.Empleados LEFT OUTER JOIN
                         dbo.Empresas ON dbo.Empleados.CodigoEmpresa = dbo.Empresas.CodigoEmpresa LEFT OUTER JOIN
                         dbo.Centros ON dbo.Empleados.CodigoCentro = dbo.Centros.CodigoCentro LEFT OUTER JOIN
                         dbo.Cargos ON dbo.Empleados.CodigoCargo = dbo.Cargos.CodigoCargo

```
