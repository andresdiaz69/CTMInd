# View: vw_Alerta_Liquidaciones

## Usa los objetos:
- [[ComisionesModelosSub]]
- [[Empresas]]
- [[Liquidaciones]]
- [[LiquidacionesProcesos]]
- [[LiquidacionesTipos]]

```sql

CREATE VIEW [dbo].[vw_Alerta_Liquidaciones]
AS
SELECT        dbo.Liquidaciones.IdLiquidacionProceso, dbo.LiquidacionesProcesos.LiquidacionProceso, dbo.Liquidaciones.CodigoEmpresa, dbo.Empresas.NombreEmpresa, dbo.Liquidaciones.IdLiquidacionTipo, 
                         dbo.LiquidacionesTipos.LiquidacionTipo, dbo.Liquidaciones.IdComisionModeloSub, dbo.ComisionesModelosSub.NombreModeloSub, MAX(dbo.Liquidaciones.FechaLiquidacion) AS FechaLiquidacion, 
                         dbo.ComisionesModelosSub.Activar
FROM            dbo.Liquidaciones LEFT OUTER JOIN
                         dbo.LiquidacionesProcesos ON dbo.Liquidaciones.IdLiquidacionProceso = dbo.LiquidacionesProcesos.IdLiquidacionProceso LEFT OUTER JOIN
                         dbo.LiquidacionesTipos ON dbo.Liquidaciones.IdLiquidacionTipo = dbo.LiquidacionesTipos.IdLiquidacionTipo LEFT OUTER JOIN
                         dbo.ComisionesModelosSub ON dbo.Liquidaciones.IdComisionModeloSub = dbo.ComisionesModelosSub.IdComisionModeloSub LEFT OUTER JOIN
                         dbo.Empresas ON dbo.Liquidaciones.CodigoEmpresa = dbo.Empresas.CodigoEmpresa
GROUP BY dbo.Liquidaciones.IdLiquidacionProceso, dbo.LiquidacionesProcesos.LiquidacionProceso, dbo.Liquidaciones.CodigoEmpresa, dbo.Empresas.NombreEmpresa, dbo.Liquidaciones.IdLiquidacionTipo, 
                         dbo.LiquidacionesTipos.LiquidacionTipo, dbo.Liquidaciones.IdComisionModeloSub, dbo.ComisionesModelosSub.NombreModeloSub, dbo.ComisionesModelosSub.Activar

```
