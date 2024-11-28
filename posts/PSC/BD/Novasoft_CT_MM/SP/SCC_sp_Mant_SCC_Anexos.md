# Stored Procedure: SCC_sp_Mant_SCC_Anexos

## Usa los objetos:
- [[SCC_Anexo_intermedia]]
- [[SCC_Anexos]]
- [[SCC_Cabeza]]
- [[SCC_TipoAnexo]]

```sql
-- =============================================
-- Author:		Angélica Maricela Garcia Galvis
-- Create date:	Octubre 2015
-- Description:	Realiza las diferentes operaciones (Inserta, Elimina, Actualiza y Consulta)
--				En la tabla SCC_Item
-- =============================================
CREATE PROCEDURE [dbo].[SCC_sp_Mant_SCC_Anexos]
	@Tran        INT,
	@Nro_Formato INT,
	@conse_anex  BIGINT,
	@fecha_anx   DATETIME,
	@descrip     VARCHAR(1000),
	@doc_anx     VARBINARY(MAX),
	@nom_anx     VARCHAR(150),
	@usuario     SYSNAME,
	@Tipo_Anx    INT,
	@Nro_SCC     VARCHAR(15)
AS
BEGIN
    SET NOCOUNT ON;
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

    DECLARE @Mensaje NVARCHAR(500);

    IF @Tran = 1 /**Inserta los datos en la tabla de acuerdo a srs desde opcion ingreso srs**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN INSERTAR;

		  INSERT INTO SCC_Anexos( Nro_Formato,
							 fecha_anx,
							 descrip,
							 doc_anx,
							 nom_anx,
							 usuario,
							 Tipo_Anx
						    )
		  SELECT @Nro_Formato,
			    fecha_anx,
			    descrip,
			    doc_anx,
			    nom_anx,
			    usuario,
			    Tipo_Anx
		  FROM SCC_Anexo_intermedia
		  WHERE usuario = @usuario;

		  COMMIT TRAN INSERTAR;
	   END TRY
	   BEGIN CATCH
		  SET @Mensaje = 'Num Error:' + RTRIM(CAST(ERROR_NUMBER() AS CHAR(4))) + 'Msj:' + ERROR_MESSAGE() + 'Linea:' + RTRIM(CAST(ERROR_LINE() AS
		  CHAR)) + 'Objeto:' + ISNULL(ERROR_PROCEDURE(), '');
		  SELECT '@msj' = @Mensaje;
		  ROLLBACK TRAN INSERTAR;
	   END CATCH;
    END;
    IF @Tran = 2 /**Actualiza los datos en la tabla**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN ACTUALIZA;
		  UPDATE SCC_Anexos
		    SET fecha_anx = @fecha_anx,
			   descrip = @descrip,
			   doc_anx = @doc_anx,
			   nom_anx = @nom_anx,
			   usuario = @usuario,
			   Tipo_Anx = @Tipo_Anx
		  WHERE Nro_Formato = @Nro_Formato AND conse_anex = @conse_anex;

		  COMMIT TRAN ACTUALIZA;
	   END TRY
	   BEGIN CATCH
		  SET @Mensaje = 'Num Error:' + RTRIM(CAST(ERROR_NUMBER() AS CHAR(4))) + 'Msj:' + ERROR_MESSAGE() + 'Linea:' + RTRIM(CAST(ERROR_LINE() AS
		  CHAR)) + 'Objeto:' + ISNULL(ERROR_PROCEDURE(), '');
		  SELECT '@msj' = @Mensaje;
		  ROLLBACK TRAN ACTUALIZA;
	   END CATCH;
    END;
    IF @Tran = 3 /**Elimina los datos en la tabla**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN ELIMINA;

		  DELETE FROM SCC_Anexos
		  WHERE conse_anex = @conse_anex AND Nro_Formato = @Nro_Formato;

		  COMMIT TRAN ELIMINA;
	   END TRY
	   BEGIN CATCH
		  SET @Mensaje = 'Num Error:' + RTRIM(CAST(ERROR_NUMBER() AS CHAR(4))) + 'Msj:' + ERROR_MESSAGE() + 'Linea:' + RTRIM(CAST(ERROR_LINE() AS
		  CHAR)) + 'Objeto:' + ISNULL(ERROR_PROCEDURE(), '');
		  SELECT '@msj' = @Mensaje;
		  ROLLBACK TRAN ELIMINA;
	   END CATCH;
    END;

    IF @Tran = 4 /**Consulta los datos en la tabla**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN CONSULTA;

		  SELECT ANX.Nro_Formato,
			    conse_anex,
			    Nro_SCC,
			    fecha_anx,
			    descrip,
			    doc_anx,
			    nom_anx,
			    usuario,
			    ANX.Tipo_Anx,
			    AN.Descripcion
		  FROM SCC_Anexos AS ANX
		  INNER JOIN SCC_TipoAnexo AS AN ON ANX.Tipo_Anx = AN.Tipo_Anx
		  INNER JOIN SCC_Cabeza AS CAB ON CAB.Nro_Formato = ANX.Nro_Formato
		  WHERE usuario = @usuario AND ANX.Nro_Formato = @Nro_Formato;
		  COMMIT TRAN CONSULTA;
	   END TRY
	   BEGIN CATCH
		  SET @Mensaje = 'Num Error:' + RTRIM(CAST(ERROR_NUMBER() AS CHAR(4))) + 'Msj:' + ERROR_MESSAGE() + 'Linea:' + RTRIM(CAST(ERROR_LINE() AS
		  CHAR)) + 'Objeto:' + ISNULL(ERROR_PROCEDURE(), '');
		  SELECT '@msj' = @Mensaje;
		  ROLLBACK TRAN CONSULTA;
	   END CATCH;
    END;

    IF @Tran = 5 /**Consulta los datos en la tabla intermedia anexos**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN CONSULTA_INTERMEDIA;

		  SELECT conse_anex,
			    fecha_anx,
			    descrip,
			    doc_anx,
			    nom_anx,
			    usuario,
			    ANX.Tipo_Anx
		  --Descripcion
		  FROM SCC_Anexo_intermedia AS ANX
		  WHERE usuario = @usuario;

		  COMMIT TRAN CONSULTA_INTERMEDIA;
	   END TRY
	   BEGIN CATCH
		  SET @Mensaje = 'Num Error:' + RTRIM(CAST(ERROR_NUMBER() AS CHAR(4))) + 'Msj:' + ERROR_MESSAGE() + 'Linea:' + RTRIM(CAST(ERROR_LINE() AS
		  CHAR)) + 'Objeto:' + ISNULL(ERROR_PROCEDURE(), '');
		  SELECT '@msj' = @Mensaje;
		  ROLLBACK TRAN CONSULTA_INTERMEDIA;
	   END CATCH;
    END;

    IF @Tran = 6 /**Inserta los datos en la tabla intermedia anexos**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN INSERTAR_INTERMEDIA;

		  INSERT INTO SCC_Anexo_intermedia( fecha_anx,
									 descrip,
									 doc_anx,
									 nom_anx,
									 usuario,
									 Tipo_Anx
								    )
		  VALUES
			    (
			    @fecha_anx, @descrip, @doc_anx, @nom_anx, @usuario, @Tipo_Anx );

		  COMMIT TRAN INSERTAR_INTERMEDIA;
	   END TRY
	   BEGIN CATCH
		  SET @Mensaje = 'Num Error:' + RTRIM(CAST(ERROR_NUMBER() AS CHAR(4))) + 'Msj:' + ERROR_MESSAGE() + 'Linea:' + RTRIM(CAST(ERROR_LINE() AS
		  CHAR)) + 'Objeto:' + ISNULL(ERROR_PROCEDURE(), '');
		  SELECT '@msj' = @Mensaje;
		  ROLLBACK TRAN INSERTAR_INTERMEDIA;
	   END CATCH;
    END;

    IF @Tran = 7 /**Actualiza los datos en la tabla intermedia anexos**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN ACTUALIZAR_INTERMEDIA;

		  UPDATE SCC_Anexo_intermedia
		    SET fecha_anx = @fecha_anx,
			   descrip = @descrip,
			   doc_anx = @doc_anx,
			   nom_anx = @nom_anx,
			   Tipo_Anx = @Tipo_Anx
		  WHERE usuario = @usuario AND conse_anex = @conse_anex;

		  COMMIT TRAN ACTUALIZAR_INTERMEDIA;
	   END TRY
	   BEGIN CATCH
		  SET @Mensaje = 'Num Error:' + RTRIM(CAST(ERROR_NUMBER() AS CHAR(4))) + 'Msj:' + ERROR_MESSAGE() + 'Linea:' + RTRIM(CAST(ERROR_LINE() AS
		  CHAR)) + 'Objeto:' + ISNULL(ERROR_PROCEDURE(), '');
		  SELECT '@msj' = @Mensaje;
		  ROLLBACK TRAN ACTUALIZAR_INTERMEDIA;
	   END CATCH;
    END;

    IF @Tran = 8 /**Actualiza los datos en la tabla intermedia anexos**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN ELIMINAR_INTERMEDIA;

		  DELETE FROM SCC_Anexo_intermedia
		  WHERE usuario = @usuario AND conse_anex = @conse_anex;

		  COMMIT TRAN ELIMINAR_INTERMEDIA;
	   END TRY
	   BEGIN CATCH
		  SET @Mensaje = 'Num Error:' + RTRIM(CAST(ERROR_NUMBER() AS CHAR(4))) + 'Msj:' + ERROR_MESSAGE() + 'Linea:' + RTRIM(CAST(ERROR_LINE() AS
		  CHAR)) + 'Objeto:' + ISNULL(ERROR_PROCEDURE(), '');
		  SELECT '@msj' = @Mensaje;
		  ROLLBACK TRAN ELIMINAR_INTERMEDIA;
	   END CATCH;
    END;

    IF @Tran = 9 /**Inserta los datos en anexos por cada solicitud por parte ingeniero o analista**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN INSERTAR;

		  INSERT INTO SCC_Anexos( Nro_Formato,
							 fecha_anx,
							 descrip,
							 doc_anx,
							 nom_anx,
							 usuario,
							 Tipo_Anx
						    )
		  VALUES
			    (
			    @Nro_Formato, @fecha_anx, @descrip, @doc_anx, @nom_anx, @usuario, @Tipo_Anx );

		  COMMIT TRAN INSERTAR;
	   END TRY
	   BEGIN CATCH
		  SET @Mensaje = 'Num Error:' + RTRIM(CAST(ERROR_NUMBER() AS CHAR(4))) + 'Msj:' + ERROR_MESSAGE() + 'Linea:' + RTRIM(CAST(ERROR_LINE() AS
		  CHAR)) + 'Objeto:' + ISNULL(ERROR_PROCEDURE(), '');
		  SELECT '@msj' = @Mensaje;
		  ROLLBACK TRAN INSERTAR;
	   END CATCH;
    END;

    IF @Tran = 10 /**Consulta los datos en la tabla para descargarlos**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN CONSULTA;

		  SELECT ANX.Nro_Formato,
			    conse_anex,
			    Nro_SCC,
			    fecha_anx,
			    descrip,
			    doc_anx,
			    nom_anx,
			    usuario,
			    ANX.Tipo_Anx,
			    AN.Descripcion
		  FROM SCC_Anexos AS ANX
		  INNER JOIN SCC_TipoAnexo AS AN ON ANX.Tipo_Anx = AN.Tipo_Anx
		  INNER JOIN SCC_Cabeza AS CAB ON CAB.Nro_Formato = ANX.Nro_Formato
		  WHERE Nro_SCC = @Nro_SCC;
		  COMMIT TRAN CONSULTA;
	   END TRY
	   BEGIN CATCH
		  SET @Mensaje = 'Num Error:' + RTRIM(CAST(ERROR_NUMBER() AS CHAR(4))) + 'Msj:' + ERROR_MESSAGE() + 'Linea:' + RTRIM(CAST(ERROR_LINE() AS
		  CHAR)) + 'Objeto:' + ISNULL(ERROR_PROCEDURE(), '');
		  SELECT '@msj' = @Mensaje;
		  ROLLBACK TRAN CONSULTA;
	   END CATCH;
    END;

    IF @Tran = 11 /**Consulta los datos descarga**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN CONSULTA;

		  SELECT   --ANX.Nro_Formato,
		  conse_anex,
		  --Nro_SCC,
		  doc_anx
		  FROM SCC_Anexos AS ANX
		  INNER JOIN SCC_TipoAnexo AS AN ON ANX.Tipo_Anx = AN.Tipo_Anx
		  INNER JOIN SCC_Cabeza AS CAB ON CAB.Nro_Formato = ANX.Nro_Formato
		  WHERE Nro_SCC = @Nro_SCC;
		  COMMIT TRAN CONSULTA;
	   END TRY
	   BEGIN CATCH
		  SET @Mensaje = 'Num Error:' + RTRIM(CAST(ERROR_NUMBER() AS CHAR(4))) + 'Msj:' + ERROR_MESSAGE() + 'Linea:' + RTRIM(CAST(ERROR_LINE() AS
		  CHAR)) + 'Objeto:' + ISNULL(ERROR_PROCEDURE(), '');
		  SELECT '@msj' = @Mensaje;
		  ROLLBACK TRAN CONSULTA;
	   END CATCH;
    END;

END;

```
