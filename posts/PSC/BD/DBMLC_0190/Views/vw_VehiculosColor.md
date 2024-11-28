# View: vw_VehiculosColor

## Usa los objetos:
- [[spiga_Vehiculos]]

```sql

CREATE view  [dbo].[vw_VehiculosColor] as 
select distinct vin,Color
from(
		select orden = row_number() over (partition by vin order by FechaDeActualizacion desc),vin,color
		from (
				select distinct vin,Color,FechaDeActualizacion
				from [PSCService_DB].dbo.[spiga_Vehiculos]
				where (vin is not null	and vin <> '' ) and color is not null
				--and vin = 'JM7KF2W7AK0223080'
		) a 
) b where orden = 1



```
