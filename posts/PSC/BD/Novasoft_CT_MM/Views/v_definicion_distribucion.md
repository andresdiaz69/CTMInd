# View: v_definicion_distribucion

## Usa los objetos:
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_clasif4]]
- [[gen_compania]]
- [[rhh_dis_con]]
- [[rhh_tbdistri]]

```sql
CREATE view [dbo].[v_definicion_distribucion] as
select id=row_number() over (partition by getdate() order by t.cod_dis) ,
Codigo_Distribucion=t.cod_dis,Descripcion_Distribucion=t.des_dis,t.fec_ini,t.fec_fin,Codigo_Compañia=c.cod_cia,
Nombre_Compañia=i.nom_cia,Codigo_Marca=c.cod_cl3,nombre_marca=g3.nombre,Codigo_Centro=c.cod_cco,nombre_centro=nom_cco,
Codigo_Seccion=c.cod_cl1,nombre_seccion=g1.nombre,Codigo_Departamento=c.cod_cl2,nombre_departamento=g2.nombre,
Porcentaje_Distribucion=c.por_dis
from		rhh_tbdistri	t
left join	rhh_dis_con		c	on	t.cod_dis = c.cod_dis 
left join	gen_compania	i	on	i.cod_cia=c.cod_cia
left join	gen_clasif1		g1	on	g1.codigo=c.cod_cl1
left join	gen_clasif2		g2	on	g2.codigo=c.cod_cl2
left join	gen_clasif3		g3	on	g3.codigo=c.cod_cl3
left join	gen_clasif4		g4	on	g4.codigo=c.cod_cl4
left join	gen_ccosto		cc	on	c.cod_cco = cc.cod_cco
where (t.fec_fin is null or t.fec_fin > getdate())
and c.cod_dis is not null

```
