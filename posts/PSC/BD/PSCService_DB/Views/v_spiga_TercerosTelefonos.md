# View: v_spiga_TercerosTelefonos

## Usa los objetos:
- [[spiga_TercerosTelefonos]]

```sql

CREATE view v_spiga_TercerosTelefonos as
select distinct PkFkTerceros,FkTelefonoTipos,DescripcionTipoTelefono,Numero 
from(
		select distinct orden = row_number() over(partition by pkfkterceros order by  FechaMod desc),
		Pkfkterceros,pktercerotelefonos_iden,fkTelefonoTipos,
		DescripcionTipoTelefono = case	when fkTelefonoTipos = 1 then 'Particular'
										when fkTelefonoTipos = 2 then 'Trabajo'
										when fkTelefonoTipos = 3 then 'Celular'
										when fkTelefonoTipos = 4 then 'Fax'
									else ''
									end, 
		CodigoTelefonico,numero,extension,FechaMod,principal
		from [dbo].[spiga_TercerosTelefonos]	
		where FechaBaja is null
		and principal = 1
		--and Pkfkterceros = '174293' --'270886'
)a where orden = 1
```
