# View: vw_PorcentajeRecaudoTallerPorFacturaAl100_SinNC_Original

## Usa los objetos:
- [[ComisionesSpigaTallerPorFactura]]

```sql





CREATE VIEW [dbo].[vw_PorcentajeRecaudoTallerPorFacturaAl100_SinNC_Original]
AS
SELECT        CodigoEmpresa, CodigoCentro, NumeroFacturaTaller, FechaFactura, MAX(ValorTotalFactura) AS ValorTotalFactura, MAX(ValorTotalFactura) AS ImporteEfecto, CASE WHEN MAX(ValorTotalFactura) 
                         <> 0 THEN MAX(ValorTotalFactura) * 100 / MAX(ValorTotalFactura) ELSE 0 END AS PorcentajeRecaudo
FROM            dbo.ComisionesSpigaTallerPorFactura
GROUP BY CodigoEmpresa, NumeroFacturaTaller, CodigoCentro, FechaFactura







```
