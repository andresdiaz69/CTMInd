# View: vw_GerenteDeMercadeoMITyBYD_11

## Usa los objetos:
- [[vw_GerenteDeMercadeoMITyBYD_1]]
- [[vw_RangosMaestrasFull]]

```sql
CREATE VIEW [dbo].[vw_GerenteDeMercadeoMITyBYD_11] AS 

SELECT C.CodigoEmpleado, C.Nombres, C.Ano_Periodo, C.Mes_Periodo, C.CodigoCentro, C.NombreCentro, C.EntregasEfectivas, C.IdRangoMaestra, C.IdRangoVersionMax, C.IdComisionModeloSub, C.IdComisionModeloSubCriterio,
dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, 
dbo.vw_RangosMaestrasFull.Valor AS Comision_Entregas
,vw_RangosMaestrasFull.CodigoConcepto
FROM
(
	SELECT CodigoEmpleado, Nombres, Ano_Periodo, Mes_Periodo, CodigoCentro, NombreCentro, EntregasEfectivas, IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio 
	FROM vw_GerenteDeMercadeoMITyBYD_1

	UNION ALL

	SELECT CodigoEmpleado, Nombres, Ano_Periodo, Mes_Periodo, '9999'CodigoCentro, 'TOTAL'NombreCentro, SUM(EntregasEfectivas)AS EntregasEfectivas, IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio 
	FROM vw_GerenteDeMercadeoMITyBYD_1
	GROUP BY CodigoEmpleado, Nombres, Ano_Periodo, Mes_Periodo, IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio 


)AS C
LEFT OUTER JOIN dbo.vw_RangosMaestrasFull ON c.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE (dbo.vw_RangosMaestrasFull.Desde < c.EntregasEfectivas) AND (dbo.vw_RangosMaestrasFull.Hasta >= c.EntregasEfectivas)

```
