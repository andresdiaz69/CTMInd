# View: vw_ComercialVNJefesBonoPorObjetivos_1

## Usa los objetos:
- [[Empleados]]
- [[ExogenasEmpleadosCentrosPago]]
- [[vw_ComercialVNPorCom_Liquidacion_Jefes_Centro]]

```sql
CREATE VIEW [dbo].[vw_ComercialVNJefesBonoPorObjetivos_1]
AS
SELECT        dbo.vw_ComercialVNPorCom_Liquidacion_Jefes_Centro.Ano_Periodo, dbo.vw_ComercialVNPorCom_Liquidacion_Jefes_Centro.Mes_Periodo, dbo.ExogenasEmpleadosCentrosPago.CodigoEmpleado, 
                         dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, dbo.Empleados.FechaRetiro, dbo.vw_ComercialVNPorCom_Liquidacion_Jefes_Centro.CodigoEmpresa, 
                         dbo.vw_ComercialVNPorCom_Liquidacion_Jefes_Centro.Empresa, dbo.vw_ComercialVNPorCom_Liquidacion_Jefes_Centro.CodigoCentro, dbo.vw_ComercialVNPorCom_Liquidacion_Jefes_Centro.Centro, 
                         ISNULL(dbo.vw_ComercialVNPorCom_Liquidacion_Jefes_Centro.VehiculosRecaudados, 0) AS VehiculosRecaudados, 0 AS IdLiquidacion, 0 AS IdHistorico
FROM            dbo.Empleados RIGHT OUTER JOIN
                         dbo.ExogenasEmpleadosCentrosPago ON dbo.Empleados.CodigoEmpleado = dbo.ExogenasEmpleadosCentrosPago.CodigoEmpleado LEFT OUTER JOIN
                         dbo.vw_ComercialVNPorCom_Liquidacion_Jefes_Centro ON dbo.ExogenasEmpleadosCentrosPago.CodigoCentro = dbo.vw_ComercialVNPorCom_Liquidacion_Jefes_Centro.CodigoCentro
WHERE        (dbo.vw_ComercialVNPorCom_Liquidacion_Jefes_Centro.Ano_Periodo IS NOT NULL) AND (ISNULL(dbo.vw_ComercialVNPorCom_Liquidacion_Jefes_Centro.VehiculosRecaudados, 0) > 0)


```
