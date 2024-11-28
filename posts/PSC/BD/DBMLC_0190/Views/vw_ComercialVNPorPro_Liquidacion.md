# View: vw_ComercialVNPorPro_Liquidacion

## Usa los objetos:
- [[vw_ComercialVNPorPro_2]]
- [[vw_RangosMaestrasFull]]

```sql
CREATE VIEW [dbo].[vw_ComercialVNPorPro_Liquidacion]
AS
SELECT        dbo.vw_ComercialVNPorPro_2.Ano_Periodo, dbo.vw_ComercialVNPorPro_2.Mes_Periodo, dbo.vw_ComercialVNPorPro_2.Codigoempresa, dbo.vw_ComercialVNPorPro_2.Empresa, 
                         dbo.vw_ComercialVNPorPro_2.CedulaVendedor, dbo.vw_ComercialVNPorPro_2.CodigoEmpleado, dbo.vw_ComercialVNPorPro_2.NombreVendedor, dbo.vw_ComercialVNPorPro_2.NombreVendedor AS Empleado, 
                         dbo.vw_ComercialVNPorPro_2.FechaRetiro, dbo.vw_ComercialVNPorPro_2.IdRangoMaestra, dbo.vw_ComercialVNPorPro_2.IdRangoVersionMax, dbo.vw_ComercialVNPorPro_2.NumerEntregas, 
                         dbo.vw_RangosMaestrasFull.IdComisionModeloSub, dbo.vw_RangosMaestrasFull.IdRangoVersion, dbo.vw_RangosMaestrasFull.ConsecutivoVersion, dbo.vw_RangosMaestrasFull.IdRangoDetalle, 
                         dbo.vw_RangosMaestrasFull.Desde, dbo.vw_RangosMaestrasFull.Hasta, dbo.vw_RangosMaestrasFull.Valor, dbo.vw_RangosMaestrasFull.Valor AS ComisionProductividad, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() 
                         AS FechaLiquidacion
FROM            dbo.vw_ComercialVNPorPro_2 LEFT OUTER JOIN
                         dbo.vw_RangosMaestrasFull ON dbo.vw_ComercialVNPorPro_2.IdRangoVersionMax = dbo.vw_RangosMaestrasFull.IdRangoVersion
WHERE        (dbo.vw_RangosMaestrasFull.Desde < dbo.vw_ComercialVNPorPro_2.NumerEntregas) AND (dbo.vw_RangosMaestrasFull.Hasta >= dbo.vw_ComercialVNPorPro_2.NumerEntregas) AND 
                         (dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 12 OR
                         dbo.vw_RangosMaestrasFull.IdComisionModeloSub = 13)


```
