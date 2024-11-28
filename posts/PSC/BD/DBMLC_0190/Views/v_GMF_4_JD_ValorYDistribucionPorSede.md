# View: v_GMF_4_JD_ValorYDistribucionPorSede

## Usa los objetos:
- [[v_GMF_2_JD_ValoresVentasNetasTotalLineas]]
- [[v_GMF_3_JD_ValoresVentasNetasTotalSedes]]

```sql
create view [dbo].[v_GMF_4_JD_ValorYDistribucionPorSede] as
select s.empresa,s.año,s.mes,s.CodigoPresentacion,s.NombrePresentacion,s.sede,s.valor,ValorLinea=l.valor,
PorcentajeDistribucionPorSede = (s.valor/l.valor)*100
from		[dbo].[v_GMF_3_JD_ValoresVentasNetasTotalSedes]		s
left join	[dbo].[v_GMF_2_JD_ValoresVentasNetasTotalLineas]	l	on	s.empresa = l.empresa
																		and s.año=l.año 
																		and s.mes=l.mes
																		and s.codigopresentacion=l.codigopresentacion
--where s.año=2021 
--and s.mes=2
--and s.Codigopresentacion=72


```
