# View: v_MLC_requisiciones_consulta_salarios

## Usa los objetos:
- [[gen_clasif3]]
- [[rhh_cargos]]
- [[rhh_emplea]]
- [[v_consulta_retirados]]
- [[v_consulta_ultima_historia_laboral]]

```sql
CREATE view [dbo].[v_MLC_requisiciones_consulta_salarios] as
select distinct  Cedula,Nombres,apellido1,apellido2,Codigo_Cargo,Nombre_Cargo,
codigo_UnidadDeNegocio,nombre_UnidadDeNegocio,
salario=sal_bas
from(
		--RETIRADOS
		select DISTINCT Cedula=e.cod_emp,Nombres = e.nom_emp, apellido1=e.ap1_emp, apellido2= e.ap2_emp,Codigo_Cargo=b.cod_car,Nombre_Cargo=r.nom_car,e.sal_bas,
		codigo_UnidadDeNegocio=b.cod_cl3,
		nombre_UnidadDeNegocio=replace(replace(replace(replace(replace(replace(g3.nombre,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'')
		from rhh_emplea							e
		join v_consulta_retirados				b	on	b.cod_emp=e.cod_emp and b.cod_cia = e.cod_cia
		left join rhh_cargos					r	on	r.cod_car=b.cod_car and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
		left join gen_clasif3					g3	on	g3.codigo=b.cod_cl3 and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
		where e.cod_emp <> '0' 
		and b.fec_ret < getdate()
		UNION ALL
		---ACTIVOS
		select DISTINCT Cedula=e.cod_emp,Nombres = e.nom_emp, apellido1=e.ap1_emp, apellido2= e.ap2_emp,Codigo_Cargo=b.cod_car,Nombre_Cargo=r.nom_car,e.sal_bas,
		codigo_UnidadDeNegocio = 	b.cod_cl3,
		Nombre_Unidad_Negocio = replace(replace(replace(replace(replace(replace(g3.nombre,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'')
		from rhh_emplea							e
		join v_consulta_ultima_historia_laboral b	on	b.cod_emp=e.cod_emp and b.cod_cia = e.cod_cia
		left join rhh_cargos					r	on	r.cod_car=b.cod_car and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
		left join gen_clasif3					g3	on	g3.codigo=b.cod_cl3 and b.cod_emp = e.cod_emp and b.cod_cia = e.cod_cia
		where e.cod_emp <> '0' 
		and (b.fec_ret is null or b.fec_ret > getdate())
)a  where nombre_cargo not like '(NA)%'
--and Codigo_Cargo = 210
--order by nombre_cargo


--3409





```
