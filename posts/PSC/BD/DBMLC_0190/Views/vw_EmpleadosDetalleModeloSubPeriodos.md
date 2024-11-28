# View: vw_EmpleadosDetalleModeloSubPeriodos

## Usa los objetos:
- [[Periodos]]
- [[vw_EmpleadosDetalle]]
- [[vw_EmpleadosRangosMaestras]]

```sql
CREATE VIEW dbo.vw_EmpleadosDetalleModeloSubPeriodos
AS
SELECT DISTINCT 
                         TOP (100) PERCENT dbo.Periodos.Ano_Periodo, dbo.Periodos.Mes_Periodo, dbo.vw_EmpleadosDetalle.CodigoEmpleado, dbo.vw_EmpleadosRangosMaestras.IdComisionModeloSub, 
                         dbo.vw_EmpleadosRangosMaestras.NombreModeloSub, dbo.vw_EmpleadosDetalle.Empleado, dbo.vw_EmpleadosDetalle.CodigoEmpresa, dbo.vw_EmpleadosDetalle.NombreEmpresa, 
                         dbo.vw_EmpleadosDetalle.FechaIngreso, dbo.vw_EmpleadosDetalle.FechaRetiro
FROM            dbo.vw_EmpleadosRangosMaestras RIGHT OUTER JOIN
                         dbo.vw_EmpleadosDetalle ON dbo.vw_EmpleadosRangosMaestras.CodigoEmpleado = dbo.vw_EmpleadosDetalle.CodigoEmpleado CROSS JOIN
                         dbo.Periodos
WHERE        (dbo.vw_EmpleadosRangosMaestras.IdComisionModeloSub IS NOT NULL)
ORDER BY dbo.Periodos.Ano_Periodo, dbo.Periodos.Mes_Periodo, dbo.vw_EmpleadosDetalle.CodigoEmpleado

```
