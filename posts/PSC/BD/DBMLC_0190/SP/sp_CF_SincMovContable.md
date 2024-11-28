# Stored Procedure: sp_CF_SincMovContable

## Usa los objetos:
- [[sp_CF_AnticiposViaticos]]
- [[sp_CF_AporteCapital]]
- [[sp_CF_BonosFabrica]]
- [[sp_CF_CFC]]
- [[sp_CF_CFCMasCostoPM]]
- [[sp_CF_Diferencia]]
- [[sp_CF_Diferidos]]
- [[sp_CF_OtrosActivosDerechos]]
- [[sp_CF_PasivosImpuestos]]
- [[sp_CF_PasivosLaborales]]
- [[sp_CF_TotalSumaActivos]]
- [[sp_CF_TotalSumaPasivos]]
- [[sp_CF_Uso]]

```sql
CREATE PROC [dbo].[sp_CF_SincMovContable](
	@Fecha DATE
) AS
BEGIN 
	-- =============================================
	-- Control de Cambios
	-- 2024|09|10 - ALEXIS - Se anexan las validaciones try y catch para el retorno de errores
	-- =============================================


	--DECLARE @Fecha DATE; 
	--SET @Fecha = '20240906'

	SET NOCOUNT ON 
	SET FMTONLY OFF

	DECLARE @FechaIngreso DATE, @fechaConsulta DATE;
	SET @FechaIngreso = DATEADD(DAY,-1,@Fecha);
	SET @fechaConsulta = DATEADD(DAY,-1,@Fecha);


	----- INICIAR LA SECUENCIA BEGIN PARA REVERTIR CAMBIOS SI SUCEDE ALGUN CONFLICTO -----
	BEGIN TRAN
		


	---- INICIO --- EXCEPCION PARA EJECUTAR LOS PROCEDIMIENTOS DEL CFC --------
	BEGIN TRY
		BEGIN

			EXEC sp_CF_BonosFabrica @fechaConsulta, @FechaIngreso
			EXEC sp_CF_AnticiposViaticos @fechaConsulta, @FechaIngreso
			EXEC sp_CF_Diferidos @fechaConsulta, @FechaIngreso
			EXEC sp_CF_OtrosActivosDerechos @fechaConsulta, @FechaIngreso
			EXEC sp_CF_TotalSumaActivos @fechaConsulta, @FechaIngreso
			EXEC sp_CF_PasivosLaborales @fechaConsulta, @FechaIngreso
			EXEC sp_CF_PasivosImpuestos @fechaConsulta, @FechaIngreso
			EXEC sp_CF_AporteCapital @fechaConsulta, @FechaIngreso
			EXEC sp_CF_TotalSumaPasivos @fechaConsulta, @FechaIngreso
			EXEC sp_CF_Uso @fechaConsulta, @FechaIngreso
			EXEC sp_CF_CFC @fechaConsulta, @FechaIngreso
			EXEC sp_CF_CFCMasCostoPM @fechaConsulta, @FechaIngreso
			EXEC sp_CF_Diferencia @fechaConsulta, @FechaIngreso

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
					ErrorMessage	= 'Sincronización Contabilidad: ' + ERROR_MESSAGE(),
					ErrorResult		= 'ERROR: Error en la sincronización de la contabilidad del costo financiero',
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

```
