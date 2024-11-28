# View: vw_GerentePostventaMM_1

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[ExogenasGerentePostventaMM]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql


CREATE VIEW [dbo].[vw_GerentePostventaMM_1]
AS
SELECT        Rotacion_Trabajo.Ano_Periodo, Rotacion_Trabajo.Mes_Periodo, Rotacion_Trabajo.CodigoEmpleado, Rotacion_Trabajo.IdRangoMaestra, Rotacion_Trabajo.IdRangoVersionMax, Rotacion_Trabajo.RotacionTrabajo, 
                         dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio, dbo.vw_RangosMaestrasFull.CodigoMarcaGrupo, dbo.vw_RangosMaestrasFull.MarcaGrupo, 
                         dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, 
                         dbo.vw_RangosMaestrasFull.Valor, dbo.vw_RangosMaestrasFull.CodigoConcepto
FROM            (SELECT        dbo.ExogenasGerentePostventaMM.Ano AS Ano_Periodo, dbo.ExogenasGerentePostventaMM.Mes AS Mes_Periodo, dbo.ExogenasGerentePostventaMM.CodigoEmpleado, EMPLEADO.IdRangoMaestra, 
                                                    EMPLEADO.IdRangoVersionMax, EMPLEADO.IdComisionModeloSub, EMPLEADO.IdComisionModeloSubCriterio, dbo.ExogenasGerentePostventaMM.RotacionTrabajo
                          FROM            (SELECT        dbo.Empleados.CodigoEmpleado, dbo.vw_RangosVersionesMaxSub.IdRangoMaestra, dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub, 
                                                                              dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
                                                    FROM            dbo.EmpleadosRangosMaestras INNER JOIN
                                                                              dbo.Empleados ON dbo.Empleados.CodigoEmpleado = dbo.EmpleadosRangosMaestras.CodigoEmpleado INNER JOIN
                                                                              dbo.vw_RangosVersionesMaxSub ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra
                                                    WHERE        (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 48) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 84)) AS EMPLEADO LEFT OUTER JOIN
                                                    dbo.ExogenasGerentePostventaMM ON EMPLEADO.CodigoEmpleado = dbo.ExogenasGerentePostventaMM.CodigoEmpleado) AS Rotacion_Trabajo LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON Rotacion_Trabajo.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 48) AND (dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio = 84) AND (dbo.vw_RangosMaestrasFull.Desde < Rotacion_Trabajo.RotacionTrabajo) AND 
                         (dbo.vw_RangosMaestrasFull.Hasta >= Rotacion_Trabajo.RotacionTrabajo)

```
