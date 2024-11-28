# View: vw_ClubIntegralComercialAC_Retomas_Comparativa

## Usa los objetos:
- [[vw_ClubIntegralComercialAC_Retomas]]
- [[vw_ClubIntegralComercialAC_Retomas_Usados]]

```sql

CREATE view [dbo].[vw_ClubIntegralComercialAC_Retomas_Comparativa]
as 
select * from vw_ClubIntegralComercialAC_Retomas
union all
select * from vw_ClubIntegralComercialAC_Retomas_Usados

```
