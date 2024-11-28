# View: vw_JefeDeColisionFabricaDeColisionCT_22

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasFabricaColisionCT]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql



CREATE VIEW [dbo].[vw_JefeDeColisionFabricaDeColisionCT_22]
AS
SELECT        SATISFACCION.Ano_Periodo, SATISFACCION.Mes_Periodo, SATISFACCION.CodigoEmpleado, SATISFACCION.IdRangoMaestra, SATISFACCION.IdRangoVersionMax, SATISFACCION.Satisfaccion_Ford, 
                         dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio, dbo.vw_RangosMaestrasFull.CodigoMarcaGrupo, dbo.vw_RangosMaestrasFull.MarcaGrupo, 
                         dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, 
                         dbo.vw_RangosMaestrasFull.Valor
FROM            (SELECT        dbo.ExogenasFabricaColisionCT.Ano AS Ano_Periodo, dbo.ExogenasFabricaColisionCT.Mes AS Mes_Periodo, dbo.ExogenasFabricaColisionCT.CodigoEmpleado, EMPLEADO.IdRangoMaestra, 
                                                    EMPLEADO.IdRangoVersionMax, EMPLEADO.IdComisionModeloSub, EMPLEADO.IdComisionModeloSubCriterio, dbo.ExogenasFabricaColisionCT.Satisfaccion_Ford 
                               
                          FROM            (SELECT        dbo.Empleados.CodigoEmpleado, dbo.vw_RangosVersionesMaxSub.IdRangoMaestra, dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub, 
                                                                              dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
                                                    FROM            dbo.EmpleadosRangosMaestras INNER JOIN
                                                                              dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                                                                              dbo.vw_RangosVersionesMaxSub ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra
                                                    WHERE        (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 45) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 73)) AS EMPLEADO LEFT OUTER JOIN
                                                    dbo.ExogenasFabricaColisionCT ON EMPLEADO.CodigoEmpleado = dbo.ExogenasFabricaColisionCT.CodigoEmpleado) AS SATISFACCION LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON SATISFACCION.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 45) AND (dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio = 73) AND (dbo.vw_RangosMaestrasFull.Desde < SATISFACCION.Satisfaccion_Ford) AND 
                         (dbo.vw_RangosMaestrasFull.Hasta >= SATISFACCION.Satisfaccion_Ford)

```
