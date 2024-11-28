# Stored Procedure: sp_gth_cambioced

## Usa los objetos:
- [[GTH_Asistencia]]
- [[GTH_Assessment]]
- [[GTH_AssessmentDet]]
- [[GTH_CandAplica]]
- [[GTH_CandPostCIUO]]
- [[GTH_CitaContrato]]
- [[Gth_DocumIncemp]]
- [[GTH_EntrevDet]]
- [[GTH_Entrevista]]
- [[GTH_EvaDesemAsig]]
- [[GTH_EvaDesemEmp]]
- [[GTH_EvaDesemGrupoEvalPlanMejora]]
- [[GTH_EvaDesemPbaExt]]
- [[GTH_EvaDesemRespComp]]
- [[GTH_EvaDesemRespCompConc]]
- [[GTH_Eval_Estado_Pers]]
- [[GTH_EvalEventoEmp]]
- [[GTH_EvalItem]]
- [[GTH_EventoInvita]]
- [[GTH_LlamAten]]
- [[GTH_NivAprobDetAprob]]
- [[GTH_NivAprobEmpCargos]]
- [[GTH_NivAprobEmplea]]
- [[GTH_PbaEmp]]
- [[GTH_ProcesoDisciplinario]]
- [[GTH_ProcesoDisciplinarioAnt]]
- [[GTH_RefePers]]
- [[GTH_RefePersDet]]
- [[GTH_Requisicion]]
- [[GTH_RequisicionEmp]]
- [[GTH_RetiroChk]]
- [[GTH_RetiroChkDet]]
- [[GTH_RptAssessment]]
- [[GTH_RptAssessmentDet]]
- [[GTH_RptEmplea]]
- [[GTH_RptEntrevDet]]
- [[GTH_RptEntrevista]]
- [[GTH_RptEstudio]]
- [[GTH_RptPbaEmp]]
- [[GTH_RptRefePers]]
- [[GTH_RptRefePersDet]]
- [[GTH_RptVisitaDomi]]
- [[GTH_RptVisitaDomiGen]]
- [[GTH_Sel_Cand_Proc]]
- [[GTH_VisitaDomi]]
- [[GTH_VisitaDomiGen]]
- [[Rhh_Ausentismo]]
- [[sp_gen_validatriggers]]
- [[sp_rhh_LiqErrInfo]]

