# View: vw_DirectoresOperacionesMM_2_Detalle

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]

```sql
CREATE VIEW [dbo].[vw_DirectoresOperacionesMM_2_Detalle]
AS
SELECT        Ano_Periodo, Mes_Periodo, Centro, SUM(UnidadesVendidas * ValorUnitario - UnidadesVendidas * ValorUnitario * PorcentajeDescuento / 100) AS ValorNetoTaller
FROM            dbo.ComisionesSpigaTallerPorOT
WHERE        (TipoOperacion IN ('MO', 'SUB', 'VAR', 'PIN')) AND (Marcaveh = 20) AND (Centro LIKE N'CO-%')
GROUP BY Ano_Periodo, Mes_Periodo, Centro


```
