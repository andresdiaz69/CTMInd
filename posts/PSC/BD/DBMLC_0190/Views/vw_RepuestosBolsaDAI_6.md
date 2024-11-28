# View: vw_RepuestosBolsaDAI_6

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_RangosVersionesMax]]
- [[vw_RepuestosBolsaDAI_5]]

```sql

CREATE VIEW [dbo].[vw_RepuestosBolsaDAI_6]
AS
SELECT        dbo.vw_RepuestosBolsaDAI_5.Ano_Periodo, dbo.vw_RepuestosBolsaDAI_5.Mes_Periodo, dbo.vw_RepuestosBolsaDAI_5.CodigoEmpresa, dbo.Empleados.CodigoEmpleado, 
                         dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, dbo.Empleados.FechaIngreso, dbo.Empleados.DiasLaboradosMesIngreso, dbo.Empleados.FechaRetiro, 
                         dbo.vw_RepuestosBolsaDAI_5.CodigoSede, dbo.vw_RepuestosBolsaDAI_5.NombreSede, dbo.vw_RepuestosBolsaDAI_5.CodigoCentro, dbo.vw_RepuestosBolsaDAI_5.NombreCentro, 
						 dbo.vw_RepuestosBolsaDAI_5.CodigoSeccion, dbo.vw_RepuestosBolsaDAI_5.Seccion,
                         dbo.vw_RepuestosBolsaDAI_5.BolsaPorcentaje, dbo.vw_RepuestosBolsaDAI_5.ValorNetoMostrador, dbo.vw_RepuestosBolsaDAI_5.ValorNetoTaller, dbo.vw_RepuestosBolsaDAI_5.ValorBaseBolsa, 
                         dbo.vw_RepuestosBolsaDAI_5.PuntosBolsa, dbo.vw_RepuestosBolsaDAI_5.Comision, dbo.vw_RangosVersionesMax.IdRangoMaestra, dbo.vw_RangosVersionesMax.IdRangoVersionMax
FROM            dbo.vw_RepuestosBolsaDAI_5 INNER JOIN
                         dbo.Empleados ON dbo.vw_RepuestosBolsaDAI_5.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.Empleados.CodigoEmpleado = dbo.EmpleadosRangosMaestras.CodigoEmpleado INNER JOIN
                         dbo.vw_RangosVersionesMax ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMax.IdRangoMaestra



```
