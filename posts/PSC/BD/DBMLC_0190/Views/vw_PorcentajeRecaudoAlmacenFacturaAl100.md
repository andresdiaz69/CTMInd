# View: vw_PorcentajeRecaudoAlmacenFacturaAl100

## Usa los objetos:
- [[ComisionesSpigaAlmacenFactura]]

```sql



CREATE VIEW [dbo].[vw_PorcentajeRecaudoAlmacenFacturaAl100]
AS
SELECT        CodigoEmpresa, CodigoCentro, NumeroFactura, FechaFactura, MAX(TotalFactura) AS TotalFactura, MAX(TotalFactura) AS ImporteEfecto, CASE WHEN MAX(TotalFactura) 
                         <> 0 THEN MAX(TotalFactura) * 100 / MAX(TotalFactura) ELSE 0 END AS PorcentajeRecaudo
FROM            dbo.ComisionesSpigaAlmacenFactura
GROUP BY CodigoEmpresa, NumeroFactura, CodigoCentro, FechaFactura






```
