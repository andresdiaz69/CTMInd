# View: vw_TercerosCorreoUltimaFechaActualizacion

## Usa los objetos:
- [[spiga_TercerosCorreos]]

```sql
CREATE view [dbo].[vw_TercerosCorreoUltimaFechaActualizacion] as
select PkFkTerceros,PkTerceroEmails_Iden,FkEmailTipos,email,FkTerceroDirecciones,Principal,FkTerceros_Direcciones
from(
	select orden=row_number() over (partition by PkFkTerceros order by FechaMod desc),FechaDeCorte,
	PkFkTerceros,PkTerceroEmails_Iden,FkEmailTipos,email,FkTerceroDirecciones,Principal,FkTerceros_Direcciones
	from [PSCService_DB].dbo.spiga_TercerosCorreos		
	where Principal = 1
	--and PkFkTerceros = '131981'
)a where orden = 1 

```
