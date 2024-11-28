# View: vw_ClubIntegralComercialEntregas_Centro

## Usa los objetos:
- [[vw_ClubIntegralComercialAC_Entregas_Comparativa]]

```sql

CREATE view [dbo].[vw_ClubIntegralComercialEntregas_Centro]  as
select Ano_Periodo,CodigoCentro,NombreCentro,Trimestre,VehiculosVendidos
from 
(
SELECT DISTINCT Ano_Periodo,CodigoCentro,NombreCentro
,sum(Enero+Febrero+Marzo)as '3'
,sum(Mayo+Abril+Junio) as '4'
,sum(Julio+Agosto+Septiembre) as'1'
,sum(Octubre+Noviembre+Diciembre)as '2'
FROM vw_ClubIntegralComercialAC_Entregas_Comparativa
group by Ano_Periodo,CodigoCentro,NombreCentro
)a
unpivot ( VehiculosVendidos for  Trimestre in ([1],[2],[3],[4]))as pivota

```
