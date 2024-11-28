# View: vw_AccesoriosVendedoresBonMM_4

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_AccesoriosVendedoresBonMM_3]]
- [[vw_RangosVersionesMax]]

```sql
CREATE VIEW [dbo].[vw_AccesoriosVendedoresBonMM_4]
AS
SELECT        dbo.vw_AccesoriosVendedoresBonMM_3.Ano_Periodo, dbo.vw_AccesoriosVendedoresBonMM_3.Mes_Periodo, dbo.vw_AccesoriosVendedoresBonMM_3.CodigoEmpresa, dbo.vw_AccesoriosVendedoresBonMM_3.Empresa, 
                         dbo.vw_AccesoriosVendedoresBonMM_3.CedulaVendedorRepuestos, dbo.Empleados.CodigoEmpleado, dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, 
                         dbo.Empleados.FechaRetiro, dbo.EmpleadosRangosMaestras.IdRangoMaestra, dbo.vw_RangosVersionesMax.IdRangoVersionMax, dbo.vw_AccesoriosVendedoresBonMM_3.TotalAlmacenAlbaran, 
                         dbo.vw_AccesoriosVendedoresBonMM_3.TotalTallerPorOT, dbo.vw_AccesoriosVendedoresBonMM_3.Total
FROM            dbo.vw_RangosVersionesMax INNER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.vw_RangosVersionesMax.IdRangoMaestra = dbo.EmpleadosRangosMaestras.IdRangoMaestra INNER JOIN
                         dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado RIGHT OUTER JOIN
                         dbo.vw_AccesoriosVendedoresBonMM_3 ON dbo.Empleados.CodigoEmpleado = dbo.vw_AccesoriosVendedoresBonMM_3.CedulaVendedorRepuestos



```
