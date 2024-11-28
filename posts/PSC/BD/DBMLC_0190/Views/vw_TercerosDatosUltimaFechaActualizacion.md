# View: vw_TercerosDatosUltimaFechaActualizacion

## Usa los objetos:
- [[vw_TercerosCelular2UltimaFechaActualizacion]]
- [[vw_TercerosCelularUltimaFechaActualizacion]]
- [[vw_TercerosDireccionesUltimaFechaActualizacion]]
- [[vw_TercerosTelefonoFijoUltimaFechaActualizacion]]
- [[vw_TercerosUltimaFechaActualizacion]]

```sql

CREATE view  [dbo].[vw_TercerosDatosUltimaFechaActualizacion] as
select ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY NifCif)) AS INT),0) AS Id, NifCif,PkTerceros,FkNaturalezaJuridicaTipos,TipoContribuyente,FkDocumentacionTipos,NombreComercial,
	nombre,Apellido1,Apellido2,fijo,celular,Celular2,Direccion,Poblacion,Provincia
from 
(
	select t.NifCif,t.PkTerceros,t.FkNaturalezaJuridicaTipos,t.TipoContribuyente,FkDocumentacionTipos,t.NombreComercial,
		t.nombre,t.Apellido1,t.Apellido2,f.fijo,celular=c.numero,Celular2=c2.celular,
		Direccion = d.FkCalleTipos + ' ' + isnull(d.NombreCalle,'') + ' ' + isnull(d.numero,'') + isnull(d.Bloque,'') 
		+ ' ' + isnull(d.piso,'') + isnull(d.puerta,'') + isnull(d.Complemento,' '),
		d.Poblacion,d.Provincia
	from		[dbo].[vw_TercerosUltimaFechaActualizacion]			t
	left join	vw_TercerosTelefonoFijoUltimaFechaActualizacion		f	on	t.PkTerceros = f.pkfkterceros
	left join	vw_TercerosCelularUltimaFechaActualizacion			c	on	t.PkTerceros = c.PkFkTerceros
	left join	vw_TercerosCelular2UltimaFechaActualizacion			c2	on	t.PkTerceros = c2.pkfkterceros
	left join	vw_TercerosDireccionesUltimaFechaActualizacion		d	on	t.PkTerceros = d.PkFkTerceros
) a

```
