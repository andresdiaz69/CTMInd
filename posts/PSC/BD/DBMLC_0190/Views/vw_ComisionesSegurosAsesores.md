# View: vw_ComisionesSegurosAsesores

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[ComisionesSpigaVO]]
- [[spiga_Empleados]]
- [[spiga_FacturasCargosAdicionales]]
- [[spiga_VehiculosSeguros]]
- [[vw_TercerosUltimaFechaActualizacion]]

```sql

CREATE view [dbo].[vw_ComisionesSegurosAsesores] as
select distinct Ano_Periodo,Mes_Periodo,IdEmpresas,NombreEmpresa,IdCentros,NombreCentro,VIN,
NitAliadoSeguros,NombreAliadoSeguros,CedulaVendedor,NombreVendedor,IdMarcas,NombreMarca,
Importe = case when BaseImponible > 0 then Importe else (Importe * -1) end,Factura,IdTerceros,
nombre,BaseImponible,TotalFactura
from(
		select distinct f.Ano_Periodo,f.Mes_Periodo,f.IdEmpresas,NombreEmpresa= isnull(v.Empresa,o.empresa),
		IdCentros=isnull(v.CodigoCentro,o.CodigoCentro),NombreCentro=isnull(v.Centro,o.centro),
		f.VIN,NitAliadoSeguros=e.NifCif,NombreAliadoSeguros=s.NombreEmpleado,
		CedulaVendedor=isnull(v.CedulaVendedor,o.CedulaVendedor),NombreVendedor=isnull(v.NombreVendedor,o.NombreVendedor),
		s.IdMarcas,f.NombreMarca,s.importe,Factura= f.SerieFactura + '/' + f.NumFactura + '/' + f.AñoFactura,
		f.IdTerceros,f.nombre,f.BaseImponible,f.TotalFactura
		from		[PSCService_DB].dbo.spiga_FacturasCargosAdicionales	f
		left join	[PSCService_DB].dbo.spiga_VehiculosSeguros			s	on	f.vin = s.vin
		left join	vw_TercerosUltimaFechaActualizacion					t	on	s.IdTerceros = t.PkTerceros
		left join	[PSCService_DB].dbo.spiga_Empleados					e	on	s.NombreEmpleado = e.Nombre
																				and e.FechaBaja is null
																				and e.Ano_Periodo = year(getdate())
																				and e.Mes_Periodo = month(getdate())
		left join	ComisionesSpigaVN									v	on	v.vin = s.vin
																				and s.NifCif = v.Nit
		left join	ComisionesSpigaVO									o	on	o.vin = s.vin
																				and s.NifCif = o.Nit
		where (f.IdFacturaCargoAdicionalTipos in (2,9) and f.IdEmpresas = 1)
		and s.IdSeguroTipos = 4
		and s.FechaBaja is null
		--and s.vin = '9FBHSR595LM365181'
		--and f.Ano_Periodo = 2022
		--and f.Mes_Periodo = 5
		AND (f.Ano_Periodo >= 2022) -- JCS: FILTRO PARA MEJORAR EL PERFORMANCE

		union all

		select distinct f.Ano_Periodo,f.Mes_Periodo,f.IdEmpresas,NombreEmpresa= isnull(v.Empresa,o.empresa),
		IdCentros=isnull(v.CodigoCentro,o.CodigoCentro),NombreCentro=isnull(v.Centro,o.centro),
		f.VIN,NitAliadoSeguros=e.NifCif,NombreAliadoSeguros=s.NombreEmpleado,
		CedulaVendedor=isnull(v.CedulaVendedor,o.CedulaVendedor),NombreVendedor=isnull(v.NombreVendedor,o.NombreVendedor),
		s.IdMarcas,f.NombreMarca,s.importe,Factura= f.SerieFactura + '/' + f.NumFactura + '/' + f.AñoFactura,
		f.IdTerceros,f.nombre,f.BaseImponible,f.TotalFactura
		from		[PSCService_DB].dbo.spiga_FacturasCargosAdicionales	f
		left join	[PSCService_DB].dbo.spiga_VehiculosSeguros			s	on	f.vin = s.vin
		left join	vw_TercerosUltimaFechaActualizacion					t	on	s.IdTerceros = t.PkTerceros
		left join	[PSCService_DB].dbo.spiga_Empleados					e	on	s.NombreEmpleado = e.Nombre
																				and e.FechaBaja is null
																				and e.Ano_Periodo = year(getdate())
																				and e.Mes_Periodo = month(getdate())
		left join	ComisionesSpigaVN									v	on	v.vin = s.vin
																				and s.NifCif = v.Nit
		left join	ComisionesSpigaVO									o	on	o.vin = s.vin
																				and s.NifCif = o.Nit
		where (f.IdFacturaCargoAdicionalTipos in (10,15) and f.IdEmpresas = 6)
		and s.IdSeguroTipos = 4
		and s.FechaBaja is null
		--and s.vin = '9FBHSR595LM365181'
		--and f.Ano_Periodo = 2022
		--and f.Mes_Periodo = 5
		AND (f.Ano_Periodo >= 2022) -- JCS: FILTRO PARA MEJORAR EL PERFORMANCE
)a 

```
