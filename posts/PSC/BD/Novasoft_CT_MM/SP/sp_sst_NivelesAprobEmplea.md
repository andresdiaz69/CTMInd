# Stored Procedure: sp_sst_NivelesAprobEmplea

## Usa los objetos:
- [[Fn_rhh_NombreCompleto]]
- [[SST_NivAprobEmplea]]

```sql

-- =============================================
-- Author:		Camilo Andrés Camargo Convers
-- Create date: 23/03/2020
-- Description: Inserta, Edita, Consulta, Elimina los empleados en un Nivel de Aprobación.
-- =============================================

CREATE PROCEDURE [dbo].[sp_sst_NivelesAprobEmplea]
	@niv_aprob CHAR(6) = NULL,
	@cod_cia CHAR(3) = NULL,
	@cod_emp CHAR(12) = NULL,
	@ind_desact BIT = NULL,
	@ind_funcionamiento INT /* 1 - Insercion, 2 - Edición, 3 - Eliminación, 4 - Consultar Especifico, 5 - Consultar Todos*/
--WITH ENCRYTPION
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	
	IF @ind_funcionamiento = 1
	BEGIN
		INSERT INTO SST_NivAprobEmplea(niv_aprob, cod_cia, cod_emp, ind_desact)
		VALUES (@niv_aprob, @cod_cia, @cod_emp, @ind_desact);
	END

	ELSE IF @ind_funcionamiento = 2
	BEGIN
		UPDATE SST_NivAprobEmplea 
		SET ind_desact = @ind_desact
		WHERE niv_aprob = @niv_aprob
		  AND cod_cia = @cod_cia
		  AND cod_emp = @cod_emp;
	END

	ELSE IF @ind_funcionamiento = 3
	BEGIN
		DELETE FROM SST_NivAprobEmplea
		WHERE niv_aprob = @niv_aprob
		  AND cod_cia = @cod_cia
		  AND cod_emp = @cod_emp; 
	END

	ELSE IF @ind_funcionamiento = 4
	BEGIN
		SELECT ind_desact
		FROM SST_NivAprobEmplea
		WHERE niv_aprob = @niv_aprob
		  AND cod_cia = @cod_cia
		  AND cod_emp = @cod_emp;
	END

	ELSE IF @ind_funcionamiento = 5
	BEGIN
		SELECT niv_aprob, cod_cia, cod_emp, UPPER(dbo.Fn_rhh_NombreCompleto(cod_emp, 2)) AS nom_emp, ind_desact
		FROM SST_NivAprobEmplea
		WHERE niv_aprob = @niv_aprob
		 AND cod_cia = @cod_cia;
	END
END

```
