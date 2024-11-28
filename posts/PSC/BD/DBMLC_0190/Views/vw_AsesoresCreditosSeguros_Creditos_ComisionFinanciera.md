# View: vw_AsesoresCreditosSeguros_Creditos_ComisionFinanciera

## Usa los objetos:
- [[spiga_ComisionesFinanciacion]]
- [[spiga_FacturasCargosAdicionales]]

```sql
create view vw_AsesoresCreditosSeguros_Creditos_ComisionFinanciera as
select * 
from (
		select orden = ROW_NUMBER() over (partition by f.vin order by a.fechafactura desc),
		f.Ano_Periodo,f.Mes_Periodo,f.IdEmpresas,f.NombreEmpresa,f.IdCentros,f.NombreCentro,f.vin,
		f.IdTercerosFinanciera,f.NombreFinanciera,f.IdEmpleados,f.NombreEmpleado,
		f.IdMarcas,f.NombreMarca,f.idempleadosgestor,f.NombreGestor,f.ImporteFinanciado,
		Factura= a.SerieFactura + '/' + a.NumFactura + '/' + a.AñoFactura,a.IdTerceros,a.nombre,a.BaseImponible,a.TotalFactura
		from		[PSCService_DB].dbo.spiga_ComisionesFinanciacion	f
		left join	[PSCService_DB].dbo.spiga_FacturasCargosAdicionales	a	on	f.vin=a.vin 
		where f.IdEmpresas = 1
		and f.estado like '%cancelado%'
		and f.ImporteFinanciado > 0
		and f.FechaInicio > '20210331'
		and a.IdTerceros in ('265353','19352')
		and a.IdFacturaCargoAdicionalTipos in (1,19)

		union all

		select orden = ROW_NUMBER() over (partition by f.vin order by a.fechafactura desc),
		f.Ano_Periodo,f.Mes_Periodo,f.IdEmpresas,f.NombreEmpresa,f.IdCentros,f.NombreCentro,f.vin,
		f.IdTercerosFinanciera,f.NombreFinanciera,f.IdEmpleados,f.NombreEmpleado,
		f.IdMarcas,f.NombreMarca,f.idempleadosgestor,f.NombreGestor,f.ImporteFinanciado,
		Factura= a.SerieFactura + '/' + a.NumFactura + '/' + a.AñoFactura,a.IdTerceros,a.nombre,a.BaseImponible,a.TotalFactura
		from		[PSCService_DB].dbo.spiga_ComisionesFinanciacion	f
		left join	[PSCService_DB].dbo.spiga_FacturasCargosAdicionales	a	on	f.vin=a.vin 
		where f.IdEmpresas = 6 
		and f.estado like '%cancelado%'
		and f.ImporteFinanciado > 0
		and f.FechaInicio > '20210331'
		and a.IdTerceros in ('265353','19352')
		and a.IdFacturaCargoAdicionalTipos in (9,14)
) a
```
