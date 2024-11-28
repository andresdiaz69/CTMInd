# Stored Procedure: usr_sp_rhh_intcontaCT

## Usa los objetos:
- [[Rhh_AsocCptosDet]]
- [[rhh_emplea]]
- [[rhh_Intconta_detalle]]

```sql
-- =============================================
-- Author:		Javier R. Guevara
-- Create date: 28/03/2019
-- Description:	Interfaz Contable Casa Toro
-- exec usr_sp_rhh_intcontaCT '01', '20181130', 2
-- =============================================
CREATE PROCEDURE [dbo].[usr_sp_rhh_intcontaCT]
	@cCodCia	CHAR(3),
	@fFecdoc	DATETIME,
	@cOpc		SMALLINT,
	@cTipLiq	CHAR(2)
AS
BEGIN
	SET NOCOUNT ON;
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	DECLARE	@tInterfaz TABLE (
		[Fecha Asiento]		CHAR(8)		COLLATE DATABASE_DEFAULT,
		[Tipo Asiento]		CHAR(2)		COLLATE DATABASE_DEFAULT,
		[Concepto Asiento]	VARCHAR(70)	COLLATE DATABASE_DEFAULT,
		[Tipo Operación]	VARCHAR(1)	COLLATE DATABASE_DEFAULT,
		[Cuenta]			VARCHAR(16)	COLLATE DATABASE_DEFAULT,
		[Debe Haber]		VARCHAR(1)	COLLATE DATABASE_DEFAULT,
		[Importe]			VARCHAR(20) COLLATE DATABASE_DEFAULT,
		[Entidad]			VARCHAR(1)	COLLATE DATABASE_DEFAULT,
		[Tercero]			VARCHAR(15)	COLLATE DATABASE_DEFAULT,
		[Cuenta Bancaria]	VARCHAR(10)	COLLATE DATABASE_DEFAULT,
		[Centro]			VARCHAR(10)	COLLATE DATABASE_DEFAULT,
		[Departamento]		VARCHAR(12)	COLLATE DATABASE_DEFAULT,
		[Seccion]			VARCHAR(12)	COLLATE DATABASE_DEFAULT,
		[Marca]				VARCHAR(3)	COLLATE DATABASE_DEFAULT,
		[Gama]				VARCHAR(6)	COLLATE DATABASE_DEFAULT,
		[Mr]				VARCHAR(6)	COLLATE DATABASE_DEFAULT,
		[Clasificacion 1]	VARCHAR(6)	COLLATE DATABASE_DEFAULT,
		[Referencia]		VARCHAR(6)	COLLATE DATABASE_DEFAULT,
		[Canal de Venta]	VARCHAR(6)	COLLATE DATABASE_DEFAULT,
		[Canal de Compra]	VARCHAR(6)	COLLATE DATABASE_DEFAULT,
		[Concepto Bancario]	VARCHAR(6)	COLLATE DATABASE_DEFAULT,
		[Moneda]			VARCHAR(3)	COLLATE DATABASE_DEFAULT,
		[Factor de Cambio]	VARCHAR(6)	COLLATE DATABASE_DEFAULT	)

	IF	@cOpc = 1
	BEGIN
		INSERT INTO		@tInterfaz
			SELECT		SUBSTRING(RTRIM(CONVERT(VARCHAR(8), @fFecdoc, 112)), 1, 8), 'NO', des_con, '4', cod_cue, 'H',
						REPLACE(CONVERT(VARCHAR,CONVERT(INT,ABS(SUM(deb_mov) + SUM(cre_mov))),1),'.00',''), NULL, cod_emp, NULL, cod_cco, cod_cl2, cod_cl1, cod_suc, NULL,
						NULL, NULL, NULL, NULL, NULL, NULL, 'COP', NULL
			FROM		rhh_Intconta_detalle I
			LEFT JOIN	Rhh_AsocCptosDet d ON I.cod_con = d.cod_con AND I.mod_liq = d.mod_liq
			WHERE		YEAR(@fFecdoc) = YEAR(fec_cte) AND MONTH(@fFecdoc) = MONTH(fec_cte) AND cod_cia LIKE RTRIM (@cCodCia) AND Ide_AsocIntCpto = '90'
				AND tip_liq LIKE RTRIM (@cTipLiq)
			GROUP BY	des_con, cod_cue, cod_emp, cod_cco, cod_cl2, cod_cl1, cod_suc
			HAVING SUM(deb_mov) > 0
			UNION
			SELECT		SUBSTRING(RTRIM(CONVERT(VARCHAR(8), @fFecdoc, 112)), 1, 8), 'NO', des_con, '4', cod_cue, 'D',
						REPLACE(CONVERT(VARCHAR,CONVERT(INT,ABS(SUM(deb_mov) + SUM(cre_mov))),1),'.00',''), NULL, cod_emp, NULL, cod_cco, cod_cl2, cod_cl1, cod_suc, NULL,
						NULL, NULL, NULL, NULL, NULL, NULL, 'COP', NULL
			FROM		rhh_Intconta_detalle I
			LEFT JOIN	Rhh_AsocCptosDet d ON I.cod_con = d.cod_con AND I.mod_liq = d.mod_liq
			WHERE		YEAR(@fFecdoc) = YEAR(fec_cte) AND MONTH(@fFecdoc) = MONTH(fec_cte) AND cod_cia LIKE RTRIM (@cCodCia) AND Ide_AsocIntCpto = '90'
				AND tip_liq LIKE RTRIM (@cTipLiq)
			GROUP BY	des_con, cod_cue, cod_emp, cod_cco, cod_cl2, cod_cl1, cod_suc
			HAVING SUM(cre_mov) > 0

		UPDATE a SET a.Tercero = ISNULL(e.cod_reloj, 'SIN TERCERO') FROM @tInterfaz a, rhh_emplea e WHERE a.Tercero = e.cod_emp

		SELECT * FROM @tInterfaz ORDER BY Cuenta, Tercero
	END
	IF	@cOpc = 2
	BEGIN
		IF @fFecdoc = EOMONTH(@fFecdoc)
		BEGIN
			INSERT INTO		@tInterfaz
				SELECT		SUBSTRING(RTRIM(CONVERT(VARCHAR(8), @fFecdoc, 112)), 1, 8), 'NO', des_con, '4', cod_cue, 'H',
					REPLACE(CONVERT(VARCHAR,CONVERT(INT,ABS(SUM(deb_mov) + SUM(cre_mov))),1),'.00',''), NULL, cod_emp, NULL, cod_cco, cod_cl2, cod_cl1, cod_suc, NULL,
					NULL, NULL, NULL, NULL, NULL, NULL, 'COP', NULL
				FROM		rhh_Intconta_detalle I
				LEFT JOIN	Rhh_AsocCptosDet d ON I.cod_con = d.cod_con AND I.mod_liq = d.mod_liq
				WHERE		YEAR(@fFecdoc) = YEAR(fec_cte) AND MONTH(@fFecdoc) = MONTH(fec_cte) AND cod_cia LIKE RTRIM (@cCodCia) AND Ide_AsocIntCpto = '91'
					AND tip_liq LIKE RTRIM (@cTipLiq)				
				GROUP BY	cod_cue, cod_emp, cod_cco, cod_cl2, cod_cl1, cod_suc, des_con
				HAVING SUM(deb_mov) > 0
				UNION
				SELECT		SUBSTRING(RTRIM(CONVERT(VARCHAR(8), @fFecdoc, 112)), 1, 8), 'NO', des_con, '4', cod_cue, 'D',
					REPLACE(CONVERT(VARCHAR,CONVERT(INT,ABS(SUM(deb_mov) + SUM(cre_mov))),1),'.00',''), NULL, cod_emp, NULL, cod_cco, cod_cl2, cod_cl1, cod_suc, NULL,
					NULL, NULL, NULL, NULL, NULL, NULL, 'COP', NULL
				FROM		rhh_Intconta_detalle I
				LEFT JOIN	Rhh_AsocCptosDet d ON I.cod_con = d.cod_con AND I.mod_liq = d.mod_liq
				WHERE		YEAR(@fFecdoc) = YEAR(fec_cte) AND MONTH(@fFecdoc) = MONTH(fec_cte) AND cod_cia LIKE RTRIM (@cCodCia) AND Ide_AsocIntCpto = '91'
					AND tip_liq LIKE RTRIM (@cTipLiq)
				GROUP BY	cod_cue, cod_emp, cod_cco, cod_cl2, cod_cl1, cod_suc, des_con
				HAVING SUM(cre_mov) > 0

			UPDATE a SET a.Tercero = ISNULL(e.cod_reloj, 'SIN TERCERO') FROM @tInterfaz a, rhh_emplea e WHERE a.Tercero = e.cod_emp

			SELECT * FROM @tInterfaz ORDER BY Cuenta, Tercero
		END
		ELSE
			SELECT 'No hay registros para procesar'
	END
	IF	@cOpc = 3
	BEGIN
		INSERT INTO		@tInterfaz
			SELECT		SUBSTRING(RTRIM(CONVERT(VARCHAR(8), @fFecdoc, 112)), 1, 8), 'NO', des_con, '4', cod_cue, 'H',
				REPLACE(CONVERT(VARCHAR,CONVERT(INT,ABS(SUM(deb_mov) + SUM(cre_mov))),1),'.00',''), NULL, cod_emp, NULL, cod_cco, cod_cl2, cod_cl1, cod_suc, NULL,
				NULL, NULL, NULL, NULL, NULL, NULL, 'COP', NULL
			FROM		rhh_Intconta_detalle I
			LEFT JOIN	Rhh_AsocCptosDet d ON I.cod_con = d.cod_con AND I.mod_liq = d.mod_liq
			WHERE		fec_cte = @fFecdoc AND cod_cia LIKE RTRIM (@cCodCia) AND Ide_AsocIntCpto = '92'
				AND tip_liq LIKE RTRIM (@cTipLiq)
			GROUP BY	des_con, cod_cue, cod_emp, cod_cco, cod_cl2, cod_cl1, cod_suc
			HAVING SUM(deb_mov) > 0
			UNION
			SELECT		SUBSTRING(RTRIM(CONVERT(VARCHAR(8), @fFecdoc, 112)), 1, 8), 'NO', des_con, '4', cod_cue, 'D',
				REPLACE(CONVERT(VARCHAR,CONVERT(INT,ABS(SUM(deb_mov) + SUM(cre_mov))),1),'.00',''), NULL, cod_emp, NULL, cod_cco, cod_cl2, cod_cl1, cod_suc, NULL,
				NULL, NULL, NULL, NULL, NULL, NULL, 'COP', NULL
			FROM		rhh_Intconta_detalle I
			LEFT JOIN	Rhh_AsocCptosDet d ON I.cod_con = d.cod_con AND I.mod_liq = d.mod_liq
			WHERE		YEAR(@fFecdoc) = YEAR(fec_cte) AND MONTH(@fFecdoc) = MONTH(fec_cte) AND cod_cia LIKE RTRIM (@cCodCia)
				AND Ide_AsocIntCpto = '92' AND tip_liq LIKE RTRIM (@cTipLiq)
			GROUP BY	des_con, cod_cue, cod_emp, cod_cco, cod_cl2, cod_cl1, cod_suc
			HAVING SUM(cre_mov) > 0

		UPDATE a SET a.Tercero = ISNULL(e.cod_reloj, 'SIN TERCERO') FROM @tInterfaz a, rhh_emplea e WHERE a.Tercero = e.cod_emp

		SELECT * FROM @tInterfaz ORDER BY Cuenta, Tercero
	END
END;
```
