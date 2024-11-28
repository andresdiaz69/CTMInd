# View: v_Novasoft_informe_retencion

## Usa los objetos:
- [[EmpleadosActivos]]
- [[EmpleadosRetirados]]
- [[gen_compania]]
- [[v_MLC_liqhis_novasoft]]

```sql

CREATE view [dbo].[v_Novasoft_informe_retencion] as
select cod_cia,nom_cia,cod_emp,nombres,Apellido1,Apellido2,cod_con,nom_con,año,mes,valor
from(
		select n.cod_cia,c.nom_cia,cod_emp,e.Nombres,e.Apellido1,e.Apellido2,cod_con,nom_con,Año=year(fec_liq),Mes= month(fec_liq),Valor= sum(val_liq)
		from Novasoft_CT_MM.dbo.[v_MLC_liqhis_novasoft]		n
		join EmpleadosActivos								e	on n.cod_emp = e.CodigoEmpleado 
																and e.Ano_Periodo = year(n.fec_liq)
																and e.Mes_Periodo = month(n.fec_liq)
		left join	[Novasoft_CT_MM].[dbo].[gen_compania]	c	on	n.cod_cia = c.cod_cia
		where n.cod_con in ('003315','003317','003335','200121','003330','003319')
		--and year(n.fec_liq) = 2021
		--and month(n.fec_liq)= 7
		--and n.cod_cia = 1
		--and cod_emp = '1016074213'
		group by n.cod_cia,c.nom_cia,cod_emp,e.Nombres,e.Apellido1,e.Apellido2,cod_con,nom_con,year(fec_liq),month(fec_liq)

		union all

		select n.cod_cia,c.nom_cia,cod_emp,e.Nombres,e.Apellido1,e.Apellido2,cod_con,nom_con,Año=year(fec_liq),Mes= month(fec_liq),Valor= sum(val_liq)
		from		Novasoft_CT_MM.dbo.[v_MLC_liqhis_novasoft]	n
		join		(select distinct CodigoEmpleado,nombres,Apellido1,Apellido2,Ano_Periodo,Mes_Periodo
					from empleadosretirados)					e	on	n.cod_emp = e.codigoempleado
																		and e.Ano_Periodo = n.ano_liq
																		and e.Mes_Periodo = n.per_liq

		left join	[Novasoft_CT_MM].[dbo].[gen_compania]		c	on	n.cod_cia = c.cod_cia
		where n.cod_con in ('003315','003317','003335','200121','003330','003319')
		--and year(n.fec_liq) = 2021
		--and month(n.fec_liq)= 7 
		--and n.cod_cia = 1
		--and cod_emp = '1016074213'
		group by n.cod_cia,c.nom_cia,cod_emp,e.Nombres,e.Apellido1,e.Apellido2,cod_con,nom_con,year(fec_liq),month(fec_liq)
) a 
--where cod_cia = 1
--and año=2022
--and mes=8

```
