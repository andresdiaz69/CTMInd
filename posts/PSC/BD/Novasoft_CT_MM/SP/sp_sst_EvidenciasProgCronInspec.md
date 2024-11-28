# Stored Procedure: sp_sst_EvidenciasProgCronInspec

## Usa los objetos:
- [[SST_EvidenciasProgCronInspec]]

```sql

-- =============================================
-- Author:		Camilo Andrés Camargo Convers
-- Create date: 14/05/2020
-- Description: Permite la Inserción, Edición, Eliminación y Consulta de las evidencias de una programación.
-- =============================================
CREATE PROCEDURE [dbo].[sp_sst_EvidenciasProgCronInspec]
	@cod_cia	 CHAR(3),
	@anio		 CHAR(4),
	@version	 VARCHAR(20),
	@cod_cli	 CHAR(15),
	@cod_suc	 CHAR(3),
	@cons		 INT,
	@cons_inspec INT,
	@cons_prog   INT,
	@cons_evi    INT = NULL,
	@nom_evi	 VARCHAR(200) = NULL,
	@doc_anx	 VARBINARY(MAX) = NULL,
	@nom_anx	 VARCHAR(200) = NULL,
	@obs_evi	 NVARCHAR(MAX) = NULL,
	@ind_fun	 INT	/*1 - Inserción, 2 - Edición, 3 - Eliminación, 4 - Consultar evidencias especifica, 5 - Consultar todas las evidencias.*/
--WITH ENCRYTPION
AS
BEGIN
	SET @cons_evi = CASE WHEN @cons_evi IS NULL THEN ISNULL((SELECT MAX(cons_evi) 
																  FROM SST_EvidenciasProgCronInspec 
																  WHERE cod_cia = @cod_cia
																	AND anio = @anio
																	AND version = @version
																	AND cod_cli = @cod_cli
																	AND cod_suc = @cod_suc
																	AND cons = @cons
																	AND cons_inspec = @cons_inspec
																	AND cons_prog = @cons_prog), 0) + 1
							ELSE @cons_evi
					    END;

	IF(@ind_fun = 1)
	BEGIN
		INSERT INTO SST_EvidenciasProgCronInspec (cod_cia, anio, version, cod_cli, cod_suc, cons, cons_inspec, cons_prog, cons_evi, nom_evi, doc_anx, nom_anx, obs_evi)
		VALUES (@cod_cia, @anio, @version, @cod_cli, @cod_suc, @cons, @cons_inspec, @cons_prog, @cons_evi, @nom_evi, @doc_anx, @nom_anx, @obs_evi);
	END
	ELSE IF(@ind_fun = 2)
	BEGIN
		UPDATE SST_EvidenciasProgCronInspec
		SET obs_evi = @obs_evi
		WHERE cod_cia = @cod_cia
		  AND anio = @anio
		  AND version = @version
		  AND cod_cli = @cod_cli
		  AND cod_suc = @cod_suc
		  AND cons = @cons
		  AND cons_inspec = @cons_inspec
		  AND cons_prog	= @cons_prog
		  AND cons_evi = @cons_evi;
	END
	ELSE IF(@ind_fun = 3)
	BEGIN
		DELETE SST_EvidenciasProgCronInspec
		WHERE cod_cia = @cod_cia
		  AND anio = @anio
		  AND version = @version
		  AND cod_cli = @cod_cli
		  AND cod_suc = @cod_suc
		  AND cons = @cons
		  AND cons_inspec = @cons_inspec
		  AND cons_prog	= @cons_prog
		  AND cons_evi = @cons_evi;
	END
	ELSE IF(@ind_fun = 4)
	BEGIN
		SELECT nom_evi, doc_anx, nom_anx, obs_evi
		FROM SST_EvidenciasProgCronInspec
		WHERE cod_cia = @cod_cia
		  AND anio = @anio
		  AND version = @version
		  AND cod_cli = @cod_cli
		  AND cod_suc = @cod_suc
		  AND cons = @cons
		  AND cons_inspec = @cons_inspec
		  AND cons_prog	= @cons_prog
		  AND cons_evi = @cons_evi;
	END
	ELSE IF(@ind_fun = 5)
	BEGIN
		SELECT cons_evi, nom_evi
		FROM SST_EvidenciasProgCronInspec
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
