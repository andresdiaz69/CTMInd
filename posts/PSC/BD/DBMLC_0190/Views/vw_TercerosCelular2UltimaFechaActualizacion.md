# View: vw_TercerosCelular2UltimaFechaActualizacion

## Usa los objetos:
- [[spiga_TercerosTelefonos]]

```sql

create view [dbo].[vw_TercerosCelular2UltimaFechaActualizacion] as
select PkFkTerceros,celular 
from(
	select distinct PkFkTerceros,celular=max(Celular)
	from(
		select distinct PkFkTerceros,PkTerceroTelefonos_Iden,FkTelefonoTipos,Fijo,Celular,
		FkTerceroDirecciones,Principal,FkTerceros_Direcciones
		from(
			select distinct orden=row_number() over (partition by PkFkTerceros order by FechaMod desc),FechaDeCorte,
			PkFkTerceros,PkTerceroTelefonos_Iden,FkTelefonoTipos,Fijo='',Celular=numero,FkTerceroDirecciones,Principal,FkTerceros_Direcciones
			from [PSCService_DB].dbo.spiga_TercerosTelefonos	
			where FkTelefonoTipos = 3
			and principal <> 1
			--and PkFkTerceros = '152'
		)a where orden = 2
	)b group by PkFkTerceros
)c 


```
