# View: v_Novasoft_Actualizacion_DatosBasicos

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
- [[GTH_EstCivil]]
- [[rhh_cargos]]
- [[rhh_emplea]]
- [[v_Novasoft_Actualizacion_Portal]]

```sql
CREATE view  [dbo].[v_Novasoft_Actualizacion_DatosBasicos] as
select FechaActualizacion= a.fecha,DocumentoIdentidad=e.cod_emp,Nombre=e.nom_emp,PrimerApellido=e.ap1_emp,SegundoApellido=e.ap2_emp,
est.des_est,DireccionResidencia=e.dir_res,DepartamentoResidencia=d.nom_dep,CiudadResidencia=c.nom_ciu,Barrio=e.barrio,Compañia=cia.nom_cia,
UnidadDeNegocio=c3.nombre,Marca=s.nom_suc,Centro=cc.nom_cco,Secccion=c1.nombre,Departamento=c2.nombre,
Sede=c5.nombre,Cargo=car.nom_car,PersonasACargo=e.per_car,CorreoPersonal=e.e_mail,Celular=e.tel_cel,TelefonoResidencia=e.tel_res,
ContactoEmergencia=replace(replace(replace(replace(replace(replace(e.avi_emp,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'')
from		[Novasoft_CT_MM].dbo.rhh_emplea	e
left join	[Novasoft_CT_MM].dbo.gen_deptos	d	on	e.dpt_res = d.cod_dep and d.cod_pai = '057'
left join	[Novasoft_CT_MM].dbo.gen_ciudad	c	on	e.dpt_res = c.cod_dep and c.cod_pai = '057' and e.ciu_res = c.cod_ciu
left join	[Novasoft_CT_MM].dbo.gen_compania	cia	on	e.cod_cia = cia.cod_cia
left join	[Novasoft_CT_MM].dbo.gen_sucursal	s	on	e.cod_suc = s.cod_suc
left join	[Novasoft_CT_MM].dbo.gen_ccosto	cc	on	e.cod_cco = cc.cod_cco
left join	[Novasoft_CT_MM].dbo.gen_clasif1	c1	on	e.cod_cl1 = c1.codigo
left join	[Novasoft_CT_MM].dbo.gen_clasif2	c2	on	e.cod_cl2 = c2.codigo
left join	[Novasoft_CT_MM].dbo.gen_clasif3	c3	on	e.cod_cl3 = c3.codigo
left join	[Novasoft_CT_MM].dbo.gen_clasif4	c4	on	e.cod_cl4 = c4.codigo
left join	[Novasoft_CT_MM].dbo.gen_clasif5	c5	on	e.cod_cl5 = c5.codigo
left join	[Novasoft_CT_MM].dbo.rhh_cargos	car	on	e.cod_car = car.cod_car
left join	[Novasoft_CT_MM].dbo.GTH_EstCivil	est on	e.est_civ = est.cod_est
left join	v_Novasoft_Actualizacion_Portal a	on	e.cod_emp = a.cedula
where e.cod_emp <> '0'
and  (e.fec_egr is null or e.fec_egr > getdate())
--and  cod_emp in ( '79578100','52126258','1070969343','51975078','79364756','20430398')

```
