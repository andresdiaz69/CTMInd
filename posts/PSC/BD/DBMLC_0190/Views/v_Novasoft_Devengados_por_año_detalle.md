# View: v_Novasoft_Devengados_por_año_detalle

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
- [[rhh_tbclasal]]
- [[v_rhh_Concep]]

```sql


CREATE view [dbo].[v_Novasoft_Devengados_por_año_detalle] as
select año=year(fec_liq),mes=month(fec_liq),--año=year(),mes = per_liq,
CodigoEmpleado=cod_emp,NombreEmpleado=Nombres,
CodigoEmpresa=cod_cia,NombreEmpresa=nom_cia,CodigoMarca= marca,NombreMarca = nombre_marca,CodigoCentro=Centro,NombreCentro=Nombre_centro,
CodigoSeccion=seccion,NombreSeccion=Nombre_seccion,CodigoDepartamento=Departamento,NombreDepartamento=Nombre_departamento,
CodigoCargo=codigo_Cargo,NombreCargo=Nombre_cargo,CodigoConcepto=cod_con,NombreConcepto=nom_con,
Valor=sum(val_liq),FechaIngreso=Fecha_Ingreso,FechaRetiro=Fecha_Retiro,Clase_salario
from(		
		select distinct l.fec_liq,l.ano_liq,l.per_liq,val_liq= sum(l.val_liq),Unidad_Negocio=l.cod_cl3,Nombre_Unidad_Negocio=g3.nombre,
		l.cod_emp,Nombres = e.nom_emp + ' ' + e.ap1_emp + ' ' + e.ap2_emp,l.cod_con,
		nom_con=replace(replace(replace(replace(replace(replace(d.nom_con,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
		l.cod_cia,i.nom_cia,marca=g3.codigo,nombre_marca=g3.nombre,centro=o.cod_cco,nombre_centro=o.nom_cco,
		seccion=l.cod_cl1,nombre_seccion=g1.nombre,Departamento=l.cod_cl2,nombre_departamento=g2.nombre,Codigo_Cargo=r.cod_car,Nombre_Cargo=r.nom_car,
		Fecha_Ingreso=e.fec_ing,Fecha_Retiro=e.fec_egr,Clase_salario=c.descripcion
		from		 [Novasoft_CT_MM].[dbo].rhh_liqhis	l
		left join	 [Novasoft_CT_MM].[dbo].gen_clasif3	g3	on	g3.codigo=l.cod_cl3 
		left join	 [Novasoft_CT_MM].[dbo].v_rhh_Concep	d	on	d.cod_con=l.cod_con and d.mod_liq = l.mod_liq 
		left join	 [Novasoft_CT_MM].[dbo].rhh_emplea	e	on	l.cod_emp=e.cod_emp 
		left join	 [Novasoft_CT_MM].[dbo].gen_compania	i	on	i.cod_cia=l.cod_cia
		left join	 [Novasoft_CT_MM].[dbo].gen_sucursal	s	on	l.cod_suc=s.cod_suc
		left join	 [Novasoft_CT_MM].[dbo].gen_ccosto	o	on	o.cod_cco=l.cod_cco
		left join	 [Novasoft_CT_MM].[dbo].gen_clasif1	g1	on	g1.codigo=l.cod_cl1
		left join	 [Novasoft_CT_MM].[dbo].gen_clasif2	g2	on	g2.codigo=l.cod_cl2
		left join	 [Novasoft_CT_MM].[dbo].gen_clasif4	g4	on	g4.codigo=l.cod_cl4
		left join	 [Novasoft_CT_MM].[dbo].rhh_cargos	r	on	r.cod_car=e.cod_car
		left join	 [Novasoft_CT_MM].[dbo].rhh_tbclasal	c	on	c.cla_sal = e.cla_sal
		where  l.val_liq <> 0
		and l.nat_liq = 1
		and year(l.fec_liq)>=2018
		group by  l.fec_liq,l.ano_liq,l.per_liq,l.cod_cl3,g3.nombre,l.cod_emp,e.nom_emp,e.ap1_emp,e.ap2_emp,l.cod_con,d.nom_con,l.cod_cia,i.nom_cia,
		g3.codigo,g3.nombre,o.cod_cco,o.nom_cco,l.cod_cl1,g1.nombre,l.cod_cl2,g2.nombre,r.cod_car,r.nom_car,e.fec_ing,e.fec_egr,c.descripcion
) a group by year(fec_liq),month(fec_liq),cod_emp,Nombres,cod_cia,nom_cia,marca,nombre_marca,Centro,Nombre_centro,seccion,Nombre_seccion,
 Departamento,Nombre_departamento,codigo_Cargo,Nombre_cargo,cod_con,nom_con,Fecha_Ingreso,Fecha_Retiro,Clase_salario

--119



```
