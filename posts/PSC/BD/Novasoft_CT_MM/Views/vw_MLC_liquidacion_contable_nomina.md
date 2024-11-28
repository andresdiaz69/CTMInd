# View: vw_MLC_liquidacion_contable_nomina

## Usa los objetos:
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_clasif4]]
- [[gen_compania]]
- [[gen_sucursal]]
- [[rhh_cargos]]
- [[rhh_emplea]]
- [[rhh_liqhis]]
- [[v_MLC_conceptos_cuenta_contable]]
- [[v_rhh_Concep]]

```sql
create view vw_MLC_liquidacion_contable_nomina as
select cod_emp,nombres,cod_con,nom_con,cuenta_debito,cuenta_credito,Naturaleza,fec_liq,año,mes,valor,cod_cia,nom_cia,cod_marca,
nombre_marca,cod_centro,nombre_centro,cod_seccion,nombre_seccion,cod_departamento,nombre_departamento,Codigo_Cargo,Nombre_Cargo,cla_sal,
int_cnt,tip_liq
from(
	select cod_emp,nombres,cod_con,nom_con,
	cuenta_debito=case	when cuentacredito='0' 
						then
							case when len(cuentadebito) < 10 then  (convert(varchar,cta_gas)+convert(varchar,cuentadebito)) 
								else convert(varchar,cuentadebito)
							end
					else '0' 
					end,
	cuenta_credito=case	when cuentadebito='0' 
						then
							case when len(cuentacredito) < 10 then  (convert(varchar,cta_gas)+convert(varchar,cuentacredito)) 
								else convert(varchar,cuentacredito)
							end
					else '0' 
					end,
	naturaleza,fec_liq,Año=year(fec_liq),Mes=month(fec_liq),
	Valor=sum(val_liq),cod_cia,nom_cia,cod_marca=marca,nombre_marca,cod_centro=centro,nombre_centro,cod_seccion=seccion,nombre_seccion,
	cod_departamento=departamento,nombre_departamento,Codigo_Cargo,nombre_cargo,cla_sal,int_cnt,tip_liq
	from(
		select distinct l.cod_emp,Nombres = e.nom_emp + ' ' + e.ap1_emp + ' ' + e.ap2_emp,
		l.cod_con,nom_con=replace(replace(replace(replace(replace(replace(d.nom_con,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
		cta_gas=rtrim(ltrim(e.cta_gas)),cuentadebito=convert(varchar,c.cuentadebito),cuentacredito=convert(varchar,c.cuentacredito),
		emp_apl,Naturaleza= case when (d.nom_con like '%provisi%' or (l.nat_liq = 3 and l.cod_con <> '999901'))then 4 else l.nat_liq end,
		l.fec_liq,l.ano_liq,l.per_liq,val_liq= sum(l.val_liq),l.cod_cia,i.nom_cia,marca=g3.codigo,nombre_marca=g3.nombre,centro=o.cod_cco,nombre_centro=o.nom_cco,
		seccion=l.cod_cl1,nombre_seccion=g1.nombre,Departamento=l.cod_cl2,nombre_departamento=g2.nombre,Codigo_Cargo=r.cod_car,Nombre_Cargo=r.nom_car,
		Fecha_Ingreso=e.fec_ing,Fecha_Retiro=e.fec_egr,e.cla_sal,d.int_cnt,tip_liq
		from		rhh_liqhis		l
		left join	v_rhh_Concep	d	on	d.cod_con=l.cod_con and d.mod_liq = l.mod_liq 
		left join	rhh_emplea		e	on	l.cod_emp=e.cod_emp --and l.cod_cia = e.cod_cia
		left join	gen_compania	i	on	i.cod_cia=l.cod_cia
		left join	gen_sucursal	s	on	l.cod_suc=s.cod_suc
		left join	gen_ccosto		o	on	o.cod_cco=l.cod_cco
		left join	gen_clasif1		g1	on	g1.codigo=l.cod_cl1
		left join	gen_clasif2		g2	on	g2.codigo=l.cod_cl2
		left join	gen_clasif3		g3	on	g3.codigo=l.cod_cl3
		left join	gen_clasif4		g4	on	g4.codigo=l.cod_cl4
		left join	rhh_cargos		r	on	r.cod_car=e.cod_car
		left join	v_MLC_conceptos_cuenta_contable	c	on	c.cod_con = l.cod_con and c.mod_liq = l.mod_liq
		where  l.val_liq <> 0
		--and l.cod_cia = 6
		--and year(fec_liq)=2020
		--and month(fec_liq) in (4)
		and (c.cuentadebito is not null or c.cuentacredito is not null)
		group by  l.cod_emp,e.nom_emp,e.ap1_emp,e.ap2_emp,l.cod_con,d.nom_con,l.fec_liq,l.ano_liq,l.per_liq,l.cod_cia,i.nom_cia,
		g3.codigo,g3.nombre,o.cod_cco,o.nom_cco,l.cod_cl1,g1.nombre,l.cod_cl2,g2.nombre,r.cod_car,r.nom_car,e.cla_sal,
		e.fec_ing,e.fec_egr,l.nat_liq,d.int_cnt,tip_liq,emp_apl,c.cuentadebito,c.cuentacredito,e.cta_gas
	)a 
	group by cod_emp,nombres,cod_con,nom_con,cta_gas,cuentadebito,cta_gas,cuentacredito,naturaleza,fec_liq,
	cod_cia,nom_cia,marca,nombre_marca,centro,nombre_centro,seccion,nombre_seccion,departamento,nombre_departamento,
	Codigo_Cargo,nombre_cargo,cla_sal,int_cnt,tip_liq
)b where  int_cnt = 1
and (len(cuenta_debito)>=10 or len(cuenta_credito)>=10)
and (cuenta_debito like '5%' or cuenta_debito like '6%' or cuenta_credito like '5%' or cuenta_debito like '6%')
--order by cod_con
```
