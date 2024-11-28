# View: vw_RepuestosVendedoresComisionesCT_Liquidacion

## Usa los objetos:
- [[vw_RangosMaestrasFull]]
- [[vw_RepuestosVendedoresComisionesCT_5]]

```sql
CREATE VIEW [dbo].[vw_RepuestosVendedoresComisionesCT_Liquidacion]
AS
SELECT        dbo.vw_RepuestosVendedoresComisionesCT_5.Ano_Periodo, dbo.vw_RepuestosVendedoresComisionesCT_5.Mes_Periodo, dbo.vw_RepuestosVendedoresComisionesCT_5.CodigoEmpresa, 
                         dbo.vw_RepuestosVendedoresComisionesCT_5.CedulaVendedorRepuestos, dbo.vw_RepuestosVendedoresComisionesCT_5.CodigoEmpleado, dbo.vw_RepuestosVendedoresComisionesCT_5.Empleado, 
                         dbo.vw_RepuestosVendedoresComisionesCT_5.FechaRetiro, dbo.vw_RepuestosVendedoresComisionesCT_5.ValorBaseMostrador, dbo.vw_RepuestosVendedoresComisionesCT_5.ValorBaseTaller, 
                         dbo.vw_RepuestosVendedoresComisionesCT_5.IdRangoMaestra, dbo.vw_RepuestosVendedoresComisionesCT_5.IdRangoVersionMax, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, 
                         dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, 
                         dbo.vw_RangosMaestrasFull.Valor, dbo.vw_RepuestosVendedoresComisionesCT_5.ValorBaseMostrador * dbo.vw_RangosMaestrasFull.Valor / 100 AS ComisionMostrador, 
                         dbo.vw_RepuestosVendedoresComisionesCT_5.ValorBaseTaller * dbo.vw_RangosMaestrasFull.Valor / 100 AS ComisionTaller, 
                         (dbo.vw_RepuestosVendedoresComisionesCT_5.ValorBaseMostrador * dbo.vw_RangosMaestrasFull.Valor + dbo.vw_RepuestosVendedoresComisionesCT_5.ValorBaseTaller * dbo.vw_RangosMaestrasFull.Valor) 
                         / 100 AS Comision, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_RepuestosVendedoresComisionesCT_5 LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_RepuestosVendedoresComisionesCT_5.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 11)


```
