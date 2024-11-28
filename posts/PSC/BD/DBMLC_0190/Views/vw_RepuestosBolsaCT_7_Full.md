# View: vw_RepuestosBolsaCT_7_Full

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_RangosVersionesMax]]
- [[vw_RepuestosBolsaCT_6_Full]]

```sql

CREATE VIEW [dbo].[vw_RepuestosBolsaCT_7_Full]
AS
SELECT        dbo.vw_RepuestosBolsaCT_6_Full.Ano_Periodo, dbo.vw_RepuestosBolsaCT_6_Full.Mes_Periodo, dbo.vw_RepuestosBolsaCT_6_Full.CodigoEmpresa, dbo.Empleados.CodigoEmpleado, 
                         dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, dbo.Empleados.FechaIngreso, dbo.Empleados.DiasLaboradosMesIngreso, dbo.Empleados.FechaRetiro, 
                         dbo.vw_RepuestosBolsaCT_6_Full.CodigoSede, dbo.vw_RepuestosBolsaCT_6_Full.NombreSede, dbo.vw_RepuestosBolsaCT_6_Full.CodigoCentro, dbo.vw_RepuestosBolsaCT_6_Full.NombreCentro, dbo.vw_RepuestosBolsaCT_6_Full.CodigoSeccion, 
                         dbo.vw_RepuestosBolsaCT_6_Full.Seccion, dbo.vw_RepuestosBolsaCT_6_Full.BolsaPorcentaje, dbo.vw_RepuestosBolsaCT_6_Full.BolsaPuntos, dbo.vw_RepuestosBolsaCT_6_Full.ValorNetoMostrador, 
                         dbo.vw_RepuestosBolsaCT_6_Full.ValorNetoTaller, dbo.vw_RepuestosBolsaCT_6_Full.ValorBaseBolsa, dbo.vw_RepuestosBolsaCT_6_Full.ValorDelPuntoBolsa, dbo.vw_RepuestosBolsaCT_6_Full.PuntosAsignadosEmpleado, 
                         dbo.vw_RangosVersionesMax.IdRangoMaestra, dbo.vw_RangosVersionesMax.IdRangoVersionMax
FROM            dbo.vw_RepuestosBolsaCT_6_Full INNER JOIN
                         dbo.Empleados ON dbo.vw_RepuestosBolsaCT_6_Full.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.Empleados.CodigoEmpleado = dbo.EmpleadosRangosMaestras.CodigoEmpleado INNER JOIN
                         dbo.vw_RangosVersionesMax ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMax.IdRangoMaestra


```
