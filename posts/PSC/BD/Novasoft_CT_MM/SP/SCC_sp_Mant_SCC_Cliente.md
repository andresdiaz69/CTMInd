# Stored Procedure: SCC_sp_Mant_SCC_Cliente

## Usa los objetos:
- [[gen_terceros]]

```sql
-- =============================================
-- Author:		David Andres Galindo
-- Create date:	Febrero 2016
-- Description:	Realiza inserción o actualización gen_terceros "Clientes SCC"
-- =============================================
CREATE PROCEDURE [dbo].[SCC_sp_Mant_SCC_Cliente] 
	   @Tran                    TINYINT,
	   @ter_nit					CHAR(15),
	   @nombre					VARCHAR(200),
	   @e_mail					VARCHAR(100)
AS
BEGIN
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
    DECLARE @Mensaje NVARCHAR(500);

	SET NOCOUNT ON;

	IF @Tran = 1 /**Inserta los datos en la tabla**/
     BEGIN
     BEGIN TRY
	   --BEGIN TRAN INSERTAR;
	
		INSERT INTO gen_terceros (ter_nit,ter_nombre,e_mail)
		VALUES(@ter_nit,@nombre,@e_mail)

	 --COMMIT TRAN INSERTAR;
	 END TRY
   BEGIN CATCH
	 	SET @mensaje = RTRIM(ERROR_MESSAGE())+', procedimiento:'+RTRIM(ERROR_PROCEDURE())+', línea: '+RTRIM(ERROR_LINE())  

		RAISERROR (@mensaje,18,-1)
    END CATCH;
    END;


	IF @Tran = 2 /**Actualiza email los datos en la tabla**/
    BEGIN
    BEGIN TRY
	   
	
		UPDATE	gen_terceros 
		SET		e_mail = @e_mail
		WHERE	ter_nit = @ter_nit

	 
    END TRY
    BEGIN CATCH
	   SET @mensaje = RTRIM(ERROR_MESSAGE())+', procedimiento:'+RTRIM(ERROR_PROCEDURE())+', línea: '+RTRIM(ERROR_LINE())  

		RAISERROR (@mensaje,18,-1)
	  
    END CATCH;
    END;


	IF @Tran = 3 /**Selecciona cliente**/
    BEGIN
    BEGIN TRY
	   
	
		SELECT  ter_nit
		FROM	gen_terceros
		WHERE	ter_nit = @ter_nit

	 
    END TRY
    BEGIN CATCH
	   SET @mensaje = RTRIM(ERROR_MESSAGE())+', procedimiento:'+RTRIM(ERROR_PROCEDURE())+', línea: '+RTRIM(ERROR_LINE())  

		RAISERROR (@mensaje,18,-1)
	  
    END CATCH;
    END;
    
END			  



```
