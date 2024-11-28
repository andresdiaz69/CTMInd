# Stored Procedure: sp_GMF_5_ValorBase_DistribucionLineas

## Usa los objetos:
- [[v_GMF_1_ValorMensualGMF_USC]]
- [[v_GMF_5_ValorBaseDistribucionLineas]]
- [[v_GMF_6_ValorBaseDistribucionLineas_Total]]

```sql

CREATE PROCEDURE [dbo].[sp_GMF_5_ValorBase_DistribucionLineas]
@anio int,
@mes int

as

begin


select a.año
,a.mes
,a.Empresa
,NombrePresentacion
,CONVERT(VARCHAR, CONVERT(VARCHAR, CAST(a.Valor  AS MONEY),1)) AS Valor
,CONVERT(VARCHAR, CONVERT(VARCHAR, CAST((a.Valor / c.ValorTotal *100)  AS MONEY),1))  as 'Porc_Distribucion'
,CONVERT(VARCHAR, CONVERT(VARCHAR, CAST((d.ValorGMF * (a.Valor / c.ValorTotal))  AS MONEY),1)) as 'CuatroXMil'
from 
[dbo].[v_GMF_5_ValorBaseDistribucionLineas] as a
inner join v_GMF_1_ValorMensualGMF_USC as b 
on a.año = b.Año and a.mes = b.Mes and a.empresa = b.IdEmpresas
inner join 
(select año,mes,empresa
,case when empresa = 1 then 'Total CT' when empresa = 6 then 'Total MM' else 'Total' end as linea
,case when empresa = 1 then ValorTotal  
	  when empresa = 6 then ValorTotal end as ValorTotal 
from [dbo].[v_GMF_6_ValorBaseDistribucionLineas_Total] group by año,mes,empresa,ValorTotal) as c 
on a.año = c.Año and a.mes = c.Mes and a.empresa = c.empresa
inner join (
select  año,mes,IdEmpresas ,Valor as ValorGMF 
from v_GMF_1_ValorMensualGMF_USC) as d on a.año = d.Año and a.mes = d.Mes and a.empresa = d.IdEmpresas
where a.año = @anio and a.mes = @mes /*listo*/
union all
select a.año
,a.mes
,a.empresa
,case when a.empresa = 1 then 'Total CT' when a.empresa = 6 then 'Total MM' else 'Total' end as linea
,case when a.empresa = 1 then CONVERT(VARCHAR, CONVERT(VARCHAR, CAST(ValorTotal  AS MONEY),1))  
	  when a.empresa = 6 then CONVERT(VARCHAR, CONVERT(VARCHAR, CAST(ValorTotal  AS MONEY),1)) end as ValorTotal
,'0' as porcentaje
,CONVERT(VARCHAR, CONVERT(VARCHAR, CAST(c.CuatroXMil  AS MONEY),1)) as 'CuatroXMil'
from 
[dbo].[v_GMF_6_ValorBaseDistribucionLineas_Total] as a
inner join (
select 
a.año,a.mes,a.Empresa,sum(CuatroXMil)as 'CuatroXMil'
from 
(select a.año
,a.mes
,a.Empresa
,d.ValorGMF * (a.Valor / c.ValorTotal) as 'CuatroXMil'
from 
[dbo].[v_GMF_5_ValorBaseDistribucionLineas] as a
inner join v_GMF_1_ValorMensualGMF_USC as b 
on a.año = b.Año and a.mes = b.Mes and a.empresa = b.IdEmpresas
inner join 
(select año,mes,empresa
,case when empresa = 1 then 'Total CT' when empresa = 6 then 'Total MM' else 'Total' end as linea
,case when empresa = 1 then ValorTotal  
	  when empresa = 6 then ValorTotal end as ValorTotal 
from [dbo].[v_GMF_6_ValorBaseDistribucionLineas_Total] 
group by año,mes,empresa,ValorTotal) as c 
on a.año = c.Año and a.mes = c.Mes and a.empresa = c.empresa
inner join (
select  año,mes,IdEmpresas ,Valor as ValorGMF 
from v_GMF_1_ValorMensualGMF_USC) as d on a.año = d.Año and a.mes = d.Mes and a.empresa = d.IdEmpresas) as a
group by a.año,a.mes,a.Empresa) as c on a.año = c.año and a.empresa = c.Empresa and a.mes = c.mes
where a.año = @anio and a.mes = @mes /*listo*/
group by a.año,a.mes,a.empresa,ValorTotal,c.CuatroXMil
union all
select año
,mes
,0 as empresa
,'Total' as linea
,CONVERT(VARCHAR, CONVERT(VARCHAR, CAST(sum(ValorTotal)  AS MONEY),1)) as ValorTotal 
,'0' as porcentaje
,'0' as '4x1000'
from 
[dbo].[v_GMF_6_ValorBaseDistribucionLineas_Total]
where año = @anio and mes = @mes
group by año
,mes


 end



```
