# View: vw_VehiculosPlacas

## Usa los objetos:
- [[spiga_Vehiculos]]

```sql
create view  vw_VehiculosPlacas as 
select vin,placa
from(
		select orden = row_number() over (partition by vin order by FechaDeActualizacion desc),vin,placa
		from (
				select distinct vin,placa,FechaDeActualizacion 
				from [PSCService_DB].dbo.[spiga_Vehiculos]
				where (vin is not null	and vin <> '' )
				--and vin = 'JM7KF2W7AK0223080'
		) a 
) b where orden = 1



```
