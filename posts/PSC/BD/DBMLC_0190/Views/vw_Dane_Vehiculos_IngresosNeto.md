# View: vw_Dane_Vehiculos_IngresosNeto

## Usa los objetos:
- [[vw_Dane_Vehiculos_Descuentos]]
- [[vw_Dane_Vehiculos_Ingresos]]

```sql
CREATE view [dbo].[vw_Dane_Vehiculos_IngresosNeto] as
select i.IdEmpresas,i.cuenta,i.FechaAsiento,i.NumeroAsiento,i.concepto,i.referencia,i.Debito,i.Credito, i.saldo,
Descuento=isnull(d.saldo,0),IngresoNeto = i.saldo + isnull(d.saldo,0),IngresoDane= (i.saldo + isnull(d.saldo,0))/1000,
i.CodigoTercero,i.Departamento,i.NombreDepartamento,i.Centro,i.NombreCentro,i.Seccion,i.NombreSeccion,i.Marca,
i.NombreMarca,i.ExpedienteConciliacion,i.FacturaConciliacion 
from		vw_Dane_Vehiculos_Ingresos		i
left join	vw_Dane_Vehiculos_Descuentos	d	on	i.IdEmpresas = d.IdEmpresas and i.NumeroAsiento = d.NumeroAsiento
													and i.referencia = d.referencia and i.codigotercero = d.codigotercero
--where i.idempresas = 6 
--and i.referencia = '1FUJHTDV7LLLX3312'
--and year(i.FechaAsiento)=2020
--and month(i.FechaAsiento)=6



```
