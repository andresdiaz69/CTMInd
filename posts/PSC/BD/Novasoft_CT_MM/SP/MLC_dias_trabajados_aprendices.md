# Stored Procedure: MLC_dias_trabajados_aprendices

## Usa los objetos:
- [[rhh_emplea]]
- [[rhh_liqhis]]

```sql
CREATE  PROCEDURE [dbo].[MLC_dias_trabajados_aprendices] 
@ano_liq	int,
@mes_liq	int
as

--Dias trabajados Aprendices
select l.cod_emp,l.ano_liq,l.per_liq,dias=sum(l.can_liq) 
from		rhh_liqhis	l
left join	rhh_emplea	e	on	l.cod_emp = e.cod_emp
where l.ano_liq=	@ano_liq
and l.per_liq=	@mes_liq
and l.cod_con='001050'
and e.cod_car in ('167','74')
group by l.cod_emp,l.ano_liq,l.per_liq
```
