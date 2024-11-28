# View: vw_PorcentajeRecaudoVOFactura

## Usa los objetos:
- [[vw_PorcentajeRecaudoVOFacturaFull]]

```sql







CREATE VIEW [dbo].[vw_PorcentajeRecaudoVOFactura]
AS
SELECT        Ano_Recaudo, Mes_Recaudo, Dia_Recaudo, FechaRecaudo, CodigoEmpresa, Empresa, CodigoCentro, Centro, FechaFactura, NumeroFactura, TotalFactura, TotalFacturaSinCuotaReteFuente, ImporteEfecto, PorcentajeRecaudo, 
                         VIN, NumeroNotaCredito
FROM            dbo.vw_PorcentajeRecaudoVOFacturaFull
WHERE        
(TotalFactura > 0) AND (ImporteEfecto > 0) AND (PorcentajeRecaudo >= 99.99) AND (FechaFactura > N'20170831') AND (NumeroNotaCredito IS NULL) AND (ComisionRecaudoBloqueada = 0) AND (VIN_Pagado IS NULL) AND Nitcliente NOT IN ('900336249-4', '900283099-7', '830004993-8', '860019063-8', '9003362494', '9002830997', '8300049938', '8600190638')








```
