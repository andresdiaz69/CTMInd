# View: vw_CuadroDePersonal_CausalesDeRetiroPorcentaje

## Usa los objetos:
- [[EmpleadosActivos]]
- [[EmpleadosRetirados]]

```sql
CREATE view [dbo].[vw_CuadroDePersonal_CausalesDeRetiroPorcentaje]
--MS:071123 vista del procedimiento sp_CuadroDePersonal_CausalesDeRetiroPorcentaje poder filtrar la informacion
AS
select ano_Periodo,Mes_Periodo,'Porcentaje Sin Justa Causa' as [CAUSAS DE RETIRO], b.empresa,
case when sum(activos) = 0 then 0
     else  (sum(cast(a.retirados as decimal))*100)/activos  end porcentaje

 From 
(
select Fecha_retiro,-- year(Fecha_retiro) año,month(Fecha_retiro)mes,
      CausaRetiro, empresa, count(Codigoempleado) retirados--,Fecha_retiro
  from EmpleadosRetirados 
 where CausaRetiro='DESPIDO SIN JUSTA CAUSA'
--and year( Fecha_retiro) =2023
--and month(Fecha_retiro) >= 9 -6
--and month(Fecha_retiro) < 9
group by Fecha_retiro, CausaRetiro, empresa 
) a 
inner join 
(
select distinct Ano_Periodo,Mes_Periodo,Empresa, count(CodigoEmpleado) activos
from EmpleadosActivos  
--where Ano_Periodo = 2023 
--  and Mes_Periodo = 9
group by Ano_Periodo,Mes_Periodo,Empresa
	) b
on b.Ano_Periodo = year(Fecha_retiro)
and b.Empresa = a.Empresa
and Fecha_retiro >= dateadd(month, -6, (dateadd(month, 1, DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1))))  --(b.Mes_Periodo -7)
and Fecha_retiro < dateadd(month, 1, DATEFROMPARTS(Ano_Periodo, Mes_Periodo, 1)) --b.Mes_Periodo 

--and b.Ano_Periodo = 2023 
--and b.Mes_Periodo = 9
group by ano_Periodo,Mes_Periodo,b.empresa,a.empresa,activos

```
