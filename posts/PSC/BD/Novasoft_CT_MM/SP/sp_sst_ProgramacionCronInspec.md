# Stored Procedure: sp_sst_ProgramacionCronInspec

## Usa los objetos:
- [[GTH_Acc_Acciones]]
- [[GTH_Incid_Acciones]]
- [[SST_EvaluaPlanAccion]]
- [[SST_EvidenciasProgCronInspec]]
- [[SST_GestCambPlanAccion]]
- [[SST_GestionFormCronInspec]]
- [[SST_GestionSinFormCronInspec]]
- [[SST_InspPlanAccion]]
- [[SST_PlanAccionAltGer]]
- [[SST_PlanAccionAudi]]
- [[SST_PlanAccionBrigada]]
- [[SST_PlanAccionComiteConv]]
- [[SST_PlanAccionComiteSV]]
- [[SST_PlanAccionCopasst]]
- [[SST_PlanAccionPlanEme]]
- [[SST_PlanAccionProgCronInspec]]
- [[SST_ProcPlanAccion]]
- [[SST_ProgramacionCronInspec]]
- [[SST_ReprogramacionProgCronInspec]]
- [[SST_ResponsablesProgCronInspec]]
- [[SST_RevAltaDirPlanAccion]]
- [[SST_RiesgoPsicosocPlanAccion]]
- [[SST_SegPosEnfLabAccion]]

