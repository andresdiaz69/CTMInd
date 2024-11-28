# View: vw_RepuestosVendedoresComisionesRenault_5

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_RangosVersionesMax]]
- [[vw_RepuestosVendedoresComisionesRenault_4]]

```sql

CREATE VIEW [dbo].[vw_RepuestosVendedoresComisionesRenault_5]
AS
SELECT        dbo.vw_RepuestosVendedoresComisionesRenault_4.Ano_Periodo, dbo.vw_RepuestosVendedoresComisionesRenault_4.Mes_Periodo, dbo.vw_RepuestosVendedoresComisionesRenault_4.CodigoEmpresa, 
                         dbo.vw_RepuestosVendedoresComisionesRenault_4.CedulaVendedorRepuestos, dbo.Empleados.CodigoEmpleado, dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado,
                          dbo.Empleados.FechaRetiro, dbo.vw_RepuestosVendedoresComisionesRenault_4.ValorBaseMostrador, dbo.vw_RepuestosVendedoresComisionesRenault_4.ValorBaseTaller, 
                         dbo.vw_RepuestosVendedoresComisionesRenault_4.ValorBaseMostrador + dbo.vw_RepuestosVendedoresComisionesRenault_4.ValorBaseTaller AS ValorBaseTotal, dbo.vw_RangosVersionesMax.IdRangoMaestra, 
                         dbo.vw_RangosVersionesMax.IdRangoVersionMax
FROM            dbo.EmpleadosRangosMaestras INNER JOIN
                         dbo.vw_RangosVersionesMax ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMax.IdRangoMaestra RIGHT OUTER JOIN
                         dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado RIGHT OUTER JOIN
                         dbo.vw_RepuestosVendedoresComisionesRenault_4 ON dbo.Empleados.CodigoEmpleado = dbo.vw_RepuestosVendedoresComisionesRenault_4.CedulaVendedorRepuestos



```
