# Stored Procedure: sp_GMF_JD_UsoCFC_Total1

## Usa los objetos:
- [[GMF_CFC]]
- [[GMF_JD_ingresoCFC]]
- [[GMF_JD_UsoCFC_Total]]
- [[GMF_JD_UsoCFC_TotalInt]]
- [[v_GMF_1_JD_ValoresVentasNetas]]
- [[v_GMF_JD_UsoCFC]]
- [[v_GMF_JD_UsoCFC_Total]]

```sql


CREATE PROCEDURE [dbo].[sp_GMF_JD_UsoCFC_Total1]
@anio varchar(5), @mes varchar(5), @CodPresentacion varchar(5)

AS
BEGIN


truncate table GMF_JD_UsoCFC_TotalInt

select 
Empresa,
CodigoPresentacion,
case when CodigoPresentacion = 72 then ' Agrícola' when CodigoPresentacion = 73 then ' Construcción' when CodigoPresentacion = 74 then ' Wirtgen' end as NombrePresentacion,
1000 as CodigoConcepto,
Año,
Mes,
'Porcentaje GMF' as NombreConcepto,
Sede,
CONVERT(numeric(10,0),round(( SUM(Valor) / (select valortotal from [v_GMF_JD_UsoCFC] where nombre_concepto = 'Valor Ventas' and IdLinea =a.CodigoPresentacion) * 100 ),0)) as valor,1 as N1, 0 as N2 
INTO #Temp
from v_GMF_1_JD_ValoresVentasNetas as a
where 
CodigoConcepto in (18,52,53)
and  año = @anio and mes = @mes-1 and CodigoPresentacion = @CodPresentacion
group by  Empresa,CodigoPresentacion,Año,Mes,sede


select Empresa,
CodigoPresentacion,
NombrePresentacion,
Codigoconcepto,
año,
mes,
'Valor GMF' as NombreConcepto,
Sede,
valor * (select round((((21852990.98 * PorcDistribucion)*0.6/100)*0.6/100),0) from [dbo].[GMF_JD_ingresoCFC] where CodigoPresentacion = a.CodigoPresentacion) as Valor,1 as N1, 0 as N2 
into #temp1
from #Temp as a

select *
into #PorcUsoCFC from (
select 1 as Empresa ,idlinea , linea,1001 as codigoconcepto, anio, mes,'Total UsoCFC' as nombreconcepto,sede, CONVERT(numeric(10,0), round(Valor/(select ValorTotal from v_GMF_JD_UsoCFC where nombre_concepto ='Valor CFC' and IdLinea = a.IdLinea)*100,0)) as valor,1 as N1, 0 as N2 
from GMF_CFC as A
where Anio = @anio and mes = @mes-1 and IdLinea = 72) as c

select CodigoPresentacion,round(((21852990.98 * PorcDistribucion)*0.4/100),0) as valorcfc
into #usocfc
from [dbo].[GMF_JD_ingresoCFC] 
where año = @anio and mes = @mes-1 and CodigoPresentacion = @CodPresentacion


insert into GMF_JD_UsoCFC_TotalInt
select * 
from (
select Empresa,
CodigoPresentacion,
NombrePresentacion,
Codigoconcepto,
año,
mes,
'Valor GMF Taller' as NombreConcepto,
Sede,
isnull(round(valor * (select valor from GMF_JD_UsoCFC_Total where codigopresentacion = b.codigopresentacion and NombreConcepto like '%Porcentaje Taller%' and CodigoConcepto in (53) and sede = b.Sede )/100,0),0) as valor,1 as N1, 0 as N2 
from #temp1 as b --where sede = 'JD-Monteria-Via Cereté' 
union all
select Empresa,
CodigoPresentacion,
NombrePresentacion,
Codigoconcepto,
año,
mes,
'Valor GMF Repuestos' as NombreConcepto,
Sede,
isnull(round(valor * (select valor from GMF_JD_UsoCFC_Total where codigopresentacion = b.codigopresentacion and NombreConcepto like '%Porcentaje Repuestos%' and CodigoConcepto in (52) and sede = b.Sede )/100,0),0),1 as N1, 0 as N2 
from #temp1 as b --where sede = 'JD-Monteria-Via Cereté' 
union all
select Empresa,
CodigoPresentacion,
NombrePresentacion,
Codigoconcepto,
año,
mes,
'Valor GMF Vehiculos' as NombreConcepto,
Sede,
isnull(round(valor * (select valor from GMF_JD_UsoCFC_Total where codigopresentacion = b.codigopresentacion and NombreConcepto like '%Porcentaje Vehiculos%' and CodigoConcepto in (18) and sede = b.Sede )/100,0),0),1 as N1, 0 as N2 
from #temp1 as b) as tt --where sede = 'JD-Monteria-Via Cereté' 
union all
select * from (
select 1 as Empresa ,idlinea , linea,1001 as codigoconcepto, anio, mes,'Porcentaje UsoCFC' as nombreconcepto,sede,CONVERT(numeric(10,0), round(Valor/(select ValorTotal from v_GMF_JD_UsoCFC where nombre_concepto ='Valor CFC' and IdLinea = a.IdLinea)*100,0)) as valor,1 as N1, 0 as N2 
from GMF_CFC as A
where Anio = @anio and mes = @mes-1 and IdLinea = @CodPresentacion
union all
select 1 as Empresa ,idlinea , linea,1002 as codigoconcepto,anio,mes,'Valor UsoCFC' as nombreconcepto, sede, Valor,1 as N1, 0 as N2  from GMF_CFC
where Anio = @anio and mes = @mes-1 and IdLinea = @CodPresentacion
) as asd
union all
select * from (
select 1 as Empresa ,idlinea , linea,1001 as codigoconcepto, anio, mes,'Total UsoCFC' as nombreconcepto,sede, CONVERT(numeric(10,0), round(Valor/(select ValorTotal from v_GMF_JD_UsoCFC where nombre_concepto ='Valor CFC' and IdLinea = a.IdLinea)*100,0)) as valor,1 as N1, 0 as N2 
from GMF_CFC as A
where Anio = @anio and mes = @mes-1 and IdLinea = @CodPresentacion) as c
union all
select * from (

select 
Empresa, IdLinea, Linea, codigoconcepto, Anio, Mes, 'Total UsoCFC Vehiculos' nombreconcepto,sede, (select valorcfc from #usocfc where CodigoPresentacion = u.IdLinea) * (valor/100) *0.60 as valor, n1, n2
from #PorcUsoCFC as u
union all
select 
Empresa, IdLinea, Linea, codigoconcepto, Anio, Mes, 'Total UsoCFC Repuestos' nombreconcepto,sede, (select valorcfc from #usocfc where CodigoPresentacion = u.IdLinea) * (valor/100) *0.30 as valor, n1, n2
from #PorcUsoCFC as u
union all 
select 
Empresa, IdLinea, Linea, codigoconcepto, Anio, Mes, 'Total UsoCFC Taller' nombreconcepto,sede, (select valorcfc from #usocfc where CodigoPresentacion = u.IdLinea) * (valor/100) *0.10 as valor, n1, n2
from #PorcUsoCFC as u
) as tot

insert into GMF_JD_UsoCFC_Total
select Empresa,CodigoPresentacion,NombrePresentacion,Codigoconcepto,año,mes,'Valor Total UsoCFC' as nombreconcepto, sede,
sum(valor) as valor ,n1,n2
from GMF_JD_UsoCFC_TotalInt where nombreconcepto like '%Total UsoCFC %'
group by Empresa,CodigoPresentacion,NombrePresentacion,Codigoconcepto,año,mes,sede,n1,n2

insert into GMF_JD_UsoCFC_Total
select 
a.Empresa
,a.CodigoPresentacion
,a.NombrePresentacion
,1003 as CodigoConcepto
,a.año
,a.mes
,'Total GMFL'nombreconcepto
,a.sede
,sum(a.valor + b.valor ),
a.n1,a.n2
from GMF_JD_UsoCFC_Total as a
join GMF_JD_UsoCFC_TotalInt as b on 
a.CodigoPresentacion = b.CodigoPresentacion and a.sede = b.sede and a.año =b.año and a.mes = b.mes
and a.nombreconcepto like '%valor total %' and b.nombreconcepto like '%Total UsoCFC %'
group by a.Empresa
,a.CodigoPresentacion
,a.NombrePresentacion
,a.año
,a.mes
,a.sede
,a.n1,a.n2

select * from v_GMF_JD_UsoCFC_Total

END



```
