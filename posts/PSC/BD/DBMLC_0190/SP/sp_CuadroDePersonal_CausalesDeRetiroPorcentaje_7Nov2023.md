# Stored Procedure: sp_CuadroDePersonal_CausalesDeRetiroPorcentaje_7Nov2023

## Usa los objetos:
- [[EmpleadosActivos]]
- [[EmpleadosRetirados]]

```sql
create PROCEDURE [dbo].[sp_CuadroDePersonal_CausalesDeRetiroPorcentaje_7Nov2023]
	@Ano_Periodo as int,
	@Mes_Periodo as int


AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
		SET FMTONLY OFF

		DECLARE @periodoActual datetime = dateadd(month, 1, DATEFROMPARTS(@Ano_Periodo, @Mes_Periodo, 1))
	DECLARE @periodoAnterior datetime = dateadd(month, -6, @periodoActual)

select 'Procentaje Sin Justa Causa' as [CAUSAS DE RETIRO], 

case when b.TotalBonaparte = 0 then 0 else (a.[BONAPARTE RAL]*100)/b.TotalBonaparte end [BONAPARTE RAL],
case when b.TotalCasaToroSabana = 0 then 0 else(a.[CASA TORO DE LA SABANA]*100)/b.TotalCasaToroSabana end [CASA TORO DE LA SABANA],
 case when b.TotalCasaToro = 0 then 0 else(a.[CASATORO S.A.]*100)/b.TotalCasaToro end [CASATORO S.A.],
 case when b.TotalFomenta = 0 then 0 else(a.FOMENTA*100)/b.TotalFomenta end FOMENTA,
 case when b.TotalIsrariego = 0 then 0 else(a.ISRARIEGO*100)/b.TotalIsrariego end ISRARIEGO,
 case when b.TotalMotorysa = 0 then 0 else(a.MOTORYSA*100)/b.TotalMotorysa end MOTORYSA,
  case when b.TotalBellpi = 0 then 0 else(a.Bellpi*100)/b.TotalBellpi end BELLPI,
 case when b.[Total General] = 0 then 0 else(a.[Total General]*100)/b.[Total General] end [Total General]
 
 From 

(
select 'Procentaje Sin Justa Causa' as [CAUSAS DE RETIRO],

sum(cast([BONAPARTE RAL]as decimal)) as [BONAPARTE RAL],
sum(cast([CASA TORO DE LA SABANA]as decimal)) as [CASA TORO DE LA SABANA], 
sum(cast([CASATORO S.A.]as decimal)) as [CASATORO S.A.],
sum(cast([Fomenta]as decimal)) as FOMENTA,
sum(cast([Israriego]as decimal)) as ISRARIEGO,
sum(cast([MOTORES Y MAQUINAS S.A. - MOTORYSA]as decimal)) as MOTORYSA,
sum(cast([BELLPI SAS]as decimal)) as BELLPI,
sum(cast([BONAPARTE RAL]as decimal)+cast([CASA TORO DE LA SABANA]as decimal)
+cast([CASATORO S.A.]as decimal)+cast([Fomenta]as decimal)+cast([Israriego]as decimal)
+cast([MOTORES Y MAQUINAS S.A. - MOTORYSA]as decimal)+cast([BELLPI SAS]as decimal)) as [Total General]

from(
		select CausaRetiro, empresa, Codigoempleado
		from EmpleadosRetirados 
		where CausaRetiro='DESPIDO SIN JUSTA CAUSA'
		and  Fecha_retiro >= @periodoAnterior and Fecha_retiro < @periodoActual

) a pivot (count(codigoempleado) for empresa in 
([BONAPARTE RAL],[CASA TORO DE LA SABANA],[CASATORO S.A.],[Fomenta],[Israriego],[MOTORES Y MAQUINAS S.A. - MOTORYSA],[BELLPI SAS])) as pivottable

) a 

left join 

(

select 'Porcentaje Sin Justa Causa'  as [CAUSAS DE RETIRO], 
cast([BONAPARTE RAL]as decimal) as TotalBonaparte ,
cast([CASA TORO DE LA SABANA]as decimal) as TotalCasaToroSabana, 
cast([CASATORO S.A.]as decimal) as TotalCasaToro,
cast([Fomenta]as decimal) as TotalFomenta,
cast([Israriego]as decimal) as TotalIsrariego,
cast([MOTORES Y MAQUINAS S.A. - MOTORYSA]as decimal) as TotalMotorysa,
cast([BELLPI SAS] as decimal) as TotalBellpi,

sum(cast([BONAPARTE RAL]as decimal)+cast([CASA TORO DE LA SABANA]as decimal)
+cast([CASATORO S.A.]as decimal)+cast([Fomenta]as decimal)+cast([Israriego]as decimal)
+cast([MOTORES Y MAQUINAS S.A. - MOTORYSA]as decimal)+cast([BELLPI SAS] as decimal)) as [Total General]
	
--into #tabla2
from(
		select distinct Empresa, CodigoEmpleado
		from EmpleadosActivos  
		where Ano_Periodo = @Ano_Periodo and Mes_Periodo = @Mes_Periodo
		

) b  pivot (count(codigoempleado) for empresa in 
([BONAPARTE RAL],[CASA TORO DE LA SABANA],[CASATORO S.A.],[Fomenta],[Israriego],[MOTORES Y MAQUINAS S.A. - MOTORYSA],[BELLPI SAS])) as pivottable
group by [BONAPARTE RAL],[CASA TORO DE LA SABANA],[CASATORO S.A.],[Fomenta],[Israriego],[MOTORES Y MAQUINAS S.A. - MOTORYSA],[BELLPI SAS]
) b

on a.[CAUSAS DE RETIRO] = b.[CAUSAS DE RETIRO]


END

```
