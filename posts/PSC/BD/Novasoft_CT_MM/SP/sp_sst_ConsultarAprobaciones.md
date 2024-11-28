# Stored Procedure: sp_sst_ConsultarAprobaciones

## Usa los objetos:
- [[Fn_rhh_NombreCompleto]]
- [[SST_EstNivAprob]]
- [[V_SST_PlanVigEpid_Aprob]]
- [[V_SST_RegProcedimiento_Aprob]]

```sql

-- =============================================
-- Author:		Camilo Andrés Camargo Convers
-- Create date: 23/03/2020
-- Description: Obtiene las aprobaciones para los diferentes items.
-- =============================================

CREATE PROCEDURE [dbo].[sp_sst_ConsultarAprobaciones]
	@key_param1 VARCHAR(100) = NULL,
	@key_param2 VARCHAR(100) = NULL,
	@key_param3 VARCHAR(100) = NULL,
	@key_param4 VARCHAR(100) = NULL,
	@item INT /* 1 - Procedimientos, 3 - Plan de Vigilancia Epidemiológica.*/
--WITH ENCRYTPION
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	IF @item = 1
	BEGIN
		DECLARE @cod_proc1 INT = CONVERT(INT, @key_param1);
		DECLARE @tip_doc1 CHAR(2) = CONVERT(CHAR(2), @key_param2);
		DECLARE @cod_cia1 CHAR(3) = CONVERT(CHAR(3), @key_param3);
		DECLARE @fecha1 DATETIME = CONVERT(DATETIME, @key_param4);
		SELECT cod_cons, fch_rev, aprobador, UPPER(dbo.Fn_rhh_NombreCompleto(aprobador,2)) AS nom_aprob, observa, B.des_est_apro, A.niv_aprob
		FROM V_SST_RegProcedimiento_Aprob AS A
		INNER JOIN SST_EstNivAprob AS B ON A.cod_est_apro = B.cod_est_apro
		WHERE cod_proc = @cod_proc1
		  AND tip_doc = @tip_doc1
		  AND cod_cia = @cod_cia1
		  AND fecha = @fecha1;
	END

	ELSE IF @item = 3
	BEGIN
		DECLARE @cod_pve3 CHAR(6) = CONVERT(CHAR(6), @key_param1);
		DECLARE @cod_cia3 CHAR(3) = CONVERT(CHAR(3), @key_param2);
		SELECT cod_cons, fch_rev, aprobador, dbo.Fn_rhh_NombreCompleto(aprobador, 2) AS nom_aprob, observa, B.cod_est_apro, B.des_est_apro, niv_aprob
		FROM V_SST_PlanVigEpid_Aprob AS A
		INNER JOIN SST_EstNivAprob AS B ON A.cod_est_apro = B.cod_est_apro
		WHERE cod_pve = @cod_pve3
		  AND cod_cia = @cod_cia3;
	END
END

```
