# View: vw_RepuestosVendedoresComisionesDAI_Liquidacion

## Usa los objetos:
- [[vw_RangosMaestrasFull]]
- [[vw_RepuestosVendedoresComisionesDAI_5]]

```sql
CREATE VIEW [dbo].[vw_RepuestosVendedoresComisionesDAI_Liquidacion]
AS
SELECT        dbo.vw_RepuestosVendedoresComisionesDAI_5.Ano_Periodo, dbo.vw_RepuestosVendedoresComisionesDAI_5.Mes_Periodo, dbo.vw_RepuestosVendedoresComisionesDAI_5.CodigoEmpresa, 
                         dbo.vw_RepuestosVendedoresComisionesDAI_5.CedulaVendedorRepuestos, dbo.vw_RepuestosVendedoresComisionesDAI_5.CodigoEmpleado, dbo.vw_RepuestosVendedoresComisionesDAI_5.Empleado, 
                         dbo.vw_RepuestosVendedoresComisionesDAI_5.FechaRetiro, dbo.vw_RepuestosVendedoresComisionesDAI_5.ValorVariable, dbo.vw_RepuestosVendedoresComisionesDAI_5.ValorBaseMostrador, 
                         dbo.vw_RepuestosVendedoresComisionesDAI_5.ValorBaseTaller, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_RepuestosVendedoresComisionesDAI_5.IdRangoMaestra, 
                         dbo.vw_RepuestosVendedoresComisionesDAI_5.IdRangoVersionMax, dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, 
                         dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor, dbo.vw_RepuestosVendedoresComisionesDAI_5.ComisionMostrador, 
                         dbo.vw_RepuestosVendedoresComisionesDAI_5.ComisionTaller, dbo.vw_RepuestosVendedoresComisionesDAI_5.Comision, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_RepuestosVendedoresComisionesDAI_5 LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_RepuestosVendedoresComisionesDAI_5.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 14) AND (dbo.vw_RangosMaestrasFull.Desde < dbo.vw_RepuestosVendedoresComisionesDAI_5.Comision) AND 
                         (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_RepuestosVendedoresComisionesDAI_5.Comision)


```
