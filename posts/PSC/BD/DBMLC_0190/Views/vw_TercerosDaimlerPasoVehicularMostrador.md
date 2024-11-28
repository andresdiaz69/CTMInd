# View: vw_TercerosDaimlerPasoVehicularMostrador

## Usa los objetos:
- [[vw_ClientesDaimlerMostrador]]
- [[vw_TercerosCorreoUltimaFechaActualizacion]]
- [[vw_TercerosDatosUltimaFechaActualizacion]]

```sql
create view vw_TercerosDaimlerPasoVehicularMostrador as
select distinct TipoPersona	=	case	when d.FkNaturalezaJuridicaTipos = 'GB' then 'Gubernamental'
								when d.FkNaturalezaJuridicaTipos = 'SJ' then 'Persona Juridica'
								when d.FkNaturalezaJuridicaTipos = 'SN'	then 'Persona Natural'
						else 'Revisar Spiga+' end,
TipoIdentificacion =	case	when d.FkDocumentacionTipos = 1 then 'Nit'
								when d.FkDocumentacionTipos = 2 then 'Cedula'
								when d.FkDocumentacionTipos = 3 then 'Tarjeta Extranjeria'
								when d.FkDocumentacionTipos = 4 then 'Pasaporte'
								when d.FkDocumentacionTipos = 5 then 'Rut'
								when d.FkDocumentacionTipos = 6 then 'Tarjeta Identidad'
						else 'Revisar Spiga' end,
Identificacion = v.Nitcliente,
RazonSocial = case when d.FkDocumentacionTipos in (1,5) then  isnull(d.NombreComercial,v.NombreCliente) else '' end,
NombreYApellidos = case when d.FkDocumentacionTipos not in (1,5) then v.NombreCliente else ' ' end,
PersonaContacto = v.NombreCliente,TelefonoPersonaContacto=isnull(d.fijo,d.Celular),
Ciudad=d.Poblacion,Departamento=d.provincia,Direccion,c.email,Telefono1= isnull(d.fijo,d.Celular),Telefono2= '',
Celular1= Celular, Celular2=Celular2
from		vw_ClientesDaimlerMostrador						v
left join	vw_TercerosDatosUltimaFechaActualizacion		d	on	v.Nitcliente = d.NifCif
left join	vw_TercerosCorreoUltimaFechaActualizacion		c	on	d.PkTerceros = c.PkFkTerceros



```
