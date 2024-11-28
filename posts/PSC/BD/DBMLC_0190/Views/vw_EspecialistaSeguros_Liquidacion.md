# View: vw_EspecialistaSeguros_Liquidacion

## Usa los objetos:
- [[Empresas]]
- [[vw_Centros_Marca]]
- [[vw_EmpleadosDetalle]]
- [[vw_EspecialistaSeguros_1]]
- [[vw_RangosMaestrasFull]]

```sql


CREATE VIEW [dbo].[vw_EspecialistaSeguros_Liquidacion] AS

SELECT TOTAL.IdRangoMaestra, TOTAL.IdRangoVersionMax, TOTAL.IdComisionModeloSub, TOTAL.IdComisionModeloSubCriterio, TOTAL.CodigoEmpresa, Empresas.NombreEmpresa, TOTAL.CodigoEmpleado, vw_EmpleadosDetalle.FechaRetiro, TOTAL.Nombres, TOTAL.Año, TOTAL.MesInicial, TOTAL.MesFinal, TOTAL.CodigoMarca, TOTAL.Marca , TOTAL.ValorSeguros
,vw_RangosMaestrasFull.IdRangoVersion,vw_RangosMaestrasFull.ConsecutivoVersion,vw_RangosMaestrasFull.IdRangoDetalle,vw_RangosMaestrasFull.Desde,vw_RangosMaestrasFull.Hasta, vw_RangosMaestrasFull.Valor as ValorComision, vw_RangosMaestrasFull.CodigoConcepto
, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM 
(
SELECT IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio, CodigoEmpresa, CodigoEmpleado, Nombres, Año, MesInicial, MesFinal, CodigoMarca, Marca , SUM(ValorSeguros)AS ValorSeguros
FROM
	(SELECT SG.IdRangoMaestra, SG.IdRangoVersionMax, SG.IdComisionModeloSub, SG.IdComisionModeloSubCriterio, SG.CodigoEmpleado, SG.Nombres, SG.Año, SG.MesInicial, SG.MesFinal, SG.CodigoEmpresa,CM.CodigoMarca, CM.Marca ,SG.CodigoCentro, SG.NombreCentro, SG.ValorSeguros 
	FROM vw_EspecialistaSeguros_1 AS SG
	LEFT JOIN vw_Centros_Marca AS CM ON SG.CodigoCentro = CM.CodigoCentro)AS SM
GROUP BY  IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio, CodigoEmpleado, Nombres, Año, MesInicial, MesFinal, CodigoEmpresa, CodigoMarca, Marca

UNION ALL

SELECT IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio, CodigoEmpresa, CodigoEmpleado, Nombres, Año, MesInicial, MesFinal, '9999'CodigoMarca, 'TOTAL'Marca , SUM(ValorSeguros)AS ValorSeguros
FROM
	(SELECT SG.IdRangoMaestra, SG.IdRangoVersionMax, SG.IdComisionModeloSub, SG.IdComisionModeloSubCriterio, SG.CodigoEmpleado, SG.Nombres, SG.Año, SG.MesInicial, SG.MesFinal, SG.CodigoEmpresa,CM.CodigoMarca, CM.Marca ,SG.CodigoCentro, SG.NombreCentro, SG.ValorSeguros 
	FROM vw_EspecialistaSeguros_1 AS SG
	LEFT JOIN vw_Centros_Marca AS CM ON SG.CodigoCentro = CM.CodigoCentro)AS SM
GROUP BY  IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio, CodigoEmpleado, Nombres, Año, MesInicial, MesFinal, CodigoEmpresa

)AS TOTAL
LEFT JOIN vw_RangosMaestrasFull ON TOTAL.IdRangoVersionMax = vw_RangosMaestrasFull.IdRangoVersion
INNER JOIN vw_EmpleadosDetalle ON TOTAL.CodigoEmpleado = vw_EmpleadosDetalle.CodigoEmpleado
LEFT JOIN Empresas ON TOTAL.CodigoEmpresa = Empresas.CodigoEmpresa
WHERE (vw_RangosMaestrasFull.Desde < TOTAL.ValorSeguros) AND (vw_RangosMaestrasFull.Hasta >= TOTAL.ValorSeguros)

```
