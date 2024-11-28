# Stored Procedure: sp_CuadroDePersonal_Ciudades

## Usa los objetos:
- [[EmpleadosActivos]]

```sql
CREATE PROCEDURE [dbo].[sp_CuadroDePersonal_Ciudades] 
	-- Add the parameters for the stored procedure here
	@Ano_Periodo as int,
	@Mes_Periodo as int
	

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

DECLARE @cols NVARCHAR(MAX), @query NVARCHAR(MAX),@colsum NVARCHAR(MAX),@colc NVARCHAR(MAX)
SET FMTONLY OFF

-- Insert statements for procedure here
SET @cols = STUFF(

    ( SELECT 
         ','+QUOTENAME(LTRIM(RTRIM(c.[Nombre_Ciudad_trabajo])))
        FROM [EmpleadosActivos] c 
		GROUP BY Nombre_Ciudad_trabajo
		ORDER BY Nombre_Ciudad_trabajo
		FOR XML PATH(''), TYPE).value('.', 'nvarchar(max)'), 1, 1, '');

SET @colsum = STUFF(

        (SELECT

            '+isnull('+QUOTENAME(LTRIM(RTRIM(c.[Nombre_Ciudad_trabajo])))+',0)'

            FROM [EmpleadosActivos] c 
			GROUP BY Nombre_Ciudad_trabajo
			ORDER BY Nombre_Ciudad_trabajo
			FOR XML PATH(''), TYPE

        ).value('.', 'nvarchar(max)'), 1, 1, '');
SET @colc = STUFF(

		(	SELECT
				',isnull('+QUOTENAME(LTRIM(RTRIM(c.[Nombre_Ciudad_trabajo])))+',0)'+QUOTENAME(LTRIM(RTRIM(c.[Nombre_Ciudad_trabajo])))
			FROM [EmpleadosActivos] c
			GROUP BY Nombre_Ciudad_trabajo
			ORDER BY Nombre_Ciudad_trabajo
			FOR XML PATH(''), TYPE).value('.', 'nvarchar(max)'), 1, 1, '');


SET @query = 'SELECT row_number() over( order by Marca asc) Orden,Marca, '+@colc+'  from (

			SELECT [Marca],count(*) AS [Empleados],[Nombre_Ciudad_trabajo]
		    FROM [EmpleadosActivos] 
			where  Mes_Periodo = '+cast(@Mes_Periodo as char(4))+'  and Ano_Periodo = '+cast(@Ano_Periodo as char(4))+' 
			group by Marca, Nombre_Ciudad_trabajo


    )x pivot (sum(Empleados) for Nombre_Ciudad_trabajo in ('+@cols+')) p group by Marca,'+@cols



EXECUTE (@query);


END


```
