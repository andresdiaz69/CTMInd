# Stored Procedure: SCC_sp_Mant_SCC_Item

## Usa los objetos:
- [[SCC_CABEZA]]
- [[SCC_Item]]

```sql
-- =============================================
-- Author:		Angélica Maricela Garcia Galvis
-- Create date:	Febrero 2018
-- Description:	Realiza las diferentes operaciones (Inserta, Elimina, Actualiza y Consulta)
--				En la tabla SCC_Item
-- 
-- =============================================
CREATE PROCEDURE [dbo].[SCC_sp_Mant_SCC_Item]
	@Tran                      TINYINT, /* 1-INSERTA, 2-ACTUALIZA,3-ELIMINA,4-Actualiza Campos*/
	@Nro_Formato               INT,
	@Nro_item                  INT,
	@Descripcion               NVARCHAR(MAX),
	@FechaInicial              DATETIME,
	@FechaFinal                DATETIME,
	@EsfuerzoTotal             NUMERIC(8, 2),
	@Cod_usu_responsable       SYSNAME,
	@FechaResponsable          DATETIME,
	@Fecha_Estimada            DATE,
	@Ind_Tramite               TINYINT,
	@FechaDeEntrega            DATETIME,
	@Respuesta                 VARCHAR(2000),
	@Fecha_Cierre              DATETIME,
	@FormaDeEntrega            VARCHAR(2000),
	@Fecha_Recibo_ValidaClient DATETIME,
	@FormaDeValidacion         VARCHAR(2000),
	@Nombres_Solicitante       VARCHAR(100),
	@Apellidos_Solicitante     VARCHAR(100),
	@correo_e_solicitante      VARCHAR(100),
	@Telefono_solicitante      VARCHAR(100),
	@Direccion_solicitante     VARCHAR(100),
	@Cod_ubicacion             VARCHAR(15),
	@Cod_area                  VARCHAR(15),
	@Cod_proceso               VARCHAR(15),
	@Cod_Medio                 VARCHAR(2),
	@datos_OtContacto          VARCHAR(MAX),
	@Cod_enfSolicitud          SMALLINT,
	@Fecha_evento              DATETIME,
	@Cod_pai                   CHAR(3),
	@Cod_dep                   CHAR(2),
	@Cod_ciu                   CHAR(5),
	@Cod_postal                CHAR(8),
	@Nombres_Contac2           VARCHAR(100),
	@Apellidos_Contac2         VARCHAR(100),
	@correo_e_Contac2          VARCHAR(100),
	@Telefono_Contac2          VARCHAR(100),
	@Direccion_Contac2         VARCHAR(100),
	@Cod_pai_conctac2          CHAR(3),
	@Cod_dep_contac2           CHAR(2),
	@Cod_ciu_contac2           CHAR(5),
	@Cod_postal_Contac2        CHAR(8),
	@Cod_Caract1               CHAR(2),
	@Cod_Caract2               CHAR(2),
	@Cod_Caract3               CHAR(2),
	@Cod_Caract4               CHAR(2),
	@Cod_Caract5               CHAR(2),
	@Des_Caract6               VARCHAR(100),
	@Des_Caract7               VARCHAR(100),
	@Des_Caract8               VARCHAR(100),
	@Des_Caract9               VARCHAR(100),
	@Des_Caract10              VARCHAR(100),
	@Cod_cli				  VARCHAR(15)
AS
BEGIN
    SET NOCOUNT ON;
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

    DECLARE @Mensaje NVARCHAR(500);
    DECLARE @Tipo_SCC SMALLINT;

    SELECT @Tipo_SCC = Tipo_SCC
    FROM SCC_CABEZA
    WHERE Nro_Formato = @Nro_Formato;

    SET @Descripcion = ISNULL(@Descripcion, '');

    IF @Tran = 1 /**Inserta los datos en la tabla**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN INSERTAR;

		  INSERT INTO SCC_Item( Nro_Formato,
						    Nro_item,
						    Descripcion,
						    FechaInicial,
						    FechaFinal,
						    EsfuerzoTotal,
						    Cod_usu_responsable,
						    FechaResponsable,
						    Fecha_Estimada,
						    Ind_Tramite,
						    FechaDeEntrega,
						    Respuesta,
						    Fecha_Cierre,
						    FormaDeEntrega,
						    Fecha_Recibo_ValidaClient,
						    FormaDeValidacion,
						    Nombres_Solicitante,
						    Apellidos_Solicitante,
						    correo_e_solicitante,
						    Telefono_solicitante,
						    Direccion_solicitante,
						    Cod_ubicacion,
						    Cod_area,
						    Cod_proceso,
						    Cod_Medio,
						    datos_OtContacto,
						    Cod_enfSolicitud,
						    Fecha_evento,
						    Cod_pai,
						    Cod_dep,
						    Cod_ciu,
						    Cod_postal,
						    Nombres_Contac2,
						    Apellidos_Contac2,
						    correo_e_Contac2,
						    Telefono_Contac2,
						    Direccion_Contac2,
						    Cod_pai_conctac2,
						    Cod_dep_contac2,
						    Cod_ciu_contac2,
						    Cod_postal_Contac2,
						    Cod_Caract1,
						    Cod_Caract2,
						    Cod_Caract3,
						    Cod_Caract4,
						    Cod_Caract5,
						    Des_Caract6,
						    Des_Caract7,
						    Des_Caract8,
						    Des_Caract9,
						    Des_Caract10,
						    Cod_cli
						  )
		  VALUES
			    (
			    @Nro_Formato, @Nro_item, @Descripcion, @FechaInicial, @FechaFinal, @EsfuerzoTotal, @Cod_usu_responsable, @FechaResponsable,
			    @Fecha_Estimada, @Ind_Tramite, @FechaDeEntrega, @Respuesta, @Fecha_Cierre, @FormaDeEntrega, @Fecha_Recibo_ValidaClient,
			    @FormaDeValidacion, @Nombres_Solicitante, @Apellidos_Solicitante, @correo_e_solicitante, @Telefono_solicitante,
			    @Direccion_solicitante, @Cod_ubicacion, @Cod_area, @Cod_proceso, @Cod_Medio, @datos_OtContacto, @Cod_enfSolicitud, @Fecha_evento,
			    @Cod_pai, @Cod_dep, @Cod_ciu, @Cod_postal, @Nombres_Contac2, @Apellidos_Contac2, @correo_e_Contac2, @Telefono_Contac2,
			    @Direccion_Contac2, @Cod_pai_conctac2, @Cod_dep_contac2, @Cod_ciu_contac2, @Cod_postal_Contac2, @Cod_Caract1, @Cod_Caract2,
			    @Cod_Caract3, @Cod_Caract4, @Cod_Caract5, @Des_Caract6, @Des_Caract7, @Des_Caract8, @Des_Caract9, @Des_Caract10,@Cod_cli );

		  COMMIT TRAN INSERTAR;
	   END TRY
	   BEGIN CATCH
		  SET @Mensaje = 'Num Error:' + RTRIM(CAST(ERROR_NUMBER() AS CHAR(4))) + 'Msj:' + ERROR_MESSAGE() + 'Linea:' + RTRIM(CAST(ERROR_LINE() AS
		  CHAR)) + 'Objeto:' + ISNULL(ERROR_PROCEDURE(), '');
		  SELECT '@msj' = @Mensaje;
		  ROLLBACK TRAN INSERTAR;
	   END CATCH;
    END;
    IF @Tran = 2 /**Consulta los datos de la tabla - indicador de trámite 1**/
    BEGIN
	   SELECT Nro_Formato,
			Nro_item,
			Descripcion,
			FechaInicial,
			FechaFinal,
			EsfuerzoTotal,
			Cod_usu_responsable,
			FechaResponsable,
			Fecha_Estimada,
			Ind_Tramite,
			FechaDeEntrega,
			Respuesta,
			Fecha_Cierre,
			FormaDeEntrega,
			Fecha_Recibo_ValidaClient,
			FormaDeValidacion,
			Nombres_Solicitante,
			Apellidos_Solicitante,
			correo_e_solicitante,
			Telefono_solicitante,
			Direccion_solicitante,
			Cod_ubicacion,
			Cod_area,
			Cod_proceso,
			Cod_Medio,
			datos_OtContacto,
			Cod_enfSolicitud,
			Fecha_evento,
			Cod_pai,
			Cod_dep,
			Cod_ciu,
			Cod_postal,
			Nombres_Contac2,
			Apellidos_Contac2,
			correo_e_Contac2,
			Telefono_Contac2,
			Direccion_Contac2,
			Cod_pai_conctac2,
			Cod_dep_contac2,
			Cod_ciu_contac2,
			Cod_postal_Contac2,
			Cod_Caract1,
			Cod_Caract2,
			Cod_Caract3,
			Cod_Caract4,
			Cod_Caract5,
			Des_Caract6,
			Des_Caract7,
			Des_Caract8,
			Des_Caract9,
			Des_Caract10,
			Cod_cli
	   FROM SCC_Item
	   WHERE Nro_Formato = @Nro_Formato AND Nro_item = @Nro_item;

    END;
    IF @Tran = 3 /**Elimina los datos en la tabla**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN ELIMINA;

		  DELETE FROM SCC_Item
		  WHERE Nro_Formato = @Nro_Formato AND Nro_item = @Nro_item;

		  COMMIT TRAN ELIMINA;
	   END TRY
	   BEGIN CATCH
		  SET @Mensaje = 'Num Error:' + RTRIM(CAST(ERROR_NUMBER() AS CHAR(4))) + 'Msj:' + ERROR_MESSAGE() + 'Linea:' + RTRIM(CAST(ERROR_LINE() AS
		  CHAR)) + 'Objeto:' + ISNULL(ERROR_PROCEDURE(), '');
		  SELECT '@msj' = @Mensaje;
		  ROLLBACK TRAN ELIMINA;
	   END CATCH;
    END;
    IF @Tran = 4 /**Actualiza Campos**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN Consulta;

		  UPDATE Scc_item
		    SET Cod_ubicacion = @Cod_ubicacion,
			   Cod_Area = @Cod_area,
			   Cod_Proceso = @Cod_proceso
		  WHERE Nro_Formato = @Nro_Formato AND Nro_item = @Nro_item;

		  COMMIT TRAN Consulta;
	   END TRY
	   BEGIN CATCH
		  SET @Mensaje = 'Num Error:' + RTRIM(CAST(ERROR_NUMBER() AS CHAR(4))) + 'Msj:' + ERROR_MESSAGE() + 'Linea:' + RTRIM(CAST(ERROR_LINE() AS
		  CHAR)) + 'Objeto:' + ISNULL(ERROR_PROCEDURE(), '');
		  SELECT '@msj' = @Mensaje;
		  ROLLBACK TRAN Consulta;
	   END CATCH;
    END;

END;


```
