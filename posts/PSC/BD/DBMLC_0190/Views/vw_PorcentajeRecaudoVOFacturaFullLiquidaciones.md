# View: vw_PorcentajeRecaudoVOFacturaFullLiquidaciones

## Usa los objetos:
- [[Liquidaciones]]
- [[Liquidaciones_AsesorComercialVehiculosUsadosPorComV2_Detalle]]
- [[vw_PorcentajeRecaudoVOFacturaFull]]

```sql


CREATE VIEW [dbo].[vw_PorcentajeRecaudoVOFacturaFullLiquidaciones]
AS
SELECT        dbo.vw_PorcentajeRecaudoVOFacturaFull.Ano_Recaudo, dbo.vw_PorcentajeRecaudoVOFacturaFull.Mes_Recaudo, dbo.vw_PorcentajeRecaudoVOFacturaFull.Dia_Recaudo, 
                         dbo.vw_PorcentajeRecaudoVOFacturaFull.FechaRecaudo, dbo.vw_PorcentajeRecaudoVOFacturaFull.CodigoEmpresa, dbo.vw_PorcentajeRecaudoVOFacturaFull.Empresa, dbo.vw_PorcentajeRecaudoVOFacturaFull.CodigoCentro, 
                         dbo.vw_PorcentajeRecaudoVOFacturaFull.Centro, dbo.vw_PorcentajeRecaudoVOFacturaFull.FechaFactura, dbo.vw_PorcentajeRecaudoVOFacturaFull.NumeroFactura, dbo.vw_PorcentajeRecaudoVOFacturaFull.TotalFactura, 
                         dbo.vw_PorcentajeRecaudoVOFacturaFull.ImporteEfecto, dbo.vw_PorcentajeRecaudoVOFacturaFull.PorcentajeRecaudo, dbo.vw_PorcentajeRecaudoVOFacturaFull.VIN, 
                         dbo.vw_PorcentajeRecaudoVOFacturaFull.FechaEntregaCliente, dbo.Liquidaciones_AsesorComercialVehiculosUsadosPorComV2_Detalle.IdDetalle, dbo.Liquidaciones_AsesorComercialVehiculosUsadosPorComV2_Detalle.IdHistorico, 
                         dbo.Liquidaciones_AsesorComercialVehiculosUsadosPorComV2_Detalle.IdLiquidacion, dbo.Liquidaciones_AsesorComercialVehiculosUsadosPorComV2_Detalle.Ano_Periodo, dbo.Liquidaciones_AsesorComercialVehiculosUsadosPorComV2_Detalle.Mes_Periodo, 
                         dbo.Liquidaciones_AsesorComercialVehiculosUsadosPorComV2_Detalle.CodigoMArca, dbo.Liquidaciones_AsesorComercialVehiculosUsadosPorComV2_Detalle.Marca, dbo.Liquidaciones_AsesorComercialVehiculosUsadosPorComV2_Detalle.CodigoGama, 
                         dbo.Liquidaciones_AsesorComercialVehiculosUsadosPorComV2_Detalle.Gama, dbo.Liquidaciones_AsesorComercialVehiculosUsadosPorComV2_Detalle.CodigoModelo, dbo.Liquidaciones_AsesorComercialVehiculosUsadosPorComV2_Detalle.AnoModelo AS AñoModelo, 
                         dbo.Liquidaciones_AsesorComercialVehiculosUsadosPorComV2_Detalle.Modelo, dbo.Liquidaciones_AsesorComercialVehiculosUsadosPorComV2_Detalle.CedulaVendedor, dbo.Liquidaciones_AsesorComercialVehiculosUsadosPorComV2_Detalle.NombreVendedor, 
                         dbo.Liquidaciones_AsesorComercialVehiculosUsadosPorComV2_Detalle.ValorComision, dbo.Liquidaciones_AsesorComercialVehiculosUsadosPorComV2_Detalle.ModeloVehSinComision, dbo.Liquidaciones.FechaLiquidacion
FROM            dbo.Liquidaciones INNER JOIN
                         dbo.Liquidaciones_AsesorComercialVehiculosUsadosPorComV2_Detalle ON dbo.Liquidaciones.IdLiquidacion = dbo.Liquidaciones_AsesorComercialVehiculosUsadosPorComV2_Detalle.IdLiquidacion RIGHT OUTER JOIN
                         dbo.vw_PorcentajeRecaudoVOFacturaFull ON dbo.Liquidaciones_AsesorComercialVehiculosUsadosPorComV2_Detalle.NumeroFactura = dbo.vw_PorcentajeRecaudoVOFacturaFull.NumeroFactura


```
