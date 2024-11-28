# View: vw_SpigaTerceroContactos

## Usa los objetos:
- [[TerceroContactos]]

```sql


CREATE view [dbo].[vw_SpigaTerceroContactos] as
select PkFkTerceros,PkFkTerceros_Contactos,CapacidadCompra,UserMod,FechaMod,Principal
from [192.168.90.10\SPIGAPLUS].[DMS00280].[CM].[TerceroContactos]	
where fechabaja is null


```
