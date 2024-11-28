# View: vw_JefeDeRepuestosMazda_Liquidacion

## Usa los objetos:
- [[EmpleadosRangosMaestras]]
- [[ExogenasEmpleadosCentrosPago]]
- [[vw_EmpleadosDetalle]]
- [[vw_JefeDeRepuestosMazda_17]]
- [[vw_RangosVersionesMaxSub]]

```sql
CREATE VIEW [dbo].[vw_JefeDeRepuestosMazda_Liquidacion]
AS
SELECT        Comision.Ano_Periodo, Comision.Mes_Periodo, Comision.CodigoEmpresa, Comision.Empresa, empleados.CodigoEmpleado, empleados.Empleado, empleados.FechaIngreso, empleados.FechaRetiro, Comision.CodigoCentro, 
                         Comision.Centro, Comision.ValorBase, Comision.ComisionMostrador, Comision.ValorNetoTaller, Comision.ComisionTaller, Comision.ValorVariable, Comision.ComisionRepuestos, empleados.IdRangoMaestra, 
                         empleados.IdRangoVersionMax, empleados.IdComisionModeloSub, empleados.IdComisionModeloSubCriterio, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            (SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, CodigoCentro, Centro, ValorBase, ComisionMostrador, ValorNetoTaller, ComisionTaller, ValorVariable, ComisionRepuestos
                          FROM            dbo.vw_JefeDeRepuestosMazda_17) AS Comision CROSS JOIN
                             (SELECT        Empleados_1.CodigoEmpleado, Empleados_1.Empleado, Empleados_1.FechaIngreso, Empleados_1.FechaRetiro, dbo.vw_RangosVersionesMaxSub.IdRangoMaestra, 
                                                         dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
                               FROM            dbo.EmpleadosRangosMaestras INNER JOIN
                                                         dbo.vw_EmpleadosDetalle AS Empleados_1 ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = Empleados_1.CodigoEmpleado INNER JOIN
                                                         dbo.vw_RangosVersionesMaxSub ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra
                               WHERE        (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 44) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 68)) AS empleados LEFT OUTER JOIN
                             (SELECT        CodigoEmpleado, CodigoCentro
                               FROM            dbo.ExogenasEmpleadosCentrosPago) AS Centros ON empleados.CodigoEmpleado = Centros.CodigoEmpleado AND Comision.CodigoCentro = Centros.CodigoCentro
WHERE        (Centros.CodigoCentro IS NOT NULL)

```
