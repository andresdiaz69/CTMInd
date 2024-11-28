# Stored Procedure: SCC_sp_Mant_SCC_Componentes

## Usa los objetos:
- [[SCC_Cabeza]]
- [[SCC_Componentes]]
- [[SCC_Tip_Accion]]
- [[SCC_Tipo_Compo]]

```sql
-- =============================================
-- Author:		Angélica Maricela Garcia Galvis
-- Create date:	Noviembre 2015
-- Description:	Realiza las diferentes operaciones (Inserta, Elimina, Actualiza y Consulta)
--				En la tabla SCC_Componentes
-- =============================================
CREATE PROCEDURE [dbo].[SCC_sp_Mant_SCC_Componentes] 
	   @Tran TINYINT, /* 1-INSERTA, 2-ACTUALIZA,3-ELIMINA,4-CONSULTA*/
	   @Nro_Formato INT,
	   @Nro_Item INT,
	   @Nro_Tarea INT, 
	   @Nombre_Componente VARCHAR(200),
	   @Cod_Tip_Com VARCHAR(4),
	   @Fecha_Cambio DATETIME, 
	   @Cod_Accion VARCHAR(4),
	   @Cod_Apl VARCHAR(3),
	   @Cod_linea VARCHAR(3),
	   @Comentarios VARCHAR(MAX),
	   @Version VARCHAR(8),
	   @Nombre_Componente_nuevo VARCHAR(200)=NULL,
	   @Version_Nuevo VARCHAR(8) = NULL,
	   @Cod_Tip_Com_Nuevo VARCHAR(4) = NULL,
	   @Cod_Usu_responsable SYSNAME

AS
BEGIN
    SET NOCOUNT ON;
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

    DECLARE @Mensaje NVARCHAR(500);
    DECLARE @ErrorMessage NVARCHAR(4000);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

	
	IF @Tran = 1 /**Inserta los datos en la tabla**/
	BEGIN
	  BEGIN TRY
	   BEGIN TRAN INSERTA 	
				INSERT INTO SCC_Componentes( Nro_Formato,
										   Nro_Item ,
										   Nro_Tarea , 
										   Nombre_Componente,
										   Cod_Tip_Com,
										   Fecha_Cambio,
										   Cod_Accion,
										   Cod_Apl,
										   Cod_linea,
										   Comentarios,
										   Version,
										   Cod_usu_responsable)
				VALUES (    @Nro_Formato,
						  @Nro_Item ,
						  @Nro_Tarea , 
						  @Nombre_Componente,
						  @Cod_Tip_Com,
						  @Fecha_Cambio,
						  @Cod_Accion,
						  @Cod_Apl,
						  @Cod_linea,
						  @Comentarios,
						  @Version,
						  @Cod_Usu_responsable )

			IF XACT_STATE() = 1
			 COMMIT TRAN INSERTA
		  END TRY
		  BEGIN CATCH
			 SELECT @ErrorMessage = ERROR_MESSAGE(),
			 @ErrorSeverity = ERROR_SEVERITY(),
			 @ErrorState = ERROR_STATE();
			 -- Uso de Raiserror para la descripción del error presentado en este bloque 
			 RAISERROR (@ErrorMessage, -- Texto de Mensaje
					  @ErrorSeverity, -- Severidad
					  @ErrorState -- Estado
					  );

			IF XACT_STATE()<> 0
				ROLLBACK TRAN INSERTA
			IF XACT_STATE() = 1
				COMMIT TRANSACTION
		
		  
		  END CATCH
	END
	IF @Tran = 2 /**Actualiza los datos en la tabla**/
	BEGIN
		BEGIN TRY
			BEGIN TRAN ACTUALIZA
			
				UPDATE	SCC_Componentes
				SET		Nombre_Componente = @Nombre_Componente_nuevo,
						Cod_Tip_Com=  @Cod_Tip_Com_Nuevo,
						Fecha_Cambio=  @Fecha_Cambio,
						Cod_Accion=  @Cod_Accion,
						Cod_Apl=  @Cod_Apl,
						Cod_linea=  @Cod_linea,
						Comentarios=  @Comentarios,
						Version =  @Version_Nuevo,  
						Cod_usu_responsable =@Cod_Usu_responsable		    
				WHERE	Nro_Formato=  @Nro_Formato
						AND Nro_Item=  @Nro_Item 
						AND Nro_Tarea=  @Nro_Tarea  
						AND Nombre_Componente=  @Nombre_Componente
						AND version =  @Version
						AND Cod_Tip_Com = @Cod_Tip_Com

			COMMIT TRAN ACTUALIZA
		END TRY
		BEGIN CATCH
		  SELECT @ErrorMessage = ERROR_MESSAGE(),
		  @ErrorSeverity = ERROR_SEVERITY(),
		  @ErrorState = ERROR_STATE();
		  -- Uso de Raiserror para la descripción del error presentado en este bloque 
		  RAISERROR (@ErrorMessage, -- Texto de Mensaje
				   @ErrorSeverity, -- Severidad
				   @ErrorState -- Estado
				   );

			
		  ROLLBACK TRAN ACTUALIZA
			
		END CATCH
	END
	IF @Tran = 3 /**Elimina los datos en la tabla**/
	BEGIN
		BEGIN TRY
			BEGIN TRAN ELIMINA
			
				DELETE FROM  SCC_Componentes
				WHERE	Nro_Formato=  @Nro_Formato
						AND Nro_Item=  @Nro_Item 
						AND Nro_Tarea=  @Nro_Tarea  
						AND Nombre_Componente=  @Nombre_Componente 
						AND Cod_Tip_Com=  @Cod_Tip_Com
						AND version =  @Version
			COMMIT TRAN ELIMINA
		END TRY
		BEGIN CATCH
		  SELECT @ErrorMessage = ERROR_MESSAGE(),
		  @ErrorSeverity = ERROR_SEVERITY(),
		  @ErrorState = ERROR_STATE();
		  -- Uso de Raiserror para la descripción del error presentado en este bloque 
		  RAISERROR (@ErrorMessage, -- Texto de Mensaje
				   @ErrorSeverity, -- Severidad
				   @ErrorState -- Estado
				   );
			ROLLBACK TRAN ELIMINA
		END CATCH
	END

	IF @Tran = 4 /**Consulta los datos en la tabla**/
	BEGIN
		BEGIN TRY
			BEGIN TRAN CONSULTA
			
			 SELECT COM. Nro_Formato
				    ,COM.Nro_Item 
				    ,COM.Nro_Tarea  
				    ,COM.Nombre_Componente
				    ,COM.Cod_Tip_Com
				    ,COM.Fecha_Cambio
				    ,COM.Cod_Accion
				    ,COM.Cod_Apl
					,COM.Cod_Linea
				    ,COM.Comentarios
					,Version AS 'Version'
					,TC.Descrip AS DescripTipoComponente
					,TA.Descrip AS DescripAccion
					,Nro_SCC
			 FROM   SCC_Componentes  AS COM
			 INNER JOIN  SCC_Tipo_Compo TC  ON TC.Cod_Tip_Com=COM.Cod_Tip_Com
			 INNER JOIN  SCC_Tip_Accion TA ON TA.Cod_Accion = COM.Cod_Accion
			 INNER JOIN SCC_Cabeza AS CA ON CA.Nro_Formato = COM.Nro_Formato					
			 WHERE  COM.Nro_Formato=  @Nro_Formato
				    AND Nro_Item=  @Nro_Item 
				    AND Nro_Tarea=  @Nro_Tarea  
				    --AND Nombre_Componente=  @Nombre_Componente 

			COMMIT TRAN CONSULTA
		END TRY
		BEGIN CATCH
		  SELECT @ErrorMessage = ERROR_MESSAGE(),
		  @ErrorSeverity = ERROR_SEVERITY(),
		  @ErrorState = ERROR_STATE();
		  -- Uso de Raiserror para la descripción del error presentado en este bloque 
		  RAISERROR (@ErrorMessage, -- Texto de Mensaje
				   @ErrorSeverity, -- Severidad
				   @ErrorState -- Estado
				   );
			ROLLBACK TRAN CONSULTA
		END CATCH
	END

	IF @Tran = 5/**Consulta los datos en la tabla**/
	BEGIN
		BEGIN TRY
			BEGIN TRAN CONSULTA
			
			 SELECT Cod_Tip_Com,
					Fecha_Cambio,
				    Cod_Accion,
				    Version as 'Version',
					Cod_Apl,
					Cod_linea,
					Cod_usu_responsable
			 FROM   SCC_Componentes AS com 
					
			 WHERE   Nro_Formato=  @Nro_Formato
				    AND Nro_Item=  @Nro_Item 
				    AND Nro_Tarea=  @Nro_Tarea  
				    AND Nombre_Componente=  @Nombre_Componente 

			COMMIT TRAN CONSULTA
		END TRY
		BEGIN CATCH
		  SELECT @ErrorMessage = ERROR_MESSAGE(),
		  @ErrorSeverity = ERROR_SEVERITY(),
		  @ErrorState = ERROR_STATE();
		  -- Uso de Raiserror para la descripción del error presentado en este bloque 
		  RAISERROR (@ErrorMessage, -- Texto de Mensaje
				   @ErrorSeverity, -- Severidad
				   @ErrorState -- Estado
				   );
			ROLLBACK TRAN CONSULTA
		END CATCH
	END

END





```
