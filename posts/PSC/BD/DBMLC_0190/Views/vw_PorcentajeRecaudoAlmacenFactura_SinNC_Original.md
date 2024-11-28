# View: vw_PorcentajeRecaudoAlmacenFactura_SinNC_Original

## Usa los objetos:
- [[ComisionesSpigaAlmacenFactura]]

```sql

CREATE VIEW [dbo].[vw_PorcentajeRecaudoAlmacenFactura_SinNC_Original]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoCentro, FkSecciones, NumeroFactura, FechaFactura, MAX(TotalFactura) AS TotalFactura, SUM(ImporteEfecto) AS ImporteEfecto, CASE WHEN MAX(TotalFactura) 
                         <> 0 THEN SUM(ImporteEfecto) * 100 / MAX(TotalFactura) ELSE 0 END AS PorcentajeRecaudo
FROM            dbo.ComisionesSpigaAlmacenFactura
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, NumeroFactura, CodigoCentro, FkSecciones, FechaFactura


```
