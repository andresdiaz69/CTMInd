# View: vw_ClubIntegralPosventaTe_1y2_Calculo_Puntos_Productividad

## Usa los objetos:
- [[vw_ClubIntegralPosventaTe_1y2_Pasa_Productividad]]
- [[vw_ClubIntegralRangosMaestrasFull]]

```sql
CREATE VIEW [dbo].[vw_ClubIntegralPosventaTe_1y2_Calculo_Puntos_Productividad] AS
	
select distinct p.CodigoEmpleado,p.Nombres,p.CodigoMarca,p.Marca,p.CodigoMarcaGrupo,p.MarcaGrupo,p.Ano,p.TicketEntrada,p.Trimestre,p.Productividad,Puntos
from  vw_ClubIntegralPosventaTe_1y2_Pasa_Productividad p
left join vw_ClubIntegralRangosMaestrasFull mf							on				p.IdRangoVersionMax = mf.IdRangoVersion 
where CodigoEmpleado is not null and (mf.Desde < p.Productividad) and (mf.Hasta >= p.Productividad) 

```
