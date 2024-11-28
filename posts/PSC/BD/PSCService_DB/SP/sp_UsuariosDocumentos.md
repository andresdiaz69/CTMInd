# Stored Procedure: sp_UsuariosDocumentos

## Usa los objetos:
- [[asientos]]
- [[Empleados]]
- [[terceros]]

```sql
CREATE procedure [dbo].[sp_UsuariosDocumentos] 
(
	@FechaInferior datetime,
	@FechaSuperior datetime
)
as

select distinct PkFkempresas,FkSeries,NumFactura,AñoFactura,CodigoTercero=t1.FkTerceros,CedulaEmpleado=t3.NifCif,
t3.Nombre+isnull(' '+t3.apellido1,'')+isnull(' '+t3.apellido2,'') nombre,Año=year(t1.FechaAsiento),Mes=month(t1.FechaAsiento) 
from		[192.168.90.10\SPIGAPLUS].DMS00280.fi.asientos t1
left join	[192.168.90.10\SPIGAPLUS].DMS00280.rh.Empleados t2		on	t2.fkusuarios=t1.useralta
left join	[192.168.90.10\SPIGAPLUS].DMS00280.cm.terceros t3		on	t3.PkTerceros=t2.FkTerceros
where PkFkEmpresas in (1,5,6,22,24,27)
and FechaAsiento >=		@FechaInferior
and FechaAsiento <=		@FechaSuperior
and FkSeries is not null
and NumFactura is not null
```
