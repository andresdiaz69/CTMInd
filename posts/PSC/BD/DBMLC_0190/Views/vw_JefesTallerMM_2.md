# View: vw_JefesTallerMM_2

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasJefesTallerMM]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql




CREATE VIEW [dbo].[vw_JefesTallerMM_2]
AS
SELECT        TICKET.Ano_Periodo, TICKET.Mes_Periodo, TICKET.CodigoEmpleado, TICKET.IdRangoMaestra, TICKET.IdRangoVersionMax, TICKET.Ticket, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, 
                         dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio, dbo.vw_RangosMaestrasFull.CodigoMarcaGrupo, dbo.vw_RangosMaestrasFull.MarcaGrupo, dbo.vw_RangosMaestrasFull.IdRangoVersion, 
                         dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor, dbo.vw_RangosMaestrasFull.CodigoConcepto
FROM            (SELECT        dbo.ExogenasJefesTallerMM.Ano AS Ano_Periodo, dbo.ExogenasJefesTallerMM.Mes AS Mes_Periodo, dbo.ExogenasJefesTallerMM.CodigoEmpleado, EMPLEADO.IdRangoMaestra, EMPLEADO.IdRangoVersionMax,
                                                     EMPLEADO.IdComisionModeloSub, EMPLEADO.IdComisionModeloSubCriterio, dbo.ExogenasJefesTallerMM.TICKET
                          FROM            (SELECT        dbo.Empleados.CodigoEmpleado, dbo.vw_RangosVersionesMaxSub.IdRangoMaestra, dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub, 
                                                                              dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
                                                    FROM            dbo.EmpleadosRangosMaestras INNER JOIN
                                                                              dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                                                                              dbo.vw_RangosVersionesMaxSub ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra
                                                    WHERE        (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 25) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 27)) AS EMPLEADO LEFT OUTER JOIN
                                                    dbo.ExogenasJefesTallerMM ON EMPLEADO.CodigoEmpleado = dbo.ExogenasJefesTallerMM.CodigoEmpleado) AS TICKET LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON TICKET.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 25) AND (dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio = 27) AND (dbo.vw_RangosMaestrasFull.Desde < TICKET.Ticket) AND 
                         (dbo.vw_RangosMaestrasFull.Hasta >= TICKET.Ticket)




```
