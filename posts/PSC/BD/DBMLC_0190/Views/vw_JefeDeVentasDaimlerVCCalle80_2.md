# View: vw_JefeDeVentasDaimlerVCCalle80_2

## Usa los objetos:
- [[Centros]]
- [[vw_JefeDeVentasDaimlerVCCalle80_2_1]]
- [[vw_RangosMaestrasFull]]

```sql

CREATE VIEW [dbo].[vw_JefeDeVentasDaimlerVCCalle80_2] AS

SELECT        BONIFICACION.Año, BONIFICACION.Mes, BONIFICACION.CodigoEmpleado, BONIFICACION.IdRangoMaestra, BONIFICACION.IdRangoVersionMax, BONIFICACION.CodigoCentro, Centros.NombreCentro, VentasNetas, OtrosIngresos, BONIFICACION.ParticipacionOtrosIngresos, 
dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio, dbo.vw_RangosMaestrasFull.CodigoMarcaGrupo, dbo.vw_RangosMaestrasFull.MarcaGrupo, 
dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, 
dbo.vw_RangosMaestrasFull.Valor AS Comision_Bonificacion, vw_RangosMaestrasFull.CodigoConcepto
FROM            
(

	SELECT IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio, BONIFICACION.CodigoEmpleado, BONIFICACION.Año, BONIFICACION.Mes, BONIFICACION.CodigoCentro, BONIFICACION.VentasNetas, BONIFICACION.OtrosIngresos, 0 as ParticipacionOtrosIngresos
	FROM            vw_JefeDeVentasDaimlerVCCalle80_2_1 AS BONIFICACION

	UNION ALL

	SELECT IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio, BONIFICACION.CodigoEmpleado, BONIFICACION.Año, BONIFICACION.Mes, '9999'CodigoCentro, SUM(BONIFICACION.VentasNetas)AS VentasNetas, SUM(BONIFICACION.OtrosIngresos)AS OtrosIngresos
	,CASE WHEN SUM(BONIFICACION.VentasNetas) > 0  THEN (ISNULL(CONVERT(decimal(18,2), SUM(BONIFICACION.OtrosIngresos)), 0) / ISNULL(CONVERT(decimal(18,2), SUM(BONIFICACION.VentasNetas)), 0) * 100)
	ELSE 0.00 END AS ParticipacionOtrosIngresos
	FROM            vw_JefeDeVentasDaimlerVCCalle80_2_1 AS BONIFICACION
	GROUP BY IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio, BONIFICACION.CodigoEmpleado, BONIFICACION.Año, BONIFICACION.Mes


) AS BONIFICACION 
LEFT OUTER JOIN dbo.vw_RangosMaestrasFull ON BONIFICACION.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
LEFT JOIN Centros ON BONIFICACION.CodigoCentro = Centros.CodigoCentro

WHERE (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 75) AND (dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio = 142) 
AND (dbo.vw_RangosMaestrasFull.Desde <= BONIFICACION.ParticipacionOtrosIngresos) 
AND (dbo.vw_RangosMaestrasFull.Hasta >= BONIFICACION.ParticipacionOtrosIngresos)





```
