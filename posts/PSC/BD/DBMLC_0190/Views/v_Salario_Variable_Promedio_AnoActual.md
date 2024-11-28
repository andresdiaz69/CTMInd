# View: v_Salario_Variable_Promedio_AnoActual

## Usa los objetos:
- [[EmpleadosActivos]]
- [[v_MLC_liqhis_novasoft]]

```sql
CREATE view [dbo].[v_Salario_Variable_Promedio_AnoActual] as
select cod_emp, SalarioVariablePromedio = round((Valor/ (case when dias >= (DiasAñoActual-1) then (DiasAñoActual-1) else dias end)*30 ),0)
from(
	select cod_Emp,	Dias = datediff(day,fecha_ingreso,Fecha_fin),
	DiasAñoActual=datediff("d",(DATEADD(yy, DATEDIFF(yy, 0, GETDATE()), 0) ),(DATEADD(ms,-3,DATEADD(mm,0,DATEADD(mm,DATEDIFF(mm,0,GETDATE()),0))))),valor
	from(
			select  n.cod_emp,a.Fecha_Ingreso,Valor=sum(n.Val_liq),Fecha_Fin=DATEADD(ms,-3,DATEADD(mm,0,DATEADD(mm,DATEDIFF(mm,0,GETDATE()),0))) 
			from		[Novasoft_CT_MM].dbo.v_MLC_liqhis_novasoft	n
			join		EmpleadosActivos							a		on	a.CodigoEmpleado = n.cod_emp 
																			and a.Ano_Periodo = year(GETDATE())
																			and a.Mes_Periodo = month(GETDATE())
																			and n.cod_cia= a.CodigoEmpresa
																			and a.Fecha_Ingreso <= n.fec_liq
			where n.Naturaleza = 1
			and n.cod_bas = '04'
			and n.cod_con not in ('100010','100022')
			--and a.Indicador_salario_variable = 1
			and a.Indicador_comisiones = 'SI'
			and n.fec_liq >=  DATEADD(yy, DATEDIFF(yy, 0, GETDATE()), 0) 
			and n.fec_liq <=DATEADD(ms,-3,DATEADD(mm,0,DATEADD(mm,DATEDIFF(mm,0,GETDATE()),0))) 
			--AND n.cod_emp in ('16594756','86070120'1026597453  )
			group by n.cod_emp,a.Fecha_Ingreso
			--,a.Fecha_Ingreso,n.fec_liq
	) a 
)b 
--where cod_emp = '1022988679'


```
