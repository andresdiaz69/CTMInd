# View: vw_GerenteDeMercadeoMITyBYD_22

## Usa los objetos:
- [[vw_GerenteDeMercadeoMITyBYD_2]]
- [[vw_RangosMaestrasFull]]

```sql

CREATE VIEW [dbo].[vw_GerenteDeMercadeoMITyBYD_22] AS 

SELECT C.CodigoEmpleado, C.Nombres, C.Ano_Periodo, C.Mes_Periodo, C.CodigoCentro, C.NombreCentro, C.Valor, C.IdRangoMaestra, C.IdRangoVersionMax, C.IdComisionModeloSub, C.IdComisionModeloSubCriterio,
dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, 
dbo.vw_RangosMaestrasFull.Valor AS Comision_Facturacion
,vw_RangosMaestrasFull.CodigoConcepto
FROM
(
	SELECT CodigoEmpleado, Nombres, Ano_Periodo, Mes_Periodo, CodigoCentro,	NombreCentro, Valor, IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio 
	FROM vw_GerenteDeMercadeoMITyBYD_2

	UNION ALL

	SELECT CodigoEmpleado, Nombres, Ano_Periodo, Mes_Periodo, '9999'CodigoCentro, 'TOTAL'NombreCentro, SUM(Valor)AS Valor, IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio 
	FROM vw_GerenteDeMercadeoMITyBYD_2
	GROUP BY CodigoEmpleado, Nombres, Ano_Periodo, Mes_Periodo, IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio 


)AS C
LEFT OUTER JOIN dbo.vw_RangosMaestrasFull ON c.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE (dbo.vw_RangosMaestrasFull.Desde <= c.Valor) AND (dbo.vw_RangosMaestrasFull.Hasta >= c.Valor)

```
