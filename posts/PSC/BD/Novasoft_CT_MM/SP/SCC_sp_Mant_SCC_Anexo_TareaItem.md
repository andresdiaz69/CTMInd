# Stored Procedure: SCC_sp_Mant_SCC_Anexo_TareaItem

## Usa los objetos:
- [[SCC_Anexo_TareaItem]]
- [[SCC_Cabeza]]

```sql
-- =============================================
-- Author:		Angélica M Garcia Galvis
-- Create date:	Octubre 2019
-- Description:	Realiza las diferentes operaciones (Inserta, Elimina, Actualiza y Consulta)
--				En la tabla SCC_Anexo_ItemTarea
-- =============================================
CREATE PROCEDURE [dbo].[SCC_sp_Mant_SCC_Anexo_TareaItem]
	@Tran        INT,
	@Nro_Formato INT,
	@Nro_Item    INT,
	@Nro_Tarea   INT,
	@conse_anex  BIGINT,
	@fecha_anx   DATETIME,
	@descrip     VARCHAR(1000),
	@doc_anx     VARBINARY(MAX) = NULL,
	@nom_anx     VARCHAR(150),
	@usuario     SYSNAME,
	@Tipo_Anx    INT
AS
BEGIN
    SET NOCOUNT ON;
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

    DECLARE @Mensaje NVARCHAR(500);

    IF @Tran = 1 /**Inserta los datos en la tabla**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN INSERTAR;

		  INSERT INTO SCC_Anexo_TareaItem( Nro_Formato,
									Nro_Item,
									Nro_Tarea,
									fecha_anx,
									descrip,
									doc_anx,
									nom_anx,
									usuario,
									Tipo_Anx
								   )
		  VALUES
			    (
			    @Nro_Formato, @Nro_Item, @Nro_Tarea, @fecha_anx, @descrip, @doc_anx, @nom_anx, @usuario, @Tipo_Anx );

		  COMMIT TRAN INSERTAR;
	   END TRY
	   BEGIN CATCH
		  SET @Mensaje = 'Num Error:' + RTRIM(CAST(ERROR_NUMBER() AS CHAR(4))) + 'Msj:' + ERROR_MESSAGE() + 'Linea:' + RTRIM(CAST(ERROR_LINE() AS
		  CHAR)) + 'Objeto:' + ISNULL(ERROR_PROCEDURE(), '');
		  SELECT '@msj' = @Mensaje;
		  ROLLBACK TRAN INSERTAR;
	   END CATCH;
    END;

    IF @Tran = 2 /**Consulta los datos en la tabla**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN CONSULTA;

		  SELECT doc_anx
		  FROM SCC_Anexo_TareaItem AS ANX
		  WHERE ANX.Nro_Formato = @Nro_Formato
			   AND Nro_Item = @Nro_Item
			   AND Nro_Tarea = @Nro_Tarea
			   AND conse_anex = @conse_anex;

		  COMMIT TRAN CONSULTA;
	   END TRY
	   BEGIN CATCH
		  SET @Mensaje = 'Num Error:' + RTRIM(CAST(ERROR_NUMBER() AS CHAR(4))) + 'Msj:' + ERROR_MESSAGE() + 'Linea:' + RTRIM(CAST(ERROR_LINE() AS
		  CHAR)) + 'Objeto:' + ISNULL(ERROR_PROCEDURE(), '');
		  SELECT '@msj' = @Mensaje;
		  ROLLBACK TRAN CONSULTA;
	   END CATCH;
    END;

    IF @Tran = 3 /**Elimina los datos en la tabla**/
    BEGIN
	   BEGIN TRY
		  BEGIN TRAN ELIMINA;

		  DELETE FROM SCC_Anexo_TareaItem
		  WHERE conse_anex = @conse_anex
			   AND Nro_Formato = @Nro_Formato
			   AND Nro_Item = @Nro_Item
			   AND Nro_Tarea = @Nro_Tarea
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
			    Nro_Tarea,
			    Nro_SCC,
			    fecha_anx,
			    descrip,
			    doc_anx,
			    nom_anx,
			    usuario
		  FROM SCC_Anexo_TareaItem AS ANX
		  INNER JOIN SCC_Cabeza AS CAB ON CAB.Nro_Formato = ANX.Nro_Formato
		  WHERE ANX.Nro_Formato = @Nro_Formato AND Nro_Item = @Nro_Item AND Nro_tarea = @Nro_tarea;

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
