# View: v_SafariII_20Oct2022

## Usa los objetos:
- [[CentrosDirecciones]]
- [[CentrosMunicipios]]
- [[ComisionesSpigaVNFechaFactura]]
- [[spiga_Terceros]]
- [[Tramite_Ciudades]]
- [[Tramite_Departamentos]]
- [[vw_Spiga_ModelosVehiculos]]
- [[vw_TercerosCelularUltimaFechaActualizacion]]
- [[vw_TercerosDireccionesUltimaFechaActualizacion]]
- [[vw_vehiculos_Cilindraje]]

```sql

create view [dbo].[v_SafariII_20Oct2022] as 
select distinct v.Codigoempresa,v.empresa,v.NumeroFactura,v.FechaFactura,Pais='Colombia',VitrinaDepartamento=d.descripcion,
VitrinaCiudad=t.descripcion,DireccionDeVenta=c.Direccion,VitrinaVenta=v.Centro,v.VIN,v.CodigoModelo,NombreModelo=v.modelo,v.AñoModelo,
v.PrecioVehiculo,v.PrecioLista,ValorDescuento=v.ValorDto,v.ImporteImpuestos,v.TotalFactura,NombreDelCliente=v.nombreTercero,TelefonoDelCliente=f.numero,
--DireccionDelCliente=e.direccion,
DireccionDelCliente = isnull(convert(varchar, e.FkCalleTipos),'') + ' ' + isnull(convert(varchar,e.NombreCalle),'') 
+ ' ' + isnull(convert(varchar,e.numero),''),
CiudadCliente=e.Poblacion,DepartamentoCliente=e.provincia,h.Cilindrada,o.NombreClasificacion,
o.cantidadPasajeros,o.CapacidadDeCarga
from		[DBMLC_0190].dbo.ComisionesSpigaVNFechaFactura		v
left join	[DBMLC_0190].dbo.CentrosDirecciones					c	on	v.CodigoCentro = c.CodigoCentro
left join	[DBMLC_0190].dbo.CentrosMunicipios					m	on	v.CodigoCentro = m.CodigoCentro
																		and v.Codigoempresa = m.CodigoEmpresa
left join	[DBMLC_0190].dbo.Tramite_Departamentos				d	on	m.CodigoDepartamento = d.departamento
left join	[DBMLC_0190].dbo.Tramite_Ciudades					t	on	m.CodigoCiudad =t.Ciudad and m.CodigoDepartamento = t.departamento
left join	spiga_Terceros										s	on	v.nit = s.NifCif and s.FechaBaja is null
left join	[DBMLC_0190].dbo.vw_TercerosCelularUltimaFechaActualizacion			f	on	s.PkTerceros = f.PkFkTerceros
left join	[DBMLC_0190].dbo.vw_TercerosDireccionesUltimaFechaActualizacion		e	on	s.PkTerceros = e.PkFkTerceros
left join	[DBMLC_0190].dbo.vw_vehiculos_Cilindraje			h	on	h.vin = v.VIN	
left join	vw_Spiga_ModelosVehiculos							o	on	v.CodigoModelo COLLATE DATABASE_DEFAULT =  o.PkCodModelo
																		and o.PkAñoModelo COLLATE DATABASE_DEFAULT = v.AñoModelo
where v.Ano_Periodo = 2022
and v.Mes_Periodo = 9
--and v.NumeroFactura = '184/1051/2021'
--ORDER BY v.NumeroFactura
--1661

```
