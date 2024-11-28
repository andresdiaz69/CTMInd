# View: vw_ClubIntegralRepuestos_Comparativa_CumplimientoSede

## Usa los objetos:
- [[Centros]]
- [[ClubIntegralRepuestosPresupuesto]]
- [[Empleados]]
- [[vw_ClubIntegralRepuestos_Mes_TicketEntrada]]

```sql

CREATE view [dbo].[vw_ClubIntegralRepuestos_Comparativa_CumplimientoSede] as

SELECT isnull(VENT.Ano_Spiga,PRE.Ano)Ano,ISNULL(VENT.CodigoCentro,PRE.CodigoCentro)CodigoCentro,ISNULL(VENT.NombreCentro,PRE.NombreCentro)NombreCentro
,(VENT.Julio  +VENT.Agosto   +VENT.Septiembre)Trimestre1Ventas
,(VENT.Octubre+VENT.Noviembre+VENT.Diciembre)Trimestre2Ventas
,(VENT.Enero  +VENT.Febrero  +VENT.Marzo)Trimestre3Ventas
,(VENT.Abril  +VENT.Mayo     +VENT.Junio)Trimestre4Ventas
,((ISNULL(PRE.Julio,0))+(ISNULL(PRE.Agosto,0))+(ISNULL(PRE.Septiembre,0)))Trimestre1Presupuesto
,((ISNULL(PRE.Octubre,0))+(ISNULL(PRE.Noviembre,0))+(ISNULL(PRE.Diciembre,0)))Trimestre2Presupuesto
,((ISNULL(PRE.Enero,0))+(ISNULL(PRE.Febrero,0))+(ISNULL(PRE.Marzo,0)))Trimestre3Presupuesto
,((ISNULL(PRE.Abril,0))+(ISNULL(PRE.Mayo,0))+(ISNULL(PRE.Junio,0)))Trimestre4Presupuesto
FROM 
(
select distinct vc.Ano_Spiga,e.CodigoCentro,c.NombreCentro
,sum(vc.Enero)Enero
,sum(vc.Febrero)Febrero,sum(vc.Marzo)Marzo,sum(vc.Abril)Abril,sum(vc.Mayo)Mayo,sum(vc.Junio)Junio,sum(vc.Julio)Julio,sum(vc.Agosto)Agosto,sum(vc.Septiembre)Septiembre,sum(vc.Octubre)Octubre,sum(vc.Noviembre)Noviembre,sum(vc.Diciembre)Diciembre
from vw_ClubIntegralRepuestos_Mes_TicketEntrada vc
left join Empleados e on vc.CedulaVendedorRepuestos = e.CodigoEmpleado 
left join Centros c on e.CodigoCentro = c.CodigoCentro
--where e.CodigoCentro='1'
group by vc.Ano_Spiga,e.CodigoCentro,c.NombreCentro
)AS VENT FULL OUTER JOIN 
(
select distinct Ano,CodigoCentro,NombreCentro
,sum(isnull([1],0))'Enero',sum(isnull([2],0))'Febrero',sum(isnull([3],0))'Marzo'
,sum(isnull([4],0))'Abril',sum(isnull([5],0))'Mayo',sum(isnull([6],0))'Junio',sum(isnull([7],0))'Julio',sum(isnull([8],0))'Agosto'
,sum(isnull([9],0))'Septiembre',sum(isnull([10],0))'Octubre',sum(isnull([11],0))'Noviembre',sum(isnull([12],0))'Diciembre'
from
(
select p.Ano,p.CodigoEmpleado,p.CodigoCentro,c.NombreCentro,p.Mes,p.Presupuesto
from ClubIntegralRepuestosPresupuesto p
left join Centros c on p.CodigoCentro = c.CodigoCentro
)a
pivot(sum(Presupuesto) for Mes in([1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12]))p
group by Ano,CodigoCentro,NombreCentro
)AS PRE ON VENT.Ano_Spiga = PRE.Ano and VENT.CodigoCentro = PRE.CodigoCentro 


```
