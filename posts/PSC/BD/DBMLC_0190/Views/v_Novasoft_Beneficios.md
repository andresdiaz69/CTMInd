# View: v_Novasoft_Beneficios

## Usa los objetos:
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_clasif4]]
- [[gen_compania]]
- [[gen_sucursal]]
- [[rhh_BenefEmp]]
- [[rhh_Beneficio]]
- [[rhh_cargos]]
- [[rhh_emplea]]
- [[v_consulta_ultima_historia_laboral]]

```sql


CREATE view [dbo].[v_Novasoft_Beneficios] as
select distinct cod_emp,Codigo_Cargo,Nombre_Cargo,Codigo_Cargo_Generico,Nombre_Cargo_generico,
		Codigo_Compañia,Nombre_Compañia,codigo_marca,nombre_marca,codigo_centro,nombre_centro,
		[Bono Canasta] = max([Bono Canasta]) , 
		[Bono Gasolina] = max ([Bono Gasolina]) 
from (
		select distinct cod_emp,Codigo_Cargo,Nombre_Cargo,Codigo_Cargo_Generico,Nombre_Cargo_generico,
		Codigo_Compañia,Nombre_Compañia,codigo_marca=codigo_UnidadDeNegocio,nombre_marca= nombre_UnidadDeNegocio,codigo_centro,nombre_centro,
		[Bono Canasta] = case when cod_con = '100063' then val_ben else 0 end, 
		[Bono Gasolina] = case when cod_con = '100054' then val_ben else 0 end

		from (
				select be.cod_emp,nombres = e.nom_emp + ' ' + e.ap1_emp + ' ' +e.ap2_emp,
				be.cod_ben,n.nom_ben,n.cod_con,
				Aplicacion = case when be.apl_con = 1 then 'primera' when be.apl_con  = 2 then 'Segunda' when be.apl_con =3 then 'Ambas' else 'error' end,
				be.Fec_ini,be.fec_fin,be.val_ben,Codigo_Compañia=b.cod_cia,
				Nombre_Compañia=i.nom_cia,codigo_marca=b.cod_suc,nombre_marca=s.nom_suc,codigo_centro=b.cod_cco, Nombre_Centro = o.nom_cco,codigo_seccion=b.cod_cl1,
				nombre_seccion=replace(replace(replace(replace(replace(replace(g1.nombre,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
				codigo_departamento=b.cod_cl2,nombre_departamento=g2.nombre,
				codigo_UnidadDeNegocio=b.cod_cl3,
				nombre_UnidadDeNegocio=replace(replace(replace(replace(replace(replace(g3.nombre,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
				Codigo_Cargo=b.cod_car,Nombre_Cargo=r.nom_car,FechaRetiro=e.fec_egr,Codigo_Cargo_Generico=b.cod_cl4,Nombre_Cargo_generico=g4.nombre
				from		[Novasoft_CT_MM].dbo.rhh_BenefEmp						be
				left join	[Novasoft_CT_MM].dbo.rhh_Beneficio						n	on	be.cod_ben=n.cod_ben
				join		[Novasoft_CT_MM].dbo.rhh_emplea							e	on	e.cod_emp=be.cod_emp 
				join		[Novasoft_CT_MM].dbo.v_consulta_ultima_historia_laboral	b	on	b.cod_emp=e.cod_emp and b.cod_cia = e.cod_cia
				left join	[Novasoft_CT_MM].dbo.gen_sucursal							s	on	b.cod_suc=s.cod_suc and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
				left join	[Novasoft_CT_MM].dbo.gen_clasif1						g1	on	g1.codigo=b.cod_cl1 and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
				left join	[Novasoft_CT_MM].dbo.gen_clasif2						g2	on	g2.codigo=b.cod_cl2 and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
				left join	[Novasoft_CT_MM].dbo.gen_clasif3						g3	on	g3.codigo=b.cod_cl3 and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
				left join	[Novasoft_CT_MM].dbo.gen_clasif4						g4	on	g4.codigo=b.cod_cl4 and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
				left join	[Novasoft_CT_MM].dbo.rhh_cargos							r	on	r.cod_car=b.cod_car and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
				left join	[Novasoft_CT_MM].dbo.gen_compania						i	on	i.cod_cia=b.cod_cia and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
				left join	[Novasoft_CT_MM].dbo.gen_ccosto							o	on	o.cod_cco = b.cod_cco and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
				where (be.fec_fin is null or be.fec_fin > getdate())
				and   (e.fec_egr > getdate() or e.fec_egr is null)
				--and b.cod_emp = '79578100'
				--and b.cod_cl3 in (4,418)
				--select * from rhh_BenefEmp
				--select * from rhh_Beneficio
		) a
		--where cod_emp = '1026565229'
) b group by  cod_emp,Codigo_Cargo,Nombre_Cargo,Codigo_Cargo_Generico,Nombre_Cargo_generico,Codigo_Compañia,Nombre_Compañia,codigo_marca,nombre_marca,codigo_centro,nombre_centro


```
