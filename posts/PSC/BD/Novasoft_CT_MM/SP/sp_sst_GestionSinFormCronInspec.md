# Stored Procedure: sp_sst_GestionSinFormCronInspec

## Usa los objetos:
- [[SST_GestionSinFormCronInspec]]
- [[vtu_SST_PreguntasGestion]]

```sql

-- =============================================
-- Author:		Camilo Andrés Camargo Convers
-- Create date: 20/05/2020
-- Description: Permite la Inserción, Eliminación y Consulta de los registros de 
--				la tabla de gestiones sin formulario de los cronogramas de inspección.
-- =============================================
CREATE PROCEDURE [dbo].[sp_sst_GestionSinFormCronInspec]
	@cod_cia	 CHAR(3),
	@anio		 CHAR(4),
	@version	 VARCHAR(20),
	@cod_cli	 CHAR(15),
	@cod_suc	 CHAR(3),
	@cons		 INT,
	@cons_inspec INT,
	@cons_prog   INT,
	@preguntas   dbo.vtu_SST_PreguntasGestion READONLY,
	@ind_fun	INT	/*1 - Inserción, 4 - Consulta, 5 - Verificar existencia*/
--WITH ENCRYTPION
AS
BEGIN
	IF(@ind_fun = 1)
	BEGIN
		DELETE FROM SST_GestionSinFormCronInspec
		WHERE cod_cia = @cod_cia
		  AND anio = @anio
		  AND version = @version
		  AND cod_cli = @cod_cli
		  AND cod_suc = @cod_suc
		  AND cons = @cons
		  AND cons_inspec = @cons_inspec
		  AND cons_prog = @cons_prog;

		DECLARE @MAX INT = (SELECT MAX(cons_preg) FROM @preguntas);
		DECLARE @INDEX INT = 1;

		WHILE @INDEX <= @MAX
		BEGIN
			INSERT INTO SST_GestionSinFormCronInspec(cod_cia, anio, version, cod_cli, cod_suc, cons, cons_inspec, cons_prog, cons_preg, des_rta)
			SELECT @cod_cia, @anio, @version, @cod_cli, @cod_suc, @cons, @cons_inspec, @cons_prog, cons_preg, des_rta
			FROM @preguntas
			WHERE cons_preg = @INDEX;

			SET @INDEX = @INDEX + 1;
		END
	END
	ELSE IF(@ind_fun = 4)
	BEGIN
		SELECT cons_preg, des_rta
		FROM SST_GestionSinFormCronInspec
		WHERE cod_cia = @cod_cia
		  AND anio = @anio
		  AND version = @version
		  AND cod_cli = @cod_cli
		  AND cod_suc = @cod_suc
		  AND cons = @cons
		  AND cons_inspec = @cons_inspec
		  AND cons_prog	= @cons_prog;
	END
	ELSE IF(@ind_fun = 5)
	BEGIN
	DECLARE @result INT;
	SET @result	= (CASE
					WHEN (SELECT count(cons_preg)
						  FROM SST_GestionSinFormCronInspec
						  WHERE cod_cia = @cod_cia
						    AND anio = @anio
							AND version = @version
							AND cod_cli = @cod_cli
							AND cod_suc = @cod_suc
							AND cons = @cons
							AND cons_inspec = @cons_inspec
							AND cons_prog = @cons_prog) > 0 THEN 1
					ELSE 0
				   END);
	SELECT @result;
	END
END

```
