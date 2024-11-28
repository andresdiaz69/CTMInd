# View: vw_Dane_Vehiculos_Descuentos

## Usa los objetos:
- [[spiga_ContabilidadMovimientos]]

```sql
CREATE view [dbo].[vw_Dane_Vehiculos_Descuentos] as
select m.IdEmpresas,m.cuenta,m.FechaAsiento,m.NumeroAsiento,m.concepto,m.referencia,Debito= sum(m.debe),Credito=sum(m.haber),
saldo= sum(m.haber) - sum(m.debe),m.CodigoTercero,m.Departamento,m.NombreDepartamento,
m.Centro,m.NombreCentro,m.Seccion,m.NombreSeccion,m.Marca,m.NombreMarca,m.ExpedienteConciliacion,m.FacturaConciliacion
from	[PSCService_DB].dbo.spiga_ContabilidadMovimientos	m
where	m.cuenta like '417502%'  
--year(m.FechaAsiento)=2020
--and month(m.FechaAsiento)=6
--and m.IdEmpresas = 6
--and m.referencia = '1FUJHTDV7LLLX3312'
group by m.IdEmpresas,m.cuenta,m.FechaAsiento,m.NumeroAsiento,m.concepto,m.referencia,m.CodigoTercero,m.Departamento,m.NombreDepartamento,
m.Centro,m.NombreCentro,m.Seccion,m.NombreSeccion,m.Marca,m.NombreMarca,m.ExpedienteConciliacion,m.FacturaConciliacion

```
