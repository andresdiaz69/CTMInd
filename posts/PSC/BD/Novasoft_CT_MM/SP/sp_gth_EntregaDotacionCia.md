# Stored Procedure: sp_gth_EntregaDotacionCia

## Usa los objetos:
- [[fn_GTH_HisLab_NumSec]]
- [[fn_rhh_fchIng]]
- [[fn_rhh_VG]]
- [[gen_subtipodoc]]
- [[gen_sucursal]]
- [[GTH_Dotacion]]
- [[GTH_DotaEle]]
- [[GTH_DotaEmplea]]
- [[GTH_DotaInventario]]
- [[GTH_DotaTallaEmplea]]
- [[GTH_FormaEntrDota]]
- [[GTH_Genero]]
- [[GTH_Periodicidad]]
- [[GTH_TipEntElemDota]]
- [[gth_vargen]]
- [[inv_acum]]
- [[inv_inf_inv]]
- [[inv_items]]
- [[inv_param_cnt]]
- [[inv_sucur]]
- [[inv_tallas]]
- [[rhh_EmpConv]]
- [[rhh_emplea]]
- [[rhh_hislab]]
- [[sis_aplicacion]]
- [[sp_gen_afecon_linea_proc]]
- [[sp_gen_afeinv_proc]]
- [[sp_inv_afecon]]

