# View: vw_RangosVersionesMax

## Usa los objetos:
- [[RangosMaestras]]
- [[RangosVersiones]]

```sql
CREATE VIEW [dbo].[vw_RangosVersionesMax]
AS
SELECT        dbo.RangosVersiones.IdRangoMaestra, MAX(dbo.RangosVersiones.IdRangoVersion) AS IdRangoVersionMax
FROM            dbo.RangosVersiones INNER JOIN
                         dbo.RangosMaestras ON dbo.RangosVersiones.IdRangoMaestra = dbo.RangosMaestras.IdRangoMaestra
GROUP BY dbo.RangosVersiones.IdRangoMaestra




```
