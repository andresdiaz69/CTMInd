# Stored Procedure: SCC_sp_Mant_SCC_Anexos_Item

## Usa los objetos:
- [[SCC_Anexo_intermedia]]
- [[SCC_Anexo_Item]]
- [[SCC_Anexo_ItemPorAprobar]]
- [[SCC_Cabeza]]

```sql
-- =============================================
-- Author:		David Galindo
-- Create date:	Abril 2016
-- Description:	Realiza las diferentes operaciones (Inserta, Elimina, Actualiza y Consulta)
--				En la tabla SCC_Anexo_Item
--@ind_cons 'SRS' ó 'SPA'
-- =============================================
CREATE PROCEDURE [dbo].[SCC_sp_Mant_SCC_Anexos_Item]
	@Tran        INT,
	@Nro_Formato INT,
	@Nro_Item    INT,
	@conse_anex  BIGINT,
	@fecha_anx   DATETIME,
	@descrip     VARCHAR(1000),
	@doc_anx     VARBINARY(MAX) = NULL,
	@nom_anx     VARCHAR(150),
	@usuario     SYSNAME,
	@Tipo_Anx    INT,
	@ind_cons    CHAR(3)
AS
BEGIN
    SET NOCOUNT ON;
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

    DECLARE @Mensaje NVARCHAR(500);

    IF @Tran = 1 /**Inserta los datos en la tabla de acuerdo a srs desde opcion ingreso srs**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN INSERTAR;

		  IF(@ind_cons = 'SRS')
		  BEGIN
			 INSERT INTO SCC_Anexo_Item( Nro_Formato,
								    Nro_Item,
								    fecha_anx,
								    descrip,
								    doc_anx,
								    nom_anx,
								    usuario,
								    Tipo_Anx
								  )
			 SELECT @Nro_Formato,
				   @Nro_Item,
				   fecha_anx,
				   descrip,
				   doc_anx,
				   nom_anx,
				   usuario,
				   Tipo_Anx
			 FROM SCC_Anexo_intermedia
			 WHERE usuario = @usuario;
		  END;

		  IF(@ind_cons = 'SPA')
		  BEGIN
			 INSERT INTO SCC_Anexo_Item( Nro_Formato,
								    Nro_Item,
								    fecha_anx,
								    descrip,
								    doc_anx,
								    nom_anx,
								    usuario,
								    Tipo_Anx
								  )
			 SELECT @Nro_Formato,
				   @Nro_Item,
				   fecha_anx,
				   descrip,
				   doc_anx,
				   nom_anx,
				   usuario,
				   Tipo_Anx
			 FROM SCC_Anexo_ItemPorAprobar
			 WHERE usuario = @usuario;
		  END;

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
		  UPDATE SCC_Anexo_Item
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

		  DELETE FROM SCC_Anexo_Item
		  WHERE conse_anex = @conse_anex
			   AND Nro_Formato = @Nro_Formato
			   AND Nro_Item = @Nro_Item
			   AND usuario = @usuario;

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
			    Nro_Item,
			    conse_anex,
			    Nro_SCC,
			    fecha_anx,
			    descrip,
			    doc_anx,
			    nom_anx,
			    usuario
		  --,AN.Descripcion as Tipo_Anx
		  FROM SCC_Anexo_Item AS ANX
			  --INNER JOIN SCC_TipoAnexo AS AN
			  --ON ANX.Tipo_Anx = AN.Tipo_Anx
		  INNER JOIN SCC_Cabeza AS CAB ON CAB.Nro_Formato = ANX.Nro_Formato
		  WHERE ANX.Nro_Formato = @Nro_Formato AND Nro_Item = @Nro_Item;

		  COMMIT TRAN CONSULTA;
	   END TRY
	   BEGIN CATCH
		  SET @Mensaje = 'Num Error:' + RTRIM(CAST(ERROR_NUMBER() AS CHAR(4))) + 'Msj:' + ERROR_MESSAGE() + 'Linea:' + RTRIM(CAST(ERROR_LINE() AS
		  CHAR)) + 'Objeto:' + ISNULL(ERROR_PROCEDURE(), '');
		  SELECT '@msj' = @Mensaje;
		  ROLLBACK TRAN CONSULTA;
	   END CATCH;
    END;

    IF @Tran = 5 /**Inserta los datos en la tabla de acuerdo a srs desde opcion ingreso srs**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN INSERTAR;

		  INSERT INTO SCC_Anexo_Item( Nro_Formato,
								Nro_Item,
								fecha_anx,
								descrip,
								doc_anx,
								nom_anx,
								usuario,
								Tipo_Anx
							   )
		  VALUES
			    (
			    @Nro_Formato, @Nro_Item, @fecha_anx, @descrip, @doc_anx, @nom_anx, @usuario, @Tipo_Anx );

		  COMMIT TRAN INSERTAR;
	   END TRY
	   BEGIN CATCH
		  SET @Mensaje = 'Num Error:' + RTRIM(CAST(ERROR_NUMBER() AS CHAR(4))) + 'Msj:' + ERROR_MESSAGE() + 'Linea:' + RTRIM(CAST(ERROR_LINE() AS
		  CHAR)) + 'Objeto:' + ISNULL(ERROR_PROCEDURE(), '');
		  SELECT '@msj' = @Mensaje;
		  ROLLBACK TRAN INSERTAR;
	   END CATCH;
    END;

    IF @Tran = 6 /**Consulta los datos en la tabla**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN CONSULTA;

		  SELECT doc_anx
		  FROM SCC_Anexo_Item AS ANX
		  WHERE ANX.Nro_Formato = @Nro_Formato AND Nro_Item = @Nro_Item AND conse_anex = @conse_anex;

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
