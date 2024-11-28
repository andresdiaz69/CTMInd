# Stored Procedure: sp_sst_NivAprobItemPorEmpleado

## Usa los objetos:
- [[SST_NivAprobEmpItems]]
- [[V_SST_NivAprobItems]]

```sql

-- =============================================
-- Author:		Camilo Andrés Camargo Convers
-- Create date: 23/03/2020
-- Description: Inserta, Consulta, Elimina los items por empleado en un Nivel de Aprobación.
-- =============================================

CREATE PROCEDURE [dbo].[sp_sst_NivAprobItemPorEmpleado]
	@niv_aprob CHAR(6) = NULL,
	@cod_cia CHAR(3) = NULL,
	@cod_emp CHAR(12) = NULL,
	@cod_item CHAR(3) = NULL,
	@ind_funcionamiento INT /* 1 - Insercion, 2 - Eliminación, 3 - Consulta */
--WITH ENCRYTPION
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	
	IF @ind_funcionamiento = 1
	BEGIN
		INSERT INTO SST_NivAprobEmpItems(niv_aprob, cod_cia, cod_emp, cod_item)
		VALUES (@niv_aprob, @cod_cia, @cod_emp, @cod_item);
	END

	ELSE IF @ind_funcionamiento = 2
	BEGIN
		DELETE FROM SST_NivAprobEmpItems
		WHERE niv_aprob = @niv_aprob
		  AND cod_cia = @cod_cia
		  AND cod_emp = @cod_emp
		  AND cod_item = @cod_item; 
	END

	ELSE IF @ind_funcionamiento = 3
	BEGIN
		SELECT B.cod_item, B.des_item
		FROM SST_NivAprobEmpItems AS A
		INNER JOIN V_SST_NivAprobItems AS B ON A.cod_item = B.cod_item
		WHERE niv_aprob = @niv_aprob
		  AND cod_cia = @cod_cia
		  AND cod_emp = @cod_emp;
	END
END

```
