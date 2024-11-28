# View: vw_VehiculosDatosModelo

## Usa los objetos:
- [[spiga_Vehiculos]]

```sql

CREATE view [dbo].[vw_VehiculosDatosModelo] as
select IdConsecutivo, placa,vin,IdVehiculos,CodigoMarca,NombreMarca,CodigoGama,NombreGama,CodModelo,NombreModelo,AñoModelo
from(
	select distinct orden=row_number() over(partition by vin order by FechaDeActualizacion desc),
	FechaDeActualizacion,placa,vin,IdVehiculos,CodigoMarca,NombreMarca,CodigoGama,NombreGama,CodModelo,
	NombreModelo,AñoModelo, IdConsecutivo
	from [PSCService_DB].dbo.spiga_Vehiculos
)a where orden = 1
--order by vin

```
