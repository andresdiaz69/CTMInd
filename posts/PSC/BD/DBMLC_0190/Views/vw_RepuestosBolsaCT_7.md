# View: vw_RepuestosBolsaCT_7

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_RangosVersionesMax]]
- [[vw_RepuestosBolsaCT_6]]

```sql
CREATE VIEW [dbo].[vw_RepuestosBolsaCT_7]
AS
SELECT        dbo.vw_RepuestosBolsaCT_6.Ano_Periodo, dbo.vw_RepuestosBolsaCT_6.Mes_Periodo, dbo.vw_RepuestosBolsaCT_6.CodigoEmpresa, dbo.Empleados.CodigoEmpleado, 
                         dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, dbo.Empleados.FechaIngreso, dbo.Empleados.DiasLaboradosMesIngreso, dbo.Empleados.FechaRetiro, 
                         dbo.vw_RepuestosBolsaCT_6.CodigoSede, dbo.vw_RepuestosBolsaCT_6.NombreSede, dbo.vw_RepuestosBolsaCT_6.CodigoCentro, dbo.vw_RepuestosBolsaCT_6.NombreCentro, dbo.vw_RepuestosBolsaCT_6.CodigoSeccion, 
                         dbo.vw_RepuestosBolsaCT_6.Seccion, dbo.vw_RepuestosBolsaCT_6.BolsaPorcentaje, dbo.vw_RepuestosBolsaCT_6.BolsaPuntos, dbo.vw_RepuestosBolsaCT_6.ValorNetoMostrador, 
                         dbo.vw_RepuestosBolsaCT_6.ValorNetoTaller, dbo.vw_RepuestosBolsaCT_6.ValorBaseBolsa, dbo.vw_RepuestosBolsaCT_6.ValorDelPuntoBolsa, dbo.vw_RepuestosBolsaCT_6.PuntosAsignadosEmpleado, 
                         dbo.vw_RangosVersionesMax.IdRangoMaestra, dbo.vw_RangosVersionesMax.IdRangoVersionMax
FROM            dbo.vw_RepuestosBolsaCT_6 INNER JOIN
                         dbo.Empleados ON dbo.vw_RepuestosBolsaCT_6.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.Empleados.CodigoEmpleado = dbo.EmpleadosRangosMaestras.CodigoEmpleado INNER JOIN
                         dbo.vw_RangosVersionesMax ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMax.IdRangoMaestra


```
