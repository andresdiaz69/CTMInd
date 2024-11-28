# View: v_MLC_contabilizacion_nomina_BI

## Usa los objetos:
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_clasif4]]
- [[gen_compania]]
- [[gen_terceros]]
- [[rhh_cargos]]
- [[rhh_emplea]]
- [[rhh_Intconta_detalle]]
- [[V_rhh_concep]]
- [[v_spiga_cuentas_nomina_presentaciones]]

```sql
CREATE view [dbo].[v_MLC_contabilizacion_nomina_BI] as
select Codigo_Compañia=d.cod_cia,Nombre_Compañia=i.nom_cia,Codigo_Marca=d.cod_cl3,Nombre_Marca=g3.nombre,
Codigo_Centro=d.cod_cco,Nombre_Centro=o.nom_cco,Codigo_Seccion=d.cod_cl1,Nombre_Seccion=g1.nombre,
Codigo_Departamento=d.cod_cl2,Nombre_Departamento=g2.nombre,d.cod_cue,Cedula=d.cod_emp,

Nombres=e.nom_emp + ' ' + e.ap1_emp + ' ' + e.ap2_emp,d.cod_ter,t.ter_nombre,

d.cod_con,d.des_con,valor=sum(d.deb_mov)-sum(d.cre_mov),d.fec_cte,d.ano_doc,d.per_doc, Periodo = d.ano_doc + '-' + d.per_doc,
Presentacion=isnull(descripcion_conceptos_balance,'Sin_Definir'),e.cod_car,r.nom_car,g4.nombre--,v.nat_con
from [Novasoft_CT_MM].dbo.rhh_Intconta_detalle							d
left join	[Novasoft_CT_MM].dbo.rhh_emplea								e	on	d.cod_emp =e.cod_emp --and d.cod_cia = e.cod_cia
left join	[Novasoft_CT_MM].dbo.gen_compania							i	on	i.cod_cia=d.cod_cia
left join	[Novasoft_CT_MM].dbo.gen_ccosto								o	on	o.cod_cco = d.cod_cco
left join	[Novasoft_CT_MM].dbo.gen_clasif1							g1	on	g1.codigo=d.cod_cl1
left join	[Novasoft_CT_MM].dbo.gen_clasif2							g2	on	g2.codigo=d.cod_cl2
left join	[Novasoft_CT_MM].dbo.gen_clasif3							g3	on	g3.codigo=d.cod_cl3
left join	[Novasoft_CT_MM].dbo.gen_clasif4							g4	on	g4.codigo=d.cod_cl4
left join	[Novasoft_CT_MM].dbo.rhh_cargos								r	on	r.cod_car=e.cod_car
left join	[Novasoft_CT_MM].dbo.gen_terceros							t	on	d.cod_ter = t.ter_nit
left join	[Novasoft_CT_MM].dbo.v_spiga_cuentas_nomina_presentaciones	p	on	p.cuentas collate  database_default = d.cod_cue
left join	[Novasoft_CT_MM].dbo.V_rhh_concep							v	on	d.cod_con = v.cod_con	and d.mod_liq = v.mod_liq						
where (d.cod_cue like '4%'  or d.cod_cue like '5%' or d.cod_cue like '6%')
and nat_con = 1
--and year(fec_cte)=2023
--and month(fec_cte)=7
--and e.nom_emp is null
--and descripcion_conceptos_balance is null
--and d.cod_emp ='79578100'
--and d.cod_con = '400036'
group by d.cod_cia,d.cod_cl1,d.cod_cl2,d.cod_cl3,d.cod_cl4,d.cod_cue,d.cod_emp,d.cod_ter,
d.cod_con,d.des_con,d.fec_cte,d.ano_doc,d.per_doc,i.nom_cia,g4.nombre,g1.nombre,g3.nombre,g2.nombre,
e.nom_emp,e.ap1_emp,e.ap2_emp,t.ter_nombre,descripcion_conceptos_balance,d.cod_cco,o.nom_cco,e.cod_car,r.nom_car,v.nat_con
--7010

```
