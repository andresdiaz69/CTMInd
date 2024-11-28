# Stored Procedure: SCC_sp_Mant_SCC_FrmValidaCierre

## Usa los objetos:
- [[fn_SCC_Calculo_Esfuerzo_Item]]
- [[fn_SCC_Nro_SCC]]
- [[SCC_Actividad]]
- [[SCC_Cabeza]]
- [[SCC_ITEM]]

```sql

-- =============================================
-- Author:		Angélica Maricela Garcia Galvis
-- Create date:	Abril 2018
-- Description:	Realiza las diferentes operaciones (Inserta, Elimina, Actualiza y Consulta)
--				En la tabla SCC_TareaItem
--Cadena Ejecución: SCC_sp_Mant_SCC_FrmValidaCierre 1,1,1,'DDD'
-- =============================================
CREATE PROCEDURE [dbo].[SCC_sp_Mant_SCC_FrmValidaCierre]
	@Tran              TINYINT, /* 1-INSERTA, 2-ACTUALIZA,3-ELIMINA,4-CONSULTA*/
	@Nro_Formato       INT,
	@Nro_item          INT,
	@DescripcionCierre VARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

    DECLARE @Mensaje NVARCHAR(500);
    DECLARE @ErrorMessage NVARCHAR(4000);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;
    DECLARE @Nro_SCC VARCHAR(15);

    DECLARE @Tipo_SCC SMALLINT;
    DECLARE @xmlAlerta XML;

    DECLARE @tAlertas TABLE(
	    Nro_Formato VARCHAR(15)
					  );

    SELECT @Nro_SCC = dbo.fn_SCC_Nro_SCC( @Nro_Formato );

    IF @Tran = 1 /**Consulta Actividad**/
    BEGIN
	   SELECT Nro_Actividad,
			Actividad,
			Fecha_Actividad
	   FROM SCC_Actividad
	   WHERE Nro_Formato = @Nro_Formato;
    END;
    IF @Tran = 2 /**Actualiza los datos en la tabla**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN ACTUALIZA;

		  UPDATE SCC_Cabeza
		    SET Fecha_Cierre = GETDATE()
		  WHERE Nro_formato = @Nro_Formato;

		  UPDATE SCC_ITEM
		    SET Fecha_Cierre = GETDATE(),
			   FormaDeEntrega = @DescripcionCierre
		  WHERE Nro_formato = @Nro_Formato;

		  UPDATE SCC_ITEM
		    SET EsfuerzoTotal = dbo.fn_SCC_Calculo_Esfuerzo_Item( @Nro_Formato, @Nro_Item )
		  WHERE Nro_Formato = @Nro_Formato AND Nro_item = @Nro_Item;

		  INSERT INTO @tAlertas( Nro_Formato )
		  VALUES
			    (
			    @Nro_Formato );

		  SET @xmlAlerta = ( SELECT *
						 FROM @tAlertas FOR XML RAW('SRS'), ROOT('ROOT') );
		  SELECT '@Mensaje' = 'Se Cerro la  Solicitud de PQRS: '+@Nro_SCC;
		  SELECT @xmlAlerta;

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

END;

```
