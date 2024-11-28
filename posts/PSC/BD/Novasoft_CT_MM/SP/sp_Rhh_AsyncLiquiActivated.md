# Stored Procedure: sp_Rhh_AsyncLiquiActivated

## Usa los objetos:
- [[Rhh_AsyncLiquiQueue]]
- [[rhh_progresoliq]]
- [[sp_rhh_LiqErrInfo]]

```sql
-- =============================================
-- Author:		Ricardo Santamaría Vanegas
-- Create date: Abril 15 de 2021
-- Description: Este es el procedimiento asociado a la cola de liquidaciones [Rhh_AsyncLiquiQueue]
-- =============================================
CREATE PROCEDURE sp_Rhh_AsyncLiquiActivated
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @h UNIQUEIDENTIFIER;
    DECLARE @messageTypeName SYSNAME;
    DECLARE @messageBody VARBINARY(MAX);
    DECLARE @xmlBody XML;
    DECLARE @procedureName SYSNAME;
    DECLARE @startTime DATETIME;
    DECLARE @finishTime DATETIME;

    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
    SET NOCOUNT ON;

    DECLARE @fPFecLiq DATETIME;
    DECLARE @fPFec_corte DATETIME;
    DECLARE @cPCad_liqu NVARCHAR(300);
    DECLARE @cPCad_Selec NVARCHAR(MAX) = NULL;
    DECLARE @cproy_sal NUMERIC(6, 2)  = 0;
    DECLARE @thread INT = 0; --Hilo de ejecución, usado en .NET
    DECLARE @cConepDepura VARCHAR(6) = NULL;
    DECLARE @nNumDepPass TINYINT = 1; --Número de la pasada en que se debe capturar y detener para depurar
    DECLARE @fFecDepPass DATETIME = NULL; --fecha del período en que se debe capturar y detener para depurar
    DECLARE @nP_SPID INT = 0; --SPID manejado desde .NET
    DECLARE @nP_spKey INT = 0;
    DECLARE @IDL_Num BIGINT;
    DECLARE @cPlantilla NVARCHAR(30) = NULL;
    DECLARE @nIndSeg BIT = 0; --Variable para mostrar detalles del proceso
    DECLARE @nNumGpo INT = NULL; --Número de grupo a liquidar
    DECLARE @MessageErr NVARCHAR(MAX);

    BEGIN TRY
	   RECEIVE TOP (1) @h = [conversation_handle],
				    @messageTypeName = [message_type_name],
				    @messageBody = [message_body] FROM [Rhh_AsyncLiquiQueue];

	   UPDATE rhh_progresoliq
		SET mensaje_error = N'Inicia el activador con Manejador: ' + CONVERT(VARCHAR, @h)
	   WHERE spID = @nP_SPID AND keyID = @nP_spKey AND Num_Gpo = @nNumGpo;

	   IF(@h IS NOT NULL
		)
	   BEGIN
		  IF(@messageTypeName = N'DEFAULT')
		  BEGIN
			 -- Se extrae el nombre del procedimiento y los parámetros
			 --
			 SELECT @xmlBody = CAST(@messageBody AS XML);
/*			 SELECT @procedureName = @xmlBody.value( '(//Procedure/Name)[1]', 'sysname' );
			 SELECT '@fPFecLiq' = CAST(CAST(@xmlBody.query( '/Procedure/Params/fPFecLiq/text()' ) AS NVARCHAR(MAX)) AS DATETIME);*/
			 SELECT @procedureName = @xmlBody.query( '/Procedure/Name/text()' ).value( '.[1]', 'SYSNAME' );
			 SELECT @fPFecLiq = @xmlBody.query( '/Procedure/Params/fPFecLiq/text()' ).value( '.[1]', 'DATETIME' );
			 SELECT @fPFec_corte = @xmlBody.query( '/Procedure/Params/fPFec_corte/text()' ).value( '.[1]', 'DATETIME' );
			 SELECT @cPCad_liqu = @xmlBody.query( '/Procedure/Params/cPCad_liqu/text()' ).value( '.[1]', 'NVARCHAR(MAX)' );
			 SELECT @cPCad_Selec = @xmlBody.query( '/Procedure/Params/cPCad_Selec/text()' ).value( '.[1]', 'NVARCHAR(MAX)' );
			 SELECT @cproy_sal = @xmlBody.query( '/Procedure/Params/cproy_sal/text()' ).value( '.[1]', 'NUMERIC(6,2)' );
			 SELECT @thread = @xmlBody.query( '/Procedure/Params/thread/text()' ).value( '.[1]', 'INT' );
			 SELECT @cConepDepura = @xmlBody.query( '/Procedure/Params/cConepDepura/text()' ).value( '.[1]', 'VARCHAR(6)' );
			 SELECT @nNumDepPass = @xmlBody.query( '/Procedure/Params/nNumDepPass/text()' ).value( '.[1]', 'TINYINT' );
			 SELECT @fFecDepPass = @xmlBody.query( '/Procedure/Params/fFecDepPass/text()' ).value( '.[1]', 'DATETIME' );
			 SELECT @nP_SPID = @xmlBody.query( '/Procedure/Params/nP_SPID/text()' ).value( '.[1]', 'INT' );
			 SELECT @nP_spKey = @xmlBody.query( '/Procedure/Params/nP_spKey/text()' ).value( '.[1]', 'INT' );
			 SELECT @IDL_Num = @xmlBody.query( '/Procedure/Params/IDL_Num/text()' ).value( '.[1]', 'BIGINT' );
			 SELECT @cPlantilla = @xmlBody.query( '/Procedure/Params/cPlantilla/text()' ).value( '.[1]', 'NVARCHAR(30)' );
			 SELECT @nIndSeg = @xmlBody.query( '/Procedure/Params/nIndSeg/text()' ).value( '.[1]', 'BIT' );
			 SELECT @nNumGpo = @xmlBody.query( '/Procedure/Params/NumGpo/text()' ).value( '.[1]', 'SMALLINT' );

			 SELECT @startTime = GETDATE();
			 BEGIN TRY
				UPDATE rhh_progresoliq
				  SET hora_inicio = @starttime
				WHERE spID = @nP_SPID AND keyID = @nP_spKey AND Num_Gpo = @nNumGpo;

				EXEC @procedureName @fPFecLiq = @fPFecLiq,
								@fPFec_corte = @fPFec_corte,
								@cPCad_liqu = @cPCad_liqu,
								@cPCad_Selec = @cPCad_Selec,
								@cproy_sal = @cproy_sal,
								@thread = @thread,
								@cConepDepura = @cConepDepura,
								@nNumDepPass = @nNumDepPass,
								@fFecDepPass = @fFecDepPass,
								@nP_SPID = @nP_SPID,
								@nNumGpo = @nNumGpo,
								@nP_spKey = @nP_spKey,
								@IDL_NUM = @IDL_Num,
								@cPlantilla = @cPlantilla;

				SELECT @finishTime = GETDATE();

				UPDATE rhh_progresoliq
				  SET hora_fin = @finishTime
				WHERE spID = @nP_SPID AND keyID = @nP_spKey AND Num_Gpo = @nNumGpo;

				END CONVERSATION @h;
			 END TRY
			 BEGIN CATCH
				EXEC sp_rhh_LiqErrInfo @MessageErr OUTPUT;

				UPDATE rhh_progresoliq
				  SET mensaje_error = @MessageErr
				WHERE spID = @nP_SPID AND keyID = @nP_spKey AND Num_Gpo = @nNumGpo;

				RAISERROR(@MessageErr, 16, 10);

				END CONVERSATION @h;
			 END CATCH;

		  END;
			 ELSE
		  BEGIN
			 IF(@messageTypeName = N'http://schemas.microsoft.com/SQL/ServiceBroker/EndDialog')
			 BEGIN
				END CONVERSATION @h;
			 END;
				ELSE
			 BEGIN
				IF(@messageTypeName = N'http://schemas.microsoft.com/SQL/ServiceBroker/Error')
				BEGIN
				    DECLARE @errorNumber  INT,
						  @errorMessage NVARCHAR(4000);

				    SELECT @xmlBody = CAST(@messageBody AS XML);

				    WITH XMLNAMESPACES(DEFAULT N'http://schemas.microsoft.com/SQL/ServiceBroker/Error')
					    SELECT @errorNumber = @xmlBody.value( '(/Error/Code)[1]', 'INT' ),
							 @errorMessage = @xmlBody.value( '(/Error/Description)[1]', 'NVARCHAR(4000)' );

				    UPDATE rhh_progresoliq
					 SET numero_error = @errorNumber,
						mensaje_error = @errorMessage
				    WHERE spID = @nP_SPID AND keyID = @nP_spKey AND Num_Gpo = @nNumGpo;

				    END CONVERSATION @h;
				END;
				    ELSE
				BEGIN
				    RAISERROR(N'Mensage recibido del tipo no esperado: %s', 16, 50, @messageTypeName);
				END;
			 END;
		  END;
	   END;
    END TRY
    BEGIN CATCH
	   EXEC sp_rhh_LiqErrInfo @MessageErr OUTPUT;

	   UPDATE rhh_progresoliq
		SET mensaje_error = @MessageErr
	   WHERE spID = @nP_SPID AND keyID = @nP_spKey AND Num_Gpo = @nNumGpo;

	   RAISERROR(@MessageErr, 1, 60) WITH log;
    END CATCH;
END;

```