```sql

-- =============================================
-- Author:		Camilo Andrés Camargo Convers
-- Create date: 14/05/2020
-- Description: Permite la Inserción, Edición, Eliminación y Consulta de las programaciones de una inspección.
-- =============================================
CREATE PROCEDURE [dbo].[sp_sst_ProgramacionCronInspec]
	@cod_cia	 CHAR(3),
	@anio		 CHAR(4),
	@version	 VARCHAR(20),
	@cod_cli	 CHAR(15),
	@cod_suc	 CHAR(3),
	@cons		 INT,
	@cons_inspec INT,
	@cons_prog   INT = NULL,
	@det_prog	 NVARCHAR(MAX) = NULL,
	@fec_ini	 DATETIME = NULL,
	@fec_fin	 DATETIME = NULL,
	@ind_ejec	 BIT = NULL,
	@ind_usa_for BIT = NULL,
	@ind_fun	 INT	/*1 - Inserción, 2 - Edición, 3 - Eliminación, 4 - Consulta*/
--WITH ENCRYTPION
AS
BEGIN
	SET @cons_prog = CASE WHEN @cons_prog IS NULL THEN ISNULL((SELECT MAX(cons_prog) 
																  FROM SST_ProgramacionCronInspec 
																  WHERE cod_cia = @cod_cia
																	AND anio = @anio
																	AND version = @version
																	AND cod_cli = @cod_cli
																	AND cod_suc = @cod_suc
																	AND cons = @cons
																	AND cons_inspec = @cons_inspec), 0) + 1
							ELSE @cons_prog
					    END;

	IF(@ind_fun = 1)
	BEGIN
		INSERT INTO SST_ProgramacionCronInspec (cod_cia, anio, version, cod_cli, cod_suc, cons, cons_inspec, cons_prog, det_prog, fec_ini, fec_fin, ind_ejec, ind_usa_for)
		VALUES (@cod_cia, @anio, @version, @cod_cli, @cod_suc, @cons, @cons_inspec, @cons_prog, @det_prog, @fec_ini, @fec_fin, @ind_ejec, @ind_usa_for);
	END
	ELSE IF(@ind_fun = 2)
	BEGIN
		UPDATE SST_ProgramacionCronInspec
		SET det_prog = @det_prog,
			ind_ejec = @ind_ejec,
			ind_usa_for = @ind_usa_for
		WHERE cod_cia = @cod_cia
		  AND anio = @anio
		  AND version = @version
		  AND cod_cli = @cod_cli
		  AND cod_suc = @cod_suc
		  AND cons = @cons
		  AND cons_inspec = @cons_inspec
		  AND cons_prog	= @cons_prog;
	END
	ELSE IF(@ind_fun = 3)
	BEGIN
		DELETE SST_ProgramacionCronInspec
		WHERE cod_cia = @cod_cia
		  AND anio = @anio
		  AND version = @version
		  AND cod_cli = @cod_cli
		  AND cod_suc = @cod_suc
		  AND cons = @cons
		  AND cons_inspec = @cons_inspec
		  AND cons_prog	= @cons_prog;
	END
	ELSE IF(@ind_fun = 4)
	BEGIN
		SELECT cons_prog, det_prog, fec_ini, fec_fin, ind_ejec, ind_usa_for,
		--Indicador de Responsables
		(CASE 
			WHEN (SELECT COUNT(cod_emp) 
				  FROM SST_ResponsablesProgCronInspec 
				  WHERE cod_cia = @cod_cia
				  AND anio = @anio
				  AND version = @version
				  AND cod_cli = @cod_cli
				  AND cod_suc = @cod_suc
				  AND cons = @cons
				  AND cons_inspec = @cons_inspec
				  AND cons_prog = PROG.cons_prog) > 0 THEN 1
													  ELSE 0
		END
		) AS ind_resp,
		--Indicador de Gestión
		(CASE 
			WHEN PROG.ind_usa_for = 1 THEN (CASE
											 WHEN
											 (SELECT COUNT(cons_eva) 
											  FROM SST_GestionFormCronInspec
											  WHERE cod_cia = @cod_cia
												AND anio = @anio
												AND version = @version
												AND cod_cli = @cod_cli
												AND cod_suc = @cod_suc
												AND cons = @cons
												AND cons_inspec = @cons_inspec
												AND cons_prog = PROG.cons_prog) > 0 THEN 1
																					ELSE 0
											END)
			ELSE (CASE
					WHEN
					(SELECT COUNT(cons_preg) 
					 FROM SST_GestionSinFormCronInspec
					 WHERE cod_cia = @cod_cia
					   AND anio = @anio
					   AND version = @version
					   AND cod_cli = @cod_cli
					   AND cod_suc = @cod_suc
					   AND cons = @cons
					   AND cons_inspec = @cons_inspec
					   AND cons_prog = PROG.cons_prog) > 0 THEN 1
														   ELSE 0
				  END)
		END
		) AS ind_ges,
		--Indicador de Evidencias
		(CASE
			WHEN (SELECT COUNT(cons_evi)
				  FROM SST_EvidenciasProgCronInspec
				  WHERE cod_cia = @cod_cia
					AND anio = @anio
					AND version = @version
					AND cod_cli = @cod_cli
					AND cod_suc = @cod_suc
					AND cons = @cons
					AND cons_inspec = @cons_inspec
					AND cons_prog = PROG.cons_prog) > 0 THEN 1
														ELSE 0
		END) AS ind_evi,
		--Indicador de Reprogramaciones
		(CASE
			WHEN (SELECT COUNT(cons_reprog)
				  FROM SST_ReprogramacionProgCronInspec
				  WHERE cod_cia = @cod_cia
					AND anio = @anio
					AND version = @version
					AND cod_cli = @cod_cli
					AND cod_suc = @cod_suc
					AND cons = @cons
					AND cons_inspec = @cons_inspec
					AND cons_prog = PROG.cons_prog) > 0 THEN 1
														ELSE 0
		END) AS ind_reprog,
		--Indicador de Plan de Acción
		(CASE
			WHEN (SELECT COUNT(cod_cia)
				  FROM SST_PlanAccionProgCronInspec
				  WHERE cod_cia = @cod_cia
					AND anio = @anio
					AND version = @version
					AND cod_cli = @cod_cli
					AND cod_suc = @cod_suc
					AND cons = @cons
					AND cons_inspec = @cons_inspec
					AND cons_prog = PROG.cons_prog) > 0 THEN 1
														ELSE 0
		END) AS ind_planaccion
		FROM SST_ProgramacionCronInspec AS PROG
		WHERE cod_cia = @cod_cia
			AND anio = @anio
			AND version = @version
			AND cod_cli = @cod_cli
			AND cod_suc = @cod_suc
			AND cons = @cons
			AND cons_inspec = @cons_inspec;
	END

	IF @ind_fun IN ('1','2','3')
	BEGIN
		IF NOT EXISTS (SELECT @cons_inspec 
			   FROM SST_ProgramacionCronInspec 
			   WHERE ind_ejec = 0 
			     AND cod_cia = @cod_cia 
				 AND anio = @anio 
				 AND version = @version
				 AND cod_cli = @cod_cli
				 AND cod_suc = @cod_suc
				 AND cons = @cons 
				 AND cons_inspec = @cons_inspec)
		BEGIN
			UPDATE	GTH_Acc_Acciones
			SET		ind_eje = '1'
			WHERE	llave = RTRIM(@cod_cia) + '*' + RTRIM(@anio) + '*' + RTRIM(@version) + '*' + CAST(@cons AS VARCHAR(6)) + '*' + CAST(@cons_inspec AS VARCHAR(6)) + '*' + RTRIM(@cod_suc) + '*' + RTRIM(@cod_cli)
					AND cod_incid = '4' AND ind_eje <> '1'

			UPDATE	GTH_Incid_Acciones
			SET		ind_eje = '1'
			WHERE	llave = RTRIM(@cod_cia) + '*' + RTRIM(@anio) + '*' + RTRIM(@version) + '*' + CAST(@cons AS VARCHAR(6)) + '*' + CAST(@cons_inspec AS VARCHAR(6)) + '*' + RTRIM(@cod_suc) + '*' + RTRIM(@cod_cli)
					AND cod_incid = '4' AND ind_eje <> '1'

			UPDATE	SST_EvaluaPlanAccion
			SET		cod_plan_eje = '1'
			WHERE	llave = RTRIM(@cod_cia) + '*' + RTRIM(@anio) + '*' + RTRIM(@version) + '*' + CAST(@cons AS VARCHAR(6)) + '*' + CAST(@cons_inspec AS VARCHAR(6)) + '*' + RTRIM(@cod_suc) + '*' + RTRIM(@cod_cli)
					AND cod_incid = '4' AND cod_plan_eje <> '1'

			UPDATE	SST_GestCambPlanAccion
			SET		cod_plan_eje = '1'
			WHERE	llave = RTRIM(@cod_cia) + '*' + RTRIM(@anio) + '*' + RTRIM(@version) + '*' + CAST(@cons AS VARCHAR(6)) + '*' + CAST(@cons_inspec AS VARCHAR(6)) + '*' + RTRIM(@cod_suc) + '*' + RTRIM(@cod_cli)
					AND cod_incid = '4' AND cod_plan_eje <> '1'

			UPDATE	SST_InspPlanAccion
			SET		cod_plan_eje = '1'
			WHERE	llave = RTRIM(@cod_cia) + '*' + RTRIM(@anio) + '*' + RTRIM(@version) + '*' + CAST(@cons AS VARCHAR(6)) + '*' + CAST(@cons_inspec AS VARCHAR(6)) + '*' + RTRIM(@cod_suc) + '*' + RTRIM(@cod_cli)
					AND cod_incid = '4' AND cod_plan_eje <> '1'

			UPDATE	SST_PlanAccionAltGer
			SET		cod_plan_eje = '1'
			WHERE	llave = RTRIM(@cod_cia) + '*' + RTRIM(@anio) + '*' + RTRIM(@version) + '*' + CAST(@cons AS VARCHAR(6)) + '*' + CAST(@cons_inspec AS VARCHAR(6)) + '*' + RTRIM(@cod_suc) + '*' + RTRIM(@cod_cli)
					AND cod_incid = '4' AND cod_plan_eje <> '1'

			UPDATE	SST_PlanAccionAudi
			SET		cod_plan_eje = '1'
			WHERE	llave = RTRIM(@cod_cia) + '*' + RTRIM(@anio) + '*' + RTRIM(@version) + '*' + CAST(@cons AS VARCHAR(6)) + '*' + CAST(@cons_inspec AS VARCHAR(6)) + '*' + RTRIM(@cod_suc) + '*' + RTRIM(@cod_cli)
					AND cod_incid = '4' AND cod_plan_eje <> '1'

			UPDATE	SST_PlanAccionBrigada
			SET		cod_plan_eje = '1'
			WHERE	llave = RTRIM(@cod_cia) + '*' + RTRIM(@anio) + '*' + RTRIM(@version) + '*' + CAST(@cons AS VARCHAR(6)) + '*' + CAST(@cons_inspec AS VARCHAR(6)) + '*' + RTRIM(@cod_suc) + '*' + RTRIM(@cod_cli)
					AND cod_incid = '4' AND cod_plan_eje <> '1'

			UPDATE	SST_PlanAccionComiteConv
			SET		cod_plan_eje = '1'
			WHERE	llave = RTRIM(@cod_cia) + '*' + RTRIM(@anio) + '*' + RTRIM(@version) + '*' + CAST(@cons AS VARCHAR(6)) + '*' + CAST(@cons_inspec AS VARCHAR(6)) + '*' + RTRIM(@cod_suc) + '*' + RTRIM(@cod_cli)
					AND cod_incid = '4' AND cod_plan_eje <> '1'

			UPDATE	SST_PlanAccionComiteSV
			SET		cod_plan_eje = '1'
			WHERE	llave = RTRIM(@cod_cia) + '*' + RTRIM(@anio) + '*' + RTRIM(@version) + '*' + CAST(@cons AS VARCHAR(6)) + '*' + CAST(@cons_inspec AS VARCHAR(6)) + '*' + RTRIM(@cod_suc) + '*' + RTRIM(@cod_cli)
					AND cod_incid = '4' AND cod_plan_eje <> '1'

			UPDATE	SST_PlanAccionCopasst
			SET		cod_plan_eje = '1'
			WHERE	llave = RTRIM(@cod_cia) + '*' + RTRIM(@anio) + '*' + RTRIM(@version) + '*' + CAST(@cons AS VARCHAR(6)) + '*' + CAST(@cons_inspec AS VARCHAR(6)) + '*' + RTRIM(@cod_suc) + '*' + RTRIM(@cod_cli)
					AND cod_incid = '4' AND cod_plan_eje <> '1'

			UPDATE	SST_PlanAccionPlanEme
			SET		cod_plan_eje = '1'
			WHERE	llave = RTRIM(@cod_cia) + '*' + RTRIM(@anio) + '*' + RTRIM(@version) + '*' + CAST(@cons AS VARCHAR(6)) + '*' + CAST(@cons_inspec AS VARCHAR(6)) + '*' + RTRIM(@cod_suc) + '*' + RTRIM(@cod_cli)
					AND cod_incid = '4' AND cod_plan_eje <> '1'

			UPDATE	SST_ProcPlanAccion
			SET		cod_plan_eje = '1'
			WHERE	llave = RTRIM(@cod_cia) + '*' + RTRIM(@anio) + '*' + RTRIM(@version) + '*' + CAST(@cons AS VARCHAR(6)) + '*' + CAST(@cons_inspec AS VARCHAR(6)) + '*' + RTRIM(@cod_suc) + '*' + RTRIM(@cod_cli)
					AND cod_incid = '4' AND cod_plan_eje <> '1'

			UPDATE	SST_RevAltaDirPlanAccion
			SET		cod_plan_eje = '1'
			WHERE	llave = RTRIM(@cod_cia) + '*' + RTRIM(@anio) + '*' + RTRIM(@version) + '*' + CAST(@cons AS VARCHAR(6)) + '*' + CAST(@cons_inspec AS VARCHAR(6)) + '*' + RTRIM(@cod_suc) + '*' + RTRIM(@cod_cli)
					AND cod_incid = '4' AND cod_plan_eje <> '1'

			UPDATE	SST_RiesgoPsicosocPlanAccion
			SET		cod_plan_eje = '1'
			WHERE	llave = RTRIM(@cod_cia) + '*' + RTRIM(@anio) + '*' + RTRIM(@version) + '*' + CAST(@cons AS VARCHAR(6)) + '*' + CAST(@cons_inspec AS VARCHAR(6)) + '*' + RTRIM(@cod_suc) + '*' + RTRIM(@cod_cli)
					AND cod_incid = '4' AND cod_plan_eje <> '1'

			UPDATE	SST_SegPosEnfLabAccion
			SET		ind_eje = '1'
			WHERE	llave = RTRIM(@cod_cia) + '*' + RTRIM(@anio) + '*' + RTRIM(@version) + '*' + CAST(@cons AS VARCHAR(6)) + '*' + CAST(@cons_inspec AS VARCHAR(6)) + '*' + RTRIM(@cod_suc) + '*' + RTRIM(@cod_cli)
					AND cod_incid = '4' AND ind_eje <> '1'
		END
	END
END

```
