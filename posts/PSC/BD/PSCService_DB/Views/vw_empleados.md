# View: vw_empleados

## Usa los objetos:
- [[gen_clasif1]]
- [[gen_clasif3]]
- [[gen_compania]]
- [[gen_sucursal]]
- [[MLC_suspension_contratos]]
- [[rhh_cargos]]
- [[rhh_emplea]]
- [[usr_rhh_telpersonas]]
- [[v_consulta_ultima_historia_laboral]]

```sql
--drop view vw_empleados
CREATE view vw_empleados as
SELECT Estado =	
			CASE	WHEN convert(date,c.fec_ini) <= convert(date,getdate()) and  convert(date,c.fec_fin) >= convert(date,getdate())
						THEN 
							CASE	WHEN c.cod_aus = 21  THEN 'Licencia No Remunerada'
									WHEN c.cod_aus = 22  THEN 'Suspension de Contrato'
									WHEN c.cod_aus = 120 THEN 'Medio Tiempo'
							ELSE 'Activo'
						END 
					ELSE 'Activo'
			END,
	Cedula,
	Nombres,apellido1,apellido2,Codigo_Compañia,Nombre_Compañia,codigo_marca,nombre_marca,codigo_seccion,nombre_seccion 
	Unidad_Negocio,Nombre_Unidad_Negocio,Codigo_Cargo,Nombre_Cargo,email,Email_Corporativo=e_mail_alt,Celular=tel_cel
	,Cel_corporativo,Cel_personal
FROM(
				SELECT Cedula=e.cod_emp,Nombres = e.nom_emp, 
				apellido1=e.ap1_emp, 
				apellido2= e.ap2_emp,
				Codigo_Compañia=b.cod_cia,Nombre_Compañia=i.nom_cia,
				codigo_marca=b.cod_suc,nombre_marca=s.nom_suc,
				Unidad_Negocio =b.cod_cl3,
				Nombre_Unidad_Negocio = replace(replace(replace(replace(replace(replace(g3.nombre,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
				codigo_seccion=b.cod_cl1,
				nombre_seccion=replace(replace(replace(replace(replace(replace(g1.nombre,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
				Codigo_Cargo=b.cod_car,	Nombre_Cargo=r.nom_car,
				replace(replace(replace(replace(replace(replace(e.e_mail,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'')email,
				e_mail_alt,		e.tel_cel,	Cel_corporativo,		Cel_personal

				FROM [Novasoft_CT_MM].dbo.rhh_emplea							e
				JOIN [Novasoft_CT_MM].dbo.v_consulta_ultima_historia_laboral b	on	b.cod_emp=e.cod_emp and b.cod_cia = e.cod_cia
				LEFT JOIN [Novasoft_CT_MM].dbo.gen_sucursal					s	on	b.cod_suc=s.cod_suc and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
				LEFT JOIN [Novasoft_CT_MM].dbo.gen_clasif1					g1	on	g1.codigo=b.cod_cl1 and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia		
				LEFT JOIN [Novasoft_CT_MM].dbo.gen_clasif3					g3	on	g3.codigo=b.cod_cl3 and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
				LEFT JOIN [Novasoft_CT_MM].dbo.rhh_cargos					r	on	r.cod_car=b.cod_car and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
				LEFT JOIN [Novasoft_CT_MM].dbo.gen_compania					i	on	i.cod_cia=b.cod_cia and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
				LEFT JOIN [Novasoft_CT_MM].dbo.usr_rhh_telpersonas			tel	on	e.cod_emp = Empleado

				WHERE e.cod_emp <> '0' 
				and (b.fec_ret is null or b.fec_ret > getdate())
) a		LEFT JOIN [Novasoft_CT_MM].dbo.MLC_suspension_contratos	c	on	c.cod_emp = a.Cedula and fec_ini <= getdate()
 and fec_fin >= getdate()
```
