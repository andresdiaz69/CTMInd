# View: vw_ClubIntegralComercialAC_Accesorios

## Usa los objetos:
- [[EmpleadosActivos]]
- [[Liquidaciones_ComercialVNPorAcc]]
- [[vw_ClubIntegralRangoMaestrasVersionMax]]

```sql
CREATE VIEW [dbo].[vw_ClubIntegralComercialAC_Accesorios] AS
SELECT 	Ano_Periodo,CodigoEmpleado,Empleado,IdRangoMaestra,IdRangoVersionMax
		,isnull([1],0)'Enero',isnull([2],0)'Febrero',isnull([3],0)'Marzo'
		,isnull([4],0)'Abril',isnull([5],0)'Mayo',isnull([6],0)'Junio'
		,isnull([7],0)'Julio',isnull([8],0)'Agosto',isnull([9],0)'Septiembre'
		,isnull([10],0)'Octubre',isnull([11],0)'Noviembre',isnull([12],0)'Diciembre'
FROM(

	SELECT 
		a.Ano_Periodo,a.CodigoEmpleado,a.Empleado,a.Mes_Periodo,vm.IdRangoMaestra,vm.IdRangoVersionMax,
		(a.ValorNetoMostrador)+(a.ValorNetoTaller)AS TOTAL

	FROM dbo.Liquidaciones_ComercialVNPorAcc a

	left join vw_ClubIntegralRangoMaestrasVersionMax vm on a.CedulaVendedorRepuestos = vm.CodigoEmpleado

	left join EmpleadosActivos e on a.CodigoEmpleado = e.CodigoEmpleado and a.Ano_Periodo >= year(getdate()) and a.Mes_Periodo >= month(getdate())

	where a.Ano_Periodo >= '2018' 

	--GROUP BY a.Ano_Periodo,a.CodigoEmpleado,a.Empleado,a.Mes_Periodo,vm.IdRangoMaestra,vm.IdRangoVersionMax
)X
   PIVOT (SUM(TOTAL)FOR Mes_periodo IN ([1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12]))AS Pivotable	
   where IdRangoMaestra='4'


```
