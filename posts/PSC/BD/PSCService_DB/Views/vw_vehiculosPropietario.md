# View: vw_vehiculosPropietario

## Usa los objetos:
- [[spiga_Vehiculos]]

```sql
CREATE view [dbo].[vw_vehiculosPropietario] as
select vin,NumDocumentoPropietario
from(
		select orden = row_number() over (partition by vin order by FechaDeActualizacion desc),vin,
		NumDocumentoPropietario
		from(
				select distinct v.vin,v.NumDocumentoPropietario,v.FechaDeActualizacion
				from spiga_Vehiculos	v
				where (vin is not null	and vin <> '' )
				--and v.vin = '1FUJHTDV7LLLX3312' 
		)a 
) b where orden = 1


```
