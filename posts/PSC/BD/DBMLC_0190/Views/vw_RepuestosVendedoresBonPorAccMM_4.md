# View: vw_RepuestosVendedoresBonPorAccMM_4

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_RangosVersionesMax]]
- [[vw_RepuestosVendedoresBonPorAccMM_3]]

```sql
CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorAccMM_4]
AS
SELECT        dbo.vw_RepuestosVendedoresBonPorAccMM_3.Ano_Periodo, dbo.vw_RepuestosVendedoresBonPorAccMM_3.Mes_Periodo, dbo.vw_RepuestosVendedoresBonPorAccMM_3.CodigoEmpresa, 
                         dbo.vw_RepuestosVendedoresBonPorAccMM_3.CedulaVendedorRepuestos, dbo.Empleados.CodigoEmpleado, dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, 
                         dbo.Empleados.FechaRetiro, dbo.vw_RepuestosVendedoresBonPorAccMM_3.ValorVariable1, dbo.vw_RepuestosVendedoresBonPorAccMM_3.ValorVariable2, 
                         dbo.vw_RepuestosVendedoresBonPorAccMM_3.ValorNetoMostrador, dbo.vw_RepuestosVendedoresBonPorAccMM_3.BonificacionMostrador, dbo.vw_RepuestosVendedoresBonPorAccMM_3.ValorNetoTaller, 
                         dbo.vw_RepuestosVendedoresBonPorAccMM_3.BonificacionTaller, dbo.vw_RepuestosVendedoresBonPorAccMM_3.BonificacionTotal, dbo.vw_RangosVersionesMax.IdRangoMaestra, 
                         dbo.vw_RangosVersionesMax.IdRangoVersionMax
FROM            dbo.EmpleadosRangosMaestras LEFT OUTER JOIN
                         dbo.vw_RangosVersionesMax ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMax.IdRangoMaestra RIGHT OUTER JOIN
                         dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado RIGHT OUTER JOIN
                         dbo.vw_RepuestosVendedoresBonPorAccMM_3 ON dbo.Empleados.CodigoEmpleado = dbo.vw_RepuestosVendedoresBonPorAccMM_3.CedulaVendedorRepuestos



```
