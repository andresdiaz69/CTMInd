# View: v_MarginadorContabilidad_JohnDeere

## Usa los objetos:
- [[spiga_ContabilidadMovimientos]]
- [[vw_CuentasContables_ReclasificacionJD]]

```sql

CREATE view [dbo].[v_MarginadorContabilidad_JohnDeere] as
select año=year(FechaAsiento),mes=month(FechaAsiento),a.IdEmpresas,a.NombreEmpresa,a.cuenta,
a.Centro,a.NombreCentro,a.Seccion,a.NombreSeccion,a.Departamento,a.NombreDepartamento,
a.Factura,a.FacturaConciliacion,
Saldo = sum(a.Debe)-sum(a.Haber),CC.CodigoConcepto,CC.NombreConcepto
from [PSCService_DB].dbo.spiga_ContabilidadMovimientos a
left join vw_CuentasContables_ReclasificacionJD CC ON CC.Cuenta = a.Cuenta
where IdEmpresas = 1 
and NombreCentro like '%JD-%' 
and Departamento = 'RE'
--and Factura is null--like '%101477%'
--and Cuenta in ('6135061115','4135061115','4175062115','4175061115','4175041105','6135041205','4135041205','4175042110','6135041330','6135041310')
--and year(FechaAsiento)=2021
--and month(FechaAsiento)=9
group by year(a.FechaAsiento),month(a.FechaAsiento),a.IdEmpresas,a.NombreEmpresa,a.cuenta,
a.Centro,a.NombreCentro,a.Seccion,a.NombreSeccion,a.Departamento,a.NombreDepartamento,
a.Factura,a.FacturaConciliacion,CC.CodigoConcepto,CC.NombreConcepto

UNION ALL

select año=year(a.FechaAsiento),mes=month(a.FechaAsiento),a.IdEmpresas,a.NombreEmpresa,a.cuenta,
a.Centro,a.NombreCentro,a.Seccion,a.NombreSeccion,a.Departamento,a.NombreDepartamento,
a.Factura,a.FacturaConciliacion,
Saldo = sum(a.Debe)-sum(a.Haber),CC.CodigoConcepto,CC.NombreConcepto
from [PSCService_DB].dbo.spiga_ContabilidadMovimientos a
left join vw_CuentasContables_ReclasificacionJD CC ON CC.Cuenta = a.Cuenta
where IdEmpresas = 1 
and a.Centro = 146
and a.NombreSeccion LIKE '%JD%' 
and a.Departamento = 'RE'
--and Factura is null--like '%101477%'
--and Cuenta in ('6135061115','4135061115','4175062115','4175061115','4175041105','6135041205','4135041205','4175042110','6135041330','6135041310')
--and year(FechaAsiento)=2021
--and month(FechaAsiento)=9
group by year(a.FechaAsiento),month(a.FechaAsiento),a.IdEmpresas,a.NombreEmpresa,a.cuenta,
a.Centro,a.NombreCentro,a.Seccion,a.NombreSeccion,a.Departamento,a.NombreDepartamento,
a.Factura,a.FacturaConciliacion,CC.CodigoConcepto,CC.NombreConcepto

```
