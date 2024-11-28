# View: vw_ClubIntegralPosventaJTM_Calculo_Puntos_RotacionPuestos

## Usa los objetos:
- [[vw_ClubIntegralPosventaJTM_Pasa_RotacionPuestos]]
- [[vw_ClubIntegralRangosMaestrasFull]]

```sql
CREATE view [dbo].[vw_ClubIntegralPosventaJTM_Calculo_Puntos_RotacionPuestos] as

select distinct r.CodigoEmpleado,r.Nombres,r.CodigoMarca,r.Marca,r.IdCLubIntegralModeloSub,r.NombreModeloSub,r.Ano,r.Trimestre,r.RotacionPuestos,mf.Puntos

from vw_ClubIntegralPosventaJTM_Pasa_RotacionPuestos r

left join vw_ClubIntegralRangosMaestrasFull mf							on				r.IdRangoVersionMax = mf.IdRangoVersion 

where CodigoEmpleado is not null and (mf.Desde < r.RotacionPuestos) and (mf.Hasta >= r.RotacionPuestos) 






```
