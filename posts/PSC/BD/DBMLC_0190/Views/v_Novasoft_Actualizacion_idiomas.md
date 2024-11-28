# View: v_Novasoft_Actualizacion_idiomas

## Usa los objetos:
- [[rhh_emplea]]
- [[rhh_idioma]]
- [[rhh_tbidioma]]
- [[v_Novasoft_Actualizacion_idioma]]

```sql

CREATE view [dbo].[v_Novasoft_Actualizacion_idiomas] as
select fecha,CodigoeEmpleado,NombreEmpleado,Apellido1,Apellido2,Ingles=max(Ingles),Frances=max(Frances),Italiano=max(Italiano),Japones=max(Japones)
from(
		select fecha,CodigoeEmpleado,NombreEmpleado,Apellido1,Apellido2,
		Ingles=case when Idioma = 'Inglés' then Calificacion else '' end,
		Frances=case when Idioma = 'Francés' then Calificacion else '' end,
		Italiano=case when Idioma = 'Italiano' then Calificacion else '' end,
		Japones=case when Idioma = 'Japonés' then Calificacion else '' end
		from(
				select v.fecha,CodigoeEmpleado=i.cod_emp,NombreEmpleado=e.nom_emp,Apellido1=e.ap1_emp,Apellido2=e.ap2_emp,
				Idioma=d.nom_idi,
				Calificacion = case when cod_calif = 0 then ''
									when cod_calif = 1 then 'Basico'
									when cod_calif = 2 then 'Intermedio'
									when cod_calif = 3 then 'Avanzado'
								else '' end
				from		[Novasoft_CT_MM].[dbo].[rhh_idioma]		i
				left join	[Novasoft_CT_MM].dbo.rhh_emplea			e	on	i.cod_emp = e.cod_emp
				left join	[Novasoft_CT_MM].[dbo].[rhh_tbidioma]	d	on	i.cod_idi = d.cod_idi
				left join   v_Novasoft_Actualizacion_idioma			v	on	rtrim(ltrim(i.cod_emp)) = rtrim(ltrim(v.cedula))
				where e.cod_emp <> '0'
				and (e.fec_egr is null or e.fec_egr > getdate())
	) a
)b group by fecha,CodigoeEmpleado,NombreEmpleado,Apellido1,Apellido2

```
