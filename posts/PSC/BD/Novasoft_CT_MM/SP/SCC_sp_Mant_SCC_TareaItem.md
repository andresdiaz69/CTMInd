# Stored Procedure: SCC_sp_Mant_SCC_TareaItem

## Usa los objetos:
- [[fn_SCC_Calculo_Esfuerzo_Item]]
- [[fn_SCC_Consecutivo]]
- [[SCC_Cabeza]]
- [[SCC_ITEM]]
- [[SCC_Tarea_responsable]]
- [[SCC_TareaItem]]
- [[SCC_Tramite_Solicitud]]

```sql
-- =============================================
-- Author:		Angélica Maricela Garcia Galvis
-- Create date:	Noviembre 2015
-- Description:	Realiza las diferentes operaciones (Inserta, Elimina, Actualiza y Consulta)
--				En la tabla SCC_TareaItem
-- =============================================
CREATE PROCEDURE [dbo].[SCC_sp_Mant_SCC_TareaItem]
	@Tran                TINYINT, /* 1-INSERTA, 2-ACTUALIZA,3-ELIMINA,4-CONSULTA*/
	@Nro_Formato         INT,
	@Nro_Item            INT,
	@Nro_Tarea           INT           = NULL,
	@Descripcion_Tarea   VARCHAR(MAX),
	@EsfuerzoEstimado    NUMERIC(8, 2),
	@EsfuerzoReal        NUMERIC(8, 2),
	@EstadoTarea         TINYINT,
	@Cod_Usu_responsable SYSNAME,
	@Fecha_inicio        DATETIME,
	@Fecha_Fin           DATETIME,
	@Cod_Tarea           VARCHAR(15)
AS
BEGIN
    SET NOCOUNT ON;
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
    DECLARE @Mensaje NVARCHAR(500);
    DECLARE @ErrorMessage NVARCHAR(4000);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    IF @Tran = 1 /**Inserta los datos en la tabla**/
    BEGIN
	   BEGIN TRY
		  SELECT @Nro_Tarea = dbo.fn_SCC_Consecutivo( 'T', @Nro_Formato, @Nro_Item, 0 );

		  BEGIN TRAN INSERTA;
		  INSERT INTO SCC_TareaItem( Nro_Formato,
							    Nro_Item,
							    Nro_Tarea,
							    Descripcion_Tarea,
							    EsfuerzoEstimado,
							    EsfuerzoReal,
							    EstadoTarea,
							    Cod_Usu_responsable,
							    Fecha_inicio,
							    Fecha_Fin
							  )
		  VALUES
			    (
			    @Nro_Formato, @Nro_Item, @Nro_Tarea, @Descripcion_Tarea, @EsfuerzoEstimado, @EsfuerzoReal, @EstadoTarea, @Cod_Usu_responsable,
			    @Fecha_inicio, @Fecha_Fin );

		  INSERT INTO SCC_Tarea_responsable( Nro_Formato,
									  Nro_Item,
									  Nro_Tarea,
									  Cod_Usu_responsable,
									  Consecutivo,
									  Estadotarea,
									  Esfuerzo_Real,
									  Fecha_inicio,
									  Fecha_Fin
									)
		  VALUES
			    (
			    @Nro_Formato, @Nro_Item, @Nro_Tarea, @Cod_Usu_responsable, dbo.fn_SCC_Consecutivo( 'TR', @Nro_Formato, @Nro_Item, @Nro_Tarea ), 2,
			    @EsfuerzoReal, GETDATE(), @Fecha_Fin );

		  UPDATE SCC_ITEM
		    SET EsfuerzoTotal = dbo.fn_SCC_Calculo_Esfuerzo_Item( @Nro_Formato, @Nro_Item )
		  WHERE Nro_Formato = @Nro_Formato AND Nro_item = @Nro_Item;

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
			 COMMIT TRANSACTION
		  END;
	   END CATCH;
    END;
    IF @Tran = 2 /**Actualiza los datos en la tabla**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN ACTUALIZA;

		  UPDATE SCC_TareaItem
		    SET		--Nro_Formato=@Nro_Formato,
		  --Nro_Item = @Nro_Item ,
		  --Nro_Tarea= @Nro_Tarea , 
		  Descripcion_Tarea = LTRIM(@Descripcion_Tarea),
		  EsfuerzoReal = @EsfuerzoReal,
		  EstadoTarea = @EstadoTarea,
		  Cod_Usu_responsable = @Cod_Usu_responsable,
		  Fecha_Fin = @Fecha_Fin
		  WHERE Nro_Formato = @Nro_Formato AND Nro_Item = @Nro_Item AND Nro_Tarea = @Nro_Tarea;

		  UPDATE SCC_ITEM
		    SET EsfuerzoTotal = dbo.fn_SCC_Calculo_Esfuerzo_Item( @Nro_Formato, @Nro_Item )
		  WHERE Nro_Formato = @Nro_Formato AND Nro_item = @Nro_Item;

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

		  DELETE FROM SCC_TareaItem
		  WHERE Nro_Formato = @Nro_Formato AND Nro_Item = @Nro_Item AND Nro_Tarea = @Nro_Tarea;

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

    IF @Tran = 4 /**Consulta los datos en la tabla**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN CONSULTA;

		  SELECT TI.Nro_Formato,
			    TI.Nro_Item,
			    TI.Nro_Tarea,
			    TI.Descripcion_Tarea,
			    TI.EsfuerzoEstimado,
			    TI.EsfuerzoReal,
			    TI.EstadoTarea,
			    TI.Cod_Usu_responsable,
			    TI.Fecha_inicio,
			    TI.Fecha_Fin,
			    TS.Descripcion,
			    CA.Nro_SCC
		  FROM SCC_TareaItem AS TI
		  INNER JOIN SCC_Tramite_Solicitud AS TS ON TI.EstadoTarea = TS.Ind_tramite
		  INNER JOIN SCC_Cabeza AS CA ON CA.Nro_Formato = TI.Nro_Formato
		  WHERE TI.Nro_Formato = @Nro_Formato AND Nro_Item = @Nro_Item;

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
    IF @Tran = 5 /**Consulta los datos en la tabla modo edicion**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN CONSULTA_EDICION;

		  SELECT EstadoTarea,
			    Fecha_inicio,
			    Fecha_Fin,
			    Descripcion_Tarea
		  FROM SCC_TareaItem
		  WHERE Nro_Formato = @Nro_Formato AND Nro_Item = @Nro_Item AND Nro_Tarea = @Nro_Tarea;

		  COMMIT TRAN CONSULTA_EDICION;
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
		  ROLLBACK TRAN CONSULTA_EDICION;
	   END CATCH;
    END;

END;

```
