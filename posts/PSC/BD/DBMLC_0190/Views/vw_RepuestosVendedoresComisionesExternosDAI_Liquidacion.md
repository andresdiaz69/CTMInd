# View: vw_RepuestosVendedoresComisionesExternosDAI_Liquidacion

## Usa los objetos:
- [[vw_RangosMaestrasFull]]
- [[vw_RepuestosVendedoresComisionesExternosDAI_5]]

```sql


CREATE VIEW [dbo].[vw_RepuestosVendedoresComisionesExternosDAI_Liquidacion]
AS
SELECT        dbo.vw_RepuestosVendedoresComisionesExternosDAI_5.Ano_Periodo, dbo.vw_RepuestosVendedoresComisionesExternosDAI_5.Mes_Periodo, dbo.vw_RepuestosVendedoresComisionesExternosDAI_5.CodigoEmpresa, 
                         dbo.vw_RepuestosVendedoresComisionesExternosDAI_5.CedulaVendedorRepuestos, dbo.vw_RepuestosVendedoresComisionesExternosDAI_5.CodigoEmpleado, 
                         dbo.vw_RepuestosVendedoresComisionesExternosDAI_5.Empleado, dbo.vw_RepuestosVendedoresComisionesExternosDAI_5.FechaRetiro, dbo.vw_RepuestosVendedoresComisionesExternosDAI_5.ValorBaseMostrador, 
                         dbo.vw_RepuestosVendedoresComisionesExternosDAI_5.ValorBaseTaller, dbo.vw_RepuestosVendedoresComisionesExternosDAI_5.ValorBaseTotal, dbo.vw_RepuestosVendedoresComisionesExternosDAI_5.IdRangoMaestra, 
                         dbo.vw_RepuestosVendedoresComisionesExternosDAI_5.IdRangoVersionMax, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_RangosMaestrasFull.IdRangoVersion, 
                         dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor, 
                         dbo.vw_RepuestosVendedoresComisionesExternosDAI_5.ValorBaseTotal * dbo.vw_RangosMaestrasFull.Valor / 100 AS Comision, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_RepuestosVendedoresComisionesExternosDAI_5 LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_RepuestosVendedoresComisionesExternosDAI_5.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 26) AND (dbo.vw_RangosMaestrasFull.Desde < (dbo.vw_RepuestosVendedoresComisionesExternosDAI_5.ValorBaseTotal / 1000000.00)) AND 
                         (dbo.vw_RangosMaestrasFull.Hasta >= (dbo.vw_RepuestosVendedoresComisionesExternosDAI_5.ValorBaseTotal / 1000000.00))




```
