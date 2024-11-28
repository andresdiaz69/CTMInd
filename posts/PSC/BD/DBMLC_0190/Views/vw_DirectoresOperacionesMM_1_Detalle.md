# View: vw_DirectoresOperacionesMM_1_Detalle

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[ComisionesSpigaTallerPorOT]]

```sql

CREATE VIEW [dbo].[vw_DirectoresOperacionesMM_1_Detalle]
AS
SELECT        Ano_Periodo, Mes_Periodo, Centro, SUM(UnidadesVendidas * ValorUnitarioReferencia - UnidadesVendidas * ValorUnitarioReferencia * PorcDescuento / 100) AS ValorNetoMostrador, 0 AS ValorNetoTaller
FROM            dbo.ComisionesSpigaAlmacenAlbaran
WHERE        (Centro LIKE N'MIT-%')
GROUP BY Ano_Periodo, Mes_Periodo, Centro
UNION ALL
SELECT        Ano_Periodo, Mes_Periodo, Centro, 0 AS ValorNetoMostrador, SUM(UnidadesVendidas * ValorUnitario - UnidadesVendidas * ValorUnitario * PorcentajeDescuento / 100) AS ValorNetoTaller
FROM            dbo.ComisionesSpigaTallerPorOT
WHERE        (Centro LIKE N'MIT-%') OR (CodigoCentro IN (74, 79, 87 , 92, 97, 101) AND TipoOperacion <>'MO')
GROUP BY Ano_Periodo, Mes_Periodo, Centro

```
