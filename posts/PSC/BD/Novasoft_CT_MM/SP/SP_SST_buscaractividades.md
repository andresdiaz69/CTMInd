# Stored Procedure: SP_SST_buscaractividades

```sql

--=============================================
--	 Author:		Marco Lara
--	 Create Date:   Marzo 2020
--	 Description:	Buscar actividades Matriz de Gestion de Mejoras
--	 ============================================ 
CREATE PROCEDURE [dbo].[SP_SST_buscaractividades]
	@cod_cia			CHAR(3),
	@cod_suc			CHAR(3),
	@cod_cli			CHAR(15),
	@area				VARCHAR(12),
	@cod_proc			CHAR(10),
	@Origen				CHAR(3),
	@EstAcc				CHAR(1),
	@TipAcc				CHAR(3),
	@Responsable		CHAR(12),
	@Tipo				CHAR(1),
	@cod_incid			INT

--WITH ENCRYPTION	

--SP_SST_buscaractividades '','','','','','','','','','1','1'

AS
BEGIN
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

	DECLARE @actividades TABLE
	(
	id					INT,
	cod_apl				CHAR(3) COLLATE DATABASE_DEFAULT,
	cod_act				CHAR(3) COLLATE DATABASE_DEFAULT,
	des_act				VARCHAR(5000) COLLATE DATABASE_DEFAULT,
	detalle				NVARCHAR(MAX) COLLATE DATABASE_DEFAULT,
	tip_acc				CHAR(3) COLLATE DATABASE_DEFAULT,
	des_acc				VARCHAR(200) COLLATE DATABASE_DEFAULT,
	fec_prog			DATETIME,
	cod_resp			CHAR(12) COLLATE DATABASE_DEFAULT,
	nom_resp			CHAR(60) COLLATE DATABASE_DEFAULT,
	cod_ori				CHAR(2) COLLATE DATABASE_DEFAULT,
	des_ori				CHAR(50) COLLATE DATABASE_DEFAULT,
	fec_eje				DATETIME,
	observacion			NVARCHAR(MAX) COLLATE DATABASE_DEFAULT,
	cod_incid			INT
	)

	IF OBJECT_ID(N'tempdb.dbo.#AreaProceso', N'U') IS NOT NULL
	DROP TABLE #AreaProceso

	CREATE TABLE #AreaProceso
	(
	incluir				BIT DEFAULT(0),
	cod_ori				CHAR(2) COLLATE DATABASE_DEFAULT,
	origen				VARCHAR(100) COLLATE DATABASE_DEFAULT,
	accion				VARCHAR(210) COLLATE DATABASE_DEFAULT,
	obs_ctrl_admin		NVARCHAR(MAX) COLLATE DATABASE_DEFAULT,
	tip_acc				CHAR(3) COLLATE DATABASE_DEFAULT,
	des_tip				VARCHAR(200) COLLATE DATABASE_DEFAULT,
	tabla				VARCHAR(30) COLLATE DATABASE_DEFAULT,
	llavearea			VARCHAR(200) COLLATE DATABASE_DEFAULT,
	OrigenU				VARCHAR(500) COLLATE DATABASE_DEFAULT,
	ActividadU			VARCHAR(500) COLLATE DATABASE_DEFAULT,
	AccionU				VARCHAR(500) COLLATE DATABASE_DEFAULT,
	Cod_cia				CHAR(3) COLLATE DATABASE_DEFAULT,			
	Compania			VARCHAR(500) COLLATE DATABASE_DEFAULT,
	DetalleAcc			VARCHAR(200) COLLATE DATABASE_DEFAULT
	)

	DECLARE
	@cadena				VARCHAR(MAX),
	@cadenaW			VARCHAR(MAX),
	@cadena1			VARCHAR(MAX),
	@cadena2			VARCHAR(MAX),
	@cadena3			VARCHAR(MAX),
	@cadena4			VARCHAR(MAX),
	@cadena5			VARCHAR(MAX),
	@cadena6			VARCHAR(MAX)

	SELECT @cadena = '', @cadenaw = ''

	IF @Tipo = '1'
	BEGIN
		SET @cadena = 'INSERT INTO #AreaProceso ';
		SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
		SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU) '
		SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,'
		SET @cadena = @cadena + 'c.detalle,' + QUOTENAME('SST_PlanAccionCopasst',CHAR(39)) + ','
		SET @cadena = @cadena + 'RTRIM(I.cod_copasst) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cons_acta) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_act_copasst) + ' + QUOTENAME(',',CHAR(39)) + '+'
		SET @cadena = @cadena + 'RTRIM(I.cod_acc_cop) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_cia) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_act AS VARCHAR(8))),'
		SET @cadena = @cadena + 'RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),'
		SET @cadena = @cadena + 'RTRIM(c.detalle),I.cod_cia,I.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3))+' + QUOTENAME(' - ',CHAR(39)) + '+RTRIM(w.des_tip) '
		SET @cadena = @cadena + 'FROM SST_PlanAccionCopasst I '
		SET @cadena = @cadena + 'INNER JOIN SST_AccMejCopasst A '
		SET @cadena = @cadena + 'ON I.cod_acc_cop = A.cod_acc_cop '
		SET @cadena = @cadena + 'INNER JOIN SST_Copasst B '
		SET @cadena = @cadena + 'ON i.cod_copasst = b.cod_copasst '
		SET @cadena = @cadena + 'AND i.cod_cia = B.cod_cia '
		SET @cadena = @cadena + 'INNER JOIN SST_TareasAsignadas C '
		SET @cadena = @cadena + 'ON C.llave = RTRIM(I.cod_cia)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cod_copasst)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cons_acta)'
		SET @cadena = @cadena + '+' + QUOTENAME('*',CHAR(39)) + '+ RTRIM(I.cod_act_copasst)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cod_acc_cop)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(CONVERT(CHAR,I.cons_act)) '
		SET @cadena = @cadena + 'AND c.cod_ori = '+ QUOTENAME('02',CHAR(39))
		SET @cadena = @cadena + ' INNER JOIN SST_OrigenActividad D '
		SET @cadena = @cadena + 'ON d.cod_ori = c.cod_ori '
		SET @cadena = @cadena + 'INNER JOIN gen_compania Z '
		SET @cadena = @cadena + 'ON i.cod_cia = Z.cod_cia '
		SET @cadena = @cadena + 'INNER JOIN SST_ProcTipAcc w '
		SET @cadena = @cadena + 'ON I.tip_acc = w.tip_acc '
		 
		IF @cod_cia != ''
		BEGIN
			SET @cadenaW = 'WHERE B.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
		END

		IF @cod_suc != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE B.cod_suc = ' + QUOTENAME(@cod_suc,CHAR(39)) ELSE @cadenaW + ' AND B.cod_suc = ' + QUOTENAME(@cod_suc,CHAR(39)) END 
		END

		IF @cod_incid != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) ELSE @cadenaW + ' AND i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) END 
		END

		IF @Origen != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) ELSE @cadenaW + ' AND d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) END 
		END

		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE I.llave IS NULL' ELSE @cadenaW + ' AND I.llave IS NULL' END 
		SET @cadena = @cadena + @cadenaW

		--EXECUTE sp_executesql (@cadena)
		EXEC(@cadena)

		SELECT @cadena = '', @cadenaw = ''

		SET @cadena = 'INSERT INTO #AreaProceso ';
		SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
		SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU) '
		SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
		SET @cadena = @cadena + 'c.detalle, ' + QUOTENAME('SST_EvaluaPlanAccion',CHAR(39)) + ','
		SET @cadena = @cadena + 'RTRIM(I.cod_eva) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_cia) + ' + QUOTENAME(',',CHAR(39)) + ' + CONVERT(CHAR(12),I.fec_eje,112) + ' + QUOTENAME(',',CHAR(39)) + ' + '
		SET @cadena = @cadena + 'RTRIM(I.cod_acc) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_act AS VARCHAR(8))),'
		SET @cadena = @cadena + 'RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),' 
		SET @cadena = @cadena + 'RTRIM(c.detalle),I.cod_cia,I.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3))+'+ QUOTENAME(' - ',CHAR(39)) +'+RTRIM(w.des_tip) ' 
		SET @cadena = @cadena + 'FROM SST_EvaluaPlanAccion I '
		SET @cadena = @cadena + 'INNER JOIN	SST_EvaluaAcciones A '
		SET @cadena = @cadena + 'ON I.cod_acc = A.cod_acc '
		SET @cadena = @cadena + 'INNER JOIN SST_TareasAsignadas C '
		SET @cadena = @cadena + 'ON C.llave = RTRIM(I.cod_eva)+'+ QUOTENAME('*',CHAR(39)) +'+RTRIM(I.cod_cia)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(CONVERT(CHAR,I.fec_eje,103))'
		SET @cadena = @cadena + '+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cod_acc)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(CONVERT(CHAR,I.cons_act)) AND c.cod_ori IN ('
		SET @cadena = @cadena + QUOTENAME('17',CHAR(39))+','+QUOTENAME('18',CHAR(39))+') '
		SET @cadena = @cadena + 'INNER JOIN SST_OrigenActividad D '
		SET @cadena = @cadena + 'ON d.cod_ori = c.cod_ori '
		SET @cadena = @cadena + 'INNER JOIN gen_compania Z '
		SET @cadena = @cadena + 'ON i.cod_cia = Z.cod_cia '
		SET @cadena = @cadena + 'INNER JOIN SST_ProcTipAcc w '
		SET @cadena = @cadena + 'ON I.tip_acc = w.tip_acc '


		IF @cod_cia != ''
		BEGIN
			SET @cadenaW = 'WHERE I.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
		END

		IF @cod_incid != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) ELSE @cadenaW + ' AND i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) END 
		END

		IF @Origen != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) ELSE @cadenaW + ' AND d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) END 
		END

		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE I.llave IS NULL' ELSE @cadenaW + ' AND I.llave IS NULL' END 
		SET @cadena = @cadena + @cadenaW

		--EXECUTE sp_executesql (@cadena)
		EXEC(@cadena)

		SELECT @cadena = '', @cadenaw = ''

		SET @cadena = 'INSERT INTO #AreaProceso ';
		SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
		SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU) '
		SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
		SET @cadena = @cadena + 'c.detalle, '+QUOTENAME('SST_GestCambPlanAccion',CHAR(39))+','
		SET @cadena = @cadena + 'RTRIM(I.cons_ges) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_acc) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_act AS VARCHAR(8))) +' + QUOTENAME(',',CHAR(39)) + ' +'
		SET @cadena = @cadena + 'RTRIM(I.cod_cia),RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),' 
		SET @cadena = @cadena + 'RTRIM(c.detalle),I.cod_cia,I.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3))+' + QUOTENAME(' - ',CHAR(39)) + '+RTRIM(w.des_tip) '
		SET @cadena = @cadena + 'FROM SST_GestCambPlanAccion I '
		SET @cadena = @cadena + 'INNER JOIN SST_GestCambAccion A '
		SET @cadena = @cadena + 'ON I.cod_acc = A.cod_acc '
		SET @cadena = @cadena + 'INNER JOIN SST_TareasAsignadas C '
		SET @cadena = @cadena + 'ON C.llave = RTRIM(I.cod_cia)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cons_ges)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cod_acc)+' 
		SET @cadena = @cadena + QUOTENAME('*',CHAR(39)) + '+RTRIM(CONVERT(CHAR,I.cons_act))	AND c.cod_ori = ' + QUOTENAME('07',CHAR(39))
		SET @cadena = @cadena + ' INNER JOIN SST_OrigenActividad D '
		SET @cadena = @cadena + 'ON d.cod_ori = c.cod_ori '
		SET @cadena = @cadena + 'INNER JOIN gen_compania Z '
		SET @cadena = @cadena + 'ON i.cod_cia = Z.cod_cia '
		SET @cadena = @cadena + 'INNER JOIN SST_ProcTipAcc w '
		SET @cadena = @cadena + 'ON I.tip_acc = w.tip_acc '

		IF @cod_cia != ''
		BEGIN
			SET @cadenaW = 'WHERE I.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
		END

		IF @cod_incid != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) ELSE @cadenaW + ' AND i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) END 
		END

		IF @Origen != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) ELSE @cadenaW + ' AND d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) END 
		END


		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE I.llave IS NULL' ELSE @cadenaW + ' AND I.llave IS NULL' END 
		SET @cadena = @cadena + @cadenaW

		--
		--EXECUTE sp_executesql (@cadena)
		EXEC(@cadena)

		SELECT @cadena = '', @cadenaw = ''

		SET @cadena = 'INSERT INTO #AreaProceso ';
		SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
		SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU) '
		SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
		SET @cadena = @cadena + 'c.detalle,' + QUOTENAME('SST_InspPlanAccion',CHAR(39)) + ','
		SET @cadena = @cadena + 'RTRIM(I.anio) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.version) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons AS VARCHAR(8))) +' + QUOTENAME(',',CHAR(39)) + ' +'
		SET @cadena = @cadena + 'RTRIM(I.cod_cia) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_acc) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_act AS VARCHAR(8))),'
		SET @cadena = @cadena + 'RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),' 
		SET @cadena = @cadena + 'RTRIM(c.detalle),I.cod_cia,I.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3))+' + QUOTENAME(' - ',CHAR(39)) + '+RTRIM(w.des_tip) '  
		SET @cadena = @cadena + 'FROM SST_InspPlanAccion I '
		SET @cadena = @cadena + 'INNER JOIN SST_InspAcciones A '
		SET @cadena = @cadena + 'ON I.cod_acc = A.cod_acc '
		SET @cadena = @cadena + 'INNER JOIN SST_TareasAsignadas C '
		SET @cadena = @cadena + 'ON C.llave = RTRIM(I.cod_cia)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.anio)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.version)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(CONVERT(CHAR,I.cons)) + '
		SET @cadena = @cadena + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cod_acc)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(CONVERT(CHAR,I.cons_act)) AND c.cod_ori = ' + QUOTENAME('08',CHAR(39))
		SET @cadena = @cadena + ' INNER JOIN SST_OrigenActividad D '
		SET @cadena = @cadena + 'ON d.cod_ori = c.cod_ori '
		SET @cadena = @cadena + 'INNER JOIN gen_compania Z '
		SET @cadena = @cadena + 'ON i.cod_cia = Z.cod_cia '
		SET @cadena = @cadena + 'INNER JOIN SST_ProcTipAcc w '
		SET @cadena = @cadena + 'ON I.tip_acc = w.tip_acc '

		IF @cod_cia != ''
		BEGIN
			SET @cadenaW = 'WHERE I.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
		END

		IF @cod_incid != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) ELSE @cadenaW + ' AND i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) END 
		END

		IF @Origen != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) ELSE @cadenaW + ' AND d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) END 
		END

		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE I.llave IS NULL' ELSE @cadenaW + ' AND I.llave IS NULL' END 
		SET @cadena = @cadena + @cadenaW

		--
		--EXECUTE sp_executesql (@cadena)
		EXEC(@cadena)

		SELECT @cadena = '', @cadenaw = ''

		SET @cadena = 'INSERT INTO #AreaProceso ';
		SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
		SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU) '
		SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
		SET @cadena = @cadena + 'c.detalle, ' + QUOTENAME('SST_PlanAccionAltGer',CHAR(39)) + ','
		SET @cadena = @cadena + 'RTRIM(I.cod_alta_gerencia) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cons_acta) + ' + QUOTENAME(',',CHAR(39))  
		SET @cadena = @cadena + ' + RTRIM(CAST(I.cod_act_altagerencia AS VARCHAR(8))) +' + QUOTENAME(',',CHAR(39)) + ' + '
		SET @cadena = @cadena + 'RTRIM(I.cod_acc_altger) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_cia) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_act AS VARCHAR(8))),'
		SET @cadena = @cadena + 'RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),' 
		SET @cadena = @cadena + 'RTRIM(c.detalle),I.cod_cia,I.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3)) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(w.des_tip) ' 
		SET @cadena = @cadena + 'FROM SST_PlanAccionAltGer I '
		SET @cadena = @cadena + 'INNER JOIN SST_AccMejAltGer A '
		SET @cadena = @cadena + 'ON I.cod_acc_altger = A.cod_acc_altger '
		SET @cadena = @cadena + 'INNER JOIN SST_TareasAsignadas C '
		SET @cadena = @cadena + 'ON C.llave = RTRIM(I.cod_cia)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cod_alta_gerencia)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cons_acta)+' + QUOTENAME('*',CHAR(39)) + '+'
		SET @cadena = @cadena + 'RTRIM(I.cod_act_altagerencia) + ' + QUOTENAME('*',CHAR(39)) + ' + RTRIM(I.cod_acc_altger) + ' + QUOTENAME('*',CHAR(39)) + ' + RTRIM(CONVERT(CHAR,I.cons_act)) '
		SET @cadena = @cadena + 'AND c.cod_ori = ' + QUOTENAME('01',CHAR(39))
		SET @cadena = @cadena + 'INNER JOIN SST_OrigenActividad D '
		SET @cadena = @cadena + 'ON d.cod_ori = c.cod_ori '
		SET @cadena = @cadena + 'INNER JOIN gen_compania Z '
		SET @cadena = @cadena + 'ON i.cod_cia = Z.cod_cia '
		SET @cadena = @cadena + 'INNER JOIN SST_ProcTipAcc w '
		SET @cadena = @cadena + 'ON I.tip_acc = w.tip_acc '

		IF @cod_cia != ''
		BEGIN
			SET @cadenaW = 'WHERE I.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
		END

		IF @cod_incid != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) ELSE @cadenaW + ' AND i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) END 
		END

		IF @Origen != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) ELSE @cadenaW + ' AND d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) END 
		END

		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE I.llave IS NULL' ELSE @cadenaW + ' AND I.llave IS NULL' END 
		SET @cadena = @cadena + @cadenaW

		--
		--EXECUTE sp_executesql (@cadena)
		EXEC(@cadena)

		SELECT @cadena = '', @cadenaw = ''

		SET @cadena = 'INSERT INTO #AreaProceso ';
		SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
		SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU) '
		SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
		SET @cadena = @cadena + 'c.detalle,' + QUOTENAME('SST_PlanAccionAudi',CHAR(39)) + ','
		SET @cadena = @cadena + 'RTRIM(I.cod_cia) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.conse AS VARCHAR(8))) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_sede) +' + QUOTENAME(',',CHAR(39)) + ' +'
		SET @cadena = @cadena + 'RTRIM(CAST(I.cod_tipo AS VARCHAR(8))) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.numeral AS VARCHAR(8))) + ' + QUOTENAME(',',CHAR(39)) + ' + '
		SET @cadena = @cadena + 'RTRIM(I.cod_acc_audi) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_act AS VARCHAR(8))),'
		SET @cadena = @cadena + 'RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),' 
		SET @cadena = @cadena + 'RTRIM(c.detalle),I.cod_cia,I.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3))+' + QUOTENAME(' - ',CHAR(39)) + '+RTRIM(w.des_tip)  '
		SET @cadena = @cadena + 'FROM SST_PlanAccionAudi I '
		SET @cadena = @cadena + 'INNER JOIN SST_AccMejAudi A '
		SET @cadena = @cadena + 'ON I.cod_acc_audi = A.cod_acc_aud '
		SET @cadena = @cadena + 'INNER JOIN SST_TareasAsignadas C '
		SET @cadena = @cadena + 'ON C.llave = RTRIM(I.cod_cia) + ' + QUOTENAME('*',CHAR(39)) + ' + RTRIM(CONVERT(CHAR,I.conse)) + ' + QUOTENAME('*',CHAR(39)) + ' + RTRIM(I.cod_sede) + ' + QUOTENAME('*',CHAR(39))
		SET @cadena = @cadena + '+RTRIM(CONVERT(CHAR,I.cod_tipo))+' + QUOTENAME('*',CHAR(39)) + ' + RTRIM(CONVERT(CHAR,I.numeral)) + ' + QUOTENAME('*',CHAR(39))
		SET @cadena = @cadena + '+RTRIM(I.cod_acc_audi) + ' + QUOTENAME('*',CHAR(39)) + ' + RTRIM(CONVERT(CHAR,I.cons_act))'
		SET @cadena = @cadena + 'AND c.cod_ori = ' + QUOTENAME('09',CHAR(39))
		SET @cadena = @cadena + ' INNER JOIN SST_OrigenActividad D '
		SET @cadena = @cadena + 'ON d.cod_ori = c.cod_ori '
		SET @cadena = @cadena + 'INNER JOIN gen_compania Z '
		SET @cadena = @cadena + 'ON i.cod_cia = Z.cod_cia '
		SET @cadena = @cadena + 'INNER JOIN SST_ProcTipAcc w '
		SET @cadena = @cadena + 'ON I.tip_acc = w.tip_acc '

		IF @cod_cia != ''
		BEGIN
			SET @cadenaW = 'WHERE I.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
		END

		IF @cod_incid != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) ELSE @cadenaW + ' AND i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) END 
		END

		IF @Origen != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) ELSE @cadenaW + ' AND d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) END 
		END

		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE I.llave IS NULL' ELSE @cadenaW + ' AND I.llave IS NULL' END 
		SET @cadena = @cadena + @cadenaW

		--
		--EXECUTE sp_executesql (@cadena)
		EXEC(@cadena)

		SELECT @cadena = '', @cadenaw = ''

		SET @cadena = 'INSERT INTO #AreaProceso ';
		SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
		SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU) '
		SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
		SET @cadena = @cadena + 'c.detalle,' + QUOTENAME('SST_PlanAccionBrigada',CHAR(39)) + ','
		SET @cadena = @cadena + 'RTRIM(CAST(I.cod_brigada AS VARCHAR(8))) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cons_acta) + ' 
		SET @cadena = @cadena + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_act_brig) +' + QUOTENAME(',',CHAR(39)) + ' +'
		SET @cadena = @cadena + 'RTRIM(I.cod_acc_brig) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_cia) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_act AS VARCHAR(8))),'
		SET @cadena = @cadena + 'RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),' 
		SET @cadena = @cadena + 'RTRIM(c.detalle),I.cod_cia,I.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3))+' + QUOTENAME(' - ',CHAR(39)) + '+RTRIM(w.des_tip) '      
		SET @cadena = @cadena + 'FROM SST_PlanAccionBrigada I '
		SET @cadena = @cadena + 'INNER JOIN SST_AccMejBrigada A '
		SET @cadena = @cadena + 'ON I.cod_acc_brig = A.cod_acc_brig '
		SET @cadena = @cadena + 'INNER JOIN SST_TareasAsignadas C '
		SET @cadena = @cadena + 'ON C.llave = RTRIM(I.cod_cia) + ' + QUOTENAME('*',CHAR(39)) + ' + RTRIM(CONVERT(CHAR,I.cod_brigada)) + ' + QUOTENAME('*',CHAR(39)) + ' + RTRIM(I.cons_acta) + ' + QUOTENAME('*',CHAR(39)) 
		SET @cadena = @cadena + '+ RTRIM(I.cod_act_brig) + ' + QUOTENAME('*',CHAR(39)) + ' + RTRIM(I.cod_acc_brig) + ' + QUOTENAME('*',CHAR(39)) + '+RTRIM(CONVERT(CHAR,I.cons_act)) '
		SET @cadena = @cadena + 'AND c.cod_ori = ' + QUOTENAME('03',CHAR(39))
		SET @cadena = @cadena + 'INNER JOIN SST_OrigenActividad D '
		SET @cadena = @cadena + 'ON d.cod_ori = c.cod_ori '
		SET @cadena = @cadena + 'INNER JOIN gen_compania Z '
		SET @cadena = @cadena + 'ON i.cod_cia = Z.cod_cia '
		SET @cadena = @cadena + 'INNER JOIN SST_ProcTipAcc w '
		SET @cadena = @cadena + 'ON I.tip_acc = w.tip_acc '

		IF @cod_cia != ''
		BEGIN
			SET @cadenaW = 'WHERE I.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
		END

		IF @cod_incid != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) ELSE @cadenaW + ' AND i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) END 
		END

		IF @Origen != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) ELSE @cadenaW + ' AND d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) END 
		END

		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE I.llave IS NULL' ELSE @cadenaW + ' AND I.llave IS NULL' END 
		SET @cadena = @cadena + @cadenaW

		--
		--EXECUTE sp_executesql (@cadena)
		EXEC(@cadena)

		SELECT @cadena = '', @cadenaw = ''

		SET @cadena = 'INSERT INTO #AreaProceso ';
		SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
		SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU) '
		SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
		SET @cadena = @cadena + 'c.detalle,' + QUOTENAME('SST_PlanAccionComiteConv',CHAR(39)) + ','
		SET @cadena = @cadena + 'RTRIM(I.cod_comite) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cons_acta) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_act_comite) +' + QUOTENAME(',',CHAR(39)) + ' +'
		SET @cadena = @cadena + 'RTRIM(I.cod_acc_comite) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_cia) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_act AS VARCHAR(8))),'
		SET @cadena = @cadena + 'RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),' 
		SET @cadena = @cadena + 'RTRIM(c.detalle),I.cod_cia,I.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(c.tip_acc AS VARCHAR(3))+' + QUOTENAME(' - ',CHAR(39)) + '+RTRIM(w.des_tip) '
		SET @cadena = @cadena + 'FROM SST_PlanAccionComiteConv I '
		SET @cadena = @cadena + 'INNER JOIN SST_AccMejComiteConv A '
		SET @cadena = @cadena + 'ON I.cod_acc_comite = A.cod_acc_comite '
		SET @cadena = @cadena + 'INNER JOIN SST_TareasAsignadas C '
		SET @cadena = @cadena + 'ON C.llave = RTRIM(I.cod_cia)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cod_comite)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cons_acta)+' + QUOTENAME('*',CHAR(39)) + '+'
		SET @cadena = @cadena + 'RTRIM(I.cod_act_comite)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cod_acc_comite)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(CONVERT(CHAR,I.cons_act)) '
		SET @cadena = @cadena + 'AND c.cod_ori = ' + QUOTENAME('04',CHAR(39))
		SET @cadena = @cadena + 'INNER JOIN SST_OrigenActividad D '
		SET @cadena = @cadena + 'ON d.cod_ori = c.cod_ori '
		SET @cadena = @cadena + 'INNER JOIN gen_compania Z '
		SET @cadena = @cadena + 'ON i.cod_cia = Z.cod_cia '
		SET @cadena = @cadena + 'INNER JOIN SST_ProcTipAcc w '
		SET @cadena = @cadena + 'ON C.tip_acc = w.tip_acc '

		IF @cod_cia != ''
		BEGIN
			SET @cadenaW = 'WHERE I.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
		END

		IF @cod_incid != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) ELSE @cadenaW + ' AND i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) END 
		END

		IF @Origen != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) ELSE @cadenaW + ' AND d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) END 
		END

		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE I.llave IS NULL' ELSE @cadenaW + ' AND I.llave IS NULL' END 
		SET @cadena = @cadena + @cadenaW

		--
		--EXECUTE sp_executesql (@cadena)
		EXEC(@cadena)

		SELECT @cadena = '', @cadenaw = ''

		SET @cadena = 'INSERT INTO #AreaProceso ';
		SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
		SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU) '
		SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
		SET @cadena = @cadena + 'c.detalle,' + QUOTENAME('SST_PlanAccionComiteSV',CHAR(39)) +','
		SET @cadena = @cadena + 'RTRIM(I.cod_comite_sv) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cons_acta) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_act_comite_sv) +' + QUOTENAME(',',CHAR(39)) + ' + '
		SET @cadena = @cadena + 'RTRIM(I.cod_acc_comite_sv) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_cia) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_act AS VARCHAR(8))),'
		SET @cadena = @cadena + 'RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),' 
		SET @cadena = @cadena + 'RTRIM(c.detalle),I.cod_cia,I.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3)) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(w.des_tip) '      
		SET @cadena = @cadena + 'FROM SST_PlanAccionComiteSV I '
		SET @cadena = @cadena + 'INNER JOIN SST_AccMejComiteSV A '
		SET @cadena = @cadena + 'ON I.cod_acc_comite_sv = A.cod_acc_comite_sv '
		SET @cadena = @cadena + 'INNER JOIN SST_TareasAsignadas C '
		SET @cadena = @cadena + 'ON C.llave = RTRIM(I.cod_cia)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cod_comite_sv)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cons_acta)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cod_act_comite_sv)'
		SET @cadena = @cadena + '+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cod_acc_comite_sv)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(CONVERT(CHAR,I.cons_act)) '
		SET @cadena = @cadena + 'AND c.cod_ori = ' + QUOTENAME('05',CHAR(39))
		SET @cadena = @cadena + 'INNER JOIN SST_OrigenActividad D '
		SET @cadena = @cadena + 'ON d.cod_ori = c.cod_ori '
		SET @cadena = @cadena + 'INNER JOIN gen_compania Z '
		SET @cadena = @cadena + 'ON i.cod_cia = Z.cod_cia '
		SET @cadena = @cadena + 'INNER JOIN SST_ProcTipAcc w '
		SET @cadena = @cadena + 'ON I.tip_acc = w.tip_acc '

		IF @cod_cia != ''
		BEGIN
			SET @cadenaW = 'WHERE I.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
		END

		IF @cod_incid != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) ELSE @cadenaW + ' AND i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) END 
		END

		IF @Origen != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) ELSE @cadenaW + ' AND d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) END 
		END

		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE I.llave IS NULL' ELSE @cadenaW + ' AND I.llave IS NULL' END 
		SET @cadena = @cadena + @cadenaW

		EXEC(@cadena)

		--SELECT @cadena = '', @cadenaw = ''

		SET @cadena = 'INSERT INTO #AreaProceso ';
		SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
		SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU) '
		SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
		SET @cadena = @cadena + 'c.detalle, ' + QUOTENAME('SST_PlanAccionPlanEme',CHAR(39)) +','
		SET @cadena = @cadena + 'RTRIM(I.cod_cia) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_plan_emerg) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.Cod_ClasPlanEme) +' + QUOTENAME(',',CHAR(39)) + ' +'
		SET @cadena = @cadena + 'RTRIM(CAST(I.cons_eje AS VARCHAR(8))) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_acc_eme) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_act AS VARCHAR(8))),'
		SET @cadena = @cadena + 'RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),' 
		SET @cadena = @cadena + 'RTRIM(c.detalle),I.cod_cia,I.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3))+' + QUOTENAME(' - ',CHAR(39)) + '+RTRIM(w.des_tip) '  
		SET @cadena = @cadena + 'FROM SST_PlanAccionPlanEme I '
		SET @cadena = @cadena + 'INNER JOIN SST_AccMejPlanEme A '
		SET @cadena = @cadena + 'ON I.cod_acc_eme = A.cod_acc_eme '
		SET @cadena = @cadena + 'INNER JOIN SST_TareasAsignadas C '
		SET @cadena = @cadena + 'ON C.llave = RTRIM(I.cod_cia)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cod_plan_emerg)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.Cod_ClasPlanEme)+' + QUOTENAME('*',CHAR(39)) + '+'
		SET @cadena = @cadena + 'RTRIM(CONVERT(CHAR,I.cons_eje))+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cod_acc_eme)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(CONVERT(CHAR,I.cons_act)) '
		SET @cadena = @cadena + 'AND c.cod_ori = ' + QUOTENAME('10',CHAR(39))
		SET @cadena = @cadena + 'INNER JOIN SST_OrigenActividad D '
		SET @cadena = @cadena + 'ON d.cod_ori = c.cod_ori '
		SET @cadena = @cadena + 'INNER JOIN gen_compania Z '
		SET @cadena = @cadena + 'ON i.cod_cia = Z.cod_cia '
		SET @cadena = @cadena + 'INNER JOIN SST_ProcTipAcc w '
		SET @cadena = @cadena + 'ON I.tip_acc = w.tip_acc '

		IF @cod_cia != ''
		BEGIN
			SET @cadenaW = 'WHERE I.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
		END

		IF @cod_incid != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) ELSE @cadenaW + ' AND i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) END 
		END

		IF @Origen != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) ELSE @cadenaW + ' AND d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) END 
		END

		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE I.llave IS NULL' ELSE @cadenaW + ' AND I.llave IS NULL' END 

		SET @cadena = @cadena + @cadenaW

		EXEC(@cadena)

		SELECT @cadena = '', @cadenaw = ''

		SET @cadena = 'INSERT INTO #AreaProceso ';
		SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
		SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU) '
		SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
		SET @cadena = @cadena + 'c.detalle,' + QUOTENAME('SST_ProcPlanAccion',CHAR(39)) + ','
		SET @cadena = @cadena + 'RTRIM(CAST(I.cod_proc AS VARCHAR(8))) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CONVERT(CHAR(8),I.fecha,112)) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons AS VARCHAR(8))) +' + QUOTENAME(',',CHAR(39)) + ' +'
		SET @cadena = @cadena + 'RTRIM(I.cod_acc) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.tip_doc) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_cia),RTRIM(c.cod_ori)' 
		SET @cadena = @cadena + '+ ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),'  
		SET @cadena = @cadena + 'RTRIM(c.detalle),I.cod_cia,I.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3)) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(w.des_tip) '  
		SET @cadena = @cadena + 'FROM SST_ProcPlanAccion I '
		SET @cadena = @cadena + 'INNER JOIN SST_ProcAcciones A '
		SET @cadena = @cadena + 'ON I.cod_acc = A.cod_acc '
		SET @cadena = @cadena + 'INNER JOIN SST_TareasAsignadas C '
		SET @cadena = @cadena + 'ON C.llave = RTRIM(I.cod_cia)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(CONVERT(CHAR,I.cod_proc))+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(CONVERT(CHAR,I.fecha,103))+' + QUOTENAME('*',CHAR(39)) + '+'
		SET @cadena = @cadena + 'RTRIM(CONVERT(CHAR,I.cons))+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cod_acc)+' + QUOTENAME('*',CHAR(39)) + ' + RTRIM(I.tip_doc) '
		SET @cadena = @cadena + 'AND c.cod_ori = ' + QUOTENAME('11',CHAR(39))
		SET @cadena = @cadena + ' INNER JOIN SST_OrigenActividad D '
		SET @cadena = @cadena + 'ON d.cod_ori = c.cod_ori ' 
		SET @cadena = @cadena + 'INNER JOIN gen_compania Z '
		SET @cadena = @cadena + 'ON i.cod_cia = Z.cod_cia '
		SET @cadena = @cadena + 'INNER JOIN SST_ProcTipAcc w '
		SET @cadena = @cadena + 'ON I.tip_acc = w.tip_acc '

		IF @cod_cia != ''
		BEGIN
			SET @cadenaW = 'WHERE I.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
		END

		IF @cod_incid != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) ELSE @cadenaW + ' AND i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) END 
		END

		IF @cod_proc != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE i.cod_proc = ' + QUOTENAME(@cod_proc,CHAR(39)) ELSE @cadenaW + ' AND i.cod_proc = ' + QUOTENAME(@cod_proc,CHAR(39)) END 
		END

		IF @Origen != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) ELSE @cadenaW + ' AND d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) END 
		END

		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE I.llave IS NULL' ELSE @cadenaW + ' AND I.llave IS NULL' END 
		SET @cadena = @cadena + @cadenaW

		--
		--EXECUTE sp_executesql (@cadena)
		EXEC(@cadena)

		SELECT @cadena = '', @cadenaw = ''

		SET @cadena = 'INSERT INTO #AreaProceso ';
		SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
		SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU) '
		SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
		SET @cadena = @cadena + 'c.detalle,' + QUOTENAME('SST_RevAltaDirPlanAccion',CHAR(39)) + ','
		SET @cadena = @cadena + 'RTRIM(CAST(I.cons AS VARCHAR(8))) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_ent) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_acc) +' + QUOTENAME(',',CHAR(39)) + ' +'
		SET @cadena = @cadena + 'RTRIM(I.cod_cia) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_act AS VARCHAR(8))),'
		SET @cadena = @cadena + 'RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),' 
		SET @cadena = @cadena + 'RTRIM(c.detalle),I.cod_cia,I.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3))+' + QUOTENAME(' - ',CHAR(39)) + '+RTRIM(w.des_tip) ' 
		SET @cadena = @cadena + 'FROM SST_RevAltaDirPlanAccion I '
		SET @cadena = @cadena + 'INNER JOIN SST_RevAltaDirAccion A '
		SET @cadena = @cadena + 'ON I.cod_acc = A.cod_acc '
		SET @cadena = @cadena + 'INNER JOIN SST_TareasAsignadas C '
		SET @cadena = @cadena + 'ON C.llave = RTRIM(I.cod_cia)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(CONVERT(CHAR,I.cons))+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cod_ent)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cod_acc)'
		SET @cadena = @cadena + '+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(CONVERT(CHAR,I.cons_act)) '
		SET @cadena = @cadena + 'AND c.cod_ori = ' + QUOTENAME('12',CHAR(39))
		SET @cadena = @cadena + 'INNER JOIN SST_OrigenActividad D '
		SET @cadena = @cadena + 'ON d.cod_ori = c.cod_ori '
		SET @cadena = @cadena + 'INNER JOIN gen_compania Z '
		SET @cadena = @cadena + 'ON i.cod_cia = Z.cod_cia '
		SET @cadena = @cadena + 'INNER JOIN SST_ProcTipAcc w '
		SET @cadena = @cadena + 'ON I.tip_acc = w.tip_acc '

		IF @cod_cia != ''
		BEGIN
			SET @cadenaW = 'WHERE I.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
		END

		IF @cod_incid != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) ELSE @cadenaW + ' AND i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) END 
		END

		IF @Origen != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) ELSE @cadenaW + ' AND d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) END 
		END

		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE I.llave IS NULL' ELSE @cadenaW + ' AND I.llave IS NULL' END 
		SET @cadena = @cadena + @cadenaW

		--
		--EXECUTE sp_executesql (@cadena)
		EXEC(@cadena)

		SELECT @cadena = '', @cadenaw = ''

		SET @cadena = 'INSERT INTO #AreaProceso ';
		SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
		SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU) '
		SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
		SET @cadena = @cadena + 'c.detalle,' + QUOTENAME('SST_RiesgoPsicosocPlanAccion',CHAR(39)) + ','
		SET @cadena = @cadena + 'RTRIM(I.cod_riepsico) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_cia) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_acc) +' + QUOTENAME(',',CHAR(39)) + ' +'
		SET @cadena = @cadena + 'RTRIM(CAST(I.cons_act AS VARCHAR(8))),RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),'  
		SET @cadena = @cadena + 'RTRIM(c.detalle),I.cod_cia,I.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3))+' + QUOTENAME(' - ',CHAR(39)) + '+RTRIM(w.des_tip) '  
		SET @cadena = @cadena + 'FROM SST_RiesgoPsicosocPlanAccion I '
		SET @cadena = @cadena + 'INNER JOIN SST_RiesgoPsicosocAccion A '
		SET @cadena = @cadena + 'ON I.cod_acc = A.cod_acc '
		SET @cadena = @cadena + 'INNER JOIN SST_TareasAsignadas C '
		SET @cadena = @cadena + 'ON C.llave = RTRIM(I.cod_cia)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cod_riepsico)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cod_acc)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(CONVERT(CHAR,I.cons_act)) '
		SET @cadena = @cadena + 'AND c.cod_ori = ' + QUOTENAME('13',CHAR(39))
		SET @cadena = @cadena + 'INNER JOIN SST_OrigenActividad D '
		SET @cadena = @cadena + 'ON d.cod_ori = c.cod_ori '
		SET @cadena = @cadena + 'INNER JOIN gen_compania Z '
		SET @cadena = @cadena + 'ON i.cod_cia = Z.cod_cia '
		SET @cadena = @cadena + 'INNER JOIN SST_ProcTipAcc w '
		SET @cadena = @cadena + 'ON I.tip_acc = w.tip_acc '

		IF @cod_cia != ''
		BEGIN
			SET @cadenaW = 'WHERE I.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
		END

		IF @cod_incid != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) ELSE @cadenaW + ' AND i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) END 
		END

		IF @Origen != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) ELSE @cadenaW + ' AND d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) END 
		END

		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE I.llave IS NULL' ELSE @cadenaW + ' AND I.llave IS NULL' END 
		SET @cadena = @cadena + @cadenaW

		--
		--EXECUTE sp_executesql (@cadena)
		EXEC(@cadena)

		SELECT @cadena = '', @cadenaw = ''

		SET @cadena = 'INSERT INTO #AreaProceso ';
		SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
		SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU) '
		SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
		SET @cadena = @cadena + 'c.detalle,' + QUOTENAME('GTH_Acc_Acciones',CHAR(39)) + ','
		SET @cadena = @cadena + 'RTRIM(I.cod_emp) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cod_acc AS VARCHAR(8))) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_doc AS VARCHAR(8))) +' + QUOTENAME(',',CHAR(39)) + ' +'
		SET @cadena = @cadena + 'RTRIM(I.tip_cla) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_act AS VARCHAR(8))),'
		SET @cadena = @cadena + 'RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),'
		SET @cadena = @cadena + 'RTRIM(c.detalle),H.cod_cia,H.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3))+' + QUOTENAME(' - ',CHAR(39)) + '+RTRIM(w.des_tip) '
		SET @cadena = @cadena + 'FROM GTH_Acc_Acciones I '
		SET @cadena = @cadena + 'INNER JOIN GTH_Incid_Clasif A '
		SET @cadena = @cadena + 'ON I.tip_cla = A.tip_cla '
		SET @cadena = @cadena + 'INNER JOIN SST_TareasAsignadas C '
		SET @cadena = @cadena + 'ON C.llave = RTRIM(I.cod_emp)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(CONVERT(CHAR,I.cod_acc))+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(CONVERT(CHAR,I.cons_doc))'
		SET @cadena = @cadena + '+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.tip_cla)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(CONVERT(CHAR,I.cons_act))'
		SET @cadena = @cadena + 'AND c.cod_ori = ' + QUOTENAME('14',CHAR(39))
		SET @cadena = @cadena + 'INNER JOIN SST_OrigenActividad D '
		SET @cadena = @cadena + 'ON d.cod_ori = c.cod_ori '
		SET @cadena = @cadena + 'INNER JOIN rhh_emplea H '
		SET @cadena = @cadena + 'ON I.cod_emp = H.cod_emp '
		SET @cadena = @cadena + 'INNER JOIN gen_compania Z '
		SET @cadena = @cadena + 'ON H.cod_cia = Z.cod_cia '
		SET @cadena = @cadena + 'INNER JOIN SST_ProcTipAcc w '
		SET @cadena = @cadena + 'ON I.tip_acc = w.tip_acc '

		IF @cod_cia != ''
		BEGIN
			SET @cadenaW = 'WHERE H.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
		END

		IF @cod_incid != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) ELSE @cadenaW + ' AND i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) END 
		END

		IF @Origen != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) ELSE @cadenaW + ' AND d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) END 
		END

		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE I.llave IS NULL' ELSE @cadenaW + ' AND I.llave IS NULL' END 
		SET @cadena = @cadena + @cadenaW

		--
		--EXECUTE sp_executesql (@cadena)
		EXEC(@cadena)

		SELECT @cadena = '', @cadenaw = ''

		SET @cadena = 'INSERT INTO #AreaProceso ';
		SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
		SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU) '
		SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
		SET @cadena = @cadena + 'c.detalle,' + QUOTENAME('GTH_Incid_Acciones',CHAR(39)) + ','
		SET @cadena = @cadena + 'RTRIM(I.cod_emp) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cod_inc AS VARCHAR(8))) + ' 
		SET @cadena = @cadena + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_doc AS VARCHAR(8))) +' + QUOTENAME(',',CHAR(39)) + ' +'
		SET @cadena = @cadena + 'RTRIM(I.tip_cla) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_act AS VARCHAR(8))),'
		SET @cadena = @cadena + 'RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),' 
		SET @cadena = @cadena + 'RTRIM(c.detalle),H.cod_cia,H.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3))+' + QUOTENAME(' - ',CHAR(39)) + '+RTRIM(w.des_tip) '
		SET @cadena = @cadena + 'FROM GTH_Incid_Acciones I '
		SET @cadena = @cadena + 'INNER JOIN GTH_Incid_Clasif A '
		SET @cadena = @cadena + 'ON I.tip_cla = A.tip_cla '
		SET @cadena = @cadena + 'INNER JOIN SST_TareasAsignadas C '
		SET @cadena = @cadena + 'ON C.llave = RTRIM(I.cod_emp)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(CONVERT(CHAR,I.cod_inc))+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(CONVERT(CHAR,I.cons_doc))'
		SET @cadena = @cadena + '+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.tip_cla)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(CONVERT(CHAR,I.cons_act)) AND c.cod_ori = ' + QUOTENAME('15',CHAR(39))
		SET @cadena = @cadena + 'INNER JOIN SST_OrigenActividad D '
		SET @cadena = @cadena + 'ON d.cod_ori = c.cod_ori '
		SET @cadena = @cadena + 'INNER JOIN rhh_emplea H '
		SET @cadena = @cadena + 'ON I.cod_emp = H.cod_emp '
		SET @cadena = @cadena + 'INNER JOIN gen_compania Z '
		SET @cadena = @cadena + 'ON H.cod_cia = Z.cod_cia '
		SET @cadena = @cadena + 'INNER JOIN SST_ProcTipAcc w '
		SET @cadena = @cadena + 'ON I.tip_acc = w.tip_acc '

		IF @cod_cia != ''
		BEGIN
			SET @cadenaW = 'WHERE H.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
		END

		IF @cod_incid != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) ELSE @cadenaW + ' AND i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) END 
		END

		IF @Origen != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) ELSE @cadenaW + ' AND d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) END 
		END

		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE I.llave IS NULL' ELSE @cadenaW + ' AND I.llave IS NULL' END 
		SET @cadena = @cadena + @cadenaW

		--
		--EXECUTE sp_executesql (@cadena)
		EXEC(@cadena)

		SELECT @cadena = '', @cadenaw = ''

		SET @cadena = 'INSERT INTO #AreaProceso ';
		SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
		SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU) '
		SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
		SET @cadena = @cadena + 'c.detalle,' + QUOTENAME('SST_SegPosEnfLabAccion',CHAR(39)) + ','
		SET @cadena = @cadena + 'RTRIM(I.cod_emp) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cod_seg AS VARCHAR(8))) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_doc AS VARCHAR(8))) +' + QUOTENAME(',',CHAR(39)) + ' +'
		SET @cadena = @cadena + 'RTRIM(I.tip_cla) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_act AS VARCHAR(8))),'
		SET @cadena = @cadena + 'RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),' 
		SET @cadena = @cadena + 'RTRIM(c.detalle),H.cod_cia,H.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3))+' + QUOTENAME(' - ',CHAR(39)) + '+RTRIM(w.des_tip) '
		SET @cadena = @cadena + 'FROM SST_SegPosEnfLabAccion I '
		SET @cadena = @cadena + 'INNER JOIN GTH_Incid_Clasif A '
		SET @cadena = @cadena + 'ON I.tip_cla = A.tip_cla '
		SET @cadena = @cadena + 'INNER JOIN SST_TareasAsignadas C '
		SET @cadena = @cadena + 'ON C.llave = RTRIM(I.cod_emp)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(CONVERT(CHAR,I.cod_seg))+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(CONVERT(CHAR,I.cons_doc))'
		SET @cadena = @cadena + '+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.tip_cla)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(CONVERT(CHAR,I.cons_act)) AND c.cod_ori = ' + QUOTENAME('16',CHAR(39))
		SET @cadena = @cadena + 'INNER JOIN SST_OrigenActividad D '
		SET @cadena = @cadena + 'ON d.cod_ori = c.cod_ori '
		SET @cadena = @cadena + 'INNER JOIN rhh_emplea H '
		SET @cadena = @cadena + 'ON I.cod_emp = H.cod_emp '
		SET @cadena = @cadena + 'INNER JOIN gen_compania Z '
		SET @cadena = @cadena + 'ON H.cod_cia = Z.cod_cia '
		SET @cadena = @cadena + 'INNER JOIN SST_ProcTipAcc w '
		SET @cadena = @cadena + 'ON I.tip_acc = w.tip_acc '

		IF @cod_cia != ''
		BEGIN
			SET @cadenaW = 'WHERE H.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
		END

		IF @cod_incid != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) ELSE @cadenaW + ' AND i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) END 
		END

		IF @Origen != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) ELSE @cadenaW + ' AND d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) END 
		END

		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE I.llave IS NULL' ELSE @cadenaW + ' AND I.llave IS NULL' END 
		SET @cadena = @cadena + @cadenaW

		--
		--EXECUTE sp_executesql (@cadena)
		EXEC(@cadena)

		SELECT @cadena = '', @cadenaw = ''

		SET @cadena = 'INSERT INTO #AreaProceso ';
		SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
		SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU) '
		SET @cadena = @cadena + 'SELECT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,'
		SET @cadena = @cadena + 'c.detalle,' + QUOTENAME('SST_PlanAccionNovedadRACI',CHAR(39)) + ','
		SET @cadena = @cadena + 'RTRIM(CONVERT(CHAR,I.cons)) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_cia) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CONVERT(CHAR, I.cons_nov)) + ' + QUOTENAME(',',CHAR(39)) + '+'
		SET @cadena = @cadena + 'RTRIM(CONVERT(CHAR, I.cod_nov)) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CONVERT(CHAR,I.cons_act)) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CONVERT(CHAR,I.cod_acc)),'
		SET @cadena = @cadena + 'RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),'
		SET @cadena = @cadena + 'RTRIM(c.detalle),I.cod_cia,I.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3))+' + QUOTENAME(' - ',CHAR(39)) + '+RTRIM(w.des_tip) '
		SET @cadena = @cadena + 'FROM SST_PlanAccionNovedadRACI I '
		SET @cadena = @cadena + 'INNER JOIN SST_AccMejRACI A '
		SET @cadena = @cadena + 'ON I.cod_acc = A.cod_acc '
		SET @cadena = @cadena + 'INNER JOIN SST_TareasAsignadas C '
		SET @cadena = @cadena + 'ON C.llave = RTRIM(CONVERT(CHAR,I.cons)) + ' + QUOTENAME('*',CHAR(39)) + ' + RTRIM(I.cod_cia) + ' + QUOTENAME('*',CHAR(39)) + ' + RTRIM(CONVERT(CHAR, I.cons_nov)) + ' + QUOTENAME('*',CHAR(39)) + '+'
		SET @cadena = @cadena + 'RTRIM(CONVERT(CHAR, I.cod_nov)) + ' + QUOTENAME('*',CHAR(39)) + ' + RTRIM(CONVERT(CHAR,I.cons_act)) + ' + QUOTENAME('*',CHAR(39)) + ' + RTRIM(CONVERT(CHAR,I.cod_acc)) '
		SET @cadena = @cadena + 'AND c.cod_ori = '+ QUOTENAME('19',CHAR(39))
		SET @cadena = @cadena + ' INNER JOIN SST_OrigenActividad D '
		SET @cadena = @cadena + 'ON d.cod_ori = c.cod_ori '
		SET @cadena = @cadena + 'INNER JOIN gen_compania Z '
		SET @cadena = @cadena + 'ON i.cod_cia = Z.cod_cia '
		SET @cadena = @cadena + 'INNER JOIN SST_ProcTipAcc w '
		SET @cadena = @cadena + 'ON I.tip_acc = w.tip_acc '

		IF @cod_cia != ''
		BEGIN
			SET @cadenaW = 'WHERE I.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
		END
				
		IF @cod_incid != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) ELSE @cadenaW + ' AND i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) END 
		END

		IF @Origen != ''
		BEGIN
			SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) ELSE @cadenaW + ' AND d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) END 
		END

		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE I.llave IS NULL' ELSE @cadenaW + ' AND I.llave IS NULL' END 
		SET @cadena = @cadena + @cadenaW

		EXEC(@cadena)		

		SELECT * FROM #AreaProceso
	END
	IF @Tipo = '2' 
	BEGIN
		IF @cod_cia = ''
		BEGIN
			SET @cod_cia = '%'
		END
		IF @cod_cli = ''
		BEGIN
			SET @cod_cli = '%'
		END
		IF @cod_suc = ''
		BEGIN
			SET @cod_suc = '%'
		END
		IF @EstAcc = ''
		BEGIN
			SET @EstAcc = '%'
		END
		IF @TipAcc = ''
		BEGIN
			SET @TipAcc = '%'
		END
		IF @Responsable = ''
		BEGIN
			SET @Responsable = '%'
		END

		CREATE TABLE #Tarea
		(
			id			INT,
			cod_act		CHAR(3),
			des_act		VARCHAR(200),
			detalle		NVARCHAR(MAX),
			tip_acc		CHAR(3),
			fec_prog	DATETIME,
			cod_resp	CHAR(12),
			cod_ori		CHAR(2),
			fec_eje		DATETIME,
			observacion	NVARCHAR(MAX),
			nom_emp		VARCHAR(200),
			des_ori		VARCHAR(100),
			des_tip		VARCHAR(200),
			cod_est		CHAR(1),
			des_est		VARCHAR(200)
		);

		SET @cadena1 = 'INSERT INTO #Tarea ';
		SET @cadena1 = @cadena1 + 'SELECT DISTINCT a.id,a.cod_act,a.des_act,a.detalle,a.tip_acc,a.fec_prog,I.emp_resp,a.cod_ori,'+
		'MAX(SP.fec_rev) OVER (PARTITION BY I.cod_copasst,I.cons_acta,I.cod_act_copasst,I.cod_acc_cop,I.cod_cia,I.cons_act ORDER BY I.cod_copasst,I.cons_acta,I.cod_act_copasst,I.cod_acc_cop,I.cod_cia,I.cons_act)'+'
		,a.observacion,RTRIM(b.ap1_emp)+RTRIM('' ''+b.ap2_emp)+RTRIM('' ''+b.nom_emp),c.des_ori,TA.des_tip,I.cod_plan_eje,ES.nom_plan_eje ';
		SET @cadena1 = @cadena1 + 'FROM	SST_TareasAsignadas AS a ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_PlanAccionCopasst AS I ON RTRIM(A.llave) = RTRIM(I.cod_cia)+''*''+RTRIM(I.cod_copasst)+''*''+RTRIM(I.cons_acta)+''*'' ';
		SET @cadena1 = @cadena1 + '+RTRIM(I.cod_act_copasst)+''*''+RTRIM(I.cod_acc_cop)+''*''+RTRIM(CONVERT(CHAR,I.cons_act)) ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_Copasst AS CP ON I.cod_cia = CP.cod_cia AND I.cod_copasst = CP.cod_copasst ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_emplea AS b ON I.emp_resp = b.cod_emp ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_hislab AS H ON b.cod_emp = H.cod_emp ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_EmpConv AS Ec ON b.cod_emp = Ec.cod_emp AND (H.fec_ini BETWEEN EC.fec_ini AND EC.fec_fin OR (H.fec_ini >= EC.fec_ini AND EC.fec_fin IS NULL)) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_Convenio AS CV ON Ec.cod_conv = CV.cod_conv AND CV.cod_cli LIKE ''' + RTRIM(@cod_cli) +'''';
		SET @cadena1 = @cadena1 + ' INNER JOIN SST_OrigenActividad AS c ON a.cod_ori = c.cod_ori ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_ProcTipAcc AS TA ON a.tip_acc = TA.tip_acc ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN SST_SegPlanAccionCopasst AS SP ON I.cod_copasst = SP.cod_copasst AND I.cons_acta = SP.cons_acta AND I.cod_act_copasst = SP.cod_act_copasst AND I.cod_acc_cop = SP.cod_acc_cop AND I.cod_cia = SP.cod_cia AND I.cons_act = SP.cons_act '
		SET @cadena1 = @cadena1 + 'INNER JOIN GTH_AccIncPlanEje AS ES ON I.cod_plan_eje = ES.cod_plan_eje ';
		SET @cadena1 = @cadena1 + ' WHERE CP.cod_suc LIKE ' + QUOTENAME(RTRIM(@cod_suc),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND I.cod_cia LIKE ' + QUOTENAME(RTRIM(@cod_cia),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND a.cod_ori = ' + QUOTENAME('02',CHAR(39)) + ' AND ES.cod_plan_eje LIKE ' + QUOTENAME(@EstAcc,CHAR(39))
		SET @cadena1 = @cadena1 + ' AND TA.tip_acc LIKE ' + QUOTENAME(RTRIM(@TipAcc),CHAR(39)) + ' AND a.cod_resp LIKE ' + QUOTENAME(RTRIM(@Responsable),CHAR(39));

		EXEC(@cadena1);
	
		SET @cadena1 = 'INSERT INTO #Tarea ';
		SET @cadena1 = @cadena1 + 'SELECT DISTINCT a.id,a.cod_act,a.des_act,a.detalle,a.tip_acc,a.fec_prog,a.cod_resp,a.cod_ori,a.fec_eje,a.observacion,RTRIM(b.ap1_emp)+RTRIM('' ''+b.ap2_emp)+RTRIM('' ''+b.nom_emp),c.des_ori,TA.des_tip,I.cod_plan_eje,ES.nom_plan_eje ';
		SET @cadena1 = @cadena1 + 'FROM	SST_TareasAsignadas AS a ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_EvaluaPlanAccion AS I ON RTRIM(A.llave) = RTRIM(I.cod_eva)+''*''+RTRIM(I.cod_cia)+''*''+RTRIM(CONVERT(CHAR,I.fec_eje,103)) ';
		SET @cadena1 = @cadena1 + '+''*''+RTRIM(I.cod_acc)+''*''+RTRIM(CONVERT(CHAR,I.cons_act)) ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_emplea AS b ON a.cod_resp = b.cod_emp ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_hislab AS H ON b.cod_emp = H.cod_emp AND H.num_sec = dbo.fn_rhh_HisLab_NumSec(b.cod_emp,a.fec_asig,0,0) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_EmpConv AS Ec ON b.cod_emp = Ec.cod_emp AND (H.fec_ini BETWEEN EC.fec_ini AND EC.fec_fin OR (H.fec_ini >= EC.fec_ini AND EC.fec_fin IS NULL)) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_Convenio AS CV ON Ec.cod_conv = CV.cod_conv AND CV.cod_cli LIKE ''' + RTRIM(@cod_cli) +'''';
		SET @cadena1 = @cadena1 + ' INNER JOIN SST_OrigenActividad AS c ON a.cod_ori = c.cod_ori ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_ProcTipAcc AS TA ON a.tip_acc = TA.tip_acc ';
		SET @cadena1 = @cadena1 + 'INNER JOIN GTH_AccIncPlanEje AS ES ON I.cod_plan_eje = ES.cod_plan_eje ';
		SET @cadena1 = @cadena1 + ' WHERE b.cod_suc LIKE ' + QUOTENAME(RTRIM(@cod_suc),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND I.cod_cia LIKE ' + QUOTENAME(RTRIM(@cod_cia),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND a.cod_ori IN (' + QUOTENAME('17',CHAR(39)) + ',' + QUOTENAME('18',CHAR(39)) + ')' + ' AND ES.cod_plan_eje LIKE ' + QUOTENAME(@EstAcc,CHAR(39))
		SET @cadena1 = @cadena1 + ' AND TA.tip_acc LIKE ' + QUOTENAME(RTRIM(@TipAcc),CHAR(39)) + ' AND a.cod_resp LIKE ' + QUOTENAME(RTRIM(@Responsable),CHAR(39));
		EXEC(@cadena1);
	
		SET @cadena1 = 'INSERT INTO #Tarea ';
		SET @cadena1 = @cadena1 + 'SELECT DISTINCT a.id,a.cod_act,a.des_act,a.detalle,a.tip_acc,a.fec_prog,a.cod_resp,a.cod_ori,'+
		'MAX(SP.fec_rev) OVER (PARTITION BY I.cons_ges,I.cod_cia,I.cod_acc,I.cons_act ORDER BY I.cons_ges,I.cod_cia,I.cod_acc,I.cons_act)'+
		',a.observacion,RTRIM(b.ap1_emp)+RTRIM('' ''+b.ap2_emp)+RTRIM('' ''+b.nom_emp),c.des_ori,TA.des_tip,I.cod_plan_eje,ES.nom_plan_eje ';
		SET @cadena1 = @cadena1 + 'FROM	SST_TareasAsignadas AS a ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_GestCambPlanAccion AS I ON RTRIM(A.llave) = RTRIM(I.cod_cia)+''*''+RTRIM(I.cons_ges)+''*''+ ';
		SET @cadena1 = @cadena1 + 'RTRIM(I.cod_acc)+''*''+RTRIM(CONVERT(CHAR,I.cons_act)) ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_emplea AS b ON a.cod_resp = b.cod_emp ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_hislab AS H ON b.cod_emp = H.cod_emp AND H.num_sec = dbo.fn_rhh_HisLab_NumSec(b.cod_emp,a.fec_asig,0,0) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_EmpConv AS Ec ON b.cod_emp = Ec.cod_emp AND (H.fec_ini BETWEEN EC.fec_ini AND EC.fec_fin OR (H.fec_ini >= EC.fec_ini AND EC.fec_fin IS NULL)) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_Convenio AS CV ON Ec.cod_conv = CV.cod_conv AND CV.cod_cli LIKE ''' + RTRIM(@cod_cli) +'''';
		SET @cadena1 = @cadena1 + ' INNER JOIN SST_OrigenActividad AS c ON a.cod_ori = c.cod_ori ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_ProcTipAcc AS TA ON a.tip_acc = TA.tip_acc ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN SST_SegGestCambPlanAccion AS SP ON I.cons_ges = SP.cons_ges AND I.cod_cia = SP.cod_cia AND I.cod_acc = SP.cod_acc AND I.cons_act = SP.cons_act '
		SET @cadena1 = @cadena1 + 'INNER JOIN GTH_AccIncPlanEje AS ES ON I.cod_plan_eje = ES.cod_plan_eje ';
		SET @cadena1 = @cadena1 + ' WHERE b.cod_suc LIKE ' + QUOTENAME(RTRIM(@cod_suc),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND I.cod_cia LIKE ' + QUOTENAME(RTRIM(@cod_cia),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND a.cod_ori = ' + QUOTENAME('07',CHAR(39)) + ' AND ES.cod_plan_eje LIKE ' + QUOTENAME(@EstAcc,CHAR(39))
		SET @cadena1 = @cadena1 + ' AND TA.tip_acc LIKE ' + QUOTENAME(RTRIM(@TipAcc),CHAR(39)) + ' AND a.cod_resp LIKE ' + QUOTENAME(RTRIM(@Responsable),CHAR(39));
		EXEC(@cadena1);
	
		SET @cadena1 = 'INSERT INTO #Tarea ';
		SET @cadena1 = @cadena1 + 'SELECT DISTINCT a.id,a.cod_act,a.des_act,a.detalle,a.tip_acc,a.fec_prog,a.cod_resp,a.cod_ori,'+
		'MAX(SP.fec_rev) OVER (PARTITION BY I.anio,I.version,I.cons,I.cod_cia,I.cod_acc,I.cons_act ORDER BY I.anio,I.version,I.cons,I.cod_cia,I.cod_acc,I.cons_act)'+
		',a.observacion,RTRIM(b.ap1_emp)+RTRIM('' ''+b.ap2_emp)+RTRIM('' ''+b.nom_emp),c.des_ori,TA.des_tip,I.cod_plan_eje,ES.nom_plan_eje ';
		SET @cadena1 = @cadena1 + 'FROM	SST_TareasAsignadas AS a ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_InspPlanAccion AS I ON RTRIM(A.llave) = RTRIM(I.cod_cia)+''*''+RTRIM(I.anio)+''*''+RTRIM(I.version)+''*''+RTRIM(CONVERT(CHAR,I.cons)) ';
		SET @cadena1 = @cadena1 + '+''*''+RTRIM(I.cod_acc)+''*''+RTRIM(CONVERT(CHAR,I.cons_act)) ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_emplea AS b ON a.cod_resp = b.cod_emp ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_hislab AS H ON b.cod_emp = H.cod_emp AND H.num_sec = dbo.fn_rhh_HisLab_NumSec(b.cod_emp,a.fec_asig,0,0) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_EmpConv AS Ec ON b.cod_emp = Ec.cod_emp AND (H.fec_ini BETWEEN EC.fec_ini AND EC.fec_fin OR (H.fec_ini >= EC.fec_ini AND EC.fec_fin IS NULL)) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_Convenio AS CV ON Ec.cod_conv = CV.cod_conv AND CV.cod_cli LIKE ''' + RTRIM(@cod_cli) +'''';
		SET @cadena1 = @cadena1 + ' INNER JOIN SST_OrigenActividad AS c ON a.cod_ori = c.cod_ori ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_ProcTipAcc AS TA ON a.tip_acc = TA.tip_acc ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN SST_SegInspPlanAccion AS SP ON I.anio = SP.anio AND I.version = SP.version AND I.cons = SP.cons AND I.cod_cia = SP.cod_cia AND I.cod_acc = SP.cod_acc AND I.cons_act = SP.cons_act '
		SET @cadena1 = @cadena1 + 'INNER JOIN GTH_AccIncPlanEje AS ES ON I.cod_plan_eje = ES.cod_plan_eje ';
		SET @cadena1 = @cadena1 + ' WHERE b.cod_suc LIKE ' + QUOTENAME(RTRIM(@cod_suc),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND I.cod_cia LIKE ' + QUOTENAME(RTRIM(@cod_cia),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND a.cod_ori = ' + QUOTENAME('08',CHAR(39)) + ' AND ES.cod_plan_eje LIKE ' + QUOTENAME(@EstAcc,CHAR(39))
		SET @cadena1 = @cadena1 + ' AND TA.tip_acc LIKE ' + QUOTENAME(RTRIM(@TipAcc),CHAR(39)) + ' AND a.cod_resp LIKE ' + QUOTENAME(RTRIM(@Responsable),CHAR(39));
		EXEC(@cadena1);
	
		SET @cadena1 = 'INSERT INTO #Tarea ';
		SET @cadena1 = @cadena1 + 'SELECT DISTINCT a.id,a.cod_act,a.des_act,a.detalle,a.tip_acc,a.fec_prog,a.cod_resp,a.cod_ori,'+
		'MAX(SP.fec_rev) OVER (PARTITION BY I.cod_alta_gerencia,I.cons_acta,I.cod_act_altagerencia,I.cod_cia,I.cod_acc_altger,I.cons_act ORDER BY I.cod_alta_gerencia,I.cons_acta,I.cod_act_altagerencia,I.cod_cia,I.cod_acc_altger,I.cons_act)'+
		',a.observacion,RTRIM(b.ap1_emp)+RTRIM('' ''+b.ap2_emp)+RTRIM('' ''+b.nom_emp),c.des_ori,TA.des_tip,I.cod_plan_eje,ES.nom_plan_eje ';
		SET @cadena1 = @cadena1 + 'FROM	SST_TareasAsignadas AS a ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_PlanAccionAltGer AS I ON RTRIM(A.llave) = RTRIM(I.cod_cia)+''*''+RTRIM(I.cod_alta_gerencia)+''*''+RTRIM(I.cons_acta)+''*''+ ';
		SET @cadena1 = @cadena1 + 'RTRIM(I.cod_act_altagerencia)+''*''+RTRIM(I.cod_acc_altger)+''*''+RTRIM(CONVERT(CHAR,I.cons_act)) ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_AltaGerencia AS AD ON I.cod_cia = AD.cod_cia AND I.cod_alta_gerencia = AD.cod_alta_gerencia ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_emplea AS b ON a.cod_resp = b.cod_emp ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_hislab AS H ON b.cod_emp = H.cod_emp AND H.num_sec = dbo.fn_rhh_HisLab_NumSec(b.cod_emp,a.fec_asig,0,0) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_EmpConv AS Ec ON b.cod_emp = Ec.cod_emp AND (H.fec_ini BETWEEN EC.fec_ini AND EC.fec_fin OR (H.fec_ini >= EC.fec_ini AND EC.fec_fin IS NULL)) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_Convenio AS CV ON Ec.cod_conv = CV.cod_conv AND CV.cod_cli LIKE ''' + RTRIM(@cod_cli) +'''';
		SET @cadena1 = @cadena1 + ' INNER JOIN SST_OrigenActividad AS c ON a.cod_ori = c.cod_ori ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_ProcTipAcc AS TA ON a.tip_acc = TA.tip_acc ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN SST_SegAltaGerPlanAccion AS SP ON I.cod_alta_gerencia = SP.cod_alta_gerencia AND I.cons_acta = SP.cons_acta AND I.cod_act_altagerencia = SP.cod_act_altagerencia AND I.cod_cia = SP.cod_cia AND I.cod_acc_altger = SP.cod_acc_altger AND I.cons_act = SP.cons_act '
		SET @cadena1 = @cadena1 + 'INNER JOIN GTH_AccIncPlanEje AS ES ON I.cod_plan_eje = ES.cod_plan_eje ';
		SET @cadena1 = @cadena1 + ' WHERE AD.cod_suc LIKE ' +  QUOTENAME(RTRIM(@cod_suc),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND I.cod_cia LIKE ' + QUOTENAME(RTRIM(@cod_cia),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND a.cod_ori = ' + QUOTENAME('01',CHAR(39)) + ' AND ES.cod_plan_eje LIKE ' + QUOTENAME(@EstAcc,CHAR(39))
		SET @cadena1 = @cadena1 + ' AND TA.tip_acc LIKE ' + QUOTENAME(RTRIM(@TipAcc),CHAR(39)) + ' AND a.cod_resp LIKE ' + QUOTENAME(RTRIM(@Responsable),CHAR(39));
		EXEC(@cadena1);
	
		SET @cadena1 = 'INSERT INTO #Tarea ';
		SET @cadena1 = @cadena1 + 'SELECT DISTINCT a.id,a.cod_act,a.des_act,a.detalle,a.tip_acc,a.fec_prog,a.cod_resp,a.cod_ori,'+
		'MAX(SP.fec_rev) OVER (PARTITION BY I.cod_cia,I.conse,I.cod_sede,I.cod_tipo,I.numeral,I.cod_acc_audi,I.cons_act ORDER BY I.cod_cia,I.conse,I.cod_sede,I.cod_tipo,I.numeral,I.cod_acc_audi,I.cons_act)'+
		',a.observacion,RTRIM(b.ap1_emp)+RTRIM('' ''+b.ap2_emp)+RTRIM('' ''+b.nom_emp),c.des_ori,TA.des_tip,I.cod_plan_eje,ES.nom_plan_eje ';
		SET @cadena1 = @cadena1 + 'FROM	SST_TareasAsignadas AS a ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_PlanAccionAudi AS I ON RTRIM(A.llave) = RTRIM(I.cod_cia)+''*''+RTRIM(CONVERT(CHAR,I.conse))+''*''+RTRIM(I.cod_sede)+''*'' ';
		SET @cadena1 = @cadena1 + '+RTRIM(CONVERT(CHAR,I.cod_tipo))+''*''+RTRIM(CONVERT(CHAR,I.numeral))+''*''+RTRIM(I.cod_acc_audi)+''*''+RTRIM(CONVERT(CHAR,I.cons_act)) ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_emplea AS b ON a.cod_resp = b.cod_emp ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_hislab AS H ON b.cod_emp = H.cod_emp AND H.num_sec = dbo.fn_rhh_HisLab_NumSec(b.cod_emp,a.fec_asig,0,0) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_EmpConv AS Ec ON b.cod_emp = Ec.cod_emp AND (H.fec_ini BETWEEN EC.fec_ini AND EC.fec_fin OR (H.fec_ini >= EC.fec_ini AND EC.fec_fin IS NULL)) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_Convenio AS CV ON Ec.cod_conv = CV.cod_conv AND CV.cod_cli LIKE ''' + RTRIM(@cod_cli) +'''';
		SET @cadena1 = @cadena1 + ' INNER JOIN SST_OrigenActividad AS c ON a.cod_ori = c.cod_ori ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_ProcTipAcc AS TA ON a.tip_acc = TA.tip_acc ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN SST_SegPlanAccionAudi AS SP ON I.cod_cia = SP.cod_cia AND I.conse = SP.conse AND I.cod_sede = SP.cod_sede AND I.cod_tipo = SP.cod_tipo AND I.numeral = SP.numeral AND I.cod_acc_audi = SP.cod_acc_audi AND I.cons_act = SP.cons_act '
		SET @cadena1 = @cadena1 + 'INNER JOIN GTH_AccIncPlanEje AS ES ON I.cod_plan_eje = ES.cod_plan_eje ';
		SET @cadena1 = @cadena1 + ' WHERE b.cod_suc LIKE ' + QUOTENAME(RTRIM(@cod_suc),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND I.cod_cia LIKE ' + QUOTENAME(RTRIM(@cod_cia),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND a.cod_ori = ' + QUOTENAME('09',CHAR(39)) + ' AND ES.cod_plan_eje LIKE ' + QUOTENAME(@EstAcc,CHAR(39))
		SET @cadena1 = @cadena1 + ' AND TA.tip_acc LIKE ' + QUOTENAME(RTRIM(@TipAcc),CHAR(39)) + ' AND a.cod_resp LIKE ' + QUOTENAME(RTRIM(@Responsable),CHAR(39));
		EXEC(@cadena1);

		SET @cadena1 = 'INSERT INTO #Tarea ';
		SET @cadena1 = @cadena1 + 'SELECT DISTINCT a.id,a.cod_act,a.des_act,a.detalle,a.tip_acc,a.fec_prog,a.cod_resp,a.cod_ori,'+
		'MAX(SP.fec_rev) OVER (PARTITION BY I.cod_brigada,I.cons_acta,I.cod_act_brig,I.cod_cia,I.cod_acc_brig,I.cons_act ORDER BY I.cod_brigada,I.cons_acta,I.cod_act_brig,I.cod_cia,I.cod_acc_brig,I.cons_act)'+
		',a.observacion,RTRIM(b.ap1_emp)+RTRIM('' ''+b.ap2_emp)+RTRIM('' ''+b.nom_emp),c.des_ori,TA.des_tip,I.cod_plan_eje,ES.nom_plan_eje ';
		SET @cadena1 = @cadena1 + 'FROM	SST_TareasAsignadas AS a ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_PlanAccionBrigada AS I ON RTRIM(A.llave) = RTRIM(I.cod_cia)+''*''+RTRIM(CONVERT(CHAR,I.cod_brigada))+''*''+RTRIM(I.cons_acta)+''*'' ';
		SET @cadena1 = @cadena1 + '+RTRIM(I.cod_act_brig)+''*''+RTRIM(I.cod_acc_brig)+''*''+RTRIM(CONVERT(CHAR,I.cons_act)) ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_Brigada AS BE ON I.cod_cia = BE.cod_cia AND I.cod_brigada = BE.cod_brigada ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_emplea AS b ON a.cod_resp = b.cod_emp ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_hislab AS H ON b.cod_emp = H.cod_emp AND H.num_sec = dbo.fn_rhh_HisLab_NumSec(b.cod_emp,a.fec_asig,0,0) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_EmpConv AS Ec ON b.cod_emp = Ec.cod_emp AND (H.fec_ini BETWEEN EC.fec_ini AND EC.fec_fin OR (H.fec_ini >= EC.fec_ini AND EC.fec_fin IS NULL)) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_Convenio AS CV ON Ec.cod_conv = CV.cod_conv AND CV.cod_cli LIKE ''' + RTRIM(@cod_cli) +'''';
		SET @cadena1 = @cadena1 + ' INNER JOIN SST_OrigenActividad AS c ON a.cod_ori = c.cod_ori ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_ProcTipAcc AS TA ON a.tip_acc = TA.tip_acc ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN SST_SegPlanAccionBrigada AS SP ON I.cod_brigada = SP.cod_brigada AND I.cons_acta = SP.cons_acta AND I.cod_act_brig = SP.cod_act_brig AND I.cod_cia = SP.cod_cia AND I.cod_acc_brig = SP.cod_acc AND I.cons_act = SP.cons_act '
		SET @cadena1 = @cadena1 + 'INNER JOIN GTH_AccIncPlanEje AS ES ON I.cod_plan_eje = ES.cod_plan_eje ';
		SET @cadena1 = @cadena1 + ' WHERE BE.cod_suc LIKE ' + QUOTENAME(RTRIM(@cod_suc),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND I.cod_cia LIKE ' + QUOTENAME(RTRIM(@cod_cia),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND a.cod_ori = ' + QUOTENAME('03',CHAR(39)) + ' AND ES.cod_plan_eje LIKE ' + QUOTENAME(@EstAcc,CHAR(39))
		SET @cadena1 = @cadena1 + ' AND TA.tip_acc LIKE ' + QUOTENAME(RTRIM(@TipAcc),CHAR(39)) + ' AND a.cod_resp LIKE ' + QUOTENAME(RTRIM(@Responsable),CHAR(39));
		EXEC(@cadena1);
	
		SET @cadena1 = 'INSERT INTO #Tarea ';
		SET @cadena1 = @cadena1 + 'SELECT DISTINCT a.id,a.cod_act,a.des_act,a.detalle,a.tip_acc,a.fec_prog,a.cod_resp,a.cod_ori,'+
		'MAX(SP.fec_rev) OVER (PARTITION BY I.cod_comite,I.cons_acta,I.cod_act_comite,I.cod_acc_comite,I.cod_cia,I.cons_act ORDER BY I.cod_comite,I.cons_acta,I.cod_act_comite,I.cod_acc_comite,I.cod_cia,I.cons_act)'+
		',a.observacion,RTRIM(b.ap1_emp)+RTRIM('' ''+b.ap2_emp)+RTRIM('' ''+b.nom_emp),c.des_ori,TA.des_tip,I.cod_plan_eje,ES.nom_plan_eje ';
		SET @cadena1 = @cadena1 + 'FROM	SST_TareasAsignadas AS a ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_PlanAccionComiteConv AS I ON RTRIM(A.llave) = RTRIM(I.cod_cia)+''*''+RTRIM(I.cod_comite)+''*''+RTRIM(I.cons_acta)+''*''+ ';
		SET @cadena1 = @cadena1 + 'RTRIM(I.cod_act_comite)+''*''+RTRIM(I.cod_acc_comite)+''*''+RTRIM(CONVERT(CHAR,I.cons_act)) ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_ComiteConv AS CC ON I.cod_cia = CC.cod_cia AND I.cod_comite = CC.cod_comite ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_emplea AS b ON a.cod_resp = b.cod_emp ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_hislab AS H ON b.cod_emp = H.cod_emp AND H.num_sec = dbo.fn_rhh_HisLab_NumSec(b.cod_emp,a.fec_asig,0,0) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_EmpConv AS Ec ON b.cod_emp = Ec.cod_emp AND (H.fec_ini BETWEEN EC.fec_ini AND EC.fec_fin OR (H.fec_ini >= EC.fec_ini AND EC.fec_fin IS NULL)) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_Convenio AS CV ON Ec.cod_conv = CV.cod_conv AND CV.cod_cli LIKE ''' + RTRIM(@cod_cli) +'''';
		SET @cadena1 = @cadena1 + ' INNER JOIN SST_OrigenActividad AS c ON a.cod_ori = c.cod_ori ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_ProcTipAcc AS TA ON a.tip_acc = TA.tip_acc ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN SST_SegPlanAccionComiteConv AS SP ON I.cod_comite = SP.cod_comite AND I.cons_acta = SP.cons_acta AND I.cod_act_comite = SP.cod_act_comite AND I.cod_acc_comite = SP.cod_acc_comite AND I.cod_cia = SP.cod_cia AND I.cons_act = SP.cons_act '
		SET @cadena1 = @cadena1 + 'INNER JOIN GTH_AccIncPlanEje AS ES ON I.cod_plan_eje = ES.cod_plan_eje ';
		SET @cadena1 = @cadena1 + ' WHERE CC.cod_suc LIKE ' + QUOTENAME(RTRIM(@cod_suc),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND I.cod_cia LIKE ' + QUOTENAME(RTRIM(@cod_cia),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND a.cod_ori = ' + QUOTENAME('04',CHAR(39)) + ' AND ES.cod_plan_eje LIKE ' + QUOTENAME(@EstAcc,CHAR(39))
		SET @cadena1 = @cadena1 + ' AND TA.tip_acc LIKE ' + QUOTENAME(RTRIM(@TipAcc),CHAR(39)) + ' AND a.cod_resp LIKE ' + QUOTENAME(RTRIM(@Responsable),CHAR(39));
		EXEC(@cadena1);
	
		SET @cadena1 = 'INSERT INTO #Tarea ';
		SET @cadena1 = @cadena1 + 'SELECT DISTINCT a.id,a.cod_act,a.des_act,a.detalle,a.tip_acc,a.fec_prog,a.cod_resp,a.cod_ori,'+
		'MAX(SP.fec_rev) OVER (PARTITION BY I.cod_comite_sv,I.cons_acta,I.cod_act_comite_sv,I.cod_acc_comite_sv,I.cod_cia,I.cons_act ORDER BY I.cod_comite_sv,I.cons_acta,I.cod_act_comite_sv,I.cod_acc_comite_sv,I.cod_cia,I.cons_act)'+
		',a.observacion,RTRIM(b.ap1_emp)+RTRIM('' ''+b.ap2_emp)+RTRIM('' ''+b.nom_emp),c.des_ori,TA.des_tip,I.cod_plan_eje,ES.nom_plan_eje ';
		SET @cadena1 = @cadena1 + 'FROM	SST_TareasAsignadas AS a ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_PlanAccionComiteSV AS I ON RTRIM(A.llave) = RTRIM(I.cod_cia)+''*''+RTRIM(I.cod_comite_sv)+''*''+RTRIM(I.cons_acta)+''*''+RTRIM(I.cod_act_comite_sv) ';
		SET @cadena1 = @cadena1 + '+''*''+RTRIM(I.cod_acc_comite_sv)+''*''+RTRIM(CONVERT(CHAR,I.cons_act)) ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_ComiteSegVial AS CS ON I.cod_cia = CS.cod_cia AND I.cod_comite_sv = CS.cod_comite_sv ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_emplea AS b ON a.cod_resp = b.cod_emp ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_hislab AS H ON b.cod_emp = H.cod_emp AND H.num_sec = dbo.fn_rhh_HisLab_NumSec(b.cod_emp,a.fec_asig,0,0) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_EmpConv AS Ec ON b.cod_emp = Ec.cod_emp AND (H.fec_ini BETWEEN EC.fec_ini AND EC.fec_fin OR (H.fec_ini >= EC.fec_ini AND EC.fec_fin IS NULL)) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_Convenio AS CV ON Ec.cod_conv = CV.cod_conv AND CV.cod_cli LIKE ''' + RTRIM(@cod_cli) +'''';
		SET @cadena1 = @cadena1 + ' INNER JOIN SST_OrigenActividad AS c ON a.cod_ori = c.cod_ori ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_ProcTipAcc AS TA ON a.tip_acc = TA.tip_acc ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN SST_SegPlanAccionComiteSV AS SP ON I.cod_comite_sv = SP.cod_comite_sv AND I.cons_acta = SP.cons_acta AND I.cod_act_comite_sv = SP.cod_act_comite_sv AND I.cod_acc_comite_sv = SP.cod_acc_comite_sv AND I.cod_cia = SP.cod_cia AND I.cons_act = SP.cons_act '
		SET @cadena1 = @cadena1 + 'INNER JOIN GTH_AccIncPlanEje AS ES ON I.cod_plan_eje = ES.cod_plan_eje ';
		SET @cadena1 = @cadena1 + ' WHERE CS.cod_suc LIKE ' + QUOTENAME(RTRIM(@cod_suc),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND I.cod_cia LIKE ' + QUOTENAME(RTRIM(@cod_cia),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND a.cod_ori = ' + QUOTENAME('05',CHAR(39)) + ' AND ES.cod_plan_eje LIKE ' + QUOTENAME(@EstAcc,CHAR(39))
		SET @cadena1 = @cadena1 + ' AND TA.tip_acc LIKE ' + QUOTENAME(RTRIM(@TipAcc),CHAR(39)) + ' AND a.cod_resp LIKE ' + QUOTENAME(RTRIM(@Responsable),CHAR(39));
		EXEC(@cadena1);
	
		SET @cadena1 = 'INSERT INTO #Tarea ';
		SET @cadena1 = @cadena1 + 'SELECT DISTINCT a.id,a.cod_act,a.des_act,a.detalle,a.tip_acc,a.fec_prog,a.cod_resp,a.cod_ori,'+
		'MAX(SP.fec_rev) OVER (PARTITION BY I.cod_cia,I.cod_plan_emerg,I.Cod_ClasPlanEme,I.cons_eje,I.cod_acc_eme,I.cons_act ORDER BY I.cod_cia,I.cod_plan_emerg,I.Cod_ClasPlanEme,I.cons_eje,I.cod_acc_eme,I.cons_act)'+
		',a.observacion,RTRIM(b.ap1_emp)+RTRIM('' ''+b.ap2_emp)+RTRIM('' ''+b.nom_emp),c.des_ori,TA.des_tip,I.cod_plan_eje,ES.nom_plan_eje ';
		SET @cadena1 = @cadena1 + 'FROM	SST_TareasAsignadas AS a ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_PlanAccionPlanEme AS I ON RTRIM(A.llave) = RTRIM(I.cod_cia)+''*''+RTRIM(I.cod_plan_emerg)+''*''+RTRIM(I.Cod_ClasPlanEme)+''*''+ ';
		SET @cadena1 = @cadena1 + 'RTRIM(CONVERT(CHAR,I.cons_eje))+''*''+RTRIM(I.cod_acc_eme)+''*''+RTRIM(CONVERT(CHAR,I.cons_act)) ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_emplea AS b ON a.cod_resp = b.cod_emp ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_hislab AS H ON b.cod_emp = H.cod_emp AND H.num_sec = dbo.fn_rhh_HisLab_NumSec(b.cod_emp,a.fec_asig,0,0) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_EmpConv AS Ec ON b.cod_emp = Ec.cod_emp AND (H.fec_ini BETWEEN EC.fec_ini AND EC.fec_fin OR (H.fec_ini >= EC.fec_ini AND EC.fec_fin IS NULL)) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_Convenio AS CV ON Ec.cod_conv = CV.cod_conv AND CV.cod_cli LIKE ''' + RTRIM(@cod_cli) +'''';
		SET @cadena1 = @cadena1 + ' INNER JOIN SST_OrigenActividad AS c ON a.cod_ori = c.cod_ori ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_ProcTipAcc AS TA ON a.tip_acc = TA.tip_acc ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN SST_SegPlanAccionPlanEme AS SP ON I.cod_cia = SP.cod_cia AND I.cod_plan_emerg = SP.cod_plan_emerg AND I.Cod_ClasPlanEme = SP.Cod_ClasPlanEme AND I.cons_eje = SP.cons_eje AND I.cod_acc_eme = SP.cod_acc_eme AND I.cons_act = SP.cons_act '
		SET @cadena1 = @cadena1 + 'INNER JOIN GTH_AccIncPlanEje AS ES ON I.cod_plan_eje = ES.cod_plan_eje ';
		SET @cadena1 = @cadena1 + ' WHERE b.cod_suc LIKE ' + QUOTENAME(RTRIM(@cod_suc),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND I.cod_cia LIKE ' + QUOTENAME(RTRIM(@cod_cia),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND a.cod_ori = ' + QUOTENAME('10',CHAR(39)) + ' AND ES.cod_plan_eje LIKE ' + QUOTENAME(@EstAcc,CHAR(39))
		SET @cadena1 = @cadena1 + ' AND TA.tip_acc LIKE ' + QUOTENAME(RTRIM(@TipAcc),CHAR(39)) + ' AND a.cod_resp LIKE ' + QUOTENAME(RTRIM(@Responsable),CHAR(39));
		EXEC(@cadena1);
	
		SET @cadena1 = 'INSERT INTO #Tarea ';
		SET @cadena1 = @cadena1 + 'SELECT DISTINCT a.id,a.cod_act,a.des_act,a.detalle,a.tip_acc,a.fec_prog,a.cod_resp,a.cod_ori,a.fec_eje,a.observacion,RTRIM(b.ap1_emp)+RTRIM('' ''+b.ap2_emp)+RTRIM('' ''+b.nom_emp),c.des_ori,TA.des_tip,I.cod_plan_eje,ES.nom_plan_eje ';
		SET @cadena1 = @cadena1 + 'FROM	SST_TareasAsignadas AS a ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_ProcPlanAccion AS I ON RTRIM(A.llave) = RTRIM(I.cod_cia)+''*''+RTRIM(CONVERT(CHAR,I.cod_proc))+''*''+RTRIM(CONVERT(CHAR,I.fecha,103))+''*''+ ';
		SET @cadena1 = @cadena1 + 'RTRIM(CONVERT(CHAR,I.cons))+''*''+RTRIM(I.cod_acc)+''*''+RTRIM(I.tip_doc) ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_emplea AS b ON a.cod_resp = b.cod_emp ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_hislab AS H ON b.cod_emp = H.cod_emp AND H.num_sec = dbo.fn_rhh_HisLab_NumSec(b.cod_emp,a.fec_asig,0,0) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_EmpConv AS Ec ON b.cod_emp = Ec.cod_emp AND (H.fec_ini BETWEEN EC.fec_ini AND EC.fec_fin OR (H.fec_ini >= EC.fec_ini AND EC.fec_fin IS NULL)) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_Convenio AS CV ON Ec.cod_conv = CV.cod_conv AND CV.cod_cli LIKE ''' + RTRIM(@cod_cli) +'''';
		SET @cadena1 = @cadena1 + ' INNER JOIN SST_OrigenActividad AS c ON a.cod_ori = c.cod_ori ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_ProcTipAcc AS TA ON a.tip_acc = TA.tip_acc ';
		SET @cadena1 = @cadena1 + 'INNER JOIN GTH_AccIncPlanEje AS ES ON I.cod_plan_eje = ES.cod_plan_eje ';
		SET @cadena1 = @cadena1 + ' WHERE b.cod_suc LIKE ' + QUOTENAME(RTRIM(@cod_suc),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND I.cod_cia LIKE ' + QUOTENAME(RTRIM(@cod_cia),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND a.cod_ori = ' + QUOTENAME('11',CHAR(39)) + ' AND ES.cod_plan_eje LIKE ' + QUOTENAME(@EstAcc,CHAR(39))
		SET @cadena1 = @cadena1 + ' AND TA.tip_acc LIKE ' + QUOTENAME(RTRIM(@TipAcc),CHAR(39)) + ' AND a.cod_resp LIKE ' + QUOTENAME(RTRIM(@Responsable),CHAR(39));
		EXEC(@cadena1);
	
		SET @cadena1 = 'INSERT INTO #Tarea ';
		SET @cadena1 = @cadena1 + 'SELECT DISTINCT a.id,a.cod_act,a.des_act,a.detalle,a.tip_acc,a.fec_prog,a.cod_resp,a.cod_ori,'+
		'MAX(SP.fec_rev) OVER (PARTITION BY I.cons,I.cod_ent,I.cod_acc,I.cod_cia,I.cons_act ORDER BY I.cons,I.cod_ent,I.cod_acc,I.cod_cia,I.cons_act)'+
		',a.observacion,RTRIM(b.ap1_emp)+RTRIM('' ''+b.ap2_emp)+RTRIM('' ''+b.nom_emp),c.des_ori,TA.des_tip,I.cod_plan_eje,ES.nom_plan_eje ';
		SET @cadena1 = @cadena1 + 'FROM	SST_TareasAsignadas AS a ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_RevAltaDirPlanAccion AS I ON RTRIM(A.llave) = RTRIM(I.cod_cia)+''*''+RTRIM(CONVERT(CHAR,I.cons))+''*''+RTRIM(I.cod_ent) ';
		SET @cadena1 = @cadena1 + '+''*''+RTRIM(I.cod_acc)+''*''+RTRIM(CONVERT(CHAR,I.cons_act)) ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_emplea AS b ON a.cod_resp = b.cod_emp ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_hislab AS H ON b.cod_emp = H.cod_emp AND H.num_sec = dbo.fn_rhh_HisLab_NumSec(b.cod_emp,a.fec_asig,0,0) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_EmpConv AS Ec ON b.cod_emp = Ec.cod_emp AND (H.fec_ini BETWEEN EC.fec_ini AND EC.fec_fin OR (H.fec_ini >= EC.fec_ini AND EC.fec_fin IS NULL)) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_Convenio AS CV ON Ec.cod_conv = CV.cod_conv AND CV.cod_cli LIKE ''' + RTRIM(@cod_cli) +'''';
		SET @cadena1 = @cadena1 + ' INNER JOIN SST_OrigenActividad AS c ON a.cod_ori = c.cod_ori ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_ProcTipAcc AS TA ON a.tip_acc = TA.tip_acc ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN SST_SegRevAltaDirPlanAccion AS SP ON I.cons = SP.cons AND I.cod_ent = SP.cod_ent AND I.cod_acc = SP.cod_acc AND I.cod_cia = SP.cod_cia AND I.cons_act = SP.cons_act '
		SET @cadena1 = @cadena1 + 'INNER JOIN GTH_AccIncPlanEje AS ES ON I.cod_plan_eje = ES.cod_plan_eje ';
		SET @cadena1 = @cadena1 + ' WHERE b.cod_suc LIKE ' + QUOTENAME(RTRIM(@cod_suc),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND I.cod_cia LIKE ' + QUOTENAME(RTRIM(@cod_cia),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND a.cod_ori = ' + QUOTENAME('12',CHAR(39)) + ' AND ES.cod_plan_eje LIKE ' + QUOTENAME(@EstAcc,CHAR(39))
		SET @cadena1 = @cadena1 + ' AND TA.tip_acc LIKE ' + QUOTENAME(RTRIM(@TipAcc),CHAR(39)) + ' AND a.cod_resp LIKE ' + QUOTENAME(RTRIM(@Responsable),CHAR(39));
		EXEC(@cadena1);
	
		SET @cadena1 = 'INSERT INTO #Tarea ';
		SET @cadena1 = @cadena1 + 'SELECT DISTINCT a.id,a.cod_act,a.des_act,a.detalle,a.tip_acc,a.fec_prog,a.cod_resp,a.cod_ori,'+
		'MAX(SP.fec_rev) OVER (PARTITION BY I.cod_riepsico,I.cod_cia,I.cod_acc,I.cons_act ORDER BY I.cod_riepsico,I.cod_cia,I.cod_acc,I.cons_act)'+
		',a.observacion,RTRIM(b.ap1_emp)+RTRIM('' ''+b.ap2_emp)+RTRIM('' ''+b.nom_emp),c.des_ori,TA.des_tip,I.cod_plan_eje,ES.nom_plan_eje ';
		SET @cadena1 = @cadena1 + 'FROM	SST_TareasAsignadas AS a ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_RiesgoPsicosocPlanAccion AS I ON RTRIM(A.llave) = RTRIM(I.cod_cia)+''*''+RTRIM(I.cod_riepsico)+''*''+ ';
		SET @cadena1 = @cadena1 + 'RTRIM(I.cod_acc)+''*''+RTRIM(CONVERT(CHAR,I.cons_act)) ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_emplea AS b ON a.cod_resp = b.cod_emp ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_hislab AS H ON b.cod_emp = H.cod_emp AND H.num_sec = dbo.fn_rhh_HisLab_NumSec(b.cod_emp,a.fec_asig,0,0) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_EmpConv AS Ec ON b.cod_emp = Ec.cod_emp AND (H.fec_ini BETWEEN EC.fec_ini AND EC.fec_fin OR (H.fec_ini >= EC.fec_ini AND EC.fec_fin IS NULL)) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_Convenio AS CV ON Ec.cod_conv = CV.cod_conv AND CV.cod_cli LIKE ''' + RTRIM(@cod_cli) +'''';
		SET @cadena1 = @cadena1 + ' INNER JOIN SST_OrigenActividad AS c ON a.cod_ori = c.cod_ori ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_ProcTipAcc AS TA ON a.tip_acc = TA.tip_acc ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN SST_SegRiesgoPsicosocPlanAccion AS SP ON I.cod_riepsico = SP.cod_riepsico AND I.cod_cia = SP.cod_cia AND I.cod_acc = SP.cod_acc AND I.cons_act = SP.cons_act '
		SET @cadena1 = @cadena1 + 'INNER JOIN GTH_AccIncPlanEje AS ES ON I.cod_plan_eje = ES.cod_plan_eje ';
		SET @cadena1 = @cadena1 + ' WHERE b.cod_suc LIKE ' + QUOTENAME(RTRIM(@cod_suc),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND I.cod_cia LIKE ' + QUOTENAME(RTRIM(@cod_cia),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND a.cod_ori = ' + QUOTENAME('13',CHAR(39)) + ' AND ES.cod_plan_eje LIKE ' + QUOTENAME(@EstAcc,CHAR(39))
		SET @cadena1 = @cadena1 + ' AND TA.tip_acc LIKE ' + QUOTENAME(RTRIM(@TipAcc),CHAR(39)) + ' AND a.cod_resp LIKE ' + QUOTENAME(RTRIM(@Responsable),CHAR(39));
		EXEC(@cadena1);
	
		SET @cadena1 = 'INSERT INTO #Tarea ';
		SET @cadena1 = @cadena1 + 'SELECT DISTINCT a.id,a.cod_act,a.des_act,a.detalle,a.tip_acc,a.fec_prog,a.cod_resp,a.cod_ori,'+
		'MAX(SP.fec_rev) OVER (PARTITION BY I.cod_emp,I.cod_acc,I.cons_doc,I.tip_cla,I.cons_act ORDER BY I.cod_emp,I.cod_acc,I.cons_doc,I.tip_cla,I.cons_act)'+
		',a.observacion,RTRIM(b.ap1_emp)+RTRIM('' ''+b.ap2_emp)+RTRIM('' ''+b.nom_emp),c.des_ori,TA.des_tip,I.ind_eje,ES.nom_plan_eje ';
		SET @cadena1 = @cadena1 + 'FROM	SST_TareasAsignadas AS a ';
		SET @cadena1 = @cadena1 + 'INNER JOIN GTH_Acc_Acciones AS I ON RTRIM(A.llave) = RTRIM(I.cod_emp)+''*''+RTRIM(CONVERT(CHAR,I.cod_acc))+''*''+RTRIM(CONVERT(CHAR,I.cons_doc)) ';
		SET @cadena1 = @cadena1 + '+''*''+RTRIM(I.tip_cla)+''*''+RTRIM(CONVERT(CHAR,I.cons_act)) ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_emplea AS b ON a.cod_resp = b.cod_emp ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_hislab AS H ON b.cod_emp = H.cod_emp AND H.num_sec = dbo.fn_rhh_HisLab_NumSec(b.cod_emp,a.fec_asig,0,0) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_EmpConv AS Ec ON b.cod_emp = Ec.cod_emp AND (H.fec_ini BETWEEN EC.fec_ini AND EC.fec_fin OR (H.fec_ini >= EC.fec_ini AND EC.fec_fin IS NULL)) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_Convenio AS CV ON Ec.cod_conv = CV.cod_conv AND CV.cod_cli LIKE ''' + RTRIM(@cod_cli) +'''';
		SET @cadena1 = @cadena1 + ' INNER JOIN SST_OrigenActividad AS c ON a.cod_ori = c.cod_ori ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_ProcTipAcc AS TA ON a.tip_acc = TA.tip_acc ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN GTH_SegAccAcciones AS SP ON I.cod_emp = SP.cod_emp AND I.cod_acc = SP.cod_acc AND I.cons_doc = SP.cons_doc AND I.tip_cla = SP.tip_cla AND I.cons_act = SP.cons_act '
		SET @cadena1 = @cadena1 + 'INNER JOIN GTH_AccIncPlanEje AS ES ON I.ind_eje = ES.cod_plan_eje ';
		SET @cadena1 = @cadena1 + ' WHERE b.cod_suc LIKE ' + QUOTENAME(RTRIM(@cod_suc),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND b.cod_cia LIKE ' + QUOTENAME(RTRIM(@cod_cia),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND a.cod_ori = ' + QUOTENAME('14',CHAR(39)) + ' AND ES.cod_plan_eje LIKE ' + QUOTENAME(@EstAcc,CHAR(39))
		SET @cadena1 = @cadena1 + ' AND TA.tip_acc LIKE ' + QUOTENAME(RTRIM(@TipAcc),CHAR(39)) + ' AND a.cod_resp LIKE ' + QUOTENAME(RTRIM(@Responsable),CHAR(39));
		EXEC(@cadena1);
	
		SET @cadena1 = 'INSERT INTO #Tarea ';
		SET @cadena1 = @cadena1 + 'SELECT DISTINCT a.id,a.cod_act,a.des_act,a.detalle,a.tip_acc,a.fec_prog,a.cod_resp,a.cod_ori,'+
		'MAX(SP.fec_rev) OVER (PARTITION BY I.cod_emp,I.cod_inc,I.cons_doc,I.tip_cla,I.cons_act ORDER BY I.cod_emp,I.cod_inc,I.cons_doc,I.tip_cla,I.cons_act)'+
		',a.observacion,RTRIM(b.ap1_emp)+RTRIM('' ''+b.ap2_emp)+RTRIM('' ''+b.nom_emp),c.des_ori,TA.des_tip,I.ind_eje,ES.nom_plan_eje ';
		SET @cadena1 = @cadena1 + 'FROM	SST_TareasAsignadas AS a ';
		SET @cadena1 = @cadena1 + 'INNER JOIN GTH_Incid_Acciones AS I ON RTRIM(A.llave) = RTRIM(I.cod_emp)+''*''+RTRIM(CONVERT(CHAR,I.cod_inc))+''*''+RTRIM(CONVERT(CHAR,I.cons_doc)) ';
		SET @cadena1 = @cadena1 + '+''*''+RTRIM(I.tip_cla)+''*''+RTRIM(CONVERT(CHAR,I.cons_act)) ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_emplea AS b ON a.cod_resp = b.cod_emp ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_hislab AS H ON b.cod_emp = H.cod_emp AND H.num_sec = dbo.fn_rhh_HisLab_NumSec(b.cod_emp,a.fec_asig,0,0) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_EmpConv AS Ec ON b.cod_emp = Ec.cod_emp AND (H.fec_ini BETWEEN EC.fec_ini AND EC.fec_fin OR (H.fec_ini >= EC.fec_ini AND EC.fec_fin IS NULL)) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_Convenio AS CV ON Ec.cod_conv = CV.cod_conv AND CV.cod_cli LIKE ''' + RTRIM(@cod_cli) +'''';
		SET @cadena1 = @cadena1 + ' INNER JOIN SST_OrigenActividad AS c ON a.cod_ori = c.cod_ori ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_ProcTipAcc AS TA ON a.tip_acc = TA.tip_acc ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN GTH_SegIncidAcciones AS SP ON I.cod_emp = SP.cod_emp AND I.cod_inc = SP.cod_inc AND I.cons_doc = SP.cons_doc AND I.tip_cla = SP.tip_cla AND I.cons_act = SP.cons_act '
		SET @cadena1 = @cadena1 + 'INNER JOIN GTH_AccIncPlanEje AS ES ON I.ind_eje = ES.cod_plan_eje ';
		SET @cadena1 = @cadena1 + ' WHERE b.cod_suc LIKE ' + QUOTENAME(RTRIM(@cod_suc),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND b.cod_cia LIKE ' + QUOTENAME(RTRIM(@cod_cia),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND a.cod_ori = ' + QUOTENAME('15',CHAR(39)) + ' AND ES.cod_plan_eje LIKE ' + QUOTENAME(@EstAcc,CHAR(39))
		SET @cadena1 = @cadena1 + ' AND TA.tip_acc LIKE ' + QUOTENAME(RTRIM(@TipAcc),CHAR(39)) + ' AND a.cod_resp LIKE ' + QUOTENAME(RTRIM(@Responsable),CHAR(39));
		EXEC(@cadena1);
	
		SET @cadena1 = 'INSERT INTO #Tarea ';
		SET @cadena1 = @cadena1 + 'SELECT DISTINCT a.id,a.cod_act,a.des_act,a.detalle,a.tip_acc,a.fec_prog,a.cod_resp,a.cod_ori,'+
		'MAX(SP.fec_rev) OVER (PARTITION BY I.cod_emp,I.cod_seg,I.cons_doc,I.tip_cla,I.cons_act ORDER BY I.cod_emp,I.cod_seg,I.cons_doc,I.tip_cla,I.cons_act)'+
		',a.observacion,RTRIM(b.ap1_emp)+RTRIM('' ''+b.ap2_emp)+RTRIM('' ''+b.nom_emp),c.des_ori,TA.des_tip,I.ind_eje,ES.nom_plan_eje ';
		SET @cadena1 = @cadena1 + 'FROM	SST_TareasAsignadas AS a ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_SegPosEnfLabAccion AS I ON RTRIM(A.llave) = RTRIM(I.cod_emp)+''*''+RTRIM(CONVERT(CHAR,I.cod_seg))+''*''+RTRIM(CONVERT(CHAR,I.cons_doc)) ';
		SET @cadena1 = @cadena1 + '+''*''+RTRIM(I.tip_cla)+''*''+RTRIM(CONVERT(CHAR,I.cons_act)) ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_emplea AS b ON a.cod_resp = b.cod_emp ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_hislab AS H ON b.cod_emp = H.cod_emp AND H.num_sec = dbo.fn_rhh_HisLab_NumSec(b.cod_emp,a.fec_asig,0,0) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_EmpConv AS Ec ON b.cod_emp = Ec.cod_emp AND (H.fec_ini BETWEEN EC.fec_ini AND EC.fec_fin OR (H.fec_ini >= EC.fec_ini AND EC.fec_fin IS NULL)) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_Convenio AS CV ON Ec.cod_conv = CV.cod_conv AND CV.cod_cli LIKE ''' + RTRIM(@cod_cli) +'''';
		SET @cadena1 = @cadena1 + ' INNER JOIN SST_OrigenActividad AS c ON a.cod_ori = c.cod_ori ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_ProcTipAcc AS TA ON a.tip_acc = TA.tip_acc ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN SST_SegSegPosEnfLabAccion AS SP ON I.cod_emp = SP.cod_emp AND I.cod_seg = SP.cod_seg AND I.cons_doc = SP.cons_doc AND I.tip_cla = SP.tip_cla AND I.cons_act = SP.cons_act '
		SET @cadena1 = @cadena1 + 'INNER JOIN GTH_AccIncPlanEje AS ES ON I.ind_eje = ES.cod_plan_eje ';
		SET @cadena1 = @cadena1 + ' WHERE b.cod_suc LIKE ' + QUOTENAME(RTRIM(@cod_suc),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND b.cod_cia LIKE ' + QUOTENAME(RTRIM(@cod_cia),CHAR(39))
		SET @cadena1 = @cadena1 + ' AND a.cod_ori = ' + QUOTENAME('16',CHAR(39)) + ' AND ES.cod_plan_eje LIKE ' + QUOTENAME(@EstAcc,CHAR(39))
		SET @cadena1 = @cadena1 + ' AND TA.tip_acc LIKE ' + QUOTENAME(RTRIM(@TipAcc),CHAR(39)) + ' AND a.cod_resp LIKE ' + QUOTENAME(RTRIM(@Responsable),CHAR(39));

		SET @cadena1 = 'INSERT INTO #Tarea ';
		SET @cadena1 = @cadena1 + 'SELECT DISTINCT a.id,a.cod_act,a.des_act,a.detalle,a.tip_acc,a.fec_prog,a.cod_resp,a.cod_ori,'+
		'MAX(SP.fec_rev) OVER (PARTITION BY I.cons, I.cod_cia, I.cons_nov, I.cod_nov, I.cons_act, I.cod_acc ORDER BY I.cons, I.cod_cia, I.cons_nov, I.cod_nov, I.cons_act, I.cod_acc)'+'
		,a.observacion,RTRIM(b.ap1_emp)+RTRIM('' ''+b.ap2_emp)+RTRIM('' ''+b.nom_emp),c.des_ori,TA.des_tip,I.cod_plan_eje,ES.nom_plan_eje ';
		SET @cadena1 = @cadena1 + 'FROM	SST_TareasAsignadas AS a ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_PlanAccionNovedadRACI AS I ON RTRIM(A.llave) = RTRIM(CONVERT(CHAR,I.cons))+''*''+RTRIM(I.cod_cia)+''*''+RTRIM(CONVERT(CHAR, I.cons_nov))+''*''+RTRIM(CONVERT(CHAR, I.cod_nov))+''*''+RTRIM(CONVERT(CHAR,I.cons_act))+''*''+RTRIM(CONVERT(CHAR,I.cod_acc)) ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_emplea AS b ON a.cod_resp = b.cod_emp ';
		SET @cadena1 = @cadena1 + 'INNER JOIN rhh_hislab AS H ON b.cod_emp = H.cod_emp AND H.num_sec = dbo.fn_rhh_HisLab_NumSec(b.cod_emp,a.fec_asig,0,0) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_EmpConv AS Ec ON b.cod_emp = Ec.cod_emp AND (H.fec_ini BETWEEN EC.fec_ini AND EC.fec_fin OR (H.fec_ini >= EC.fec_ini AND EC.fec_fin IS NULL)) ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN rhh_Convenio AS CV ON Ec.cod_conv = CV.cod_conv AND CV.cod_cli LIKE ''' + RTRIM(@cod_cli) +'''';
		SET @cadena1 = @cadena1 + ' INNER JOIN SST_OrigenActividad AS c ON a.cod_ori = c.cod_ori ';
		SET @cadena1 = @cadena1 + 'INNER JOIN SST_ProcTipAcc AS TA ON a.tip_acc = TA.tip_acc ';
		SET @cadena1 = @cadena1 + 'LEFT JOIN SST_SegPlanAccionNovedadRACI AS SP ON I.cons = SP.cons AND I.cod_cia = SP.cod_cia AND I.cons_nov = SP.cons_nov AND I.cod_nov = SP.cod_nov AND I.cons_act = SP.cons_act AND I.cod_acc = SP.cod_acc '
		SET @cadena1 = @cadena1 + 'INNER JOIN GTH_AccIncPlanEje AS ES ON I.cod_plan_eje = ES.cod_plan_eje ';
		SET @cadena1 = @cadena1 + 'WHERE b.cod_suc LIKE ' + QUOTENAME(RTRIM(@cod_suc),CHAR(39));
		SET @cadena1 = @cadena1 + 'AND I.cod_cia LIKE ' + QUOTENAME(RTRIM(@cod_cia),CHAR(39));
		SET @cadena1 = @cadena1 + 'AND a.cod_ori = ' + QUOTENAME('19',CHAR(39));
		EXEC(@cadena1);
		
		SELECT DISTINCT	id AS Consecutivo, RTRIM(cod_resp)+' - '+RTRIM(nom_emp) AS Responsable, RTRIM(cod_act)+' - '+RTRIM(des_act) AS Acciones, detalle AS Detalle,
				RTRIM(tip_acc)+' - '+RTRIM(des_tip) AS Tipo_Accion, CONVERT(CHAR,fec_prog, 103) AS Fecha_Programacion,CONVERT(CHAR,iif(fec_eje = '19000101', null, fec_eje), 103) AS Fecha_Ejecucion,
				RTRIM(cod_est)+' - '+RTRIM(des_est) AS Estado, RTRIM(observacion) AS Observaciones, RTRIM(cod_ori)+' - '+RTRIM(des_ori) AS Origen
		FROM	#Tarea WHERE cod_ori LIKE '%' + RTRIM(@Origen) + '%'
		ORDER	BY id;

		DROP TABLE #Tarea;
	END

	IF OBJECT_ID(N'tempdb.dbo.#AreaProceso', N'U') IS NOT NULL
	DROP TABLE #AreaProceso
END

```
