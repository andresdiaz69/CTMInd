# View: vw_ClubIntegralRepuestos_Calculo_Puntos_Cumplimiento

## Usa los objetos:
- [[vw_ClubIntegralRangosMaestrasFull]]
- [[vw_ClubIntegralRepuestos_Cumplimiento]]

```sql
CREATE view [dbo].[vw_ClubIntegralRepuestos_Calculo_Puntos_Cumplimiento] as

select c.Ano_Spiga,c.CedulaVendedorRepuestos,c.Trimestre,c.Resultado,mf.Puntos
from 
(
	select Ano_Spiga,CedulaVendedorRepuestos,IdRangoMaestra,IdRangoVersionMax,Trimestre,Resultado
	from 
	(
		select c.Ano_Spiga,c.CedulaVendedorRepuestos,c.IdRangoMaestra,c.IdRangoVersionMax,c.Trimestre1 as '1', c.Trimestre2 as '2',c.Trimestre3 as '3',c.Trimestre4 as '4'
		from vw_ClubIntegralRepuestos_Cumplimiento c
	)a
	unpivot (Resultado for Trimestre in([1],[2],[3],[4]))p
)c
left join vw_ClubIntegralRangosMaestrasFull mf on c.IdRangoVersionMax = mf.IdRangoVersion
where (mf.Desde < c.Resultado) and (mf.Hasta >= c.Resultado)




```
