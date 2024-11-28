# View: v_SeguimientoFacturasPagos

## Usa los objetos:
- [[extraeNumeros]]
- [[spiga_ImpuestosImportes]]
- [[spiga_ImpuestosRetenciones]]
- [[spiga_PagosCobros]]

```sql
create view v_SeguimientoFacturasPagos as
select	b.IdEmpresas,b.NombreTercero,NIt = case when len(Nit) = 10 then substring(nit,1,9) else nit end,b.IdTerceros,b.factura,b.serie,b.numero,b.Ano,
FechaFactura,FechaCobroPago=max(b.FechaCobroPago),b.DescripcionMoneda,Estado,ValorCancelado=sum(b.ValorCancelado),ValorEfecto=sum(b.ValorEfecto),IVA=SUM(b.IVA),RetencionIca,RetencionIva,RetencionFuente
from(
	select a.IdEmpresas,a.NombreTercero,Nit=dbo.extraeNumeros(i.NifCif),a.IdTerceros,a.factura,a.serie,a.numero,a.Ano,i.FechaFactura,a.FechaCobroPago,
	a.DescripcionMoneda,Estado=isnull(a.SituacionEfecto,a.DescripcionSituacionEfectos),a.ValorCancelado,a.ValorEfecto,
	IVA = ISNULL(i.Cuota,0),RetencionIca = ISNULL(r.cuota,0),RetencionIva = ISNULL(t.Cuota,0),RetencionFuente=isnull(fte.cuota,0)
	from(
		select p.IdEmpresas,p.NombreTercero , p.Factura,p.ImporteMonedaEfecto,IdTerceros=p.CodTercero ,p.SituacionEfecto,
		substring(p.Factura,1,charindex('/',p.Factura,1)-1) serie,
		substring(p.Factura,(charindex('/',p.Factura,1)+1),(charindex('/',p.factura,((charindex('/',p.Factura,1))+1)) )-(charindex('/',p.Factura,1))-1) Numero,
		RIGHT(p.Factura,charindex('/',REVERSE(p.Factura))-1) Ano,
		p.FechaCobroPago,DescripcionMoneda=p.MonedaEfecto,DescripcionSituacionEfectos=p.SituacionEfecto,p.ValorCancelado,p.ValorEfecto
		from		[PSCService_DB].[dbo].spiga_PagosCobros					p		
		--where p.IdEmpresas = 5
		--AND p.factura like '%BOG/49639./2023%'
	)a		left join	[PSCService_DB].[dbo].spiga_ImpuestosImportes		i	on	a.idempresas = i.IdEmpresas and a.IdTerceros = i.IdTerceros
																				and a.serie = i.Serie and a.Numero = i.NumFactura and a.Ano = i.AñoFactura
																				and i.IdImpuestoTipos=1 and i.cuota <> 0
			left join	[PSCService_DB].[dbo].spiga_ImpuestosRetenciones	r	on	a.idempresas = r.IdEmpresas and a.IdTerceros = r.IdTerceros
																				and a.serie = r.Serie and a.Numero = r.NumFactura and a.Ano = r.AñoFactura
																				and r.IdImpuestoTipos = 6 and r.cuota <> 0
			left join	[PSCService_DB].[dbo].spiga_ImpuestosRetenciones	t	on	a.idempresas = t.IdEmpresas and a.IdTerceros = t.IdTerceros
																				and a.serie = t.Serie and a.Numero = t.NumFactura and a.Ano = t.AñoFactura
																				and t.IdImpuestoTipos=5 and t.cuota <> 0
			left join	[PSCService_DB].[dbo].spiga_ImpuestosRetenciones	fte	on	a.idempresas = fte.IdEmpresas and a.IdTerceros = fte.IdTerceros
																				and a.serie = fte.Serie and a.Numero = fte.NumFactura and a.Ano = fte.AñoFactura
																				and fte.IdImpuestoTipos in (2,3,4) and fte.cuota <> 0
)b 
where estado not like '%Diferencia Cambial%'
group by 	b.IdEmpresas,b.NombreTercero,Nit,b.IdTerceros,b.factura,b.serie,b.numero,b.Ano,FechaFactura,
b.DescripcionMoneda,Estado,RetencionIca,RetencionIva,RetencionFuente
/*
select * from [PSCService_DB].[dbo].spiga_CuentasPorPagar where IdEmpresas = 5 and factura like '%BOG%' and factura like '%49639%' and factura like '%2023%'
select * from [PSCService_DB].[dbo].spiga_PagosCobros where IdEmpresas = 5 and factura like '%BOG%' and factura like '%49639%' and factura like '%2023%'
select * from [PSCService_DB].[dbo].spiga_ImpuestosImportes where serie = 'BOG' and numfactura= '49639' and Añofactura=2023
select * from [PSCService_DB].[dbo].spiga_ImpuestosRetenciones where serie = 'BOG' and numfactura= '49639' and Añofactura=2023
select * from [PSCService_DB].[dbo].spiga_TercerosBancosProveedores where pkterceros = '207995'
*/

```
