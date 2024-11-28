# View: v_Novasoft_Devengados_por_añoPrenomina_Detallado

## Usa los objetos:
- [[gen_clasif3]]
- [[rhh_emplea]]
- [[rhh_liqmes]]

```sql
Create view [dbo].[v_Novasoft_Devengados_por_añoPrenomina_Detallado] as
select año,mes,Marca,b.cod_emp,e.nom_emp,e.ap1_emp,e.ap2_emp,valor=sum(Valor)
from(
	select año=year(fec_liq),mes=month(fec_liq),cod_emp,--año=year(),mes = per_liq,
	Marca = Nombre_Unidad_Negocio,Valor=sum(val_liq)
	from(		
			select distinct l.fec_liq,l.ano_liq,l.per_liq,l.cod_emp,
			val_liq= sum(l.val_liq),Unidad_Negocio=l.cod_cl3,Nombre_Unidad_Negocio=g3.nombre
			from		[Novasoft_CT_MM].[dbo].rhh_liqmes	l
			left join	[Novasoft_CT_MM].[dbo].gen_clasif3	g3	on	g3.codigo=l.cod_cl3 
			where  l.val_liq <> 0
			--and ano_liq=2021
			and l.nat_liq = 1
			group by  l.fec_liq,l.ano_liq,l.per_liq,l.cod_cl3,g3.nombre,l.cod_emp
	) a group by fec_liq,Nombre_Unidad_Negocio,cod_emp--ano_liq,per_liq,
)b left join	[Novasoft_CT_MM].[dbo].rhh_emplea e	on	b.cod_emp = e.cod_emp
group by  año,mes,Marca,b.cod_emp,e.nom_emp,e.ap1_emp,e.ap2_emp
--order by año,mes,marca



```
