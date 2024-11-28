# View: vw_DiasFestivos

## Usa los objetos:
- [[rhh_tbcalend]]

```sql

CREATE VIEW [dbo].[vw_DiasFestivos] AS
SELECT dia_fes AS Fechafestivo, des_fes AS DescFestivo
FROM [Novasoft_CT_MM].[dbo].[rhh_tbcalend]

```
