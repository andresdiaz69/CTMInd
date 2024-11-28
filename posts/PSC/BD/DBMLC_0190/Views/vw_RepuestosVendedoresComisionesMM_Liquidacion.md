# View: vw_RepuestosVendedoresComisionesMM_Liquidacion

## Usa los objetos:
- [[vw_RangosMaestrasFull]]
- [[vw_RepuestosVendedoresComisionesMM_5]]

```sql
CREATE VIEW [dbo].[vw_RepuestosVendedoresComisionesMM_Liquidacion]
AS
SELECT        dbo.vw_RepuestosVendedoresComisionesMM_5.Ano_Periodo, dbo.vw_RepuestosVendedoresComisionesMM_5.Mes_Periodo, dbo.vw_RepuestosVendedoresComisionesMM_5.CodigoEmpresa, 
                         dbo.vw_RepuestosVendedoresComisionesMM_5.CedulaVendedorRepuestos, dbo.vw_RepuestosVendedoresComisionesMM_5.CodigoEmpleado, dbo.vw_RepuestosVendedoresComisionesMM_5.Empleado, 
                         dbo.vw_RepuestosVendedoresComisionesMM_5.FechaRetiro, dbo.vw_RepuestosVendedoresComisionesMM_5.ValorVariable, dbo.vw_RepuestosVendedoresComisionesMM_5.ValorBaseMostrador, 
                         dbo.vw_RepuestosVendedoresComisionesMM_5.ValorBaseTaller, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_RepuestosVendedoresComisionesMM_5.IdRangoMaestra, 
                         dbo.vw_RepuestosVendedoresComisionesMM_5.IdRangoVersionMax, dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, 
                         dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor, dbo.vw_RepuestosVendedoresComisionesMM_5.ComisionMostrador, 
                         dbo.vw_RepuestosVendedoresComisionesMM_5.ComisionTaller, dbo.vw_RepuestosVendedoresComisionesMM_5.Comision, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_RepuestosVendedoresComisionesMM_5 LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_RepuestosVendedoresComisionesMM_5.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 5) AND (dbo.vw_RangosMaestrasFull.Desde < dbo.vw_RepuestosVendedoresComisionesMM_5.Comision) AND 
                         (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_RepuestosVendedoresComisionesMM_5.Comision)


```
