# View: v_Novasoft_Devengados_por_añoPrenomina

## Usa los objetos:
- [[gen_clasif3]]
- [[rhh_liqmes]]

```sql
create view [dbo].[v_Novasoft_Devengados_por_añoPrenomina] as
select año,mes,Marca,valor=sum(Valor)
from(
	select año=year(fec_liq),mes=month(fec_liq),--año=year(),mes = per_liq,
	Marca = Nombre_Unidad_Negocio,Valor=sum(val_liq)
	from(		
			select distinct l.fec_liq,l.ano_liq,l.per_liq,val_liq= sum(l.val_liq),Unidad_Negocio=l.cod_cl3,Nombre_Unidad_Negocio=g3.nombre
			from		[Novasoft_CT_MM].[dbo].rhh_liqmes	l
			left join	[Novasoft_CT_MM].[dbo].gen_clasif3	g3	on	g3.codigo=l.cod_cl3 
			where  l.val_liq <> 0
			--and ano_liq=2021
			and l.nat_liq = 1
			group by  l.fec_liq,l.ano_liq,l.per_liq,l.cod_cl3,g3.nombre
	) a group by fec_liq,Nombre_Unidad_Negocio--ano_liq,per_liq,
)b group by  año,mes,Marca
--order by año,mes,marca



```
