# View: v_MLC_Indemnizaciones_Empleados

## Usa los objetos:
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_clasif4]]
- [[gen_clasif5]]
- [[gen_compania]]
- [[gen_sucursal]]
- [[rhh_cargos]]
- [[rhh_cauretiro]]
- [[rhh_emplea]]
- [[rhh_liqhis]]
- [[rhh_nivcar]]
- [[v_consulta_retirados]]
- [[v_rhh_Concep]]

```sql
CREATE view [dbo].[v_MLC_Indemnizaciones_Empleados] as
select distinct Cedula=l.cod_emp,Nombres = e.nom_emp, apellido1=e.ap1_emp, apellido2= e.ap2_emp,
l.cod_con,nom_con=replace(replace(replace(replace(replace(replace(d.nom_con,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
l.fec_liq,l.ano_liq,l.per_liq,val_liq= sum(l.val_liq),l.cod_cia,Nombre_Compañia=i.nom_cia,codigo_marca=l.cod_suc,nombre_marca=s.nom_suc,
codigo_centro=l.cod_cco,nombre_centro=o.nom_cco,codigo_seccion=l.cod_cl1,
nombre_seccion=replace(replace(replace(replace(replace(replace(g1.nombre,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
codigo_departamento=l.cod_cl2,nombre_departamento=g2.nombre,
Unidad_Negocio=l.cod_cl3,Nombre_Unidad_Negocio=g3.nombre,
Codigo_Sucursal=l.cod_cl5,Nombre_Sucursal=g5.nombre,
Codigo_Cargo=e.cod_car,Nombre_Cargo=r.nom_car,Codigo_Cargo_Generico=l.cod_cl4,Nombre_Cargo_generico=g4.nombre,
email= replace(replace(replace(replace(replace(replace(e.e_mail,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
Codigo_Cargo_Junta=r.niv_car, Nombre_Cargo_Junta= v.des_niv,e.tip_con,Fecha_Ingreso=e.fec_ing,Fecha_Retiro=e.fec_egr,b.cau_ret,u.nom_ret
from		rhh_liqhis					l
left join	v_rhh_Concep				d	on	d.cod_con=l.cod_con and d.mod_liq = l.mod_liq 
left join	rhh_emplea					e	on	l.cod_emp=e.cod_emp --and l.cod_cia = e.cod_cia
join		v_consulta_retirados		b	on	b.cod_emp=e.cod_emp and b.cod_con = l.cod_cont
left join	gen_sucursal				s	on	l.cod_suc=s.cod_suc and l.cod_emp = e.cod_emp and l.cod_cia = e.cod_cia
left join	gen_clasif1					g1	on	g1.codigo=l.cod_cl1 and l.cod_emp = e.cod_emp and l.cod_cia = e.cod_cia
left join	gen_clasif2					g2	on	g2.codigo=l.cod_cl2 and l.cod_emp = e.cod_emp and l.cod_cia = e.cod_cia
left join	gen_clasif3					g3	on	g3.codigo=l.cod_cl3 and l.cod_emp = e.cod_emp and l.cod_cia = e.cod_cia
left join	gen_clasif4					g4	on	g4.codigo=l.cod_cl4 and l.cod_emp = e.cod_emp and l.cod_cia = e.cod_cia
left join	gen_clasif5					g5  on  g5.codigo=l.cod_cl5 and l.cod_emp = e.cod_emp and l.cod_cia = e.cod_cia
left join	rhh_cargos					r	on	r.cod_car=e.cod_car and l.cod_emp = e.cod_emp and l.cod_cia = e.cod_cia
left join	rhh_nivcar					v	on	v.niv_car = r.niv_car
left join	gen_compania				i	on	i.cod_cia=l.cod_cia and l.cod_emp = e.cod_emp and l.cod_cia = e.cod_cia
left join	gen_ccosto					o	on	o.cod_cco = e.cod_cco
left join	rhh_cauretiro				u	on	b.cau_ret=u.cau_ret
where	  l.cod_con in ( '001600','001610','100185')
and year(l.fec_liq)>2016
and ((l.cod_emp not in ( '1067947232','73243131') or l.cod_con not in ('100185')))
--and l.cod_emp  in ( '1067947232','73243131')
group by  l.cod_emp,e.nom_emp,e.ap1_emp,e.ap2_emp,l.cod_con,d.nom_con,l.fec_liq,l.ano_liq,l.per_liq,l.val_liq,l.cod_cia,i.nom_cia,l.cod_suc,s.nom_suc,
l.cod_cco,o.nom_cco,l.cod_cl1,g1.nombre,l.cod_cl2,g2.nombre,l.cod_cl3,g3.nombre,l.cod_cl5,g5.nombre,
e.cod_car,r.nom_car,l.cod_cl4,g4.nombre,e.e_mail,r.niv_car,v.des_niv,e.tip_con,e.fec_ing,e.fec_egr,l.nat_liq,e.cla_sal,b.cau_ret,u.nom_ret
--order by l.cod_con



```
