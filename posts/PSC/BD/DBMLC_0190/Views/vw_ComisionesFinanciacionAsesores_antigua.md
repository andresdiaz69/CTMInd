# View: vw_ComisionesFinanciacionAsesores_antigua

## Usa los objetos:
- [[spiga_ComisionesFinanciacion]]
- [[spiga_FacturasCargosAdicionales]]

```sql
create view [dbo].[vw_ComisionesFinanciacionAsesores_antigua] as
select Ano_Periodo,Mes_Periodo,IdEmpresas,NombreEmpresa,IdCentros,NombreCentro,vin,IdTercerosFinanciera,
NombreFinanciera,IdEmpleados,NombreEmpleado,IdMarcas,NombreMarca,idempleadosgestor,NombreGestor,
ImporteFinanciado = case when BaseImponible > 0 then ImporteFinanciado else (ImporteFinanciado * -1) end,
Factura,IdTerceros,nombre,BaseImponible,TotalFactura--,valorpago
from (
		select --Ano_Periodo=year(c.FechaCobroPago),Mes_Periodo=month(c.FechaCobroPago),
		Ano_Periodo=year(FechaFactura),Mes_Periodo=month(FechaFactura),
		a.IdEmpresas,NombreEmpresa,IdCentros,a.NombreCentro,a.vin,IdTercerosFinanciera,
		NombreFinanciera,IdEmpleados,NombreEmpleado,IdMarcas,NombreMarca,idempleadosgestor,NombreGestor,
		ImporteFinanciado, 
		--= case when BaseImponible > 0 then ImporteFinanciado else (ImporteFinanciado * -1) end,
		a.Factura,a.IdTerceros,nombre,BaseImponible,a.TotalFactura--,c.ValorPago
		from(
				select 	Ano_Periodo,Mes_Periodo,IdEmpresas,NombreEmpresa,IdCentros,NombreCentro,vin,
						IdTercerosFinanciera,NombreFinanciera,IdEmpleados,NombreEmpleado,
						IdMarcas,NombreMarca,idempleadosgestor,NombreGestor,ImporteFinanciado,
						Factura,IdTerceros,nombre,BaseImponible,TotalFactura,fechafactura
				from(							
						select orden = ROW_NUMBER() over (partition by f.vin order by a.fechafactura,f.fechaEntregaCliente desc),
						f.Ano_Periodo,f.Mes_Periodo,f.IdEmpresas,f.NombreEmpresa,f.IdCentros,f.NombreCentro,f.vin,
						IdTercerosFinanciera=a.IdTerceros,NombreFinanciera=a.Nombre,f.IdEmpleados,f.NombreEmpleado,Fechafactura,
						f.IdMarcas,f.NombreMarca,f.idempleadosgestor,f.NombreGestor,f.ImporteFinanciado,
						Factura= a.SerieFactura + '/' + a.NumFactura + '/' + a.AñoFactura,a.IdTerceros,a.nombre,
						a.BaseImponible,a.TotalFactura
						from		[PSCService_DB].dbo.spiga_ComisionesFinanciacion	f
						left join	[PSCService_DB].dbo.spiga_FacturasCargosAdicionales	a	on	f.vin=a.vin 
																								--and f.IdTercerosFinanciera = a.IdTerceros
						where f.IdEmpresas = 1
						--and f.estado like '%cancelado%'
						and f.ImporteFinanciado > 0
						and f.FechaInicio > '20210331'
						and a.IdFacturaCargoAdicionalTipos in (1,19)
						and a.vin like '%8AWBJ6B23NA816475%'
				)s	where orden = 1
		) a	--left join	vw_ComisionesFinanciacionAsesoresPagos	c	on	a.factura=c.Factura
		--where a.vin like '%903985%'
		---where year(FechaFactura) = 2022 and month(FechaFactura) = 3
		
		union all

		select --Ano_Periodo=year(c.FechaCobroPago),Mes_Periodo=month(c.FechaCobroPago),
		Ano_Periodo=year(FechaFactura),Mes_Periodo=month(FechaFactura),
		a.IdEmpresas,NombreEmpresa,IdCentros,a.NombreCentro,a.vin,IdTercerosFinanciera,
		NombreFinanciera,IdEmpleados,NombreEmpleado,IdMarcas,NombreMarca,idempleadosgestor,NombreGestor,
		ImporteFinanciado,
		--= case when BaseImponible > 0 then ImporteFinanciado else (ImporteFinanciado * -1) end,
		a.Factura,a.IdTerceros,nombre,BaseImponible,a.TotalFactura--,c.ValorPago
		from(
				select 	Ano_Periodo,Mes_Periodo,IdEmpresas,NombreEmpresa,IdCentros,NombreCentro,vin,
						IdTercerosFinanciera,NombreFinanciera,IdEmpleados,NombreEmpleado,
						IdMarcas,NombreMarca,idempleadosgestor,NombreGestor,ImporteFinanciado,
						Factura,IdTerceros,nombre,BaseImponible,TotalFactura,Fechafactura
				from(		
						select orden = ROW_NUMBER() over (partition by f.vin order by a.fechafactura,f.fechaEntregaCliente desc),
						f.Ano_Periodo,f.Mes_Periodo,f.IdEmpresas,f.NombreEmpresa,f.IdCentros,f.NombreCentro,f.vin,
						IdTercerosFinanciera=a.IdTerceros,NombreFinanciera=a.Nombre,f.IdEmpleados,f.NombreEmpleado,
						f.IdMarcas,f.NombreMarca,f.idempleadosgestor,f.NombreGestor,f.ImporteFinanciado,
						Factura= a.SerieFactura + '/' + a.NumFactura + '/' + a.AñoFactura,a.IdTerceros,a.nombre,a.BaseImponible,a.TotalFactura,
						a.FechaFactura
						from		[PSCService_DB].dbo.spiga_ComisionesFinanciacion	f
						left join	[PSCService_DB].dbo.spiga_FacturasCargosAdicionales	a	on	f.vin=a.vin 
																								--and f.IdTercerosFinanciera = a.IdTerceros
						where f.IdEmpresas = 6 
						--and f.estado like '%cancelado%'
						and f.ImporteFinanciado > 0
						and f.FechaInicio > '20210331'
						and a.IdFacturaCargoAdicionalTipos in (9,14)
						--and f.vin = 'LC0CE4DC1M0000093'
				)s where orden = 1
		) a	--left join	vw_ComisionesFinanciacionAsesoresPagos	c	on	a.factura=c.Factura
)b 
where --(ValorPago )>= (TotalFactura - 1000)
--and vin like '%903985%'
Ano_Periodo = 2022
and Mes_Periodo = 5
--and NombreEmpleado like '%valencia%'
--and factura = '501/1467/2021'

```
