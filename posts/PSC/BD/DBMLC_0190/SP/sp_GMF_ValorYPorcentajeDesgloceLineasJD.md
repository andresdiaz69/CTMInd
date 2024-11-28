# Stored Procedure: sp_GMF_ValorYPorcentajeDesgloceLineasJD

## Usa los objetos:
- [[GMF_3_JD_DistribucionVentasNetasLinea_JD]]
- [[GMF_CFC]]
- [[GMF_ParametrosCFC]]
- [[GMF_ValorYPorcentaje_JD]]

```sql



CREATE PROCEDURE [dbo].[sp_GMF_ValorYPorcentajeDesgloceLineasJD]
@anio varchar(5), @mes varchar(5), @empresa int

AS
BEGIN


truncate table GMF_ValorYPorcentaje_JD
insert into GMF_ValorYPorcentaje_JD
select * from (
select  Año,Mes,IdEmpresa, Empresa,CodigoPresentacion,NombrePresentacion,LTRIM(RTRIM(NombreLineas)) as NombreLineas, Valor, 0 AS 'N1', 1 AS 'N2' from (

/*Punto 9*/
/*valor dentas*/
select Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores Y Maquinas MOTORYSA' end AS 'Empresa', b.año, b.mes,b.codigopresentacion, b.nombrepresentacion,'Valor Ventas' as NombreLineas, sum(b.valor) as Valor
from GMF_3_JD_DistribucionVentasNetasLinea_JD as b 
where b.año = @anio and b.Mes = @mes and Empresa = @empresa
group by b.empresa, b.año, b.mes, b.codigopresentacion,b.nombrepresentacion,b.porcentajedistribucion
union all
/*porcentaje distribucion*/
select Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores Y Maquinas MOTORYSA' end AS 'Empresa', b.año, b.mes,b.codigopresentacion, b.nombrepresentacion, 'Porcentaje Distribucion' as NombreLineas, b.porcentajedistribucion as PorcentajeDistribucion
from GMF_3_JD_DistribucionVentasNetasLinea_JD as b
where b.año = @anio and b.Mes = @mes and Empresa = @empresa
group by b.empresa, b.año, b.mes, b.codigopresentacion,b.nombrepresentacion,b.porcentajedistribucion

/*Porcentaje Ingreso*/

union all

select Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores Y Maquinas MOTORYSA' end AS 'Empresa', b.año, b.mes,b.codigopresentacion, b.nombrepresentacion, 'Porcentaje Ingreso' as NombreLineas, ISNULL(((b.porcentajedistribucion*c.PorcentajeIngreso)/100),0) as PorcentajeIngreso
from  GMF_3_JD_DistribucionVentasNetasLinea_JD as b 
left join GMF_ParametrosCFC as c on b.año = c.anio and b.mes = c.idmes
and b.codigopresentacion = c.idlinea
where b.año = @anio and b.mes = @mes and Empresa = @empresa
group by b.empresa, b.año, b.mes,b.codigopresentacion, b.nombrepresentacion,b.porcentajeDistribucion, c.PorcentajeIngreso

/*Porcentaje Distribucion GMF*/
union all

select Empresa as IdEmpresa,case when Empresa = 1 then 'CASATORO' when Empresa = 6 then 'Motores Y Maquinas MOTORYSA' end AS 'Empresa', a.año, a.mes, a.codigopresentacion, a.nombrepresentacion, 'Porcentaje Distribu GMF' as NombreLineas,  ( round(((a.valor)*(SUM(b.Valor)))/100,0) /*PorcPeso*/ * c.PorcentajeCFC )/100 as PorcentajeDistribuGMF
from GMF_3_JD_DistribucionVentasNetasLinea_JD as a
inner join GMF_CFC as b on a.año = b.Anio and a.mes = b.Mes
and a.codigopresentacion = b.idlinea
left join GMF_ParametrosCFC as c on a.año = c.anio and a.mes = c.idmes
and a.codigopresentacion = c.idlinea
where b.anio = @anio and b.Mes = @mes and Empresa = @empresa
group by c.PorcentajeIngreso,b.anio, b.mes,a.empresa, a.año, a.mes, a.codigopresentacion, 
a.nombrepresentacion,a.valor,c.PorcentajeCFC) as a) as a

select * from GMF_ValorYPorcentaje_JD 
union all
select  distinct
Año,Mes,IdEmpresa,Empresa,0 as CodigoPresentacion,'VTotal' as NombrePresentacion, nombrelineas, 
(select sum(Valor) from GMF_ValorYPorcentaje_JD where NombreLineas = a.NombreLineas and año = @anio and mes = @mes and IdEmpresa = @empresa group by NombreLineas) AS Valor,
N1,N2
from GMF_ValorYPorcentaje_JD as a
	
END



```
