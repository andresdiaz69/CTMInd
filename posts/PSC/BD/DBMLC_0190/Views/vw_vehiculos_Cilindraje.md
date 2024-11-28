# View: vw_vehiculos_Cilindraje

## Usa los objetos:
- [[spiga_Vehiculos]]

```sql
CREATE view [dbo].[vw_vehiculos_Cilindraje] as
select vin,placa,IdVehiculos,Cilindrada,FechaDeActualizacion
from(
	select distinct orden = row_number() over(partition by vin  order by fechadeactualizacion desc),
	vin,placa,IdVehiculos,Cilindrada,FechaDeActualizacion
	from [PSCService_DB].dbo.spiga_Vehiculos
	--where placa = 'ICP745'
)a where orden = 1
and Cilindrada is not null

```
