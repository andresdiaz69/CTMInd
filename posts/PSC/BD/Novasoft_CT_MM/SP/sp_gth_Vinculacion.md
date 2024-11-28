# Stored Procedure: sp_gth_Vinculacion

## Usa los objetos:
- [[fn_gen_GetErrorSQLBD]]
- [[GTH_AdminEstSegEmplea]]
- [[GTH_Assessment]]
- [[GTH_AssessmentDet]]
- [[GTH_CompEmp]]
- [[GTH_DiscapEmplea]]
- [[GTH_EmpRedSocial]]
- [[GTH_EntrevDet]]
- [[GTH_EstudSeguridad]]
- [[GTH_ExamenMedico]]
- [[GTH_ExpLaboral]]
- [[GTH_ExpLaboralEmp]]
- [[GTH_PbaEmp]]
- [[GTH_RefePersDet]]
- [[GTH_Referencias]]
- [[GTH_RequiEmp]]
- [[GTH_RequisicionEmp]]
- [[GTH_RptAssessment]]
- [[GTH_RptAssessmentDet]]
- [[GTH_RptCompEmp]]
- [[GTH_RptDiscapEmplea]]
- [[GTH_RptDocemp]]
- [[GTH_RptEmplea]]
- [[GTH_RptEmpRedSocial]]
- [[GTH_RptEntrevDet]]
- [[GTH_RptEstudio]]
- [[GTH_RptEstudSeguridad]]
- [[GTH_RptExamenMedico]]
- [[GTH_RptFamilia]]
- [[GTH_RptIdioma]]
- [[GTH_RptOficios]]
- [[GTH_RptPbaEmp]]
- [[GTH_RptRefePersDet]]
- [[GTH_RptReferencias]]
- [[GTH_RptRequiEmp]]
- [[GTH_RptVisitaDomi]]
- [[GTH_RptVisitaDomiGen]]
- [[GTH_RptVivienda]]
- [[GTH_VisitaDomi]]
- [[GTH_VisitaDomiGen]]
- [[rhh_anexosemplea]]
- [[rhh_emplea]]
- [[rhh_Estudio]]
- [[rhh_Familia]]
- [[rhh_idioma]]
- [[rhh_oficios]]
- [[rhh_vivienda]]

