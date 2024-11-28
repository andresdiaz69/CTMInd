# Stored Procedure: sp_gth_EvalCompGenPorSistema

## Usa los objetos:
- [[fn_GTH_HisLab_NumSec]]
- [[gen_compania]]
- [[GTH_CompeCargo]]
- [[GTH_CompEscalaCalifica]]
- [[GTH_CompEscalaResultado]]
- [[GTH_Competencias]]
- [[GTH_Comporta]]
- [[GTH_Comporta_Nivel]]
- [[GTH_EvaDesem]]
- [[GTH_EvaDesemAsig]]
- [[GTH_EvaDesemGrupoEvalPlanMejora]]
- [[GTH_EvaDesemRespComp]]
- [[GTH_EvaDesemRespCompConc]]
- [[GTH_Eval_Estado_Pers]]
- [[GTH_Evalua_Estado]]
- [[GTH_ParamSistemaCompetencia]]
- [[gth_vargen]]
- [[rhh_emplea]]
- [[rhh_hislab]]

```sql

-- =============================================
-- Author:		Grace Niño
-- Create date: 02/09/2020
-- Description:	Procedimiento que Construye la evaluación de competencias en la compañía, además guarda los resultados de la evaluación.
-- =============================================

CREATE PROCEDURE [dbo].[sp_gth_EvalCompGenPorSistema]
	@IndProc		INT, /*1 - Consulta, 2 - Guarda Resultados, 3 - Lista de Calificaciones y 4 - Instrucciones*/
	@cod_eva_des	VARCHAR(6), /*Código Proceso Valoración*/
	@cod_emp_evado	CHAR(12), /*Empleado Evaluado*/
	@cod_emp_evador	CHAR(15), /*Empleado Evaluador*/
	@cod_rol		INT, /*Código Rol*/
	@cod_cia		CHAR(3), /*Código Compañía*/
	@cod_grup_val	INT, /*Código Grupo de Valoración*/
	@ind_fin_proc	INT, /*Indica Proceso Finalizado*/
	@obs_eva		NVARCHAR(MAX), /*Observaciones Generales*/
	@DtResultado	XML/*Tabla de Resultados*/
	
--WITH ENCRYPTION
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	DECLARE	@VarGen		CHAR(100);
	DECLARE @idoc		INT;
	DECLARE @Fecha		DATETIME = GETDATE();
	DECLARE @MIN		INT = 1;
	DECLARE @MAX		INT;
	DECLARE @CantC		INT;
	DECLARE @Nota		DECIMAL(5,2);
	DECLARE @NotaF		DECIMAL(7,2);
	DECLARE @xmlAlerta	XML;

	DECLARE @tAlertas TABLE 
	(
		cod_cia			CHAR(3) COLLATE DATABASE_DEFAULT,
		cod_eva_des		VARCHAR(6) COLLATE DATABASE_DEFAULT,
		cod_grup_eval	INT,
		cod_emp_evado	CHAR(12) COLLATE DATABASE_DEFAULT
	);

	DECLARE @Resultado	TABLE 
	(
		id				INT IDENTITY,
		cod_comp		CHAR(10) COLLATE DATABASE_DEFAULT,
		cod_comporta	CHAR(10) COLLATE DATABASE_DEFAULT,
		cod_esc_val		INT,
		obs_evi			NVARCHAR(MAX) COLLATE DATABASE_DEFAULT
	);

	DECLARE @Competencias	TABLE 
	(
		cod_comp	CHAR(10) COLLATE DATABASE_DEFAULT
	);

	DECLARE @NotaFinal TABLE
	(
		cod_comp		CHAR(10) COLLATE DATABASE_DEFAULT,
		cod_comporta	CHAR(10) COLLATE DATABASE_DEFAULT,
		nota			DECIMAL(5,2)
	);

	SELECT	@VarGen = RTRIM(val_var)
	FROM	gth_vargen
	WHERE	num_var = 24;

	/*CONSULTAS*/
	IF @IndProc = 1
	BEGIN
		IF (RTRIM(@VarGen) = 'SI')
		BEGIN
			SELECT	C.cod_comp, C.nom_comp, C.def_comp, CP.cod_comporta, CP.des_comporta, CP.niv_compor, N.des_compor, 
					CASE
						WHEN C.ind_org = 1 THEN 1
						WHEN CG.tip_comp = 1 THEN 2
						WHEN CG.tip_comp = 2 THEN 3
						WHEN CG.tip_comp = 3 THEN 4
					END AS ord_comp,
					CASE
						WHEN CG.tip_comp = 1 THEN 'Competencias de Grupo: Área'
						WHEN CG.tip_comp = 2 THEN 'Competencias de Grupo: Nivel de Cargo'
						WHEN CG.tip_comp = 3 THEN 'Competencias de Grupo: Cargo'
						WHEN C.ind_org = 1 THEN 'Competencias Organizacionales'
					END AS tip_comp, ER.cod_esc_val, ER.obs_evi, ER.fec_fin_proc, EDA.obs_eva
			FROM	GTH_Competencias AS C
			INNER	JOIN GTH_CompeCargo AS CG ON C.cod_comp = CG.cod_comp
			INNER	JOIN GTH_Comporta AS CP ON CG.cod_comp = CP.cod_comp
					AND CG.niv_comp = CP.niv_compor
			INNER	JOIN GTH_Comporta_Nivel AS N ON CP.niv_compor = N.niv_compor
			INNER	JOIN rhh_hislab AS H ON CG.cod_car = H.cod_car
			INNER	JOIN rhh_emplea AS E ON H.cod_emp = E.cod_emp
			INNER	JOIN GTH_EvaDesemAsig AS EDA ON E.cod_emp = EDA.cod_emp_evado
			INNER	JOIN GTH_EvaDesem AS EV ON EDA.cod_eva_des = EV.cod_eva_des
					AND EDA.cod_cia = EV.cod_cia AND CG.fec_ini < EDA.fec_eva
					AND ((CG.fec_fin >= EDA.fec_eva) OR (CG.fec_fin IS NULL))
					AND H.num_sec = dbo.fn_GTH_HisLab_NumSec(E.cod_emp)
			LEFT	JOIN GTH_EvaDesemRespComp AS ER ON EDA.cod_eva_des = ER.cod_eva_des
					AND EDA.cod_emp_evado = ER.cod_emp_evado AND EDA.cod_emp_evador = ER.cod_emp_evador
					AND EDA.cod_rol = ER.cod_rol AND EDA.cod_cia = ER.cod_cia
					AND EDA.cod_grup_val = ER.cod_grup_val AND CP.cod_comp = ER.cod_comp
					AND CP.cod_comporta = ER.cod_comporta
			WHERE	EDA.cod_eva_des = RTRIM(@cod_eva_des) AND EDA.cod_emp_evado = RTRIM(@cod_emp_evado)
					AND EDA.cod_emp_evador = RTRIM(@cod_emp_evador) AND EDA.cod_rol = @cod_rol
					AND EDA.cod_cia = RTRIM(@cod_cia) AND EDA.cod_grup_val = @cod_grup_val
					AND C.cod_cia = RTRIM(@cod_cia) AND C.ind_hab = 0
			UNION	ALL
			SELECT	C.cod_comp, C.nom_comp, C.def_comp, CP.cod_comporta, CP.des_comporta, CP.niv_compor, N.des_compor, 
					CASE
						WHEN C.ind_org = 1 THEN 5
						WHEN CG.tip_comp = 1 THEN 6
						WHEN CG.tip_comp = 2 THEN 7
						WHEN CG.tip_comp = 3 THEN 8
					END AS ord_comp,
					CASE
						WHEN CG.tip_comp = 1 THEN 'Habilidades Técnicas de Grupo: Área'
						WHEN CG.tip_comp = 2 THEN 'Habilidades Técnicas de Grupo: Nivel de Cargo'
						WHEN CG.tip_comp = 3 THEN 'Habilidades Técnicas de Grupo: Cargo'
						WHEN C.ind_org = 1 THEN 'Habilidades Técnicas Organizacionales'
					END AS tip_comp, ER.cod_esc_val, ER.obs_evi, ER.fec_fin_proc, EDA.obs_eva
			FROM	GTH_Competencias AS C
			INNER	JOIN GTH_CompeCargo AS CG ON C.cod_comp = CG.cod_comp
			INNER	JOIN GTH_Comporta AS CP ON CG.cod_comp = CP.cod_comp
					AND CG.niv_comp = CP.niv_compor
			INNER	JOIN GTH_Comporta_Nivel AS N ON CP.niv_compor = N.niv_compor
			INNER	JOIN rhh_hislab AS H ON CG.cod_car = H.cod_car
			INNER	JOIN rhh_emplea AS E ON H.cod_emp = E.cod_emp
			INNER	JOIN GTH_EvaDesemAsig AS EDA ON E.cod_emp = EDA.cod_emp_evado
			INNER	JOIN GTH_EvaDesem AS EV ON EDA.cod_eva_des = EV.cod_eva_des
					AND EDA.cod_cia = EV.cod_cia AND CG.fec_ini < EDA.fec_eva
					AND ((CG.fec_fin >= EDA.fec_eva) OR (CG.fec_fin IS NULL))
					AND H.num_sec = dbo.fn_GTH_HisLab_NumSec(E.cod_emp)
			LEFT	JOIN GTH_EvaDesemRespComp AS ER ON EDA.cod_eva_des = ER.cod_eva_des
					AND EDA.cod_emp_evado = ER.cod_emp_evado AND EDA.cod_emp_evador = ER.cod_emp_evador
					AND EDA.cod_rol = ER.cod_rol AND EDA.cod_cia = ER.cod_cia
					AND EDA.cod_grup_val = ER.cod_grup_val AND CP.cod_comp = ER.cod_comp
					AND CP.cod_comporta = ER.cod_comporta
			WHERE	EDA.cod_eva_des = RTRIM(@cod_eva_des) AND EDA.cod_emp_evado = RTRIM(@cod_emp_evado)
					AND EDA.cod_emp_evador = RTRIM(@cod_emp_evador) AND EDA.cod_rol = @cod_rol
					AND EDA.cod_cia = RTRIM(@cod_cia) AND EDA.cod_grup_val = @cod_grup_val
					AND C.cod_cia = RTRIM(@cod_cia) AND C.ind_hab = 1
			ORDER	BY ord_comp;
		END
		ELSE
		BEGIN
			SELECT	C.cod_comp, C.nom_comp, C.def_comp, CP.cod_comporta, CP.des_comporta, CP.niv_compor, N.des_compor, 
					CASE
						WHEN C.ind_org = 1 THEN 1
						WHEN CG.tip_comp = 1 THEN 2
						WHEN CG.tip_comp = 2 THEN 3
						WHEN CG.tip_comp = 3 THEN 4
					END AS ord_comp,
					CASE
						WHEN CG.tip_comp = 1 THEN 'Competencias Especificas X Área'
						WHEN CG.tip_comp = 2 THEN 'Competencias Especificas X Nivel'
						WHEN CG.tip_comp = 3 THEN 'Competencias Especificas X Cargo'
						WHEN C.ind_org = 1 THEN 'Competencias Organizacionales'
					END AS tip_comp, ER.cod_esc_val, ER.obs_evi, ER.fec_fin_proc
			FROM	GTH_Competencias AS C
			INNER	JOIN GTH_CompeCargo AS CG ON C.cod_comp = CG.cod_comp
			INNER	JOIN GTH_Comporta AS CP ON CG.cod_comp = CP.cod_comp
			INNER	JOIN GTH_Comporta_Nivel AS N ON CP.niv_compor = N.niv_compor
			INNER	JOIN rhh_hislab AS H ON CG.cod_car = H.cod_car
			INNER	JOIN rhh_emplea AS E ON H.cod_emp = E.cod_emp
			INNER	JOIN GTH_EvaDesemAsig AS EDA ON E.cod_emp = EDA.cod_emp_evado
			INNER	JOIN GTH_EvaDesem AS EV ON EDA.cod_eva_des = EV.cod_eva_des
					AND EDA.cod_cia = EV.cod_cia AND CG.fec_ini < EDA.fec_eva
					AND ((CG.fec_fin >= EDA.fec_eva) OR (CG.fec_fin IS NULL))
					AND H.num_sec = dbo.fn_GTH_HisLab_NumSec(E.cod_emp)
			LEFT	JOIN GTH_EvaDesemRespComp AS ER ON EDA.cod_eva_des = ER.cod_eva_des
					AND EDA.cod_emp_evado = ER.cod_emp_evado AND EDA.cod_emp_evador = ER.cod_emp_evador
					AND EDA.cod_rol = ER.cod_rol AND EDA.cod_cia = ER.cod_cia
					AND EDA.cod_grup_val = ER.cod_grup_val AND CP.cod_comp = ER.cod_comp
					AND CP.cod_comporta = ER.cod_comporta
			WHERE	EDA.cod_eva_des = RTRIM(@cod_eva_des) AND EDA.cod_emp_evado = RTRIM(@cod_emp_evado)
					AND EDA.cod_emp_evador = RTRIM(@cod_emp_evador) AND EDA.cod_rol = @cod_rol
					AND EDA.cod_cia = RTRIM(@cod_cia) AND EDA.cod_grup_val = @cod_grup_val
					AND C.cod_cia = RTRIM(@cod_cia) AND C.ind_hab = 0
			UNION	ALL
			SELECT	C.cod_comp, C.nom_comp, C.def_comp, CP.cod_comporta, CP.des_comporta, CP.niv_compor, N.des_compor, 
					CASE
						WHEN C.ind_org = 1 THEN 5
						WHEN CG.tip_comp = 1 THEN 6
						WHEN CG.tip_comp = 2 THEN 7
						WHEN CG.tip_comp = 3 THEN 8
					END AS ord_comp,
					CASE
						WHEN CG.tip_comp = 1 THEN 'Habilidades Técnicas Especificas X Área'
						WHEN CG.tip_comp = 2 THEN 'Habilidades Técnicas Especificas X Nivel'
						WHEN CG.tip_comp = 3 THEN 'Habilidades Técnicas Especificas X Cargo'
						WHEN C.ind_org = 1 THEN 'Habilidades Técnicas Organizacionales'
					END AS tip_comp, ER.cod_esc_val, ER.obs_evi, ER.fec_fin_proc
			FROM	GTH_Competencias AS C
			INNER	JOIN GTH_CompeCargo AS CG ON C.cod_comp = CG.cod_comp
			INNER	JOIN GTH_Comporta AS CP ON CG.cod_comp = CP.cod_comp
			INNER	JOIN GTH_Comporta_Nivel AS N ON CP.niv_compor = N.niv_compor
			INNER	JOIN rhh_hislab AS H ON CG.cod_car = H.cod_car
			INNER	JOIN rhh_emplea AS E ON H.cod_emp = E.cod_emp
			INNER	JOIN GTH_EvaDesemAsig AS EDA ON E.cod_emp = EDA.cod_emp_evado
			INNER	JOIN GTH_EvaDesem AS EV ON EDA.cod_eva_des = EV.cod_eva_des
					AND EDA.cod_cia = EV.cod_cia AND CG.fec_ini < EDA.fec_eva
					AND ((CG.fec_fin >= EDA.fec_eva) OR (CG.fec_fin IS NULL))
					AND H.num_sec = dbo.fn_GTH_HisLab_NumSec(E.cod_emp)
			LEFT	JOIN GTH_EvaDesemRespComp AS ER ON EDA.cod_eva_des = ER.cod_eva_des
					AND EDA.cod_emp_evado = ER.cod_emp_evado AND EDA.cod_emp_evador = ER.cod_emp_evador
					AND EDA.cod_rol = ER.cod_rol AND EDA.cod_cia = ER.cod_cia
					AND EDA.cod_grup_val = ER.cod_grup_val AND CP.cod_comp = ER.cod_comp
					AND CP.cod_comporta = ER.cod_comporta
			WHERE	EDA.cod_eva_des = RTRIM(@cod_eva_des) AND EDA.cod_emp_evado = RTRIM(@cod_emp_evado)
					AND EDA.cod_emp_evador = RTRIM(@cod_emp_evador) AND EDA.cod_rol = @cod_rol
					AND EDA.cod_cia = RTRIM(@cod_cia) AND EDA.cod_grup_val = @cod_grup_val
					AND C.cod_cia = RTRIM(@cod_cia) AND C.ind_hab = 1
			ORDER	BY ord_comp;
		END
	END
	
	/*GUARDA RESULTADOS*/
	IF @IndProc = 2
	BEGIN
		EXEC sp_xml_preparedocument @idoc OUTPUT, @DtResultado;

		INSERT 
		INTO	@Resultado (cod_comp, cod_comporta, cod_esc_val, obs_evi)
		SELECT	cod_comp, cod_comporta, cod_esc_val, obs_evi
		FROM	OPENXML (@idoc, '/ROOT/EvaComp', 1) WITH(	cod_comp		CHAR(10),
															cod_comporta	CHAR(10),
															cod_esc_val		INT,
															obs_evi			NVARCHAR(MAX)
														);
		
		IF EXISTS(SELECT cod_eva_des FROM GTH_EvaDesem WHERE cod_cia = RTRIM(@cod_cia) AND cod_eva_des = RTRIM(@cod_eva_des) AND cod_est = '05')
		BEGIN
			UPDATE	GTH_EvaDesem
			SET		cod_est = '07'
			WHERE	cod_cia = RTRIM(@cod_cia) AND cod_eva_des = RTRIM(@cod_eva_des);
		END

		IF NOT EXISTS(SELECT * FROM GTH_EvaDesemRespComp WHERE cod_cia = RTRIM(@cod_cia) AND cod_eva_des = RTRIM(@cod_eva_des) AND cod_grup_val  = @cod_grup_val
				AND cod_emp_evado = RTRIM(@cod_emp_evado) AND cod_emp_evador = RTRIM(@cod_emp_evador) AND cod_rol = @cod_rol)
		BEGIN
			INSERT
			INTO	GTH_EvaDesemRespComp
			SELECT	@cod_cia, @cod_eva_des, @cod_grup_val, @cod_emp_evado, @cod_emp_evador, @cod_rol, cod_comp, cod_comporta, cod_esc_val, 
					IIF(obs_evi = '.', NULL, obs_evi), IIF(@ind_fin_proc = 1, GETDATE(), NULL)
			FROM	@Resultado;
		END
		ELSE
		BEGIN
			UPDATE	GTH_EvaDesemRespComp
			SET		cod_esc_val = R.cod_esc_val,
					obs_evi = IIF(R.obs_evi = '.', NULL, R.obs_evi),
					fec_fin_proc = IIF(@ind_fin_proc = 1, GETDATE(), NULL)
			FROM	GTH_EvaDesemRespComp AS ER
			INNER	JOIN @Resultado AS R ON ER.cod_comp = R.cod_comp
					AND ER.cod_comporta = R.cod_comporta
			WHERE	ER.cod_cia = RTRIM(@cod_cia) AND ER.cod_eva_des = RTRIM(@cod_eva_des)
					AND ER.cod_grup_val  = @cod_grup_val AND ER.cod_emp_evado = RTRIM(@cod_emp_evado)
					AND ER.cod_emp_evador = RTRIM(@cod_emp_evador) AND ER.cod_rol = @cod_rol;
		END

		IF (SELECT COUNT(1) FROM GTH_EvaDesemRespComp WHERE cod_cia = RTRIM(@cod_cia) AND cod_eva_des = RTRIM(@cod_eva_des) AND fec_fin_proc IS NULL) = 0
			AND (SELECT COUNT(1) FROM GTH_Evalua_Estado AS EE INNER JOIN GTH_Eval_Estado_Pers AS EP ON EE.consec_eva = EP.consec_eva
				AND EE.cod_eva = EP.cod_eva WHERE EE.cod_cia = RTRIM(@cod_cia) AND EE.codigo = RTRIM(@cod_eva_des) AND EP.fec_fin IS NULL) = 0
			AND (SELECT COUNT(1) FROM GTH_EvaDesemRespCompConc WHERE cod_cia = RTRIM(@cod_cia) AND cod_eva_des = RTRIM(@cod_eva_des) AND fec_fin_proc IS NULL) = 0
		BEGIN
			UPDATE	GTH_EvaDesem
			SET		cod_est = '04'
			WHERE	cod_cia = RTRIM(@cod_cia) AND cod_eva_des = RTRIM(@cod_eva_des);
		END
		IF (SELECT COUNT(1) FROM GTH_EvaDesemRespComp WHERE cod_cia = RTRIM(@cod_cia) AND cod_eva_des = RTRIM(@cod_eva_des) AND cod_grup_val = @cod_grup_val
				AND cod_emp_evado = RTRIM(@cod_emp_evado) AND fec_fin_proc IS NULL) = 0
		BEGIN
			--Crea Planes de Mejora para los comportamientos que esten entre los rangos que generan plan de mejora
			IF NOT EXISTS (SELECT * FROM GTH_EvaDesemGrupoEvalPlanMejora WHERE cod_cia = RTRIM(@cod_cia) AND cod_eva_des = RTRIM(@cod_eva_des)
				AND cod_grup_val = RTRIM(@cod_grup_val) AND cod_emp_evado = RTRIM(@cod_emp_evado))
			BEGIN
				;WITH NOTA AS
				(
					SELECT	SUM(EC.val_cuant) OVER (PARTITION BY ER.cod_cia, ER.cod_eva_des, ER.cod_grup_val, ER.cod_emp_evado, ER.cod_comp, ER.cod_comporta) AS NOTA,
							COUNT(1) OVER (PARTITION BY ER.cod_cia, ER.cod_eva_des, ER.cod_grup_val, ER.cod_emp_evado, ER.cod_comp, ER.cod_comporta) AS CANTIDAD, ER.cod_comp, ER.cod_comporta
					FROM	GTH_EvaDesemRespComp AS ER
					INNER	JOIN GTH_Comporta AS C ON ER.cod_comp = C.cod_comp
							AND ER.cod_comporta = C.cod_comporta
					INNER	JOIN GTH_CompEscalaCalifica AS EC ON ER.cod_esc_val = EC.cons_esc_calif
					WHERE	ER.cod_cia = RTRIM(@cod_cia) AND ER.cod_eva_des = RTRIM(@cod_eva_des)
							AND ER.cod_grup_val = @cod_grup_val AND ER.cod_emp_evado = RTRIM(@cod_emp_evado)
				)

				INSERT
				INTO	@NotaFinal
				SELECT	cod_comp, cod_comporta, NOTA / CANTIDAD
				FROM	NOTA;

				INSERT
				INTO	GTH_EvaDesemGrupoEvalPlanMejora (cod_cia, cod_eva_des, cod_grup_val, cod_emp_evado, cod_comp, cod_comporta, cons_acc)
				SELECT	@cod_cia, @cod_eva_des, @cod_grup_val, @cod_emp_evado, N.cod_comp, N.cod_comporta, 1
				FROM	@NotaFinal AS N
				INNER	JOIN GTH_CompEscalaResultado AS ER ON N.NOTA BETWEEN ER.val_desde AND ER.val_hasta
						AND ER.ind_plan_ob = 1;
			END

			--Alerta para informar que ya fue evaluado por todos sus evaluadores
			INSERT 
			INTO	@tAlertas
			VALUES	(@cod_cia, @cod_eva_des, @cod_grup_val, @cod_emp_evado);

			SET @xmlAlerta = (SELECT * FROM @tAlertas FOR XML RAW ('TerminaEvaluaciones'),ROOT('ROOT'));
			SELECT @xmlAlerta;

			SELECT * FROM @tAlertas;
		END

		INSERT	INTO @Competencias
		SELECT	cod_comp
		FROM	@Resultado
		GROUP	BY cod_comp;

		SELECT @CantC = COUNT(1) FROM @Competencias;
		SELECT @MAX = COUNT(1) FROM @Resultado;

		WHILE @MIN <= @MAX
		BEGIN
			SELECT	@Nota = (EC.val_cuant * C.peso)/100
			FROM	@Resultado AS R
			INNER	JOIN GTH_CompEscalaCalifica AS EC ON R.cod_esc_val = EC.cons_esc_calif
			INNER	JOIN GTH_Comporta AS C ON R.cod_comp = C.cod_comp
					AND R.cod_comporta = C.cod_comporta
			WHERE	R.id = @MIN;

			SET @NotaF = ISNULL(@NotaF,0) + ISNULL(@Nota,0);

			SET @MIN = @MIN + 1;
		END
		
		UPDATE	GTH_EvaDesemAsig
		SET		nota_eva = @NotaF/@CantC,
				obs_eva = @obs_eva
		WHERE	cod_cia = RTRIM(@cod_cia) AND cod_eva_des = RTRIM(@cod_eva_des)
				AND cod_grup_val  = @cod_grup_val AND cod_emp_evado = RTRIM(@cod_emp_evado)
				AND cod_emp_evador = RTRIM(@cod_emp_evador) AND cod_rol = @cod_rol;

		EXEC sp_xml_removedocument @idoc;
	END

	IF ((@ind_fin_proc = 1) AND ((@IndProc = 3) OR (@IndProc = 4)))
	BEGIN
		SELECT	@Fecha = fec_fin_proc
		FROM	GTH_EvaDesemRespComp
		WHERE	cod_cia = RTRIM(@cod_cia) AND cod_eva_des = RTRIM(@cod_eva_des)
					AND cod_grup_val  = @cod_grup_val AND cod_emp_evado = RTRIM(@cod_emp_evado)
					AND cod_emp_evador = RTRIM(@cod_emp_evador) AND cod_rol = @cod_rol;
	END

	/*LISTA DE CALIFICACIONES*/
	IF @IndProc = 3
	BEGIN
		SELECT	CEC.cons_esc_calif, CEC.des_esc_calif
		FROM	GTH_CompEscalaCalifica AS CEC
		INNER	JOIN GTH_ParamSistemaCompetencia AS PSC ON CEC.Id = PSC.Id
		INNER	JOIN gen_compania AS C ON PSC.cod_cia = C.cod_cia
		WHERE	PSC.cod_cia = RTRIM(@cod_cia) AND PSC.ind_cia = 0 AND PSC.fec_crea < @Fecha
				AND ((PSC.fec_fin >= @Fecha) OR (PSC.fec_fin IS NULL))
		UNION	ALL
		SELECT	CEC.cons_esc_calif, CEC.des_esc_calif
		FROM	GTH_CompEscalaCalifica AS CEC
		INNER	JOIN GTH_ParamSistemaCompetencia AS PSC ON CEC.Id = PSC.Id
		WHERE	PSC.ind_cia = 1 AND PSC.fec_crea < @Fecha
				AND ((PSC.fec_fin >= @Fecha) OR (PSC.fec_fin IS NULL))
		GROUP	BY CEC.cons_esc_calif, CEC.des_esc_calif;
	END

	/*INSTRUCCIONES*/
	IF @IndProc = 4
	BEGIN
		SELECT	PSC.inst_gen_sist, PSC.inst_eva_conc
		FROM	GTH_ParamSistemaCompetencia AS PSC
		INNER	JOIN gen_compania AS C ON PSC.cod_cia = C.cod_cia
		WHERE	PSC.cod_cia = RTRIM(@cod_cia) AND PSC.ind_cia = 0 AND PSC.fec_crea < @Fecha
				AND ((PSC.fec_fin >= @Fecha) OR (PSC.fec_fin IS NULL))
		UNION	ALL
		SELECT	inst_gen_sist, inst_eva_conc
		FROM	GTH_ParamSistemaCompetencia
		WHERE	ind_cia = 1 AND fec_crea < @Fecha
				AND ((fec_fin >= @Fecha) OR (fec_fin IS NULL));
	END

	/*ESCALA DE CALIFICACIONES*/
	IF @IndProc = 5
	BEGIN
		SELECT	CEC.Id, CEC.cons_esc_calif, CEC.des_esc_calif, CEC.val_cuali
		FROM	GTH_CompEscalaCalifica AS CEC
		INNER	JOIN GTH_ParamSistemaCompetencia AS PSC ON CEC.Id = PSC.Id
		INNER	JOIN gen_compania AS C ON PSC.cod_cia = C.cod_cia
		WHERE	PSC.cod_cia = RTRIM(@cod_cia) AND PSC.ind_cia = 0 AND PSC.fec_crea < @Fecha
				AND ((PSC.fec_fin >= @Fecha) OR (PSC.fec_fin IS NULL))
		UNION	ALL
		SELECT	CEC.Id, CEC.cons_esc_calif, CEC.des_esc_calif, CEC.val_cuali
		FROM	GTH_CompEscalaCalifica AS CEC
		INNER	JOIN GTH_ParamSistemaCompetencia AS PSC ON CEC.Id = PSC.Id
		WHERE	PSC.ind_cia = 1 AND PSC.fec_crea < @Fecha
				AND ((PSC.fec_fin >= @Fecha) OR (PSC.fec_fin IS NULL))
		GROUP	BY CEC.Id, CEC.cons_esc_calif, CEC.des_esc_calif, CEC.val_cuali;
	END
END

```
