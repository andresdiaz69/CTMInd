# Stored Procedure: MLC_Conceptos_Novasoft

## Usa los objetos:
- [[rhh_concep]]
- [[rhh_DefConcep]]

```sql
create PROCEDURE [dbo].[MLC_Conceptos_Novasoft]    AS
select cod_concepto=c.cod_con,nombre_concepto=c.nom_con
from		rhh_DefConcep	c
left join	rhh_concep		p	on	c.cod_con=p.cod_con
where p.nov_rel = 4
and c.cod_con like '1%'
and c.ind_sal=1
and c.nom_con not like 'z (%'
```
