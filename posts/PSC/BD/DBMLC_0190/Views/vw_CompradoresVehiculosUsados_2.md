# View: vw_CompradoresVehiculosUsados_2

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_CompradoresVehiculosUsados_21]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql


CREATE VIEW [dbo].[vw_CompradoresVehiculosUsados_2]
AS
SELECT        BonificacionMensual.Ano_Periodo, BonificacionMensual.Mes_Periodo, BonificacionMensual.CodigoEmpleado, BonificacionMensual.IdRangoMaestra, BonificacionMensual.IdRangoVersionMax, BonificacionMensual.ComprasUsados, 
                         dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio, dbo.vw_RangosMaestrasFull.CodigoMarcaGrupo, dbo.vw_RangosMaestrasFull.MarcaGrupo, 
                         dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, 
                         dbo.vw_RangosMaestrasFull.Valor
FROM            (SELECT        dbo.vw_CompradoresVehiculosUsados_21.Ano AS Ano_Periodo, dbo.vw_CompradoresVehiculosUsados_21.Mes AS Mes_Periodo, dbo.vw_CompradoresVehiculosUsados_21.CodigoEmpleado, 
                                                    EMPLEADO.IdRangoMaestra, EMPLEADO.IdRangoVersionMax, EMPLEADO.IdComisionModeloSub, EMPLEADO.IdComisionModeloSubCriterio, dbo.vw_CompradoresVehiculosUsados_21.ComprasUsados
                          FROM            (SELECT        dbo.Empleados.CodigoEmpleado, dbo.vw_RangosVersionesMaxSub.IdRangoMaestra, dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub, 
                                                                              dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
                                                    FROM            dbo.EmpleadosRangosMaestras INNER JOIN
                                                                              dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                                                                              dbo.vw_RangosVersionesMaxSub ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra
                                                    WHERE        (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 49) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 90)) AS EMPLEADO LEFT OUTER JOIN
                                                    dbo.vw_CompradoresVehiculosUsados_21 ON EMPLEADO.CodigoEmpleado = dbo.vw_CompradoresVehiculosUsados_21.CodigoEmpleado) AS BonificacionMensual LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON BonificacionMensual.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE       (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 49) AND (dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio = 90) AND (dbo.vw_RangosMaestrasFull.Desde < BonificacionMensual.ComprasUsados) AND 
                         (dbo.vw_RangosMaestrasFull.Hasta >= BonificacionMensual.ComprasUsados)

```
