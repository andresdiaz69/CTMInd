# View: vw_CuadroDePersonal_PromedioEmpleados

## Usa los objetos:
- [[EmpleadosActivos]]

```sql
CREATE view [dbo].[vw_CuadroDePersonal_PromedioEmpleados]
--MS:161123 vista del procedimiento sp_CuadroDePersonal_PromedioEmpleados poder filtrar la informacion

AS

	select Ano_Periodo,Mes_Periodo,'Promedio Empleados (6 Meses)' as [DESCRIPCION], [BONAPARTE RAL] as TotalBonaparte ,[CASA TORO DE LA SABANA] as TotalCasaToroSabana, [CASATORO S.A.] as TotalCasaToro,
	[Fomenta] as TotalFomenta,[Israriego] as TotalIsrariego,[MOTORES Y MAQUINAS S.A. - MOTORYSA] as TotalMotorysa,[BELLPI SAS] as TotalBellpi
	--into #tabla2
	from(		
				Select Ano_Periodo,Mes_Periodo,Empresa, Nombres
				from EmpleadosActivos
				--where Ano_Periodo = @Ano_Periodo 
				--  and Mes_Periodo = @Mes_Periodo

	) b  pivot (COUNT(Nombres) for Empresa in 
	([BONAPARTE RAL],[CASA TORO DE LA SABANA],[CASATORO S.A.],[Fomenta],[Israriego],[MOTORES Y MAQUINAS S.A. - MOTORYSA],[BELLPI SAS])) as pivottable
	--where Ano_Periodo= 2023
	--and Mes_Periodo =9


```
