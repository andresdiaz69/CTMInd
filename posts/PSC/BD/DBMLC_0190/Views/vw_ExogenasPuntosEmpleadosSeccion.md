# View: vw_ExogenasPuntosEmpleadosSeccion

## Usa los objetos:
- [[Cargos]]
- [[Centros]]
- [[Empleados]]
- [[Empresas]]
- [[EmpresasCentrosSecciones]]
- [[ExogenasPuntosEmpleadosSeccion]]
- [[Secciones]]
- [[Sedes]]

```sql


CREATE VIEW [dbo].[vw_ExogenasPuntosEmpleadosSeccion]
AS
SELECT        dbo.ExogenasPuntosEmpleadosSeccion.CodigoEmpleado, dbo.Empleados.Nombres, dbo.Empleados.Apellido1, dbo.Empleados.Apellido2, ISNULL(dbo.Empleados.Apellido1, N'') + N' ' + ISNULL(dbo.Empleados.Apellido2, N'') 
                         + N' ' + ISNULL(dbo.Empleados.Nombres, N'') AS Empleado, dbo.ExogenasPuntosEmpleadosSeccion.CodigoSeccion, dbo.Secciones.Seccion, dbo.Centros.CodigoCentro, dbo.Centros.NombreCentro, 
                         dbo.ExogenasPuntosEmpleadosSeccion.PuntosPIR, dbo.ExogenasPuntosEmpleadosSeccion.PuntosBolsa, dbo.ExogenasPuntosEmpleadosSeccion.PuntosPIT, dbo.Empresas.CodigoEmpresa, dbo.Empresas.NombreEmpresa, 
                         dbo.Cargos.CodigoCargo, dbo.Cargos.NombreCargo, dbo.Sedes.CodigoSede, dbo.Sedes.NombreSede, dbo.Sedes.PIRPorcentaje, dbo.Sedes.PIRPuntos, dbo.Sedes.BolsaPorcentaje, dbo.Sedes.BolsaPuntos, 
                         dbo.Sedes.PITPorcentaje, dbo.Sedes.PITPuntos, dbo.Empleados.FechaRetiro
FROM            dbo.Empresas RIGHT OUTER JOIN
                         dbo.ExogenasPuntosEmpleadosSeccion INNER JOIN
                         dbo.EmpresasCentrosSecciones ON dbo.ExogenasPuntosEmpleadosSeccion.CodigoSeccion = dbo.EmpresasCentrosSecciones.CodigoSeccion AND 
                         dbo.ExogenasPuntosEmpleadosSeccion.CodigoCentro = dbo.EmpresasCentrosSecciones.CodigoCentro INNER JOIN
                         dbo.Centros ON dbo.EmpresasCentrosSecciones.CodigoCentro = dbo.Centros.CodigoCentro INNER JOIN
                         dbo.Sedes ON dbo.Centros.CodigoSede = dbo.Sedes.CodigoSede INNER JOIN
                         dbo.Empleados ON dbo.ExogenasPuntosEmpleadosSeccion.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                         dbo.Secciones ON dbo.EmpresasCentrosSecciones.CodigoSeccion = dbo.Secciones.CodigoSeccion ON dbo.Empresas.CodigoEmpresa = dbo.Empleados.CodigoEmpresa LEFT OUTER JOIN
                         dbo.Cargos ON dbo.Empleados.CodigoCargo = dbo.Cargos.CodigoCargo


```