```sql

--==========================================================================================================
-- Cambio de la cedula de un empleado en la aplicacion DE Gestion Humana.
-- Ing. Victor M. Olejo  - Fecha: 24 - 06 - 2020
--  EXEC sp_rhh_cambioced1 '99999','99998'
--==========================================================================================================

CREATE PROCEDURE [dbo].[sp_gth_cambioced] 
	@cod_emp CHAR(12) ='101018',
	@cod_nue CHAR(12) ='101019'

--WITH ENCRYTPION 
AS
BEGIN
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
	SET NOCOUNT ON;

    DECLARE @usuact	VARCHAR(128);
    DECLARE @cadSQL NVARCHAR(MAX);
    DECLARE @Numusu INT
    DECLARE @ParmDefinition NVARCHAR(500)
    DECLARE @Operac INT;
	DECLARE @sst INT;
	DECLARE @ex_act SMALLINT;
	DECLARE @ex_nue SMALLINT;
	DECLARE @cadena NVARCHAR(MAX);
	DECLARE @tabla CHAR(40);
	DECLARE @cMsgErr VARCHAR(MAX);
	DECLARE @nRegAfe INT;
-- VARIABLES DE CONTROL PARA GTH
	DECLARE @cvo_ass INT;
	DECLARE @rpt_cvoass INT;
--VARIABLES DE CONTROL PARA PORTAL
    DECLARE @Portal INT;
    DECLARE @cServidor VARCHAR(50);
	DECLARE @cBaseDatos VARCHAR(50);
	DECLARE @rolusu NVARCHAR(1000);
	DECLARE @usu NVARCHAR(1000);
	DECLARE @vercnx NVARCHAR(500);
	DECLARE @server CHAR(50);
	DECLARE @db CHAR(50);
	DECLARE @Tabportal NVARCHAR(500);
	DECLARE @QUERY NVARCHAR(3000);
	DECLARE @PARAMETROS NVARCHAR(500);
	DECLARE @IndWeb bit;
	DECLARE @ValidaPrtI  bit = 0;
	DECLARE @cvo_rea INT;

	IF OBJECT_ID('TempDb..#t_Error') IS NULL
	BEGIN
	    CREATE TABLE #t_Error
		(
		    cod_emp VARCHAR(12) COLLATE DATABASE_DEFAULT NULL,
		    error   VARCHAR(MAX) COLLATE DATABASE_DEFAULT NULL,
		    APL     CHAR(20)
		)
	END;

	BEGIN TRY
	   BEGIN TRANSACTION;

		  EXEC sp_gen_validatriggers 'Trg_GTH_Requisicion_I_U',1
		  EXEC sp_gen_validatriggers 'Trg_gth_EventoInvita_Ins_Up',1
		  EXEC sp_gen_validatriggers 'tr_GTH_EventoInvita',1
		  EXEC sp_gen_validatriggers 'GTH_EvaDesemAsig_Trg_act',1
		  EXEC sp_gen_validatriggers 'Trg_GTH_Requisicion_Modelos',1
		  EXEC sp_gen_validatriggers 'tr_gth_eventos_pre',1
		  EXEC sp_gen_validatriggers 'Tr_Gth_RptEmplea',1

			SELECT *
			INTO #RequisicionEmp
			FROM GTH_RequisicionEmp
			WHERE COD_EMP = @cod_emp;

			SELECT *
			INTO #Assessment
			FROM GTH_Assessment
			WHERE cod_emp = @cod_emp;

			SELECT *
			INTO #AssessmentDet
			FROM GTH_AssessmentDet
			WHERE cod_emp = @cod_emp;

			SELECT *
			INTO #Entrevista
			FROM GTH_Entrevista
			WHERE cod_emp = @cod_emp;

			SELECT *
			INTO #EntrevDet
			FROM GTH_EntrevDet
			WHERE cod_emp = @cod_emp;

			SELECT *
			INTO #EvaDesemAsig
			FROM GTH_EvaDesemAsig
			WHERE cod_emp_evado = @cod_emp;

			SELECT *
			INTO #EvaDesemAsigAux
			FROM GTH_EvaDesemAsig
			WHERE cod_emp_evador = @cod_emp;

			SELECT *
			INTO #EvaDesemEmp
			FROM GTH_EvaDesemEmp
			WHERE cod_emp_evado = @cod_emp;

			SELECT *
			INTO #EvalItem
			FROM GTH_EvalItem
			WHERE cod_emp = @cod_emp;

			SELECT cod_emp,num_req,cod_pba,fec_pba,cod_calif,concep_pba,resp_interp,resp_interp_e,tip_pba,doc_anx,nom_anx
			INTO #PbaEmp
			FROM GTH_PbaEmp
			WHERE cod_emp = @cod_emp;

			SELECT cod_emp,num_req,cod_pba,fec_pba,cod_calif,concep_pba,resp_interp,resp_interp_e,tip_pba,doc_anx,nom_anx
			INTO #RptPbaEmp
			FROM GTH_RptPbaEmp
			WHERE cod_emp = @cod_emp;

			SELECT *
			INTO #Asistencia
			FROM GTH_Asistencia
			WHERE cod_emp = @cod_emp;

			SELECT *
			INTO #EvalEventoEmp
			FROM GTH_EvalEventoEmp
			WHERE cod_emp = @cod_emp;

			SELECT *
			INTO #RefePers
			FROM GTH_RefePers
			WHERE cod_emp = @cod_emp;

			SELECT *
			INTO #RefePersDet
			FROM GTH_RefePersDet
			WHERE cod_emp = @cod_emp;
 
			SELECT cod_emp, fec_vis, obs_vis, num_req, doc_anx, nom_anx, ID_Uniq
			INTO #VisitaDomi
			FROM GTH_VisitaDomi
			WHERE cod_emp = @cod_emp;

			SELECT *
			INTO #VisitaDomiGen
			FROM GTH_VisitaDomiGen
			WHERE cod_emp = @cod_emp;

			SELECT *
			INTO #RetiroChk
			FROM GTH_RetiroChk
			WHERE cod_emp = @cod_emp;

			SELECT *
			INTO #Ausentismo
			FROM Rhh_Ausentismo
			WHERE COD_EMP = @cod_emp;

			SELECT *
			INTO #GTH_EvaDesemGrupoEvalPlanMejora
			FROM GTH_EvaDesemGrupoEvalPlanMejora
			WHERE cod_emp_evado = @cod_emp;

			SELECT *
			INTO #GTH_EvaDesemPbaExt
			FROM GTH_EvaDesemPbaExt
			WHERE cod_emp_evado = @cod_emp;

			SELECT *
			INTO #GTH_EvaDesemRespComp
			FROM GTH_EvaDesemRespComp
			WHERE cod_emp_evado = @cod_emp;
			
			SELECT *
			INTO #GTH_EvaDesemRespCompConc
			FROM GTH_EvaDesemRespCompConc
			WHERE cod_emp_evado = @cod_emp;

			UPDATE #Ausentismo
			SET COD_EMP = @cod_nue;


			UPDATE #RequisicionEmp
			SET COD_EMP = @cod_nue;

			UPDATE #Assessment
			SET cod_emp = @cod_nue;

			UPDATE #AssessmentDet
			SET cod_emp = @cod_nue;

			UPDATE #Entrevista
			SET cod_emp = @cod_nue;

			UPDATE #EntrevDet
			SET cod_emp = @cod_nue;
		
			UPDATE #EvaDesemAsig
			SET cod_emp_evado = @cod_nue,
				cod_emp_evador = @cod_nue
			WHERE cod_emp_evado = @cod_emp AND cod_emp_evador = @cod_emp;

			UPDATE #EvaDesemAsig
			SET cod_emp_evado = @cod_nue
			WHERE cod_emp_evado = @cod_emp AND cod_emp_evador <> @cod_emp;

			UPDATE #EvaDesemAsigAux
			SET cod_emp_evador = @cod_nue
			WHERE cod_emp_evador = @cod_emp AND cod_emp_evado <> @cod_emp;

			UPDATE #EvaDesemEmp
			SET cod_emp_evado = @cod_nue
			WHERE cod_emp_evado = @cod_emp;

			UPDATE #EvalItem
			SET cod_emp = @cod_nue
			WHERE cod_emp = @cod_emp;

			UPDATE #PbaEmp
			SET cod_emp = @cod_nue
			WHERE cod_emp = @cod_emp;

			UPDATE #RptPbaEmp
			SET cod_emp = @cod_nue
			WHERE cod_emp = @cod_emp;
			UPDATE #Asistencia
			SET cod_emp = @cod_nue
			WHERE cod_emp = @cod_emp;

			UPDATE #EvalEventoEmp
			SET cod_emp = @cod_nue
			WHERE cod_emp = @cod_emp;

			UPDATE #RefePers
			SET cod_emp = @cod_nue;

			UPDATE #RefePersDet
			SET cod_emp = @cod_nue;

			UPDATE #VisitaDomi
			SET cod_emp = @cod_nue;

			UPDATE #VisitaDomiGen
			SET cod_emp = @cod_nue;

			UPDATE #RetiroChk
			SET cod_emp = @cod_nue;

			UPDATE #GTH_EvaDesemGrupoEvalPlanMejora
			SET cod_emp_evado = @cod_nue;

			UPDATE #GTH_EvaDesemPbaExt
			SET cod_emp_evado = @cod_nue;

			UPDATE  #GTH_EvaDesemRespComp
			SET cod_emp_evado = @cod_nue;
						
			UPDATE  #GTH_EvaDesemRespCompConc
			SET cod_emp_evado = @cod_nue;
			
			
			BEGIN TRY
				INSERT INTO GTH_RequisicionEmp
	   			SELECT  num_req, cod_emp, ISNULL(cpto_rrhh,''), ISNULL(cpto_sol,''), ind_cnt, cod_fte, ind_per, cod_cia, cod_area, 
							ISNULL(fecha,''),ISNULL(cod_mot,NULL), obs_mot, cod_est_cand, fec_resp_sol,fec_citacion,hora_citacion,1 --ind_cop
				FROM #RequisicionEmp;
												
				-- Assessment
				INSERT INTO GTH_Assessment( cod_emp,num_req,fec_ass,obs_ass,cod_emp_evador)
				SELECT cod_emp,num_req,fec_ass,obs_ass,cod_emp_evador
				FROM #Assessment;

				INSERT INTO GTH_RptAssessment( cod_emp,num_req,fec_ass,obs_ass,cod_emp_evador)
				SELECT cod_emp,num_req,fec_ass,obs_ass,cod_emp_evador
				FROM #Assessment;

				INSERT INTO GTH_AssessmentDet( cod_emp,cvo_ass,cod_comp,num_req,emp_obs1,com_obs1,
										val_obs1,emp_obs2,com_obs2,val_obs2,emp_obs3,com_obs3,val_obs3)
				SELECT a.cod_emp,b.cvo_ass,a.cod_comp,a.num_req,a.emp_obs1,a.com_obs1,a.val_obs1,a.emp_obs2,
					a.com_obs2,a.val_obs2,a.emp_obs3,a.com_obs3,a.val_obs3
				FROM #AssessmentDet AS a
				INNER JOIN GTH_Assessment AS b ON a.cod_emp = b.cod_emp AND a.num_req = b.num_req;
	   
				INSERT INTO GTH_RptAssessmentDet( cod_emp,cvo_ass,cod_comp,num_req,emp_obs1,com_obs1,val_obs1,
											emp_obs2,com_obs2,val_obs2,emp_obs3,com_obs3,val_obs3)
				SELECT a.cod_emp,b.cvo_ass,a.cod_comp,a.num_req,a.emp_obs1,a.com_obs1,a.val_obs1,a.emp_obs2,
					a.com_obs2,a.val_obs2,a.emp_obs3,a.com_obs3,a.val_obs3
				FROM #AssessmentDet AS a
				INNER JOIN GTH_Assessment AS b ON a.cod_emp = b.cod_emp AND a.num_req = b.num_req;

			-- Entrevista
				INSERT INTO GTH_Entrevista
				SELECT * FROM #Entrevista;

				INSERT INTO GTH_RptEntrevista
				SELECT * FROM #Entrevista;
	   
				INSERT INTO GTH_EntrevDet
				SELECT * FROM #EntrevDet;

				INSERT INTO GTH_RptEntrevDet
				SELECT * FROM #EntrevDet;
			--Se agregan los delete antes de insertar por validación en trigger.
				DELETE FROM GTH_EvaDesemAsig
				WHERE cod_emp_evado = @cod_emp;

				DELETE FROM GTH_EvaDesemAsig
				WHERE cod_emp_evador = @cod_emp;

				INSERT INTO GTH_EvaDesemEmp
				SELECT * FROM #EvaDesemEmp;
	   
				INSERT INTO GTH_EvaDesemAsig
				SELECT *
				FROM #EvaDesemAsig
				WHERE cod_emp_evado = @cod_nue AND cod_emp_evador = @cod_nue;

				INSERT INTO GTH_EvaDesemAsig
				SELECT *
				FROM #EvaDesemAsig
				WHERE cod_emp_evado = @cod_nue AND cod_emp_evador <> @cod_nue;

				INSERT INTO GTH_EvaDesemAsig
				SELECT *
				FROM #EvaDesemAsigAux
				WHERE cod_emp_evador = @cod_nue AND cod_emp_evado <> @cod_nue;
				
				INSERT INTO GTH_EvalItem
				SELECT * FROM #EvalItem;
				
				INSERT INTO GTH_PbaEmp (cod_emp,num_req,cod_pba,fec_pba,cod_calif,concep_pba,resp_interp,resp_interp_e,tip_pba,doc_anx,nom_anx,id_uniq)
								SELECT cod_emp,num_req,cod_pba,fec_pba,cod_calif,concep_pba,resp_interp,resp_interp_e,tip_pba,doc_anx,nom_anx,NEWID()
				FROM #PbaEmp;
				
				INSERT INTO GTH_RptPbaEmp (cod_emp,num_req,cod_pba,fec_pba,cod_calif,concep_pba,resp_interp,resp_interp_e,tip_pba,doc_anx,nom_anx,id_uniq)
								SELECT cod_emp,num_req,cod_pba,fec_pba,cod_calif,concep_pba,resp_interp,resp_interp_e,tip_pba,doc_anx,nom_anx,NEWID()
				FROM #RptPbaEmp;

				INSERT INTO GTH_Asistencia
				SELECT * FROM #Asistencia;

				INSERT INTO GTH_EvalEventoEmp
				SELECT *
				FROM #EvalEventoEmp;

			-- Referencias Personales
				INSERT INTO GTH_RefePers( cod_emp,num_req,fec_ref,obs_ref,Nom_ref,Tel_ref,Tip_ref)
				SELECT cod_emp,num_req,fec_ref,obs_ref,Nom_ref,Tel_ref,Tip_ref
				FROM #RefePers;
			
				INSERT INTO GTH_RptRefePers( cod_emp,num_req,fec_ref,obs_ref,Nom_ref,Tel_ref,Tip_ref)
				SELECT cod_emp,num_req,fec_ref,obs_ref,Nom_ref,Tel_ref,Tip_ref
				FROM #RefePers;

				INSERT INTO GTH_RefePersDet( cod_emp,num_req,cvo_ref,cod_comp,cpto_ref,val_comp,obs_ref)
				SELECT a.cod_emp,a.num_req,b.cvo_ref,a.cod_comp,a.cpto_ref,a.val_comp,a.obs_ref
				FROM #RefePersDet AS a
				INNER JOIN GTH_RefePers AS b ON a.cod_emp = b.cod_emp AND a.num_req = b.num_req;

				INSERT INTO GTH_RptRefePersDet( cod_emp,num_req,cvo_ref,cod_comp,cpto_ref,val_comp,obs_ref)
				SELECT a.cod_emp,a.num_req,b.cvo_ref,a.cod_comp,a.cpto_ref,a.val_comp,a.obs_ref
				FROM #RefePersDet AS a
				INNER JOIN GTH_RptRefePers AS b ON a.cod_emp = b.cod_emp AND a.num_req = b.num_req;

				INSERT INTO GTH_VisitaDomiGen
				SELECT *
				FROM #VisitaDomiGen;

				INSERT INTO GTH_RptVisitaDomiGen
				SELECT *
				FROM #VisitaDomiGen;

				INSERT INTO GTH_VisitaDomi
				SELECT cod_emp,fec_vis,obs_vis,num_req,doc_anx,nom_anx,ID_Uniq
				FROM #VisitaDomi;

				INSERT INTO GTH_RptVisitaDomi
				SELECT cod_emp,fec_vis,obs_vis,num_req,doc_anx,nom_anx,ID_Uniq
				FROM #VisitaDomi;

				INSERT INTO GTH_EvaDesemGrupoEvalPlanMejora (cod_cia, cod_eva_des, cod_grup_val, cod_emp_evado, cod_comp, cod_comporta, cons_acc, tip_acc, det_acc, evi_imp, emp_resp, cod_est)
				SELECT cod_cia, cod_eva_des, cod_grup_val, cod_emp_evado, cod_comp, cod_comporta, cons_acc, tip_acc, det_acc, evi_imp, emp_resp, cod_est 
				FROM #GTH_EvaDesemGrupoEvalPlanMejora

				INSERT INTO  GTH_EvaDesemPbaExt (cod_cia, cod_eva_des, cod_grup_val, cod_emp_evado, cod_emp_evador, cod_rol, pba_ext, emp_resp, nota_ext, obs_ext, id_uniq, doc_anx, nom_anx)
				SELECT cod_cia, cod_eva_des, cod_grup_val, cod_emp_evado, cod_emp_evador, cod_rol, pba_ext, emp_resp, nota_ext, obs_ext, id_uniq, doc_anx, nom_anx 
				FROM #GTH_EvaDesemPbaExt

				INSERT INTO GTH_EvaDesemRespComp (cod_cia, cod_eva_des, cod_grup_val, cod_emp_evado, cod_emp_evador, cod_rol, cod_comp, cod_comporta, cod_esc_val, obs_evi, fec_fin_proc)
			    SELECT cod_cia, cod_eva_des, cod_grup_val, cod_emp_evado, cod_emp_evador, cod_rol, cod_comp, cod_comporta, cod_esc_val, obs_evi, fec_fin_proc 
				FROM #GTH_EvaDesemRespComp
						
				INSERT INTO GTH_EvaDesemRespCompConc (cod_cia, cod_eva_des, cod_grup_val, cod_emp_evado, cod_emp_evador, cod_rol, cod_comp, cod_comporta, cod_esc_val_evado, cod_esc_val_evador,nota_conc, nota_eva, obs_evi, fec_fin_proc)
				SELECT cod_cia, cod_eva_des, cod_grup_val, cod_emp_evado, cod_emp_evador, cod_rol, cod_comp, cod_comporta, cod_esc_val_evado, cod_esc_val_evador, nota_conc, nota_eva, obs_evi, fec_fin_proc 
				FROM #GTH_EvaDesemRespCompConc

				INSERT INTO GTH_RetiroChk( cod_emp,fec_rea)
				SELECT cod_emp,fec_rea
				FROM #RetiroChk;
				
				SELECT @cvo_rea =  Scope_identity();

				UPDATE	GTH_RetiroChkDet
				SET		cod_emp = RTRIM(@cod_nue),
						cvo_rea  = @cvo_rea
				WHERE	cod_emp = RTRIM(@cod_emp);

				DELETE GTH_RetiroChk
				WHERE cod_emp = @cod_emp;

				UPDATE GTH_Requisicion
				SET cod_sol = RTRIM(@cod_nue)
				WHERE cod_sol = RTRIM(@cod_emp);

				UPDATE GTH_Requisicion
				SET emp_resp = RTRIM(@cod_nue)
				WHERE emp_resp = RTRIM(@cod_emp);

			/* CAMBIA LAS TABLAS CON LA CEDULA NUEVA  */
			DECLARE CX1 CURSOR LOCAL READ_ONLY
			FOR
				SELECT a.name
				FROM sysobjects AS a,
					syscolumns AS b
				WHERE a.id = b.id
					AND a.name LIKE 'GTH%'
					AND SUBSTRING(b.name, 1, 7) LIKE 'cod_emp'
					AND a.name NOT IN(
									'gth_RptEmplea', 'GTH_RequisicionEmp', 'GTH_Contratos', 'GTH_EvaDesemAsig', 'GTH_EvaDesemRes', 'GTH_EvaDesemEmp', 'GTH_EvalItem', 'Gth_AsigIndGestion', 'GTH_EvalEventoEmp', 'GTH_Asistencia', 'GTH_Entrevista', 'GTH_RptEntrevista', 'GTH_RefePers', 'GTH_RptRefePers', 'GTH_RefePersDet', 'GTH_RptRefePersDet', 'GTH_VisitaDomi', 'GTH_RptVisitaDomi', 'GTH_VisitaDomiGen', 'GTH_RptVisitaDomiGen', 'GTH_CandAplica', 'GTH_cand_masiva', 'GTH_Emplea_Cliente', 'GTH_Tareas',
									'GTH_Emplea_Externo', 'GTH_testigo_dis_ext', 'GTH_IndGestion','GTH_EvaDesemGrupoEvalPlanMejora',
									'GTH_EvaDesemPbaExt','GTH_EvaDesemRespComp','GTH_EvaDesemRespCompConc', 'GTH_ParamContratos'
									)
					AND a.xtype = 'U'

				SET @nRegAfe = 0;

			OPEN CX1;
			FETCH NEXT FROM CX1 INTO @Tabla;

			WHILE @@FETCH_STATUS <> -1
			BEGIN
				IF (@Tabla In ('GTH_RptEstudio'))
				BEGIN
					INSERT
					INTO	GTH_RptEstudio
					SELECT	@cod_nue, cod_est, nom_est, cod_ins, ano_est, sem_apr, hor_est, gra_son, fec_gra, nro_tar,
							ind_can, tip_est, cod_even, fto_certif, nom_anex, ind_gth, cod_cons, tipo_est, NRO, ind_estsup,
							num_sg_act, num_act_cons, fec_cons, NEWID(), cons, fec_ven, mod_est, cur_act, ndiploma, nacta, nfolio, nlibro, est_exterior, inst_exterior, cod_pais, est_homologa, fec_homologa
					FROM	GTH_RptEstudio
					WHERE	cod_emp = @cod_emp;

					DELETE	FROM GTH_RptEstudio WHERE	cod_emp = @cod_emp;
				END

				IF @Tabla IN( 'Gth_DocumIncemp' )
				BEGIN
					UPDATE Gth_DocumIncemp
					SET cod_emp = @cod_nue
					FROM Gth_DocumIncemp D
					INNER JOIN #Ausentismo A ON D.Cod_emp = A.cod_emp AND D.cod_aus = A.cod_aus AND D.fec_ini = A.fec_ini;

					DELETE FROM Gth_DocumIncemp WHERE cod_emp = @cod_emp;
				END;

				IF @Tabla IN( 'GTH_NivAprobEmplea','GTH_NivAprobEmpCargos','GTH_NivAprobDetAprob')
				BEGIN
					INSERT
					INTO	GTH_NivAprobEmplea
					SELECT	niv_aprob, @cod_nue, ind_desact, ind_aut_fin
					FROM	GTH_NivAprobEmplea
					WHERE	cod_emp = @cod_emp;

					INSERT
					INTO	GTH_NivAprobEmpCargos
					SELECT	niv_aprob, @cod_nue, cod_car
					FROM	GTH_NivAprobEmpCargos
					WHERE	cod_emp = @cod_emp;

					INSERT
					INTO	GTH_NivAprobDetAprob
					SELECT	num_req, niv_aprob, usu_emp, @cod_nue, ind_aprob, fec_aprob, ord_aprob, obs_aprob
					FROM	GTH_NivAprobDetAprob
					WHERE	cod_emp = @cod_emp;

					DELETE FROM GTH_NivAprobDetAprob WHERE cod_emp = @cod_emp;
					DELETE FROM GTH_NivAprobEmpCargos WHERE cod_emp = @cod_emp;
					DELETE FROM GTH_NivAprobEmplea WHERE cod_emp = @cod_emp;
				END;

				IF NOT EXISTS (SELECT * FROM GTH_ProcesoDisciplinarioAnt WHERE Cod_Emp_Sol =''+RTRIM(LTRIM(@cod_nue))+'')
				BEGIN
					IF (@tabla = 'GTH_ProcesoDisciplinarioAnt')
					BEGIN
						UPDATE	GTH_ProcesoDisciplinarioAnt
						SET		Cod_Emp_Sol = @cod_nue
						WHERE	Cod_Emp_Sol = @cod_emp;
					END
				END;

				IF NOT EXISTS (SELECT * FROM GTH_ProcesoDisciplinario WHERE Cod_Emp_Sol =''+RTRIM(LTRIM(@cod_nue))+'')
				BEGIN
					IF (@tabla = 'GTH_ProcesoDisciplinario')
					BEGIN
						UPDATE	GTH_ProcesoDisciplinario
						SET		Cod_Emp_Sol = @cod_nue
						WHERE	Cod_Emp_Sol = @cod_emp;
					END
				END;

				IF NOT EXISTS (SELECT * FROM GTH_LlamAten WHERE COD_eMP =''+RTRIM(LTRIM(@cod_nue))+'')
				BEGIN
					IF (@tabla = 'GTH_LlamAten')
					BEGIN
						INSERT
						INTO	GTH_LlamAten
						SELECT	Cod_Proc, @cod_nue, Fec_lla, cod_mot, cod_niv, Observaciones, cod_estado, Fch_Renuncia, 
								Fch_ResolRet, Fch_Solicitud, Fch_CitaDescargos, Fch_ActaDescargos, Tip_Sancion, Fch_NotifSancion,
								Fch_InterpRecurso, Fch_RtaRecurso, Fch_NotifRecurso, Fch_NotifNomina, Fec_Cierre, Cod_Rol
						FROM	GTH_LlamAten
						WHERE	cod_emp = @cod_emp;
					END
				END;
				  	  
		/**/	IF @tabla NOT IN( 'GTH_EvaDesemRes', 'GTH_Eval_Manual', 'GTH_Eval_Estado_Pers', 'GTH_Assessment', 'GTH_RptAssessment',
					'GTH_AssessmentDet', 'GTH_RptAssessmentDet', 'GTH_EntrevDet', 'GTH_RptEntrevDet', 'Gth_DocumIncemp',
					'GTH_RetiroChkDet', 'GTH_RetiroChk', 'GTH_PbaEmp', 'GTH_RptPbaEmp', 'GTH_Requisicion', 'GTH_RefePers', 'GTH_RptRefePers', 'GTH_ProcesoDisciplinario', 'GTH_Contrato_Docum', 'GTH_LlamAten', 'GTH_ProcesoDisciplinarioAnt')
				BEGIN
					SELECT @CADENA = 'UPDATE '+RTRIM(@tabla)+' SET cod_emp = '''+RTRIM(@cod_nue)+''' WHERE cod_emp = '''+RTRIM(@cod_emp)+'''';
					EXEC (@CADENA);
				
					IF (@tabla = 'GTH_EventoInvita')
					BEGIN
						INSERT
						INTO	GTH_EventoInvita
						SELECT	@cod_nue, cod_even, ind_asis, cod_conf, cod_estado, motivo_rech, xq_no_asis, mot_inasis
						FROM	GTH_EventoInvita
						WHERE	cod_emp = @cod_emp;
					END
					
					IF (@tabla = 'GTH_Sel_Cand_Proc')
					BEGIN
						INSERT
						INTO	GTH_Sel_Cand_Proc
						SELECT	@cod_nue, num_req, cod_proc, orden, cod_est_proc, fec_ini, fec_fin, cod_mod_proc, ind_no_aprob, observacion
						FROM	GTH_Sel_Cand_Proc
						WHERE	cod_emp = @cod_emp;
					END

					IF (@tabla = 'GTH_CandPostCIUO')
					BEGIN
						INSERT
						INTO	GTH_CandPostCIUO
						SELECT	@cod_nue, fec_apl, cod_gru_CIUO, Cod_CIUO
						FROM	GTH_CandPostCIUO
						WHERE	cod_emp = @cod_emp;
					END

					IF (@tabla = 'GTH_CitaContrato')
					BEGIN
						INSERT
						INTO	GTH_CitaContrato
						SELECT	num_req, @cod_nue, fec_con, ind_asist, observacion
						FROM	GTH_CitaContrato
						WHERE	cod_emp = @cod_emp;
					END

					SET @nRegAfe = @@ROWCOUNT + @nRegAfe;

					SELECT @CADENA = ' ';
				END;
				FETCH NEXT FROM CX1 INTO @Tabla;
				
			END;

			CLOSE CX1;
			DEALLOCATE CX1;
						
			/*2013-0634*/
			DECLARE CX1 CURSOR LOCAL READ_ONLY
			FOR
				SELECT a.name
				FROM sysobjects AS a,
					syscolumns AS b
				WHERE a.id = b.id
					AND a.name LIKE 'nom%'
					AND SUBSTRING(b.name, 1, 7) LIKE 'cod_emp'
					AND a.xtype = 'U';

				SET @nRegAfe = 0;
    
			OPEN CX1;
			FETCH NEXT FROM CX1 INTO @Tabla;

			WHILE @@FETCH_STATUS <> -1
			BEGIN
				SELECT @CADENA = 'UPDATE '+RTRIM(@tabla)+' SET cod_emp = '''+RTRIM(@cod_nue)+''' WHERE cod_emp = '''+RTRIM(@cod_emp)+'''';
				EXEC (@CADENA);
				SET @nRegAfe = @@ROWCOUNT + @nRegAfe;
	   
				SELECT @CADENA = ' ';

				FETCH NEXT FROM CX1 INTO @Tabla;
			END;

			CLOSE CX1;
			DEALLOCATE CX1;
			
			UPDATE	GTH_RequisicionEmp
			SET		ind_cop = 0
			WHERE	cod_emp = @cod_nue;

			DELETE FROM GTH_PbaEmp
			WHERE COD_EMP = @cod_emp;

			DELETE FROM GTH_RptPbaEmp
			WHERE COD_EMP = @cod_emp;

			DELETE FROM GTH_CitaContrato
			WHERE COD_EMP = @cod_emp;

			DELETE FROM GTH_RequisicionEmp
			WHERE COD_EMP = @cod_emp;

			UPDATE GTH_Eval_Estado_Pers  
			SET  cod_rpt_respond = @cod_nue WHERE cod_rpt_respond = @cod_emp;
			
			UPDATE GTH_CandAplica
			SET  COD_EMP = @cod_nue WHERE COD_EMP = @cod_emp;
			
			DELETE	FROM GTH_Sel_Cand_Proc
			WHERE	cod_emp = @cod_emp;

			DELETE	FROM GTH_CandPostCIUO
			WHERE	cod_emp = @cod_emp;

			DELETE FROM GTH_RptEmplea
			WHERE COD_EMP = @cod_emp;
			
	END TRY
			BEGIN CATCH
			
				EXEC sp_rhh_LiqErrInfo @cMsgErr OUTPUT;
				SELECT 'ERROR'= concat(@cMsgErr, ' en la tabla: ', @tabla )
				SET @cMsgErr = 'No se creó el registro con el nuevo número de documento '+@cMsgErr;
				RAISERROR(@cMsgErr, 16, 1);
			END CATCH;

			IF XACT_STATE() = 1
			BEGIN
				COMMIT TRANSACTION
			END;

			INSERT INTO #t_Error( cod_emp,Error,APL)
			VALUES(@cod_emp, 'Proceso Terminado. Se Cambio el codigo del Empleado '+@cod_emp+' . Por el codigo : '+@cod_nue + 'de la Aplicacion de GESTION HUMANA','GTH' );

			--SELECT * FROM #t_Error
	END TRY
	BEGIN CATCH
			EXEC sp_gen_validatriggers 'GTH_EvaDesemAsig_Trg_act',3
			EXEC sp_gen_validatriggers 'tr_GTH_EventoInvita',3
			EXEC sp_gen_validatriggers 'tr_gth_eventos_pre',3
			EXEC sp_gen_validatriggers 'Trg_gth_EventoInvita_Ins_Up',3
			EXEC sp_gen_validatriggers 'Trg_GTH_Requisicion_I_U',3
			EXEC sp_gen_validatriggers 'Trg_GTH_Requisicion_Modelos',3
			EXEC sp_gen_validatriggers 'Tr_Gth_RptEmplea',3

		EXEC sp_rhh_LiqErrInfo @cMsgErr OUTPUT;
		SELECT  	@cMsgErr = CONCAT(@cMsgErr,'en la tabla: ',@tabla)

		IF @@TRANCOUNT > 0
		BEGIN
			ROLLBACK TRANSACTION
		END;

		INSERT INTO #t_Error(cod_emp,Error,APL)
		VALUES(@cod_emp, 'Se presentaron errores '+@cMsgErr+'. No se Cambio el codigo','GTH' );
	END CATCH;
END;

```
