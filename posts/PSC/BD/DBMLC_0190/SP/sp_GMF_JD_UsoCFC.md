# Stored Procedure: sp_GMF_JD_UsoCFC

## Usa los objetos:
- [[GMF_CFC]]
- [[GMF_JD_ingresoCFC]]
- [[GMF_JD_UsoCFC]]
- [[GMF_ParametrosCFC]]
- [[v_GMF_2_JD_ValoresVentasNetasTotalLineas]]
- [[v_GMF_JD_UsoCFC]]

```sql

CREATE PROCEDURE [dbo].[sp_GMF_JD_UsoCFC]
@anio varchar(5), @mes varchar(5)
AS
BEGIN

TRUNCATE TABLE GMF_JD_ingresoCFC
truncate table GMF_JD_UsoCFC


declare @activo int

if((select isnull(sum(IdCFC),0) from GMF_CFC where anio = @anio and mes = @mes) >0)
set @activo = 1
else 
set @activo = 0


if @activo = 1
/*Tabla USO CFC*/
insert into GMF_JD_UsoCFC
select * from (
select 
consA.IdLinea,consA.Linea,consA.anio,consA.mes,consA.UnidadDeNegocio,consA.PorcPorLinea as ValorCFC,
CONVERT(numeric(10,0), round((consA.PorcPorLinea/consB.TotalPorLinea)*100,0)) as PorcPeso,
CONVERT(numeric(10,0), round(CONVERT(numeric(10,0), round((consA.PorcPorLinea/consB.TotalPorLinea)*100,0))*(select PorcentajeCFC from GMF_ParametrosCFC where IdLinea = consA.IdLinea and Anio = @anio and IdMes = @mes)/100,0)) as PorcUso
from (select IdLinea,Linea, anio,mes,UnidadDeNegocio,
CASE WHEN IdLinea = 72 THEN sum(isnull(valor,0))
WHEN IdLinea = 73 THEN (sum(isnull(valor,0))*0.7) 
WHEN IdLinea = 74 THEN (sum(isnull(valor,0))*0.3) END AS PorcPorLinea
from GMF_CFC
where anio = @anio and mes = @mes-1
group by IdLinea,Linea,anio,mes,UnidadDeNegocio) as consA
join 
(SELECT 1000 as IdLinea,'Total' as Linea, anio, Mes, unidaddenegocio,
sum(TotalPorLinea) as TotalPorLinea
FROM (select 
IdLinea,
Linea,
anio,
mes,
UnidadDeNegocio,
CASE WHEN IdLinea = 72 THEN sum(isnull(valor,0))
WHEN IdLinea = 73 THEN (sum(isnull(valor,0))*0.7) 
WHEN IdLinea = 74 THEN (sum(isnull(valor,0))*0.3) END AS TotalPorLinea
from GMF_CFC
where anio = @anio and mes = @mes-1
group by IdLinea,Linea,anio,
mes,UnidadDeNegocio) as b group by anio, Mes, unidaddenegocio) AS consB on consA.Anio = consB.Anio and consA.Mes = consB.Mes 
union all
select 1000 as IdLinea, 'Total' as Linea,Anio,Mes,UnidadDeNegocio, sum(ValorCFC), sum(PorcPeso), sum(PorcUso) from 
(select consA.IdLinea,consA.Linea,consA.anio,consA.mes,consA.UnidadDeNegocio,consA.PorcPorLinea as ValorCFC,
CONVERT(numeric(10,0), round((consA.PorcPorLinea/consB.TotalPorLinea)*100,0)) as PorcPeso,
CONVERT(numeric(10,0), round(CONVERT(numeric(10,0), round((consA.PorcPorLinea/consB.TotalPorLinea)*100,0))*(select PorcentajeCFC from GMF_ParametrosCFC where IdLinea = consA.IdLinea and Anio = @anio and IdMes = @mes)/100,0)) as PorcUso
from (select IdLinea,Linea,anio,mes,UnidadDeNegocio,
CASE WHEN IdLinea = 72 THEN sum(isnull(valor,0))
WHEN IdLinea = 73 THEN (sum(isnull(valor,0))*0.7) 
WHEN IdLinea = 74 THEN (sum(isnull(valor,0))*0.3) END AS PorcPorLinea
from GMF_CFC
where anio = @anio and mes = @mes-1
group by IdLinea,Linea,anio,mes,UnidadDeNegocio) as consA
join (SELECT anio, Mes, unidaddenegocio,1000 as IdLinea,'Total' as Linea, 
sum(TotalPorLinea) as TotalPorLinea
FROM (select IdLinea,
Linea,
anio,
mes,
UnidadDeNegocio,
CASE WHEN IdLinea = 72 THEN sum(isnull(valor,0))
WHEN IdLinea = 73 THEN (sum(isnull(valor,0))*0.7) 
WHEN IdLinea = 74 THEN (sum(isnull(valor,0))*0.3) END AS TotalPorLinea
from GMF_CFC
where anio = @anio and mes = @mes
group by IdLinea,Linea,anio,
mes,UnidadDeNegocio) as b group by anio, Mes, unidaddenegocio) AS consB on consA.Anio = consB.Anio and consA.Mes = consB.Mes ) as a
group by Anio,Mes,UnidadDeNegocio)
as a

DECLARE @activo1 int
/*TABLA INGRESO TOTAL*/
if((select COUNT(*) from GMF_ParametrosCFC where anio = @anio and IdMes = @mes and IdLinea in (72,73,74)) >2)
set @activo1 = 1
else 
set @activo1 = 0


if @activo1 = 1
INSERT INTO GMF_JD_ingresoCFC 
SELECT A.Empresa
,A.Año
,A.Mes
,A.CodigoPresentacion
,A.NombrePresentacion
,round(A.ValorVentas,0) as ValorVentas
, round(A.ValorVentas / (select round(sum(Valor),0) as ValorVentas from v_GMF_2_JD_ValoresVentasNetasTotalLineas where Año = A.Año AND Mes = A.Mes)*100,0) AS PorcDistribucion 
,round(CONVERT(numeric(10,0), round(A.ValorVentas / (select round(sum(Valor),0) as ValorVentas from v_GMF_2_JD_ValoresVentasNetasTotalLineas where Año = A.Año AND Mes = A.Mes)*100,0))*(select PorcentajeIngreso from GMF_ParametrosCFC where IdLinea = A.CodigoPresentacion and Anio = @anio and IdMes = @mes)/100,0) AS PorcIngreso
,round(CONVERT(numeric(10,0), round(A.ValorVentas / (select round(sum(Valor),0) as ValorVentas from v_GMF_2_JD_ValoresVentasNetasTotalLineas where Año = A.Año AND Mes = A.Mes)*100,0))*(select PorcentajeIngreso from GMF_ParametrosCFC where IdLinea = A.CodigoPresentacion and Anio = @anio and IdMes = @mes)/100
+ (select PorcUso from GMF_JD_UsoCFC where anio = A.Año and mes = A.Mes and IdLinea = A.CodigoPresentacion),0) AS porcDistGMF
FROM (
select Empresa
,Año
,Mes
,CodigoPresentacion
,NombrePresentacion
,round(Valor,0) as ValorVentas
from v_GMF_2_JD_ValoresVentasNetasTotalLineas where Año = @anio and mes = @mes-1
) AS A
union all
select Empresa,año,mes,1000 as codigopresentacion,'Total' as nombrepresentacion,sum(ValorVentas),sum(PorcDistribucion), sum(PorcIngreso),sum(porcDistGMF) from
(SELECT A.Empresa
,A.Año
,A.Mes
,A.CodigoPresentacion
,A.NombrePresentacion
,Round(A.Valor,0) as ValorVentas
,round(A.Valor / (select round(sum(Valor),0) as ValorVentas from v_GMF_2_JD_ValoresVentasNetasTotalLineas where Año = A.Año AND Mes = A.Mes)*100,0) AS PorcDistribucion 
,round(round(A.Valor / (select round(sum(Valor),0) as ValorVentas from v_GMF_2_JD_ValoresVentasNetasTotalLineas where Año = A.Año AND Mes = A.Mes)*100,0)*(select PorcentajeIngreso from GMF_ParametrosCFC where IdLinea = A.CodigoPresentacion)/100,0) AS PorcIngreso
,round(round(A.Valor / (select round(sum(Valor),0) as ValorVentas from v_GMF_2_JD_ValoresVentasNetasTotalLineas where Año = A.Año AND Mes = A.Mes)*100,0)*(select PorcentajeIngreso from GMF_ParametrosCFC where IdLinea = A.CodigoPresentacion)/100 
+ (select PorcUso from GMF_JD_UsoCFC where anio = A.Año and mes = A.Mes and idlinea = A.CodigoPresentacion),0) AS porcDistGMF
 FROM (
select Empresa
,Año
,Mes
,CodigoPresentacion
,NombrePresentacion
,Valor
from v_GMF_2_JD_ValoresVentasNetasTotalLineas where Año = @anio and mes = @mes-1) AS A
) as b
group by Empresa,año,mes

select * from [dbo].[v_GMF_JD_UsoCFC]

END


```
