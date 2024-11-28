# Stored Procedure: sp_CuadroDePersonal_Cargos_AG

## Usa los objetos:
- [[EmpleadosActivos]]

```sql

CREATE PROCEDURE [dbo].[sp_CuadroDePersonal_Cargos_AG] 
	-- Add the parameters for the stored procedure here
	@Ano_Periodo as int,
	@Mes_Periodo as int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
		SELECT [Nombre_unidad_negocio],[Nombre_Cargo_generico],count(*) AS [Empleados]
		FROM [EmpleadosActivos] 
		where  Mes_Periodo = @Mes_Periodo and Ano_Periodo = @Ano_Periodo
		group by Nombre_unidad_negocio, Nombre_Cargo_generico


END

```
