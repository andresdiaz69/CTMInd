# Stored Procedure: sp_rhh_cambioced1

## Usa los objetos:
- [[GTH_Contratos]]
- [[GTH_DocumIncEmp]]
- [[gth_portal_configuracion]]
- [[GTH_RptEmplea]]
- [[IncapMov]]
- [[Rhh_Ausentismo]]
- [[RHH_embargo]]
- [[rhh_EmpConv]]
- [[rhh_emplea]]
- [[RHH_Familia]]
- [[RHH_incapacidad]]
- [[RHH_incapmov]]
- [[Rhh_prestm]]
- [[RHH_upc_adi]]
- [[SIS_APLICACION]]
- [[SIS_EMPRESA]]
- [[sp_gen_validatriggers]]
- [[sp_gth_cambioced]]
- [[sp_opr_cambio_cod_emp]]
- [[sp_prt_CambioLogin]]
- [[sp_rhh_cambiocodportal]]
- [[sp_rhh_LiqErrInfo]]
- [[sp_sst_cambioced]]

```sql

--========================================================================================================================================================================================
--  Cambio de la cedula de un empleado Nota: se debe crear primero Maestro de empleados
--	SE AGREGA AL PROCEDIMIENTO LAS TABLAS DE GESTION HUMANA
--	JSARMIENTO AGOSTO/2012 SRS: 2012-0773
--  ZVSR Noviembre 22/2012. Manejo de la tabla #T_Error
--  GKNINO NOVIEMBRE/2013 Se aumenta el valor para el campo @tabla antes era char(30). Se cambia porque hay una table que su nombre tiene longitud mayor a 30.
--  Además se ingresa al ultimo condicional del primer while (CAMBIA LAS TABLAS CON LA CEDULA NUEVA) dos tablas las cuales no se debe hacer el cambio, y por las cuales presentaba error.
--  GKNINO 27/08/2014 Se nombran los campos para las tablas de VisitaDomi, puesto que estas contienen un campo identity.
--  GKNINO 19/08/2015 Se nombran los campos para la inserción en la tabla temporal #VisitaDomi. SRS 2015-0647
--  GKNINO 19/08/2015 Se adiciona condicional donde se permite la inserción de la tabla GTH_rptemplea siempre y cuando este contenga la información del código anterior. SRS 2015-0673
--	VMOLEJO 25/06/2020 Se  crea un procedimiento independiente. para gestion humana.  
--  EXEC sp_rhh_cambioced1 '99999','99998'
--  VERSION: 401
--=========================================================================================================================================================================================
CREATE PROCEDURE [dbo].[sp_rhh_cambioced1]
	@cod_emp CHAR(12) = '1010187047',
	@cod_nue CHAR(12) = '1010187050'
--WITH ENCRYPTION
AS
BEGIN
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
    SET NOCOUNT ON;
    SET ROWCOUNT 0;
    DECLARE @usuact VARCHAR(128);
    DECLARE @cadSQL NVARCHAR(MAX);
    DECLARE @Numusu INT;
    DECLARE @ParmDefinition NVARCHAR(500);
    DECLARE @Operac INT;
    DECLARE @sst INT;
    DECLARE @gth INT;
    DECLARE @ex_act SMALLINT;
    DECLARE @ex_nue SMALLINT;
    DECLARE @cadena VARCHAR(500);
    DECLARE @tabla CHAR(40);
    DECLARE @cMsgErr VARCHAR(MAX);
    DECLARE @nRegAfe INT;
    -- VARIABLES DE CONTROL PARA GTH
    DECLARE @cvo_ass INT;
    DECLARE @rpt_cvoass INT;
    --VARIABLES DE CONTROL PARA PORTAL
    DECLARE @Portal INT;
    DECLARE @cServidor VARCHAR(50);
    DECLARE @cBaseDatos VARCHAR(50);
    DECLARE @rolusu NVARCHAR(1000);
    DECLARE @usu NVARCHAR(1000);
    DECLARE @vercnx NVARCHAR(500);
    DECLARE @server CHAR(50);
    DECLARE @db CHAR(50);
    DECLARE @Tabportal NVARCHAR(500);
    DECLARE @QUERY NVARCHAR(3000);
    DECLARE @PARAMETROS NVARCHAR(500);
    DECLARE @IndWeb BIT;
    DECLARE @ValidaPrtI BIT = 0;
    -- Variables Reemplazo identity. 
    DECLARE @cod_cont INT;
    DECLARE @num_mov INT;
    DECLARE @SQLString NVARCHAR(500);
    DECLARE @ind_act_Extr CHAR(50) = '';

    CREATE TABLE #vincula(
	    cServer CHAR(50)
					);
    CREATE TABLE #usuario_rol(
	    num_ide CHAR(12)
					    );
    CREATE TABLE #usuarios(
	    num_ide CHAR(12)
					 );
    CREATE TABLE #PORTAL(
	    NAME VARCHAR(256)
				    );

    IF OBJECT_ID('TempDb..#t_Error') IS NULL
    BEGIN
	   CREATE TABLE #t_Error(
		   cod_emp VARCHAR(12) COLLATE DATABASE_DEFAULT NULL,
		   error   VARCHAR(4000) COLLATE DATABASE_DEFAULT NULL,
		   APL     CHAR(20)
					    );
    END;

    SELECT @IndWeb = ind_web
    FROM SIS_EMPRESA;
    --VALIDACION SI EXISTE PORTAL Y CONEXION A LA BASE DE DATOS  
    IF @IndWeb = 1
    BEGIN
	   SELECT @Portal = CASE
					    WHEN cod_enc = '' THEN 0
					    WHEN cod_enc = NULL THEN 0
					    ELSE 1
					END
	   FROM SIS_APLICACION
	   WHERE COD_APL = 'PTE';
    END;
	   ELSE
    BEGIN
	   SET @Portal = 0;
    END;

    SELECT @gth = CASE
				  WHEN ind_ins = '' THEN 0
				  WHEN ind_ins = NULL THEN 0
				  ELSE 1
			   END
    FROM SIS_APLICACION
    WHERE COD_APL = 'GTH';

    SELECT @sst = CASE
				  WHEN ind_ins = '' THEN 0
				  WHEN ind_ins = NULL THEN 0
				  ELSE 1
			   END
    FROM SIS_APLICACION
    WHERE COD_APL = 'SST';

    SELECT @Operac = CASE
					WHEN ind_ins = '' THEN 0
					WHEN ind_ins = NULL THEN 0
					ELSE 1
				 END
    FROM SIS_APLICACION
    WHERE COD_APL = 'OPR';

    IF @Portal >= 1
    BEGIN
	   SELECT @cServidor = LTRIM(RTRIM(Servidor)),
			@cBaseDatos = LTRIM(RTRIM(BaseDatos))
	   FROM gth_portal_configuracion;

	   IF(ISNULL(LEN(@cServidor), 0) + ISNULL(LEN(@cBaseDatos), 0)) = 0
	   BEGIN
		  SET @ValidaPrtI = 1;
	   END;

	   IF(@cServidor IS NULL OR @cServidor = ''
		)
	   BEGIN
		  SET @cServidor = @@SERVERNAME;
	   END;

	   IF @cBaseDatos IS NULL OR LEN(@cBaseDatos) = 0 OR @cServidor IS NULL OR LEN(@cServidor) = 0
	   BEGIN
		  INSERT INTO #t_Error( cod_emp,
						    error,
						    APL
						  )
		  VALUES
			    (
			    'ERROR', 'No se encontró nombre del servidor y/o base de datos de Portal, por favor verifique la tabla de Conexiones', 'PORTAL' );
	   END;

	   SELECT @vercnx = 'INSERT INTO #vincula (cServer) select name  from sys.servers where name=' + CHAR(39) + @cServidor + CHAR(39);
	   EXEC sp_executesql @vercnx;

	   SELECT @server = cServer
	   FROM #vincula;

	   IF @server = '' OR @server IS NULL
	   BEGIN
		  INSERT INTO #t_Error( cod_emp,
						    error,
						    APL
						  )
		  VALUES
			    (
			    'ERROR', 'El servidor No se encuentra vinculado, por favor verifique la Conexion', 'PORTAL' );
	   END;
		  ELSE
	   BEGIN
		  IF EXISTS( SELECT *
				   FROM sysservers
				   WHERE srvname = @server )
		  BEGIN
			 DELETE FROM #vincula;

			 SELECT @vercnx = ' INSERT INTO #vincula (cServer) SELECT  BaseDatos  FROM gth_portal_configuracion WHERE BaseDatos = ' + CHAR(39) +
			 @cBaseDatos + CHAR(39);
			 EXEC sp_executesql @vercnx;

			 SELECT @db = cServer
			 FROM #vincula;
		  END;
			 ELSE
		  BEGIN
			 INSERT INTO #t_Error( cod_emp,
							   error,
							   APL
							 )
			 VALUES
				   (
				   'ERROR',
				   'El servidor No se encuentra vinculado, por favor agregue el servidor en los servidores vinculados dentro la carpeta Objetos de Servidor y ejecute el proceso de Portal sp_rhh_cambiocodportal',
				   'PORTAL' );
		  END;
	   END;

	   IF @DB = '' OR @DB IS NULL
	   BEGIN
		  INSERT INTO #t_Error( cod_emp,
						    error,
						    APL
						  )
		  VALUES
			    (
			    'ERROR', 'La Base de datos no existe en el servidor especificado o aun no se ha parametrizado la conexion  ', 'PORTAL' );
	   END;
	   -- VALIDAMOS QUE EL USUARIO TENGA PERMISOS  EN LA BASE DE DATOS DE PORTAL. --OBTENEMOS eL USUARIO ACTUAL.
	   SELECT @Usuact = login_name
	   FROM sys.dm_exec_sessions
	   WHERE session_id = @@SPID;

	   --VALIDAMOS QUE EL USUARIO EXISTA EN LA BASE VINCULADA
	   SET @query = ' SELECT @Numusu= Count(*) FROM OPENQUERY (' + '[' + LTRIM(RTRIM(@server)) + '],' + '''SELECT * FROM ' + '[' + LTRIM(RTRIM(@db))
	   + ']' + '..SYSUSERS WHERE NAME = ''''' + LTRIM(RTRIM(@Usuact)) + '''''''' + ');';
	   SET @ParmDefinition = N'@Numusu INT OUTPUT';
	   EXECUTE sp_executesql @query,
						@ParmDefinition,
						@Numusu = @Numusu OUTPUT;
	   SET @Numusu = ISNULL(@Numusu, 0);

	   IF @Numusu = '' OR @Numusu IS NULL OR @Numusu = 0
	   BEGIN
		  INSERT INTO #t_Error( cod_emp,
						    error,
						    APL
						  )
		  VALUES
			    (
			    'ERROR', 'El usuario ' + LTRIM(RTRIM(@Usuact)) +
			    ' No tiene permisos para ejecutar el proceso de cambio de  codigo en la Base de portal', 'PORTAL' );
	   END;

	   IF( SELECT COUNT(*)
		  FROM #t_Error ) > 0
	   BEGIN
		  INSERT INTO #t_Error( cod_emp,
						    Error,
						    apl
						  )
		  VALUES
			    (
			    @cod_emp, 'Se presentaron errores;  No se Puede cambiar el codigo', 'PORTAL' );
		  --SELECT * FROM #t_Error
		  IF(@ValidaPrtI = 0)	    -- Validacion si no se parametriza la tabla de conexion portal, aplicaicon habiitada y no parametrizada. 
		  BEGIN
			 SELECT * FROM #t_Error;
			 RETURN;

		  END;
			 ELSE
		  BEGIN
			 DELETE FROM #t_Error
			 WHERE apl = 'PORTAL';

			 INSERT INTO #t_Error( cod_emp,
							   Error,
							   apl
							 )
			 VALUES
				   (
				   @cod_emp, ' No se encontro parametrización , No se realizaron cambios para esta aplicación', 'PORTAL' );
		  END;
	   END;
    END;

    -- VALIDACION DEL CODIGO DEL EMPLEADO  ACTUAL Y NUEVO. 
    SELECT @ex_act = COUNT(cod_emp)
    FROM rhh_emplea
    WHERE cod_emp = @cod_emp;

    SELECT @ex_nue = COUNT(cod_emp)
    FROM rhh_emplea
    WHERE cod_emp = @cod_nue;

    IF @ex_act = 0
    BEGIN
	   INSERT INTO #t_Error( cod_emp,
						Error,
						APL
					   )
	   VALUES
			(
			@cod_emp, 'El código actual no existe', 'NOM' );
	   SELECT * FROM #t_Error;
	   RETURN;
    END;

    IF @ex_nue = 1
    BEGIN
	   INSERT INTO #t_Error( cod_emp,
						Error,
						APL
					   )
	   VALUES
			(
			@cod_emp, 'El número de código destino, ya existe', 'NOM' );
	   SELECT * FROM #t_Error;
	   RETURN;
    END;

    BEGIN TRY
	   BEGIN TRANSACTION;
	   EXEC sp_gen_validatriggers 'Tr_rhh_Ausentismo_Incapacidad',
							1;
	   EXEC sp_gen_validatriggers 'Tr_rhh_Ausentismo_Valid_PerBl',
							1;
	   EXEC sp_gen_validatriggers 'tr_rhh_prestm_Valid_PerBl',
							1;
	   EXEC sp_gen_validatriggers 'tr_rhh_EmbargoCon',
							1;
	   EXEC sp_gen_validatriggers 'Tr_rhh_Hislab_Valid_PerBl',
							1;

	   /* CREA UN EMPLEADO CON LA NUEVA CEDULA PERO CON LOS DATOS DE LA CEDULA VIEJA */
	   SELECT *
	   INTO #NUE_EMP
	   FROM RHH_EMPLEA
	   WHERE COD_EMP = @cod_emp;

	   UPDATE #NUE_EMP
		SET id_uniq = NEWID();

	   --SELECT  * FROM #NUE_EMP 
	   SELECT *
	   INTO #incapacidad
	   FROM RHH_incapacidad
	   WHERE COD_EMP = @cod_emp;

	   SELECT *
	   INTO #incapmov
	   FROM RHH_incapmov
	   WHERE COD_EMP = @cod_emp;

	   SELECT *
	   INTO #familia
	   FROM RHH_Familia
	   WHERE COD_EMP = @cod_emp;

	   SELECT *
	   INTO #upcadi
	   FROM RHH_upc_adi
	   WHERE COD_EMP = @cod_emp;

	   SELECT *,
			0 AS codcon_NUE
	   INTO #Contratos
	   FROM GTH_Contratos
	   WHERE COD_EMP = @cod_emp;

	   SELECT *
	   INTO #rhh_EmpConv
	   FROM rhh_EmpConv
	   WHERE COD_EMP = @cod_emp;

	   SELECT *
	   INTO #Ausentismo
	   FROM Rhh_Ausentismo
	   WHERE COD_EMP = @cod_emp;

	   SELECT *
	   INTO #Prestamo
	   FROM Rhh_prestm
	   WHERE COD_EMP = @cod_emp;

	   SELECT *
	   INTO #Embargo
	   FROM RHH_embargo
	   WHERE COD_EMP = @cod_emp;

	   UPDATE #NUE_EMP
		SET COD_EMP = @cod_nue,
		    cod_pagelec = @cod_nue;

	   UPDATE #incapacidad
		SET COD_EMP = @cod_nue;

	   UPDATE #incapmov
		SET COD_EMP = @cod_nue;

	   UPDATE #familia
		SET COD_EMP = @cod_nue;
	   UPDATE #upcadi
		SET COD_EMP = @cod_nue;

	   UPDATE #Contratos
		SET COD_EMP = @cod_nue;

	   UPDATE #Ausentismo
		SET COD_EMP = @cod_nue;

	   UPDATE #Embargo
		SET COD_EMP = @cod_nue;

	   UPDATE #Prestamo
		SET COD_EMP = @cod_nue;

	   UPDATE #rhh_EmpConv
		SET cod_emp = @cod_nue;

	   BEGIN TRY
		  --DESACTIVAR TRIGGER ECUADOR.
		  IF EXISTS( SELECT *
				   FROM sys.triggers
				   WHERE name = 'TR_RHH_EMP_HISFON_EC' )
		  BEGIN
			 EXEC sp_gen_validatriggers 'TR_RHH_EMP_HISFON_EC',
								   1;
		  END;
		  EXEC sp_gen_validatriggers 'TR_RHH_EMPLEA',
							    1;
		  INSERT INTO RHH_EMPLEA
		  SELECT * FROM #NUE_EMP;
		  EXEC sp_gen_validatriggers 'TR_RHH_EMPLEA',
							    3;

		  IF EXISTS( SELECT name
				   FROM sys.columns
				   WHERE object_id = OBJECT_ID('Rhh_PlantDefEmp') AND name = 'ind_act_Extr' )
		  BEGIN
			 SET @ind_act_Extr = ', ind_act_Extr = 1';
		  END;

		  SELECT @SQLString = 'UPDATE Rhh_PlantDefEmp
		    SET cod_emp = RTRIM(@cod_nue) ' + RTRIM(@ind_act_Extr) + ' WHERE Cod_emp = RTRIM(@cod_emp)';

		  SET @ParmDefinition = N'@cod_nue char(12),  @cod_emp char(12) ';

		  EXECUTE sp_executesql @SQLString,
						    @ParmDefinition,
						    @cod_nue,
						    @cod_emp;

		  --UPDATE Rhh_PlantDefEmp
		  --  SET cod_emp = @cod_nue
		  --WHERE Cod_emp = @cod_emp;
		  --ACTIVA TRIGGER ECUADOR. 
		  IF EXISTS( SELECT *
				   FROM sys.triggers
				   WHERE name = 'TR_RHH_EMP_HISFON_EC' )
		  BEGIN
			 EXEC sp_gen_validatriggers 'TR_RHH_EMP_HISFON_EC',
								   3;
		  END;

		  IF EXISTS( SELECT cod_emp
				   FROM GTH_RptEmplea
				   WHERE cod_emp = @cod_emp )
		  BEGIN
			 UPDATE #NUE_EMP
			   SET cod_est = '01'
			 WHERE cod_est IS NULL;

			 INSERT INTO GTH_RptEmplea
			 SELECT * FROM #NUE_EMP;
		  END;

		  INSERT INTO GTH_Contratos( cod_emp,
							    num_cont,
							    tip_con,
							    fec_con,
							    not_con,
							    cla_sal,
							    tip_cot,
							    SubTip_Cot,
							    ind_extjero,
							    ind_resi_extjero,
							    cod_pai,
							    cod_dep,
							    cod_ciu,
							    ind_ley1393,
							    cod_est,
							    ind_contrat,
							    ind_L1450
							  )
		  SELECT cod_emp,
			    num_cont,
			    tip_con,
			    fec_con,
			    not_con,
			    cla_sal,
			    tip_cot,
			    SubTip_Cot,
			    ind_extjero,
			    ind_resi_extjero,
			    cod_pai,
			    cod_dep,
			    cod_ciu,
			    ind_ley1393,
			    cod_est,
			    ind_contrat,
			    ind_L1450
		  FROM #Contratos;

		  UPDATE #Contratos
		    SET codcon_NUE = GTH_Contratos.cod_con
		  FROM GTH_Contratos
		  INNER JOIN #Contratos ON GTH_Contratos.cod_emp = #Contratos.cod_emp
							  AND GTH_Contratos.fec_con = #Contratos.fec_con;

		  SELECT @cod_cont = SCOPE_IDENTITY();

		  INSERT INTO rhh_EmpConv
		  SELECT * FROM #rhh_EmpConv;

		  INSERT INTO Rhh_Ausentismo
		  SELECT * FROM #Ausentismo;

		  DELETE GTH_DocumIncEmp
		  WHERE cod_emp = @cod_nue;

		  UPDATE Rhh_Ausentismo
		    SET cer_nro = #Ausentismo.cer_nro
		  FROM Rhh_Ausentismo
		  INNER JOIN #Ausentismo ON Rhh_Ausentismo.cod_emp = #Ausentismo.cod_emp
							   AND Rhh_Ausentismo.cod_aus = #Ausentismo.cod_aus
							   AND Rhh_Ausentismo.ini_aus = #Ausentismo.ini_aus;

		  UPDATE GTH_DocumIncEmp
		    SET cer_nro = #Ausentismo.cer_nro
		  FROM GTH_DocumIncEmp
		  INNER JOIN #Ausentismo ON GTH_DocumIncEmp.cod_emp = #Ausentismo.cod_emp
							   AND GTH_DocumIncEmp.cod_aus = #Ausentismo.cod_aus
							   AND GTH_DocumIncEmp.fec_ini = #Ausentismo.ini_aus;

		  EXEC sp_gen_validatriggers 'tr_rhh_prestm',
							    1;

		  INSERT INTO rhh_prestm
		  SELECT * FROM #prestamo;

		  EXEC sp_gen_validatriggers 'tr_rhh_prestm',
							    3;
		  INSERT INTO RHH_INCAPACIDAD
		  SELECT * FROM #INCAPACIDAD;

		  EXEC sp_gen_validatriggers 'Tr_Rhh_IncapMov_Up_Del',
							    1;

		  UPDATE IncapMov
		    SET IncapMov.cod_emp = IM.cod_emp,
			   IncapMov.cod_aus = IM.cod_aus,
			   IncapMov.fec_ini = IM.fec_ini,
			   IncapMov.cer_nro = IM.cer_nro,
			   IncapMov.tip_mov = IM.tip_mov,
			   IncapMov.fec_mov = IM.fec_mov,
			   IncapMov.num_auto = IM.num_auto,
			   IncapMov.val_mov = IM.val_mov,
			   IncapMov.for_pag = IM.for_pag,
			   IncapMov.reg_sis = IM.reg_sis
		  FROM Rhh_IncapMov IncapMov
		  INNER JOIN #incapMOV IM ON IncapMov.num_mov = IM.num_mov;

		  DELETE RHH_INCAPACIDAD
		  WHERE cod_emp = @cod_emp;

		  EXEC sp_gen_validatriggers 'Tr_Rhh_IncapMov_Up_Del',
							    3;

		  IF EXISTS( SELECT name
				   FROM sys.columns
				   WHERE object_id = OBJECT_ID('gth_ParamContratos') AND name = 'ind_act_Extr' )
		  BEGIN
			 SET @ind_act_Extr = ', ind_act_Extr = 1';
		  END;

		  SELECT @SQLString =
		  'UPDATE gth_ParamContratos
		  SET cod_emp = RTRIM(@cod_nue),cod_con =  #Contratos.codcon_NUE
		  FROM gth_ParamContratos INNER JOIN #Contratos ON gth_ParamContratos.cod_con = #Contratos.cod_con ' + RTRIM(@ind_act_Extr) +
		  ' WHERE gth_ParamContratos.Cod_emp = RTRIM(@cod_emp)';

		  SET @ParmDefinition = N'@cod_nue char(12), @cod_emp char(12) ';

		  EXECUTE sp_executesql @SQLString,
						    @ParmDefinition,
						    @cod_nue,
						    @cod_emp;

		  --UPDATE gth_ParamContratos
		  --  SET cod_emp = RTRIM(@cod_nue),
		  --  cod_con = @cod_cont
		  --WHERE cod_emp = RTRIM(@cod_emp);
		  IF EXISTS( SELECT name
				   FROM sys.columns
				   WHERE object_id = OBJECT_ID('rhh_hislab') AND name = 'ind_act_Extr' )
		  BEGIN
			 SET @ind_act_Extr = ', ind_act_Extr = 1';
		  END;

		  SELECT @SQLString =
		  'UPDATE rhh_hislab
		    SET cod_emp = RTRIM(@cod_nue)  ,cod_con =  #Contratos.codcon_NUE
		    FROM rhh_hislab INNER JOIN #Contratos ON rhh_hislab.cod_con = #Contratos.cod_con ' + RTRIM(@ind_act_Extr) +
		  ' WHERE rhh_hislab.Cod_emp = RTRIM(@cod_emp)';

		  SET @ParmDefinition = N'@cod_nue char(12), @cod_emp char(12) ';

		  EXECUTE sp_executesql @SQLString,
						    @ParmDefinition,
						    @cod_nue,
						    @cod_emp;

		  --UPDATE rhh_hislab
		  --  SET cod_emp = RTRIM(@cod_nue),
		  --  cod_con = @cod_cont
		  --WHERE cod_emp = RTRIM(@cod_emp);
		  INSERT INTO rhh_familia( cod_emp,
							  ap1_fam,
							  ap2_fam,
							  nom_fam,
							  tip_fam,
							  gra_san,
							  tip_ide,
							  num_ced,
							  fec_nac,
							  sex_fam,
							  est_civ,
							  niv_est,
							  ind_comp,
							  ocu_fam,
							  sal_bas,
							  ind_sub,
							  ind_pro,
							  ind_conv,
							  sex_famANT,
							  Ind_disc_ec,
							  Ind_Dep_Ret
							)
		  SELECT cod_emp,
			    ap1_fam,
			    ap2_fam,
			    nom_fam,
			    tip_fam,
			    gra_san,
			    tip_ide,
			    num_ced,
			    fec_nac,
			    sex_fam,
			    est_civ,
			    niv_est,
			    ind_comp,
			    ocu_fam,
			    sal_bas,
			    ind_sub,
			    ind_pro,
			    ind_conv,
			    sex_famANT,
			    Ind_disc_ec,
			    Ind_Dep_Ret
		  FROM #familia;

		  INSERT INTO rhh_upc_adi
		  SELECT * FROM #upcadi;

		  INSERT INTO rhh_embargo( cod_emp,
							  cod_con,
							  sec_emb,
							  tip_emb,
							  fec_ini,
							  pje_apl,
							  con_bas,
							  top_emb,
							  val_emb,
							  abo_emb,
							  ind_des,
							  vlr_tot,
							  nit_dem,
							  nit_ter,
							  cod_ciu,
							  juz_emb,
							  cod_dep,
							  cod_pai,
							  apl_con,
							  Exce_SMLMV,
							  Desc_DSS,
							  can_desc,
							  num_resol,
							  num_cta,
							  cod_ofcta,
							  cta_jdo,
							  num_proc,
							  ind_prop
							)
		  SELECT cod_emp,
			    cod_con,
			    sec_emb,
			    tip_emb,
			    fec_ini,
			    pje_apl,
			    con_bas,
			    top_emb,
			    val_emb,
			    abo_emb,
			    ind_des,
			    vlr_tot,
			    nit_dem,
			    nit_ter,
			    cod_ciu,
			    juz_emb,
			    cod_dep,
			    cod_pai,
			    apl_con,
			    Exce_SMLMV,
			    Desc_DSS,
			    can_desc,
			    num_resol,
			    num_cta,
			    cod_ofcta,
			    cta_jdo,
			    num_proc,
			    ind_prop
		  FROM #EMBARGO;

		  /* CAMBIA LAS TABLAS CON LA CEDULA NUEVA  */
		  DECLARE CX1 CURSOR LOCAL READ_ONLY
		  FOR SELECT a.name
			 FROM sysobjects AS a,
				 syscolumns AS b
			 WHERE a.id = b.id
				  AND a.name LIKE 'rhh%'
				  --AND SUBSTRING(b.name, 1, 7) LIKE 'cod_emp'
				  AND b.name = 'cod_emp'
				  AND a.name NOT IN(
								'rhh_emplea', 'rhh_empleos', 'rhh_familia', 'rhh_upc_adi', 'rhh_EmpConv', 'Rhh_PlantDefEmp',
								'rhh_FuncionResol', 'rhh_Importa_HV', 'rhh_ResoLiteral', 'rhh_hislab', 'rhh_embargo', 'Rhh_LiquiGrupoEmp',
								'rhh_AdminEnvioPagoElectronico', 'rhh_AdminEnvioPagoElectronicoDetalle', 'rhh_AdminEnvioPE_Ajuste',
								'rhh_AdminEnvioPEDetalle_Ajuste', 'rhh_MX_AdminEnvioPagoElectronicoDetalle',
								'rhh_MX_AdminEnvioPagoElectronico'
							    )
				  AND a.xtype = 'U';

		  SET @nRegAfe = 0;

		  OPEN CX1;
		  FETCH NEXT FROM CX1 INTO @Tabla;

		  WHILE @@FETCH_STATUS <> -1
		  BEGIN
			 IF @tabla NOT IN('Rhh_Prestm', 'rhh_ausentismo', 'Rhh_Djo_hras_cco_cli', 'Rhh_Djo_hras_cliente')
			 BEGIN
				IF @tabla = 'rhh_hisfon'
				BEGIN
				    EXEC sp_gen_validatriggers 'TR_rhh_hisfon',
										 1;
				END;

				IF @tabla = 'rhh_hisvac'
				BEGIN
				    EXEC sp_gen_validatriggers 'TR_rhh_hisvac_dias',
										 1;
				END;
				IF @tabla = 'rhh_PrestProg                           '
				BEGIN
				    EXEC sp_gen_validatriggers 'tr_rhh_PrestProg',
										 1;
				END;

				SELECT @SQLString =
				'IF  EXISTS (SELECT name FROM sys.columns  WHERE object_id = OBJECT_ID(@tabla1) AND name=''ind_act_Extr'')
				BEGIN
				    SET @ind_act_Extr1 ='', ind_act_Extr = 1'' 
				END
				ELSE
				BEGIN
				    SET @ind_act_Extr1 ='''' 
				END
				';

				SET @ParmDefinition = N'@tabla1 CHAR(50),  @ind_act_Extr1 CHAR (50) OUTPUT';

				EXECUTE sp_executesql @SQLString,
								  @ParmDefinition,
								  @tabla1 = @tabla,
								  @ind_act_Extr1 = @ind_act_Extr OUTPUT;

				IF @tabla IN('rhh_liqhis', 'rhh_hisss', 'rhh_importaHistorico', 'rhh_importhiss', 'rhh_caucesa', 'rhh_BenefEmp', 'rhh_ConsVaca',
				'rhh_novfija', 'rhh_basesliqpres', 'rhh_compensatorio', 'rhh_liqmes', 'rhh_pagvaca', 'Rhh_UsuDef_Consol', 'rhh_indemniza',
				'Rhh_UsuDef_DetPago', 'rhh_ConsPrima', 'Rhh_ProgresoLiq', 'Rhh_auditliq', 'rhh_hisvac', 'rhh_LotesNovedad',
				'rhh_tes_lotespagos_det', 'Rhh_TiemposLiq', 'Rhh_SS_Novedades_Dec376', 'rhh_UsuDef_DetPagImp', 'rhh_ConsBonServ')
				BEGIN
				    SELECT @CADENA = 'UPDATE ' + RTRIM(@tabla) + ' SET cod_emp = ''' + RTRIM(@cod_nue) + ''', cod_cont = #Contratos.codcon_NUE '
				    + RTRIM(@ind_act_Extr) + ' FROM ' + RTRIM(@tabla) + ' INNER JOIN #Contratos ON ' + RTRIM(@tabla) +
				    '.cod_cont = #Contratos.cod_con WHERE ' + RTRIM(@tabla) + '.cod_emp = ''' + RTRIM(@cod_emp) + '''';

				    EXEC (@CADENA);
				END;
				    ELSE
				BEGIN
				    SELECT @CADENA = 'UPDATE ' + RTRIM(@tabla) + ' SET cod_emp = ''' + RTRIM(@cod_nue) + '''' + RTRIM(@ind_act_Extr) +
				    ' WHERE cod_emp = ''' + RTRIM(@cod_emp) + +'''';
				    --SELECT '@CADENA' = @CADENA;
				    EXEC (@CADENA);

				    --SELECT '@CADENA' = @CADENA;
				END;

				--IF @tabla = 'rhh_liqhis'
				--BEGIN
				--    UPDATE rhh_liqhis
				--	 SET cod_cont = #Contratos.codcon_NUE
				--    FROM rhh_liqhis
				--    INNER JOIN #Contratos ON rhh_liqhis.cod_con = #Contratos.cod_con
				--    WHERE rhh_liqhis.Cod_emp = RTRIM(@cod_nue);
				--END;
				--IF @tabla = 'rhh_hisss'
				--BEGIN
				--    UPDATE rhh_hisss
				--	 SET cod_cont = #Contratos.codcon_NUE
				--    FROM rhh_hisss
				--    INNER JOIN #Contratos ON rhh_hisss.cod_cont = #Contratos.cod_con
				--    WHERE rhh_hisss.Cod_emp = RTRIM(@cod_nue);
				--END;
				SET @nRegAfe = @@ROWCOUNT + @nRegAfe;

				SELECT @CADENA = ' ';

				IF @tabla = 'rhh_hisfon'
				BEGIN
				    EXEC sp_gen_validatriggers 'TR_rhh_hisfon',
										 3;
				END;

				IF @tabla = 'rhh_hisvac'
				BEGIN
				    EXEC sp_gen_validatriggers 'TR_rhh_hisvac_dias',
										 3;
				END;
				IF @tabla = 'rhh_PrestProg                           '
				BEGIN
				    EXEC sp_gen_validatriggers 'tr_rhh_PrestProg',
										 3;
				END;
				    /**/			 END;
			 FETCH NEXT FROM CX1 INTO @Tabla;

		  END;

		  CLOSE CX1;
		  DEALLOCATE CX1;

		  /*2013-0634*/
		  DECLARE CX2 CURSOR LOCAL READ_ONLY
		  FOR SELECT a.name
			 FROM sysobjects AS a,
				 syscolumns AS b
			 WHERE a.id = b.id AND a.name LIKE 'nom%'
				  --AND SUBSTRING(b.name, 1, 7) LIKE 'cod_emp'
				  AND b.name = 'cod_emp' AND a.xtype = 'U';

		  SET @nRegAfe = 0;

		  OPEN CX2;
		  FETCH NEXT FROM CX2 INTO @Tabla;

		  WHILE @@FETCH_STATUS <> -1
		  BEGIN

			 SELECT @SQLString =
			 'IF  EXISTS (SELECT name FROM sys.columns  WHERE object_id = OBJECT_ID(@tabla1) AND name=''ind_act_Extr'')
				BEGIN
				    SET @ind_act_Extr1 ='', ind_act_Extr = 1'' 
				END
				ELSE
				BEGIN
				    SET @ind_act_Extr1 ='''' 
				END
				';

			 SET @ParmDefinition = N'@tabla1 CHAR(50),  @ind_act_Extr1 CHAR (50) OUTPUT';

			 EXECUTE sp_executesql @SQLString,
							   @ParmDefinition,
							   @tabla1 = @tabla,
							   @ind_act_Extr1 = @ind_act_Extr OUTPUT;

			 SELECT @CADENA = 'UPDATE ' + RTRIM(@tabla) + ' SET cod_emp = ''' + RTRIM(@cod_nue) + '''' + RTRIM(@ind_act_Extr) +
			 ' WHERE cod_emp = ''' + RTRIM(@cod_emp) + '''';

			 --SELECT '@CADENA' = @CADENA
			 EXEC (@CADENA);
			 SET @nRegAfe = @@ROWCOUNT + @nRegAfe;

			 SELECT @CADENA = ' ';

			 FETCH NEXT FROM CX2 INTO @Tabla;
		  END;

		  CLOSE CX2;
		  DEALLOCATE CX2;
		  --select '	@Tabla '=@Tabla
		  -- GESTION HUMANA
		  IF @gth >= 1
		  BEGIN
			 BEGIN TRY
				EXEC sp_gth_cambioced @cod_emp,
								  @cod_nue;
			 END TRY
			 BEGIN CATCH
				ROLLBACK TRANSACTION;
				INSERT INTO #t_Error( cod_emp,
								  Error,
								  APL
								)
				VALUES
					  (
					  @cod_emp, 'Se presentaron errores En Aplicacion de Gestion Humana No se Puede cambiar el codigo', 'GTH' );

				SELECT * FROM #t_Error;
				RETURN;
			 END CATCH;
		  END;

		  -- SEGURIDAD Y SALUD EN EL TRABAJO. 
		  IF @sst >= 1
		  BEGIN
			 BEGIN TRY
				--select 'falta entrar'
				EXEC sp_sst_cambioced @cod_emp,
								  @cod_nue;
			 END TRY
			 BEGIN CATCH
				ROLLBACK TRANSACTION;
				INSERT INTO #t_Error( cod_emp,
								  Error,
								  APL
								)
				VALUES
					  (
					  @cod_emp, 'Se presentaron errores En Aplicacion de SST No se Puede cambiar el codigo', 'SST' );

				SELECT * FROM #t_Error;
				RETURN;
			 END CATCH;
		  END;

		  /* DESHABILITA EL EMPLEADO VIEJO */
		  UPDATE RHH_EMPLEA
		    SET AP2_EMP = 'ANULADO',
			   EST_LAB = '00',
			   cta_ban = @cod_emp,
			   cod_pagelec = @cod_emp
		  WHERE COD_EMP = @cod_emp;

		  UPDATE GTH_RptEmplea
		    SET AP2_EMP = 'ANULADO',
			   EST_LAB = '00'
		  WHERE COD_EMP = @cod_emp;

		  EXEC sp_gen_validatriggers 'Tr_rhh_Ausentismo_Incapacidad',
							    3;
		  DELETE FROM rhh_prestm
		  WHERE COD_EMP = @cod_emp;

		  DELETE FROM rhh_embargo
		  WHERE COD_EMP = @cod_emp;

		  DELETE FROM RHH_INCAPACIDAD
		  WHERE COD_EMP = @cod_emp;

		  DELETE FROM GTH_RptEmplea
		  WHERE COD_EMP = @cod_emp;

		  DELETE rhh_ausentismo
		  WHERE cod_emp = @cod_emp;

		  DELETE GTH_Contratos
		  WHERE cod_emp = @cod_emp;

		  EXEC sp_gen_validatriggers 'tr_rhh_prestm_Valid_PerBl', 3;
		  EXEC sp_gen_validatriggers 'tr_rhh_EmbargoCon', 3;
		  EXEC sp_gen_validatriggers 'Tr_rhh_Hislab_Valid_PerBl', 3;
		  EXEC sp_gen_validatriggers 'Tr_rhh_Ausentismo_Valid_PerBl', 3;
		  EXEC sp_gen_validatriggers 'tr_rhh_prestm_Valid_PerBl', 3;		  
		  EXEC sp_gen_validatriggers 'GTH_EvaDesemAsig_Trg_act', 3;
		  EXEC sp_gen_validatriggers 'tr_GTH_EventoInvita', 3;
		  EXEC sp_gen_validatriggers 'tr_gth_eventos_pre', 3;
		  EXEC sp_gen_validatriggers 'Trg_gth_EventoInvita_Ins_Up', 3;
		  EXEC sp_gen_validatriggers 'Trg_GTH_Requisicion_I_U', 3;
		  EXEC sp_gen_validatriggers 'Trg_GTH_Requisicion_Modelos', 3;
	   END TRY
	   BEGIN CATCH

		  EXEC sp_rhh_LiqErrInfo @cMsgErr OUTPUT;
		  SELECT 'ERROR' = concat(@cMsgErr, ' en la tabla: ', @tabla);
		  SET @cMsgErr = 'No se creó el registro con el nuevo número de documento ' + @cMsgErr;
		  RAISERROR(@cMsgErr, 16, 1);
	   END CATCH;

	   /************************************/
	   IF( SELECT COUNT(*)
		  FROM #t_Error
		  WHERE APL = 'PORTAL' ) <= 0
	   BEGIN
		  IF @Portal >= 1
		  BEGIN
			 BEGIN TRY
				EXEC sp_rhh_cambiocodportal @cod_emp,
									   @cod_nue;
			 END TRY
			 BEGIN CATCH
				ROLLBACK TRANSACTION;
				INSERT INTO #t_Error( cod_emp,
								  Error,
								  APL
								)
				VALUES
					  (
					  @cod_emp, 'Se presentaron errores En Aplicacion de PORTAL. No se Puede cambiar el codigo', 'PORTAL' );

				SELECT * FROM #t_Error;
				RETURN;
			 END CATCH;
		  END;

		  --se llama de forma independiente el cambio de login
		  IF @Portal >= 1
		  BEGIN
			 BEGIN TRY
				EXEC sp_prt_CambioLogin @cod_emp,
								    @cod_nue;
			 END TRY
			 BEGIN CATCH
				ROLLBACK TRANSACTION;
				INSERT INTO #t_Error( cod_emp,
								  Error,
								  APL
								)
				VALUES
					  (
					  @cod_emp, 'Se presentaron errores En Aplicacion de PORTAL con el cambio de login. No se Puede cambiar el codigo', 'PORTAL' )
				;

				SELECT * FROM #t_Error;
				RETURN;
			 END CATCH;
		  END;

		  IF @Operac >= 1
		  BEGIN
			 BEGIN TRY
				EXEC sp_opr_cambio_cod_emp @cod_emp,
									  @cod_nue;
			 END TRY
			 BEGIN CATCH
				ROLLBACK TRANSACTION;
				--SELECT * FROM  #t_Error
				INSERT INTO #t_Error( cod_emp,
								  Error
								)
				VALUES
					  (
					  @cod_emp, 'Se presentaron errores En Aplicacion de Operaciones  No se Puede cambiar el codigo', 'OPERACIONES' );

				SELECT * FROM #t_Error;
				RETURN;
			 END CATCH;
		  END;
	   END;

	   IF XACT_STATE() = 1
	   BEGIN
		  COMMIT TRANSACTION;
	   END;

	   INSERT INTO #t_Error( cod_emp,
						Error,
						APL
					   )
	   VALUES
			(
			@cod_emp, 'Proceso Terminado. Se Cambio el codigo del Empleado ' + @cod_emp + ' . Por el codigo : ' + @cod_nue +
			'de la Aplicacion de NOMINA', 'NOM' );

	   SELECT * FROM #t_Error;
    END TRY
    BEGIN CATCH

	   EXEC sp_gen_validatriggers 'Tr_rhh_Ausentismo_Incapacidad',
							3;
	   EXEC sp_gen_validatriggers 'Tr_rhh_Ausentismo_Valid_PerBl',
							3;
	   EXEC sp_gen_validatriggers 'TR_RHH_EMP_HISFON_EC',
							3;
	   EXEC sp_gen_validatriggers 'TR_rhh_hisfon',
							3;
	   EXEC sp_gen_validatriggers 'TR_rhh_hisvac_dias',
							3;
	   EXEC sp_gen_validatriggers 'Tr_Rhh_IncapMov_Up_Del',
							3;
	   EXEC sp_gen_validatriggers 'tr_rhh_prestm',
							3;
	   EXEC sp_gen_validatriggers 'tr_rhh_prestm_Valid_PerBl',
							3;
	   EXEC sp_gen_validatriggers 'tr_rhh_PrestProg',
							3;
	   EXEC sp_gen_validatriggers 'tr_rhh_EmbargoCon',
							3;
	   EXEC sp_gen_validatriggers 'Tr_rhh_Hislab_Valid_PerBl',
							3;

	   EXEC sp_rhh_LiqErrInfo @cMsgErr OUTPUT;

	   ROLLBACK TRANSACTION;

	   INSERT INTO #t_Error( cod_emp,
						Error
					   )
	   VALUES
			(
			@cod_emp, 'Se presentaron errores ' + @cMsgErr + '. No se Cambio el codigo' );

	   SELECT * FROM #t_Error;
    END CATCH;
END;

```
