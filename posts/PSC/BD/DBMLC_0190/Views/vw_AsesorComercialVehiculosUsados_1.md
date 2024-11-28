# View: vw_AsesorComercialVehiculosUsados_1

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_AsesorComercialVehiculosUsados_1_1]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql



CREATE VIEW [dbo].[vw_AsesorComercialVehiculosUsados_1]
AS
SELECT        CANTIDAD_ENTREGAS.Ano_Periodo, CANTIDAD_ENTREGAS.Mes_Periodo, CANTIDAD_ENTREGAS.CodigoEmpleado, CANTIDAD_ENTREGAS.IdRangoMaestra, CANTIDAD_ENTREGAS.IdRangoVersionMax, CANTIDAD_ENTREGAS.CantidadEntregas, CANTIDAD_ENTREGAS.TotalFacturas, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, 
                         dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio, dbo.vw_RangosMaestrasFull.CodigoMarcaGrupo, dbo.vw_RangosMaestrasFull.MarcaGrupo, dbo.vw_RangosMaestrasFull.IdRangoVersion, 
                         dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor, dbo.vw_RangosMaestrasFull.CodigoConcepto, CANTIDAD_ENTREGAS.TotalFacturas * dbo.vw_RangosMaestrasFull.Valor / 100 AS Valor_ComisionEntregas
FROM            (SELECT        dbo.vw_AsesorComercialVehiculosUsados_1_1.Ano_Periodo, dbo.vw_AsesorComercialVehiculosUsados_1_1.Mes_Periodo, dbo.vw_AsesorComercialVehiculosUsados_1_1.CodigoEmpleado, EMPLEADO.IdRangoMaestra, EMPLEADO.IdRangoVersionMax,
                                                     EMPLEADO.IdComisionModeloSub, EMPLEADO.IdComisionModeloSubCriterio, dbo.vw_AsesorComercialVehiculosUsados_1_1.CantidadEntregas, dbo.vw_AsesorComercialVehiculosUsados_1_1.TotalFacturas
                          FROM            (SELECT        dbo.Empleados.CodigoEmpleado, dbo.vw_RangosVersionesMaxSub.IdRangoMaestra, dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub, 
                                                                              dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
                                                    FROM            dbo.EmpleadosRangosMaestras INNER JOIN
                                                                              dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                                                                              dbo.vw_RangosVersionesMaxSub ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra
                                                    WHERE        (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 39) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 53)) AS EMPLEADO LEFT OUTER JOIN
                                                    dbo.vw_AsesorComercialVehiculosUsados_1_1 ON EMPLEADO.CodigoEmpleado = dbo.vw_AsesorComercialVehiculosUsados_1_1.CodigoEmpleado) AS CANTIDAD_ENTREGAS LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON CANTIDAD_ENTREGAS.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 39) AND (dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio = 53) AND (dbo.vw_RangosMaestrasFull.Desde < CANTIDAD_ENTREGAS.CantidadEntregas) AND 
                         (dbo.vw_RangosMaestrasFull.Hasta >= CANTIDAD_ENTREGAS.CantidadEntregas)







```
