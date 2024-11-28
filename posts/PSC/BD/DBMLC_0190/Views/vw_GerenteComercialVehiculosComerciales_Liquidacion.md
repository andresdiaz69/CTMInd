# View: vw_GerenteComercialVehiculosComerciales_Liquidacion

## Usa los objetos:
- [[vw_EmpleadosDetalle]]
- [[vw_GerenteComercialVehiculosComerciales_11]]
- [[vw_RangosMaestrasFull]]

```sql
CREATE VIEW [dbo].[vw_GerenteComercialVehiculosComerciales_Liquidacion] AS

SELECT t.*
, vw_EmpleadosDetalle.CodigoEmpresa, vw_EmpleadosDetalle.NombreEmpresa, vw_EmpleadosDetalle.FechaIngreso, vw_EmpleadosDetalle.FechaRetiro
, T.Comision_PesoComercial AS Comision_TOTAL
, 0 AS IdLiquidacion
, 0 AS IdHistorico
, GETDATE() AS FechaLiquidacion
FROM 
(
	SELECT        PESO_COMERCIAL.Ano_Periodo, PESO_COMERCIAL.Mes_Periodo, PESO_COMERCIAL.CodigoEmpleado, PESO_COMERCIAL.Nombres, PESO_COMERCIAL.IdRangoMaestra, PESO_COMERCIAL.IdRangoVersionMax, PESO_COMERCIAL.VehiculosRecaudados, PESO_COMERCIAL.VentasNacionales,PESO_COMERCIAL.PesoComercial, 
	dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_RangosMaestrasFull.IdComisionModeloSubCriterio, dbo.vw_RangosMaestrasFull.CodigoMarcaGrupo, dbo.vw_RangosMaestrasFull.MarcaGrupo, 
	dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, 
	dbo.vw_RangosMaestrasFull.Valor AS Comision_PesoComercial, dbo.vw_RangosMaestrasFull.CodigoConcepto
	FROM            
	(
		SELECT Ano_Periodo, Mes_Periodo, CodigoEmpleado, Nombres, VehiculosRecaudados, VentasNacionales, PesoComercial, IdRangoMaestra, IdRangoVersionMax, IdComisionModeloSub, IdComisionModeloSubCriterio
		FROM            dbo.vw_GerenteComercialVehiculosComerciales_11 

	) AS PESO_COMERCIAL 
	LEFT OUTER JOIN dbo.vw_RangosMaestrasFull ON PESO_COMERCIAL.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
	WHERE (vw_RangosMaestrasFull.IdComisionModeloSub = 79) AND (vw_RangosMaestrasFull.IdComisionModeloSubCriterio = 150) AND (dbo.vw_RangosMaestrasFull.Desde < PESO_COMERCIAL.PesoComercial) 
	AND (dbo.vw_RangosMaestrasFull.Hasta >= PESO_COMERCIAL.PesoComercial)
)AS T
LEFT JOIN dbo.vw_EmpleadosDetalle ON T.CodigoEmpleado = dbo.vw_EmpleadosDetalle.CodigoEmpleado


```
