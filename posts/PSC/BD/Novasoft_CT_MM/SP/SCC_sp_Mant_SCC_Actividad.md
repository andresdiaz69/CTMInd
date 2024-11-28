# Stored Procedure: SCC_sp_Mant_SCC_Actividad

## Usa los objetos:
- [[fn_SCC_Consecutivo]]
- [[SCC_Actividad]]
- [[SCC_Cabeza]]
- [[SCC_Item]]
- [[SCC_TareaItem]]
- [[SCC_Tramite_Solicitud]]

```sql
-- =============================================
-- Author:		Angélica Maricela Garcia Galvis
-- Create date:	Febrero 2.018
-- Description:	Realiza las diferentes operaciones (Inserta, Elimina, Actualiza y Consulta)
--				En la tabla SCC_Actividad
-- =============================================
CREATE PROCEDURE [dbo].[SCC_sp_Mant_SCC_Actividad]
	@Tran                TINYINT, /* 1-INSERTA, 2-ACTUALIZA,3-ELIMINA,4-CONSULTA*/
	@Nro_Formato         INT,
	@Nro_Item            INT,
	@Nro_Tarea           INT,
	@Actividad           VARCHAR(MAX),
	@Fecha_Actividad     DATETIME,
	@Cod_Usu_responsable SYSNAME,
	@No_Actividad        INT          = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

    DECLARE @Mensaje NVARCHAR(500);
    DECLARE @ErrorMessage NVARCHAR(4000);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;
    DECLARE @Nro_Actividad INT;

    IF @Tran = 1 /**Inserta los datos en la tabla**/
    BEGIN
	   BEGIN TRY
		  SELECT @Nro_Actividad = dbo.fn_SCC_Consecutivo( 'A', @Nro_Formato, @Nro_Item, @Nro_Tarea );

		  BEGIN TRAN INSERTA;
		  INSERT INTO SCC_Actividad( Nro_Formato,
							    Nro_Item,
							    Nro_Tarea,
							    Nro_Actividad,
							    Actividad,
							    Fecha_Actividad,
							    Cod_usu_responsable
							  )
		  VALUES
			    (
			    @Nro_Formato, @Nro_Item, @Nro_Tarea, @Nro_Actividad, @Actividad, @Fecha_Actividad, @Cod_usu_responsable );

		  IF XACT_STATE() = 1
		  BEGIN
			 COMMIT TRAN INSERTA;
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
			 ROLLBACK TRAN INSERTA;
		  END;
		  IF XACT_STATE() = 1
		  BEGIN
			 COMMIT TRANSACTION;
		  END;
	   END CATCH;
    END;
    IF @Tran = 2 /**Actualiza los datos en la tabla**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN ACTUALIZA;

		  UPDATE SCC_Actividad
		    SET Actividad = @Actividad,
			   Fecha_Actividad = @Fecha_Actividad,
			   Cod_usu_responsable = @Cod_Usu_responsable
		  WHERE Nro_Formato = @Nro_Formato
			   AND Nro_Item = @Nro_Item
			   AND Nro_Tarea = @Nro_Tarea
			   AND Nro_Actividad = @No_Actividad;

		  COMMIT TRAN ACTUALIZA;
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

		  ROLLBACK TRAN ACTUALIZA;
	   END CATCH;
    END;
    IF @Tran = 3 /**Elimina los datos en la tabla**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN ELIMINA;

		  DELETE FROM SCC_Actividad
		  WHERE Nro_Formato = @Nro_Formato
			   AND Nro_Item = @Nro_Item
			   AND Nro_Tarea = @Nro_Tarea
			   AND Nro_Actividad = @No_Actividad;

		  COMMIT TRAN ELIMINA;
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
		  ROLLBACK TRAN ELIMINA;
	   END CATCH;
    END;

    IF @Tran = 4/**Consulta los datos en la tabla**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN CONSULTA;

		  SELECT Nro_Formato,
			    Nro_Item,
			    Nro_Tarea,
			    Nro_Actividad,
			    Actividad,
			    Fecha_Actividad,
			    Cod_usu_responsable
		  FROM SCC_Actividad AS com
		  WHERE Nro_Formato = @Nro_Formato AND Nro_Item = @Nro_Item AND Nro_Tarea = @Nro_Tarea;
		  --AND Nro_Actividad = @Nro_Actividad;
		  COMMIT TRAN CONSULTA;
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
		  ROLLBACK TRAN CONSULTA;
	   END CATCH;
    END;

    IF @Tran = 5/**Consulta los datos en la tabla**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN CONSULTA_CAB;

		  SELECT Nro_SCC,
			    TR.Descripcion AS EstadoSolicitud,
			    TI.Descripcion_Tarea
		  FROM SCC_Cabeza AS CAB
		  INNER JOIN SCC_Item AS IT ON CAB.Nro_Formato = IT.Nro_Formato
		  INNER JOIN SCC_Tramite_Solicitud AS TR ON CAB.Ind_tramite = TR.Ind_tramite
		  INNER JOIN SCC_TareaItem AS TI ON TI.Nro_Formato = IT.Nro_Formato AND TI.Nro_Item = IT.Nro_item
		  WHERE cab.Nro_Formato = @Nro_Formato
			   AND TI.Nro_Item = @Nro_Item
			   AND Nro_Tarea = @Nro_Tarea;
		  --AND Nro_Actividad = @Nro_Actividad;
		  COMMIT TRAN CONSULTA_CAB;
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
		  ROLLBACK TRAN CONSULTA_CAB;
	   END CATCH;
    END;

END;

```
