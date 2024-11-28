# View: vw_dane_vehiculos_flotas_resumen

## Usa los objetos:
- [[Empresas]]
- [[vw_dane_vehiculos_flotas]]

```sql
CREATE view [dbo].[vw_dane_vehiculos_flotas_resumen] as
select idempresas,b.NombreEmpresa,cantidad=orden,ano,mes,fechaasiento,canalventa,numdocumentopropietario,nombrepropietario,gama,IngresoNeto,IngresoDane
from(
		select Orden=max(cantidad), idempresas,ano=YEAR(FechaAsiento),mes=MONTH(FechaAsiento), FechaAsiento, canalventa, numdocumentopropietario, 
		NombrePropietario, gama, IngresoNeto=sum(ingresoneto), IngresoDane=sum(IngresoDane)
		from vw_dane_vehiculos_flotas
		--where IdEmpresas = 6
		--and year(FechaAsiento) = 2020
		--and month(FechaAsiento) = 11
		group by idempresas,ano,mes, FechaAsiento, canalventa, numdocumentopropietario,NombrePropietario, gama
)a 
LEFT JOIN   Empresas						b   on a.IdEmpresas = b.CodigoEmpresa
where orden > 2
		

--and IdEmpresas = 6
--and year(FechaAsiento) = 2020
--and month(FechaAsiento) = 11

```
