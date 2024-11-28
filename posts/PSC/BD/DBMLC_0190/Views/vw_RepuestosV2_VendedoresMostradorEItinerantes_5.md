# View: vw_RepuestosV2_VendedoresMostradorEItinerantes_5

## Usa los objetos:
- [[Cargos]]
- [[Centros]]
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_RangosVersionesMax]]
- [[vw_RepuestosV2_VendedoresMostradorEItinerantes_2]]

```sql
CREATE VIEW [dbo].[vw_RepuestosV2_VendedoresMostradorEItinerantes_5]
AS
SELECT        dbo.vw_RepuestosV2_VendedoresMostradorEItinerantes_2.Ano_Periodo, dbo.vw_RepuestosV2_VendedoresMostradorEItinerantes_2.Mes_Periodo, dbo.vw_RepuestosV2_VendedoresMostradorEItinerantes_2.CodigoEmpresa, 
                         dbo.vw_RepuestosV2_VendedoresMostradorEItinerantes_2.CedulaVendedorRepuestos, dbo.Empleados.CodigoEmpleado, 
                         dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, dbo.Empleados.FechaRetiro, dbo.vw_RepuestosV2_VendedoresMostradorEItinerantes_2.ValorBaseMostrador, 
                         0.000000 AS ValorBaseTaller, dbo.vw_RepuestosV2_VendedoresMostradorEItinerantes_2.ValorBaseMostrador AS ValorBaseComision, dbo.vw_RangosVersionesMax.IdRangoMaestra, 
                         dbo.vw_RangosVersionesMax.IdRangoVersionMax, dbo.Empleados.CodigoCentro, dbo.Centros.NombreCentro, dbo.Empleados.cod_marca, dbo.Empleados.nombre_marca, dbo.Empleados.CodigoCargo, 
                         dbo.Cargos.NombreCargo
FROM            dbo.Cargos RIGHT OUTER JOIN
                         dbo.Empleados ON dbo.Cargos.CodigoCargo = dbo.Empleados.CodigoCargo LEFT OUTER JOIN
                         dbo.Centros ON dbo.Empleados.CodigoCentro = dbo.Centros.CodigoCentro LEFT OUTER JOIN
                         dbo.EmpleadosRangosMaestras INNER JOIN
                         dbo.vw_RangosVersionesMax ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMax.IdRangoMaestra ON 
                         dbo.Empleados.CodigoEmpleado = dbo.EmpleadosRangosMaestras.CodigoEmpleado RIGHT OUTER JOIN
                         dbo.vw_RepuestosV2_VendedoresMostradorEItinerantes_2 ON dbo.Empleados.CodigoEmpleado = dbo.vw_RepuestosV2_VendedoresMostradorEItinerantes_2.CedulaVendedorRepuestos

```
