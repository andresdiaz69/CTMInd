# View: vw_JefeDeVentasDaimlerVCCalle80_1

## Usa los objetos:
- [[vw_JefeDeVentasDaimlerVCCalle80_1_1]]
- [[vw_RangosMaestrasFull]]

```sql




CREATE VIEW [dbo].[vw_JefeDeVentasDaimlerVCCalle80_1] AS
SELECT 
*
FROM
(
	SELECT PESOCOMERCIAL.IdRangoMaestra, PESOCOMERCIAL.IdRangoVersionMax, PESOCOMERCIAL.IdComisionModeloSub, PESOCOMERCIAL.IdComisionModeloSubCriterio, PESOCOMERCIAL.CodigoEmpleado, PESOCOMERCIAL.Nombres, PESOCOMERCIAL.CodigoCentro
	, PESOCOMERCIAL.Ano_Recaudo, PESOCOMERCIAL.Mes_Recaudo
	, PESOCOMERCIAL.VehiculosRecaudados
	, CASE WHEN PESOCOMERCIAL.CodigoCentro = 9999 THEN PESOCOMERCIAL.VentasNacionales else 0 end as VentasNacionales
	, CASE WHEN ISNULL(convert(decimal(18,2),VentasNacionales),0) > 0 THEN  ISNULL(Convert(decimal(18,2),VehiculosRecaudados),0) / ISNULL(convert(decimal(18,2),VentasNacionales),0) * 100 ELSE 0 END AS PesoComercial,
	--, PESOCOMERCIAL.PesoComercial,
	vw_RangosMaestrasFull.IdRangoVersion, vw_RangosMaestrasFull.ConsecutivoVersion, vw_RangosMaestrasFull.IdRangoDetalle, vw_RangosMaestrasFull.Desde, vw_RangosMaestrasFull.Hasta, 
	vw_RangosMaestrasFull.Valor AS Comision_PesoComercial, vw_RangosMaestrasFull.CodigoConcepto
	FROM
	(


		SELECT IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio, Ano_Recaudo, Mes_Recaudo, CodigoEmpleado, Nombres, CodigoCentro, VehiculosRecaudados, VentasNacionales
		FROM 
		(
			SELECT IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio, Ano_Recaudo, Mes_Recaudo, CodigoEmpleado, Nombres, CodigoCentro, SUM(VehiculosRecaudados)AS VehiculosRecaudados, MAX(VentasNacionales)AS VentasNacionales
			FROM vw_JefeDeVentasDaimlerVCCalle80_1_1 
			GROUP BY IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio, Ano_Recaudo, Mes_Recaudo, CodigoEmpleado, Nombres, CodigoCentro
		)AS A
	
		UNION ALL

		
		select vehiculosrecaudos.IdRangoMaestra, vehiculosrecaudos.IdRangoVersionMax, vehiculosrecaudos.IdComisionModeloSub, vehiculosrecaudos.IdComisionModeloSubCriterio, vehiculosrecaudos.Ano_Recaudo, vehiculosrecaudos.Mes_Recaudo, vehiculosrecaudos.CodigoEmpleado, vehiculosrecaudos.Nombres, vehiculosrecaudos.CodigoCentro, vehiculosrecaudos.VehiculosRecaudados  
		, ventasnacionales.VentasNacionales
		from
		(
			select IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio, Ano_Recaudo, Mes_Recaudo, CodigoEmpleado, Nombres, '9999'CodigoCentro, sum(VehiculosRecaudados) as VehiculosRecaudados  
			from vw_JefeDeVentasDaimlerVCCalle80_1_1
			group by IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio, Ano_Recaudo, Mes_Recaudo, CodigoEmpleado, Nombres
		)as vehiculosrecaudos
		left join 
		(
			select Ano_Recaudo, Mes_Recaudo, CodigoEmpleado, SUM(VentasNacionales) AS VentasNacionales
			from 
			(
				select Ano_Recaudo, Mes_Recaudo, CodigoEmpleado, CodigoMArca, max(VentasNacionales) as VentasNacionales from vw_JefeDeVentasDaimlerVCCalle80_1_1
				group by Ano_Recaudo, Mes_Recaudo, CodigoEmpleado, CodigoMArca
			)as ventasnacionales
			group by Ano_Recaudo, Mes_Recaudo, CodigoEmpleado
		)as ventasnacionales on vehiculosrecaudos.Ano_Recaudo = ventasnacionales.Ano_Recaudo and vehiculosrecaudos.Mes_Recaudo = ventasnacionales.Mes_Recaudo and vehiculosrecaudos.CodigoEmpleado = ventasnacionales.CodigoEmpleado


	)AS PESOCOMERCIAL

	LEFT OUTER JOIN dbo.vw_RangosMaestrasFull ON PESOCOMERCIAL.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
	)AS P
WHERE P.Ano_Recaudo IS NOT NULL 
AND (P.Desde < P.PesoComercial) AND (P.Hasta >= P.PesoComercial)

```
