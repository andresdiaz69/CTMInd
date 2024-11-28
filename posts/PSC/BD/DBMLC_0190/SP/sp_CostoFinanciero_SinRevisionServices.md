# Stored Procedure: sp_CostoFinanciero_SinRevisionServices

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

```sql
CREATE PROC [dbo].[sp_CostoFinanciero_SinRevisionServices] (
	@Fecha DATE
) AS
BEGIN 
	-- =============================================
	-- Control de Cambios
	-- 2024|09|11 - ALEXIS - Se anexan las validaciones try y catch para el retorno de errores
	-- =============================================


	--DECLARE @Fecha DATE; 
	--SET @Fecha = '20240906'

	SET NOCOUNT ON 
	SET FMTONLY OFF



	DECLARE	@FechaIngreso DATE, @fechaConsulta DATE;
	SET @FechaIngreso = DATEADD(DAY,-1,@Fecha);	
	SET @FechaConsulta = DATEADD(DAY,-1,@Fecha);

		
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

```
