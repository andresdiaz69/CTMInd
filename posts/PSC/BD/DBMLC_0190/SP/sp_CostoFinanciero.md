# Stored Procedure: sp_CostoFinanciero

## Usa los objetos:
- [[sp_CF_ActivosFijos]]
- [[sp_CF_AnticiposEmpleados]]
- [[sp_CF_AnticiposProveedores]]
- [[sp_CF_AnticiposRecibidos]]
- [[sp_CF_AnticiposViaticos]]
- [[sp_CF_AporteCapital]]
- [[sp_CF_BonosFabrica]]
- [[sp_CF_Cartera]]
- [[sp_CF_CFC]]
- [[sp_CF_CFCMasCostoPM]]
- [[sp_CF_CFCMesAnterior]]
- [[sp_CF_CuentasXPagar]]
- [[sp_CF_CXP_Bancos]]
- [[sp_CF_CXP_Fabricas]]
- [[sp_CF_CXP_NCFabricas]]
- [[sp_CF_CXP_Otros]]
- [[sp_CF_Diferencia]]
- [[sp_CF_Diferidos]]
- [[sp_CF_Estructura_CXP]]
- [[sp_CF_Nuevos]]
- [[sp_CF_OtrosActivosDerechos]]
- [[sp_CF_PasivosImpuestos]]
- [[sp_CF_PasivosLaborales]]
- [[sp_CF_Repuestos]]
- [[sp_CF_RepuestosRemisiones]]
- [[sp_CF_RepuestosStock]]
- [[sp_CF_RepuestosTraslados]]
- [[sp_CF_Taller]]
- [[sp_CF_TallerColision]]
- [[sp_CF_TallerMecanica]]
- [[sp_CF_TotalSumaActivos]]
- [[sp_CF_TotalSumaPasivos]]
- [[sp_CF_Usados]]
- [[sp_CF_Uso]]
- [[spiga_Tasks]]

