# Stored Procedure: SCC_sp_XML_Alt_Tramite_PQRS

## Usa los objetos:
- [[SCC_Cabeza]]
- [[SCC_Item]]

```sql

-- =============================================
-- Author:	 Angélica Maricela Garcia Galvis
-- Create date: Febrero 2.018
-- Description: Devuelve el XML Con los datos para ser recibido por el procedimiento que genera alertas SCC_sp_Alt_Tramite
--Cadena Ejecución: EXEC SCC_sp_XML_Alt_Tramite_PQRS 1177,1,1
-- =============================================
CREATE PROCEDURE [dbo].[SCC_sp_XML_Alt_Tramite_PQRS]
	@Nro_Formato          INT,
	@Nro_Item             INT,
	@Evento               INT,
	@xmlAlerta            XML OUTPUT,
	@Nro_Prueba           INT     = 0,
	@Cod_Usu_ResponsableA SYSNAME = '',
	@Ind_SPA              BIT     = 0
AS
BEGIN
    SET NOCOUNT ON;
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

    DECLARE @NroSRS                     VARCHAR(15),
		  @NombreyApellidoSolicitante VARCHAR(200),
		  @correo_e_solicitante       VARCHAR(100),
		  @Fecha_Solicitud            DATETIME,
		  @DescripcionItem            VARCHAR(MAX),
		  @Respuesta                  VARCHAR(MAX);

    DECLARE @tAlertas TABLE(
	    Descripcion                VARCHAR(8000),
	    Ind_tramite                TINYINT,
	    Cod_Usu_Solicitante        VARCHAR(128),
	    Nro_SCC                    VARCHAR(15),
	    Fecha_Solicitud            VARCHAR(10),
	    DescripcionItem            VARCHAR(MAX),
	    Evento                     TINYINT,
	    NombreyApellidoSolicitante VARCHAR(200),
	    correo_e_solicitante       VARCHAR(100),
	    Respuesta                  VARCHAR(8000)
					  );

    SELECT @NombreyApellidoSolicitante = CONCAT(IT.Nombres_solicitante, ' ', IT.Apellidos_solicitante),
		 @correo_e_solicitante = IT.correo_e_solicitante,
		 @NroSRS = C.Nro_SCC,
		 @Fecha_Solicitud = C.Fecha_Recibido,
		 @DescripcionItem = IT.Descripcion,
		 @Respuesta = IT.FormaDeEntrega
    FROM SCC_Cabeza AS C
    INNER JOIN SCC_Item AS IT ON IT.Nro_Formato = C.Nro_Formato
    WHERE C.Nro_Formato = @Nro_Formato AND Nro_item = @Nro_Item;

	

    INSERT INTO @tAlertas( Ind_tramite,
					  Nro_SCC,
					  Fecha_Solicitud,
					  DescripcionItem,
					  Evento,
					  NombreyApellidoSolicitante,
					  correo_e_solicitante,
					  Respuesta
					)
    VALUES
		 (
		 @Evento, @NroSRS, CONVERT(VARCHAR(10), @Fecha_Solicitud, 110), @DescripcionItem, @Evento, @NombreyApellidoSolicitante,
		 @correo_e_solicitante, @Respuesta );


    SET @xmlAlerta = ( SELECT *
				   FROM @tAlertas FOR XML RAW('SRS'), ROOT('ROOT') );

END;


```
