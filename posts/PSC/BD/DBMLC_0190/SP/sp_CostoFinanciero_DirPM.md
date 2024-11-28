# Stored Procedure: sp_CostoFinanciero_DirPM

## Usa los objetos:
- [[sp_CF_CFCMasCostoPM]]
- [[sp_CF_CFCMesAnterior]]
- [[sp_CF_CostoDirPM]]
- [[sp_CF_Diferencia]]

```sql
CREATE PROC [dbo].[sp_CostoFinanciero_DirPM] (
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
	

	----- INICIAR LA SECUENCIA BEGIN PARA REVERTIR CAMBIOS SI SUCEDE ALGUN CONFLICTO -----
	BEGIN TRAN
		


	---- INICIO --- EXCEPCION PARA EJECUTAR LOS PROCEDIMIENTOS DEL CFC --------
	BEGIN TRY
		BEGIN

			EXEC sp_CF_CostoDirPM @Fecha, @Fecha
			EXEC sp_CF_CFCMasCostoPM @Fecha, @Fecha
			EXEC sp_CF_CFCMesAnterior @Fecha, @Fecha
			EXEC sp_CF_Diferencia @Fecha, @Fecha

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
					ErrorMessage	= 'Sincronización Costo Dir PM: ' + ERROR_MESSAGE(),
					ErrorResult		= 'ERROR: Error en la ejecución del Costo Dir.PM del costo financiero',
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
