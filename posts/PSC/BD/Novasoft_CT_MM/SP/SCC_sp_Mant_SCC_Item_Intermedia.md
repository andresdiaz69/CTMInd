# Stored Procedure: SCC_sp_Mant_SCC_Item_Intermedia

## Usa los objetos:
- [[fn_SCC_Consecutivo]]
- [[SCC_Item_intermedia]]
- [[SCC_Tramite_Solicitud]]

```sql
-- =============================================
-- Author:		David Galindo Leiva
-- Create date:	Diciembre 2015
-- Description:	Realiza las diferentes operaciones (Inserta, Elimina, Actualiza y Consulta)
--				En la tabla SCC_Item_intermedia
-- =============================================
CREATE PROCEDURE [dbo].[SCC_sp_Mant_SCC_Item_Intermedia]
	@Tran                         TINYINT, /* 1-INSERTA, 2-ACTUALIZA,3-ELIMINA,4-CONSULTA*/
	@Nro_FormatoPorAprobar        INT,
	@Nro_Item                     INT,
	@Cod_Apl                      CHAR(3),
	@Cod_Linea                    VARCHAR(3),
	@Descripcion                  VARCHAR(MAX),
	@Analisis                     VARCHAR(MAX),
	@Cod_Usu_Responsable          SYSNAME,
	@Esfuerzo_Estimado_Desarrollo NUMERIC(8, 2),
	@Estado                       TINYINT,
	@Claro                        BIT,
	@trazable                     BIT,
	@consistente                  BIT,
	@completo                     BIT,
	@Evaluadores                  VARCHAR(500),
	@usuario                      SYSNAME,
	@ID                           BIGINT,
	@Fecha_Evaluacion             DATE
AS
BEGIN
    SET NOCOUNT ON;
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

    DECLARE @ErrorMessage NVARCHAR(4000);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;
    DECLARE @Item INT;

    IF @Tran = 1 /**Inserta los datos en la tabla**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN INSERTA;

		  SELECT @Item = Dbo.fn_SCC_Consecutivo( 'IPA', 0, 0, 0 );

		  INSERT INTO SCC_Item_intermedia( Nro_FormatoPorAprobar,
									Nro_Item,
									Cod_Apl,
									Cod_Linea,
									Descripcion,
									Analisis,
									Cod_Usu_Responsable,
									Esfuerzo_Estimado_Desarrollo,
									Estado,
									Claro,
									trazable,
									consistente,
									completo,
									Evaluadores,
									usuario,
									Fecha_Evaluacion
								   )
		  VALUES
			    (
			    @Nro_FormatoPorAprobar, @Item, @Cod_Apl, @Cod_Linea, @Descripcion, @Analisis, @Cod_Usu_Responsable, @Esfuerzo_Estimado_Desarrollo,
			    @Estado, @Claro, @trazable, @consistente, @completo, @Evaluadores, @usuario, @Fecha_Evaluacion );

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

		  UPDATE SCC_Item_intermedia
		    SET Descripcion = @Descripcion,
			   Cod_Apl = @Cod_Apl,
			   Cod_Linea = @Cod_Linea,
			   Fecha_Evaluacion = @Fecha_Evaluacion
		  WHERE ID = @ID AND usuario = @usuario;

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

		  DELETE FROM SCC_Item_intermedia
		  WHERE ID = @ID AND usuario = @usuario;

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

		  SELECT ID,
			    usuario,
			    Nro_FormatoPorAprobar,
			    Nro_Item,
			    Cod_Apl AS Aplicacion,
			    Cod_Linea AS Linea,
			    item.Descripcion,
			    tra.Descripcion AS Estado,
			    Item.Fecha_Evaluacion
		  FROM SCC_Item_intermedia AS item
		  INNER JOIN SCC_Tramite_Solicitud AS tra ON item.Estado = tra.Ind_tramite
		  WHERE usuario = @usuario;

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

    IF @Tran = 5 /**Elimina datos al procesar**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN ELIMINA;

		  DELETE FROM SCC_Item_intermedia
		  WHERE usuario = @usuario;

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

    IF @Tran = 6 /**Consulta los datos en la tabla para editar un campo**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN CONSULTA;

		  SELECT ID,
			    usuario,
			    Nro_FormatoPorAprobar,
			    Nro_Item,
			    Cod_Apl AS Aplicacion,
			    Cod_Linea AS Linea,
			    Descripcion,
			    Fecha_Evaluacion
		  FROM SCC_Item_intermedia
		  WHERE usuario = @usuario AND ID = @ID;

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
