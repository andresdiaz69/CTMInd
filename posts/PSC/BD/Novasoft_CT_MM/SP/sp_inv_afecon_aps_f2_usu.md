# Stored Procedure: sp_inv_afecon_aps_f2_usu

## Usa los objetos:
- [[gen_decapl]]
- [[inv_cabdoc]]
- [[inv_cuedoc]]
- [[inv_distctas_escosto]]
- [[inv_items]]
- [[inv_param_cnt]]
- [[sp_inv_nif_reg]]

```sql

/*2013/11/28 Ramiro: Se crea para implementaciòn NIIF
SE ADECUA A LA VERSION WEB
JSARMIENTO JUNIO/2014 SRS: 2014-0188
SE REALIZA UNA SOLA CONSULTA DE CABEZA DE DOCUMENTOS 
JSARMIENTO OCTUBRE/2016 SRS2016-0829
SE ASIGNA LA CUENTA DE COSTO SI COINCIDE CON LA TABLA DE DISTRIBUCION DE ESTRUCTURA DE COSTO
JSARMIENTO NOVIEMBRE/2016 SPR2016-0012
SE CONSULTA LA CUENTA DE DISTRIBUCION DE ESTRUCTURA DE COSTOS DE ACUERDO AL NIVEL DE PARAMETROS GENERALES
JSARMIENTO DICIEMBRE/2016 SNR2016-0056
SE AGREGA DESCRIPCION AL MOVIMIENTO CONTABLE DE AJUSTES RESTA
JSARMIENTO SEPTIEMBRE/2017 SRS2017-1054*/
CREATE PROCEDURE [dbo].[sp_inv_afecon_aps_f2_usu]
	@ano_doc	CHAR(4),
	@per_doc	CHAR(2),
	@sub_tip	CHAR(5),
	@num_doc	CHAR(14)
AS
BEGIN
	DECLARE @fecha		DATETIME;

	--CUENTAS
	DECLARE @inv_ven	VARCHAR(16);
	DECLARE @cos_ven	VARCHAR(16);
	DECLARE @cos_unai	MONEY;

	--DOCUMENTOS
	DECLARE @item		VARCHAR(40);

	DECLARE @pre_tot	MONEY;
	DECLARE @mon_des	MONEY;

	DECLARE @bas_mov	MONEY;
	DECLARE @cod_cl1		VARCHAR(12);
	DECLARE @cod_cl2		VARCHAR(12);
	DECLARE @cod_cl3		VARCHAR(12);
	DECLARE @cod_ter		CHAR(15);

	DECLARE @cod_suc	CHAR(3);
	DECLARE @cod_cco	CHAR(10);
	DECLARE @obs_orc	VARCHAR(70);

	--VARIABLES MULTIMONEDA
	DECLARE @ind_mp		CHAR(2);
	DECLARE @fec_tas		DATETIME;
	DECLARE @tasa_doc		MONEY;
	DECLARE @ind_tas		CHAR(1);

	--REDONDEO DE DECIMALES
	DECLARE @num_dec	SMALLINT;

	DECLARE @docs TABLE (item		VARCHAR(40) COLLATE DATABASE_DEFAULT,
									 pre_tot		MONEY,
									 mon_des	MONEY,
									 cod_cco	CHAR(10) COLLATE DATABASE_DEFAULT,
									 cod_cl1		VARCHAR(12) COLLATE DATABASE_DEFAULT,
									 cod_cl2		VARCHAR(12) COLLATE DATABASE_DEFAULT,
									 cod_cl3		VARCHAR(12) COLLATE DATABASE_DEFAULT,
									 cos_unai	MONEY,
									 cod_gru	CHAR(3) COLLATE DATABASE_DEFAULT,
									 recno		INT PRIMARY KEY IDENTITY
								);

	DECLARE @conteo1	INT;
	DECLARE @conteo2	INT;

	--	SPR2016-0012
	DECLARE @dcta_costo	CHAR(16);
	DECLARE @cod_gru		CHAR(3);

	-- SNR2016-0056
	DECLARE @niv_dist			TINYINT;

	--	SRS2017-1054
	DECLARE @obs_inv	VARCHAR(70);
	DECLARE @obs_cto	VARCHAR(70);

	SET NOCOUNT ON;
	
	SELECT @niv_dist = niv_asig_dist
	FROM inv_param_cnt
	WHERE llave = '0';

	SELECT @ind_mp=ind_mp, @fec_tas=fec_tas, @obs_orc=SUBSTRING(obs_orc,1,70), @tasa_doc=tasa, @ind_tas=ind_tas,@fecha=fecha, @cod_suc=cod_suc, @cod_ter=cod_ter
	FROM inv_cabdoc  
	WHERE   num_doc=@num_doc
		AND sub_tip=@sub_tip 
		AND per_doc=@per_doc 
		AND ano_doc=@ano_doc;

	-- TRAEMOS NUMERO DE DECIMALES PARA REDONDEAR LOS VALORES ANTES DE SUBIRLOS A CONTABILIDAD E INDICADOR DE TESORERIA
	SELECT @num_dec=dec_int 
	FROM gen_decapl 
	WHERE cod_apl='INV' 
		AND tip_mon=@ind_mp

	SET @num_dec=ISNULL(@num_dec,2);

	INSERT INTO @docs (item,pre_tot,mon_des,cod_cco,cod_cl1,cod_cl2,cod_cl3,cos_unai,cod_gru)
	SELECT cue.item,SUM(cue.pre_tot),SUM(cue.mon_des),cue.cod_cco,cue.cod_cl1,cue.cod_cl2,cue.cod_cl3,SUM(cue.cos_unai),ite.cod_grupo 
	FROM inv_cuedoc AS cue
		INNER JOIN inv_items AS ite ON ite.cod_item = cue.item
	WHERE   num_doc=@num_doc
		AND sub_tip=@sub_tip 
		AND per_doc=@per_doc 
		AND ano_doc=@ano_doc
	GROUP BY cue.item,ite.cod_grupo,cue.cod_cco,cue.cod_cl1,cue.cod_cl2,cue.cod_cl3;

	SELECT @conteo1 = COUNT(1) 
	FROM @docs;

	SET @conteo1 = ISNULL(@conteo1,0);

	SET @conteo2 = 1;
	
	WHILE @conteo2 <= @conteo1
	BEGIN
		SELECT	@item=item,@pre_tot=pre_tot,@mon_des=mon_des,@cod_cco=cod_cco,@cod_cl1=cod_cl1,@cod_cl2=cod_cl2,@cod_cl3=cod_cl3
					,@cos_unai=cos_unai,@cod_gru=cod_gru
		FROM @docs
		WHERE recno = @conteo2;

		-- REDONDEAMOS VALORES A CONTABILIZAR SEGUN PARAMETRO DEL MAESTRO
		SET @pre_tot=ROUND(@pre_tot,@num_dec);
		SET @mon_des=ROUND(@mon_des,@num_dec);
		SET @cos_unai=ROUND(@cos_unai,@num_dec);
		
		-- SE ASIGNAN CUENTAS DE DISTRIBUCION POR ESTRUCTURA DE COSTOS
		-- SE ASIGNAN CUENTAS DE DISTRIBUCION POR ESTRUCTURA DE COSTOS
		IF @niv_dist = 5
		BEGIN
			SELECT @dcta_costo=ncta_costo
			FROM inv_distctas_escosto
			WHERE tip_mon = @ind_mp
				AND cod_gru = @cod_gru
 				AND cod_suc = @cod_suc
				AND cod_cco = @cod_cco
				AND cod_cl1 = @cod_cl1
				AND cod_cl2 = @cod_cl2
				AND cod_cl3 = @cod_cl3;

			IF @@ROWCOUNT = 0
			BEGIN
				SET @dcta_costo = '0';
			END;
		END;
		ELSE
		BEGIN
			IF @niv_dist = 4
			BEGIN
				SELECT @dcta_costo=ncta_costo
				FROM inv_distctas_escosto
				WHERE tip_mon = @ind_mp
					AND cod_gru = @cod_gru
 					AND cod_suc = @cod_suc
					AND cod_cco = @cod_cco
					AND cod_cl1 = @cod_cl1
					AND cod_cl2 = @cod_cl2;

				IF @@ROWCOUNT = 0
				BEGIN
					SET @dcta_costo = '0';
				END;
			END;
			ELSE
			BEGIN
				IF @niv_dist = 3
				BEGIN
					SELECT @dcta_costo=ncta_costo
					FROM inv_distctas_escosto
					WHERE tip_mon = @ind_mp
						AND cod_gru = @cod_gru
 						AND cod_suc = @cod_suc
						AND cod_cco = @cod_cco
						AND cod_cl1 = @cod_cl1;

					IF @@ROWCOUNT = 0
					BEGIN
						SET @dcta_costo = '0';
					END;
				END;
				ELSE
				BEGIN
					IF @niv_dist = 2
					BEGIN
						SELECT @dcta_costo=ncta_costo
						FROM inv_distctas_escosto
						WHERE tip_mon = @ind_mp
							AND cod_gru = @cod_gru
 							AND cod_suc = @cod_suc
							AND cod_cco = @cod_cco;

						IF @@ROWCOUNT = 0
						BEGIN
							SET @dcta_costo = '0';
						END;
					END;
					ELSE
					BEGIN
						IF @niv_dist = 1
						BEGIN
							SELECT @dcta_costo=ncta_costo
							FROM inv_distctas_escosto
							WHERE tip_mon = @ind_mp
								AND cod_gru = @cod_gru
 								AND cod_suc = @cod_suc;

							IF @@ROWCOUNT = 0
							BEGIN
								SET @dcta_costo = '0';
							END;
						END;
						ELSE
						BEGIN
							SET @dcta_costo = '0';
						END;
					END;
				END;
			END;
		END;

		IF @cos_unai>0
		BEGIN		
			SELECT @inv_ven=n_inv_com,@cos_ven=n_cos_com 
			FROM inv_items 
			WHERE cod_item=@item;

			IF @dcta_costo <> '0'
			BEGIN
				SET @cos_ven = @dcta_costo;
			END;

			IF @obs_orc = ''
			BEGIN
				SET @obs_inv = 'CUENTA INVENTARIOS';
				SET @obs_cto = 'CUENTA COSTO';
			END;
			ELSE
			BEGIN
				SET @obs_inv = @obs_orc;
				SET @obs_cto = @obs_orc;
			END;

			--Inventarios
			SET @bas_mov=@pre_tot-@mon_des;

			EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@inv_ven, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
			@cod_ter, @cos_unai, @obs_inv, @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';

			--Costo
			EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cos_ven, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
			@cod_ter, @cos_unai, @obs_cto, @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
		END;
		SET @conteo2 = @conteo2 + 1;
	END;
END;

```
