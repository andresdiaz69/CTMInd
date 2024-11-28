# View: vw_Presupuestos_AuxilioMovilizacion

## Usa los objetos:
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_clasif4]]
- [[gen_compania]]
- [[rhh_cargos]]
- [[rhh_emplea]]
- [[rhh_novfija]]
- [[v_consulta_ultima_historia_laboral]]
- [[v_rhh_Concep]]

```sql


CREATE view [dbo].[vw_Presupuestos_AuxilioMovilizacion] as

--****************************
--Autor: Manuel Suarez
-- Date: 17/07/2024
--Descr: Create VW para proyecto presupuestos con el auxilio de movilizacion asigado por la empresa.
--****************************
select distinct cod_emp,Nom_emp,Codigo_Cargo,Nombre_Cargo,Codigo_Cargo_Generico,Nombre_Cargo_generico,Codigo_Compañia,Nombre_Compañia,
       codigo_marca,nombre_marca,codigo_centro,nombre_centro,[Auxilio de Movilizacion]= max([Auxilio de Movilizacion])
  from (
		select distinct cod_emp,Nom_emp,Codigo_Cargo,Nombre_Cargo,Codigo_Cargo_Generico,Nombre_Cargo_generico,
		       Codigo_Compañia,Nombre_Compañia,codigo_marca,nombre_marca,codigo_centro,nombre_centro,
		       --[Auxilio de Celular] = case when cod_con = '100088' then val_nov else 0 end, 
		       [Auxilio de Movilizacion] = case when cod_con = '100024' then val_nov else 0 end
		       --[Auxilio de Salud] = case when cod_con = '100186' then val_nov else 0 end,
		       --[Salario Garantizado] = case when cod_con = '100022' then val_nov else 0 end
		  from (
			    select distinct n.cod_emp,isnull(e.nom1_emp,'')+' '+isnull(e.nom2_emp,'')+' '+isnull(e.ap1_emp,'')+' '+isnull(e.ap2_emp,'') Nom_emp,
			           Codigo_Compañia=b.cod_cia,Nombre_Compañia=i.nom_cia,codigo_marca=b.cod_cl3,nombre_marca=g3.nombre,codigo_centro=b.cod_cco,
			           nombre_centro=o.nom_cco,Codigo_Cargo=b.cod_car,Nombre_Cargo=r.nom_car,n.cod_con,
			           nom_con=replace(replace(replace(replace(replace(replace(c.nom_con,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
			           val_nov,Codigo_Cargo_Generico=b.cod_cl4,Nombre_Cargo_generico=g4.nombre
			      from [Novasoft_CT_MM].dbo.rhh_novfija		n
			      left join	[Novasoft_CT_MM].dbo.v_rhh_Concep		c	on	n.cod_con = c.cod_con
			      join [Novasoft_CT_MM].dbo.rhh_emplea			e	on	e.cod_emp=n.cod_emp 
			      join [Novasoft_CT_MM].dbo.v_consulta_ultima_historia_laboral b	 on b.cod_emp=e.cod_emp
																					and b.cod_cia = e.cod_cia
			      left join	[Novasoft_CT_MM].dbo.gen_clasif1		g1	on g1.codigo=b.cod_cl1 
																	   and b.cod_emp = e.cod_emp 
																	   and b.cod_cia = e.cod_cia
			      left join	[Novasoft_CT_MM].dbo.gen_clasif2		g2	on g2.codigo=b.cod_cl2 
																	   and b.cod_emp = e.cod_emp 
																	   and b.cod_cia = e.cod_cia
			      left join	[Novasoft_CT_MM].dbo.gen_clasif3		g3	on g3.codigo=b.cod_cl3 
																	   and b.cod_emp = e.cod_emp 
																	   and b.cod_cia = e.cod_cia
			      left join	[Novasoft_CT_MM].dbo.gen_clasif4		g4	on g4.codigo=b.cod_cl4 
																	   and b.cod_emp = e.cod_emp 
																	   and b.cod_cia = e.cod_cia
			      left join	[Novasoft_CT_MM].dbo.rhh_cargos			r	on r.cod_car=b.cod_car 
																	   and b.cod_emp = e.cod_emp 
																	   and b.cod_cia = e.cod_cia
			      left join	[Novasoft_CT_MM].dbo.gen_compania		i	on i.cod_cia=b.cod_cia 
																	   and b.cod_emp = e.cod_emp 
																	   and b.cod_cia = e.cod_cia
			      left join	[Novasoft_CT_MM].dbo.gen_ccosto			o	on o.cod_cco = e.cod_cco
			     where (n.fec_has is null or n.fec_has > getdate())
			     --and ind_act = 1
			       and (e.fec_egr > getdate() or e.fec_egr is null)
			       and n.cod_con like '1%'
			     --and n.cod_emp = '1063151556'
		     )a 
		--where cod_emp = '1063151556'
		--where  Codigo_Cargo = 106
		--and codigo_marca = 19
     )b group by cod_emp,Nom_emp,Codigo_Cargo,Nombre_Cargo,Codigo_Cargo_Generico,Nombre_Cargo_generico,
		      Codigo_Compañia,Nombre_Compañia,codigo_marca,nombre_marca,codigo_centro,nombre_centro

```
