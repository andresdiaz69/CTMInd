# View: vw_ClubIntegralRangosVersionesMax

## Usa los objetos:
- [[ClubIntegralRangosMaestras]]
- [[ClubIntegralRangosVersiones]]

```sql
create view [dbo].[vw_ClubIntegralRangosVersionesMax] as
select ClubIntegralRangosVersiones.IdRangoMaestra, MAX(ClubIntegralRangosVersiones.IdRangoVersion) as IdRangoVersionMax
from ClubIntegralRangosVersiones
								inner join ClubIntegralRangosMaestras on ClubIntegralRangosVersiones.IdRangoMaestra = ClubIntegralRangosMaestras.IdRangoMaestra
group by ClubIntegralRangosVersiones.IdRangoMaestra



```
