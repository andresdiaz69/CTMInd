# View: vw_Spiga_SaldosContables

## Usa los objetos:
- [[spiga_ContabilidadMovimientos]]

```sql
CREATE view [dbo].[vw_Spiga_SaldosContables] as
select Año,Mes,Empresa,NombreEmpresa,convert(int,Centro)Centro,NombreCentro,Seccion,NombreSeccion,marca,NombreMarca,Debe=sum(debe),Haber=sum(haber),Saldo = sum(debe)-sum(haber)​
from(​
	 select	Empresa=a.idEmpresas,a.NombreEmpresa,a.Cuenta,a.CodigoTercero,año=year(a.FechaAsiento),mes=(a.FechaAsiento),
	 a.NumeroAsiento,a.Factura,a.FechaFactura,a.TipoFactura,a.ReferenciaInterna,a.Debe,a.haber,a.concepto,a.FacturaConciliacion,
	 a.ExpedienteConciliacion,a.Centro,a.NombreCentro,a.Seccion,a.NombreSeccion,a.Marca,a.NombreMarca
		FROM		[PSCService_DB].dbo.spiga_ContabilidadMovimientos 	a	 with(nolock)
		where (a.Cuenta like '41%') ​
)a​
group by año,mes,Empresa,NombreEmpresa,centro,nombrecentro,seccion,NombreSeccion,marca,NombreMarca​

```
