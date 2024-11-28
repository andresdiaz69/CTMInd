# Stored Procedure: sp_sst_GestionFormCronInspec

## Usa los objetos:
- [[GTH_Evalua]]
- [[SST_GestionFormCronInspec]]

```sql

-- =============================================
-- Author:		Camilo Andrés Camargo Convers
-- Create date: 20/05/2020
-- Description: Permite la Inserción, Eliminación y Consulta de los registros de 
--				la tabla de gestiones sin formulario de los cronogramas de inspección.
-- =============================================
CREATE PROCEDURE [dbo].[sp_sst_GestionFormCronInspec]
	@cod_cia	 CHAR(3),
	@anio		 CHAR(4),
	@version	 VARCHAR(20),
	@cod_cli	 CHAR(15),
	@cod_suc	 CHAR(3),
	@cons		 INT,
	@cons_inspec INT,
	@cons_prog   INT,
	@cons_eva    INT = NULL,
	@cod_eva	 VARCHAR(10) = NULL,
	@ind_fun	INT	/*1 - Inserción, 3 - Eliminación, 4 - Consulta, 5 - Verificar Existencia*/
--WITH ENCRYTPION
AS
BEGIN
	SET @cons_eva = CASE WHEN @cons_eva IS NULL THEN ISNULL((SELECT MAX(cons_eva) 
																  FROM SST_GestionFormCronInspec 
																  WHERE cod_cia = @cod_cia
																	AND anio = @anio
																	AND version = @version
																	AND cod_cli = @cod_cli
																	AND cod_suc = @cod_suc
																	AND cons = @cons
																	AND cons_inspec = @cons_inspec
																	AND cons_prog = @cons_prog), 0) + 1
							ELSE @cons_eva
					    END;

	IF(@ind_fun = 1)
	BEGIN
		INSERT INTO SST_GestionFormCronInspec(cod_cia, anio, version, cod_cli, cod_suc, cons, cons_inspec, cons_prog, cons_eva, cod_eva)
		VALUES(@cod_cia, @anio, @version, @cod_cli, @cod_suc, @cons, @cons_inspec, @cons_prog, @cons_eva, @cod_eva);

		SELECT @cons_eva;
	END
	ELSE IF(@ind_fun = 3)
	BEGIN
		DELETE FROM SST_GestionFormCronInspec
		WHERE cod_cia = @cod_cia
		  AND anio = @anio
		  AND version = @version
		  AND cod_cli = @cod_cli
		  AND cod_suc = @cod_suc
		  AND cons = @cons
		  AND cons_inspec = @cons_inspec
		  AND cons_prog = @cons_prog
		  AND cons_eva = @cons_eva;
	END
	ELSE IF(@ind_fun = 4)
	BEGIN
		SELECT A.cons_eva, A.cod_eva, B.Nom_eva
		FROM SST_GestionFormCronInspec AS A
		INNER JOIN GTH_Evalua AS B ON A.cod_eva = B.cod_eva
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
					WHEN (SELECT count(cons_eva)
						  FROM SST_GestionFormCronInspec
						  WHERE cod_cia = @cod_cia
						    AND anio = @anio
							AND version = @version
							AND cod_cli = @cod_cli
							AND cod_suc = @cod_suc
							AND cons = @cons
							AND cons_inspec = cons_inspec
							AND cons_prog = @cons_prog) > 0 THEN 1
					ELSE 0
				   END);
	SELECT @result;
	END
END

```
