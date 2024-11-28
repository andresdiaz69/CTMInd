# View: vw_RepuestosPIRMM_7_Full

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_RangosVersionesMax]]
- [[vw_RepuestosPIRMM_6_Full]]

```sql


CREATE VIEW [dbo].[vw_RepuestosPIRMM_7_Full]
AS
SELECT        dbo.vw_RepuestosPIRMM_6_Full.Ano_Periodo, dbo.vw_RepuestosPIRMM_6_Full.Mes_Periodo, dbo.vw_RepuestosPIRMM_6_Full.CodigoEmpresa, dbo.Empleados.CodigoEmpleado, 
                         dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, dbo.Empleados.FechaIngreso, dbo.Empleados.DiasLaboradosMesIngreso, dbo.Empleados.FechaRetiro, 

                         dbo.vw_RepuestosPIRMM_6_Full.CodigoSede, dbo.vw_RepuestosPIRMM_6_Full.NombreSede, 
						 dbo.vw_RepuestosPIRMM_6_Full.CodigoCentro, dbo.vw_RepuestosPIRMM_6_Full.NombreCentro, 
						 
						 dbo.vw_RepuestosPIRMM_6_Full.PIRPorcentaje, dbo.vw_RepuestosPIRMM_6_Full.PIRPuntos, dbo.vw_RepuestosPIRMM_6_Full.ValorNetoMostrador, 
                         dbo.vw_RepuestosPIRMM_6_Full.ValorNetoTaller, dbo.vw_RepuestosPIRMM_6_Full.ValorBasePIR, dbo.vw_RepuestosPIRMM_6_Full.Faltante, dbo.vw_RepuestosPIRMM_6_Full.ValorDelPuntoPIR, dbo.vw_RepuestosPIRMM_6_Full.DiasLaborados, 
                         dbo.vw_RepuestosPIRMM_6_Full.PuntosAsignadosEmpleado, dbo.vw_RepuestosPIRMM_6_Full.Comision, dbo.vw_RangosVersionesMax.IdRangoMaestra, dbo.vw_RangosVersionesMax.IdRangoVersionMax
FROM            dbo.vw_RepuestosPIRMM_6_Full INNER JOIN
                         dbo.Empleados ON dbo.vw_RepuestosPIRMM_6_Full.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.Empleados.CodigoEmpleado = dbo.EmpleadosRangosMaestras.CodigoEmpleado INNER JOIN
                         dbo.vw_RangosVersionesMax ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMax.IdRangoMaestra




```
