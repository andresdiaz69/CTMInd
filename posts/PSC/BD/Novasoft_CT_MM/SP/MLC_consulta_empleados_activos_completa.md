# Stored Procedure: MLC_consulta_empleados_activos_completa

## Usa los objetos:
- [[gen_bancos]]
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
- [[gen_tipide]]
- [[GTH_ClaNacOcuDet]]
- [[MLC_suspension_contratos]]
- [[rhh_cargos]]
- [[rhh_emplea]]
- [[rhh_nivcar]]
- [[rhh_tbclasal]]
- [[rhh_tbestlab]]
- [[rhh_tbfondos]]
- [[rhh_tbTipPag]]
- [[rhh_tipcon]]
- [[rhh_tipoliq]]
- [[usr_rhh_telpersonas]]
- [[v_consulta_ultima_historia_laboral]]

```sql
CREATE PROCEDURE [dbo].[MLC_consulta_empleados_activos_completa] 
AS
BEGIN

	SET NOCOUNT ON
	SET FMTONLY OFF

	SELECT Estado =	
			case	when convert(date,c.fec_ini) <= convert(date,getdate()) and  convert(date,c.fec_fin) >= convert(date,getdate())
						then 
							case	when c.cod_aus = 21 then 'Licencia No Remunerada'
									when c.cod_aus = 22 then 'Suspension de Contrato'
									when c.cod_aus = 120 then 'Medio Tiempo'
							else 'Activo'
						end 
					else 'Activo'
			end,
		Cedula,Codigo_Tipo_Identificacion,Descripcion_Tipo_Identificacion,
		Nombres,apellido1,apellido2,Fecha_Ingreso,Codigo_Compañia,Nombre_Compañia,codigo_marca,nombre_marca,
		codigo_centro,nombre_centro,codigo_seccion,nombre_seccion,codigo_departamento,a.nombre_departamento,Codigo_Sucursal,Nombre_Sucursal,
		Unidad_Negocio,Nombre_Unidad_Negocio,Codigo_Cargo,Nombre_Cargo,Codigo_Cargo_Generico,Nombre_Cargo_generico,Codigo_Cargo_Junta, Nombre_Cargo_Junta,
		Codigo_Departamento_trabajo,Nombre_Departamento_trabajo,Codigo_Ciudad_trabajo,Nombre_Ciudad_trabajo,
		Codigo_Tipo_Contrato,Nombre_Tipo_Contrato,Fecha_Nacimiento,genero,Indicador_salario_variable,Indicador_comisiones,Prefijo_Cuenta_contable,Codigo_CNO,
		Descripcion_CNO,Codigo_clase_salario,Nombre_Clase_salario,email,Email_Corporativo=e_mail_alt,Celular=tel_cel,Telefono_fijo=tel_res,
		Cel_corporativo,Cel_personal,Fijo_personal,Fijo_corporativo,Ext_corporativo,dir_res,SalarioBasico = sal_bas,RegimenSalarial,
		Codigo_TipoLiquidacion,Descripcion_TipoLiquidacion,CodigoFormaPago,DescripcionFormaPago,
		Codigo_Banco = cod_ban, Nombre_Banco=nom_ban,
		NumeroCuenta,Codigo_Estado=est_lab,Descripcion_Estado=nom_est,
		CodigoFondoRiesgos=fdo_ate,Nombre_FondoRiesgos,PorcentajeRiesgos=por_ate,
		CodigoFondoCesantias=fdo_ces,Nombre_FondoCesantias,CodigoFondoPensiones=fdo_pen,Nombre_FondoPensiones,
		CodigoFondoSalud=fdo_sal,Nombre_FondoSalud,CodigoCajaCompensacion,Nombre_CajaCompensacion,
		met_ret,por_ret,mto_dto,ind_DecRenta,Concepto_DIAN2280,GrupoSanguineo=gru_san,Factor=fac_rhh,Emp_Doc,CodigoAlterno
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
			e_mail_alt,e.tel_cel,e.tel_res,Codigo_Tipo_Identificacion=e.tip_ide,Descripcion_Tipo_Identificacion=x.des_tip,
			Cel_corporativo,Cel_personal,Fijo_personal,Fijo_corporativo,Ext_corporativo,e.dir_res,e.sal_bas,
			RegimenSalarial = case when reg_sal = 1 then 'Ley Anterior' else 'Ley 50' end,CodigoFormaPago=e.tip_pag,DescripcionFormaPago=pag.nom_pag,NumeroCuenta=e.cta_ban,
			Codigo_TipoLiquidacion=e.cod_tlq,Descripcion_TipoLiquidacion=liq.nom_tlq,e.est_lab,est.nom_est,e.cod_ban,ban.nom_ban,
			e.fdo_ate,Nombre_FondoRiesgos=ate.nom_fdo,e.por_ate,e.fdo_ces,Nombre_FondoCesantias=ces.nom_fdo,e.fdo_pen,Nombre_FondoPensiones=pen.nom_fdo,
			e.fdo_sal,Nombre_fondoSalud=sal.nom_fdo,CodigoCajaCompensacion=ccf_emp,Nombre_CajaCompensacion=ccf.nom_fdo,Indicador_comisiones=b.cod_cl6,

			met_ret,por_ret,mto_dto,ind_DecRenta,Concepto_DIAN2280,e.gru_san,e.fac_rhh,Emp_Doc=e.cod_pagelec,
			CodigoAlterno = e.cod_reloj

			from rhh_emplea							e
			join v_consulta_ultima_historia_laboral b	on	b.cod_emp=e.cod_emp and b.cod_cia = e.cod_cia
			left join gen_sucursal					s	on	b.cod_suc=s.cod_suc and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
			left join gen_clasif1					g1	on	g1.codigo=b.cod_cl1 and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
			left join gen_clasif2					g2	on	g2.codigo=b.cod_cl2 and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
			left join gen_clasif3					g3	on	g3.codigo=b.cod_cl3 and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
			left join gen_clasif4					g4	on	g4.codigo=b.cod_cl4 and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
			left join gen_clasif5					g5  on  g5.codigo=b.cod_cl5 and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
			left join rhh_cargos					r	on	r.cod_car=b.cod_car and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
			left join rhh_nivcar					v	on	v.niv_car = r.niv_car
			left join gen_compania					i	on	i.cod_cia=b.cod_cia and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
			left join gen_ccosto					o	on	o.cod_cco = e.cod_cco
			left join gen_deptos					p	on	b.cod_pai=p.cod_pai and b.cod_dep=p.cod_dep	
			left join gen_ciudad					u	on	b.cod_pai=u.cod_pai and b.cod_dep=u.cod_dep	and b.cod_ciu=u.cod_ciu
			left join rhh_tipcon					t	on	t.tip_con=e.tip_con
			left join GTH_ClaNacOcuDet				d	on	d.cod_area_cno = r.cod_areaCNO and d.cod_cno_det = r.CNO_Det
			left join rhh_tbclasal					l	on	l.cla_sal = e.cla_sal
			left join gen_tipide					x	on	x.cod_tip = e.tip_ide
			left join usr_rhh_telpersonas			tel	on	e.cod_emp = Empleado
			left join rhh_tbTipPag					pag	on	e.tip_pag = pag.tip_pag
			left join rhh_tipoliq					liq	on	e.cod_tlq = liq.cod_tlq
			left join rhh_tbestlab					est	on	e.est_lab = est.est_lab
			left join gen_bancos					ban on e.cod_ban = ban.cod_ban
			left join rhh_tbfondos					ate	on	ate.cod_fdo = e.fdo_ate
			left join rhh_tbfondos					ces	on	ces.cod_fdo = e.fdo_ces
			left join rhh_tbfondos					pen on	pen.cod_fdo = e.fdo_pen			
			left join rhh_tbfondos					sal on  sal.cod_fdo = e.fdo_sal
			left join rhh_tbfondos					ccf	on	ccf.cod_fdo = e.ccf_emp
			where e.cod_emp <> '0' 
			and (b.fec_ret is null or b.fec_ret > getdate())
	) a		
	left join MLC_suspension_contratos	c	on	c.cod_emp = a.Cedula and fec_ini <= getdate()
																	and fec_fin >= getdate()

END

```
