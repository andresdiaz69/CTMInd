# View: vw_VolumenVentasJefeVentasCali

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[ComisionesSpigaVO]]
- [[spiga_RentabilidadDetalladaVehiculosUsados]]

```sql
CREATE  view [dbo].[vw_VolumenVentasJefeVentasCali] as
select Ano_Periodo, Mes_Periodo, Ano_Spiga, Mes_Spiga, Codigoempresa, Empresa, CodigoEmpresaSugerido, EmpresaSugerida, 
CodigoCentro, Centro, CodigoSeccion, Seccion, FechaFactura,NumeroFactura, VIN, CodigoMArca, Marca, CodigoGama, Gama, 
AñoModelo, PrecioVehiculo, PrecioLista, TotalFactura, FechaEntregaCliente, EntregaEfectiva
from(
		select   Ano_Periodo, Mes_Periodo, Ano_Spiga, Mes_Spiga, Codigoempresa, Empresa, CodigoEmpresaSugerido, 
		EmpresaSugerida, CodigoCentro, Centro, CodigoSeccion, Seccion, FechaFactura, NumeroFactura, VIN, CodigoMArca, 
		Marca, CodigoGama, Gama, AñoModelo, PrecioVehiculo, PrecioLista, TotalFactura, FechaEntregaCliente, 
		EntregaEfectiva
		from ComisionesSpigaVN
		where EntregaEfectiva = 1
		--and CodigoCentro in (103,104,156)
		--and Ano_Spiga = 2022
		--and Mes_Spiga = 4
		union all
		select Ano_Periodo, Mes_Periodo, Ano_Spiga, Mes_Spiga, Codigoempresa, Empresa, CodigoEmpresaSugerido, 
		EmpresaSugerida, CodigoCentro, Centro, CodigoSeccion, Seccion, FechaFactura, NumeroFactura, VIN, CodigoMArca, 
		Marca, CodigoGama, Gama, AñoModelo,PrecioVehiculo, PrecioLista, TotalFactura, FechaEntregaCliente, EntregaEfectiva
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
				and v.EntregaEfectiva = 1
				--and CodigoCentro in (103,104,156)
				--and v.Ano_Spiga = 2021
				group by   v.Ano_Periodo, v.Mes_Periodo, v.Ano_Spiga, v.Mes_Spiga, v.Codigoempresa, v.Empresa, v.CodigoEmpresaSugerido, v.EmpresaSugerida, v.CodigoCentro, 
				v.Centro, v.CodigoSeccion, v.Seccion, v.FechaFactura, v.NumeroFactura, v.VIN, v.CodigoMArca, v.Marca, v.CodigoGama, v.Gama, v.AñoModelo,
				v.CedulaVendedor, v.NombreVendedor, v.Nit, v.nombreTercero, v.PrecioVehiculo, v.PrecioLista, v.ValorDto, v.TotalFactura, 
				v.FechaEntregaCliente, v.EntregaEfectiva,IdEmpresas,r.vin,ImporteCompra,ImporteVenta
		) a where Rentabilidad > 12
)b 
--where Ano_Spiga = 2022
--and Mes_Spiga = 4

--where vin in
--('MEC0574P9NP053143',
--'MMBGUKR50PH000201',
--'MMBJJKL10PH000668'
--)

--('MEC0574P9NP053143')
--'MEC0574P9NP053093',
--'JLCBBE626NK000836',
--'JLCBBE626NK000836')
--order by vin

```
