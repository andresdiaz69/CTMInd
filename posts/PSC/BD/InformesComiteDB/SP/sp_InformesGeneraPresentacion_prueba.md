# Stored Procedure: sp_InformesGeneraPresentacion_prueba

## Usa los objetos:
- [[InformesPresentacionesSedes]]
- [[sp_InformesDatosSede]]
- [[TablaPresentacion]]
- [[TablaTemporal3]]

```sql

create PROCEDURE [dbo].[sp_InformesGeneraPresentacion_prueba] 

	@CodigoPresentacion as smallint,
	@Año as smallint,
	@Mes as smallint,
	@Mes_Acum as bit = 0, -- 0 Mes o 1 Acum,
	@TipoArbol as bit = 0, -- 0 P&G o 1 Balance
	@RetornaTabla bit = 1

AS
BEGIN	
	SET NOCOUNT ON

	DECLARE @EmpresaPresupuesto as smallint
	DECLARE @Orden as smallint
	DECLARE @Cnt as smallint
	DECLARE @Arbol as int
	DECLARE @Año1 as smallint
	DECLARE @MesInicial1 as smallint
	DECLARE @MesFinal1 as smallint
	DECLARE @Año2 as smallint
	DECLARE @MesInicial2 as smallint
	DECLARE @MesFinal2 as smallint

	DECLARE @MesActual AS DATETIME
	DECLARE @MesAnterior AS DATETIME
	
	SET @MesActual = CONVERT(datetime, '01-'+ltrim(str(@Mes))+'-'+ltrim(str(@Año)),103)
	--MODIFICADO POR JCS POR COMPATIBILIDAD FORMATO DE FECHAS
	--SET @MesAnterior = CONVERT(VARCHAR(25),DATEADD(dd,-(DAY(@MesActual)),@MesActual),101) 
	SET @MesAnterior = CONVERT(VARCHAR(25),DATEADD(dd,-(DAY(@MesActual)),@MesActual),103) 

	IF @TipoArbol = 0
		SET @Arbol = 17
	ELSE	
		SET @Arbol = 18

	IF @Mes_Acum = 0 
	BEGIN

		IF @Arbol = 17
		BEGIN
			SET @Año1 = YEAR(@MesAnterior)
			SET @MesInicial1 = MONTH(@MesAnterior)
			SET @MesFinal1 = MONTH(@MesAnterior)
			SET @Año2 = YEAR(@MesActual)
			SET @MesInicial2 = MONTH(@MesActual)
			SET @MesFinal2 = MONTH(@MesActual)
		END
		ELSE IF @Arbol = 18
		BEGIN
			SET @Año1 = YEAR(@MesAnterior)
			SET @MesInicial1 = 1
			SET @MesFinal1 = MONTH(@MesAnterior)
			SET @Año2 = YEAR(@MesActual)
			SET @MesInicial2 = 1
			SET @MesFinal2 = MONTH(@MesActual)
		END

	END
	ELSE 
	BEGIN
		SET @Año1 = YEAR(@MesActual)-1
		SET @MesInicial1 = 1
		SET @MesFinal1 = MONTH(@MesActual)
		SET @Año2 = YEAR(@MesActual)
		SET @MesInicial2 = 1
		SET @MesFinal2 = MONTH(@MesActual)
	END



	BEGIN TRAN

		if object_id(N'tempdb.dbo.#TablaTemporal1', N'U') is not null
			drop TABLE #TablaTemporal1 
		IF OBJECT_ID (N'dbo.TablaPresentacion', N'U') IS NOT NULL  
			DROP TABLE dbo.TablaPresentacion  
		IF OBJECT_ID (N'dbo.TablaPresentacion', N'U') IS NOT NULL
			DROP TABLE dbo.TablaPresentacion
		IF OBJECT_ID (N'dbo.TablaTemporal3', N'U') IS NOT NULL
			DROP TABLE dbo.TablaTemporal3

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
			[Nivel6] [smallint]  NULL 
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
	-- Mes

		--Select @EmpresaPresupuesto= EmpresaPresupuesto from InformesPresentaciones where CodigoPresentacion  = @CodigoPresentacion

		DECLARE @CodigoSede as smallint
		DECLARE @nSede as int 
		DECLARE @Query as nvarchar(1000)


		set @Query = ''
		set @nSede = 1

		DECLARE Sede_cursor CURSOR FOR  
			--Select CodigoSede from InformesPresentacionesSedes where CodigoPresentacion  = @CodigoPresentacion
			Select CodigoSede from InformesPresentacionesSedes where CodigoPresentacion  = @CodigoPresentacion order by Orden

		OPEN Sede_cursor;  

	-- Perform the first fetch.  
		FETCH NEXT FROM Sede_cursor INTO @CodigoSede   

	-- Check @@FETCH_STATUS to see if there are any more rows to fetch.  
		WHILE @@FETCH_STATUS = 0  
		BEGIN  

			if @nSede = 1
			begin
--				exec sp_InformesDatosSede @CodigoPresentacion,@CodigoSede,@Año1,@MesInicial1,@MesFinal1,@Año2,@MesInicial2,@MesFinal2,@EmpresaPresupuesto,@Arbol 
				exec sp_InformesDatosSede @CodigoPresentacion,@CodigoSede,@Año1,@MesInicial1,@MesFinal1,@Año2,@MesInicial2,@MesFinal2,@Arbol 

				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Orden,Balance,Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,Sede as Sede1,Anterior as Anterior1,AntPorcentaje as AntPorcentaje1,
				Actual as Actual1,ActPorcentaje as ActPorcentaje1,Presupuesto as Presupuesto1,PrePorcentaje as PrePorcentaje1 
				into TablaPresentacion from #TablaTemporal1 

				delete from #TablaTemporal1 
	
			end
			else
			begin

--					exec sp_InformesDatosSede @CodigoPresentacion,@CodigoSede,@Año1,@MesInicial1,@MesFinal1,@Año2,@MesInicial2,@MesFinal2,@EmpresaPresupuesto,@Arbol 
					exec sp_InformesDatosSede @CodigoPresentacion,@CodigoSede,@Año1,@MesInicial1,@MesFinal1,@Año2,@MesInicial2,@MesFinal2,@Arbol 

					set @Query = ' select t2.*, '
					set @Query = @Query + ' 	t1.Sede as Sede'+LTRIM(STR(@nSede))+',  '
					set @Query = @Query + ' 	t1.Anterior as Anterior'+LTRIM(STR(@nSede))+',  '
					set @Query = @Query + ' 	t1.AntPorcentaje as AntPorcentaje'+LTRIM(STR(@nSede))+',  '
					set @Query = @Query + ' 	t1.Actual as Actual'+LTRIM(STR(@nSede))+',  '
					set @Query = @Query + ' 	t1.ActPorcentaje as ActPorcentaje'+LTRIM(STR(@nSede))+', '
					set @Query = @Query + ' 	t1.Presupuesto as Presupuesto'+LTRIM(STR(@nSede))+', '
					set @Query = @Query + ' 	t1.PrePorcentaje as PrePorcentaje'+LTRIM(STR(@nSede))+' '
					set @Query = @Query + ' into TablaTemporal3 from #TablaTemporal1 t1 left join TablaPresentacion t2 on t1.Orden = t2.Orden  '
	--				print @Query
					exec(@Query)

					drop table TablaPresentacion
					delete from #TablaTemporal1 
					select * into TablaPresentacion from TablaTemporal3
					drop table TablaTemporal3

			end		

			SET @nSede = @nSede + 1

			FETCH NEXT FROM Sede_cursor	INTO @CodigoSede 

		END  

		CLOSE Sede_cursor
		DEALLOCATE Sede_cursor


	-- COMPLETA LAS 20 TIENDAS


		DELETE FROM #RellenoTemporal
		select @Orden = count(*) from TablaPresentacion
		
		set @cnt = 1
		WHILE @cnt <= @Orden 
		BEGIN	
			INSERT INTO #RellenoTemporal VALUES (@cnt,'',0,0,0,0,0,0)
			SET @cnt = @cnt + 1
		END

		WHILE @nSede <= 20
		BEGIN
		
			set @Query = ' select t2.*, '
			set @Query = @Query + ' 	t1.Sede as Sede'+LTRIM(STR(@nSede))+',  '
			set @Query = @Query + ' 	t1.Anterior as Anterior'+LTRIM(STR(@nSede))+',  '
			set @Query = @Query + ' 	t1.AntPorcentaje as AntPorcentaje'+LTRIM(STR(@nSede))+',  '
			set @Query = @Query + ' 	t1.Actual as Actual'+LTRIM(STR(@nSede))+',  '
			set @Query = @Query + ' 	t1.ActPorcentaje as ActPorcentaje'+LTRIM(STR(@nSede))+', '
			set @Query = @Query + ' 	t1.Presupuesto as Presupuesto'+LTRIM(STR(@nSede))+', '
			set @Query = @Query + ' 	t1.PrePorcentaje as PrePorcentaje'+LTRIM(STR(@nSede))+' '
			set @Query = @Query + ' into TablaTemporal3 from #RellenoTemporal t1 left join TablaPresentacion t2 on t1.Orden = t2.Orden  '

			exec(@Query) 

			drop table TablaPresentacion
			select * into TablaPresentacion from TablaTemporal3
			drop table TablaTemporal3


			select @Orden = count(*) from TablaPresentacion

			set @nSede = @nSede + 1

		END

		delete from #RellenoTemporal
	
-- MODIFICA EL FORMATO DE LOS NUMEROS
	--	EXEC sp_InformesFormato
		--UPDATE #TotalTemporal SET	Anterior = Anterior / 1000000
		--							--,AntPorcentaje = AntPorcentaje / 10000
		--							,Actual = Actual / 1000000
		--							--,ActPorcentaje = ActPorcentaje / 10000
		--							,Presupuesto = Presupuesto / 1000000
		--							--,PrePorcentaje = PrePorcentaje / 10000


	-- AGREGA TOTALES SUMATORIA

		select t2.*, 
		t1.Sede as SedeTotal,  
		t1.Anterior as AnteriorTotal,  
		t1.AntPorcentaje as AntPorcentajeTotal, 
		t1.Actual as ActualTotal,  
		t1.ActPorcentaje as ActPorcentajeTotal, 
		t1.Presupuesto as PresupuestoTotal, 
		t1.PrePorcentaje as PrePorcentajeTotal 
		into TablaTemporal3 from #TotalTemporal t1 left join TablaPresentacion t2 on t1.Orden = t2.Orden  

		drop table TablaPresentacion
		delete from #TotalTemporal 
		select * into TablaPresentacion from TablaTemporal3
		drop table TablaTemporal3

		--select * from TablaPresentacion order by Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6



		if @RetornaTabla = 1
			-- MODIFICADO POR JCS PARA PODER MAPEAR CON EL ENTITY FRAMEWORK
			BEGIN
			ALTER TABLE TablaPresentacion ADD ID INT IDENTITY(1,1) NOT NULL
			select *  from TablaPresentacion order by Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6
			END

	COMMIT

END

```
