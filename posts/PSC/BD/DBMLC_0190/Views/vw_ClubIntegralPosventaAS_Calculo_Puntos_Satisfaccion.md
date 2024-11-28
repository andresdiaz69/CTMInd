# View: vw_ClubIntegralPosventaAS_Calculo_Puntos_Satisfaccion

## Usa los objetos:
- [[vw_ClubIntegralPosventaAS_Pasa_Satisfaccion]]
- [[vw_ClubIntegralRangosMaestrasFull]]

```sql

CREATE VIEW [dbo].[vw_ClubIntegralPosventaAS_Calculo_Puntos_Satisfaccion] AS

select p.CodigoEmpleado,p.Nombres,p.IdCLubIntegralModeloSub,p.CodigoMarca,p.Ano,p.Trimestre,p.Satisfaccion,Puntos

from vw_ClubIntegralPosventaAS_Pasa_Satisfaccion p

left join vw_ClubIntegralRangosMaestrasFull mf							on				p.IdRangoVersionMax = mf.IdRangoVersion 

where CodigoEmpleado is not null and (mf.Desde < p.Satisfaccion) and (mf.Hasta >= p.Satisfaccion) 

```
