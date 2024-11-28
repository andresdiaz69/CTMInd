# View: vw_vehiculosFechaEntrega

## Usa los objetos:
- [[ComisionesSpigaVN]]

```sql

CREATE  view [dbo].[vw_vehiculosFechaEntrega] as
select VIN,FechaEntregaCliente
from(
	select v.vin,v.FechaEntregaCliente,orden=row_number() over (partition by v.vin order by v.FechaEntregaCliente desc )
	from ComisionesSpigaVN	v
	--where v.vin ='1TC2750HPKT010035'
) a where orden = 1

```
