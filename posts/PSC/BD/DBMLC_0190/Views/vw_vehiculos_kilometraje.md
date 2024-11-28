# View: vw_vehiculos_kilometraje

## Usa los objetos:
- [[spiga_Vehiculos]]

```sql
create view vw_vehiculos_kilometraje as
select vin,placa,IdVehiculos,KmsActuales,FechaDeActualizacion
from(
	select distinct orden = row_number() over(partition by vin  order by fechadeactualizacion desc),
	vin,placa,IdVehiculos,KmsActuales,FechaDeActualizacion
	from [PSCService_DB].dbo.spiga_Vehiculos
	--where placa = 'ICP745'
)a where orden = 1
and KmsActuales is not null

```
