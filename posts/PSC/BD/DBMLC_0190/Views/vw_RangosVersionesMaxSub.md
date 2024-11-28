# View: vw_RangosVersionesMaxSub

## Usa los objetos:
- [[RangosMaestras]]
- [[RangosVersiones]]

```sql
CREATE VIEW [dbo].[vw_RangosVersionesMaxSub]
AS
SELECT        dbo.RangosVersiones.IdRangoMaestra, MAX(dbo.RangosVersiones.IdRangoVersion) AS IdRangoVersionMax, dbo.RangosMaestras.IdComisionModeloSub, dbo.RangosMaestras.IdComisionModeloSubCriterio
FROM            dbo.RangosVersiones INNER JOIN
                         dbo.RangosMaestras ON dbo.RangosVersiones.IdRangoMaestra = dbo.RangosMaestras.IdRangoMaestra
GROUP BY dbo.RangosVersiones.IdRangoMaestra, dbo.RangosMaestras.IdComisionModeloSub, dbo.RangosMaestras.IdComisionModeloSubCriterio


```
