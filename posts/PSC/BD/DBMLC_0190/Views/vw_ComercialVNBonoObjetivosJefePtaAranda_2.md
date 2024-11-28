# View: vw_ComercialVNBonoObjetivosJefePtaAranda_2

## Usa los objetos:
- [[EmpleadosRangosMaestras]]
- [[vw_ComercialVNBonoObjetivosJefePtaAranda_1]]
- [[vw_RangosVersionesMaxSub]]

```sql

CREATE VIEW [dbo].[vw_ComercialVNBonoObjetivosJefePtaAranda_2]
AS
SELECT        VEHICULOS_RECAUDADOS.Ano_Periodo, VEHICULOS_RECAUDADOS.Mes_Periodo, VEHICULOS_RECAUDADOS.CodigoEmpleado, VEHICULOS_RECAUDADOS.Empleado, VEHICULOS_RECAUDADOS.CodigoEmpresa, 
                         VEHICULOS_RECAUDADOS.FechaRetiro, VEHICULOS_RECAUDADOS.VehiculosRecaudados, dbo.EmpleadosRangosMaestras.IdRangoMaestra, dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax
FROM            dbo.EmpleadosRangosMaestras INNER JOIN
                         dbo.vw_RangosVersionesMaxSub ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra RIGHT OUTER JOIN
                             (SELECT        CodigoEmpleado, Empleado, CodigoEmpresa, FechaRetiro, CodigoEmpleado_Jefe, Ano_Periodo, Mes_Periodo, SUM(VehiculosRecaudados) AS VehiculosRecaudados
                               FROM            dbo.vw_ComercialVNBonoObjetivosJefePtaAranda_1
                               GROUP BY CodigoEmpleado, Empleado, CodigoEmpresa, FechaRetiro, CodigoEmpleado_Jefe, Ano_Periodo, Mes_Periodo) AS VEHICULOS_RECAUDADOS ON 
                         dbo.EmpleadosRangosMaestras.CodigoEmpleado = VEHICULOS_RECAUDADOS.CodigoEmpleado
WHERE        (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 22)


```
