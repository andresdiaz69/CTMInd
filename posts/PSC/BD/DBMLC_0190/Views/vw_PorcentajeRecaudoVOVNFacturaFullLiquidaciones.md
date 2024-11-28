# View: vw_PorcentajeRecaudoVOVNFacturaFullLiquidaciones

## Usa los objetos:
- [[Liquidaciones]]
- [[Liquidaciones_ComercialVNPorCom_Detalle]]
- [[vw_PorcentajeRecaudoVOVNFacturaFull]]

```sql

CREATE VIEW [dbo].[vw_PorcentajeRecaudoVOVNFacturaFullLiquidaciones]
AS
SELECT        dbo.vw_PorcentajeRecaudoVOVNFacturaFull.Ano_Recaudo, dbo.vw_PorcentajeRecaudoVOVNFacturaFull.Mes_Recaudo, dbo.vw_PorcentajeRecaudoVOVNFacturaFull.Dia_Recaudo, 
                         dbo.vw_PorcentajeRecaudoVOVNFacturaFull.FechaRecaudo, dbo.vw_PorcentajeRecaudoVOVNFacturaFull.CodigoEmpresa, dbo.vw_PorcentajeRecaudoVOVNFacturaFull.Empresa, dbo.vw_PorcentajeRecaudoVOVNFacturaFull.CodigoCentro, 
                         dbo.vw_PorcentajeRecaudoVOVNFacturaFull.Centro, dbo.vw_PorcentajeRecaudoVOVNFacturaFull.FechaFactura, dbo.vw_PorcentajeRecaudoVOVNFacturaFull.NumeroFactura, dbo.vw_PorcentajeRecaudoVOVNFacturaFull.TotalFactura, 
                         dbo.vw_PorcentajeRecaudoVOVNFacturaFull.ImporteEfecto, dbo.vw_PorcentajeRecaudoVOVNFacturaFull.PorcentajeRecaudo, dbo.vw_PorcentajeRecaudoVOVNFacturaFull.VIN, 
                         dbo.vw_PorcentajeRecaudoVOVNFacturaFull.FechaEntregaCliente, dbo.Liquidaciones_ComercialVNPorCom_Detalle.IdDetalle, dbo.Liquidaciones_ComercialVNPorCom_Detalle.IdHistorico, 
                         dbo.Liquidaciones_ComercialVNPorCom_Detalle.IdLiquidacion, dbo.Liquidaciones_ComercialVNPorCom_Detalle.Ano_Periodo, dbo.Liquidaciones_ComercialVNPorCom_Detalle.Mes_Periodo, 
                         dbo.Liquidaciones_ComercialVNPorCom_Detalle.CodigoMArca, dbo.Liquidaciones_ComercialVNPorCom_Detalle.Marca, dbo.Liquidaciones_ComercialVNPorCom_Detalle.CodigoGama, 
                         dbo.Liquidaciones_ComercialVNPorCom_Detalle.Gama, dbo.Liquidaciones_ComercialVNPorCom_Detalle.CodigoModelo, dbo.Liquidaciones_ComercialVNPorCom_Detalle.AñoModelo, 
                         dbo.Liquidaciones_ComercialVNPorCom_Detalle.Modelo, dbo.Liquidaciones_ComercialVNPorCom_Detalle.CedulaVendedor, dbo.Liquidaciones_ComercialVNPorCom_Detalle.NombreVendedor, 
                         dbo.Liquidaciones_ComercialVNPorCom_Detalle.ValorComision, dbo.Liquidaciones_ComercialVNPorCom_Detalle.ModeloVehSinComision, dbo.Liquidaciones.FechaLiquidacion
FROM            dbo.Liquidaciones INNER JOIN
                         dbo.Liquidaciones_ComercialVNPorCom_Detalle ON dbo.Liquidaciones.IdLiquidacion = dbo.Liquidaciones_ComercialVNPorCom_Detalle.IdLiquidacion RIGHT OUTER JOIN
                         dbo.vw_PorcentajeRecaudoVOVNFacturaFull ON dbo.Liquidaciones_ComercialVNPorCom_Detalle.NumeroFactura = dbo.vw_PorcentajeRecaudoVOVNFacturaFull.NumeroFactura


```
