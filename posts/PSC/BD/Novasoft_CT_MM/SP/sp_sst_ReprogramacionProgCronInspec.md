# Stored Procedure: sp_sst_ReprogramacionProgCronInspec

## Usa los objetos:
- [[Fn_rhh_NombreCompleto]]
- [[SST_MotivoRepr]]
- [[SST_ProgramacionCronInspec]]
- [[SST_ReprogramacionProgCronInspec]]

```sql

-- =============================================
-- Author:		Camilo Andrés Camargo Convers
-- Create date: 14/05/2020
-- Description: Permite la Inserción, Edición, Eliminación y Consulta de las reprogramaciones de una programación.
-- =============================================
CREATE PROCEDURE [dbo].[sp_sst_ReprogramacionProgCronInspec]
	@cod_cia		CHAR(3),
	@anio			CHAR(4),
	@version		VARCHAR(20),
	@cod_cli		CHAR(15),
	@cod_suc		CHAR(3),
	@cons			INT,
	@cons_inspec	INT,
	@cons_prog		INT,
	@cons_reprog	INT = NULL,
	@fec_ini_nue	DATETIME = NULL,
	@fec_fin_nue	DATETIME = NULL,
	@fec_ini_ant	DATETIME = NULL,
	@fec_fin_ant	DATETIME = NULL,
	@cod_motivorepr CHAR(3) = NULL,
	@emp_sol	    CHAR(12) = NULL,
	@obs_reprog		NVARCHAR(MAX) = NULL,
	@ind_fun	 INT	/*1 - Inserción, 2 - Edición, 3 - Eliminación, 4 - Consulta*/
--WITH ENCRYTPION
AS
BEGIN
SET NOCOUNT ON;
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET @cons_reprog = CASE WHEN @cons_reprog IS NULL THEN ISNULL((SELECT MAX(cons_reprog) 
																  FROM SST_ReprogramacionProgCronInspec
																  WHERE cod_cia = @cod_cia
																	AND anio = @anio
																	AND version = @version
																	AND cod_cli = @cod_cli
																	AND cod_suc = @cod_suc
																	AND cons = @cons
																	AND cons_inspec = @cons_inspec
																	AND cons_prog = @cons_prog), 0) + 1
							ELSE @cons_reprog
					    END;

	IF(@ind_fun = 1)
	BEGIN
		INSERT INTO SST_ReprogramacionProgCronInspec (cod_cia, anio, version, cod_cli, cod_suc, cons, cons_inspec, cons_prog, cons_reprog, fec_ini_nue, fec_fin_nue, fec_ini_ant, fec_fin_ant, cod_motivorepr, emp_sol, obs_reprog)
		VALUES (@cod_cia, @anio, @version, @cod_cli, @cod_suc, @cons, @cons_inspec, @cons_prog, @cons_reprog, @fec_ini_nue, @fec_fin_nue, @fec_ini_ant, @fec_fin_ant, @cod_motivorepr, @emp_sol, @obs_reprog);
	END
	ELSE IF(@ind_fun = 2)
	BEGIN
		UPDATE SST_ReprogramacionProgCronInspec
		SET obs_reprog = @obs_reprog
		WHERE cod_cia = @cod_cia
		  AND anio = @anio
		  AND version = @version
		  AND cod_cli = @cod_cli
		  AND cod_suc = @cod_suc
		  AND cons = @cons
		  AND cons_inspec = @cons_inspec
		  AND cons_prog	= @cons_prog
		  AND cons_reprog = @cons_reprog;
	END
	ELSE IF(@ind_fun = 3)
	BEGIN
		DECLARE @fec_ini DATETIME;
		DECLARE @fec_fin DATETIME;

		IF (SELECT COUNT(cons_reprog)
			FROM SST_ReprogramacionProgCronInspec
			WHERE   cod_cia = @cod_cia
			  AND anio = @anio
			  AND version = @version
			  AND cod_cli = @cod_cli
			  AND cod_suc = @cod_suc
			  AND cons = @cons
			  AND cons_inspec = @cons_inspec
			  AND cons_prog = @cons_prog) = 1
		BEGIN
			SET @fec_ini = (SELECT fec_ini_ant
							FROM SST_ReprogramacionProgCronInspec
							WHERE cod_cia = @cod_cia
							  AND anio = @anio
							  AND version = @version
							  AND cod_cli = @cod_cli
							  AND cod_suc = @cod_suc
							  AND cons = @cons
							  AND cons_inspec = @cons_inspec
							  AND cons_prog = @cons_prog
							  AND cons_reprog = @cons_reprog);
			SET @fec_fin = (SELECT fec_fin_ant
							FROM SST_ReprogramacionProgCronInspec
							WHERE cod_cia = @cod_cia
							  AND anio = @anio
							  AND version = @version
							  AND cod_cli = @cod_cli
							  AND cod_suc = @cod_suc
							  AND cons = @cons
							  AND cons_inspec = @cons_inspec
							  AND cons_prog = @cons_prog
							  AND cons_reprog = @cons_reprog);

			UPDATE SST_ProgramacionCronInspec
			SET fec_ini = @fec_ini,
				fec_fin = @fec_fin
			WHERE cod_cia = @cod_cia
			  AND anio = @anio
			  AND version = @version
			  AND cod_cli = @cod_cli
			  AND cod_suc = @cod_suc
			  AND cons = @cons
			  AND cons_inspec = @cons_inspec
			  AND cons_prog = @cons_prog;

			DELETE FROM SST_ReprogramacionProgCronInspec
			WHERE cod_cia = @cod_cia
			  AND anio = @anio
			  AND version = @version
			  AND cod_cli = @cod_cli
			  AND cod_suc = @cod_suc
			  AND cons = @cons
			  AND cons_inspec = @cons_inspec
			  AND cons_prog = @cons_prog
			  AND cons_reprog = @cons_reprog;
		END
		ELSE IF @cons_reprog = (SELECT MAX(cons_reprog)
								FROM SST_ReprogramacionProgCronInspec
								WHERE cod_cia = @cod_cia
									AND anio = @anio
									AND version = @version
									AND cod_cli = @cod_cli
									AND cod_suc = @cod_suc
									AND cons = @cons
									AND cons_inspec = @cons_inspec
									AND cons_prog = @cons_prog)
		BEGIN
			--Hallar el consecutivo con registro existente anterior al último
			DECLARE @cons_reprog_anterior INT;
			SET @cons_reprog_anterior = @cons_reprog - 1;

			WHILE @cons_reprog_anterior > 1
			BEGIN
				IF EXISTS (SELECT cons_reprog 
						   FROM SST_ReprogramacionProgCronInspec
						   WHERE cod_cia = @cod_cia
							  AND anio = @anio
							  AND version = @version
							  AND cod_cli = @cod_cli
							  AND cod_suc = @cod_suc
							  AND cons = @cons
							  AND cons_inspec = @cons_inspec
							  AND cons_prog = @cons_prog
							  AND cons_reprog = @cons_reprog_anterior)
				BEGIN
					BREAK;
				END
				ELSE
				BEGIN
					SET @cons_reprog_anterior = @cons_reprog_anterior - 1; 
				END
			END
		
			SET @fec_ini = (SELECT fec_ini_nue
							FROM SST_ReprogramacionProgCronInspec
							WHERE cod_cia = @cod_cia
							  AND anio = @anio
							  AND version = @version
							  AND cod_cli = @cod_cli
							  AND cod_suc = @cod_suc
							  AND cons = @cons
							  AND cons_inspec = @cons_inspec
							  AND cons_prog = @cons_prog
							  AND cons_reprog = @cons_reprog_anterior);
			SET @fec_fin = (SELECT fec_fin_nue
							FROM SST_ReprogramacionProgCronInspec
							WHERE cod_cia = @cod_cia
							  AND anio = @anio
							  AND version = @version
							  AND cod_cli = @cod_cli
							  AND cod_suc = @cod_suc
							  AND cons = @cons
							  AND cons_inspec = @cons_inspec
							  AND cons_prog = @cons_prog
							  AND cons_reprog = @cons_reprog_anterior);

			UPDATE SST_ProgramacionCronInspec
			SET fec_ini = @fec_ini,
				fec_fin = @fec_fin
			WHERE cod_cia = @cod_cia
			  AND anio = @anio
			  AND version = @version
			  AND cod_cli = @cod_cli
			  AND cod_suc = @cod_suc
			  AND cons = @cons
			  AND cons_inspec = @cons_inspec
			  AND cons_prog = @cons_prog;

			DELETE FROM SST_ReprogramacionProgCronInspec
			WHERE cod_cia = @cod_cia
			  AND anio = @anio
			  AND version = @version
			  AND cod_cli = @cod_cli
			  AND cod_suc = @cod_suc
			  AND cons = @cons
			  AND cons_inspec = @cons_inspec
			  AND cons_prog = @cons_prog
			  AND cons_reprog = @cons_reprog;
		END
		ELSE
		BEGIN
			DELETE FROM SST_ReprogramacionProgCronInspec
			WHERE cod_cia = @cod_cia
			  AND anio = @anio
			  AND version = @version
			  AND cod_cli = @cod_cli
			  AND cod_suc = @cod_suc
			  AND cons = @cons
			  AND cons_inspec = @cons_inspec
			  AND cons_prog = @cons_prog
			  AND cons_reprog = @cons_reprog;
		END
	END
	ELSE IF(@ind_fun = 4)
	BEGIN
		SELECT A.cons_reprog, A.fec_ini_nue, A.fec_fin_nue, A.fec_ini_ant, A.fec_fin_ant, A.cod_motivorepr, B.nom_motivorepr, A.emp_sol, dbo.Fn_rhh_NombreCompleto(A.emp_sol, 2) AS nom_emp, A.obs_reprog
		FROM SST_ReprogramacionProgCronInspec AS A
		INNER JOIN SST_MotivoRepr AS B ON A.cod_motivorepr = B.cod_motivorepr
		WHERE cod_cia = @cod_cia
		  AND anio = @anio
		  AND version = @version
		  AND cod_cli = @cod_cli
		  AND cod_suc = @cod_suc
		  AND cons = @cons
		  AND cons_inspec = @cons_inspec
		  AND cons_prog	= @cons_prog;
	END
END

```
