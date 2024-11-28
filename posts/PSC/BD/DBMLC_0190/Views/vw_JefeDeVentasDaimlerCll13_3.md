# View: vw_JefeDeVentasDaimlerCll13_3

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_JefeDeVentasDaimlerCll13_31]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql



CREATE VIEW [dbo].[vw_JefeDeVentasDaimlerCll13_3]
AS
SELECT        COLOCACION_CREDITOS.Ano_Periodo, COLOCACION_CREDITOS.Mes_Periodo, COLOCACION_CREDITOS.CodigoEmpleado, COLOCACION_CREDITOS.IdRangoMaestra, COLOCACION_CREDITOS.IdRangoVersionMax, 
                      COLOCACION_CREDITOS.ColocacionCreditos, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, 
                         dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio, dbo.vw_RangosMaestrasFull.CodigoMarcaGrupo, dbo.vw_RangosMaestrasFull.MarcaGrupo, dbo.vw_RangosMaestrasFull.IdRangoVersion, 
                         dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, 
                         dbo.vw_RangosMaestrasFull.Valor AS Comision_ColocacionCreditos
FROM            (SELECT        dbo.vw_JefeDeVentasDaimlerCll13_31.Ano_Periodo, dbo.vw_JefeDeVentasDaimlerCll13_31.Mes_Periodo, dbo.vw_JefeDeVentasDaimlerCll13_31.CodigoEmpleado,
                                                    EMPLEADO.IdRangoMaestra, EMPLEADO.IdRangoVersionMax, EMPLEADO.IdComisionModeloSub, EMPLEADO.IdComisionModeloSubCriterio, dbo.vw_JefeDeVentasDaimlerCll13_31.ColocacionCreditos
                          FROM            (SELECT        dbo.Empleados.CodigoEmpleado, dbo.vw_RangosVersionesMaxSub.IdRangoMaestra, dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub, 
                                                                              dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
                                                    FROM            dbo.EmpleadosRangosMaestras INNER JOIN
                                                                              dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                                                                              dbo.vw_RangosVersionesMaxSub ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra
                                                    WHERE        (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 50) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 93)) AS EMPLEADO LEFT OUTER JOIN
                                                    dbo.vw_JefeDeVentasDaimlerCll13_31 ON EMPLEADO.CodigoEmpleado = dbo.vw_JefeDeVentasDaimlerCll13_31.CodigoEmpleado) AS COLOCACION_CREDITOS LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON COLOCACION_CREDITOS.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 50) AND (dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio = 93) AND (dbo.vw_RangosMaestrasFull.Desde < COLOCACION_CREDITOS.ColocacionCreditos) AND 
                         (dbo.vw_RangosMaestrasFull.Hasta >= COLOCACION_CREDITOS.ColocacionCreditos)

```
