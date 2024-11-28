# View: vw_TercerosDireccionesUltimaFechaActualizacion

## Usa los objetos:
- [[spiga_TercerosDirecciones]]

```sql
create view vw_TercerosDireccionesUltimaFechaActualizacion as
select distinct PkFkTerceros,PkTerceroDirecciones_Iden,FkDireccionTipos,FkCalleTipos,NombreCalle,numero,Bloque,piso,puerta,Complemento,
FkPaises,FkCodigosPostales,Poblacion,Provincia,Principal,FkProvincias,FkPoblaciones
from(
	select distinct orden=row_number() over (partition by PkFkTerceros order by FechaMod desc),FechaDeCorte,
	PkFkTerceros,PkTerceroDirecciones_Iden,FkDireccionTipos,FkCalleTipos,NombreCalle,numero,Bloque,piso,puerta,Complemento,
	FkPaises,FkCodigosPostales,Poblacion,Provincia,Principal,FkProvincias,FkPoblaciones
	from [PSCService_DB].dbo.spiga_TercerosDirecciones	
	where Principal = 1
	--and PkFkTerceros = '131981'
)a where orden = 1 

```
