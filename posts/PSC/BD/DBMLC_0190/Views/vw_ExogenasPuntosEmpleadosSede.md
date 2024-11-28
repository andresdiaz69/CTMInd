# View: vw_ExogenasPuntosEmpleadosSede

## Usa los objetos:
- [[Cargos]]
- [[Empleados]]
- [[Empresas]]
- [[ExogenasPuntosEmpleadosSede]]
- [[Sedes]]

```sql




CREATE VIEW [dbo].[vw_ExogenasPuntosEmpleadosSede]
AS
SELECT        dbo.ExogenasPuntosEmpleadosSede.CodigoEmpleado, dbo.Empleados.Nombres, dbo.Empleados.Apellido1, dbo.Empleados.Apellido2, ISNULL(dbo.Empleados.Apellido1, N'') + N' ' + ISNULL(dbo.Empleados.Apellido2, N'') 
                         + N' ' + ISNULL(dbo.Empleados.Nombres, N'') AS Empleado, dbo.ExogenasPuntosEmpleadosSede.CodigoSede, dbo.Sedes.NombreSede, dbo.ExogenasPuntosEmpleadosSede.PuntosPIR, 
                         dbo.ExogenasPuntosEmpleadosSede.PuntosBolsa, dbo.ExogenasPuntosEmpleadosSede.PuntosPIT, dbo.Empresas.CodigoEmpresa, dbo.Empresas.NombreEmpresa, dbo.Cargos.CodigoCargo, dbo.Cargos.NombreCargo, 
                         dbo.Sedes.PIRPorcentaje, dbo.Sedes.PIRPuntos, dbo.Sedes.BolsaPorcentaje, dbo.Sedes.BolsaPuntos, dbo.Sedes.PITPorcentaje, dbo.Sedes.PITPuntos, dbo.Empleados.FechaRetiro
FROM            dbo.Cargos RIGHT OUTER JOIN
                         dbo.Empresas RIGHT OUTER JOIN
                         dbo.Sedes INNER JOIN
                         dbo.ExogenasPuntosEmpleadosSede INNER JOIN
                         dbo.Empleados ON dbo.ExogenasPuntosEmpleadosSede.CodigoEmpleado = dbo.Empleados.CodigoEmpleado ON dbo.Sedes.CodigoSede = dbo.ExogenasPuntosEmpleadosSede.CodigoSede ON 
                         dbo.Empresas.CodigoEmpresa = dbo.Empleados.CodigoEmpresa ON dbo.Cargos.CodigoCargo = dbo.Empleados.CodigoCargo


```
