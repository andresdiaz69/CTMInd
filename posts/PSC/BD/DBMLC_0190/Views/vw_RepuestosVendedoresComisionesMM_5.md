# View: vw_RepuestosVendedoresComisionesMM_5

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_RangosVersionesMax]]
- [[vw_RepuestosVendedoresComisionesMM_4]]

```sql
CREATE VIEW [dbo].[vw_RepuestosVendedoresComisionesMM_5]
AS
SELECT        dbo.vw_RepuestosVendedoresComisionesMM_4.Ano_Periodo, dbo.vw_RepuestosVendedoresComisionesMM_4.Mes_Periodo, dbo.vw_RepuestosVendedoresComisionesMM_4.CodigoEmpresa, 
                         dbo.vw_RepuestosVendedoresComisionesMM_4.CedulaVendedorRepuestos, dbo.Empleados.CodigoEmpleado, dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, 
                         dbo.Empleados.FechaRetiro, dbo.vw_RepuestosVendedoresComisionesMM_4.ValorVariable, dbo.vw_RepuestosVendedoresComisionesMM_4.ValorBaseMostrador, 
                         dbo.vw_RepuestosVendedoresComisionesMM_4.ComisionMostrador, dbo.vw_RepuestosVendedoresComisionesMM_4.ValorBaseTaller, dbo.vw_RepuestosVendedoresComisionesMM_4.ComisionTaller, 
                         dbo.vw_RepuestosVendedoresComisionesMM_4.Comision, dbo.vw_RangosVersionesMax.IdRangoMaestra, dbo.vw_RangosVersionesMax.IdRangoVersionMax
FROM            dbo.vw_RangosVersionesMax RIGHT OUTER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.vw_RangosVersionesMax.IdRangoMaestra = dbo.EmpleadosRangosMaestras.IdRangoMaestra RIGHT OUTER JOIN
                         dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado RIGHT OUTER JOIN
                         dbo.vw_RepuestosVendedoresComisionesMM_4 ON dbo.Empleados.CodigoEmpleado = dbo.vw_RepuestosVendedoresComisionesMM_4.CedulaVendedorRepuestos



```
