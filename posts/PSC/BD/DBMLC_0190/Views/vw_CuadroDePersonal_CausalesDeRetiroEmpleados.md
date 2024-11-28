# View: vw_CuadroDePersonal_CausalesDeRetiroEmpleados

## Usa los objetos:
- [[EmpleadosActivos]]

```sql

CREATE view [dbo].[vw_CuadroDePersonal_CausalesDeRetiroEmpleados]
--MS:071123 vista del procedimiento sp_CuadroDePersonal_CausalesDeRetiroEmpleados poder filtrar la informacion
AS

select Ano_Periodo,Mes_Periodo,'Empleados Actuales' as [CAUSAS DE RETIRO], [BONAPARTE RAL] as TotalBonaparte ,[CASA TORO DE LA SABANA] as TotalCasaToroSabana, [CASATORO S.A.] as TotalCasaToro,
	[Fomenta] as TotalFomenta,[Israriego] as TotalIsrariego,[MOTORES Y MAQUINAS S.A. - MOTORYSA] as TotalMotorysa, [BELLPI SAS] as TotalBellpi
	
	from(
			select distinct Ano_Periodo,Mes_Periodo,Empresa, CodigoEmpleado
			from EmpleadosActivos  
			--where Ano_Periodo = 2023
			--and Mes_Periodo = 9

	) b  pivot (count(codigoempleado) for empresa in 
	([BONAPARTE RAL],[CASA TORO DE LA SABANA],[CASATORO S.A.],[Fomenta],[Israriego],[MOTORES Y MAQUINAS S.A. - MOTORYSA], [BELLPI SAS])) as pivottable



```
