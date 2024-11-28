# Stored Procedure: sp_cMandos_Datos

## Usa los objetos:
- [[cMandos_Presentacion]]
- [[vw_cMandos_Presentacion]]

```sql

CREATE PROCEDURE [dbo].[sp_cMandos_Datos] 
	(
	@CodigoLinea int , 
	@Año_Periodo int ,
	@Mes_Periodo int 
	)
AS
BEGIN

	SET FMTONLY OFF
	SET NOCOUNT ON

		DELETE FROM cMandos_Presentacion WHERE CodigoLinea = @CodigoLinea and Año = @Año_Periodo and Mes = @Mes_Periodo 

		DECLARE @columns NVARCHAR(MAX), @sql NVARCHAR(MAX) , @nFilas int

	-- sE EMPIEZA A FABRICAR LA SENTENCIA DEL PIVOT

		SET @columns = N'';
		SELECT @columns+=N', p.'+QUOTENAME([Name])+','+QUOTENAME([NombreCentro])
		FROM
		(

			SELECT NombreCentro,'Sede'+cast(ROW_NUMBER() OVER(ORDER BY CodigoCentro ASC) as varchar) AS [Name]
			FROM [dbo].vw_cMandos_Presentacion AS p
			where CodigoLinea = @CodigoLinea
			GROUP BY NombreCentro,CodigoCentro

		) AS x;
		--print @columns


		DECLARE @columns2 NVARCHAR(MAX)
		SET @columns2 = N'';
		SELECT @columns2+=N', '+QUOTENAME([NombreCentro]) + ' n' +QUOTENAME([Name])+', isnull(p.'+QUOTENAME([Name])+',0)'
		FROM
		(

			SELECT NombreCentro,'Sede'+cast(ROW_NUMBER() OVER(ORDER BY CodigoCentro ASC) as varchar) AS [Name]
			FROM [dbo].vw_cMandos_Presentacion AS p
			where CodigoLinea = @CodigoLinea
			GROUP BY NombreCentro,CodigoCentro

		) AS x;

		SET @columns2 = REPLACE(REPLACE(REPLACE(@columns2, ', [', ', ''')   ,'n[','[n')  ,'] [',''' [')
		--print @columns2

		DECLARE @columns3 NVARCHAR(MAX)
		SET @columns3 = N'';
		SELECT @columns3+=N', n' +QUOTENAME([Name])+', '+QUOTENAME([Name])
		FROM
		(

			SELECT NombreCentro,'Sede'+cast(ROW_NUMBER() OVER(ORDER BY CodigoCentro ASC) as varchar) AS [Name]
			FROM [dbo].vw_cMandos_Presentacion AS p
			where CodigoLinea = @CodigoLinea
			GROUP BY NombreCentro,CodigoCentro

		) AS x;

		SET @columns3 = REPLACE(REPLACE(REPLACE(REPLACE(@columns3, 'n[', 'n')    ,'], [',',')    ,'], ',',')    ,']','')
		--print @columns3

		SET @sql = N'
		Insert into cMandos_Presentacion (Año,Mes,CodigoLinea,NombreLinea,CodigoTipo,NombreTipo,CodigoRenglon,NombreRenglon'+@columns3+')
		SELECT  
			
			Año,Mes,CodigoLinea,NombreLinea,CodigoTipo,NombreTipo,CodigoRenglon,NombreRenglon,'+STUFF(@columns2, 1, 2, '')+' 
			FROM (

			SELECT Año,Mes,CodigoLinea,NombreLinea,CodigoTipo,NombreTipo,CodigoRenglon,NombreRenglon,isnull([Valor],0) AS [Quantity], [Sede] as [Name]
			FROM [dbo].[vw_cMandos_Presentacion] a 
			left join 
				(SELECT NombreCentro,CodigoCentro,''Sede''+cast(ROW_NUMBER() OVER(ORDER BY CodigoCentro ASC) as varchar) AS Sede
				FROM [dbo].vw_cMandos_Presentacion AS p
				where CodigoLinea = '+cast(@CodigoLinea as varchar)+'
				GROUP BY NombreCentro,CodigoCentro) b
			On a.CodigoCentro = b.CodigoCentro
			where CodigoLinea = '+cast(@CodigoLinea as varchar)+' and año = '+cast(@Año_Periodo as varchar)+' and mes = '+cast(@Mes_Periodo as varchar)+'
	
			) AS j PIVOT (SUM(Quantity) FOR [Name] in ('+STUFF(REPLACE(@columns, ', p.[', ',['), 1, 1, '')+') 

		) AS p where CodigoLinea = '+cast(@CodigoLinea as varchar)+';';

		--PRINT @sql

		EXEC sp_executesql @sql

	-- ACTUALIZA TOTALES DE LA LINEA

		UPDATE t1
		SET t1.nTotal = t2.NombreLinea,
			t1.Total = t2.Quantity
		FROM
			cMandos_Presentacion t1 LEFT JOIN
			(
				SELECT Año,Mes,CodigoLinea,NombreLinea,CodigoTipo,NombreTipo,CodigoRenglon,NombreRenglon,sum(isnull([Valor],0)) AS [Quantity], NombreLinea as [Name]
				FROM [dbo].[vw_cMandos_Presentacion] a 
				left join 
					(SELECT NombreCentro,CodigoCentro
					FROM [dbo].vw_cMandos_Presentacion AS p
					GROUP BY NombreCentro,CodigoCentro) b
				On a.CodigoCentro = b.CodigoCentro
				where año = @Año_Periodo and mes = @Mes_Periodo AND CodigoLinea = @CodigoLinea
				group by Año,Mes,CodigoLinea,NombreLinea,CodigoTipo,NombreTipo,CodigoRenglon,NombreRenglon
			)t2 
			ON t1.CodigoLinea = t2.CodigoLinea and t1.Año = t2.Año and t1.Mes = t2.Mes and t1.CodigoTipo = t2.CodigoTipo and t1.CodigoRenglon = t2.CodigoRenglon
			WHERE t1.CodigoLinea = @CodigoLinea and t1.año = @Año_Periodo and t1.mes = @Mes_Periodo

	-- ACTUALIZA MARGEN NUEVOS

		update t1 			
		set total = case when isnull(Valor.Total,0) >0 then ((isnull(Utilidad.Total,0)/isnull(Valor.Total,0))) else 0 end 
		From cMandos_Presentacion t1 
			LEFT JOIN (select * from cMandos_Presentacion where CodigoTipo = 2 and CodigoRenglon = 6) Valor 
				ON t1.CodigoLinea = Valor.CodigoLinea and t1.Año = Valor.Año and t1.Mes = Valor.Mes 
			LEFT JOIN (select * from cMandos_Presentacion where CodigoTipo = 2 and CodigoRenglon = 8) Utilidad 
				ON t1.CodigoLinea = Utilidad.CodigoLinea and t1.Año = Utilidad.Año and t1.Mes = Utilidad.Mes 
		where t1.Año = @Año_Periodo and t1.Mes = @Mes_Periodo and t1.CodigoLinea = @CodigoLinea and t1.CodigoTipo = 2 and t1.CodigoRenglon = 9

	-- ACTUALIZA MARGEN USADOS

		update t1 			
		set total = case when isnull(Valor.Total,0) >0 then ((isnull(Utilidad.Total,0)/isnull(Valor.Total,0))) else 0 end 
		From cMandos_Presentacion t1 
			LEFT JOIN (select * from cMandos_Presentacion where CodigoTipo = 3 and CodigoRenglon = 6) Valor 
				ON t1.CodigoLinea = Valor.CodigoLinea and t1.Año = Valor.Año and t1.Mes = Valor.Mes 
			LEFT JOIN (select * from cMandos_Presentacion where CodigoTipo = 3 and CodigoRenglon = 8) Utilidad 
				ON t1.CodigoLinea = Utilidad.CodigoLinea and t1.Año = Utilidad.Año and t1.Mes = Utilidad.Mes 
		where t1.Año = @Año_Periodo and t1.Mes = @Mes_Periodo and t1.CodigoLinea = @CodigoLinea and t1.CodigoTipo = 3 and t1.CodigoRenglon = 9

END

```
