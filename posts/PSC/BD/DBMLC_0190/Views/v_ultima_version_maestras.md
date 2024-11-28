# View: v_ultima_version_maestras

## Usa los objetos:
- [[RangosDetalles]]
- [[RangosMaestras]]
- [[RangosVersiones]]

```sql
create view v_ultima_version_maestras as
SELECT DISTINCT RangosMaestras.IdRangoMaestra,Idrangoversion=max(RangosVersiones.IdRangoVersion), ConsecutivoVersion=max(RangosVersiones.ConsecutivoVersion)
FROM        RangosMaestras 
left JOIN   RangosVersiones ON RangosMaestras.IdRangoMaestra = RangosVersiones.IdRangoMaestra 
left JOIN   RangosDetalles ON RangosVersiones.IdRangoVersion = RangosDetalles.IdRangoVersion
--WHERE     (RangosMaestras.IdRangoMaestra in (1, 7))
group by RangosMaestras.IdRangoMaestra


```
