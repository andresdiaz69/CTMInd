# View: vw_ComercialVOComisionesDeVentasMM_Liquidacion

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[RangosMaestras]]
- [[vw_ComercialVOComisionesDeVentasMM_1]]

```sql


CREATE VIEW [dbo].[vw_ComercialVOComisionesDeVentasMM_Liquidacion]
AS
SELECT        dbo.vw_ComercialVOComisionesDeVentasMM_1.Ano_Periodo, dbo.vw_ComercialVOComisionesDeVentasMM_1.Mes_Periodo, dbo.vw_ComercialVOComisionesDeVentasMM_1.CodigoEmpresa, 
                         dbo.vw_ComercialVOComisionesDeVentasMM_1.Empresa, dbo.vw_ComercialVOComisionesDeVentasMM_1.CedulaVendedor, dbo.Empleados.CodigoEmpleado, 
                         dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS NombreVendedor, dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, 
                         dbo.Empleados.FechaRetiro, COUNT(dbo.vw_ComercialVOComisionesDeVentasMM_1.ValorComision) AS VehiculosRecaudados, MAX(dbo.vw_ComercialVOComisionesDeVentasMM_1.ValorPorcentaje) 
                         AS ValorPorcentaje, SUM(dbo.vw_ComercialVOComisionesDeVentasMM_1.ValorComision) AS ComisionRecaudo, SUM(dbo.vw_ComercialVOComisionesDeVentasMM_1.ModeloVehSinComision) 
                         AS ModelosVehSinComision, dbo.RangosMaestras.IdRangoMaestra, dbo.RangosMaestras.IdComisionModeloSub, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.RangosMaestras INNER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.RangosMaestras.IdRangoMaestra = dbo.EmpleadosRangosMaestras.IdRangoMaestra INNER JOIN
                         dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                         dbo.vw_ComercialVOComisionesDeVentasMM_1 ON dbo.Empleados.CodigoEmpleado = dbo.vw_ComercialVOComisionesDeVentasMM_1.CedulaVendedor
GROUP BY dbo.vw_ComercialVOComisionesDeVentasMM_1.Ano_Periodo, dbo.vw_ComercialVOComisionesDeVentasMM_1.Mes_Periodo, dbo.vw_ComercialVOComisionesDeVentasMM_1.CedulaVendedor, 
                         dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2, dbo.vw_ComercialVOComisionesDeVentasMM_1.Empresa, 
                         dbo.vw_ComercialVOComisionesDeVentasMM_1.CodigoEmpresa, dbo.RangosMaestras.IdComisionModeloSub, dbo.Empleados.CodigoEmpleado, dbo.Empleados.FechaRetiro, 
                         dbo.RangosMaestras.IdRangoMaestra
HAVING        (dbo.RangosMaestras.IdComisionModeloSub = 34)




```
