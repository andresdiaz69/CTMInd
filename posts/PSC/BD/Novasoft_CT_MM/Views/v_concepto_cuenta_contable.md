# View: v_concepto_cuenta_contable

## Usa los objetos:
- [[v_rhh_Concep]]

```sql
CREATE view v_concepto_cuenta_contable as
select cod_con,cta_deb=max(cta_deb),cta_cre=max(cta_cre)
from(
	select cod_con,cta_deb,cta_cre=''
	from(
		select cod_con,cta_deb=substring(cta_deb,CHARINDEX('''',cta_deb)+1,8)
		from v_rhh_Concep
		where cta_deb is not null
		and cta_Deb <> ' ' 
		and (cta_deb like '%cod_emp%' or cta_deb like '%cta_gas%')
		union all
		select cod_con,cta_Deb
		from v_rhh_Concep
		where cta_deb is not null
		and cta_Deb <> ' ' 
		and (cta_deb not like '%cod_emp%' and cta_deb not like '%cta_gas%')
	)a 
	union all
	select cod_con,cta_deb='',cta_cre
	from(
		select cod_con,cta_cre=substring(cta_cre,CHARINDEX('''',cta_cre)+1,10)
		from v_rhh_Concep
		where cta_cre is not null
		and cta_cre <> ' ' 
		and (cta_cre like '%cod_emp%' or cta_cre like '%cta_gas%')
		union all
		select cod_con,cta_cre=substring(cta_cre,CHARINDEX('''',cta_cre)+1,10)
		from v_rhh_Concep
		where cta_cre is not null
		and cta_cre <> ' ' 
		and (cta_cre not like '%cod_emp%' and cta_cre not like '%cta_gas%' and cta_cre not like '%fdo%')
	)a 
)b group by cod_con
--order by cod_con


```
