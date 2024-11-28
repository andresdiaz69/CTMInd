# View: vw_RepuestosVendedoresComisionesDAI_5

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_RangosVersionesMax]]
- [[vw_RepuestosVendedoresComisionesDAI_4]]

```sql

CREATE VIEW [dbo].[vw_RepuestosVendedoresComisionesDAI_5]
AS
SELECT        dbo.vw_RepuestosVendedoresComisionesDAI_4.Ano_Periodo, dbo.vw_RepuestosVendedoresComisionesDAI_4.Mes_Periodo, dbo.vw_RepuestosVendedoresComisionesDAI_4.CodigoEmpresa, 
                         dbo.vw_RepuestosVendedoresComisionesDAI_4.CedulaVendedorRepuestos, dbo.Empleados.CodigoEmpleado, dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, 
                         dbo.Empleados.FechaRetiro, dbo.vw_RepuestosVendedoresComisionesDAI_4.ValorVariable, dbo.vw_RepuestosVendedoresComisionesDAI_4.ValorBaseMostrador, 
                         dbo.vw_RepuestosVendedoresComisionesDAI_4.ComisionMostrador, dbo.vw_RepuestosVendedoresComisionesDAI_4.ValorBaseTaller, dbo.vw_RepuestosVendedoresComisionesDAI_4.ComisionTaller, 
                         dbo.vw_RepuestosVendedoresComisionesDAI_4.Comision, dbo.vw_RangosVersionesMax.IdRangoMaestra, dbo.vw_RangosVersionesMax.IdRangoVersionMax
FROM            dbo.vw_RangosVersionesMax RIGHT OUTER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.vw_RangosVersionesMax.IdRangoMaestra = dbo.EmpleadosRangosMaestras.IdRangoMaestra RIGHT OUTER JOIN
                         dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado RIGHT OUTER JOIN
                         dbo.vw_RepuestosVendedoresComisionesDAI_4 ON dbo.Empleados.CodigoEmpleado = dbo.vw_RepuestosVendedoresComisionesDAI_4.CedulaVendedorRepuestos





```
