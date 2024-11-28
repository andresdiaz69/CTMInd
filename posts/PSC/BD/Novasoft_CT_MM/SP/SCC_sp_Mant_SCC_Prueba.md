# Stored Procedure: SCC_sp_Mant_SCC_Prueba

## Usa los objetos:
- [[SCC_Prueba]]

```sql
-- =============================================
-- Author:		Angélica Maricela Garcia Galvis
-- Create date:	Noviembre 2015
-- Description:	Realiza las diferentes operaciones (Inserta, Elimina, Actualiza y Consulta)
--				En la tabla SCC_PlanDePruebas
-- =============================================
CREATE PROCEDURE [dbo].[SCC_sp_Mant_SCC_Prueba]
	@Tran                TINYINT, /* 1-INSERTA, 2-ACTUALIZA,3-ELIMINA,4-CONSULTA*/
	@Nro_Formato         INT,
	@Nro_item            INT,
	@Nro_Prueba          INT,
	@Descripcion         VARCHAR(MAX),
	@Estado              TINYINT,
	@Cod_Usu_Responsable SYSNAME,
	@Fecha_Asignacion    DATE,
	@Fecha_terminada     DATE,
	@Cod_PlanPrueba      INT
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
		  BEGIN TRAN INSERTA;
		  INSERT INTO SCC_Prueba( Nro_Formato,
							 Nro_item,
							 Nro_Prueba,
							 Descripcion,
							 Estado,
							 Cod_Usu_Responsable,
							 Fecha_Asignacion,
							 Fecha_terminada,
							 Cod_PlanPrueba
						    )
		  VALUES
			    (
			    @Nro_Formato, @Nro_item, @Nro_Prueba, @Descripcion, @Estado, @Cod_Usu_Responsable, @Fecha_Asignacion, @Fecha_terminada,
			    @Cod_PlanPrueba );

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

		  UPDATE SCC_Prueba
		    SET Descripcion = @Descripcion,
			   Estado = @Estado,
			   Cod_Usu_Responsable = @Cod_Usu_Responsable,
			   Fecha_Asignacion = @Fecha_Asignacion,
			   Fecha_terminada = @Fecha_terminada,
			   Cod_PlanPrueba = @Cod_PlanPrueba
		  WHERE Nro_Formato = @Nro_Formato AND Nro_item = @Nro_item AND Nro_Prueba = @Nro_Prueba;
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

		  DELETE FROM SCC_Prueba
		  WHERE Nro_Formato = @Nro_Formato AND Nro_item = @Nro_item AND Nro_Prueba = @Nro_Prueba;

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

		  SELECT Nro_Formato,
			    Nro_item,
			    Nro_Prueba,
			    Descripcion,
			    Estado,
			    Cod_Usu_Responsable,
			    Fecha_Asignacion,
			    Fecha_terminada,
			    Cod_PlanPrueba
		  FROM SCC_Prueba
		  WHERE Nro_Formato = @Nro_Formato AND Nro_item = @Nro_item;
		  --AND Nro_Prueba=@Nro_Prueba 
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
END;

```
