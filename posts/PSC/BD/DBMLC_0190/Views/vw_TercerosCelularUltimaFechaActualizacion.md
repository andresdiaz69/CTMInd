# View: vw_TercerosCelularUltimaFechaActualizacion

## Usa los objetos:
- [[spiga_TercerosTelefonos]]

```sql
CREATE view [dbo].[vw_TercerosCelularUltimaFechaActualizacion] as
select PkFkTerceros,Numero = celular
from(
	select distinct PkFkTerceros,Fijo=max(fijo),celular=max(Celular)
	from(
		select distinct PkFkTerceros,PkTerceroTelefonos_Iden,FkTelefonoTipos,Fijo,Celular,
		FkTerceroDirecciones,Principal,FkTerceros_Direcciones
		from(
			select distinct orden=row_number() over (partition by PkFkTerceros order by FechaMod desc),FechaDeCorte,
			PkFkTerceros,PkTerceroTelefonos_Iden,FkTelefonoTipos,Fijo='',Celular=numero,FkTerceroDirecciones,Principal,FkTerceros_Direcciones
			from [PSCService_DB].dbo.spiga_TercerosTelefonos	
			--where FkTelefonoTipos = 3
			-- PkFkTerceros = '653844'
		)a where orden = 1 
	)b group by PkFkTerceros
)c



```
