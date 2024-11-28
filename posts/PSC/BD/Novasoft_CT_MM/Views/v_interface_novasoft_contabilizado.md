# View: v_interface_novasoft_contabilizado

## Usa los objetos:
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_clasif4]]
- [[gen_compania]]
- [[gen_sucursal]]
- [[gen_terceros]]
- [[rhh_cargos]]
- [[rhh_emplea]]
- [[rhh_Intconta_detalle]]
- [[v_rhh_Concep]]
- [[v_spiga_cuentas_nomina_presentaciones]]

```sql
create view v_interface_novasoft_contabilizado as
---Lo contable
select Codigo_Compañia=d.cod_cia,Nombre_Compañia=i.nom_cia,Codigo_Marca=d.cod_cl3,Nombre_Marca=g3.nombre,
Codigo_Centro=d.cod_cco,Nombre_Centro=o.nom_cco,Codigo_Seccion=d.cod_cl1,Nombre_Seccion=g1.nombre,
Codigo_Departamento=d.cod_cl2,Nombre_Departamento=g2.nombre,d.cod_cue,Cedula=d.cod_emp,
Nombres=e.nom_emp + ' ' + e.ap1_emp + ' ' + e.ap2_emp,d.cod_ter,t.ter_nombre,
d.cod_con,d.des_con,valor=sum(d.deb_mov)-sum(d.cre_mov),d.fec_cte,d.ano_doc,d.per_doc,d.tip_liq,
Naturaleza= case when (v.nom_con like '%provisi%' or (v.nat_con = 3 and v.cod_con <> '999901'))then 4 else v.nat_con end,
Presentacion=descripcion_conceptos_balance
from rhh_Intconta_detalle							d
left join	rhh_emplea								e	on	d.cod_emp=e.cod_emp and d.cod_cia = e.cod_cia
left join	gen_compania							i	on	i.cod_cia=d.cod_cia
left join	gen_sucursal							s	on	d.cod_suc=s.cod_suc
left join	gen_ccosto								o	on	o.cod_cco=d.cod_cco
left join	gen_clasif1								g1	on	g1.codigo=d.cod_cl1
left join	gen_clasif2								g2	on	g2.codigo=d.cod_cl2
left join	gen_clasif3								g3	on	g3.codigo=d.cod_cl3
left join	gen_clasif4								g4	on	g4.codigo=d.cod_cl4
left join	rhh_cargos								r	on	r.cod_car=e.cod_car
left join	gen_terceros							t	on	d.cod_ter = t.ter_nit
left join	v_rhh_Concep							v	on	d.cod_con=v.cod_con and v.mod_liq = d.mod_liq 
left join	v_spiga_cuentas_nomina_presentaciones	p	on	p.cuentas collate  database_default = d.cod_cue
group by d.cod_cia,d.cod_cl1,d.cod_cl2,d.cod_cl3,d.cod_cl4,d.cod_cue,d.cod_emp,d.cod_ter,
d.cod_con,d.des_con,d.fec_cte,d.ano_doc,d.per_doc,i.nom_cia,g4.nombre,g1.nombre,g3.nombre,g2.nombre,
e.nom_emp,e.ap1_emp,e.ap2_emp,t.ter_nombre,v.nat_con,v.nom_con,tip_liq,v.cod_con,d.cod_cco,o.nom_cco,descripcion_conceptos_balance

```
