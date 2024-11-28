# View: v_GMF_JD_UsoCFC

## Usa los objetos:
- [[GMF_11_ValoresVentasNetasTotalLineas]]
- [[GMF_7_ValorYPorcentaje]]
- [[GMF_JD_ingresoCFC]]
- [[GMF_JD_UsoCFC]]

```sql

CREATE VIEW [dbo].[v_GMF_JD_UsoCFC]
AS
select IdLinea, case when IdLinea = 72 then ' Agrícola' when IdLinea = 73 then ' Construcción' when IdLinea = 74 then ' Wirtgen' when IdLinea = 1000 then 'Total' end as Linea,anio,mes,'Valor CFC' as nombre_concepto,ValorCFC as ValorTotal,0 as N1,1 as N2 from GMF_JD_UsoCFC UNION ALL
select IdLinea, case when IdLinea = 72 then ' Agrícola' when IdLinea = 73 then ' Construcción' when IdLinea = 74 then ' Wirtgen' when IdLinea = 1000 then 'Total' end as Linea,anio,mes,'PorcPeso' as nombre_concepto,PorcPeso as ValorTotal,0 as N1,1 as N2 from GMF_JD_UsoCFC UNION ALL
select IdLinea, case when IdLinea = 72 then ' Agrícola' when IdLinea = 73 then ' Construcción' when IdLinea = 74 then ' Wirtgen' when IdLinea = 1000 then 'Total' end as Linea,anio,mes,'Porcentaje Uso' as nombre_concepto,PorcUso as ValorTotal,0 as N1,1 as N2 from GMF_JD_UsoCFC UNION ALL
SELECT CodigoPresentacion as IdLinea,case when CodigoPresentacion = 72 then ' Agrícola' when CodigoPresentacion = 73 then ' Construcción' when CodigoPresentacion = 74 then ' Wirtgen' when CodigoPresentacion = 1000 then 'Total' end as NombrePresentacion,Año,Mes,'Valor Ventas' as nombre_concepto,ValorVentas as ValorTotal,0 as N1,1 as N2 FROM GMF_JD_ingresoCFC UNION ALL
SELECT CodigoPresentacion as IdLinea,case when CodigoPresentacion = 72 then ' Agrícola' when CodigoPresentacion = 73 then ' Construcción' when CodigoPresentacion = 74 then ' Wirtgen' when CodigoPresentacion = 1000 then 'Total' end as NombrePresentacion,Año,Mes,'Porcentaje Distribucion' as nombre_concepto,PorcDistribucion as ValorTotal,0 as N1,1 as N2 FROM GMF_JD_ingresoCFC UNION ALL
SELECT CodigoPresentacion as IdLinea,case when CodigoPresentacion = 72 then ' Agrícola' when CodigoPresentacion = 73 then ' Construcción' when CodigoPresentacion = 74 then ' Wirtgen' when CodigoPresentacion = 1000 then 'Total' end as NombrePresentacion,Año,Mes,'Porcentaje Ingreso' as nombre_concepto,PorcIngreso as ValorTotal,0 as N1,1 as N2 FROM GMF_JD_ingresoCFC UNION ALL
SELECT CodigoPresentacion as IdLinea,case when CodigoPresentacion = 72 then ' Agrícola' when CodigoPresentacion = 73 then ' Construcción' when CodigoPresentacion = 74 then ' Wirtgen' when CodigoPresentacion = 1000 then 'Total' end as NombrePresentacion,Año,Mes,'Porcentaje Distribucion GMF' as nombre_concepto,PorcDistGMF as ValorTotal,0 as N1,1 as N2 FROM GMF_JD_ingresoCFC

union all

select CodigoPresentacion, case when CodigoPresentacion = 72 then ' Agrícola' when CodigoPresentacion = 73 then ' Construcción' when CodigoPresentacion = 74 then ' Wirtgen' end as NombrePresentacion , año, mes,LTRIM(RTRIM(NombreLineas)) as NombreLineas, Valor ,0 as N1,1 as N2 
from (
select Año,Mes,Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores Y Maquinas MOTORYSA' end AS 'Empresa',CodigoPresentacion,NombrePresentacion, 'Costos y Gastos' as NombreLineas, ValorCostosGastos as 'Valor'  from GMF_7_ValorYPorcentaje
union all
select Año,Mes,Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores Y Maquinas MOTORYSA' end AS 'Empresa',CodigoPresentacion,NombrePresentacion, 'Porcentaje A Distribuir' as NombreLineas, PorcentajeDistribucion from GMF_7_ValorYPorcentaje
union all
select Año,Mes,Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores Y Maquinas MOTORYSA' end AS 'Empresa',CodigoPresentacion,NombrePresentacion, 'Valor GMF a Distribuir' as NombreLineas, ValorADistribuirPorLinea from GMF_7_ValorYPorcentaje
union all
select Año,Mes,Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores Y Maquinas MOTORYSA' end AS 'Empresa',CodigoPresentacion,NombrePresentacion, 'Ventas Netas' as NombreLineas, Valor from GMF_11_ValoresVentasNetasTotalLineas
) as a
where año = (select distinct Año from GMF_JD_ingresoCFC) and Mes = (select distinct mes from GMF_JD_ingresoCFC) and CodigoPresentacion in (72,73,74)

union all 
select 1000, 'Total' as NombrePresentacion , año, mes,LTRIM(RTRIM(NombreLineas)) as NombreLineas, sum(Valor) ,0 as N1,1 as N2 
from (
select Año,Mes,Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores Y Maquinas MOTORYSA' end AS 'Empresa',CodigoPresentacion,NombrePresentacion, 'Costos y Gastos' as NombreLineas, ValorCostosGastos as 'Valor'  from GMF_7_ValorYPorcentaje
union all
select Año,Mes,Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores Y Maquinas MOTORYSA' end AS 'Empresa',CodigoPresentacion,NombrePresentacion, 'Porcentaje A Distribuir' as NombreLineas, PorcentajeDistribucion from GMF_7_ValorYPorcentaje
union all
select Año,Mes,Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores Y Maquinas MOTORYSA' end AS 'Empresa',CodigoPresentacion,NombrePresentacion, 'Valor GMF a Distribuir' as NombreLineas, ValorADistribuirPorLinea from GMF_7_ValorYPorcentaje
union all
select Año,Mes,Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores Y Maquinas MOTORYSA' end AS 'Empresa',CodigoPresentacion,NombrePresentacion, 'Ventas Netas' as NombreLineas, Valor from GMF_11_ValoresVentasNetasTotalLineas
) as a
where año = (select distinct Año from GMF_JD_ingresoCFC) and Mes = (select distinct mes from GMF_JD_ingresoCFC) and CodigoPresentacion in (72,73,74)
group by año, mes,NombreLineas

```
