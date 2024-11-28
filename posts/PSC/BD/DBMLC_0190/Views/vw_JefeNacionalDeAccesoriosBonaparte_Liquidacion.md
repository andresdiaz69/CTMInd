# View: vw_JefeNacionalDeAccesoriosBonaparte_Liquidacion

## Usa los objetos:
- [[vw_EmpleadosDetalle]]
- [[vw_JefeNacionalDeAccesoriosBonaparte_1]]
- [[vw_RangosMaestrasFull]]

```sql


CREATE VIEW [dbo].[vw_JefeNacionalDeAccesoriosBonaparte_Liquidacion] AS 

SELECT T.CodigoEmpleado, T.Nombres, T.Ano_Periodo, T.Mes_Periodo, T.Sede, T.Valor, T.IdRangoMaestra, T.IdRangoVersionMax, T.IdComisionModeloSub, T.IdComisionModeloSubCriterio, T.IdRangoVersion, T.Desde, T.Hasta, T.Comision_Utilidad, T.CodigoConcepto
, vw_EmpleadosDetalle.CodigoEmpresa, vw_EmpleadosDetalle.NombreEmpresa, vw_EmpleadosDetalle.FechaIngreso, vw_EmpleadosDetalle.FechaRetiro
, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM 
(
	SELECT A.CodigoEmpleado, A.Nombres, A.Ano_Periodo, A.Mes_Periodo, A.Sede, A.Valor, A.IdRangoMaestra, A.IdRangoVersionMax, A.IdComisionModeloSub, A.IdComisionModeloSubCriterio,
	vw_RangosMaestrasFull.IdRangoVersion, vw_RangosMaestrasFull.ConsecutivoVersion, vw_RangosMaestrasFull.IdRangoDetalle, vw_RangosMaestrasFull.Desde, vw_RangosMaestrasFull.Hasta, 
	vw_RangosMaestrasFull.Valor AS Comision_Utilidad, vw_RangosMaestrasFull.CodigoConcepto
	FROM vw_JefeNacionalDeAccesoriosBonaparte_1 AS A
	LEFT OUTER JOIN dbo.vw_RangosMaestrasFull ON A.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
	WHERE (dbo.vw_RangosMaestrasFull.Desde <= A.Valor) AND (dbo.vw_RangosMaestrasFull.Hasta >= A.Valor)
)AS T
LEFT OUTER JOIN vw_EmpleadosDetalle ON T.CodigoEmpleado = dbo.vw_EmpleadosDetalle.CodigoEmpleado

```
