# View: vw_ClubIntegralPosventaASC_Calculo_Puntos_Facturacion

## Usa los objetos:
- [[vw_ClubIntegralPosventaAS_Ticket]]
- [[vw_ClubIntegralPosventaASC_Facturacion_Trimestre_Detalle]]
- [[vw_ClubIntegralRangosMaestrasFull]]

```sql
CREATE VIEW [dbo].[vw_ClubIntegralPosventaASC_Calculo_Puntos_Facturacion] AS

select f.Ano_Spiga,f.CodigoEmpresa,f.empresa,f.codigomarca,f.marca,f.codigoempleado,f.nombres,f.Ticket,f.Trimestre,mf.Puntos,f.IdRangoMaestra,f.IdRangoVersionMax
from vw_ClubIntegralPosventaASC_Facturacion_Trimestre_Detalle f
left join vw_ClubIntegralPosventaAS_Ticket t	on f.codigoempleado = t.CodigoEmpleado and f.Ano_Spiga = t.Ano and f.Trimestre = t.Trimestre
left join vw_ClubIntegralRangosMaestrasFull mf									on f.IdRangoVersionMax = mf.IdRangoVersion 
where (mf.Desde < f.Ticket) and (mf.Hasta >= f.Ticket) and t.Resultado='pasa'





```
