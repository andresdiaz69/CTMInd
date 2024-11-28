# View: vw_JefeDeRepuestosMazda_11

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]

```sql










CREATE VIEW [dbo].[vw_JefeDeRepuestosMazda_11]
AS
SELECT  Ano_Periodo,Mes_Periodo,CodigoEmpresa,Empresa,CodigoCentro,Centro,NumeroFactura, SUM(ValorNeto) AS ValorNetoMostrador

FROM (
SELECT        dbo.ComisionesSpigaAlmacenAlbaran.Ano_Periodo, dbo.ComisionesSpigaAlmacenAlbaran.Mes_Periodo, dbo.ComisionesSpigaAlmacenAlbaran.CodigoEmpresa, dbo.ComisionesSpigaAlmacenAlbaran.Empresa, 
                         dbo.ComisionesSpigaAlmacenAlbaran.CodigoCentro, dbo.ComisionesSpigaAlmacenAlbaran.Centro,dbo.ComisionesSpigaAlmacenAlbaran.NumeroFactura, dbo.ComisionesSpigaAlmacenAlbaran.ValorNeto
FROM            dbo.ComisionesSpigaAlmacenAlbaran 
WHERE        
(CodigoCentro = 2)
AND (dbo.ComisionesSpigaAlmacenAlbaran.FechaFactura <= '20191031')

) AS ValorNeto
GROUP BY Ano_Periodo,Mes_Periodo,CodigoEmpresa,Empresa,CodigoCentro,Centro,NumeroFactura

```
