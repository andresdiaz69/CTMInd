# Stored Procedure: sp_inv_afecon_com_f2_usu

## Usa los objetos:
- [[cxp_cuedoc]]
- [[Cxp_distriafe]]
- [[cxp_param]]
- [[cxp_param_cnt]]
- [[cxp_provee]]
- [[gen_actividad]]
- [[gen_decapl]]
- [[gen_imp_adic]]
- [[gen_retencion]]
- [[inv_cabdoc]]
- [[inv_cuedoc]]
- [[inv_distctas_escosto]]
- [[inv_items]]
- [[inv_param_cnt]]
- [[sp_inv_nif_reg]]

```sql

/*2013/11/28 Ramiro: Se crea para implementaciòn NIIF
2014/05/12 Ramiro: Descuentos por volumen NIIF
SE ADECUA A LA VERSION WEB
JSARMIENTO JUNIO/2014 SRS: 2014-0188
SE AGREGA LA CONTABILIZACION DE LA RETENCION DE ICA DE ACUERDO A PARAMETRO DE INVENTARIOS
JSARMIENTO FEBRERO/2015 SRS: 2015-0066
SE ADICIONA cod_cta_niif PARA PROVEEDOR Y CUENTAS DE IMPUESTO DE SUMA Y RESTA PARA NIIF, PARA QUE AL HACER LA 
CONTABILIZACION VISUALICE LA LOCAL Y LAS NIIF GJPULIDO SRS 2015-0499
EN LA VALIDACION DE VALOR A FINANCIAR, SE SUMA AL COSTO DE DOCUMENTO EL MONTO DE IVA NO GRAVADO
JSARMIENTO JULIO/2016 SRS2016-0451
SE CORRIGE LA CONSULTA DE INFORMACION DE PROVEEDOR PARA QUE SE REALICE POR CODIGO Y NO POR EL NIT
JSARMIENTO AGOSTO/2016 SRS2016-0629
SE CORRIGE LA ASIGNACION DE LA CUENTA CONTABLE DE PROVEEDOR DEPENDIENDO DEL PARAMETRO GENERAL DE INVENTARIOS
JSARMIENTO OCTUBRE/2016 SRS2016-0840
SE ASIGNA LA CUENTA DE GASTO E IVA NG SI CONCIDE CON LA INFORMACION DE DISTRIBUCION DE ESTRUCTURA DE COSTOS
JSARMIENTO NOVIEMBRE/2016 SPR2016-0012
SE CONSULTA LA CUENTA DE DISTRIBUCION DE ESTRUCTURA DE COSTOS DE ACUERDO AL NIVEL DE PARAMETROS GENERALES
JSARMIENTO DICIEMBRE/2016 SNR2016-0056
SE AGREGA A LA CONTABILIZACION DE DISTRIBUCION CONTABLE DE IVA NO GRAVADO LA BASE SI APLICA
JSARMIENTO AGOSTO/2017 SRS2017-0855
SE CORRIGE LA ASIGNACION DE LA CUENTA DE AFECTACION CONTABLE DE ANTICIPO Y LA VALIDACION DEL VALOR DE ANTICIPO
JSARMIENTO SEPTIEMBRE/2017 SRS2017-1016*/
CREATE PROCEDURE [dbo].[sp_inv_afecon_com_f2_usu]
	@ano_doc	CHAR(4),
	@per_doc	CHAR(2),
	@sub_tip	CHAR(5),
	@num_doc	CHAR(14)
AS
BEGIN
	DECLARE @fecha		DATETIME;

	--CUENTAS
	DECLARE @ret_ven	VARCHAR(16);
	DECLARE @imp_conv	VARCHAR(16);
	DECLARE @iva_ng		VARCHAR(16);
	DECLARE @ret_iva_c	VARCHAR(16);
	DECLARE @ret_ica_c	VARCHAR(16);
	DECLARE @des_ven	VARCHAR(16);
	DECLARE @cta_cxp	VARCHAR(16);
	DECLARE @cta_egr		VARCHAR(16);
	DECLARE @iva_pag	VARCHAR(16);
	DECLARE @ant_cxp	VARCHAR(16);
	DECLARE @iva_ven	VARCHAR(16);
	DECLARE @pcta_cxp	VARCHAR(16);

	--DOCUMENTOS
	DECLARE @item					VARCHAR(40);
	DECLARE @ven_net			MONEY;
	DECLARE @pre_tot				MONEY;
	DECLARE @mon_des			MONEY;
	DECLARE @mon_iva			MONEY;
	DECLARE @mon_iva_ng		MONEY;
	DECLARE @imp_con			MONEY;
	DECLARE @mon_ret			MONEY;
	DECLARE @ret_iva				MONEY;
	DECLARE @ret_ica				MONEY;
	DECLARE @cob_ica				MONEY;
	DECLARE @val_def				MONEY;
	DECLARE @cos_tot				MONEY;
	DECLARE @cos_toa			MONEY;
	DECLARE @bas_mov			MONEY;
	DECLARE @cod_cl1				VARCHAR(12);
	DECLARE @cod_cl2				VARCHAR(12);
	DECLARE @cod_cl3				VARCHAR(12);
	DECLARE @cod_ter				CHAR(15);
	DECLARE @cod_suc			CHAR(3);
	DECLARE @cod_cco			CHAR(10);
	DECLARE @provee				CHAR(15);
	DECLARE @ant_doc			MONEY;
	DECLARE @obs_orc			VARCHAR(100);
	DECLARE @base_iva_aiu		MONEY;
	DECLARE @base_imp			MONEY;
	DECLARE @cod_ret				CHAR(3);
	DECLARE @base_rii			MONEY;

	--INDICADORES
	DECLARE @wind_cxp		SMALLINT;
	DECLARE @ind_tip			SMALLINT;
	DECLARE @ind_cta_cxp	TINYINT;

	----VARIABLES MULTIMONEDA
	DECLARE @ind_mp		CHAR(2);
	DECLARE @fec_tas		DATETIME;
	DECLARE @tasa			MONEY;
	DECLARE @prt_ext		MONEY;
	DECLARE @cot_ext		MONEY;
	DECLARE @des_ext	MONEY;
	DECLARE @tasa_doc	MONEY;
	DECLARE @ind_tas		CHAR(1);

	-- ANTICIPOS DE DEVOLUCIONES
	DECLARE @val_tcd	MONEY;
	
	-- NIT PARA CONTABILIZAR
	DECLARE @ind_pro	SMALLINT;
	DECLARE @nit_pro		CHAR(15);

	--REDONDEO DE DECIMALES
	DECLARE @num_dec	SMALLINT;

	DECLARE @acod_suc		CHAR(3);
	DECLARE @acod_cco		CHAR(10);
	DECLARE @acod_cl1		VARCHAR(12);
	DECLARE @acod_cl2		VARCHAR(12);
	DECLARE @acod_cl3		VARCHAR(12);
	DECLARE @aNet_doc		MONEY,
			@ind_afe				CHAR(3),
			@wven					CHAR(16);	
				
	DECLARE @cta_cpf		CHAR(16),
				@cta_gfi		CHAR(16),
				@val_fin		MONEY;
	

	DECLARE @cta_des	CHAR(16),
					@cta_dpv	CHAR(16),
					@des_vol	MONEY;
	
	DECLARE @docs	TABLE (item			VARCHAR(40) COLLATE DATABASE_DEFAULT,
							   pre_tot				MONEY,
							   mon_des			MONEY,
							   mon_iva				MONEY,
							   mon_iva_ng		MONEY,
							   imp_con				MONEY,
							   cod_ret				CHAR(3) COLLATE DATABASE_DEFAULT,
							   mon_ret				MONEY,
							   ret_iva				MONEY,
							   ret_ica				MONEY,
							   cob_ica				MONEY,
							   val_def				MONEY,
							   cos_tot				MONEY,
							   cos_toa				MONEY,
							   ven_net				MONEY,
							   cod_cco				CHAR(10) COLLATE DATABASE_DEFAULT,
							   cod_cl1				VARCHAR(12) COLLATE DATABASE_DEFAULT,
							   cod_cl2				VARCHAR(12) COLLATE DATABASE_DEFAULT,
							   cod_cl3				VARCHAR(12) COLLATE DATABASE_DEFAULT,
							   prt_ext				MONEY,
							   cot_ext				MONEY,
							   des_ext				MONEY,
							   val_tcd				MONEY,
							   base_iva_aiu		MONEY,
							   val_tot				MONEY,
							   des_vol				MONEY,
							   ind_afe				CHAR(3) COLLATE DATABASE_DEFAULT,
							   mon_sum1			MONEY,
							   mon_sum2			MONEY,
							   mon_sum3			MONEY,
							   mon_sum4			MONEY,
							   mon_res1			MONEY,
							   mon_res2			MONEY,
							   mon_res3			MONEY,
							   mon_res4			MONEY,
							   cod_ica				VARCHAR(10) COLLATE DATABASE_DEFAULT,
							   cod_gru				CHAR(3) COLLATE DATABASE_DEFAULT,
							   recno					INT PRIMARY KEY IDENTITY
						);
	DECLARE @conteo1	INT;
	DECLARE @conteo2	INT;
	DECLARE @conteo3	INT;
	DECLARE @conteo4	INT;


	--IMPUESTOS ADICIONALES LOCAL
	DECLARE @apl_imp			SMALLINT;
	DECLARE @cta_sum1			VARCHAR(16);
	DECLARE @mon_sum1		MONEY;
	DECLARE @cta_sum2			VARCHAR(16);
	DECLARE @mon_sum2		MONEY;
	DECLARE @cta_sum3			VARCHAR(16);
	DECLARE @mon_sum3		MONEY;
	DECLARE @cta_sum4			VARCHAR(16);
	DECLARE @mon_sum4		MONEY;
	DECLARE @cta_res1			VARCHAR(16);
	DECLARE @cta_aut_res1		VARCHAR(16);
	DECLARE @mon_res1			MONEY;
	DECLARE @cta_res2			VARCHAR(16);
	DECLARE @cta_aut_res2		VARCHAR(16);
	DECLARE @mon_res2			MONEY;
	DECLARE @cta_res3			VARCHAR(16);
	DECLARE @cta_aut_res3		VARCHAR(16);
	DECLARE @mon_res3			MONEY;
	DECLARE @cta_res4			VARCHAR(16);
	DECLARE @cta_aut_res4		VARCHAR(16);
	DECLARE @mon_res4			MONEY;

	
	DECLARE @dis_afe TABLE (Cod_cta		CHAR(16) COLLATE DATABASE_DEFAULT,
										Cod_suc		CHAR(3) COLLATE DATABASE_DEFAULT,
										Cod_cco			CHAR(10) COLLATE DATABASE_DEFAULT,
										Cod_cl1			VARCHAR(12) COLLATE DATABASE_DEFAULT,
										Cod_cl2			VARCHAR(12) COLLATE DATABASE_DEFAULT,
										Cod_cl3			VARCHAR(12) COLLATE DATABASE_DEFAULT,
										val_dis			MONEY,
										bas_dis			MONEY,
										id					INT PRIMARY KEY
							);

	DECLARE @ind_cta_ret	TINYINT

	--	SRS: 2015-0066
	DECLARE @cod_ica			VARCHAR(10);
	DECLARE @ind_cta_ica	SMALLINT;
	DECLARE @cta_ica			CHAR(16);
	DECLARE @pai_doc		CHAR(3);
	DECLARE @dep_doc		CHAR(2);
	DECLARE @ciu_doc			CHAR(5);

	--	SPR2016-0012
	DECLARE @dcta_gasto	CHAR(16);
	DECLARE @dcta_ivang	CHAR(16);
	DECLARE @cod_gru		CHAR(3);

	-- SNR2016-0056
	DECLARE @niv_dist			TINYINT;

	--	SRS2017-0855
	DECLARE @bas_dist		MONEY;
	DECLARE @aBas_Doc		MONEY

	SET NOCOUNT ON;

	SELECT @ind_mp=ind_mp, @fec_tas=fec_tas, @tasa=tasa, @obs_orc=obs_orc, @tasa_doc=tasa, @ind_tas=ind_tas,@fecha=fecha,
			@ind_tip=ind_tip,@pai_doc=pai_doc,@dep_doc=dep_doc,@ciu_doc=ciu_doc, @cod_suc=cod_suc, @provee=provee
	FROM inv_cabdoc  
	WHERE  ano_doc=@ano_doc 
		AND per_doc=@per_doc 
		AND sub_tip=@sub_tip 
		AND num_doc=@num_doc;

	-- TRAEMOS NUMERO DE DECIMALES PARA REDONDEAR LOS VALORES ANTES DE SUBIRLOS A CONTABILIDAD E INDICADOR DE TESORERIA
	SELECT @num_dec=dec_int 
	FROM gen_decapl 
	WHERE cod_apl='INV' 
		AND tip_mon=@ind_mp;

	SET @num_dec = ISNULL(@num_dec,2);

	SELECT @wind_cxp=ind_cxp,@pcta_cxp=cue_cxp, @ant_cxp=ant_cxp,@cta_cpf=cta_cpf, @cta_gfi=cta_gfi,@ind_cta_ret= cta_ret_com,@ind_cta_cxp=ind_cta_cxp,
			   @ind_cta_ica=ind_cta_ica, @niv_dist = niv_asig_dist
	FROM inv_param_cnt 
	WHERE llave='0';

	SET @cod_ter=@provee;

	INSERT INTO @docs (item,pre_tot,mon_des,mon_iva,mon_iva_ng,imp_con,cod_ret,mon_ret,ret_iva,ret_ica,
								cob_ica,val_def,cos_tot,cos_toa,ven_net,cod_cco,cod_cl1,
								cod_cl2,cod_cl3,prt_ext,cot_ext,des_ext,val_tcd,base_iva_aiu,val_tot,
								des_vol,ind_afe,mon_sum1,mon_sum2,mon_sum3,mon_sum4,mon_res1,mon_res2,
								mon_res3,mon_res4,cod_ica,cod_gru)
	SELECT cue.item,SUM(cue.pre_tot),SUM(cue.mon_des),SUM(cue.mon_iva),SUM(cue.mon_iva_ng),SUM(cue.imp_con),cue.cod_ret,SUM(cue.mon_ret),SUM(cue.ret_iva),
			SUM(cue.ret_ica),SUM(cue.cob_ica),SUM(cue.val_def),SUM(cue.cos_tot),SUM(cue.cos_toa),SUM(cue.ven_net),cue.cod_cco,cue.cod_cl1,
			cue.cod_cl2,cue.cod_cl3,SUM(cue.prt_ext),SUM(cue.cot_ext),SUM(cue.des_ext), SUM(cue.val_tcd),SUM(cue.base_iva_aiu),SUM(cue.val_tot),
			SUM(cue.des_vol),ISNULL(cue.ind_afe,'0'),SUM(cue.mon_sum1),SUM(cue.mon_sum2),SUM(cue.mon_sum3),SUM(cue.mon_sum4),SUM(cue.mon_res1),SUM(cue.mon_res2),
			SUM(cue.mon_res3),SUM(cue.mon_res4),cue.cod_ica,ite.cod_grupo
	FROM inv_cuedoc AS cue 
		INNER JOIN inv_items AS ite ON ite.cod_item = cue.item
	WHERE  cue.ano_doc=@ano_doc 
			AND cue.per_doc=@per_doc 
			AND cue.sub_tip=@sub_tip 
			AND cue.num_doc=@num_doc
	GROUP BY	cue.suc_des,cue.item,ite.cod_grupo,cue.cod_cco,cue.cod_cl1,cue.cod_cl2,cue.cod_cl3,cue.ind_afe,
					cue.cco_des,cue.cl1_des,cue.cl2_des,cue.cl3_des,cue.cod_ret,cue.cod_ica;
	
	SELECT @conteo1 = COUNT(1) FROM @docs;
	SET @conteo1 = ISNULL(@conteo1,0);

	SET @conteo2 = 1;

	WHILE @conteo2 <= @conteo1
	BEGIN
		SELECT @item=item,@pre_tot=pre_tot,@mon_des=mon_des,@mon_iva=mon_iva,@mon_iva_ng=mon_iva_ng,@imp_con=imp_con,@mon_ret=mon_ret,@ret_iva=ret_iva,
				@ret_ica=ret_ica,@cob_ica=cob_ica,@val_def=val_def,@cos_toa=cos_toa,@ven_net=ven_net,@cod_cco=cod_cco,
				@cod_cl1=cod_cl1,@cod_cl2=cod_cl2,@cod_cl3=cod_cl3,@prt_ext=prt_ext,@cot_ext=cot_ext,@des_ext=des_ext, @val_tcd=val_tcd,
				@base_iva_aiu=base_iva_aiu,@des_vol=des_vol,@ind_afe=ind_afe,@mon_sum1=mon_sum1,@mon_sum2=mon_sum2,@mon_sum3=mon_sum3,@mon_sum4=mon_sum4,
				@mon_res1=mon_res1,@mon_res2=mon_res2,@mon_res3=mon_res3,@mon_res4=mon_res4,@cod_ret=cod_ret,@cos_tot=cos_tot,@cod_ica=cod_ica,@cod_gru=cod_gru
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
			SET @cos_tot=ROUND(@cos_tot,@num_dec);
			SET @cos_toa=ROUND(@cos_toa,@num_dec);
			SET @ven_net=ROUND(@ven_net,@num_dec);
			SET @des_vol=ROUND(@des_vol,@num_dec);
			SET @mon_sum1=ROUND(@mon_sum1,@num_dec);
			SET @mon_sum2=ROUND(@mon_sum2,@num_dec);
			SET @mon_sum3=ROUND(@mon_sum3,@num_dec);
			SET @mon_sum4=ROUND(@mon_sum4,@num_dec);
			SET @mon_res1=ROUND(@mon_res1,@num_dec);
			SET @mon_res2=ROUND(@mon_res2,@num_dec);
			SET @mon_res3=ROUND(@mon_res3,@num_dec);
			SET @mon_res4=ROUND(@mon_res4,@num_dec);
			SET @base_iva_aiu=ROUND(@base_iva_aiu,@num_dec);
		END;
		ELSE
		BEGIN
			SET @pre_tot=ROUND(@prt_ext,@num_dec);
			SET @cos_toa=ROUND(@cot_ext,@num_dec);
			SET @cos_tot=ROUND(@cot_ext,@num_dec);
			SET @mon_des=ROUND(@des_ext,@num_dec);
			SET @ven_net=ROUND(@prt_ext-@des_ext,@num_dec);
			SET @mon_iva=ROUND(@mon_iva/@tasa_doc,@num_dec);
			SET @mon_iva_ng=ROUND(@mon_iva_ng/@tasa_doc,@num_dec);
			SET @mon_ret=ROUND(@mon_ret/@tasa_doc,@num_dec);
			SET @ret_iva=ROUND(@ret_iva/@tasa_doc,@num_dec);
			SET @cob_ica=ROUND(@cob_ica/@tasa_doc,@num_dec);
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
			SET @base_iva_aiu=ROUND(@base_iva_aiu/@tasa_doc,@num_dec);


			SET @val_def=CASE @ind_tip WHEN '3' THEN @ven_net+@mon_iva+@mon_iva_ng-(@mon_ret)-(@ret_ica)+@mon_sum1+@mon_sum2+@mon_sum3+@mon_sum4-(@mon_res1)-
																		(@mon_res2)-(@mon_res3)-(@mon_res4)
																ELSE @ven_net+@mon_iva+@mon_iva_ng-(@mon_ret)-(@ret_ica)-(@ret_iva)+@mon_sum1+@mon_sum2+@mon_sum3+@mon_sum4-
																		(@mon_res1)-(@mon_res2)-(@mon_res3)-(@mon_res4)
								END;
		END;

		--	CONSULTA DE CUENTAS EN DISTRIBUCION DE GASTOS
		IF @niv_dist = 5
		BEGIN
			SELECT @dcta_gasto  = ncta_gas, @dcta_ivang =ncta_ivang
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
				SET @dcta_gasto = 0;
				SET @dcta_ivang = 0;
			END;
		END
		ELSE
		BEGIN
			IF @niv_dist = 4
			BEGIN
				SELECT @dcta_gasto  = ncta_gas, @dcta_ivang =ncta_ivang
				FROM inv_distctas_escosto
				WHERE tip_mon = @ind_mp
					AND cod_gru = @cod_gru
					AND cod_suc = @cod_suc
					AND cod_cco = @cod_cco
					AND cod_cl1 = @cod_cl1
					AND cod_cl2 = @cod_cl2;
		
				IF @@ROWCOUNT = 0
				BEGIN
					SET @dcta_gasto = 0;
					SET @dcta_ivang = 0;
				END;
			END
			ELSE
			BEGIN
				IF @niv_dist = 3
				BEGIN
					SELECT @dcta_gasto  = ncta_gas, @dcta_ivang =ncta_ivang
					FROM inv_distctas_escosto
					WHERE tip_mon = @ind_mp
						AND cod_gru = @cod_gru
						AND cod_suc = @cod_suc
						AND cod_cco = @cod_cco
						AND cod_cl1 = @cod_cl1;
		
					IF @@ROWCOUNT = 0
					BEGIN
						SET @dcta_gasto = 0;
						SET @dcta_ivang = 0;
					END;
				END
				ELSE
				BEGIN
					IF @niv_dist = 2
					BEGIN
						SELECT @dcta_gasto  = ncta_gas, @dcta_ivang =ncta_ivang
						FROM inv_distctas_escosto
						WHERE tip_mon = @ind_mp
							AND cod_gru = @cod_gru
							AND cod_suc = @cod_suc
							AND cod_cco = @cod_cco;
		
						IF @@ROWCOUNT = 0
						BEGIN
							SET @dcta_gasto = 0;
							SET @dcta_ivang = 0;
						END;
					END
					ELSE
					BEGIN
						IF @niv_dist = 1
						BEGIN
							SELECT @dcta_gasto  = ncta_gas, @dcta_ivang =ncta_ivang
							FROM inv_distctas_escosto
							WHERE tip_mon = @ind_mp
								AND cod_gru = @cod_gru
								AND cod_suc = @cod_suc;
		
							IF @@ROWCOUNT = 0
							BEGIN
								SET @dcta_gasto = 0;
								SET @dcta_ivang = 0;
							END;
						END
						ELSE
						BEGIN
							SET @dcta_gasto = 0;
							SET @dcta_ivang = 0;
						END;
					END;
				END;
			END;
		END;

		-- COMPRAS
		BEGIN
			IF @ven_net>0
			BEGIN
				SET @ant_doc=ISNULL(@ant_doc,0);

				SELECT @ret_ven=n_ret_com,@iva_ven=n_iva_com,@des_ven=n_des_com,@cta_egr=n_cta_egr,@ret_iva_c=n_riv_sim,@ret_ica_c=n_ica_com,
							@iva_ng=n_iva_ng,@imp_conv=n_imp_con,@iva_pag=n_iva_pag,@cta_des=cta_des_c,@cta_dpv=cta_dvp_c,@cta_cxp=n_cta_cxp_c
				FROM inv_items 
				WHERE cod_item=@item;

				IF @ind_cta_cxp = 1
				BEGIN
					IF @wind_cxp=1
					BEGIN
						SELECT @cta_cxp=cod_cta_niif, @nit_pro=nce 
						FROM cxp_provee 
						WHERE provee=@provee;
				
						SELECT @ind_pro=ind_ter
						FROM cxp_param
						WHERE cod_par='0';

						SELECT  @ant_cxp=fa_ant, @cta_cpf=n_cta_cpf, @cta_gfi=n_cta_gfi
						FROM cxp_param_cnt 
						WHERE llave='0';
			
						IF @ind_pro=2
						BEGIN
							SET @cod_ter=@nit_pro;
						END;
						ELSE
						BEGIN
							SET @cod_ter=@provee;
						END;
					END;
					ELSE
					BEGIN
						SET @cta_cxp=@pcta_cxp;
					END;
				END;
				
				IF @dcta_gasto <> '0'
				BEGIN
					SET @cta_egr=@dcta_gasto;
				END;

				IF EXISTS(SELECT pedido FROM inv_cuedoc WHERE ano_doc=@ano_doc AND per_doc=@per_doc AND sub_tip=@sub_tip AND num_doc=@num_doc AND pedido <> '0')
				BEGIN
					SELECT @cta_egr= n_sal_con 
					FROM inv_items 
					WHERE cod_item=@item;
				END;
				
				--Precio de Venta
				SET @bas_mov=@pre_tot-@mon_des;

				--Base Impuestos
				SET @base_imp = CASE WHEN @base_iva_aiu = 0 THEN @bas_mov ELSE @base_iva_aiu END;

				-- FINANCIACIÓN
				SET @val_fin=0;

				IF (@val_tcd+@mon_iva_ng) <> @cos_tot AND (@val_tcd+@mon_iva_ng) < @cos_tot AND @val_tcd > 0
				BEGIN
					SET @val_fin=@cos_tot-@val_tcd-@mon_iva_ng;
				END;

				SET @pre_tot = @pre_tot - @val_fin;

				IF @Ind_afe='0' -- NO HAY DISTRIBUCIÓN DEL GASTO
				BEGIN
					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_egr, @cod_suc,@cod_cco,@cod_cl1,
					@cod_cl2,@cod_cl3,@cod_ter, @pre_tot, @obs_orc, @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
				END;
				ELSE 
				BEGIN 
					DELETE FROM @dis_afe;

					-- DISTRIBUCIÓN DEL GASTO
					INSERT INTO @dis_afe (Cod_cta,Cod_suc,Cod_cco,Cod_cl1,Cod_cl2,Cod_cl3,val_dis,bas_dis
														,id)
					SELECT cod_cta_niif, Cod_suc, Cod_cco, Cod_cl1, Cod_cl2, Cod_cl3, (Porcentaje/100)*@pre_tot, (Porcentaje/100)*@bas_mov
								,ROW_NUMBER()  OVER (ORDER BY Cod_afe, Cod_cta, cod_cta_niif, cta_ivang, cta_ivang_niif, Cod_suc, Cod_cco, Cod_cl1, Cod_cl2, Cod_cl3)
					FROM Cxp_distriafe 
					WHERE Cod_afe= @Ind_afe;

					SELECT @conteo3 = COUNT(1) 
					FROM @dis_afe;

					SET @conteo3 = ISNULL(@conteo3,0);

					SET @conteo4 = 1;

					WHILE @conteo4 <= @conteo3
					BEGIN
						SELECT @Wven=Cod_cta, @aCod_suc=Cod_suc, @aCod_cco=cod_cco, @aCod_cl1=cod_cl1, @aCod_cl2=cod_cl2, @aCod_cl3=cod_cl3, @aNet_doc=val_dis, @aBas_Doc=bas_dis
						FROM @dis_afe
						WHERE id=@conteo4;
						
						EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@wven, @acod_suc, @acod_cco, @acod_cl1, @acod_cl2, @acod_cl3,
						@cod_ter, @aNet_doc, @obs_orc, @aBas_Doc ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';

						SET @conteo4 = @conteo4 + 1;
					END;
				END;

				-- DESCUENTO COMERCIAL
				IF @mon_des > 0
				BEGIN 
					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@des_ven, @cod_suc,@cod_cco,@cod_cl1,
					@cod_cl2,@cod_cl3,@cod_ter, @mon_des, @obs_orc, @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
				END;

				-- FINANCIACIÓN
				IF @val_fin > 0
				BEGIN 
					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_cpf, @cod_suc,@cod_cco,@cod_cl1,
					@cod_cl2,@cod_cl3,@cod_ter, @val_fin, @obs_orc, @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
			
					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_gfi, @cod_suc,@cod_cco,@cod_cl1,
					@cod_cl2,@cod_cl3,@cod_ter, @val_fin, @obs_orc, @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
				END;

				-- DESCUENTO POR VOLUMEN
				IF @des_vol > 0
				BEGIN 
					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_des, @cod_suc,@cod_cco,@cod_cl1,
					@cod_cl2,@cod_cl3,@cod_ter, @des_vol, @obs_orc, @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
			
					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_dpv, @cod_suc,@cod_cco,@cod_cl1,
					@cod_cl2,@cod_cl3,@cod_ter, @des_vol, @obs_orc, @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
				END;

				--Iva
				IF @mon_iva>0 
				BEGIN
					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@iva_ven, @cod_suc,@cod_cco,@cod_cl1,
					@cod_cl2,@cod_cl3,@cod_ter, @mon_iva, @obs_orc, @base_imp ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
				END;

				--Iva NG
				--PRINT 'IVA NG'
				IF @mon_iva_ng>0 
				BEGIN
					IF @dcta_ivang <> '0'
					BEGIN
						SET @iva_ng = @dcta_ivang;
					END;

					IF @Ind_afe='0' -- NO HAY DISTRIBUCIÓN DEL GASTO
					BEGIN
						EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@iva_ng, @cod_suc,@cod_cco,@cod_cl1,
						@cod_cl2,@cod_cl3,@cod_ter, @mon_iva_ng, @obs_orc, @base_imp ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
					END;
					ELSE 
					BEGIN 
						DELETE FROM @dis_afe;

						-- DISTRIBUCIÓN
						INSERT INTO @dis_afe (Cod_cta,Cod_suc,Cod_cco,Cod_cl1,Cod_cl2,Cod_cl3,val_dis,bas_dis
															,id)
						SELECT cta_ivang_niif, Cod_suc, Cod_cco, Cod_cl1, Cod_cl2, Cod_cl3, (Porcentaje/100)*@mon_iva_ng, (Porcentaje/100)*@base_imp
									,ROW_NUMBER()  OVER (ORDER BY Cod_afe, Cod_cta, cod_cta_niif, cta_ivang, cta_ivang_niif, Cod_suc, Cod_cco, Cod_cl1, Cod_cl2, Cod_cl3)
						FROM Cxp_distriafe 
						WHERE Cod_afe= @Ind_afe;

						SELECT @conteo3 = COUNT(1) FROM @dis_afe;
						SET @conteo3 = ISNULL(@conteo3,0);

						SET @conteo4 = 1;

						WHILE @conteo4 <= @conteo3
						BEGIN
							SELECT @Wven=Cod_cta, @aCod_suc=Cod_suc, @aCod_cco=cod_cco, @aCod_cl1=cod_cl1, @aCod_cl2=cod_cl2, @aCod_cl3=cod_cl3, @aNet_doc=val_dis,@aBas_Doc=bas_dis
							FROM @dis_afe
							WHERE id=@conteo4;
						
							EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@wven, @acod_suc, @acod_cco, @acod_cl1, @acod_cl2, @acod_cl3,
							@cod_ter, @aNet_doc, @obs_orc, @aBas_Doc ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';

							SET @conteo4 = @conteo4 + 1;
						END;
					END;
				END;

				--Impuesto Consumo
				--PRINT 'CONSUMO'
				IF @imp_con>0
				BEGIN
					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@imp_conv, @cod_suc,@cod_cco,@cod_cl1,
					@cod_cl2,@cod_cl3,@cod_ter, @imp_con, @obs_orc, @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
				END;

				--Retencion
				IF @mon_ret>0
				BEGIN
					IF @ind_cta_ret = 2
					BEGIN
						SELECT @ret_ven=cta_ret 
						FROM gen_retencion 
						WHERE cod_ret=@cod_ret;
					END;

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@ret_ven, @cod_suc,@cod_cco,@cod_cl1,
					@cod_cl2,@cod_cl3,@cod_ter, @mon_ret, @obs_orc, @base_imp ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
				END;

				--Retencion de Iva
				IF @ret_iva>0
				BEGIN
					SET @base_rii= CASE @ind_tip WHEN 3 THEN @base_imp ELSE @mon_iva+@mon_iva_ng END;

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@ret_iva_c, @cod_suc,@cod_cco,@cod_cl1,
					@cod_cl2,@cod_cl3,@cod_ter, @ret_iva, @obs_orc, @base_rii,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';

					IF @ind_tip=3
					BEGIN
						EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@iva_pag, @cod_suc,@cod_cco,@cod_cl1,
						@cod_cl2,@cod_cl3,@cod_ter, @ret_iva, @obs_orc, @base_imp ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
					END;
				END;

				--Retencion de Ica
				--PRINT 'RETEICA'
				IF @ret_ica>0 
				BEGIN
					IF @ind_cta_ica = 2
					BEGIN
						SELECT @ret_ica_c=cta_nif_com
						FROM gen_actividad 
						WHERE cod_act=@cod_ica 
								AND cod_pai=@pai_doc 
								AND cod_dep=@dep_doc 
								AND cod_ciu=@ciu_doc;
					END;
					
					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@ret_ica_c, @cod_suc,@cod_cco,@cod_cl1,
					@cod_cl2,@cod_cl3,@cod_ter, @ret_ica, @obs_orc, @base_imp ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
				END;

				--Impuesos Adicionales
				--Suma1
				IF @mon_sum1 >0 
				BEGIN
					SELECT @apl_imp=apl_com_sum1 
					FROM gen_imp_adic 
					WHERE llave='0';

					IF @apl_imp=1
					BEGIN
						SELECT @cta_sum1=cta_imp_sum1_niif 
						FROM inv_items 
						WHERE cod_item=@item;
					END;
					ELSE
					BEGIN
						SELECT @cta_sum1=cta_imp_sum1_niif 
						FROM cxp_provee 
						WHERE provee=@provee;
					END;

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_sum1, @cod_suc,@cod_cco,@cod_cl1,
					@cod_cl2,@cod_cl3,@cod_ter, @mon_sum1, @obs_orc, @base_imp ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
				END;

				--Suma2
				IF @mon_sum2 >0 
				BEGIN
					SELECT @apl_imp=apl_com_sum2 
					FROM gen_imp_adic 
					WHERE llave='0';

					IF @apl_imp=1
					BEGIN
						SELECT @cta_sum2=cta_imp_sum2_niif 
						FROM inv_items 
						WHERE cod_item=@item;
					END;
					ELSE
					BEGIN
						SELECT @cta_sum2=cta_imp_sum2_niif 
						FROM cxp_provee 
						WHERE provee=@provee;
					END;

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_sum2, @cod_suc,@cod_cco,@cod_cl1,
					@cod_cl2,@cod_cl3,@cod_ter, @mon_sum2, @obs_orc, @base_imp ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
				END;

				--Suma3
				IF @mon_sum3 >0 
				BEGIN
					SELECT @apl_imp=apl_com_sum3 
					FROM gen_imp_adic 
					WHERE llave='0';

					IF @apl_imp=1
					BEGIN
						SELECT @cta_sum3=cta_imp_sum3_niif 
						FROM inv_items 
						WHERE cod_item=@item;
					END;
					ELSE
					BEGIN
						SELECT @cta_sum3=cta_imp_sum3_niif 
						FROM cxp_provee 
						WHERE provee=@provee;
					END;

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_sum3, @cod_suc,@cod_cco,@cod_cl1,
					@cod_cl2,@cod_cl3,@cod_ter, @mon_sum3, @obs_orc, @base_imp ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
				END;

				--Suma4
				IF @mon_sum4 >0 
				BEGIN
					SELECT @apl_imp=apl_com_sum4 
					FROM gen_imp_adic 
					WHERE llave='0';

					IF @apl_imp=1
					BEGIN
						SELECT @cta_sum4=cta_imp_sum4_niif 
						FROM inv_items 
						WHERE cod_item=@item;
					END;
					ELSE
					BEGIN
						SELECT @cta_sum4=cta_imp_sum4_niif 
						FROM cxp_provee 
						WHERE provee=@provee;
					END;

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_sum4, @cod_suc,@cod_cco,@cod_cl1,
					@cod_cl2,@cod_cl3,@cod_ter, @mon_sum4, @obs_orc, @base_imp ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
				END;

				--Resta1
				IF @mon_res1 >0 
				BEGIN
					SELECT @apl_imp=apl_com_res1 
					FROM gen_imp_adic 
					WHERE llave='0';

					IF @apl_imp=1
					BEGIN
						SELECT @cta_res1=cta_imp_res1_niif 
						FROM inv_items 
						WHERE cod_item=@item;
					END;
					ELSE
					BEGIN
						SELECT @cta_res1=cta_imp_res1_niif 
						FROM cxp_provee 
						WHERE provee=@provee;
					END;

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_res1, @cod_suc,@cod_cco,@cod_cl1,
					@cod_cl2,@cod_cl3,@cod_ter, @mon_res1, @obs_orc, @base_imp ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
				END;

				--Resta2
				IF @mon_res2 >0 
				BEGIN
					SELECT @apl_imp=apl_com_res2 
					FROM gen_imp_adic 
					WHERE llave='0';

					IF @apl_imp=1
					BEGIN
						SELECT @cta_res2=cta_imp_res2_niif 
						FROM inv_items 
						WHERE cod_item=@item;
					END;
					ELSE
					BEGIN
						SELECT @cta_res2=cta_imp_res2_niif 
						FROM cxp_provee 
						WHERE provee=@provee;
					END;

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_res2, @cod_suc,@cod_cco,@cod_cl1,
					@cod_cl2,@cod_cl3,@cod_ter, @mon_res2, @obs_orc, @base_imp ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
				END;

				--Resta3
				IF @mon_res3 >0 
				BEGIN
					SELECT @apl_imp=apl_com_res3 
					FROM gen_imp_adic 
					WHERE llave='0';

					IF @apl_imp=1
					BEGIN
						SELECT @cta_res3=cta_imp_res3_niif 
						FROM inv_items 
						WHERE cod_item=@item;
					END;
					ELSE
					BEGIN
						SELECT @cta_res3=cta_imp_res3_niif 
						FROM cxp_provee 
						WHERE provee=@provee;
					END;

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_res3, @cod_suc,@cod_cco,@cod_cl1,
					@cod_cl2,@cod_cl3,@cod_ter, @mon_res3, @obs_orc, @base_imp ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
				END;

				--Resta4
				IF @mon_res4 >0 
				BEGIN
					SELECT @apl_imp=apl_com_res4 
					FROM gen_imp_adic 
					WHERE llave='0';

					IF @apl_imp=1
					BEGIN
						SELECT @cta_res4=cta_imp_res4_niif 
						FROM inv_items 
						WHERE cod_item=@item;
					END;
					ELSE
					BEGIN
						SELECT @cta_res4=cta_imp_res4_niif 
						FROM cxp_provee 
						WHERE provee=@provee;
					END;

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_res4, @cod_suc,@cod_cco,@cod_cl1,
					@cod_cl2,@cod_cl3,@cod_ter, @mon_res4, @obs_orc, @base_imp ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
				END;

				--Cuenta por Pagar
				IF @val_def-@ant_doc>0
				BEGIN
					SET @val_def=@val_def-@ant_doc-@val_fin;

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_cxp, @cod_suc,@cod_cco,@cod_cl1,
					@cod_cl2,@cod_cl3,@cod_ter, @val_def, @obs_orc, @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
				END;
			END;
		END;

		SET @conteo2 = @conteo2 + 1;
	END;
	
	-- CONTABILIZAMOS ANTICIPOS PARA COMPRAS
	BEGIN
		SELECT @ant_doc=SUM(ant_doc) 
		FROM cxp_cuedoc 
		WHERE num_doc=@num_doc 
			AND sub_tip=@sub_tip 
			AND per_doc=@per_doc 
			AND ano_doc=@ano_doc;

		SELECT @ant_doc=ISNULL(@ant_doc,0);

		--Anticipos
		--PRINT  'ANT'
		IF @ant_doc>0
		BEGIN
			SELECT @ant_cxp=n_wantf 
			FROM cxp_param_cnt 
			WHERE llave='0';

			EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@ant_cxp, @cod_suc,@cod_cco,@cod_cl1,
			@cod_cl2,@cod_cl3,@cod_ter, @ant_doc, @obs_orc, @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
			
			EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_cxp, @cod_suc,@cod_cco,@cod_cl1,
			@cod_cl2,@cod_cl3,@cod_ter, @ant_doc, @obs_orc, @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
		END;
	END;
END;

```
