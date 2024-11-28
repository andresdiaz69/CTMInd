# Stored Procedure: rs_rhh_RepNom1551

## Usa los objetos:
- [[cxc_cliente]]
- [[fn_GTH_DiasContratado]]
- [[fn_rhh_CargoFch]]
- [[fn_rhh_ConvEmp]]
- [[fn_rhh_SueldoFch]]
- [[gen_sucursal]]
- [[gen_tipide]]
- [[GTH_CandPostCIUO]]
- [[GTH_ClasifIntOcuDet]]
- [[GTH_Contratos]]
- [[GTH_Obj_Contrato]]
- [[GTH_Requisicion]]
- [[GTH_RequisicionEmp]]
- [[GTH_RptEmplea]]
- [[GTH_RptEstudio]]
- [[rhh_cargos]]
- [[rhh_Convenio]]
- [[rhh_emplea]]
- [[rhh_esthom]]
- [[rhh_estudio]]
- [[rhh_hislab]]
- [[rhh_tbclaest]]
- [[rhh_tbestud]]
- [[sis_empresa]]

```sql
--

-- ========================================================
-- Author:		Claudia Ospina Torres
-- Create date: Marzo de 2013
-- Description:	MINISTERIO DE TRABAJO: FORMATO DE OFERTA
-- ========================================================
-- GKNINO 16/07/2015 Se aumenta la longitud del campo NomEst de 50 a 200 en la tabla auxiliar @Estudio. SRS 2015-0550.
-- GKNINO 02/10/2015 Se cambia las consultas y se agregan nuevos campos según SRS 2015-0852
-- GKNINO 15/12/2015 Se cambia la consulta para obtener el nivel de estudio y el Nucleo de formación. Además se aumenta la longitud del campo 
-- NuclForm en las variable tipo tabla @FormOfer y @Resultado. SRS 2015-1038.
-- Jorge Diaz 2019.08.01 ( *1 )
--	. Se cambió campo fijo NOM_OFI='BOGOTA' para que muestre la sucursal de historia laboral y de requisicion
--	. Se asegura que los candidatos se filtren por cia,suc,cco segun requisicion
--	. Se quitaron filtros por clasificadores porque no aplica en candidatos
--	. Se quitó llamado a variable general "161" xq no se utiliza
--	. Se cambió filtro por fecha de retiro xq estaba excluyendo empleados con retiro posterior al trimestre
--	. Se aplico join a la tabla de estudios para que traiga unicamente a los empleados de la consulta y no a toda la base de rhh_emplea
--	. Se cambio "WHILE" que borraba regs de empresas con nit '00' por instruccion DELETE
--	. Se adicionó instruccion ISNULL en funcion SUM() para que no genere alerta de base de datos en valores nulos

-- exec rs_rhh_RepNom1551 '2015','4','%','%','%','%','BUC','%'

CREATE PROCEDURE [dbo].[rs_rhh_RepNom1551]
		@AnoRep		CHAR(4)='2012',	-- Año
		@Trimes		CHAR(1)='1',	-- Trimestre: 1=01/ene a 31/mar 2=01/abr a 30/jun 3=01/jul a 30/sep 4=01/oct a 31/dic
		@Pais		CHAR(3)='057',	-- Pais firma contrato
		@Depto		CHAR(2)='11',	-- Depto firma contrato
		@Ciudad		CHAR(5)='11001',-- Ciudad firma contrato	
		@CodCia		CHAR(3)='%',	-- Compañia
		@CodSuc		CHAR(3)='%',	-- Sucursal
		@CodCco		CHAR(10) = '%'	-- Ccosto
		--( *1 ) @CodCl1		CHAR(12) = '%',	-- Clasificador 1
		--( *1 ) @CodCl2		CHAR(12) = '%',	-- Clasificador 2
		--( *1 ) @CodCl3		CHAR(12) = '%'	-- Clasificador 3
--WITH ENCRYPTION   	
AS
BEGIN
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	DECLARE	@CFI	CHAR(8) = RTRIM(@AnoRep) +  CASE @Trimes	WHEN	1	THEN	'0101'
																WHEN	2	THEN	'0401'
																WHEN	3	THEN	'0701'
																WHEN	4	THEN	'1001'
												END;
											
	DECLARE @CFF	CHAR(8) = RTRIM(@AnoRep) +  CASE @Trimes	WHEN	1	THEN	'0331'
																WHEN	2	THEN	'0630'
																WHEN	3	THEN	'0930'
																WHEN	4	THEN	'1231'
												END;

	DECLARE @fFecIni DATETIME = CONVERT(DATE,RTRIM(@CFI));
	DECLARE @fFecFin DATETIME = CONVERT(DATE,RTRIM(@CFF));

	-- Selecciona en una tabla los empleados que tuvieron al menos un pago de nomina en el respectivo trimestre
	DECLARE @MIN	INT;
	DECLARE @MAX	INT;
	DECLARE @CAND	CHAR(12);
	DECLARE @NITCLI CHAR(16);

	CREATE TABLE #cTblEmp
	(
		cod_emp		CHAR(12) COLLATE DATABASE_DEFAULT, 
		cod_cont	INT
	);

	
	/*	
	CREATE TABLE #CandSC
	(
		id			INT IDENTITY,
		cod_emp		CHAR(15)		
	);
	*/

	SELECT @NITCLI = REPLACE(RTRIM(REPLACE(emp_nit,'.','')),'-','') FROM sis_empresa;

	INSERT	
	INTO	#cTblEmp
	SELECT	E.cod_emp, H.cod_con
	FROM	rhh_emplea AS E
	INNER	JOIN rhh_hislab AS H ON H.sec_car = 1 
			AND E.cod_emp = H.cod_emp AND H.fec_ini <=  @fFecFin
	WHERE	H.Cod_cia LIKE RTRIM(@CodCia) AND H.Cod_Cco LIKE RTRIM(@CodCco)
			AND H.Cod_Suc LIKE RTRIM(@CodSuc) 
			--( *1 ) AND H.Cod_Cl1 LIKE RTRIM(@CodCl1) 												
			--( *1 ) AND H.cod_cl2 LIKE RTRIM(@CodCl2) AND H.cod_cl3 LIKE RTRIM(@CodCl3) 
			--( *1 ) AND (H.fec_ret BETWEEN RTRIM(@fFecIni) AND RTRIM(@fFecFin) OR H.fec_ret IS NULL)
			AND (H.fec_ret IS NULL OR H.fec_ret>=@fFecIni) 	--( *1 )
	GROUP	BY E.cod_emp, H.cod_con;

	WITH TB1 (COD_EMP, CONT) AS
	(
		SELECT	V.COD_EMP, NULL
		FROM	GTH_RptEmplea AS V
		INNER	JOIN GTH_RequisicionEmp AS RE ON V.cod_emp = RE.cod_emp
		INNER 	JOIN GTH_Requisicion req ON RE.num_req = req.num_req 
		WHERE	RE.fec_citacion BETWEEN @fFecIni AND @fFecFin 
			AND req.Cod_cia LIKE RTRIM(@CodCia) 	--( *1 ) 
			AND req.Cod_Suc LIKE RTRIM(@CodSuc) 	--( *1 ) 
			AND req.Cod_Cco LIKE RTRIM(@CodCco) 	--( *1 ) 
		GROUP	BY V.cod_emp
	)

	INSERT	
	INTO	#cTblEmp
	SELECT	* 
	FROM	TB1
	WHERE	cod_emp NOT IN (SELECT cod_emp FROM #cTblEmp);
	
	-- Se selecciona estudios por cada empleado

	CREATE TABLE	#Estudio
	(
		codEmp CHAR(12) COLLATE DATABASE_DEFAULT, 
		TipEst CHAR(2) COLLATE DATABASE_DEFAULT, 
		DesEst CHAR(30) COLLATE DATABASE_DEFAULT, 
		NomEst CHAR(250) COLLATE DATABASE_DEFAULT
	);

	WITH Estudios
	AS
	(
		SELECT	EP.cod_emp, E.cod_est, E.fec_gra, C.niv_est_hom, EP.Niv_aca
		FROM	rhh_emplea AS EP
		INNER	JOIN rhh_tbclaest AS C ON EP.Niv_aca = C.tip_est
		LEFT	JOIN rhh_estudio AS E  ON EP.cod_emp = E.cod_emp
				AND E.gra_son = 1
		LEFT	JOIN rhh_tbestud AS TE ON E.cod_est = TE.cod_est
				AND TE.tip_est = EP.Niv_aca
		INNER JOIN #cTblEmp ON EP.cod_emp = #cTblEmp.cod_emp 			--( *1 )
		UNION
		SELECT	EP.cod_emp, E.cod_est, E.fec_gra, C.niv_est_hom, EP.Niv_aca
		FROM	GTH_RptEmplea AS EP
		INNER	JOIN rhh_tbclaest AS C ON EP.Niv_aca = C.tip_est
		LEFT	JOIN GTH_RptEstudio AS E ON EP.cod_emp = E.cod_emp
				AND E.gra_son = 1
		LEFT	JOIN rhh_tbestud AS TE ON E.cod_est = TE.cod_est	
				AND TE.tip_est = EP.Niv_aca	
		INNER JOIN #cTblEmp ON EP.cod_emp = #cTblEmp.cod_emp 			--( *1 )
		WHERE	EP.cod_emp NOT IN (SELECT cod_emp FROM rhh_emplea)
	),	
	Estudios2
	AS
	(
		SELECT	cod_emp, MAX(fec_gra) AS fec_gra
		FROM	Estudios
		GROUP	BY cod_emp
	),
	Nivel
	AS
	(
		SELECT	cod_emp, niv_est_hom
		FROM	Estudios
		GROUP	BY cod_emp, niv_est_hom
	)
	
	INSERT 
	INTO	#Estudio
	SELECT	E.cod_emp, N.niv_est_hom,
			CASE 
				WHEN N.niv_est_hom = 1 THEN 'Preescolar'
				WHEN N.niv_est_hom = 2 THEN 'Básica Primaria'
				WHEN N.niv_est_hom = 3 THEN 'Básica Secundaria'
				WHEN N.niv_est_hom = 4 THEN 'Media académica o clásica'
				WHEN N.niv_est_hom = 5 THEN 'Media Técnica'
				WHEN N.niv_est_hom = 6 THEN 'Normalista'
				WHEN N.niv_est_hom = 7 THEN 'Técnica Profesional'
				WHEN N.niv_est_hom = 8 THEN 'Tecnológica'
				WHEN N.niv_est_hom = 9 THEN 'Profesional'
				WHEN N.niv_est_hom = 10 THEN 'Especialización'
				WHEN N.niv_est_hom = 11 THEN 'Maestría'
				WHEN N.niv_est_hom = 12 THEN 'Doctorado'
				WHEN N.niv_est_hom = 13 THEN 'Ninguno'
			END AS des_est,
			IIF(TE.cod_est_hom = '0', '0 ', RTRIM(TE.cod_est_hom)) + ' ' + RTRIM(EH.des_est_hom) AS NomEst
	FROM	Estudios AS E
	LEFT	JOIN Estudios2 AS E2 ON E.cod_emp = E2.cod_emp
			AND E.fec_gra = E2.fec_gra
	INNER	JOIN Nivel AS N ON N.cod_emp = E.cod_emp
	LEFT	JOIN rhh_tbestud AS TE ON E.cod_est = TE.cod_est
	LEFT	JOIN rhh_esthom AS EH ON TE.cod_est_hom = EH.cod_est_hom
	LEFT	JOIN rhh_tbclaest AS C ON C.tip_est = E.Niv_aca
			AND N.niv_est_hom = C.niv_est_hom;


	CREATE TABLE #FormOfer 
	(
		ID			INT, 
		NOM_OFI		VARCHAR(500) COLLATE DATABASE_DEFAULT,
		TipDoc		CHAR(2) COLLATE DATABASE_DEFAULT, 
		num_ide		VARCHAR (15) COLLATE DATABASE_DEFAULT, 
		ap1_emp		VARCHAR (50) COLLATE DATABASE_DEFAULT, 
		ap2_emp		VARCHAR (50) COLLATE DATABASE_DEFAULT, 
		nom1_emp	VARCHAR (50) COLLATE DATABASE_DEFAULT, 
		nom2_emp	VARCHAR (50) COLLATE DATABASE_DEFAULT,
		fec_nac		DATETIME,
		sexo		CHAR (1) COLLATE DATABASE_DEFAULT,
		NivEduc		CHAR (33) COLLATE DATABASE_DEFAULT,	
		NuclForm	CHAR (250) COLLATE DATABASE_DEFAULT,
		Cargo		CHAR(260) COLLATE DATABASE_DEFAULT,
		EstCont		CHAR(30) COLLATE DATABASE_DEFAULT,
		FecIni		DATETIME,
		FecRet		DATETIME,
		salario		MONEY,
		NitEmpUsu	CHAR(16) COLLATE DATABASE_DEFAULT,
		Tiempo		INT,
		Obj_Cont	VARCHAR(200) COLLATE DATABASE_DEFAULT,
		cod_cont	INT
	);

	CREATE TABLE #Resultado
	(
		ID			INT, 
		NOM_OFI		VARCHAR(500) COLLATE DATABASE_DEFAULT,
		TipDoc		CHAR(2) COLLATE DATABASE_DEFAULT, 
		num_ide		VARCHAR (15) COLLATE DATABASE_DEFAULT, 
		ap1_emp		VARCHAR (50) COLLATE DATABASE_DEFAULT, 
		ap2_emp		VARCHAR (50) COLLATE DATABASE_DEFAULT, 
		nom1_emp	VARCHAR (50) COLLATE DATABASE_DEFAULT, 
		nom2_emp	VARCHAR (50) COLLATE DATABASE_DEFAULT,
		fec_nac		DATETIME,
		sexo		CHAR (1) COLLATE DATABASE_DEFAULT,
		NivEduc		CHAR (33) COLLATE DATABASE_DEFAULT,	
		NuclForm	CHAR (250) COLLATE DATABASE_DEFAULT,
		Cargo		CHAR(260) COLLATE DATABASE_DEFAULT,
		EstCont		CHAR(30) COLLATE DATABASE_DEFAULT,
		FecIni		DATETIME,
		FecRet		DATETIME,
		salario		MONEY,
		NitEmpUsu	CHAR(16) COLLATE DATABASE_DEFAULT,
		Tiempo		INT,
		Obj_Cont	VARCHAR(200) COLLATE DATABASE_DEFAULT,
		cod_cont	INT
	);
	
	INSERT 
	INTO	#FormOfer
	SELECT	ROW_NUMBER() OVER (ORDER BY TbE.cod_emp) AS ID, 
			CASE @CodSuc 
				WHEN '%' THEN 'P PRINCIPAL'
				ELSE 'S '+SC.nom_suc 
			END AS NOM_OFI, 			--( *1 ) 
			TI.tip_tip AS TipDoc, E.num_ide, E.ap1_emp, E.ap2_emp, E.nom1_emp, E.nom2_emp, 
			CONVERT(DATE,E.fec_nac) AS fec_nac, 
			CASE	
				WHEN E.sex_emp = 2 THEN 'M'
				ELSE 'F'
			END	AS sexo,
			RTRIM(ES.TipEst) + ' ' + RTRIM(ES.DesEst) AS NivEduc, RTRIM(ES.NomEst) AS NuclForm,
			RTRIM(CIUO.Cod_CIUO) + ' ' + RTRIM(CIUO.Des_CIUO) AS Cargo, '' AS EstCont,
			CONVERT(DATE,(SELECT MIN(hi.fec_ini) FROM rhh_hislab hi WHERE hi.nue_con = 1 AND hi.cod_emp = TbE.cod_emp AND hi.cod_con = CON.cod_con GROUP BY hi.cod_emp, hi.cod_con)) AS FecIni,
			CONVERT(DATE,(SELECT MAX(hi.fec_ret) FROM rhh_hislab hi WHERE (hi.fec_fin BETWEEN @fFecIni AND @fFecFin) AND hi.cod_emp = TbE.cod_emp AND hi.cod_con = CON.cod_con GROUP BY hi.cod_emp, hi.cod_con)) AS FecRet,
			dbo.fn_rhh_SueldoFch(TbE.cod_emp, @fFecFin, 2, 0) AS salario, RTRIM(CLI.nit_cli)+RTRIM(CLI.dig_ver) AS NitEmpUsu,
			dbo.fn_GTH_DiasContratado(CONVERT(DATE,(SELECT MIN(hi.fec_ini) FROM rhh_hislab hi WHERE hi.nue_con = 1 AND hi.cod_emp = TbE.cod_emp AND hi.cod_con = CON.cod_con GROUP BY hi.cod_emp, hi.cod_con)), 
			ISNULL(CONVERT(DATE,(SELECT MAX(hi.fec_ret) FROM rhh_hislab hi WHERE (hi.fec_fin BETWEEN @fFecIni AND @fFecFin) AND hi.cod_emp = TbE.cod_emp AND hi.cod_con = CON.cod_con GROUP BY hi.cod_emp, hi.cod_con)),@fFecFin)),
			RTRIM(RQ.cod_obj_cont) +' '+ RTRIM(OC.des_obj_cont) AS Obj_Cont, TbE.cod_cont
	FROM	#cTblEmp AS TbE
	INNER	JOIN GTH_Contratos AS CON ON TbE.cod_cont = CON.cod_con 
			AND TbE.cod_emp = CON.cod_emp AND CON.cod_pai LIKE RTRIM(@Pais) 
			AND CON.cod_dep LIKE RTRIM(@Depto) AND CON.cod_ciu LIKE RTRIM(@Ciudad)
	INNER	JOIN rhh_hislab AS HL ON TbE.cod_emp = HL.cod_emp AND TbE.cod_cont = HL.cod_con
			AND ((HL.fec_ini <= @fFecIni OR HL.fec_ini BETWEEN @fFecIni AND @fFecFin)
			AND (HL.fec_fin BETWEEN @fFecIni AND @fFecFin OR HL.fec_fin >= @fFecFin OR HL.fec_fin IS NULL))
	INNER	JOIN rhh_emplea AS E ON HL.cod_emp = E.cod_emp
	INNER	JOIN gen_tipide AS TI ON E.tip_ide = TI.cod_tip
	LEFT	JOIN #Estudio AS ES ON TbE.cod_emp = ES.codEmp
	INNER	JOIN rhh_cargos AS C ON C.cod_car = dbo.fn_rhh_CargoFch(TbE.cod_emp, ISNULL(HL.fec_fin, @fFecFin), 0)
	INNER	JOIN rhh_Convenio AS CONV ON CONV.cod_conv = dbo.fn_rhh_ConvEmp(TbE.cod_emp, ISNULL(HL.fec_fin, @fFecFin))
	LEFT	JOIN cxc_cliente AS CLI ON CONV.cod_cli = CLI.cod_cli
	--( *1 ) INNER	JOIN nom_vargen AS VG ON VG.num_var = 161
	INNER	JOIN gen_sucursal AS SC ON E.cod_suc = SC.cod_suc
	LEFT	JOIN GTH_ClasifIntOcuDet AS CIUO ON C.Cod_CIUO = CIUO.Cod_CIUO
	LEFT	JOIN GTH_Requisicion AS RQ ON E.num_req = RQ.num_req
	LEFT	JOIN GTH_RequisicionEmp AS RQE ON RQ.num_req = RQE.num_req 
			AND RQE.fec_citacion BETWEEN @fFecIni AND @fFecFin
	LEFT	JOIN GTH_Obj_Contrato AS OC ON RQ.cod_obj_cont = OC.cod_obj_cont
	WHERE	RTRIM(CLI.nit_cli) + RTRIM(CLI.dig_ver) != @NITCLI
	ORDER	BY TbE.cod_emp;

	INSERT 
	INTO	#FormOfer
	SELECT	ROW_NUMBER() OVER (ORDER BY TbE.cod_emp) AS ID, 
			CASE @CodSuc 
				WHEN '%' THEN 'P PRINCIPAL'
				ELSE 'S '+SC.nom_suc 
			END AS NOM_OFI, 				--( *1 ) 
			TI.tip_tip AS TipDoc, EC.num_ide, EC.ap1_emp, EC.ap2_emp, EC.nom1_emp, EC.nom2_emp, 
			CONVERT(DATE,EC.fec_nac) AS fec_nac, 
			CASE	
				WHEN EC.sex_emp = 2 THEN 'M'
				ELSE 'F'	
			END	AS sexo,
			RTRIM(ES.TipEst) + ' ' + RTRIM(ES.DesEst) AS NivEduc, RTRIM(ES.NomEst) AS NuclForm,
			RTRIM(CIUO.Cod_CIUO) + ' ' + RTRIM(CIUO.Des_CIUO) AS Cargo, '' AS EstCont, NULL, NULL, NULL,
			RTRIM(CLI.nit_cli)+RTRIM(CLI.dig_ver) AS NitEmpUsu, NULL, 
			RTRIM(RQ.cod_obj_cont) +' '+ RTRIM(OC.des_obj_cont) AS Obj_Cont, 0
	FROM	#cTblEmp AS TbE
	INNER	JOIN GTH_RptEmplea AS EC ON TbE.cod_emp = EC.cod_emp
			AND TbE.cod_cont IS NULL
	INNER	JOIN gen_tipide AS TI ON EC.tip_ide = TI.cod_tip
	LEFT	JOIN #Estudio AS ES ON TbE.cod_emp = ES.codEmp 
	INNER	JOIN GTH_RequisicionEmp AS RE ON TbE.cod_emp = RE.cod_emp
			AND TbE.cod_cont IS NULL AND fec_citacion BETWEEN @fFecIni AND @fFecFin
	INNER	JOIN GTH_Requisicion AS RQ ON RE.num_req = RQ.num_req
	INNER	JOIN rhh_Convenio AS CONV ON RQ.cod_conv = CONV.cod_conv
	LEFT	JOIN cxc_cliente AS CLI ON CONV.cod_cli = CLI.cod_cli
	INNER	JOIN rhh_cargos AS C ON RQ.car_sol = C.cod_car 
	--( *1 ) INNER	JOIN nom_vargen AS VG ON VG.num_var = 161	
	LEFT	JOIN GTH_CandPostCIUO AS CPCIUO ON EC.cod_emp = CPCIUO.cod_emp
	LEFT	JOIN GTH_ClasifIntOcuDet AS CIUO ON CPCIUO.cod_gru_CIUO = CIUO.cod_gru_CIUO
			AND CPCIUO.Cod_CIUO = CIUO.Cod_CIUO
	INNER	JOIN gen_sucursal AS SC ON RQ.cod_suc = SC.cod_suc
	LEFT	JOIN GTH_Obj_Contrato AS OC ON RQ.cod_obj_cont = OC.cod_obj_cont
	WHERE	RTRIM(CLI.nit_cli) + RTRIM(CLI.dig_ver) != @NITCLI
	ORDER	BY TbE.cod_emp;

	/*					--( *1 ) 
	INSERT
	INTO	#CandSC
	SELECT	num_ide
	FROM	#FormOfer
	GROUP	BY num_ide
	HAVING	COUNT(1)>1;

	SET @MIN = 1;
	SELECT @MAX = MAX(ID) FROM #CandSC;

	WHILE @MIN <= @MAX
	BEGIN
		SELECT	@CAND = cod_emp
		FROM	#CandSC
		WHERE	id = @MIN;

		DELETE	
		FROM	#FormOfer
		WHERE	num_ide = @CAND AND NitEmpUsu = '00';

		SET @MIN = @MIN + 1;
	END;
	*/
	DELETE FROM #FormOfer WHERE NitEmpUsu = '00';	--( *1 ) 

	INSERT
	INTO	#Resultado (ID, NOM_OFI, TipDoc,num_ide, ap1_emp, ap2_emp, nom1_emp, nom2_emp, fec_nac, sexo, 
			NivEduc, NuclForm, cod_cont)
	SELECT	ROW_NUMBER() OVER(ORDER	BY num_ide), NOM_OFI, TipDoc, num_ide, ap1_emp, ap2_emp, nom1_emp, nom2_emp, 
			fec_nac, sexo, NivEduc, NuclForm, cod_cont
	FROM	#FormOfer
	GROUP	BY NOM_OFI, TipDoc, num_ide, ap1_emp, ap2_emp, nom1_emp, nom2_emp, fec_nac, sexo, NivEduc, 
			NuclForm, cod_cont;

	UPDATE	#Resultado 
	SET		Cargo = F.Cargo, 
			FecRet = F.FecRet, 
			salario = F.salario, 
			NitEmpUsu = F.NitEmpUsu,
			Obj_Cont = F.Obj_Cont 
	FROM	#FormOfer AS F
	INNER	JOIN #Resultado AS R ON F.num_ide = R.num_ide
			AND F.NOM_OFI = R.NOM_OFI AND F.cod_cont = R.cod_cont;
	
	UPDATE	#Resultado 
	SET		FecIni = F.FecIni
	FROM	#FormOfer AS F
	INNER	JOIN #Resultado AS R ON F.num_ide = R.num_ide
			AND F.NOM_OFI = R.NOM_OFI AND F.cod_cont = R.cod_cont;

	WITH t1 (NOM_OFI, num_ide, cod_cont, tiempo) AS
	(
		SELECT	F.NOM_OFI, F.num_ide, F.cod_cont, F.Tiempo
		FROM	#FormOfer AS F
		INNER	JOIN #Resultado AS R ON F.num_ide = R.num_ide
				AND F.NOM_OFI = R.NOM_OFI AND F.cod_cont = R.cod_cont
		GROUP	BY F.num_ide, F.NOM_OFI, F.cod_cont, F.Tiempo
	),
	t2 (NOM_OFI, num_ide, cod_cont, tiempo) AS
	(
		SELECT	NOM_OFI, num_ide, cod_cont, SUM(ISNULL(Tiempo,0))	--( *1 ) 
		FROM	t1
		GROUP	BY num_ide, NOM_OFI, cod_cont
	)

	UPDATE	#Resultado 
	SET		Tiempo = F.Tiempo
	FROM	t2 AS F
	INNER	JOIN #Resultado AS R ON F.num_ide = R.num_ide
			AND F.NOM_OFI = R.NOM_OFI AND F.cod_cont = R.cod_cont;

	UPDATE	#Resultado
	SET		EstCont = 
			CASE
				WHEN  F.FecIni IS NULL AND f.FecRet IS NULL THEN '1. NO CONTRATADO'
				WHEN F.FecIni BETWEEN @fFecIni AND @fFecFin AND f.FecRet IS NULL THEN '2. INICIA CONTRATO' 
				ELSE 
				CASE 
					WHEN F.FecRet BETWEEN @fFecIni AND @fFecFin AND F.FecIni < @fFecIni THEN '3. TERMINA CONTRATO' 
					ELSE 
					CASE 
						WHEN (F.FecIni BETWEEN @fFecIni AND @fFecFin) AND (F.FecRet BETWEEN @fFecIni AND @fFecFin) 
						THEN '4. INICIA Y TERMINA CONTRATO' 
						ELSE '5. CONTRATO VIGENTE' 
					END 
				END 
			END
	FROM	#Resultado AS F;

	UPDATE	#Resultado
	SET		NuclForm = '0 No Aplica'
	WHERE	NivEduc IN ('1 Preescolar','2 Básica Primaria','3 Básica Secundaria','13 Ninguno');

	SELECT * FROM #Resultado;
END

```
