# View: vw_dane_vehiculos_flotas

## Usa los objetos:
- [[Empresas]]
- [[vw_Dane_Vehiculos_informe]]

```sql

CREATE view [dbo].[vw_dane_vehiculos_flotas] as
select Cantidad=Orden,idempresas,b.NombreEmpresa,ano=YEAR(FechaAsiento),mes=MONTH(FechaAsiento), FechaAsiento,canalventa,numdocumentopropietario,NombrePropietario,gama,IngresoNeto,IngresoDane
from(
		select orden = ROW_NUMBER() over (partition by numdocumentopropietario,gama,year(FechaAsiento),month(FechaAsiento) order by numdocumentopropietario,gama),
		* 
		from [vw_Dane_Vehiculos_informe] 

		--where IdEmpresas = 6
		--and year(FechaAsiento) = 2020
		--and month(FechaAsiento) = 2
		--and referencia = 'JLCB1H633KK001760'
) a 
		LEFT JOIN   Empresas						b   on a.IdEmpresas = b.CodigoEmpresa

--where numdocumentopropietario='8301427617'
--and IdEmpresas = 6 and ano = 2020 and mes = 2



```
