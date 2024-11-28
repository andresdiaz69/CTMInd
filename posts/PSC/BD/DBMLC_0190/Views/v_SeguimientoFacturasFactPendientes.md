# View: v_SeguimientoFacturasFactPendientes

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
CREATE view [dbo].[v_SeguimientoFacturasFactPendientes] as
select distinct f.IdEmpresas,f.NombreTercero,Nit=case when len(t.NifCif) = 10 then substring(t.NifCif,1,9) else t.NifCif end,f.IdTerceros,f.Factura,
substring(f.Factura,1,charindex('/',f.Factura,1)-1) serie,
substring(f.Factura,(charindex('/',f.Factura,1)+1),(charindex('/',f.factura,((charindex('/',f.Factura,1))+1)) )-(charindex('/',f.Factura,1))-1) Numero,
right(f.Factura,charindex('/',REVERSE(f.Factura))-1) Ano,i.FechaFactura,f.DescripcionMoneda,Estado=f.DescripcionSituacionEfectos,ValorTotal=i.TotalDocumento,
IVA=isnull(i.IVA,0),RetencionIca=isnull(c.ICA,0),RetencionIva=isnull(v.RteIVA,0),RetencionFuente=isnull(R.RteFte,0),Valor_Del_Pago=f.ValorCancelado,
Fecha_Pago=f.FechaCobroPago,Banco_Receptor=b.Nombre,Cuenta_Bancaria=b.CuentaNumero
from		[dbo].[v_SeguimientoFacturasFactPagos]	f
left join	[dbo].[v_SeguimientoFacturasFactIVA]	i	on	f.IdEmpresas = i.IdEmpresas and f.IdTerceros = i.idTerceros and f.Factura = i.NumeroFactura
left join	[dbo].[v_SeguimientoFacturasFactICA]	c	on	f.IdEmpresas = c.IdEmpresas and f.IdTerceros = c.idTerceros and f.Factura = c.NumeroFactura
left join	[dbo].[v_SeguimientoFacturasFactRteFte]	r	on	f.IdEmpresas = r.IdEmpresas and f.IdTerceros = r.idTerceros and f.Factura = r.NumeroFactura
left join	[dbo].[v_SeguimientoFacturasFactRteIva]	v	on	f.IdEmpresas = v.IdEmpresas and f.IdTerceros = v.idTerceros and f.Factura = v.NumeroFactura
left join	[PSCService_DB].[dbo].spiga_Terceros	t	on	f.idTerceros = t.Pkterceros
left join	[PSCService_DB].[dbo].spiga_TercerosBancosProveedores	b on t.NifCif = b.NifCif and f.idempresas = b.pfkempresas and f.IdTerceros = b.PkTerceros
where i.TotalDocumento is not null and t.NifCif not in ('8300049938','222222222')
UNION ALL
select distinct f.IdEmpresas,f.NombreTercero,Nit = case when len(f.NifCif) = 10 then substring(f.NifCif,1,9) else f.NifCif end,f.IdTerceros,f.Factura,
substring(f.Factura,1,charindex('/',f.Factura,1)-1) serie,
substring(f.Factura,(charindex('/',f.Factura,1)+1),(charindex('/',f.factura,((charindex('/',f.Factura,1))+1)) )-(charindex('/',f.Factura,1))-1) Numero,
right(f.Factura,charindex('/',REVERSE(f.Factura))-1) Ano,f.FechaFactura,f.DescripcionMoneda,Estado=f.DescripcionSituacionEfectos,Valor_Total=f.ImportePendiente,
IVA=isnull(i.IVA,0),RetencionIca=isnull(c.ICA,0),RetencionIva=isnull(v.RteIVA,0),RetencionFuente=isnull(R.RteFte,0),Valor_Del_Pago= 0,Fecha_Pago=' ',Banco_Receptor=' ',
Cuenta_Bancaria=' '
from		[dbo].[v_SeguimientoFacturasFact]		f
left join	[dbo].[v_SeguimientoFacturasFactIVA]	i	on	f.IdEmpresas = i.IdEmpresas and f.IdTerceros = i.idTerceros and f.Factura = i.NumeroFactura
left join	[dbo].[v_SeguimientoFacturasFactICA]	c	on	f.IdEmpresas = c.IdEmpresas and f.IdTerceros = c.idTerceros and f.Factura = c.NumeroFactura
left join	[dbo].[v_SeguimientoFacturasFactRteFte]	r	on	f.IdEmpresas = r.IdEmpresas and f.IdTerceros = r.idTerceros and f.Factura = r.NumeroFactura
left join	[dbo].[v_SeguimientoFacturasFactRteIva]	v	on	f.IdEmpresas = v.IdEmpresas and f.IdTerceros = v.idTerceros and f.Factura = v.NumeroFactura
where  f.NifCif not in ('8300049938','222222222')
--where f.Factura like '%D027/286/2022%'

```
