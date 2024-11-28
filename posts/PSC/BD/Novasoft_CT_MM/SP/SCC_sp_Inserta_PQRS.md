# Stored Procedure: SCC_sp_Inserta_PQRS

## Usa los objetos:
- [[Consecutivo_SCC]]
- [[SCC_Anexo_intermedia]]
- [[SCC_Felicitacion]]
- [[SCC_Peticion]]
- [[SCC_Queja]]
- [[SCC_Reclamo]]
- [[SCC_sp_Mant_SCC_Anexos_Item]]
- [[SCC_sp_Mant_SCC_Cabeza]]
- [[SCC_sp_Mant_SCC_Item]]
- [[SCC_Sugerencia]]
- [[SCC_TipoSCC]]

```sql
-- =============================================
-- Author:		Angélica Maricela Garcia Galvis
-- Create date:	Febrero 13 de  2.018
-- Description:	Realiza las diferentes operaciones (Inserta, Elimina, Actualiza y Consulta)
--				Afectando las tablas  SCC_Cabeza y SCC_item para el ingreso de las pqr
-- ALTER SEQUENCE dbo.Consecutivo_SCC RESTART WITH 1--Este no se reinicia todos los años ;
-- ALTER SEQUENCE dbo.SRS RESTART WITH 1 ;
-- ALTER SEQUENCE dbo.SPA RESTART WITH 1 ;
-- ALTER SEQUENCE dbo.SNR RESTART WITH 1;
-- ALTER SEQUENCE dbo.SPR RESTART WITH 1;
-- Cadena Ejecución  
-- EXEC SCC_sp_Inserta_PQRS '20191021','NOVASOFT\agarcia'  ,'Angélica ','Garcia','31199988800','calle 128','agarcia@novasoft.com.co',1,'20191021',1,'0','0','0','descripcion 111','',1,0,'057','11','11001','111111','Mario David','Hernandez Martinez','dagalindo@novasoft.com.co','7457070','Calle 128 Bis A','057','11','11001','111111','0','0','0','0','0','Descrip Caract 1','Descrip Caract 2','Descrip Caract 3','Descrip Caract 4','Descrip Caract 5'
-- =============================================
CREATE PROCEDURE [dbo].[SCC_sp_Inserta_PQRS]
	@Fecha_Recibido        DATETIME,
	@Cod_usu_Solicitante   SYSNAME,
	@Nombres_solicitante   VARCHAR(100),
	@Apellidos_Solicitante VARCHAR(100),
	@Telefono_Solicitante  VARCHAR(100),
	@Direccion_Solicitante VARCHAR(100),
	@Correo_e_solicitante  VARCHAR(100),
	@Tipo_SCC              INT,
	@Fecha_evento          DATETIME,
	@Cod_medio             CHAR(2),
	@Cod_ubicacion         VARCHAR(15),
	@Cod_area              VARCHAR(15),
	@Cod_proceso           VARCHAR(15),
	@Descripcion           VARCHAR(MAX),
	@datos_OtContacto      VARCHAR(MAX),
	@Cod_enfSolicitud      SMALLINT,
	@Cod_Clas              TINYINT,
	@Cod_pai               CHAR(3),
	@Cod_dep               CHAR(2),
	@Cod_ciu               CHAR(5),
	@Cod_postal            CHAR(8),
	@Nombres_Contac2       VARCHAR(100),
	@Apellidos_Contac2     VARCHAR(100),
	@correo_e_Contac2      VARCHAR(100),
	@Telefono_Contac2      VARCHAR(100),
	@Direccion_Contac2     VARCHAR(100),
	@Cod_pai_conctac2      CHAR(3),
	@Cod_dep_contac2       CHAR(2),
	@Cod_ciu_contac2       CHAR(5),
	@Cod_postal_Contac2    CHAR(8),
	@Cod_Caract1           CHAR(2),
	@Cod_Caract2           CHAR(2),
	@Cod_Caract3           CHAR(2),
	@Cod_Caract4           CHAR(2),
	@Cod_Caract5           CHAR(2),
	@Des_Caract6           VARCHAR(100),
	@Des_Caract7           VARCHAR(100),
	@Des_Caract8           VARCHAR(100),
	@Des_Caract9           VARCHAR(100),
	@Des_Caract10          VARCHAR(100),
	@Cod_cli               VARCHAR(15)
AS
BEGIN

    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
    SET NOCOUNT ON;
    /***Definición de Variables***/
    DECLARE @Mensaje NVARCHAR(500);
    DECLARE @Nro_Formato INT;
    DECLARE @Nro_TipoSCC INT;
    DECLARE @RC INT;
    DECLARE @Cod_Usu_Responsable SYSNAME;
    DECLARE @ErrorMessage NVARCHAR(4000);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;
    DECLARE @NroSRS VARCHAR(15);
    DECLARE @Sigla VARCHAR(3);
    DECLARE @xmlAlerta XML;
    DECLARE @Nom_Apl VARCHAR(20);
    DECLARE @ind_tramite TINYINT = 1;
    DECLARE @FecIniPruebas DATETIME;
    DECLARE @FecFinPruebas DATETIME;
    DECLARE @VersionPrueba CHAR(8);

    DECLARE @tAlertas TABLE(
	    Nro_Formato VARCHAR(15)
					  );

    SELECT @Sigla = Sigla
    FROM SCC_TipoSCC
    WHERE Tipo_SCC = @Tipo_SCC;

    /***Inicio transaccion inserta valores de SRS***/
    BEGIN TRY
	   BEGIN TRAN INSERTAR;
	   /***Asigna el consecutivo para el Formato y para el tipo de solicitud 1 - SRS***/
	   SET @Nro_Formato = NEXT VALUE FOR dbo.Consecutivo_SCC;

	   IF @Tipo_SCC = 1
	   BEGIN
		  SET @Nro_TipoSCC = NEXT VALUE FOR dbo.SCC_Peticion;
	   END;
		  ELSE
	   BEGIN
		  IF @Tipo_SCC = 2
		  BEGIN
			 SET @Nro_TipoSCC = NEXT VALUE FOR dbo.SCC_Queja;
		  END;
			 ELSE
		  BEGIN
			 IF @Tipo_SCC = 3
			 BEGIN
				SET @Nro_TipoSCC = NEXT VALUE FOR dbo.SCC_Reclamo;
			 END;
				ELSE
			 BEGIN
				IF @Tipo_SCC = 4
				BEGIN
				    SET @Nro_TipoSCC = NEXT VALUE FOR dbo.SCC_Sugerencia;
				END;
				    ELSE
				BEGIN
				    IF @Tipo_SCC = 5
				    BEGIN
					   SET @Nro_TipoSCC = NEXT VALUE FOR dbo.SCC_Felicitacion;
				    END;

				END;
			 END;

		  END;

	   END;

	   SET @NroSRS = @Sigla + CAST(YEAR(GETDATE()) AS CHAR(4)) + ' - ' + RIGHT('0000' + CAST(@Nro_TipoSCC AS VARCHAR(4)), 4);
	   /***Inserta los datos de la cabeza***/
	   EXECUTE @RC = [SCC_sp_Mant_SCC_Cabeza] 1,
									  @Nro_Formato,
									  @Tipo_SCC,
									  @NroSRS,
									  @Fecha_Recibido,
									  @ind_tramite,
									  0,
									  0,
									  0,
									  '19000101',
									  @Cod_clas;
	   /***INSERTA ADJUNTOS		*/
	   EXECUTE @RC = [SCC_sp_Mant_SCC_Anexos_Item] 1,
										  @Nro_Formato,
										  1,
										  NULL,
										  NULL,
										  NULL,
										  NULL,
										  NULL,
										  @Cod_Usu_Solicitante,
										  NULL,
										  'SRS';

	   DELETE FROM SCC_Anexo_intermedia
	   WHERE usuario = @Cod_Usu_Solicitante;

	   /*** Inserta los datos del item***/
	   /*** Para las Solicitudes tipo 1 - SRS - La relación Cabeza - Item es uno a uno***/
	   EXECUTE @RC = [SCC_sp_Mant_SCC_Item] 1,
									@Nro_Formato,
									1,
									@Descripcion,
									@Fecha_Recibido,
									'19000101',
									0,
									@Cod_usu_Solicitante,
									'19000101',
									'19000101',
									@ind_tramite,
									'19000101',
									'',
									'19000101',
									'',
									'19000101',
									'',
									@Nombres_Solicitante,
									@Apellidos_Solicitante,
									@correo_e_solicitante,
									@Telefono_solicitante,
									@Direccion_solicitante,
									@Cod_ubicacion,
									@Cod_area,
									@Cod_proceso,
									@Cod_Medio,
									@datos_OtContacto,
									@Cod_enfSolicitud,
									@Fecha_evento,
									@Cod_pai,
									@Cod_dep,
									@Cod_ciu,
									@Cod_postal,
									@Nombres_Contac2,
									@Apellidos_Contac2,
									@correo_e_Contac2,
									@Telefono_Contac2,
									@Direccion_Contac2,
									@Cod_pai_conctac2,
									@Cod_dep_contac2,
									@Cod_ciu_contac2,
									@Cod_postal_Contac2,
									@Cod_Caract1,
									@Cod_Caract2,
									@Cod_Caract3,
									@Cod_Caract4,
									@Cod_Caract5,
									@Des_Caract6,
									@Des_Caract7,
									@Des_Caract8,
									@Des_Caract9,
									@Des_Caract10,
									@Cod_cli;

	   IF XACT_STATE() = 1
	   BEGIN
		  COMMIT TRAN INSERTAR;
	   END;

	   INSERT INTO @tAlertas( Nro_Formato )
	   VALUES
			(
			@Nro_Formato );

	   IF @ind_tramite = 1
	   BEGIN
		  SET @xmlAlerta = ( SELECT *
						 FROM @tAlertas FOR XML RAW('SRS'), ROOT('ROOT') );
		  SELECT '@Mensaje' = 'Se creo satisfactoriamente la Solicitud de PQRS: ' + @NroSRS;
		  SELECT @xmlAlerta;

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
		  ROLLBACK TRAN INSERTAR;
	   END;
	   IF XACT_STATE() = 1
	   BEGIN
		  COMMIT TRANSACTION;
	   END;
    END CATCH;
END;

```
