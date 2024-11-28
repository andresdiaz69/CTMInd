# Stored Procedure: sp_sst_ResponsablesProgCronInspec

## Usa los objetos:
- [[SST_ResponsablesProgCronInspec]]
- [[V_SST_EmpExterno]]

```sql

-- =============================================
-- Author:		Camilo Andrés Camargo Convers
-- Create date: 14/05/2020
-- Description: Permite la Inserción, Eliminación y Consulta de los responsables de una programación.
-- =============================================
CREATE PROCEDURE [dbo].[sp_sst_ResponsablesProgCronInspec]
	@cod_cia	 CHAR(3),
	@anio		 CHAR(4),
	@version	 VARCHAR(20),
	@cod_cli	 CHAR(15),
	@cod_suc	 CHAR(3),
	@cons		 INT,
	@cons_inspec INT,
	@cons_prog   INT,
	@cod_emp	 CHAR(12) = NULL,
	@ind_fun	 INT	/*1 - Inserción, 3 - Eliminación, 4 - Consulta*/
--WITH ENCRYTPION
AS
BEGIN
	IF(@ind_fun = 1)
	BEGIN
		INSERT INTO SST_ResponsablesProgCronInspec (cod_cia, anio, version, cod_cli, cod_suc, cons, cons_inspec, cons_prog, cod_emp)
		VALUES (@cod_cia, @anio, @version, @cod_cli, @cod_suc, @cons, @cons_inspec, @cons_prog, @cod_emp);
	END
	ELSE IF(@ind_fun = 3)
	BEGIN
		DELETE SST_ResponsablesProgCronInspec
		WHERE cod_cia = @cod_cia
		  AND anio = @anio
		  AND version = @version
		  AND cod_cli = @cod_cli
		  AND cod_suc = @cod_suc
		  AND cons = @cons
		  AND cons_inspec = @cons_inspec
		  AND cons_prog	= @cons_prog
		  AND cod_emp = @cod_emp;
	END
	ELSE IF(@ind_fun = 4)
	BEGIN
		SELECT A.cod_emp, B.nom_emp
		FROM SST_ResponsablesProgCronInspec AS A
		INNER JOIN V_SST_EmpExterno AS B ON A.cod_emp = B.cod_emp
		WHERE cod_cia = @cod_cia
		  AND anio = @anio
		  AND version = @version
		  AND cod_cli = @cod_cli
		  AND cod_suc = @cod_suc
		  AND cons = @cons
		  AND cons_inspec = @cons_inspec
		  AND cons_prog = @cons_prog;
	END
END

```
