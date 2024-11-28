# View: v_GMF_13_ValorYDistribucionPorSede

## Usa los objetos:
- [[v_GMF_11_ValoresVentasNetasTotalLineas]]
- [[v_GMF_12_ValoresVentasNetasTotalSedes]]

```sql

CREATE view [dbo].[v_GMF_13_ValorYDistribucionPorSede] as
select l.empresa,l.año,l.mes,l.codigopresentacion,l.nombrepresentacion,s.sede,l.valor,ValorLinea=s.Valor,
PorcentajeDistribucionSede = case when l.valor <> 0 then  (s.valor/l.Valor)*100 else 0 end
from		v_GMF_11_ValoresVentasNetasTotalLineas	l
left join	v_GMF_12_ValoresVentasNetasTotalSedes	s	on	l.año=s.año
														and l.mes=s.mes
														and l.codigopresentacion=s.codigopresentacion	
														and l.empresa=s.empresa
--where l.año=2021 
--and l.mes=2
--and l.codigopresentacion = 12

```
