# View: vw_PorcentajeRecaudoVNFacturaFullLiquidaciones

## Usa los objetos:
- [[Liquidaciones]]
- [[Liquidaciones_ComercialVNPorCom_Detalle]]
- [[vw_PorcentajeRecaudoVNFacturaFull]]

```sql

CREATE VIEW [dbo].[vw_PorcentajeRecaudoVNFacturaFullLiquidaciones]
AS
SELECT        dbo.vw_PorcentajeRecaudoVNFacturaFull.Ano_Recaudo, dbo.vw_PorcentajeRecaudoVNFacturaFull.Mes_Recaudo, dbo.vw_PorcentajeRecaudoVNFacturaFull.Dia_Recaudo, 
                         dbo.vw_PorcentajeRecaudoVNFacturaFull.FechaRecaudo, dbo.vw_PorcentajeRecaudoVNFacturaFull.CodigoEmpresa, dbo.vw_PorcentajeRecaudoVNFacturaFull.Empresa, dbo.vw_PorcentajeRecaudoVNFacturaFull.CodigoCentro, 
                         dbo.vw_PorcentajeRecaudoVNFacturaFull.Centro, dbo.vw_PorcentajeRecaudoVNFacturaFull.FechaFactura, dbo.vw_PorcentajeRecaudoVNFacturaFull.NumeroFactura, dbo.vw_PorcentajeRecaudoVNFacturaFull.TotalFactura, 
                         dbo.vw_PorcentajeRecaudoVNFacturaFull.ImporteEfecto, dbo.vw_PorcentajeRecaudoVNFacturaFull.PorcentajeRecaudo, dbo.vw_PorcentajeRecaudoVNFacturaFull.VIN, 
                         dbo.vw_PorcentajeRecaudoVNFacturaFull.FechaEntregaCliente, dbo.Liquidaciones_ComercialVNPorCom_Detalle.IdDetalle, dbo.Liquidaciones_ComercialVNPorCom_Detalle.IdHistorico, 
                         dbo.Liquidaciones_ComercialVNPorCom_Detalle.IdLiquidacion, dbo.Liquidaciones_ComercialVNPorCom_Detalle.Ano_Periodo, dbo.Liquidaciones_ComercialVNPorCom_Detalle.Mes_Periodo, 
                         dbo.Liquidaciones_ComercialVNPorCom_Detalle.CodigoMArca, dbo.Liquidaciones_ComercialVNPorCom_Detalle.Marca, dbo.Liquidaciones_ComercialVNPorCom_Detalle.CodigoGama, 
                         dbo.Liquidaciones_ComercialVNPorCom_Detalle.Gama, dbo.Liquidaciones_ComercialVNPorCom_Detalle.CodigoModelo, dbo.Liquidaciones_ComercialVNPorCom_Detalle.AñoModelo, 
                         dbo.Liquidaciones_ComercialVNPorCom_Detalle.Modelo, dbo.Liquidaciones_ComercialVNPorCom_Detalle.CedulaVendedor, dbo.Liquidaciones_ComercialVNPorCom_Detalle.NombreVendedor, 
                         dbo.Liquidaciones_ComercialVNPorCom_Detalle.ValorComision, dbo.Liquidaciones_ComercialVNPorCom_Detalle.ModeloVehSinComision, dbo.Liquidaciones.FechaLiquidacion
FROM            dbo.Liquidaciones INNER JOIN
                         dbo.Liquidaciones_ComercialVNPorCom_Detalle ON dbo.Liquidaciones.IdLiquidacion = dbo.Liquidaciones_ComercialVNPorCom_Detalle.IdLiquidacion RIGHT OUTER JOIN
                         dbo.vw_PorcentajeRecaudoVNFacturaFull ON dbo.Liquidaciones_ComercialVNPorCom_Detalle.NumeroFactura = dbo.vw_PorcentajeRecaudoVNFacturaFull.NumeroFactura


```
