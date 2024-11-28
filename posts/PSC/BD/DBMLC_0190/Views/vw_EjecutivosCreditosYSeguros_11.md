# View: vw_EjecutivosCreditosYSeguros_11

## Usa los objetos:
- [[vw_EjecutivosCreditosYSeguros_1]]
- [[vw_RangosMaestrasFull]]

```sql


CREATE VIEW [dbo].[vw_EjecutivosCreditosYSeguros_11]  AS

SELECT TOTAL.IdRangoMaestra, TOTAL.IdRangoVersionMax, TOTAL.IdComisionModeloSub, TOTAL.IdComisionModeloSubCriterio, TOTAL.CodigoEmpleado, TOTAL.Nombres, TOTAL.Año, TOTAL.MesInicial, TOTAL.MesFinal, TOTAL.CodigoCentro, TOTAL.NombreCentro ,TOTAL.ValorComisionCreditos, TOTAL.ValorVentasNetas, TOTAL.PorcentajeCreditos
,vw_RangosMaestrasFull.IdRangoVersion,vw_RangosMaestrasFull.ConsecutivoVersion,vw_RangosMaestrasFull.IdRangoDetalle,vw_RangosMaestrasFull.Desde,vw_RangosMaestrasFull.Hasta, vw_RangosMaestrasFull.Valor as ComisionCreditos, vw_RangosMaestrasFull.CodigoConcepto
FROM 
(

	SELECT IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio, CodigoEmpleado, Nombres, Año, MesInicial, MesFinal, CodigoCentro, NombreCentro, ValorComisionCreditos, ValorVentasNetas, CASE WHEN ISNULL(ValorVentasNetas,0) = 0 THEN 0 ELSE (ISNULL(ValorComisionCreditos,0) / ISNULL(ValorVentasNetas,0) * 100) END AS PorcentajeCreditos
	FROM vw_EjecutivosCreditosYSeguros_1

	UNION ALL

	SELECT IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio, CodigoEmpleado, Nombres, Año, MesInicial, MesFinal, '9999'CodigoCentro, 'TOTAL'NombreCentro, ValorComisionCreditos, ValorVentasNetas, CASE WHEN ISNULL(ValorVentasNetas,0) = 0 THEN 0 ELSE (ISNULL(ValorComisionCreditos,0) / ISNULL(ValorVentasNetas,0) * 100) END AS PorcentajeCreditos
	FROM( SELECT  IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio, CodigoEmpleado, Nombres, Año, MesInicial, MesFinal, SUM(ValorComisionCreditos)AS ValorComisionCreditos, SUM(ValorVentasNetas) AS ValorVentasNetas
		  FROM vw_EjecutivosCreditosYSeguros_1 
		  GROUP BY IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio, CodigoEmpleado, Nombres, Año, MesInicial, MesFinal 
	)AS A	

)AS TOTAL
LEFT JOIN vw_RangosMaestrasFull ON TOTAL.IdRangoVersionMax = vw_RangosMaestrasFull.IdRangoVersion
WHERE (vw_RangosMaestrasFull.Desde < TOTAL.PorcentajeCreditos) AND (vw_RangosMaestrasFull.Hasta >= TOTAL.PorcentajeCreditos)
and MesInicial = MesFinal


```
