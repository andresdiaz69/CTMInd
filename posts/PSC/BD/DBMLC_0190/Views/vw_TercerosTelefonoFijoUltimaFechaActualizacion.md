# View: vw_TercerosTelefonoFijoUltimaFechaActualizacion

## Usa los objetos:
- [[spiga_TercerosTelefonos]]

```sql
create view [dbo].[vw_TercerosTelefonoFijoUltimaFechaActualizacion] as
select distinct PkFkTerceros,Fijo=max(fijo)
from(
	select distinct PkFkTerceros,PkTerceroTelefonos_Iden,FkTelefonoTipos,Fijo,Celular,
	FkTerceroDirecciones,Principal,FkTerceros_Direcciones
	from(
		select distinct orden=row_number() over (partition by PkFkTerceros order by FechaMod desc),FechaDeCorte,
		PkFkTerceros,PkTerceroTelefonos_Iden,FkTelefonoTipos,Fijo=numero,Celular='',FkTerceroDirecciones,Principal,FkTerceros_Direcciones
		from [PSCService_DB].dbo.spiga_TercerosTelefonos	
		where PkTerceroTelefonos_Iden = 1
		--and PkFkTerceros = '20'
	)a where orden = 1 
)b group by PkFkTerceros
```
