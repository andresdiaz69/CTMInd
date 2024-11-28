# View: vw_ClubIntegralComercialF_I_Detalles_Final

## Usa los objetos:
- [[ClubIntegralFinancierasAutorizadasMarca]]
- [[ComisionesSpigaInformacionCreditos]]
- [[VehiculosMarcas]]
- [[VehiculosMarcasGrupos]]
- [[vw_Centros]]

```sql

CREATE view [dbo].[vw_ClubIntegralComercialF_I_Detalles_Final] as
	select Ano_Periodo,CedulaEmpleado,Empleado,Cantidad,Idcentros,Centro,c.SiglaMarca,v.CodigoMarca,v.Marca,vg.CodigoMarcaGrupo,b.NitFinanciera,ISNULL(f.NombreFinanciera,'NO_AUTORIZADAS') NombreFinanciera
	,case when mes_periodo = 1 then 3  when mes_periodo = 2 then 3 when mes_periodo = 3 then 3 
	when mes_periodo = 4 then 4  when mes_periodo = 5 then 4 when mes_periodo = 6 then 4
	when mes_periodo = 7 then 1  when mes_periodo = 8 then 1 when mes_periodo = 9 then 1
	when mes_periodo = 10 then 2 when mes_periodo = 11 then 2 when mes_periodo = 12 then 2
	end as Trimestre
	from 
	(
		select Ano_Periodo,Mes_Periodo,CedulaEmpleado,Empleado,count(VIN)cantidad,IdCentros,Centro,TipoFactura,NitFinanciera,Nombre
		from 
		(
			select distinct Ano_Periodo,Mes_Periodo,CedulaEmpleado,Empleado,VIN,IdCentros,Centro,TipoFactura,
			NitFinanciera = case when Nit = '8600280611' then '8600286019'
								 when Nit = '860028601' then '8600286019'
			else NIT end
			,Nombre 
			from ComisionesSpigaInformacionCreditos
			where TipoFactura like'Comisión por Colocación De Créditos%' --9794
			and Ano_Periodo > 2017
			--and vin = '9BWAB45UXKT031572'
			)a
		group by Ano_Periodo,Mes_Periodo,CedulaEmpleado,Empleado,VIN,IdCentros,Centro,TipoFactura,NitFinanciera,Nombre
	)b
	left join vw_Centros c on b.IdCentros = c.CodigoCentro
	left join VehiculosMarcas v on c.SiglaMarca = v.SiglaMarca
	left join VehiculosMarcasGrupos vg on v.CodigoMarcaGrupo = vg.CodigoMarcaGrupo
	left join ClubIntegralFinancierasAutorizadasMarca f on vg.CodigoMarcaGrupo = f.CodigoMarcaGrupo and  b.NitFinanciera = f.NitFinanciera

```
