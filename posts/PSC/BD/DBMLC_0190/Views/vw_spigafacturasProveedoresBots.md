# View: vw_spigafacturasProveedoresBots

## Usa los objetos:
- [[spiga_Terceros]]
- [[spiga_TercerosBancosProveedores]]
- [[v_SeguimientoFacturasFact]]
- [[v_SeguimientoFacturasFactICA]]
- [[v_SeguimientoFacturasFactIVA]]
- [[v_SeguimientoFacturasFactPagos]]
- [[v_SeguimientoFacturasFactRteFte]]
- [[v_SeguimientoFacturasFactRteIva]]

```sql
CREATE VIEW [dbo].[vw_spigafacturasProveedoresBots]  AS	
select Id_Empresa,Nombre_Proveedor,Nit,	Numero_Factura,Moneda,Fecha_Factura,Valor_Total,IVA,ReteFuente,ReteIva,ReteIca,
Valor_Del_Pago = case when estado = 'pendiente' then convert(varchar,'') 
						when estado <> 'pendiente' then convert(varchar,Valor_Del_Pago) end,
Fecha_Pago = case when estado like'%pendiente%' then convert(varchar,'') else convert(varchar,Fecha_Pago,121) end,
Banco_Receptor,Cuenta_Bancaria,Codigo_Spiga,Estado
from(

		select distinct Id_Empresa= case when f.IdEmpresas = 1 then 3800 when f.IdEmpresas= 6 then 3801 when f.IdEmpresas= 5 then 3804 end,
		Nombre_Proveedor=f.NombreTercero,Nit=case when len(t.NifCif) = 10 then substring(t.NifCif,1,9) else t.NifCif end,
		Numero_Factura=f.Factura,Moneda=f.DescripcionMoneda,Fecha_Factura=i.FechaFactura,Valor_Total=i.TotalDocumento,IVA=isnull(i.IVA,0),
		ReteFuente=isnull(R.RteFte,0),ReteIva=isnull(v.RteIVA,0),ReteIca=isnull(c.ICA,0),Valor_Del_Pago=f.ValorCancelado,Fecha_Pago=f.FechaCobroPago,
		Banco_Receptor=b.Nombre,Cuenta_Bancaria=b.CuentaNumero,Codigo_Spiga=f.IdTerceros,Estado=case when f.DescripcionSituacionEfectos = 'Cancelado hoja de gastos'
					then case when f.ValorCancelado > 0 then 'Pagada' else 'Pendiente' end else f.DescripcionSituacionEfectos end
		from		[dbo].[v_SeguimientoFacturasFactPagos]	f
		left join	[dbo].[v_SeguimientoFacturasFactIVA]	i	on	f.IdEmpresas = i.IdEmpresas and f.IdTerceros = i.idTerceros and f.Factura = i.NumeroFactura
		left join	[dbo].[v_SeguimientoFacturasFactICA]	c	on	f.IdEmpresas = c.IdEmpresas and f.IdTerceros = c.idTerceros and f.Factura = c.NumeroFactura
		left join	[dbo].[v_SeguimientoFacturasFactRteFte]	r	on	f.IdEmpresas = r.IdEmpresas and f.IdTerceros = r.idTerceros and f.Factura = r.NumeroFactura
		left join	[dbo].[v_SeguimientoFacturasFactRteIva]	v	on	f.IdEmpresas = v.IdEmpresas and f.IdTerceros = v.idTerceros and f.Factura = v.NumeroFactura
		left join	[PSCService_DB].[dbo].spiga_Terceros	t	on	f.idTerceros = t.Pkterceros
		left join	[PSCService_DB].[dbo].spiga_TercerosBancosProveedores	b on t.NifCif = b.NifCif and f.idempresas = b.pfkempresas and f.IdTerceros = b.PkTerceros
		where i.TotalDocumento is not null and t.NifCif not in ('8300049938','222222222')
		and f.IdEmpresas in (1,5,6)
		--and f.factura like '%FAIE/63457/2023%'
		UNION ALL
		select distinct Id_Empresa= case when f.IdEmpresas = 1 then 3800 when f.IdEmpresas= 6 then 3801 when f.IdEmpresas= 5 then 3804 end,
		Nombre_Proveedor=f.NombreTercero,Nit = case when len(f.NifCif) = 10 then substring(f.NifCif,1,9) else f.NifCif end,
		Numero_Factura=f.Factura,Moneda=f.DescripcionMoneda,Fecha_Factura=f.FechaFactura,Valor_Total=f.ImportePendiente,IVA=isnull(i.IVA,0),
		ReteFuente=isnull(R.RteFte,0),ReteIva=isnull(v.RteIVA,0),ReteIca=isnull(c.ICA,0),Valor_Del_Pago= 0,Fecha_Pago=' ',Banco_Receptor=' ',
		Cuenta_Bancaria=' ',Codigo_Spiga=f.IdTerceros,Estado=f.DescripcionSituacionEfectos
		from		[dbo].[v_SeguimientoFacturasFact]		f
		left join	[dbo].[v_SeguimientoFacturasFactIVA]	i	on	f.IdEmpresas = i.IdEmpresas and f.IdTerceros = i.idTerceros and f.Factura = i.NumeroFactura
		left join	[dbo].[v_SeguimientoFacturasFactICA]	c	on	f.IdEmpresas = c.IdEmpresas and f.IdTerceros = c.idTerceros and f.Factura = c.NumeroFactura
		left join	[dbo].[v_SeguimientoFacturasFactRteFte]	r	on	f.IdEmpresas = r.IdEmpresas and f.IdTerceros = r.idTerceros and f.Factura = r.NumeroFactura
		left join	[dbo].[v_SeguimientoFacturasFactRteIva]	v	on	f.IdEmpresas = v.IdEmpresas and f.IdTerceros = v.idTerceros and f.Factura = v.NumeroFactura
		where  f.NifCif not in ('8300049938','222222222')
		and f.IdEmpresas in (1,5,6)
		--and f.factura like '%FAIE/63457/2023%'
		--where f.Factura like '%D027/286/2022%'
)a

```
