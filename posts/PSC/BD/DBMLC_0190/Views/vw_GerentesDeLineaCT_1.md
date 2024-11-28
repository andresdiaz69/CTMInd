# View: vw_GerentesDeLineaCT_1

## Usa los objetos:
- [[Empleados]]
- [[EmpleadosRangosMaestras]]
- [[vw_GerentesDeLineaCT_12]]
- [[vw_RangosMaestrasFull]]
- [[vw_RangosVersionesMaxSub]]

```sql




CREATE VIEW [dbo].[vw_GerentesDeLineaCT_1]
AS
SELECT        PESO_COMERCIAL.Ano_Periodo, PESO_COMERCIAL.Mes_Periodo, PESO_COMERCIAL.CodigoEmpleado, PESO_COMERCIAL.IdRangoMaestra, PESO_COMERCIAL.IdRangoVersionMax, PESO_COMERCIAL.CodigoMArca, 
                         PESO_COMERCIAL.Marca,PESO_COMERCIAL.EntregasEfectivas,PESO_COMERCIAL.VentasNacionales, PESO_COMERCIAL.PesoComercial, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio, 
                         dbo.vw_RangosMaestrasFull.CodigoMarcaGrupo, dbo.vw_RangosMaestrasFull.MarcaGrupo, dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, 
                         dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor AS Comision_PesoComercial
FROM            (SELECT        dbo.vw_GerentesDeLineaCT_12.Ano_Periodo, dbo.vw_GerentesDeLineaCT_12.Mes_Periodo, dbo.vw_GerentesDeLineaCT_12.CodigoEmpleado, dbo.vw_GerentesDeLineaCT_12.CodigoMArca, dbo.vw_GerentesDeLineaCT_12.Marca, 
                                                    vw_GerentesDeLineaCT_12.EntregasEfectivas,vw_GerentesDeLineaCT_12.VentasNacionales,EMPLEADO.IdRangoMaestra, EMPLEADO.IdRangoVersionMax, EMPLEADO.IdComisionModeloSub, EMPLEADO.IdComisionModeloSubCriterio, dbo.vw_GerentesDeLineaCT_12.PesoComercial
                          FROM            (SELECT        dbo.Empleados.CodigoEmpleado, dbo.vw_RangosVersionesMaxSub.IdRangoMaestra, dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub, 
                                                                              dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
                                                    FROM            dbo.EmpleadosRangosMaestras INNER JOIN
                                                                              dbo.Empleados ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.Empleados.CodigoEmpleado INNER JOIN
                                                                              dbo.vw_RangosVersionesMaxSub ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra
                                                    WHERE        (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 46) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 78)) AS EMPLEADO LEFT OUTER JOIN
                                                    dbo.vw_GerentesDeLineaCT_12 ON EMPLEADO.CodigoEmpleado = dbo.vw_GerentesDeLineaCT_12.CodigoEmpleado) AS PESO_COMERCIAL LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON PESO_COMERCIAL.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 46) AND (dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio = 78) AND (dbo.vw_RangosMaestrasFull.Desde < PESO_COMERCIAL.PesoComercial) AND 
                         (dbo.vw_RangosMaestrasFull.Hasta >= PESO_COMERCIAL.PesoComercial) 

```
