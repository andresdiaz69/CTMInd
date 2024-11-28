# View: vw_ClubIntegralPosventaJT_Calculo_Puntos_Ocupacion

## Usa los objetos:
- [[vw_ClubIntegralPosventaJT_Pasa_Ocupacion]]
- [[vw_ClubIntegralRangosMaestrasFull]]

```sql
CREATE view [dbo].[vw_ClubIntegralPosventaJT_Calculo_Puntos_Ocupacion] as

select distinct o.CodigoEmpleado,o.Nombres,o.CodigoMarca,o.Marca,o.CodigoCentro,o.NombreCentro,o.IdCLubIntegralModeloSub,o.NombreModeloSub,o.Ano,o.Trimestre,o.Ocupacion,mf.Puntos,o.IdRangoMaestra

from vw_ClubIntegralPosventaJT_Pasa_Ocupacion o

left join vw_ClubIntegralRangosMaestrasFull mf							on				o.IdRangoVersionMax = mf.IdRangoVersion 

where CodigoEmpleado is not null and (mf.Desde < o.Ocupacion) and (mf.Hasta >= o.Ocupacion) 






```
