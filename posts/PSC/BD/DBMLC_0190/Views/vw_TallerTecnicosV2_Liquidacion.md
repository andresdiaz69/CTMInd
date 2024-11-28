# View: vw_TallerTecnicosV2_Liquidacion

## Usa los objetos:
- [[vw_RangosMaestrasFull]]
- [[vw_TallerTecnicosV2_1]]

```sql



CREATE VIEW [dbo].[vw_TallerTecnicosV2_Liquidacion] AS
SELECT         dbo.vw_TallerTecnicosV2_1.Ano_Periodo, dbo.vw_TallerTecnicosV2_1.Mes_Periodo, dbo.vw_TallerTecnicosV2_1.CodigoEmpresa, dbo.vw_TallerTecnicosV2_1.CedulaOperario, dbo.vw_TallerTecnicosV2_1.CodigoEmpleado, 
                         dbo.vw_TallerTecnicosV2_1.Empleado, dbo.vw_TallerTecnicosV2_1.FechaRetiro, dbo.vw_TallerTecnicosV2_1.UnidadesVendidas as UnidadesTotales, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, 
                         dbo.vw_TallerTecnicosV2_1.IdRangoMaestra, dbo.vw_TallerTecnicosV2_1.IdRangoVersionMax, dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, 
                         dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor, 
                         dbo.vw_TallerTecnicosV2_1.UnidadesVendidas * dbo.vw_RangosMaestrasFull.Valor AS Comision, dbo.vw_RangosMaestrasFull.CodigoMarcaGrupo, dbo.vw_RangosMaestrasFull.MarcaGrupo, 0 AS IdLiquidacion, 
                         0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_TallerTecnicosV2_1 LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_TallerTecnicosV2_1.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.Desde < dbo.vw_TallerTecnicosV2_1.UnidadesVendidas) AND (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_TallerTecnicosV2_1.UnidadesVendidas) AND 
                         (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 53 OR
                         dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 54 OR
						 dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 90)



```
