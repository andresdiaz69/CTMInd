# View: v_MLC_liqhis_novasoft

## Usa los objetos:
- [[rhh_basesliq]]
- [[rhh_emplea]]
- [[rhh_liqhis]]
- [[v_rhh_Concep]]

```sql
CREATE view [dbo].[v_MLC_liqhis_novasoft] as
select distinct l.cod_cia,
l.cod_emp,l.cod_con,
nom_con=replace(replace(replace(replace(replace(replace(d.nom_con,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
emp_apl,Naturaleza= case when (nom_con like '%provisi%' or (l.nat_liq = 3 and l.cod_con <> '999901')) then 4 else l.nat_liq end,
l.fec_liq,l.ano_liq,l.per_liq,val_liq= sum(l.val_liq),tip_liq,d.cod_bas,b.nom_bas
from		rhh_liqhis		l
left join	v_rhh_Concep	d	on	d.cod_con=l.cod_con and d.mod_liq = l.mod_liq 
left join	rhh_emplea		e	on	l.cod_emp=e.cod_emp
left join	rhh_basesliq	b	on	b.cod_bas = d.cod_bas
where  l.val_liq <> 0
--and l.cod_emp = '1034301080'
--and l.nat_liq = 1
--and l.cod_con not in ('001050','001059')
--and year(fec_liq) in (2018,2019)
--and month(fec_liq) in (3,4,5,6,7,8,9,10,11,12)
group by  l.cod_emp,e.nom_emp,e.ap1_emp,e.ap2_emp,l.cod_con,d.nom_con,l.fec_liq,l.ano_liq,l.per_liq,l.cod_cia,
l.cod_cl1,l.cod_cl2,e.cla_sal,e.fec_ing,e.fec_egr,l.nat_liq,d.int_cnt,tip_liq,emp_apl,d.cod_bas,b.nom_bas
--order by l.cod_con


```
