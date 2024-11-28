# Stored Procedure: MLC_consulta_empleados_activos

## Usa los objetos:
- [[gen_ccosto]]
- [[gen_ciudad]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_clasif4]]
- [[gen_clasif5]]
- [[gen_clasif6]]
- [[gen_compania]]
- [[gen_deptos]]
- [[gen_sucursal]]
- [[GTH_ClaNacOcuDet]]
- [[MLC_suspension_contratos]]
- [[rhh_cargos]]
- [[rhh_emplea]]
- [[rhh_nivcar]]
- [[rhh_tbclasal]]
- [[rhh_tipcon]]
- [[v_consulta_ultima_historia_laboral]]

```sql
create procedure [dbo].[MLC_consulta_empleados_activos] 

@fecha datetime

as

--declare @fecha datetime
--set @fecha = '20210228'

select Cedula,Nombres,apellido1,apellido2,Fecha_Ingreso,Codigo_Compañia,Nombre_Compañia,codigo_marca,nombre_marca,
codigo_centro,nombre_centro,codigo_seccion,nombre_seccion,codigo_departamento,nombre_departamento,Codigo_Sucursal,Nombre_Sucursal,
Unidad_Negocio,Nombre_Unidad_Negocio,Codigo_Cargo,Nombre_Cargo,Codigo_Cargo_Generico,Nombre_Cargo_generico,email,Codigo_Departamento_trabajo,
Nombre_Departamento_trabajo,Codigo_Ciudad_trabajo,Nombre_Ciudad_trabajo,Codigo_Cargo_Junta, Nombre_Cargo_Junta,Codigo_Tipo_Contrato,Nombre_Tipo_Contrato,Fecha_Nacimiento,
genero,Indicador_salario_variable,Indicador_comisiones,Prefijo_Cuenta_contable,Codigo_CNO,Descripcion_CNO,Codigo_clase_salario,Nombre_Clase_salario,
Email_Corporativo,Celular,Telefono_fijo,Estado,Documento=num_ide
from(
		select  orden=row_number() over (partition by cedula order by estado desc),
		Cedula,Nombres,apellido1,apellido2,Fecha_Ingreso,Codigo_Compañia,Nombre_Compañia,codigo_marca,nombre_marca,
		codigo_centro,nombre_centro,codigo_seccion,nombre_seccion,codigo_departamento,nombre_departamento,Codigo_Sucursal,Nombre_Sucursal,
		Unidad_Negocio,Nombre_Unidad_Negocio,
		Codigo_Cargo,Nombre_Cargo,Codigo_Cargo_Generico,Nombre_Cargo_generico,email,Codigo_Departamento_trabajo,Nombre_Departamento_trabajo,
		Codigo_Ciudad_trabajo,Nombre_Ciudad_trabajo,Codigo_Cargo_Junta, Nombre_Cargo_Junta,Codigo_Tipo_Contrato,Nombre_Tipo_Contrato,Fecha_Nacimiento,
		genero,Indicador_salario_variable,Indicador_comisiones,Prefijo_Cuenta_contable,Codigo_CNO,Descripcion_CNO,Codigo_clase_salario,Nombre_Clase_salario,
		Email_Corporativo,Celular,Telefono_fijo,
		Estado,num_ide
		from(
				select
				Cedula,Nombres,apellido1,apellido2,Fecha_Ingreso,Codigo_Compañia,Nombre_Compañia,codigo_marca,nombre_marca,
				codigo_centro,nombre_centro,codigo_seccion,nombre_seccion,codigo_departamento,a.nombre_departamento,Codigo_Sucursal,Nombre_Sucursal,
				Unidad_Negocio,Nombre_Unidad_Negocio,
				Codigo_Cargo,Nombre_Cargo,Codigo_Cargo_Generico,Nombre_Cargo_generico,email,Codigo_Departamento_trabajo,Nombre_Departamento_trabajo,
				Codigo_Ciudad_trabajo,Nombre_Ciudad_trabajo,Codigo_Cargo_Junta, Nombre_Cargo_Junta,Codigo_Tipo_Contrato,Nombre_Tipo_Contrato,Fecha_Nacimiento,
				genero,Indicador_salario_variable,Indicador_comisiones,Prefijo_Cuenta_contable,Codigo_CNO,Descripcion_CNO,Codigo_clase_salario,Nombre_Clase_salario,
				Email_Corporativo=e_mail_alt,Celular=tel_cel,Telefono_fijo=tel_res,
				Estado =	
						case	when convert(date,c.fec_ini) <= convert(date,getdate()) and  convert(date,c.fec_fin) >= convert(date,getdate())
									then 
										case	when c.cod_aus = 21 then 'Licencia No Remunerada'
												when c.cod_aus = 22 then 'Suspension de Contrato'
												when c.cod_aus = 120 then 'Medio Tiempo'
										else 'Activo'
									end 
								else 'Activo'
						end,num_ide
				from(
						select Cedula=e.cod_emp,Nombres = e.nom_emp, apellido1=e.ap1_emp, apellido2= e.ap2_emp,
						Fecha_Ingreso=b.fec_ini,Codigo_Compañia=b.cod_cia,Nombre_Compañia=i.nom_cia,
						codigo_marca=b.cod_suc,nombre_marca=s.nom_suc,
						Unidad_Negocio = 	b.cod_cl3,
						Nombre_Unidad_Negocio = replace(replace(replace(replace(replace(replace(g3.nombre,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
						codigo_centro=b.cod_cco,nombre_centro=o.nom_cco,
						codigo_seccion=b.cod_cl1,
						nombre_seccion=replace(replace(replace(replace(replace(replace(g1.nombre,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
						codigo_departamento=b.cod_cl2,nombre_departamento=g2.nombre,
						Codigo_Sucursal=b.cod_cl5,Nombre_Sucursal=g5.nombre,
						Codigo_Cargo=b.cod_car,Nombre_Cargo=r.nom_car,
						Codigo_Cargo_Generico=b.cod_cl4,Nombre_Cargo_generico=g4.nombre,
						replace(replace(replace(replace(replace(replace(e.e_mail,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'')email,
						Fecha_Nacimiento=e.fec_nac,genero=case when e.sex_emp = 1 then 'F' else 'M' end,Indicador_salario_variable=e.ind_svar,
						Codigo_Departamento_trabajo=b.cod_dep,Nombre_Departamento_trabajo=p.nom_dep,Codigo_Ciudad_trabajo=b.cod_ciu,Nombre_Ciudad_trabajo=u.nom_ciu,
						Codigo_Cargo_Junta=r.niv_car, Nombre_Cargo_Junta= v.des_niv,Codigo_Tipo_Contrato=e.tip_con,Nombre_Tipo_Contrato=t.nom_con,
						Prefijo_Cuenta_contable=e.cta_gas,Codigo_CNO=r.cno_det,Descripcion_CNO=d.des_cno_det,Codigo_clase_salario=e.cla_sal,Nombre_Clase_salario=l.descripcion,
						e_mail_alt,e.tel_cel,e.tel_res,Indicador_comisiones=b.cod_cl6,e.num_ide
						from rhh_emplea							e
						join v_consulta_ultima_historia_laboral b	on	b.cod_emp=e.cod_emp and b.cod_cia = e.cod_cia
						left join gen_sucursal					s	on	b.cod_suc=s.cod_suc and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
						left join gen_clasif1					g1	on	g1.codigo=b.cod_cl1 and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
						left join gen_clasif2					g2	on	g2.codigo=b.cod_cl2 and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
						left join gen_clasif3					g3	on	g3.codigo=b.cod_cl3 and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
						left join gen_clasif4					g4	on	g4.codigo=b.cod_cl4 and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
						left join gen_clasif5					g5  on  g5.codigo=b.cod_cl5 and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
						left join gen_clasif6					g6  on  g6.codigo=b.cod_cl6 and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia

						left join rhh_cargos					r	on	r.cod_car=b.cod_car and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
						left join rhh_nivcar					v	on	v.niv_car = r.niv_car
						left join gen_compania					i	on	i.cod_cia=b.cod_cia and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
						left join gen_ccosto					o	on	o.cod_cco = e.cod_cco
						left join gen_deptos					p	on	b.cod_pai=p.cod_pai and b.cod_dep=p.cod_dep	
						left join gen_ciudad					u	on	b.cod_pai=u.cod_pai and b.cod_dep=u.cod_dep	and b.cod_ciu=u.cod_ciu
						left join rhh_tipcon					t	on	t.tip_con=e.tip_con
						left join GTH_ClaNacOcuDet				d	on	d.cod_area_cno = r.cod_areaCNO and d.cod_cno_det = r.CNO_Det
						left join rhh_tbclasal					l	on	l.cla_sal = e.cla_sal
						where e.cod_emp <> '0' 
						and (b.fec_ret is null or b.fec_ret > getdate())
				) a	left join MLC_suspension_contratos	c	on	c.cod_emp = a.Cedula 
				--where cedula = '5078625549'
		)b 
) c	where orden = 1	
and Fecha_Ingreso <= @fecha
--and cedula in ('1003396230','1030687505','1110491837','52553768')		
--select * from MLC_suspension_contratos where cod_emp = '1234645750'



```
