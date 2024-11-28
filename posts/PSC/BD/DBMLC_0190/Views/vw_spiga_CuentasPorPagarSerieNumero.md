# View: vw_spiga_CuentasPorPagarSerieNumero

## Usa los objetos:
- [[spiga_CuentasPorPagar]]

```sql

create view [dbo].[vw_spiga_CuentasPorPagarSerieNumero]
as
	select 
	a.IdSincronizacionSpiga,
	a.IdConsecutivo,
	a.IdEmpresas,NombreTercero , a.NifCif ,a.Factura,a.DescripcionMoneda,  
	a.TotalFactura ,a.IdTerceros ,a.DescripcionSituacionEfectos,
	substring(a.Factura,1,charindex('/',a.Factura,1)-1) serie, 	
	substring(a.Factura,(charindex('/',a.Factura,1)+1),(charindex('/',factura,((charindex('/',a.Factura,1))+1)) )-(charindex('/',a.Factura,1))-1) Numero,
	RIGHT(a.Factura,charindex('/',REVERSE(a.Factura))-1) Ano		
	FROM
	 [PSCService_DB].[dbo].spiga_CuentasPorPagar  a

```
