# View: vw_ExogenasPuntosEmpleadosCentro

## Usa los objetos:
- [[Cargos]]
- [[Centros]]
- [[Empleados]]
- [[Empresas]]
- [[ExogenasPuntosEmpleadosCentro]]
- [[Sedes]]

```sql



CREATE VIEW [dbo].[vw_ExogenasPuntosEmpleadosCentro]
AS
SELECT        dbo.ExogenasPuntosEmpleadosCentro.CodigoEmpleado, dbo.Empleados.Nombres, dbo.Empleados.Apellido1, dbo.Empleados.Apellido2, ISNULL(dbo.Empleados.Apellido1, N'') + N' ' + ISNULL(dbo.Empleados.Apellido2, N'') 
                         + N' ' + ISNULL(dbo.Empleados.Nombres, N'') AS Empleado, dbo.ExogenasPuntosEmpleadosCentro.CodigoCentro, dbo.Centros.NombreCentro, dbo.ExogenasPuntosEmpleadosCentro.PuntosPIR, 
                         dbo.ExogenasPuntosEmpleadosCentro.PuntosBolsa, dbo.ExogenasPuntosEmpleadosCentro.PuntosPIT, dbo.Empresas.NombreEmpresa, dbo.Cargos.CodigoCargo, dbo.Cargos.NombreCargo, dbo.Sedes.CodigoSede, 
                         dbo.Sedes.NombreSede, dbo.Sedes.PIRPorcentaje, dbo.Sedes.PIRPuntos, dbo.Sedes.BolsaPorcentaje, dbo.Sedes.BolsaPuntos, dbo.Sedes.PITPorcentaje, dbo.Sedes.PITPuntos, dbo.Empleados.FechaRetiro, 
                         dbo.Empresas.CodigoEmpresa
FROM            dbo.Cargos RIGHT OUTER JOIN
                         dbo.Empresas RIGHT OUTER JOIN
                         dbo.Centros INNER JOIN
                         dbo.ExogenasPuntosEmpleadosCentro INNER JOIN
                         dbo.Empleados ON dbo.ExogenasPuntosEmpleadosCentro.CodigoEmpleado = dbo.Empleados.CodigoEmpleado ON dbo.Centros.CodigoCentro = dbo.ExogenasPuntosEmpleadosCentro.CodigoCentro INNER JOIN
                         dbo.Sedes ON dbo.Centros.CodigoSede = dbo.Sedes.CodigoSede ON dbo.Empresas.CodigoEmpresa = dbo.Empleados.CodigoEmpresa ON dbo.Cargos.CodigoCargo = dbo.Empleados.CodigoCargo


```
