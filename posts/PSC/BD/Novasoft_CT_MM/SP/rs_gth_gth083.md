# Stored Procedure: rs_gth_gth083

## Usa los objetos:
- [[sp_GTH_EvadesemRes]]

```sql

-- =============================================
-- Author:		<Ricardo Santamaría Vanegas>
-- Create date: <Octubre 10 de 2013>
-- Description:	<Resultado de un proceso de valoración del desempeño>
-- =============================================

CREATE PROCEDURE [dbo].[rs_gth_gth083]
	@cod_cia		CHAR(3),
	@cod_eva_des	VARCHAR(6) /*= '230288'*/,
	@cod_gru_eva	CHAR(2),
	@cCod_emp		CHAR(12) /*= '%'*/,
	@cCod_comp		CHAR(10) /*= '%'*/,
	@cCod_evado		CHAR(12)
 	
AS
BEGIN
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	EXEC sp_GTH_EvadesemRes @cod_cia, @cod_eva_des, @cod_gru_eva, @cCod_emp, @cCod_comp, @cCod_evado, '%';
END

```
