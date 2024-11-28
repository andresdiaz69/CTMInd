# Stored Procedure: SCC_Sp_Mant_SCC_Tarea_responsable

## Usa los objetos:
- [[fn_SCC_Consecutivo]]
- [[fn_SCC_Nro_Formato]]
- [[SCC_Cabeza]]
- [[SCC_Tarea_responsable]]
- [[SCC_TareaItem]]
- [[SCC_Tramite_Solicitud]]

```sql

-- =============================================
-- Author:		Angélica Maricela Garcia Galvis
-- Create date:	Noviembre 2015
-- Description:	Realiza las diferentes operaciones (Inserta, Elimina, Actualiza y Consulta)
--				En la tabla SCC_Tarea_responsable
-- EXEC SCC_Sp_Mant_SCC_Tarea_responsable 4,18,1,'','','','','',''
-- =============================================
CREATE PROCEDURE [dbo].[SCC_Sp_Mant_SCC_Tarea_responsable] 
	   @Tran TINYINT, /* 1-INSERTA, 2-ACTUALIZA,3-ELIMINA,4-CONSULTA*/
	   @Nro_SCC VARCHAR(15), 
	   @Nro_Item INT  ,
	   @Nro_Tarea INT=null, 
	   @Cod_Usu_responsable SYSNAME,
	   @Cod_Usu_Nue_responsable SYSNAME,
	   @Fecha_inicio DATETIME,
	   @Fecha_Fin DATETIME,	
	   @DtReasigna XML =''
AS
BEGIN
    SET NOCOUNT ON;
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
    
    
    DECLARE @Mensaje NVARCHAR(500);
    DECLARE @ErrorMessage NVARCHAR(4000);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;
    DECLARE @consecutivo INT
    DECLARE @Consecutivo_ant INT
    DECLARE @IdDocumento INT;
    DECLARE @Nro_Formato INT = dbo.fn_SCC_Nro_Formato(@Nro_SCC)
	
	IF @Tran = 1 /**Inserta los datos en la tabla**/
	BEGIN
	  BEGIN TRY
	    SET @consecutivo = dbo.fn_SCC_Consecutivo ('TR',@Nro_Formato,@Nro_Item,@Nro_Tarea)
	   
	   BEGIN TRAN INSERTA 	
	  			INSERT INTO SCC_Tarea_responsable( Nro_Formato,
									   Nro_Item ,
									   Nro_Tarea , 
									   Cod_Usu_responsable ,
									   Fecha_inicio ,
									   Fecha_Fin)
				VALUES (    @Nro_Formato,
						  @Nro_Item ,
						  @Nro_Tarea , 
						  @Cod_Usu_responsable ,
						  @Fecha_inicio ,
						  @Fecha_Fin )
		  	
		
		
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
	
	
	IF @Tran = 4 /**Consulta los datos en la tabla**/
	BEGIN
		BEGIN TRY
			BEGIN TRAN CONSULTA
			
			 SELECT  TR.Nro_Formato
				    ,TR.Nro_Item 
				    ,TR.Nro_Tarea  
				    ,TI.Descripcion_Tarea 
				    ,TI.EsfuerzoEstimado 
				    ,TR.Esfuerzo_Real 
				    ,TR.EstadoTarea 
				    ,TR.Cod_Usu_responsable 
				    ,TR.Fecha_inicio 
				    ,TR.Fecha_Fin
					,TS.Descripcion
					,CA.Nro_SCC
					,CAST( 0 AS BIT) as Marca
			 FROM    SCC_TareaItem TI
			 INNER JOIN SCC_Tarea_responsable TR ON TI.Nro_Formato= TR.Nro_Formato AND TI.Nro_Item = TR.Nro_Item  AND TI.Nro_Tarea = Tr.Nro_Tarea
			 INNER JOIN SCC_Tramite_Solicitud TS ON TR.EstadoTarea = TS.Ind_tramite
			 INNER JOIN SCC_Cabeza AS CA ON CA.Nro_Formato = TI.Nro_Formato
			 WHERE   TI.Nro_Formato= @Nro_Formato 
				    AND TR.Nro_Item = @Nro_Item 
				    AND TR.EstadoTarea IN(2,0)
				    AND TR.Fecha_inicio > @Fecha_inicio
				    AND (TR.Fecha_fin IS NULL)
				    AND TR.Cod_Usu_responsable LIKE @Cod_Usu_responsable
			

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
	IF @Tran = 5 /**Consulta los datos en la tabla modo edicion**/
	BEGIN
		BEGIN TRY
			BEGIN TRAN CONSULTA_EDICION
			
			 SELECT EstadoTarea ,
				    Fecha_inicio ,
				    Fecha_Fin
					
			 FROM    SCC_Tarea_responsable
			 WHERE   Nro_Formato= @Nro_Formato 
				    AND Nro_Item = @Nro_Item 
				    AND Nro_Tarea= @Nro_Tarea 

			COMMIT TRAN CONSULTA_EDICION
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
			ROLLBACK TRAN CONSULTA_EDICION
		END CATCH
	END
	IF @Tran = 6 /***reasignación tareas***/
	BEGIN
	    EXEC sp_xml_preparedocument @IdDocumento OUTPUT,
							 @DtReasigna;
	    CREATE TABLE #T_SCC_Reasigna (
	    
	    Nro_Formato INT,
	    Nro_Item INT,
	    Nro_Tarea INT,
	    Cod_Usu_responsable VARCHAR(128) COLLATE DATABASE_DEFAULT NOT NULL ,
	    Consecutivo INT	    
	    )

	   INSERT INTO #T_SCC_Reasigna( Nro_Formato, Nro_Item,Nro_Tarea,Cod_Usu_responsable,Consecutivo)
	   SELECT Nro_Formato, Nro_Item,Nro_Tarea,Cod_Usu_responsable,Consecutivo
	   FROM OPENXML(@IdDocumento, '/ROOT/Reasigna', 1) WITH(Nro_Formato INT, Nro_Item INT,Nro_Tarea INT, Cod_Usu_responsable VARCHAR(128), Consecutivo INT);
	   EXEC sp_xml_removedocument @IdDocumento

	   BEGIN TRAN REASIGNA
		  
		  UPDATE SCC_Tarea_responsable
		  SET Fecha_Fin = DATEADD(DAY,-1,GETDATE()), EstadoTarea = 0
		  FROM SCC_Tarea_responsable AS TR
		  INNER JOIN #T_SCC_Reasigna AS R ON TR.Nro_Formato= R.Nro_Formato AND TR.Nro_Item = R.Nro_Item AND TR.Nro_Tarea= R.Nro_Tarea

		  INSERT INTO SCC_Tarea_responsable (Nro_Formato,Nro_Item,Nro_Tarea,Estadotarea,Cod_Usu_responsable,Fecha_inicio,Consecutivo)
		  SELECT   Nro_Formato, Nro_Item, Nro_Tarea,2,@Cod_Usu_Nue_responsable, GETDATE(), (ROW_NUMBER() OVER (ORDER BY Nro_formato))+1
		  FROM #T_SCC_Reasigna


	   COMMIT TRAN 

	END

END




```
