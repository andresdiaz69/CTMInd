# Stored Procedure: rs_gth_gth115

## Usa los objetos:
- [[gen_ccosto]]
- [[gen_ciudad]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_compania]]
- [[gen_sucursal]]
- [[gen_tipide]]
- [[GTH_Genero]]
- [[rhh_emplea]]

```sql

-- =============================================
-- Author:		Grace Niño
-- Create date: 31/07/2014
-- Description:	Visualización de la hoja de vida del empleado. 
-- =============================================
-- GKNINO 15/09/2014 Se adiciona instrucción de transacción. Además se reorganiza procedimiento.
-- AVELEZ 29/12/2014 Se realiza ajuste en el tamaño del campo nom_est de 30 por 50. SRS 2014-1073.
-- GKNINO 16/07/2015 Se aumenta la longitud del campo nom_est de 30 a 200 y del campo cod_ins de 4 a 10. SRS 2015-0550.

--EXEC rs_gth_gth115 '%','%','%','%','%','%','1013607011'
CREATE PROCEDURE [dbo].[rs_gth_gth115] 
	@cod_cia	CHAR(3) /*= '230288'*/,
	@cod_suc	CHAR(3),
	@cod_cco	CHAR(10),
	@cod_cl1	VARCHAR(12),
	@cod_cl2	VARCHAR(12),
	@cod_cl3	VARCHAR(12),
	@cod_emp	CHAR(12)
 	
AS
BEGIN
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	DECLARE @MAX		INT;
	DECLARE @MIN		INT;
	DECLARE @CcodEmp	CHAR(12);

	DECLARE @T_EMPLEA	TABLE
	(
		id			INT IDENTITY,
		cod_emp		CHAR(12) COLLATE DATABASE_DEFAULT
	);
	
	DECLARE @T_RESULTADO	TABLE
	(
		cod_cia		CHAR(3) COLLATE DATABASE_DEFAULT,
		nom_cia		VARCHAR(200) COLLATE DATABASE_DEFAULT,
		cod_suc		CHAR(3) COLLATE DATABASE_DEFAULT,
		nom_suc		VARCHAR(100) COLLATE DATABASE_DEFAULT,
		cod_cco		CHAR(10) COLLATE DATABASE_DEFAULT,
		nom_cco		VARCHAR(100) COLLATE DATABASE_DEFAULT,
		cod_cl1		VARCHAR(12) COLLATE DATABASE_DEFAULT,
		NOM_CL1		CHAR(40) COLLATE DATABASE_DEFAULT,
		cod_cl2		VARCHAR(12) COLLATE DATABASE_DEFAULT,
		NOM_CL2		CHAR(40) COLLATE DATABASE_DEFAULT,
		cod_cl3		VARCHAR(12) COLLATE DATABASE_DEFAULT,
		NOM_CL3		CHAR(40) COLLATE DATABASE_DEFAULT,
		cod_emp		CHAR(12) COLLATE DATABASE_DEFAULT,
		Nom_Emp		VARCHAR(200) COLLATE DATABASE_DEFAULT,
		tip_ide		CHAR(2) COLLATE DATABASE_DEFAULT,
		des_tip		CHAR(40) COLLATE DATABASE_DEFAULT,
		num_ide		VARCHAR(15) COLLATE DATABASE_DEFAULT,
		ciu_exp		CHAR(5) COLLATE DATABASE_DEFAULT,
		nom_ciu_doc	CHAR(30) COLLATE DATABASE_DEFAULT,
		sex_emp		CHAR(2) COLLATE DATABASE_DEFAULT,
		des_gen		VARCHAR(10) COLLATE DATABASE_DEFAULT,
		est_civ		CHAR(2) COLLATE DATABASE_DEFAULT,
		Des_EstCiv	VARCHAR(100) COLLATE DATABASE_DEFAULT,
		fec_nac		VARCHAR(10) COLLATE DATABASE_DEFAULT,
		cod_ciu		CHAR(5) COLLATE DATABASE_DEFAULT,
		nom_ciu_nac	CHAR(30) COLLATE DATABASE_DEFAULT,
		tel_res		VARCHAR(50) COLLATE DATABASE_DEFAULT,
		tel_cel		VARCHAR(50) COLLATE DATABASE_DEFAULT,
		dir_res		CHAR(100) COLLATE DATABASE_DEFAULT,
		e_mail		VARCHAR(100) COLLATE DATABASE_DEFAULT,
		num_lib		CHAR(12) COLLATE DATABASE_DEFAULT,
		fto_emp		VARBINARY(MAX),
		fec_ult_act	DATETIME
	);

	INSERT 
	INTO	@T_EMPLEA (cod_emp)
	SELECT	DISTINCT cod_emp
	FROM	rhh_emplea
	WHERE	cod_cia LIKE RTRIM(@cod_cia) AND cod_suc LIKE RTRIM(@cod_suc) AND cod_cco LIKE RTRIM(@cod_cco)
			AND cod_cl1 LIKE RTRIM(@cod_cl1) AND cod_cl2 LIKE RTRIM(@cod_cl2) AND cod_cl3 LIKE RTRIM(@cod_cl3)
			AND cod_emp LIKE RTRIM(@cod_emp);

	SELECT @MAX = COUNT(1) FROM @T_EMPLEA;
	SET @MIN = 1;

	WHILE @MIN <= @MAX
	BEGIN
		SELECT	@CcodEmp = cod_emp
		FROM	@T_EMPLEA
		WHERE	id = @MIN;

		INSERT 
		INTO	@T_RESULTADO (cod_cia, nom_cia, cod_suc, nom_suc, cod_cco, nom_cco, cod_cl1, NOM_CL1, cod_cl2, 
				NOM_CL2, cod_cl3, NOM_CL3, cod_emp, Nom_Emp, tip_ide, des_tip, num_ide, ciu_exp, nom_ciu_doc, sex_emp,
				des_gen, est_civ, Des_EstCiv, fec_nac, cod_ciu, nom_ciu_nac, tel_res, tel_cel, dir_res, e_mail, 
				num_lib, fto_emp, fec_ult_act)
		SELECT	DISTINCT E.cod_cia, C.nom_cia, E.cod_suc, S.nom_suc, E.cod_cco, CC.nom_cco, E.cod_cl1, 
				CL1.nombre AS NOM_CL1, E.cod_cl2, CL2.nombre AS NOM_CL2, E.cod_cl3, CL3.nombre AS NOM_CL3, E.cod_emp, 
				RTRIM(E.nom_emp) + ' ' + RTRIM(E.ap1_emp) + ' ' + RTRIM(E.ap2_emp) AS Nom_Emp, E.tip_ide, TI.des_tip, 
				E.num_ide, E.ciu_exp, C1.nom_ciu, CONVERT(CHAR,E.sex_emp), G.des_gen, CONVERT(CHAR,E.est_civ), 
				CASE CONVERT(CHAR, E.est_civ) WHEN '0' THEN 'Desconocido' WHEN '1' THEN 'Soltero' WHEN '2' THEN 'Casado' 
				WHEN '3' THEN 'Viudo' WHEN '4' THEN 'Separado' WHEN '5' THEN 'Unión libre' WHEN '6' THEN 'Religioso' 
				WHEN '7' THEN 'Otro' END AS Des_EstCiv, CONVERT(VARCHAR, E.fec_nac,103), E.cod_ciu, C2.nom_ciu AS nom_ciu_nac, 
				E.tel_res, E.tel_cel, E.dir_res, E.e_mail, E.num_lib, E.fto_emp, E.fec_ult_act
		FROM	rhh_emplea AS E 
		INNER	JOIN gen_tipide AS TI ON E.tip_ide = TI.cod_tip 
		INNER	JOIN gen_ciudad AS C1 ON E.pai_exp = C1.cod_pai
				AND E.dpt_exp = C1.cod_dep AND E.ciu_exp = C1.cod_ciu
		INNER	JOIN gen_ciudad AS C2 ON E.cod_pai = C2.cod_pai
				AND E.cod_dep = C2.cod_dep AND E.cod_ciu = C2.cod_ciu
		INNER	JOIN GTH_Genero AS G ON E.sex_emp = G.cod_gen 
		INNER	JOIN gen_compania AS C ON E.cod_cia = C.cod_cia 
		INNER	JOIN gen_sucursal AS S ON E.cod_suc = S.cod_suc 
		INNER	JOIN gen_ccosto AS CC ON E.cod_cco = CC.cod_cco 
		INNER	JOIN gen_clasif1 AS CL1 ON E.cod_cl1 = CL1.codigo 
		INNER	JOIN gen_clasif2 AS CL2 ON E.cod_cl2 = CL2.codigo 
		INNER	JOIN gen_clasif3 AS CL3 ON E.cod_cl3 = CL3.codigo
		WHERE	E.cod_cia LIKE RTRIM(@cod_cia) AND E.cod_suc LIKE RTRIM(@cod_suc) 
				AND E.cod_cco LIKE RTRIM(@cod_cco) AND E.cod_cl1 LIKE RTRIM(@cod_cl1) 
				AND E.cod_cl2 LIKE RTRIM(@cod_cl2) AND E.cod_cl3 LIKE RTRIM(@cod_cl3)
				AND E.cod_emp = RTRIM(@CcodEmp);

		SET @MIN = @MIN + 1;
	END

	SELECT * FROM @T_RESULTADO;
END

```
