# Stored Procedure: sp_sst_MatrizLegalEnc1

## Usa los objetos:
- [[Fn_rhh_NombreCompleto]]
- [[GTH_NivAprobUsuarios]]
- [[gth_vargen]]
- [[SST_EstNivAprob]]
- [[SST_MatrizLegalEnc]]
- [[SST_MatrizLegalEnc_Aprob]]
- [[SST_NivAprob]]
- [[SST_NivAprobDetAprob]]
- [[SST_NivAprobEmpItems]]
- [[SST_NivAprobEmplea]]

```sql

-- =============================================
-- Author:		Camilo Andrés Camargo Convers
-- Create date: 14/05/2020
-- Description: Permite la Inserción, Edición, Eliminación y Consulta de los cronogramas de inspección.
-- =============================================
CREATE PROCEDURE [dbo].[sp_sst_MatrizLegalEnc1]
	@cod_cia	CHAR(3) = NULL,
	@version	VARCHAR(20) = NULL,
	@cod_est_aprob CHAR(1) = NULL,
	@ind_fun	INT	/*1 - Inserción, 2 - Edición, 3 - Eliminación, 4 - Consulta especifico, 
					  5 - Consulta todos, 6 - Insertar/Actualizar detalle de aprobación, 7 - Consultar aprobaciones. */
--WITH ENCRYTPION
AS
BEGIN
	IF(@ind_fun = 1)
	BEGIN
		IF NOT EXISTS (SELECT N.cod_cia, N.niv_aprob, N.cod_item, U.usu_emp, N.cod_emp, '0', NA.orden, NULL
					   FROM	  SST_NivAprobEmpItems AS N
					   INNER JOIN SST_NivAprobEmplea AS NE  ON N.niv_aprob = NE.niv_aprob
				   			  AND N.cod_cia = NE.cod_cia AND N.cod_emp = NE.cod_emp
					   INNER JOIN GTH_NivAprobUsuarios AS U ON N.cod_emp = U.cod_emp
					   INNER JOIN SST_NivAprob AS NA ON N.niv_aprob = NA.niv_aprob
				   			AND N.cod_cia = NA.cod_cia
					   WHERE	N.cod_cia = @cod_cia 
							AND cod_item = '007'
				   			AND NA.ind_desact = 0 
							AND NE.ind_desact = 0)
		OR (SELECT val_var 
		     FROM gth_vargen 
		     WHERE num_var = 20) = 'NO'
		BEGIN
			SET @cod_est_aprob = 2;
		END
	END
	IF @ind_fun = 6
	BEGIN
		DECLARE @llave VARCHAR(100);
		SET @llave = RTRIM(LTRIM(@cod_cia)) + '*' + RTRIM(LTRIM(@version));
		IF EXISTS (SELECT ord_aprob 
				   FROM   SST_NivAprobDetAprob
				   WHERE  cod_cia = @cod_cia 
				     AND  cod_item = '007'
				     AND  llave = @llave)
			AND (SELECT COUNT(1) FROM SST_MatrizLegalEnc WHERE cod_cia = @cod_cia AND
				version = @version AND cod_est_apro <> '2') > 0
		BEGIN
			DECLARE @ultimo_nivel_aprobado INT;

			SET @ultimo_nivel_aprobado = 
			(SELECT MAX(ord_aprob) 
			FROM SST_NivAprobDetAprob
			WHERE ind_aprob = '2'
				AND llave = @llave
			GROUP BY llave);
			
			UPDATE	SST_NivAprobDetAprob
			SET		ind_aprob = '0',
					fec_aprob = NULL,
					obs_aprob = NULL
			WHERE	cod_cia = @cod_cia 
			  AND   cod_item = '007'
			  AND   llave = @llave 
			  AND   (ind_aprob = '1' OR ind_aprob = '2')
			  AND	ord_aprob = @ultimo_nivel_aprobado;

			  UPDATE SST_MatrizLegalEnc
			  SET	 cod_est_apro = '1'
			  WHERE  cod_cia = @cod_cia
				AND  version = @version
		END
		ELSE IF EXISTS (SELECT N.niv_aprob
				   FROM	  SST_NivAprobEmpItems AS N
				   INNER JOIN SST_NivAprobEmplea AS NE  ON N.niv_aprob = NE.niv_aprob
				   		  AND N.cod_cia = NE.cod_cia 
						  AND N.cod_emp = NE.cod_emp
				   INNER JOIN GTH_NivAprobUsuarios AS U ON N.cod_emp = U.cod_emp
				   INNER JOIN SST_NivAprob AS NA ON N.niv_aprob = NA.niv_aprob
				   		  AND N.cod_cia = NA.cod_cia
				   WHERE      N.cod_cia = @cod_cia 
				          AND cod_item = '007'
				   		  AND NA.ind_desact = 0 
						  AND NE.ind_desact = 0)
		BEGIN
			INSERT INTO SST_NivAprobDetAprob(cod_cia, niv_aprob, cod_item, llave, usu_emp, cod_emp, ind_aprob, ord_aprob, obs_aprob)
			SELECT	N.cod_cia, N.niv_aprob, N.cod_item, @llave, U.usu_emp, N.cod_emp, '0', NA.orden, NULL
			FROM	SST_NivAprobEmpItems AS N
			INNER	JOIN SST_NivAprobEmplea AS NE  ON N.niv_aprob = NE.niv_aprob
					AND N.cod_cia = NE.cod_cia AND N.cod_emp = NE.cod_emp
			INNER	JOIN GTH_NivAprobUsuarios AS U ON N.cod_emp = U.cod_emp
			INNER	JOIN SST_NivAprob AS NA ON N.niv_aprob = NA.niv_aprob
					AND N.cod_cia = NA.cod_cia
			WHERE	N.cod_cia = @cod_cia AND cod_item = '007'
					AND NA.ind_desact = 0 AND NE.ind_desact = 0;
		END
		ELSE
		BEGIN
			UPDATE SST_MatrizLegalEnc
			SET	   cod_est_apro = '2'
			WHERE  cod_cia = @cod_cia
			  AND  version = @version;
		END
	END
	ELSE IF @ind_fun = 7
	BEGIN
		SELECT cod_cons, fch_rev, aprobador, dbo.Fn_rhh_NombreCompleto(aprobador, 2) AS nom_aprob, observa, CRON.cod_est_apro, EST.des_est_apro
		FROM SST_MatrizLegalEnc_Aprob AS CRON
		INNER JOIN SST_EstNivAprob AS EST ON CRON.cod_est_apro = EST.cod_est_apro
		WHERE cod_cia = @cod_cia
		  AND version = @version
	END	
END

```
