# Stored Procedure: sp_inv_afecon_rdv_f2_usu

## Usa los objetos:
- [[cxp_provee]]
- [[gen_decapl]]
- [[inv_cabdoc]]
- [[inv_cuedoc]]
- [[inv_items]]
- [[sp_inv_nif_reg]]

```sql

/*2014/05/14 Ramiro: Se crea para Reversión Descuento Por Volumen (208)
SE ADECUA A LA VERSION WEB
JSARMIENTO JUNIO/2014 SRS: 2014-0188
SE AGREGA DESCRIPCION AL MOVIMIENTO CONTABLE
JSARMIENTO SEPTIEMBRE/2017 SRS2017-1054*/
CREATE PROCEDURE [dbo].[sp_inv_afecon_rdv_f2_usu]
	@ano_doc	CHAR(4),
	@per_doc	CHAR(2),
	@sub_tip	CHAR(5),
	@num_doc	CHAR(14)

AS
BEGIN
	DECLARE @fecha		DATETIME;
	
	--CUENTAS
	DECLARE @cta_des	VARCHAR(16);
	DECLARE @cta_dpv	VARCHAR(16);

	--DOCUMENTOS
	DECLARE @item		VARCHAR(40);

	DECLARE @bas_mov	MONEY;
	DECLARE @cod_cl1		VARCHAR(12);
	DECLARE @cod_cl2		VARCHAR(12);
	DECLARE @cod_cl3		VARCHAR(12);
	DECLARE @cod_ter		CHAR(15);

	DECLARE @cod_suc	CHAR(3);
	DECLARE @cod_cco	CHAR(10);
	DECLARE @provee		CHAR(15);
	DECLARE @obs_orc	VARCHAR(70);

	--VARIABLES MULTIMONEDA
	DECLARE @ind_mp		CHAR(2);
	DECLARE @fec_tas		DATETIME;
	DECLARE @tasa			MONEY;

	DECLARE @tasa_doc	MONEY;
	DECLARE @ind_tas		CHAR(1);

	-- COSTOS NIIF
	DECLARE @cos_toa	MONEY;

	--REDONDEO DE DECIMALES
	DECLARE @num_dec	SMALLINT

	DECLARE @docs	TABLE (item		VARCHAR(40)	COLLATE DATABASE_DEFAULT,
									   cod_suc	CHAR(3)	COLLATE DATABASE_DEFAULT,
									   cod_cco	CHAR(10)	COLLATE DATABASE_DEFAULT,
									   cod_cl1	VARCHAR(12)	COLLATE DATABASE_DEFAULT,
									   cod_cl2	VARCHAR(12)	COLLATE DATABASE_DEFAULT,
									   cod_cl3	VARCHAR(12)	COLLATE DATABASE_DEFAULT,
									   provee	CHAR(15)	COLLATE DATABASE_DEFAULT,
									   cos_toa	MONEY,
									   recno		INT PRIMARY KEY IDENTITY	
							);

	DECLARE @conteo1	INT;
	DECLARE @conteo2	INT;

	--	SRS2017-1054
	DECLARE @obs_des	VARCHAR(70);
	DECLARE @obs_pas	VARCHAR(70);

	SET NOCOUNT ON

	SELECT @ind_mp=ind_mp, @fec_tas=fec_tas, @tasa=tasa, @obs_orc=SUBSTRING(obs_orc,1,70), @tasa_doc=tasa, @ind_tas=ind_tas, @fecha=fecha
	FROM inv_cabdoc  
	WHERE  ano_doc=@ano_doc 
		AND per_doc=@per_doc 
		AND sub_tip=@sub_tip 
		AND num_doc=@num_doc;

	-- Traemos numero de decimales para redondear los valores antes de subirlos a contabilidad e indicador de tesoreria
	SELECT @num_dec=dec_int 
	FROM gen_decapl 
	WHERE cod_apl='INV' 
	AND tip_mon=@ind_mp;

	INSERT INTO @docs (item,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,provee,cos_toa)
	SELECT item,cab.cod_suc,cue.cod_cco,cue.cod_cl1,cue.cod_cl2,cue.cod_cl3,cab.provee,SUM(cue.cos_toa) 
	FROM inv_cuedoc AS cue 
	INNER JOIN inv_cabdoc AS cab ON cab.ano_doc=cue.ano_doc AND cab.per_doc=cue.per_doc AND cab.sub_tip=cue.sub_tip AND cab.num_doc=cue.num_doc 
	WHERE  cab.ano_doc=@ano_doc 
		AND cab.per_doc=@per_doc 
		AND cab.sub_tip=@sub_tip 
		AND cab.num_doc=@num_doc
	GROUP BY cue.item,cab.cod_suc,cue.cod_cco,cue.cod_cl1,cue.cod_cl2,cue.cod_cl3,cab.provee;
	
	SELECT @conteo1 = COUNT(1) 
	FROM @docs;

	SET @conteo1 = ISNULL(@conteo1,0);

	SET @conteo2 = 1

	WHILE @conteo2 <= @conteo1 
	BEGIN
		SELECT @item=item,@cod_suc=cod_suc,@cod_cco=cod_cco,@cod_cl1=cod_cl1,@cod_cl2=cod_cl2,@cod_cl3=cod_cl3,@provee=provee,@cos_toa=cos_toa
		FROM @docs
		WHERE recno = @conteo2; 

		-- Redondeamos valores a contabilizar segun parametro del maestro
		SET @cos_toa=ROUND(@cos_toa,@num_dec);

		IF @cos_toa>0
		BEGIN
			SELECT @cod_ter= nce 
			FROM cxp_provee  
			WHERE provee=@provee;
		
			SELECT @cta_des=cta_des_c,@cta_dpv=cta_dvp_c 
			FROM inv_items 
			WHERE cod_item=@item;

			IF @obs_orc = ''
			BEGIN
				SET @obs_des = 'CUENTA DESCUENTO VOLUMEN';
				SET @obs_pas = 'CXP PASIVO';
			END;
			ELSE
			BEGIN
				SET @obs_des = @obs_orc;
				SET @obs_pas = @obs_orc;
			END;

			--Inventarios
			SET @bas_mov=0
			EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_des, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
			@cod_ter, @cos_toa, @obs_des, @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D'

			--Costo
			EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_dpv, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
			@cod_ter, @cos_toa, @obs_pas, @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C'
		END
		SET @conteo2 = @conteo2 + 1
	END
END




```
