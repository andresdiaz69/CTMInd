# Stored Procedure: SCC_sp_Mant_SCC_Cabeza

## Usa los objetos:
- [[cxc_cliente]]
- [[SCC_Cabeza]]
- [[SCC_Item]]
- [[SCC_Tramite_Solicitud]]

```sql

-- =============================================
-- Author:		Angélica Maricela Garcia Galvis
-- Create date:	Octubre 2015
-- Description:	Realiza las diferentes operaciones (Inserta, Elimina, Actualiza y Consulta)
--				En la tabla SCC_Cabeza
-- EXEC SCC_sp_Mant_SCC_Cabeza 4,0,0,'QUE2018 - 0011','19000101',1,0,0,0,'19000101'
-- =============================================
CREATE PROCEDURE [dbo].[SCC_sp_Mant_SCC_Cabeza]
	@Tran               TINYINT, /* 1-Inserta, 2-Actualiza,3-Elimina,4-Consulta solicitudes en estudio*/
	@Nro_Formato        INT,
	@Tipo_SCC           TINYINT,
	@Nro_SCC            VARCHAR(15),
	@Fecha_Recibido     DATETIME,
	@Ind_tramite        TINYINT,
	@Prioridad_Analista TINYINT,
	@Complejidad        TINYINT,
	@Dias_estimados     TINYINT,
	@Fecha_Cierre       DATETIME,
	@Cod_clas			TINYINT
AS
BEGIN
    SET NOCOUNT ON;
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

    DECLARE @Mensaje NVARCHAR(500);
    DECLARE @ErrorMessage NVARCHAR(4000);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;
    DECLARE @xmlAlerta XML;
    DECLARE @FechaDeRegistro DATETIME;
    DECLARE @ObservacionesDeRegistro VARCHAR(200);
    DECLARE @VersionPrueba VARCHAR(8);

    SET @Ind_tramite = ISNULL(@Ind_tramite, '');
    SET @Nro_Formato = ISNULL(@Nro_Formato, '');

    IF @Tran = 1 /**Inserta los datos en la tabla**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN INSERTA;
		  INSERT INTO SCC_Cabeza( Nro_Formato,
							 Nro_SCC,
							 Tipo_SCC,
							 Fecha_Recibido,
							 Ind_tramite,
							 Prioridad_Analista,
							 Complejidad,
							 Dias_estimados,
							 Fecha_Cierre,
							 Cod_Tipclas
						    )
		  VALUES
			    (
			    @Nro_Formato, @Nro_SCC, @Tipo_SCC, @Fecha_Recibido, @Ind_tramite, @Prioridad_Analista, @Complejidad, @Dias_estimados,
			    @Fecha_Cierre,@Cod_clas );

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
		  UPDATE SCC_Cabeza
		    SET Prioridad_Analista = @Prioridad_Analista,
			   Complejidad = @Complejidad,
			   Cod_Tipclas = @Cod_clas
		  WHERE Nro_Formato = @Nro_Formato;

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

		  DELETE FROM SCC_Cabeza
		  WHERE Nro_Formato = @Nro_Formato;

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

	   SELECT C.Nro_Formato,
			C.Nro_SCC,
			C.Tipo_SCC,
			c.Fecha_Recibido,
			C.Cod_Tipclas,
			I.Nro_item,
			I.Descripcion,
			I.FechaInicial,
			I.FechaFinal,
			I.EsfuerzoTotal,
			I.Cod_usu_responsable,
			I.FechaResponsable,
			I.Fecha_Estimada,
			I.Ind_Tramite,
			I.FechaDeEntrega,
			I.Respuesta,
			I.Fecha_Cierre,
			I.FormaDeEntrega,
			I.Fecha_Recibo_ValidaClient,
			I.FormaDeValidacion,
			I.Nombres_Solicitante,
			I.Apellidos_Solicitante,
			I.correo_e_solicitante,
			I.Telefono_solicitante,
			I.Direccion_solicitante,
			I.Cod_ubicacion,
			I.Cod_area,
			I.Cod_proceso,
			I.Cod_Medio,
			I.datos_OtContacto,
			I.Cod_enfSolicitud,
			I.Fecha_Evento,
			I.Respuesta,
			T.Descripcion AS DescripTramite,
			Cl.nom_cli
	   FROM SCC_Cabeza AS C
	   INNER JOIN SCC_Item AS I ON C.Nro_Formato = i.Nro_Formato
	   INNER JOIN SCC_Tramite_Solicitud AS T ON I.Ind_Tramite= T.Ind_tramite
	   INNER JOIN cxc_cliente AS Cl ON I.cod_cli = Cl.cod_cli
	   WHERE C.Nro_Formato = @Nro_Formato AND C.Ind_tramite = @Ind_tramite;

    END;
END;


```
