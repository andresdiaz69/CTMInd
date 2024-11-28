# View: vw_UltimaEntradaATaller

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]

```sql
create view vw_UltimaEntradaATaller as
select vin,placa,fechaentrega
from(
	select Orden=row_number() over(partition by VIN order by fechaentrega desc),vin,placa,fechaentrega
	from(
		select distinct vin,placa,FechaEntrega
		from ComisionesSpigaTallerPorOT	
		where vin is not null and vin <> ' '
	)a 
)b where orden = 1
--order by vin

```
