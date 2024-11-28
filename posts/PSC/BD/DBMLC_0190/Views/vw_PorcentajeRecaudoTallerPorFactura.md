# View: vw_PorcentajeRecaudoTallerPorFactura

## Usa los objetos:
- [[ComisionesSpigaTallerPorFactura]]

```sql
CREATE VIEW [dbo].[vw_PorcentajeRecaudoTallerPorFactura]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoCentro, FkSecciones, NumeroFacturaTaller, FechaFactura, MAX(ValorTotalFactura) AS ValorTotalFactura, SUM(ImporteEfecto) AS ImporteEfecto, 
                         CASE WHEN MAX(ValorTotalFactura) <> 0 THEN SUM(ImporteEfecto) * 100 / MAX(ValorTotalFactura) ELSE 0 END AS PorcentajeRecaudo
FROM            dbo.ComisionesSpigaTallerPorFactura
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, NumeroFacturaTaller, CodigoCentro, FkSecciones, FechaFactura


```
