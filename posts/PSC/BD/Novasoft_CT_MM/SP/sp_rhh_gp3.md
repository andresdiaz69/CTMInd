# Stored Procedure: sp_rhh_gp3

## Usa los objetos:
- [[sp_gen_nombremes]]
- [[sp_rhh_gp0]]
- [[sp_rhh_gp3_1]]
- [[sp_rhh_gp3_2]]

```sql

-- 2021/03/03 SPA2021-0089 => SNR2021-0050 Homologación
CREATE PROCEDURE [dbo].[sp_rhh_gp3]
	@fec_liq 	DATETIME,
	@tip_liq 	CHAR(2),
	@nit_ter	char(15),
	@cod_emp	CHAR(12),
	@ano_gp		CHAR(4),
	@per_gp		CHAR(2),
	@gp_new		CHAR(14) OUTPUT,
	@idl_num	BIGINT 

AS
BEGIN
		
	DECLARE @det_doc VARCHAR(250);

	DECLARE @mensaje VARCHAR(250),
			@ind_rub_est BIT;

	BEGIN TRY

		SET NOCOUNT ON;

		EXEC sp_rhh_gp0	@fec_liq, @cod_emp, @ind_rub_est OUTPUT;

		EXEC sp_gen_nombremes @per_gp, @det_doc OUTPUT;

		SET @det_doc = 'Interfaz Nómina Apropiaciones';

		IF @ind_rub_est = 0
		BEGIN
			EXEC sp_rhh_gp3_1	@fec_liq,@tip_liq,@nit_ter,@cod_emp,@ano_gp,@per_gp,@idl_num,@det_doc,@gp_new OUTPUT;
		END
		ELSE
		BEGIN
			EXEC sp_rhh_gp3_2	@fec_liq,@tip_liq,@nit_ter,@cod_emp,@ano_gp,@per_gp,@idl_num,@det_doc,@gp_new OUTPUT;
		END;

    END TRY

    BEGIN CATCH;
	   THROW;
    END CATCH;

END

```
