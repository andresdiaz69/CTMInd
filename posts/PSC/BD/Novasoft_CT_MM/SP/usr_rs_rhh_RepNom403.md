# Stored Procedure: usr_rs_rhh_RepNom403

## Usa los objetos:
- [[fn_rhh_Empleados_Usuario]]
- [[fn_rhh_SueldoFch]]
- [[fn_sis_GetUsuActual]]
- [[Gen_Ccosto]]
- [[Gen_compania]]
- [[Gen_sucursal]]
- [[Rhh_ausentismo]]
- [[Rhh_emplea]]
- [[rhh_hislab]]
- [[rhh_hisss]]
- [[rhh_liqhis]]
- [[rhh_tbtipaus]]
- [[v_rhh_concep]]

```sql
-- ==========================================================================================
/*	Reporte Ausentismos Casatoro	*/
--	DAGALINDO se agrega campo dias
--	COSPINA		Se agrega Begin-End, bloqueo transaccional, etc Enero/2017
--					Se agregan parametros clasificadores para completar 
--	COSPINA		SRS 2018-0558	Se cambia la condicion de ausentismos para listar los ausentismos 
--								que estan dentro del rango de fechas del reporte Ago 2018
--	MARATON REPORTES - USUARIO - COSPINA MAYO 2019
--	JGUEVARA - 05/12/2023: Adición de IBC de incapacidad, valor de incapacidad y fecha de retiro
-- ==========================================================================================
CREATE PROCEDURE usr_rs_rhh_RepNom403
	@cod_cia	CHAR(3)='%',
	@CodCco	VARCHAR(10) ='%',
	@CodSuc	CHAR(3)='%',
	@FecLiqI	DATETIME='20070101',
	@FecLiqF	DATETIME='20100101',
	@CodEmp	CHAR(12)='%',
	@TipAusen	CHAR(2)='%',
	@Cod_Cl1	CHAR(12) = '%',		-- COSPINA ENE/17
	@Cod_Cl2	CHAR(12) = '%',		-- COSPINA ENE/17
	@Cod_Cl3	CHAR(12) = '%',		-- COSPINA ENE/17
	@Cod_Usuario_Rep SYSNAME  = 'USER'
AS

BEGIN
	SET NOCOUNT ON;		-- COSPINA ENE/17
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;	-- COSPINA ENE/17

	DECLARE @UsuAct nvarchar(128);
	SET	@UsuAct = @Cod_Usuario_Rep;
		-- Para Enterprise
	IF 	(@UsuAct = 'USER' )
		  SET @UsuAct = dbo.fn_sis_GetUsuActual();

	WITH
		ibc AS (
		SELECT DISTINCT
			cod_emp,
			cer_nro,
			ROUND(SUM(ibc_sal) / SUM(dia_sal) * 30, 0) ibc_sal,
			fec_cte
		FROM	rhh_hisss
		WHERE	cer_nro NOT LIKE ''
			AND	fec_cau BETWEEN @FecLiqI AND @FecLiqF
			AND dia_sal != 0
		GROUP BY cod_emp, cer_nro, fec_cte
		),
		historicos AS (
		SELECT DISTINCT
			cod_emp,
			cer_nro,
			cod_con,
			mod_liq,
			SUM(val_liq) val_aus,
			SUM(can_liq) dias,
			fec_cte
		FROM	rhh_liqhis
		WHERE	cer_nro NOT LIKE ''
			AND	fec_cte BETWEEN @FecLiqI AND @FecLiqF
			AND	cod_con != '001177'
		GROUP BY cod_emp, cer_nro, cod_con, mod_liq, fec_cte
		),
		retiros	AS	(
		SELECT
			cod_emp, fec_ret
		FROM	rhh_hislab
		WHERE	fec_ret BETWEEN @FecLiqI AND @FecLiqF	)

	SELECT
		E.cod_cia,
		Cia.Nom_cia,
		E.Cod_cco,
		Cco.nom_cco,
		E.cod_suc,
		S.nom_suc,
		A.Cod_emp,
		RTRIM(E.ap1_emp)+' '+RTRIM(E.Ap2_emp)+' '+RTRIM(E.nom_emp) AS NomEmp,
		A.Cod_aus,
		A.fec_ini,
		A.fec_fin,
		A.ini_aus,
		A.fin_aus,
		T.nom_aus, 
		dbo.fn_rhh_SueldoFch(A.cod_emp, fec_ini, 1, 0) sal_bas,
		H.dias,
		ibc_sal,
		RTRIM(H.cod_con) + ' - ' + RTRIM(C.nom_con) concepto,
		val_aus,
		RTRIM(nro_interno) nro_interno,
		fec_ret
	FROM	Rhh_ausentismo A
	INNER JOIN	rhh_tbtipaus T ON T.Cod_aus = A.Cod_aus
	INNER JOIN	Rhh_emplea E ON E.Cod_emp = A.Cod_emp
	INNER JOIN	Gen_compania Cia ON E.cod_cia = Cia.Cod_cia 
	INNER JOIN	Gen_Ccosto Cco ON E.cod_cco = cco.Cod_cco 
	INNER JOIN	Gen_sucursal S ON E.cod_suc = S.Cod_suc 
	INNER JOIN	dbo.fn_rhh_Empleados_Usuario(@UsuAct,@FecLiqF,NULL) F ON F.cod_emp = E.cod_emp	-- COSPINA Ene/2017
	INNER JOIN	ibc I ON I.cer_nro = A.cer_nro
	INNER JOIN	historicos H ON H.cer_nro = A.cer_nro AND I.fec_cte = H.fec_cte
	LEFT JOIN	retiros R ON R.cod_emp = E.cod_emp
	INNER JOIN	v_rhh_concep C ON C.cod_con = H.cod_con AND C.mod_liq = H.mod_liq
	WHERE	E.Cod_cia LIKE RTRIM(@cod_cia) AND
		E.Cod_Cco LIKE RTRIM(@Codcco)AND
		E.Cod_Suc LIKE RTRIM(@CodSuc)AND
		(A.ini_aus <=(@fecliqF) AND A.fin_aus >=(@fecliqI) ) AND
		A.Cod_Emp LIKE RTRIM(@CodEmp) AND
		A.Cod_aus LIKE RTRIM (@TipAusen)
		AND E.cod_cl1 LIKE RTRIM(@Cod_Cl1)		-- COSPINA Ene/2017
		AND E.cod_cl2 LIKE RTRIM(@Cod_Cl2)		-- COSPINA Ene/2017
		AND E.cod_cl3 LIKE RTRIM(@Cod_Cl3)		-- COSPINA Ene/2017
	ORDER	BY E.Cod_cia,
		E.Cod_suc,
		E.cod_cco,
		E.Ap1_emp,
		E.Ap2_emp,
		E.Nom_emp,
		A.Cod_emp,
		A.Cod_aus,
		A.fec_ini,
		A.fec_fin,
		A.ini_aus,
		A.fin_aus;
END;

```
