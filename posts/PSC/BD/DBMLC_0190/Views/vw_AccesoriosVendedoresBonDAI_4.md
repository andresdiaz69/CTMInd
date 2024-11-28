# View: vw_AccesoriosVendedoresBonDAI_4

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_AccesoriosVendedoresBonDAI_3]]
- [[vw_RangosVersionesMax]]

```sql

create VIEW [dbo].[vw_AccesoriosVendedoresBonDAI_4]
AS
SELECT        dbo.vw_AccesoriosVendedoresBonDAI_3.Ano_Periodo, dbo.vw_AccesoriosVendedoresBonDAI_3.Mes_Periodo, dbo.vw_AccesoriosVendedoresBonDAI_3.CodigoEmpresa, dbo.vw_AccesoriosVendedoresBonDAI_3.Empresa, 
                         dbo.vw_AccesoriosVendedoresBonDAI_3.CedulaVendedorRepuestos, dbo.Empleados.CodigoEmpleado, dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, 
                         dbo.Empleados.FechaRetiro, dbo.EmpleadosRangosMaestras.IdRangoMaestra, dbo.vw_RangosVersionesMax.IdRangoVersionMax, dbo.vw_AccesoriosVendedoresBonDAI_3.TotalAlmacenAlbaran, 
                         dbo.vw_AccesoriosVendedoresBonDAI_3.TotalTallerPorOT, dbo.vw_AccesoriosVendedoresBonDAI_3.Total
FROM            dbo.vw_RangosVersionesMax INNER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.vw_RangosVersionesMax.IdRangoMaestra = dbo.EmpleadosRangosMaestras.IdRangoMaestra INNER JOIN
                         dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado RIGHT OUTER JOIN
                         dbo.vw_AccesoriosVendedoresBonDAI_3 ON dbo.Empleados.CodigoEmpleado = dbo.vw_AccesoriosVendedoresBonDAI_3.CedulaVendedorRepuestos





```
