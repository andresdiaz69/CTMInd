# Stored Procedure: usr_sp_rhh_intTesCT

## Usa los objetos:
- [[rhh_Intconta_detalle]]
- [[usr_rhh_cuentastes]]
- [[usr_rhh_intTesCT]]

```sql
-- =======================================================================================
-- Author:			Javier R. Guevara
-- Create date:		25/10/2021
-- Description:		Interfaz Tesorería Casa Toro
-- Modificación:	Javier Guevara - Generación de información de pagos
-- =======================================================================================
CREATE PROCEDURE [dbo].[usr_sp_rhh_intTesCT]
	@cCodCia	CHAR(3),
	@fFecdoc	DATETIME,
	@cTipLiq	CHAR(2),
	@cCodCue	CHAR(16)
AS
BEGIN
	SET NOCOUNT ON;
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	DELETE	usr_rhh_intTesCT
	WHERE	tip_liq = @cTipLiq AND ano_doc = YEAR(@fFecdoc) AND per_doc = MONTH(@fFecdoc) AND cod_cia LIKE RTRIM(@cCodCia);

	DECLARE	@nNumDocT	TABLE	(
		num_doc			VARCHAR(14)	COLLATE DATABASE_DEFAULT	)

	DECLARE	@nIdlNumT	TABLE	(
		idl_num			BIGINT	)

	INSERT INTO		@nIdlNumT
		SELECT		DISTINCT idl_num
		FROM	rhh_Intconta_detalle
		WHERE	tip_liq = @cTipLiq AND ano_doc = YEAR(@fFecdoc) AND per_doc = MONTH(@fFecdoc) AND cod_cia LIKE RTRIM(@cCodCia);

	INSERT INTO		@nNumDocT
		SELECT		DISTINCT num_doc
		FROM	rhh_Intconta_detalle
		WHERE	tip_liq = @cTipLiq AND ano_doc = YEAR(@fFecdoc) AND per_doc = MONTH(@fFecdoc) AND cod_cia LIKE RTRIM(@cCodCia);

	INSERT INTO		usr_rhh_intTesCT
		SELECT		ano_doc, per_doc, fch_doc, tip_liq, tip_doc, sub_tip, cod_cia, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3,
			cod_cl4, cod_cl5, cod_cl6, cod_cl7, I.cod_cue, cod_ter, SUM(cre_mov)+SUM(deb_mov), 0, cod_con, mod_liq, des_con, cod_emp, I.IDL_num,
			fec_cte, cod_plt, bas_mov, I.num_doc
		FROM		rhh_Intconta_detalle I
		INNER JOIN	@nIdlNumT Id ON Id.idl_num = I.IDL_num
		INNER JOIN	@nNumDocT N ON N.num_doc = I.num_doc
		INNER JOIN	usr_rhh_cuentastes C ON C.cod_cue = I.cod_cue
		WHERE (deb_mov <> 0 AND cre_mov = 0) OR (deb_mov = 0 AND cre_mov <> 0) AND cod_con NOT LIKE '9999%'
		GROUP BY	ano_doc, per_doc, fch_doc, tip_liq, tip_doc, sub_tip, cod_cia, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3,
			cod_cl4, cod_cl5, cod_cl6, cod_cl7, I.cod_cue, cod_ter, cod_con, mod_liq, des_con, cod_emp, I.IDL_num,
			fec_cte, cod_plt, bas_mov, I.num_doc;

	SELECT	ano_doc, per_doc, fch_doc, tip_liq, tip_doc, sub_tip, cod_cia, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3,
		cod_cl4, cod_cl5, cod_cl6, cod_cl7, cod_cue, cod_ter, deb_mov, cre_mov, cod_con, mod_liq, des_con, cod_emp, IDL_num,
		fec_cte, cod_plt, bas_mov, num_doc
	FROM	usr_rhh_intTesCT
	WHERE	cod_cia LIKE RTRIM(@cCodCia) AND fec_cte = @fFecdoc AND tip_liq LIKE RTRIM(@cTipLiq)
	UNION ALL
	SELECT	NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
		NULL, NULL, NULL, NULL, @cCodCue, NULL, NULL, SUM(deb_mov), NULL, NULL, NULL, NULL, NULL,
		NULL, NULL, NULL, NULL
	FROM usr_rhh_intTesCT
	WHERE	cod_cia LIKE RTRIM(@cCodCia) AND fec_cte = @fFecdoc AND tip_liq LIKE RTRIM(@cTipLiq);
END;
```
