# View: v_ultima_historia_laboral

## Usa los objetos:
- [[rhh_hislab]]

```sql
create view [dbo].[v_ultima_historia_laboral] as
select cod_emp,num_sec = max(num_sec),cod_con,fec_ini= max(fec_ini)
from(
		select cod_emp,num_sec,cod_con,fec_ini=NULL
		from(
			select cant=row_number() over(partition by cod_con order by cod_emp),
			cod_emp,num_sec= max(num_sec),cod_con=max(cod_con)
			from rhh_hislab
			group by cod_emp,cod_con
		) a

		union all

		select cod_emp,num_sec=0,cod_con,fec_ini
		from(
			select cod_emp,cod_con=max(cod_con),fec_ini=min(fec_ini)
			from rhh_hislab
			group by cod_emp,cod_con
		) a
)b 
group by cod_emp,cod_con
having max(fec_ini) is not null 
```
