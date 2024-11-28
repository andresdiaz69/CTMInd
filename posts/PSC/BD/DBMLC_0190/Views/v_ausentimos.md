# View: v_ausentimos

## Usa los objetos:
- [[EmpleadosActivos]]
- [[v_MLC_liqhis_novasoft]]

```sql
CREATE view [dbo].[v_ausentimos] as
select cod_emp, ValorAusentimos=valor
from(
	select cod_Emp,Dias = datediff(day,fecha_ingreso,Fecha_fin),valor
	from(
			select  n.cod_emp,a.Fecha_Ingreso,Valor=sum(n.Val_liq),Fecha_Fin=DATEADD(ms,-3,DATEADD(mm,0,DATEADD(mm,DATEDIFF(mm,0,GETDATE()),0)))
			from		[Novasoft_CT_MM].dbo.v_MLC_liqhis_novasoft	n
			join	EmpleadosActivos							a	on	a.CodigoEmpleado = n.cod_emp 
																			and a.Ano_Periodo = year(GETDATE())
																			and a.Mes_Periodo = month(GETDATE())
			where n.Naturaleza = 1
			and (nom_con like '%enferme%' or nom_con like '%licencia%')
			and n.cod_bas = '01'
			and n.fec_liq >= DATEADD(ms,-3,DATEADD(mm,0,DATEADD(mm,DATEDIFF(mm,0,GETDATE()),0))) -364
			and n.fec_liq <=DATEADD(ms,-3,DATEADD(mm,0,DATEADD(mm,DATEDIFF(mm,0,GETDATE()),0))) 
			group by n.cod_emp,a.Fecha_Ingreso
	) a 
)b --order by cod_emp




```
