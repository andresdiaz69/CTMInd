# View: v_Novasoft_Salario_basico

## Usa los objetos:
- [[gen_ccosto]]
- [[gen_ciudad]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_clasif4]]
- [[gen_clasif5]]
- [[gen_compania]]
- [[gen_deptos]]
- [[gen_sucursal]]
- [[rhh_cargos]]
- [[rhh_emplea]]
- [[rhh_nivcar]]
- [[rhh_tipcon]]
- [[v_consulta_ultima_historia_laboral]]

```sql


CREATE view [dbo].[v_Novasoft_Salario_basico] as
select distinct cedula,Codigo_Cargo,Nombre_Cargo,Codigo_Cargo_Generico,Nombre_Cargo_generico,Codigo_Compañia,Nombre_Compañia,codigo_marca=Unidad_Negocio,nombre_marca= Nombre_Unidad_Negocio,
codigo_centro,nombre_centro,Salario_Basico,salario_variable
from (
		select Cedula,Nombres = nombres + ' ' + apellido1 + ' ' + apellido2,Fecha_Ingreso,
		Codigo_Compañia,Nombre_Compañia,codigo_marca,nombre_marca,
		codigo_centro,nombre_centro,codigo_seccion,nombre_seccion,Codigo_Sucursal,Nombre_Sucursal,
		codigo_departamento,a.nombre_departamento,
		Unidad_Negocio,Nombre_Unidad_Negocio,
		Codigo_Cargo,Nombre_Cargo,Codigo_Cargo_Generico,Nombre_Cargo_generico,Codigo_Cargo_Junta,Nombre_Cargo_Junta,
		email,Fecha_Nacimiento,genero,salario_variable,Codigo_Departamento_trabajo,Nombre_Departamento_trabajo,
		Codigo_Ciudad_trabajo,Nombre_Ciudad_trabajo,Tipo_contrato=nom_con,Salario_Basico
		from(
				select Cedula=e.cod_emp,Nombres = e.nom_emp, apellido1=e.ap1_emp, apellido2= e.ap2_emp,
				Fecha_Ingreso=b.fec_ini,Codigo_Compañia=b.cod_cia,Nombre_Compañia=i.nom_cia,
				codigo_marca=b.cod_suc,nombre_marca=s.nom_suc,
				codigo_centro=b.cod_cco,nombre_centro=o.nom_cco,
				codigo_seccion=b.cod_cl1,
				nombre_seccion=replace(replace(replace(replace(replace(replace(g1.nombre,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
				codigo_departamento=b.cod_cl2,nombre_departamento=g2.nombre,
				Unidad_Negocio = 	b.cod_cl3,Nombre_Unidad_Negocio = g3.nombre,
				Codigo_Sucursal=b.cod_cl5,Nombre_Sucursal=g5.nombre,
				Codigo_Cargo=b.cod_car,Nombre_Cargo=r.nom_car,
				Codigo_Cargo_Generico=b.cod_cl4,Nombre_Cargo_generico=g4.nombre,
				email= replace(replace(replace(replace(replace(replace(e.e_mail,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
				Fecha_Nacimiento=e.fec_nac,genero=case when e.sex_emp = 1 then 'F' else 'M' end,salario_variable=e.ind_svar,
				Codigo_Departamento_trabajo=b.cod_dep,Nombre_Departamento_trabajo=p.nom_dep,Codigo_Ciudad_trabajo=b.cod_ciu,Nombre_Ciudad_trabajo=u.nom_ciu,Salario_Basico=e.sal_bas,
				Codigo_Cargo_Junta=r.niv_car, Nombre_Cargo_Junta= v.des_niv,e.tip_con,t.nom_con,e.cta_gas
				from		[Novasoft_CT_MM].dbo.rhh_emplea							e
				join		[Novasoft_CT_MM].dbo.v_consulta_ultima_historia_laboral b	on	b.cod_emp=e.cod_emp and b.cod_cia = e.cod_cia
				left join	[Novasoft_CT_MM].dbo.gen_sucursal					s	on	b.cod_suc=s.cod_suc and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
				left join	[Novasoft_CT_MM].dbo.gen_clasif1					g1	on	g1.codigo=b.cod_cl1 and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
				left join	[Novasoft_CT_MM].dbo.gen_clasif2					g2	on	g2.codigo=b.cod_cl2 and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
				left join	[Novasoft_CT_MM].dbo.gen_clasif3					g3	on	g3.codigo=b.cod_cl3 and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
				left join	[Novasoft_CT_MM].dbo.gen_clasif4					g4	on	g4.codigo=b.cod_cl4 and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
				left join	[Novasoft_CT_MM].dbo.gen_clasif5					g5  on  g5.codigo=b.cod_cl5 and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
				left join	[Novasoft_CT_MM].dbo.rhh_cargos					r	on	r.cod_car=b.cod_car and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
				left join	[Novasoft_CT_MM].dbo.rhh_nivcar					v	on	v.niv_car = r.niv_car
				left join	[Novasoft_CT_MM].dbo.gen_compania					i	on	i.cod_cia=b.cod_cia and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
				left join	[Novasoft_CT_MM].dbo.gen_ccosto					o	on	o.cod_cco = e.cod_cco
				left join	[Novasoft_CT_MM].dbo.gen_deptos					p	on	b.cod_pai=p.cod_pai and b.cod_dep=p.cod_dep	
				left join	[Novasoft_CT_MM].dbo.gen_ciudad					u	on	b.cod_pai=u.cod_pai and b.cod_dep=u.cod_dep	and b.cod_ciu=u.cod_ciu
				left join	[Novasoft_CT_MM].dbo.rhh_tipcon					t	on	t.tip_con=e.tip_con
				where e.cod_emp <> '0' 
				and (b.fec_ret is null or b.fec_ret > getdate())
		) a	-- where cedula like '%1030608241%'
) b 



```
