# Stored Procedure: MLC_dias_trabajados

## Usa los objetos:
- [[rhh_liqhis]]

```sql

CREATE PROCEDURE [dbo].[MLC_dias_trabajados] 
@ano_liq	int,
@mes_liq	int
as
--Dias trabajados
select cod_emp,ano_liq,per_liq,dias=sum(can_liq) 
from rhh_liqhis
where cod_cia in (1,5,6)
and ano_liq=@ano_liq
and per_liq=@mes_liq
and cod_con='001050'
group by cod_emp,ano_liq,per_liq
```
