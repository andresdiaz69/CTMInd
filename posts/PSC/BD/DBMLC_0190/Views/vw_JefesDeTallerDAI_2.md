# View: vw_JefesDeTallerDAI_2

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasJefesTallerDAI]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql


CREATE VIEW [dbo].[vw_JefesDeTallerDAI_2]
AS
SELECT        SATISFACCION.Ano_Periodo, SATISFACCION.Mes_Periodo, SATISFACCION.CodigoEmpleado, SATISFACCION.IdRangoMaestra, SATISFACCION.IdRangoVersionMax, SATISFACCION.Satisfaccion, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, 
                         dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio, dbo.vw_RangosMaestrasFull.CodigoMarcaGrupo, dbo.vw_RangosMaestrasFull.MarcaGrupo, dbo.vw_RangosMaestrasFull.IdRangoVersion, 
                         dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor, dbo.vw_RangosMaestrasFull.CodigoConcepto
FROM            (SELECT        dbo.ExogenasJefesTallerDAI.Ano AS Ano_Periodo, dbo.ExogenasJefesTallerDAI.Mes AS Mes_Periodo, dbo.ExogenasJefesTallerDAI.CodigoEmpleado, EMPLEADO.IdRangoMaestra, EMPLEADO.IdRangoVersionMax,
                                                     EMPLEADO.IdComisionModeloSub, EMPLEADO.IdComisionModeloSubCriterio, dbo.ExogenasJefesTallerDAI.Satisfaccion
                          FROM            (SELECT        dbo.Empleados.CodigoEmpleado, dbo.vw_RangosVersionesMaxSub.IdRangoMaestra, dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub, 
                                                                              dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
                                                    FROM            dbo.EmpleadosRangosMaestras INNER JOIN
                                                                              dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                                                                              dbo.vw_RangosVersionesMaxSub ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra
                                                    WHERE        (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 38) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 52)) AS EMPLEADO LEFT OUTER JOIN
                                                    dbo.ExogenasJefesTallerDAI ON EMPLEADO.CodigoEmpleado = dbo.ExogenasJefesTallerDAI.CodigoEmpleado) AS SATISFACCION LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON SATISFACCION.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 38) AND (dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio = 52) AND (dbo.vw_RangosMaestrasFull.Desde < SATISFACCION.Satisfaccion) AND 
                         (dbo.vw_RangosMaestrasFull.Hasta >= SATISFACCION.Satisfaccion)







```
