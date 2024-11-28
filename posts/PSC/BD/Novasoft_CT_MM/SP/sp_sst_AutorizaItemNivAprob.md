# Stored Procedure: sp_sst_AutorizaItemNivAprob

## Usa los objetos:
- [[GTH_NivAprobUsuarios]]
- [[SST_CronogramaInspecciones]]
- [[SST_CronogramaInspecciones_Aprob]]
- [[SST_MatrizLegalEnc]]
- [[SST_MatrizLegalEnc_Aprob]]
- [[SST_NivAprobDetAprob]]
- [[SST_ObjetivoGral]]
- [[SST_ObjetivoGral_Aprob]]
- [[SST_PlanAnualCapac]]
- [[SST_PlanAnualCapac_Aprob]]
- [[SST_PlanAnualTrabajo]]
- [[SST_PlanAnualTrabajo_Aprob]]
- [[SST_PlanEmergencia]]
- [[SST_PlanEmergencia_Aprob]]
- [[SST_PlanVigEpid]]
- [[SST_PlanVigEpid_Aprob]]
- [[SST_Politica]]
- [[SST_Politica_Aprob]]
- [[SST_RegProcedimiento]]
- [[SST_RegProcedimiento_Aprob]]

```sql

-- =============================================
-- Author:		Camilo Andrés Camargo Convers
-- Create date: 27/03/2020
-- Description: Actualiza las autorizaciones de los diferentes items de SST.
-- =============================================

CREATE PROCEDURE [dbo].[sp_sst_AutorizaItemNivAprob]
	@cod_cia   CHAR(3),
	@cod_item  CHAR(3),
	@llave1	   VARCHAR(100),
	@llave2	   VARCHAR(100),
	@llave3	   VARCHAR(100) = NULL,
	@llave4	   VARCHAR(100) = NULL,
	@llave5	   VARCHAR(100) = NULL,
	@llave6	   VARCHAR(100) = NULL,
	@usuario   NVARCHAR(128),
	@ind_aprob CHAR(1), /*0 - pendiente, 1 - aprobado, 2 - Sin aprobar*/
	@fec_aprob DATETIME,
	@obs_aprob NVARCHAR(MAX)
	
--WITH ENCRYTPION
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	DECLARE @niveles_aprobados TABLE(ord_aprob INT);
	DECLARE @siguiente_nivel BIT;

	UPDATE SST_NivAprobDetAprob 
	SET ind_aprob = @ind_aprob,
		fec_aprob = (CASE
						WHEN @ind_aprob = '1' THEN @fec_aprob
						ELSE NULL
					 END),
		obs_aprob = (CASE
						WHEN @ind_aprob = '1' THEN @obs_aprob
						ELSE NULL
					 END)
	WHERE cod_item = @cod_item
	  AND cod_cia = @cod_cia
	  AND usu_emp = @usuario
	  AND llave = CONCAT(@llave1, '*', @llave2, (CASE
													WHEN @llave3 IS NULL THEN ''
													ELSE CONCAT('*', @llave3)
												 END
												 ),
												 (CASE
													WHEN @llave4 IS NULL THEN ''
													ELSE CONCAT('*', @llave4)
												 END
												 ),
												 (CASE
													WHEN @llave5 IS NULL THEN ''
													ELSE CONCAT('*', @llave5)
												 END
												 ),
												 (CASE
													WHEN @llave6 IS NULL THEN ''
													ELSE CONCAT('*', @llave6)
												 END
												 )
												 );

	INSERT INTO @niveles_aprobados
	SELECT ord_aprob
	FROM SST_NivAprobDetAprob
	WHERE ind_aprob = '1' 
	AND llave = CONCAT(@llave1, '*', @llave2, (CASE
														WHEN @llave3 IS NULL THEN ''
														ELSE CONCAT('*', @llave3)
													 END
													 ),
													 (CASE
														WHEN @llave4 IS NULL THEN ''
														ELSE CONCAT('*', @llave4)
													 END
													 ),
													 (CASE
														WHEN @llave5 IS NULL THEN ''
														ELSE CONCAT('*', @llave5)
													 END
													 ),
													 (CASE
														WHEN @llave6 IS NULL THEN ''
														ELSE CONCAT('*', @llave6)
													 END
													 )
													 );

	SET @siguiente_nivel = 
	CASE
	WHEN (SELECT MIN(ord_aprob)
		  FROM SST_NivAprobDetAprob
		  WHERE llave = CONCAT(@llave1, '*', @llave2, (CASE
														WHEN @llave3 IS NULL THEN ''
														ELSE CONCAT('*', @llave3)
													   END
													   ),
													  (CASE
														WHEN @llave4 IS NULL THEN ''
														ELSE CONCAT('*', @llave4)
													   END),
													  (CASE
														WHEN @llave5 IS NULL THEN ''
														ELSE CONCAT('*', @llave5)
													   END
													   ),
													  (CASE
														WHEN @llave6 IS NULL THEN ''
														ELSE CONCAT('*', @llave6)
													   END
													  )
												 )
		   AND ord_aprob NOT IN (SELECT ord_aprob 
								 FROM @niveles_aprobados)) IS NOT NULL THEN 1
	ELSE 0
	END;

	DECLARE @estado CHAR(1) = CASE
								WHEN @ind_aprob = '1' AND @siguiente_nivel = 1 THEN '3'
								WHEN @ind_aprob = '1' AND @siguiente_nivel = 0 THEN '2'
								ELSE '1'
							   END;
	
	DECLARE @cod_emp CHAR(12) =	(SELECT cod_emp FROM GTH_NivAprobUsuarios WHERE usu_emp = @usuario);
	DECLARE @cod_cons INT;

	IF @cod_item = '001'
	BEGIN
		SET @cod_cons = (CASE
							WHEN (SELECT MAX(cod_cons) FROM SST_ObjetivoGral_Aprob WHERE cod_cia = @llave1 AND anio_obj_gral = @llave2) IS NULL THEN 1
							ELSE ((SELECT MAX(cod_cons) FROM SST_ObjetivoGral_Aprob WHERE cod_cia = @llave1 AND anio_obj_gral = @llave2) + 1)
						  END
						 );
		INSERT INTO SST_ObjetivoGral_Aprob(cod_cia, anio_obj_gral, cod_cons, fch_rev, aprobador, observa, cod_est_apro)
		VALUES (@llave1, @llave2, @cod_cons, @fec_aprob, @cod_emp, @obs_aprob, @estado);
		
		IF (@ind_aprob = '1' AND @siguiente_nivel = 0)
		BEGIN
			UPDATE	SST_ObjetivoGral
			SET		cod_est_apro = '2'
			WHERE	cod_cia = @llave1 
			  AND   anio_obj_gral = @llave2;
		END
	END
	ELSE IF @cod_item = '002'
	BEGIN
		SET @cod_cons = (CASE
							WHEN (SELECT MAX(cod_cons) FROM SST_Politica_Aprob WHERE cod_cia = @llave1 AND cod_polit = @llave2) IS NULL THEN 1
							ELSE ((SELECT MAX(cod_cons) FROM SST_Politica_Aprob WHERE cod_cia = @llave1 AND cod_polit = @llave2) + 1)
						 END
						 );
						 SELECT @cod_cons;
		INSERT INTO SST_Politica_Aprob(cod_cia, cod_polit, cod_cons, fch_rev, aprobador, observa, cod_est_apro)
		VALUES (@llave1, @llave2, @cod_cons, @fec_aprob, @cod_emp, @obs_aprob, @estado);

		IF (@ind_aprob = '1' AND @siguiente_nivel = 0)
		BEGIN
			UPDATE	SST_Politica
			SET		cod_est_apro = '2'
			WHERE	cod_cia = @llave1 
			  AND   cod_polit = @llave2;
		END
	END
	ELSE IF @cod_item = '003'
	BEGIN
		SET @cod_cons = (CASE
							WHEN (SELECT MAX(cod_cons) FROM SST_PlanEmergencia_Aprob WHERE cod_cia = @llave1 AND cod_plan_emerg = @llave2 AND cod_ClasPlanEme = @llave3) IS NULL THEN 1
							ELSE ((SELECT MAX(cod_cons) FROM SST_PlanEmergencia_Aprob WHERE cod_cia = @llave1 AND cod_plan_emerg = @llave2 AND cod_ClasPlanEme = @llave3) + 1)
						 END
						 );
		INSERT INTO SST_PlanEmergencia_Aprob(cod_cia, cod_plan_emerg, cod_ClasPlanEme, cod_cons, fch_rev, aprobador, observa, cod_est_apro)
		VALUES (@llave1, @llave2, @llave3, @cod_cons, @fec_aprob, @cod_emp, @obs_aprob, @estado);
		
		IF (@ind_aprob = '1' AND @siguiente_nivel = 0)
		BEGIN
			UPDATE	SST_PlanEmergencia
			SET		cod_est_apro = '2'
			WHERE	cod_cia = @llave1 
			  AND   cod_plan_emerg =  @llave2
			  AND   cod_ClasPlanEme = @llave3;
		END
	END
	ELSE IF @cod_item = '004'
	BEGIN
		SET @cod_cons = (CASE
							WHEN (SELECT MAX(cod_cons) FROM SST_PlanAnualTrabajo_Aprob WHERE cod_cia = @llave1 AND anio = @llave2 AND version = @llave3 AND cod_suc = @llave4 AND cod_cli = @llave5) IS NULL THEN 1
							ELSE ((SELECT MAX(cod_cons) FROM SST_PlanAnualTrabajo_Aprob WHERE cod_cia = @llave1 AND anio = @llave2 AND version = @llave3 AND cod_suc = @llave4 AND cod_cli = @llave5) + 1)
						 END
						 );
		INSERT INTO SST_PlanAnualTrabajo_Aprob(cod_cia, anio, version, cod_suc, cod_cli, cod_cons, fch_rev, aprobador, observa, cod_est_apro)
		VALUES (@llave1, @llave2, @llave3, @llave4, @llave5, @cod_cons, @fec_aprob, @cod_emp, @obs_aprob, @estado);

		IF (@ind_aprob = '1' AND @siguiente_nivel = 0)
		BEGIN
			UPDATE	SST_PlanAnualTrabajo
			SET		cod_est_apro = '2'
			WHERE	cod_cia = @llave1 
			  AND   anio =  @llave2
			  AND   version = @llave3
			  AND	cod_suc = @llave4
			  AND   cod_cli = @llave5;
		END
	END
	ELSE IF @cod_item = '005'
	BEGIN
		SET @cod_cons = (CASE
							WHEN (SELECT MAX(cod_cons) FROM SST_PlanAnualCapac_Aprob WHERE cod_cia = @llave1 AND anio = @llave2 AND version = @llave3 AND cod_suc = @llave4 AND cod_cli = @llave5) IS NULL THEN 1
							ELSE ((SELECT MAX(cod_cons) FROM SST_PlanAnualCapac_Aprob WHERE cod_cia = @llave1 AND anio = @llave2 AND version = @llave3 AND cod_suc = @llave4 AND cod_cli = @llave5) + 1)
						 END
						 );
		INSERT INTO SST_PlanAnualCapac_Aprob(cod_cia, anio, version, cod_suc, cod_cli, cod_cons, fch_rev, aprobador, observa, cod_est_apro)
		VALUES (@llave1, @llave2, @llave3, @llave4, @llave5, @cod_cons, @fec_aprob, @cod_emp, @obs_aprob, @estado);

		IF (@ind_aprob = '1' AND @siguiente_nivel = 0)
		BEGIN
			UPDATE	SST_PlanAnualCapac
			SET		cod_est_apro = '2'
			WHERE	cod_cia = @llave1 
			  AND   anio =  @llave2
			  AND   version = @llave3
			  AND	cod_suc = @llave4
			  AND   cod_cli = @llave5;;
		END
	END
	--ELSE IF @cod_item = '006'
	--BEGIN

	--END
	ELSE IF @cod_item = '007'
	BEGIN
		SET @cod_cons = (CASE
							WHEN (SELECT MAX(cod_cons) FROM SST_MatrizLegalEnc_Aprob WHERE cod_cia = @llave1 AND version = @llave2) IS NULL THEN 1
							ELSE ((SELECT MAX(cod_cons) FROM SST_MatrizLegalEnc_Aprob WHERE cod_cia = @llave1 AND version = @llave2) + 1)
						 END
						 );
		INSERT INTO SST_MatrizLegalEnc_Aprob(cod_cia, version, cod_cons, fch_rev, aprobador, observa, cod_est_apro)
		VALUES (@llave1, @llave2, @cod_cons, @fec_aprob, @cod_emp, @obs_aprob, @estado);

		IF (@ind_aprob = '1' AND @siguiente_nivel = 0)
		BEGIN
			UPDATE	SST_MatrizLegalEnc
			SET		cod_est_apro = '2'
			WHERE	cod_cia = @llave1 
			  AND   version = @llave2;
		END
	END
	ELSE IF @cod_item = '008'
	BEGIN
		SET @cod_cons = (CASE
							WHEN (SELECT MAX(cod_cons) FROM SST_CronogramaInspecciones_Aprob WHERE cod_cia = @llave1 AND anio = @llave2 AND version = @llave3 AND cons = @llave4 AND cod_suc = @llave5 AND cod_cli = @llave6) IS NULL THEN 1
							ELSE ((SELECT MAX(cod_cons) FROM SST_CronogramaInspecciones_Aprob WHERE cod_cia = @llave1 AND anio = @llave2 AND version = @llave3 AND cons = @llave4 AND cod_suc = @llave5 AND cod_cli = @llave6) + 1)
						 END
						 );
		INSERT INTO SST_CronogramaInspecciones_Aprob(cod_cia, anio, version, cons, cod_suc, cod_cli, cod_cons, fch_rev, aprobador, observa, cod_est_apro)
		VALUES (@llave1, @llave2, @llave3, @llave4, @llave5, @llave6, @cod_cons, @fec_aprob, @cod_emp, @obs_aprob, @estado);

		IF (@ind_aprob = '1' AND @siguiente_nivel = 0)
		BEGIN
			UPDATE	SST_CronogramaInspecciones
			SET		cod_est_apro = '2'
			WHERE	cod_cia = @llave1 
			  AND   anio =  @llave2
			  AND   version = @llave3
			  AND   cons = @llave4
			  AND   cod_suc = @llave5
			  AND   cod_cli = @llave6;
		END
	END
	ELSE IF @cod_item = '009'
	BEGIN
		SET @cod_cons = (CASE
							WHEN (SELECT MAX(cod_cons) FROM SST_PlanVigEpid_Aprob WHERE cod_cia = @llave1 AND cod_pve = @llave2) IS NULL THEN 1
							ELSE ((SELECT MAX(cod_cons) FROM SST_PlanVigEpid_Aprob WHERE cod_cia = @llave1 AND cod_pve = @llave2) + 1)
						 END
						 );
		INSERT INTO SST_PlanVigEpid_Aprob(cod_cia, cod_pve, cod_cons, fch_rev, aprobador, observa, cod_est_apro)
		VALUES (@llave1, @llave2, @cod_cons, @fec_aprob, @cod_emp, @obs_aprob, @estado);

		IF (@ind_aprob = '1' AND @siguiente_nivel = 0)
		BEGIN
			UPDATE	SST_PlanVigEpid
			SET		cod_est_apro = '2'
			WHERE	cod_cia = @llave1 
			  AND   cod_pve = @llave2;
		END
	END
	ELSE IF LEN(@cod_item) < 3
	BEGIN
		SET @cod_cons = (CASE
							WHEN (SELECT MAX(cod_cons) FROM SST_RegProcedimiento_Aprob WHERE cod_cia = @llave1 AND cod_proc = @llave2 AND fecha = @llave3 AND tip_doc = @llave4) IS NULL THEN 1
							ELSE ((SELECT MAX(cod_cons) FROM SST_RegProcedimiento_Aprob WHERE cod_cia = @llave1 AND cod_proc = @llave2 AND fecha = @llave3 AND tip_doc = @llave4) + 1)
						 END
						 );
		INSERT INTO SST_RegProcedimiento_Aprob(cod_cia, cod_proc, fecha, tip_doc, cod_cons, fch_rev, aprobador, observa, cod_est_apro)
		VALUES (@llave1, @llave2, CONVERT(DATETIME,@llave3), @llave4, @cod_cons, @fec_aprob, @cod_emp, @obs_aprob, @estado);
	
		IF (@ind_aprob = '1' AND @siguiente_nivel = 0)
		BEGIN
			UPDATE	SST_RegProcedimiento
			SET		cod_est_apro = '2'
			WHERE	cod_cia = @llave1 
			  AND   cod_proc = @llave2
			  AND   fecha = CONVERT(DATETIME,@llave3)
			  AND   tip_doc = @llave4;
		END
	END
END

```
