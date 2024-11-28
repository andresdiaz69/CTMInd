# Stored Procedure: sp_cxc_afecon_niif_usu

## Usa los objetos:
- [[cnt_puc]]
- [[cxc_cabdoc]]
- [[cxc_cliente]]
- [[cxc_cuedoc]]
- [[cxc_distctas_escosto]]
- [[cxc_inf_nif]]
- [[cxc_param]]
- [[cxc_param_cnt]]
- [[gen_actividad]]
- [[gen_decapl]]
- [[gen_retencion]]
- [[gen_subtipodoc]]
- [[nif_cuadre_tipos]]
- [[nif_puc]]
- [[sp_gen_trae_tasa_niif]]

```sql

/*SE ASIGNA LA CUENTA DE INGRESO DE LA TABLA DE DISTRIBUCION DE C.COSTOS SI COINCIDE CON LO DIGITADO EN EL DOCUMENTO
JSARMIENTO NOVIEMBRE/2016 SPR2016-0012
SE CONSULTA LA CUENTA DE DISTRIBUCION DE ESTRUCTURA DE COSTOS DE ACUERDO AL NIVEL DE PARAMETROS GENERALES
JSARMIENTO DICIEMBRE/2016 SNR2016-0056
SE AGREGA AJUSTE POR DIFERENCIA EN CAMBIO PARA LAS CUENTAS EN MONEDA EXTRANJERA DE ACUERDO A INDICADOR DE PARAMETROS GENERALES
JSARMIENTO DICIEMBRE/2017 SNR2017-0239
SE AGREGA LA CONTABILIZACION DE TASA PACTADA EN LOS DOCUMENTOS DE CXC
JSARMIENTO ENERO/2018 SPA2017-0120
AYVEGA AGOSTO/2018 SNR2018-0147 SE AGREGA PROCEDIMIENTO PARA CONTABILIZACION DE USUARIO*/
CREATE PROCEDURE [dbo].[sp_cxc_afecon_niif_usu] 
	@ano_doc	CHAR(4),
	@per_doc	CHAR(2),
	@sub_tip	CHAR(5),
	@num_doc	CHAR(14),
	@cod_cli	CHAR(15),
	@fch_doc	DATETIME

AS
BEGIN
	DECLARE @wind_tip		SMALLINT;
	DECLARE @ind_aut		SMALLINT;
	DECLARE @wcxc			CHAR(16);
	DECLARE @wreg			SMALLINT;

	-- VARIABLES DE DOCUMENTOS
	DECLARE @val_val		MONEY;
	DECLARE @val_doc		MONEY;
	DECLARE @val_ret		MONEY;
	DECLARE @val_des		MONEY;
	DECLARE @val_iva		MONEY;
	DECLARE @val_ica		MONEY;
	DECLARE @sub_doc		MONEY;
	DECLARE @net_doc		MONEY;
	DECLARE @ret_iva		MONEY;
	DECLARE @val_ctd		MONEY;
	DECLARE @bas_mov		MONEY;
	DECLARE @ant_doc		MONEY;
	DECLARE @men_val		MONEY;
	DECLARE @may_val		MONEY;
	DECLARE @des_mov		CHAR(70);
	DECLARE @num_che		CHAR(10);
	DECLARE @numche			CHAR(10);
	DECLARE @cod_suc		CHAR(3);
	DECLARE @cod_cco		CHAR(10);
	DECLARE @cod_cl1		CHAR(12);
	DECLARE @cod_cl2		CHAR(12);
	DECLARE @cod_cl3		CHAR(12);
	DECLARE @ind_con		CHAR(3);
	DECLARE @wdes			CHAR(16);
	DECLARE @wret			CHAR(16);
	DECLARE @wban			CHAR(16);
	DECLARE @wmen			CHAR(16);
	DECLARE @wmay			CHAR(16);
	DECLARE @ant_ret		CHAR(16);
	DECLARE @nit_cli		CHAR(15);
	DECLARE @ind_cxc		SMALLINT;
	DECLARE @ind_ter		SMALLINT;
	DECLARE @val_tim		MONEY;
	DECLARE @mon_sum1		MONEY;
	DECLARE @mon_sum2		MONEY;
	DECLARE @mon_sum3		MONEY;
	DECLARE @mon_sum4		MONEY;
	DECLARE @mon_res1		MONEY;
	DECLARE @mon_res2		MONEY;
	DECLARE @mon_res3		MONEY;
	DECLARE @mon_res4		MONEY;
	DECLARE @val_fin		MONEY;
	DECLARE @cta_sum1		CHAR(16);
	DECLARE @cta_sum2		CHAR(16);
	DECLARE @cta_sum3		CHAR(16);
	DECLARE @cta_sum4		CHAR(16);
	DECLARE @cta_res1		CHAR(16);
	DECLARE @cta_res2		CHAR(16);
	DECLARE @cta_res3		CHAR(16);
	DECLARE @cta_res4		CHAR(16);
	DECLARE @cta_autres1	CHAR(16);
	DECLARE @cta_autres2	CHAR(16);
	DECLARE @cta_autres3	CHAR(16);
	DECLARE @cta_autres4	CHAR(16);
	DECLARE @cta_aut		CHAR(16);
	DECLARE @n_wrivf		CHAR(16);
	DECLARE @wica_des		CHAR(16);
	DECLARE @wica_cob		CHAR(16);
	DECLARE @wiva			CHAR(16);
	DECLARE @n_wctim		CHAR(16);
	DECLARE @want			CHAR(16);
	DECLARE @wven			CHAR(16);
	DECLARE @n_cta_ccf		CHAR(16);
	DECLARE @n_cta_igf		CHAR(16);

	--Variables para cheques posfechados
	DECLARE @nwddc			CHAR(16);
	DECLARE @nwdcc			CHAR(16);

	--VARIABLES BIMONEDA
	DECLARE @ind_mp			CHAR(2);
	DECLARE @fec_tas		DATETIME;
	DECLARE @tasa			MONEY;
	DECLARE @tasa_doc		MONEY;
	DECLARE @ind_tas		CHAR(1);

	--VARIABLES CUADRE DE DOCUMENTO
	DECLARE @tot_deb		MONEY;
	DECLARE @tot_cre		MONEY;
	DECLARE @max_aju		MONEY;
	DECLARE @aju_deb		CHAR(16);
	DECLARE @aju_cre		CHAR(16);
	DECLARE @aju_suc		CHAR(3);
	DECLARE @aju_cco		CHAR(10);
	DECLARE @aju_cl1		CHAR(16);
	DECLARE @aju_cl2		CHAR(16);
	DECLARE @aju_cl3		CHAR(16);
	DECLARE @aju_ter		CHAR(15);
	DECLARE @max_reg		CHAR(10);

	DECLARE @tip_doc		CHAR(3);

	--REDONDEO DE DECIMALES
	DECLARE @num_dec		SMALLINT;

	-- CONTABILIZACION DOCUMENTOS 040 EN MONEDA LOCAL PARA CLIENTES EXTRANJEROS
	DECLARE @apl_ori		CHAR(3);
	DECLARE @mon_cli		CHAR(2);

	-- CONTABILIZACION INTERESES
	DECLARE @cta_int		CHAR(16);
	DECLARE @val_int		MONEY;

	DECLARE @conta1			SMALLINT;

	DECLARE @cinfon TABLE(ano_doc	CHAR(4) COLLATE DATABASE_DEFAULT,
									per_doc		CHAR(2) COLLATE DATABASE_DEFAULT,
									sub_tip		CHAR(5) COLLATE DATABASE_DEFAULT,
									tip_doc		CHAR(3) COLLATE DATABASE_DEFAULT,
									num_doc		CHAR(14) COLLATE DATABASE_DEFAULT,
									reg_doc		CHAR(10) COLLATE DATABASE_DEFAULT,
									cod_cta		CHAR(16) COLLATE DATABASE_DEFAULT,
									cod_cl1		VARCHAR(12) COLLATE DATABASE_DEFAULT,
									cod_cl2		VARCHAR(12) COLLATE DATABASE_DEFAULT,
									cod_cl3		VARCHAR(12) COLLATE DATABASE_DEFAULT,
									cod_cco		CHAR(10) COLLATE DATABASE_DEFAULT,
									cod_suc		CHAR(3) COLLATE DATABASE_DEFAULT,
									cod_ter		CHAR(15) COLLATE DATABASE_DEFAULT,
									deb_mov		MONEY,
									cre_mov		MONEY,
									des_mov		VARCHAR(70) COLLATE DATABASE_DEFAULT,
									num_che		CHAR(10) COLLATE DATABASE_DEFAULT,
									ind_mr		CHAR(2) COLLATE DATABASE_DEFAULT,
									fch_doc		DATETIME,
									fec_tas		DATETIME,
									tasa		MONEY,
									bas_mov		MONEY,
									ind_tas		CHAR(1) COLLATE DATABASE_DEFAULT,
									ind_cos		CHAR(1) COLLATE DATABASE_DEFAULT,
									ind_tra		CHAR(1) COLLATE DATABASE_DEFAULT,
									ind_adc		SMALLINT,
									registro	INT PRIMARY KEY identity);

	DECLARE @cinfonF TABLE(ano_doc	CHAR(4) COLLATE DATABASE_DEFAULT,
									per_doc		CHAR(2) COLLATE DATABASE_DEFAULT,
									sub_tip		CHAR(5) COLLATE DATABASE_DEFAULT,
									tip_doc		CHAR(3) COLLATE DATABASE_DEFAULT,
									num_doc		CHAR(14) COLLATE DATABASE_DEFAULT,
									reg_doc		CHAR(10) COLLATE DATABASE_DEFAULT,
									cod_cta		CHAR(16) COLLATE DATABASE_DEFAULT,
									cod_cl1		VARCHAR(12) COLLATE DATABASE_DEFAULT,
									cod_cl2		VARCHAR(12) COLLATE DATABASE_DEFAULT,
									cod_cl3		VARCHAR(12) COLLATE DATABASE_DEFAULT,
									cod_cco		CHAR(10) COLLATE DATABASE_DEFAULT,
									cod_suc		CHAR(3) COLLATE DATABASE_DEFAULT,
									cod_ter		CHAR(15) COLLATE DATABASE_DEFAULT,
									deb_mov		MONEY,
									cre_mov		MONEY,
									des_mov		VARCHAR(70) COLLATE DATABASE_DEFAULT,
									num_che		CHAR(10) COLLATE DATABASE_DEFAULT,
									ind_mr		CHAR(2) COLLATE DATABASE_DEFAULT,
									fch_doc		DATETIME,
									fec_tas		DATETIME,
									tasa		MONEY,
									bas_mov		MONEY,
									ind_tas		CHAR(1) COLLATE DATABASE_DEFAULT,
									ind_cos		CHAR(1) COLLATE DATABASE_DEFAULT,
									ind_tra		CHAR(1) COLLATE DATABASE_DEFAULT,
									ind_adc		SMALLINT,
									registro	INT identity);

	-- indicadores de las cuentas
	DECLARE @i_cco			SMALLINT;
	DECLARE @i_cl1			SMALLINT;
	DECLARE @i_cl2			SMALLINT;
	DECLARE @i_cl3			SMALLINT;
	DECLARE @i_ter			SMALLINT;
	DECLARE @i_bas			SMALLINT;

	DECLARE @docs	TABLE (	cod_suc		CHAR(3) COLLATE DATABASE_DEFAULT,
										cod_cco		CHAR(10) COLLATE DATABASE_DEFAULT,
										cod_cli		CHAR(15) COLLATE DATABASE_DEFAULT,
										ind_con		CHAR(3) COLLATE DATABASE_DEFAULT,
										cod_cl1		VARCHAR(12) COLLATE DATABASE_DEFAULT,
										cod_cl2		VARCHAR(12) COLLATE DATABASE_DEFAULT,
										cod_cl3		VARCHAR(12) COLLATE DATABASE_DEFAULT,
										net_doc		MONEY,
										val_iva		MONEY,
										val_ret		MONEY,
										val_doc		MONEY,
										ant_doc		MONEY,
										val_des		MONEY,
										sub_doc		MONEY,
										val_ica		MONEY,
										ret_iva		MONEY,
										val_tim		MONEY,
										men_val		MONEY,
										may_val		MONEY,
										val_int		MONEY,
										mon_sum1	MONEY,
										mon_sum2	MONEY,
										mon_sum3	MONEY,
										mon_sum4	MONEY,
										mon_res1	MONEY,
										mon_res2	MONEY,
										mon_res3	MONEY,
										mon_res4	MONEY,
										base_aiu	MONEY,
										numche		VARCHAR(10) COLLATE DATABASE_DEFAULT,
										num_che		VARCHAR(15) COLLATE DATABASE_DEFAULT,
										val_ctd		MONEY,
										cod_ica		VARCHAR(10) COLLATE DATABASE_DEFAULT,
										cod_ret		CHAR(3) COLLATE DATABASE_DEFAULT,
										ano_ref		CHAR(4) COLLATE DATABASE_DEFAULT,
										per_ref		CHAR(2) COLLATE DATABASE_DEFAULT,
										sub_ref		CHAR(5) COLLATE DATABASE_DEFAULT,
										num_ref		CHAR(14) COLLATE DATABASE_DEFAULT,
										recno		INT PRIMARY KEY IDENTITY);

	DECLARE @conteo1	INT;
	DECLARE @conteo2	INT;
	DECLARE @base_aiu	MONEY;
	DECLARE @base_imp	MONEY;

	--	SRS: 2015-0066
	DECLARE @ind_cta_ica	TINYINT;
	DECLARE @cod_ica		VARCHAR(10);
	DECLARE @cod_pai		CHAR(3);
	DECLARE @cod_dep		CHAR(2);
	DECLARE @cod_ciu		CHAR(5);
	DECLARE @ind_cta_ret	TINYINT;
	DECLARE @cod_ret		CHAR(3);

	--	SPR2016-0012
	DECLARE @dcta_ing		CHAR(16);

	-- SNR2016-0056
	DECLARE @niv_dist		TINYINT;

	-- SNR2017-0239
	DECLARE @difcam_doc		BIT;
	DECLARE @ano_ref		CHAR(4);
	DECLARE @per_ref		CHAR(2);
	DECLARE @sub_ref		CHAR(5);
	DECLARE @num_ref		CHAR(14);
	DECLARE @ind_adc		SMALLINT;
	DECLARE @nat_cta		SMALLINT;
	DECLARE @cta_idc		CHAR(16);
	DECLARE @cta_gdc		CHAR(16);
	DECLARE @tas_fac		MONEY;
	DECLARE @dif_tas		MONEY;
	DECLARE @valdifc		MONEY;
	DECLARE @cco_dif		SMALLINT;
	DECLARE @cl1_dif		SMALLINT;
	DECLARE @cl2_dif		SMALLINT;
	DECLARE @cl3_dif		SMALLINT;
	DECLARE @ter_dif		SMALLINT;
	DECLARE @bas_dif		SMALLINT;

	--SPA2017-0210
	DECLARE @wcxctaspac		CHAR(16);

	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	SELECT @tip_doc=cod_tip 
	FROM gen_subtipodoc 
	WHERE cod_sub=@sub_tip;

	SELECT @conta1=ISNULL(COUNT(1),0) 
	FROM cxc_inf_nif 
	WHERE ano_doc=@ano_doc 
		AND per_doc=@per_doc 
		AND sub_tip=@sub_tip 
		AND num_doc=@num_doc 
		AND ind_tra='X';

	IF @conta1>0
	BEGIN
		RETURN;
	END;
	ELSE
	BEGIN
		DELETE FROM cxc_inf_nif 
		WHERE ano_doc=@ano_doc 
			AND per_doc=@per_doc 
			AND sub_tip=@sub_tip 
			AND num_doc=@num_doc;
	END;

	SELECT @wind_tip=tip_cli,@wcxc=cod_cta_niif,@nit_cli=nit_cli, @cta_sum1=cta_imp_sum1_niif, @cta_sum2=cta_imp_sum2_niif, @cta_sum3=cta_imp_sum3_niif, @cta_sum4=cta_imp_sum4_niif
				, @cta_res1=cta_imp_res1_niif, @cta_res2=cta_imp_res2_niif, @cta_res3=cta_imp_res3_niif, @cta_res4=cta_imp_res4_niif
				, @cta_autres1=cta_aut_res1_niif, @cta_autres2=cta_aut_res2_niif, @cta_autres3=cta_aut_res3_niif, @cta_autres4=cta_aut_res4_niif
				, @wcxctaspac = cta_taspac
	FROM cxc_cliente 
	WHERE cod_cli=@cod_cli;

	SET @nit_cli=ISNULL(@nit_cli,@cod_cli);

	SELECT @ind_aut=ind_aut,@ind_cxc=ind_cxc,@ind_ter=ind_ter,@ind_cta_ica=ind_cta_ica,@ind_cta_ret=ind_cta_ret, @niv_dist = niv_asig_dist, @difcam_doc = difcam_doc  
	FROM cxc_param 
	WHERE cod_par='0';

	IF @ind_ter=1
	BEGIN
		SET @nit_cli=@cod_cli;
	END;

	SELECT @ind_mp=ind_mp,@fec_tas=fec_tas,@tasa_doc=tasa,@ind_tas=ind_tas,@apl_ori=apl_ori,@cod_pai=cod_pai,@cod_dep=cod_dep,@cod_ciu=cod_ciu 
	FROM cxc_cabdoc 
	WHERE ano_doc=@ano_doc 
		AND per_doc=@per_doc 
		AND sub_tip=@sub_tip 
		AND num_doc=@num_doc;

	--	TRAEMOS NUMERO DE DECIMALES PARA REDONDEAR LOS VALORES ANTES DE SUBIRLOS A CONTABILIDAD DE LA TABLA gen_decapl
	SELECT @num_dec=dec_int 
	FROM gen_decapl 
	WHERE cod_apl='CXC' 
		AND tip_mon=@ind_mp;

	SET @num_dec=ISNULL(@num_dec,2);

	SELECT @val_val=SUM(val_doc) 
	FROM cxc_cuedoc 
	WHERE ano_doc=@ano_doc 
		AND per_doc=@per_doc 
		AND sub_tip=@sub_tip 
		AND num_doc=@num_doc;

	IF @val_val>0
	BEGIN
		-- DOCUMENTOS DEBITO
		IF @tip_doc BETWEEN '010' AND '039'
		BEGIN
			INSERT INTO @docs (cod_suc,cod_cco,cod_cli,ind_con,cod_cl1,cod_cl2,cod_cl3,net_doc,val_iva,val_ret,val_doc,ant_doc,val_des,sub_doc,val_ica,ret_iva,val_tim,
										mon_sum1,mon_sum2,mon_sum3,mon_sum4,mon_res1,mon_res2,mon_res3,mon_res4,base_aiu,val_ctd,cod_ica,cod_ret)
			SELECT cod_suc,cod_cco,cod_cli,ind_con,cod_cl1,cod_cl2,cod_cl3,SUM(net_doc),SUM(val_iva),SUM(val_ret),SUM(val_doc),
						SUM(ant_doc),SUM(val_des),SUM(sub_doc),SUM(val_ica),SUM(ret_iva),SUM(val_tim),SUM(mon_sum1),SUM(mon_sum2),SUM(mon_sum3),SUM(mon_sum4),
						SUM(mon_res1),SUM(mon_res2),SUM(mon_res3),SUM(mon_res4),SUM(base_iva_aiu),SUM(val_ctd),cod_ica,cod_ret
			FROM cxc_cuedoc
			WHERE ano_doc=RTRIM(@ano_doc) 
				AND per_doc=RTRIM(@per_doc) 
				AND sub_tip=RTRIM(@sub_tip) 
				AND num_doc=RTRIM(@num_doc)
				AND final = '0'
			GROUP BY cod_suc,cod_cco,cod_cli,ind_con,cod_cl1,cod_cl2,cod_cl3,cod_ica,cod_ret;

			SELECT @conteo1 = COUNT(1) 
			FROM @docs;
			SET @conteo1 = ISNULL(@conteo1,0);

			SET @conteo2 = 1;

			SET @wreg=1;

			WHILE @conteo2 <= @conteo1
			BEGIN
				SELECT @cod_suc=cod_suc,@cod_cco=cod_cco,@cod_cli=cod_cli,@ind_con=ind_con,@cod_cl1=cod_cl1,@cod_cl2=cod_cl2,@cod_cl3=cod_cl3,@net_doc=net_doc,
						@val_iva=val_iva,@val_ret=val_ret,@val_doc=val_doc,@ant_doc=ant_doc,@val_des=val_des,@sub_doc=sub_doc,@val_ica=val_ica,@ret_iva=ret_iva,@val_tim=val_tim,
						@mon_sum1=mon_sum1,@mon_sum2=mon_sum2,@mon_sum3=mon_sum3,@mon_sum4=mon_sum4,@mon_res1=mon_res1,@mon_res2=mon_res2,@mon_res3=mon_res3,@mon_res4=mon_res4,
						@base_aiu=base_aiu,@val_ctd=val_ctd,@cod_ica=cod_ica,@cod_ret=cod_ret
				FROM @docs
				WHERE recno = @conteo2;

				SET @net_doc=ROUND(@net_doc,@num_dec);
				SET @val_iva=ROUND(@val_iva,@num_dec);
				SET @val_ret=ROUND(@val_ret,@num_dec);
				SET @val_doc=ROUND(@val_doc,@num_dec);
				SET @ant_doc=ROUND(@ant_doc,@num_dec);
				SET @val_des=ROUND(@val_des,@num_dec);
				SET @sub_doc=ROUND(@sub_doc,@num_dec);
				SET @val_ica=ROUND(@val_ica,@num_dec);
				SET @ret_iva=ROUND(@ret_iva,@num_dec);
				SET @val_tim=ROUND(@val_tim,@num_dec);
				SET @mon_sum1=ROUND(@mon_sum1,@num_dec);
				SET @mon_sum2=ROUND(@mon_sum2,@num_dec);
				SET @mon_sum3=ROUND(@mon_sum3,@num_dec);
				SET @mon_sum4=ROUND(@mon_sum4,@num_dec);
				SET @mon_res1=ROUND(@mon_res1,@num_dec);
				SET @mon_res2=ROUND(@mon_res2,@num_dec);
				SET @mon_res3=ROUND(@mon_res3,@num_dec);
				SET @mon_res4=ROUND(@mon_res4,@num_dec);
				SET @base_aiu=ROUND(@base_aiu,@num_dec);
				SET @val_ctd=ROUND(@val_ctd,@num_dec);

				SELECT	@wcxc=CASE @ind_cxc WHEN 2 THEN n_wcxc ELSE @wcxc END,
							@wdes=n_wdesf,@wret=n_wretf,@n_wrivf=n_wrivf,@wica_des=n_wicaf,@wica_cob=n_wicaf,
							@wiva=n_wivaf,@n_wctim=n_wctim,@want=n_wantf,@wven=n_wvenf,@ant_ret=n_wantf,@n_cta_ccf=n_cta_ccf,@n_cta_igf=n_cta_igf,
							@wcxctaspac = CASE @ind_cxc WHEN 2 THEN ncxc_taspac ELSE @wcxctaspac END
				FROM cxc_param_cnt 
				WHERE llave=@ind_con;

				-- SE CONSULTAN CUENTAS PARA DISTRIBUCION POR CENTRO DE COSTO
				IF @niv_dist = 5
				BEGIN
					SELECT @dcta_ing = ncta_ing
					FROM cxc_distctas_escosto
					WHERE tip_mon = @ind_mp
						AND cod_suc = @cod_suc
						AND cod_cco = @cod_cco
						AND cod_cl1 = @cod_cl1
						AND cod_cl2 = @cod_cl2
						AND cod_cl3 = @cod_cl3;

					IF @@ROWCOUNT = 0
					BEGIN
						SET @dcta_ing = '0';
					END;
				END;
				ELSE
				BEGIN
					IF @niv_dist = 4
					BEGIN
						SELECT @dcta_ing = ncta_ing
						FROM cxc_distctas_escosto
						WHERE tip_mon = @ind_mp
							AND cod_suc = @cod_suc
							AND cod_cco = @cod_cco
							AND cod_cl1 = @cod_cl1
							AND cod_cl2 = @cod_cl2;

						IF @@ROWCOUNT = 0
						BEGIN
							SET @dcta_ing = '0';
						END;
					END;
					ELSE
					BEGIN
						IF @niv_dist = 3
						BEGIN
							SELECT @dcta_ing = ncta_ing
							FROM cxc_distctas_escosto
							WHERE tip_mon = @ind_mp
								AND cod_suc = @cod_suc
								AND cod_cco = @cod_cco
								AND cod_cl1 = @cod_cl1;

							IF @@ROWCOUNT = 0
							BEGIN
								SET @dcta_ing = '0';
							END;
						END;
						ELSE
						BEGIN
							IF @niv_dist = 2
							BEGIN
								SELECT @dcta_ing = ncta_ing
								FROM cxc_distctas_escosto
								WHERE tip_mon = @ind_mp
									AND cod_suc = @cod_suc
									AND cod_cco = @cod_cco;

								IF @@ROWCOUNT = 0
								BEGIN
									SET @dcta_ing = '0';
								END;
							END;
							ELSE
							BEGIN
								IF @niv_dist = 1
								BEGIN
									SELECT @dcta_ing = ncta_ing
									FROM cxc_distctas_escosto
									WHERE tip_mon = @ind_mp
										AND cod_suc = @cod_suc;

									IF @@ROWCOUNT = 0
									BEGIN
										SET @dcta_ing = '0';
									END;
								END;
								ELSE
								BEGIN
									SET @dcta_ing = '0';
								END;
							END;
						END;
					END;
				END;

				SET @base_imp = CASE WHEN @base_aiu>0 THEN @base_aiu ELSE @sub_doc END; 

				SELECT @des_mov=det_doc 
				FROM cxc_cabdoc 
				WHERE ano_doc=@ano_doc 
					AND per_doc=@per_doc 
					AND sub_tip=@sub_tip 
					AND num_doc=@num_doc;

				SET @num_che=ISNULL(@num_che,'0');
				SET @bas_mov=ISNULL(@bas_mov,0);
			
				EXEC sp_gen_trae_tasa_niif @wcxc,@fec_tas,@tasa OUTPUT,@ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;

					IF @wcxctaspac <> '0'
					BEGIN
						SET @wcxc = @wcxctaspac;
					END;
				END;

				SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
				FROM nif_puc 
				WHERE cod_cta=@wcxc;

				-- FINANCIACION
				SET @val_fin = 0;

				IF @val_ctd <> @net_doc AND @val_ctd < @net_doc AND @val_ctd > 0
				BEGIN
					SET @val_fin=@net_doc-@val_ctd;
				END;

				SET @net_doc = @net_doc - @val_fin;
				SET @val_doc = @val_doc - @val_fin;

				--CUENTA POR COBRAR
				INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
									cod_cco,
									cod_cl1,
									cod_cl2,
									cod_cl3,
									cod_ter,
									deb_mov,cre_mov,des_mov,
									bas_mov,
									num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wcxc,@cod_suc,
					CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
					CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
					CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
					CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
					CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
					@val_doc,0,@des_mov,
					CASE @i_bas WHEN 1 THEN @sub_doc ELSE 0 END,
					@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
				
				SET @wreg=@wreg+1;

				--	FINANCIACION
				IF @val_fin > 0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @n_cta_ccf,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@n_cta_ccf;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,
									cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,
									bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc, @n_cta_ccf, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,
								@cod_cl3, @nit_cli,  @val_fin,0, LEFT(RTRIM(@des_mov)+' (financiación)',60),@sub_doc,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);
					SET @wreg=@wreg+1;

					EXEC sp_gen_trae_tasa_niif @n_cta_igf,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@n_cta_igf;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,
									cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,
									bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc, @n_cta_igf, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,
								@cod_cl3, @nit_cli,0,  @val_fin, LEFT(RTRIM(@des_mov)+' (financiación)',60),@sub_doc,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				-- DESCUENTO
				IF @val_des>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @wdes,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter 
					FROM nif_puc 
					WHERE cod_cta=@wdes;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,
										deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wdes,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
								@val_des,0,@des_mov,
								CASE @i_bas WHEN 1 THEN @sub_doc ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				-- RETENCION
				IF @val_ret>0
				BEGIN
					IF @ind_cta_ret = 2
					BEGIN
						SELECT @wret=ISNULL(cta_ret_ven_niif,'0'),@ant_ret=ISNULL(cta_aut_ret_niif,'0') 
						FROM gen_retencion 
						WHERE cod_ret=@cod_ret;
					END;

					-- AUTORRETENEDOR
					IF @ind_aut=1
					BEGIN
						-- RETENCION
						EXEC sp_gen_trae_tasa_niif @wret,@fec_tas,@tasa OUTPUT,@ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@wret;

						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
											cod_cco,
											cod_cl1,
											cod_cl2,
											cod_cl3,
											cod_ter,
											deb_mov,cre_mov,des_mov,
											bas_mov,
											num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wret,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
									0,@val_ret,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;

						--ANTICIPO RETENCION
						EXEC sp_gen_trae_tasa_niif @ant_ret,@fec_tas,@tasa OUTPUT,@ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@ant_ret;
					
						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,
										deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@ant_ret,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
									@val_ret,0,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;
					END;
					ELSE
					BEGIN
						EXEC sp_gen_trae_tasa_niif @wret,@fec_tas,@tasa OUTPUT,@ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@wret;
					
						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,
										deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wret,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
									@val_ret,0,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;
					END;
				END;

				-- RETEIVA
				IF @ret_iva>0
				BEGIN
					IF @wind_tip=3
					BEGIN
						SELECT @n_wrivf= n_fa_iva_des_sim FROM cxc_param_cnt WHERE llave=@ind_con;

						EXEC sp_gen_trae_tasa_niif @n_wrivf,@fec_tas,@tasa OUTPUT,@ind_mp;

						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@n_wrivf;
					
						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
											cod_cco,
											cod_cl1,
											cod_cl2,
											cod_cl3,
											cod_ter,
											deb_mov,cre_mov,des_mov,
											bas_mov,
											num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@n_wrivf,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
									@ret_iva,0,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;
					END;
					ELSE
					BEGIN
						EXEC sp_gen_trae_tasa_niif @n_wrivf,@fec_tas,@tasa OUTPUT,@ind_mp;

						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@n_wrivf;
					
						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
											cod_cco,
											cod_cl1,
											cod_cl2,
											cod_cl3,
											cod_ter,
											deb_mov,cre_mov,des_mov,
											bas_mov,
											num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@n_wrivf,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
									@ret_iva,0,@des_mov,
									CASE @i_bas WHEN 1 THEN @val_iva ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;
					END;
				END;

				-- ICA
				IF @val_ica>0
				BEGIN
					IF @wind_tip<>3
					BEGIN
						IF @ind_cta_ica = 2
						BEGIN
							SELECT @wica_des=cta_nif_ven
							FROM gen_actividad
							WHERE cod_pai=@cod_pai 
									AND cod_dep=@cod_dep 
									AND cod_ciu=@cod_ciu 
									AND cod_act=@cod_ica;
						END;

						EXEC sp_gen_trae_tasa_niif @wica_des,@fec_tas,@tasa OUTPUT,@ind_mp;
					
						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@wica_des;
					
						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
											cod_cco,
											cod_cl1,
											cod_cl2,
											cod_cl3,
											cod_ter,
											deb_mov,cre_mov,des_mov,
											bas_mov,
											num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wica_des,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
									@val_ica,0,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;
					END;
					ELSE
					BEGIN
						IF @ind_cta_ica = 2
						BEGIN
							SELECT @wica_cob=cta_nif_ven
							FROM gen_actividad
							WHERE cod_pai=@cod_pai 
									AND cod_dep=@cod_dep 
									AND cod_ciu=@cod_ciu 
									AND cod_act=@cod_ica;
						END;

						EXEC sp_gen_trae_tasa_niif @wica_cob,@fec_tas,@tasa OUTPUT,@ind_mp;

						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@wica_cob;
					
						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
											cod_cco,
											cod_cl1,
											cod_cl2,
											cod_cl3,
											cod_ter,
											deb_mov,cre_mov,des_mov,
											bas_mov,
											num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wica_cob,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
									0,@val_ica,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;
					END;
				END;

				-- IVA
				IF @val_iva>0
				BEGIN
					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@wiva;

					EXEC sp_gen_trae_tasa_niif @wiva,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
									cod_cco,
									cod_cl1,
									cod_cl2,
									cod_cl3,
									cod_ter,
									deb_mov,cre_mov,des_mov,
									bas_mov,
									num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wiva,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
								0,@val_iva,@des_mov,
								CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				-- TIMBRE
				IF @val_tim>0
				BEGIN
					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@n_wctim;

					EXEC sp_gen_trae_tasa_niif @n_wctim,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,
										deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@n_wctim,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
								@val_tim,0,RTRIM(@des_mov)+' TIMBRE',
								CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- IMPUESTOS ADICIONALES
				-- SUMA 1
				IF @mon_sum1>0
				BEGIN
					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@cta_sum1;

					EXEC sp_gen_trae_tasa_niif @cta_sum1,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,
										deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_sum1,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
								0,@mon_sum1,@des_mov,
								CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				-- SUMA 2
				IF @mon_sum2>0
				BEGIN
					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@cta_sum2;

					EXEC sp_gen_trae_tasa_niif @cta_sum2,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,
										deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_sum2,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
								0,@mon_sum2,@des_mov,
								CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				-- SUMA 3
				IF @mon_sum3>0
				BEGIN
					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@cta_sum3;

					EXEC sp_gen_trae_tasa_niif @cta_sum3,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
									cod_cco,
									cod_cl1,
									cod_cl2,
									cod_cl3,
									cod_ter,
									deb_mov,cre_mov,des_mov,
									bas_mov,
									num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_sum3,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
								0,@mon_sum3,@des_mov,
								CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;
			
				-- SUMA 4
				IF @mon_sum4>0
				BEGIN
					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@cta_sum4;

					EXEC sp_gen_trae_tasa_niif @cta_sum4,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,
										deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_sum4,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
								0,@mon_sum4,@des_mov,
								CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				-- RESTA 1
				IF @mon_res1>0
				BEGIN
					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@cta_res1;

					EXEC sp_gen_trae_tasa_niif @cta_res1,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,
										deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res1,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
								0,@mon_res1,@des_mov,
								CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;

					--ANTICIPO RETENCION IMPUESTO RESTA 1

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@cta_autres1;

					EXEC sp_gen_trae_tasa_niif @cta_autres1,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;
					
					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,
										deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_autres1,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
								@mon_res1,0,@des_mov,
								CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				-- RESTA 2
				IF @mon_res2>0
				BEGIN
					-- AUTORRETENEDOR
					IF @ind_aut=1
					BEGIN
						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@cta_res2;

						EXEC sp_gen_trae_tasa_niif @cta_res2,@fec_tas,@tasa OUTPUT,@ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,
										deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res2,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
									0,@mon_res2,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;

						--ANTICIPO RETENCION IMPUESTO RESTA 2
						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@cta_autres2;

						EXEC sp_gen_trae_tasa_niif @cta_autres2,@fec_tas,@tasa OUTPUT,@ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;
					
						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
											cod_cco,
											cod_cl1,
											cod_cl2,
											cod_cl3,
											cod_ter,
											deb_mov,cre_mov,des_mov,
											bas_mov,
											num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_autres2,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
									@mon_res2,0,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;
					END;
					ELSE
					BEGIN
						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@cta_res2;

						EXEC sp_gen_trae_tasa_niif @cta_res2,@fec_tas,@tasa OUTPUT,@ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;
					
						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
											cod_cco,
											cod_cl1,
											cod_cl2,
											cod_cl3,
											cod_ter,
											deb_mov,cre_mov,des_mov,
											bas_mov,
											num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res2,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
									@mon_res2,0,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;
					END;
				END;

				-- RESTA 3
				IF @mon_res3>0
				BEGIN
					-- AUTORRETENEDOR
					IF @ind_aut=1
					BEGIN
						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@cta_res3;

						EXEC sp_gen_trae_tasa_niif @cta_res3,@fec_tas,@tasa OUTPUT,@ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
											cod_cco,
											cod_cl1,
											cod_cl2,
											cod_cl3,
											cod_ter,
											deb_mov,cre_mov,des_mov,
											bas_mov,
											num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res3,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
									0,@mon_res3,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;

						--ANTICIPO RETENCION IMPUESTO RESTA 3
						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@cta_autres3;

						EXEC sp_gen_trae_tasa_niif @cta_autres3,@fec_tas,@tasa OUTPUT,@ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;
					
						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
											cod_cco,
											cod_cl1,
											cod_cl2,
											cod_cl3,
											cod_ter,
											deb_mov,cre_mov,des_mov,
											bas_mov,
											num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_autres3,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
									@mon_res3,0,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;
					END;
					ELSE
					BEGIN
						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@cta_res3;

						EXEC sp_gen_trae_tasa_niif @cta_res3,@fec_tas,@tasa OUTPUT,@ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc
						END;
					
						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
											cod_cco,
											cod_cl1,
											cod_cl2,
											cod_cl3,
											cod_ter,
											deb_mov,cre_mov,des_mov,
											bas_mov,
											num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res3,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
									@mon_res3,0,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;
					END;
				END;

				--	RESTA 4
				IF @mon_res4>0
				BEGIN
					-- AUTORRETENEDOR
					IF @ind_aut=1
					BEGIN
						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@cta_res4;

						EXEC sp_gen_trae_tasa_niif @cta_res4,@fec_tas,@tasa OUTPUT,@ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
											cod_cco,
											cod_cl1,
											cod_cl2,
											cod_cl3,
											cod_ter,
											deb_mov,cre_mov,des_mov,
											bas_mov,
											num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res4,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
									0,@mon_res4,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;

						--ANTICIPO RETENCION IMPUESTO RESTA 4
						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@cta_autres4;

						EXEC sp_gen_trae_tasa_niif @cta_autres4,@fec_tas,@tasa OUTPUT,@ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;
					
						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,
										deb_mov,cre_mov,des_mov,
										bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_autres4,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
									@mon_res4,0,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;
					END;
					ELSE
					BEGIN
						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@cta_res4;

						EXEC sp_gen_trae_tasa_niif @cta_res4,@fec_tas,@tasa OUTPUT,@ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
											cod_cco,
											cod_cl1,
											cod_cl2,
											cod_cl3,
											cod_ter,
											deb_mov,cre_mov,des_mov,
											bas_mov,
											num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res4,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
									@mon_res4,0,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;
					END;
				END;

				-- ANTICIPOS
				IF @ant_doc>0
				BEGIN
					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@want;

					EXEC sp_gen_trae_tasa_niif @want,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
									cod_cco,
									cod_cl1,
									cod_cl2,
									cod_cl3,
									cod_ter,
									deb_mov,cre_mov,des_mov,
									bas_mov,
									num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@want,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
								@ant_doc,0,@des_mov,
								CASE @i_bas WHEN 1 THEN @sub_doc ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;

					EXEC sp_gen_trae_tasa_niif @wcxc,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;

						IF @wcxctaspac <> '0'
						BEGIN
							SET @wcxc = @wcxctaspac;
						END;
					END;
					
					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@wcxc;
									

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
									cod_cco,
									cod_cl1,
									cod_cl2,
									cod_cl3,
									cod_ter,
									deb_mov,cre_mov,des_mov,
									bas_mov,
									num_che,
									ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wcxc,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
								0,@ant_doc,@des_mov,
								CASE @i_bas WHEN 1 THEN @sub_doc ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				-- VENTA
				IF @dcta_ing <> '0'
				BEGIN
					SET @wven = @dcta_ing;
				END;

				EXEC sp_gen_trae_tasa_niif @wven,@fec_tas,@tasa OUTPUT,@ind_mp;

				SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter 
				FROM nif_puc 
				WHERE cod_cta=@wven;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
								cod_cco,
								cod_cl1,
								cod_cl2,
								cod_cl3,
								cod_ter,
								deb_mov,cre_mov,des_mov,
								bas_mov,
								num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wven,@cod_suc,
							CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
							CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
							CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
							CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
							CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
							0,@net_doc,@des_mov,
							CASE @i_bas WHEN 1 THEN @sub_doc ELSE 0 END,
							@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);

				SET @wreg=@wreg+1;

				SET @conteo2 = @conteo2 + 1;
			END;
		END;

		-- RECIBOS DE CAJA
		IF @tip_doc BETWEEN '040' AND '049'
		BEGIN
			INSERT INTO @docs(cod_suc,cod_cco,cod_cli,ind_con,cod_cl1,cod_cl2,cod_cl3,net_doc,val_iva,val_ret,val_doc,ant_doc,val_des,sub_doc,val_ica,
								ret_iva,men_val,may_val,val_int,mon_sum1,mon_sum2,mon_sum3,mon_sum4,mon_res1,mon_res2,mon_res3,mon_res4,base_aiu,cod_ica,cod_ret,
								ano_ref,per_ref,sub_ref,num_ref)
			SELECT cod_suc,cod_cco,cod_cli,ind_con,cod_cl1,cod_cl2,cod_cl3,SUM(net_doc),SUM(val_iva),SUM(val_ret),SUM(val_doc),
					SUM(ant_doc),SUM(val_des),SUM(sub_doc),SUM(val_ica),SUM(ret_iva),SUM(men_val),SUM(may_val),SUM(val_int),SUM(mon_sum1),
					SUM(mon_sum2),SUM(mon_sum3),SUM(mon_sum4),SUM(mon_res1),SUM(mon_res2),SUM(mon_res3),SUM(mon_res4),SUM(base_iva_aiu),cod_ica,cod_ret,
					ano_ref,per_ref,sub_ref,num_ref
			FROM cxc_cuedoc
			WHERE ano_doc=RTRIM(@ano_doc) 
					AND per_doc=RTRIM(@per_doc) 
					AND sub_tip=RTRIM(@sub_tip) 
					AND num_doc=RTRIM(@num_doc)
			GROUP BY cod_suc,cod_cco,cod_cli,ind_con,cod_cl1,cod_cl2,cod_cl3,cod_ica,cod_ret,ano_ref,per_ref,sub_ref,num_ref;

			SELECT @conteo1 = COUNT(1) FROM @docs;
			SET @conteo1 = ISNULL(@conteo1,0);

			SET @conteo2 = 1;

			SELECT @wreg=1;

			WHILE @conteo2 <= @conteo1
			BEGIN
				SELECT @cod_suc=cod_suc,@cod_cco=cod_cco,@cod_cli=cod_cli,@ind_con=ind_con,@cod_cl1=cod_cl1,@cod_cl2=cod_cl2,@cod_cl3=cod_cl3,@net_doc=net_doc,@val_iva=val_iva,
							@val_ret=val_ret,@val_doc=val_doc,@ant_doc=ant_doc,@val_des=val_des,@sub_doc=sub_doc,@val_ica=val_ica,@ret_iva=ret_iva,@men_val=men_val,@may_val=may_val,
							@val_int=val_int,@mon_sum1=mon_sum1,@mon_sum2=mon_sum2,@mon_sum3=mon_sum3,@mon_sum4=mon_sum4,@mon_res1=mon_res1,@mon_res2=mon_res2,@mon_res3=mon_res3,
							@mon_res4=mon_res4,@base_aiu=base_aiu,@cod_ica=cod_ica,@cod_ret=cod_ret,@ano_ref=ano_ref,@per_ref=per_ref,@sub_ref=sub_ref,@num_ref=num_ref
				FROM @docs
				WHERE recno=@conteo2;

				SET @net_doc=ROUND(@net_doc,@num_dec);
				SET @val_iva=ROUND(@val_iva,@num_dec);
				SET @val_ret=ROUND(@val_ret,@num_dec);
				SET @val_doc=ROUND(@val_doc,@num_dec);
				SET @ant_doc=ROUND(@ant_doc,@num_dec);
				SET @val_des=ROUND(@val_des,@num_dec);
				SET @sub_doc=ROUND(@sub_doc,@num_dec);
				SET @val_ica=ROUND(@val_ica,@num_dec);
				SET @ret_iva=ROUND(@ret_iva,@num_dec);
				SET @men_val=ROUND(@men_val,@num_dec);
				SET @may_val=ROUND(@may_val,@num_dec);
				SET @mon_sum1=ROUND(@mon_sum1,@num_dec);
				SET @mon_sum2=ROUND(@mon_sum2,@num_dec);
				SET @mon_sum3=ROUND(@mon_sum3,@num_dec);
				SET @mon_sum4=ROUND(@mon_sum4,@num_dec);
				SET @mon_res1=ROUND(@mon_res1,@num_dec);
				SET @mon_res2=ROUND(@mon_res2,@num_dec);
				SET @mon_res3=ROUND(@mon_res3,@num_dec);
				SET @mon_res4=ROUND(@mon_res4,@num_dec);
				SET @base_aiu=ROUND(@base_aiu,@num_dec);
				SET @val_int=ROUND(@val_int,@num_dec);

				SET @base_imp = CASE WHEN @base_aiu > 0 THEN @base_aiu ELSE @sub_doc END;

				SELECT @wcxc=CASE @ind_cxc WHEN 2 THEN n_wcxc ELSE @wcxc END
							,@n_wrivf=n_wivai,@wica_des=n_wicai,@wica_cob=n_icacn,@wret=n_wreti,@wiva=n_wivan,@wdes=n_wdesi
							,@wmen=n_wmemi,@wmay=n_wmayi,@wven=n_wsubi,@cta_int=ri_cta_int
							,@wcxctaspac=CASE @ind_cxc WHEN 2 THEN ncxc_taspac ELSE @wcxctaspac END
				FROM cxc_param_cnt 
				WHERE llave=@ind_con;

				SELECT @des_mov=det_doc 
				FROM cxc_cabdoc 
				WHERE ano_doc=@ano_doc 
						AND per_doc=@per_doc 
						AND sub_tip=@sub_tip 
						AND num_doc=@num_doc;

				SET @num_che=ISNULL(@num_che,'0');
				SET @bas_mov=ISNULL(@bas_mov,0);

				EXEC sp_gen_trae_tasa_niif @wcxc,@fec_tas,@tasa OUTPUT,@ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;

					IF @wcxctaspac <> '0'
					BEGIN
						SET @wcxc = @wcxctaspac;
					END;
				END;

				SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas,@ind_adc=ind_adc, @nat_cta = nat_cta, @cta_idc = cta_idc
							, @cta_gdc = cta_gdc    
				FROM nif_puc 
				WHERE cod_cta=@wcxc;

				--CUENTA POR COBRAR
				INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
								cod_cco,
								cod_cl1,
								cod_cl2,
								cod_cl3,
								cod_ter,deb_mov,cre_mov,des_mov,
								bas_mov,
								num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wcxc,@cod_suc,
							CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
							CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
							CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
							CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
							CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
							0,@val_doc,@des_mov,
							CASE @i_bas WHEN 1 THEN @sub_doc ELSE 0 END,
							@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
				SET @wreg=@wreg+1;

				-- DIFERENCIA EN CAMBIO
				IF RTRIM(@cta_idc) = ''
				BEGIN
					SET @cta_idc = '0'
				END;

				IF RTRIM(@cta_gdc) = ''
				BEGIN
					SET @cta_gdc = '0'
				END;

				IF @difcam_doc = 1 AND @ind_mp NOT IN ( '00','99') AND @tip_doc = '040' AND @ind_adc = 0
				BEGIN
					SELECT @tas_fac = tasa
					FROM cxc_cabdoc WITH (NOLOCK)
					WHERE num_doc = @num_ref
						AND sub_tip = @sub_ref
						AND per_doc = @per_ref
						AND ano_doc = @ano_ref; 

					SET @dif_tas = @tasa - @tas_fac;
					SET @valdifc = ROUND(ABS(@val_doc * @dif_tas),@num_dec);

					IF @dif_tas<0
					BEGIN
						IF @cta_gdc <> '0'
						BEGIN
							SELECT @cco_dif=ind_cco,@cl1_dif=ind_cl1,@cl2_dif=ind_cl2,@cl3_dif=ind_cl3,@ter_dif=ind_ter,@bas_dif=ind_bas
							FROM nif_puc 
							WHERE cod_cta=@cta_gdc;

							IF @nat_cta=1 
							BEGIN
								INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,
								cod_suc,
								cod_cco,
								cod_cl1,
								cod_cl2,
								cod_cl3,
								cod_ter,
								deb_mov,
								cre_mov,
								des_mov,
								bas_mov,
								num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas,ind_adc)
								VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wcxc,
								@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
								0,
								@valdifc,
								'AJUSTE POR DIFERENCIA EN CAMBIO',
								CASE @i_bas WHEN 1 THEN @sub_doc ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,1);
								SELECT @wreg=@wreg+1;

								INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,
								cod_suc,
								cod_cco,
								cod_cl1,
								cod_cl2,
								cod_cl3,
								cod_ter,
								deb_mov,
								cre_mov,
								des_mov,
								bas_mov,
								num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas,ind_adc)
								VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_gdc,
								@cod_suc,
								CASE @cco_dif WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @cl1_dif WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @cl2_dif WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @cl3_dif WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @ter_dif WHEN 1 THEN '0' ELSE @nit_cli END,
								@valdifc,
								0,
								'AJUSTE POR DIFERENCIA EN CAMBIO',
								CASE @bas_dif WHEN 1 THEN @sub_doc ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,1);
								SELECT @wreg=@wreg+1;
							END;
							ELSE
							BEGIN
								INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,
								cod_suc,
								cod_cco,
								cod_cl1,
								cod_cl2,
								cod_cl3,
								cod_ter,
								deb_mov,
								cre_mov,
								des_mov,
								bas_mov,
								num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas,ind_adc)
								VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wcxc,
								@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
								@valdifc,
								0,
								'AJUSTE POR DIFERENCIA EN CAMBIO',
								CASE @i_bas WHEN 1 THEN @sub_doc ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,1);
								SELECT @wreg=@wreg+1;

								INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,
								cod_suc,
								cod_cco,
								cod_cl1,
								cod_cl2,
								cod_cl3,
								cod_ter,
								deb_mov,
								cre_mov,
								des_mov,
								bas_mov,
								num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas,ind_adc)
								VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_gdc,
								@cod_suc,
								CASE @cco_dif WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @cl1_dif WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @cl2_dif WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @cl3_dif WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @ter_dif WHEN 1 THEN '0' ELSE @nit_cli END,
								0,
								@valdifc,
								'AJUSTE POR DIFERENCIA EN CAMBIO',
								CASE @bas_dif WHEN 1 THEN @sub_doc ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,1);
								SELECT @wreg=@wreg+1;
							END;
						END;
					END

					IF @dif_tas > 0
						BEGIN
							IF @cta_idc <> '0'
							BEGIN
								SELECT @cco_dif=ind_cco,@cl1_dif=ind_cl1,@cl2_dif=ind_cl2,@cl3_dif=ind_cl3,@ter_dif=ind_ter,@bas_dif=ind_bas
								FROM nif_puc 
								WHERE cod_cta=@cta_idc;

								IF @nat_cta = 1
								BEGIN
									INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,
									cod_suc,
									cod_cco,
									cod_cl1,
									cod_cl2,
									cod_cl3,
									cod_ter,
									deb_mov,
									cre_mov,
									des_mov,
									bas_mov,
									num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas,ind_adc)
									VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wcxc,
									@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
									@valdifc,
									0,
									'AJUSTE POR DIFERENCIA EN CAMBIO',
									CASE @i_bas WHEN 1 THEN @sub_doc ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,1);
									SELECT @wreg=@wreg+1;

									INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,
									cod_suc,
									cod_cco,
									cod_cl1,
									cod_cl2,
									cod_cl3,
									cod_ter,
									deb_mov,
									cre_mov,
									des_mov,
									bas_mov,
									num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas,ind_adc)
									VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_idc,
									@cod_suc,
									CASE @cco_dif WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @cl1_dif WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @cl2_dif WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @cl3_dif WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @ter_dif WHEN 1 THEN '0' ELSE @nit_cli END,
									0,
									@valdifc,
									'AJUSTE POR DIFERENCIA EN CAMBIO',
									CASE @bas_dif WHEN 1 THEN @sub_doc ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,1);
									SELECT @wreg=@wreg+1;
								END;
								ELSE
								BEGIN
									INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,
									cod_suc,
									cod_cco,
									cod_cl1,
									cod_cl2,
									cod_cl3,
									cod_ter,
									deb_mov,
									cre_mov,
									des_mov,
									bas_mov,
									num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas,ind_adc)
									VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wcxc,
									@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
									0,
									@valdifc,
									'AJUSTE POR DIFERENCIA EN CAMBIO',
									CASE @i_bas WHEN 1 THEN @sub_doc ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,1);
									SELECT @wreg=@wreg+1;

									INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,
									cod_suc,
									cod_cco,
									cod_cl1,
									cod_cl2,
									cod_cl3,
									cod_ter,
									deb_mov,
									cre_mov,
									des_mov,
									bas_mov,
									num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas,ind_adc)
									VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_idc,
									@cod_suc,
									CASE @cco_dif WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @cl1_dif WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @cl2_dif WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @cl3_dif WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @ter_dif WHEN 1 THEN '0' ELSE @nit_cli END,
									@valdifc,
									0,
									'AJUSTE POR DIFERENCIA EN CAMBIO',
									CASE @bas_dif WHEN 1 THEN @sub_doc ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,1);
									SELECT @wreg=@wreg+1;
								END;
							END;
						END;
				END;

				-- RETEIVA
				IF @ret_iva>0
				BEGIN
				IF @wind_tip=3
						SELECT @n_wrivf=n_ri_iva_des_sim FROM cxc_param_cnt WHERE llave=@ind_con;
					ELSE
						SELECT @n_wrivf=n_wivai FROM cxc_param_cnt WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @n_wrivf,@fec_tas,@tasa OUTPUT,@ind_mp;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas  
					FROM nif_puc 
					WHERE cod_cta=@n_wrivf;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
									cod_cco,
									cod_cl1,
									cod_cl2,
									cod_cl3,
									cod_ter,deb_mov,cre_mov,des_mov,
									bas_mov,
									num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@n_wrivf,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,@ret_iva,0,@des_mov,
								CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				-- ICA
				IF @val_ica>0
				BEGIN
					IF @ind_cta_ica = 2
						BEGIN
							SELECT @wica_cob=cta_nif_ven
							FROM gen_actividad
							WHERE cod_pai=@cod_pai 
								AND cod_dep=@cod_dep 
								AND cod_ciu=@cod_ciu 
								AND cod_act=@cod_ica;
						END;

					EXEC sp_gen_trae_tasa_niif @wica_cob,@fec_tas,@tasa OUTPUT,@ind_mp;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@wica_cob;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wica_cob,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,@val_ica,0,@des_mov,
								CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				-- RETENCION
				IF @val_ret>0
				BEGIN
					IF @ind_cta_ret = 2
					BEGIN
						SELECT @wret=ISNULL(cta_ret_ven_niif,'0'),@ant_ret=ISNULL(cta_aut_ret_niif,'0') 
						FROM gen_retencion 
						WHERE cod_ret=@cod_ret;
					END;

					EXEC sp_gen_trae_tasa_niif @wret,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@wret;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wret,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,@val_ret,0,@des_mov,
								CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				-- IVA
				IF @val_iva>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @wiva,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@wiva;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,deb_mov,cre_mov,des_mov,
										bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wiva,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,@val_iva,0,@des_mov,
								CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				-- DESCUENTO
				IF @val_des>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @wdes,@fec_tas,@tasa OUTPUT,@ind_mp;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@wdes;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wdes,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,@val_des,0,@des_mov,
								CASE @i_bas WHEN 1 THEN @sub_doc ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;
			
				-- CAJA/BANCO
				SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
				FROM nif_puc 
				WHERE cod_cta=@wven;

				EXEC sp_gen_trae_tasa_niif @wven,@fec_tas,@tasa OUTPUT,@ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
									cod_cco,
									cod_cl1,
									cod_cl2,
									cod_cl3,
									cod_ter,deb_mov,cre_mov,des_mov,
									bas_mov,
									num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wven,@cod_suc,
							CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
							CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
							CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
							CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
							CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,@val_doc-@val_des-@val_ret+@may_val-@men_val-@ret_iva-@val_ica,0,@des_mov,
							CASE @i_bas WHEN 1 THEN @sub_doc ELSE 0 END,
							@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
				SET @wreg=@wreg+1;

				-- MENOR VALOR
				IF @men_val>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @wmen,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@wmen;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
									cod_cco,
									cod_cl1,
									cod_cl2,
									cod_cl3,
									cod_ter,deb_mov,cre_mov,des_mov,
									bas_mov,
									num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wmen,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,@men_val,0,@des_mov,
								CASE @i_bas WHEN 1 THEN @sub_doc ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				-- MAYOR VALOR
				IF @may_val>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @wmay,@fec_tas,@tasa OUTPUT,@ind_mp;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@wmay;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
									cod_cco,
									cod_cl1,
									cod_cl2,
									cod_cl3,
									cod_ter,deb_mov,cre_mov,des_mov,
									bas_mov,
									num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wmay,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,0,@may_val,@des_mov,
								CASE @i_bas WHEN 1 THEN @sub_doc ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				-- INTERESES
				IF @val_int>0
				BEGIN
					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@cta_int;

					EXEC sp_gen_trae_tasa_niif @cta_int,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_int,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,0,@val_int,@des_mov,
								CASE @i_bas WHEN 1 THEN @sub_doc ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				--	IMPUESTOS ADICIONALES
				-- SUMA 1
				IF @mon_sum1>0
				BEGIN
					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@cta_sum1;

					EXEC sp_gen_trae_tasa_niif @cta_sum1,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,deb_mov,cre_mov,des_mov,
										bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_sum1,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,@mon_sum1,0,@des_mov,
								CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				-- SUMA 2
				IF @mon_sum2>0
				BEGIN
					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@cta_sum2;

					EXEC sp_gen_trae_tasa_niif @cta_sum2,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
									cod_cco,
									cod_cl1,
									cod_cl2,
									cod_cl3,
									cod_ter,deb_mov,cre_mov,des_mov,
									bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_sum2,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,@mon_sum2,0,@des_mov,
								CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				-- SUMA 3
				IF @mon_sum3>0
				BEGIN
					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@cta_sum3;

					EXEC sp_gen_trae_tasa_niif @cta_sum3,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,deb_mov,cre_mov,des_mov,
										bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_sum3,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,@mon_sum3,0,@des_mov,
								CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				-- SUMA 4
				IF @mon_sum4>0
				BEGIN
					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@cta_sum4;

					EXEC sp_gen_trae_tasa_niif @cta_sum4,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
									cod_cco,
									cod_cl1,
									cod_cl2,
									cod_cl3,
									cod_ter,deb_mov,cre_mov,des_mov,
									bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_sum4,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,@mon_sum4,0,@des_mov,
								CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END

				-- RESTA 1
				IF @mon_res1>0
				BEGIN
					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@cta_res1;

					EXEC sp_gen_trae_tasa_niif @cta_res1,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res1,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,@mon_res1,0,@des_mov,
								CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;
			
				-- RESTA 2
				IF @mon_res2>0
				BEGIN
					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@cta_res2;

					EXEC sp_gen_trae_tasa_niif @cta_res2,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res2,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,@mon_res2,0,@des_mov,
								CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;
			
				-- RESTA 3
				IF @mon_res3>0
				BEGIN
					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@cta_res3;

					EXEC sp_gen_trae_tasa_niif @cta_res3,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res3,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,@mon_res3,0,@des_mov,
								CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				-- RESTA 4
				IF @mon_res4>0
				BEGIN
					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@cta_res4;

					EXEC sp_gen_trae_tasa_niif @cta_res4,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res4,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,@mon_res4,0,@des_mov,
								CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				SET @conteo2 = @conteo2 + 1;
			END;
		END;

		-- NOTAS CREDITO
		IF @tip_doc BETWEEN '050' AND '059'
		BEGIN
			INSERT INTO @docs(cod_suc,cod_cco,cod_cli,ind_con,cod_cl1,cod_cl2,cod_cl3,net_doc,val_iva,val_ret,val_doc,ant_doc,val_des,sub_doc,val_ica,
								ret_iva,men_val,may_val,mon_sum1,mon_sum2,mon_sum3,mon_sum4,mon_res1,mon_res2,mon_res3,mon_res4,base_aiu,val_ctd,cod_ica,cod_ret)
			SELECT cod_suc,cod_cco,cod_cli,ind_con,cod_cl1,cod_cl2,cod_cl3,SUM(net_doc),SUM(val_iva),SUM(val_ret),SUM(val_doc),
					SUM(ant_doc),SUM(val_des),SUM(sub_doc),SUM(val_ica),SUM(ret_iva),SUM(men_val),SUM(may_val),SUM(mon_sum1),
					SUM(mon_sum2),SUM(mon_sum3),SUM(mon_sum4),SUM(mon_res1),SUM(mon_res2),SUM(mon_res3),SUM(mon_res4),SUM(base_iva_aiu),SUM(val_ctd),cod_ica,cod_ret
			FROM cxc_cuedoc
			WHERE ano_doc=RTRIM(@ano_doc) 
					AND per_doc=RTRIM(@per_doc) 
					AND sub_tip=RTRIM(@sub_tip) 
					AND num_doc=RTRIM(@num_doc)
			GROUP BY cod_suc,cod_cco,cod_cli,ind_con,cod_cl1,cod_cl2,cod_cl3,cod_ica,cod_ret;

			SELECT @conteo1 = COUNT(1) FROM @docs;
			SET @conteo1 = ISNULL(@conteo1,0);

			SET @conteo2 = 1;

			SELECT @wreg=1;

			WHILE @conteo2 <= @conteo1
			BEGIN
				SELECT @cod_suc=cod_suc,@cod_cco=cod_cco,@cod_cli=cod_cli,@ind_con=ind_con,@cod_cl1=cod_cl1,@cod_cl2=cod_cl2,@cod_cl3=cod_cl3,@net_doc=net_doc,@val_iva=val_iva,
							@val_ret=val_ret,@val_doc=val_doc,@ant_doc=ant_doc,@val_des=val_des,@sub_doc=sub_doc,@val_ica=val_ica,@ret_iva=ret_iva,@men_val=men_val,@may_val=may_val,
							@mon_sum1=mon_sum1,@mon_sum2=mon_sum2,@mon_sum3=mon_sum3,@mon_sum4=mon_sum4,@mon_res1=mon_res1,@mon_res2=mon_res2,@mon_res3=mon_res3,@mon_res4=mon_res4,
							@base_aiu=base_aiu,@val_ctd=val_ctd,@cod_ica=cod_ica,@cod_ret=cod_ret
				FROM @docs
				WHERE recno = @conteo2;

				SET @net_doc=ROUND(@net_doc,@num_dec);
				SET @val_iva=ROUND(@val_iva,@num_dec);
				SET @val_ret=ROUND(@val_ret,@num_dec);
				SET @val_doc=ROUND(@val_doc,@num_dec);
				SET @ant_doc=ROUND(@ant_doc,@num_dec);
				SET @val_des=ROUND(@val_des,@num_dec);
				SET @sub_doc=ROUND(@sub_doc,@num_dec);
				SET @val_ica=ROUND(@val_ica,@num_dec);
				SET @ret_iva=ROUND(@ret_iva,@num_dec);
				SET @men_val=ROUND(@men_val,@num_dec);
				SET @may_val=ROUND(@may_val,@num_dec);
				SET @mon_sum1=ROUND(@mon_sum1,@num_dec);
				SET @mon_sum2=ROUND(@mon_sum2,@num_dec);
				SET @mon_sum3=ROUND(@mon_sum3,@num_dec);
				SET @mon_sum4=ROUND(@mon_sum4,@num_dec);
				SET @mon_res1=ROUND(@mon_res1,@num_dec);
				SET @mon_res2=ROUND(@mon_res2,@num_dec);
				SET @mon_res3=ROUND(@mon_res3,@num_dec);
				SET @mon_res4=ROUND(@mon_res4,@num_dec);
				SET @base_aiu=ROUND(@base_aiu,@num_dec);
				SET @val_ctd=ROUND(@val_ctd,@num_dec);

				SELECT @wcxc=CASE @ind_cxc WHEN 2 THEN n_wcxc ELSE @wcxc END
							,@n_cta_igf=n_cta_igf,@n_cta_ccf=n_cta_ccf,@n_wrivf=n_wrivn,@wica_des=n_wican,@wica_cob=n_icacn
							,@wret=n_wretn,@ant_ret=n_wantf,@wiva=n_wivan,@wdes=n_wdesn,@wven=n_wvenn,@wmen=n_wmemi,@wmay=n_wmayi
							,@wcxctaspac=CASE @ind_cxc WHEN 2 THEN ncxc_taspac ELSE @wcxctaspac END
				FROM cxc_param_cnt 
				WHERE llave=@ind_con;

				SELECT @des_mov=det_doc 
				FROM cxc_cabdoc 
				WHERE ano_doc=@ano_doc 
					AND per_doc=@per_doc 
					AND sub_tip=@sub_tip 
					AND num_doc=@num_doc;
				SET @num_che=ISNULL(@num_che,'0');
				SET @bas_mov=ISNULL(@bas_mov,0);

				-- SE CONSULTAN CUENTAS PARA DISTRIBUCION POR CENTRO DE COSTO
				IF @niv_dist = 5
				BEGIN
					SELECT @dcta_ing = ncta_ing
					FROM cxc_distctas_escosto
					WHERE tip_mon = @ind_mp
						AND cod_suc = @cod_suc
						AND cod_cco = @cod_cco
						AND cod_cl1 = @cod_cl1
						AND cod_cl2 = @cod_cl2
						AND cod_cl3 = @cod_cl3;

					IF @@ROWCOUNT = 0
					BEGIN
						SET @dcta_ing = '0';
					END;
				END;
				ELSE
				BEGIN
					IF @niv_dist = 4
					BEGIN
						SELECT @dcta_ing = ncta_ing
						FROM cxc_distctas_escosto
						WHERE tip_mon = @ind_mp
							AND cod_suc = @cod_suc
							AND cod_cco = @cod_cco
							AND cod_cl1 = @cod_cl1
							AND cod_cl2 = @cod_cl2;

						IF @@ROWCOUNT = 0
						BEGIN
							SET @dcta_ing = '0';
						END;
					END;
					ELSE
					BEGIN
						IF @niv_dist = 3
						BEGIN
							SELECT @dcta_ing = ncta_ing
							FROM cxc_distctas_escosto
							WHERE tip_mon = @ind_mp
								AND cod_suc = @cod_suc
								AND cod_cco = @cod_cco
								AND cod_cl1 = @cod_cl1;

							IF @@ROWCOUNT = 0
							BEGIN
								SET @dcta_ing = '0';
							END;
						END;
						ELSE
						BEGIN
							IF @niv_dist = 2
							BEGIN
								SELECT @dcta_ing = ncta_ing
								FROM cxc_distctas_escosto
								WHERE tip_mon = @ind_mp
									AND cod_suc = @cod_suc
									AND cod_cco = @cod_cco;

								IF @@ROWCOUNT = 0
								BEGIN
									SET @dcta_ing = '0';
								END;
							END;
							ELSE
							BEGIN
								IF @niv_dist = 1
								BEGIN
									SELECT @dcta_ing = ncta_ing
									FROM cxc_distctas_escosto
									WHERE tip_mon = @ind_mp
										AND cod_suc = @cod_suc;

									IF @@ROWCOUNT = 0
									BEGIN
										SET @dcta_ing = '0';
									END;
								END;
								ELSE
								BEGIN
									SET @dcta_ing = '0';
								END;
							END;
						END;
					END;
				END;

				SET @base_imp = CASE WHEN @base_aiu > 0 THEN @base_aiu ELSE @sub_doc END;

				EXEC sp_gen_trae_tasa_niif @wcxc,@fec_tas,@tasa OUTPUT,@ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;

					IF @wcxctaspac <> '0'
					BEGIN
						SET @wcxc = @wcxctaspac;
					END;
				END;

				SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
				FROM nif_puc 
				WHERE cod_cta=@wcxc;

				--CUENTA POR COBRAR
				INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
									cod_cco,
									cod_cl1,
									cod_cl2,
									cod_cl3,
									cod_ter,deb_mov,cre_mov,des_mov,
									bas_mov,
									num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wcxc,@cod_suc,
							CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
							CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
							CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
							CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
							CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,0,@val_doc,@des_mov,
							CASE @i_bas WHEN 1 THEN @sub_doc ELSE 0 END,
							@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
				SET @wreg=@wreg+1;

				--	FINANCIACION
				SET @val_fin=0;
				IF @val_ctd <> @Val_doc AND @val_ctd < @Val_doc AND @val_ctd > 0
				BEGIN
					SET @val_fin=@Val_doc-@val_ctd;
				END;

				IF @val_fin>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @n_cta_igf,@fec_tas,@tasa OUTPUT,@ind_mp;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@n_cta_igf;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,
									bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc, @n_cta_igf, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,
								@cod_cl3, @nit_cli,  @val_fin,0, LEFT(RTRIM(@des_mov)+' (financiación)',60),@sub_doc,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);
					SET @wreg=@wreg+1;
				
					EXEC sp_gen_trae_tasa_niif @n_cta_ccf,@fec_tas,@tasa OUTPUT,@ind_mp;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@n_cta_ccf;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,
										bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc, @n_cta_ccf, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,
								@cod_cl3, @nit_cli,0,  @val_fin, LEFT(RTRIM(@des_mov)+' (financiación)',60),@bas_mov,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				-- RETEIVA
				IF @ret_iva>0
				BEGIN
					IF @wind_tip=3
						SELECT @n_wrivf=n_nc_iva_des_sim FROM cxc_param_cnt WHERE llave=@ind_con;
					ELSE
						SELECT @n_wrivf=n_wrivn FROM cxc_param_cnt WHERE llave=@ind_con;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@n_wrivf;

					EXEC sp_gen_trae_tasa_niif @n_wrivf,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@n_wrivf,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,0,@ret_iva,@des_mov,
								CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				-- ICA
				IF @val_ica>0
				BEGIN
					IF @wind_tip<>3
					BEGIN
						IF @ind_cta_ica = 2
						BEGIN
							SELECT @wica_des=cod_cta_ven
							FROM gen_actividad
							WHERE cod_pai=@cod_pai 
								AND cod_dep=@cod_dep 
								AND cod_ciu=@cod_ciu 
								AND cod_act=@cod_ica;
						END;

						EXEC sp_gen_trae_tasa_niif @wica_des,@fec_tas,@tasa OUTPUT,@ind_mp;
					
						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@wica_des;
					
						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,
										deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wica_des,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
									0,@val_ica,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;
					END;
					ELSE
					BEGIN
						IF @ind_cta_ica = 2
						BEGIN
							SELECT @wica_cob=cod_cta_ven
							FROM gen_actividad
							WHERE cod_pai=@cod_pai 
								AND cod_dep=@cod_dep 
								AND cod_ciu=@cod_ciu 
								AND cod_act=@cod_ica;
						END;

						EXEC sp_gen_trae_tasa_niif @wica_cob,@fec_tas,@tasa OUTPUT,@ind_mp;

						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@wica_cob;
					
						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,
										deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wica_cob,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
									@val_ica,0,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;
					END;
				END;

				-- RETENCION
				IF @val_ret>0
				BEGIN
					IF @ind_cta_ret = 2
					BEGIN
						SELECT @wret=ISNULL(cta_ret_ven_niif,'0'),@ant_ret=ISNULL(cta_aut_ret_niif,'0') 
						FROM gen_retencion 
						WHERE cod_ret=@cod_ret;
					END;

					-- AUTORRETENEDOR
					IF @ind_aut=1
					BEGIN
						EXEC sp_gen_trae_tasa_niif @wret,@fec_tas,@tasa OUTPUT,@ind_mp;

						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@wret;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wret,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,@val_ret,0,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;

						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@ant_ret;

						EXEC sp_gen_trae_tasa_niif @ant_ret,@fec_tas,@tasa OUTPUT,@ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
											cod_cco,
											cod_cl1,
											cod_cl2,
											cod_cl3,
											cod_ter,deb_mov,cre_mov,des_mov,
											bas_mov,
											num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@ant_ret,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,0,@val_ret,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;
					END;
					ELSE
					BEGIN
						EXEC sp_gen_trae_tasa_niif @wret,@fec_tas,@tasa OUTPUT,@ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@wret;

						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
											cod_cco,
											cod_cl1,
											cod_cl2,
											cod_cl3,
											cod_ter,deb_mov,cre_mov,des_mov,
											bas_mov,
											num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wret,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,0,@val_ret,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;
					END;
				END;

				-- IVA
				IF @val_iva>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @wiva,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@wiva;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
									cod_cco,
									cod_cl1,
									cod_cl2,
									cod_cl3,
									cod_ter,deb_mov,cre_mov,des_mov,
									bas_mov,
									num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wiva,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,@val_iva,0,@des_mov,
								CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				-- DESCUENTO
				IF @val_des>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @wdes,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@wdes;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wdes,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,0,@val_des,@des_mov,
								CASE @i_bas WHEN 1 THEN @sub_doc ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				-- VENTA
				IF @dcta_ing <> '0'
				BEGIN
					SET @wven = @dcta_ing;
				END;

				EXEC sp_gen_trae_tasa_niif @wven,@fec_tas,@tasa OUTPUT,@ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
				FROM nif_puc 
				WHERE cod_cta=@wven;

				INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
									cod_cco,
									cod_cl1,
									cod_cl2,
									cod_cl3,
									cod_ter,deb_mov,cre_mov,des_mov,
									bas_mov,
									num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wven,@cod_suc,
							CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
							CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
							CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
							CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
							CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,@net_doc,0,@des_mov,
							CASE @i_bas WHEN 1 THEN @sub_doc ELSE 0 END,
							@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
				SET @wreg=@wreg+1;

				-- MENOR VALOR
				IF @men_val>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @wmen,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@wmen;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wmen,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,@men_val,0,@des_mov,
								CASE @i_bas WHEN 1 THEN @sub_doc ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				-- MAYOR VALOR
				IF @may_val>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @wmay,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@wmay;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
									cod_cco,
									cod_cl1,
									cod_cl2,
									cod_cl3,
									cod_ter,deb_mov,cre_mov,des_mov,
									bas_mov,
									num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wmay,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,0,@may_val,@des_mov,
								CASE @i_bas WHEN 1 THEN @sub_doc ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				--	IMPUESTOS ADICIONALES
				--	SUMA 1
				IF @mon_sum1>0
				BEGIN
					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@cta_sum1;

					EXEC sp_gen_trae_tasa_niif @cta_sum1,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
									cod_cco,
									cod_cl1,
									cod_cl2,
									cod_cl3,
									cod_ter,deb_mov,cre_mov,des_mov,
									bas_mov,
									num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_sum1,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,@mon_sum1,0,@des_mov,
								CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				--	SUMA 2
				IF @mon_sum2>0
				BEGIN
					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@cta_sum2;

					EXEC sp_gen_trae_tasa_niif @cta_sum2,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_sum2,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,@mon_sum2,0,@des_mov,
								CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				--	SUMA 3
				IF @mon_sum3>0
				BEGIN
					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@cta_sum3;

					EXEC sp_gen_trae_tasa_niif @cta_sum3,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_sum3,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,@mon_sum3,0,@des_mov,
								CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				--	SUMA 4
				IF @mon_sum4>0
				BEGIN
					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@cta_sum4;

					EXEC sp_gen_trae_tasa_niif @cta_sum4,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
									cod_cco,
									cod_cl1,
									cod_cl2,
									cod_cl3,
									cod_ter,deb_mov,cre_mov,des_mov,
									bas_mov,
									num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_sum4,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,@mon_sum4,0,@des_mov,
								CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				-- RESTA 1
				IF @mon_res1>0
				BEGIN
					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@cta_res1;

					EXEC sp_gen_trae_tasa_niif @cta_res1,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res1,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,@mon_res1,0,@des_mov,
								CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@cta_autres1;

					EXEC sp_gen_trae_tasa_niif @cta_autres1,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_autres1,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,0,@mon_res1,@des_mov,
								CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
								@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				-- RESTA 2
				IF @mon_res2>0
				BEGIN
					-- AUTORRETENEDOR
					IF @ind_aut=1
					BEGIN
						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@cta_res2;

						EXEC sp_gen_trae_tasa_niif @cta_res2,@fec_tas,@tasa OUTPUT,@ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
											cod_cco,
											cod_cl1,
											cod_cl2,
											cod_cl3,
											cod_ter,deb_mov,cre_mov,des_mov,
											bas_mov,
											num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res2,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,@mon_res2,0,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;

						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@cta_autres2;

						EXEC sp_gen_trae_tasa_niif @cta_autres2,@fec_tas,@tasa OUTPUT,@ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_autres2,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,0,@mon_res2,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;
					END;
					ELSE
					BEGIN
						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@cta_res2;

						EXEC sp_gen_trae_tasa_niif @cta_res2,@fec_tas,@tasa OUTPUT,@ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
											cod_cco,
											cod_cl1,
											cod_cl2,
											cod_cl3,
											cod_ter,deb_mov,cre_mov,des_mov,
											bas_mov,
											num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res2,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,0,@mon_res2,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;
					END;
				END;

				-- RESTA 3
				IF @mon_res3>0
				BEGIN
					-- AUTORRETENEDOR
					IF @ind_aut=1
					BEGIN
						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@cta_res3;

						EXEC sp_gen_trae_tasa_niif @cta_res3,@fec_tas,@tasa OUTPUT,@ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
											cod_cco,
											cod_cl1,
											cod_cl2,
											cod_cl3,
											cod_ter,deb_mov,cre_mov,des_mov,
											bas_mov,
											num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res3,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,@mon_res3,0,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas, 0);
						SET @wreg=@wreg+1;

						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@cta_autres3;

						EXEC sp_gen_trae_tasa_niif @cta_autres3,@fec_tas,@tasa OUTPUT,@ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_autres3,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,0,@mon_res3,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;
					END;
					ELSE
					BEGIN
						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@cta_res3;

						EXEC sp_gen_trae_tasa_niif @cta_res3,@fec_tas,@tasa OUTPUT,@ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res3,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,0,@mon_res3,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;
					END;
				END;

				-- RESTA 4
				IF @mon_res4>0
				BEGIN
					-- AUTORRETENEDOR
					IF @ind_aut=1
					BEGIN
						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@cta_res4;

						EXEC sp_gen_trae_tasa_niif @cta_res4,@fec_tas,@tasa OUTPUT,@ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res4,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,@mon_res4,0,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;

						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@cta_autres4;

						EXEC sp_gen_trae_tasa_niif @cta_autres4,@fec_tas,@tasa OUTPUT,@ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,deb_mov,cre_mov,des_mov,
										bas_mov,
										num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_autres4,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,0,@mon_res4,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;
					END;
					ELSE
					BEGIN
						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@cta_res4;

						EXEC sp_gen_trae_tasa_niif @cta_res4,@fec_tas,@tasa OUTPUT,@ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
											cod_cco,
											cod_cl1,
											cod_cl2,
											cod_cl3,
											cod_ter,deb_mov,cre_mov,des_mov,
											bas_mov,
											num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res4,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,0,@mon_res4,@des_mov,
									CASE @i_bas WHEN 1 THEN @base_imp ELSE 0 END,
									@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
						SET @wreg=@wreg+1;
					END;
				END;

				SET @conteo2 = @conteo2 + 1;
			END;
		END;

		-- ANTICIPOS
		IF @tip_doc BETWEEN '060' AND '069'
		BEGIN
			INSERT INTO @docs(cod_suc,cod_cco,cod_cli,ind_con,cod_cl1,cod_cl2,cod_cl3,val_doc,may_val)
			SELECT cod_suc,cod_cco,cod_cli,ind_con,cod_cl1,cod_cl2,cod_cl3,SUM(val_doc),SUM(may_val) 
			FROM cxc_cuedoc
			WHERE ano_doc=RTRIM(@ano_doc) 
					AND per_doc=RTRIM(@per_doc) 
					AND sub_tip=RTRIM(@sub_tip) 
					AND num_doc=RTRIM(@num_doc)
			GROUP BY cod_suc,cod_cco,cod_cli,ind_con,cod_cl1,cod_cl2,cod_cl3;

			SELECT @conteo1=COUNT(1) FROM @docs;
			SET @conteo1 = ISNULL(@conteo1,0);

			SET @conteo2 = 1;

			SELECT @wreg=1;

			WHILE @conteo2 <= @conteo1
			BEGIN
				SELECT @cod_suc=cod_suc,@cod_cco=cod_cco,@cod_cli=cod_cli,@ind_con=ind_con,@cod_cl1=cod_cl1,@cod_cl2=cod_cl2,@cod_cl3=cod_cl3,@val_doc=val_doc,@may_val=may_val
				FROM @docs
				WHERE recno=@conteo2;
			
				SELECT @val_doc=ROUND(@val_doc,@num_dec);
				SELECT @may_val=ROUND(@may_val,@num_dec);

				SELECT @wban=n_wvena,@want=n_wanta,@wmay=n_wmayi
				FROM cxc_param_cnt 
				WHERE llave=@ind_con;

				SELECT @des_mov=det_doc 
				FROM cxc_cabdoc 
				WHERE ano_doc=@ano_doc 
					AND per_doc=@per_doc 
					AND sub_tip=@sub_tip 
					AND num_doc=@num_doc;

				SELECT @num_che=ISNULL(@num_che,'0');
				SELECT @bas_mov=ISNULL(@bas_mov,0);

				-- BANCOS
				SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter 
				FROM nif_puc 
				WHERE cod_cta=@wban;

				EXEC sp_gen_trae_tasa_niif @wban,@fec_tas,@tasa OUTPUT,@ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;
			
				SET @net_doc= @val_doc+@may_val;
				INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
									cod_cco,
									cod_cl1,
									cod_cl2,
									cod_cl3,
									cod_ter,
									deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wban,@cod_suc,
							CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
							CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
							CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
							CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
							CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
							@net_doc,0,@des_mov,@bas_mov,@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
				SET @wreg=@wreg+1;

				-- ANTICIPOS
				SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter FROM nif_puc WHERE cod_cta=@want;

				EXEC sp_gen_trae_tasa_niif @want,@fec_tas,@tasa OUTPUT,@ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
				cod_cco,
				cod_cl1,
				cod_cl2,
				cod_cl3,
				cod_ter,
				deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@want,@cod_suc,
							CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
							CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
							CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
							CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
							CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
							0,@val_doc,@des_mov,@bas_mov,@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
				SET @wreg=@wreg+1;
			
				--	MAYOR VALOR
				IF @may_val>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @wmay,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter 
					FROM nif_puc 
					WHERE cod_cta=@wmay;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
									cod_cco,
									cod_cl1,
									cod_cl2,
									cod_cl3,
									cod_ter,
									deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wmay,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
								0,@may_val,@des_mov,@bas_mov,@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;
			
				SET @conteo2 = @conteo2 + 1;
			END;
		END;

		-- CHEQUES POSFECHADOS
		IF @tip_doc = '070'
		BEGIN
			INSERT INTO @docs (cod_suc,cod_cco,cod_cli,ind_con,cod_cl1,cod_cl2,cod_cl3,num_che,val_doc)
			SELECT cod_suc,cod_cco,cod_cli,ind_con,cod_cl1,cod_cl2,cod_cl3,num_che,SUM(val_doc)
			FROM cxc_cuedoc
			WHERE ano_doc=RTRIM(@ano_doc) 
					AND per_doc=RTRIM(@per_doc) 
					AND sub_tip=RTRIM(@sub_tip) 
					AND num_doc=RTRIM(@num_doc)
			GROUP BY cod_suc,cod_cco,cod_cli,ind_con,cod_cl1,cod_cl2,cod_cl3,num_che;

			SELECT @conteo1 = COUNT(1) FROM @docs;
			SET @conteo1 = ISNULL(@conteo1,0);

			SET @conteo2 = 1;

			SELECT @wreg=1;
		
			WHILE @conteo2 <= @conteo1
			BEGIN
				SELECT @cod_suc=cod_suc,@cod_cco=cod_cco,@cod_cli=cod_cli,@ind_con=ind_con,@cod_cl1=cod_cl1,@cod_cl2=cod_cl2,@cod_cl3=cod_cl3,@num_che=num_che,@val_doc=val_doc
				FROM @docs
				WHERE recno = @conteo2;

				SELECT @val_doc=ROUND(@val_doc,@num_dec);

				SELECT @nwddc=n_wddd,@nwdcc=n_wdcd
				FROM cxc_param_cnt 
				WHERE llave=@ind_con;

				SELECT @des_mov=RTRIM(det_doc)+' '+@num_che 
				FROM cxc_cabdoc 
				WHERE ano_doc=@ano_doc 
					AND per_doc=@per_doc 
					AND sub_tip=@sub_tip 
					AND num_doc=@num_doc;

				SELECT @num_che=ISNULL(@num_che,'0');
				SELECT @bas_mov=ISNULL(@bas_mov,0);

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				EXEC sp_gen_trae_tasa_niif @nwddc,@fec_tas,@tasa OUTPUT,@ind_mp;

				SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter 
				FROM nif_puc 
				WHERE cod_cta=@nwddc;

				INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
									cod_cco,
									cod_cl1,
									cod_cl2,
									cod_cl3,
									cod_ter,
									deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@nwddc,@cod_suc,
							CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
							CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
							CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
							CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
							CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
							@val_doc,0,@des_mov,0,@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);

				SET @wreg=@wreg+1;

				EXEC sp_gen_trae_tasa_niif @nwdcc,@fec_tas,@tasa OUTPUT,@ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter 
				FROM nif_puc 
				WHERE cod_cta=@nwdcc;

				INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
									cod_cco,
									cod_cl1,
									cod_cl2,
									cod_cl3,
									cod_ter,
									deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@nwdcc,@cod_suc,
							CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
							CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
							CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
							CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
							CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
							0,@val_doc,@des_mov,0,@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
				SET @wreg=@wreg+1;
			
				SET @conteo2 = @conteo2 + 1;
			END;
		END;

		-- REVERSION DE CHEQUES POSFECHADOS
		IF @tip_doc = '071'
		BEGIN
			INSERT INTO @docs(cod_suc,cod_cco,cod_cli,ind_con,cod_cl1,cod_cl2,cod_cl3,num_che,val_doc)
			SELECT cod_suc,cod_cco,cod_cli,ind_con,cod_cl1,cod_cl2,cod_cl3,num_che,SUM(val_doc)
			FROM cxc_cuedoc
			WHERE ano_doc=RTRIM(@ano_doc) 
				AND per_doc=RTRIM(@per_doc) 
				AND sub_tip=RTRIM(@sub_tip) 
				AND num_doc=RTRIM(@num_doc)
			GROUP BY cod_suc,cod_cco,cod_cli,ind_con,cod_cl1,cod_cl2,cod_cl3,num_che;

			SELECT @conteo1 = COUNT(1) FROM @docs;
			SET @conteo1 = ISNULL(@conteo1,0);

			SET @conteo2 = 1;

			SELECT @wreg=1;
		
			WHILE @conteo2 <= @conteo1
			BEGIN
				SELECT @cod_suc=cod_suc,@cod_cco=cod_cco,@cod_cli=cod_cli,@ind_con=ind_con,@cod_cl1=cod_cl1,@cod_cl2=cod_cl2,@cod_cl3=cod_cl3,@num_che=num_che,@val_doc=val_doc
				FROM @docs
				WHERE recno=@conteo2;

				SELECT @val_doc=ROUND(@val_doc,@num_dec);

				SELECT @nwddc=n_wddd,@nwdcc=n_wdcd
				FROM cxc_param_cnt 
				WHERE llave=@ind_con;

				SELECT @des_mov=RTRIM(det_doc)+' '+@num_che 
				FROM cxc_cabdoc 
				WHERE ano_doc=@ano_doc 
					AND per_doc=@per_doc 
					AND sub_tip=@sub_tip 
					AND num_doc=@num_doc;

				SELECT @num_che=ISNULL(@num_che,'0');
				SELECT @bas_mov=ISNULL(@bas_mov,0);

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				EXEC sp_gen_trae_tasa_niif @nwddc,@fec_tas,@tasa OUTPUT,@ind_mp;

				SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter 
				FROM nif_puc 
				WHERE cod_cta=@nwddc;

				INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
								cod_cco,
								cod_cl1,
								cod_cl2,
								cod_cl3,
								cod_ter,
								deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@nwddc,@cod_suc,
							CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
							CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
							CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
							CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
							CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
							0,@val_doc,@des_mov,0,@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
				SET @wreg=@wreg+1;

				SELECT @nwdcc=n_wdcd FROM cxc_param_cnt WHERE llave=@ind_con;

				EXEC sp_gen_trae_tasa_niif @nwdcc,@fec_tas,@tasa OUTPUT,@ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter 
				FROM nif_puc 
				WHERE cod_cta=@nwdcc;

				INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
									cod_cco,
									cod_cl1,
									cod_cl2,
									cod_cl3,
									cod_ter,
									deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@nwdcc,@cod_suc,
							CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
							CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
							CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
							CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
							CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
							@val_doc,0,@des_mov,0,@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
				SET @wreg=@wreg+1;
				
				SET @conteo2 = @conteo2 + 1;
			END;
		END;

		--- Contabilizacion de la reversion de posfechados
		IF @tip_doc BETWEEN '040' AND '060'
		BEGIN
			INSERT INTO @docs (cod_suc,cod_cco,cod_cli,ind_con,cod_cl1,cod_cl2,cod_cl3,num_che,numche,net_doc)
			SELECT cod_suc,cod_cco,cod_cli,ind_con,cod_cl1,cod_cl2,cod_cl3,num_che,numche,SUM(net_doc)
			FROM cxc_cuedoc
			WHERE ano_doc=RTRIM(@ano_doc) 
				AND per_doc=RTRIM(@per_doc) 
				AND sub_tip=RTRIM(@sub_tip) 
				AND num_doc=RTRIM(@num_doc) 
				AND num_che NOT IN ('0') 
				AND numche NOT IN ('0') 
				AND num_che IS NOT NULL  
				AND numche IS NOT NULL 
			GROUP BY cod_suc,cod_cco,cod_cli,ind_con,cod_cl1,cod_cl2,cod_cl3,num_che,numche; 

			SELECT @conteo1 = COUNT(1) FROM @docs;
			SET @conteo1 = ISNULL(@conteo1,0);

			SET @conteo2 = 1;

			SET @wreg=1;

			WHILE @conteo2 <= @conteo1
			BEGIN
				SELECT @cod_suc=cod_suc,@cod_cco=cod_cco,@cod_cli=cod_cli,@ind_con=ind_con,@cod_cl1=cod_cl1,@cod_cl2=cod_cl2,@cod_cl3=cod_cl3,@num_che=num_che,@numche=numche,
				@net_doc=net_doc
				FROM @docs
				WHERE recno=@conteo2;

				IF @num_che IS NOT NULL AND @numche IS NOT NULL
				BEGIN
					SELECT @nwddc=n_wddd,@nwdcc=n_wdcd
					FROM cxc_param_cnt 
					WHERE llave=@ind_con;

					SELECT @des_mov=RTRIM(det_doc)+' cheque '+RTRIM(@num_che)+' posf. '+@numche 
					FROM cxc_cabdoc 
					WHERE ano_doc=@ano_doc 
							AND per_doc=@per_doc 
							AND sub_tip=@sub_tip 
							AND num_doc=@num_doc;

					SELECT @num_che=ISNULL(@num_che,'0');
					SELECT @bas_mov=ISNULL(@bas_mov,0);

					EXEC sp_gen_trae_tasa_niif @nwdcc,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter 
					FROM nif_puc 
					WHERE cod_cta=@nwdcc;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,
										deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@nwdcc,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
								@net_doc,0,@des_mov,0,@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;

					EXEC sp_gen_trae_tasa_niif @nwddc,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter 
					FROM cnt_puc 
					WHERE cod_cta=@nwddc;

					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
									cod_cco,
									cod_cl1,
									cod_cl2,
									cod_cl3,
									cod_ter,
									deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@nwddc,@cod_suc,
								CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
								CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @nit_cli END,
								0,@net_doc,@des_mov,0,@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;
				END;

				SET @conteo2 = @conteo2 + 1;
			END;
		END;

		--  VALIDAMOS EL CUADRE DEL DOCUMENTO
		SELECT @max_aju=max_aju,@aju_deb=aju_deb,@aju_cre=aju_cre, @aju_suc=aju_suc,@aju_cco=aju_cco,@aju_cl1=aju_cl1,@aju_cl2=aju_cl2,@aju_cl3=aju_cl3,@aju_ter=aju_ter
		FROM nif_cuadre_tipos 
		WHERE cod_tip=@tip_doc 
		AND tip_mon=@ind_mp;

		IF @@ROWCOUNT>0 AND ISNULL(@max_aju,0) <> 0
		BEGIN
			SELECT @tot_deb=SUM(deb_mov),@tot_cre=SUM(cre_mov),@max_reg=MAX(reg_doc) 
			FROM @cinfon 
			WHERE ano_doc=@ano_doc 
				AND per_doc=@per_doc 
				AND sub_tip=@sub_tip 
				AND num_doc=@num_doc;

			IF (@tot_deb-@tot_cre) BETWEEN @max_aju*-1 AND @max_aju AND @tot_deb<>@tot_cre
			BEGIN
				IF @tot_deb<@tot_cre
					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,
										ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,CONVERT(SMALLINT,@max_reg)+1),
								@fch_doc,@aju_deb,@aju_suc,@aju_cco,@aju_cl1,@aju_cl2,@aju_cl3,@aju_ter,ABS(@tot_deb-@tot_cre),0,
								'REGISTRO DE CUADRE X REDONDEO',0,'','','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
				ELSE
					INSERT INTO @cinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,
										ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,CONVERT(SMALLINT,@max_reg)+1),
								@fch_doc,@aju_cre,@aju_suc,@aju_cco,@aju_cl1,@aju_cl2,@aju_cl3,@aju_ter,0,ABS(@tot_deb-@tot_cre),
								'REGISTRO DE CUADRE X REDONDEO',0,'','','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
			END;
		END;

		-- insertamos registros agrupados sumatoria débitos
		INSERT INTO @cinfonF(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,
							deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
		SELECT ano_doc,per_doc,sub_tip,tip_doc,num_doc,0,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,
					SUM(deb_mov),SUM(cre_mov),des_mov,sum(bas_mov),num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc	
		FROM @cinfon
		WHERE deb_mov<>0
		GROUP BY ano_doc,per_doc,sub_tip,tip_doc,num_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,des_mov,num_che,
		ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc;

		-- insertamos registros agrupados sumatoria créditos
		INSERT INTO @cinfonF(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,
							deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc)
		SELECT ano_doc,per_doc,sub_tip,tip_doc,num_doc,0,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,
					SUM(deb_mov),SUM(cre_mov),des_mov,sum(bas_mov),num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc	
		FROM @cinfon
		WHERE cre_mov<>0
		GROUP BY ano_doc,per_doc,sub_tip,tip_doc,num_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,des_mov,num_che,
		ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas, ind_adc;
		
		INSERT INTO cxc_inf_nif(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,
						deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas,difcam_doc)
		SELECT ano_doc,per_doc,sub_tip,tip_doc,num_doc,LTRIM(RTRIM(CONVERT(CHAR,ROW_NUMBER() OVER (ORDER BY ind_adc)))),fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,
					deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas,ind_adc
		FROM @cinfonF
		ORDER BY ind_adc;

	END;
	RETURN (0);
END;

```
