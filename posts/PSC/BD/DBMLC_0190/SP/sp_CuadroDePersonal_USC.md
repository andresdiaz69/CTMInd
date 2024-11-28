# Stored Procedure: sp_CuadroDePersonal_USC

## Usa los objetos:
- [[EmpleadosActivos]]

```sql
CREATE PROCEDURE [dbo].[sp_CuadroDePersonal_USC]
	-- Add the parameters for the stored procedure here
	@Ano_Periodo as int,
	@Mes_Periodo as int 

AS

DECLARE @cols NVARCHAR(MAX), @query NVARCHAR(MAX),@colsum NVARCHAR(MAX),@colc NVARCHAR(MAX)




	-- Insert statements for procedure here
	SET @cols = STUFF(
			(SELECT (',' + QuoteName(rtrim(c.[Nombre_Tipo_Contrato])))
				FROM [EmpleadosActivos] c 
				WHERE Unidad_negocio = 4
				GROUP BY c.[Nombre_Tipo_Contrato]
				ORDER BY c.[Nombre_Tipo_Contrato] 
				FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'),1,1,'');

	SET @colsum = STUFF(

		(SELECT ('+isnull('+QUOTENAME(rtrim(c.[Nombre_Tipo_Contrato]))+',0)')
				FROM [EmpleadosActivos] c 
				WHERE Unidad_negocio = 4
				GROUP BY c.[Nombre_Tipo_Contrato]
				ORDER BY c.[Nombre_Tipo_Contrato] 
				FOR XML PATH(''), TYPE).value('.', 'nvarchar(max)'), 1, 1, '');

		SET @colc = STUFF(

			(SELECT (',isnull('+QUOTENAME(rtrim(c.[Nombre_Tipo_Contrato]))+',0)'+QUOTENAME(rtrim(c.[Nombre_Tipo_Contrato])))
				FROM [EmpleadosActivos] c 
				WHERE Unidad_negocio = 4
				GROUP BY c.[Nombre_Tipo_Contrato]
				ORDER BY c.[Nombre_Tipo_Contrato] 
				FOR XML PATH(''), TYPE).value('.', 'nvarchar(max)'), 1, 1, '');

		SET @query = 'SELECT row_number() over( order by Seccion  asc) Orden, seccion,  '+@colc+' ,sum('+@colsum+') Total_General from (

		--select distinct seccion,nombre_tipo_contrato,cantidad
		--from v_Informe_Efectivos_Cantidad

		SELECT   case	when (nombre_seccion like ''%_%'' and charindex('' '',nombre_seccion,1)=3) then
								substring(nombre_seccion,4,20) 
		else nombre_seccion end Seccion,Nombre_Tipo_Contrato ,count(*) Cantidad
		FROM [EmpleadosActivos]
		 
		 where Mes_Periodo = '+cast(@Mes_Periodo as char(4))+' and Ano_Periodo = '+cast(@Ano_Periodo as char(4))+' and Unidad_negocio = 4
		 group by substring(nombre_seccion,4,20),[Nombre_Tipo_Contrato],nombre_seccion

		)x pivot (sum(Cantidad) for Nombre_Tipo_Contrato in ('+@cols+')) p group by seccion,'+@cols




	exec(@query)


```
