# View: vw_TallerPITMM_5

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_RangosVersionesMax]]
- [[vw_TallerPITMM_4]]

```sql

CREATE VIEW [dbo].[vw_TallerPITMM_5]
AS
SELECT        dbo.vw_TallerPITMM_4.Ano_Periodo, dbo.vw_TallerPITMM_4.Mes_Periodo, dbo.vw_TallerPITMM_4.CodigoEmpresa, dbo.Empleados.CodigoEmpleado, 
                         dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, dbo.Empleados.FechaIngreso, dbo.Empleados.DiasLaboradosMesIngreso, dbo.Empleados.FechaRetiro, 
                         dbo.vw_TallerPITMM_4.CodigoSede, dbo.vw_TallerPITMM_4.NombreSede, 
						 dbo.vw_TallerPITMM_4.CodigoCentro, dbo.vw_TallerPITMM_4.NombreCentro,
						 
						 dbo.vw_TallerPITMM_4.PITPorcentaje, dbo.vw_TallerPITMM_4.PITPuntos, dbo.vw_TallerPITMM_4.ValorBasePIT, 
                         dbo.vw_TallerPITMM_4.ValorNetoTaller, dbo.vw_TallerPITMM_4.Faltante, dbo.vw_TallerPITMM_4.ValorDelPuntoPIT, dbo.vw_TallerPITMM_4.DiasLaborados, dbo.vw_TallerPITMM_4.PuntosAsignadosEmpleado, 
                         dbo.vw_TallerPITMM_4.Comision, dbo.vw_RangosVersionesMax.IdRangoMaestra, dbo.vw_RangosVersionesMax.IdRangoVersionMax
FROM            dbo.vw_TallerPITMM_4 INNER JOIN
                         dbo.Empleados ON dbo.vw_TallerPITMM_4.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.Empleados.CodigoEmpleado = dbo.EmpleadosRangosMaestras.CodigoEmpleado INNER JOIN
                         dbo.vw_RangosVersionesMax ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMax.IdRangoMaestra




```
