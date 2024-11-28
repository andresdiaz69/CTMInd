# Stored Procedure: sp_rhh_AsyncLiquiInvoke

## Usa los objetos:
- [[fn_rhh_VG]]
- [[Rhh_LiquiGrupoEmp]]
- [[rhh_pertlq]]
- [[rhh_ProgresoLiq]]
- [[rhh_tbestlab]]
- [[sis_aplicacion]]
- [[sp_rhh_LiqErrInfo]]

```sql
-- =============================================
-- Author:		Ricardo Santamaría Vanegas
-- Create date: Abril 15 de 2021
-- Description: Este es el procedimiento que pone los mensajes de liquidación en la cola [AsyncLiquiQueue]
-- =============================================
CREATE PROCEDURE [sp_rhh_AsyncLiquiInvoke]
	@fPFecLiq     DATETIME,
	@fPFec_corte  DATETIME,
	@cPCad_liqu   NVARCHAR(300),
	@cPCad_Selec  NVARCHAR(MAX)    = NULL,
	@cproy_sal    NUMERIC(6, 2)     = 0,
	@thread       INT              = 0, --Hilo de ejecución, usado en .NET
	@cConepDepura VARCHAR(6)       = NULL,
	@nNumDepPass  TINYINT          = 1, --Número de la pasada en que se debe capturar y detener para depurar
	@fFecDepPass  DATETIME         = NULL, --fecha del período en que se debe capturar y detener para depurar
	@nP_SPID      SMALLINT         = 0, --SPID manejado desde .NET
	@nP_spKey     INT              = 0,
	@IDL_NUM      BIGINT           = NULL, --Variable con el identificador único del proceso
	@cPlantilla   NVARCHAR(30)     = NULL,
	@nIndSeg      BIT              = 0, --Variable para mostrar detalles del proceso
	@token        UNIQUEIDENTIFIER OUTPUT
AS
BEGIN
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
    SET NOCOUNT ON;

    DECLARE @h UNIQUEIDENTIFIER;
    DECLARE @xmlBody XML;

    DECLARE @cCadena NVARCHAR(MAX);
    DECLARE @cCadInsert NVARCHAR(MAX);
    DECLARE @cCadPlant NVARCHAR(MAX);
    DECLARE @cCadWhere NVARCHAR(MAX) = '';
    DECLARE @cCad_Selec NVARCHAR(MAX);
    DECLARE @nCantEmplea INT;
    DECLARE @nCantXGrupo INT;
    DECLARE @nGposResult INT;
    DECLARE @nGpoActual INT = 0;
    DECLARE @MessageErr NVARCHAR(MAX);
    DECLARE @nIndTabPlantilla BIT = 0;
    DECLARE @cTipInsta CHAR(1);

    SELECT @cTipInsta = emp_apl
    FROM sis_aplicacion
    WHERE cod_apl = 'NOM';

    IF @cPCad_Selec IS NULL OR LEN(@cPCad_Selec) = 0
    BEGIN
	   SET @cCad_Selec = NULL;
    END;
	   ELSE
    BEGIN
	   SET @cCad_Selec = RTRIM(@cPCad_Selec);
    END;

    DECLARE @nNumMinEmpLiqPara INT= ISNULL(CONVERT(INT, dbo.fn_rhh_VG( 223, NULL )), 0);/*Número mínimo para iniciar liquidacionres en paralelo*/
    DECLARE @nNumLiqParalelo INT= ISNULL(CONVERT(INT, dbo.fn_rhh_VG( 224, NULL )), 0);/*Máximo número de liquidaciones en paralelo*/

    DECLARE @fFec_corte DATETIME;

    --Creación de la tabla Temporal #T_rhh_PerTLq 
    --con un año atras y otro adelante respecto de la fecha de corte
    SET @fFec_corte = @fPFec_corte;

    IF OBJECT_ID('TempDb..#T_EmpleadosPlantilla') IS NOT NULL
    BEGIN
	   SET @nIndTabPlantilla = 1;
    END;

    SELECT *,
		 fec_fin AS fec_fin_real
    INTO #T_Rhh_PerTLq
    FROM rhh_pertlq AS P
    WHERE P.fec_fin BETWEEN DATEADD(YEAR, -1, @fFec_corte) AND DATEADD(YEAR, 1, @fFec_corte);

    --Creación de la tabla #T_Rhh_EmpleaLiqPrlelo
    CREATE TABLE #T_Rhh_EmpleaLiqPrlelo(
	    nP_spKey INT,
	    nSPID    SMALLINT,
	    NumGpo   SMALLINT,
	    cod_emp  CHAR(12)
	    PRIMARY KEY,
	    est_lab  CHAR(2) COLLATE DATABASE_DEFAULT
							    );

    CREATE NONCLUSTERED INDEX IX_TmpEmpleaLiqPrlelo_01 ON #T_Rhh_EmpleaLiqPrlelo( nP_spKey, nSPID, NumGpo, cod_emp );
    CREATE NONCLUSTERED INDEX IX_TmpEmpleaLiqPrlelo_02 ON #T_Rhh_EmpleaLiqPrlelo( NumGpo );

    SET @cCadInsert = 'INSERT' + CHAR(13);
    SET @cCadInsert = @cCadInsert + 'INTO	#T_Rhh_EmpleaLiqPrlelo (nP_spKey, nSPID, cod_emp, est_lab)' + CHAR(13);

    IF @cPCad_liqu = '16'
    BEGIN
	   DECLARE @fFecIniAno DATETIME= CONVERT(VARCHAR, YEAR(@fFec_corte)) + '0101';
	   SET @cCadena = 'WITH HisLab AS (' + CHAR(13);
	   SET @cCadena = @cCadena + '	SELECT DISTINCT H.cod_emp' + CHAR(13);
	   SET @cCadena = @cCadena + '	  FROM rhh_Hislab AS H' + CHAR(13);
	   SET @cCadena = @cCadena +
	   '	  INNER JOIN GTH_Contratos AS C ON C.cod_con = H.cod_con AND C.cod_emp = H.cod_emp AND C.cod_est NOT IN(''0'', ''3'')' + CHAR(13);
	   SET @cCadena = @cCadena + '	  INNER JOIN rhh_TipNovLab AS N ON H.tip_nov = N.tip_nov AND N.ind_ConPago = 1' + CHAR(13);
	   SET @cCadena = @cCadena + '	  WHERE ind_trslpo = 0' + CHAR(13);
	   SET @cCadena = @cCadena + '	    AND ((H.fec_ini <= ''' + CONVERT(VARCHAR, @fFecIniAno, 112) +
	   ''' AND (H.fec_fin IS NULL OR H.fec_fin >= ''' + CONVERT(VARCHAR, @fFecIniAno, 112) + '''))' + CHAR(13);
	   SET @cCadena = @cCadena + '		   OR (H.fec_ini >= ''' + CONVERT(VARCHAR, @fFecIniAno, 112) + ''' AND H.fec_ini <= ''' + CONVERT(
	   VARCHAR, @fFec_corte, 112) + ''')))' + CHAR(13);
	   SET @cCadena = @cCadena + @cCadInsert;
	   SET @cCadena = @cCadena + '	  SELECT  ' + CONVERT(VARCHAR, @nP_spKey) + ' AS nP_spKey, ' + CHAR(13);
	   SET @cCadena = @cCadena + '			' + CONVERT(VARCHAR, @nP_SPID) + ' AS nSPID, ' + CHAR(13);
	   SET @cCadena = @cCadena + '			a.cod_emp, a.est_lab ' + CHAR(13);
	   SET @cCadena = @cCadena + '	  FROM rhh_emplea AS a' + CHAR(13);
	   SET @cCadena = @cCadena + '	  INNER JOIN HisLab AS H ON H.cod_emp = A.cod_emp' + CHAR(13);

	   IF @cCad_Selec IS NOT NULL
	   BEGIN
		  SET @cCadWhere = @cCadWhere + '	  WHERE (' + RTRIM(@cCad_Selec) + ') ';
	   END;

    END;
	   ELSE
    BEGIN
	   SET @cCadena = @cCadInsert + '	  SELECT	DISTINCT ' + CONVERT(VARCHAR, @nP_spKey) + ' AS nP_spKey, ' + CHAR(13);
	   SET @cCadena = @cCadena + '			' + CONVERT(VARCHAR, @nP_SPID) + ' AS nSPID, ' + CHAR(13);
	   SET @cCadena = @cCadena + '			a.cod_emp, a.est_lab ' + CHAR(13);
	   SET @cCadena = @cCadena + '	  FROM	rhh_emplea a' + CHAR(13);
	   SET @cCadena = @cCadena + '	  INNER	JOIN #T_Rhh_PerTLq P ON P.fec_fin = ''';
	   SET @cCadena = @cCadena + CONVERT(VARCHAR, @fFec_corte, 112) + '''' + CHAR(13);
	   SET @cCadena = @cCadena + '			AND P.cod_tlq = dbo.fn_rhh_ValParmConv(a.cod_emp,''';
	   SET @cCadena = @cCadena + CONVERT(VARCHAR, @fFec_corte, 112) + ''',''cod_tlq'')' + CHAR(13);
	   SET @cCadena = @cCadena + '	  INNER	JOIN rhh_hislab H ON H.tip_pag > 0 AND a.cod_emp = H.cod_emp' + CHAR(13);
	   SET @cCadena = @cCadena + '			AND H.fec_ini <=  P.fec_fin ' + CHAR(13);
	   SET @cCadena = @cCadena + '			AND (H.fec_fin IS NULL OR H.fec_fin >= P.fec_ini ) ' + CHAR(13);
	   SET @cCadena = @cCadena + '			AND H.sec_car = 1 ' + CHAR(13);
	   SET @cCadena = @cCadena + '			AND H.fec_ini = (' + CHAR(13);
	   SET @cCadena = @cCadena + '							SELECT  MIN(Hi.fec_ini) ' + CHAR(13);
	   SET @cCadena = @cCadena + '							FROM	   rhh_hislab Hi ' + CHAR(13);
	   SET @cCadena = @cCadena + '							WHERE   Hi.tip_pag > 0 AND Hi.cod_con = H.cod_con' + CHAR(13);
	   SET @cCadena = @cCadena + '								   AND Hi.cod_emp = H.cod_emp' + CHAR(13);
	   SET @cCadena = @cCadena + '								   AND Hi.sec_car = 1' + CHAR(13);
	   SET @cCadena = @cCadena + '								   AND Hi.fec_ini <= P.fec_fin ' + CHAR(13);
	   SET @cCadena = @cCadena + '								   AND (Hi.fec_fin IS NULL ';
	   SET @cCadena = @cCadena + 'OR Hi.fec_fin >= P.fec_ini)' + CHAR(13);
	   SET @cCadena = @cCadena + '						 )' + CHAR(13);
	   /*				Los contratos ya liquidados o no aprobados no deben ser procesados*/
	   SET @cCadena = @cCadena + '	  INNER	JOIN GTH_Contratos C ON C.cod_con = H.cod_con ' + CHAR(13);
	   SET @cCadena = @cCadena + '			AND C.cod_emp = H.cod_emp AND C.cod_est NOT IN (''0'',''3'') ' + CHAR(13);
	   SET @cCadena = @cCadena + '	  INNER	JOIN rhh_TipNovLab N ON H.tip_nov = N.tip_nov AND N.ind_ConPago = 1 ' + CHAR(13);

	   SET @cCadWhere = '	  WHERE	ind_trslpo=0 AND (a.fec_egr >= P.fec_ini' + ' OR a.fec_egr IS NULL)' + CHAR(13);

	   IF @cCad_Selec IS NOT NULL
	   BEGIN
		  SET @cCadWhere = @cCadWhere + '			AND (' + RTRIM(@cCad_Selec) + ') ';
	   END;
    END;

    SET @cCadPlant = '';
    IF @nIndTabPlantilla = 1
    BEGIN
	   SET @cCadPlant = '		  INNER	JOIN #T_EmpleadosPlantilla Pl ON Pl.cod_emp = a.cod_emp ' + CHAR(13);
    END;

    SET @cCadena = @cCadena + @cCadPlant + @cCadWhere;

    BEGIN TRY
	   /*Borrado de los datos de la tabla Rhh_LiquiGrupoEmp asociados a un KeyID que ya no está en ejecución*/
	   DELETE Rhh_LiquiGrupoEmp
	   FROM Rhh_LiquiGrupoEmp G
	   LEFT OUTER JOIN rhh_ProgresoLiq P ON P.keyID = G.KeyID
	   WHERE P.KeyID IS NULL;

	   EXEC (@cCadena);

	   /*Borrar lo empleados que tengan un estado laboral no liquidable*/
	   IF @cPCad_liqu <> '16'
	   BEGIN
		  DELETE #T_Rhh_EmpleaLiqPrlelo
		  FROM #T_Rhh_EmpleaLiqPrlelo T
		  INNER JOIN rhh_tbestlab E ON T.est_lab = E.est_lab AND E.ind_liq <> 1;
	   END;

	   SELECT @nCantEmplea = COUNT(cod_emp)
	   FROM #T_Rhh_EmpleaLiqPrlelo;

	   IF @nCantEmplea >= @nNumMinEmpLiqPara
	   BEGIN
		  SET @nCantXGrupo = CEILING(@nCantEmplea / (@nNumLiqParalelo * 1.0));
	   END;
		  ELSE
	   BEGIN
		  SET @token = NULL;
		  RETURN;
	   END;

	   /*Se numeran los empleados para poder determinarf los grupos*/
	   WITH empleados
		   AS (SELECT cod_emp,
				    ROW_NUMBER() OVER(
				    ORDER BY cod_emp) AS Numero
			  FROM #T_Rhh_EmpleaLiqPrlelo)
		   UPDATE #T_Rhh_EmpleaLiqPrlelo
			SET NumGpo = N.Numero
		   FROM #T_Rhh_EmpleaLiqPrlelo E
		   INNER JOIN empleados N ON E.cod_emp = N.cod_emp;

	   /*Se marcan los empleados para cada grupo al que pertenecen*/
	   UPDATE #T_Rhh_EmpleaLiqPrlelo
		SET NumGpo = NumGpo / @nCantXGrupo + CASE NumGpo % @nCantXGrupo
										 WHEN 0 THEN 0
										 ELSE 1
									  END;
    END TRY
    BEGIN CATCH
	   EXEC sp_rhh_LiqErrInfo @MessageErr OUTPUT;

	   SET @MessageErr = 'Error consultando la lista de personas a liquidar para la ejecución en paralelo. ' + @MessageErr;

	   INSERT INTO #t_Error( cod_emp,
						cod_cont,
						error,
						tip_liq,
						cod_con,
						num_pas,
						fec_liq,
						fec_cte
					   )
	   VALUES
			(
			'', 0, @MessageErr, '', '', 0, @fPFecLiq, @fFec_corte );
	   RETURN;
    END CATCH;

    /*En esta tabla se guardarán los parámetros de cada grupo*/
    CREATE TABLE #ProcParams(
	    fPFecLiq     DATETIME,
	    fPFec_corte  DATETIME,
	    cPCad_liqu   NVARCHAR(300),
	    cPCad_Selec  NVARCHAR(MAX),
	    cproy_sal    NUMERIC(6, 2),
	    thread       INT, --Hilo de ejecución, usado en .NET
	    cConepDepura VARCHAR(6),
	    nNumDepPass  TINYINT, --Número de la pasada en que se debe capturar y detener para depurar
	    fFecDepPass  DATETIME, --fecha del período en que se debe capturar y detener para depurar
	    nP_SPID      SMALLINT, --SPID manejado desde .NET
	    nP_spKey     INT,
	    IDL_Num      BIGINT,
	    cPlantilla   NVARCHAR(30),
	    nIndSeg      BIT,
	    NumGpo       INT
					   );
    INSERT INTO #ProcParams( fPFecLiq,
					    fPFec_corte,
					    cPCad_liqu,
					    cPCad_Selec,
					    cproy_sal,
					    thread,
					    cConepDepura,
					    nNumDepPass,
					    fFecDepPass,
					    nP_SPID,
					    nP_spKey,
					    IDL_Num,
					    cPlantilla,
					    nIndSeg,
					    NumGpo
					  )
    SELECT DISTINCT
		 @fPFecLiq,
		 @fPFec_corte,
		 @cPCad_liqu,
		 @cPCad_Selec,
		 @cproy_sal,
		 @thread,
		 @cConepDepura,
		 @nNumDepPass,
		 @fFecDepPass,
		 @nP_SPID,
		 @nP_spKey,
		 @IDL_NUM,
		 @cPlantilla,
		 @nIndSeg,
		 NumGpo
    FROM #T_Rhh_EmpleaLiqPrlelo;

    DELETE FROM Rhh_LiquiGrupoEmp
    WHERE KeyID = @nP_spKey;

    BEGIN TRY
	   INSERT INTO Rhh_LiquiGrupoEmp( KeyID,
							    NumGpo,
							    cod_emp
							  )
	   SELECT nP_spKey,
			NumGpo,
			cod_emp
	   FROM #T_Rhh_EmpleaLiqPrlelo;

	   /*Se actualizan datos de polantillas que pueden ser necesarios al final del proceso*/
	   IF @nIndTabPlantilla = 1
	   BEGIN
		  UPDATE Rhh_LiquiGrupoEmp
		    SET cod_emp = P.cod_emp,
			   cod_suc = P.cod_suc,
			   cod_conv = P.cod_conv,
			   conv_suc = P.conv_suc,
			   conv_cco = P.conv_cco,
			   fec_pago_prog = P.fec_pago_prog
		  FROM Rhh_LiquiGrupoEmp Le
		  INNER JOIN #T_EmpleadosPlantilla P ON Le.cod_emp = P.cod_emp AND Le.KeyID = @nP_spKey;
	   END;

	   SELECT @nGposResult = MAX(NumGpo)
	   FROM #ProcParams;

	   SET @nGpoActual = 1;

	   WHILE @nGpoActual <= @nGposResult
	   BEGIN
		  BEGIN DIALOG CONVERSATION @h FROM SERVICE [Rhh_AsyncLiquiService] TO SERVICE N'Rhh_AsyncLiquiService', 'CURRENT DATABASE' WITH ENCRYPTION
		  = OFF;

		  SELECT @token = [conversation_id]
		  FROM sys.conversation_endpoints
		  WHERE [conversation_handle] = @h;

		  SELECT @xmlBody = ( SELECT N'sp_rhh_LiqPrinci' AS Name,
							    (
							    SELECT *
							    FROM #ProcParams
							    WHERE NumGpo = @nGpoActual FOR XML PATH('Params'), TYPE
							    ) FOR XML PATH('Procedure'), TYPE );

		  INSERT INTO Rhh_ProgresoLiq( spID,
								 keyID,
								 cod_emp,
								 mensaje_error,
								 num_pas,
								 fec_liq,
								 Num_Gpo,
								 IDL_num,
								 mensaje,
								 hora_envio
							    )
		  VALUES
			    (
			    @nP_SPID, @nP_spKey, '', 'Se va a enviar el mensaje', 0, @fPFecLiq, @nGpoActual, @IDL_NUM, @xmlBody, GETDATE() );

		  SEND ON CONVERSATION @h(@xmlBody);

		  UPDATE rhh_ProgresoLiq
		    SET mensaje_error = N'Mensaje Enviado',
			   token = @token
		  WHERE spID = @nP_SPID AND keyID = @nP_spKey AND Num_Gpo = @nGpoActual;

		  --END CONVERSATION @h;
		  SET @nGpoActual = @nGpoActual + 1;
	   END;
    END TRY
    BEGIN CATCH
	   EXEC sp_rhh_LiqErrInfo @MessageErr OUTPUT;

	   SET @MessageErr = N'Error en el envío de los procesos de liquidación en paralelo. ' + @MessageErr;

	   INSERT INTO #t_Error( cod_emp,
						cod_cont,
						error,
						tip_liq,
						cod_con,
						num_pas,
						fec_liq,
						fec_cte
					   )
	   VALUES
			(
			'', 0, @MessageErr, '', '', 0, @fPFecLiq, @fFec_corte );

	   UPDATE rhh_ProgresoLiq
		SET mensaje_error = @MessageErr
	   WHERE spID = @nP_SPID AND keyID = @nP_spKey AND Num_Gpo = @nGpoActual;

	   RAISERROR(@MessageErr, 16, 1);
    END CATCH;
END;

```
