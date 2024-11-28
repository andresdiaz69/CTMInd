# View: vw_ClubIntegralComercialAC_Calculo_Puntos_Retomas

## Usa los objetos:
- [[vw_ClubIntegralComercialAC_Ticket_Retomas]]
- [[vw_ClubIntegralRangoMaestrasVersionMax]]
- [[vw_ClubIntegralRangosMaestrasFull]]

```sql

create VIEW [dbo].[vw_ClubIntegralComercialAC_Calculo_Puntos_Retomas] AS
select distinct a.Ano,a.CodigoEmpleado,a.Nombres,a.CodigoMarcaCI,a.MarcaCI,a.CodigoCentro,a.NombreCentro,a.Trimestre,a.Retomas
,mf.Puntos
,a.IdRangoMaestra,a.IdRangoVersionMax
from 
(
	select r.Ano,r.CodigoEmpleado,r.Nombres,r.CodigoMarcaCI,r.MarcaCI,r.CodigoCentro,r.NombreCentro,r.Trimestre,r.Retomas
	,vm.IdRangoMaestra,vm.IdRangoVersionMax
	from vw_ClubIntegralComercialAC_Ticket_Retomas r
	left join vw_ClubIntegralRangoMaestrasVersionMax vm on r.CodigoEmpleado = vm.CodigoEmpleado
	where vm.IdRangoMaestra ='5'
)a
left join vw_ClubIntegralRangosMaestrasFull mf					on		a.IdRangoVersionMax = mf.IdRangoVersion 
where (mf.Desde < a.Retomas) and (mf.Hasta >= a.Retomas) 

```
