# View: vw_ClubIntegralComercialAC_Retomas

## Usa los objetos:
- [[ClubIntegralPeriodos]]
- [[ExogenasRetomasUsados]]

```sql
CREATE VIEW [dbo].[vw_ClubIntegralComercialAC_Retomas] AS

select Periodo,Ano,CodigoEmpleado,isnull([1],0)as Enero,isnull([2],0)as Febrero, isnull([3],0)as Marzo,  isnull([5],0)as Abril,isnull([4],0)as Mayo, isnull([6],0)as Junio, isnull([7],0)Julio, isnull([8],0)Agosto, isnull([9],0)Septiembre, isnull([10],0)Octubre, isnull([11],0)Noviembre, isnull([12],0)Diciembre
from
(
	select p.Periodo,r.Ano,r.Mes,r.CodigoEmpleado,r.RetomasUsados
	from ExogenasRetomasUsados	r
	left join ClubIntegralPeriodos p on r.Ano = p.Ano_Inicial and r.Mes >= P.Mes_Inicial OR r.Ano  = p.Ano_Final and r.Mes <= p.Mes_Inicial
	where r.Ano >= '2018' and Periodo is not null
)a

PIVOT(SUM(RetomasUsados)FOR Mes IN ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12]))AS PivotTable


```
