# View: v_GMF_14_Valor_GMFADistribuirPorSede

## Usa los objetos:
- [[v_GMF_13_ValorYDistribucionPorSede]]
- [[v_GMF_7_ValorYPorcentajeDistribucionLineas]]

```sql
CREATE view [dbo].[v_GMF_14_Valor_GMFADistribuirPorSede] as
select l.año,l.mes,s.empresa,s.codigopresentacion,s.nombrepresentacion,s.sede,l.ValorADistribuirPorLinea,
s.PorcentajeDistribucionSede,ValorSedeGMF = (l.ValorADistribuirPorLinea*s.PorcentajeDistribucionSede)/100
from		v_GMF_13_ValorYDistribucionPorSede				s
left join	v_GMF_7_ValorYPorcentajeDistribucionLineas	l	on	s.empresa = l.Empresa
																and s.año = case when l.mes = 1 then l.año-1 else l.año end
																and s.mes = case when l.mes = 1 then 12 else l.mes-1 end
																and s.codigopresentacion = l.CodigoPresentacion
--where l.año=2021
--and l.mes = 3
--and l.CodigoPresentacion = 12

```
