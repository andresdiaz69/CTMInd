# Stored Procedure: sp_sst_CronogramaInspecciones

## Usa los objetos:
- [[cxc_cliente]]
- [[Fn_rhh_NombreCompleto]]
- [[gen_compania]]
- [[gen_sucursal]]
- [[GTH_NivAprobUsuarios]]
- [[gth_vargen]]
- [[SST_CronogramaInspecciones]]
- [[SST_CronogramaInspecciones_Aprob]]
- [[SST_EstNivAprob]]
- [[SST_NivAprob]]
- [[SST_NivAprobDetAprob]]
- [[SST_NivAprobEmpItems]]
- [[SST_NivAprobEmplea]]
- [[V_SST_CronogramaInspecciones_Aprob]]

```sql

-- =============================================
-- Author:		Camilo Andrés Camargo Convers
-- Create date: 14/05/2020
-- Description: Permite la Inserción, Edición, Eliminación y Consulta de los cronogramas de inspección.
-- =============================================
CREATE PROCEDURE [dbo].[sp_sst_CronogramaInspecciones]
	@cod_cia	CHAR(3) = NULL,
	@anio		CHAR(4) = NULL,
	@version	VARCHAR(20) = NULL,
	@cons		INT = NULL,
	@cod_cli	CHAR(15) = NULL,
	@cod_suc	CHAR(3) = NULL,
	@titulo		VARCHAR(200) = NULL,
	@cod_elab_por CHAR(12) = NULL,
	@cod_est_aprob CHAR(1) = NULL,
	@ind_filtro INT = NULL, /*1 - Cód. Compañía, 2 - Nombre Compañia, 3 - Año, 4 - Versión, 5, Consecutivo, 6 - Título*/
	@val_filtro VARCHAR(200) = NULL,
	@ind_fun	INT	/*1 - Inserción, 2 - Edición, 3 - Eliminación, 4 - Consulta especifico, 
					  5 - Consulta todos, 6 - Insertar/Actualizar detalle de aprobación, 7 - Consultar aprobaciones. */
--WITH ENCRYTPION
AS
BEGIN
	IF(@ind_fun = 1)
	BEGIN
		IF(NOT EXISTS (SELECT N.cod_cia
				   FROM	  SST_NivAprobEmpItems AS N
				   INNER JOIN SST_NivAprobEmplea AS NE  ON N.niv_aprob = NE.niv_aprob
				   		  AND N.cod_cia = NE.cod_cia AND N.cod_emp = NE.cod_emp
				   INNER JOIN GTH_NivAprobUsuarios AS U ON N.cod_emp = U.cod_emp
				   INNER JOIN SST_NivAprob AS NA ON N.niv_aprob = NA.niv_aprob
				   		AND N.cod_cia = NA.cod_cia
				   WHERE	N.cod_cia = @cod_cia 
				        AND cod_item = '008'
				   		AND NA.ind_desact = 0 
						AND NE.ind_desact = 0)
		AND
			NOT EXISTS (SELECT N.cod_cia
				   FROM	  SST_NivAprobEmpItems AS N
				   INNER JOIN SST_NivAprobEmplea AS NE  ON N.niv_aprob = NE.niv_aprob AND N.cod_cia = NE.cod_cia AND N.cod_emp = NE.cod_emp
				   INNER JOIN GTH_NivAprobUsuarios AS U ON N.cod_emp = U.cod_emp
				   INNER JOIN SST_NivAprob AS NA ON N.niv_aprob = NA.niv_aprob AND N.cod_cia = NA.cod_cia
				   WHERE NA.cod_cia = '0'
				   	 AND NA.ind_cia = 1
				   	 AND cod_item = '008'
				     AND NA.ind_desact = 0 
				   	 AND NE.ind_desact = 0))
		OR (SELECT val_var 
		     FROM gth_vargen 
		     WHERE num_var = 20) = 'NO'
		BEGIN
			SET @cod_est_aprob = 2;
		END
		ELSE
		BEGIN
			SET @cod_est_aprob = 1;
		END

		INSERT INTO SST_CronogramaInspecciones (cod_cia, anio, version, cons, cod_cli, cod_suc, titulo, cod_elab_por, cod_est_apro)
		VALUES (@cod_cia, @anio, @version, @cons, @cod_cli, @cod_suc, @titulo, @cod_elab_por, @cod_est_aprob);
	END
	ELSE IF(@ind_fun = 2)
	BEGIN
		UPDATE SST_CronogramaInspecciones
		SET titulo = @titulo,
			cod_elab_por = @cod_elab_por
		WHERE cod_cia = @cod_cia
		  AND anio = @anio
		  AND version = @version
		  AND cons = @cons
		  AND cod_cli = @cod_cli
		  AND cod_suc = @cod_suc;
	END
	ELSE IF(@ind_fun = 3)
	BEGIN
		IF NOT EXISTS (SELECT cod_cia FROM SST_CronogramaInspecciones_Aprob WHERE cod_cia = @cod_cia AND anio = @anio AND version = @version AND cons = @cons AND cod_cli = @cod_cli AND cod_suc = @cod_suc)
		BEGIN
			DELETE SST_NivAprobDetAprob
			WHERE llave = RTRIM(LTRIM(@cod_cia)) + '*' + RTRIM(LTRIM(@anio)) + '*' + RTRIM(LTRIM(@version)) + '*' + RTRIM(LTRIM(CONVERT(CHAR,@cons))) + '*' + RTRIM(LTRIM(@cod_suc)) + '*' + RTRIM(LTRIM(@cod_cli));
			
			DELETE SST_CronogramaInspecciones
			WHERE cod_cia = @cod_cia
			  AND anio = @anio
			  AND version = @version
			  AND cons = @cons
			  AND cod_cli = @cod_cli
			  AND cod_suc = @cod_suc;
		END
		ELSE
		BEGIN
			RAISERROR ('No se puede eliminar el registros ya que existe un proceso de aprobación asociado.', 16, 1);
		END
	END
	ELSE IF(@ind_fun = 4)
	BEGIN
		SELECT titulo, cod_elab_por, cod_est_apro
		FROM SST_CronogramaInspecciones
		WHERE cod_cia = @cod_cia
		  AND anio = @anio
		  AND version = @version
		  AND cons = @cons
		  AND cod_cli = @cod_cli
		  AND cod_suc = @cod_suc;
	END
	ELSE IF(@ind_fun = 5)
	BEGIN
		IF @ind_filtro IS NULL OR @val_filtro = ''
		BEGIN
			SELECT A.cod_cia, B.nom_cia, anio, version, cons, titulo, A.cod_cli, C.nom_cli, A.cod_suc, D.nom_suc
			FROM SST_CronogramaInspecciones AS A
			INNER JOIN gen_compania AS B ON A.cod_cia = B.cod_cia
			INNER JOIN cxc_cliente AS C ON A.cod_cli = C.cod_cli
			INNER JOIN gen_sucursal AS D ON A.cod_suc = D.cod_suc
		END
		ELSE IF (@ind_filtro = 1)
		BEGIN
			SELECT A.cod_cia, B.nom_cia, anio, version, cons, titulo, A.cod_cli, C.nom_cli, A.cod_suc, D.nom_suc
			FROM SST_CronogramaInspecciones AS A
			INNER JOIN gen_compania AS B ON A.cod_cia = B.cod_cia
			INNER JOIN cxc_cliente AS C ON A.cod_cli = C.cod_cli
			INNER JOIN gen_sucursal AS D ON A.cod_suc = D.cod_suc
			WHERE A.cod_cia = @val_filtro;
		END
		ELSE IF (@ind_filtro = 2)
		BEGIN
			SELECT A.cod_cia, B.nom_cia, anio, version, cons, titulo, A.cod_cli, C.nom_cli, A.cod_suc, D.nom_suc
			FROM SST_CronogramaInspecciones AS A
			INNER JOIN gen_compania AS B ON A.cod_cia = B.cod_cia
			INNER JOIN cxc_cliente AS C ON A.cod_cli = C.cod_cli
			INNER JOIN gen_sucursal AS D ON A.cod_suc = D.cod_suc
			WHERE B.nom_cia LIKE REPLACE('%{}%', '{}', @val_filtro);
		END
		ELSE IF (@ind_filtro = 3)
		BEGIN
			SELECT A.cod_cia, B.nom_cia, anio, version, cons, titulo, A.cod_cli, C.nom_cli, A.cod_suc, D.nom_suc
			FROM SST_CronogramaInspecciones AS A
			INNER JOIN gen_compania AS B ON A.cod_cia = B.cod_cia
			INNER JOIN cxc_cliente AS C ON A.cod_cli = C.cod_cli
			INNER JOIN gen_sucursal AS D ON A.cod_suc = D.cod_suc
			WHERE A.anio = @val_filtro;
		END
		ELSE IF (@ind_filtro = 4)
		BEGIN
			SELECT A.cod_cia, B.nom_cia, anio, version, cons, titulo, A.cod_cli, C.nom_cli, A.cod_suc, D.nom_suc
			FROM SST_CronogramaInspecciones AS A
			INNER JOIN gen_compania AS B ON A.cod_cia = B.cod_cia
			INNER JOIN cxc_cliente AS C ON A.cod_cli = C.cod_cli
			INNER JOIN gen_sucursal AS D ON A.cod_suc = D.cod_suc
			WHERE A.version = @val_filtro;
		END
		ELSE IF (@ind_filtro = 5)
		BEGIN
			SELECT A.cod_cia, B.nom_cia, anio, version, cons, titulo, A.cod_cli, C.nom_cli, A.cod_suc, D.nom_suc
			FROM SST_CronogramaInspecciones AS A
			INNER JOIN gen_compania AS B ON A.cod_cia = B.cod_cia
			INNER JOIN cxc_cliente AS C ON A.cod_cli = C.cod_cli
			INNER JOIN gen_sucursal AS D ON A.cod_suc = D.cod_suc
			WHERE A.cons = @val_filtro;
		END
		ELSE IF (@ind_filtro = 6)
		BEGIN
			SELECT A.cod_cia, B.nom_cia, anio, version, cons, titulo, A.cod_cli, C.nom_cli, A.cod_suc, D.nom_suc
			FROM SST_CronogramaInspecciones AS A
			INNER JOIN gen_compania AS B ON A.cod_cia = B.cod_cia
			INNER JOIN cxc_cliente AS C ON A.cod_cli = C.cod_cli
			INNER JOIN gen_sucursal AS D ON A.cod_suc = D.cod_suc
			WHERE A.cod_cli = @val_filtro;
		END
		ELSE IF (@ind_filtro = 7)
		BEGIN
			SELECT A.cod_cia, B.nom_cia, anio, version, cons, titulo, A.cod_cli, C.nom_cli, A.cod_suc, D.nom_suc
			FROM SST_CronogramaInspecciones AS A
			INNER JOIN gen_compania AS B ON A.cod_cia = B.cod_cia
			INNER JOIN cxc_cliente AS C ON A.cod_cli = C.cod_cli
			INNER JOIN gen_sucursal AS D ON A.cod_suc = D.cod_suc
			WHERE C.nom_cli LIKE REPLACE('%{}%', '{}', @val_filtro);
		END
		ELSE IF (@ind_filtro = 8)
		BEGIN
			SELECT A.cod_cia, B.nom_cia, anio, version, cons, titulo, A.cod_cli, C.nom_cli, A.cod_suc, D.nom_suc
			FROM SST_CronogramaInspecciones AS A
			INNER JOIN gen_compania AS B ON A.cod_cia = B.cod_cia
			INNER JOIN cxc_cliente AS C ON A.cod_cli = C.cod_cli
			INNER JOIN gen_sucursal AS D ON A.cod_suc = D.cod_suc
			WHERE A.cod_suc = @val_filtro;
		END
		ELSE IF (@ind_filtro = 9)
		BEGIN
			SELECT A.cod_cia, B.nom_cia, anio, version, cons, titulo, A.cod_cli, C.nom_cli, A.cod_suc, D.nom_suc
			FROM SST_CronogramaInspecciones AS A
			INNER JOIN gen_compania AS B ON A.cod_cia = B.cod_cia
			INNER JOIN cxc_cliente AS C ON A.cod_cli = C.cod_cli
			INNER JOIN gen_sucursal AS D ON A.cod_suc = D.cod_suc
			WHERE D.nom_suc LIKE REPLACE('%{}%', '{}', @val_filtro);
		END
		ELSE IF (@ind_filtro = 10)
		BEGIN
			SELECT A.cod_cia, B.nom_cia, anio, version, cons, titulo, A.cod_cli, C.nom_cli, A.cod_suc, D.nom_suc
			FROM SST_CronogramaInspecciones AS A
			INNER JOIN gen_compania AS B ON A.cod_cia = B.cod_cia
			INNER JOIN cxc_cliente AS C ON A.cod_cli = C.cod_cli
			INNER JOIN gen_sucursal AS D ON A.cod_suc = D.cod_suc
			WHERE A.titulo LIKE REPLACE('%{}%', '{}', @val_filtro);
		END
	END
	ELSE IF @ind_fun = 6
	BEGIN
		DECLARE @llave VARCHAR(100);
		SET @llave = RTRIM(LTRIM(@cod_cia)) + '*' + RTRIM(LTRIM(@anio)) + '*' + RTRIM(LTRIM(@version)) + '*' + RTRIM(LTRIM(CONVERT(CHAR,@cons))) + '*' + RTRIM(LTRIM(@cod_suc)) + '*' + RTRIM(LTRIM(@cod_cli));
		IF EXISTS (SELECT ord_aprob 
				   FROM   SST_NivAprobDetAprob
				   WHERE  cod_item = '008'
				     AND  llave = @llave)
			AND (SELECT COUNT(1) FROM SST_CronogramaInspecciones WHERE cod_cia = @cod_cia AND
				anio = @anio AND version = @version AND cons = @cons AND cod_cli = @cod_cli AND cod_suc = @cod_suc AND cod_est_apro <> '2') > 0
		BEGIN
			DECLARE @ultimo_nivel_aprobado INT;
			SET @ultimo_nivel_aprobado = 
			(SELECT MAX(ord_aprob) 
			FROM SST_NivAprobDetAprob
			WHERE ind_aprob <> '0'
			  AND cod_item = '008'
			  AND llave = @llave
			GROUP BY llave);
			
			IF @ultimo_nivel_aprobado IS NOT NULL
			BEGIN
				UPDATE	SST_NivAprobDetAprob
				SET		ind_aprob = '0',
						fec_aprob = NULL,
						obs_aprob = NULL
				WHERE	cod_item = '008'
				  AND   llave = @llave 
				  AND   (ind_aprob = '1' OR ind_aprob = '2')
				  AND	ord_aprob = @ultimo_nivel_aprobado;
			END

			UPDATE SST_CronogramaInspecciones
			SET	 cod_est_apro = '1'
			WHERE  cod_cia = @cod_cia
			  AND  anio = @anio
			  AND  version = @version
			  AND  cons = @cons
			  AND  cod_cli = @cod_cli
			  AND  cod_suc = @cod_suc;
		END
		ELSE
		BEGIN
			IF EXISTS (SELECT N.cod_cia
				   FROM	  SST_NivAprobEmpItems AS N
				   INNER JOIN SST_NivAprobEmplea AS NE  ON N.niv_aprob = NE.niv_aprob
				   		  AND N.cod_cia = NE.cod_cia AND N.cod_emp = NE.cod_emp
				   INNER JOIN GTH_NivAprobUsuarios AS U ON N.cod_emp = U.cod_emp
				   INNER JOIN SST_NivAprob AS NA ON N.niv_aprob = NA.niv_aprob
				   		AND N.cod_cia = NA.cod_cia
				   WHERE	N.cod_cia = @cod_cia 
				        AND cod_item = '008'
				   		AND NA.ind_desact = 0 
						AND NE.ind_desact = 0
						AND NA.ind_cia = 0)
			BEGIN
				INSERT INTO SST_NivAprobDetAprob(cod_cia, niv_aprob, cod_item, llave, usu_emp, cod_emp, ind_aprob, ord_aprob, obs_aprob)
				SELECT	N.cod_cia, N.niv_aprob, N.cod_item, @llave, U.usu_emp, N.cod_emp, '0', NA.orden, NULL
				FROM	SST_NivAprobEmpItems AS N
				INNER	JOIN SST_NivAprobEmplea AS NE  ON N.niv_aprob = NE.niv_aprob
						AND N.cod_cia = NE.cod_cia AND N.cod_emp = NE.cod_emp
				INNER	JOIN GTH_NivAprobUsuarios AS U ON N.cod_emp = U.cod_emp
				INNER	JOIN SST_NivAprob AS NA ON N.niv_aprob = NA.niv_aprob
						AND N.cod_cia = NA.cod_cia
				WHERE	N.cod_cia = @cod_cia AND cod_item = '008'
						AND NA.ind_desact = 0 AND NE.ind_desact = 0 AND NA.ind_cia = 0;
			END
			IF EXISTS (SELECT N.cod_cia
				   FROM	  SST_NivAprobEmpItems AS N
				   INNER JOIN SST_NivAprobEmplea AS NE  ON N.niv_aprob = NE.niv_aprob AND N.cod_cia = NE.cod_cia AND N.cod_emp = NE.cod_emp
				   INNER JOIN GTH_NivAprobUsuarios AS U ON N.cod_emp = U.cod_emp
				   INNER JOIN SST_NivAprob AS NA ON N.niv_aprob = NA.niv_aprob AND N.cod_cia = NA.cod_cia
				   WHERE NA.cod_cia = '0'
				   	 AND NA.ind_cia = 1
				   	 AND cod_item = '008'
				     AND NA.ind_desact = 0 
				   	 AND NE.ind_desact = 0)
			BEGIN
				INSERT INTO SST_NivAprobDetAprob(cod_cia, niv_aprob, cod_item, llave, usu_emp, cod_emp, ind_aprob, ord_aprob, obs_aprob)
				SELECT	N.cod_cia, N.niv_aprob, N.cod_item, @llave, U.usu_emp, N.cod_emp, '0', NA.orden, NULL
				FROM	SST_NivAprobEmpItems AS N
				INNER	JOIN SST_NivAprobEmplea AS NE  ON N.niv_aprob = NE.niv_aprob AND N.cod_cia = NE.cod_cia AND N.cod_emp = NE.cod_emp
				INNER	JOIN GTH_NivAprobUsuarios AS U ON N.cod_emp = U.cod_emp
				INNER	JOIN SST_NivAprob AS NA ON N.niv_aprob = NA.niv_aprob AND N.cod_cia = NA.cod_cia
				WHERE N.cod_cia = '0'
				  AND NA.ind_cia = 1
				  AND cod_item = '008'
				  AND NA.ind_desact = 0 
				  AND NE.ind_desact = 0;
			END
		END
	END
	ELSE IF @ind_fun = 7
	BEGIN
		SELECT cod_cons, fch_rev, aprobador, dbo.Fn_rhh_NombreCompleto(aprobador, 2) AS nom_aprob, observa, CRON.cod_est_apro, EST.des_est_apro, CRON.niv_aprob
		FROM V_SST_CronogramaInspecciones_Aprob AS CRON
		INNER JOIN SST_EstNivAprob AS EST ON CRON.cod_est_apro = EST.cod_est_apro
		WHERE cod_cia = @cod_cia
		  AND anio = @anio
		  AND version = @version
		  AND cons = @cons
		  AND cod_cli = @cod_cli
		  AND cod_suc = @cod_suc
		ORDER BY cod_cons;
	END	
END

```
