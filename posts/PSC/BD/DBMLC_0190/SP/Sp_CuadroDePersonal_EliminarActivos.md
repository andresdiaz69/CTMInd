# Stored Procedure: Sp_CuadroDePersonal_EliminarActivos

```sql



CREATE PROCEDURE [dbo].[Sp_CuadroDePersonal_EliminarActivos]

AS
BEGIN

SET NOCOUNT ON;
DECLARE @Exe NVARCHAR(MAX)
SET FMTONLY OFF

SET @Exe ='DELETE EmpleadosActivos FROM EmpleadosActivos E 
LEFT JOIN 
(
	select *
	,CASE 
	WHEN YEAR(Fecha_Ingreso) = YEAR(Fecha_retiro) AND MONTH(Fecha_Ingreso) = MONTH(Fecha_retiro) THEN 0 
	ELSE 1 END AS ELIMINAR
	from 
		(select ac.CodigoEmpleado, ac.Nombres, ac.Ano_Periodo, ac.Mes_Periodo,re.Codigo_Cargo,re.Nombre_Cargo,re.CodigoEmpresa,re.Empresa, ac.Fecha_Ingreso,re.Fecha_retiro  
		from EmpleadosActivos as ac
		left join EmpleadosRetirados as re on ac.CodigoEmpleado = re.CodigoEmpleado and ac.Ano_Periodo = re.Ano_Periodo 
		and ac.Mes_Periodo = re.Mes_Periodo where Fecha_retiro is not null
		) as n
)as EmpleadosRepetidos ON E.CodigoEmpleado = EmpleadosRepetidos.CodigoEmpleado and e.Ano_Periodo = EmpleadosRepetidos.Ano_Periodo AND e.Mes_Periodo = EmpleadosRepetidos.Mes_Periodo
WHERE EmpleadosRepetidos.ELIMINAR = 1'

EXEC (@Exe)

END



```
