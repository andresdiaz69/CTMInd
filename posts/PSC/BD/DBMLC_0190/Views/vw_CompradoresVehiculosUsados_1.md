# View: vw_CompradoresVehiculosUsados_1

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_CompradoresVehiculosUsados_11]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql


CREATE VIEW [dbo].[vw_CompradoresVehiculosUsados_1]
AS
SELECT        dbo.vw_CompradoresVehiculosUsados_11.Ano AS Ano_Periodo, dbo.vw_CompradoresVehiculosUsados_11.Mes AS Mes_Periodo, dbo.Empleados.CodigoEmpresa, dbo.vw_CompradoresVehiculosUsados_11.CodigoEmpleado, 
                         ISNULL(dbo.Empleados.Nombres, N'') + N' ' + ISNULL(dbo.Empleados.Apellido1, N'') + N' ' + ISNULL(dbo.Empleados.Apellido2, N'') AS Empleado, dbo.Empleados.FechaRetiro, 
                         dbo.vw_CompradoresVehiculosUsados_11.ComprasUsados, VALORCOMISION.Valor, dbo.vw_CompradoresVehiculosUsados_11.ComprasUsados * VALORCOMISION.Valor AS ComisionCompra,
						 VALORCOMISION.IdComisionModeloSub, VALORCOMISION.IdComisionModeloSubCriterio
FROM            
                         dbo.EmpleadosRangosMaestras INNER JOIN
                         dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                         dbo.vw_RangosVersionesMaxSub ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra INNER JOIN
                         dbo.vw_CompradoresVehiculosUsados_11 ON dbo.Empleados.CodigoEmpleado = dbo.vw_CompradoresVehiculosUsados_11.CodigoEmpleado CROSS JOIN
                             (SELECT        Valor, IdRangoMaestra, IdComisionModeloSub, IdComisionModeloSubCriterio
                               FROM            dbo.vw_RangosMaestrasFull
                               WHERE        (IdComisionModeloSub = 49) AND (IdComisionModeloSubCriterio = 89)) AS VALORCOMISION
WHERE (VALORCOMISION.IdRangoMaestra = EmpleadosRangosMaestras.IdRangoMaestra)


```
