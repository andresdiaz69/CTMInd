# View: vw_ClubIntegralPosventaTe_3_Calculo_Puntos_Ocupacion

## Usa los objetos:
- [[vw_ClubIntegralPosventaTe_3_Pasa_Ocupacion]]
- [[vw_ClubIntegralRangosMaestrasFull]]

```sql
CREATE VIEW [dbo].[vw_ClubIntegralPosventaTe_3_Calculo_Puntos_Ocupacion] AS
	
select distinct p.CodigoEmpleado,p.Nombres,p.CodigoMarca,p.Marca,p.CodigoMarcaGrupo,p.MarcaGrupo,p.Ano,p.Trimestre,p.Ocupacion,Puntos
from  vw_ClubIntegralPosventaTe_3_Pasa_Ocupacion p
left join vw_ClubIntegralRangosMaestrasFull mf							on				p.IdRangoVersionMax = mf.IdRangoVersion 
where CodigoEmpleado is not null and (mf.Desde < p.Ocupacion) and (mf.Hasta >= p.Ocupacion) 






```
