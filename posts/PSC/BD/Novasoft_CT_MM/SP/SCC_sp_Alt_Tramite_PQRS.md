# Stored Procedure: SCC_sp_Alt_Tramite_PQRS

## Usa los objetos:
- [[fn_scc_nro_formato]]
- [[SCC_Cabeza]]
- [[SCC_Evento_Tramite]]
- [[SCC_ITEM]]
- [[SCC_Notificacion_Tramite]]
- [[scc_paramcriterios]]
- [[SCC_Tramite_Solicitud]]
- [[SCC_Usuario_Rol]]
- [[sis_usuarios]]

```sql

CREATE PROCEDURE [dbo].[SCC_sp_Alt_Tramite_PQRS]
	@cod_ale INT,
	@Datos   XML
AS
BEGIN

    SET NOCOUNT ON;
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

    DECLARE @idoc INT;
    DECLARE @Cod_usu_notificado SYSNAME;
    DECLARE @email VARCHAR(100);
    DECLARE @tableHTML NVARCHAR(MAX);

    /*** Se almacenan los usuarios que se van a notificar ***/
    DECLARE @UsuarioNotificado TABLE(
	    Cod_usu_notificado SYSNAME,
	    email              VARCHAR(100),
	    nombre_usuario     VARCHAR(100)
							 );
    DECLARE @Mensaje VARCHAR(MAX);
    DECLARE @NombreAnalista VARCHAR(200);
    DECLARE @NroSRS VARCHAR(15);
    DECLARE @DescripMotivo VARCHAR(MAX);
    DECLARE @NombreIngeniero VARCHAR(200);
    DECLARE @NombreAplicacion VARCHAR(50);
    DECLARE @NombreSolicitante VARCHAR(200);
    DECLARE @NombreGerenteProyecto VARCHAR(200);
    DECLARE @NombreLinea VARCHAR(50);
    DECLARE @NombreCliente VARCHAR(100);
    DECLARE @Evento TINYINT;
    DECLARE @Ind_tramite TINYINT;
    DECLARE @Tramite VARCHAR(50);
    DECLARE @Nro_Formato VARCHAR(15);
    DECLARE @Fecha_Solicitud VARCHAR(10);
    DECLARE @DescripcionItem VARCHAR(MAX);
    DECLARE @DescripcionRechazo VARCHAR(1000);
    DECLARE @RespuestaTecnica VARCHAR(MAX);
    DECLARE @DescripcionDetallPrueba VARCHAR(MAX);
    DECLARE @NombreIngenieroA VARCHAR(MAX);
    DECLARE @RespuestaFuncional VARCHAR(MAX);
    DECLARE @Nro_item TINYINT;
    DECLARE @NombreyApellidoSolicitante VARCHAR(200);
    DECLARE @correo_e_solicitante VARCHAR(100);
    DECLARE @Respuesta VARCHAR(8000);

    /***Tabla para guardar los datos de la alerta***/
    DECLARE @tAlertas TABLE(
	    ID                         INT IDENTITY,
	    Ind_tramite                TINYINT,
	    Nro_SCC                    VARCHAR(15),
	    Fecha_Solicitud            VARCHAR(10),
	    DescripcionItem            VARCHAR(MAX),
	    Evento                     TINYINT,
	    NombreyApellidoSolicitante VARCHAR(200),
	    correo_e_solicitante       VARCHAR(100),
	    Respuesta                  VARCHAR(8000)
					  );
    /***Tabla de resultado***/
    DECLARE @tResultado TABLE(
	    Correo  VARCHAR(100),
	    Mensaje XML
					    );

    /***inserta los datos del xml a la variable tipo tabla***/
    EXEC sp_xml_preparedocument @idoc OUTPUT,
						  @Datos;

    INSERT INTO @tAlertas
    SELECT Ind_tramite,
		 Nro_SCC,
		 Fecha_Solicitud,
		 DescripcionItem,
		 Evento,
		 NombreyApellidoSolicitante,
		 correo_e_solicitante,
		 Respuesta
    FROM OPENXML(@idoc, '/ROOT/SRS', 1) WITH(Ind_tramite TINYINT, Nro_SCC VARCHAR(15), Fecha_Solicitud VARCHAR(10), DescripcionItem VARCHAR(MAX),
    Evento TINYINT, NombreyApellidoSolicitante VARCHAR(2000), correo_e_solicitante VARCHAR(100), Respuesta VARCHAR(8000));

    EXEC sp_xml_removedocument @idoc;

    /*** Se asignan a las variables los datos necesarios para armar el mensaje ***/

    SELECT @NroSRS = ISNULL(Nro_SCC, ''),
		 @DescripcionItem = ISNULL(DescripcionItem, ''),
		 @Fecha_Solicitud = ISNULL(Fecha_Solicitud, ''),
		 @Evento = Evento,
		 @NombreyApellidoSolicitante = NombreyApellidoSolicitante,
		 @correo_e_solicitante = correo_e_solicitante,
		 @Respuesta = Respuesta
    FROM @tAlertas;

    /*** Se asigna el indicador de trámite de acuerdo al evento generado y se asigna el nombre del trámite***/
    SELECT @Ind_tramite = ind_tramite
    FROM SCC_Evento_Tramite
    WHERE Cod_evento = @Evento;

    SELECT @Tramite = Descripcion
    FROM SCC_Tramite_Solicitud
    WHERE Ind_tramite = @Ind_tramite;

    /*** SE CREA LA TABLA DE CRITERIOS DE ACUERDO AL TIPO DE SOLICITUD***/

    SELECT @Nro_formato = dbo.fn_scc_nro_formato( @NroSRS );
    DECLARE @Tipo_SCC INT;

    SELECT @Tipo_SCC = Tipo_SCC
    FROM SCC_Cabeza
    WHERE Nro_Formato = @Nro_formato;

    SELECT @tableHTML = N'<H4>Su solicitud será tratada bajo los siguientes parámetros y/o criterios: :</H4>' + N'<table border="1">' +
    N'<tr><th>Nro</th><th>Criterio</th>' + CAST((
		 SELECT td = Nro_Criterio,
			   '',
			   td = Descripcion_Criterio,
			   ''
		 FROM scc_paramcriterios AS d
		 WHERE tipo_Scc = @Tipo_SCC FOR XML PATH('tr'), TYPE
									   ) AS NVARCHAR(MAX)) + N'</table>';

    SELECT @tableHTML = ISNULL(@tableHTML, '');

    /*** Se adicionan los usuarios que se notifican por trámite de acuerdo a la parametrización por linea y aplicación***/

    INSERT INTO @UsuarioNotificado( Cod_usu_notificado,
							 nombre_usuario
						    )
    SELECT UR.usu_nombre,
		 UR.usu_nombre
    FROM SCC_Notificacion_Tramite AS NT
    INNER JOIN SCC_Usuario_Rol AS UR ON UR.Cod_Rol = NT.Cod_Rol
    WHERE NT.ind_tramite = @Ind_tramite;

    IF @Evento = 1 /** Ingreso***/
    BEGIN
	   SET @Mensaje = +'<UL>' + '<LI>' + 'Nro Solicitud :' + @NroSRS + '<LI>' + 'Fecha de Ingreso :' + @Fecha_Solicitud + '<LI>' +
	   'Solicitada Por :' + @NombreyApellidoSolicitante + '<LI>' + 'Descripción de la Solicitud :' + @DescripcionItem + '</UL>' + '<UL>' +
	   'Estado Solicitud: ' + @Tramite + '</UL>' + @tableHTML + '</UL>' +
	   N'<H3>Agradecemos sus observaciones y serán atendidas en el menor tiempo posible</H3>';
    END;
    IF @Evento = 2 /**Validación**/
    BEGIN
	   SET @Mensaje = +'<UL>' + '<LI>' + 'Nro Solicitud :' + @NroSRS + '<LI>' + 'Fecha de Ingreso :' + @Fecha_Solicitud + '<LI>' +
	   'Solicitada Por :' + @NombreyApellidoSolicitante + '<LI>' + 'Descripción de la Solicitud :' + @DescripcionItem + '</UL>' + '<UL>' +
	   'Estado Solicitud: ' + @Tramite + '</UL>';
    END;
    IF @Evento = 4
    BEGIN
	   SET @Mensaje = +'<UL>' + '<LI>' + 'Nro Solicitud :' + @NroSRS + '<LI>' + 'Fecha de Ingreso :' + @Fecha_Solicitud + '<LI>' +
	   'Solicitada Por :' + @NombreyApellidoSolicitante + '<LI>' + 'Descripción de la Solicitud :' + @DescripcionItem + '</UL>' + '<LI>' +
	   'Cierre y Forma de Entrega :' + @Respuesta + '</UL>' + '<UL>' + 'Estado Solicitud: ' + @Tramite + '</UL>';
    END;
    IF @Evento = 6 /**Cierre**/
    BEGIN
	   SET @Mensaje = +'<UL>' + '<LI>' + 'Nro Solicitud :' + @NroSRS + '<LI>' + 'Fecha de Ingreso :' + @Fecha_Solicitud + '<LI>' +
	   'Solicitada Por :' + @NombreyApellidoSolicitante + '<LI>' + 'Descripción de la Solicitud :' + @DescripcionItem + '</UL>' + '<LI>' +
	   'Cierre y Forma de Entrega :' + @Respuesta + '</UL>' + '<UL>' + 'Estado Solicitud: ' + @Tramite + '</UL>';
    END;

    /***Se actualiza el correo electrónico de cada usuario a notificar***/
    UPDATE @UsuarioNotificado
	 SET email = US.email_usuario
    FROM @UsuarioNotificado UN
    INNER JOIN sis_usuarios US ON UN.Cod_usu_notificado = US.usu_nombre;

    INSERT INTO @UsuarioNotificado( Cod_usu_notificado,
							 nombre_usuario,
							 email
						    )
    SELECT '',
		 @NombreyApellidoSolicitante,
		 @correo_e_solicitante;

    INSERT INTO @UsuarioNotificado( Cod_usu_notificado,
							 nombre_usuario,
							 email
						    )
    SELECT '',
		 CONCAT(RTRIM(Nombres_Contac2), ' ', RTRIM(Apellidos_Contac2)),
		 LTRIM(RTRIM(correo_e_Contac2))
    FROM SCC_ITEM AS IT
    WHERE Nro_Formato = @Nro_formato AND LEN(CONCAT(RTRIM(Nombres_Contac2), ' ', RTRIM(Apellidos_Contac2)))>0;


    SELECT DISTINCT
		 email,
		 @Mensaje AS Mensaje
    FROM @UsuarioNotificado
    WHERE email IS NOT NULL OR LEN(email) > 0;

END;


```
