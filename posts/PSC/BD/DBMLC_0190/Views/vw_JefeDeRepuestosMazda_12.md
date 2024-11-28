# View: vw_JefeDeRepuestosMazda_12

## Usa los objetos:
- [[ComisionesSpigaAlmacenFactura]]

```sql







CREATE VIEW [dbo].[vw_JefeDeRepuestosMazda_12]
AS
SELECT        dbo.ComisionesSpigaAlmacenFactura.Ano_Periodo, dbo.ComisionesSpigaAlmacenFactura.Mes_Periodo, dbo.ComisionesSpigaAlmacenFactura.CodigoEmpresa, dbo.ComisionesSpigaAlmacenFactura.Empresa, 
                         dbo.ComisionesSpigaAlmacenFactura.CodigoCentro, dbo.ComisionesSpigaAlmacenFactura.Centro,dbo.ComisionesSpigaAlmacenFactura.NumeroFactura, MAX(dbo.ComisionesSpigaAlmacenFactura.TotalFactura) AS TotalFactura, 
                         SUM(dbo.ComisionesSpigaAlmacenFactura.ImporteEfecto) AS ImporteEfecto, case when MAX(dbo.ComisionesSpigaAlmacenFactura.TotalFactura) <> 0 then (SUM(dbo.ComisionesSpigaAlmacenFactura.ImporteEfecto) / MAX(dbo.ComisionesSpigaAlmacenFactura.TotalFactura))*100 else 0 end AS PorcentajeRecaudo 
FROM            dbo.ComisionesSpigaAlmacenFactura 
WHERE 
dbo.ComisionesSpigaAlmacenFactura.CodigoCentro = 2
AND (dbo.ComisionesSpigaAlmacenFactura.FechaFactura <= '20191031')

GROUP BY dbo.ComisionesSpigaAlmacenFactura.Ano_Periodo, dbo.ComisionesSpigaAlmacenFactura.Mes_Periodo, dbo.ComisionesSpigaAlmacenFactura.CodigoEmpresa, dbo.ComisionesSpigaAlmacenFactura.Empresa, 
                         dbo.ComisionesSpigaAlmacenFactura.CodigoCentro, dbo.ComisionesSpigaAlmacenFactura.Centro,dbo.ComisionesSpigaAlmacenFactura.NumeroFactura

```
