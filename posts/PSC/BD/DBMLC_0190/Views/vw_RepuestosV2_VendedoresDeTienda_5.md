# View: vw_RepuestosV2_VendedoresDeTienda_5

## Usa los objetos:
- [[Cargos]]
- [[Centros]]
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_RangosVersionesMax]]
- [[vw_RepuestosV2_VendedoresDeTienda_4]]

```sql


CREATE VIEW [dbo].[vw_RepuestosV2_VendedoresDeTienda_5]
AS
SELECT        dbo.vw_RepuestosV2_VendedoresDeTienda_4.Ano_Periodo, dbo.vw_RepuestosV2_VendedoresDeTienda_4.Mes_Periodo, dbo.vw_RepuestosV2_VendedoresDeTienda_4.CodigoEmpresa, 
                         dbo.vw_RepuestosV2_VendedoresDeTienda_4.CedulaVendedorRepuestos, dbo.Empleados.CodigoEmpleado, dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, 
                         dbo.Empleados.FechaRetiro, dbo.vw_RepuestosV2_VendedoresDeTienda_4.ValorBaseMostrador, dbo.vw_RepuestosV2_VendedoresDeTienda_4.ValorBaseTaller, 
                         dbo.vw_RepuestosV2_VendedoresDeTienda_4.ValorBaseMostrador + dbo.vw_RepuestosV2_VendedoresDeTienda_4.ValorBaseTaller AS ValorBaseComision, dbo.vw_RangosVersionesMax.IdRangoMaestra, 
                         dbo.vw_RangosVersionesMax.IdRangoVersionMax, dbo.Empleados.CodigoCentro, dbo.Centros.NombreCentro, dbo.Empleados.cod_marca, dbo.Empleados.nombre_marca, dbo.Empleados.CodigoCargo, 
                         dbo.Cargos.NombreCargo
FROM            dbo.Empleados LEFT OUTER JOIN
                         dbo.Centros ON dbo.Empleados.CodigoCentro = dbo.Centros.CodigoCentro LEFT OUTER JOIN
                         dbo.Cargos ON dbo.Empleados.CodigoCargo = dbo.Cargos.CodigoCargo RIGHT OUTER JOIN
                         dbo.vw_RepuestosV2_VendedoresDeTienda_4 ON dbo.Empleados.CodigoEmpleado = dbo.vw_RepuestosV2_VendedoresDeTienda_4.CedulaVendedorRepuestos LEFT OUTER JOIN
                         dbo.EmpleadosRangosMaestras INNER JOIN
                         dbo.vw_RangosVersionesMax ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMax.IdRangoMaestra ON dbo.Empleados.CodigoEmpleado = dbo.EmpleadosRangosMaestras.CodigoEmpleado

```
