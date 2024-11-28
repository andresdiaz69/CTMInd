# View: vw_AccesoriosVendedoresBonDAI_Liquidacion

## Usa los objetos:
- [[vw_AccesoriosVendedoresBonDAI_4]]
- [[vw_RangosMaestrasFull]]
- [[vw_VariablesVersiones]]

```sql
CREATE VIEW [dbo].[vw_AccesoriosVendedoresBonDAI_Liquidacion]
AS
SELECT        dbo.vw_AccesoriosVendedoresBonDAI_4.Ano_Periodo, dbo.vw_AccesoriosVendedoresBonDAI_4.Mes_Periodo, dbo.vw_AccesoriosVendedoresBonDAI_4.CodigoEmpresa, dbo.vw_AccesoriosVendedoresBonDAI_4.Empresa, 
                         dbo.vw_AccesoriosVendedoresBonDAI_4.CedulaVendedorRepuestos, dbo.vw_AccesoriosVendedoresBonDAI_4.CodigoEmpleado, dbo.vw_AccesoriosVendedoresBonDAI_4.Empleado, 
                         dbo.vw_AccesoriosVendedoresBonDAI_4.FechaRetiro, [VAR].ValorVariable, dbo.vw_AccesoriosVendedoresBonDAI_4.TotalAlmacenAlbaran, dbo.vw_AccesoriosVendedoresBonDAI_4.TotalTallerPorOT, 
                         dbo.vw_AccesoriosVendedoresBonDAI_4.Total, dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_AccesoriosVendedoresBonDAI_4.IdRangoMaestra, dbo.vw_AccesoriosVendedoresBonDAI_4.IdRangoVersionMax, 
                         dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, 
                         dbo.vw_RangosMaestrasFull.Valor, dbo.vw_AccesoriosVendedoresBonDAI_4.Total * [VAR].ValorVariable AS Comision, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_AccesoriosVendedoresBonDAI_4 LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_AccesoriosVendedoresBonDAI_4.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion CROSS JOIN
                             (SELECT        ValorVariable
                               FROM            dbo.vw_VariablesVersiones
                               WHERE        (IdVariable = 15)) AS [VAR]
WHERE        (dbo.vw_RangosMaestrasFull.Desde < dbo.vw_AccesoriosVendedoresBonDAI_4.Total) AND (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_AccesoriosVendedoresBonDAI_4.Total) AND 
                         (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 15)


```
