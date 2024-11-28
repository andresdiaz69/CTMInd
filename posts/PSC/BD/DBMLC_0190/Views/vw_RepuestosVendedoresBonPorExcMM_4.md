# View: vw_RepuestosVendedoresBonPorExcMM_4

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_RangosVersionesMax]]
- [[vw_RepuestosVendedoresBonPorExcMM_3]]

```sql
CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorExcMM_4]
AS
SELECT        dbo.vw_RepuestosVendedoresBonPorExcMM_3.Ano_Periodo, dbo.vw_RepuestosVendedoresBonPorExcMM_3.Mes_Periodo, dbo.vw_RepuestosVendedoresBonPorExcMM_3.CodigoEmpresa, 
                         dbo.vw_RepuestosVendedoresBonPorExcMM_3.CedulaVendedorRepuestos, dbo.Empleados.CodigoEmpleado, dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, 
                         dbo.Empleados.FechaRetiro, dbo.vw_RepuestosVendedoresBonPorExcMM_3.ValorVariable, dbo.vw_RepuestosVendedoresBonPorExcMM_3.ValorBaseTotal, dbo.vw_RepuestosVendedoresBonPorExcMM_3.ValorNetoTotal, 
                         dbo.vw_RangosVersionesMax.IdRangoMaestra, dbo.vw_RangosVersionesMax.IdRangoVersionMax
FROM            dbo.EmpleadosRangosMaestras INNER JOIN
                         dbo.vw_RangosVersionesMax ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMax.IdRangoMaestra RIGHT OUTER JOIN
                         dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado RIGHT OUTER JOIN
                         dbo.vw_RepuestosVendedoresBonPorExcMM_3 ON dbo.Empleados.CodigoEmpleado = dbo.vw_RepuestosVendedoresBonPorExcMM_3.CedulaVendedorRepuestos
WHERE        (dbo.vw_RepuestosVendedoresBonPorExcMM_3.CedulaVendedorRepuestos IS NOT NULL)



```
