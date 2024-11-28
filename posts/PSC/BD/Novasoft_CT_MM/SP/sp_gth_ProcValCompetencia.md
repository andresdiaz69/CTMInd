# Stored Procedure: sp_gth_ProcValCompetencia

## Usa los objetos:
- [[Fn_rhh_NombreCompleto]]
- [[gen_compania]]
- [[GTH_Areas]]
- [[GTH_Estados]]
- [[GTH_EvaDesem]]
- [[GTH_EvaDesemDuraProc]]
- [[GTH_EvaDesemGrupoEval]]
- [[GTH_EvaDesemGrupoEvalAsig]]
- [[GTH_Evalua]]
- [[rhh_cargos]]
- [[rhh_emplea]]
- [[rhh_nivcar]]

```sql

-- =============================================
-- Author:		Grace Niño
-- Create date: 27/09/2021
-- Description:	Procedimiento que recibe los datos de los Procesos de Valoración de Competencias
-- =============================================

CREATE PROCEDURE [dbo].[sp_gth_ProcValCompetencia]
	@IndProc		INT, /*1 - Consulta, 2 - Inserción, 3 - Actualización y 4 - Borrado*/
	@IndCons		INT, /*1 - Proceso de Valoración, 2 - Grupos de Valoración, 3 - Asignación de Valoradores, 4 - Cambio Duración del Proceso y 5 - Buscar*/
	@cod_cia		CHAR(3), /*Código Compañía*/
	@cod_eva_des	VARCHAR(6), /*Código Proceso de Valoración*/
	@des_eva		VARCHAR(100), /*Descripción Proceso de Valoración*/
	@fec_ini		DATETIME, /*Fecha Inicial Periodo Evaluado*/
	@fec_fin		DATETIME, /*Fecha Final Periodo Evaluado*/
	@fec_ini_dur	DATETIME, /*Fecha Inicial Duración del Proceso*/
	@fec_fin_dur	DATETIME, /*Fecha Final Duración del Proceso*/
	@cod_est		CHAR(2), /*Código Estado*/
	@ind_portal		BIT, /*Permitir Acceso al Rol Superior consultar evaluación de sus subordinados*/
	@CodGrupVal		INT, /*Consecutivo Grupo de Valoración*/
	@ConsDurProc	INT, /*Consecutivo Cambio Duración*/
	@DtGrupoVal		XML, /*Tabla Grupo de Valoración*/
	@DtGrupoValAsig	XML, /*Tabla Asignación de Tipos de Valoradores*/
	@DtGrupAsig		XML, /*Tabla Definición de Asignación*/
	@DtCambDura		XML /*Tabla Cambio de Duración del Proceso*/
	
--WITH ENCRYPTION
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	DECLARE @idocGrupVal		INT;
	DECLARE @idocGrupValAsig	INT;
	DECLARE @idocGrupAsig		INT;
	DECLARE @idocCambDura		INT;
	DECLARE @strMensaje			VARCHAR(MAX);
	DECLARE @xmlAlerta			XML;

	DECLARE @tAlertas TABLE 
	(
		cod_emp_evador	CHAR(12) COLLATE DATABASE_DEFAULT,
		correo			VARCHAR(200) COLLATE DATABASE_DEFAULT,
		fec_fin_nue		DATETIME
	);
	
	DECLARE @GrupoValoracion	TABLE 
	(
		cod_grup_val	INT,
		des_grup_val	VARCHAR(500) COLLATE DATABASE_DEFAULT,
		tip_eva			CHAR(1) COLLATE DATABASE_DEFAULT,
		des_tip			VARCHAR(100) COLLATE DATABASE_DEFAULT
	);

	DECLARE @GrupoValAsig	TABLE 
	(
		cod_grup_val	INT,
		eva_sup			BIT, 
		peso_eva		DECIMAL(5,2), 
		fec_lim_sup		DATETIME, 
		eva_auto		BIT, 
		peso_eva_a		DECIMAL(5,2), 
		fec_lim_aut		DATETIME, 
		eva_par			BIT, 
		ind_todos_par	BIT, 
		num_par			INT, 
		peso_eva_p		DECIMAL(5,2), 
		fec_lim_par		DATETIME, 
		eva_sub			BIT, 
		ind_todos_sub	BIT, 
		num_sub			INT, 
		peso_eva_s		DECIMAL(5,2), 
		fec_lim_sub		DATETIME, 
		eva_ext			BIT, 
		ind_no_form		BIT, 
		num_ext			INT, 
		peso_eva_e		DECIMAL(5,2), 
		fec_lim_ext		DATETIME, 
		eva_conc		BIT, 
		cal_prom_conc	BIT
	);
	
	DECLARE @GrupoAsignacion	TABLE 
	(
		tip_asig		INT,
		des_tip_asig	VARCHAR(100) COLLATE DATABASE_DEFAULT,
		cod_asig		CHAR(15) COLLATE DATABASE_DEFAULT,
		des_asig		VARCHAR(300) COLLATE DATABASE_DEFAULT,
		cod_eva			VARCHAR(10) COLLATE DATABASE_DEFAULT,
		nom_eva			VARCHAR(200) COLLATE DATABASE_DEFAULT
	);
	
	DECLARE @CambiaDuracion	TABLE 
	(
		cons_dur_proc	INT,
		fec_fin_nue		DATETIME,
		fec_ant_cie		DATETIME,
		cod_sol			CHAR(12) COLLATE DATABASE_DEFAULT,
		nom_sol			VARCHAR(200) COLLATE DATABASE_DEFAULT,
		cod_aut			CHAR(12) COLLATE DATABASE_DEFAULT,
		nom_aut			VARCHAR(200) COLLATE DATABASE_DEFAULT,
		motivo			NVARCHAR(MAX) COLLATE DATABASE_DEFAULT
	);
	
	EXEC sp_xml_preparedocument @idocGrupVal OUTPUT, @DtGrupoVal;
	EXEC sp_xml_preparedocument @idocGrupValAsig OUTPUT, @DtGrupoValAsig;
	EXEC sp_xml_preparedocument @idocGrupAsig OUTPUT, @DtGrupAsig;
	EXEC sp_xml_preparedocument @idocCambDura OUTPUT, @DtCambDura;

	INSERT 
	INTO	@GrupoValoracion (cod_grup_val, des_grup_val, tip_eva, des_tip)
	SELECT	cod_grup_val, des_grup_val, tip_eva, des_tip
	FROM	OPENXML (@idocGrupVal, '/ROOT/GrupoValoracion', 1) WITH(cod_grup_val	INT,
			des_grup_val	VARCHAR(500) COLLATE DATABASE_DEFAULT,
			tip_eva			CHAR(1) COLLATE DATABASE_DEFAULT,
			des_tip			VARCHAR(100) COLLATE DATABASE_DEFAULT);

	INSERT 
	INTO	@GrupoValAsig (cod_grup_val, eva_sup, peso_eva, fec_lim_sup, eva_auto, peso_eva_a, fec_lim_aut, eva_par, ind_todos_par, num_par, peso_eva_p, fec_lim_par, eva_sub, ind_todos_sub, num_sub, peso_eva_s, fec_lim_sub, eva_ext, ind_no_form, num_ext, peso_eva_e, fec_lim_ext, eva_conc, cal_prom_conc)
	SELECT	cod_grup_val, eva_sup, peso_eva, fec_lim_sup, eva_auto, peso_eva_a, fec_lim_aut, eva_par, ind_todos_par, num_par, peso_eva_p, fec_lim_par, eva_sub, ind_todos_sub, num_sub, peso_eva_s, fec_lim_sub, eva_ext, ind_no_form, num_ext, peso_eva_e, fec_lim_ext, eva_conc, cal_prom_conc
	FROM	OPENXML (@idocGrupValAsig, '/ROOT/GrupoValAsig', 1) WITH(cod_grup_val	INT,
			eva_sup			BIT, 
			peso_eva		DECIMAL(5,2), 
			fec_lim_sup		DATETIME, 
			eva_auto		BIT, 
			peso_eva_a		DECIMAL(5,2), 
			fec_lim_aut		DATETIME, 
			eva_par			BIT, 
			ind_todos_par	BIT, 
			num_par			INT, 
			peso_eva_p		DECIMAL(5,2), 
			fec_lim_par		DATETIME, 
			eva_sub			BIT, 
			ind_todos_sub	BIT, 
			num_sub			INT, 
			peso_eva_s		DECIMAL(5,2), 
			fec_lim_sub		DATETIME, 
			eva_ext			BIT, 
			ind_no_form		BIT, 
			num_ext			INT, 
			peso_eva_e		DECIMAL(5,2), 
			fec_lim_ext		DATETIME, 
			eva_conc		BIT, 
			cal_prom_conc	BIT);

	INSERT 
	INTO	@GrupoAsignacion (tip_asig, des_tip_asig, cod_asig, des_asig, cod_eva, nom_eva)
	SELECT	tip_asig, des_tip_asig, cod_asig, des_asig, cod_eva, nom_eva
	FROM	OPENXML (@idocGrupAsig, '/ROOT/GrupoAsignacion', 1) WITH(tip_asig		INT,
			des_tip_asig	VARCHAR(100) COLLATE DATABASE_DEFAULT,
			cod_asig		CHAR(15) COLLATE DATABASE_DEFAULT,
			des_asig		VARCHAR(300) COLLATE DATABASE_DEFAULT,
			cod_eva			VARCHAR(10) COLLATE DATABASE_DEFAULT,
			nom_eva			VARCHAR(200) COLLATE DATABASE_DEFAULT);

	INSERT 
	INTO	@CambiaDuracion (cons_dur_proc, fec_fin_nue, fec_ant_cie, cod_sol, nom_sol, cod_aut, nom_aut, motivo)
	SELECT	cons_dur_proc, fec_fin_nue, fec_ant_cie, cod_sol, nom_sol, cod_aut, nom_aut, motivo
	FROM	OPENXML (@idocCambDura, '/ROOT/CambiaDuracion', 1) WITH(cons_dur_proc	INT,
			fec_fin_nue		DATETIME,
			fec_ant_cie		DATETIME,
			cod_sol			CHAR(12) COLLATE DATABASE_DEFAULT,
			nom_sol			VARCHAR(200) COLLATE DATABASE_DEFAULT,
			cod_aut			CHAR(12) COLLATE DATABASE_DEFAULT,
			nom_aut			VARCHAR(200) COLLATE DATABASE_DEFAULT,
			motivo			NVARCHAR(MAX) COLLATE DATABASE_DEFAULT);

	BEGIN TRY
		BEGIN TRANSACTION
			/*CONSULTAS*/
			IF @IndProc = 1
			BEGIN
				IF @IndCons = 1
				BEGIN
					SELECT	cod_eva_des, des_eva, cod_cia, fec_ini, fec_fin, fec_ini_dur, fec_fin_dur, cod_est, ind_portal
					FROM	GTH_EvaDesem
					WHERE	cod_eva_des = RTRIM(@cod_eva_des) AND cod_cia = RTRIM(@cod_cia);
				END
				IF @IndCons = 2
				BEGIN
					IF @CodGrupVal = 0
					BEGIN
						SELECT	cod_grup_val, des_grup_val, tip_eva, 
								CASE 
									WHEN tip_eva = '1' THEN 'Generado por el Sistema de Competencias' 
									WHEN tip_eva = '2' THEN 'Cuestionario Personalizado'
									WHEN tip_eva = '3' THEN 'Evaluación Concertada'
								END AS des_tip
						FROM	GTH_EvaDesemGrupoEval
						WHERE	cod_eva_des = RTRIM(@cod_eva_des) AND cod_cia = RTRIM(@cod_cia);
					END
					ELSE
					BEGIN
						SELECT	cod_grup_val, eva_sup, peso_eva, fec_lim_sup, eva_auto, peso_eva_a, fec_lim_aut, eva_par, ind_todos_par, num_par,
								peso_eva_p, fec_lim_par, eva_sub, ind_todos_sub, num_sub, peso_eva_s, fec_lim_sub, eva_ext, ind_no_form,
								num_ext, peso_eva_e, fec_lim_ext, eva_conc, cal_prom_conc
						FROM	GTH_EvaDesemGrupoEval
						WHERE	cod_eva_des = RTRIM(@cod_eva_des) AND cod_cia = RTRIM(@cod_cia)
								AND cod_grup_val = @CodGrupVal;
					END
				END
				IF @IndCons = 3
				BEGIN
					IF (@ConsDurProc = 0)
					BEGIN
						SELECT	EDGEA.tip_asig, 'Cargos' AS des_tip_asig, EDGEA.cod_asig, C.nom_car AS des_asig, EDGEA.cod_eva, E.Nom_eva
						FROM	GTH_EvaDesemGrupoEvalAsig AS EDGEA
						INNER	JOIN rhh_cargos AS C ON RTRIM(EDGEA.cod_asig) = C.cod_car
								AND EDGEA.cod_cia = C.cod_cia
						LEFT	JOIN GTH_Evalua AS E ON EDGEA.cod_eva = E.cod_eva
						WHERE	EDGEA.cod_eva_des = RTRIM(@cod_eva_des) AND EDGEA.cod_cia = RTRIM(@cod_cia)
								AND EDGEA.cod_grup_val = @CodGrupVal AND EDGEA.tip_asig = 1
						UNION	ALL
						SELECT	EDGEA.tip_asig, 'Nivel de Cargo' AS des_tip_asig, EDGEA.cod_asig, N.des_niv AS des_asig, EDGEA.cod_eva, E.Nom_eva
						FROM	GTH_EvaDesemGrupoEvalAsig AS EDGEA
						INNER	JOIN rhh_nivcar AS N ON RTRIM(EDGEA.cod_asig) = N.niv_car
						LEFT	JOIN GTH_Evalua AS E ON EDGEA.cod_eva = E.cod_eva
						WHERE	EDGEA.cod_eva_des = RTRIM(@cod_eva_des) AND EDGEA.cod_cia = RTRIM(@cod_cia)
								AND EDGEA.cod_grup_val = @CodGrupVal AND EDGEA.tip_asig = 2
						UNION	ALL
						SELECT	EDGEA.tip_asig, 'Área' AS des_tip_asig, EDGEA.cod_asig, A.des_area AS des_asig, EDGEA.cod_eva, E.Nom_eva
						FROM	GTH_EvaDesemGrupoEvalAsig AS EDGEA
						INNER	JOIN GTH_Areas AS A ON RTRIM(EDGEA.cod_asig) = A.cod_area
								AND EDGEA.cod_cia = A.cod_cia
						LEFT	JOIN GTH_Evalua AS E ON EDGEA.cod_eva = E.cod_eva
						WHERE	EDGEA.cod_eva_des = RTRIM(@cod_eva_des) AND EDGEA.cod_cia = RTRIM(@cod_cia)
								AND EDGEA.cod_grup_val = @CodGrupVal AND EDGEA.tip_asig = 3
						UNION	ALL
						SELECT	EDGEA.tip_asig, 'Individual' AS des_tip_asig, EDGEA.cod_asig, dbo.Fn_rhh_NombreCompleto(RTRIM(EDGEA.cod_asig), 2) AS des_asig, EDGEA.cod_eva, E.Nom_eva
						FROM	GTH_EvaDesemGrupoEvalAsig AS EDGEA
						LEFT	JOIN GTH_Evalua AS E ON EDGEA.cod_eva = E.cod_eva
						WHERE	EDGEA.cod_eva_des = RTRIM(@cod_eva_des) AND EDGEA.cod_cia = RTRIM(@cod_cia)
								AND EDGEA.cod_grup_val = @CodGrupVal AND EDGEA.tip_asig = 4;
					END
					IF (@ConsDurProc = 1)
					BEGIN
						SELECT	CONVERT(BIT,0) AS ind_sel, cod_car AS Codigo, nom_car AS Nombre
						FROM	rhh_cargos
						WHERE	cod_cia = RTRIM(@cod_cia) AND cod_car NOT IN (SELECT cod_asig FROM GTH_EvaDesemGrupoEvalAsig 
								WHERE cod_eva_des = RTRIM(@cod_eva_des) AND cod_cia = RTRIM(@cod_cia)
								AND cod_grup_val = @CodGrupVal AND tip_asig = 1);
					END
					IF (@ConsDurProc = 2)
					BEGIN
						SELECT	CONVERT(BIT,0) AS ind_sel, niv_car AS Codigo, des_niv AS Nombre
						FROM	rhh_nivcar
						WHERE	niv_car NOT IN (SELECT cod_asig FROM GTH_EvaDesemGrupoEvalAsig 
								WHERE cod_eva_des = RTRIM(@cod_eva_des) AND cod_cia = RTRIM(@cod_cia)
								AND cod_grup_val = @CodGrupVal AND tip_asig = 2);
					END
					IF (@ConsDurProc = 3)
					BEGIN
						SELECT	CONVERT(BIT,0) AS ind_sel, cod_area AS Codigo, des_area AS Nombre
						FROM	GTH_Areas
						WHERE	cod_cia = RTRIM(@cod_cia) AND cod_area NOT IN (SELECT cod_asig FROM GTH_EvaDesemGrupoEvalAsig 
								WHERE cod_eva_des = RTRIM(@cod_eva_des) AND cod_cia = RTRIM(@cod_cia)
								AND cod_grup_val = @CodGrupVal AND tip_asig = 3);
					END
					IF (@ConsDurProc = 4)
					BEGIN
						SELECT	CONVERT(BIT,0) AS ind_sel, cod_emp AS Codigo, dbo.Fn_rhh_NombreCompleto(cod_emp, 2) AS Nombre
						FROM	rhh_emplea
						WHERE	cod_cia = RTRIM(@cod_cia) AND cod_emp NOT IN (SELECT cod_asig FROM GTH_EvaDesemGrupoEvalAsig 
								WHERE cod_eva_des = RTRIM(@cod_eva_des) AND cod_cia = RTRIM(@cod_cia)
								AND cod_grup_val = @CodGrupVal AND tip_asig = 4) AND est_lab NOT IN ('00','99');
					END
				END
				IF @IndCons = 4
				BEGIN
					IF @ConsDurProc = 0
					BEGIN
						SELECT	cons_dur_proc, fec_fin_nue, fec_ant_cie, cod_sol, dbo.Fn_rhh_NombreCompleto(cod_sol,2) AS des_sol,
								cod_aut, dbo.Fn_rhh_NombreCompleto(cod_aut,2) AS des_aut, motivo
						FROM	GTH_EvaDesemDuraProc
						WHERE	cod_eva_des = RTRIM(@cod_eva_des) AND cod_cia = RTRIM(@cod_cia);
					END
					ELSE
					BEGIN
						SELECT	cons_dur_proc, fec_fin_nue, fec_ant_cie, cod_sol, dbo.Fn_rhh_NombreCompleto(cod_sol,2) AS des_sol,
								cod_aut, dbo.Fn_rhh_NombreCompleto(cod_aut,2) AS des_aut, motivo
						FROM	GTH_EvaDesemDuraProc
						WHERE	cod_eva_des = RTRIM(@cod_eva_des) AND cod_cia = RTRIM(@cod_cia)
								AND cons_dur_proc = @ConsDurProc;
					END
				END
				IF @IndCons = 5
				BEGIN
					SELECT	ED.cod_cia, C.nom_cia, ED.cod_eva_des, ED.des_eva, ED.fec_ini, ED.fec_fin, ED.cod_est, E.Des_Est
					FROM	GTH_EvaDesem AS ED
					INNER	JOIN gen_compania AS C ON ED.cod_cia = C.cod_cia
					INNER	JOIN GTH_Estados AS E ON ED.cod_est = E.cod_est;
				END
			END

			/*INSERCIÓN*/
			IF @IndProc = 2
			BEGIN
				IF @IndCons = 1
				BEGIN
					INSERT
					INTO	GTH_EvaDesem (cod_eva_des, des_eva, fec_ini, fec_fin, cod_est, cod_cia, fec_ini_dur, fec_fin_dur, ind_portal)
 					VALUES	(@cod_eva_des, @des_eva, @fec_ini, @fec_fin, @cod_est, @cod_cia, @fec_ini_dur, @fec_fin_dur, @ind_portal);
				END
				IF @IndCons = 2
				BEGIN
					SELECT	@CodGrupVal = MAX(cod_grup_val) + 1
					FROM	GTH_EvaDesemGrupoEval
					WHERE	cod_eva_des = RTRIM(@cod_eva_des) AND cod_cia = RTRIM(@cod_cia);

					INSERT
					INTO	GTH_EvaDesemGrupoEval(cod_eva_des, cod_cia, cod_grup_val, des_grup_val, tip_eva)
					SELECT	@cod_eva_des, @cod_cia, ISNULL(@CodGrupVal,1), des_grup_val, tip_eva
					FROM	@GrupoValoracion;

					SELECT @CodGrupVal AS CodGrupVal;
				END
				IF @IndCons = 3
				BEGIN
					INSERT
					INTO	GTH_EvaDesemGrupoEvalAsig(cod_eva_des, cod_cia, cod_grup_val, tip_asig, cod_asig, cod_eva)
					SELECT	@cod_eva_des, @cod_cia, @CodGrupVal, tip_asig, cod_asig, cod_eva
					FROM	@GrupoAsignacion;
				END
				IF @IndCons = 4
				BEGIN
					SELECT	@ConsDurProc = MAX(cons_dur_proc) + 1
					FROM	GTH_EvaDesemDuraProc
					WHERE	cod_eva_des = RTRIM(@cod_eva_des) AND cod_cia = RTRIM(@cod_cia);

					INSERT
					INTO	GTH_EvaDesemDuraProc(cod_eva_des, cod_cia, cons_dur_proc, fec_fin_nue, fec_ant_cie, cod_sol, cod_aut, motivo)
					SELECT	@cod_eva_des, @cod_cia, ISNULL(@ConsDurProc,1), fec_fin_nue, fec_ant_cie, cod_sol, cod_aut, motivo
					FROM	@CambiaDuracion;

					UPDATE	GTH_EvaDesem
					SET		fec_fin_dur = CD.fec_fin_nue,
							cod_est = iif(CD.fec_fin_nue > GETDATE(), '07', cod_est)
					FROM	GTH_EvaDesem AS ED
					INNER	JOIN @CambiaDuracion AS CD ON ED.cod_eva_des = RTRIM(@cod_eva_des)
							AND ED.cod_cia = RTRIM(@cod_cia);

					UPDATE	GTH_EvaDesemGrupoEval
					SET		fec_lim_sup = IIF(E.eva_sup = 1, C.fec_fin_nue, NULL),
							fec_lim_sub = IIF(E.eva_sub = 1, C.fec_fin_nue, NULL),
							fec_lim_par = IIF(E.eva_par = 1, C.fec_fin_nue, NULL),
							fec_lim_aut = IIF(E.eva_auto = 1, C.fec_fin_nue, NULL),
							fec_lim_ext = IIF(E.eva_ext = 1, C.fec_fin_nue, NULL)
					FROM	GTH_EvaDesemGrupoEval AS E
					INNER	JOIN @CambiaDuracion AS C ON E.cod_eva_des = RTRIM(@cod_eva_des)
							AND E.cod_cia = RTRIM(@cod_cia);

					SELECT @ConsDurProc AS ConsDurProc;
				END
			END
	
			/*ACTUALIZACIÓN*/
			IF @IndProc = 3
			BEGIN
				IF @IndCons = 1
				BEGIN
					SELECT	@strMensaje = IIF(des_eva != @des_eva, 'Nombre Anterior: ' + RTRIM(des_eva) + ', Nombre Actual: ' + RTRIM(@des_eva) + ',', '') +
							IIF(fec_ini != @fec_ini, 'Periodo Evaluado Desde Anterior: ' + RTRIM(CONVERT(VARCHAR, fec_ini, 103)) + ', Periodo Evaluado Desde Actual: ' + RTRIM(CONVERT(VARCHAR, @fec_ini, 103)) + ',', '') +
							IIF(fec_fin != @fec_fin, 'Periodo Evaluado Hasta Anterior: ' + RTRIM(CONVERT(VARCHAR, fec_fin, 103)) + ', Periodo Evaluado Hasta Actual: ' + RTRIM(CONVERT(VARCHAR, @fec_fin, 103)) + ',', '') +
							IIF(cod_est != @cod_est, 'Estado Anterior: ' + RTRIM(cod_est) + ', Estado Actual: ' + RTRIM(@cod_est) + ',', '') +
							IIF(fec_ini_dur != @fec_ini_dur, 'Duración del Proceso Desde Anterior: ' + RTRIM(CONVERT(VARCHAR, fec_ini_dur, 103)) + ', Duración del Proceso Desde Actual: ' + RTRIM(CONVERT(VARCHAR, @fec_ini_dur, 103)) + ',', '') +
							IIF(fec_fin_dur != @fec_fin_dur, 'Duración del Proceso Hasta Anterior: ' + RTRIM(CONVERT(VARCHAR, fec_fin_dur, 103)) + ', Duración del Proceso Hasta Actual: ' + RTRIM(CONVERT(VARCHAR, @fec_fin_dur, 103)) + ',', '') +
							IIF(ind_portal != @ind_portal, 'Acceso al Rol Superior Anterior: ' + iif(ind_portal = 1, 'Sí', 'No') + ', Nombre Actual: ' + iif(@ind_portal = 1, 'Sí', 'No'), '')
					FROM	GTH_EvaDesem
					WHERE	cod_eva_des = RTRIM(@cod_eva_des) AND cod_cia = RTRIM(@cod_cia);
					
					UPDATE	GTH_EvaDesem
					SET		des_eva = @des_eva,
							fec_ini = @fec_ini,
							fec_fin = @fec_fin,
							cod_est = @cod_est,
							fec_ini_dur = @fec_ini_dur,
							fec_fin_dur = @fec_fin_dur,
							ind_portal = @ind_portal
					WHERE	cod_eva_des = RTRIM(@cod_eva_des) AND cod_cia = RTRIM(@cod_cia);
				END
				IF @IndCons = 2
				BEGIN
					IF (SELECT COUNT(1) FROM @GrupoValoracion) > 0
					BEGIN
						SELECT	@strMensaje = IIF(GE.des_grup_val != GV.des_grup_val, 'Nombre Grupo Anterior: ' + RTRIM(GE.des_grup_val) + ', Nombre Grupo Actual: ' + RTRIM(GV.des_grup_val) + ',', '') +
								IIF(GE.tip_eva != GV.tip_eva, 'Estilo de Evaluación Anterior: ' + RTRIM(GE.tip_eva) + ', Estilo de Evaluación Actual: ' + RTRIM(GV.tip_eva), '')
						FROM	GTH_EvaDesemGrupoEval AS GE
						INNER	JOIN @GrupoValoracion AS GV ON GE.cod_eva_des = RTRIM(@cod_eva_des)
								AND GE.cod_cia = RTRIM(@cod_cia) AND GE.cod_grup_val = @CodGrupVal
								AND GE.cod_grup_val = GV.cod_grup_val;

						UPDATE	GTH_EvaDesemGrupoEval
						SET		des_grup_val = GV.des_grup_val,
								tip_eva = GV.tip_eva
						FROM	GTH_EvaDesemGrupoEval AS GE
						INNER	JOIN @GrupoValoracion AS GV ON GE.cod_eva_des = RTRIM(@cod_eva_des)
								AND GE.cod_cia = RTRIM(@cod_cia) AND GE.cod_grup_val = @CodGrupVal
								AND GE.cod_grup_val = GV.cod_grup_val;
					END
					IF (SELECT COUNT(1) FROM @GrupoValAsig) > 0
					BEGIN
						SELECT	@strMensaje = IIF(GE.eva_sup != GV.eva_sup, 'Rol Superior Activo - Anterior: ' + iif(GE.eva_sup = 1, 'Sí', 'No') + ', Rol Superior Activo - Actual: ' + iif(GV.eva_sup = 1, 'Sí', 'No') + ',', '') +
								IIF(GE.peso_eva != GV.peso_eva, 'Peso Rol Superior Anterior: ' + RTRIM(CONVERT(VARCHAR, GE.peso_eva)) + ', Peso Rol Superior Actual: ' + RTRIM(CONVERT(VARCHAR, GV.peso_eva)) + ',', '') +
								IIF(GE.fec_lim_sup != GV.fec_lim_sup, 'Fecha Límite Rol Superior Anterior: ' + RTRIM(CONVERT(VARCHAR, GE.fec_lim_sup, 103)) + ', Fecha Límite Rol Superior Actual: ' + RTRIM(CONVERT(VARCHAR, GV.fec_lim_sup, 103)) + ',', '') +
								IIF(GE.eva_auto != GV.eva_auto, 'Rol Autoevalua Activo - Anterior: ' + iif(GE.eva_auto = 1, 'Sí', 'No') + ', Rol Autoevalua Activo - Actual: ' + iif(GV.eva_auto = 1, 'Sí', 'No') + ',', '') +
								IIF(GE.peso_eva_a != GV.peso_eva_a, 'Peso Rol Autoevalua Anterior: ' + RTRIM(CONVERT(VARCHAR, GE.peso_eva_a)) + ', Peso Rol Autoevalua Actual: ' + RTRIM(CONVERT(VARCHAR, GV.peso_eva_a)) + ',', '') +
								IIF(GE.fec_lim_aut != GV.fec_lim_aut, 'Fecha Límite Rol Autoevalua Anterior: ' + RTRIM(CONVERT(VARCHAR, GE.fec_lim_aut, 103)) + ', Fecha Límite Rol Autoevalua Actual: ' + RTRIM(CONVERT(VARCHAR, GV.fec_lim_aut, 103)) + ',', '') +
								IIF(GE.eva_par != GV.eva_par, 'Rol Par Activo - Anterior: ' + iif(GE.eva_par = 1, 'Sí', 'No') + ', Rol Par Activo - Actual: ' + iif(GV.eva_par = 1, 'Sí', 'No') + ',', '') +
								IIF(GE.ind_todos_par != GV.ind_todos_par, 'Asignar Todos los Pares Activo - Anterior: ' + iif(GE.ind_todos_par = 1, 'Sí', 'No') + ', Asignar Todos los Pares Activo - Actual: ' + iif(GV.ind_todos_par = 1, 'Sí', 'No') + ',', '') +
								IIF(GE.num_par != GV.num_par, 'Cantidad de Pares Anterior: ' + RTRIM(CONVERT(VARCHAR, GE.num_par)) + ', Cantidad de Pares Actual: ' + RTRIM(CONVERT(VARCHAR, GV.num_par)) + ',', '') +
								IIF(GE.peso_eva_p != GV.peso_eva_p, 'Peso Rol Par Anterior: ' + RTRIM(CONVERT(VARCHAR, GE.peso_eva_p)) + ', Peso Rol Par Actual: ' + RTRIM(CONVERT(VARCHAR, GV.peso_eva_p)) + ',', '') +
								IIF(GE.fec_lim_par != GV.fec_lim_par, 'Fecha Límite Rol Par Anterior: ' + RTRIM(CONVERT(VARCHAR, GE.fec_lim_par, 103)) + ', Fecha Límite Rol Par Actual: ' + RTRIM(CONVERT(VARCHAR, GV.fec_lim_par, 103)) + ',', '') +
								IIF(GE.eva_sub != GV.eva_sub, 'Rol Subalterno Activo - Anterior: ' + iif(GE.eva_sub = 1, 'Sí', 'No') + ', Rol Subalterno Activo - Actual: ' + iif(GV.eva_sub = 1, 'Sí', 'No') + ',', '') +
								IIF(GE.ind_todos_sub != GV.ind_todos_sub, 'Asignar Todos los Subalternos Activo - Anterior: ' + iif(GE.ind_todos_sub = 1, 'Sí', 'No') + ', Asignar Todos los Subalternos Activo - Actual: ' + iif(GV.ind_todos_sub = 1, 'Sí', 'No') + ',', '') +
								IIF(GE.num_sub != GV.num_sub, 'Cantidad de Subalternos Anterior: ' + RTRIM(CONVERT(VARCHAR, GE.num_sub)) + ', Cantidad de Subalternos Actual: ' + RTRIM(CONVERT(VARCHAR, GV.num_sub)) + ',', '') +
								IIF(GE.peso_eva_s != GV.peso_eva_s, 'Peso Rol Subalterno Anterior: ' + RTRIM(CONVERT(VARCHAR, GE.peso_eva_s)) + ', Peso Rol Subalterno Actual: ' + RTRIM(CONVERT(VARCHAR, GV.peso_eva_s)) + ',', '') +
								IIF(GE.fec_lim_sub != GV.fec_lim_sub, 'Fecha Límite Rol Subalterno Anterior: ' + RTRIM(CONVERT(VARCHAR, GE.fec_lim_sub, 103)) + ', Fecha Límite Rol Subalterno Actual: ' + RTRIM(CONVERT(VARCHAR, GV.fec_lim_sub, 103)) + ',', '') +
								IIF(GE.eva_ext != GV.eva_ext, 'Rol Externo Activo - Anterior: ' + iif(GE.eva_ext = 1, 'Sí', 'No') + ', Rol Externo Activo - Actual: ' + iif(GV.eva_ext = 1, 'Sí', 'No') + ',', '') +
								IIF(GE.ind_no_form != GV.ind_no_form, 'No usa cuestionario Activo - Anterior: ' + iif(GE.ind_no_form = 1, 'Sí', 'No') + ', No usa cuestionario Activo - Actual: ' + iif(GV.ind_no_form = 1, 'Sí', 'No') + ',', '') +
								IIF(GE.num_ext != GV.num_ext, 'Cantidad de Externos Anterior: ' + RTRIM(CONVERT(VARCHAR, GE.num_ext)) + ', Cantidad de Externos Actual: ' + RTRIM(CONVERT(VARCHAR, GV.num_ext)) + ',', '') +
								IIF(GE.peso_eva_e != GV.peso_eva_e, 'Peso Rol Externo Anterior: ' + RTRIM(CONVERT(VARCHAR, GE.peso_eva_e)) + ', Peso Rol Externo Actual: ' + RTRIM(CONVERT(VARCHAR, GV.peso_eva_e)) + ',', '') +
								IIF(GE.fec_lim_ext != GV.fec_lim_ext, 'Fecha Límite Rol Externo Anterior: ' + RTRIM(CONVERT(VARCHAR, GE.fec_lim_ext, 103)) + ', Fecha Límite Rol Externo Actual: ' + RTRIM(CONVERT(VARCHAR, GV.fec_lim_ext, 103)) + ',', '') +
								IIF(GE.eva_conc != GV.eva_conc, 'Rol Evaluación Concertada Activo - Anterior: ' + iif(GE.eva_conc = 1, 'Sí', 'No') + ', Rol Evaluación Concertada Activo - Actual: ' + iif(GV.eva_conc = 1, 'Sí', 'No') + ',', '') +
								IIF(GE.cal_prom_conc != GV.cal_prom_conc, 'Cálculo Promediado Activo - Anterior: ' + iif(GE.cal_prom_conc = 1, 'Sí', 'No') + ', Cálculo Promediado Activo - Actual: ' + iif(GV.cal_prom_conc = 1, 'Sí', 'No'), '')
						FROM	GTH_EvaDesemGrupoEval AS GE
						INNER	JOIN @GrupoValAsig AS GV ON GE.cod_grup_val = GV.cod_grup_val
						WHERE	GE.cod_eva_des = RTRIM(@cod_eva_des) AND GE.cod_cia = RTRIM(@cod_cia)
								AND GE.cod_grup_val = @CodGrupVal;

						UPDATE	GTH_EvaDesemGrupoEval
						SET		eva_sup = GV.eva_sup,
								peso_eva = GV.peso_eva,
								fec_lim_sup = GV.fec_lim_sup,
								eva_auto = GV.eva_auto,
								peso_eva_a = GV.peso_eva_a,
								fec_lim_aut = GV.fec_lim_aut,
								eva_par = GV.eva_par,
								ind_todos_par = GV.ind_todos_par,
								num_par = GV.num_par,
								peso_eva_p = GV.peso_eva_p,
								fec_lim_par = GV.fec_lim_par,
								eva_sub = GV.eva_sub,
								ind_todos_sub = GV.ind_todos_sub,
								num_sub = GV.num_sub,
								peso_eva_s = GV.peso_eva_s,
								fec_lim_sub = GV.fec_lim_sub,
								eva_ext = GV.eva_ext,
								ind_no_form = GV.ind_no_form,
								num_ext = GV.num_ext,
								peso_eva_e = GV.peso_eva_e,
								fec_lim_ext = GV.fec_lim_ext,
								eva_conc = GV.eva_conc,
								cal_prom_conc = GV.cal_prom_conc
						FROM	GTH_EvaDesemGrupoEval AS GE
						INNER	JOIN @GrupoValAsig AS GV ON GE.cod_grup_val = GV.cod_grup_val
						WHERE	GE.cod_eva_des = RTRIM(@cod_eva_des) AND GE.cod_cia = RTRIM(@cod_cia)
								AND GE.cod_grup_val = @CodGrupVal;
					END
				END
				IF @IndCons = 4
				BEGIN
					SELECT	@strMensaje = IIF(DP.fec_fin_nue != CD.fec_fin_nue, 'Nueva Fecha Finalización Anterior: ' + RTRIM(CONVERT(VARCHAR, DP.fec_fin_nue, 103)) + ', Nueva Fecha Finalización Actual: ' + RTRIM(CONVERT(VARCHAR, CD.fec_fin_nue, 103)) + ',', '') +
							IIF(DP.cod_sol != CD.cod_sol, 'Quien Solicita Anterior: ' + RTRIM(DP.cod_sol) + ', Quien Solicita Actual: ' + RTRIM(CD.cod_sol) + ',', '') +
							IIF(DP.cod_aut != CD.cod_aut, 'Quien Autoriza Anterior: ' + RTRIM(DP.cod_aut) + ', Quien Autoriza Actual: ' + RTRIM(CD.cod_aut) + ',', '') +
							IIF(DP.motivo != CD.motivo, 'Motivo Anterior: ' + RTRIM(DP.motivo) + ', Motivo Actual: ' + RTRIM(CD.motivo), '')
					FROM	GTH_EvaDesemDuraProc AS DP
					INNER	JOIN @CambiaDuracion AS CD ON DP.cod_eva_des = RTRIM(@cod_eva_des)
							AND DP.cod_cia = RTRIM(@cod_cia) AND DP.cons_dur_proc = CD.cons_dur_proc;

					UPDATE	GTH_EvaDesemDuraProc
					SET		fec_fin_nue = CD.fec_fin_nue,
							cod_sol = CD.cod_sol,
							cod_aut = CD.cod_aut,
							motivo = CD.motivo
					FROM	GTH_EvaDesemDuraProc AS DP
					INNER	JOIN @CambiaDuracion AS CD ON DP.cod_eva_des = RTRIM(@cod_eva_des)
							AND DP.cod_cia = RTRIM(@cod_cia) AND DP.cons_dur_proc = CD.cons_dur_proc;
				END

				SELECT @strMensaje AS MensajeAuditoria;
			END

			/*BORRADO*/
			IF @IndProc = 4
			BEGIN
				IF @IndCons = 1
				BEGIN
					DELETE
					FROM	GTH_EvaDesem
					WHERE	cod_eva_des = RTRIM(@cod_eva_des) AND cod_cia = RTRIM(@cod_cia);
				END
				IF @IndCons = 2
				BEGIN
					DELETE	
					FROM	GTH_EvaDesemGrupoEval
					WHERE	cod_eva_des = RTRIM(@cod_eva_des) AND cod_cia = RTRIM(@cod_cia)
							AND cod_grup_val = @CodGrupVal;
				END
				IF @IndCons = 3
				BEGIN
					DELETE	GTH_EvaDesemGrupoEvalAsig
					FROM	GTH_EvaDesemGrupoEvalAsig AS GEA
					LEFT	OUTER JOIN @GrupoAsignacion AS GA ON GEA.tip_asig = GA.tip_asig
							AND GEA.cod_asig = GA.cod_asig
					WHERE	GEA.cod_eva_des = RTRIM(@cod_eva_des) AND GEA.cod_cia = RTRIM(@cod_cia)
							AND GA.tip_asig IS NULL AND GA.cod_asig IS NULL;
				END
				IF @IndCons = 4
				BEGIN
					DELETE
					FROM	GTH_EvaDesemDuraProc
					WHERE	cod_eva_des = RTRIM(@cod_eva_des) AND cod_cia = RTRIM(@cod_cia)
							AND cons_dur_proc = @ConsDurProc;
				END
			END

			EXEC sp_xml_removedocument @idocGrupVal;
			EXEC sp_xml_removedocument @idocGrupValAsig;
			EXEC sp_xml_removedocument @idocGrupAsig;
			EXEC sp_xml_removedocument @idocCambDura;
			
		COMMIT TRANSACTION
	END TRY
	BEGIN CATCH
		WHILE @@TRANCOUNT > 0
		BEGIN
			ROLLBACK TRANSACTION;
		END;

		THROW
	END CATCH 
END

```
