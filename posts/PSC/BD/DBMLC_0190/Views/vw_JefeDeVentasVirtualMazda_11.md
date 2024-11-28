# View: vw_JefeDeVentasVirtualMazda_11

## Usa los objetos:
- [[vw_JefeDeVentasVirtualMazda_1]]
- [[vw_RangosMaestrasFull]]

```sql

CREATE VIEW [dbo].[vw_JefeDeVentasVirtualMazda_11] AS 

SELECT PESOCOMERCIAL.IdRangoMaestra, PESOCOMERCIAL.IdRangoVersionMax, PESOCOMERCIAL.IdComisionModeloSub, PESOCOMERCIAL.IdComisionModeloSubCriterio, PESOCOMERCIAL.CodigoEmpleado, PESOCOMERCIAL.Nombres, PESOCOMERCIAL.CodigoCentro
, PESOCOMERCIAL.Ano_Recaudo, PESOCOMERCIAL.Mes_Recaudo, PESOCOMERCIAL.CodigoMarca, PESOCOMERCIAL.VehiculosRecaudados, PESOCOMERCIAL.VentasNacionales, PESOCOMERCIAL.PesoComercial,
vw_RangosMaestrasFull.IdRangoVersion, vw_RangosMaestrasFull.ConsecutivoVersion, vw_RangosMaestrasFull.IdRangoDetalle, vw_RangosMaestrasFull.Desde, vw_RangosMaestrasFull.Hasta, 
vw_RangosMaestrasFull.Valor AS Comision_PesoComercial
FROM
(

	SELECT IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio, Ano_Recaudo, Mes_Recaudo, CodigoEmpleado, Nombres, CodigoCentro, CodigoMArca, VehiculosRecaudados, ''VentasNacionales, PesoComercial FROM vw_JefeDeVentasVirtualMazda_1 
	UNION ALL
	SELECT IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio, Ano_Recaudo, Mes_Recaudo, CodigoEmpleado, Nombres, CodigoCentro, CodigoMArca, VehiculosRecaudados, VentasNacionales, Convert(decimal(18,2),VehiculosRecaudados) / convert(decimal(18,2),VentasNacionales) * 100 as PesoComercial
	FROM(
	SELECT IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio, Ano_Recaudo, Mes_Recaudo, CodigoEmpleado, Nombres, '9999'CodigoCentro, '9999'CodigoMArca, SUM(VehiculosRecaudados)AS VehiculosRecaudados, MAX(VentasNacionales)AS VentasNacionales FROM vw_JefeDeVentasVirtualMazda_1 
	GROUP BY Ano_Recaudo, Mes_Recaudo, CodigoEmpleado, Nombres,IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio)AS T

)AS PESOCOMERCIAL

LEFT OUTER JOIN dbo.vw_RangosMaestrasFull ON PESOCOMERCIAL.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE PESOCOMERCIAL.Ano_Recaudo IS NOT NULL 
AND (dbo.vw_RangosMaestrasFull.Desde < PESOCOMERCIAL.PesoComercial) AND (dbo.vw_RangosMaestrasFull.Hasta >= PESOCOMERCIAL.PesoComercial)

```
