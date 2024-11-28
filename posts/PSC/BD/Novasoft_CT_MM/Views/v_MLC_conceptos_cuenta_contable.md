# View: v_MLC_conceptos_cuenta_contable

## Usa los objetos:
- [[v_rhh_Concep]]

```sql
CREATE view v_MLC_conceptos_cuenta_contable as
select cod_con,nom_con,nat_con,mod_liq,apl_con,int_cnt,
cuentadebito=convert(varchar,substring(cta_deb,prim_comilla+1,Cant_digitos),0),
CuentaCredito='0'
from(
	select cod_con,nom_con,nat_con,mod_liq,apl_con,int_cnt,cta_deb,cta_cre,
	Prim_comilla,Cuenta,Seg_comilla,
	Cant_digitos=((Seg_comilla-Prim_comilla)-1)
	from(
			select cod_con,nom_con,nat_con,mod_liq,apl_con,int_cnt,cta_deb,cta_cre,
			Prim_comilla,
			Cuenta = substring(cta_deb,prim_comilla+1,8),
			Seg_comilla = charindex('''',cta_deb,prim_comilla+1)
			from(
				select cod_con,nom_con,nat_con,mod_liq,apl_con,int_cnt,cta_deb,cta_cre,
				Prim_comilla=charindex('''',cta_deb,1)
				from v_rhh_Concep
				where cta_deb is not null
				and cta_deb <> ' ' 
			) a where Prim_comilla <> 0 
	)b
)c

union all

select cod_con,nom_con,nat_con,mod_liq,apl_con,int_cnt,cuentadebito='0',
cuentacredito=convert(varchar,substring(cta_cre,prim_comilla+1,Cant_digitos),0)
from(
	select cod_con,nom_con,nat_con,mod_liq,apl_con,int_cnt,cta_deb,cta_cre,
	Prim_comilla,Cuenta,Seg_comilla,
	Cant_digitos=((Seg_comilla-Prim_comilla)-1)
	from(
			select cod_con,nom_con,nat_con,mod_liq,apl_con,int_cnt,cta_deb,cta_cre,
			Prim_comilla,
			Cuenta = substring(cta_cre,prim_comilla+1,8),
			Seg_comilla = charindex('''',cta_cre,prim_comilla+1)
			from(
				select cod_con,nom_con,nat_con,mod_liq,apl_con,int_cnt,cta_deb,cta_cre,
				Prim_comilla=charindex('''',cta_cre,1)
				from v_rhh_Concep
				where cta_cre is not null
				and cta_cre <> ' ' 
			) a where Prim_comilla <> 0 
	)b
)c
union all

select cod_con,nom_con,nat_con,mod_liq,apl_con,int_cnt,cuentadebito=convert(varchar,cta_Deb),cuentacredito='0'
from v_rhh_Concep
where cta_deb is not null and cta_deb <> ' ' 
and cta_deb not like 'usr%' and cta_deb not like 'sp%'
union all
select cod_con,nom_con,nat_con,mod_liq,apl_con,int_cnt,cuentadebito='0',cuentacredito=convert(varchar,0)
from v_rhh_Concep
where cta_cre is not null and cta_cre <> ' ' 
and cta_cre not like 'usr%' and cta_cre not like 'sp%'


```
