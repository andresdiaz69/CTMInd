# Stored Procedure: sp_InformesGeneraPresentacionMes

## Usa los objetos:
- [[InformesDefinitivosAcu]]
- [[InformesDefinitivosMes]]
- [[InformesPresentaciones]]
- [[InformesPresentacionesSedes]]
- [[sp_InformesDatosSedeMes]]
- [[TablaPresentacion]]
- [[TablaPresentacion_Temp]]
- [[TablaPresentacionMes]]
- [[TablaPresentacionMes3]]

```sql



-- =======================================================================================================================================
-- Author:		LUIS FREDDY GUERRERO LOPEZ
-- Create date: 2018-10-16 ultima actualizacion
-- Description:	GENERA DETALLADAMENTE EL MES ANTERIOR O ACTUAL, MES O ACUMULADO, DEL P&G
-- =======================================================================================================================================

CREATE PROCEDURE [dbo].[sp_InformesGeneraPresentacionMes] 

	@CodigoPresentacion as smallint,
	@Año as smallint,
	@Mes as smallint,
	@Mes_Acum as bit = 0, -- 0 Mes , 1 Acum,
	@Anterior_Actual as bit = 0, -- 0 Anterior, 1 Actual 
	@RetornaTabla bit = 1,
	@Redondeo bit = 1 --0 Sin Redondeo o 1 Con Redondeo
AS
BEGIN	
	SET NOCOUNT ON

	DECLARE @EmpresaPresupuesto as smallint
	DECLARE @Orden as smallint
	DECLARE @Cnt as smallint
	DECLARE @Arbol as smallint
	DECLARE @Año1 as smallint
	DECLARE @MesInicial1 as smallint
	DECLARE @MesFinal1 as smallint
	DECLARE @MesActual AS DATETIME
	DECLARE @MesAnterior AS DATETIME
	DECLARE @PyG smallint = 0
	DECLARE @Año2 as smallint
	DECLARE @MesInicial2 as smallint
	DECLARE @MesFinal2 as smallint
	
	SET @MesActual = CONVERT(datetime, '01-'+ltrim(str(@Mes))+'-'+ltrim(str(@Año)),103)
	--JCS: 03/01/2023 - SE REVERSO EL AJUSTE HECHO POR COMPATIBILIDAD FORMATO DE FECHAS (APLICA PARA IDIOMA INGLÉS)
	--SET @MesAnterior = CONVERT(VARCHAR(25),DATEADD(dd,-(DAY(@MesActual)),@MesActual),101) 
	--JCS: 05/01/2023 - SE REVERSO EL AJUSTE HECHO POR COMPATIBILIDAD FORMATO DE FECHAS (APLICA PARA IDIOMA ESPAÑOL)
	SET @MesAnterior = CONVERT(VARCHAR(25),DATEADD(dd,-(DAY(@MesActual)),@MesActual),103) 

	-- Se selecciona el codigo del arbol que se va a ejecutar 

	Select @Arbol=ArbolPYG from InformesPresentaciones where CodigoPresentacion  = @CodigoPresentacion
	

	-- Se configuran las fechas a generar la presentacion segun si es Acumulada o Mensual, Pyg o Balance




	IF @Mes_Acum = 0 
	BEGIN

		if @Anterior_Actual = 0
		begin
			SET @Año1 = YEAR(@MesAnterior)
			SET @MesInicial1 = MONTH(@MesAnterior)
			SET @MesFinal1 = MONTH(@MesAnterior)
			SET @Año2 = YEAR(@MesAnterior)
			SET @MesInicial2 = MONTH(@MesAnterior)
			SET @MesFinal2 = MONTH(@MesAnterior)
		END
		ELSE
		BEGIN
			SET @Año1 = YEAR(@MesActual)
			SET @MesInicial1 = MONTH(@MesActual)
			SET @MesFinal1 = MONTH(@MesActual)
			SET @Año2 = YEAR(@MesActual)
			SET @MesInicial2 = MONTH(@MesActual)
			SET @MesFinal2 = MONTH(@MesActual)
		END

	END
	ELSE 
	BEGIN

		if @Anterior_Actual = 0
		begin
			SET @Año1 = YEAR(@MesActual)-1
			SET @MesInicial1 = 1
			SET @MesFinal1 = MONTH(@MesActual)

		END
		ELSE
		BEGIN
			SET @Año1 = YEAR(@MesActual)
			SET @MesInicial1 = 1
			SET @MesFinal1 = MONTH(@MesActual)
		END

	END



	BEGIN TRAN

		if object_id(N'tempdb.dbo.#TablaTemporal1', N'U') is not null
			drop TABLE #TablaTemporal1 		
		if object_id(N'tempdb.dbo.#TotalTemporal', N'U') is not null
			drop TABLE #TotalTemporal 
		if object_id(N'tempdb.dbo.#RellenoTemporal', N'U') is not null
			drop TABLE #RellenoTemporal 
		IF OBJECT_ID (N'dbo.TablaPresentacionMes', N'U') IS NOT NULL  
			DROP TABLE dbo.TablaPresentacionMes
		IF OBJECT_ID (N'dbo.TablaPresentacionMes', N'U') IS NOT NULL
			DROP TABLE dbo.TablaPresentacionMes
		IF OBJECT_ID (N'dbo.TablaPresentacion', N'U') IS NOT NULL  
			DROP TABLE dbo.TablaPresentacion
		IF OBJECT_ID (N'dbo.TablaPresentacion', N'U') IS NOT NULL
			DROP TABLE dbo.TablaPresentacion
		IF OBJECT_ID (N'dbo.TablaTemporal', N'U') IS NOT NULL
			DROP TABLE dbo.TablaTemporal

		CREATE TABLE #TablaTemporal1( 
			[CodigoPresentacion] [smallint] NULL,
			[Año1] [smallint] NULL,
			[MesInicial1] [smallint] NULL,
			[MesFinal1] [smallint] NULL,
			[Año2] [smallint] NULL,
			[MesInicial2] [smallint] NULL,
			[MesFinal2] [smallint] NULL,
			[Orden] [bigint] NULL, 
			[Balance] [tinyint] NULL, 
			[CodigoConcepto] [smallint]  NULL, 
			[NombreConcepto] [nvarchar](100)  NULL, 
			[CodigoSede] [smallint]  NULL, 
			[Sede] [nvarchar](100) NULL, 
			[Anterior] [decimal](38, 4)  NULL, 
			[AntPorcentaje] [decimal](38, 4)  NULL, 
			[Actual] [decimal](38, 4) NULL, 
			[ActPorcentaje] [decimal](38, 4)  NULL, 
			[Presupuesto] [decimal](38, 4)  NULL, 
			[PrePorcentaje] [decimal](38, 4)  NULL, 
			[Nivel1] [smallint]  NULL, 
			[Nivel2] [smallint]  NULL, 
			[Nivel3] [smallint]  NULL, 
			[Nivel4] [smallint]  NULL, 
			[Nivel5] [smallint]  NULL, 
			[Nivel6] [smallint]  NULL,
			DebeHaber [char](1) 
		) ON [PRIMARY] 

		CREATE TABLE #TotalTemporal( 
			[CodigoPresentacion] [smallint] NULL,
			[Año1] [smallint] NULL,
			[MesInicial1] [smallint] NULL,
			[MesFinal1] [smallint] NULL,
			[Año2] [smallint] NULL,
			[MesInicial2] [smallint] NULL,
			[MesFinal2] [smallint] NULL,
			[Orden] [bigint] NULL, 
			[Balance] [tinyint] NULL, 
			[CodigoConcepto] [smallint]  NULL, 
			[NombreConcepto] [nvarchar](100)  NULL, 
			[Sede] [nvarchar](100) NULL, 
			[Anterior] [decimal](38, 4)  NULL, 
			[AntPorcentaje] [decimal](38, 4)  NULL, 
			[Actual] [decimal](38, 4) NULL, 
			[ActPorcentaje] [decimal](38, 4)  NULL, 
			[Presupuesto] [decimal](38, 4)  NULL, 
			[PrePorcentaje] [decimal](38, 4)  NULL, 
			[Nivel1] [smallint]  NULL, 
			[Nivel2] [smallint]  NULL, 
			[Nivel3] [smallint]  NULL, 
			[Nivel4] [smallint]  NULL, 
			[Nivel5] [smallint]  NULL, 
			[Nivel6] [smallint]  NULL 
		) ON [PRIMARY] 

		CREATE TABLE #RellenoTemporal( 
			[Orden] [bigint] NULL, 
			[Sede] [nvarchar](100) NULL, 
			[Anterior] [decimal](38, 4)  NULL, 
			[AntPorcentaje] [decimal](38, 4)  NULL, 
			[Actual] [decimal](38, 4) NULL, 
			[ActPorcentaje] [decimal](38, 4)  NULL, 
			[Presupuesto] [decimal](38, 4)  NULL, 
			[PrePorcentaje] [decimal](38, 4)  NULL, 
		) ON [PRIMARY] 


		DECLARE @CodigoSede as smallint
		DECLARE @nSede as int 
		DECLARE @Query as nvarchar(1000)

		set @Query = ''
		set @nSede = 1

		DECLARE Sede_cursor CURSOR FOR  
			Select CodigoSede from InformesPresentacionesSedes where CodigoPresentacion  = @CodigoPresentacion order by Orden

		OPEN Sede_cursor;  

	-- Perform the first fetch.  
		FETCH NEXT FROM Sede_cursor INTO @CodigoSede   

	-- Check @@FETCH_STATUS to see if there are any more rows to fetch.  
		WHILE @@FETCH_STATUS = 0  
		BEGIN  

			if @nSede = 1
			begin
				exec sp_InformesDatosSedeMes @CodigoPresentacion,@CodigoSede,@Año1,@MesInicial1,@MesFinal1,@Arbol 

				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Orden,Balance,Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,Sede as Sede1,Anterior as Anterior1,AntPorcentaje as AntPorcentaje1,
				Actual as Actual1,ActPorcentaje as ActPorcentaje1,Presupuesto as Presupuesto1,PrePorcentaje as PrePorcentaje1 
				into TablaPresentacionMes from #TablaTemporal1 

				delete from #TablaTemporal1 
	
			end
			else
			begin

					exec sp_InformesDatosSedeMes @CodigoPresentacion,@CodigoSede,@Año1,@MesInicial1,@MesFinal1,@Arbol 

					set @Query = ' select t2.*, '
					set @Query = @Query + ' 	t1.Sede as Sede'+LTRIM(STR(@nSede))+',  '
					set @Query = @Query + ' 	t1.Anterior as Anterior'+LTRIM(STR(@nSede))+',  '
					set @Query = @Query + ' 	t1.AntPorcentaje as AntPorcentaje'+LTRIM(STR(@nSede))+',  '
					set @Query = @Query + ' 	t1.Actual as Actual'+LTRIM(STR(@nSede))+',  '
					set @Query = @Query + ' 	t1.ActPorcentaje as ActPorcentaje'+LTRIM(STR(@nSede))+', '
					set @Query = @Query + ' 	t1.Presupuesto as Presupuesto'+LTRIM(STR(@nSede))+', '
					set @Query = @Query + ' 	t1.PrePorcentaje as PrePorcentaje'+LTRIM(STR(@nSede))+' '
					set @Query = @Query + ' into TablaPresentacionMes3 from #TablaTemporal1 t1 left join TablaPresentacionMes t2 on t1.Orden = t2.Orden  '
	--				print @Query
					exec(@Query)

					drop table TablaPresentacionMes
					delete from #TablaTemporal1 
					select * into TablaPresentacionMes from TablaPresentacionMes3
					drop table TablaPresentacionMes3

			end		

			SET @nSede = @nSede + 1

			FETCH NEXT FROM Sede_cursor	INTO @CodigoSede 

		END  

		CLOSE Sede_cursor
		DEALLOCATE Sede_cursor



	-- COMPLETA LAS 20 TIENDAS

		DELETE FROM #RellenoTemporal
		select @Orden = count(*) from TablaPresentacionMes
		
		set @cnt = 1
		WHILE @cnt <= @Orden 
		BEGIN	
			INSERT INTO #RellenoTemporal VALUES (@cnt,'',0,0,0,0,0,0)
			SET @cnt = @cnt + 1
		END

		WHILE @nSede <= 25
		BEGIN
		
			set @Query = ' select t2.*, '
			set @Query = @Query + ' 	t1.Sede as Sede'+LTRIM(STR(@nSede))+',  '
			set @Query = @Query + ' 	t1.Anterior as Anterior'+LTRIM(STR(@nSede))+',  '
			set @Query = @Query + ' 	t1.AntPorcentaje as AntPorcentaje'+LTRIM(STR(@nSede))+',  '
			set @Query = @Query + ' 	t1.Actual as Actual'+LTRIM(STR(@nSede))+',  '
			set @Query = @Query + ' 	t1.ActPorcentaje as ActPorcentaje'+LTRIM(STR(@nSede))+', '
			set @Query = @Query + ' 	t1.Presupuesto as Presupuesto'+LTRIM(STR(@nSede))+', '
			set @Query = @Query + ' 	t1.PrePorcentaje as PrePorcentaje'+LTRIM(STR(@nSede))+' '
			set @Query = @Query + ' into TablaPresentacionMes3 from #RellenoTemporal t1 left join TablaPresentacionMes t2 on t1.Orden = t2.Orden  '

			exec(@Query) 

			drop table TablaPresentacionMes
			select * into TablaPresentacionMes from TablaPresentacionMes3
			drop table TablaPresentacionMes3
			
			--select @Orden = count(*) from TablaPresentacionMes

			set @nSede = @nSede + 1

		END

		delete from #RellenoTemporal
	


	-- MODIFICA EL FORMATO DE LOS NUMEROS

		--if @Redondeo = 1
		--	EXEC sp_InformesFormatoMes


--select * from TablaPresentacionMes	

	-- AGREGA TOTALES SUMATORIA

		select t2.*, 
		t1.Sede as SedeTotal,  
		t1.Anterior as AnteriorTotal,  
		t1.AntPorcentaje as AntPorcentajeTotal, 
		t1.Actual as ActualTotal,  
		t1.ActPorcentaje as ActPorcentajeTotal, 
		t1.Presupuesto as PresupuestoTotal, 
		t1.PrePorcentaje as PrePorcentajeTotal 
		into TablaPresentacionMes3 from #TotalTemporal t1 left join TablaPresentacionMes t2 on t1.Orden = t2.Orden  

		drop table TablaPresentacionMes
		delete from #TotalTemporal 
		select * into TablaPresentacion from TablaPresentacionMes3
		drop table TablaPresentacionMes3



	-- Actualiza Informes Definitivos
			Print 'Actualizando Presentaciones Definitivas '+cast(@CodigoPresentacion as char)+' '+cast(@Año as char)+' '+cast(@Mes as char)
			IF OBJECT_ID (N'dbo.InformesDefinitivosMes', N'U') IS NOT NULL and  OBJECT_ID (N'dbo.InformesDefinitivosAcu', N'U') IS NOT NULL
			Begin
				if @Mes_Acum = 0
				begin
					delete from InformesDefinitivosMes where CodigoPresentacion = @CodigoPresentacion and Año1 = @Año1 and MesInicial1 = @MesInicial1 and MesFinal1 = @MesFinal1 and Balance = @Arbol
					select *,getdate() FechaGeneracion into TablaPresentacion_Temp from TablaPresentacion
					insert into InformesDefinitivosMes select * from TablaPresentacion_Temp
				end
				else 
				begin
					delete from InformesDefinitivosAcu where CodigoPresentacion = @CodigoPresentacion and Año1 = @Año1 and MesInicial1 = @MesInicial1 and MesFinal1 = @MesFinal1 and Balance = @Arbol
					select *,getdate() FechaGeneracion into TablaPresentacion_Temp from TablaPresentacion
					insert into InformesDefinitivosAcu select * from TablaPresentacion_Temp
				end
				drop table TablaPresentacion_Temp
			end
			else
			Begin
				if @Mes_Acum = 0
					select *,getdate() Fecha into InformesDefinitivosMes from TablaPresentacion
				else
					select *,getdate() Fecha into InformesDefinitivosAcu from TablaPresentacion
			end

	-- Retorna o no la tabla segun parametro
		if @RetornaTabla = 1
			-- MODIFICADO POR JCS PARA PODER MAPEAR CON EL ENTITY FRAMEWORK
			BEGIN
			ALTER TABLE TablaPresentacion ADD ID INT IDENTITY(1,1) NOT NULL
			select *  from TablaPresentacion order by Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6
			END

	COMMIT

END




```
