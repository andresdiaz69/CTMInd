# Stored Procedure: sp_CuadroDePersonal_Cargos

## Usa los objetos:
- [[EmpleadosActivos]]

```sql
CREATE PROCEDURE [dbo].[sp_CuadroDePersonal_Cargos] 
	-- Add the parameters for the stored procedure here
	@Ano_Periodo as int,
	@Mes_Periodo as int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @cols NVARCHAR(MAX), @query NVARCHAR(MAX),@colsum NVARCHAR(MAX),@colc NVARCHAR(MAX)
    -- Insert statements for procedure here


SET @cols = STUFF(

			(SELECT (',' + QuoteName(RTRIM(c.[Nombre_Cargo_generico])))
			 FROM [EmpleadosActivos] c 
			 GROUP BY c.[Nombre_Cargo_generico]
			 ORDER BY c.[Nombre_Cargo_generico] 
			 FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'),1,1,'');
				 

SET @colsum = STUFF(
					
			 (SELECT ('+isnull('+QUOTENAME(RTRIM(c.[Nombre_Cargo_generico]))+',0)')
			 FROM [EmpleadosActivos] c 
			 GROUP BY c.[Nombre_Cargo_generico]
			 ORDER BY c.[Nombre_Cargo_generico] 
			 FOR XML PATH(''), TYPE).value('.', 'nvarchar(max)'), 1, 1, '');

SET @colc = STUFF(

			(SELECT (',isnull('+QUOTENAME(RTRIM(c.[Nombre_Cargo_generico]))+',0)'+QUOTENAME(RTRIM(c.[Nombre_Cargo_generico])))
			 FROM [EmpleadosActivos] c 
			 GROUP BY c.[Nombre_Cargo_generico]
			 ORDER BY c.[Nombre_Cargo_generico] 
			 FOR XML PATH(''), TYPE).value('.', 'nvarchar(max)'), 1, 1, '');


SET @query = 'SELECT row_number() over( order by Marca asc) Orden,Marca, '+@colc+' from (

			SELECT [Marca],count(*) AS [Empleados],[Nombre_Cargo_generico]
		    FROM [EmpleadosActivos] 
			where  Mes_Periodo = '+cast(@Mes_Periodo as char(4))+' and Ano_Periodo = '+cast(@Ano_Periodo as char(4))+'
			group by Marca, Nombre_Cargo_generico

    )x pivot (sum(Empleados) for Nombre_Cargo_generico in ('+@cols+')) p group by Marca,'+@cols

	
EXECUTE (@query);


END


```
