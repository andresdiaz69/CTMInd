# View: vw_AsesoresCreditosSeguros_DisminucionBase

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[ComisionesSpigaVO]]
- [[spiga_ComisionesFinanciacion]]
- [[spiga_FacturasCargosAdicionales]]
- [[UnidadDeNegocio_Presentaciones]]
- [[vw_AsesoresCreditosSeguros_Financieras]]

```sql
CREATE view [dbo].[vw_AsesoresCreditosSeguros_DisminucionBase] as
select IdEmpresas,empresa,Año,Mes,BaseImponible = sum(BaseImponible),
NombreMarca,CodigoCentro,centro,
CodPresentacion,ImporteFinanciado=sum(ImporteFinanciado)
from(
	select distinct IdEmpresas,empresa,Año,Mes,BaseImponible = sum(BaseImponible),NombreMarca = case when CodPresentacion = 6 then 'Usados' else NombreMarca end,CodigoCentro,centro,
	u.CodPresentacion,ImporteFinanciado=(sum(ImporteFinanciado)*f.valor)
	from(
		select distinct IdEmpresas,empresa,--Factura,
		Año=year(FechaFactura),Mes=month(FechaFactura),IdTerceros,Nombre,vin,BaseImponible,NombreMarca,CodigoCentro,
		centro,CodigoSeccion,seccion,ImporteFinanciado= (sum(ImporteFinanciado)/1000000)
		from(
			select  distinct a.IdEmpresas,--Factura= a.SerieFactura + '/' + a.NumFactura + '/' + a.AñoFactura,
			a.FechaFactura,		a.IdTerceros,a.Nombre,a.vin,		BaseImponible=sum(a.BaseImponible),a.NombreMarca,
			a.Seccion,f.Marca,f.Empresa,f.CodigoCentro,f.centro,f.CodigoSeccion,c.ImporteFinanciado--= (sum(c.ImporteFinanciado)/1000000)
			from		[PSCService_DB].dbo.spiga_FacturasCargosAdicionales	a
			left join	ComisionesSpigaVN									f	on	a.vin=f.VIN
																					and a.IdEmpresas = f.Codigoempresa
			left join	[PSCService_DB].dbo.spiga_ComisionesFinanciacion	c	on	a.vin=c.vin
																					and a.IdEmpresas = c.IdEmpresas
			where a.IdFacturaCargoAdicionalTipos in (1,19) 
			and a.FechaFactura > '20210331'
			and a.NumVentaVN is not null
			and f.EntregaEfectiva = 1
			and a.IdEmpresas = 1
			--and a.vin like '%219892%'
			group by  a.IdEmpresas,--a.SerieFactura,a.NumFactura,a.AñoFactura,
			a.FechaFactura,a.IdTerceros,a.Nombre,a.vin,a.NombreMarca,a.Seccion,f.Marca,f.Empresa,f.CodigoCentro,f.centro,f.CodigoSeccion,c.ImporteFinanciado

			union all 

			select  distinct a.IdEmpresas,--Factura= a.SerieFactura + '/' + a.NumFactura + '/' + a.AñoFactura,
			a.FechaFactura,a.IdTerceros,a.Nombre,a.vin,BaseImponible=sum(a.BaseImponible),a.NombreMarca,a.Seccion,	f.Marca,f.Empresa,
			f.CodigoCentro,f.centro,f.CodigoSeccion,c.ImporteFinanciado	--= (sum(c.ImporteFinanciado)/1000000)
			from		[PSCService_DB].dbo.spiga_FacturasCargosAdicionales	a
			left join	ComisionesSpigaVO									f	on	a.vin=f.VIN
																					and a.IdEmpresas = f.Codigoempresa
			left join	[PSCService_DB].dbo.spiga_ComisionesFinanciacion	c	on	a.vin=c.vin
																					and a.IdEmpresas = c.IdEmpresas
			where a.IdFacturaCargoAdicionalTipos in (1,19) 
			and a.NumVentaVO is not null
			and a.FechaFactura > '20210331'
			and f.EntregaEfectiva = 1
			and a.IdEmpresas = 1
			--and a.vin like '%219892%'
			group by  a.IdEmpresas,--a.SerieFactura,a.NumFactura,a.AñoFactura,
			a.FechaFactura,a.IdTerceros,a.Nombre,a.vin,a.NombreMarca,a.Seccion,f.Marca,f.Empresa,f.CodigoCentro,f.centro,f.CodigoSeccion,c.ImporteFinanciado

			union all

			select  distinct a.IdEmpresas,--Factura= a.SerieFactura + '/' + a.NumFactura + '/' + a.AñoFactura,
			a.FechaFactura,a.IdTerceros,a.Nombre,a.vin,BaseImponible=sum(a.BaseImponible),a.NombreMarca,a.Seccion,f.Marca,f.Empresa,
			f.CodigoCentro,f.centro,f.CodigoSeccion,c.ImporteFinanciado	--ImporteFinanciado= (sum(c.ImporteFinanciado)/1000000)
			from		[PSCService_DB].dbo.spiga_FacturasCargosAdicionales	a
			left join	ComisionesSpigaVN									f	on	a.vin=f.VIN
																					and a.IdEmpresas = f.Codigoempresa
			left join	[PSCService_DB].dbo.spiga_ComisionesFinanciacion	c	on	a.vin=c.vin
																					and a.IdEmpresas = c.IdEmpresas
			where a.IdFacturaCargoAdicionalTipos in (9,14)
			and a.FechaFactura > '20210331'
			and a.NumVentaVN is not null
			and f.EntregaEfectiva = 1
			and a.IdEmpresas = 6
			--and (a.vin like '%219892%' or a.vin like '%963371%') 
			group by  a.IdEmpresas,--a.SerieFactura,a.NumFactura,a.AñoFactura,
			a.FechaFactura,a.IdTerceros,a.Nombre,a.vin,a.NombreMarca,a.Seccion,f.Marca,f.Empresa,f.CodigoCentro,f.centro,f.CodigoSeccion,c.ImporteFinanciado

			union all 

			select  distinct a.IdEmpresas,--Factura= a.SerieFactura + '/' + a.NumFactura + '/' + a.AñoFactura,
			a.FechaFactura,a.IdTerceros,a.Nombre,a.vin,BaseImponible=sum(a.BaseImponible),a.NombreMarca,a.Seccion,f.Marca,f.Empresa,
			f.CodigoCentro,f.centro,f.CodigoSeccion,c.ImporteFinanciado	--= (sum(c.ImporteFinanciado)/1000000)
			from		[PSCService_DB].dbo.spiga_FacturasCargosAdicionales	a
			left join	ComisionesSpigaVO									f	on	a.vin=f.VIN
																					and a.IdEmpresas = f.Codigoempresa
			left join	[PSCService_DB].dbo.spiga_ComisionesFinanciacion	c	on	a.vin=c.vin
																					and a.IdEmpresas = c.IdEmpresas
			where a.IdFacturaCargoAdicionalTipos in (9,14)
			and a.NumVentaVO is not null
			and a.FechaFactura > '20210331'
			and f.EntregaEfectiva = 1
			and a.IdEmpresas = 6
			--and a.vin like '%219892%'
			group by  a.IdEmpresas,--a.SerieFactura,a.NumFactura,a.AñoFactura,
			a.FechaFactura,a.IdTerceros,a.Nombre,a.vin,a.NombreMarca,a.Seccion,f.Marca,f.Empresa,f.CodigoCentro,f.centro,f.CodigoSeccion,c.ImporteFinanciado
		)c
		group by IdEmpresas,empresa,year(FechaFactura),month(FechaFactura),IdTerceros,Nombre,vin,BaseImponible,NombreMarca,CodigoCentro,
		centro,CodigoSeccion,seccion
	)d  join		vw_AsesoresCreditosSeguros_Financieras		f	on	d.IdTerceros = f.codigotercero
																	and d.idempresas = f.Codigoempresa
		left join	(select distinct Codempresa,Codcentro,CodPresentacion 
					from UnidadDeNegocio_Presentaciones)		u	on	d.IdEmpresas = u.CodEmpresa
																	and d.CodigoCentro = u.CodCentro	
	--where año = 2023
	--and mes=3
--	and CodPresentacion = 6
	group by IdEmpresas,empresa,Año,Mes,NombreMarca,CodigoCentro,centro,u.CodPresentacion,f.valor
)e group by IdEmpresas,empresa,Año,Mes,NombreMarca,CodigoCentro,centro,
CodPresentacion

```