```sql

-- =============================================
-- Author:		Ricardo Santamaría Vanegas
-- Create date: Marzo 26 de 2009
-- Description:	Pasa Datos del candidato a tablas de Empleados
-- =============================================

CREATE PROCEDURE [dbo].[sp_gth_Vinculacion]
	@num_req	INT = null,
	@cod_emp	CHAR(12),
	@val_cnt	CHAR(1) = null

--WITH ENCRYPTION
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	DECLARE @cMsgErr	NVARCHAR(MAX);
	DECLARE @nConsAss	INT;
	DECLARE @nConsRef	INT;

	CREATE TABLE #t_Error
	(
		cod_emp VARCHAR(15) COLLATE DATABASE_DEFAULT NULL, 
		error	VARCHAR(1000) COLLATE DATABASE_DEFAULT NULL
	);

	CREATE TABLE #T_Cedulas 
	(
		cod_emp CHAR(12) COLLATE DATABASE_DEFAULT
	);

	IF	@num_req IS NOT NULL AND LEN(RTRIM(@num_req)) <> 0 AND @num_req != 0
	BEGIN
		INSERT	
		INTO	#T_Cedulas
		SELECT	cod_emp
		FROM	GTH_RequisicionEmp
		WHERE	num_req = @num_req AND ind_cnt = 1
				AND cod_emp = @cod_emp;
	END
	ELSE
	BEGIN
		INSERT	
		INTO	#T_Cedulas
		VALUES	(@cod_emp);
	END

	IF (SELECT COUNT(*) FROM #T_Cedulas) = 0
	BEGIN
		RAISERROR (N'No Hay Información para Procesar', 16, 1);
	END
	BEGIN TRY
		IF @val_cnt IS NULL
		BEGIN
			IF EXISTS(SELECT cod_emp FROM rhh_emplea WHERE cod_emp = @cod_emp)
			BEGIN
				RAISERROR (N'El candidato ya éxiste como empleado', 16, 1);
			END
		END
		
		IF (@num_req IS NOT NULL AND @num_req != 0)
		BEGIN
			IF (SELECT COUNT(*) FROM GTH_RequisicionEmp WHERE cod_emp = @cod_emp AND ind_cnt = 1 AND num_req = @num_req) = 0
			BEGIN
				RAISERROR (N'El candidato no ha sido elegido para ser vinculado', 16, 1);
			END
		END

		BEGIN TRANSACTION
			IF @val_cnt IS NULL
			BEGIN
				INSERT INTO rhh_emplea
				SELECT	*
				FROM	GTH_RptEmplea
				WHERE	cod_emp = @cod_emp;
			END
			ELSE
			BEGIN
				UPDATE	rhh_emplea
				SET		Niv_aca = E.Niv_aca,
						asp_sal = E.asp_sal,
						disp_asp = E.disp_asp,
						pto_gas = ISNULL(E.pto_gas,0),
						deudas = E.deudas,
						Cpto_Deudas = E.Cpto_Deudas,
						e_mail_alt = E.e_mail_alt,
						per_car = ISNULL(E.per_car,0)
				FROM	rhh_emplea AS EP
				INNER	JOIN GTH_RptEmplea AS E ON EP.cod_emp = E.cod_emp
				WHERE	E.cod_emp = @cod_emp;
			END
		
			INSERT 
			INTO	GTH_EmpRedSocial
			SELECT	*
			FROM	GTH_RptEmpRedSocial
			WHERE	cod_emp = @cod_emp;

			INSERT 
			INTO	rhh_vivienda
			SELECT	*
			FROM	GTH_RptVivienda
			WHERE	cod_emp = @cod_emp;
		
			INSERT 
			INTO	rhh_Estudio
			SELECT	*
			FROM	GTH_RptEstudio
			WHERE	cod_emp = @cod_emp;

			INSERT 
			INTO	rhh_Familia
			SELECT	cod_emp,ap1_fam,ISNULL(ap2_fam,''),nom_fam,tip_fam,gra_san,tip_ide,num_ced,fec_nac,sex_fam,est_civ,niv_est,
					ind_comp,ocu_fam,sal_bas,ind_sub,ind_pro,ind_conv,sex_famANT,Ind_disc_ec,Ind_Dep_Ret,ind_adulto_mayor
			FROM	GTH_RptFamilia
			WHERE	cod_emp = @cod_emp;
				
			INSERT 
			INTO	GTH_ExpLaboralEmp
			SELECT	*
			FROM	GTH_ExpLaboral
			WHERE	cod_emp = @cod_emp;

			INSERT 
			INTO	rhh_idioma
			SELECT	cod_emp, cod_idi, cod_calif, cod_hab, NULL, NULL
			FROM	GTH_RptIdioma
			WHERE	cod_emp = @cod_emp;

			INSERT 
			INTO	rhh_oficios
			SELECT	*
			FROM	GTH_RptOficios
			WHERE	cod_emp = @cod_emp;

			INSERT
			INTO	GTH_Referencias
			SELECT	*
			FROM	GTH_RptReferencias
			WHERE	cod_emp = @cod_emp;

			INSERT
			INTO	GTH_DiscapEmplea
			SELECT	*
			FROM	GTH_RptDiscapEmplea
			WHERE	cod_emp = @cod_emp;

			--UPDATE	rhh_docemp
			--SET		ind_cum = DC.ind_cum,
			--		fec_comp = DC.fec_comp,
			--		fec_ent = DC.fec_ent,
			--		fec_vencto = DC.fec_vencto,
			--		observacion = ISNULL(DC.observacion,' '),
			--		num_doc = DC.num_doc,
			--		fec_expe = DC.fec_expe
			--FROM	rhh_docemp AS DE
			--INNER	JOIN GTH_RptDocemp AS DC ON DE.cod_emp = DC.cod_emp
			--		AND DE.cod_doc = DC.cod_doc
			--WHERE	DC.cod_emp = @cod_emp;

			INSERT
			INTO	rhh_anexosemplea (cod_emp, cod_doc, ind_cum, num_doc, fec_expe, fec_comp, fec_ent, fec_vencto, tipo, observacion,
					doc_anx, nom_anx, id_uniq)
			SELECT	cod_emp, cod_doc, ind_cum, num_doc, fec_expe, fec_comp, fec_ent, fec_vencto, tipo, observacion,
					doc_anx, nom_anx, NEWID()
			FROM	GTH_RptDocemp
			WHERE	cod_emp = @cod_emp;
		
			IF (@num_req IS NOT NULL)
			BEGIN
				INSERT 
				INTO	GTH_RequiEmp
				SELECT	cod_emp, cod_requi, num_req, fec_requi, cod_calif, obs_requi
				FROM	GTH_RptRequiEmp
				WHERE	cod_emp = @cod_emp AND num_req = @num_req;
		
				INSERT 
				INTO	GTH_CompEmp
				SELECT	*
				FROM	GTH_RptCompEmp
				WHERE	cod_emp = @cod_emp AND num_req = @num_req;
		
				INSERT 
				INTO	GTH_PbaEmp
				SELECT	*
				FROM	GTH_RptPbaEmp
				WHERE	cod_emp = @cod_emp AND num_req = @num_req;

				INSERT 
				INTO	GTH_Assessment
				SELECT	cod_emp, num_req, fec_ass, obs_ass, cod_emp_evador
				FROM	GTH_RptAssessment
				WHERE	cod_emp = @cod_emp AND num_req = @num_req;
		
				IF NOT EXISTS (SELECT num_req FROM GTH_AssessmentDet WHERE cod_emp = @cod_emp AND num_req = @num_req 
								AND cod_comp IN (SELECT cod_comp FROM GTH_AssessmentDet WHERE cod_emp = @cod_emp 
								AND num_req = @num_req))
				BEGIN
					INSERT 
					INTO	GTH_AssessmentDet
					SELECT	AD.cod_emp,A.cvo_ass,AD.cod_comp,AD.num_req,AD.emp_obs1,AD.com_obs1,AD.val_obs1,AD.emp_obs2,AD.com_obs2,AD.val_obs2,
							AD.emp_obs3,AD.com_obs3,AD.val_obs3
					FROM	GTH_RptAssessmentDet AS AD
					INNER	JOIN GTH_RptAssessment AS AR ON AD.num_req = AR.num_req
							AND AD.cod_emp = AR.cod_emp AND AD.cvo_ass = AR.cvo_ass
					INNER	JOIN GTH_Assessment AS A ON AR.num_req = A.num_req
							AND AR.cod_emp = A.cod_emp AND AR.fec_ass = A.fec_ass
					WHERE	AD.cod_emp = @cod_emp AND AD.num_req = @num_req;
				END
				ELSE
				BEGIN
					UPDATE	GTH_AssessmentDet 
					SET		emp_obs1 = AD.emp_obs1, com_obs1 = AD.com_obs1, val_obs1 = AD.val_obs1,
							emp_obs2 = AD.emp_obs2, com_obs2 = AD.com_obs2, val_obs2 = AD.val_obs2,
							emp_obs3 = AD.emp_obs3, com_obs3 = AD.com_obs3, val_obs3 = AD.val_obs3
					FROM	GTH_RptAssessmentDet AS AD
					INNER	JOIN GTH_RptAssessment AS AR ON AD.num_req = AR.num_req
							AND AD.cod_emp = AR.cod_emp AND AD.cvo_ass = AR.cvo_ass
					INNER	JOIN GTH_Assessment AS A ON AR.num_req = A.num_req
							AND AR.cod_emp = A.cod_emp AND AR.fec_ass = A.fec_ass
					INNER	JOIN GTH_AssessmentDet AS DE ON AD.cod_comp = DE.cod_comp 
							AND AD.cod_emp = DE.cod_emp AND AD.num_req = DE.num_req
							AND A.cvo_ass = DE.cvo_ass
					WHERE	AD.cod_emp = @cod_emp AND AD.num_req = @num_req;
				END
					
				INSERT 
				INTO	GTH_RefePersDet
				SELECT	*
				FROM	GTH_RptRefePersDet
				WHERE	cod_emp = @cod_emp AND num_req = @num_req;

				INSERT 
				INTO	GTH_VisitaDomi (cod_emp, fec_vis, obs_vis, num_req, doc_anx, nom_anx, id_uniq)
				SELECT	cod_emp, fec_vis, obs_vis, num_req, doc_anx, nom_anx, id_uniq
				FROM	GTH_RptVisitaDomi
				WHERE	cod_emp = @cod_emp AND num_req = @num_req;

				INSERT 
				INTO	GTH_VisitaDomiGen
				SELECT	AD.cod_emp, AD.num_req, AD.asp_pers, AD.situa_fliar, AD.vivienda, AD.situa_acad, AD.situa_labor,
						AD.logr_repres, AD.metas, AD.otros, A.ID_Visita
				FROM	GTH_RptVisitaDomiGen AS AD
				INNER	JOIN GTH_RptVisitaDomi AS AR ON AD.num_req = AR.num_req
						AND AD.cod_emp = AR.cod_emp AND AD.ID_Visita = AR.ID_Visita
				INNER	JOIN GTH_VisitaDomi AS A ON AR.num_req = A.num_req
						AND AR.cod_emp = A.cod_emp AND AR.fec_vis = A.fec_vis
				WHERE	AD.cod_emp = @cod_emp AND AD.num_req = @num_req;
					
				INSERT 
				INTO	GTH_EntrevDet
				SELECT	*
				FROM	GTH_RptEntrevDet
				WHERE	cod_emp = @cod_emp AND num_req = @num_req;
					
				INSERT 
				INTO	GTH_ExamenMedico(cod_emp, num_req, tip_ex, fec_exmed, prov_resp, ind_apto, nom_anx, 
						obs_exmed, cod_exa_med, id_uniq, doc_anx)
				SELECT	cod_emp, num_req, tip_ex, fec_exmed, prov_resp, ind_apto, nom_anx, obs_exmed,
						cod_exa_med, NEWID(), doc_anx
				FROM	GTH_RptExamenMedico
				WHERE	cod_emp = @cod_emp AND num_req = @num_req;	
					
				INSERT 
				INTO	GTH_EstudSeguridad(cod_emp, num_req, tip_estseg, fec_estseg, prov_resp, ind_apto,
						nom_anx, obs_estseg, id_uniq, doc_anx)
				SELECT	cod_emp, num_req, tip_estseg, fec_estseg, prov_resp,
						ind_apto, nom_anx, obs_estseg, NEWID(), doc_anx
				FROM	GTH_RptEstudSeguridad
				WHERE	cod_emp = @cod_emp AND num_req = @num_req;
				
				INSERT 
				INTO	GTH_AdminEstSegEmplea(cod_emp, tip_estseg, fec_rea, cod_emp_ext,
						nom_adj, id_doc, doc_adj, cod_clas, ind_aprob)
				SELECT	cod_emp, tip_estseg, fec_estseg, prov_resp,
						nom_anx, NEWID(), doc_anx, 4, 
						(CASE
							WHEN ind_apto = 2 THEN 0
							ELSE 1
						END)
				FROM	GTH_RptEstudSeguridad
				WHERE	cod_emp = @cod_emp AND num_req = @num_req;
			END
		COMMIT TRANSACTION
		
		SELECT 'Resultado del Proceso' = 'Proceso Terminado Satisfactoriamente';
	END TRY
	BEGIN CATCH
		IF ERROR_NUMBER() >= 50000
		BEGIN
			SET @cMsgErr = ERROR_MESSAGE();
		END
		ELSE
		BEGIN
			SET @cMsgErr = dbo.fn_gen_GetErrorSQLBD(ERROR_NUMBER(), ERROR_SEVERITY());
		END
			
		IF @@TRANCOUNT > 0
		BEGIN
			ROLLBACK TRANSACTION;
		END
		
		INSERT
		INTO	#t_Error (cod_emp, error)
		VALUES	(@cod_emp, 'Error en la vinculación del candidato ' + RTRIM(@cod_emp) + '.');
		
		SELECT * FROM #t_Error;
	END CATCH
END

```
