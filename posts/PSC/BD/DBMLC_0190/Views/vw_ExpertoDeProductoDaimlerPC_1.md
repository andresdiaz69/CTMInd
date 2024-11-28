# View: vw_ExpertoDeProductoDaimlerPC_1

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[RangosMaestras]]
- [[vw_ComercialVNPorCom_1]]

```sql
CREATE VIEW [dbo].[vw_ExpertoDeProductoDaimlerPC_1] AS
SELECT        dbo.vw_ComercialVNPorCom_1.Ano_Periodo, dbo.vw_ComercialVNPorCom_1.Mes_Periodo, dbo.vw_ComercialVNPorCom_1.CodigoEmpresa, dbo.vw_ComercialVNPorCom_1.Empresa, 
                         dbo.vw_ComercialVNPorCom_1.CedulaVendedor, dbo.Empleados.CodigoEmpleado, dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS NombreVendedor, 
                         dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, dbo.Empleados.FechaRetiro, COUNT(dbo.vw_ComercialVNPorCom_1.ValorComision) AS VehiculosRecaudados, 
                         SUM(dbo.vw_ComercialVNPorCom_1.ValorComision) AS ComisionRecaudo, SUM(dbo.vw_ComercialVNPorCom_1.ModeloVehSinComision) AS ModelosVehSinComision, dbo.RangosMaestras.IdRangoMaestra, RangosMaestras.CodigoConcepto,
                         dbo.RangosMaestras.IdComisionModeloSub, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.RangosMaestras INNER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.RangosMaestras.IdRangoMaestra = dbo.EmpleadosRangosMaestras.IdRangoMaestra INNER JOIN
                         dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                         dbo.vw_ComercialVNPorCom_1 ON dbo.Empleados.CodigoEmpleado = dbo.vw_ComercialVNPorCom_1.CedulaVendedor
GROUP BY dbo.vw_ComercialVNPorCom_1.Ano_Periodo, dbo.vw_ComercialVNPorCom_1.Mes_Periodo, dbo.vw_ComercialVNPorCom_1.CedulaVendedor, 
                         dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2, dbo.vw_ComercialVNPorCom_1.Empresa, dbo.vw_ComercialVNPorCom_1.CodigoEmpresa, 
                         dbo.RangosMaestras.IdComisionModeloSub, dbo.Empleados.CodigoEmpleado, dbo.Empleados.FechaRetiro, dbo.RangosMaestras.IdRangoMaestra, RangosMaestras.CodigoConcepto
HAVING        (dbo.RangosMaestras.IdComisionModeloSub = 73) AND (dbo.RangosMaestras.IdRangoMaestra = 356)

```
