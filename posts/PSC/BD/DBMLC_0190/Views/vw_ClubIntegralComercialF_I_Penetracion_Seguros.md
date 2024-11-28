# View: vw_ClubIntegralComercialF_I_Penetracion_Seguros

## Usa los objetos:
- [[ClubIntegralNumeroPolizas]]
- [[vw_ClubIntegralComercialF_I_Ejecutivos]]

```sql

CREATE view [dbo].[vw_ClubIntegralComercialF_I_Penetracion_Seguros] as

select CodigoEmpleado,Nombres,CodigoCentro,NombreCentro,Ano,Trimestre,sum(NumeroPolizas)NumeroPolizas
from 
(
	select CodigoEmpleado,Nombres,CodigoCentro,NombreCentro,Ano
	,case when Mes = 1 then 3  when Mes = 2 then 3 when Mes = 3 then 3 
		  when Mes = 4 then 4  when Mes = 5 then 4 when Mes = 6 then 4
		  when Mes = 7 then 1  when Mes = 8 then 1 when Mes = 9 then 1
		  when Mes = 10 then 2 when Mes = 11 then 2 when Mes = 12 then 2
	end as Trimestre
	,sum(NumeroPolizas)NumeroPolizas
	from
	(
		select distinct p.CodigoEmpleado,e.Nombres,e.CodigoCentro,e.NombreCentro,p.Ano,p.Mes
		,sum(p.Numero_de_Polizas)NumeroPolizas
		from ClubIntegralNumeroPolizas p
		left join vw_ClubIntegralComercialF_I_Ejecutivos e on p.CodigoEmpleado = e.CodigoEmpleado and p.CodigoCentro = e.CodigoCentro
		group by p.CodigoEmpleado,e.Nombres,e.CodigoCentro,e.NombreCentro,p.Ano,p.Mes
	)a
	group by CodigoEmpleado,Nombres,CodigoCentro,NombreCentro,Ano,Mes
)c

group by CodigoEmpleado,Nombres,CodigoCentro,NombreCentro,Ano,Trimestre



```
