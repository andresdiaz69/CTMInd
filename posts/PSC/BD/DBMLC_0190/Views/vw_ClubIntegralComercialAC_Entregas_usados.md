# View: vw_ClubIntegralComercialAC_Entregas_usados

## Usa los objetos:
- [[ClubIntegralPeriodos]]
- [[ComisionesSpigaVOFechafactura]]

```sql

CREATE VIEW [dbo].[vw_ClubIntegralComercialAC_Entregas_usados] AS
SELECT isnull(row_number()over (order by CedulaVendedor asc),-1)as orden,Periodo,Ano,CedulaVendedor,NombreVendedor,CodigoMarcaGrupo,MarcaGrupo,CodigoMarcaCI,MarcaCI,CodigoCentro,Centro,
([1])Enero, ([2])Febrero, ([3])Marzo, ([4])Abril, ([5])Mayo, ([6])Junio, ([7])Julio, ([8])Agosto, ([9])Septiembre, ([10])Octubre, ([11])Noviembre, ([12])Diciembre
FROM 
(
	SELECT  Periodo,Ano,Mes,CedulaVendedor,NombreVendedor,VIN,CodigoMarcaGrupo,MarcaGrupo
	--,case	when Ano = 2018 then '1' 
	--		when Ano = 2019  and Mes < 7 then '1' 
	--end as Periodo
	,case when CodigoMarca = '13' then '13' else CodigoMarcaGrupo end as CodigoMarcaCI
	,case when CodigoMarca = '13' then 'Mercedes-Benz' else MarcaGrupo end as MarcaCI
	,CodigoCentro,Centro
	from 
	(	
		SELECT  p.Periodo,Ano = year(FechaEntregaCliente),Mes=month(FechaEntregaCliente), CedulaVendedor,NombreVendedor,VIN= case when vin is null then 'a' else vin end			 
		,CodigoMarca= 7,Marca='USADOS',CodigoMarcaGrupo = 9 ,MarcaGrupo= 'USADOS'
		,o.CodigoCentro,o.Centro
		FROM	ComisionesSpigaVOFechafactura		o
		left join ClubIntegralPeriodos p on  year(FechaEntregaCliente) = p.Ano_Inicial and month(FechaEntregaCliente) >= P.Mes_Inicial OR year(FechaEntregaCliente) = p.Ano_Final and month(FechaEntregaCliente) <= p.Mes_Inicial
		where Centro like 'VO-%'
		and FechaEntregaCliente > '2018-06-30'
		and FechaEntregaCliente is not null
		and year(FechaEntregaCliente) > 2017
		
	)x
)a
PIVOT(COUNT(vin)FOR Mes in ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12]))AS PivotTable
group by Periodo,Ano,CedulaVendedor,NombreVendedor,CodigoMarcaGrupo,MarcaGrupo,CodigoMarcaCI,MarcaCI,CodigoCentro,Centro,[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12]


```
