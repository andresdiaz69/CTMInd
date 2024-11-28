# View: vw_RepuestosBolsaDAI_6_Full

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_RangosVersionesMax]]
- [[vw_RepuestosBolsaDAI_5_Full]]

```sql


CREATE VIEW [dbo].[vw_RepuestosBolsaDAI_6_Full]
AS
SELECT        dbo.vw_RepuestosBolsaDAI_5_Full.Ano_Periodo, dbo.vw_RepuestosBolsaDAI_5_Full.Mes_Periodo, dbo.vw_RepuestosBolsaDAI_5_Full.CodigoEmpresa, dbo.Empleados.CodigoEmpleado, 
                         dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, dbo.Empleados.FechaIngreso, dbo.Empleados.DiasLaboradosMesIngreso, dbo.Empleados.FechaRetiro, 
                         dbo.vw_RepuestosBolsaDAI_5_Full.CodigoSede, dbo.vw_RepuestosBolsaDAI_5_Full.NombreSede, dbo.vw_RepuestosBolsaDAI_5_Full.CodigoCentro, dbo.vw_RepuestosBolsaDAI_5_Full.NombreCentro, 
						 dbo.vw_RepuestosBolsaDAI_5_Full.CodigoSeccion, dbo.vw_RepuestosBolsaDAI_5_Full.Seccion,
                         dbo.vw_RepuestosBolsaDAI_5_Full.BolsaPorcentaje, dbo.vw_RepuestosBolsaDAI_5_Full.ValorNetoMostrador, dbo.vw_RepuestosBolsaDAI_5_Full.ValorNetoTaller, dbo.vw_RepuestosBolsaDAI_5_Full.ValorBaseBolsa, 
                         dbo.vw_RepuestosBolsaDAI_5_Full.PuntosBolsa, dbo.vw_RepuestosBolsaDAI_5_Full.Comision, dbo.vw_RangosVersionesMax.IdRangoMaestra, dbo.vw_RangosVersionesMax.IdRangoVersionMax
FROM            dbo.vw_RepuestosBolsaDAI_5_Full INNER JOIN
                         dbo.Empleados ON dbo.vw_RepuestosBolsaDAI_5_Full.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.Empleados.CodigoEmpleado = dbo.EmpleadosRangosMaestras.CodigoEmpleado INNER JOIN
                         dbo.vw_RangosVersionesMax ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMax.IdRangoMaestra



```
