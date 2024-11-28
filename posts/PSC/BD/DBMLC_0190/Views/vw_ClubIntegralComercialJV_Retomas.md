# View: vw_ClubIntegralComercialJV_Retomas

## Usa los objetos:
- [[Centros]]
- [[Empleados]]
- [[vw_ClubIntegralComercialAC_Retomas_Comparativa]]
- [[vw_ClubIntegralComercialJV_Detalles]]

```sql

CREATE VIEW [dbo].[vw_ClubIntegralComercialJV_Retomas] as
select distinct b.Ano,j.CodigoEmpleado,j.Nombres,b.CodigoCentro,b.NombreCentro,b.Trimestre,b.Retomas
from 
(
	select Ano,CodigoCentro,NombreCentro,Trimestre,Retomas
	from 
	(
	select r.Ano,e.CodigoCentro,c.NombreCentro
	,(sum(r.Julio)+sum(r.Agosto)+sum(r.Septiembre))'1'	
	,(sum(r.Octubre)+sum(r.Noviembre)+sum(r.Diciembre))'2'
	,(sum(r.Enero)+sum(r.Febrero)+sum(r.Marzo))'3'
	,(sum(r.Abril)+sum(r.Mayo)+sum(r.Junio))'4'
	from vw_ClubIntegralComercialAC_Retomas_Comparativa r
	left join Empleados e on r.CodigoEmpleado = e.CodigoEmpleado
	left join Centros c on e.CodigoCentro = c.CodigoCentro
	where e.CodigoCentro is not null
	group by r.Ano,e.CodigoCentro,c.NombreCentro
	)a 
	unpivot(Retomas for Trimestre in ([1],[2],[3],[4]))as unpivota
)b
left join vw_ClubIntegralComercialJV_Detalles j on b.CodigoCentro = j.CodigoCentro 
where j.IdRangoMaestra ='13'



--select * from vw_ClubIntegralComercialJV_Detalles where IdRangoMaestra='13'


```
