# Stored Procedure: sp_inv_afecon_dvv_f2_usu

## Usa los objetos:
- [[cxc_cliente]]
- [[cxc_param_cnt]]
- [[gen_actividad]]
- [[gen_cajas]]
- [[gen_decapl]]
- [[gen_imp_adic]]
- [[gen_retencion]]
- [[inv_cabdoc]]
- [[inv_cuedoc]]
- [[inv_distctas_escosto]]
- [[inv_items]]
- [[inv_param_cnt]]
- [[sp_inv_nif_reg]]
- [[tes_bancos]]

```sql

/*2013/11/28 Ramiro: Se crea para implementaciòn NIIF
SE ADECUA A LA VERSION WEB
JSARMIENTO MAYO/2014 SRS: 2014-0188
SE AGREGA LA CONTABILIZACION DE LA RETENCION DE ICA DE ACUERDO A PARAMETRO DE INVENTARIOS
JSARMIENTO FEBRERO/2015 SRS: 2015-0066
SE ADICIONA cod_cta_niif PARA PROVEEDOR Y CUENTAS DE IMPUESTO DE SUMA Y RESTA PARA NIIF, PARA QUE AL HACER LA 
CONTABILIZACION VISUALICE LA LOCAL Y LAS NIIF GJPULIDO SRS 2015-0499 
SE CONVIERTE EL VALOR DE CONTADO A MONEDA EXTRANJERA CUANDO EL TIPO DE MONEDA ES DIFERENTE A LOCAL
JSARMIENTO OCTUBRE/2015 SRS: 2015-0885
SE CORRIGE LA ASIGNACION DE LA VARIABLE DE AUTORETENCION EN LA DEVOLUCION EN VENTAS
JSARMIENTO FEBRERO/2016
SE CORRIGE LA CONSULTA DE INFORMACION DE CLIENTE PARA QUE SE REALICE POR CODIGO Y NO POR EL NIT
JSARMIENTO AGOSTO/2016 SRS2016-0629
SE CORRIGE LA ASIGNACION DE LA CUENTA DE IVA EN DEVOLUCION
JSARMIENTO NOVIEMBRE/2016 SRS2016-0915
SE ASIGNA LA CUENTA DE INGRESO Y COSTO SI COINCIDE CON LA TABLA DE DISTRIBUCION DE ESTRUCTURA DE COSTO
JSARMIENTO NOVIEMBRE/2016 SPR2016-0012
SE CONSULTA LA CUENTA DE DISTRIBUCION DE ESTRUCTURA DE COSTOS DE ACUERDO AL NIVEL DE PARAMETROS GENERALES
JSARMIENTO DICIEMBRE/2016 SNR2016-0056*/
CREATE PROCEDURE [dbo].[sp_inv_afecon_dvv_f2_usu]
	@ano_doc	CHAR(4),
	@per_doc	CHAR(2),
	@sub_tip	CHAR(5),
	@num_doc	CHAR(14)

AS
BEGIN
	----CUENTAS
	DECLARE @ret_ven	VARCHAR(16);
	DECLARE @iva_ven	VARCHAR(16);
	DECLARE @imp_conv	VARCHAR(16);
	DECLARE @iva_ng		VARCHAR(16);
	DECLARE @cta_ing	VARCHAR(16);
	DECLARE @inv_ven	VARCHAR(16);
	DECLARE @cos_ven	VARCHAR(16);
	DECLARE @ret_iva_c	VARCHAR(16);
	DECLARE @ret_ica_c	VARCHAR(16);
	DECLARE @des_ven	VARCHAR(16);
	DECLARE @cob_ica_c	VARCHAR(16);
	DECLARE @cta_cxc	VARCHAR(16);
	DECLARE @ret_vec	VARCHAR(16);

	--DOCUMENTOS
	DECLARE @item		VARCHAR(40);
	DECLARE @ven_net	MONEY;
	DECLARE @pre_tot	MONEY;
	DECLARE @mon_des	MONEY;
	DECLARE @mon_iva	MONEY;
	DECLARE @mon_iva_ng	MONEY;
	DECLARE @imp_con	MONEY;
	DECLARE @mon_ret	MONEY;
	DECLARE @ret_iva	MONEY;
	DECLARE @ret_ica	MONEY;
	DECLARE @cob_ica	MONEY;
	DECLARE @val_def	MONEY;
	DECLARE @bas_mov	MONEY;
	DECLARE @cod_cl1	VARCHAR(12);
	DECLARE @cod_cl2	VARCHAR(12);
	DECLARE @cod_cl3	VARCHAR(12);
	DECLARE @cod_ter	CHAR(15);
	DECLARE @cod_suc	CHAR(3);
	DECLARE @cod_cco	CHAR(10);
	DECLARE @obs_orc	VARCHAR(100);
	DECLARE @bas_aiu	MONEY;
	DECLARE @fecha		DATETIME;
	DECLARE @cod_ret	CHAR(3);

	--INDICADORES
	DECLARE @wind_cxc					SMALLINT;
	DECLARE @autoretene				SMALLINT;
	DECLARE @ind_tes					TINYINT;
	DECLARE @ind_cta_ret				TINYINT;
	DECLARE @ind_cnt_costo_vta	BIT;

	----VARIABLES MULTIMONEDA
	DECLARE @ind_mp	CHAR(2);
	DECLARE @fec_tas	DATETIME;
	DECLARE @tasa		MONEY;
	DECLARE @prt_ext	MONEY;
	DECLARE @cot_ext	MONEY;
	DECLARE @des_ext	MONEY;
	DECLARE @tasa_doc	MONEY;
	DECLARE @ind_tas	CHAR(1);

	-- ANTICIPOS DE DEVOLUCIONES
	DECLARE @val_ant	MONEY;

	-- NIIF
	DECLARE @cos_unai	MONEY;
	DECLARE @cos_toa	MONEY;

	-- NIT PARA CONTABILIZAR
	DECLARE @ind_cli	SMALLINT;
	DECLARE @nit_cli	CHAR(15);

	--REDONDEO DE DECIMALES
	DECLARE @num_dec	SMALLINT;

	-- PUNTO DE VENTA
	DECLARE @ptv_caj	CHAR(16);
	DECLARE @cod_caja	CHAR(3);
	DECLARE @cod_ban	CHAR(10);
		
	DECLARE @val_tot	MONEY;		

	DECLARE @ind_afe	CHAR(3);
					
	DECLARE @cta_ccf	CHAR(16),
			@cta_igf			CHAR(16),
			@val_fin			MONEY,
			@val_tcd		MONEY

	DECLARE @docs TABLE(item		VARCHAR(40) COLLATE DATABASE_DEFAULT,
									pre_tot		MONEY,
									mon_des		MONEY,
									mon_iva		MONEY,
									mon_iva_ng	MONEY,
									imp_con		MONEY,
									cod_ret		CHAR(3) COLLATE DATABASE_DEFAULT,
									mon_ret		MONEY,
									ret_iva		MONEY,
									ret_ica		MONEY,
									cob_ica		MONEY,
									val_def		MONEY,
									ven_net		MONEY,
									cod_cco		CHAR(10) COLLATE DATABASE_DEFAULT,
									cod_cl1		VARCHAR(12) COLLATE DATABASE_DEFAULT,
									cod_cl2		VARCHAR(12) COLLATE DATABASE_DEFAULT,
									cod_cl3		VARCHAR(12) COLLATE DATABASE_DEFAULT,
									prt_ext		MONEY,
									cot_ext		MONEY,
									des_ext		MONEY,
									cos_unai		MONEY, 
									cos_toa		MONEY,
									val_ant		MONEY,
									base_aiu		MONEY,
									val_tot		MONEY,
									val_tcd		MONEY,
									ind_afe		CHAR(3) COLLATE DATABASE_DEFAULT,
									mon_sum1	MONEY,
									mon_sum2	MONEY,
									mon_sum3	MONEY,
									mon_sum4	MONEY,
									mon_res1	MONEY,
									mon_res2	MONEY,
									mon_res3	MONEY,
									mon_res4	MONEY,
									cod_ica		VARCHAR(10) COLLATE DATABASE_DEFAULT,
									cod_gru		CHAR(3) COLLATE DATABASE_DEFAULT,
									recno		INT PRIMARY KEY IDENTITY)

	DECLARE @conteo1	MONEY;								
	DECLARE @conteo2	MONEY;

	DECLARE @apl_imp		SMALLINT;
	DECLARE @cta_sum1		VARCHAR(16);
	DECLARE @mon_sum1		MONEY;
	DECLARE @cta_sum2		VARCHAR(16);
	DECLARE @mon_sum2		MONEY;
	DECLARE @cta_sum3		VARCHAR(16);
	DECLARE @mon_sum3		MONEY;
	DECLARE @cta_sum4		VARCHAR(16);
	DECLARE @mon_sum4		MONEY;
	DECLARE @cta_res1		VARCHAR(16);
	DECLARE @cta_aut_res1	VARCHAR(16);
	DECLARE @mon_res1		MONEY;
	DECLARE @cta_res2		VARCHAR(16);
	DECLARE @cta_aut_res2	VARCHAR(16);
	DECLARE @mon_res2		MONEY;
	DECLARE @cta_res3		VARCHAR(16);
	DECLARE @cta_aut_res3	VARCHAR(16);
	DECLARE @mon_res3		MONEY;
	DECLARE @cta_res4		VARCHAR(16);
	DECLARE @cta_aut_res4	VARCHAR(16);
	DECLARE @mon_res4		MONEY;
	DECLARE @base_imp		MONEY;

	--	SRS: 2015-0066
	DECLARE @cod_ica		VARCHAR(10);
	DECLARE @ind_cta_ica	SMALLINT;
	DECLARE @cta_ica		CHAR(16);
	DECLARE @pai_doc		CHAR(3);
	DECLARE @dep_doc		CHAR(2);
	DECLARE @ciu_doc		CHAR(5);

	--	SRS2016-0629
	DECLARE @cliente	CHAR(15);

	--	SPR2016-0012
	DECLARE @dcta_ing		CHAR(16);
	DECLARE @dcta_costo	CHAR(16);
	DECLARE @dcta_ivang	CHAR(16);
	DECLARE @cod_gru		CHAR(3);

	-- SNR2016-0056
	DECLARE @niv_dist			TINYINT;

	SET NOCOUNT ON

	-- TRAEMOS INDICADOR DE TESORERIA
	SELECT @ind_tes=ind_tes,@ind_cnt_costo_vta=ind_cnt_costo_vta,@ind_cta_ica=ind_cta_ica,@autoretene=autoretene,@wind_cxc=ind_cxc,@cta_ccf=cta_ccf, @cta_igf=cta_igf,
				@niv_dist = niv_asig_dist
	FROM inv_param_cnt 
	WHERE llave='0';

	SET @ind_tes=ISNULL(@ind_tes,2);

	SELECT @ind_mp=ind_mp, @fec_tas=fec_tas, @tasa=tasa, @obs_orc=obs_orc, @tasa_doc=tasa, @ind_tas=ind_tas,@cod_caja=cod_caja, @fecha=fecha,
				@pai_doc=pai_doc,@dep_doc=dep_doc,@ciu_doc=ciu_doc,@cod_suc=cod_suc, @cliente=cliente
	FROM inv_cabdoc  
	WHERE  ano_doc=@ano_doc AND per_doc=@per_doc AND sub_tip=@sub_tip AND num_doc=@num_doc;

	--NUMERO DE DECIMALES PARA REDONDEAR LOS VALORES ANTES DE SUBIRLOS A CONTABILIDAD E 
	SELECT @num_dec=dec_int FROM gen_decapl WHERE cod_apl='INV' AND tip_mon=@ind_mp;

	INSERT INTO @docs (item,pre_tot,mon_des,mon_iva,mon_iva_ng,imp_con,cod_ret,mon_ret,ret_iva,ret_ica,cob_ica,val_def,ven_net,cod_cco,cod_cl1,cod_cl2,
					   cod_cl3,prt_ext,cot_ext,des_ext,cos_unai,cos_toa,val_ant,base_aiu,val_tot,val_tcd,ind_afe,mon_sum1,mon_sum2,mon_sum3,mon_sum4,
					   mon_res1,mon_res2,mon_res3,mon_res4,cod_ica,cod_gru)
	SELECT cue.item,SUM(cue.pre_tot),SUM(cue.mon_des),SUM(cue.mon_iva),SUM(cue.mon_iva_ng),SUM(cue.imp_con),cue.cod_ret,SUM(cue.mon_ret),SUM(cue.ret_iva),SUM(cue.ret_ica),SUM(cue.cob_ica),
	SUM(cue.val_def),SUM(cue.ven_net),cue.cod_cco,cue.cod_cl1,cue.cod_cl2,cue.cod_cl3,SUM(cue.prt_ext),
	SUM(cue.cot_ext),SUM(cue.des_ext), SUM(cue.cos_unai), SUM(cue.cos_toa), SUM(cue.val_ant),SUM(cue.base_iva_aiu),SUM(cue.val_tot),SUM(cue.val_tcd),ISNULL(cue.ind_afe,'0'),
	SUM(cue.mon_sum1),SUM(cue.mon_sum2),SUM(cue.mon_sum3),SUM(cue.mon_sum4),SUM(cue.mon_res1),SUM(cue.mon_res2),SUM(cue.mon_res3),SUM(cue.mon_res4),cue.cod_ica,
	ite.cod_grupo
	FROM inv_cuedoc cue 
		INNER JOIN inv_items AS ite ON ite.cod_item=cue.item
	WHERE  cue.ano_doc=@ano_doc 
		AND cue.per_doc=@per_doc 
		AND cue.sub_tip=@sub_tip 
		AND cue.num_doc=@num_doc
	GROUP BY cue.item,ite.cod_grupo,cue.cod_cco,cue.cod_cl1,cue.cod_cl2,cue.cod_cl3,cue.ind_afe,cue.cod_ret,cue.cod_ica;

	SELECT @conteo1=COUNT(1) FROM @docs;
	SET @conteo1 = ISNULL(@conteo1,0);

	SET @conteo2 = 1;

	WHILE @conteo2<=@conteo1
	BEGIN
		SELECT @item=item,@pre_tot=pre_tot,@mon_des=mon_des,@mon_iva=mon_iva,@mon_iva_ng=mon_iva_ng,@imp_con=imp_con,@mon_ret=mon_ret,@ret_iva=ret_iva,@ret_ica=ret_ica,@cob_ica=cob_ica,
		@val_def=val_def,@ven_net=ven_net,@cod_cco=cod_cco,@cod_cl1=cod_cl1,@cod_cl2=cod_cl2,@cod_cl3=cod_cl3,
		@prt_ext=prt_ext,@cot_ext=cot_ext,@des_ext=des_ext,@cos_unai=cos_unai,@cos_toa=cos_toa,@val_ant=val_ant,@bas_aiu=base_aiu,@val_tot=val_tot,@val_tcd=val_tcd,
		@ind_afe=ind_afe,@mon_sum1=mon_sum1,@mon_sum2=mon_sum2,@mon_sum3=mon_sum3,@mon_sum4=mon_sum4,@mon_res1=mon_res1,@mon_res2=mon_res2,@mon_res3=mon_res3,@mon_res4=mon_res4,
		@cod_ret=cod_ret,@cod_ica=cod_ica,@cod_gru=cod_gru
		FROM @docs
		WHERE recno=@conteo2;

		-- REDONDEAMOS VALORES A CONTABILIZAR SEGUN PARAMETRO DEL MAESTRO
		IF @ind_mp IN ('00','99')
		BEGIN
			SET @pre_tot=ROUND(@pre_tot,@num_dec);
			SET @mon_des=ROUND(@mon_des,@num_dec);
			SET @mon_iva=ROUND(@mon_iva,@num_dec);
			SET @mon_iva_ng=ROUND(@mon_iva_ng,@num_dec);
			SET @imp_con=ROUND(@imp_con,@num_dec);
			SET @mon_ret=ROUND(@mon_ret,@num_dec);
			SET @ret_iva=ROUND(@ret_iva,@num_dec);
			SET @ret_ica=ROUND(@ret_ica,@num_dec);
			SET @cob_ica=ROUND(@cob_ica,@num_dec);
			SET @val_def=ROUND(@val_def,@num_dec);
			SET @cos_toa=ROUND(@cos_toa,@num_dec);
			SET @ven_net=ROUND(@ven_net,@num_dec);
			SET @val_tot=ROUND(@val_tot,@num_dec);
			SET @mon_sum1=ROUND(@mon_sum1,@num_dec);
			SET @mon_sum2=ROUND(@mon_sum2,@num_dec);
			SET @mon_sum3=ROUND(@mon_sum3,@num_dec);
			SET @mon_sum4=ROUND(@mon_sum4,@num_dec);
			SET @mon_res1=ROUND(@mon_res1,@num_dec);
			SET @mon_res2=ROUND(@mon_res2,@num_dec);
			SET @mon_res3=ROUND(@mon_res3,@num_dec);
			SET @mon_res4=ROUND(@mon_res4,@num_dec);
		END;
		ELSE
		BEGIN
			SET @pre_tot=ROUND(@prt_ext,@num_dec);
			SET @mon_des=ROUND(@des_ext,@num_dec);
			SET @ven_net=ROUND(@prt_ext-@des_ext,@num_dec);
			SET @mon_iva=ROUND(@mon_iva/@tasa_doc,@num_dec);
			SET @mon_iva_ng=ROUND(@mon_iva_ng/@tasa_doc,@num_dec);
			SET @mon_ret=ROUND(@mon_ret/@tasa_doc,@num_dec);
			SET @ret_iva=ROUND(@ret_iva/@tasa_doc,@num_dec);
			SET @ret_ica=ROUND(@ret_ica/@tasa_doc,@num_dec);
			SET @imp_con=ROUND(@imp_con/@tasa_doc,@num_dec);
			SET @mon_sum1=ROUND(@mon_sum1/@tasa_doc,@num_dec);
			SET @mon_sum2=ROUND(@mon_sum2/@tasa_doc,@num_dec);
			SET @mon_sum3=ROUND(@mon_sum3/@tasa_doc,@num_dec);
			SET @mon_sum4=ROUND(@mon_sum4/@tasa_doc,@num_dec);
			SET @mon_res1=ROUND(@mon_res1/@tasa_doc,@num_dec);
			SET @mon_res2=ROUND(@mon_res2/@tasa_doc,@num_dec);
			SET @mon_res3=ROUND(@mon_res3/@tasa_doc,@num_dec);
			SET @mon_res4=ROUND(@mon_res4/@tasa_doc,@num_dec);
			SET @val_tcd =ROUND(@val_tcd/@tasa_doc,@num_dec);

						SET @val_def=CASE @autoretene WHEN 1 THEN @ven_net+@mon_iva+@mon_iva_ng+@imp_con-(@ret_iva)-(@ret_ica)+@cob_ica+@mon_sum1+@mon_sum2+@mon_sum3+@mon_sum4
							ELSE @ven_net+@mon_iva+@mon_iva_ng+@imp_con-(@mon_ret)-(@ret_iva)-(@ret_ica)+@cob_ica+@mon_sum1+@mon_sum2+@mon_sum3+@mon_sum4-(@mon_res2)-(@mon_res3)-(@mon_res4)
							END;
		END;

		-- SE ASIGNAN CUENTAS DE DISTRIBUCION POR ESTRUCTURA DE COSTOS
		IF @niv_dist = 5
		BEGIN
			SELECT @dcta_ing = ncta_ing, @dcta_costo=ncta_costo, @dcta_ivang = ncta_ivang
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
				SET @dcta_ing = '0';
				SET @dcta_ivang = '0';
			END;
		END;
		ELSE
		BEGIN
			IF @niv_dist = 4
			BEGIN
				SELECT @dcta_ing = ncta_ing, @dcta_costo=ncta_costo, @dcta_ivang = ncta_ivang
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
					SET @dcta_ing = '0';
					SET @dcta_ivang = '0';
				END;
			END;
			ELSE
			BEGIN
				IF @niv_dist = 3
				BEGIN
					SELECT @dcta_ing = ncta_ing, @dcta_costo=ncta_costo, @dcta_ivang = ncta_ivang
					FROM inv_distctas_escosto
					WHERE tip_mon = @ind_mp
						AND cod_gru = @cod_gru
						AND cod_suc = @cod_suc
						AND cod_cco = @cod_cco
						AND cod_cl1 = @cod_cl1;

					IF @@ROWCOUNT = 0
					BEGIN
						SET @dcta_costo = '0';
						SET @dcta_ing = '0';
						SET @dcta_ivang = '0';
					END;
				END;
				ELSE
				BEGIN
					IF @niv_dist = 2
					BEGIN
						SELECT @dcta_ing = ncta_ing, @dcta_costo=ncta_costo, @dcta_ivang = ncta_ivang
						FROM inv_distctas_escosto
						WHERE tip_mon = @ind_mp
							AND cod_gru = @cod_gru
							AND cod_suc = @cod_suc
							AND cod_cco = @cod_cco;

						IF @@ROWCOUNT = 0
						BEGIN
							SET @dcta_costo = '0';
							SET @dcta_ing = '0';
							SET @dcta_ivang = '0';
						END;
					END;
					ELSE
					BEGIN
						IF @niv_dist = 1
						BEGIN
							SELECT @dcta_ing = ncta_ing, @dcta_costo=ncta_costo, @dcta_ivang = ncta_ivang
							FROM inv_distctas_escosto
							WHERE tip_mon = @ind_mp
								AND cod_gru = @cod_gru
								AND cod_suc = @cod_suc;

							IF @@ROWCOUNT = 0
							BEGIN
								SET @dcta_costo = '0';
								SET @dcta_ing = '0';
								SET @dcta_ivang = '0';
							END;
						END;
						ELSE
						BEGIN
							SET @dcta_costo = '0';
							SET @dcta_ing = '0';
							SET @dcta_ivang = '0';
						END;
					END;
				END;
			END;
		END;

		--DEVOLUCION VENTAS
		BEGIN
			IF @pre_tot>0 
			BEGIN
				IF @wind_cxc=1
				BEGIN
					SELECT @cta_cxc=cod_cta_niif, @nit_cli=nit_cli 
					FROM cxc_cliente 
					WHERE cod_cli=@cliente;
				
					SELECT @ind_cli=ind_ter,@cta_ccf=n_cta_ccf, @cta_igf=n_cta_igf 
					FROM cxc_param_cnt 
					WHERE llave='0';

					IF @ind_cli=2
					BEGIN
						SET @cod_ter=@nit_cli;
					END;
					ELSE
					BEGIN
						SET @cod_ter=@cliente;
					END;
				END;
				ELSE
				BEGIN
					SELECT @cta_cxc=cue_cxc 
					FROM inv_param_cnt 
					WHERE llave='0';

					SET @cod_ter=@nit_cli;
				END;

				SET @cod_caja=ISNULL(@cod_caja,'0');

				IF @cod_caja<>'' AND @cod_caja<>'0' AND @cod_caja<>'XX'
				BEGIN
					IF @ind_tes=1
					BEGIN
						SELECT @cod_ban=cod_ban FROM gen_cajas WHERE cod_caj=@cod_caja;
						SELECT @ptv_caj=ctactb FROM tes_bancos WHERE bancos=@cod_ban;
					END;
					ELSE
					BEGIN
						SELECT @ptv_caj=cta_caj FROM inv_param_cnt WHERE llave='0';
					END;
					
					SET @cta_cxc=@ptv_caj; 
				END;
			
				SELECT @ret_ven=n_ret_ven,@iva_ven=n_iva_vend,@des_ven=n_des_ven,@cta_ing=n_cta_ingd,@ret_iva_c=n_ret_iva,@ret_ica_c=n_ret_ica,
				@inv_ven=n_inv_ven,@iva_ng=n_iva_ng,@imp_conv=n_imp_conv,@cos_ven=n_cos_ven,@cob_ica_c=n_cob_ica,@ret_vec=n_ret_vec 
				FROM inv_items WHERE cod_item=@item;

				--- FINANCIACIÓN
				SET @val_fin=0;

				IF @val_tcd <> @pre_tot AND @val_tcd < @pre_tot AND @val_tcd > 0
				BEGIN
					SET @val_fin=@pre_tot-@val_tcd;
				END;

				SET @bas_mov=@pre_tot-@mon_des;
				SET @base_imp = CASE @bas_aiu WHEN 0 THEN @bas_mov ELSE @bas_aiu END;

				 --Precio de Venta
				SET @pre_tot = @pre_tot - @val_fin;
				
				IF @dcta_ing <> '0'
				BEGIN
					SET @cta_ing = @dcta_ing;
				END;

				EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_ing, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
				@cod_ter, @pre_tot, @obs_orc, @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
				
				--Descuentos
				--PRINT 'DESCUENTO'
				IF @mon_des>0
				BEGIN
					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@des_ven, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @mon_des, @obs_orc, @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
				END;

				--- FINANCIACIÓN
				IF @val_fin > 0
				BEGIN 
					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_ccf, @cod_suc,@cod_cco,@cod_cl1,
					@cod_cl2,@cod_cl3,@cod_ter, @val_fin, @obs_orc, @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
			
					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_igf, @cod_suc,@cod_cco,@cod_cl1,
					@cod_cl2,@cod_cl3,@cod_ter, @val_fin, @obs_orc, @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
				END;

				--Iva
				IF @mon_iva>0
				BEGIN
					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@iva_ven, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @mon_iva, @obs_orc, @bas_aiu ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
				END;

				--Iva NG
				IF @mon_iva_ng>0
				BEGIN
					IF @dcta_ivang <> '0' 
					BEGIN
						SET @iva_ng = @dcta_ivang;
					END;

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@iva_ng, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @mon_iva_ng, @obs_orc, @bas_aiu ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
				END;
			
				--Impuesto Consumo
				--PRINT 'CONSUMO'
				IF @imp_con>0
				BEGIN
					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@imp_conv, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @imp_con, @obs_orc, @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
				END;

				--Retencion
				--PRINT 'RETENCION'
				IF @mon_ret>0
				BEGIN
					IF @ind_cta_ret = 2
					BEGIN
						SELECT @ret_ven=cta_ret_ven,@ret_vec=cta_aut_ret FROM gen_retencion WHERE cod_ret=@cod_ret;
					END;

					IF @autoretene=1	
					BEGIN
						EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@ret_vec, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
						@cod_ter, @mon_ret, @obs_orc, @bas_aiu ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
					
						EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@ret_ven, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
						@cod_ter, @mon_ret, @obs_orc, @bas_aiu ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
					END;
					ELSE
					BEGIN
						EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@ret_ven, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
						@cod_ter, @mon_ret, @obs_orc, @bas_aiu ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
					END;
				END;
			
				--Retencion de Iva
				IF @ret_iva>0
				BEGIN
					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@ret_iva_c, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @ret_iva, @obs_orc, @mon_iva ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
				END;

				--Retencion de Ica
				IF @ret_ica>0
				BEGIN
					IF @ind_cta_ica = 2
					BEGIN
						SELECT @ret_ica_c=cta_nif_ven
						FROM gen_actividad
						WHERE cod_act=@cod_ica 
							AND cod_pai=@pai_doc 
							AND cod_dep=@dep_doc 
							AND cod_ciu=@ciu_doc;
					END;

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@ret_ica_c, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @ret_ica, @obs_orc, @bas_aiu ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';

					--Ica Cobrado
					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cob_ica_c, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @cob_ica, @obs_orc, @bas_aiu ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
				END;

				--Impuestos Adicionales
				--Suma 1
				IF @mon_sum1<>0
				BEGIN
					SELECT @apl_imp=apl_ven_sum1 FROM gen_imp_adic WHERE llave='0';

					IF @apl_imp=1
						SELECT @cta_sum1=cta_imp_sum1_niif FROM inv_items WHERE cod_item=@item;
					ELSE
						SELECT @cta_sum1=cta_imp_sum1_niif FROM cxc_cliente WHERE cod_cli=@cliente;

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_sum1, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @mon_sum1, @obs_orc, @bas_aiu ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
				END;

				--Suma 2
				IF @mon_sum2<>0
				BEGIN
					SELECT @apl_imp=apl_ven_sum2 FROM gen_imp_adic WHERE llave='0';

					IF @apl_imp=1
						SELECT @cta_sum2=cta_imp_sum2_niif FROM inv_items WHERE cod_item=@item;
					ELSE
						SELECT @cta_sum2=cta_imp_sum2_niif FROM cxc_cliente WHERE cod_cli=@cliente;

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_sum2, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @mon_sum2, @obs_orc, @bas_aiu ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
				END;
			
				--Suma 3
				IF @mon_sum3<>0
				BEGIN
					SELECT @apl_imp=apl_ven_sum3 FROM gen_imp_adic WHERE llave='0';

					IF @apl_imp=1
						SELECT @cta_sum3=cta_imp_sum3_niif FROM inv_items WHERE cod_item=@item;
					ELSE
						SELECT @cta_sum3=cta_imp_sum3_niif FROM cxc_cliente WHERE cod_cli=@cliente;

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_sum3, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @mon_sum3, @obs_orc, @bas_aiu ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
				END;

				--Suma 4
				IF @mon_sum4<>0
				BEGIN
					SELECT @apl_imp=apl_ven_sum4 FROM gen_imp_adic WHERE llave='0';

					IF @apl_imp=1
						SELECT @cta_sum4=cta_imp_sum4_niif FROM inv_items WHERE cod_item=@item;
					ELSE
						SELECT @cta_sum4=cta_imp_sum4_niif FROM cxc_cliente WHERE cod_cli=@cliente;

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_sum4, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @mon_sum4, @obs_orc, @bas_aiu ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
				END;

				--Resta 1
				IF @mon_res1<>0
				BEGIN
					SELECT @apl_imp=apl_ven_res1 FROM gen_imp_adic WHERE llave='0';

					IF @apl_imp=1
						SELECT @cta_res1=cta_imp_res1_niif,@cta_aut_res1=cta_aut_res1_niif FROM inv_items WHERE cod_item=@item;
					ELSE
						SELECT @cta_res1=cta_imp_res1_niif,@cta_aut_res1=cta_aut_res1_niif FROM cxc_cliente WHERE cod_cli=@cliente;

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_res1, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @mon_res1, @obs_orc, @bas_aiu ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_aut_res1, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @mon_res1, @obs_orc, @bas_aiu ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
				END;

				--Resta 2
				IF @mon_res2<>0
				BEGIN
					SELECT @apl_imp=apl_ven_res2 FROM gen_imp_adic WHERE llave='0';

					IF @apl_imp=1
						SELECT @cta_res2=cta_imp_res2_niif,@cta_aut_res2=cta_aut_res2_niif FROM inv_items WHERE cod_item=@item;
					ELSE
						SELECT @cta_res2=cta_imp_res2_niif,@cta_aut_res2=cta_aut_res2_niif FROM cxc_cliente WHERE cod_cli=@cliente;

					IF @autoretene=1
					BEGIN
						EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_res2, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
						@cod_ter, @mon_res2, @obs_orc, @bas_aiu ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';

						EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_aut_res2, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
						@cod_ter, @mon_res2, @obs_orc, @bas_aiu ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
					END;
					ELSE
					BEGIN
						EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_res2, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
						@cod_ter, @mon_res2, @obs_orc, @bas_aiu ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
					END;
				END;

				--Resta 3
				IF @mon_res3<>0
				BEGIN
					SELECT @apl_imp=apl_ven_res3 FROM gen_imp_adic WHERE llave='0'

					IF @apl_imp=1
						SELECT @cta_res3=cta_imp_res3_niif,@cta_aut_res3=cta_aut_res3_niif FROM inv_items WHERE cod_item=@item;
					ELSE
						SELECT @cta_res3=cta_imp_res3_niif,@cta_aut_res3=cta_aut_res3_niif FROM cxc_cliente WHERE cod_cli=@cliente;

					IF @autoretene=1
					BEGIN
						EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_res3, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
						@cod_ter, @mon_res3, @obs_orc, @bas_aiu ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';

						EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_aut_res3, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
						@cod_ter, @mon_res3, @obs_orc, @bas_aiu ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
					END;
					ELSE
					BEGIN
						EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_res3, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
						@cod_ter, @mon_res3, @obs_orc, @bas_aiu ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
					END;
				END;

				--Resta 4
				IF @mon_res4<>0
				BEGIN
					SELECT @apl_imp=apl_ven_res4 FROM gen_imp_adic WHERE llave='0';

					IF @apl_imp=1
						SELECT @cta_res4=cta_imp_res4_niif,@cta_aut_res4=cta_aut_res4_niif FROM inv_items WHERE cod_item=@item;
					ELSE
						SELECT @cta_res4=cta_imp_res4_niif,@cta_aut_res4=cta_aut_res4_niif FROM cxc_cliente WHERE cod_cli=@cliente;

					IF @autoretene=1
					BEGIN
						EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_res4, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
						@cod_ter, @mon_res4, @obs_orc, @bas_aiu ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';

						EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_aut_res4, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
						@cod_ter, @mon_res4, @obs_orc, @bas_aiu ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
					END;
					ELSE
					BEGIN
						EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_res4, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
						@cod_ter, @mon_res4, @obs_orc, @bas_aiu ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
					END;
				END;

				--Cuenta por Cobrar
			
				SET @val_def=@val_def - @val_fin
			
				EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_cxc, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
				@cod_ter, @val_def, @obs_orc, @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
			
				--Inventarios
				IF @ind_cnt_costo_vta = 1
				BEGIN
					IF @dcta_costo <> '0'
					BEGIN
						SET @cos_ven = @dcta_costo;
					END;

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@inv_ven, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @cos_toa, @obs_orc, @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
				
					--Costo
					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cos_ven, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @cos_toa, @obs_orc, @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
				END;
			END;
		END;

		SET @conteo2 = @conteo2 + 1;
	END;
END;

```
