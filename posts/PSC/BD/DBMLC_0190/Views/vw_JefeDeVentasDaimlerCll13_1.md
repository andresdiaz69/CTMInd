# View: vw_JefeDeVentasDaimlerCll13_1

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_JefeDeVentasDaimlerCll13_12]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql

CREATE VIEW [dbo].[vw_JefeDeVentasDaimlerCll13_1]
AS
SELECT        PESO_COMERCIAL.Ano_Periodo, PESO_COMERCIAL.Mes_Periodo, PESO_COMERCIAL.CodigoEmpleado, PESO_COMERCIAL.IdRangoMaestra, PESO_COMERCIAL.IdRangoVersionMax, PESO_COMERCIAL.CodigoCentro, 
                         PESO_COMERCIAL.Centro, PESO_COMERCIAL.PesoComercial, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio, 
                         dbo.vw_RangosMaestrasFull.CodigoMarcaGrupo, dbo.vw_RangosMaestrasFull.MarcaGrupo, dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, 
                         dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor AS Comision_PesoComercial
FROM            (SELECT        dbo.vw_JefeDeVentasDaimlerCll13_12.Ano_Periodo, dbo.vw_JefeDeVentasDaimlerCll13_12.Mes_Periodo, dbo.vw_JefeDeVentasDaimlerCll13_12.CodigoEmpleado, dbo.vw_JefeDeVentasDaimlerCll13_12.CodigoCentro, dbo.vw_JefeDeVentasDaimlerCll13_12.Centro, 
                                                    EMPLEADO.IdRangoMaestra, EMPLEADO.IdRangoVersionMax, EMPLEADO.IdComisionModeloSub, EMPLEADO.IdComisionModeloSubCriterio, dbo.vw_JefeDeVentasDaimlerCll13_12.PesoComercial
                          FROM            (SELECT        dbo.Empleados.CodigoEmpleado, dbo.vw_RangosVersionesMaxSub.IdRangoMaestra, dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub, 
                                                                              dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
                                                    FROM            dbo.EmpleadosRangosMaestras INNER JOIN
                                                                              dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                                                                              dbo.vw_RangosVersionesMaxSub ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra
                                                    WHERE        (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 50) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 91)) AS EMPLEADO LEFT OUTER JOIN
                                                    dbo.vw_JefeDeVentasDaimlerCll13_12 ON EMPLEADO.CodigoEmpleado = dbo.vw_JefeDeVentasDaimlerCll13_12.CodigoEmpleado) AS PESO_COMERCIAL LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON PESO_COMERCIAL.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 50) AND (dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio = 91) AND (dbo.vw_RangosMaestrasFull.Desde < PESO_COMERCIAL.PesoComercial) AND 
                         (dbo.vw_RangosMaestrasFull.Hasta >= PESO_COMERCIAL.PesoComercial)

```
