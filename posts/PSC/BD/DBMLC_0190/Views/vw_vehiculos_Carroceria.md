# View: vw_vehiculos_Carroceria

## Usa los objetos:
- [[spiga_Vehiculos]]

```sql
create view [dbo].[vw_vehiculos_Carroceria] as
select vin,placa,IdVehiculos,carroceria,FechaDeActualizacion
from(
	select distinct orden = row_number() over(partition by vin  order by fechadeactualizacion desc),
	vin,placa,IdVehiculos,carroceria,FechaDeActualizacion
	from [PSCService_DB].dbo.spiga_Vehiculos
	--where placa = 'ICP745'
)a where orden = 1
and carroceria is not null

```
