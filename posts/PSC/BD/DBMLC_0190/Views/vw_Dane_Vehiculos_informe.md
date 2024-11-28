# View: vw_Dane_Vehiculos_informe

## Usa los objetos:
- [[CentrosMunicipios]]
- [[DaneGamas]]
- [[DaneVehiculosOrigen]]
- [[Empresas]]
- [[spiga_PUC]]
- [[Tramite_Ciudades]]
- [[Tramite_Departamentos]]
- [[vw_Dane_Vehiculos_Datos]]
- [[vw_Dane_Vehiculos_IngresosNeto]]
- [[vw_Terceros_Registro_Unico]]

```sql
CREATE view [dbo].[vw_Dane_Vehiculos_informe]  as
SELECT DISTINCT  ano=YEAR (n.FechaAsiento),mes=MONTH(n.FechaAsiento),a.NombreEmpresa, n.IdEmpresas, n.cuenta,b.Nombre, n.FechaAsiento, n.NumeroAsiento, n.concepto, n.referencia, n.Debito, n.Credito, n.saldo, n.Descuento, 
n.IngresoNeto, n.IngresoDane, n.CodigoTercero,NombreTercero = r.nombre, n.Departamento, n.NombreDepartamento, n.Centro, n.NombreCentro, n.Seccion, 
n.NombreSeccion, n.Marca, n.NombreMarca,v.gama,n.ExpedienteConciliacion, n.FacturaConciliacion,v.canalventa,v.PerfilCliente,v.TipoVentamarca,
v.numdocumentopropietario,NombrePropietario = isnull(s.nombre,x.nombre),Ciudad=z.descripcion,g.ClaseVehiculo,o.OrigenVehiculo,
cantidad = case when n.IngresoNeto < 0 then -1 else 1 end
from		vw_Dane_Vehiculos_IngresosNeto	n
left join	vw_Terceros_Registro_Unico	    t	on	n.codigotercero = t.PkTerceros
left join	vw_Dane_Vehiculos_Datos			v	on	n.referencia = v.vin and t.nifcif = v.nit

left join	vw_Terceros_Registro_Unico		s	on	v.numdocumentopropietario = s.nifcif and s.PkTerceros = n.CodigoTercero

left join	vw_Terceros_Registro_Unico	    x	on	v.numdocumentopropietario = x.nifcif 

left join	vw_Terceros_Registro_Unico		r	on	n.CodigoTercero = r.PkTerceros

join		CentrosMunicipios				e	on	n.IdEmpresas = e.CodigoEmpresa
													and n.centro = e.CodigoCentro
join		Tramite_Departamentos			y	on e.CodigoDepartamento = y.departamento
join		Tramite_Ciudades				z	on e.CodigoDepartamento = z.departamento and e.CodigoCiudad = z.Ciudad 
left join	DaneGamas						g	on v.codigogama = g.codigogama and g.codigomarca = n.marca
left join	DaneVehiculosOrigen				o	on n.marca = o.Codigomarca
LEFT JOIN   Empresas						a   on n.IdEmpresas = a.CodigoEmpresa
left join   [PSCService_DB].dbo.spiga_PUC                   b   on n.cuenta = b.CodigoCuenta
collate greek_ci_as  where canalventa is not null
-- n.referencia = 'JLCB1H633KK001760'--498
--and Idempresas = 1
--and year(n.FechaAsiento)=2023
--and month(n.FechaAsiento)=6
--order by 17

```
