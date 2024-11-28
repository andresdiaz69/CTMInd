# View: vw_ComercialVNBonoObjetivosJefePtaAranda_1

## Usa los objetos:
- [[Empleados]]
- [[ExogenasJefesVendedores]]
- [[vw_ComercialVNPorCom_Liquidacion_Jefes]]

```sql



CREATE VIEW [dbo].[vw_ComercialVNBonoObjetivosJefePtaAranda_1]
AS
SELECT        dbo.Empleados.CodigoEmpleado, dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, dbo.Empleados.CodigoEmpresa, dbo.Empleados.FechaRetiro, 
                         dbo.ExogenasJefesVendedores.CodigoEmpleado_Jefe, dbo.ExogenasJefesVendedores.CodigoEmpleado_Vendedor, dbo.vw_ComercialVNPorCom_Liquidacion_Jefes.Empleado AS Empleado_Vendedor, 
                         dbo.ExogenasJefesVendedores.Ano AS Ano_Periodo, dbo.ExogenasJefesVendedores.Mes AS Mes_Periodo, ISNULL(dbo.vw_ComercialVNPorCom_Liquidacion_Jefes.VehiculosRecaudados, 0) AS VehiculosRecaudados, 
                         0 AS IdLiquidacion, 0 AS IdHistorico
FROM            dbo.ExogenasJefesVendedores INNER JOIN
                         dbo.Empleados ON dbo.ExogenasJefesVendedores.CodigoEmpleado_Jefe = dbo.Empleados.CodigoEmpleado LEFT OUTER JOIN
                         dbo.vw_ComercialVNPorCom_Liquidacion_Jefes ON dbo.ExogenasJefesVendedores.CodigoEmpleado_Vendedor = dbo.vw_ComercialVNPorCom_Liquidacion_Jefes.CodigoEmpleado AND 
                         dbo.ExogenasJefesVendedores.Ano = dbo.vw_ComercialVNPorCom_Liquidacion_Jefes.Ano_Periodo AND dbo.ExogenasJefesVendedores.Mes = dbo.vw_ComercialVNPorCom_Liquidacion_Jefes.Mes_Periodo
WHERE        (ISNULL(dbo.vw_ComercialVNPorCom_Liquidacion_Jefes.VehiculosRecaudados, 0) > 0)




```
