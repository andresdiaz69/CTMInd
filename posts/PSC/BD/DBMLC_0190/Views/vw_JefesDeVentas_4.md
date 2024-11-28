# View: vw_JefesDeVentas_4

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_JefesDeVentas_4_2]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql




CREATE VIEW [dbo].[vw_JefesDeVentas_4]
AS
SELECT        COLOCACION_CREDITOSYSEGUROS.Ano_Periodo, COLOCACION_CREDITOSYSEGUROS.Mes_Periodo, COLOCACION_CREDITOSYSEGUROS.CodigoEmpleado, COLOCACION_CREDITOSYSEGUROS.IdRangoMaestra, COLOCACION_CREDITOSYSEGUROS.IdRangoVersionMax, 
                         CodigoCentro, Centro, COLOCACION_CREDITOSYSEGUROS.ColocacionCreditosYSeguros, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio, dbo.vw_RangosMaestrasFull.CodigoMarcaGrupo, 
                         dbo.vw_RangosMaestrasFull.MarcaGrupo, dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, 
                         dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor AS Comision_ColocacionCreditosYSeguros, dbo.vw_RangosMaestrasFull.CodigoConcepto
FROM            (SELECT        dbo.vw_JefesDeVentas_4_2.Ano_Periodo, dbo.vw_JefesDeVentas_4_2.Mes_Periodo, dbo.vw_JefesDeVentas_4_2.CodigoEmpleado, dbo.vw_JefesDeVentas_4_2.CodigoCentro, dbo.vw_JefesDeVentas_4_2.Centro, EMPLEADO.IdRangoMaestra, EMPLEADO.IdRangoVersionMax, 
                                                    EMPLEADO.IdComisionModeloSub, EMPLEADO.IdComisionModeloSubCriterio, dbo.vw_JefesDeVentas_4_2.ColocacionCreditosYSeguros
                          FROM            (SELECT        dbo.Empleados.CodigoEmpleado, dbo.vw_RangosVersionesMaxSub.IdRangoMaestra, dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub, 
                                                                              dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
                                                    FROM            dbo.EmpleadosRangosMaestras INNER JOIN
                                                                              dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                                                                              dbo.vw_RangosVersionesMaxSub ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra
                                                    WHERE        
													((dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 29) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 58)
													or
													(dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 40) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 62))
													) AS EMPLEADO LEFT OUTER JOIN
                                                    dbo.vw_JefesDeVentas_4_2 ON EMPLEADO.CodigoEmpleado = dbo.vw_JefesDeVentas_4_2.CodigoEmpleado) AS COLOCACION_CREDITOSYSEGUROS LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON COLOCACION_CREDITOSYSEGUROS.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        

((dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 29) AND (dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio = 58) 
OR
(dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 40) AND (dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio = 62))

AND (dbo.vw_RangosMaestrasFull.Desde < COLOCACION_CREDITOSYSEGUROS.ColocacionCreditosYSeguros) 
AND (dbo.vw_RangosMaestrasFull.Hasta >= COLOCACION_CREDITOSYSEGUROS.ColocacionCreditosYSeguros)


```
