# View: vw_RepuestosVendedoresBonPorAccMM_Liquidacion

## Usa los objetos:
- [[vw_RangosMaestrasFull]]
- [[vw_RepuestosVendedoresBonPorAccMM_4]]

```sql
CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorAccMM_Liquidacion]
AS
SELECT        dbo.vw_RepuestosVendedoresBonPorAccMM_4.Ano_Periodo, dbo.vw_RepuestosVendedoresBonPorAccMM_4.Mes_Periodo, dbo.vw_RepuestosVendedoresBonPorAccMM_4.CodigoEmpresa, 
                         dbo.vw_RepuestosVendedoresBonPorAccMM_4.CedulaVendedorRepuestos, dbo.vw_RepuestosVendedoresBonPorAccMM_4.CodigoEmpleado, dbo.vw_RepuestosVendedoresBonPorAccMM_4.Empleado, 
                         dbo.vw_RepuestosVendedoresBonPorAccMM_4.FechaRetiro, dbo.vw_RepuestosVendedoresBonPorAccMM_4.ValorVariable1, dbo.vw_RepuestosVendedoresBonPorAccMM_4.ValorVariable2, 
                         dbo.vw_RepuestosVendedoresBonPorAccMM_4.ValorNetoMostrador, dbo.vw_RepuestosVendedoresBonPorAccMM_4.ValorNetoTaller, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, 
                         dbo.vw_RepuestosVendedoresBonPorAccMM_4.IdRangoMaestra, dbo.vw_RepuestosVendedoresBonPorAccMM_4.IdRangoVersionMax, dbo.vw_RangosMaestrasFull.IdRangoVersion, 
                         dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor, 
                         dbo.vw_RepuestosVendedoresBonPorAccMM_4.BonificacionMostrador, dbo.vw_RepuestosVendedoresBonPorAccMM_4.BonificacionTaller, dbo.vw_RepuestosVendedoresBonPorAccMM_4.BonificacionTotal AS Comision, 
                         0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_RepuestosVendedoresBonPorAccMM_4 LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_RepuestosVendedoresBonPorAccMM_4.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 6) AND (dbo.vw_RangosMaestrasFull.Desde < dbo.vw_RepuestosVendedoresBonPorAccMM_4.BonificacionTotal) AND 
                         (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_RepuestosVendedoresBonPorAccMM_4.BonificacionTotal)


```
