# Stored Procedure: sp_VehiculoTerceros

## Usa los objetos:
- [[VehiculoTerceros]]

```sql
CREATE procedure [dbo].[sp_VehiculoTerceros] as
select distinct PkFkVehiculos,PkFkTerceros,PkFkVehiculoTerceroTipos,UserMod,FechaMod
from [192.168.90.10\SPIGAPLUS].[DMS00280].[CM].[VehiculoTerceros]
where FechaBaja is null

```
