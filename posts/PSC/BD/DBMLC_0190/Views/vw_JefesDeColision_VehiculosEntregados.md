# View: vw_JefesDeColision_VehiculosEntregados

## Usa los objetos:
- [[spiga_InformaFacturacion]]
- [[UnidadDeNegocio]]

```sql
CREATE view [dbo].[vw_JefesDeColision_VehiculosEntregados] as
--unidades
select Ano_Periodo,Mes_Periodo,CodigoCentro,centro,Codigoseccion,seccion,cantidad=sum(Cantidad)
from(
		select Ano_Periodo,Mes_Periodo,vin,CodigoCentro=IdCentros,centro=NombreCentro,Codigoseccion=IdSecciones,
		seccion=NombreSeccion,cantidad=1
		from(
				SELECT    distinct     Ano_Periodo, Mes_Periodo, VIN, IdCentros, u.NombreCentro,
				IdSecciones,u.NombreSeccion
				--valor=sum(valorneto)
				FROM            [PSCService_DB].dbo.spiga_InformaFacturacion	f
				left join		UnidadDeNegocio									u	on	f.IdEmpresas = u.CodEmpresa
																						and f.IdCentros = u.CodCentro
																						and f.IdSecciones = u.CodSeccion
				where (u.NombreSeccion like '%colisi%') 
				and (f.VIN IS NOT NULL)
				--and Ano_Periodo >=2021
				--and Mes_Periodo = 11
				--and IdCentros in (68,97)
				--and  vin = '3BRCD33B6NK590180'
				--GROUP BY Ano_Periodo, Mes_Periodo, VIN, CodigoCentro, Centro,Codigoseccion,seccion
		)a 
)b 
WHERE Ano_Periodo >=2021
--and Mes_Periodo = 11
--and CodigoCentro = 28
group by Ano_Periodo,Mes_Periodo,CodigoCentro,centro,Codigoseccion,seccion

```
