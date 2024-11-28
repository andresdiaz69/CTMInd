# View: vw_ExcesosExcesivos_FechaUltimaCompra

## Usa los objetos:
- [[spiga_StockRepuestos_18_SinTraspaso]]

```sql

CREATE view [dbo].[vw_ExcesosExcesivos_FechaUltimaCompra] as
select Ano_Periodo,Mes_Periodo,IdEmpresas,IdMR,IdReferencias,Descripcion,
IdClasificacion1,DenominacionClasificacion1,IdClasificacion2,DenominacionClasificacion2,IdClasificacion3,DenominacionClasificacion3,
IdClasificacion4,DenominacionClasificacion4,IdClasificacion5,DenominacionClasificacion5,IdClasificacion6,DenominacionClasificacion6,
FechaUltimaCompra
from(
	select OrdenFV = row_number() over(partition by idreferencias,ano_periodo,mes_periodo order by FechaUltimaCompra desc),
	Ano_Periodo,Mes_Periodo,IdEmpresas,IdMR,IdReferencias,Descripcion,IdClasificacion1,DenominacionClasificacion1,IdClasificacion2,
	DenominacionClasificacion2,IdClasificacion3,DenominacionClasificacion3,IdClasificacion4,DenominacionClasificacion4,IdClasificacion5,
	DenominacionClasificacion5,IdClasificacion6,DenominacionClasificacion6,FechaUltimaCompra
	from [PSCService_DB].dbo.spiga_StockRepuestos_18_SinTraspaso
	--where --Ano_Periodo = 2021
	--and Mes_Periodo = 5
	--and IdCentros in (6,50,53,56,67,72)
	 --IdReferencias = 'WHT008383'
)a where OrdenFV=1

```
