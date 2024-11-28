# Stored Procedure: sp_sst_ProgVacSec

## Usa los objetos:
- [[SST_ProgVacuna]]
- [[SST_VacunasDet]]

```sql

-- =============================================
-- Author:		Marco Lara
-- Create date: 18 Dic 2020
-- Description:	Agrega secuencia de vacunación
-- =============================================
CREATE PROCEDURE [dbo].[sp_sst_ProgVacSec]
	@cod_emp		CHAR(12),
	@cod_vac		CHAR(3)
--WITH ENCRYPTION	 
AS
BEGIN TRY
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	DECLARE	
	@nn			INT,
	@zz			INT,
	@dosis		SMALLINT,
	@cod_peri	CHAR(2),
	@dias		SMALLINT,
	@maxsec		SMALLINT

	SELECT @maxsec = MAX(NroSecuencia) FROM SST_ProgVacuna
	WHERE cod_emp = @cod_emp AND cod_vac = @cod_vac

	IF OBJECT_ID(N'tempdb.dbo.#SST_VacunasDet', N'U') IS NOT NULL
		DROP TABLE #SST_VacunasDet
	
	SELECT 
	cod_vac,dosis,cod_peri,dias,IDENTITY(INT,1,1) AS nreg 
	INTO #SST_VacunasDet 
	FROM SST_VacunasDet
	WHERE cod_vac = @cod_vac
	ORDER BY dosis
	
	SELECT @nn = MAX(nreg) FROM #SST_VacunasDet
	SELECT @zz = 1

	WHILE @zz <= @nn
	BEGIN
		SELECT
		@dosis = dosis,
		@cod_peri = cod_peri,
		@dias = dias
		FROM #SST_VacunasDet
		WHERE nreg = @zz

		INSERT INTO SST_ProgVacuna
		(cod_emp,cod_vac,dosis,NroSecuencia)
		VALUES
		(@cod_emp,@cod_vac,@dosis,ISNULL(@maxsec,0) + 1)
	SELECT @zz = @zz + 1
	END

	UPDATE SST_ProgVacuna
	SET detalle = RTRIM(detalle) + '- Se repite esquema' 
	WHERE cod_emp = @cod_emp AND cod_vac = @cod_vac AND NroSecuencia <= @maxsec

	IF @@TRANCOUNT > 0
		COMMIT TRANSACTION
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION ;
	THROW
END CATCH

```
