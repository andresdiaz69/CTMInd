# View: vw_Dane_Vehiculos_Datos

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[ComisionesSpigaVO]]
- [[spiga_TipoDeVentasVehiculos]]
- [[vw_vehiculosPropietario]]

```sql
CREATE  view [dbo].[vw_Dane_Vehiculos_Datos] as
select distinct v.FechaEntregaCliente,v.vin,v.NumeroFactura,v.CodigoGama,v.gama,v.CodigoModelo,v.AñoModelo,v.modelo,v.Nit,v.nombreTercero,
t.Expediente,CanalVenta=t.TipoVenta,t.PerfilCliente,t.TipoVentaMarca,p.numdocumentopropietario
from		ComisionesSpigaVN	v
left join	[PSCService_DB].dbo.spiga_TipoDeVentasVehiculos	t	on	v.vin = t.VIN and v.NumeroFactura = t.Factura
left join	[PSCService_DB].dbo.vw_vehiculosPropietario		p	on	t.vin = p.vin
--where v.vin = '1FUJHTDV7LLLX3312'

UNION ALL

select distinct v.FechaEntregaCliente,v.vin,v.NumeroFactura,v.CodigoGama,v.gama,v.CodigoModelo,v.AñoModelo,v.modelo,v.Nit,v.nombreTercero,
t.Expediente,CanalVenta=t.TipoVenta,t.PerfilCliente,t.TipoVentaMarca,p.numdocumentopropietario
from		ComisionesSpigaVO	v
left join	[PSCService_DB].dbo.spiga_TipoDeVentasVehiculos	t	on	v.vin = t.VIN and v.NumeroFactura = t.Factura
left join	[PSCService_DB].dbo.vw_vehiculosPropietario		p	on	t.vin = p.vin



```
