# Stored Procedure: sp_gth_ConsGridProcesoDesvinculacion

## Usa los objetos:
- [[fn_rhh_contratofch]]
- [[GTH_ConsPazySalvo]]
- [[GTH_Contrato_Docum]]
- [[GTH_DocumDesvin]]
- [[GTH_Emplea_Externo]]
- [[GTH_EntregaCargo]]
- [[GTH_EntrevistaDesvin]]
- [[GTH_Eval_Estado_Pers]]
- [[GTH_Evalua]]
- [[GTH_Evalua_Estado]]
- [[GTH_Evalua_Respuesta]]
- [[GTH_ExamenDesvin]]
- [[GTH_PazySalvo]]
- [[GTH_TipoExamen]]
- [[rhh_emplea]]
- [[SST_ExaMedicos]]
- [[SST_ExamenMedicoEmplea]]

```sql


-- =============================================
-- Author:		Andrea Velez
-- Create date: Mayo / 2019
-- Description:	Realiza la inserción, consulta y eliminación para los Grids Proceso de Desvinculación
-- =============================================

CREATE PROCEDURE [dbo].[sp_gth_ConsGridProcesoDesvinculacion]
	@IndFun		INT, /*1 - Creación, 2 - Consulta, 3 - Eliminación, 4 - Actualización*/
	@Cod_emp	CHAR(12),
	@fec_proc	DATETIME,
	@cod_activ	INT,
	@cita		INT,
	@cvoexa     INT OUTPUT,
	@codpaz     INT,
	@conse		INT OUTPUT,
	@codeva		VARCHAR(10),
	@proceso	INT /*1 - Entrevista, 2 - Acta Entrega Cargo, 3 - Paz y Salvo, 4 - Examenes, 5 - Documentos */,
	@DtEntrev	XML,-- vtu_gth_EntrevistaDesvin READONLY,
	@DtExam		XML,--vtu_gth_ExaMedico READONLY,
	@DtPaz		XML,--vtu_gth_pazysalvo READONLY,
	@DtDocu		XML,--vtu_gth_Documento READONLY,
	@DtEntCar	XML--vtu_gth_EntregaCargo READONLY
	
--WITH ENCRYPTION 
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	DECLARE @ID			INT;
	DECLARE @consec_eva	INT;
	DECLARE @cod_eva	VARCHAR(10);
	DECLARE @cod_cont	CHAR(12);
	DECLARE @tip_cita	INT;
	
	DECLARE @id_entre	INT;
	DECLARE @id_cargo	INT;
	DECLARE @id_paz		INT;
	DECLARE @id_exa		INT;	
	DECLARE @id_docu	INT;

	DECLARE @entrevista	TABLE 
	(
		ID				INT IDENTITY,
		cod_emp			CHAR(12) COLLATE DATABASE_DEFAULT NULL, 
		fec_proc		DATETIME,
		cod_activ		INT,
		tipo_cita		INT, 
		fec_cita		DATETIME, 
		hora_cita		VARCHAR(10) COLLATE DATABASE_DEFAULT NULL, 
		lug_cita		CHAR(100) COLLATE DATABASE_DEFAULT NULL,
		cod_conta		CHAR(12) COLLATE DATABASE_DEFAULT NULL, 
		cod_eva			VARCHAR(10) COLLATE DATABASE_DEFAULT NULL, 
		notificacion	BIT
	);

	DECLARE @cargo	TABLE 
	(
		ID				INT IDENTITY,
		cod_emp			CHAR(12) COLLATE DATABASE_DEFAULT NULL, 
		fec_proc		DATETIME, 
		cod_activ		INT, 
		cod_eva			VARCHAR(10) COLLATE DATABASE_DEFAULT NULL, 
		Aprobado		BIT, 
		observacion		NVARCHAR(MAX) COLLATE DATABASE_DEFAULT NULL
	);

	DECLARE @paz	TABLE 
	(
		ID				INT IDENTITY,
		cod_emp			CHAR(12) COLLATE DATABASE_DEFAULT NULL, 
		fec_proc		DATETIME, 
		cod_activ		INT,
		cod_pazysalvo	INT, 
		cod_resp		CHAR(12) COLLATE DATABASE_DEFAULT NULL, 
		fec_valida		DATETIME, 
		pazysalvo		BIT, 
		detalle			VARCHAR(MAX) COLLATE DATABASE_DEFAULT NULL
	);

	DECLARE @examen	TABLE 
	(
		ID				INT IDENTITY,
		cod_emp			CHAR(12) COLLATE DATABASE_DEFAULT NULL,
		fec_proc		DATETIME, 
		cod_activ		INT, 
		cvo_exmed		INT, 
		tip_exmed		CHAR(2) COLLATE DATABASE_DEFAULT NULL, 
		fec_exmed		DATETIME, 
		prov_resp		CHAR(15) COLLATE DATABASE_DEFAULT NULL, 
		ind_apto		TINYINT, 
		obs_exmed		VARCHAR(MAX) COLLATE DATABASE_DEFAULT NULL, 
		cod_exa_med		INT				
	);

	DECLARE @docu	TABLE 
	(
		ID				INT IDENTITY,
		cod_emp			CHAR(12) COLLATE DATABASE_DEFAULT NULL,
		fec_proc		DATETIME, 
		cod_activ		INT, 
		conse			INT, 
		nombre			VARCHAR(100) COLLATE DATABASE_DEFAULT NULL, 
		fec_entrega		DATETIME
	);

	BEGIN TRY
		BEGIN TRANSACTION

			----- ENTREVISTA -------
			IF @proceso = 1
			BEGIN
				EXEC sp_xml_preparedocument @id_entre OUTPUT, @DtEntrev;

				INSERT
				INTO @entrevista (cod_emp, fec_proc, cod_activ, tipo_cita, fec_cita, hora_cita, lug_cita, cod_conta, cod_eva, notificacion)
				SELECT	cod_emp, fec_proc, cod_activ, tipo_cita, fec_cita, hora_cita, lug_cita, cod_conta, cod_eva, notificacion
				FROM	OPENXML (@id_entre, '/ROOT/Entrevista', 1) WITH(cod_emp CHAR(12), fec_proc DATETIME, cod_activ INT,
							tipo_cita INT, fec_cita DATETIME, hora_cita	VARCHAR(10), lug_cita CHAR(100), cod_conta CHAR(12), 
							cod_eva	VARCHAR(10), notificacion BIT);

				IF @IndFun = 1
				BEGIN
					SELECT  @cod_cont = cod_conta, @cod_eva = cod_eva, @tip_cita = tipo_cita
					FROM	@entrevista;

					INSERT
					INTO	GTH_EntrevistaDesvin(cod_emp, fec_proc, cod_activ, tipo_cita, fec_cita, hora_cita, lug_cita, cod_conta, cod_eva, notificacion)
					SELECT  @Cod_emp, @fec_proc, @cod_activ, tipo_cita, fec_cita, hora_cita, lug_cita, cod_conta, @cod_eva, notificacion
					FROM	@entrevista;

					INSERT
					INTO	GTH_Evalua_Estado (cod_eva, cod_ori, fec_lim, version, cod_est)
					VALUES  (@cod_eva, '12', @fec_proc, @cod_emp, 1);

					SELECT	@consec_eva = consec_eva
					FROM	GTH_Evalua_Estado
					WHERE	cod_eva = @cod_eva AND cod_ori = '12'
							AND fec_lim = @fec_proc AND version = @cod_emp;

					INSERT
					INTO	GTH_Eval_Estado_Pers (consec_eva, cod_eva, cod_emp_evado, cod_emp_respond, cod_rpt_respond, cod_ter_respond, fec_ing, est_eval_pers, fec_proc, num_ent)
					VALUES	(@consec_eva, @cod_eva, @cod_emp, @cod_cont, NULL, NULL, GETDATE(), 1, @fec_proc, @tip_cita);
				END

				IF @IndFun = 2
				BEGIN
					SELECT	D.tipo_cita, CASE WHEN D.tipo_cita = 1 THEN 'Entrevista Presencial' 
											  WHEN D.tipo_cita = 2 THEN 'Entrevista Telefónica' 
											  ELSE 'Diligencia el Empleado' END AS Nom_Citacion,
							D.fec_cita, D.hora_cita, D.lug_cita, D.cod_conta, RTRIM(E.ap1_emp)+ ' ' + RTRIM(E.ap2_emp) +' '+ RTRIM(E.nom_emp) AS nom_conta,
							D.cod_eva, EV.Nom_eva AS des_eva, D.notificacion
					FROM	GTH_EntrevistaDesvin AS D
					INNER	JOIN rhh_emplea AS E ON D.cod_conta = E.cod_emp
					LEFT	JOIN GTH_Evalua AS EV ON D.cod_eva = EV.cod_eva
					WHERE	D.cod_emp = RTRIM(@Cod_emp) 
						AND CAST(D.fec_proc AS DATE) = CAST(@fec_proc AS DATE)
							AND D.cod_activ = @cod_activ;
				END

				IF @IndFun = 3
				BEGIN
					SELECT	@ID = EEP.id
					FROM	GTH_Eval_Estado_Pers AS EEP
					INNER	JOIN GTH_Evalua_Estado AS TE ON EEP.consec_eva = TE.consec_eva
							AND EEP.cod_eva = TE.cod_eva AND TE.cod_ori = '12'
							AND TE.fec_lim = EEP.fec_proc AND TE.version = EEP.cod_emp_evado
					WHERE	EEP.fec_proc = @fec_proc AND EEP.cod_emp_evado = RTRIM(@Cod_emp)
							AND EEP.num_ent = @cita;

					DELETE
					FROM	GTH_Evalua_Respuesta
					WHERE	id = @ID;

					DELETE
					FROM	GTH_Eval_Estado_Pers
					WHERE	id = @ID;

					DELETE 
					FROM	GTH_EntrevistaDesvin
					WHERE	cod_emp = @Cod_emp AND fec_proc = @fec_proc
							AND cod_activ = @cod_activ AND tipo_cita = @cita;
				END

				IF @IndFun = 4
				BEGIN
					UPDATE	GTH_EntrevistaDesvin
					SET		fec_cita = E.fec_cita,
							hora_cita = E.hora_cita,
							lug_cita = E.lug_cita,
							cod_conta = E.cod_conta,
							cod_eva = E.cod_eva,
							notificacion = E.notificacion
					FROM	GTH_EntrevistaDesvin AS Ent
					INNER	JOIN @entrevista AS E ON Ent.tipo_cita = E.tipo_cita
					WHERE	Ent.cod_emp = @Cod_emp AND Ent.fec_proc = @fec_proc
							AND Ent.cod_activ = @cod_activ;
				END

				EXEC sp_xml_removedocument @id_entre;
			END	

			----- ENTREGA CARGO -------
	
			IF @proceso =2
			BEGIN
				EXEC sp_xml_preparedocument @id_cargo OUTPUT, @DtEntCar;

				INSERT
				INTO @cargo (cod_emp, fec_proc, cod_activ, cod_eva, Aprobado, observacion)
				SELECT	cod_emp, fec_proc, cod_activ, cod_eva, Aprobado, observacion
				FROM	OPENXML (@id_cargo, '/ROOT/Cargo', 1) WITH(cod_emp	CHAR(12), fec_proc DATETIME, 
								cod_activ INT, cod_eva VARCHAR(10), Aprobado BIT, observacion NVARCHAR(MAX));

				IF @IndFun = 1
				BEGIN
					INSERT
					INTO	GTH_EntregaCargo(cod_emp, fec_proc, cod_activ, cod_eva, Aprobado, observacion)
					SELECT  @Cod_emp, @fec_proc, @cod_activ, cod_eva, Aprobado, observacion
					FROM	@cargo;
				END		

				IF @IndFun = 2
				BEGIN
					SELECT	E.cod_eva, EV.Nom_eva AS des_eva, E.Aprobado, E.observacion
					FROM	GTH_EntregaCargo AS E
					INNER	JOIN GTH_Evalua AS EV ON E.cod_eva = EV.cod_eva
					WHERE	E.cod_emp = @Cod_emp 
						AND CAST(E.fec_proc AS DATE) = CAST(@fec_proc AS DATE)
							AND E.cod_activ = @cod_activ;
				END

				IF @IndFun = 3
				BEGIN
					SELECT	@ID = EEP.id
					FROM	GTH_Eval_Estado_Pers AS EEP
					INNER	JOIN GTH_Evalua_Estado AS TE ON EEP.consec_eva = TE.consec_eva
							AND EEP.cod_eva = TE.cod_eva AND TE.cod_ori = '13'
							AND TE.fec_lim = EEP.fec_proc AND TE.version = EEP.cod_emp_evado
					WHERE	EEP.fec_proc = @fec_proc AND EEP.cod_emp_evado = RTRIM(@Cod_emp);

					DELETE
					FROM	GTH_Evalua_Respuesta
					WHERE	id = @ID;

					DELETE
					FROM	GTH_Eval_Estado_Pers
					WHERE	id = @ID;

					DELETE 
					FROM	GTH_EntregaCargo
					WHERE	cod_emp = @Cod_emp AND fec_proc = @fec_proc
							AND cod_activ = @cod_activ AND cod_eva = @codeva;
				END

				IF @IndFun = 4
				BEGIN
					UPDATE	GTH_EntregaCargo
					SET		Aprobado = E.Aprobado, observacion = E.observacion
					FROM	GTH_EntregaCargo AS Ent
					INNER	JOIN @cargo AS E ON Ent.cod_eva = E.cod_eva
					WHERE	Ent.cod_emp = @Cod_emp AND Ent.fec_proc = @fec_proc
							AND Ent.cod_activ = @cod_activ;
				END
		
				EXEC sp_xml_removedocument @id_cargo;
			END

			----- PAZ Y SALVO -------
			IF @proceso = 3
			BEGIN
				EXEC sp_xml_preparedocument @id_paz OUTPUT, @DtPaz;

				INSERT
				INTO @paz (cod_emp, fec_proc, cod_activ, cod_pazysalvo, cod_resp, fec_valida, pazysalvo, detalle)
				SELECT	cod_emp, fec_proc, cod_activ, cod_pazysalvo, cod_resp, fec_valida, pazysalvo, detalle
				FROM	OPENXML (@id_paz, '/ROOT/Paz', 1) WITH(cod_emp CHAR(12), fec_proc DATETIME, 
						cod_activ INT, cod_pazysalvo INT, cod_resp	CHAR(12), fec_valida DATETIME, pazysalvo BIT, 
						detalle VARCHAR(MAX));

				IF @IndFun = 1
				BEGIN
					INSERT 
					INTO GTH_ConsPazySalvo(cod_emp, fec_proc, cod_activ, cod_pazysalvo, cod_resp, fec_valida, pazysalvo, detalle)
					SELECT @Cod_emp, @fec_proc, @cod_activ, @codpaz, cod_resp, fec_valida, pazysalvo, detalle
					FROM @paz;
				END

				IF @IndFun = 2
				BEGIN
					IF (@codpaz = 0)
					BEGIN
						SELECT	cons.cod_pazysalvo, it.des_pazysalvo, cons.cod_resp, (RTRIM(e.ap1_emp) +' '+  RTRIM(e.ap2_emp) +' '+ RTRIM(e.nom_emp)) AS nom_resp, 
								cons.fec_valida, cons.pazysalvo, cons.detalle, 
								CASE
									WHEN (cons.doc_anx IS NOT NULL AND cons.doc_anx != 0x) THEN CONVERT(BIT, 1)
									WHEN (cons.doc_anx IS NULL OR cons.doc_anx = 0x) THEN CONVERT(BIT, 0)
								END AS soporte
						FROM	GTH_ConsPazySalvo AS cons
						INNER	JOIN GTH_PazySalvo AS it ON cons.cod_pazysalvo = it.cod_pazysalvo
						INNER	JOIN rhh_emplea AS e ON cons.cod_resp = e.cod_emp
						WHERE	cons.cod_emp = @Cod_emp 
								AND CAST(cons.fec_proc AS DATE) = CAST(@fec_proc AS DATE)
								AND cons.cod_activ = @cod_activ;
					END
					ELSE
					BEGIN
						SELECT	cons.cod_pazysalvo, it.des_pazysalvo, cons.cod_resp, (RTRIM(e.ap1_emp) +' '+  RTRIM(e.ap2_emp) +' '+ RTRIM(e.nom_emp)) AS nom_resp, 
								cons.fec_valida, cons.pazysalvo, cons.detalle, 
								CASE
									WHEN (cons.doc_anx IS NOT NULL AND cons.doc_anx != 0x) THEN CONVERT(BIT, 1)
									WHEN (cons.doc_anx IS NULL OR cons.doc_anx = 0x) THEN CONVERT(BIT, 0)
								END AS soporte
						FROM	GTH_ConsPazySalvo AS cons
						INNER	JOIN GTH_PazySalvo AS it ON cons.cod_pazysalvo = it.cod_pazysalvo
						INNER	JOIN rhh_emplea AS e ON cons.cod_resp = e.cod_emp
						WHERE	cons.cod_emp = @Cod_emp 
								AND CAST(cons.fec_proc AS DATE) = CAST(@fec_proc AS DATE)
								AND cons.cod_activ = @cod_activ AND cons.cod_pazysalvo = @codpaz;
					END
				END

				IF @IndFun = 3
				BEGIN
					DELETE 
					FROM GTH_ConsPazySalvo
					WHERE cod_emp = @Cod_emp
						AND fec_proc = @fec_proc
						AND cod_activ = @cod_activ
						AND cod_pazysalvo = @codpaz;
				END

				IF @IndFun = 4
				BEGIN
					UPDATE GTH_ConsPazySalvo
					SET cod_resp = E.cod_resp, fec_valida = E.fec_valida, pazysalvo = E.pazysalvo, detalle = E.detalle
					FROM GTH_ConsPazySalvo AS Paz
					INNER	JOIN @paz AS E ON Paz.cod_emp = @Cod_emp
						AND Paz.fec_proc = @fec_proc
						AND Paz.cod_activ = @cod_activ	
						AND Paz.cod_pazysalvo = @codpaz;	
				END

				EXEC sp_xml_removedocument @id_paz;
			END

			----- EXAMEN MEDICO DESVINCULACIÓN -------

			IF @proceso = 4
			BEGIN
				EXEC sp_xml_preparedocument @id_exa OUTPUT, @DtExam;

				INSERT
				INTO @examen (cod_emp, fec_proc, cod_activ, cvo_exmed, tip_exmed, fec_exmed, prov_resp, ind_apto, obs_exmed, cod_exa_med)
				SELECT	cod_emp, fec_proc, cod_activ, cvo_exmed, tip_exmed, fec_exmed, prov_resp, ind_apto, obs_exmed, cod_exa_med
				FROM	OPENXML (@id_exa, '/ROOT/Examen', 1) WITH(cod_emp CHAR(12), fec_proc DATETIME, cod_activ  INT, 
							cvo_exmed INT, tip_exmed CHAR(2), fec_exmed	DATETIME, prov_resp	CHAR(15), ind_apto TINYINT, 
							obs_exmed VARCHAR(MAX), cod_exa_med	INT	);

				IF @IndFun = 1
				BEGIN
					DECLARE  @cvo INT;

					SELECT	@cvo = ISNULL(MAX(cvo_exmed),0)
					FROM	GTH_ExamenDesvin
					WHERE	cod_emp = @Cod_emp AND fec_proc = @fec_proc 
							AND cod_activ = @cod_activ;

					INSERT 
					INTO GTH_ExamenDesvin(cod_emp, fec_proc, cod_activ, cvo_exmed, tip_exmed, fec_exmed, prov_resp, ind_apto, obs_exmed, cod_exa_med)
					SELECT @Cod_emp, @fec_proc, @cod_activ, ISNULL(@cvo,0) + 1, tip_exmed, fec_exmed, prov_resp, ind_apto, obs_exmed, cod_exa_med
					FROM @examen;

					INSERT 
					INTO SST_ExamenMedicoEmplea(cod_emp, cod_exa_med, per_exa, fec_exmed, tip_ex, prov_resp, ind_apto, obs_exmed)
					SELECT @Cod_emp, cod_exa_med, '3', fec_exmed, tip_exmed, prov_resp, ind_apto, obs_exmed
					FROM @examen;

					SELECT	@cvo AS CvoExa;
				END

				IF @IndFun = 2
				BEGIN
					SELECT E.cvo_exmed, E.tip_exmed, TE.Des_TipEx AS nom_tip_exmed, E.prov_resp, P.nom_emp_ext AS nom_prov_resp,
						E.cod_exa_med, EX.des_exa_med AS nom_exa_med, E.obs_exmed, E.ind_apto
					FROM GTH_ExamenDesvin AS E
					INNER	JOIN GTH_TipoExamen AS TE ON E.tip_exmed = TE.Tip_Ex
					INNER	JOIN GTH_Emplea_Externo AS P ON E.prov_resp = P.cod_emp_ext
					INNER	JOIN SST_ExaMedicos AS EX ON E.cod_exa_med = EX.cod_exa_med 
					WHERE cod_emp = @Cod_emp 
						AND CAST(fec_proc AS DATE) = CAST(@fec_proc AS DATE)
						AND cod_activ = @cod_activ;
				END

				IF @IndFun = 3
				BEGIN
					DELETE 
					FROM GTH_ExamenDesvin
					WHERE cod_emp = @Cod_emp
						AND fec_proc = @fec_proc
						AND cod_activ = @cod_activ
						AND cvo_exmed = @cvoexa;
				END

				IF @IndFun = 4
				BEGIN
					UPDATE	GTH_ExamenDesvin
					SET		tip_exmed = E.tip_exmed, 
							fec_exmed = E.fec_exmed, 
							prov_resp = E.prov_resp, 
							ind_apto = E.ind_apto, 
							obs_exmed = E.obs_exmed, 
							cod_exa_med = E.cod_exa_med
					FROM	GTH_ExamenDesvin AS Exa
					INNER	JOIN @examen AS E ON Exa.cod_emp = @Cod_emp
							AND Exa.fec_proc = @fec_proc AND Exa.cod_activ = @cod_activ
							AND Exa.cvo_exmed = @cvoexa;
				END

				EXEC sp_xml_removedocument @id_exa;
			END

			----- DOCUMENTOS DESVINCULACIÓN -------
			IF @proceso = 5
			BEGIN
				EXEC sp_xml_preparedocument @id_docu OUTPUT, @DtDocu;

				INSERT
				INTO @docu (cod_emp, fec_proc, cod_activ, conse, nombre, fec_entrega)
				SELECT	cod_emp, fec_proc, cod_activ, conse, nombre, fec_entrega
				FROM	OPENXML (@id_docu, '/ROOT/Documento', 1) WITH(cod_emp CHAR(12), fec_proc DATETIME, 
						cod_activ INT, conse INT, nombre VARCHAR(100), fec_entrega DATETIME);

				IF @IndFun = 1
				BEGIN
					DECLARE  @cons INT; 
			
					SELECT	@cons = ISNULL(MAX(conse),0) 
					FROM	GTH_DocumDesvin
					WHERE	cod_emp = @Cod_emp AND fec_proc = @fec_proc 
							AND cod_activ = @cod_activ;

					INSERT 
					INTO GTH_DocumDesvin(cod_emp, fec_proc, cod_activ, conse, nombre, fec_entrega)
					SELECT @Cod_emp, @fec_proc, @cod_activ, @cons + 1, nombre, fec_entrega
					FROM @docu;

					SELECT	@cons AS conse;

					INSERT
					INTO GTH_Contrato_Docum (cod_emp, cod_con, des_docum, fecha)
					SELECT @Cod_emp, (SELECT dbo.fn_rhh_contratofch (@Cod_emp, GETDATE(), 0)), nombre, fec_entrega
					FROM @docu;
				END

				IF @IndFun = 2
				BEGIN
					SELECT D.conse, D.nombre, D.fec_entrega
					FROM GTH_DocumDesvin AS D				
					WHERE cod_emp = @Cod_emp 
						AND CAST(fec_proc AS DATE) = CAST(@fec_proc AS DATE)
						AND cod_activ = @cod_activ;
				END

				IF @IndFun = 3
				BEGIN
					DELETE	GTH_Contrato_Docum
					FROM	GTH_Contrato_Docum AS DC
					INNER	JOIN GTH_DocumDesvin AS DD ON DC.cod_emp = DD.cod_emp AND dC.fecha = DD.fec_entrega
					WHERE DC.cod_emp = @Cod_emp
						AND DD.nombre = DC.des_docum
						AND DD.fec_entrega = DC.fecha;

					DELETE 
					FROM GTH_DocumDesvin
					WHERE cod_emp = @Cod_emp
						AND fec_proc = @fec_proc
						AND cod_activ = @cod_activ
						AND conse = @conse;
				END

				IF @IndFun = 4
				BEGIN
					UPDATE GTH_Contrato_Docum
					SET des_docum = E.nombre, fecha = E.fec_entrega
					FROM GTH_Contrato_Docum AS C
					INNER	JOIN GTH_DocumDesvin AS D ON C.cod_emp = D.cod_emp AND C.fecha = D.fec_entrega
					INNER	JOIN @docu AS E ON D.conse = E.conse
					WHERE C.cod_emp = @Cod_emp
						AND D.nombre = C.des_docum
						AND D.fec_entrega = C.fecha;
			
					UPDATE GTH_DocumDesvin
					SET nombre = E.nombre, fec_entrega = E.fec_entrega
					FROM GTH_DocumDesvin AS D
					INNER	JOIN @docu AS E ON D.conse = E.conse
					WHERE D.cod_emp = @Cod_emp
						AND D.fec_proc = @fec_proc
						AND D.cod_activ = @cod_activ
						AND D.conse = @conse;
				END
		
				EXEC sp_xml_removedocument @id_docu;
			END
		COMMIT TRANSACTION
	END TRY
	BEGIN CATCH
		WHILE @@TRANCOUNT > 0
		BEGIN
			ROLLBACK TRANSACTION;
		END;

		THROW
	END CATCH 
END;

```
