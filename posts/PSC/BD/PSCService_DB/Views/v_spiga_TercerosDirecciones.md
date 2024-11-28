# View: v_spiga_TercerosDirecciones

## Usa los objetos:
- [[CalleTipos]]
- [[spiga_TercerosDirecciones]]

```sql
create  view v_spiga_TercerosDirecciones as
select distinct PkFkTerceros,FkDireccionTipos,DescripcionTipoDireccion,Direccion,Poblacion,Provincia 
from(
		select distinct orden = row_number() over(partition by pkfkterceros order by  d.FechaMod desc),
		Pkfkterceros,pkterceroDirecciones_iden,fkDireccionTipos,
		DescripcionTipoDireccion = case	when fkDireccionTipos = 1 then 'Casa/Apartamento'
										when fkDireccionTipos = 2 then 'Oficina'
										when fkDireccionTipos = 3 then 'Otra'
										when fkDireccionTipos = 4 then 'Finca'
									else ''
									end, 
		
		Direccion  = isnull(c.descripcion,'') + ' ' + isnull(d.NombreCalle,'') + ' ' + isnull(d.Numero,'') + ' ' + isnull(d.complemento,''),
		d.poblacion,d.provincia,d.FechaMod,d.principal
		from [dbo].[spiga_TercerosDirecciones]	d
		left join [dbo].[CalleTipos]			c	on	d.FkCalleTipos = c.PkCalleTipos
		where d.FechaBaja is null
		and c.fechabaja is null
		and d.principal = 1
		--and Pkfkterceros = '174293' --'270886'
)a where orden = 1
```
