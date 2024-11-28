# View: vw_JefeDeVentasVirtualMazda_Liquidacion

## Usa los objetos:
- [[Centros]]
- [[vw_EmpleadosDetalle]]
- [[vw_JefeDeVentasVirtualMazda_11]]
- [[vw_JefeDeVentasVirtualMazda_22]]
- [[vw_JefeDeVentasVirtualMazda_33]]

```sql


CREATE VIEW [dbo].[vw_JefeDeVentasVirtualMazda_Liquidacion] AS 

SELECT  ISNULL(ISNULL(PESOCOMERCIAL.CodigoEmpleado, CREDITOSYSEGUROS.CodigoEmpleado),PARTICIPACION.CodigoEmpleado)AS CodigoEmpleado, vw_EmpleadosDetalle.Empleado, vw_EmpleadosDetalle.CodigoEmpresa, vw_EmpleadosDetalle.NombreEmpresa, vw_EmpleadosDetalle.FechaIngreso, vw_EmpleadosDetalle.FechaRetiro
, ISNULL(ISNULL(PESOCOMERCIAL.Ano_Recaudo, CREDITOSYSEGUROS.Año),PARTICIPACION.Ano_Recaudo)AS Ano_Periodo, ISNULL(ISNULL(PESOCOMERCIAL.Mes_Recaudo, CREDITOSYSEGUROS.MesInicial),PARTICIPACION.Mes_Recaudo) AS Mes_Periodo, ISNULL(ISNULL(PESOCOMERCIAL.CodigoCentro, CREDITOSYSEGUROS.CodigoCentro),PARTICIPACION.CodigoCentro)AS CodigoCentro, Centros.NombreCentro
, ISNULL(ISNULL(PESOCOMERCIAL.IdComisionModeloSub,CREDITOSYSEGUROS.IdComisionModeloSub),PARTICIPACION.IdComisionModeloSub)AS IdComisionModeloSub
--PESO COMERCIAL
, '334' AS IdRangoMaestra_1
, ISNULL(PESOCOMERCIAL.VehiculosRecaudados,0)AS VehiculosRecaudados, ISNULL(PESOCOMERCIAL.VentasNacionales,0)AS VentasNacionales, ISNULL(PESOCOMERCIAL.PesoComercial,0)AS PesoComercial, PESOCOMERCIAL.Desde AS Desde_PC, PESOCOMERCIAL.Hasta AS Hasta_PC, ISNULL(PESOCOMERCIAL.Comision_PesoComercial,0)AS Comision_PesoComercial
--CREDITOS Y SEGUROS
, '335' AS IdRangoMaestra_2
, ISNULL(CREDITOSYSEGUROS.ValorCreditos,0)AS ValorCreditos, ISNULL(CREDITOSYSEGUROS.ValorSeguros,0)AS ValorSeguros, ISNULL(CREDITOSYSEGUROS.ValorTotalCreYSeguros,0)AS ValorTotalCreYSeguros, ISNULL(CREDITOSYSEGUROS.ValorVentasNetas,0)AS ValorVentasNetas, ISNULL(CREDITOSYSEGUROS.Porcentaje,0)AS PorcentajeCreYSeg, CREDITOSYSEGUROS.Desde AS Desde_CreYSeg, CREDITOSYSEGUROS.Hasta AS Hasta_CreYSeg, ISNULL(CREDITOSYSEGUROS.Comision_CreditosYSeguros,0)AS Comision_CreditosYSeguros
--PARTICIPACION VENTAS DIGITALES
, '336' AS IdRangoMaestra_3
, ISNULL(PARTICIPACION.EntregasCanalVirtual,0)AS EntregasCanalVirtual, ISNULL(PARTICIPACION.EntregasLinea,0)AS EntregasLinea, ISNULL(PARTICIPACION.ParticipacionVentasDigitales,0)AS ParticipacionVentasDigitales, PARTICIPACION.Desde AS Desde_Parti, PARTICIPACION.Hasta AS Hasta_Parti, ISNULL(PARTICIPACION.Comision_ParticipacionVentasDigitales,0) AS Comision_ParticipacionVentasDigitales
--COMISION TOTAL
,ISNULL(PESOCOMERCIAL.Comision_PesoComercial,0) + ISNULL(CREDITOSYSEGUROS.Comision_CreditosYSeguros,0) +  ISNULL(PARTICIPACION.Comision_ParticipacionVentasDigitales,0) AS Comision_TOTAL

, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion

FROM vw_JefeDeVentasVirtualMazda_11 AS PESOCOMERCIAL

FULL JOIN vw_JefeDeVentasVirtualMazda_22 AS CREDITOSYSEGUROS 

ON PESOCOMERCIAL.Ano_Recaudo = CREDITOSYSEGUROS.Año AND PESOCOMERCIAL.Mes_Recaudo = CREDITOSYSEGUROS.MesInicial AND PESOCOMERCIAL.CodigoEmpleado = CREDITOSYSEGUROS.CodigoEmpleado AND PESOCOMERCIAL.CodigoCentro = CREDITOSYSEGUROS.CodigoCentro

FULL JOIN vw_JefeDeVentasVirtualMazda_33 AS PARTICIPACION

ON ISNULL(PESOCOMERCIAL.Ano_Recaudo,CREDITOSYSEGUROS.Año) = PARTICIPACION.Ano_Recaudo 
AND ISNULL(PESOCOMERCIAL.Mes_Recaudo, CREDITOSYSEGUROS.MesInicial) = PARTICIPACION.Mes_Recaudo 
AND ISNULL(PESOCOMERCIAL.CodigoEmpleado, CREDITOSYSEGUROS.CodigoEmpleado) = PARTICIPACION.CodigoEmpleado 
AND ISNULL(PESOCOMERCIAL.CodigoCentro, CREDITOSYSEGUROS.CodigoCentro) = PARTICIPACION.CodigoCentro

LEFT JOIN vw_EmpleadosDetalle ON ISNULL(ISNULL(PESOCOMERCIAL.CodigoEmpleado, CREDITOSYSEGUROS.CodigoEmpleado),PARTICIPACION.CodigoEmpleado) = vw_EmpleadosDetalle.CodigoEmpleado
LEFT JOIN Centros ON ISNULL(ISNULL(PESOCOMERCIAL.CodigoCentro, CREDITOSYSEGUROS.CodigoCentro),PARTICIPACION.CodigoCentro) = Centros.CodigoCentro


```
