# Stored Procedure: sp_CuadroDePersonal_RSyUSC

## Usa los objetos:
- [[EmpleadosActivos]]

```sql

CREATE PROCEDURE [dbo].[sp_CuadroDePersonal_RSyUSC]
	-- Add the parameters for the stored procedure here
	@Ano_Periodo as int,
	@Mes_Periodo as int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
Select distinct row_number() over( order by Empresa asc) Orden,Empresa, 
COUNT(CodigoEmpleado) as Total , sum(case when unidad_negocio = 4 then 1 else 0 end ) USC,
		sum(case when Unidad_Negocio = 418 then 1 else 0 end) Nebula,
		sum(case when Unidad_Negocio in (15,23) then 1 else 0 end) Bellpi
from EmpleadosActivos
where Ano_Periodo = @Ano_Periodo 
and Mes_Periodo = @Mes_Periodo
group by Empresa

END




```
