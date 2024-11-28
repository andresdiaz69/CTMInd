# View: vw_ExcesosExcesivos_PrecioMedio

## Usa los objetos:
- [[spiga_StockRepuestos_18_SinTraspaso]]

```sql



CREATE view [dbo].[vw_ExcesosExcesivos_PrecioMedio] as
select Ano_Periodo,Mes_Periodo,IdEmpresas,IdMR,IdReferencias,Descripcion,
IdClasificacion1,DenominacionClasificacion1,IdClasificacion2,DenominacionClasificacion2,IdClasificacion3,DenominacionClasificacion3,
IdClasificacion4,DenominacionClasificacion4,IdClasificacion5,DenominacionClasificacion5,IdClasificacion6,DenominacionClasificacion6,
PrecioMedio = case when sum(stock) <> 0 then (sum(TotalPrecioMedio)/ sum(stock)) else 0 end 
from(
	select Ano_Periodo,Mes_Periodo,IdEmpresas,IdMR,IdReferencias,Descripcion,IdClasificacion1,DenominacionClasificacion1,IdClasificacion2,
	DenominacionClasificacion2,IdClasificacion3,DenominacionClasificacion3,IdClasificacion4,DenominacionClasificacion4,IdClasificacion5,
	DenominacionClasificacion5,IdClasificacion6,DenominacionClasificacion6,stock=sum(stock),PrecioMedio,TotalPrecioMedio = sum(stock)*PrecioMedio
	from [PSCService_DB].dbo.spiga_StockRepuestos_18_SinTraspaso
	--where Ano_Periodo = 2021
	--and Mes_Periodo = 5
	--and IdCentros in (6,50,53,56,67,72)
	--and IdReferencias = 'WHT008383'
	group by  Ano_Periodo,Mes_Periodo,IdEmpresas,IdMR,IdReferencias,Descripcion,IdClasificacion1,DenominacionClasificacion1,IdClasificacion2,
	DenominacionClasificacion2,IdClasificacion3,DenominacionClasificacion3,IdClasificacion4,DenominacionClasificacion4,IdClasificacion5,
	DenominacionClasificacion5,IdClasificacion6,DenominacionClasificacion6,PrecioMedio
)a group by  Ano_Periodo,Mes_Periodo,IdEmpresas,IdMR,IdReferencias,Descripcion,
IdClasificacion1,DenominacionClasificacion1,IdClasificacion2,DenominacionClasificacion2,IdClasificacion3,DenominacionClasificacion3,
IdClasificacion4,DenominacionClasificacion4,IdClasificacion5,DenominacionClasificacion5,IdClasificacion6,DenominacionClasificacion6

```
