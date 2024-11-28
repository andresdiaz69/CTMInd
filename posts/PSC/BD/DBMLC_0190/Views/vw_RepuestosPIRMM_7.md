# View: vw_RepuestosPIRMM_7

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_RangosVersionesMax]]
- [[vw_RepuestosPIRMM_6]]

```sql

CREATE VIEW [dbo].[vw_RepuestosPIRMM_7]
AS
SELECT        dbo.vw_RepuestosPIRMM_6.Ano_Periodo, dbo.vw_RepuestosPIRMM_6.Mes_Periodo, dbo.vw_RepuestosPIRMM_6.CodigoEmpresa, dbo.Empleados.CodigoEmpleado, 
                         dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, dbo.Empleados.FechaIngreso, dbo.Empleados.DiasLaboradosMesIngreso, dbo.Empleados.FechaRetiro, 

                         dbo.vw_RepuestosPIRMM_6.CodigoSede, dbo.vw_RepuestosPIRMM_6.NombreSede, 
						 dbo.vw_RepuestosPIRMM_6.CodigoCentro, dbo.vw_RepuestosPIRMM_6.NombreCentro, 
						 
						 dbo.vw_RepuestosPIRMM_6.PIRPorcentaje, dbo.vw_RepuestosPIRMM_6.PIRPuntos, dbo.vw_RepuestosPIRMM_6.ValorNetoMostrador, 
                         dbo.vw_RepuestosPIRMM_6.ValorNetoTaller, dbo.vw_RepuestosPIRMM_6.ValorBasePIR, dbo.vw_RepuestosPIRMM_6.Faltante, dbo.vw_RepuestosPIRMM_6.ValorDelPuntoPIR, dbo.vw_RepuestosPIRMM_6.DiasLaborados, 
                         dbo.vw_RepuestosPIRMM_6.PuntosAsignadosEmpleado, dbo.vw_RepuestosPIRMM_6.Comision, dbo.vw_RangosVersionesMax.IdRangoMaestra, dbo.vw_RangosVersionesMax.IdRangoVersionMax
FROM            dbo.vw_RepuestosPIRMM_6 INNER JOIN
                         dbo.Empleados ON dbo.vw_RepuestosPIRMM_6.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.Empleados.CodigoEmpleado = dbo.EmpleadosRangosMaestras.CodigoEmpleado INNER JOIN
                         dbo.vw_RangosVersionesMax ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMax.IdRangoMaestra




```
