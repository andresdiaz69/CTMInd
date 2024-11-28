# View: v_devengados_para_certificaciones

## Usa los objetos:
- [[rhh_emplea]]
- [[rhh_liqhis]]
- [[usr_rhh_concepcert]]
- [[v_rhh_Concep]]

```sql
CREATE view [dbo].[v_devengados_para_certificaciones] as
select distinct l.cod_emp,l.cod_con,
nom_con=replace(replace(replace(replace(replace(replace(d.nom_con,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
l.fec_liq,l.ano_liq,l.per_liq,val_liq=sum(l.val_liq),l.cod_cia,l.cod_cont
from		rhh_liqhis			l
left join	usr_rhh_concepcert	c	on	l.cod_con = c.cod_con
left join	v_rhh_Concep		d	on	d.cod_con=c.cod_con and d.mod_liq = l.mod_liq 
left join	rhh_emplea			e	on	l.cod_emp=e.cod_emp and l.cod_cia = e.cod_cia
where  l.val_liq <> 0
and l.nat_liq <> 3
and l.nat_liq = 1
and d.ind_sal = 1
and l.cod_con not in ('100054','100063')
group by  l.cod_emp,l.cod_con,d.nom_con,l.fec_liq,l.ano_liq,l.per_liq,l.cod_cia,l.cod_cont
--order by l.cod_con




```
