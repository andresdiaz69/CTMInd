# View: vw_ComercialVNPorAccV2_Liquidacion

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[RangosMaestras]]
- [[vw_ComercialVNPorAccV2_3]]

```sql



CREATE VIEW [dbo].[vw_ComercialVNPorAccV2_Liquidacion]
AS
SELECT        dbo.vw_ComercialVNPorAccV2_3.Ano_Periodo, dbo.vw_ComercialVNPorAccV2_3.Mes_Periodo, dbo.vw_ComercialVNPorAccV2_3.CodigoEmpresa, dbo.vw_ComercialVNPorAccV2_3.CedulaVendedorRepuestos, 
                         dbo.EmpleadosRangosMaestras.CodigoEmpleado, ISNULL(dbo.Empleados.Nombres, N'') + N' ' + ISNULL(dbo.Empleados.Apellido1, N'') + N' ' + ISNULL(dbo.Empleados.Apellido2, N'') AS Empleado, dbo.Empleados.FechaRetiro, 
                         dbo.vw_ComercialVNPorAccV2_3.ValorVariableCT, dbo.vw_ComercialVNPorAccV2_3.ValorVariableMM, dbo.vw_ComercialVNPorAccV2_3.ValorNetoMostrador, dbo.vw_ComercialVNPorAccV2_3.BonificacionMostrador, 
                         dbo.vw_ComercialVNPorAccV2_3.ValorNetoTaller, dbo.vw_ComercialVNPorAccV2_3.BonificacionTaller, dbo.vw_ComercialVNPorAccV2_3.BonificacionTotal, dbo.RangosMaestras.IdRangoMaestra, 
                         dbo.RangosMaestras.IdComisionModeloSub, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.RangosMaestras INNER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.RangosMaestras.IdRangoMaestra = dbo.EmpleadosRangosMaestras.IdRangoMaestra INNER JOIN
                         dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                         dbo.vw_ComercialVNPorAccV2_3 ON dbo.Empleados.CodigoEmpleado = dbo.vw_ComercialVNPorAccV2_3.CedulaVendedorRepuestos
WHERE        (dbo.RangosMaestras.IdComisionModeloSub = 95) OR
                         (dbo.RangosMaestras.IdComisionModeloSub = 96)


```
