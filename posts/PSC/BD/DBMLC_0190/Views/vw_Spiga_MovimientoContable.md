# View: vw_Spiga_MovimientoContable

## Usa los objetos:
- [[spiga_ContabilidadMovimientos]]

```sql
CREATE view [dbo].[vw_Spiga_MovimientoContable] as
select   Empresa,NombreEmpresa,Cuenta,CodigoTercero,FechaAsiento,NumeroAsiento,Factura,FechaFactura,TipoFactura,ReferenciaInterna,Debe, 
Haber,Concepto=replace(replace(replace(replace(replace(replace(concepto,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
FacturaConciliacion,ExpedienteConciliacion,Centro,NombreCentro​,Seccion,NombreSeccion,Departamento,NombreDepartamento,
IdCtaBancarias,CuentaBancaria,Marca,NombreMarca
from(​
	 select	Empresa=a.idEmpresas,a.NombreEmpresa,a.Cuenta,a.CodigoTercero,a.FechaAsiento,
	 a.NumeroAsiento,a.Factura,a.FechaFactura,a.TipoFactura,a.ReferenciaInterna,a.Debe,a.haber,a.concepto,a.FacturaConciliacion,
	 a.ExpedienteConciliacion,a.Centro,a.NombreCentro,a.Seccion,a.NombreSeccion,a.Departamento,a.NombreDepartamento,a.IdCtaBancarias,
	 a.CuentaBancaria,a.Marca,a.NombreMarca
		FROM		[PSCService_DB].dbo.spiga_ContabilidadMovimientos 	a	 with(nolock)	
)a​
--where Empresa = 5
--and FechaAsiento >= '20200701'
--and FechaAsiento <= '20200731'
--GO


```
