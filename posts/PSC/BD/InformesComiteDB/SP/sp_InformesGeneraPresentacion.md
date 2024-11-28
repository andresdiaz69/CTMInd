# Stored Procedure: sp_InformesGeneraPresentacion

## Usa los objetos:
- [[InformesArboles]]
- [[InformesDefinitivos]]
- [[InformesPresentaciones]]
- [[InformesPresentacionesSedes]]
- [[sp_InformesDatosSede]]
- [[sp_InformesFormato]]
- [[TablaPresentacion]]
- [[TablaPresentacion_Temp]]
- [[TablaTemporal3]]

```sql
-- =======================================================================================================================================
-- Author:		LUIS FREDDY GUERRERO LOPEZ
-- Create date: 2018-10-16 ultima actualizacion
-- Description:	GENERA UNA PRESENTACION DE COMITE SEGUN PARAMETROS
-- 2020-07-08:  Se agrega PK a la tabla temporal #TablaTemporal1
-- =======================================================================================================================================

CREATE PROCEDURE [dbo].[sp_InformesGeneraPresentacion] 

	@CodigoPresentacion as smallint,
	@Año as smallint,
	@Mes as smallint,
	@Mes_Acum as bit = 0, -- 0 Mes o 1 Acum,
	@TipoArbol as bit = 0, -- 0 P&G o 1 Balance
	@RetornaTabla bit = 1,
	@Redondeo bit = 1, --0 Sin Redondeo o 1 Con Redondeo
	@FueradeLinea as bit = 0
AS
BEGIN	
	SET NOCOUNT ON

	if @FueradeLinea = 1
    begin
		raiserror('En este momento las presentaciones se encuentran en mantenimiento', 18, 1)
	    return -1
    end

	DECLARE @Msg as nvarchar(100)
	if not exists(Select * from InformesPresentaciones where CodigoPresentacion  = @CodigoPresentacion)
	begin
		set @Msg='La presentacion '+rtrim(cast(@CodigoPresentacion as char(2)))+ ' no existe'
		RAISERROR ( @Msg ,   0 ,   1 ) --WITH NOWAIT ---WAITFOR DELAY   '00:00:01' ;
		return
	end

	DECLARE @EmpresaPresupuesto as smallint
	DECLARE @Orden as smallint
	DECLARE @Cnt as smallint
	DECLARE @Arbol as smallint
	DECLARE @Año1 as smallint
	DECLARE @MesInicial1 as smallint
	DECLARE @MesFinal1 as smallint
	DECLARE @Año2 as smallint
	DECLARE @MesInicial2 as smallint
	DECLARE @MesFinal2 as smallint
	DECLARE @MesActual AS DATETIME
	DECLARE @MesAnterior AS DATETIME
	DECLARE @PyG smallint = 0
	DECLARE @LineasArbol integer = 0,@LineasPresentacion integer = 0
	
	SET @MesActual = CONVERT(datetime, '01-'+ltrim(str(@Mes))+'-'+ltrim(str(@Año)),103)
	--MODIFICADO POR JCS POR COMPATIBILIDAD FORMATO DE FECHAS
	--SET @MesAnterior = CONVERT(VARCHAR(25),DATEADD(dd,-(DAY(@MesActual)),@MesActual),101) 
	SET @MesAnterior = CONVERT(VARCHAR(25),DATEADD(dd,-(DAY(@MesActual)),@MesActual),103) 

	-- Se selecciona el codigo del arbol que se va a ejecutar

	IF @TipoArbol = @PyG
		Select @Arbol=ArbolPYG from InformesPresentaciones where CodigoPresentacion  = @CodigoPresentacion
	ELSE	
		Select @Arbol=ArbolBalance from InformesPresentaciones where CodigoPresentacion  = @CodigoPresentacion


	-- Se configuran las fechas a generar la presentacion segun si es Acumulada o Mensual, Pyg o Balance

	IF @Mes_Acum = 0 
	BEGIN

		IF @TipoArbol = @PyG
		BEGIN
			SET @Año1 = YEAR(@MesAnterior)
			SET @MesInicial1 = MONTH(@MesAnterior)
			SET @MesFinal1 = MONTH(@MesAnterior)
			SET @Año2 = YEAR(@MesActual)
			SET @MesInicial2 = MONTH(@MesActual)
			SET @MesFinal2 = MONTH(@MesActual)
		END
		ELSE 
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

	SELECT @LineasArbol = count(*) FROM InformesArboles where Empresa = 1 and Balance = @Arbol and Nivel1>0

	BEGIN TRAN

		if object_id(N'tempdb.dbo.#TablaTemporal1', N'U') is not null
			drop TABLE #TablaTemporal1 
		IF OBJECT_ID (N'dbo.TablaPresentacion', N'U') IS NOT NULL  
			DROP TABLE dbo.TablaPresentacion  
		IF OBJECT_ID (N'dbo.TablaPresentacion', N'U') IS NOT NULL
			DROP TABLE dbo.TablaPresentacion
		IF OBJECT_ID (N'dbo.TablaTemporal3', N'U') IS NOT NULL
			DROP TABLE dbo.TablaTemporal3

		--CREATE TABLE #TablaTemporal1( 
		--	[CodigoPresentacion] [smallint] NULL,
		--	[Año1] [smallint] NULL,
		--	[MesInicial1] [smallint] NULL,
		--	[MesFinal1] [smallint] NULL,
		--	[Año2] [smallint] NULL,
		--	[MesInicial2] [smallint] NULL,
		--	[MesFinal2] [smallint] NULL,
		--	[Orden] [bigint] NULL, 
		--	[Balance] [tinyint] NULL, 
		--	[CodigoConcepto] [smallint]  NULL, 
		--	[NombreConcepto] [nvarchar](100)  NULL, 
		--	[CodigoSede] [smallint]  NULL, 
		--	[Sede] [nvarchar](100) NULL, 
		--	[Anterior] [decimal](38, 4)  NULL, 
		--	[AntPorcentaje] [decimal](38, 4)  NULL, 
		--	[Actual] [decimal](38, 4) NULL, 
		--	[ActPorcentaje] [decimal](38, 4)  NULL, 
		--	[Presupuesto] [decimal](38, 4)  NULL, 
		--	[PrePorcentaje] [decimal](38, 4)  NULL, 
		--	[Nivel1] [smallint]  NULL, 
		--	[Nivel2] [smallint]  NULL, 
		--	[Nivel3] [smallint]  NULL, 
		--	[Nivel4] [smallint]  NULL, 
		--	[Nivel5] [smallint]  NULL, 
		--	[Nivel6] [smallint]  NULL,
		--	DebeHaber [char](1) 
		--) ON [PRIMARY] 

		CREATE TABLE #TablaTemporal1( 
			[CodigoPresentacion] [smallint] NOT NULL,
			[Año1] [smallint] NOT NULL,
			[MesInicial1] [smallint] NOT NULL,
			[MesFinal1] [smallint] NOT NULL,
			[Año2] [smallint] NOT NULL,
			[MesInicial2] [smallint] NOT NULL,
			[MesFinal2] [smallint] NOT NULL,
			[Orden] [bigint] NOT NULL, 
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

		--ALTER TABLE #TablaTemporal1
		--ADD CONSTRAINT PK_TablaTemporal PRIMARY KEY CLUSTERED (CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Orden);

		CREATE CLUSTERED INDEX IX_TablaTemporal ON #TablaTemporal1 (CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Orden);

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
				exec sp_InformesDatosSede @CodigoPresentacion,@CodigoSede,@Año1,@MesInicial1,@MesFinal1,@Año2,@MesInicial2,@MesFinal2,@Arbol 

				select CodigoPresentacion,Año1,MesInicial1,MesFinal1,Año2,MesInicial2,MesFinal2,Orden,Balance,
				Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6,CodigoConcepto,NombreConcepto,
				Sede as Sede1,Anterior as Anterior1,AntPorcentaje as AntPorcentaje1,
				Actual as Actual1,ActPorcentaje as ActPorcentaje1,Presupuesto as Presupuesto1,PrePorcentaje as PrePorcentaje1 
				into TablaPresentacion from #TablaTemporal1 

				delete from #TablaTemporal1 
	
			end
			else
			begin

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


					-- 2019-05-22 LFG: SE AGREGA ESTE IF PARA VALIDAR QUE TODAS LAS SEDES TENGAN EL MISMO NUMERO DE LINEAS Y NO SE ESTE
					-- GENERANDO UN PRODUCTO CRUZ QUE BLOQUEE LA BASE DE DATOS
					select @LineasPresentacion = count(*) from TablaTemporal3
					if @LineasPresentacion > @LineasArbol Begin
						Print 'Existen inconvenientes generando la presentacion, se bloqueará esta ejecucion, Arbol ('+cast(@LineasArbol as char(3))+') Sede ('+cast(@LineasPresentacion as char(3))+')'

						IF OBJECT_ID (N'dbo.TablaTemporal1_1', N'U') IS NULL begin
							select * into TablaTemporal1_1 from #TablaTemporal1
							select * into TablaTemporal3_1 from TablaTemporal3
							select * into TablaPresentacion_1 from TablaPresentacion
						end

						CLOSE Sede_cursor
						DEALLOCATE Sede_cursor

						commit
						RETURN
					end
					-- FIN VALIDACION

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
			set @Query = @Query + ' into TablaTemporal3 from #RellenoTemporal t1 left join TablaPresentacion t2 on t1.Orden = t2.Orden  '

			exec(@Query) 

			drop table TablaPresentacion
			select * into TablaPresentacion from TablaTemporal3
			drop table TablaTemporal3


			select @Orden = count(*) from TablaPresentacion

			set @nSede = @nSede + 1

		END

		drop table #RellenoTemporal
	


	-- MODIFICA EL FORMATO DE LOS NUMEROS

		if @Redondeo = 1
			EXEC sp_InformesFormato




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
		drop table #TotalTemporal 
		select * into TablaPresentacion from TablaTemporal3
		drop table TablaTemporal3

	-- Actualiza Informes Definitivos

		if @Redondeo = 0 
		begin
			Print 'Actualizando Presentaciones Definitivas '+cast(@CodigoPresentacion as char)+' '+cast(@Año as char)+' '+cast(@Mes as char)
			IF OBJECT_ID (N'dbo.InformesDefinitivos', N'U') IS NOT NULL
			Begin
				delete from InformesDefinitivos where CodigoPresentacion = @CodigoPresentacion and Año1 = @Año1 and MesInicial1 = @MesInicial1 and MesFinal1 = @MesFinal1 and año2 = @Año and MesInicial2 = @MesInicial2 and Mesfinal2 = @Mes and Balance = @Arbol
				select *,getdate() FechaGeneracion into TablaPresentacion_Temp from TablaPresentacion
				insert into InformesDefinitivos select * from TablaPresentacion_Temp
				--insert into InformesDefinitivos select *, from TablaPresentacion
				drop table TablaPresentacion_Temp
			end
			else
			Begin
				select *,getdate() Fecha into InformesDefinitivos from TablaPresentacion
			end
		end

	-- crea ID

		ALTER TABLE TablaPresentacion ADD ID INT IDENTITY(1,1) NOT NULL

	-- Retorna o no la tabla segun parametro			

		if @RetornaTabla = 1
			-- MODIFICADO POR JCS PARA PODER MAPEAR CON EL ENTITY FRAMEWORK
			BEGIN
			select *  from TablaPresentacion order by Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Nivel6
			END

	COMMIT

END



```
