# View: vw_PorcentajeRecaudoTallerPorFacturaAl100

## Usa los objetos:
- [[ComisionesSpigaTallerPorFactura]]
- [[spiga_NotasCreditoTaller]]

```sql


CREATE VIEW [dbo].[vw_PorcentajeRecaudoTallerPorFacturaAl100]
AS
SELECT        dbo.ComisionesSpigaTallerPorFactura.CodigoEmpresa, dbo.ComisionesSpigaTallerPorFactura.CodigoCentro, dbo.ComisionesSpigaTallerPorFactura.NumeroFacturaTaller, dbo.ComisionesSpigaTallerPorFactura.FechaFactura, 
                         MAX(dbo.ComisionesSpigaTallerPorFactura.ValorTotalFactura) AS ValorTotalFactura, MAX(dbo.ComisionesSpigaTallerPorFactura.ValorTotalFactura) AS ImporteEfecto, CASE WHEN MAX(ValorTotalFactura) 
                         <> 0 THEN MAX(ValorTotalFactura) * 100 / MAX(ValorTotalFactura) ELSE 0 END AS PorcentajeRecaudo, [PSCService_DB].dbo.spiga_NotasCreditoTaller.NumeroNotaCredito
FROM            dbo.ComisionesSpigaTallerPorFactura LEFT OUTER JOIN
                         [PSCService_DB].dbo.spiga_NotasCreditoTaller ON dbo.ComisionesSpigaTallerPorFactura.CodigoEmpresa = [PSCService_DB].dbo.spiga_NotasCreditoTaller.CodigoEmpresa AND 
                         dbo.ComisionesSpigaTallerPorFactura.CodigoCentro = [PSCService_DB].dbo.spiga_NotasCreditoTaller.CodigoCentro AND 
                         dbo.ComisionesSpigaTallerPorFactura.NumeroFacturaTaller = [PSCService_DB].dbo.spiga_NotasCreditoTaller.NumeroFactura

WHERE

-- JCS: 2022/08/31 - MEJORA EL PERFORMANCE Y EXCLUYE LAS QUE TIENEN NOTA CRÉDITO
dbo.ComisionesSpigaTallerPorFactura.Ano_Periodo >= 2020
AND
NumeroNotaCredito IS NULL

GROUP BY dbo.ComisionesSpigaTallerPorFactura.CodigoEmpresa, dbo.ComisionesSpigaTallerPorFactura.NumeroFacturaTaller, dbo.ComisionesSpigaTallerPorFactura.CodigoCentro, dbo.ComisionesSpigaTallerPorFactura.FechaFactura, 
                         [PSCService_DB].dbo.spiga_NotasCreditoTaller.NumeroNotaCredito

```
