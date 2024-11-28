# View: vw_AsesorComercialVehiculosUsadosAcc_Liquidacion

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[RangosMaestras]]
- [[vw_AsesorComercialVehiculosUsadosAcc_3]]

```sql




CREATE VIEW [dbo].[vw_AsesorComercialVehiculosUsadosAcc_Liquidacion]
AS
SELECT        dbo.vw_AsesorComercialVehiculosUsadosAcc_3.Ano_Periodo, dbo.vw_AsesorComercialVehiculosUsadosAcc_3.Mes_Periodo, dbo.vw_AsesorComercialVehiculosUsadosAcc_3.CodigoEmpresa, dbo.vw_AsesorComercialVehiculosUsadosAcc_3.CedulaVendedorRepuestos, 
                         dbo.EmpleadosRangosMaestras.CodigoEmpleado, ISNULL(dbo.Empleados.Nombres, N'') + N' ' + ISNULL(dbo.Empleados.Apellido1, N'') + N' ' + ISNULL(dbo.Empleados.Apellido2, N'') AS Empleado, dbo.Empleados.FechaRetiro, 
                         dbo.vw_AsesorComercialVehiculosUsadosAcc_3.ValorVariable, dbo.vw_AsesorComercialVehiculosUsadosAcc_3.ValorNetoMostrador, dbo.vw_AsesorComercialVehiculosUsadosAcc_3.BonificacionMostrador, 
                         dbo.vw_AsesorComercialVehiculosUsadosAcc_3.ValorNetoTaller, dbo.vw_AsesorComercialVehiculosUsadosAcc_3.BonificacionTaller, dbo.vw_AsesorComercialVehiculosUsadosAcc_3.BonificacionTotal, dbo.RangosMaestras.IdRangoMaestra, 
                         dbo.RangosMaestras.IdComisionModeloSub, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.RangosMaestras INNER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.RangosMaestras.IdRangoMaestra = dbo.EmpleadosRangosMaestras.IdRangoMaestra INNER JOIN
                         dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                         dbo.vw_AsesorComercialVehiculosUsadosAcc_3 ON dbo.Empleados.CodigoEmpleado = dbo.vw_AsesorComercialVehiculosUsadosAcc_3.CedulaVendedorRepuestos
WHERE        (dbo.RangosMaestras.IdComisionModeloSub = 39) and (dbo.RangosMaestras.IdComisionModeloSubCriterio = 55)


```
