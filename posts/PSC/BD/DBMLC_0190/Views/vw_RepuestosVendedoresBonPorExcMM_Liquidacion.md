# View: vw_RepuestosVendedoresBonPorExcMM_Liquidacion

## Usa los objetos:
- [[vw_RangosMaestrasFull]]
- [[vw_RepuestosVendedoresBonPorExcMM_4]]

```sql
CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorExcMM_Liquidacion]
AS
SELECT        dbo.vw_RepuestosVendedoresBonPorExcMM_4.Ano_Periodo, dbo.vw_RepuestosVendedoresBonPorExcMM_4.Mes_Periodo, dbo.vw_RepuestosVendedoresBonPorExcMM_4.CodigoEmpresa, 
                         dbo.vw_RepuestosVendedoresBonPorExcMM_4.CedulaVendedorRepuestos, dbo.vw_RepuestosVendedoresBonPorExcMM_4.CodigoEmpleado, dbo.vw_RepuestosVendedoresBonPorExcMM_4.Empleado, 
                         dbo.vw_RepuestosVendedoresBonPorExcMM_4.FechaRetiro, dbo.vw_RepuestosVendedoresBonPorExcMM_4.ValorVariable, dbo.vw_RepuestosVendedoresBonPorExcMM_4.ValorBaseTotal, 
                         dbo.vw_RepuestosVendedoresBonPorExcMM_4.ValorNetoTotal, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_RepuestosVendedoresBonPorExcMM_4.IdRangoMaestra, 
                         dbo.vw_RepuestosVendedoresBonPorExcMM_4.IdRangoVersionMax, dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, 
                         dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor, dbo.vw_RangosMaestrasFull.Valor AS Comision, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() 
                         AS FechaLiquidacion
FROM            dbo.vw_RepuestosVendedoresBonPorExcMM_4 LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_RepuestosVendedoresBonPorExcMM_4.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 7) AND (dbo.vw_RangosMaestrasFull.Desde < dbo.vw_RepuestosVendedoresBonPorExcMM_4.ValorNetoTotal) AND 
                         (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_RepuestosVendedoresBonPorExcMM_4.ValorNetoTotal)


```
