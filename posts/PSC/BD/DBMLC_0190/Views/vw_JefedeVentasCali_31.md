# View: vw_JefedeVentasCali_31

## Usa los objetos:
- [[vw_JefedeVentasCali_3]]
- [[vw_RangosMaestrasFull]]

```sql



CREATE VIEW [dbo].[vw_JefedeVentasCali_31] AS 

SELECT EFICIENCIA_ADMINISTRATIVA.CodigoEmpleado, EFICIENCIA_ADMINISTRATIVA.Ano_Periodo, EFICIENCIA_ADMINISTRATIVA.Mes_Periodo, EFICIENCIA_ADMINISTRATIVA.CodigoCentro, EFICIENCIA_ADMINISTRATIVA.IdRangoMaestra, EFICIENCIA_ADMINISTRATIVA.IdRangoVersionMax, EFICIENCIA_ADMINISTRATIVA.EficienciaAdministrativa
, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio, dbo.vw_RangosMaestrasFull.CodigoMarcaGrupo, 
dbo.vw_RangosMaestrasFull.MarcaGrupo, dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, 
dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor AS Comision_EficienciaAdministrativa, dbo.vw_RangosMaestrasFull.CodigoConcepto
FROM
(
	SELECT CodigoEmpleado, Ano_Periodo, Mes_Periodo, CodigoCentro, IdRangoMaestra, IdRangoVersionMax, EficienciaAdministrativa, 0 as centros
	FROM vw_JefedeVentasCali_3

	UNION ALL

	
	SELECT CodigoEmpleado, Ano_Periodo, Mes_Periodo, '9999'CodigoCentro, IdRangoMaestra, IdRangoVersionMax
	, CASE WHEN COUNT(EficienciaAdministrativa) <> 0 THEN SUM(EficienciaAdministrativa) / COUNT(EficienciaAdministrativa) ELSE 0 END as EficienciaAdministrativa
	,COUNT(EficienciaAdministrativa) AS Centros
	FROM
	(
		SELECT Ano_Periodo, Mes_Periodo, CodigoEmpleado, IdRangoMaestra, IdRangoVersionMax, CodigoCentro, Centro
		, CASE  EficienciaAdministrativa WHEN 0 THEN NULL ELSE  EficienciaAdministrativa END AS EficienciaAdministrativa
		FROM vw_JefedeVentasCali_3
	)AS A
	GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpleado, IdRangoMaestra, IdRangoVersionMax



)AS EFICIENCIA_ADMINISTRATIVA
LEFT OUTER JOIN dbo.vw_RangosMaestrasFull ON EFICIENCIA_ADMINISTRATIVA.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion

WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 84) AND (dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio = 163) 
AND (dbo.vw_RangosMaestrasFull.Desde <= EFICIENCIA_ADMINISTRATIVA.EficienciaAdministrativa) AND (dbo.vw_RangosMaestrasFull.Hasta >= EFICIENCIA_ADMINISTRATIVA.EficienciaAdministrativa)




```
