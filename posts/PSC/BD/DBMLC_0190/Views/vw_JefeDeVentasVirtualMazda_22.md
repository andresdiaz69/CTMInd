# View: vw_JefeDeVentasVirtualMazda_22

## Usa los objetos:
- [[vw_JefeDeVentasVirtualMazda_2]]
- [[vw_RangosMaestrasFull]]

```sql

CREATE VIEW [dbo].[vw_JefeDeVentasVirtualMazda_22] AS

SELECT  CREDITOSYSEGUROS.IdRangoMaestra, CREDITOSYSEGUROS.IdRangoVersionMax, CREDITOSYSEGUROS.IdComisionModeloSub, CREDITOSYSEGUROS.IdComisionModeloSubCriterio, CREDITOSYSEGUROS.CodigoEmpleado, CREDITOSYSEGUROS.Nombres
,CREDITOSYSEGUROS.Año, CREDITOSYSEGUROS.MesInicial, CREDITOSYSEGUROS.MesFinal, CREDITOSYSEGUROS.CodigoCentro, CREDITOSYSEGUROS.ValorCreditos, CREDITOSYSEGUROS.ValorSeguros, CREDITOSYSEGUROS.ValorTotalCreYSeguros, CREDITOSYSEGUROS.ValorVentasNetas, CREDITOSYSEGUROS.Porcentaje,
vw_RangosMaestrasFull.IdRangoVersion, vw_RangosMaestrasFull.ConsecutivoVersion, vw_RangosMaestrasFull.IdRangoDetalle, vw_RangosMaestrasFull.Desde, vw_RangosMaestrasFull.Hasta, 
CASE WHEN CREDITOSYSEGUROS.CodigoCentro <> 9999 THEN NULL ELSE vw_RangosMaestrasFull.Valor END AS Comision_CreditosYSeguros
FROM
(
	SELECT IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdcomisionModeloSubCriterio, CodigoEmpleado, Nombres, CodigoCentro, Año, MesInicial, MesFinal, ValorCreditos, ValorSeguros, ValorTotalCreYSeguros, ValorVentasNetas, Porcentaje  FROM vw_JefeDeVentasVirtualMazda_2

	UNION ALL

	SELECT IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdcomisionModeloSubCriterio, CodigoEmpleado, Nombres, CodigoCentro, Año, MesInicial, MesFinal, ValorCreditos, ValorSeguros, ValorTotalCreYSeguros, ValorVentasNetas, CASE WHEN  ValorVentasNetas <> 0 THEN ISNULL(ValorTotalCreYSeguros / ValorVentasNetas * 100, 0) ELSE NULL END AS Porcentaje FROM (
	SELECT IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdcomisionModeloSubCriterio, CodigoEmpleado, Nombres, '9999'CodigoCentro, Año, MesInicial, MesFinal, SUM(ValorCreditos)AS ValorCreditos, SUM(ValorSeguros)AS ValorSeguros, SUM(ValorTotalCreYSeguros)AS ValorTotalCreYSeguros, SUM(ValorVentasNetas)AS ValorVentasNetas FROM vw_JefeDeVentasVirtualMazda_2
	GROUP BY IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdcomisionModeloSubCriterio, CodigoEmpleado, Nombres, Año, MesInicial, MesFinal) AS T

)AS CREDITOSYSEGUROS
LEFT JOIN dbo.vw_RangosMaestrasFull ON CREDITOSYSEGUROS.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE (dbo.vw_RangosMaestrasFull.Desde < CreditosYSeguros.Porcentaje) AND (dbo.vw_RangosMaestrasFull.Hasta >= CreditosYSeguros.Porcentaje)
AND CreditosYSeguros.MesInicial = CreditosYSeguros.MesFinal


```
