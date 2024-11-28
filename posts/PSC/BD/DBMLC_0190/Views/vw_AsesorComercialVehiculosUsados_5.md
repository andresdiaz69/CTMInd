# View: vw_AsesorComercialVehiculosUsados_5

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[RangosMaestras]]
- [[vw_AsesorComercialVehiculosUsados_5_1]]
- [[vw_VariablesVersiones]]

```sql



CREATE VIEW [dbo].[vw_AsesorComercialVehiculosUsados_5]
AS
SELECT        dbo.vw_AsesorComercialVehiculosUsados_5_1.Ano AS Ano_Periodo, dbo.vw_AsesorComercialVehiculosUsados_5_1.Mes AS Mes_Periodo, dbo.Empleados.CodigoEmpresa, dbo.vw_AsesorComercialVehiculosUsados_5_1.CodigoEmpleado, ISNULL(dbo.Empleados.Nombres, 
                         N'') + N' ' + ISNULL(dbo.Empleados.Apellido1, N'') + N' ' + ISNULL(dbo.Empleados.Apellido2, N'') AS Empleado, dbo.Empleados.FechaRetiro, dbo.vw_AsesorComercialVehiculosUsados_5_1.RetomasUsados, 
                         VAR.ValorVariable,
                         dbo.vw_AsesorComercialVehiculosUsados_5_1.RetomasUsados * [VAR].ValorVariable AS ComisionRetoma, 
                         dbo.RangosMaestras.IdRangoMaestra, dbo.RangosMaestras.IdComisionModeloSub, dbo.RangosMaestras.CodigoConcepto, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.RangosMaestras INNER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.RangosMaestras.IdRangoMaestra = dbo.EmpleadosRangosMaestras.IdRangoMaestra INNER JOIN
                         dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                         dbo.vw_AsesorComercialVehiculosUsados_5_1 ON dbo.Empleados.CodigoEmpleado = dbo.vw_AsesorComercialVehiculosUsados_5_1.CodigoEmpleado CROSS JOIN
                             (SELECT        ValorVariable
                               FROM            dbo.vw_VariablesVersiones AS vw_VariablesVersiones_1
                               WHERE        (IdVariable = 27)) AS VAR
WHERE        (dbo.RangosMaestras.IdComisionModeloSub = 39) and (dbo.RangosMaestras.IdComisionModeloSubCriterio = 57)



```
