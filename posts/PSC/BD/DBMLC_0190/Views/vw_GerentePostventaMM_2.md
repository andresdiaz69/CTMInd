# View: vw_GerentePostventaMM_2

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasGerentePostventaMM]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql


CREATE VIEW [dbo].[vw_GerentePostventaMM_2]
AS
SELECT        TicketPromedio.Ano_Periodo, TicketPromedio.Mes_Periodo, TicketPromedio.CodigoEmpleado, TicketPromedio.IdRangoMaestra, TicketPromedio.IdRangoVersionMax, TicketPromedio.Ticket, 
                         dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio, dbo.vw_RangosMaestrasFull.CodigoMarcaGrupo, dbo.vw_RangosMaestrasFull.MarcaGrupo, 
                         dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, 
                         dbo.vw_RangosMaestrasFull.Valor, dbo.vw_RangosMaestrasFull.CodigoConcepto
FROM            (SELECT        dbo.ExogenasGerentePostventaMM.Ano AS Ano_Periodo, dbo.ExogenasGerentePostventaMM.Mes AS Mes_Periodo, EMPLEADO.CodigoEmpleado, EMPLEADO.IdRangoMaestra, EMPLEADO.IdRangoVersionMax, 
                                                    EMPLEADO.IdComisionModeloSub, EMPLEADO.IdComisionModeloSubCriterio, dbo.ExogenasGerentePostventaMM.Ticket
                          FROM            (SELECT        dbo.EmpleadosRangosMaestras.CodigoEmpleado, dbo.vw_RangosVersionesMaxSub.IdRangoMaestra, dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, 
                                                                              dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
                                                    FROM            dbo.EmpleadosRangosMaestras INNER JOIN
                                                                              dbo.Empleados ON dbo.Empleados.CodigoEmpleado = dbo.EmpleadosRangosMaestras.CodigoEmpleado INNER JOIN
                                                                              dbo.vw_RangosVersionesMaxSub ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra
                                                    WHERE        (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 48) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 85)) AS EMPLEADO LEFT OUTER JOIN
                                                    dbo.ExogenasGerentePostventaMM ON EMPLEADO.CodigoEmpleado = dbo.ExogenasGerentePostventaMM.CodigoEmpleado) AS TicketPromedio LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON TicketPromedio.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio = 85) AND (dbo.vw_RangosMaestrasFull.Desde < TicketPromedio.Ticket) AND (dbo.vw_RangosMaestrasFull.Hasta >= TicketPromedio.Ticket) AND 
                         (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 48)

```
