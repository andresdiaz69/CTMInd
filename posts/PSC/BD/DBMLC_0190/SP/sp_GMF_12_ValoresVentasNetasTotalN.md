# Stored Procedure: sp_GMF_12_ValoresVentasNetasTotalN

## Usa los objetos:
- [[GMF_12_Desgloce]]
- [[GMF_12_ValoresVentasNetasTotalSedes]]
- [[GMF_12_ValoresVentasNetasTotalSedes_fab_col]]
- [[GMF_13_ValorYDistribucionPorSede]]
- [[GMF_14_Valor_GMFADistribuirPorSede]]
- [[GMF_15_PorcentajeDistribucionPorCentro]]
- [[GMF_16_ValorGMFPorCentro]]

```sql




CREATE PROCEDURE [dbo].[sp_GMF_12_ValoresVentasNetasTotalN]
@anio as int,
@mes as int,
@empresa as int,
@Codigopresentacion as int

AS
BEGIN


TRUNCATE TABLE GMF_12_Desgloce
INSERT into GMF_12_Desgloce
SELECT * FROM(
	select AÑO, MES, IdEmpresa, Empresa, CASE WHEN CodigoPresentacion IS NULL THEN @Codigopresentacion ELSE CodigoPresentacion END AS CodigoPresentacion, NombrePresentacion,Codigoconcepto, nombre_concepto,sede,ValorTotal, 1 AS 'N1', 0 AS 'N2' from (
	SELECT año, mes, Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores y Maquinas MOTORYSA' end as Empresa, codigopresentacion, nombrepresentacion, 1 as 'Codigoconcepto', 'Ventas Netas' as 'nombre_concepto', sede, valor as 'ValorTotal' FROM GMF_12_ValoresVentasNetasTotalSedes
	union all
	select año, mes, Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores y Maquinas MOTORYSA' end as Empresa, codigopresentacion, nombrepresentacion, 2 as 'Codigoconcepto', 'Porcentaje Distribucion' as 'nombreconcepto', sede, PorcentajeDistribucionSede from GMF_13_ValorYDistribucionPorSede
	union all
	 select año, mes, Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores y Maquinas MOTORYSA' end as Empresa, codigopresentacion, nombrepresentacion, 3 as 'Codigoconcepto', 'Valor GMF Por Sede G' as 'nombreconcepto', sede, ValorSedeGMF from GMF_14_Valor_GMFADistribuirPorSede
	union all
	 ------select a.año, a.mes, A.Empresa as IdEmpresa,case when A.Empresa = 1 then 'CASATORO' when A.Empresa = 6 then 'Motores y Maquinas MOTORYSA' end as Empresa, b.CodigoPresentacion, b.NombrePresentacion, a.Codigoconcepto, a.nombreconcepto, CONCAT( 'Fabrica-',a.sede) as sede, 
	 ------ValorFabrica FROM GMF_12_ValoresVentasNetasTotalSedes_fab_col as a 
	 ------inner join GMF_12_ValoresVentasNetasTotalSedes as b on a.Año = b.año and a.Mes = b.mes and a.Empresa = b.empresa and a.CodPresentacionprincipal = b.CodigoPresentacion and a.sede = b.sede
	 ------where a.ValorFabrica > 0
	 	 /*solo fabricas que tengan valor diferente a 0 - mano de obra*/
	 select a.año, a.mes, A.Empresa as IdEmpresa,case when A.Empresa = 1 then 'CASATORO' when A.Empresa = 6 then 'Motores y Maquinas MOTORYSA' end as Empresa, b.CodigoPresentacion, b.NombrePresentacion, a.Codigoconcepto,CONCAT('INC_',a.nombreconcepto) AS nombreconcepto , CONCAT( 'Fabrica-CO-',a.sede) as sede, ValorFabrica  from GMF_12_ValoresVentasNetasTotalSedes_fab_col as a
	  inner join GMF_12_ValoresVentasNetasTotalSedes  as b on a.Año = b.año and a.Mes = b.mes and a.Empresa = b.empresa and a.CodPresentacionprincipal = b.CodigoPresentacion and a.sede = b.sede 
	  where a.sede in (select
	 distinct sede from GMF_16_ValorGMFPorCentro)
	 union all 
	 select a.año, a.mes, A.Empresa as IdEmpresa,case when A.Empresa = 1 then 'CASATORO' when A.Empresa = 6 then 'Motores y Maquinas MOTORYSA' end as Empresa, b.CodigoPresentacion, b.NombrePresentacion, a.Codigoconcepto, CONCAT('INC_',a.nombreconcepto) AS nombreconcepto, CONCAT( 'CO-',a.sede) as sede, 
	 ValorColision FROM GMF_12_ValoresVentasNetasTotalSedes_fab_col as a 
	 inner join GMF_12_ValoresVentasNetasTotalSedes as b on a.Año = b.año and a.Mes = b.mes and a.Empresa = b.empresa and a.CodPresentacionprincipal = b.CodigoPresentacion and a.sede = b.sede
	 where a.sede in (select
	 distinct sede from GMF_16_ValorGMFPorCentro)
	  union all 

	  select  a.año, a.mes, A.Empresa as IdEmpresa,case when A.Empresa = 1 then 'CASATORO' when A.Empresa = 6 then 'Motores y Maquinas MOTORYSA' end as Empresa,a.CodPresentacionprincipal, b.NombrePresentacion,a.Codigoconcepto,CONCAT('INC_',a.nombreconcepto) AS nombreconcepto, a.sede as sede, ValorCentro
	  from GMF_12_ValoresVentasNetasTotalSedes_fab_col a INNER join GMF_12_ValoresVentasNetasTotalSedes as b on a.Año = b.año and a.Mes = b.mes and a.Empresa = b.empresa
	   and a.CodPresentacionprincipal = b.CodigoPresentacion and a.sede = b.sede
	   union all 
	   	  SELECT a.año, a.mes, A.Empresa as IdEmpresa,case when A.Empresa = 1 then 'CASATORO' when A.Empresa = 6 then 'Motores y Maquinas MOTORYSA' end as Empresa, CodigoPresentacion, NombrePresentacion, a.Codigoconcepto,
	  CONCAT('PD_',a.nombreconcepto) AS nombreconcepto , CONCAT( 'Fabrica-CO-',a.sede) as sede, PorcentajeDistribucionFabrica  FROM GMF_15_PorcentajeDistribucionPorCentro A
	  where  PorcentajeDistribucionFabrica > 0
	  UNION ALL 
	  	  SELECT a.año, a.mes, A.Empresa as IdEmpresa,case when A.Empresa = 1 then 'CASATORO' when A.Empresa = 6 then 'Motores y Maquinas MOTORYSA' end as Empresa, CodigoPresentacion, NombrePresentacion, a.Codigoconcepto,
	  CONCAT('PD_',a.nombreconcepto) AS nombreconcepto , CONCAT( 'CO-',a.sede) as sede, PorcentajeDistribucionColision  FROM GMF_15_PorcentajeDistribucionPorCentro A
	  where  PorcentajeDistribucionColision > 0 
	  UNION ALL
		  select año, mes, Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores y Maquinas MOTORYSA' end as Empresa, CodigoPresentacion, NombrePresentacion, CodigoConcepto, 
	  CONCAT('PD_',nombreconcepto) AS nombreconcepto, Sede, PorcentajeDistribucionCentro from 	 GMF_15_PorcentajeDistribucionPorCentro
	 union all
	 SELECT a.año, a.mes, A.Empresa as IdEmpresa,case when A.Empresa = 1 then 'CASATORO' when A.Empresa = 6 then 'Motores y Maquinas MOTORYSA' end as Empresa, CodigoPresentacion, NombrePresentacion, a.Codigoconcepto,
		'% Centro' AS nombreconcepto , sede, sum(PorcentajeDistribucionCentro) as ValorTotal
		FROM GMF_15_PorcentajeDistribucionPorCentro A
		where  PorcentajeDistribucionFabrica > 0
		group by a.año, a.mes, A.Empresa, CodigoPresentacion, NombrePresentacion, a.Codigoconcepto, sede
	 union all	
	 	 SELECT a.año, a.mes, A.Empresa as IdEmpresa,case when A.Empresa = 1 then 'CASATORO' when A.Empresa = 6 then 'Motores y Maquinas MOTORYSA' end as Empresa, CodigoPresentacion, NombrePresentacion, a.Codigoconcepto,
		'% colision' AS nombreconcepto , sede, sum(PorcentajeDistribucionColision) as ValorTotal
		FROM GMF_15_PorcentajeDistribucionPorCentro A
		where  PorcentajeDistribucionFabrica > 0
		group by a.año, a.mes, A.Empresa, CodigoPresentacion, NombrePresentacion, a.Codigoconcepto, sede
	  --select año, mes, Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores y Maquinas MOTORYSA' end as Empresa, CodigoPresentacion, NombrePresentacion, CodigoConcepto, CONCAT('PD_',nombreconcepto) AS nombreconcepto, Sede, PorcentajeDistribucionColision from 	 GMF_15_PorcentajeDistribucionPorCentro
	  -- union all 
	  --select año, mes, Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores y Maquinas MOTORYSA' end as Empresa, CodigoPresentacion, NombrePresentacion, CodigoConcepto, CONCAT('PD_',nombreconcepto) AS nombreconcepto, Sede, sum(PorcentajeDistribucionCentro) as 'Total' from GMF_15_PorcentajeDistribucionPorCentro
	  --group by año, mes, empresa, CodigoPresentacion, NombrePresentacion, CodigoConcepto, NombreConcepto, Sede
	 union all	 
	SELECT  año, mes, Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores y Maquinas MOTORYSA' end as Empresa, CodigoPresentacion, NombrePresentacion, CodigoConcepto, CONCAT('GMF_',nombreconcepto), CONCAT( 'Fabrica-CO-',sede) as sede, ValorGMFPorFabrica 
	 FROM GMF_16_ValorGMFPorCentro
	WHERE ValorGMFPorFabrica>0 
	UNION ALL 
	select año, mes, Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores y Maquinas MOTORYSA' end as Empresa, CodigoPresentacion, NombrePresentacion, CodigoConcepto, CONCAT('GMF_',nombreconcepto), CONCAT( 'CO-',sede) as sede, ValorGMFPorColision 
	 from GMF_16_ValorGMFPorCentro where ValorGMFPorColision > 0
	 --select año, mes, Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores y Maquinas MOTORYSA' end as Empresa, CodigoPresentacion, NombrePresentacion, CodigoConcepto, CONCAT('GMF_',nombreconcepto), CONCAT( 'Fabrica-CO-',sede) as sede, ValorGMFPorFabrica 
	 --from GMF_16_ValorGMFPorCentro-- where ValorGMFPorFabrica > 0
	  --union all
	 --select año, mes, Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores y Maquinas MOTORYSA' end as Empresa, CodigoPresentacion, NombrePresentacion, CodigoConcepto, CONCAT('GMF_',nombreconcepto), CONCAT( 'CO-',sede) as sede, ValorGMFPorColision 
	 --from GMF_16_ValorGMFPorCentro --where ValorGMFPorColision > 0
	union all 
		select año, mes, Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores y Maquinas MOTORYSA' end as Empresa, CodigoPresentacion, NombrePresentacion, CodigoConcepto, CONCAT('GMF_',nombreconcepto),
	 Sede,ValorGMFPorCentro 
	from GMF_16_ValorGMFPorCentro
	--select año, mes, Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores y Maquinas MOTORYSA' end as Empresa, CodigoPresentacion, NombrePresentacion, CodigoConcepto, CONCAT('GMF_',nombreconcepto), Sede,ValorSedeGMF from GMF_16_ValorGMFPorCentro
	union all
	 --select año, mes, Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores y Maquinas MOTORYSA' end as Empresa, CodigoPresentacion, NombrePresentacion, CodigoConcepto, CONCAT('GMF_',nombreconcepto), Sede,sum( ValorGMFPorCentro ) as Total
	 --from GMF_16_ValorGMFPorCentro --where ValorGMFPorCentro > 0
	 --  group by año, mes, empresa, CodigoPresentacion, NombrePresentacion, CodigoConcepto, NombreConcepto, Sede 
	   	select año, mes, Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores y Maquinas MOTORYSA' end as Empresa, CodigoPresentacion, NombrePresentacion, CodigoConcepto, 
	'Total Centro' as nombreconcepto ,  sede, sum(ValorGMFPorCentro) as ValorGMFPorCentro 
	 from GMF_16_ValorGMFPorCentro where ValorGMFPorColision > 0
	 group by año, mes, Empresa, CodigoPresentacion, NombrePresentacion, CodigoConcepto,  sede
	   union all    	
	   select año, mes, Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores y Maquinas MOTORYSA' end as Empresa, CodigoPresentacion, NombrePresentacion, CodigoConcepto, 
	'TotalColision' as nombreconcepto ,  sede, sum(ValorGMFPorColision) as ValorGMFPorColision 
	 from GMF_16_ValorGMFPorCentro where ValorGMFPorColision > 0
	 group by año, mes, Empresa, CodigoPresentacion, NombrePresentacion, CodigoConcepto,  sede
	    union all    	
	   select año, mes, Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores y Maquinas MOTORYSA' end as Empresa, CodigoPresentacion, NombrePresentacion, CodigoConcepto, 
	'Total' as nombreconcepto ,  sede, (sum(ValorGMFPorCentro)+sum(ValorGMFPorColision)) as ValorTotal 
	 from GMF_16_ValorGMFPorCentro where ValorGMFPorColision > 0
	 group by año, mes, Empresa, CodigoPresentacion, NombrePresentacion, CodigoConcepto,  sede) as a) as a


	   SELECT * FROM GMF_12_Desgloce WHERE año = @anio AND mes= @mes-1 and IdEmpresa = @empresa and codigopresentacion = @CodigoPresentacion
	   and CodigoPresentacion not in (1)
	   union all
	   select  distinct
	   Año,Mes,IdEmpresa,Empresa,0 as CodigoPresentacion,NombrePresentacion, CodigoPresentacion,nombre_concepto,sede,
	   (select sum(ValorTotal) from GMF_12_Desgloce where nombre_concepto = a.nombre_concepto and año = @anio and mes = @mes-1 and IdEmpresa = @empresa and codigopresentacion = @CodigoPresentacion group by nombre_concepto) AS ValorTotal,
	   N1,N2
	   from GMF_12_Desgloce as a
	   where año = @anio and mes = @mes-1 and IdEmpresa = @empresa and codigopresentacion = @CodigoPresentacion
	   and CodigoPresentacion not in (1)

END


```
