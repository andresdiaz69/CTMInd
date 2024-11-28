# View: vw_JefedeVentasCali_21

## Usa los objetos:
- [[vw_JefedeVentasCali_2]]
- [[vw_RangosMaestrasFull]]

```sql




CREATE VIEW [dbo].[vw_JefedeVentasCali_21] AS

SELECT COLOCACION.CodigoEmpleado, COLOCACION.Nombres,  COLOCACION.Ano, COLOCACION.Mes, COLOCACION.CodigoCentro, COLOCACION.Valor_Creditos, COLOCACION.Valor_Seguros, COLOCACION.Valor_VentasNetas, COLOCACION.ColocacionCreditosYSeguros
,COLOCACION.IdRangoMaestra, COLOCACION.IdRangoVersionMax, COLOCACION.IdComisionModeloSub, COLOCACION.IdComisionModeloSubCriterio,
dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, 
dbo.vw_RangosMaestrasFull.Valor AS Comision_Colocacion
,vw_RangosMaestrasFull.CodigoConcepto
FROM
(
	SELECT CodigoEmpleado, Nombres, Ano, Mes, CodigoCentro, Valor_Creditos, Valor_Seguros, Valor_VentasNetas, 0 ColocacionCreditosYSeguros, IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio
	FROM vw_JefedeVentasCali_2

	UNION ALL 

	SELECT CodigoEmpleado, Nombres, Ano, Mes, '9999'CodigoCentro, ISNULL(SUM(Valor_Creditos),0) AS Valor_Creditos, ISNULL(SUM(Valor_Seguros),0) AS Valor_Seguros, ISNULL(SUM(Valor_VentasNetas),0) AS Valor_VentasNetas
	,CASE WHEN ISNULL(SUM(Valor_VentasNetas),0) <> 0 THEN (ISNULL(SUM(Valor_Creditos),0) + ISNULL(SUM(Valor_Seguros),0)) / ISNULL(SUM(Valor_VentasNetas),0) * 100 END AS ColocacionCreditosYSeguros
	, IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio
	FROM vw_JefedeVentasCali_2
	GROUP BY CodigoEmpleado, Nombres, Ano, Mes, IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio

)AS COLOCACION
LEFT OUTER JOIN dbo.vw_RangosMaestrasFull ON COLOCACION.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE (dbo.vw_RangosMaestrasFull.Desde <= COLOCACION.ColocacionCreditosYSeguros) AND (dbo.vw_RangosMaestrasFull.Hasta >= COLOCACION.ColocacionCreditosYSeguros)


```
