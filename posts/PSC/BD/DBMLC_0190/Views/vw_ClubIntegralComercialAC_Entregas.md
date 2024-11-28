# View: vw_ClubIntegralComercialAC_Entregas

## Usa los objetos:
- [[Centros]]
- [[ClubIntegralPeriodos]]
- [[Empleados]]
- [[Liquidaciones_ComercialVNPorCom_Detalle]]
- [[VehiculosMarcas]]
- [[VehiculosMarcasGrupos]]

```sql


CREATE VIEW [dbo].[vw_ClubIntegralComercialAC_Entregas] AS
select distinct isnull(row_number()over (order by CedulaVendedor asc),-1)as orden,Periodo,Ano_Periodo,CedulaVendedor,NombreVendedor,CodigoMarcaGrupo,MarcaGrupo,CodigoMarcaCI,MarcaCI,CodigoCentro,NombreCentro,
sum([1])Enero, sum([2])Febrero, sum([3])Marzo, sum([4])Mayo, sum([5])Abril, sum([6])Junio, sum([7])Julio, sum([8])Agosto, sum([9])Septiembre, sum([10])Octubre, sum([11])Noviembre, sum([12])Diciembre
from 
(
	select distinct p.Periodo,e.Ano_Periodo,e.Mes_Periodo,e.CedulaVendedor,em.Nombres+' '+em.Apellido1+' '+em.Apellido2 as NombreVendedor,e.VIN,v.CodigoMarcaGrupo,vg.MarcaGrupo
	,case when e.CodigoMarca = '13' then '13' else v.CodigoMarcaGrupo end as CodigoMarcaCI
	,case when e.CodigoMarca = '13' then 'Mercedes-Benz' else vg.MarcaGrupo end as MarcaCI
	,e.CodigoCentro,c.NombreCentro
	from Liquidaciones_ComercialVNPorCom_Detalle e	
	left join Empleados em on e.CedulaVendedor = em.CodigoEmpleado
	left join Centros c on e.CodigoCentro = c.CodigoCentro
	left join VehiculosMarcas v	on e.CodigoMarca = v.CodigoMarca
	left join VehiculosMarcasGrupos vg on v.CodigoMarcaGrupo = vg.CodigoMarcaGrupo
	left join ClubIntegralPeriodos p on e.Ano_Periodo = p.Ano_Inicial and e.Mes_Periodo >= P.Mes_Inicial OR e.Ano_Periodo = p.Ano_Final and e.Mes_Periodo <= p.Mes_Inicial
	where e.FechaRecaudo > '2018-06-30' 
	--and CedulaVendedor='52158645'
)a
PIVOT(COUNT(vin)FOR Mes_Periodo IN ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12]))AS PivotTable
group by  Periodo,Ano_Periodo,CedulaVendedor,NombreVendedor,CodigoMarcaCI,MarcaCI,CodigoMarcaGrupo,MarcaGrupo,CodigoCentro,NombreCentro,[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12]


```
