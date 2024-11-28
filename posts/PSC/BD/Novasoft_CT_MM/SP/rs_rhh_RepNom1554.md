# Stored Procedure: rs_rhh_RepNom1554

## Usa los objetos:
- [[cxc_cliente]]
- [[gen_ciudad]]
- [[gen_deptos]]
- [[gen_paises]]
- [[gen_sucursal]]
- [[gen_tipide]]
- [[GTH_ClasifIntOcuDet]]
- [[GTH_Requisicion]]
- [[rhh_cargos]]
- [[rhh_CiiuConv]]
- [[rhh_Convenio]]
- [[rhh_tbclaest]]
- [[rhh_tbestud]]
- [[sis_empresa]]

```sql

-- ========================================================
-- Author:		David Galindo
-- Create date: Mayo de 2013
-- Description:	MINISTERIO DE TRABAJO: FORMATO DE REQUISICION
-- ========================================================
-- GKNINO 02/10/2015 Se modifica consulta donde se cambian algunos campos según SRS 2015-0852.
-- Jorge Diaz 2019.09.02 ( *1 )
-- 	. Se quitó 2do insert de registros que adicionaba empleados de la tabla rhh_EmpConv
--	. Se cambió campo fijo NOM_OFI='BOGOTA' para que muestre la sucursal de la requisicion
--	. Se asegura que los candidatos se filtren por cia,suc,cco segun requisicion
--	. Se quitaron filtros por clasificadores porque no aplica en el uso del reporte

-- exec rs_rhh_repnom1554 '2019',1,'%','%','%','%','BOG','%'

CREATE PROCEDURE [dbo].[rs_rhh_RepNom1554]
		@AnoRep		CHAR(4)='2019',	-- Año
		@Trimes		CHAR(1)='1',	-- Trimestre: 1=01/ene a 31/mar 2=01/abr a 30/jun 3=01/jul a 30/sep 4=01/oct a 31/dic
		@Pais		CHAR(3)='057',	-- Pais requicision personal
		@Depto		CHAR(2)='11',	-- Depto requicision personal
		@Ciudad		CHAR(5)='11001',-- Ciudad requicision personal
		@CodCia		CHAR(3)='%',	-- Compañia
		@CodSuc		CHAR(3)='%',	-- Sucursal
		@CodCco		CHAR(10) = '%'	-- Ccosto
--WITH ENCRYPTION   	
AS
BEGIN

	DECLARE	@CFI	CHAR(8) = RTRIM(@AnoRep)+	CASE @Trimes	WHEN	1	THEN	'0101'
																WHEN	2	THEN	'0401'
																WHEN	3	THEN	'0701'
																WHEN	4	THEN	'1001'
												END;
											
	DECLARE @CFF	CHAR(8) = RTRIM(@AnoRep)+	CASE @Trimes	WHEN	1	THEN	'0331'
																WHEN	2	THEN	'0630'
																WHEN	3	THEN	'0930'
																WHEN	4	THEN	'1231'
												END;

	DECLARE @fFecIni DATETIME = CONVERT(DATE,RTRIM(@CFI));
	DECLARE @fFecFin DATETIME = CONVERT(DATE,RTRIM(@CFF));
	DECLARE @NITCLI CHAR(16);

	CREATE TABLE #Resultado
	(
		ID			INT IDENTITY,
		NoIdent		CHAR(15) COLLATE DATABASE_DEFAULT,
		Tipoident	CHAR(2) COLLATE DATABASE_DEFAULT,
		RazonSocial	VARCHAR(100) COLLATE DATABASE_DEFAULT,
		Departam	CHAR(200) COLLATE DATABASE_DEFAULT,
		Municipio	CHAR(200) COLLATE DATABASE_DEFAULT,
		Tamano		CHAR(50) COLLATE DATABASE_DEFAULT,
		Actividad	VARCHAR(100) COLLATE DATABASE_DEFAULT,
		FechaReq	DATETIME,
		CargoReq	NVARCHAR(1500) COLLATE DATABASE_DEFAULT,
		ReqReg		TINYINT,
		SalOfrecido	MONEY,
		Sexo		CHAR(1) COLLATE DATABASE_DEFAULT,
		NivEdu		CHAR(100) COLLATE DATABASE_DEFAULT,
		Cubiertas	INT,
		NOM_OFI		VARCHAR(500) COLLATE DATABASE_DEFAULT
	);

	SELECT @NITCLI = REPLACE(RTRIM(REPLACE(emp_nit,'.','')),'-','') FROM sis_empresa;

	INSERT
	INTO	#Resultado
	SELECT	DISTINCT RTRIM(CL.nit_cli) + RTRIM(CL.dig_ver), RTRIM(I.tip_tip), RTRIM(CL.nom_cli), 
			RTRIM(D.cod_dep) +' - '+ RTRIM(D.nom_dep), RTRIM(CI.cod_ciu) +' - '+ RTRIM(CI.nom_ciu),
			CASE 
				WHEN  C.num_emp < 10 THEN '1 Menos de 10 empleados' 
				WHEN  C.num_emp BETWEEN 10 AND 50 THEN '2 De 10 a 50 empleados'
				WHEN  C.num_emp BETWEEN 51 AND 199 THEN '3 De 51 a 199 empleados'
				WHEN  C.num_emp BETWEEN 200 AND 499 THEN '4 De 200 a 499 empleados'
				WHEN  C.num_emp > 500  THEN '5 De 500 o mas empleados'
			END,
			RTRIM(CII.cod_ciiu) +' '+ RTRIM(CII.descripcion), R.fec_sol,
			RTRIM(CIUO.Cod_CIUO) +' '+ RTRIM(CIUO.Des_CIUO), R.can_sol, R.min_sal,
			CASE 
				WHEN R.sex_asp = 2 THEN 'M'
				ELSE 'F'
			END,
			RTRIM(CE.niv_est_hom) +' '+ 
			CASE 
				WHEN CE.niv_est_hom = 1 THEN 'Preescolar'
				WHEN CE.niv_est_hom = 2 THEN 'Básica Primaria'
				WHEN CE.niv_est_hom = 3 THEN 'Básica Secundaria'
				WHEN CE.niv_est_hom = 4 THEN 'Media académica o clásica'
				WHEN CE.niv_est_hom = 5 THEN 'Media Técnica'
				WHEN CE.niv_est_hom = 6 THEN 'Normalista'
				WHEN CE.niv_est_hom = 7 THEN 'Técnica Profesional'
				WHEN CE.niv_est_hom = 8 THEN 'Tecnológica'
				WHEN CE.niv_est_hom = 9 THEN 'Profesional'
				WHEN CE.niv_est_hom = 10 THEN 'Especialización'
				WHEN CE.niv_est_hom = 11 THEN 'Maestría'
				WHEN CE.niv_est_hom = 12 THEN 'Doctorado'
				WHEN CE.niv_est_hom = 13 THEN 'Ninguno'
			END AS des_est, RTRIM(ISNULL(R.can_cont,0)), 
			CASE @CodSuc 
				WHEN '%' THEN 'P PRINCIPAL'
				ELSE 'S '+SC.nom_suc 
			END AS NOM_OFI 			--( *1 ) 			
	FROM	GTH_Requisicion AS R
	INNER	JOIN gen_paises AS P ON P.cod_pai = R.cod_pai
	INNER	JOIN rhh_Convenio AS C ON C.cod_conv = R.cod_conv
	INNER	JOIN gen_ciudad AS CI ON CI.cod_ciu = R.cod_ciu 
			AND CI.cod_dep = R.cod_dep AND CI.cod_pai = R.cod_pai
	INNER	JOIN gen_deptos AS D ON D.cod_pai = R.cod_pai 
			AND D.cod_dep = R.cod_dep
	INNER	JOIN rhh_cargos AS CA ON CA.cod_car = R.car_sol
	INNER	JOIN rhh_tbclaest AS CE ON CA.niv_aca = CE.tip_est
	INNER	JOIN rhh_tbestud AS TE ON TE.tip_est = CE.tip_est
	INNER	JOIN cxc_cliente AS CL ON CL.cod_cli = C.cod_cli
	INNER	JOIN gen_tipide AS I ON CL.tip_ide = I.cod_tip
	INNER	JOIN rhh_CiiuConv AS CII ON CII.cod_ciiu = CL.cod_act
	LEFT	JOIN GTH_ClasifIntOcuDet AS CIUO ON CA.Cod_CIUO = CIUO.Cod_CIUO
	INNER	JOIN gen_sucursal AS SC ON R.cod_suc = SC.cod_suc
	WHERE	R.cod_cia LIKE RTRIM(@CodCia) 		--( *1 )
			AND R.cod_suc LIKE RTRIM(@CodSuc)	--( *1 )
			AND	R.cod_cco LIKE RTRIM(@CodCco) 	--( *1 )
			AND R.cod_pai LIKE RTRIM(@Pais)
			AND R.cod_dep LIKE RTRIM(@Depto)
			AND R.cod_ciu LIKE RTRIM(@Ciudad)   
			AND R.fec_sol BETWEEN RTRIM(@fFecIni) AND RTRIM(@fFecFin)
			AND R.cod_cli IS NOT NULL
			AND RTRIM(CL.nit_cli) + RTRIM(CL.dig_ver) != @NITCLI
			AND R.cod_est IN ('04','05','07');

	/*  	--( *1 )
	INSERT
	INTO	#Resultado
	SELECT	DISTINCT RTRIM(CL.nit_cli) + RTRIM(CL.dig_ver), RTRIM(I.tip_tip), RTRIM(CL.nom_cli), 
			RTRIM(D.cod_dep) +' - '+ RTRIM(D.nom_dep), RTRIM(CI.cod_ciu) +' - '+ RTRIM(CI.nom_ciu),
			CASE 
				WHEN  C.num_emp < 10 THEN '1 Menos de 10 empleados' 
				WHEN  C.num_emp BETWEEN 10 AND 50 THEN '2 De 10 a 50 empleados'
				WHEN  C.num_emp BETWEEN 51 AND 199 THEN '3 De 51 a 199 empleados'
				WHEN  C.num_emp BETWEEN 200 AND 499 THEN '4 De 200 a 499 empleados'
				WHEN  C.num_emp > 500  THEN '5 De 500 o mas empleados'
			END,
			RTRIM(CII.cod_ciiu) +' '+ RTRIM(CII.descripcion), @fFecIni,
			RTRIM(CIUO.Cod_CIUO) +' '+ RTRIM(CIUO.Des_CIUO), 0, 0, RTRIM('M'),
			'3 Básica Secundaria', 0, 'BOGOTA'
	FROM	rhh_EmpConv AS EC
	INNER	JOIN rhh_emplea AS E ON EC.cod_emp = E.cod_emp
	INNER	JOIN rhh_Convenio AS C ON C.cod_conv = EC.cod_conv
	INNER	JOIN cxc_cliente AS CL ON CL.cod_cli = C.cod_cli
	INNER	JOIN gen_paises AS P ON P.cod_pai = CL.cod_pai	
	INNER	JOIN gen_ciudad AS CI ON CI.cod_ciu = CL.cod_ciu 
			AND CI.cod_dep = CL.cod_dep AND CI.cod_pai = CL.cod_pai
	INNER	JOIN gen_deptos AS D ON D.cod_pai = CL.cod_pai 
			AND D.cod_dep = CL.cod_dep
	INNER	JOIN gen_tipide AS I ON CL.tip_ide = I.cod_tip
	INNER	JOIN rhh_CiiuConv AS CII ON CII.cod_ciiu = CL.cod_act
	INNER	JOIN nom_vargen AS VG ON VG.num_var = 161
	INNER	JOIN GTH_ClasifIntOcuDet AS CIUO ON CIUO.Cod_CIUO = '4132'
	WHERE	E.cod_cia LIKE RTRIM(@CodCia)
			AND	C.cod_suc LIKE RTRIM(@CodSuc)
			AND	C.cod_cco LIKE RTRIM(@CodCco) 
			AND	C.Cod_Cl1 LIKE RTRIM(@CodCl1)
			AND	C.cod_cl2 LIKE RTRIM(@CodCl2)
			AND	C.Cod_Cl3 LIKE RTRIM(@CodCl3)
			AND CL.cod_pai LIKE RTRIM(@Pais)
			AND CL.cod_dep LIKE RTRIM(@Depto)
			AND CL.cod_ciu LIKE RTRIM(@Ciudad)   
			AND E.est_lab NOT IN ('00','99')
			AND ((EC.fec_ini <= @fFecIni AND EC.fec_fin >= @fFecFin)
			OR EC.fec_fin IS NULL)
			AND RTRIM(CL.nit_cli) + RTRIM(CL.dig_ver) != @NITCLI
			AND CL.nit_cli NOT IN (SELECT NoIdent FROM #Resultado);
	*/
	
	
	SELECT	ID, RTRIM(NoIdent) AS NoIdent, RTRIM(Tipoident) AS Tipoident, RTRIM(RazonSocial) AS RazonSocial,
			RTRIM(Departam) AS Departam, RTRIM(Municipio) AS Municipio, RTRIM(Tamano) AS Tamano, 
			RTRIM(Actividad) AS Actividad, FechaReq, RTRIM(CargoReq) AS CargoReq, ReqReg, SalOfrecido, 
			RTRIM(Sexo) AS Sexo, RTRIM(NivEdu) AS NivEdu, Cubiertas, RTRIM(NOM_OFI) AS NOM_OFI
	FROM	#Resultado
	ORDER	BY ID;

	DROP TABLE #Resultado;
END

```