```sql

-- =============================================
-- Author:		Grace Niño
-- Create date: 30/05/2014
-- Description:	Entrega de Dotación Masivo
-- =============================================

CREATE PROCEDURE [dbo].[sp_gth_EntregaDotacionCia]
	@cod_cia	CHAR(3),
	@cod_suc	CHAR(3),
	@cod_cco	CHAR(10),
	@cod_cl1	VARCHAR(12) = '%',
	@cod_cl2	VARCHAR(12) = '%',
	@cod_cl3	VARCHAR(12) = '%',
	@cod_car	CHAR(8),
	@ele_dot	CHAR(5),
	@cod_emp	CHAR(12),
	@tip_ent	INT,
	@fec_ent	DATETIME,
	@cod_for	CHAR(2),
	@suc_bog	CHAR(3) = NULL, --GEN_SUCURSAL
	@bodega		CHAR(3) = NULL, --INV_BODEGAS
	@cod_ter	CHAR(15) = NULL, --gen_terceros
	@cod_con	CHAR(3) = NULL --inv_conceptos	

--WITH ENCRYTPION 
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	DECLARE @MAX		INT;
	DECLARE @MIN		INT;
	DECLARE @Emp		CHAR(12);
	DECLARE @cod_ele	CHAR(5);
	DECLARE @des_for	VARCHAR(50);
	DECLARE	@cod_per	CHAR(2);
	DECLARE @dia_int	INT;
	DECLARE @max_fec	DATETIME;
	DECLARE	@VarInv		CHAR(100);
	DECLARE @VarSal		CHAR(100);
	DECLARE @VarTpo		CHAR(100);
	DECLARE @VarSubTip	CHAR(100);
	DECLARE @Num_Doc	CHAR(14);
	DECLARE	@Fec_Doc	DATETIME = GETDATE();
	DECLARE @Anio_Doc	CHAR(4) = YEAR(@Fec_Doc);
	DECLARE @Per_Doc	CHAR(2) = RIGHT('0'+LTRIM(RTRIM(CONVERT(CHAR,MONTH(@Fec_Doc)))),2);
	DECLARE @tip_con	SMALLINT = 0;
	DECLARE @indentfis	BIT;
	DECLARE @asig_num	CHAR(14);
	DECLARE @MxReg		INT;

	CREATE TABLE #T_Dota
	(
		ID			INT IDENTITY,
		COD_EMP		CHAR(12) COLLATE DATABASE_DEFAULT,
		COD_ELE		CHAR(5) COLLATE DATABASE_DEFAULT,
		TALLA		CHAR(4) COLLATE DATABASE_DEFAULT,
		COD_ITEM	VARCHAR(40) COLLATE DATABASE_DEFAULT,
		CANTIDAD	INT,
		COD_GEN		INT
	);

	CREATE TABLE #T_ValidaDota
	(
		ID			INT IDENTITY,
		COD_ITEM	VARCHAR(40) COLLATE DATABASE_DEFAULT,
		CANT_SOL	INT,
		SALD_BOD	INT
	);
	
	SELECT	@des_for = des_for, @indentfis = ind_ent_fis
	FROM	GTH_FormaEntrDota
	WHERE	cod_for = @cod_for;

	SELECT	@VarInv = val_var
	FROM	gth_vargen
	WHERE	num_var = 14;

	SELECT	@VarSal = val_var
	FROM	gth_vargen
	WHERE	num_var = 15;

	SELECT	@VarTpo = val_var
	FROM	gth_vargen
	WHERE	num_var = 17;

	IF EXISTS (SELECT * FROM sis_aplicacion WHERE cod_apl = 'INV' AND ind_ins = 1) AND
		(@VarInv = 'SI') AND (@indentfis = 1)
	BEGIN
		;WITH PERIODO_ELE AS
		(
			SELECT	D.cod_ele, E.cod_emp, D.cod_peri, P.dia_int
			FROM	GTH_Dotacion AS D
			INNER	JOIN rhh_emplea AS E ON D.cod_car = E.cod_car
			INNER	JOIN GTH_Periodicidad AS P ON D.cod_peri = P.cod_peri
			WHERE	D.cod_car LIKE RTRIM(@cod_car) AND D.cod_ele LIKE RTRIM(@cod_ele)
					AND E.cod_emp LIKE RTRIM(@cod_emp)
		),
		PERIODO_DIAS AS
		(
			SELECT	P.cod_ele, P.cod_emp, P.cod_peri, P.dia_int, MAX(DE.fec_entrega) AS fec_max
			FROM	GTH_DotaEmplea AS DE
			INNER	JOIN PERIODO_ELE AS P ON DE.cod_ele = P.cod_ele
					AND DE.cod_emp = P.cod_emp
			GROUP	BY P.cod_ele, P.cod_emp, P.cod_peri, P.dia_int
		)

		SELECT	cod_ele, cod_emp, cod_peri, dia_int, fec_max
		INTO	#PERIODO_DIAS
		FROM	PERIODO_DIAS;

		IF (ISNULL(@VarSal, 'SI') = 'SI') AND (ISNULL(@VarTpo, 'SI') = 'SI')
		BEGIN
			INSERT 
			INTO	#T_Dota (COD_EMP, COD_ELE, TALLA, COD_ITEM, CANTIDAD, COD_GEN)
			SELECT	H.cod_emp, D.cod_ele, TD.Talla, DI.cod_item, D.cantidad, E.sex_emp
			FROM	rhh_emplea AS E 
			INNER	JOIN rhh_hislab AS H ON H.cod_emp = E.cod_emp 
					AND H.num_sec = dbo.fn_GTH_HisLab_NumSec(E.cod_emp)
			INNER	JOIN GTH_DotaTallaEmplea AS TD ON H.cod_emp = TD.cod_emp
			INNER	JOIN GTH_Dotacion AS D ON H.cod_car = D.cod_car 
					AND TD.cod_ele = D.cod_ele
			INNER	JOIN GTH_DotaInventario AS DI ON TD.cod_ele = DI.cod_ele
			INNER	JOIN inv_items AS I ON DI.cod_item = I.cod_item
					AND ((TD.Talla = I.cod_talla) OR I.cod_talla = '0')
					AND ((E.sex_emp = I.cod_gen) OR (I.cod_gen = 0))
					AND I.ind_dota = 1
			WHERE	H.cod_cia LIKE RTRIM(@cod_cia) AND H.cod_suc LIKE RTRIM(@cod_suc) 
					AND H.cod_cco LIKE RTRIM(@cod_cco) AND H.cod_cl1 LIKE RTRIM(@cod_cl1) 
					AND H.cod_cl2 LIKE RTRIM(@cod_cl2) AND H.cod_cl3 LIKE RTRIM(@cod_cl3)
					AND H.cod_car LIKE RTRIM(@cod_car) AND H.cod_emp LIKE RTRIM(@cod_emp) 
					AND E.est_lab NOT IN ('00','99') AND H.cod_emp NOT IN (SELECT cod_emp FROM rhh_EmpConv)
					AND D.cod_ele LIKE RTRIM(@ele_dot) AND E.sal_bas <= (CONVERT(MONEY, dbo.fn_rhh_VG(60, @Fec_Doc)) * 2)
					AND DATEDIFF(DAY, dbo.fn_rhh_fchIng(E.cod_emp, @Fec_Doc), @Fec_Doc) > 120
					AND ((@tip_ent = 3 AND H.cod_emp NOT IN (SELECT D.cod_emp FROM GTH_DotaEmplea AS D
							INNER JOIN #PERIODO_DIAS AS P ON D.cod_ele = P.cod_ele AND D.cod_emp = P.cod_emp
							AND D.fec_entrega = P.fec_max AND (P.fec_max + P.dia_int) >= @fec_ent))
					OR (@tip_ent = 1 AND H.cod_emp NOT IN (SELECT cod_emp FROM GTH_DotaEmplea WHERE tip_ent = 1))
					OR @tip_ent = 2);
			
			INSERT 
			INTO	#T_Dota (COD_EMP, COD_ELE, TALLA, COD_ITEM, CANTIDAD, COD_GEN)
			SELECT	H.cod_emp, D.cod_ele, TD.Talla, NULL, D.cantidad, E.sex_emp
			FROM	rhh_emplea AS E 
			INNER	JOIN rhh_hislab AS H ON H.cod_emp = E.cod_emp 
					AND H.num_sec = dbo.fn_GTH_HisLab_NumSec(E.cod_emp)
			INNER	JOIN GTH_DotaTallaEmplea AS TD ON H.cod_emp = TD.cod_emp
			INNER	JOIN GTH_Dotacion AS D ON H.cod_car = D.cod_car 
					AND TD.cod_ele = D.cod_ele
			INNER	JOIN GTH_DotaInventario AS DI ON TD.cod_ele = DI.cod_ele
			WHERE	H.cod_cia LIKE RTRIM(@cod_cia) AND H.cod_suc LIKE RTRIM(@cod_suc) 
					AND H.cod_cco LIKE RTRIM(@cod_cco) AND H.cod_cl1 LIKE RTRIM(@cod_cl1) 
					AND H.cod_cl2 LIKE RTRIM(@cod_cl2) AND H.cod_cl3 LIKE RTRIM(@cod_cl3)
					AND H.cod_car LIKE RTRIM(@cod_car) AND H.cod_emp LIKE RTRIM(@cod_emp) 
					AND E.est_lab NOT IN ('00','99') AND H.cod_emp NOT IN (SELECT cod_emp FROM rhh_EmpConv)
					AND D.cod_ele LIKE RTRIM(@ele_dot) AND E.sal_bas <= (CONVERT(MONEY, dbo.fn_rhh_VG(60, @Fec_Doc)) * 2)
					AND DATEDIFF(DAY, dbo.fn_rhh_fchIng(E.cod_emp, @Fec_Doc), @Fec_Doc) > 120
					AND ((@tip_ent = 3 AND H.cod_emp NOT IN (SELECT D.cod_emp FROM GTH_DotaEmplea AS D
							INNER JOIN #PERIODO_DIAS AS P ON D.cod_ele = P.cod_ele AND D.cod_emp = P.cod_emp
							AND D.fec_entrega = P.fec_max AND (P.fec_max + P.dia_int) >= @fec_ent))
					OR (@tip_ent = 1 AND H.cod_emp NOT IN (SELECT cod_emp FROM GTH_DotaEmplea WHERE tip_ent = 1))
					OR @tip_ent = 2)
					AND RTRIM(H.cod_emp)+RTRIM(D.cod_ele)+RTRIM(TD.Talla)+RTRIM(D.cantidad)+RTRIM(E.sex_emp) NOT IN
					(SELECT RTRIM(COD_EMP)+RTRIM(COD_ELE)+RTRIM(TALLA)+RTRIM(CANTIDAD)+RTRIM(COD_GEN) FROM #T_Dota)
			GROUP	BY H.cod_emp, D.cod_ele, TD.Talla, D.cantidad, E.sex_emp;
		END
		ELSE IF (ISNULL(@VarSal, 'SI') = 'NO') AND (ISNULL(@VarTpo, 'SI') = 'SI')
		BEGIN
			INSERT 
			INTO	#T_Dota (COD_EMP, COD_ELE, TALLA, COD_ITEM, CANTIDAD, COD_GEN)
			SELECT	H.cod_emp, D.cod_ele, TD.Talla, DI.cod_item, D.cantidad, E.sex_emp
			FROM	rhh_emplea AS E 
			INNER	JOIN rhh_hislab AS H ON H.cod_emp = E.cod_emp 
					AND H.num_sec = dbo.fn_GTH_HisLab_NumSec(E.cod_emp)
			INNER	JOIN GTH_DotaTallaEmplea AS TD ON H.cod_emp = TD.cod_emp
			INNER	JOIN GTH_Dotacion AS D ON H.cod_car = D.cod_car 
					AND TD.cod_ele = D.cod_ele
			INNER	JOIN GTH_DotaInventario AS DI ON TD.cod_ele = DI.cod_ele
			INNER	JOIN inv_items AS I ON DI.cod_item = I.cod_item
					AND ((TD.Talla = I.cod_talla) OR I.cod_talla = '0')
					AND ((E.sex_emp = I.cod_gen) OR (I.cod_gen = 0))
					AND I.ind_dota = 1
			WHERE	H.cod_cia LIKE RTRIM(@cod_cia) AND H.cod_suc LIKE RTRIM(@cod_suc) 
					AND H.cod_cco LIKE RTRIM(@cod_cco) AND H.cod_cl1 LIKE RTRIM(@cod_cl1) 
					AND H.cod_cl2 LIKE RTRIM(@cod_cl2) AND H.cod_cl3 LIKE RTRIM(@cod_cl3)
					AND H.cod_car LIKE RTRIM(@cod_car) AND H.cod_emp LIKE RTRIM(@cod_emp) 
					AND E.est_lab NOT IN ('00','99') AND H.cod_emp NOT IN (SELECT cod_emp FROM rhh_EmpConv)
					AND D.cod_ele LIKE RTRIM(@ele_dot)
					AND DATEDIFF(DAY, dbo.fn_rhh_fchIng(E.cod_emp, @Fec_Doc), @Fec_Doc) > 120
					AND ((@tip_ent = 3 AND H.cod_emp NOT IN (SELECT D.cod_emp FROM GTH_DotaEmplea AS D
							INNER JOIN #PERIODO_DIAS AS P ON D.cod_ele = P.cod_ele AND D.cod_emp = P.cod_emp
							AND D.fec_entrega = P.fec_max AND (P.fec_max + P.dia_int) >= @fec_ent))
					OR (@tip_ent = 1 AND H.cod_emp NOT IN (SELECT cod_emp FROM GTH_DotaEmplea WHERE tip_ent = 1))
					OR @tip_ent = 2);

			INSERT 
			INTO	#T_Dota (COD_EMP, COD_ELE, TALLA, COD_ITEM, CANTIDAD, COD_GEN)
			SELECT	H.cod_emp, D.cod_ele, TD.Talla, NULL, D.cantidad, E.sex_emp
			FROM	rhh_emplea AS E 
			INNER	JOIN rhh_hislab AS H ON H.cod_emp = E.cod_emp 
					AND H.num_sec = dbo.fn_GTH_HisLab_NumSec(E.cod_emp)
			INNER	JOIN GTH_DotaTallaEmplea AS TD ON H.cod_emp = TD.cod_emp
			INNER	JOIN GTH_Dotacion AS D ON H.cod_car = D.cod_car 
					AND TD.cod_ele = D.cod_ele
			INNER	JOIN GTH_DotaInventario AS DI ON TD.cod_ele = DI.cod_ele
			WHERE	H.cod_cia LIKE RTRIM(@cod_cia) AND H.cod_suc LIKE RTRIM(@cod_suc) 
					AND H.cod_cco LIKE RTRIM(@cod_cco) AND H.cod_cl1 LIKE RTRIM(@cod_cl1) 
					AND H.cod_cl2 LIKE RTRIM(@cod_cl2) AND H.cod_cl3 LIKE RTRIM(@cod_cl3)
					AND H.cod_car LIKE RTRIM(@cod_car) AND H.cod_emp LIKE RTRIM(@cod_emp) 
					AND E.est_lab NOT IN ('00','99') AND H.cod_emp NOT IN (SELECT cod_emp FROM rhh_EmpConv)
					AND D.cod_ele LIKE RTRIM(@ele_dot)
					AND DATEDIFF(DAY, dbo.fn_rhh_fchIng(E.cod_emp, @Fec_Doc), @Fec_Doc) > 120
					AND ((@tip_ent = 3 AND H.cod_emp NOT IN (SELECT D.cod_emp FROM GTH_DotaEmplea AS D
							INNER JOIN #PERIODO_DIAS AS P ON D.cod_ele = P.cod_ele AND D.cod_emp = P.cod_emp
							AND D.fec_entrega = P.fec_max AND (P.fec_max + P.dia_int) >= @fec_ent))
					OR (@tip_ent = 1 AND H.cod_emp NOT IN (SELECT cod_emp FROM GTH_DotaEmplea WHERE tip_ent = 1))
					OR @tip_ent = 2)
					AND RTRIM(H.cod_emp)+RTRIM(D.cod_ele)+RTRIM(TD.Talla)+RTRIM(D.cantidad)+RTRIM(E.sex_emp) NOT IN
					(SELECT RTRIM(COD_EMP)+RTRIM(COD_ELE)+RTRIM(TALLA)+RTRIM(CANTIDAD)+RTRIM(COD_GEN) FROM #T_Dota)
			GROUP	BY H.cod_emp, D.cod_ele, TD.Talla, D.cantidad, E.sex_emp;
		END
		ELSE IF (ISNULL(@VarSal, 'SI') = 'SI') AND (ISNULL(@VarTpo, 'SI') = 'NO')
		BEGIN
			INSERT 
			INTO	#T_Dota (COD_EMP, COD_ELE, TALLA, COD_ITEM, CANTIDAD, COD_GEN)
			SELECT	H.cod_emp, D.cod_ele, TD.Talla, DI.cod_item, D.cantidad, E.sex_emp
			FROM	rhh_emplea AS E 
			INNER	JOIN rhh_hislab AS H ON H.cod_emp = E.cod_emp 
					AND H.num_sec = dbo.fn_GTH_HisLab_NumSec(E.cod_emp)
			INNER	JOIN GTH_DotaTallaEmplea AS TD ON H.cod_emp = TD.cod_emp
			INNER	JOIN GTH_Dotacion AS D ON H.cod_car = D.cod_car 
					AND TD.cod_ele = D.cod_ele
			INNER	JOIN GTH_DotaInventario AS DI ON TD.cod_ele = DI.cod_ele
			INNER	JOIN inv_items AS I ON DI.cod_item = I.cod_item
					AND ((TD.Talla = I.cod_talla) OR I.cod_talla = '0')
					AND ((E.sex_emp = I.cod_gen) OR (I.cod_gen = 0))
					AND I.ind_dota = 1
			WHERE	H.cod_cia LIKE RTRIM(@cod_cia) AND H.cod_suc LIKE RTRIM(@cod_suc) 
					AND H.cod_cco LIKE RTRIM(@cod_cco) AND H.cod_cl1 LIKE RTRIM(@cod_cl1) 
					AND H.cod_cl2 LIKE RTRIM(@cod_cl2) AND H.cod_cl3 LIKE RTRIM(@cod_cl3)
					AND H.cod_car LIKE RTRIM(@cod_car) AND H.cod_emp LIKE RTRIM(@cod_emp) 
					AND E.est_lab NOT IN ('00','99') AND H.cod_emp NOT IN (SELECT cod_emp FROM rhh_EmpConv)
					AND D.cod_ele LIKE RTRIM(@ele_dot) AND E.sal_bas <= (CONVERT(MONEY, dbo.fn_rhh_VG(60, @Fec_Doc)) * 2)
					AND ((@tip_ent = 3 AND H.cod_emp NOT IN (SELECT D.cod_emp FROM GTH_DotaEmplea AS D
							INNER JOIN #PERIODO_DIAS AS P ON D.cod_ele = P.cod_ele AND D.cod_emp = P.cod_emp
							AND D.fec_entrega = P.fec_max AND (P.fec_max + P.dia_int) >= @fec_ent))
					OR (@tip_ent = 1 AND H.cod_emp NOT IN (SELECT cod_emp FROM GTH_DotaEmplea WHERE tip_ent = 1))
					OR @tip_ent = 2);

			INSERT 
			INTO	#T_Dota (COD_EMP, COD_ELE, TALLA, COD_ITEM, CANTIDAD, COD_GEN)
			SELECT	H.cod_emp, D.cod_ele, TD.Talla, NULL, D.cantidad, E.sex_emp
			FROM	rhh_emplea AS E 
			INNER	JOIN rhh_hislab AS H ON H.cod_emp = E.cod_emp 
					AND H.num_sec = dbo.fn_GTH_HisLab_NumSec(E.cod_emp)
			INNER	JOIN GTH_DotaTallaEmplea AS TD ON H.cod_emp = TD.cod_emp
			INNER	JOIN GTH_Dotacion AS D ON H.cod_car = D.cod_car 
					AND TD.cod_ele = D.cod_ele
			INNER	JOIN GTH_DotaInventario AS DI ON TD.cod_ele = DI.cod_ele
			WHERE	H.cod_cia LIKE RTRIM(@cod_cia) AND H.cod_suc LIKE RTRIM(@cod_suc) 
					AND H.cod_cco LIKE RTRIM(@cod_cco) AND H.cod_cl1 LIKE RTRIM(@cod_cl1) 
					AND H.cod_cl2 LIKE RTRIM(@cod_cl2) AND H.cod_cl3 LIKE RTRIM(@cod_cl3)
					AND H.cod_car LIKE RTRIM(@cod_car) AND H.cod_emp LIKE RTRIM(@cod_emp) 
					AND E.est_lab NOT IN ('00','99') AND H.cod_emp NOT IN (SELECT cod_emp FROM rhh_EmpConv)
					AND D.cod_ele LIKE RTRIM(@ele_dot) AND E.sal_bas <= (CONVERT(MONEY, dbo.fn_rhh_VG(60, @Fec_Doc)) * 2)
					AND ((@tip_ent = 3 AND H.cod_emp NOT IN (SELECT D.cod_emp FROM GTH_DotaEmplea AS D
							INNER JOIN #PERIODO_DIAS AS P ON D.cod_ele = P.cod_ele AND D.cod_emp = P.cod_emp
							AND D.fec_entrega = P.fec_max AND (P.fec_max + P.dia_int) >= @fec_ent))
					OR (@tip_ent = 1 AND H.cod_emp NOT IN (SELECT cod_emp FROM GTH_DotaEmplea WHERE tip_ent = 1))
					OR @tip_ent = 2)
					AND RTRIM(H.cod_emp)+RTRIM(D.cod_ele)+RTRIM(TD.Talla)+RTRIM(D.cantidad)+RTRIM(E.sex_emp) NOT IN
					(SELECT RTRIM(COD_EMP)+RTRIM(COD_ELE)+RTRIM(TALLA)+RTRIM(CANTIDAD)+RTRIM(COD_GEN) FROM #T_Dota)
			GROUP	BY H.cod_emp, D.cod_ele, TD.Talla, D.cantidad, E.sex_emp;
		END
		ELSE
		BEGIN
			INSERT 
			INTO	#T_Dota (COD_EMP, COD_ELE, TALLA, COD_ITEM, CANTIDAD, COD_GEN)
			SELECT	H.cod_emp, D.cod_ele, TD.Talla, DI.cod_item, D.cantidad, E.sex_emp
			FROM	rhh_emplea AS E 
			INNER	JOIN rhh_hislab AS H ON H.cod_emp = E.cod_emp 
					AND H.num_sec = dbo.fn_GTH_HisLab_NumSec(E.cod_emp)
			INNER	JOIN GTH_DotaTallaEmplea AS TD ON H.cod_emp = TD.cod_emp
			INNER	JOIN GTH_Dotacion AS D ON H.cod_car = D.cod_car 
					AND TD.cod_ele = D.cod_ele
			INNER	JOIN GTH_DotaInventario AS DI ON TD.cod_ele = DI.cod_ele
			INNER	JOIN inv_items AS I ON DI.cod_item = I.cod_item
					AND ((TD.Talla = I.cod_talla) OR I.cod_talla = '0')
					AND ((E.sex_emp = I.cod_gen) OR (I.cod_gen = 0))
					AND I.ind_dota = 1
			WHERE	H.cod_cia LIKE RTRIM(@cod_cia) AND H.cod_suc LIKE RTRIM(@cod_suc) 
					AND H.cod_cco LIKE RTRIM(@cod_cco) AND H.cod_cl1 LIKE RTRIM(@cod_cl1) 
					AND H.cod_cl2 LIKE RTRIM(@cod_cl2) AND H.cod_cl3 LIKE RTRIM(@cod_cl3)
					AND H.cod_car LIKE RTRIM(@cod_car) AND H.cod_emp LIKE RTRIM(@cod_emp) 
					AND E.est_lab NOT IN ('00','99') AND H.cod_emp NOT IN (SELECT cod_emp FROM rhh_EmpConv)
					AND D.cod_ele LIKE RTRIM(@ele_dot)
					AND ((@tip_ent = 3 AND H.cod_emp NOT IN (SELECT D.cod_emp FROM GTH_DotaEmplea AS D
							INNER JOIN #PERIODO_DIAS AS P ON D.cod_ele = P.cod_ele AND D.cod_emp = P.cod_emp
							AND D.fec_entrega = P.fec_max AND (P.fec_max + P.dia_int) >= @fec_ent))
					OR (@tip_ent = 1 AND H.cod_emp NOT IN (SELECT cod_emp FROM GTH_DotaEmplea WHERE tip_ent = 1))
					OR @tip_ent = 2);

			INSERT 
			INTO	#T_Dota (COD_EMP, COD_ELE, TALLA, COD_ITEM, CANTIDAD, COD_GEN)
			SELECT	H.cod_emp, D.cod_ele, TD.Talla, NULL, D.cantidad, E.sex_emp
			FROM	rhh_emplea AS E 
			INNER	JOIN rhh_hislab AS H ON H.cod_emp = E.cod_emp 
					AND H.num_sec = dbo.fn_GTH_HisLab_NumSec(E.cod_emp)
			INNER	JOIN GTH_DotaTallaEmplea AS TD ON H.cod_emp = TD.cod_emp
			INNER	JOIN GTH_Dotacion AS D ON H.cod_car = D.cod_car 
					AND TD.cod_ele = D.cod_ele
			INNER	JOIN GTH_DotaInventario AS DI ON TD.cod_ele = DI.cod_ele
			WHERE	H.cod_cia LIKE RTRIM(@cod_cia) AND H.cod_suc LIKE RTRIM(@cod_suc) 
					AND H.cod_cco LIKE RTRIM(@cod_cco) AND H.cod_cl1 LIKE RTRIM(@cod_cl1) 
					AND H.cod_cl2 LIKE RTRIM(@cod_cl2) AND H.cod_cl3 LIKE RTRIM(@cod_cl3)
					AND H.cod_car LIKE RTRIM(@cod_car) AND H.cod_emp LIKE RTRIM(@cod_emp) 
					AND E.est_lab NOT IN ('00','99') AND H.cod_emp NOT IN (SELECT cod_emp FROM rhh_EmpConv)
					AND D.cod_ele LIKE RTRIM(@ele_dot)
					AND ((@tip_ent = 3 AND H.cod_emp NOT IN (SELECT D.cod_emp FROM GTH_DotaEmplea AS D
							INNER JOIN #PERIODO_DIAS AS P ON D.cod_ele = P.cod_ele AND D.cod_emp = P.cod_emp
							AND D.fec_entrega = P.fec_max AND (P.fec_max + P.dia_int) >= @fec_ent))
					OR (@tip_ent = 1 AND H.cod_emp NOT IN (SELECT cod_emp FROM GTH_DotaEmplea WHERE tip_ent = 1))
					OR @tip_ent = 2)
					AND RTRIM(H.cod_emp)+RTRIM(D.cod_ele)+RTRIM(TD.Talla)+RTRIM(D.cantidad)+RTRIM(E.sex_emp) NOT IN
					(SELECT RTRIM(COD_EMP)+RTRIM(COD_ELE)+RTRIM(TALLA)+RTRIM(CANTIDAD)+RTRIM(COD_GEN) FROM #T_Dota)
			GROUP	BY H.cod_emp, D.cod_ele, TD.Talla, D.cantidad, E.sex_emp;
		END
		DROP TABLE #PERIODO_DIAS;

		BEGIN TRY
			BEGIN TRANSACTION
				
				;WITH CANTIDADES AS
				(
					SELECT	DISTINCT D.COD_ITEM, I.ttun12
					FROM	#T_Dota AS D
					INNER	JOIN inv_acum AS I ON D.COD_ITEM = I.cod_item
							AND I.cod_suc = @suc_bog AND I.cod_bod = @bodega
							AND I.ano_acu = @Anio_Doc
				)

				INSERT
				INTO	#T_ValidaDota
				SELECT	DISTINCT D.COD_ITEM, SUM(D.CANTIDAD) OVER (PARTITION BY D.COD_ITEM ORDER BY D.COD_ITEM),
						I.ttun12
				FROM	#T_Dota AS D
				INNER	JOIN CANTIDADES AS I ON D.COD_ITEM = I.cod_item;

				SELECT	@VarSubTip = RTRIM(val_var)
				FROM	gth_vargen
				WHERE	num_var = 16;
				
				IF NOT EXISTS (SELECT * FROM gen_subtipodoc WHERE cod_sub = @VarSubTip AND cod_tip = '011')
				BEGIN
					RAISERROR ('El Subtipo no es de tipo Salida de Inventario, revise la variable general No 16.', 16, 1);
					RETURN;
				END

				;WITH Num_Doc AS
				(
					SELECT	fec_entrega, num_doc_inv AS NUM
					FROM	GTH_DotaEmplea
					WHERE	YEAR(fec_entrega) = @Anio_Doc AND MONTH(fec_entrega) = @Per_Doc
					GROUP	BY fec_entrega, num_doc_inv
				)

				SELECT	@Num_Doc = MAX(NUM)
				FROM	Num_Doc;

				SET @Num_Doc = ISNULL(@Num_Doc,0) + 1;
				
				IF NOT EXISTS (SELECT COD_ITEM FROM #T_ValidaDota WHERE ISNULL(SALD_BOD, 0) < ISNULL(CANT_SOL, 0))
						AND (SELECT COUNT(1) FROM #T_Dota WHERE COD_ITEM IS NULL) = 0 AND (SELECT COUNT(1) FROM #T_ValidaDota) > 0
				BEGIN
					SELECT @MxReg = ISNULL(MAX(reg_doc),0) FROM inv_inf_inv WHERE 
					ano_doc = @Anio_Doc AND per_doc = @Per_Doc AND sub_tip = @VarSubTip
					AND tip_doc = '011' AND num_doc = @Num_Doc AND  cod_ter = @cod_ter
					
					--SELECT	@Anio_Doc, @Per_Doc, @VarSubTip, '011', @Num_Doc, 
					--		(ROW_NUMBER() OVER (ORDER BY D.COD_EMP)) + 1 , @Fec_Doc, @suc_bog,
					--		H.cod_cco, H.cod_cl1, H.cod_cl2, H.cod_cl3, '00', 'Entrega Masiva de Dotaciones', 

					SELECT @MxReg

					INSERT
					INTO	inv_inf_inv (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, fecha, cod_suc, cod_cco, cod_cl1,
							cod_cl2, cod_cl3, ind_mp, obs_orc, descrip_cue, bodega, item, cantidad, asig_num, cod_ter, pai_doc,
							dep_doc, ciu_doc, cos_uni, cos_unai, cod_con)
					SELECT	@Anio_Doc, @Per_Doc, @VarSubTip, '011', @Num_Doc, 
							@MxReg + 1 , @Fec_Doc, @suc_bog,
							H.cod_cco, H.cod_cl1, H.cod_cl2, H.cod_cl3, '00', 'Entrega Masiva de Dotaciones', 
							I.des_item, @bodega, D.COD_ITEM, D.CANTIDAD, 1, @cod_ter, S.cod_pai, S.cod_dep, S.cod_ciu,
							SI.cos_pro, SI.cos_pra, @cod_con
					FROM	#T_Dota AS D 
					INNER	JOIN rhh_emplea AS E ON D.COD_EMP = E.cod_emp
					INNER	JOIN rhh_hislab AS H ON E.cod_emp = H.cod_emp
							AND H.num_sec = dbo.fn_GTH_HisLab_NumSec(E.cod_emp)
					INNER	JOIN inv_items AS I ON D.COD_ITEM = I.cod_item
							AND I.ind_dota = 1
					INNER	JOIN gen_sucursal AS S ON S.cod_suc = @suc_bog
					INNER	JOIN inv_sucur AS SI ON S.cod_suc = SI.cod_suc
							AND SI.cod_bod = @bodega AND SI.cod_item = D.COD_ITEM;

					SELECT @MAX = COUNT(1) FROM #T_Dota;
					SET @MIN = 1;

					WHILE @MIN < = @MAX
					BEGIN
						SELECT	@Emp = COD_EMP, @cod_ele = COD_ELE
						FROM	#T_Dota
						WHERE	ID = @MIN;

						IF (@tip_ent = 1)
						BEGIN
							IF NOT EXISTS (SELECT cod_emp FROM GTH_DotaEmplea WHERE cod_emp = @Emp AND cod_ele = @cod_ele AND (tip_ent = @tip_ent OR tip_ent IS NULL))
							BEGIN
								INSERT 
								INTO	GTH_DotaEmplea (cod_emp, cod_ele, talla, fec_entrega, cod_for, tip_ent, cantidad, num_doc_inv)
								SELECT	COD_EMP, COD_ELE, TALLA, @fec_ent, @cod_for, @tip_ent, CANTIDAD, @Num_Doc
								FROM	#T_Dota
								WHERE	COD_EMP = @Emp AND COD_ELE = @cod_ele;
							END
							ELSE
							BEGIN
								DELETE 
								FROM	#T_Dota 
								WHERE	COD_EMP = @Emp AND COD_ELE = @cod_ele;
							END
						END
						IF (@tip_ent = 3)
						BEGIN
							SELECT	@cod_per = D.cod_peri 
							FROM	GTH_Dotacion AS D
							INNER	JOIN rhh_emplea AS E ON D.cod_car = E.cod_car
							WHERE	D.cod_ele = @cod_ele AND E.cod_emp = @Emp;

							SELECT	@dia_int = dia_int
							FROM	GTH_Periodicidad
							WHERE	cod_peri = @cod_per;

							SELECT	@max_fec = MAX(fec_entrega)
							FROM	GTH_DotaEmplea 
							WHERE	cod_emp = @Emp AND cod_ele = @cod_ele;
					
							IF EXISTS (SELECT cod_emp FROM GTH_DotaEmplea WHERE cod_emp = @Emp AND cod_ele = @cod_ele AND fec_entrega = @max_fec AND (fec_entrega + @dia_int) <= @fec_ent)
							BEGIN
								INSERT 
								INTO	GTH_DotaEmplea (cod_emp, cod_ele, talla, fec_entrega, cod_for, tip_ent, cantidad, num_doc_inv)
								SELECT	COD_EMP, COD_ELE, TALLA, @fec_ent, @cod_for, @tip_ent, CANTIDAD, @Num_Doc
								FROM	#T_Dota
								WHERE	COD_EMP = @Emp AND COD_ELE = @cod_ele;
							END
							ELSE
							BEGIN
								DELETE 
								FROM	#T_Dota 
								WHERE	COD_EMP = @Emp AND COD_ELE = @cod_ele;
							END
						END
						IF (@tip_ent = 2)
						BEGIN
							IF NOT EXISTS (SELECT cod_emp FROM GTH_DotaEmplea WHERE cod_emp = @Emp AND cod_ele = @cod_ele AND fec_entrega = @fec_ent)
							BEGIN
								INSERT 
								INTO	GTH_DotaEmplea (cod_emp, cod_ele, talla, fec_entrega, cod_for, tip_ent, cantidad, num_doc_inv)
								SELECT	COD_EMP, COD_ELE, TALLA, @fec_ent, @cod_for, @tip_ent, CANTIDAD, @Num_Doc
								FROM	#T_Dota
								WHERE	COD_EMP = @Emp AND COD_ELE = @cod_ele;
							END
							ELSE
							BEGIN
								DELETE 
								FROM	#T_Dota 
								WHERE	COD_EMP = @Emp AND COD_ELE = @cod_ele;
							END
						END

						SET @MIN = @MIN + 1;
					END

					-- Crea el Documento en Inventario
					EXEC sp_gen_afeinv_proc @Anio_Doc, @Anio_Doc, @Per_Doc, @Per_Doc, @VarSubTip, @VarSubTip, @Num_Doc, @Num_Doc, @Fec_Doc, @Fec_Doc;
					-- Crea la Contabilización del Documento

					SELECT	@asig_num = asig_numero
					FROM	inv_inf_inv
					WHERE	ano_doc = @Anio_Doc AND per_doc = @Per_Doc
							AND sub_tip = @VarSubTip AND num_doc = @Num_Doc;

					EXEC sp_inv_afecon @Anio_Doc, @Per_Doc, @VarSubTip, @asig_num, @Fec_Doc, 'SAL';
					-- Exportación a Contabilidad
					SELECT @tip_con = tip_con FROM inv_param_cnt WHERE llave = '0'

					IF @tip_con = 1
					BEGIN
						EXEC sp_gen_afecon_linea_proc 'INV', @Anio_Doc, @Per_Doc, @VarSubTip, @asig_num, @Fec_Doc, '00', 0;
					END

					IF (SELECT COUNT(1) FROM #T_Dota) > 0
					BEGIN
						SELECT	D.COD_EMP AS EMPLEADO, RTRIM(E.ap1_emp)+' '+RTRIM(E.ap2_emp)+' '+RTRIM(E.nom_emp) AS NOMBRE, 
								D.COD_ELE AS ELEMENTO, De.des_ele AS NOMBRE_ELEMENTO, D.TALLA AS TALLA, T.des_talla AS DESCRIPCION_TALLA,
								D.COD_ITEM AS COD_ITEM_INVENTARIO, I.des_item AS DESCRIPCION_ITEM, D.CANTIDAD,
								@tip_ent AS TIPO_ENTREGA, TE.nom_tipent AS DESCRIPCION_TIPO, @fec_ent AS FECHA_ENTREGA, 
								@cod_for AS FORMA_ENTREGA, @des_for AS DESCRIPCION
						FROM	#T_Dota AS D 
						INNER	JOIN rhh_emplea AS E ON D.COD_EMP = E.cod_emp 
						INNER	JOIN GTH_DotaEle AS De ON D.COD_ELE = De.cod_ele
						INNER	JOIN GTH_TipEntElemDota AS TE ON TE.tip_ent = @tip_ent
						INNER	JOIN inv_tallas AS T ON D.TALLA = T.cod_talla
						INNER	JOIN inv_items AS I ON D.COD_ITEM = I.cod_item
								AND I.ind_dota = 1;
					END
					ELSE
					BEGIN
						SELECT	'No existe información para procesar.' AS Mensaje;
					END
				END
				ELSE
				BEGIN
					IF NOT EXISTS (SELECT * FROM #T_ValidaDota)
					BEGIN
						SELECT	'No existe entradas para el Item de Inventarios a entregar.' AS Mensaje;
					END
					ELSE
					BEGIN
						SELECT	'No hay suficientes unidades existentes en la Bodega para el ítem ' + RTRIM(V.COD_ITEM) + ' - ' +
								RTRIM(I.des_item) + '. Se requiere ' + RTRIM(CONVERT(CHAR, V.CANT_SOL)) + ' unidades de las que solo existen ' 
								+ RTRIM(CONVERT(CHAR, V.SALD_BOD)) + '.' AS Mensaje
						FROM	#T_ValidaDota AS V
						INNER	JOIN inv_items AS I ON V.COD_ITEM = I.cod_item
						WHERE	ISNULL(V.SALD_BOD, 0) < ISNULL(V.CANT_SOL, 0)
						UNION	ALL
						SELECT	'No existe ítems de Dotación que cumpla con las siguientes caracteristicas del empleado ' + RTRIM(D.COD_EMP) + ' - ' 
								+ RTRIM(E.ap1_emp) + RTRIM(' '+E.ap2_emp) + RTRIM(' '+E.nom_emp) + ': 1. Dotación: ' + RTRIM(D.COD_ELE) + ' - ' + RTRIM(DE.des_ele)
								+ '. 2. Talla: ' + RTRIM(D.TALLA) + ' - ' + RTRIM(T.des_talla) + '. 3. Género: ' + RTRIM(D.COD_GEN) + ' - ' + RTRIM(G.des_gen) + '.' AS Mensaje
						FROM	#T_Dota AS D
						INNER	JOIN rhh_emplea AS E ON D.COD_EMP = E.cod_emp
						INNER	JOIN GTH_DotaEle AS DE ON D.COD_ELE = DE.cod_ele
						INNER	JOIN inv_tallas AS T ON D.TALLA = T.cod_talla
						INNER	JOIN GTH_Genero AS G ON D.COD_GEN = G.cod_gen
						WHERE	D.COD_ITEM IS NULL;
					END
				END

			COMMIT
		END TRY
		BEGIN CATCH
			IF @@TRANCOUNT > 0
			BEGIN
				ROLLBACK  TRANSACTION;
			END;

			THROW
		END CATCH
	END
	ELSE
	BEGIN
		IF (ISNULL(@VarSal, 'SI') = 'SI') AND (ISNULL(@VarTpo, 'SI') = 'SI')
		BEGIN
			INSERT 
			INTO	#T_Dota (COD_EMP, COD_ELE, TALLA, CANTIDAD)
			SELECT	H.cod_emp, D.cod_ele, TD.Talla, D.cantidad
			FROM	rhh_hislab AS H 
			INNER	JOIN rhh_emplea AS E ON H.cod_emp = E.cod_emp 
					AND H.num_sec = dbo.fn_GTH_HisLab_NumSec(E.cod_emp)
			INNER	JOIN GTH_DotaTallaEmplea AS TD ON H.cod_emp = TD.cod_emp
			INNER	JOIN GTH_Dotacion AS D ON H.cod_car = D.cod_car 
					AND TD.cod_ele = D.cod_ele
			WHERE	H.cod_cia LIKE RTRIM(@cod_cia) AND H.cod_suc LIKE RTRIM(@cod_suc) 
					AND H.cod_cco LIKE RTRIM(@cod_cco) AND H.cod_cl1 LIKE RTRIM(@cod_cl1) 
					AND H.cod_cl2 LIKE RTRIM(@cod_cl2) AND H.cod_cl3 LIKE RTRIM(@cod_cl3)
					AND H.cod_car LIKE RTRIM(@cod_car) AND H.cod_emp LIKE RTRIM(@cod_emp) 
					AND E.est_lab NOT IN ('00','99') AND H.cod_emp NOT IN (SELECT cod_emp FROM rhh_EmpConv)
					AND D.cod_ele LIKE RTRIM(@ele_dot) AND E.sal_bas <= (CONVERT(MONEY, dbo.fn_rhh_VG(60, @Fec_Doc)) * 2)
					AND DATEDIFF(DAY, dbo.fn_rhh_fchIng(E.cod_emp, @Fec_Doc), @Fec_Doc) > 120;
		END
		ELSE IF (ISNULL(@VarSal, 'SI') = 'NO') AND (ISNULL(@VarTpo, 'SI') = 'SI')
		BEGIN
			INSERT 
			INTO	#T_Dota (COD_EMP, COD_ELE, TALLA, CANTIDAD)
			SELECT	H.cod_emp, D.cod_ele, TD.Talla, D.cantidad
			FROM	rhh_hislab AS H 
			INNER	JOIN rhh_emplea AS E ON H.cod_emp = E.cod_emp 
					AND H.num_sec = dbo.fn_GTH_HisLab_NumSec(E.cod_emp)
			INNER	JOIN GTH_DotaTallaEmplea AS TD ON H.cod_emp = TD.cod_emp
			INNER	JOIN GTH_Dotacion AS D ON H.cod_car = D.cod_car 
					AND TD.cod_ele = D.cod_ele
			WHERE	H.cod_cia LIKE RTRIM(@cod_cia) AND H.cod_suc LIKE RTRIM(@cod_suc) 
					AND H.cod_cco LIKE RTRIM(@cod_cco) AND H.cod_cl1 LIKE RTRIM(@cod_cl1) 
					AND H.cod_cl2 LIKE RTRIM(@cod_cl2) AND H.cod_cl3 LIKE RTRIM(@cod_cl3)
					AND H.cod_car LIKE RTRIM(@cod_car) AND H.cod_emp LIKE RTRIM(@cod_emp) 
					AND E.est_lab NOT IN ('00','99') AND H.cod_emp NOT IN (SELECT cod_emp FROM rhh_EmpConv)
					AND D.cod_ele LIKE RTRIM(@ele_dot)
					AND DATEDIFF(DAY, dbo.fn_rhh_fchIng(E.cod_emp, @Fec_Doc), @Fec_Doc) > 120;
		END
		ELSE IF (ISNULL(@VarSal, 'SI') = 'SI') AND (ISNULL(@VarTpo, 'SI') = 'NO')
		BEGIN
			INSERT 
			INTO	#T_Dota (COD_EMP, COD_ELE, TALLA, CANTIDAD)
			SELECT	H.cod_emp, D.cod_ele, TD.Talla, D.cantidad
			FROM	rhh_hislab AS H 
			INNER	JOIN rhh_emplea AS E ON H.cod_emp = E.cod_emp 
					AND H.num_sec = dbo.fn_GTH_HisLab_NumSec(E.cod_emp)
			INNER	JOIN GTH_DotaTallaEmplea AS TD ON H.cod_emp = TD.cod_emp
			INNER	JOIN GTH_Dotacion AS D ON H.cod_car = D.cod_car 
					AND TD.cod_ele = D.cod_ele
			WHERE	H.cod_cia LIKE RTRIM(@cod_cia) AND H.cod_suc LIKE RTRIM(@cod_suc) 
					AND H.cod_cco LIKE RTRIM(@cod_cco) AND H.cod_cl1 LIKE RTRIM(@cod_cl1) 
					AND H.cod_cl2 LIKE RTRIM(@cod_cl2) AND H.cod_cl3 LIKE RTRIM(@cod_cl3)
					AND H.cod_car LIKE RTRIM(@cod_car) AND H.cod_emp LIKE RTRIM(@cod_emp) 
					AND E.est_lab NOT IN ('00','99') AND H.cod_emp NOT IN (SELECT cod_emp FROM rhh_EmpConv)
					AND D.cod_ele LIKE RTRIM(@ele_dot) AND E.sal_bas <= (CONVERT(MONEY, dbo.fn_rhh_VG(60, @Fec_Doc)) * 2);
		END
		ELSE
		BEGIN
			INSERT 
			INTO	#T_Dota (COD_EMP, COD_ELE, TALLA, CANTIDAD)
			SELECT	H.cod_emp, D.cod_ele, TD.Talla, D.cantidad
			FROM	rhh_hislab AS H 
			INNER	JOIN rhh_emplea AS E ON H.cod_emp = E.cod_emp 
					AND H.num_sec = dbo.fn_GTH_HisLab_NumSec(E.cod_emp)
			INNER	JOIN GTH_DotaTallaEmplea AS TD ON H.cod_emp = TD.cod_emp
			INNER	JOIN GTH_Dotacion AS D ON H.cod_car = D.cod_car 
					AND TD.cod_ele = D.cod_ele
			WHERE	H.cod_cia LIKE RTRIM(@cod_cia) AND H.cod_suc LIKE RTRIM(@cod_suc) 
					AND H.cod_cco LIKE RTRIM(@cod_cco) AND H.cod_cl1 LIKE RTRIM(@cod_cl1) 
					AND H.cod_cl2 LIKE RTRIM(@cod_cl2) AND H.cod_cl3 LIKE RTRIM(@cod_cl3)
					AND H.cod_car LIKE RTRIM(@cod_car) AND H.cod_emp LIKE RTRIM(@cod_emp) 
					AND E.est_lab NOT IN ('00','99') AND H.cod_emp NOT IN (SELECT cod_emp FROM rhh_EmpConv)
					AND D.cod_ele LIKE RTRIM(@ele_dot);
		END

		BEGIN TRY
			BEGIN TRANSACTION
				SELECT @MAX = COUNT(1) FROM #T_Dota;
				SET @MIN = 1;

				WHILE @MIN < = @MAX
				BEGIN
					SELECT	@Emp = COD_EMP, @cod_ele = COD_ELE
					FROM	#T_Dota
					WHERE	ID = @MIN;

					IF (@tip_ent = 1)
					BEGIN
						IF NOT EXISTS (SELECT cod_emp FROM GTH_DotaEmplea WHERE cod_emp = @Emp AND cod_ele = @cod_ele AND (tip_ent = @tip_ent OR tip_ent IS NULL))
						BEGIN
							INSERT 
							INTO	GTH_DotaEmplea (cod_emp, cod_ele, talla, fec_entrega, cod_for, tip_ent, cantidad)
							SELECT	COD_EMP, COD_ELE, TALLA, @fec_ent, @cod_for, @tip_ent, CANTIDAD
							FROM	#T_Dota
							WHERE	COD_EMP = @Emp AND COD_ELE = @cod_ele;
						END
						ELSE
						BEGIN
							DELETE 
							FROM	#T_Dota 
							WHERE	COD_EMP = @Emp AND COD_ELE = @cod_ele;
						END
					END
					IF (@tip_ent = 3)
					BEGIN
						SELECT	@cod_per = D.cod_peri 
						FROM	GTH_Dotacion AS D
						INNER	JOIN rhh_emplea AS E ON D.cod_car = E.cod_car
						WHERE	D.cod_ele = @cod_ele AND E.cod_emp = @Emp;

						SELECT	@dia_int = dia_int
						FROM	GTH_Periodicidad
						WHERE	cod_peri = @cod_per;

						SELECT	@max_fec = MAX(fec_entrega)
						FROM	GTH_DotaEmplea 
						WHERE	cod_emp = @Emp AND cod_ele = @cod_ele;
					
						IF EXISTS (SELECT cod_emp FROM GTH_DotaEmplea WHERE cod_emp = @Emp AND cod_ele = @cod_ele AND fec_entrega = @max_fec AND (fec_entrega + @dia_int) <= @fec_ent)
						BEGIN
							INSERT 
							INTO	GTH_DotaEmplea (cod_emp, cod_ele, talla, fec_entrega, cod_for, tip_ent, cantidad)
							SELECT	COD_EMP, COD_ELE, TALLA, @fec_ent, @cod_for, @tip_ent, CANTIDAD
							FROM	#T_Dota
							WHERE	COD_EMP = @Emp AND COD_ELE = @cod_ele;
						END
						ELSE
						BEGIN
							DELETE 
							FROM	#T_Dota 
							WHERE	COD_EMP = @Emp AND COD_ELE = @cod_ele;
						END
					END
					IF (@tip_ent = 2)
					BEGIN
						IF NOT EXISTS (SELECT cod_emp FROM GTH_DotaEmplea WHERE cod_emp = @Emp AND cod_ele = @cod_ele AND fec_entrega = @fec_ent)
						BEGIN
							INSERT 
							INTO	GTH_DotaEmplea (cod_emp, cod_ele, talla, fec_entrega, cod_for, tip_ent, cantidad)
							SELECT	COD_EMP, COD_ELE, TALLA, @fec_ent, @cod_for, @tip_ent, CANTIDAD
							FROM	#T_Dota
							WHERE	COD_EMP = @Emp AND COD_ELE = @cod_ele;
						END
						ELSE
						BEGIN
							DELETE 
							FROM	#T_Dota 
							WHERE	COD_EMP = @Emp AND COD_ELE = @cod_ele;
						END
					END

					SET @MIN = @MIN + 1;
				END
				IF (SELECT COUNT(1) FROM #T_Dota) > 0
				BEGIN
					SELECT	D.COD_EMP AS EMPLEADO, RTRIM(E.ap1_emp)+' '+RTRIM(E.ap2_emp)+' '+RTRIM(E.nom_emp) AS NOMBRE, 
							D.COD_ELE AS ELEMENTO, De.des_ele AS NOMBRE_ELEMENTO, D.TALLA AS TALLA, T.des_talla AS DESCRIPCION_TALLA,
							D.CANTIDAD, @tip_ent AS TIPO_ENTREGA, TE.nom_tipent AS DESCRIPCION_TIPO, @fec_ent AS FECHA_ENTREGA, 
							@cod_for AS FORMA_ENTREGA, @des_for AS DESCRIPCIÓN
					FROM	#T_Dota AS D 
					INNER	JOIN rhh_emplea AS E ON D.COD_EMP = E.cod_emp 
					INNER	JOIN GTH_DotaEle AS De ON D.COD_ELE = De.cod_ele
					INNER	JOIN GTH_TipEntElemDota AS TE ON TE.tip_ent = @tip_ent
					INNER	JOIN inv_tallas AS T ON D.TALLA = T.cod_talla;
				END
				ELSE
				BEGIN
					SELECT	'No existe información para procesar.';
				END

			COMMIT
		END TRY
		BEGIN CATCH
			IF @@TRANCOUNT > 0
			BEGIN
				ROLLBACK  TRANSACTION;
			END;

			THROW
		END CATCH
	END
	DROP TABLE #T_Dota;
	DROP TABLE #T_ValidaDota;
END

```
