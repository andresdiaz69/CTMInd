# View: v_Marginador_TipoVentasJohnDeere

## Usa los objetos:
- [[spiga_ConsultaMovimientosReferencia]]

```sql
CREATE view [dbo].[v_Marginador_TipoVentasJohnDeere] as
--MS: 060923 --se agrega filtro para quitar facturas nulas
select  distinct NumeroFactura = convert(varchar,m.seriefactura) + '\' +convert(varchar,m.factura) + '\' + convert(varchar,m.AñoFactura),
        m.FechaFactura,       
		IdMovimientoTipos,
		DescripcionPedidoTipoVentas,
		IdReferencias,
		IdEmpresas,
		NombreEmpresa,
		IdCentros,
		NombreCentro,
		IdSecciones,
		DescripcionSeccion 
  from [PSCService_DB].dbo.[spiga_ConsultaMovimientosReferencia] m
--from [PSCService_DB].dbo.spiga_REConsultaMovimientosDigital	m
where Factura is not null 
--and year(FechaFactura) = 2023
--and MONTH(FechaFactura) = 2

```
