# Stored Procedure: SP_SST_buscaractividades2

## Usa los objetos:
- [[cxc_cliente]]
- [[Fn_Comas_gen]]
- [[gen_sucursal]]

```sql

--=============================================
--	 Author:		Marco Lara
--	 Create Date:   Noviembre 2021
--	 Description:	Reporte SST133
--	 ============================================ 
CREATE PROCEDURE [dbo].[SP_SST_buscaractividades2]
	@cod_cia			CHAR(3),
	@cod_suc			CHAR(3),
	@Origen				CHAR(3),
	@PlazoMax			DATE,
	@PlazoMax2			DATE,
	@cod_incid			VARCHAR(1) 	

--SP_SST_buscaractividades2 '','','','','',1
--WITH ENCRYPTION	
AS
BEGIN
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

	DECLARE
	@PlazoMax1		CHAR(8),
	@PlazoMax3		CHAR(8)

	SET @cod_incid = CASE WHEN @cod_incid = '9' THEN '' ELSE @cod_incid END
	SET @PlazoMax1 = CASE WHEN @PlazoMax = '19000101' THEN '' ELSE CONVERT(CHAR(8),@PlazoMax,112) END
	SET @PlazoMax3 = CASE WHEN @PlazoMax2 = '19000101' THEN '' ELSE CONVERT(CHAR(8),@PlazoMax2,112) END

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
	des_tip				VARCHAR(2000) COLLATE DATABASE_DEFAULT,
	tabla				VARCHAR(30) COLLATE DATABASE_DEFAULT,
	llavearea			VARCHAR(200) COLLATE DATABASE_DEFAULT,
	OrigenU				VARCHAR(500) COLLATE DATABASE_DEFAULT,
	ActividadU			VARCHAR(500) COLLATE DATABASE_DEFAULT,
	AccionU				VARCHAR(500) COLLATE DATABASE_DEFAULT,
	Cod_cia				CHAR(3) COLLATE DATABASE_DEFAULT,			
	Compania			VARCHAR(500) COLLATE DATABASE_DEFAULT,
	DetalleAcc			VARCHAR(2000) COLLATE DATABASE_DEFAULT,
	Llave				CHAR(60) COLLATE DATABASE_DEFAULT,
	PlazoMax			DATE,
	FechaEje			DATE,
	Consecutivo			INT IDENTITY(1,1),
	cod_cia1			CHAR(3) COLLATE DATABASE_DEFAULT,
	Anio				CHAR(4) COLLATE DATABASE_DEFAULT,
	Version				CHAR(10) COLLATE DATABASE_DEFAULT,
	Cons				VARCHAR(10) COLLATE DATABASE_DEFAULT,
	cod_suc				CHAR(10) COLLATE DATABASE_DEFAULT,
	cod_cli				CHAR(15) COLLATE DATABASE_DEFAULT,
	ncod_cli			VARCHAR(250) COLLATE DATABASE_DEFAULT,
	ncod_suc			VARCHAR(250) COLLATE DATABASE_DEFAULT,
	cod_incid			INT,
	Estado				VARCHAR(200) COLLATE DATABASE_DEFAULT,
	Detalle				VARCHAR(4000) COLLATE DATABASE_DEFAULT
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

	SET @cadena = 'INSERT INTO #AreaProceso ';
	SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
	SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU,Llave,PlazoMax,FechaEje,cod_incid,Estado, Cons) '
	SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,'
	SET @cadena = @cadena + 'c.detalle,' + QUOTENAME('SST_PlanAccionCopasst',CHAR(39)) + ','
	SET @cadena = @cadena + 'RTRIM(I.cod_copasst) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cons_acta) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_act_copasst) + ' + QUOTENAME(',',CHAR(39)) + '+'
	SET @cadena = @cadena + 'RTRIM(I.cod_acc_cop) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_cia) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_act AS VARCHAR(8))),'
	SET @cadena = @cadena + 'RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),'
	SET @cadena = @cadena + 'RTRIM(c.detalle),I.cod_cia,I.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3))+' 
	SET @cadena = @cadena + QUOTENAME(' - ',CHAR(39)) + '+RTRIM(w.des_tip),I.Llave,c.fec_prog,c.fec_eje,i.cod_incid,v.nom_plan_eje, I.cons_act '
	SET @cadena = @cadena + 'FROM SST_PlanAccionCopasst I '
	SET @cadena = @cadena + 'INNER JOIN SST_AccMejCopasst A '
	SET @cadena = @cadena + 'ON I.cod_acc_cop = A.cod_acc_cop '
	SET @cadena = @cadena + 'INNER JOIN SST_Copasst B '
	SET @cadena = @cadena + 'ON i.cod_copasst = b.cod_copasst '
	SET @cadena = @cadena + 'AND i.cod_cia = B.cod_cia '
	SET @cadena = @cadena + 'INNER JOIN SST_TareasAsignadas C '
	SET @cadena = @cadena + 'ON C.llave = RTRIM(I.cod_cia)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cod_copasst)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cons_acta)'
	SET @cadena = @cadena + '+' + QUOTENAME('*',CHAR(39)) + '+ RTRIM(I.cod_act_copasst)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cod_acc_cop)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(CONVERT(CHAR,I.cons_act)) '
	SET @cadena = @cadena + 'AND c.cod_ori = ' + QUOTENAME('02',CHAR(39))
	SET @cadena = @cadena + ' INNER JOIN SST_OrigenActividad D '
	SET @cadena = @cadena + 'ON d.cod_ori = c.cod_ori '
	SET @cadena = @cadena + 'INNER JOIN gen_compania Z '
	SET @cadena = @cadena + 'ON i.cod_cia = Z.cod_cia '
	SET @cadena = @cadena + 'INNER JOIN SST_ProcTipAcc w '
	SET @cadena = @cadena + 'ON I.tip_acc = w.tip_acc '
	SET @cadena = @cadena + 'INNER JOIN GTH_AccIncPlanEje v '
	SET @cadena = @cadena + 'ON I.cod_plan_eje = v.cod_plan_eje '
		 
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

	--IF @PlazoMax1 != '' AND @PlazoMax3 != '' 
	--BEGIN
	--	SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39))  
	--	ELSE @cadenaW + ' AND c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39)) END 
	--END

	--SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' ELSE @cadenaW + ' AND LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' END 
	SET @cadena = @cadena + @cadenaW

	EXEC(@cadena)

	SELECT @cadena = '', @cadenaw = ''

	SET @cadena = 'INSERT INTO #AreaProceso ';
	SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
	SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU,Llave,PlazoMax,FechaEje,cod_incid,Estado) '
	SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
	SET @cadena = @cadena + 'c.detalle, ' + QUOTENAME('SST_EvaluaPlanAccion',CHAR(39)) + ','
	SET @cadena = @cadena + 'RTRIM(I.cod_eva) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_cia) + ' + QUOTENAME(',',CHAR(39)) + ' + CONVERT(CHAR(12),I.fec_eje,112) + ' + QUOTENAME(',',CHAR(39)) + ' + '
	SET @cadena = @cadena + 'RTRIM(I.cod_acc) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_act AS VARCHAR(8))),'
	SET @cadena = @cadena + 'RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),' 
	SET @cadena = @cadena + 'RTRIM(c.detalle),I.cod_cia,I.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3))+'
	SET @cadena = @cadena + QUOTENAME(' - ',CHAR(39)) +'+RTRIM(w.des_tip),I.Llave,c.fec_prog,c.fec_eje,i.cod_incid,v.nom_plan_eje ' 
	SET @cadena = @cadena + 'FROM SST_EvaluaPlanAccion I '
	SET @cadena = @cadena + 'INNER JOIN	SST_EvaluaAcciones A '
	SET @cadena = @cadena + 'ON I.cod_acc = A.cod_acc '
	SET @cadena = @cadena + 'INNER JOIN SST_TareasAsignadas C '
	SET @cadena = @cadena + 'ON C.llave = RTRIM(I.cod_eva)+'+ QUOTENAME('*',CHAR(39)) +'+RTRIM(I.cod_cia)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(CONVERT(CHAR,I.fec_eje,103))'
	SET @cadena = @cadena + '+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cod_acc)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(CONVERT(CHAR,I.cons_act)) AND c.cod_ori IN ('
	SET @cadena = @cadena + QUOTENAME('17',CHAR(39))+',' + QUOTENAME('18',CHAR(39))+') '
	SET @cadena = @cadena + 'INNER JOIN SST_OrigenActividad D '
	SET @cadena = @cadena + 'ON d.cod_ori = c.cod_ori '
	SET @cadena = @cadena + 'INNER JOIN gen_compania Z '
	SET @cadena = @cadena + 'ON i.cod_cia = Z.cod_cia '
	SET @cadena = @cadena + 'INNER JOIN SST_ProcTipAcc w '
	SET @cadena = @cadena + 'ON I.tip_acc = w.tip_acc '
	SET @cadena = @cadena + 'INNER JOIN GTH_AccIncPlanEje v '
	SET @cadena = @cadena + 'ON I.cod_plan_eje = v.cod_plan_eje '

	IF @cod_cia != ''
	BEGIN
		SET @cadenaW = 'WHERE I.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
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

	IF @PlazoMax1 != '' AND @PlazoMax3 != '' 
	BEGIN
		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39))  
		ELSE @cadenaW + ' AND c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39)) END 
	END

	--SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' ELSE @cadenaW + ' AND LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' END 		
	SET @cadena = @cadena + @cadenaW

	--EXECUTE sp_executesql (@cadena)
	EXEC(@cadena)

	SELECT @cadena = '', @cadenaw = ''

	SET @cadena = 'INSERT INTO #AreaProceso ';
	SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
	SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU,Llave,PlazoMax,FechaEje,cod_incid,Estado) '
	SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
	SET @cadena = @cadena + 'c.detalle, '+QUOTENAME('SST_GestCambPlanAccion',CHAR(39))+','
	SET @cadena = @cadena + 'RTRIM(I.cons_ges) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_acc) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_act AS VARCHAR(8))) +' + QUOTENAME(',',CHAR(39)) + ' +'
	SET @cadena = @cadena + 'RTRIM(I.cod_cia),RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),' 
	SET @cadena = @cadena + 'RTRIM(c.detalle),I.cod_cia,I.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3))+' 
	SET @cadena = @cadena + QUOTENAME(' - ',CHAR(39)) + '+RTRIM(w.des_tip),I.Llave,c.fec_prog,c.fec_eje,i.cod_incid,v.nom_plan_eje  '
	SET @cadena = @cadena + 'FROM SST_GestCambPlanAccion I '
	SET @cadena = @cadena + 'INNER JOIN SST_GestCambAccion A '
	SET @cadena = @cadena + 'ON I.cod_acc = A.cod_acc '
	SET @cadena = @cadena + 'INNER JOIN SST_TareasAsignadas C '
	SET @cadena = @cadena + 'ON C.llave = RTRIM(I.cod_cia)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cons_ges)+' + QUOTENAME('*',CHAR(39)) + '+RTRIM(I.cod_acc)+' 
	SET @cadena = @cadena + QUOTENAME('*',CHAR(39)) + '+ RTRIM(CONVERT(CHAR,I.cons_act))	AND c.cod_ori = ' + QUOTENAME('07',CHAR(39))
	SET @cadena = @cadena + ' INNER JOIN SST_OrigenActividad D '
	SET @cadena = @cadena + 'ON d.cod_ori = c.cod_ori '
	SET @cadena = @cadena + 'INNER JOIN gen_compania Z '
	SET @cadena = @cadena + 'ON i.cod_cia = Z.cod_cia '
	SET @cadena = @cadena + 'INNER JOIN SST_ProcTipAcc w '
	SET @cadena = @cadena + 'ON I.tip_acc = w.tip_acc '
	SET @cadena = @cadena + 'INNER JOIN GTH_AccIncPlanEje v '
	SET @cadena = @cadena + 'ON I.cod_plan_eje = v.cod_plan_eje '

	--IF @cod_cia != ''
	--BEGIN
	--	SET @cadenaW = 'WHERE I.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
	--END

	--IF @cod_suc != ''
	--BEGIN
	--	SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE B.cod_suc = ' + QUOTENAME(@cod_suc,CHAR(39)) ELSE @cadenaW + ' AND B.cod_suc = ' + QUOTENAME(@cod_suc,CHAR(39)) END 
	--END

	--IF @cod_incid != ''
	--BEGIN
	--	SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) ELSE @cadenaW + ' AND i.cod_incid = ' + QUOTENAME(@cod_incid,CHAR(39)) END 
	--END

	--IF @Origen != ''
	--BEGIN
	--	SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) ELSE @cadenaW + ' AND d.cod_ori = ' + QUOTENAME(@Origen,CHAR(39)) END 
	--END

	--IF @PlazoMax1 != '' AND @PlazoMax3 != '' 
	--BEGIN
	--	SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39))  
	--	ELSE @cadenaW + ' AND c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39)) END 
	--END

	--SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' ELSE @cadenaW + ' AND LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' END 		
	SET @cadena = @cadena + @cadenaW

	--
	--EXECUTE sp_executesql (@cadena)
	EXEC(@cadena)

	SELECT @cadena = '', @cadenaw = ''

	SET @cadena = 'INSERT INTO #AreaProceso ';
	SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
	SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU,Llave,PlazoMax,FechaEje,cod_incid,Estado) '
	SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
	SET @cadena = @cadena + 'c.detalle,' + QUOTENAME('SST_InspPlanAccion',CHAR(39)) + ','
	SET @cadena = @cadena + 'RTRIM(I.anio) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.version) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons AS VARCHAR(8))) +' + QUOTENAME(',',CHAR(39)) + ' +'
	SET @cadena = @cadena + 'RTRIM(I.cod_cia) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_acc) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_act AS VARCHAR(8))),'
	SET @cadena = @cadena + 'RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),' 
	SET @cadena = @cadena + 'RTRIM(c.detalle),I.cod_cia,I.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3))+'  
	SET @cadena = @cadena + QUOTENAME(' - ',CHAR(39)) + '+RTRIM(w.des_tip),I.Llave,c.fec_prog,c.fec_eje,i.cod_incid,v.nom_plan_eje '  
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
	SET @cadena = @cadena + 'INNER JOIN GTH_AccIncPlanEje v '
	SET @cadena = @cadena + 'ON I.cod_plan_eje = v.cod_plan_eje '

	IF @cod_cia != ''
	BEGIN
		SET @cadenaW = 'WHERE I.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
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

	IF @PlazoMax1 != '' AND @PlazoMax3 != '' 
	BEGIN
		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39))  
		ELSE @cadenaW + ' AND c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39)) END 
	END

	SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' ELSE @cadenaW + ' AND LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' END 
	SET @cadena = @cadena + @cadenaW

	--
	--EXECUTE sp_executesql (@cadena)
	EXEC(@cadena)

	SELECT @cadena = '', @cadenaw = ''

	SET @cadena = 'INSERT INTO #AreaProceso ';
	SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
	SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU,Llave,PlazoMax,FechaEje,cod_incid,Estado) '
	SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
	SET @cadena = @cadena + 'c.detalle, ' + QUOTENAME('SST_PlanAccionAltGer',CHAR(39)) + ','
	SET @cadena = @cadena + 'RTRIM(I.cod_alta_gerencia) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cons_acta) + ' + QUOTENAME(',',CHAR(39))  
	SET @cadena = @cadena + ' + RTRIM(CAST(I.cod_act_altagerencia AS VARCHAR(8))) +' + QUOTENAME(',',CHAR(39)) + ' + '
	SET @cadena = @cadena + 'RTRIM(I.cod_acc_altger) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_cia) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_act AS VARCHAR(8))),'
	SET @cadena = @cadena + 'RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),' 
	SET @cadena = @cadena + 'RTRIM(c.detalle),I.cod_cia,I.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3)) + ' 
	SET @cadena = @cadena + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(w.des_tip),I.Llave,c.fec_prog,c.fec_eje,i.cod_incid,v.nom_plan_eje ' 
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
	SET @cadena = @cadena + 'INNER JOIN GTH_AccIncPlanEje v '
	SET @cadena = @cadena + 'ON I.cod_plan_eje = v.cod_plan_eje '

	IF @cod_cia != ''
	BEGIN
		SET @cadenaW = 'WHERE I.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
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

	IF @PlazoMax1 != '' AND @PlazoMax3 != '' 
	BEGIN
		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39))  
		ELSE @cadenaW + ' AND c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39)) END 
	END

	SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' ELSE @cadenaW + ' AND LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' END 
	SET @cadena = @cadena + @cadenaW

	--
	--EXECUTE sp_executesql (@cadena)
	EXEC(@cadena)

	SELECT @cadena = '', @cadenaw = ''

	SET @cadena = 'INSERT INTO #AreaProceso ';
	SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
	SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU,Llave,PlazoMax,FechaEje,cod_incid,Estado) '
	SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
	SET @cadena = @cadena + 'c.detalle,' + QUOTENAME('SST_PlanAccionAudi',CHAR(39)) + ','
	SET @cadena = @cadena + 'RTRIM(I.cod_cia) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.conse AS VARCHAR(8))) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_sede) +' + QUOTENAME(',',CHAR(39)) + ' +'
	SET @cadena = @cadena + 'RTRIM(CAST(I.cod_tipo AS VARCHAR(8))) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.numeral AS VARCHAR(8))) + ' + QUOTENAME(',',CHAR(39)) + ' + '
	SET @cadena = @cadena + 'RTRIM(I.cod_acc_audi) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_act AS VARCHAR(8))),'
	SET @cadena = @cadena + 'RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),' 
	SET @cadena = @cadena + 'RTRIM(c.detalle),I.cod_cia,I.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3))+' 
	SET @cadena = @cadena + QUOTENAME(' - ',CHAR(39)) + '+RTRIM(w.des_tip),I.Llave,c.fec_prog,c.fec_eje,i.cod_incid,v.nom_plan_eje '
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
	SET @cadena = @cadena + 'INNER JOIN GTH_AccIncPlanEje v '
	SET @cadena = @cadena + 'ON I.cod_plan_eje = v.cod_plan_eje '

	IF @cod_cia != ''
	BEGIN
		SET @cadenaW = 'WHERE I.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
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

	IF @PlazoMax1 != '' AND @PlazoMax3 != '' 
	BEGIN
		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39))  
		ELSE @cadenaW + ' AND c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39)) END 
	END

	--SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' ELSE @cadenaW + ' AND LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' END 
	SET @cadena = @cadena + @cadenaW

	--
	--EXECUTE sp_executesql (@cadena)
	EXEC(@cadena)

	SELECT @cadena = '', @cadenaw = ''

	SET @cadena = 'INSERT INTO #AreaProceso ';
	SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
	SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU,Llave,PlazoMax,FechaEje,cod_incid,Estado) '
	SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
	SET @cadena = @cadena + 'c.detalle,' + QUOTENAME('SST_PlanAccionBrigada',CHAR(39)) + ','
	SET @cadena = @cadena + 'RTRIM(CAST(I.cod_brigada AS VARCHAR(8))) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cons_acta) + ' 
	SET @cadena = @cadena + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_act_brig) +' + QUOTENAME(',',CHAR(39)) + ' +'
	SET @cadena = @cadena + 'RTRIM(I.cod_acc_brig) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_cia) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_act AS VARCHAR(8))),'
	SET @cadena = @cadena + 'RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),' 
	SET @cadena = @cadena + 'RTRIM(c.detalle),I.cod_cia,I.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3))+' 
	SET @cadena = @cadena + QUOTENAME(' - ',CHAR(39)) + '+RTRIM(w.des_tip),I.Llave,c.fec_prog,c.fec_eje,i.cod_incid,v.nom_plan_eje '      
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
	SET @cadena = @cadena + 'INNER JOIN GTH_AccIncPlanEje v '
	SET @cadena = @cadena + 'ON I.cod_plan_eje = v.cod_plan_eje '

	IF @cod_cia != ''
	BEGIN
		SET @cadenaW = 'WHERE I.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
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

	IF @PlazoMax1 != '' AND @PlazoMax3 != '' 
	BEGIN
		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39))  
		ELSE @cadenaW + ' AND c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39)) END 
	END

	SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' ELSE @cadenaW + ' AND LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' END 
	SET @cadena = @cadena + @cadenaW

	--
	--EXECUTE sp_executesql (@cadena)
	EXEC(@cadena)

	SELECT @cadena = '', @cadenaw = ''

	SET @cadena = 'INSERT INTO #AreaProceso ';
	SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
	SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU,Llave,PlazoMax,FechaEje,cod_incid,Estado) '
	SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
	SET @cadena = @cadena + 'c.detalle,' + QUOTENAME('SST_PlanAccionComiteConv',CHAR(39)) + ','
	SET @cadena = @cadena + 'RTRIM(I.cod_comite) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cons_acta) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_act_comite) +' + QUOTENAME(',',CHAR(39)) + ' +'
	SET @cadena = @cadena + 'RTRIM(I.cod_acc_comite) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_cia) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_act AS VARCHAR(8))),'
	SET @cadena = @cadena + 'RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),' 
	SET @cadena = @cadena + 'RTRIM(c.detalle),I.cod_cia,I.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(c.tip_acc AS VARCHAR(3))+' 
	SET @cadena = @cadena + QUOTENAME(' - ',CHAR(39)) + '+RTRIM(w.des_tip),I.Llave,c.fec_prog,c.fec_eje,i.cod_incid,v.nom_plan_eje '
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
	SET @cadena = @cadena + 'INNER JOIN GTH_AccIncPlanEje v '
	SET @cadena = @cadena + 'ON I.cod_plan_eje = v.cod_plan_eje '

	IF @cod_cia != ''
	BEGIN
		SET @cadenaW = 'WHERE I.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
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

	IF @PlazoMax1 != '' AND @PlazoMax3 != '' 
	BEGIN
		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39))  
		ELSE @cadenaW + ' AND c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39)) END 
	END

	SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' ELSE @cadenaW + ' AND LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' END 
	SET @cadena = @cadena + @cadenaW

	--
	--EXECUTE sp_executesql (@cadena)
	EXEC(@cadena)

	SELECT @cadena = '', @cadenaw = ''

	SET @cadena = 'INSERT INTO #AreaProceso ';
	SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
	SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU,Llave,PlazoMax,FechaEje,cod_incid,Estado) '
	SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
	SET @cadena = @cadena + 'c.detalle,' + QUOTENAME('SST_PlanAccionComiteSV',CHAR(39)) +','
	SET @cadena = @cadena + 'RTRIM(I.cod_comite_sv) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cons_acta) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_act_comite_sv) +' + QUOTENAME(',',CHAR(39)) + ' + '
	SET @cadena = @cadena + 'RTRIM(I.cod_acc_comite_sv) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_cia) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_act AS VARCHAR(8))),'
	SET @cadena = @cadena + 'RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),' 
	SET @cadena = @cadena + 'RTRIM(c.detalle),I.cod_cia,I.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3)) + ' 
	SET @cadena = @cadena + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(w.des_tip),I.Llave,c.fec_prog,c.fec_eje,i.cod_incid,v.nom_plan_eje '      
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
	SET @cadena = @cadena + 'INNER JOIN GTH_AccIncPlanEje v '
	SET @cadena = @cadena + 'ON I.cod_plan_eje = v.cod_plan_eje '

	IF @cod_cia != ''
	BEGIN
		SET @cadenaW = 'WHERE I.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
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

	IF @PlazoMax1 != '' AND @PlazoMax3 != '' 
	BEGIN
		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39))  
		ELSE @cadenaW + ' AND c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39)) END 
	END

	SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' ELSE @cadenaW + ' AND LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' END 
	SET @cadena = @cadena + @cadenaW

	EXEC(@cadena)

	--SELECT @cadena = '', @cadenaw = ''

	SET @cadena = 'INSERT INTO #AreaProceso ';
	SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
	SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU,Llave,PlazoMax,FechaEje,cod_incid,Estado) '
	SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
	SET @cadena = @cadena + 'c.detalle, ' + QUOTENAME('SST_PlanAccionPlanEme',CHAR(39)) +','
	SET @cadena = @cadena + 'RTRIM(I.cod_cia) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_plan_emerg) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.Cod_ClasPlanEme) +' + QUOTENAME(',',CHAR(39)) + ' +'
	SET @cadena = @cadena + 'RTRIM(CAST(I.cons_eje AS VARCHAR(8))) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_acc_eme) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_act AS VARCHAR(8))),'
	SET @cadena = @cadena + 'RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),' 
	SET @cadena = @cadena + 'RTRIM(c.detalle),I.cod_cia,I.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3))+' 
	SET @cadena = @cadena + QUOTENAME(' - ',CHAR(39)) + '+RTRIM(w.des_tip),I.Llave,c.fec_prog,c.fec_eje,i.cod_incid,v.nom_plan_eje '  
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
	SET @cadena = @cadena + 'INNER JOIN GTH_AccIncPlanEje v '
	SET @cadena = @cadena + 'ON I.cod_plan_eje = v.cod_plan_eje '

	IF @cod_cia != ''
	BEGIN
		SET @cadenaW = 'WHERE I.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
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

	IF @PlazoMax1 != '' AND @PlazoMax3 != '' 
	BEGIN
		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39))  
		ELSE @cadenaW + ' AND c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39)) END 
	END

	SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' ELSE @cadenaW + ' AND LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' END 
	SET @cadena = @cadena + @cadenaW

	EXEC(@cadena)

	SELECT @cadena = '', @cadenaw = ''

	SET @cadena = 'INSERT INTO #AreaProceso ';
	SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
	SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU,Llave,PlazoMax,FechaEje,cod_incid,Estado) '
	SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
	SET @cadena = @cadena + 'c.detalle,' + QUOTENAME('SST_ProcPlanAccion',CHAR(39)) + ','
	SET @cadena = @cadena + 'RTRIM(CAST(I.cod_proc AS VARCHAR(8))) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CONVERT(CHAR(8),I.fecha,112)) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons AS VARCHAR(8))) +' + QUOTENAME(',',CHAR(39)) + ' +'
	SET @cadena = @cadena + 'RTRIM(I.cod_acc) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.tip_doc) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_cia),RTRIM(c.cod_ori)' 
	SET @cadena = @cadena + '+ ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),'  
	SET @cadena = @cadena + 'RTRIM(c.detalle),I.cod_cia,I.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3)) + ' 
	SET @cadena = @cadena + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(w.des_tip),I.Llave,c.fec_prog,c.fec_eje,i.cod_incid,v.nom_plan_eje '  
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
	SET @cadena = @cadena + 'INNER JOIN GTH_AccIncPlanEje v '
	SET @cadena = @cadena + 'ON I.cod_plan_eje = v.cod_plan_eje '

	IF @cod_cia != ''
	BEGIN
		SET @cadenaW = 'WHERE I.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
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

	IF @PlazoMax1 != '' AND @PlazoMax3 != '' 
	BEGIN
		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39))  
		ELSE @cadenaW + ' AND c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39)) END 
	END

	SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' ELSE @cadenaW + ' AND LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' END 
	SET @cadena = @cadena + @cadenaW

	--
	--EXECUTE sp_executesql (@cadena)
	EXEC(@cadena)

	SELECT @cadena = '', @cadenaw = ''

	SET @cadena = 'INSERT INTO #AreaProceso ';
	SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
	SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU,Llave,PlazoMax,FechaEje,cod_incid,Estado) '
	SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
	SET @cadena = @cadena + 'c.detalle,' + QUOTENAME('SST_RevAltaDirPlanAccion',CHAR(39)) + ','
	SET @cadena = @cadena + 'RTRIM(CAST(I.cons AS VARCHAR(8))) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_ent) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_acc) +' + QUOTENAME(',',CHAR(39)) + ' +'
	SET @cadena = @cadena + 'RTRIM(I.cod_cia) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_act AS VARCHAR(8))),'
	SET @cadena = @cadena + 'RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),' 
	SET @cadena = @cadena + 'RTRIM(c.detalle),I.cod_cia,I.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3))+' 
	SET @cadena = @cadena + QUOTENAME(' - ',CHAR(39)) + '+RTRIM(w.des_tip),I.Llave,c.fec_prog,c.fec_eje,i.cod_incid,v.nom_plan_eje ' 
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
	SET @cadena = @cadena + 'INNER JOIN GTH_AccIncPlanEje v '
	SET @cadena = @cadena + 'ON I.cod_plan_eje = v.cod_plan_eje '

	IF @cod_cia != ''
	BEGIN
		SET @cadenaW = 'WHERE I.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
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

	IF @PlazoMax1 != '' AND @PlazoMax3 != '' 
	BEGIN
		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39))  
		ELSE @cadenaW + ' AND c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39)) END 
	END

	--SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' ELSE @cadenaW + ' AND LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' END 
	SET @cadena = @cadena + @cadenaW

	--
	--EXECUTE sp_executesql (@cadena)
	EXEC(@cadena)

	SELECT @cadena = '', @cadenaw = ''

	SET @cadena = 'INSERT INTO #AreaProceso ';
	SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
	SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU,Llave,PlazoMax,FechaEje,cod_incid,Estado) '
	SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
	SET @cadena = @cadena + 'c.detalle,' + QUOTENAME('SST_RiesgoPsicosocPlanAccion',CHAR(39)) + ','
	SET @cadena = @cadena + 'RTRIM(I.cod_riepsico) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_cia) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(I.cod_acc) +' + QUOTENAME(',',CHAR(39)) + ' +'
	SET @cadena = @cadena + 'RTRIM(CAST(I.cons_act AS VARCHAR(8))),RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),'  
	SET @cadena = @cadena + 'RTRIM(c.detalle),I.cod_cia,I.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3))+' 
	SET @cadena = @cadena + QUOTENAME(' - ',CHAR(39)) + '+RTRIM(w.des_tip),I.Llave,c.fec_prog,c.fec_eje,i.cod_incid,v.nom_plan_eje '  
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
	SET @cadena = @cadena + 'INNER JOIN GTH_AccIncPlanEje v '
	SET @cadena = @cadena + 'ON I.cod_plan_eje = v.cod_plan_eje '

	IF @cod_cia != ''
	BEGIN
		SET @cadenaW = 'WHERE I.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
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

	IF @PlazoMax1 != '' AND @PlazoMax3 != '' 
	BEGIN
		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39))  
		ELSE @cadenaW + ' AND c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39)) END 
	END

	SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' ELSE @cadenaW + ' AND LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' END 
	SET @cadena = @cadena + @cadenaW

	--
	--EXECUTE sp_executesql (@cadena)
	EXEC(@cadena)

	SELECT @cadena = '', @cadenaw = ''

	SET @cadena = 'INSERT INTO #AreaProceso ';
	SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
	SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU,Llave,PlazoMax,FechaEje,cod_incid,Estado) '
	SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
	SET @cadena = @cadena + 'c.detalle,' + QUOTENAME('GTH_Acc_Acciones',CHAR(39)) + ','
	SET @cadena = @cadena + 'RTRIM(I.cod_emp) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cod_acc AS VARCHAR(8))) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_doc AS VARCHAR(8))) +' + QUOTENAME(',',CHAR(39)) + ' +'
	SET @cadena = @cadena + 'RTRIM(I.tip_cla) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_act AS VARCHAR(8))),'
	SET @cadena = @cadena + 'RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),'
	SET @cadena = @cadena + 'RTRIM(c.detalle),H.cod_cia,H.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3))+' 
	SET @cadena = @cadena + QUOTENAME(' - ',CHAR(39)) + '+RTRIM(w.des_tip),I.Llave,c.fec_prog,c.fec_eje,i.cod_incid,v.nom_plan_eje '
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
	SET @cadena = @cadena + 'INNER JOIN GTH_AccIncPlanEje v '
	SET @cadena = @cadena + 'ON I.ind_eje = v.cod_plan_eje '

	IF @cod_cia != ''
	BEGIN
		SET @cadenaW = 'WHERE H.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
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

	--IF @PlazoMax1 != '' AND @PlazoMax3 != '' 
	--BEGIN
	--	SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39))  
	--	ELSE @cadenaW + ' AND c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39)) END 
	--END

	--SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' ELSE @cadenaW + ' AND LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' END 
	SET @cadena = @cadena + @cadenaW

	--
	--EXECUTE sp_executesql (@cadena)
	EXEC(@cadena)

	SELECT @cadena = '', @cadenaw = ''

	SET @cadena = 'INSERT INTO #AreaProceso ';
	SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
	SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU,Llave,PlazoMax,FechaEje,cod_incid,Estado) '
	SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
	SET @cadena = @cadena + 'c.detalle,' + QUOTENAME('GTH_Incid_Acciones',CHAR(39)) + ','
	SET @cadena = @cadena + 'RTRIM(I.cod_emp) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cod_inc AS VARCHAR(8))) + ' 
	SET @cadena = @cadena + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_doc AS VARCHAR(8))) +' + QUOTENAME(',',CHAR(39)) + ' +'
	SET @cadena = @cadena + 'RTRIM(I.tip_cla) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_act AS VARCHAR(8))),'
	SET @cadena = @cadena + 'RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),' 
	SET @cadena = @cadena + 'RTRIM(c.detalle),H.cod_cia,H.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3))+' 
	SET @cadena = @cadena + QUOTENAME(' - ',CHAR(39)) + '+RTRIM(w.des_tip),I.Llave,c.fec_prog,c.fec_eje,i.cod_incid,v.nom_plan_eje '
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
	SET @cadena = @cadena + 'INNER JOIN GTH_AccIncPlanEje v '
	SET @cadena = @cadena + 'ON I.ind_eje = v.cod_plan_eje '

	IF @cod_cia != ''
	BEGIN
		SET @cadenaW = 'WHERE H.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
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

	IF @PlazoMax1 != '' AND @PlazoMax3 != '' 
	BEGIN
		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39))  
		ELSE @cadenaW + ' AND c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39)) END 
	END

	SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' ELSE @cadenaW + ' AND LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' END 
	SET @cadena = @cadena + @cadenaW

	--
	--EXECUTE sp_executesql (@cadena)
	EXEC(@cadena)

	SELECT @cadena = '', @cadenaw = ''

	SET @cadena = 'INSERT INTO #AreaProceso ';
	SET @cadena = @cadena + '(cod_ori, origen, accion, obs_ctrl_admin, tip_acc,des_tip,tabla,llavearea,'
	SET @cadena = @cadena + 'OrigenU,ActividadU,DetalleAcc,Cod_cia,Compania,AccionU,Llave,PlazoMax,FechaEje,cod_incid,Estado) '
	SET @cadena = @cadena + 'SELECT DISTINCT c.cod_ori, d.des_ori , c.cod_act, c.des_act,c.tip_acc,' 
	SET @cadena = @cadena + 'c.detalle,' + QUOTENAME('SST_SegPosEnfLabAccion',CHAR(39)) + ','
	SET @cadena = @cadena + 'RTRIM(I.cod_emp) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cod_seg AS VARCHAR(8))) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_doc AS VARCHAR(8))) +' + QUOTENAME(',',CHAR(39)) + ' +'
	SET @cadena = @cadena + 'RTRIM(I.tip_cla) + ' + QUOTENAME(',',CHAR(39)) + ' + RTRIM(CAST(I.cons_act AS VARCHAR(8))),'
	SET @cadena = @cadena + 'RTRIM(c.cod_ori) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(d.des_ori) , RTRIM(c.cod_act) + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(c.des_act),' 
	SET @cadena = @cadena + 'RTRIM(c.detalle),H.cod_cia,H.cod_cia + ' + QUOTENAME(' - ',CHAR(39)) + ' + RTRIM(Z.nom_cia),CAST(w.tip_acc AS VARCHAR(3))+' 
	SET @cadena = @cadena + QUOTENAME(' - ',CHAR(39)) + '+RTRIM(w.des_tip),I.Llave,c.fec_prog,c.fec_eje,i.cod_incid,v.nom_plan_eje '
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
	SET @cadena = @cadena + 'INNER JOIN GTH_AccIncPlanEje v '
	SET @cadena = @cadena + 'ON I.ind_eje = v.cod_plan_eje '

	IF @cod_cia != ''
	BEGIN
		SET @cadenaW = 'WHERE H.cod_cia = ' + QUOTENAME(@cod_cia,CHAR(39))
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

	IF @PlazoMax1 != '' AND @PlazoMax3 != '' 
	BEGIN
		SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39))  
		ELSE @cadenaW + ' AND c.fec_prog BETWEEN ' + QUOTENAME(@PlazoMax1,CHAR(39)) + ' AND ' + QUOTENAME(@PlazoMax3,CHAR(39)) END 
	END

	SET @cadenaW = CASE WHEN LEN(@cadenaW) = 0 THEN 'WHERE LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' ELSE @cadenaW + ' AND LEN(ISNULL(I.llave,'+QUOTENAME('',CHAR(39))+')) > 0' END 
	SET @cadena = @cadena + @cadenaW

	--
	--EXECUTE sp_executesql (@cadena)
	EXEC(@cadena)
	
	UPDATE #AreaProceso SET 
	cod_cia1 = dbo.Fn_Comas_gen(llave,1,'*'),
	Anio = dbo.Fn_Comas_gen(llave,2,'*'),
	Version = dbo.Fn_Comas_gen(llave,3,'*'),
	Cons = dbo.Fn_Comas_gen(llave,4,'*'),
	cod_suc = dbo.Fn_Comas_gen(llave,5,'*'),
	cod_cli = dbo.Fn_Comas_gen(llave,6,'*')

	UPDATE #AreaProceso SET 
	ncod_cli = RTRIM(b.cod_cli) + ' - ' + RTRIM(a.nom_cli) 
	FROM cxc_cliente a 
	INNER JOIN #AreaProceso b ON a.cod_cli = b.cod_cli

	UPDATE #AreaProceso SET 
	ncod_suc = RTRIM(b.cod_suc) + ' - ' + RTRIM(a.nom_suc) 
	FROM gen_sucursal a 
	INNER JOIN #AreaProceso b ON a.cod_suc = b.cod_suc


	UPDATE #AreaProceso SET 
	Detalle = 
	CASE 
	WHEN cod_incid = '1' THEN 'Plan Anual de Trabajo' 
	WHEN cod_incid = '2' THEN 'Programa anual de Capacitación - PyP' 
	WHEN cod_incid = '4' THEN 'Cronograma de Inspecciones' 
	ELSE '' END + CHAR(13) + CHAR(10) + 
	'Compañia: ' + RTRIM(Compania) + CHAR(13) + CHAR(10) +
	'Año: ' + RTRIM(Anio) + CHAR(13) + CHAR(10) +
	'Versión: ' + RTRIM(Version) + CHAR(13) + CHAR(10) +
	'Sucursal: ' + RTRIM(ncod_suc) + CHAR(13) + CHAR(10) +
	'Empresa Usuaria: ' + RTRIM(ncod_cli) + CHAR(13) + CHAR(10) +
	'Consecutivo: ' + RTRIM(Consecutivo) 

	--USST_GestCambAccion

	--SELECT * FROM #AreaProceso
	SELECT Consecutivo AS cons,tip_acc + ' - ' + RTRIM(des_tip) As Acciones,obs_ctrl_admin,PlazoMax,Estado,OrigenU,Compania, Anio, Version, ncod_suc, ncod_cli, Detalle AS DetalleAcc,CASE WHEN cod_incid = 1 THEN 'Plan anual de trabajo' WHEN cod_incid = 2 THEN 'Programa Anual de Capacitaciones'  WHEN cod_incid = 4 THEN 'Cronograma de Inspecciones' ELSE '' END AS ncod_incid 
	FROM #AreaProceso

	IF OBJECT_ID(N'tempdb.dbo.#AreaProceso', N'U') IS NOT NULL
	DROP TABLE #AreaProceso
END

```
