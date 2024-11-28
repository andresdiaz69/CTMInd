# Stored Procedure: sp_inv_afecon_pan_f2_usu

## Usa los objetos:
- [[gen_cajas]]
- [[gen_decapl]]
- [[inv_cabdoc]]
- [[inv_cuedoc]]
- [[inv_param_cnt]]
- [[ptv_egresos]]
- [[sp_inv_nif_reg]]
- [[tes_bancos]]

```sql


/*2013/11/28 Ramiro: Se crea para implementacion NIIF
SE ADECUA A LA VERSION WEB
JSARMIENTO JUNIO/2014 SRS: 2014-0188
SE MODIFICA LA CONTABILIZACION DE ANTICIPO DE PTV PARA QUE SE TENGA EN CUENTA LA CAJA DE TESORERIA O DE PARAMETROS GENERALES
JSARMIENTO MAYO SRS: 2015-0628*/
CREATE PROCEDURE [dbo].[sp_inv_afecon_pan_f2_usu]
	@ano_doc	CHAR(4),
	@per_doc	CHAR(2),
	@sub_tip	CHAR(5),
	@num_doc	CHAR(14)

AS
BEGIN
	DECLARE @fecha		DATETIME;

	--CUENTAS
	DECLARE @ptv_otr	VARCHAR(16);
	DECLARE @ptv_caj	VARCHAR(16);

	--DOCUMENTOS
	DECLARE @bas_mov	MONEY;
	DECLARE @cod_cl1	VARCHAR(12);
	DECLARE @cod_cl2	VARCHAR(12);
	DECLARE @cod_cl3	VARCHAR(12);
	DECLARE @cod_ter	CHAR(15);
	DECLARE @val_ant	MONEY;
	DECLARE @cod_suc	CHAR(3);
	DECLARE @cod_cco	CHAR(10);
	DECLARE @provee	CHAR(15);
	DECLARE @obs_orc	VARCHAR(100);
	DECLARE	@cod_caja	CHAR(3);
	DECLARE @cod_egr	CHAR(3)
	DECLARE @cod_ban	CHAR(10)

	--VARIABLES MULTIMONEDA
	DECLARE @ind_mp	CHAR(2);
	DECLARE @fec_tas	DATETIME;
	DECLARE @tasa_doc	MONEY;
	DECLARE @ind_tas	CHAR(1);

	DECLARE @ind_tes	TINYINT;

	--REDONDEO DE DECIMALES
	DECLARE @num_dec	SMALLINT;

	DECLARE @docs	TABLE (cod_egr	CHAR(3)	COLLATE DATABASE_DEFAULT,
						   cod_suc	CHAR(3)	COLLATE DATABASE_DEFAULT,
						   cod_cco	CHAR(10)	COLLATE DATABASE_DEFAULT,
						   cod_cl1	VARCHAR(12)	COLLATE DATABASE_DEFAULT,
						   cod_cl2	VARCHAR(12)	COLLATE DATABASE_DEFAULT,
						   cod_cl3	VARCHAR(12)	COLLATE DATABASE_DEFAULT,
						   provee	CHAR(15)	COLLATE DATABASE_DEFAULT,
						   val_ant	MONEY,
						   recno	INT PRIMARY KEY IDENTITY
							);

	DECLARE @conteo1	INT;
	DECLARE @conteo2	INT;

	SET NOCOUNT ON;

	SELECT @ind_mp=ind_mp, @fec_tas=fec_tas, @obs_orc=obs_orc, @tasa_doc=tasa, @ind_tas=ind_tas, @cod_caja=cod_caja, @fecha=fecha
	FROM inv_cabdoc  
	WHERE  ano_doc=@ano_doc 
		AND per_doc=@per_doc 
		AND sub_tip=@sub_tip 
		AND num_doc=@num_doc;

	-- TRAEMOS NUMERO DE DECIMALES PARA REDONDEAR LOS VALORES ANTES DE SUBIRLOS A CONTABILIDAD E INDICADOR DE TESORERIA
	SELECT @ind_tes=ISNULL(ind_tes,2), @ptv_caj=cta_caj_nif , @cod_ter = ter_caj
	FROM inv_param_cnt 
	WHERE llave='0'

	IF @ind_tes=1
	BEGIN
		SELECT @cod_ban=cod_ban FROM gen_cajas WHERE cod_caj=@cod_caja;
		SELECT @ptv_caj=ctactb_niif, @cod_ter = nit FROM tes_bancos WHERE bancos=@cod_ban;
	END;

	SELECT @num_dec=dec_int FROM gen_decapl WHERE cod_apl='INV' AND tip_mon=@ind_mp;
	SET @num_dec = ISNULL(@num_dec,2);

	SET @obs_orc='ANTICIPO EN PUNTO DE VENTA';

	INSERT INTO @docs(cod_egr,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,provee,val_ant)
	SELECT cue.cod_egr,cab.cod_suc,cue.cod_cco,cue.cod_cl1,cue.cod_cl2,cue.cod_cl3,cab.provee,SUM(cue.val_ant) 
	FROM inv_cuedoc AS cue 
	INNER JOIN inv_cabdoc AS cab ON cab.ano_doc=cue.ano_doc AND cab.per_doc=cue.per_doc AND cab.tip_doc=cue.sub_tip AND cab.num_doc=cue.num_doc 
	WHERE  cab.ano_doc=@ano_doc 
		AND cab.per_doc=@per_doc 
		AND cab.sub_tip=@sub_tip 
		AND cab.num_doc=@num_doc
	GROUP BY cue.cod_egr,cue.item,cab.cod_suc,cue.cod_cco,cue.cod_cl1,cue.cod_cl2,cue.cod_cl3,cab.provee;

	SELECT @conteo1 = COUNT(1) FROM @docs;
	SET @conteo1 = ISNULL(@conteo1,0);

	SET @conteo2 = 1;

	WHILE @conteo2 <= @conteo1 
	BEGIN
		SELECT @cod_egr=cod_egr,@cod_suc=cod_suc,@cod_cco=cod_cco, @cod_cl1=cod_cl1,@cod_cl2=cod_cl2,@cod_cl3=cod_cl3,
		@provee=provee,@val_ant=val_ant
		FROM @docs
		WHERE recno = @conteo2;

		-- REDONDEAMOS VALORES A CONTABILIZAR SEGUN PARAMETRO DEL MAESTRO
		SET @val_ant=ROUND(@val_ant,@num_dec);

		IF @val_ant>0
		BEGIN		
			SELECT @ptv_otr=cod_cta_nif 
			FROM ptv_egresos 
			WHERE cod_egr='00';

			SET @ptv_otr = ISNULL(@ptv_otr,'0');
			SET @bas_mov=0;
		
			EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@ptv_otr, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
			@cod_ter, @val_ant, @obs_orc, @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
		
			EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@ptv_caj, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
			@cod_ter, @val_ant, @obs_orc, @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
		END
		SET @conteo2 = @conteo2 + 1
	END
END;



```
