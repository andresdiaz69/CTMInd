# View: v_informes_fabrica

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
- [[v_rhh_Concep]]

```sql
-- lo liquidado
create view v_informes_fabrica as
select distinct l.cod_emp,Nombres = e.nom_emp + ' ' + e.ap1_emp + ' ' + e.ap2_emp,
l.cod_con,
nom_con=replace(replace(replace(replace(replace(replace(d.nom_con,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
emp_apl,Naturaleza= case when (nom_con like '%provisi%' or (l.nat_liq = 3 and l.cod_con <> '999901'))then 4 else l.nat_liq end,
l.ano_liq,l.per_liq,
val_liq= sum(l.val_liq)
,l.cod_cia,i.nom_cia,marca=g3.codigo,nombre_marca=g3.nombre,centro=o.cod_cco,nombre_centro=o.nom_cco,
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
left join	rhh_cargos	r	on	r.cod_car=e.cod_car
where  l.val_liq <> 0
--and g3.codigo = 0
--and d.int_cnt = 1
--and l.cod_cia = 1
--and s.cod_suc = 12
--and g3.codigo = 12
--and l.cod_cl1 = 109
--and year(fec_liq)=2018
--and l.nat_liq = 1
--and month(fec_liq) in (8)
--and g3.nombre = 'FORD'
--and l.cod_cl2 = 'VN'
--and l.val_liq = 683060
--and l.cod_emp = '1107051226'
--and l.cod_con = '008416'
--and d.nom_con like '%indemni%'
--and l.cod_emp in ('79939931')
--and l.cod_cia = 1
--and l.val_liq = 5399
--and fec_egr is null
--and e.cla_sal <> 2
group by  l.cod_emp,e.nom_emp,e.ap1_emp,e.ap2_emp,l.cod_con,d.nom_con,l.ano_liq,l.per_liq,l.cod_cia,i.nom_cia,
g3.codigo,g3.nombre,o.cod_cco,o.nom_cco,l.cod_cl1,g1.nombre,l.cod_cl2,g2.nombre,r.cod_car,r.nom_car,e.cla_sal,
e.fec_ing,e.fec_egr,l.nat_liq,d.int_cnt,tip_liq,emp_apl
--order by l.cod_emp
```
