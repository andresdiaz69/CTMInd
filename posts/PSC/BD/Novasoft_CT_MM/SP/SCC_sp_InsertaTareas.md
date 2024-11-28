# Stored Procedure: SCC_sp_InsertaTareas

## Usa los objetos:
- [[SCC_Cabeza]]
- [[SCC_ParamTarea]]
- [[SCC_Tarea_responsable]]
- [[SCC_TareaItem]]

```sql
CREATE PROCEDURE [dbo].[SCC_sp_InsertaTareas]
	@Nro_Formato INT,
	@Nro_Item    INT,
	@Cod_proceso VARCHAR(15)
AS
BEGIN

    DECLARE @ErrorMessage NVARCHAR(4000);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;
    DECLARE @Tipo_SCC INT

    BEGIN TRY
	   BEGIN TRAN INSERTA;

	   SELECT @Tipo_SCC = Tipo_Scc
	   FROM SCC_Cabeza 
	   WHERE Nro_Formato = @Nro_Formato

	   INSERT INTO SCC_TareaItem (Nro_Formato,Nro_Item, Nro_Tarea,Cod_Tarea,Descripcion_Tarea,EsfuerzoEstimado,EstadoTarea,Fecha_inicio,Cod_Usu_responsable)
	   SELECT @Nro_Formato AS Nro_Formato,
			@Nro_Item AS Nro_Item,
			ROW_NUMBER() OVER(ORDER BY Cod_tarea) AS Nro_Tarea,
			Cod_tarea,
			Descripcion_Tarea,
			Nro_horas_estimadas,
			0,
			GETDATE(),
			''
	   FROM SCC_ParamTarea
	   WHERE Cod_Proceso = @Cod_proceso

	   INSERT INTO SCC_Tarea_responsable(Nro_Formato,Nro_Item, Nro_Tarea,Cod_Usu_responsable,Consecutivo,EstadoTarea,Fecha_inicio)
	   SELECT TI.Nro_Formato,TI.Nro_Item, TI.Nro_Tarea,PT.Responsable_Tarea,ROW_NUMBER() OVER(ORDER BY TI.Cod_tarea) AS Nro_Tarea,2,GETDATE()
	   FROM SCC_TareaItem AS TI
	   INNER JOIN SCC_ParamTarea AS PT ON TI.Cod_Tarea = PT.Cod_Tarea
	   WHERE TI.Nro_Formato= @Nro_Formato AND TI.Nro_Item = @Nro_Item

	   IF XACT_STATE() = 1
	   BEGIN
		  COMMIT TRAN INSERTA
	   END;
    END TRY
    BEGIN CATCH
	   SELECT @ErrorMessage = ERROR_MESSAGE(),
			@ErrorSeverity = ERROR_SEVERITY(),
			@ErrorState = ERROR_STATE();
-- Uso de Raiserror para la descripción del error presentado en este bloque 
	   RAISERROR(@ErrorMessage, -- Texto de Mensaje
	   @ErrorSeverity, -- Severidad
	   @ErrorState -- Estado
	   );

	   IF XACT_STATE() <> 0
	   BEGIN
		  ROLLBACK TRAN INSERTA
	   END;
	   IF XACT_STATE() = 1
	   BEGIN
		  COMMIT TRAN INSERTA
	   END;
    END CATCH;

END;

```
