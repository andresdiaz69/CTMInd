# View: vw_VolumenVentasGerenteMitsubishi

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[ComisionesSpigaVO]]
- [[spiga_RentabilidadDetalladaVehiculosUsados]]

```sql
CREATE  view [dbo].[vw_VolumenVentasGerenteMitsubishi] as
select Ano_Periodo, Mes_Periodo, Ano_Spiga, Mes_Spiga, Codigoempresa, Empresa, CodigoEmpresaSugerido, EmpresaSugerida, CodigoCentro, Centro, CodigoSeccion, Seccion, FechaFactura, 
NumeroFactura, VIN, CodigoMArca, Marca, CodigoGama, Gama, AñoModelo, PrecioVehiculo, PrecioLista, TotalFactura, FechaEntregaCliente, EntregaEfectiva
from(
		select   Ano_Periodo, Mes_Periodo, Ano_Spiga, Mes_Spiga, Codigoempresa, Empresa, CodigoEmpresaSugerido, EmpresaSugerida, CodigoCentro, Centro, CodigoSeccion, Seccion, FechaFactura, 
		NumeroFactura, VIN, CodigoMArca, Marca, CodigoGama, Gama, AñoModelo, PrecioVehiculo, PrecioLista, TotalFactura, FechaEntregaCliente, EntregaEfectiva
		from ComisionesSpigaVN
		where CodigoMArca = 20
		--and EntregaEfectiva = 1
		and CodigoCentro not in (84,136)
		--and vin  in ('MMBGUKS10PH005091','MMBJJKL10PH035145','MMBGUKS10PH004847','MMBJJKL10PH035180','LC0CE4CC9R0000948')
		--and Ano_Spiga = 2023
		--and Mes_Spiga = 6
		union all
		select Ano_Periodo, Mes_Periodo, Ano_Spiga, Mes_Spiga, Codigoempresa, Empresa, CodigoEmpresaSugerido, EmpresaSugerida, CodigoCentro, Centro, CodigoSeccion, Seccion, FechaFactura, 
		NumeroFactura, VIN, CodigoMArca, Marca, CodigoGama, Gama, AñoModelo, PrecioVehiculo, PrecioLista, TotalFactura, FechaEntregaCliente, EntregaEfectiva
		from ComisionesSpigaVN
		where --EntregaEfectiva = 1
		 CodigoCentro in (75,93,104)
		--and Ano_Spiga = 2023
		--and Mes_Spiga = 6
		union all
		select Ano_Periodo, Mes_Periodo, Ano_Spiga, Mes_Spiga, Codigoempresa, Empresa, CodigoEmpresaSugerido, EmpresaSugerida, CodigoCentro, Centro, CodigoSeccion, Seccion, FechaFactura, 
		NumeroFactura, VIN, CodigoMArca, Marca, CodigoGama, Gama, AñoModelo, PrecioVehiculo, PrecioLista, TotalFactura, FechaEntregaCliente, EntregaEfectiva
		from ComisionesSpigaVN
		where --EntregaEfectiva = 1
		CodigoCentro  in (154,155,156,166,167,168,169,170,177,184)
		--and Ano_Spiga = 2023
		--and Mes_Spiga = 6
		union all
		select Ano_Periodo, Mes_Periodo, Ano_Spiga, Mes_Spiga, Codigoempresa, Empresa, CodigoEmpresaSugerido, 
		EmpresaSugerida, CodigoCentro, Centro, CodigoSeccion, Seccion, FechaFactura, NumeroFactura, VIN, CodigoMArca, Marca, CodigoGama, Gama, AñoModelo,
		PrecioVehiculo, PrecioLista, TotalFactura, 
		FechaEntregaCliente, EntregaEfectiva
		from(
				select   v.Ano_Periodo, v.Mes_Periodo, v.Ano_Spiga, v.Mes_Spiga, v.Codigoempresa, v.Empresa, v.CodigoEmpresaSugerido, 
				v.EmpresaSugerida, v.CodigoCentro, v.Centro, v.CodigoSeccion, v.Seccion, v.FechaFactura, v.NumeroFactura, v.VIN, v.CodigoMArca, v.Marca, v.CodigoGama, v.Gama, v.AñoModelo,
				v.CedulaVendedor, v.NombreVendedor, v.Nit, v.nombreTercero, v.PrecioVehiculo, v.PrecioLista, v.ValorDto, v.TotalFactura, 
				v.FechaEntregaCliente, v.EntregaEfectiva,
				IdEmpresas,ImporteCompra,Gastos=sum(ImporteGasto),ImporteVenta,Rentabilidad=(ImporteVenta-(ImporteCompra+sum(ImporteGasto)))/(ImporteCompra+sum(ImporteGasto))*100
				from		ComisionesSpigaVO						v
				left join	[PSCService_DB].dbo.spiga_RentabilidadDetalladaVehiculosUsados	r	on v.Codigoempresa = r.IdEmpresas
																				and v.vin = r.vin
																				and v.Ano_Periodo = r.Ano_Periodo
																				and v.Mes_Periodo = r.Mes_Periodo
				where v.Codigoempresa = 6 
				--and v.EntregaEfectiva = 1
				and v.centro like 'MIT-%'
				and CodigoCentro not in (84,136)
				--and v.Ano_Spiga = 2023
				--and v.Mes_Spiga = 6
				group by   v.Ano_Periodo, v.Mes_Periodo, v.Ano_Spiga, v.Mes_Spiga, v.Codigoempresa, v.Empresa, v.CodigoEmpresaSugerido, v.EmpresaSugerida, v.CodigoCentro, 
				v.Centro, v.CodigoSeccion, v.Seccion, v.FechaFactura, v.NumeroFactura, v.VIN, v.CodigoMArca, v.Marca, v.CodigoGama, v.Gama, v.AñoModelo,
				v.CedulaVendedor, v.NombreVendedor, v.Nit, v.nombreTercero, v.PrecioVehiculo, v.PrecioLista, v.ValorDto, v.TotalFactura, 
				v.FechaEntregaCliente, v.EntregaEfectiva,IdEmpresas,r.vin,ImporteCompra,ImporteVenta
		) a where Rentabilidad > 12
)b
--where Ano_Periodo = 2023
--and Mes_Periodo = 06

```
