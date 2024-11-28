# Stored Procedure: sp_GMF_ValorPlanoJonhDeere

## Usa los objetos:
- [[GMF_16_ValorGMFPorCentro]]
- [[GMF_ArchivoPlano_JD]]
- [[GMF_Parametros_Lineas]]
- [[GMF_SedesParametros]]
- [[GMF_ValorJD]]
- [[v_GMF_1_ValorMensualGMF_USC]]
- [[v_GMF_2_ValoresCostosGastos]]
- [[v_GMF_3_ValorGastosOperacion]]

```sql

CREATE PROCEDURE [dbo].[sp_GMF_ValorPlanoJonhDeere]
@anio int, @mes int, @empresa int

AS
BEGIN

truncate table GMF_ValorJD

declare @activo72 int
declare @activo73 int
declare @activo74 int


if((select isnull(sum(IdLinea),0) from GMF_Parametros_Lineas where CodigoPresentacion in (72) and Anio = @anio and IdMes = @mes ) >0)
set @activo72 = 1
else 
set @activo72 = 0


if((select isnull(sum(IdLinea),0) from GMF_Parametros_Lineas where CodigoPresentacion in (73) and Anio = @anio and IdMes = @mes ) >0)
set @activo73 = 1
else 
set @activo73 = 0


if((select isnull(sum(IdLinea),0) from GMF_Parametros_Lineas where CodigoPresentacion in (74) and Anio = @anio and IdMes = @mes ) >0)
set @activo74 = 1
else 
set @activo74 = 0


if @activo72 = 1
insert into GMF_ValorJD
select * from v_GMF_2_ValoresCostosGastos 
where CodigoPresentacion in (72) and año = @anio and Mes = @mes and CodigoConcepto in (370)
union all
select distinct
Empresa, CodigoPresentacion, nombrepresentacion, Año, Mes, 001 as CodigoConcepto,'GO - D+A' as NombreConcepto , 
Sede,
(select Valor from v_GMF_3_ValorGastosOperacion where CodigoPresentacion = a.CodigoPresentacion and año = @anio and Mes = @mes)-(sum(valor)) as Valor 
from v_GMF_2_ValoresCostosGastos as a
where CodigoPresentacion in (72) and año = @anio and Mes = @mes and CodigoConcepto in (163,164)
group by Empresa, CodigoPresentacion, nombrepresentacion, Año, Mes,sede
else if @activo72 = 0 
insert into GMF_ValorJD
select distinct
Empresa, CodigoPresentacion, nombrepresentacion, Año, Mes, 001 as CodigoConcepto,'GO - D+A' as NombreConcepto , 
Sede,
(select Valor from v_GMF_3_ValorGastosOperacion where CodigoPresentacion = a.CodigoPresentacion and año = @anio and Mes = @mes)-(sum(valor)) as Valor 
from v_GMF_2_ValoresCostosGastos as a
where CodigoPresentacion in (72) and año = @anio and Mes = @mes and CodigoConcepto in (163,164)
group by Empresa, CodigoPresentacion, nombrepresentacion, Año, Mes,sede



if @activo73 = 1
insert into GMF_ValorJD
select * from v_GMF_2_ValoresCostosGastos 
where CodigoPresentacion in (73) and año = @anio and Mes = @mes and CodigoConcepto in (370)
union all
select distinct
Empresa, CodigoPresentacion, nombrepresentacion, Año, Mes, 001 as CodigoConcepto,'GO - D+A' as NombreConcepto , 
Sede,
(select Valor from v_GMF_3_ValorGastosOperacion where CodigoPresentacion = a.CodigoPresentacion and año = @anio and Mes = @mes)-(sum(valor)) as Valor 
from v_GMF_2_ValoresCostosGastos as a
where CodigoPresentacion in (73) and año = @anio and Mes = @mes and CodigoConcepto in (163,164)
group by Empresa, CodigoPresentacion, nombrepresentacion, Año, Mes,sede
else if @activo73 = 0 
insert into GMF_ValorJD
select distinct
Empresa, CodigoPresentacion, nombrepresentacion, Año, Mes, 001 as CodigoConcepto,'GO - D+A' as NombreConcepto , 
Sede,
(select Valor from v_GMF_3_ValorGastosOperacion where CodigoPresentacion = a.CodigoPresentacion and año = @anio and Mes = @mes)-(sum(valor)) as Valor 
from v_GMF_2_ValoresCostosGastos as a
where CodigoPresentacion in (73) and año = @anio and Mes = @mes and CodigoConcepto in (163,164)
group by Empresa, CodigoPresentacion, nombrepresentacion, Año, Mes,sede




if @activo74 = 1
insert into GMF_ValorJD
select *  from v_GMF_2_ValoresCostosGastos 
where CodigoPresentacion in (74) and año = @anio and Mes = @mes and CodigoConcepto in (370)
union all
select distinct
Empresa, CodigoPresentacion, nombrepresentacion, Año, Mes, 001 as CodigoConcepto,'GO - D+A' as NombreConcepto , 
Sede,
(select Valor from v_GMF_3_ValorGastosOperacion where CodigoPresentacion = a.CodigoPresentacion and año = @anio and Mes = @mes)-(sum(valor)) as Valor 
from v_GMF_2_ValoresCostosGastos as a
where CodigoPresentacion in (74) and año = @anio and Mes = @mes and CodigoConcepto in (163,164)
group by Empresa, CodigoPresentacion, nombrepresentacion, Año, Mes,sede
else if @activo74 = 0 
insert into GMF_ValorJD
select distinct
Empresa, CodigoPresentacion, nombrepresentacion, Año, Mes, 001 as CodigoConcepto,'GO - D+A' as NombreConcepto , 
Sede,
(select Valor from v_GMF_3_ValorGastosOperacion where CodigoPresentacion = a.CodigoPresentacion and año = @anio and Mes = @mes)-(sum(valor)) as Valor 
from v_GMF_2_ValoresCostosGastos as a
where CodigoPresentacion in (74) and año = @anio and Mes = @mes and CodigoConcepto in (163,164)
group by Empresa, CodigoPresentacion, nombrepresentacion, Año, Mes,sede

select * from GMF_ValorJD


---------------------------------------------------------------

declare @mydate datetime
set @mydate = concat(@anio,'-',1,'-',@mes)

TRUNCATE TABLE GMF_ArchivoPlano_JD 
INSERT INTO GMF_ArchivoPlano_JD 

select FORMAT(EOMONTH( @mydate ), 'yyyyMMdd') as FechaAsiento, 'OV' as TipoAsiento, 
	concat('REG. ', UPPER(SUBSTRING(datename(month, @mydate),0,4)), ' GMF') as ConceptoAsiento,
	'' AS TipoOperacion, '5215955005' as Cuenta,'H' as 'Debe/Haber',
	ISNULL(CONVERT(VARCHAR, CONVERT(VARCHAR, CAST(Valor  AS MONEY),1)),0) as Importe, 
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
	
	select DISTINCT FORMAT(EOMONTH( @mydate ), 'yyyyMMdd') as FechaAsiento, 'OV' as TipoAsiento, 
	concat('REG. ', UPPER(SUBSTRING(datename(month, @mydate),0,4)), ' GMF') as ConceptoAsiento,
	'' AS TipoOperacion, '5215955005' as Cuenta,'D' as 'Debe/Haber',
	ISNULL(CONVERT(VARCHAR, CONVERT(VARCHAR, CAST(ValorGMFPorCentro  AS MONEY),1)),0)as Importe, 
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
	where año = @anio and Mes = @mes and a.Empresa = @empresa


END

```
