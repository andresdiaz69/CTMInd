# View: vw_PorcentajeRecaudoAlmacenFactura

## Usa los objetos:
- [[ComisionesSpigaAlmacenFactura]]
- [[spiga_NotasCreditoRepuestos]]

```sql


CREATE VIEW [dbo].[vw_PorcentajeRecaudoAlmacenFactura]
AS
SELECT        dbo.ComisionesSpigaAlmacenFactura.Ano_Periodo, dbo.ComisionesSpigaAlmacenFactura.Mes_Periodo, dbo.ComisionesSpigaAlmacenFactura.CodigoEmpresa, dbo.ComisionesSpigaAlmacenFactura.CodigoCentro, 
                         dbo.ComisionesSpigaAlmacenFactura.FkSecciones, dbo.ComisionesSpigaAlmacenFactura.NumeroFactura, dbo.ComisionesSpigaAlmacenFactura.FechaFactura, MAX(dbo.ComisionesSpigaAlmacenFactura.TotalFactura) 
                         AS TotalFactura, SUM(dbo.ComisionesSpigaAlmacenFactura.ImporteEfecto) AS ImporteEfecto, CASE WHEN MAX(TotalFactura) <> 0 THEN SUM(ImporteEfecto) * 100 / MAX(TotalFactura) ELSE 0 END AS PorcentajeRecaudo, 
                         [PSCService_DB].dbo.spiga_NotasCreditoRepuestos.NumeroNotaCredito
FROM            dbo.ComisionesSpigaAlmacenFactura LEFT OUTER JOIN
                         [PSCService_DB].dbo.spiga_NotasCreditoRepuestos ON dbo.ComisionesSpigaAlmacenFactura.CodigoEmpresa = [PSCService_DB].dbo.spiga_NotasCreditoRepuestos.PkFkEmpresas AND 
                         dbo.ComisionesSpigaAlmacenFactura.CodigoCentro = [PSCService_DB].dbo.spiga_NotasCreditoRepuestos.CodigoCentro AND 
                         dbo.ComisionesSpigaAlmacenFactura.NumeroFactura = [PSCService_DB].dbo.spiga_NotasCreditoRepuestos.Factura

WHERE 

-- JCS: 2022/08/31 - MEJORA EL PERFORMANCE Y EXCLUYE LAS QUE TIENEN NOTA CRÉDITO
dbo.ComisionesSpigaAlmacenFactura.Ano_Periodo >= 2020
AND
NumeroNotaCredito IS NULL

GROUP BY dbo.ComisionesSpigaAlmacenFactura.Ano_Periodo, dbo.ComisionesSpigaAlmacenFactura.Mes_Periodo, dbo.ComisionesSpigaAlmacenFactura.CodigoEmpresa, dbo.ComisionesSpigaAlmacenFactura.NumeroFactura, 
                         dbo.ComisionesSpigaAlmacenFactura.CodigoCentro, dbo.ComisionesSpigaAlmacenFactura.FkSecciones, dbo.ComisionesSpigaAlmacenFactura.FechaFactura, 
                         [PSCService_DB].dbo.spiga_NotasCreditoRepuestos.NumeroNotaCredito

```
