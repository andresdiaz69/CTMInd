# Stored Procedure: rs_sst_indaccvsempNue

## Usa los objetos:
- [[cxc_cliente]]
- [[fn_rhh_Hislab_NumSec]]
- [[gth_accidente]]
- [[GTH_IndicadorDet]]
- [[GTH_IndicadoresGH]]
- [[GTH_IndicadorHistorico]]
- [[rhh_Convenio]]
- [[rhh_EmpConv]]
- [[rhh_emplea]]
- [[rhh_hislab]]

```sql

-- =============================================
-- Author:		Grace Niño
-- Create date: 05/08/2019
-- Description:	Indicador Accidentes Nueva Resolución 0312 2019.
-- =============================================

CREATE PROCEDURE [dbo].[rs_sst_indaccvsempNue]
	@cod_cia	CHAR(3) = NULL,
	@cod_cli	VARCHAR(15) = NULL,
	@cod_conv	VARCHAR(15) = NULL,
	@cod_suc	CHAR(3) = NULL,
	@cod_cco	CHAR(10) = NULL,
	@cod_cl1	VARCHAR(12) = NULL,
	@cod_cl2	VARCHAR(12) = NULL,
	@cod_cl3	VARCHAR(12) = NULL,
	@cod_cl4	VARCHAR(12) = NULL,
	@cod_cl5	VARCHAR(12) = NULL,
	@cod_cl6	VARCHAR(12) = NULL,
	@cod_cl7	VARCHAR(12) = NULL,
	@cod_area	VARCHAR(12) = NULL,
	@anio		CHAR(4) = NULL,
	@CodInd		INT = NULL,
	@Mod		CHAR(2) = NULL,
	@Apl		CHAR(3) = NULL,
	@Hist		INT = NULL,
	@Cons		INT = NULL,
	@FecCte		DATETIME

-- WITH ENCRYPTION 
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	DECLARE @MES	INT;
	DECLARE @FECI	DATETIME;
	DECLARE @FECF	DATETIME;
	DECLARE @CANT	INT;
	DECLARE @MESF	INT;

	DECLARE @IND TABLE
	(
		ID		INT IDENTITY,
		NOM		VARCHAR(500),
		ENE		DECIMAL(5,2),
		FEB		DECIMAL(5,2),
		MAR		DECIMAL(5,2),
		ABR		DECIMAL(5,2),
		MAY		DECIMAL(5,2),
		JUN		DECIMAL(5,2),
		JUL		DECIMAL(5,2),
		AGO		DECIMAL(5,2),
		SEP		DECIMAL(5,2),
		OCT		DECIMAL(5,2),
		NOV		DECIMAL(5,2),
		DIC		DECIMAL(5,2),
		TOT		DECIMAL(5,2)
	);

	IF (@Hist = 1)
	BEGIN
		SELECT	@FecCte = fec_fin
		FROM	GTH_IndicadorHistorico
		WHERE	cod_apl = @Apl AND cod_mod = @Mod
				AND cod_ind = @CodInd AND anio = @anio
				AND cons = @Cons;
	END

	;WITH MESESACC AS (
	SELECT	CASE 
				WHEN MONTH(A.fecha) = '01' THEN 'SI'
			END AS ENE,
			CASE 
				WHEN MONTH(A.fecha) = '02' THEN 'SI'
			END AS FEB,
			CASE 
				WHEN MONTH(A.fecha) = '03' THEN 'SI'
			END AS MAR,
			CASE 
				WHEN MONTH(A.fecha) = '04' THEN 'SI'
			END AS ABR,
			CASE 
				WHEN MONTH(A.fecha) = '05' THEN 'SI'
			END AS MAY,
			CASE 
				WHEN MONTH(A.fecha) = '06' THEN 'SI'
			END AS JUN,
			CASE 
				WHEN MONTH(A.fecha) = '07' THEN 'SI'
			END AS JUL,
			CASE 
				WHEN MONTH(A.fecha) = '08' THEN 'SI'
			END AS AGO,
			CASE 
				WHEN MONTH(A.fecha) = '09' THEN 'SI'
			END AS SEP,
			CASE 
				WHEN MONTH(A.fecha) = '10' THEN 'SI'
			END AS OCT,
			CASE 
				WHEN MONTH(A.fecha) = '11' THEN 'SI'
			END AS NOV,
			CASE 
				WHEN MONTH(A.fecha) = '12' THEN 'SI'
			END AS DIC
	FROM	gth_accidente AS A
	INNER	JOIN rhh_emplea AS E ON A.cod_emp = E.cod_emp
	INNER	JOIN rhh_hislab AS H ON E.cod_emp = H.cod_emp
			AND H.num_sec = dbo.fn_rhh_Hislab_NumSec(E.cod_emp, A.fecha, 0 , 0)
	LEFT	JOIN rhh_EmpConv AS EC ON H.cod_emp = EC.cod_emp
			AND (EC.fec_fin >= A.fecha OR EC.fec_fin IS NULL)
			AND EC.fec_ini <= A.fecha
	LEFT	JOIN rhh_Convenio AS CV ON EC.cod_conv = CV.cod_conv
			AND CV.cod_cli LIKE RTRIM(@cod_cli) AND EC.cod_conv LIKE RTRIM(@cod_conv) 
	LEFT	JOIN cxc_cliente AS CL ON CV.cod_cli = CL.cod_cli
	WHERE	A.fecha <= @FecCte AND YEAR(A.fecha) = @anio
			AND H.cod_cia LIKE RTRIM(@cod_cia) AND H.cod_suc LIKE RTRIM(@cod_suc) 
			AND H.cod_cco LIKE RTRIM(@cod_cco) AND H.cod_cl1 LIKE RTRIM(@cod_cl1)
			AND H.cod_cl2 LIKE RTRIM(@cod_cl2) AND H.cod_cl3 LIKE RTRIM(@cod_cl3)
			AND H.cod_cl4 LIKE RTRIM(@cod_cl4) AND H.cod_cl5 LIKE RTRIM(@cod_cl5)
			AND H.cod_cl6 LIKE RTRIM(@cod_cl6) AND H.cod_cl7 LIKE RTRIM(@cod_cl7)
			AND H.cod_area LIKE RTRIM(@cod_area)
			AND A.ind_obj = 0
	),	
	AGRUPARACC
	AS
	(
		SELECT	COUNT(ENE) AS ENE, COUNT(FEB) AS FEB, COUNT(MAR) AS MAR, COUNT(ABR) AS ABR, COUNT(MAY) AS MAY,
				COUNT(JUN) AS JUN, COUNT(JUL) AS JUL, COUNT(AGO) AS AGO, COUNT(SEP) AS SEP, COUNT(OCT) AS OCT,
				COUNT(NOV) AS NOV, COUNT(DIC) AS DIC
		FROM	MESESACC
	)

	INSERT
	INTO	@IND (NOM, ENE, FEB, MAR, ABR, MAY, JUN, JUL, AGO, SEP, OCT, NOV, DIC)
	SELECT	'Número de Accidentes de Trabajo que se presentaron en el mes',
			ISNULL(ENE,0), ISNULL(FEB,0), ISNULL(MAR,0), ISNULL(ABR,0), ISNULL(MAY,0), ISNULL(JUN,0),
			ISNULL(JUL,0), ISNULL(AGO,0), ISNULL(SEP,0), ISNULL(OCT,0), ISNULL(NOV,0), ISNULL(DIC,0)
	FROM	AGRUPARACC;

	UPDATE	@IND
	SET		TOT = ENE + FEB + MAR + ABR + MAY + JUN + JUL + AGO + SEP + OCT + NOV + DIC
	WHERE	ID = 1;

	SET @MES = 1;

	IF (@anio = YEAR(@FecCte))
	BEGIN
		SET @MESF = CONVERT(INT,MONTH(@FecCte));
	END
	ELSE IF (@anio > YEAR(@FecCte))
	BEGIN
		SET @MESF = 0;
	END
	ELSE
	BEGIN
		SET @MESF = 12;
	END

	INSERT
	INTO	@IND (NOM)
	SELECT	'Número de Trabajadores en el mes';

	WHILE @MES <= @MESF
	BEGIN
		SET @FECI = CONVERT(DATETIME, @anio+IIF(LEN(@MES) = 1, '0'+CONVERT(CHAR(1),@MES),CONVERT(CHAR(2),@MES))+'01');
		SET @FECF = EOMONTH(@FECI);

		IF (@Hist = 1)
		BEGIN
			IF (CONVERT(INT,MONTH(@FecCte)) = @MES)
			BEGIN
				SET @FECF = @FecCte;
			END
		END

		;WITH MESESEMP AS (
		SELECT	E.cod_emp AS EMP
		FROM	rhh_emplea AS E
		INNER	JOIN rhh_hislab AS H ON E.cod_emp = H.cod_emp
		LEFT	JOIN rhh_EmpConv AS EC ON H.cod_emp = EC.cod_emp
				AND (EC.fec_fin <= @FECF OR EC.fec_fin IS NULL)
				AND EC.fec_ini <= @FECI
		LEFT	JOIN rhh_Convenio AS CV ON EC.cod_conv = CV.cod_conv
				AND CV.cod_cli LIKE RTRIM(@cod_cli) AND EC.cod_conv LIKE RTRIM(@cod_conv) 
		LEFT	JOIN cxc_cliente AS CL ON CV.cod_cli = CL.cod_cli
		WHERE	(H.fec_ini <= @FECI OR H.fec_ini <= @FECF)
				AND (H.fec_fin >= @FECF OR H.fec_fin IS NULL)
				AND H.cod_cia LIKE RTRIM(@cod_cia) AND H.cod_suc LIKE RTRIM(@cod_suc) 
				AND H.cod_cco LIKE RTRIM(@cod_cco) AND H.cod_cl1 LIKE RTRIM(@cod_cl1)
				AND H.cod_cl2 LIKE RTRIM(@cod_cl2) AND H.cod_cl3 LIKE RTRIM(@cod_cl3)
				AND H.cod_cl4 LIKE RTRIM(@cod_cl4) AND H.cod_cl5 LIKE RTRIM(@cod_cl5)
				AND H.cod_cl6 LIKE RTRIM(@cod_cl6) AND H.cod_cl7 LIKE RTRIM(@cod_cl7)
				AND H.cod_area LIKE RTRIM(@cod_area)
		GROUP	BY E.cod_emp),	
		AGRUPAREMP
		AS
		(
			SELECT	COUNT(EMP) AS EMP
			FROM	MESESEMP
		)

		SELECT	@CANT = EMP
		FROM	AGRUPAREMP;
		
		IF(@MES = 1)
		BEGIN
			UPDATE	@IND
			SET		ENE = @CANT
			WHERE	ID = 2;
		END
		IF(@MES = 2)
		BEGIN
			UPDATE	@IND
			SET		FEB = @CANT
			WHERE	ID = 2;
		END
		IF(@MES = 3)
		BEGIN
			UPDATE	@IND
			SET		MAR = @CANT
			WHERE	ID = 2;
		END
		IF(@MES = 4)
		BEGIN
			UPDATE	@IND
			SET		ABR = @CANT
			WHERE	ID = 2;
		END
		IF(@MES = 5)
		BEGIN
			UPDATE	@IND
			SET		MAY = @CANT
			WHERE	ID = 2;
		END
		IF(@MES = 6)
		BEGIN
			UPDATE	@IND
			SET		JUN = @CANT
			WHERE	ID = 2;
		END
		IF(@MES = 7)
		BEGIN
			UPDATE	@IND
			SET		JUL = @CANT
			WHERE	ID = 2;
		END
		IF(@MES = 8)
		BEGIN
			UPDATE	@IND
			SET		AGO = @CANT
			WHERE	ID = 2;
		END
		IF(@MES = 9)
		BEGIN
			UPDATE	@IND
			SET		SEP = @CANT
			WHERE	ID = 2;
		END
		IF(@MES = 10)
		BEGIN
			UPDATE	@IND
			SET		OCT = @CANT
			WHERE	ID = 2;
		END
		IF(@MES = 11)
		BEGIN
			UPDATE	@IND
			SET		NOV = @CANT
			WHERE	ID = 2;
		END
		IF(@MES = 12)
		BEGIN
			UPDATE	@IND
			SET		DIC = @CANT
			WHERE	ID = 2;
		END

		SET @MES = @MES + 1;
	END

	UPDATE	@IND
	SET		TOT = (ISNULL(ENE,0) + ISNULL(FEB,0) + ISNULL(MAR,0) + ISNULL(ABR,0) + ISNULL(MAY,0) + ISNULL(JUN,0) + ISNULL(JUL,0) + ISNULL(AGO,0) + ISNULL(SEP,0) + ISNULL(OCT,0) + ISNULL(NOV,0) + ISNULL(DIC,0))/12
	WHERE	ID = 2;

	INSERT
	INTO	@IND
	SELECT	'Por cada 100 Trabajadores que laboraron en el mes se presentaron la siguiente cantidad de accidentes de trabajo:', 
			IIF(IP.ENE = 0, 0, (IE.ENE/IP.ENE)*100) AS ENE, IIF(IP.FEB = 0, 0, (IE.FEB/IP.FEB)*100) AS FEB, 
			IIF(IP.MAR = 0, 0, (IE.MAR/IP.MAR)*100) AS MAR, IIF(IP.ABR = 0, 0, (IE.ABR/IP.ABR)*100) AS ABR,
			IIF(IP.MAY = 0, 0, (IE.MAY/IP.MAY)*100) AS MAY, IIF(IP.JUN = 0, 0, (IE.JUN/IP.JUN)*100) AS JUN,
			IIF(IP.JUL = 0, 0, (IE.JUL/IP.JUL)*100) AS JUL, IIF(IP.AGO = 0, 0, (IE.AGO/IP.AGO)*100) AS AGO,
			IIF(IP.SEP = 0, 0, (IE.SEP/IP.SEP)*100) AS SEP, IIF(IP.OCT = 0, 0, (IE.OCT/IP.OCT)*100) AS OCT,
			IIF(IP.NOV = 0, 0, (IE.NOV/IP.NOV)*100) AS NOV, IIF(IP.DIC = 0, 0, (IE.DIC/IP.DIC)*100) AS DIC,
			IIF(IP.TOT = 0, 0, (IE.TOT/IP.TOT)*100) AS TOT
	FROM	@IND AS IP
	INNER	JOIN @IND AS IE ON IP.ID = 2 AND IE.ID = 1;

	IF (@Hist = 0)
	BEGIN
		SELECT	IND.cod_ind, IND.nom_ind, IND.tip_ind, IND.met_ind, IND.def_ind, IND.fte_ind, IND.uni_med, 
				ID.per_ind, ID.pers_enc, ID.lim_ind, ID.int_ind, I.ID, I.NOM, I.ENE, I.FEB, I.MAR, I.ABR,
				I.MAY, I.JUN, I.JUL, I.AGO, I.SEP, I.OCT, I.NOV, I.DIC, I.TOT, '' AS ANA_IND
		FROM	@IND AS I
		INNER	JOIN GTH_IndicadoresGH AS IND ON IND.cod_apl = @Apl
				AND IND.cod_mod = @Mod AND IND.cod_ind = @CodInd
		LEFT	JOIN GTH_IndicadorDet AS ID ON IND.cod_apl = ID.cod_apl
				AND IND.cod_mod = ID.cod_mod AND IND.cod_ind = ID.cod_ind
				AND ID.anio = @anio;
	END
	ELSE
	BEGIN
		SELECT	IND.cod_ind, IND.nom_ind, IND.tip_ind, IND.met_ind, IND.def_ind, IND.fte_ind, IND.uni_med, 
				ID.per_ind, ID.pers_enc, ID.lim_ind, ID.int_ind, I.ID, I.NOM, I.ENE, I.FEB, I.MAR, I.ABR,
				I.MAY, I.JUN, I.JUL, I.AGO, I.SEP, I.OCT, I.NOV, I.DIC, I.TOT, HIS.ana_graf
		FROM	@IND AS I
		INNER	JOIN GTH_IndicadoresGH AS IND ON IND.cod_apl = @Apl
				AND IND.cod_mod = @Mod AND IND.cod_ind = @CodInd
		INNER	JOIN GTH_IndicadorDet AS ID ON IND.cod_apl = ID.cod_apl
				AND IND.cod_mod = ID.cod_mod AND IND.cod_ind = ID.cod_ind
				AND ID.anio = @anio
		INNER	JOIN GTH_IndicadorHistorico AS HIS ON IND.cod_apl = HIS.cod_apl
				AND IND.cod_mod = HIS.cod_mod AND IND.cod_ind = HIS.cod_ind
				AND ID.anio = HIS.anio AND HIS.cons = @Cons;
	END
END

```
