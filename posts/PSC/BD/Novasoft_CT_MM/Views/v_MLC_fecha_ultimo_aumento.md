# View: v_MLC_fecha_ultimo_aumento

## Usa los objetos:
- [[rhh_emplea]]
- [[rhh_hislab]]

```sql
create view v_MLC_fecha_ultimo_aumento as
select cod_emp,fecha_Ult_Aumento
from(
	select cod_emp,fecha_Ult_Aumento =case when fch_retro is null then fec_aum else case when fch_retro < fec_aum then fch_retro else NULL end end
	from(
		select cod_emp,fch_retro= max(fch_retro),fec_aum = max(fec_aum)
		from(
			select cod_emp,fch_retro,fec_aum
			from(
				select cod_emp,fch_retro,fec_aum = NULL
				from rhh_hislab
				where (fec_ret is null or fec_ret >= getdate())
				and  (cau_ret is null or cau_ret = 0)
				--and cod_emp in ('1022447338','1144162923','79578100','1000163696','51975078')
				--and cod_emp = '1000163696'
				union all
				select cod_emp,fch_retro= NULL,fec_aum 
				from rhh_emplea 
				where (fec_egr is null or fec_egr >= getdate())
				and cod_emp <> '0'
				--and  cod_Emp in ('1022447338','1144162923','79578100','1000163696','51975078') 
				--and cod_emp = '1000163696'
			) a 
		) b group by cod_emp
	)c 
) d where fecha_Ult_Aumento is not null



```
