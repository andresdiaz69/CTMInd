# View: v_GMF_11_ValoresVentasNetasTotalLineas

## Usa los objetos:
- [[v_GMF_10_ValoresVentasNetas]]

```sql
CREATE view [dbo].[v_GMF_11_ValoresVentasNetasTotalLineas] as
select Empresa,Año,Mes,CodigoPresentacion,NombrePresentacion,Valor=sum(Valor)
from(		
		select empresa,año,mes,
		CodigoPresentacion = case	when sede like '%BYD%' then 83
									when (sede like '%DAI.C%' or sede like '%Colisión Picaleña%' or sede like '%Daimler Calle 80%') then 5
									when (sede like '%DAI.V%'  or sede like '%Daimler Auto Norte%' or sede like '%Colisión Dai Mirolindo%') then 17
									when (sede like '%Ford%' or sede like '%FR-%')then 12
									when (sede like '%Mazda%' or sede like '%MZ-%') then 7
									when (sede like '%Renault%' or sede like '%RN-%')then 8
									when (sede like '%Volkswagen%' or sede like '%VW-%') then 9
									when (sede like '%Colisión Mit Mirolindo%') then 77
							else CodigoPresentacion end, 
		nombrepresentacion = case	when sede like '%BYD%' then 'BYD'
									when (sede like '%DAI.C%' or sede like '%Colisión Picaleña%' or sede like '%Daimler Calle 80%')then 'Daimler - Comercial'
									when (sede like '%DAI.V%'  or sede like '%Daimler Auto Norte%' or sede like '%Colisión Dai Mirolindo%') then 'Daimler - Vehiculos'
									when (sede like '%Ford%' or sede like '%FR-%')then 'Ford'
									when (sede like '%Mazda%' or sede like '%MZ-%') then 'Mazda'
									when (sede like '%Renault%' or sede like '%RN-%')then 'Renault'
									when (sede like '%Volkswagen%' or sede like '%VW-%') then 'Volkswagen'
									when (sede like '%Colisión Mit Mirolindo%') then 'Mitsubishi Concesionarios'
							else nombrepresentacion
		end,
		Valor=sum(Valor)
		from(
				select Empresa,Año,Mes,CodigoPresentacion,NombrePresentacion,sede,Valor=sum(Valor)
				from  v_GMF_10_ValoresVentasNetas 
				--where año=2021
				--and mes=2
				--and sede like '%FR-%'
				group by Empresa,Año,Mes,CodigoPresentacion,NombrePresentacion,sede
		)a group by  empresa,año,mes,CodigoPresentacion,nombrepresentacion,sede
)b group by Empresa,Año,Mes,CodigoPresentacion,NombrePresentacion
--order by empresa,año,mes,CodigoPresentacion,nombrepresentacion


```
