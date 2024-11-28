# View: vw_ClubIntegralComercialAC_Entregas_Comparativa

## Usa los objetos:
- [[vw_ClubIntegralComercialAC_Entregas]]
- [[vw_ClubIntegralComercialAC_Entregas_usados]]

```sql

CREATE view [dbo].[vw_ClubIntegralComercialAC_Entregas_Comparativa] as
select * from vw_ClubIntegralComercialAC_Entregas
union all 
select * from vw_ClubIntegralComercialAC_Entregas_usados

```
