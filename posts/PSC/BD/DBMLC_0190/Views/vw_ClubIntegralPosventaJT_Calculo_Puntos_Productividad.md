# View: vw_ClubIntegralPosventaJT_Calculo_Puntos_Productividad

## Usa los objetos:
- [[vw_ClubIntegralPosventaJT_Pasa_Productividad]]
- [[vw_ClubIntegralRangosMaestrasFull]]

```sql

CREATE view [dbo].[vw_ClubIntegralPosventaJT_Calculo_Puntos_Productividad] as

select distinct p.CodigoEmpleado,p.Nombres,p.CodigoMarca,p.Marca,p.CodigoCentro,p.NombreCentro,p.IdClubintegralModeloSub,p.NombreModeloSub,p.Ano,p.Trimestre,p.Productividad,mf.Puntos

from vw_ClubIntegralPosventaJT_Pasa_Productividad p

left join vw_ClubIntegralRangosMaestrasFull mf							on				p.IdRangoVersionMax = mf.IdRangoVersion 

where CodigoEmpleado is not null and (mf.Desde < p.Productividad) and (mf.Hasta >= p.Productividad) 







```
