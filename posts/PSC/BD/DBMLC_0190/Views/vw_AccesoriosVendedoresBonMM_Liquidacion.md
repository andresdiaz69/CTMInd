# View: vw_AccesoriosVendedoresBonMM_Liquidacion

## Usa los objetos:
- [[vw_AccesoriosVendedoresBonMM_4]]
- [[vw_RangosMaestrasFull]]

```sql
CREATE VIEW [dbo].[vw_AccesoriosVendedoresBonMM_Liquidacion]
AS
SELECT        dbo.vw_AccesoriosVendedoresBonMM_4.Ano_Periodo, dbo.vw_AccesoriosVendedoresBonMM_4.Mes_Periodo, dbo.vw_AccesoriosVendedoresBonMM_4.CodigoEmpresa, dbo.vw_AccesoriosVendedoresBonMM_4.Empresa, 
                         dbo.vw_AccesoriosVendedoresBonMM_4.CedulaVendedorRepuestos, dbo.vw_AccesoriosVendedoresBonMM_4.CodigoEmpleado, dbo.vw_AccesoriosVendedoresBonMM_4.Empleado, 
                         dbo.vw_AccesoriosVendedoresBonMM_4.FechaRetiro, dbo.vw_AccesoriosVendedoresBonMM_4.TotalAlmacenAlbaran, dbo.vw_AccesoriosVendedoresBonMM_4.TotalTallerPorOT, dbo.vw_AccesoriosVendedoresBonMM_4.Total, 
                         dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_AccesoriosVendedoresBonMM_4.IdRangoMaestra, dbo.vw_AccesoriosVendedoresBonMM_4.IdRangoVersionMax, dbo.vw_RangosMaestrasFull.IdRangoVersion, 
                         dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor, 
                         dbo.vw_RangosMaestrasFull.Valor AS Comision, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_AccesoriosVendedoresBonMM_4 LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_AccesoriosVendedoresBonMM_4.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.Desde < dbo.vw_AccesoriosVendedoresBonMM_4.Total) AND (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_AccesoriosVendedoresBonMM_4.Total) AND 
                         (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 9)


```
