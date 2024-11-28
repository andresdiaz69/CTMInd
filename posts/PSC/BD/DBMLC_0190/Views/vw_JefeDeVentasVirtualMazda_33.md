# View: vw_JefeDeVentasVirtualMazda_33

## Usa los objetos:
- [[vw_JefeDeVentasVirtualMazda_3]]
- [[vw_RangosMaestrasFull]]

```sql

CREATE VIEW [dbo].[vw_JefeDeVentasVirtualMazda_33] AS

SELECT  VENTASDIGITALES.IdRangoMaestra, VENTASDIGITALES.IdRangoVersionMax, VENTASDIGITALES.IdComisionModeloSub, VENTASDIGITALES.IdComisionModeloSubCriterio, VENTASDIGITALES.CodigoEmpleado, VENTASDIGITALES.Ano_Recaudo, VENTASDIGITALES.Mes_Recaudo, VENTASDIGITALES.CodigoCentro, VENTASDIGITALES.EntregasCanalVirtual, VENTASDIGITALES.EntregasLinea, VENTASDIGITALES.ParticipacionVentasDigitales,
vw_RangosMaestrasFull.IdRangoVersion, vw_RangosMaestrasFull.ConsecutivoVersion, vw_RangosMaestrasFull.IdRangoDetalle, vw_RangosMaestrasFull.Desde, vw_RangosMaestrasFull.Hasta,
CASE WHEN VENTASDIGITALES.CodigoCentro <> 9999 THEN NULL ELSE vw_RangosMaestrasFull.Valor END AS Comision_ParticipacionVentasDigitales
FROM
(
	SELECT IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdcomisionModeloSubCriterio, CodigoEmpleado, Nombres, CodigoCentro, Ano_Recaudo, Mes_Recaudo, EntregasCanalVirtual, EntregasLinea, ParticipacionVentasDigitales FROM vw_JefeDeVentasVirtualMazda_3

	UNION ALL

	SELECT IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdcomisionModeloSubCriterio, CodigoEmpleado, Nombres, '9999'CodigoCentro, Ano_Recaudo, Mes_Recaudo, EntregasCanalVirtual, EntregasLinea, CASE WHEN EntregasLinea <> 0 THEN CONVERT(decimal(18,2),(Convert(decimal(18,2),EntregasCanalVirtual) / convert(decimal(18,2),EntregasLinea)) *100) ELSE NULL END AS ParticipacionVentasDigitales FROM (
	SELECT IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdcomisionModeloSubCriterio, CodigoEmpleado, Nombres, '9999'CodigoCentro, Ano_Recaudo, Mes_Recaudo, SUM(EntregasCanalVirtual)AS EntregasCanalVirtual, SUM(EntregasLinea) AS EntregasLinea FROM vw_JefeDeVentasVirtualMazda_3
	GROUP BY IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdcomisionModeloSubCriterio, CodigoEmpleado, Nombres, Ano_Recaudo, Mes_Recaudo)AS T

)AS VENTASDIGITALES
LEFT JOIN dbo.vw_RangosMaestrasFull ON VENTASDIGITALES.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE (dbo.vw_RangosMaestrasFull.Desde < VENTASDIGITALES.ParticipacionVentasDigitales) AND (dbo.vw_RangosMaestrasFull.Hasta >= VENTASDIGITALES.ParticipacionVentasDigitales)




```
