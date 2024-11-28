# Stored Procedure: sp_sst_ConsultaAdjuntoNivAprob

## Usa los objetos:
- [[SST_ObjetivoGral]]
- [[SST_PlanEmergencia]]
- [[SST_PlanVigEpid]]
- [[SST_Politica]]
- [[SST_RegProcedimiento]]

```sql

-- =============================================
-- Author:		Camilo Andrés Camargo Convers
-- Create date: 30/03/2020
-- Description: Obtiene el adjunto de los items autorizables de SST
-- =============================================

CREATE PROCEDURE [dbo].[sp_sst_ConsultaAdjuntoNivAprob]
	@llave1   VARCHAR(100),
	@llave2   VARCHAR(100),
	@llave3   VARCHAR(100) = NULL,
	@llave4   VARCHAR(100) = NULL,
	@cod_item CHAR(3)
--WITH ENCRYTPION
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	
	IF @cod_item = '001'
	BEGIN
		SELECT doc_anx, nom_anx 
		FROM SST_ObjetivoGral
		WHERE cod_cia = @llave1
		  AND anio_obj_gral = @llave2;
	END
	ELSE IF @cod_item = '002'
	BEGIN
		SELECT doc_anx, nom_anx 
		FROM SST_Politica
		WHERE cod_cia = @llave1
		  AND cod_polit = @llave2;
	END
	ELSE IF @cod_item = '003'
	BEGIN
		SELECT doc_anx, nom_anx 
		FROM SST_PlanEmergencia
		WHERE cod_cia = @llave1
		  AND cod_plan_emerg = @llave2
		  AND cod_ClasPlanEme = @llave3;
	END
	--ELSE IF @cod_item = '006'
	--BEGIN

	--END
	--ELSE IF @cod_item = '007'
	--BEGIN
		
	--END
	ELSE IF @cod_item = '009'
	BEGIN
		SELECT doc_anx, nom_anx 
		FROM SST_PlanVigEpid
		WHERE cod_cia = @llave1
		  AND cod_pve = @llave2;
	END
	ELSE IF LEN(@cod_item) < 3
	BEGIN
		SELECT doc_anx, nom_anx
		FROM SST_RegProcedimiento
		WHERE cod_cia = @llave1
		  AND cod_proc = @llave2
		  AND fecha = @llave3
		  AND tip_doc = @llave4
	END
END

```
