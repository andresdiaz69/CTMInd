# Stored Procedure: sp_sst_InspeccionCronInspec

## Usa los objetos:
- [[cxc_cliente]]
- [[SST_InspeccionCronInspec]]
- [[SST_ProgramacionCronInspec]]
- [[SST_TipInspec]]

```sql

-- =============================================
-- Author:		Camilo Andrés Camargo Convers
-- Create date: 14/05/2020
-- Description: Permite la Inserción, Edición, Eliminación y Consulta de las inspecciones de un cronograma de inspecciones.
-- =============================================
CREATE PROCEDURE [dbo].[sp_sst_InspeccionCronInspec]
	@cod_cia	 CHAR(3),
	@anio		 CHAR(4),
	@version	 VARCHAR(20),
	@cons		 INT,
	@cod_cli	 CHAR(15),
	@cod_suc	 CHAR(3),
	@cons_inspec INT = NULL,
	@tip_inspec  INT = NULL,
	@ind_fun	 INT	/*1 - Inserción, 2 - Edición, 3 - Eliminación, 4 - Consulta*/
--WITH ENCRYTPION
AS
BEGIN
	SET @cons_inspec = CASE WHEN @cons_inspec IS NULL THEN ISNULL((SELECT MAX(cons_inspec) 
																  FROM SST_InspeccionCronInspec 
																  WHERE cod_cia = @cod_cia
																	AND anio = @anio
																	AND version = @version
																	AND cons = @cons
																	AND cod_cli = @cod_cli
																	AND cod_suc = @cod_suc), 0) + 1
							ELSE @cons_inspec
					    END;

	IF(@ind_fun = 1)
	BEGIN
		INSERT INTO SST_InspeccionCronInspec (cod_cia, anio, version, cons, cod_cli, cod_suc, cons_inspec, tip_inspec)
		VALUES (@cod_cia, @anio, @version, @cons, @cod_cli, @cod_suc, @cons_inspec, @tip_inspec);
	END
	ELSE IF(@ind_fun = 2)
	BEGIN
		UPDATE SST_InspeccionCronInspec
		SET cod_cli = @cod_cli
		WHERE cod_cia = @cod_cia
		  AND anio = @anio
		  AND version = @version
		  AND cons = @cons
		  AND cod_cli = @cod_cli
		  AND cod_suc = @cod_suc
		  AND cons_inspec = @cons_inspec;
	END
	ELSE IF(@ind_fun = 3)
	BEGIN
		DELETE SST_InspeccionCronInspec
		WHERE cod_cia = @cod_cia
		  AND anio = @anio
		  AND version = @version
		  AND cons = @cons
		  AND cod_cli = @cod_cli
		  AND cod_suc = @cod_suc
		  AND cons_inspec = @cons_inspec;
	END
	ELSE IF(@ind_fun = 4)
	BEGIN
		SELECT cons_inspec, A.tip_inspec, B.des_inspec, A.cod_cli, C.nom_cli,
		(CASE
			WHEN (SELECT COUNT(cons_prog) 
				  FROM SST_ProgramacionCronInspec
				  WHERE cod_cia = @cod_cia
				    AND anio = @anio
					AND version = @version
					AND cons = @cons
					AND cod_cli = @cod_cli
					AND cod_suc = @cod_suc
					AND cons_inspec = A.cons_inspec) > 0 THEN 1
														 ELSE 0
		END) AS ind_prog
		FROM SST_InspeccionCronInspec AS A
		INNER JOIN SST_TipInspec AS B ON A.tip_inspec = B.tip_inspec
		INNER JOIN cxc_cliente AS C ON A.cod_cli = C.cod_cli
		WHERE A.cod_cia = @cod_cia
		  AND A.anio = @anio
		  AND A.version = @version
		  AND A.cons = @cons
		  AND A.cod_cli = @cod_cli
		  AND A.cod_suc = @cod_suc;
	END
END

```
