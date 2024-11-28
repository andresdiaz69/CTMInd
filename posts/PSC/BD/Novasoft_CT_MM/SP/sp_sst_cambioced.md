# Stored Procedure: sp_sst_cambioced

## Usa los objetos:
- [[sp_gen_validatriggers]]
- [[sp_rhh_LiqErrInfo]]
- [[SST_NivAprobDetAprob]]
- [[SST_NivAprobEmpItems]]
- [[SST_NivAprobEmplea]]

```sql

-- =============================================
-- Author:		Grace Niño
-- Create date: 27/07/2018
-- Description:	Cambia cédula de empleado en tablas de GH y SST
-- =============================================

CREATE PROCEDURE [dbo].[sp_sst_cambioced] 
	@cod_emp CHAR(12) = NULL,
	@cod_nue CHAR(12) = NULL

--WITH ENCRYTPION  
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	DECLARE @cadena NVARCHAR(MAX);
	DECLARE @tabla CHAR(40);
	DECLARE @cMsgErr VARCHAR(MAX);
	DECLARE @nRegAfe INT;

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

		EXEC sp_gen_validatriggers 'TR_SST_RepreComite',1
		EXEC sp_gen_validatriggers 'TR_SST_RepreCopasst',1
		EXEC sp_gen_validatriggers 'TR_SST_IntegraAltaGerencia',1
		EXEC sp_gen_validatriggers 'TR_SST_IntegraBrigada',1
		EXEC sp_gen_validatriggers 'TR_SST_IntegraComiteSegVial',1
		
		DECLARE CX1 CURSOR LOCAL READ_ONLY
			FOR
				SELECT a.name
				FROM sysobjects AS a,
					syscolumns AS b
				WHERE a.id = b.id
					AND a.name LIKE 'GTH%'
					AND SUBSTRING(b.name, 1, 7) LIKE 'cod_emp'
					AND a.name NOT IN(
									'gth_RptEmplea', 'GTH_RequisicionEmp', 'GTH_Contratos', 'GTH_EvaDesemAsig', 'GTH_EvaDesemRes',		  'GTH_EvaDesemEmp','GTH_EvalItem', 'Gth_AsigIndGestion', 'GTH_EvalEventoEmp', 'GTH_Asistencia',	    'GTH_Entrevista', 'GTH_RptEntrevista', 'GTH_RefePers', 'GTH_RptRefePers', 'GTH_RefePersDet',		    'GTH_RptRefePersDet', 'GTH_VisitaDomi', 'GTH_RptVisitaDomi', 'GTH_VisitaDomiGen',					    'GTH_RptVisitaDomiGen', 'GTH_LlamAten', 'GTH_ProcesoDisciplinarioAnt', 'GTH_Emplea_Cliente',		    'GTH_Tareas', 'GTH_Emplea_Externo', 'GTH_testigo_dis_ext', 'GTH_IndGestion',						    'GTH_ProcesoDisciplinario', 'GTH_RetiroChkDet', 'GTH_RetiroChk', 'GTH_EvaDesemGrupoEvalPlanMejora',
									'GTH_EvaDesemPbaExt','GTH_EvaDesemRespComp','GTH_EvaDesemRespCompConc', 'GTH_ParamContratos'
									)
					AND a.xtype = 'U'

				UNION

				SELECT a.name
				FROM sysobjects AS a,
					syscolumns AS b
				WHERE a.id = b.id
					AND a.name LIKE 'SST%'
					AND SUBSTRING(b.name, 1, 7) LIKE 'cod_emp'
					AND a.xtype = 'U'
					AND a.name NOT IN ('SST_Emplea_Externo');

				SET @nRegAfe = 0;

			OPEN CX1;
			FETCH NEXT FROM CX1 INTO @Tabla;

			WHILE @@FETCH_STATUS <> -1
			BEGIN
				IF @tabla IN( 'GTH_Eval_Estado_Pers' )
				BEGIN
					SELECT @cadena = 'UPDATE '+RTRIM(@tabla)+' SET cod_emp_evado = '''+RTRIM(@cod_nue)+''' WHERE cod_emp_evado = '''+RTRIM(@cod_emp)+'''';
					EXEC SP_EXECUTESQL @cadena;
					SET @nRegAfe = @@ROWCOUNT + @nRegAfe;

					SELECT @cadena = 'UPDATE '+RTRIM(@tabla)+' SET cod_emp_respond = '''+RTRIM(@cod_nue)+''' WHERE cod_emp_respond = '''+RTRIM(@cod_emp)+'''';
					EXEC SP_EXECUTESQL @cadena;
					SET @nRegAfe = @@ROWCOUNT + @nRegAfe;

					SELECT @cadena = 'UPDATE '+RTRIM(@tabla)+' SET cod_rpt_respond = '''+RTRIM(@cod_nue)+''' WHERE cod_rpt_respond = '''+RTRIM(@cod_emp)+'''';
					EXEC SP_EXECUTESQL @cadena;
					SET @nRegAfe = @@ROWCOUNT + @nRegAfe;
				END;

				IF @TABLA IN( 'GTH_Assessment', 'GTH_RptAssessment' )
				BEGIN
					SELECT @CADENA = 'UPDATE '+RTRIM(@tabla)+' SET cod_emp_evador = '''+RTRIM(@cod_nue)+''' WHERE cod_emp_evador = '''+RTRIM(@cod_nue)+'''';
					EXEC SP_EXECUTESQL @cadena;
					SET @nRegAfe = @@ROWCOUNT + @nRegAfe;
				END;

				IF @TABLA IN( 'GTH_AssessmentDet', 'GTH_RptAssessmentDet' )
				BEGIN
					SELECT @cadena = 'UPDATE '+RTRIM(@tabla)+' SET emp_obs1 = '''+RTRIM(@cod_nue)+''' WHERE emp_obs1 = '''+RTRIM(@cod_nue)+'''';
					EXEC SP_EXECUTESQL @cadena;
					SET @nRegAfe = @@ROWCOUNT + @nRegAfe;

					SELECT @cadena = 'UPDATE '+RTRIM(@tabla)+' SET emp_obs2 = '''+RTRIM(@cod_nue)+''' WHERE emp_obs2 = '''+RTRIM(@cod_nue)+'''';
					EXEC SP_EXECUTESQL @cadena;
					SET @nRegAfe = @@ROWCOUNT + @nRegAfe;

					SELECT @cadena = 'UPDATE '+RTRIM(@tabla)+' SET emp_obs3 = '''+RTRIM(@cod_nue)+''' WHERE emp_obs3 = '''+RTRIM(@cod_nue)+'''';
					EXEC SP_EXECUTESQL @cadena;
					SET @nRegAfe = @@ROWCOUNT + @nRegAfe;
				END;

				IF @TABLA IN( 'GTH_EntrevDet', 'GTH_RptEntrevDet' )
				BEGIN
					SELECT @cadena = 'UPDATE '+RTRIM(@tabla)+' SET cod_emp_ev1 = '''+RTRIM(@cod_nue)+''' WHERE cod_emp_ev1 = '''+RTRIM(@cod_nue)+'''';
					EXEC SP_EXECUTESQL @cadena;
					SET @nRegAfe = @@ROWCOUNT + @nRegAfe;

					SELECT @cadena = 'UPDATE '+RTRIM(@tabla)+' SET cod_emp_ev2 = '''+RTRIM(@cod_nue)+''' WHERE cod_emp_ev2 = '''+RTRIM(@cod_nue)+'''';
					EXEC SP_EXECUTESQL @cadena;
					SET @nRegAfe = @@ROWCOUNT + @nRegAfe;

					SELECT @cadena = 'UPDATE '+RTRIM(@tabla)+' SET cod_emp_ev3 = '''+RTRIM(@cod_nue)+''' WHERE cod_emp_ev3 = '''+RTRIM(@cod_nue)+'''';
					EXEC SP_EXECUTESQL @cadena;
					SET @nRegAfe = @@ROWCOUNT + @nRegAfe;
				END;

				IF @TABLA IN( 'GTH_PbaEmp', 'GTH_RptPbaEmp' )
				BEGIN
					SELECT @cadena = 'UPDATE '+RTRIM(@tabla)+' SET resp_interp = '''+RTRIM(@cod_nue)+''' WHERE resp_interp = '''+RTRIM(@cod_nue)+'''';
					EXEC SP_EXECUTESQL @cadena;
					SET @nRegAfe = @@ROWCOUNT + @nRegAfe;
				END;

				IF @tabla IN( 'GTH_ProcesoDisciplinario' )
				BEGIN
					SELECT @cadena = 'UPDATE '+RTRIM(@tabla)+' SET Cod_Emp_Sol='''+RTRIM(@cod_nue)+''' WHERE Cod_Emp_Sol = '''+RTRIM(@cod_emp)+'''';
					EXEC SP_EXECUTESQL @cadena;
					SET @nRegAfe = @@ROWCOUNT + @nRegAfe;
				END;

				IF @tabla IN( 'SST_ProveedorEvalua' )
				BEGIN
					SELECT @cadena = 'UPDATE '+RTRIM(@tabla)+' SET cod_emp_evado='''+RTRIM(@cod_nue)+''' WHERE cod_emp_evado = '''+RTRIM(@cod_emp)+'''';
					EXEC SP_EXECUTESQL @cadena;
					SET @nRegAfe = @@ROWCOUNT + @nRegAfe;
				END;

				IF @TABLA IN ('SST_NivAprobDetAprob', 'SST_NivAprobEmpItems', 'SST_NivAprobEmplea')
				BEGIN
					INSERT
					INTO	SST_NivAprobEmplea
					SELECT	cod_cia, niv_aprob, @cod_nue, ind_desact
					FROM	SST_NivAprobEmplea
					WHERE	cod_emp = @cod_emp;

					INSERT
					INTO	SST_NivAprobEmpItems
					SELECT	cod_cia, niv_aprob, @cod_nue, cod_item
					FROM	SST_NivAprobEmpItems
					WHERE	cod_emp = @cod_emp;

					INSERT
					INTO	SST_NivAprobDetAprob
					SELECT	cod_cia, niv_aprob, @cod_nue, cod_item, llave, usu_emp, ind_aprob, fec_aprob, ord_aprob, obs_aprob
					FROM	SST_NivAprobDetAprob
					WHERE	cod_emp = @cod_emp;

					DELETE FROM SST_NivAprobDetAprob WHERE cod_emp = @cod_emp;
					DELETE FROM SST_NivAprobEmpItems WHERE cod_emp = @cod_emp;
					DELETE FROM SST_NivAprobEmplea WHERE cod_emp = @cod_emp;
				END;

		/**/	IF @tabla NOT IN( 'GTH_EvaDesemRes', 'GTH_Tareas', 'GTH_IndGestion', 'GTH_Eval_Manual', 'Rhh_Prestm',											'GTH_Eval_Estado_Pers', 'GTH_Assessment', 'GTH_RptAssessment', 'GTH_AssessmentDet',											'GTH_RptAssessmentDet', 'GTH_EntrevDet', 'GTH_RptEntrevDet', 'Gth_DocumIncemp', 'GTH_PbaEmp',								'GTH_RptPbaEmp', 'GTH_Requisicion', 'GTH_RefePers', 'GTH_RptRefePers', 'GTH_Emplea_Cliente',								'SST_NivAprobDetAprob', 'SST_NivAprobEmpItems', 'SST_NivAprobEmplea', 'GTH_Emplea_Externo',									'rhh_ausentismo', 'GTH_ProcesoDisciplinario', 'Rhh_Djo_hras_cco_cli', 'Rhh_Djo_hras_cliente',								'SST_ProveedorEvalua', 'GTH_EvaDesemGrupoEvalPlanMejora', 'GTH_EvaDesemPbaExt',												'GTH_EvaDesemRespComp', 'GTH_EvaDesemRespCompConc', 'GTH_ParamContratos')
				BEGIN
					SELECT @CADENA = 'UPDATE '+RTRIM(@tabla)+' SET cod_emp = '''+RTRIM(@cod_nue)+''' WHERE cod_emp = '''+RTRIM(@cod_emp)+'''';
					EXEC SP_EXECUTESQL @cadena;
					SET @nRegAfe = @@ROWCOUNT + @nRegAfe;

		/**/	END;

				FETCH NEXT FROM CX1 INTO @Tabla;
			END;
			CLOSE CX1;
			DEALLOCATE CX1;
			/* ACTUALIZA CÓDIGO EMPLEADO RESPONSABLE */
			DECLARE CGS CURSOR LOCAL READ_ONLY
			FOR
				SELECT a.name
				FROM sysobjects AS a,
					syscolumns AS b
				WHERE a.id = b.id
					AND a.name LIKE 'GTH%'
					AND SUBSTRING(b.name, 1, 8) LIKE 'emp_resp'
					AND a.xtype = 'U'

				UNION

				SELECT a.name
				FROM sysobjects AS a,
					syscolumns AS b
				WHERE a.id = b.id
					AND a.name LIKE 'SST%'
					AND SUBSTRING(b.name, 1, 8) LIKE 'emp_resp'
					AND a.xtype = 'U';

				SET @nRegAfe = 0;

			OPEN CGS;
			FETCH NEXT FROM CGS INTO @Tabla;

			WHILE @@FETCH_STATUS <> -1
			BEGIN
				SELECT @cadena = 'UPDATE '+RTRIM(@tabla)+' SET emp_resp='''+RTRIM(@cod_nue)+''' WHERE emp_resp = '''+RTRIM(@cod_emp)+'''';
				EXEC SP_EXECUTESQL @cadena;
				SET @nRegAfe = @@ROWCOUNT + @nRegAfe;

				FETCH NEXT FROM CGS INTO @Tabla;
			END;

			CLOSE CGS;
			DEALLOCATE CGS;
			/* ELIMINA LOS DATOS ANTERIORES */
			DECLARE CGS1 CURSOR LOCAL READ_ONLY
			FOR
				SELECT a.name
				FROM sysobjects AS a,
					syscolumns AS b
				WHERE a.id = b.id
					AND a.name LIKE 'GTH%'
					AND SUBSTRING(b.name, 1, 7) LIKE 'cod_emp'
					AND a.name NOT IN(
									'gth_RptEmplea', 'GTH_RequisicionEmp', 'GTH_Contratos', 'GTH_EvaDesemAsig', 'GTH_EvaDesemRes', 'GTH_EvaDesemEmp',
									'GTH_EvalItem', 'Gth_AsigIndGestion', 'GTH_EvalEventoEmp', 'GTH_Asistencia', 'GTH_Entrevista', 'GTH_RptEntrevista',
									'GTH_RefePers', 'GTH_RptRefePers', 'GTH_RefePersDet', 'GTH_RptRefePersDet', 'GTH_VisitaDomi', 'GTH_RptVisitaDomi',
									'GTH_VisitaDomiGen', 'GTH_RptVisitaDomiGen', 'GTH_LlamAten', 'GTH_ProcesoDisciplinarioAnt', 'GTH_Emplea_Cliente', 'GTH_Tareas',
									'GTH_Emplea_Externo', 'GTH_testigo_dis_ext', 'GTH_IndGestion', 'GTH_Eval_Estado_Pers', 'GTH_ProcesoDisciplinario', 'GTH_EvaDesemGrupoEvalPlanMejora',
									'GTH_EvaDesemPbaExt','GTH_EvaDesemRespComp','GTH_EvaDesemRespCompConc', 'GTH_ParamContratos'
									)
					AND a.xtype = 'U'

				UNION

				SELECT a.name
				FROM sysobjects AS a,
					syscolumns AS b
				WHERE a.id = b.id
					AND a.name LIKE 'SST%'
					AND SUBSTRING(b.name, 1, 7) LIKE 'cod_emp'
					AND a.name NOT IN('SST_Emplea_Externo', 'SST_ProveedorEvalua')
					AND a.xtype = 'U';

				SET @nRegAfe = 0;

			OPEN CGS1;
			FETCH NEXT FROM CGS1 INTO @Tabla;

			WHILE @@FETCH_STATUS <> -1
			BEGIN
				IF @TABLA IN ('GTH_Assessment','GTH_RptAssessment')
				BEGIN
					SELECT @cadena = 'DELETE FROM GTH_AssessmentDet WHERE COD_EMP = '''+RTRIM(@cod_emp)+'''';
					EXEC SP_EXECUTESQL @cadena;
					SELECT @cadena = 'DELETE FROM GTH_RptAssessmentDet WHERE COD_EMP = '''+RTRIM(@cod_emp)+'''';
					EXEC SP_EXECUTESQL @cadena;
					SET @nRegAfe = @@ROWCOUNT + @nRegAfe;
				END

				SELECT @cadena = 'DELETE FROM '+RTRIM(@tabla)+' WHERE COD_EMP = '''+RTRIM(@cod_emp)+'''';
				EXEC SP_EXECUTESQL @cadena;
				SET @nRegAfe = @@ROWCOUNT + @nRegAfe;

				FETCH NEXT FROM CGS1 INTO @Tabla;
			END;

			CLOSE CGS1;
			DEALLOCATE CGS1;
			EXEC sp_gen_validatriggers 'TR_SST_RepreComite',3
			EXEC sp_gen_validatriggers 'TR_SST_RepreCopasst',3
			EXEC sp_gen_validatriggers 'TR_SST_IntegraAltaGerencia',3
			EXEC sp_gen_validatriggers 'TR_SST_IntegraBrigada',3
			EXEC sp_gen_validatriggers 'TR_SST_IntegraComiteSegVial',3

			IF XACT_STATE() = 1
			BEGIN
				COMMIT TRANSACTION
			END;

			INSERT INTO #t_Error( cod_emp, error, apl)
			VALUES ( @cod_emp, 'Proceso Terminado. Se Cambio el código del Empleado ' +RTRIM(@cod_emp)+'. Por el código : '+RTRIM(@cod_nue), 'SST');
	END TRY
	BEGIN CATCH
		EXEC sp_rhh_LiqErrInfo @cMsgErr OUTPUT;
		SELECT  	@cMsgErr = CONCAT(@cMsgErr,'en la tabla: ',@tabla)
	   
		IF @@TRANCOUNT > 0
		BEGIN
			ROLLBACK TRANSACTION
		END;

		INSERT INTO #t_Error( cod_emp,Error,APL)
		VALUES(@cod_emp, 'Se presentaron errores '+@cMsgErr+'. No se Cambio el codigo','SST' );
	END CATCH;
END

```
