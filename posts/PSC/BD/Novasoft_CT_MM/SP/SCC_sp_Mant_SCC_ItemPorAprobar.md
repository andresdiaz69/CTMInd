# Stored Procedure: SCC_sp_Mant_SCC_ItemPorAprobar

## Usa los objetos:
- [[SCC_ItemPorAprobar]]

```sql
-- =============================================
-- Author:		David Andres Galindo
-- Create date:	Diciembre 2.015
-- Description:	Realiza las diferentes operaciones (Inserta, Elimina, Actualiza y Consulta)
--				En la tabla SCC_sp_Mant_SCC_ItemPorAprobar
-- Cadena Ejecución SCC_sp_Mant_SCC_ItemPorAprobar 3,
-- =============================================
CREATE PROCEDURE [dbo].[SCC_sp_Mant_SCC_ItemPorAprobar]
	@Tran                         INT,
	@Nro_FormatoPorAprobar        INT,
	@Nro_Item                     INT,
	@Analisis                     VARCHAR(MAX),
	@Esfuerzo_Estimado_Desarrollo NUMERIC(8, 2),
	@Estado                       TINYINT,
	@Cod_Usu_Responsable          SYSNAME,
	@Evaluadores                  VARCHAR(MAX),
	@Fecha_Evaluacion             DATE,
	@Fecha_Estimada               DATE,
	@cod_apl                      CHAR(3),
	@linea                        VARCHAR(3)
AS
BEGIN
    SET NOCOUNT ON;
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
    DECLARE @Mensaje NVARCHAR(500);
    DECLARE @ErrorMessage NVARCHAR(4000);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;
   DECLARE @Nro_SCC VARCHAR(15);
   
    IF @Tran = 1 /**Inserta los datos en la tabla**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN INSERTA;
		  --INSERT INTO SCC_ItemPorAprobar(	Fecha_Recibido
		  --								,Nro_SCC
		  --								,Tipo_SCC
		  --								,Cod_apl
		  --								,Cod_linea
		  --								,ter_nit
		  --								,Cod_usu_Solicitante
		  --								,NroFormatoRelacionado)
		  --VALUES (@Fecha_Recibido
		  --	   ,@Nro_SCC
		  --	   ,@Tipo_SCC
		  --	   ,@Cod_apl
		  --	   ,@Cod_linea
		  --	   ,@ter_nit
		  --	   ,@Cod_usu_Solicitante
		  --	   ,@NroFormatoRelacionado)
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

		  UPDATE SCC_ItemPorAprobar
		    SET Analisis = @Analisis,
			   Cod_Usu_Responsable = @Cod_Usu_Responsable,
			   Esfuerzo_Estimado_Desarrollo = @Esfuerzo_Estimado_Desarrollo,
			   Estado = @Estado,
			   Evaluadores = @Evaluadores,
			   Fecha_Evaluacion = @Fecha_Evaluacion,
			   Fecha_Estimada = @Fecha_Estimada,
			   Cod_Apl = @cod_apl,
			   Cod_Linea = @linea
		  WHERE Nro_FormatoPorAprobar = @Nro_FormatoPorAprobar AND Nro_Item = @Nro_Item;

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

		  DELETE FROM SCC_ItemPorAprobar
		  WHERE Nro_FormatoPorAprobar = @Nro_FormatoPorAprobar AND Nro_Item = @Nro_Item;
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

    IF @Tran = 4 /**Consulta los datos en la tabla **/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN CONSULTA;

		  SELECT IPA.Cod_Usu_Responsable,
			    IPA.Estado,
			    IPA.Fecha_Estimada,
			    IPA.Cod_Apl AS Aplicacion,
			    IPA.Cod_Linea AS Linea
		  FROM SCC_ItemPorAprobar AS IPA
		  WHERE Nro_FormatoPorAprobar = @Nro_FormatoPorAprobar AND Nro_Item = @Nro_Item;

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
