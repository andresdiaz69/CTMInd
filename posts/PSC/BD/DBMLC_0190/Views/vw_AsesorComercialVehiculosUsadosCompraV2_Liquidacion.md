# View: vw_AsesorComercialVehiculosUsadosCompraV2_Liquidacion

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[RangosMaestras]]
- [[vw_AsesorComercialVehiculosUsadosCompraV2_Detalle]]
- [[vw_VariablesVersiones]]

```sql






CREATE VIEW [dbo].[vw_AsesorComercialVehiculosUsadosCompraV2_Liquidacion]
AS
SELECT        dbo.vw_AsesorComercialVehiculosUsadosCompraV2_Detalle.Ano AS Ano_Periodo, dbo.vw_AsesorComercialVehiculosUsadosCompraV2_Detalle.Mes AS Mes_Periodo, dbo.Empleados.CodigoEmpresa, dbo.vw_AsesorComercialVehiculosUsadosCompraV2_Detalle.CodigoEmpleado, ISNULL(dbo.Empleados.Nombres, 
                         N'') + N' ' + ISNULL(dbo.Empleados.Apellido1, N'') + N' ' + ISNULL(dbo.Empleados.Apellido2, N'') AS Empleado, dbo.Empleados.FechaRetiro, dbo.vw_AsesorComercialVehiculosUsadosCompraV2_Detalle.ComprasUsados, 
                         VAR.ValorVariable,
                         dbo.vw_AsesorComercialVehiculosUsadosCompraV2_Detalle.ComprasUsados * [VAR].ValorVariable AS ComisionCompra, 
                         dbo.RangosMaestras.IdRangoMaestra, dbo.RangosMaestras.IdComisionModeloSub, dbo.RangosMaestras.CodigoConcepto, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.RangosMaestras INNER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.RangosMaestras.IdRangoMaestra = dbo.EmpleadosRangosMaestras.IdRangoMaestra INNER JOIN
                         dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                         dbo.vw_AsesorComercialVehiculosUsadosCompraV2_Detalle ON dbo.Empleados.CodigoEmpleado = dbo.vw_AsesorComercialVehiculosUsadosCompraV2_Detalle.CodigoEmpleado CROSS JOIN
                             (SELECT        ValorVariable
                               FROM            dbo.vw_VariablesVersiones AS vw_VariablesVersiones_1
                               WHERE        (IdVariable = 48)) AS VAR
WHERE        (dbo.RangosMaestras.IdComisionModeloSub = 99) and (dbo.RangosMaestras.IdComisionModeloSubCriterio = 184)



```
