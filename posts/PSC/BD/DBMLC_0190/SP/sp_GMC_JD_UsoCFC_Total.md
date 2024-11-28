# Stored Procedure: sp_GMC_JD_UsoCFC_Total

## Usa los objetos:
- [[GMC_JD_UsoCFC_Total]]
- [[GMF_CFC]]
- [[v_GMF_1_JD_ValoresVentasNetas]]

```sql
CREATE PROCEDURE [dbo].[sp_GMC_JD_UsoCFC_Total]
@anio varchar(5), @mes varchar(5), @CodPresentacion varchar(5)

AS
BEGIN

truncate table GMC_JD_UsoCFC_Total

insert into GMC_JD_UsoCFC_Total
select 
Empresa,CodigoPresentacion,NombrePresentacion,CodigoConcepto,año,mes,nombreconcepto	,sede,valor
,1 as N1,0 as N2 
from( 
select 
Empresa,CodigoPresentacion,NombrePresentacion,1000 as CodigoConcepto , año, mes, nombreconcepto, sede, round(sum(valor),0) as valor
 from
(select 
ConsB.Empresa	
,ConsB.CodigoPresentacion	
,ConsB.NombrePresentacion	
,ConsB.CodigoConcepto	
,ConsB.Año	
,ConsB.Mes	
,'Porcentaje Valor' as NombreConcepto	
,ConsB.Sede
,ConsB.Valor/ConsA.valor * 100 as Valor
from 
(select 
Empresa,
CodigoPresentacion,
case when CodigoPresentacion = 72 then ' Agrícola' when CodigoPresentacion = 73 then ' Construcción' when CodigoPresentacion = 74 then ' Wirtgen' end as NombrePresentacion,
0 as CodigoConcepto,
Año,
Mes,
'Porcentaje Valor' as NombreConcepto,
Sede,
round(SUM(Valor),0) as valor
from v_GMF_1_JD_ValoresVentasNetas as vn where año = @anio and mes = @mes-1 and CodigoPresentacion = @CodPresentacion 
and CodigoConcepto in (18,52,53)
group by  Empresa,CodigoPresentacion,Año,Mes,sede) as ConsA
join 
(select 
Empresa,
CodigoPresentacion,
case when CodigoPresentacion = 72 then ' Agrícola' when CodigoPresentacion = 73 then ' Construcción' when CodigoPresentacion = 74 then ' Wirtgen' end as NombrePresentacion,
CodigoConcepto,
Año,
Mes,
case when CodigoConcepto = 18 then 'Vehiculos'
when CodigoConcepto = 52 then 'Repuestos'
when CodigoConcepto = 53 then 'Taller' end as NombreConcepto,
Sede,
round(Valor,0) as Valor
from v_GMF_1_JD_ValoresVentasNetas as vn where año = @anio and mes = @mes-1 and CodigoPresentacion = @CodPresentacion
and CodigoConcepto in (18,52,53)) as ConsB
on ConsA.Año = ConsB.Año and ConsA.Mes = ConsB.Mes and ConsA.CodigoPresentacion = ConsB.CodigoPresentacion and ConsA.Sede = ConsB.Sede) as info
group by Empresa,CodigoPresentacion,NombrePresentacion,año,mes,sede,nombreconcepto
union all
select 
ConsB.Empresa	
,ConsB.CodigoPresentacion	
,ConsB.NombrePresentacion	
,ConsB.CodigoConcepto	
,ConsB.Año	
,ConsB.Mes	
,case when ConsB.CodigoConcepto = 18 then 'Porcentaje Vehiculos'
when ConsB.CodigoConcepto = 52 then 'Porcentaje Repuestos'
when ConsB.CodigoConcepto = 53 then 'Porcentaje Taller' end as NombreConcepto
,ConsB.Sede
,round(ConsB.Valor/ConsA.valor * 100,0) as Valor
from 
(select 
Empresa,
CodigoPresentacion,
case when CodigoPresentacion = 72 then ' Agrícola' when CodigoPresentacion = 73 then ' Construcción' when CodigoPresentacion = 74 then ' Wirtgen' end as NombrePresentacion,
1000 as CodigoConcepto,
Año,
Mes,
sede as NombreConcepto,
Sede,
round(SUM(Valor),0) as valor
from v_GMF_1_JD_ValoresVentasNetas as vn where año = @anio and mes = @mes-1 and CodigoPresentacion = @CodPresentacion 
and CodigoConcepto in (18,52,53)
group by  Empresa,CodigoPresentacion,Año,Mes,sede) as ConsA
join 
(select 
Empresa,
CodigoPresentacion,
case when CodigoPresentacion = 72 then ' Agrícola' when CodigoPresentacion = 73 then ' Construcción' when CodigoPresentacion = 74 then ' Wirtgen' end as NombrePresentacion,
CodigoConcepto,
Año,
Mes,
case when CodigoConcepto = 18 then 'Vehiculos'
when CodigoConcepto = 52 then 'Repuestos'
when CodigoConcepto = 53 then 'Taller' end as NombreConcepto,
Sede,
round(Valor,0) as Valor
from v_GMF_1_JD_ValoresVentasNetas as vn where año = @anio and mes = @mes-1 and CodigoPresentacion = @CodPresentacion
and CodigoConcepto in (18,52,53)) as ConsB
on ConsA.Año = ConsB.Año and ConsA.Mes = ConsB.Mes and ConsA.CodigoPresentacion = ConsB.CodigoPresentacion and ConsA.Sede = ConsB.Sede
union all
/**/
select 
Empresa,
CodigoPresentacion,
case when CodigoPresentacion = 72 then ' Agrícola' when CodigoPresentacion = 73 then ' Construcción' when CodigoPresentacion = 74 then ' Wirtgen' end as NombrePresentacion,
1000 as CodigoConcepto,
Año,
Mes,
'Total Linea' as NombreConcepto,
Sede,
round(SUM(Valor),0) as valor
from v_GMF_1_JD_ValoresVentasNetas as vn where año = @anio and mes = @mes-1 and CodigoPresentacion = @CodPresentacion
and CodigoConcepto in (18,52,53)
group by  Empresa,CodigoPresentacion,Año,Mes,sede
union all
select 
Empresa,
CodigoPresentacion,
case when CodigoPresentacion = 72 then ' Agrícola' when CodigoPresentacion = 73 then ' Construcción' when CodigoPresentacion = 74 then ' Wirtgen' end as NombrePresentacion,
CodigoConcepto,
Año,
Mes,
case when CodigoConcepto = 18 then 'Vehiculos'
when CodigoConcepto = 52 then 'Repuestos'
when CodigoConcepto = 53 then 'Taller' end as NombreConcepto,
Sede,
round(Valor,0) as Valor
from v_GMF_1_JD_ValoresVentasNetas as vn where año = @anio and mes = @mes-1 and CodigoPresentacion = @CodPresentacion
and CodigoConcepto in (18,52,53)
union all
select distinct 1 as Empresa ,idlinea , linea,1001 as codigoconcepto, anio, mes,'Porcentaje UsoCFC Vehiculos' as nombreconcepto,sede, 60 as valor
from GMF_CFC as A
where Anio = @anio and mes = @mes-1 and IdLinea = @CodPresentacion
union all
select distinct 1 as Empresa ,idlinea , linea,1001 as codigoconcepto, anio, mes,'Porcentaje UsoCFC Repuestos' as nombreconcepto,sede, 30 as valor
from GMF_CFC as A
where Anio = @anio and mes = @mes-1 and IdLinea = @CodPresentacion
union all
select distinct 1 as Empresa ,idlinea , linea,1001 as codigoconcepto, anio, mes,'Porcentaje UsoCFC Taller' as nombreconcepto,sede, 10 as valor
from GMF_CFC as A
where Anio = @anio and mes = @mes-1 and IdLinea = @CodPresentacion
)
as tos


--Exec [dbo].[sp_GMF_JD_UsoCFC_TotalInt] @anio,@mes,@CodPresentacion
--insert into  [dbo].[GMF_JD_UsoCFCTotales]
select distinct * from GMC_JD_UsoCFC_Total


END

--EXEC [sp_GMC_JD_UsoCFC_Total] 2021,3,72

```
