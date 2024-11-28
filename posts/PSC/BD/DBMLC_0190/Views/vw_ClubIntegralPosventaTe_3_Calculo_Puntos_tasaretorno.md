# View: vw_ClubIntegralPosventaTe_3_Calculo_Puntos_tasaretorno

## Usa los objetos:
- [[vw_ClubIntegralPosventaTe_3_Pasa_TasaRetorno]]
- [[vw_ClubIntegralRangosMaestrasFull]]

```sql
CREATE VIEW [dbo].[vw_ClubIntegralPosventaTe_3_Calculo_Puntos_tasaretorno] AS

select distinct p.CodigoEmpleado,p.Nombres,p.CodigoMarca,p.Marca,p.CodigoMarcaGrupo,p.MarcaGrupo,p.Ano,p.Trimestre,p.Tasa_de_retorno,Puntos
from    vw_ClubIntegralPosventaTe_3_Pasa_TasaRetorno p							
left join vw_ClubIntegralRangosMaestrasFull mf							on				p.IdRangoVersionMax = mf.IdRangoVersion 
where CodigoEmpleado is not null and (mf.Desde < p.Tasa_de_retorno) and (mf.Hasta >= p.Tasa_de_retorno)





```
