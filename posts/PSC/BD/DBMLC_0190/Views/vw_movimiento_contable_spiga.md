# View: vw_movimiento_contable_spiga

## Usa los objetos:
- [[spiga_ContabilidadMovimientos]]

```sql
CREATE view [dbo].[vw_movimiento_contable_spiga] as
select   Empresa,NombreEmpresa,Cuenta,CodigoTercero,FechaAsiento,NumeroAsiento,Factura,FechaFactura,
TipoFactura,ReferenciaInterna,Debe, Haber,concepto,FacturaConciliacion,ExpedienteConciliacion,Centro,NombreCentro
from(
		select 		
		Empresa=a.idEmpresas,a.NombreEmpresa,a.Cuenta,a.CodigoTercero,a.FechaAsiento,a.NumeroAsiento,a.Factura,a.FechaFactura,a.TipoFactura,a.ReferenciaInterna,
		a.Debe,a.haber,a.concepto,a.FacturaConciliacion,a.ExpedienteConciliacion,a.Centro,a.NombreCentro
		FROM		[PSCService_DB].dbo.spiga_ContabilidadMovimientos 	a	 with(nolock)
		--where a.idEmpresas=5
		--and a.cuenta like '13%' 
		--and a.centro = 1
)a

```
