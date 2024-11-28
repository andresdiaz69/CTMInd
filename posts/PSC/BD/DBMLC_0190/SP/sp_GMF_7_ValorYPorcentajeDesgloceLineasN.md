# Stored Procedure: sp_GMF_7_ValorYPorcentajeDesgloceLineasN

## Usa los objetos:
- [[GMF_11_ValoresVentasNetasTotalLineas]]
- [[GMF_16_ValorGMFPorCentro]]
- [[GMF_7]]
- [[GMF_7_ValorYPorcentaje]]
- [[GMF_ArchivoPlano]]
- [[GMF_SedesParametros]]
- [[v_GMF_1_ValorMensualGMF_USC]]

```sql



CREATE PROCEDURE [dbo].[sp_GMF_7_ValorYPorcentajeDesgloceLineasN]
@anio varchar(5), @mes varchar(5), @empresa int

AS
BEGIN


truncate table GMF_7
insert into GMF_7 
select * from (
select  Año,Mes,IdEmpresa, Empresa,CodigoPresentacion,NombrePresentacion,LTRIM(RTRIM(NombreLineas)) as NombreLineas, Valor, 0 AS 'N1', 1 AS 'N2' from (
select Año,Mes,Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores Y Maquinas MOTORYSA' end AS 'Empresa',CodigoPresentacion,NombrePresentacion, 'Costos y Gastos' as NombreLineas, ValorCostosGastos as 'Valor'  from GMF_7_ValorYPorcentaje
union all
select Año,Mes,Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores Y Maquinas MOTORYSA' end AS 'Empresa',CodigoPresentacion,NombrePresentacion, 'Porcentaje A Distribuir' as NombreLineas, PorcentajeDistribucion from GMF_7_ValorYPorcentaje
union all
select Año,Mes,Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores Y Maquinas MOTORYSA' end AS 'Empresa',CodigoPresentacion,NombrePresentacion, 'Valor GMF a Distribuir' as NombreLineas, ValorADistribuirPorLinea from GMF_7_ValorYPorcentaje
union all
select Año,Mes,Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores Y Maquinas MOTORYSA' end AS 'Empresa',CodigoPresentacion,NombrePresentacion, 'Ventas Netas' as NombreLineas, Valor from GMF_11_ValoresVentasNetasTotalLineas) as a) as a
select * from GMF_7
where Año =  @anio and  Mes = @mes and  IdEmpresa =   @empresa  and CodigoPresentacion not in (72,73,74)
union all
select  distinct
Año,Mes,IdEmpresa,Empresa,0 as CodigoPresentacion,'VTotal' as NombrePresentacion, nombrelineas, 
(select sum(Valor) from GMF_7 where NombreLineas = a.NombreLineas and año = @anio and mes = @mes and IdEmpresa = @empresa and CodigoPresentacion not in (72,73,74) group by NombreLineas) AS Valor,
N1,N2
from GMF_7 as a
where año = @anio and mes = @mes and IdEmpresa = @empresa and CodigoPresentacion not in (72,73,74)



declare @mydate datetime
set @mydate = concat(@anio,'-',1,'-',@mes)

TRUNCATE TABLE GMF_ArchivoPlano 
INSERT INTO GMF_ArchivoPlano 

SELECT *
	FROM (
	select FORMAT(EOMONTH( @mydate ), 'yyyyMMdd') as FechaAsiento, 'OV' as TipoAsiento, 
	concat('REG. ', UPPER(SUBSTRING(datename(month, @mydate),0,4)), ' GMF') as ConceptoAsiento,
	'' AS TipoOperacion, '5215955005' as Cuenta,'H' as 'Debe/Haber',
	CONVERT(VARCHAR, CONVERT(VARCHAR, CAST(Valor  AS MONEY),1))as Importe, 
	'' as Entidad, CASE WHEN IdEmpresas = 1 THEN '2' WHEN IdEmpresas = 6 THEN '249195' END AS 'Tercero',
	'' as CuentaBancaria,ISNULL(CASE WHEN b.Centro IS NULL THEN a.centro ELSE b.Centro END,'') AS Centro, 
	ISNULL(b.Departamento,'') AS Departamento,
	ISNULL(b.Seccion,'') AS Seccion , ISNULL( b.Marca,'') AS Marca,
	'' as Gama, '' as MR, '' as Clasificacion1, '' as Referencia, '' as CanaldeVenta, 
	'' as CanaldeCompra, '' as ConceptoBancario , '' as Moneda, '' as FactorCambio,
	GETDATE() AS FechaGeneracion
	FROM v_GMF_1_ValorMensualGMF_USC  as a 
	left join GMF_SedesParametros as b on 
	a.centro = b.Centro
	where año = @anio and Mes = @mes and IdEmpresas = @empresa 
	
	union all
	
	select FORMAT(EOMONTH( @mydate ), 'yyyyMMdd') as FechaAsiento, 'OV' as TipoAsiento, 
	concat('REG. ', UPPER(SUBSTRING(datename(month, @mydate),0,4)), ' GMF') as ConceptoAsiento,
	'' AS TipoOperacion, '5215955005' as Cuenta,'D' as 'Debe/Haber',
	CONVERT(VARCHAR, CONVERT(VARCHAR, CAST(ValorGMFPorCentro  AS MONEY),1))as Importe, 
	'' as Entidad, CASE WHEN a.Empresa = 1 THEN '2' WHEN a.Empresa = 6 THEN '249195' END AS 'Tercero',
	'' as CuentaBancaria,ISNULL(b.Centro,'') AS Centro, ISNULL(b.Departamento,'') AS Departamento,
	ISNULL(b.Seccion,'') AS Seccion , ISNULL( b.Marca,'') AS Marca,
	'' as Gama, '' as MR, '' as Clasificacion1, '' as Referencia, '' as CanaldeVenta, 
	'' as CanaldeCompra, '' as ConceptoBancario , '' as Moneda, '' as FactorCambio,
	GETDATE() AS FechaGeneracion
	from GMF_16_ValorGMFPorCentro as a 
	inner join GMF_SedesParametros as b on 
	a.Nombrepresentacion = b.UnidadNegocio
	--and a.Empresa = b.Empresa
	and a.sede = b.Sede
	and a.CodigoConcepto = b.CodigoConcepto
	where año = @anio and Mes = @mes and a.Empresa = @empresa and CodigoPresentacion not in (72,73,74)) AS A

	
END



```
