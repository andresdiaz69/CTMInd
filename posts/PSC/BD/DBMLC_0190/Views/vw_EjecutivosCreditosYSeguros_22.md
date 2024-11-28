# View: vw_EjecutivosCreditosYSeguros_22

## Usa los objetos:
- [[vw_EjecutivosCreditosYSeguros_2]]
- [[vw_RangosMaestrasFull]]

```sql


CREATE VIEW [dbo].[vw_EjecutivosCreditosYSeguros_22] AS

SELECT TOTAL.IdRangoMaestra, TOTAL.IdRangoVersionMax, TOTAL.IdComisionModeloSub, TOTAL.IdComisionModeloSubCriterio, TOTAL.CodigoEmpleado, TOTAL.Nombres, TOTAL.Año, TOTAL.MesInicial, TOTAL.MesFinal, TOTAL.CodigoCentro, TOTAL.NombreCentro, TOTAL.ValorSegurosTotal
,vw_RangosMaestrasFull.IdRangoVersion,vw_RangosMaestrasFull.ConsecutivoVersion,vw_RangosMaestrasFull.IdRangoDetalle,vw_RangosMaestrasFull.Desde,vw_RangosMaestrasFull.Hasta,vw_RangosMaestrasFull.Valor AS ComisionSeguros, vw_RangosMaestrasFull.CodigoConcepto
FROM 
(

	SELECT  IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio, CodigoEmpleado, Nombres, Año, MesInicial, MesFinal,CodigoCentro, NombreCentro, ValorSeguros AS ValorSegurosTotal
	FROM vw_EjecutivosCreditosYSeguros_2 
	
	UNION ALL

	SELECT  IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio, CodigoEmpleado, Nombres, Año, MesInicial, MesFinal, '9999'CodigoCentro, 'TOTAL'NombreCentro,  SUM(ValorSeguros)AS ValorSegurosTotal
	FROM vw_EjecutivosCreditosYSeguros_2 
	GROUP BY IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio, CodigoEmpleado, Nombres, Año, MesInicial, MesFinal
)AS TOTAL
LEFT JOIN vw_RangosMaestrasFull ON TOTAL.IdRangoVersionMax = vw_RangosMaestrasFull.IdRangoVersion
WHERE (vw_RangosMaestrasFull.Desde < TOTAL.ValorSegurosTotal) AND (vw_RangosMaestrasFull.Hasta >= TOTAL.ValorSegurosTotal)
and MesInicial = MesFinal

```
