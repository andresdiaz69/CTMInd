# View: v_distribucion_por_empleado

## Usa los objetos:
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_clasif4]]
- [[gen_compania]]
- [[rhh_dis_con]]
- [[rhh_dis_emp]]
- [[rhh_emplea]]
- [[rhh_tbdistri]]

```sql
create view [dbo].[v_distribucion_por_empleado] as
select id=row_number() over (partition by getdate() order by t.cod_dis) ,
Cedula=d.cod_emp, Nombres = e.nom_emp + ' ' + e.ap1_emp+ ' '  + e.ap2_emp,Codigo_Distribucion=t.cod_dis,
Descripcion_Distribucion=t.des_dis,t.fec_ini,t.fec_fin,Codigo_Compañia=c.cod_cia,Nombre_Compañia=i.nom_cia,
Codigo_Marca=c.cod_cl3,nombre_marca=g3.nombre,
Codigo_Centro=c.cod_cco,nombre_centro=o.nom_cco,
Codigo_Seccion=c.cod_cl1,nombre_seccion=g1.nombre,
Codigo_Departamento=c.cod_cl2,nombre_departamento=g2.nombre,
Porcentaje_Distribucion=c.por_dis,
Fecha_Aplicacion=d.fec_apl
from		rhh_tbdistri	t
left join	rhh_dis_con		c	on	t.cod_dis = c.cod_dis 
left join	rhh_dis_emp		d	on	d.cod_dis = t.cod_dis
left join	rhh_emplea		e	on	e.cod_emp=d.cod_emp
left join	gen_compania	i	on	i.cod_cia=c.cod_cia
left join	gen_ccosto      o	on	c.cod_cco = o.cod_cco
left join	gen_clasif1		g1	on	g1.codigo=c.cod_cl1
left join	gen_clasif2		g2	on	g2.codigo=c.cod_cl2
left join	gen_clasif3		g3	on	g3.codigo=c.cod_cl3
left join	gen_clasif4		g4	on	g4.codigo=c.cod_cl4
where (t.fec_fin is null or t.fec_fin > getdate())
and d.cod_emp is not null
```