```sql
CREATE PROC [dbo].[sp_CostoFinanciero] (
	@Fecha DATE
) AS
BEGIN 
	-- =============================================
	-- Control de Cambios
	-- 2024|09|10 - ALEXIS - Se anexan las validaciones try y catch para el retorno de errores
	-- 2024|09|10 - ALEXIS - Se anexa la fecha sincronizacion para validar la ejecución de las tareas diarias.
	-- =============================================


	--DECLARE @Fecha DATE; 
	--SET @Fecha = '20240906'

	SET NOCOUNT ON 
	SET FMTONLY OFF



	DECLARE	@FechaIngreso DATE,				@fechaConsulta DATE,								@data_SpigaActivosFijos BIT, 						@data_SpigaAnticiposClientes BIT,
		@data_SpigaCartera BIT, 			@data_SpigaCuentasPorPagar BIT,						@data_SpigaEmpleados BIT,							@data_SpigaHojasDeGastosPendientes BIT,
		@data_SpigaInventarioVN BIT,		@data_SpigaInventarioVO BIT,						@data_SpigaOrdenesDeTrabajoAbiertas BIT, 			@data_SpigaOrdenesDeTrabajoCerradas BIT,
		@data_SpigaTerceros BIT,			@data_SpigaRecibosAnticiposReaprovechados BIT, 		@data_SpigaRemisionesDeVentasSinFacturar BIT,		@data_SpigaContabilidadMovimientos_Act BIT,
		@data_SpigaStockrepuestos BIT,		@data_SpigaTrasladosDeRepuestosPendientes BIT,		@data_SpigaContabilidadMovimientos_Ant BIT,			@Mensaje NVARCHAR(MAX) = '',
		@FechaSincronizacion DATE;



	SET @FechaIngreso = DATEADD(DAY,-1,@Fecha);	
	SET @FechaConsulta = DATEADD(DAY,-1,@Fecha);
	
	SET @FechaSincronizacion = 
		(CASE 
		    WHEN CONCAT(MONTH(@FechaConsulta),'-',YEAR(@FechaConsulta)) = CONCAT(MONTH(GETDATE()),'-',YEAR(GETDATE()))			
		        THEN @Fecha
		    ELSE @FechaConsulta
		END)


	SET @data_SpigaActivosFijos/*------------------*/= (SELECT CASE WHEN (SELECT TOP 1 CASE WHEN FinishDate IS NOT NULL THEN 1 ELSE 0 END FROM [PSCService_DB].[dbo].[spiga_Tasks] WHERE CONVERT(DATE, FinishDate) = @FechaSincronizacion AND Task = 'SpigaActivosFijos') IS NULL THEN 0 ELSE 1 END);
	SET @data_SpigaAnticiposClientes/*-------------*/= (SELECT CASE WHEN (SELECT TOP 1 CASE WHEN FinishDate IS NOT NULL THEN 1 ELSE 0 END FROM [PSCService_DB].[dbo].[spiga_Tasks] WHERE CONVERT(DATE, FinishDate) = @FechaSincronizacion AND Task = 'SpigaAnticiposClientes') IS NULL THEN 0 ELSE 1 END);
	SET @data_SpigaCartera/*-----------------------*/= (SELECT CASE WHEN (SELECT TOP 1 CASE WHEN FinishDate IS NOT NULL THEN 1 ELSE 0 END FROM [PSCService_DB].[dbo].[spiga_Tasks] WHERE CONVERT(DATE, FinishDate) = @FechaSincronizacion AND Task = 'SpigaCartera') IS NULL THEN 0 ELSE 1 END);
	SET @data_SpigaCuentasPorPagar/*---------------*/= (SELECT CASE WHEN (SELECT TOP 1 CASE WHEN FinishDate IS NOT NULL THEN 1 ELSE 0 END FROM [PSCService_DB].[dbo].[spiga_Tasks] WHERE CONVERT(DATE, FinishDate) = @FechaSincronizacion AND Task = 'SpigaCuentasPorPagar') IS NULL THEN 0 ELSE 1 END);
	SET @data_SpigaEmpleados/*---------------------*/= (SELECT CASE WHEN (SELECT TOP 1 CASE WHEN FinishDate IS NOT NULL THEN 1 ELSE 0 END FROM [PSCService_DB].[dbo].[spiga_Tasks] WHERE CONVERT(DATE, FinishDate) = @FechaSincronizacion AND Task = 'SpigaEmpleados') IS NULL THEN 0 ELSE 1 END);
	SET @data_SpigaHojasDeGastosPendientes/*-------*/= (SELECT CASE WHEN (SELECT TOP 1 CASE WHEN FinishDate IS NOT NULL THEN 1 ELSE 0 END FROM [PSCService_DB].[dbo].[spiga_Tasks] WHERE CONVERT(DATE, FinishDate) = @FechaSincronizacion AND Task = 'SpigaHojasDeGastosPendientes') IS NULL THEN 0 ELSE 1 END);
	SET @data_SpigaInventarioVN/*------------------*/= (SELECT CASE WHEN (SELECT TOP 1 CASE WHEN FinishDate IS NOT NULL THEN 1 ELSE 0 END FROM [PSCService_DB].[dbo].[spiga_Tasks] WHERE CONVERT(DATE, FinishDate) = @FechaSincronizacion AND Task = 'SpigaInventarioVN') IS NULL THEN 0 ELSE 1 END);
	SET @data_SpigaInventarioVO/*------------------*/= (SELECT CASE WHEN (SELECT TOP 1 CASE WHEN FinishDate IS NOT NULL THEN 1 ELSE 0 END FROM [PSCService_DB].[dbo].[spiga_Tasks] WHERE CONVERT(DATE, FinishDate) = @FechaSincronizacion AND Task = 'SpigaInventarioVO') IS NULL THEN 0 ELSE 1 END);
	SET @data_SpigaOrdenesDeTrabajoAbiertas/*------*/= (SELECT CASE WHEN (SELECT TOP 1 CASE WHEN FinishDate IS NOT NULL THEN 1 ELSE 0 END FROM [PSCService_DB].[dbo].[spiga_Tasks] WHERE CONVERT(DATE, FinishDate) = @FechaSincronizacion AND Task = 'SpigaOrdenesDeTrabajoAbiertas') IS NULL THEN 0 ELSE 1 END);
	SET @data_SpigaOrdenesDeTrabajoCerradas/*------*/= (SELECT CASE WHEN (SELECT TOP 1 CASE WHEN FinishDate IS NOT NULL THEN 1 ELSE 0 END FROM [PSCService_DB].[dbo].[spiga_Tasks] WHERE CONVERT(DATE, FinishDate) = @FechaSincronizacion AND Task = 'SpigaOrdenesDeTrabajoCerradas') IS NULL THEN 0 ELSE 1 END);
	SET @data_SpigaRecibosAnticiposReaprovechados/**/= (SELECT CASE WHEN (SELECT TOP 1 CASE WHEN FinishDate IS NOT NULL THEN 1 ELSE 0 END FROM [PSCService_DB].[dbo].[spiga_Tasks] WHERE CONVERT(DATE, FinishDate) = @FechaSincronizacion AND Task = 'SpigaRecibosAnticiposReaprovechados') IS NULL THEN 0 ELSE 1 END);
	SET @data_SpigaRemisionesDeVentasSinFacturar/*-*/= (SELECT CASE WHEN (SELECT TOP 1 CASE WHEN FinishDate IS NOT NULL THEN 1 ELSE 0 END FROM [PSCService_DB].[dbo].[spiga_Tasks] WHERE CONVERT(DATE, FinishDate) = @FechaSincronizacion AND Task = 'SpigaRemisionesDeVentasSinFacturar') IS NULL THEN 0 ELSE 1 END);
	SET @data_SpigaTerceros/*----------------------*/= (SELECT CASE WHEN (SELECT TOP 1 CASE WHEN FinishDate IS NOT NULL THEN 1 ELSE 0 END FROM [PSCService_DB].[dbo].[spiga_Tasks] WHERE CONVERT(DATE, FinishDate) = @FechaSincronizacion AND Task = 'SpigaTerceros') IS NULL THEN 0 ELSE 1 END);
	SET @data_SpigaTrasladosDeRepuestosPendientes/**/= (SELECT CASE WHEN (SELECT TOP 1 CASE WHEN FinishDate IS NOT NULL THEN 1 ELSE 0 END FROM [PSCService_DB].[dbo].[spiga_Tasks] WHERE CONVERT(DATE, FinishDate) = @FechaSincronizacion AND Task = 'SpigaTrasladosDeRepuestosPendientes') IS NULL THEN 0 ELSE 1 END);
	SET @data_SpigaStockrepuestos/*----------------*/= (SELECT CASE WHEN (SELECT TOP 1 CASE WHEN FinishDate IS NOT NULL THEN 1 ELSE 0 END FROM [PSCService_DB].[dbo].[spiga_Tasks] WHERE CONVERT(DATE, FinishDate) = @FechaSincronizacion AND Task LIKE 'SpigaStockrepuestos_%') IS NULL THEN 0 ELSE 1 END);
	SET @data_SpigaContabilidadMovimientos_Act/*---*/= (SELECT CASE WHEN (SELECT TOP 1 CASE WHEN FinishDate IS NOT NULL THEN 1 ELSE 0 END FROM [PSCService_DB].[dbo].[spiga_Tasks] WHERE CONVERT(DATE, FinishDate) = @FechaSincronizacion AND Task LIKE 'SpigaContabilidadMovimientos_Act%') IS NULL THEN 0 ELSE 1 END);
	SET @data_SpigaContabilidadMovimientos_Ant/*---*/= (SELECT CASE WHEN (SELECT TOP 1 CASE WHEN FinishDate IS NOT NULL THEN 1 ELSE 0 END FROM [PSCService_DB].[dbo].[spiga_Tasks] WHERE CONVERT(DATE, FinishDate) = @FechaSincronizacion AND Task LIKE 'SpigaContabilidadMovimientos_Ant%') IS NULL THEN 0 ELSE 1 END);



	IF (@data_SpigaActivosFijos = 1) AND (@data_SpigaAnticiposClientes = 1) AND (@data_SpigaCartera = 1) AND (@data_SpigaCuentasPorPagar = 1) AND (@data_SpigaRecibosAnticiposReaprovechados = 1)
		AND (@data_SpigaEmpleados = 1) AND (@data_SpigaHojasDeGastosPendientes = 1) AND (@data_SpigaInventarioVN = 1) AND (@data_SpigaInventarioVO = 1) AND (@data_SpigaStockrepuestos = 1) 
		AND (@data_SpigaOrdenesDeTrabajoAbiertas = 1) AND (@data_SpigaOrdenesDeTrabajoCerradas = 1) AND (@data_SpigaRemisionesDeVentasSinFacturar = 1) AND (@data_SpigaTerceros = 1) 
		AND (@data_SpigaTrasladosDeRepuestosPendientes = 1) AND (@data_SpigaContabilidadMovimientos_Act = 1) AND (@data_SpigaContabilidadMovimientos_Ant = 1)
		BEGIN
		
			----- INICIAR LA SECUENCIA BEGIN PARA REVERTIR CAMBIOS SI SUCEDE ALGUN CONFLICTO -----
			BEGIN TRAN
		


			---- INICIO --- EXCEPCION PARA EJECUTAR LOS PROCEDIMIENTOS DEL CFC --------
			BEGIN TRY
				BEGIN
					EXEC sp_CF_Nuevos @FechaConsulta, @FechaConsulta					
					EXEC sp_CF_Usados @FechaConsulta, @FechaConsulta					
					EXEC sp_CF_RepuestosRemisiones @FechaConsulta, @FechaConsulta					
					EXEC sp_CF_RepuestosStock @FechaConsulta, @FechaConsulta					
					EXEC sp_CF_RepuestosTraslados @FechaConsulta, @FechaConsulta					
					EXEC sp_CF_Repuestos @FechaConsulta, @FechaConsulta					
					EXEC sp_CF_TallerColision @FechaConsulta, @FechaConsulta					
					EXEC sp_CF_TallerMecanica @FechaConsulta, @FechaConsulta					
					EXEC sp_CF_Taller @FechaConsulta, @FechaConsulta					
					EXEC sp_CF_Cartera @FechaConsulta, @FechaConsulta					
					EXEC sp_CF_BonosFabrica @FechaConsulta, @FechaConsulta					
					EXEC sp_CF_ActivosFijos @FechaConsulta, @FechaConsulta					
					EXEC sp_CF_AnticiposProveedores @FechaConsulta, @FechaConsulta				
					EXEC sp_CF_AnticiposEmpleados @FechaConsulta, @FechaConsulta						
					EXEC sp_CF_AnticiposViaticos @FechaConsulta, @FechaConsulta					
					EXEC sp_CF_Diferidos @FechaConsulta, @FechaConsulta						
					EXEC sp_CF_OtrosActivosDerechos @FechaConsulta, @FechaConsulta					
					EXEC sp_CF_TotalSumaActivos @FechaConsulta, @FechaConsulta					
					EXEC sp_CF_AnticiposRecibidos @FechaConsulta, @FechaConsulta					
					EXEC sp_CF_Estructura_CXP @FechaConsulta, @FechaConsulta					
					EXEC sp_CF_CXP_Bancos @FechaConsulta, @FechaConsulta					
					EXEC sp_CF_CXP_Fabricas @FechaConsulta, @FechaConsulta					
					EXEC sp_CF_CXP_NCFabricas @FechaConsulta, @FechaConsulta				
					EXEC sp_CF_CXP_Otros @FechaConsulta, @FechaConsulta			
					EXEC sp_CF_CuentasXPagar @FechaConsulta, @FechaConsulta						
					EXEC sp_CF_PasivosLaborales @FechaConsulta, @FechaConsulta				
					EXEC sp_CF_PasivosImpuestos @FechaConsulta, @FechaConsulta	
					EXEC sp_CF_AporteCapital @FechaConsulta, @FechaConsulta				
					EXEC sp_CF_TotalSumaPasivos @FechaConsulta, @FechaConsulta				
					EXEC sp_CF_Uso @FechaConsulta, @FechaConsulta				
					EXEC sp_CF_CFC @FechaConsulta, @FechaConsulta				
					EXEC sp_CF_CFCMasCostoPM @FechaConsulta, @FechaConsulta					
					EXEC sp_CF_CFCMesAnterior @FechaConsulta, @FechaConsulta				
					EXEC sp_CF_Diferencia @FechaConsulta, @FechaConsulta	
				END
			END TRY

			BEGIN CATCH
				BEGIN
					SELECT
							ErrorNumber		= ERROR_NUMBER(),
							ErrorSeverity	= ERROR_SEVERITY(),
							ErrorState		= ERROR_STATE(),
							ErrorProcedure	= 'Procedimiento Almacenado: ' + ERROR_PROCEDURE(),
							ErrorLine		= ERROR_LINE(),
							ErrorMessage	= 'Sincronización General: ' + ERROR_MESSAGE(),
							ErrorResult		= 'ERROR: Error en la ejecución del costo financiero',
							ErrorLog = 1
					ROLLBACK TRAN
					RETURN
				END
			END CATCH
			----- FIN ----- EXCEPCION PARA EJECUTAR LOS PROCEDIMIENTOS DEL CFC --------



			----- CONFIRMAR TODOS LOS CAMBIOS SI NO OCURREN ERRORES -----
			COMMIT TRAN



			----- RETORNO SI TODAS LOS PROCEDIMIENTOS SE EJECUTAN CORRECTAMENTE --------
			SELECT ErrorNumber = 0, ErrorSeverity = 0, ErrorState = 0, ErrorProcedure = '', ErrorLine = 0, ErrorMessage = 'Sin Errores', ErrorResult = 'Sin Errores', ErrorLog = 2
			RETURN 

		END

	ELSE 
		BEGIN
			-- Construir mensaje de variables en cero
			IF @data_SpigaActivosFijos = 0 SET @Mensaje = @Mensaje + 'SpigaActivosFijos, ';
			IF @data_SpigaAnticiposClientes = 0 SET @Mensaje = @Mensaje + 'SpigaAnticiposClientes, ';
			IF @data_SpigaCartera = 0 SET @Mensaje = @Mensaje + 'SpigaCartera, ';
			IF @data_SpigaCuentasPorPagar = 0 SET @Mensaje = @Mensaje + 'SpigaCuentasPorPagar, ';
			IF @data_SpigaEmpleados = 0 SET @Mensaje = @Mensaje + 'SpigaEmpleados, ';
			IF @data_SpigaHojasDeGastosPendientes = 0 SET @Mensaje = @Mensaje + 'SpigaHojasDeGastosPendientes, ';
			IF @data_SpigaInventarioVN = 0 SET @Mensaje = @Mensaje + 'SpigaInventarioVN, ';
			IF @data_SpigaInventarioVO = 0 SET @Mensaje = @Mensaje + 'SpigaInventarioVO, ';
			IF @data_SpigaOrdenesDeTrabajoAbiertas = 0 SET @Mensaje = @Mensaje + 'SpigaOrdenesDeTrabajoAbiertas, ';
			IF @data_SpigaOrdenesDeTrabajoCerradas = 0 SET @Mensaje = @Mensaje + 'SpigaOrdenesDeTrabajoCerradas, ';
			IF @data_SpigaRecibosAnticiposReaprovechados = 0 SET @Mensaje = @Mensaje + 'SpigaRecibosAnticiposReaprovechados, ';
			IF @data_SpigaRemisionesDeVentasSinFacturar = 0 SET @Mensaje = @Mensaje + 'SpigaRemisionesDeVentasSinFacturar, ';
			IF @data_SpigaTerceros = 0 SET @Mensaje = @Mensaje + 'SpigaTerceros, ';
			IF @data_SpigaTrasladosDeRepuestosPendientes = 0 SET @Mensaje = @Mensaje + 'SpigaTrasladosDeRepuestosPendientes, ';
			IF @data_SpigaStockrepuestos = 0 SET @Mensaje = @Mensaje + 'SpigaStockrepuestos, ';
			IF @data_SpigaContabilidadMovimientos_Act = 0 SET @Mensaje = @Mensaje + 'SpigaContabilidadMovimientos_Act, ';
			IF @data_SpigaContabilidadMovimientos_Ant = 0 SET @Mensaje = @Mensaje + 'SpigaContabilidadMovimientos_Ant , ';

			-- Retirar la última coma y espacio del mensaje
			IF LEN(@Mensaje) > 0 
				SET @Mensaje = LEFT(@Mensaje, LEN(@Mensaje) - 2);

			SELECT	ErrorNumber = 0,			ErrorSeverity = 0,				ErrorState = 0, 
					ErrorProcedure = 'Sincronizaciones PSCServices',			ErrorLine = 0, 
					ErrorMessage = 'No se encontraron los registros en la tabla Spiga_Tasks de las sincronizaciones: ' + @Mensaje + '.', 
					ErrorResult = 'Falta la sincronización de una o varias tareas del PSCServices, por favor verificar que se hayan sincronizado.', ErrorLog = 3
			RETURN
		END

END

```
