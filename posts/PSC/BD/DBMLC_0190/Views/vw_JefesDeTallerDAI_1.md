# View: vw_JefesDeTallerDAI_1

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasJefesTallerDAI]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql


CREATE VIEW [dbo].[vw_JefesDeTallerDAI_1]
AS
SELECT        PRODUCTIVIDAD.Ano_Periodo, PRODUCTIVIDAD.Mes_Periodo, PRODUCTIVIDAD.CodigoEmpleado, PRODUCTIVIDAD.IdRangoMaestra, PRODUCTIVIDAD.IdRangoVersionMax, PRODUCTIVIDAD.Productividad, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, 
                         dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio, dbo.vw_RangosMaestrasFull.CodigoMarcaGrupo, dbo.vw_RangosMaestrasFull.MarcaGrupo, dbo.vw_RangosMaestrasFull.IdRangoVersion, 
                         dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor, dbo.vw_RangosMaestrasFull.CodigoConcepto
FROM            (SELECT        dbo.ExogenasJefesTallerDAI.Ano AS Ano_Periodo, dbo.ExogenasJefesTallerDAI.Mes AS Mes_Periodo, dbo.ExogenasJefesTallerDAI.CodigoEmpleado, EMPLEADO.IdRangoMaestra, EMPLEADO.IdRangoVersionMax,
                                                     EMPLEADO.IdComisionModeloSub, EMPLEADO.IdComisionModeloSubCriterio, dbo.ExogenasJefesTallerDAI.Productividad
                          FROM            (SELECT        dbo.Empleados.CodigoEmpleado, dbo.vw_RangosVersionesMaxSub.IdRangoMaestra, dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub, 
                                                                              dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
                                                    FROM            dbo.EmpleadosRangosMaestras INNER JOIN
                                                                              dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                                                                              dbo.vw_RangosVersionesMaxSub ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra
                                                    WHERE        (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 38) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 51)) AS EMPLEADO LEFT OUTER JOIN
                                                    dbo.ExogenasJefesTallerDAI ON EMPLEADO.CodigoEmpleado = dbo.ExogenasJefesTallerDAI.CodigoEmpleado) AS PRODUCTIVIDAD LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON PRODUCTIVIDAD.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 38) AND (dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio = 51) AND (dbo.vw_RangosMaestrasFull.Desde < PRODUCTIVIDAD.Productividad) AND 
                         (dbo.vw_RangosMaestrasFull.Hasta >= PRODUCTIVIDAD.Productividad)







```
