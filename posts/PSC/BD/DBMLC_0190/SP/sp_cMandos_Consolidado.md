# Stored Procedure: sp_cMandos_Consolidado

## Usa los objetos:
- [[cMandos_Lineas]]
- [[cMandos_Presentacion]]

```sql

CREATE PROCEDURE [dbo].[sp_cMandos_Consolidado] 
	(
	@Año_Periodo int,
	@Mes_Periodo int
	)
AS
BEGIN

	SET FMTONLY OFF
	SET NOCOUNT ON

	Begin tran

		DELETE FROM cMandos_Presentacion WHERE CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo 

		DECLARE @columns NVARCHAR(MAX), @sql NVARCHAR(MAX);
		SET @columns = N'';
		SELECT @columns+=N', p.'+QUOTENAME([Name])+','+QUOTENAME([NombreLinea])
		FROM
		(

			Select NombreLinea,'Sede'+cast(ROW_NUMBER() OVER(ORDER BY OrdenLinea ASC) as varchar) AS [Name] 
			from cMandos_Lineas 
			GROUP BY NombreLinea,CodigoLinea,OrdenLinea

		) AS x;
		--print @columns


		DECLARE @columns2 NVARCHAR(MAX)
		SET @columns2 = N'';
		SELECT @columns2+=N', '+QUOTENAME([NombreLinea]) + ' n' +QUOTENAME([Name])+', isnull(p.'+QUOTENAME([Name])+',0)'
		FROM
		(

			Select NombreLinea,'Sede'+cast(ROW_NUMBER() OVER(ORDER BY OrdenLinea ASC) as varchar) AS [Name] 
			from cMandos_Lineas 
			GROUP BY NombreLinea,CodigoLinea,OrdenLinea

		) AS x;

		SET @columns2 = REPLACE(REPLACE(REPLACE(@columns2, ', [', ', ''')   ,'n[','[n')  ,'] [',''' [')
		--print @columns2

		DECLARE @columns3 NVARCHAR(MAX)
		SET @columns3 = N'';
		SELECT @columns3+=N', n' +QUOTENAME([Name])+', '+QUOTENAME([Name])
		FROM
		(

			Select NombreLinea,'Sede'+cast(ROW_NUMBER() OVER(ORDER BY OrdenLinea ASC) as varchar) AS [Name] 
			from cMandos_Lineas 
			GROUP BY NombreLinea,CodigoLinea,OrdenLinea

		) AS x;

		SET @columns3 = REPLACE(REPLACE(REPLACE(REPLACE(@columns3, 'n[', 'n')    ,'], [',',')    ,'], ',',')    ,']','')
		--print @columns3

		SET @sql = N'
		Insert into cMandos_Presentacion (Año,Mes,CodigoLinea,NombreLinea,CodigoTipo,NombreTipo,CodigoRenglon,NombreRenglon'+@columns3+')
		SELECT Año,Mes,CodigoLinea,NombreLinea,CodigoTipo,NombreTipo,CodigoRenglon,NombreRenglon,'+STUFF(@columns2, 1, 2, '')+' 
			FROM (

				select a.Año,a.Mes,a.CodigoLinea,a.NombreLinea,CodigoTipo,NombreTipo,CodigoRenglon,NombreRenglon,Quantity,b.Sede Name
				from 
				(
					SELECT Año,Mes,32700 CodigoLinea,''Consolidado'' NombreLinea,CodigoTipo,NombreTipo,CodigoRenglon,NombreRenglon,sum(isnull([Valor],0)) AS [Quantity],NombreLinea Sede
					FROM [dbo].[vw_cMandos_Presentacion] a 
					left join 
						(SELECT NombreCentro,CodigoCentro
						FROM [dbo].vw_cMandos_Presentacion AS p
						GROUP BY NombreCentro,CodigoCentro) b
					On a.CodigoCentro = b.CodigoCentro
					where año = '+cast(@Año_Periodo as varchar)+' and mes = '+cast(@Mes_Periodo as varchar)+'
					group by Año,Mes,CodigoLinea,NombreLinea,CodigoTipo,NombreTipo,CodigoRenglon,NombreRenglon
				) a left join
				(
					Select NombreLinea,CodigoLinea,''Sede''+cast(ROW_NUMBER() OVER(ORDER BY OrdenLinea ASC) as varchar) AS Sede
					from cMandos_Lineas 
					GROUP BY NombreLinea,CodigoLinea,OrdenLinea
				) b
				ON a.Sede = b.NombreLinea 
				--order by Sede
			) AS j PIVOT (SUM(Quantity) FOR [Name] in ('+STUFF(REPLACE(@columns, ', p.[', ',['), 1, 1, '')+')

		) AS p '

	 PRINT @sql

		EXEC sp_executesql @sql

--		select * from cMandos_Presentacion where CodigoLinea = 32700 and Año = 2020 and Mes = 6 order by CodigoTipo,CodigoRenglon

	-- Actualiza Bonaparte
		update cMandos_Presentacion 
		set nSede17 = nSede11,
			Sede17 = Sede11 
		where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo

	-- Actualiza Fab CT
		update cMandos_Presentacion 
		set nSede14 = nSede9,
			Sede14 = Sede9 
		where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo

	-- Actualiza Fab MM
		update cMandos_Presentacion 
		set nSede15 = nSede10,
			Sede15 = Sede10 
		where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo

	-- Total Colisión
		update cMandos_Presentacion 
		set nSede16 = 'TOTAL COLISIÓN',
			Sede16 = Sede13 + Sede14 
		where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo

	-- Actualiza Daimler
		update cMandos_Presentacion 
		set nSede11 = nSede8,
			Sede11 = Sede8 
		where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo

	-- Actualiza Mit
		update cMandos_Presentacion 
		set nSede10 = nSede7,
			Sede10 = Sede7 
		where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo

	-- Total Motorysa
		update cMandos_Presentacion 
		set nSede13 = 'TOTAL MOTORYSA',
			Sede13 = Sede11 + Sede10 + Sede12
		where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo

	-- John Deere
		update cMandos_Presentacion 
		set nSede7 = nSede6,
			Sede7 = Sede6
		where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo

	-- Total JD
		update cMandos_Presentacion 
		set nSede8 = 'TOTAL JOHN DEERE',
			Sede8 = Sede6
		where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo

	-- Total VN
		update cMandos_Presentacion 
		set nSede6 = 'TOTAL VEHÍCULOS',
			Sede6 = Sede1+Sede2+Sede3+Sede4+Sede5
		where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo

	-- Total Casatoro
		update cMandos_Presentacion 
		set nSede9 = 'TOTAL CASATORO',
			Sede9 = Sede6+Sede7
		where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo

	-- Actualiza Total Consolidado
		update cMandos_Presentacion 
		set nTotal = 'TOTAL CONSOLIDADO',
			Total = Sede9 + Sede13 + Sede16 + Sede17
		where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo

	-- Correccion de Margenes NUEVOS
				
		update cMandos_Presentacion set
		sede1 = case 
			when (select top 1 sede1 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede1 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 7)/
			 (select top 1 sede1 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6))
			 else 0
			end,
		sede2 = case 
			when (select top 1 sede2 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede2 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 7)/
			 (select top 1 sede2 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6))
			 else 0
			end,
		sede3 = case 
			when (select top 1 sede3 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede3 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 7)/
			 (select top 1 sede3 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6))
			 else 0
			end,
		sede4 = case 
			when (select top 1 sede4 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede4 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 7)/
			 (select top 1 sede4 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6))
			 else 0
			end,
		sede5 = case 
			when (select top 1 sede5 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede5 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 7)/
			 (select top 1 sede5 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6))
			 else 0
			end,
		sede6 = case 
			when (select top 1 sede6 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede6 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 7)/
			 (select top 1 sede6 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6))
			 else 0
			end,
		sede7 = case 
			when (select top 1 sede7 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede7 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 7)/
			 (select top 1 sede7 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6))
			 else 0
			end,
		sede8 = case 
			when (select top 1 sede8 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede8 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 7)/
			 (select top 1 sede8 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6))
			 else 0
			end,
		sede9 = case 
			when (select top 1 sede9 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede9 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 7)/
			 (select top 1 sede9 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6))
			 else 0
			end,
		sede10 = case 
			when (select top 1 sede10 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede10 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 7)/
			 (select top 1 sede10 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6))
			 else 0
			end,
		sede11 = case 
			when (select top 1 sede11 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede11 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 7)/
			 (select top 1 sede11 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6))
			 else 0
			end,
		sede12 = case 
			when (select top 1 sede12 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede12 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 7)/
			 (select top 1 sede12 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6))
			 else 0
			end,
		sede13 = case 
			when (select top 1 sede13 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede13 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 7)/
			 (select top 1 sede13 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6))
			 else 0
			end,
		sede14 = case 
			when (select top 1 sede14 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede14 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 7)/
			 (select top 1 sede14 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6))
			 else 0
			end,
		sede15 = case 
			when (select top 1 sede15 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede15 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 7)/
			 (select top 1 sede15 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6))
			 else 0
			end,
		sede16 = case 
			when (select top 1 sede16 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede16 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 7)/
			 (select top 1 sede16 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6))
			 else 0
			end,
		sede17 = case 
			when (select top 1 sede17 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede17 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 7)/
			 (select top 1 sede17 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6))
			 else 0
			end,
		sede18 = case 
			when (select top 1 sede18 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede18 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 7)/
			 (select top 1 sede18 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6))
			 else 0
			end,
		sede19 = case 
			when (select top 1 sede19 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede19 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 7)/
			 (select top 1 sede19 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6))
			 else 0
			end,
		sede20 = case 
			when (select top 1 sede20 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede20 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 7)/
			 (select top 1 sede20 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6))
			 else 0
			end,
		Total = case 
			when (select top 1 Total Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 Total Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 7)/
			 (select top 1 Total Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 6))
			 else 0
			end
		where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 2 and CodigoRenglon = 9


	-- Correccion de Margenes USADOS
				

		update cMandos_Presentacion set
		sede1 = case 
			when (select top 1 sede1 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede1 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 7)/
			 (select top 1 sede1 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6))
			 else 0
			end,
		sede2 = case 
			when (select top 1 sede2 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede2 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 7)/
			 (select top 1 sede2 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6))
			 else 0
			end,
		sede3 = case 
			when (select top 1 sede3 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede3 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 7)/
			 (select top 1 sede3 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6))
			 else 0
			end,
		sede4 = case 
			when (select top 1 sede4 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede4 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 7)/
			 (select top 1 sede4 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6))
			 else 0
			end,
		sede5 = case 
			when (select top 1 sede5 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede5 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 7)/
			 (select top 1 sede5 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6))
			 else 0
			end,
		sede6 = case 
			when (select top 1 sede6 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede6 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 7)/
			 (select top 1 sede6 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6))
			 else 0
			end,
		sede7 = case 
			when (select top 1 sede7 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede7 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 7)/
			 (select top 1 sede7 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6))
			 else 0
			end,
		sede8 = case 
			when (select top 1 sede8 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede8 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 7)/
			 (select top 1 sede8 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6))
			 else 0
			end,
		sede9 = case 
			when (select top 1 sede9 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede9 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 7)/
			 (select top 1 sede9 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6))
			 else 0
			end,
		sede10 = case 
			when (select top 1 sede10 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede10 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 7)/
			 (select top 1 sede10 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6))
			 else 0
			end,
		sede11 = case 
			when (select top 1 sede11 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede11 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 7)/
			 (select top 1 sede11 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6))
			 else 0
			end,
		sede12 = case 
			when (select top 1 sede12 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede12 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 7)/
			 (select top 1 sede12 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6))
			 else 0
			end,
		sede13 = case 
			when (select top 1 sede13 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede13 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 7)/
			 (select top 1 sede13 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6))
			 else 0
			end,
		sede14 = case 
			when (select top 1 sede14 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede14 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 7)/
			 (select top 1 sede14 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6))
			 else 0
			end,
		sede15 = case 
			when (select top 1 sede15 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede15 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 7)/
			 (select top 1 sede15 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6))
			 else 0
			end,
		sede16 = case 
			when (select top 1 sede16 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede16 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 7)/
			 (select top 1 sede16 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6))
			 else 0
			end,
		sede17 = case 
			when (select top 1 sede17 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede17 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 7)/
			 (select top 1 sede17 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6))
			 else 0
			end,
		sede18 = case 
			when (select top 1 sede18 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede18 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 7)/
			 (select top 1 sede18 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6))
			 else 0
			end,
		sede19 = case 
			when (select top 1 sede19 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede19 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 7)/
			 (select top 1 sede19 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6))
			 else 0
			end,
		sede20 = case 
			when (select top 1 sede20 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 sede20 Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 7)/
			 (select top 1 sede20 Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6))
			 else 0
			end,
		Total = case 
			when (select top 1 Total Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6) > 0 then
			 1-((select top 1 Total Costo from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 7)/
			 (select top 1 Total Valor from cMandos_Presentacion where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 6))
			 else 0
			end
		where CodigoLinea = 32700 and Año = @Año_Periodo and Mes = @Mes_Periodo and CodigoTipo = 3 and CodigoRenglon = 9


	Commit

END



```
