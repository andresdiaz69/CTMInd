# Stored Procedure: sp_cxp_afecon_niif_usu

## Usa los objetos:
- [[C]]
- [[cxp_cabdoc]]
- [[cxp_cuedoc]]
- [[cxp_distctas_escosto]]
- [[Cxp_distriafe]]
- [[cxp_inf_nif]]
- [[cxp_param]]
- [[cxp_param_cnt]]
- [[cxp_provee]]
- [[gen_actividad]]
- [[gen_decapl]]
- [[gen_retencion]]
- [[gen_subtipodoc]]
- [[nif_cuadre_tipos]]
- [[nif_puc]]
- [[sis_aplicacion]]
- [[sp_cxp_reverprov]]
- [[sp_gen_trae_tasa_niif]]
- [[tes_cuedoc]]
- [[tes_param_cnt]]

```sql

/*PROCEDIMIENTO QUE REALIZA LA CONTABILIZACION NIIF DE LOS DOCUMENTOS DE PROVEEDORES
JSARMIENTO JULIO/2014 SRS: 2014-0203
SE ASIGNA LA CUENTA DE ICA DE ACUERDO A PARAMETRO GENERAL (PLANTILLA O ACTIVIDAD)
JSARMIENTO MARZO/2015 SRS: 2015-0165
SE AGREGA CUENTA PROVEEDOR, IMPUESTOS ADICIONALES PARA NIIF, SE MODIFICA LLAMADO A CAMPOS DE 
LA TABLA GEN_RETENCION PARA QUE EN EL MOMENTO DE LA AFECTACION CONTABLE LLAME LA NIIF Y NO LA 
LOCAL GJPULIDO SRS NO. 2015-0499
SE ADICIONA INSTRUCCION PARA QUE VALIDE SI LA CUENTA CONTABLE UTILIZA O NO TERCERO SRS No. 2015-0722
SI NO HAY DISTRIBUCION DE GASTOS SE ASIGNA LAS CUENTAS DE LA PLANTILLA
JSARMIENTO NOVIEMBRE/2016 SPR2016-0012
AYVEGA ENERO/2017 SRS2017-0056
SE AGREGA EN LA INSERCION DE INFORMACION CONTABLE LA BASE PARA IVA NO GRAVADO Y GASTO CUANDO LA DISTRIBUCION CONTABLE ES DIFERENTE A CERO
JSARMIENTO AGOSTO/2017 SRS2017-0716
SE AGREGA AJUSTE POR DIFERENCIA EN CAMBIO PARA LAS CUENTAS EN MONEDA EXTRANJERA DE ACUERDO A INDICADOR DE PARAMETROS GENERALES
JSARMIENTO DICIEMBRE/2017 SNR2017-0239
SE CORRIGE LA VALIDACION DE EXISTENCIA DEL DOCUMENTO EN EL INF_NIF PARA QUE SEA POR SUBTIPO
AYVEGA ENER/2018 SRS2018-0044
SE AGREGA LA CONTABILIZACION DE TASA PACTADA EN LOS DOCUMENTOS DE CXP
SE ELIMINA LA VARIABLE @bas_mov YA QUE NO SE ASIGNA EN EL PROCESAMIENTO DE INFORMACION
JSARMIENTO ENERO/2018 SPA2017-0120
AYVEGA AGOSTO/2018 SNR2018-0147 SE AGREGA PROCEDIMIENTO PARA CONTABILIZACION DE USUARIO*/
CREATE PROCEDURE [dbo].[sp_cxp_afecon_niif_usu]
	@ano_doc	CHAR(4),
	@per_doc	CHAR(2),
	@sub_tip	CHAR(5),
	@num_doc	CHAR(14),
	@cod_pro	CHAR(15),
	@fch_doc	DATETIME

AS
BEGIN
	-- DOCUMENTOS
	DECLARE @wind_tip		SMALLINT;
	DECLARE @wcxp			CHAR(16);
	DECLARE @wreg			SMALLINT;
	DECLARE @val_val		MONEY;
	DECLARE @val_doc		MONEY;
	DECLARE @val_ret		MONEY;
	DECLARE @val_des		MONEY;
	DECLARE @val_iva		MONEY;
	DECLARE @val_ica		MONEY;
	DECLARE @sub_doc		MONEY;
	DECLARE @net_doc		MONEY;
	DECLARE @ret_iva		MONEY;
	DECLARE @ant_doc		MONEY;
	DECLARE @val_tim		MONEY;
	DECLARE @des_mov		CHAR(70);
	DECLARE @num_che		CHAR(10);
	DECLARE @cod_suc		CHAR(3);
	DECLARE @cod_cco		CHAR(10);
	DECLARE @cod_cl1		CHAR(12);
	DECLARE @cod_cl2		CHAR(12);
	DECLARE @cod_cl3		CHAR(12);
	DECLARE @men_val		MONEY;
	DECLARE @may_val		MONEY;
	DECLARE @bas_rti		MONEY;
	DECLARE @bas_rii		MONEY;
	DECLARE @ret_riv_ng		MONEY;
	DECLARE @tot_ant		MONEY;
	DECLARE @mon_sum1		MONEY;
	DECLARE @mon_sum2		MONEY;
	DECLARE @mon_sum3		MONEY;
	DECLARE @mon_sum4		MONEY;
	DECLARE @mon_res1		MONEY;
	DECLARE @mon_res2		MONEY;
	DECLARE @mon_res3		MONEY;
	DECLARE @mon_res4		MONEY;
	DECLARE @base_aiu		MONEY;
	DECLARE @base_cnt		MONEY;	-- ALMACENA LA BASE DE AIU SI ES MAYOR A CERO, DE LO CONTRARIO ALMACENA EL SUBTOTAL
	DECLARE @val_ctd		MONEY;
	DECLARE @val_fin		MONEY;

	-- Variables para afectacion contable distribuida
	DECLARE @acod_suc		CHAR(3);
	DECLARE @acod_cco		CHAR(10);
	DECLARE @acod_cl1		CHAR(12);
	DECLARE @acod_cl2		CHAR(12);
	DECLARE @acod_cl3		CHAR(12);
	DECLARE @aNet_doc		MONEY;
	DECLARE @ind_con		CHAR(5);
	DECLARE @ind_afe		CHAR(3);
	DECLARE @wdes			CHAR(16);
	DECLARE @wret			CHAR(16);
	DECLARE @wiva			CHAR(16);
	DECLARE @wica			CHAR(16);
	DECLARE @wriv			CHAR(16);
	DECLARE @wven			CHAR(16);
	DECLARE @want			CHAR(16);
	DECLARE @wban			CHAR(16);
	DECLARE @wddc			CHAR(16);
	DECLARE @wdcc			CHAR(16);
	DECLARE @facop			CHAR(16);
	DECLARE @facuo			CHAR(16);
	DECLARE @n_fa_tim		CHAR(16);
	DECLARE @nit_pro		CHAR(15);
	DECLARE @ind_cxp		SMALLINT;
	DECLARE @ind_ter		SMALLINT;
	DECLARE @por_iva		MONEY;
	DECLARE @wmen			CHAR(16);
	DECLARE @wmay			CHAR(16);
	DECLARE @base			MONEY;
	DECLARE	@tip_doc		CHAR(3);
	DECLARE @ind_ctaret		TINYINT;
	DECLARE @tip_ret		CHAR(3);
	DECLARE @val_iva_ng		MONEY;
	DECLARE @wivang			CHAR(16);
	DECLARE @wriv_ng		CHAR(16);
	DECLARE @ind_ctaant		TINYINT;
	DECLARE @n_cta_cpf		CHAR(16);
	DECLARE @n_cta_gfi		CHAR(16);

	--VARIABLES BIMONEDA
	DECLARE @ind_mp			CHAR(2);
	DECLARE @fec_tas		DATETIME;
	DECLARE @tasa			MONEY;
	DECLARE @tasa_doc		MONEY;
	DECLARE @ind_tas		CHAR(1);

	--VARIABLES CUADRE DE DOCUMENTO
	DECLARE @tot_deb		MONEY;
	DECLARE @tot_cre		MONEY;
	DECLARE @ind_aju		BIT;
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

	-- VARIABLES DE CONTROL
	DECLARE @pre_fac		SMALLINT;
	DECLARE @conta5			INT;
	DECLARE @conta6			INT;
	DECLARE @conta7			INT;
	DECLARE @gas_dist		MONEY;
	DECLARE @conta8			INT;
	DECLARE @conta9			INT;
	DECLARE @apl_ori		CHAR(3);
	DECLARE @conta10		INT;
	DECLARE @conta11		INT;

	--REDONDEO DE DECIMALES
	DECLARE @num_dec		SMALLINT;

	DECLARE @afecon_p TABLE(cod_pro		CHAR(15) COLLATE DATABASE_DEFAULT,
										cod_suc			CHAR(3) COLLATE DATABASE_DEFAULT,
										cod_cco			CHAR(10) COLLATE DATABASE_DEFAULT,
										ind_con			CHAR(3) COLLATE DATABASE_DEFAULT,
										cod_cl1			VARCHAR(12) COLLATE DATABASE_DEFAULT,
										cod_cl2			VARCHAR(12) COLLATE DATABASE_DEFAULT,
										cod_cl3			VARCHAR(12) COLLATE DATABASE_DEFAULT,
										ind_afe			CHAR(3) COLLATE DATABASE_DEFAULT,
										tip_ret			CHAR(3) COLLATE DATABASE_DEFAULT,
										por_iva			MONEY,
										net_doc			MONEY,
										val_iva			MONEY,
										val_ret			MONEY,
										val_doc			MONEY,
										ant_doc			MONEY,
										val_des			MONEY,
										sub_doc			MONEY,
										val_ica			MONEY,
										ret_iva			MONEY,
										val_tim			MONEY,
										may_val			MONEY,
										men_val			MONEY,
										val_iva_ng		MONEY,
										bas_rti			MONEY,
										bas_rii			MONEY,
										ret_riv_ng		MONEY,
										mon_sum1		MONEY,
										mon_sum2		MONEY,
										mon_sum3		MONEY,
										mon_sum4		MONEY,
										mon_res1		MONEY,
										mon_res2		MONEY,
										mon_res3		MONEY,
										mon_res4		MONEY,
										base_iva_aiu	MONEY,
										val_ctd			MONEY,
										cod_ica			VARCHAR(10) COLLATE DATABASE_DEFAULT,
										ind_adc			SMALLINT,
										ano_ref			CHAR(4) COLLATE DATABASE_DEFAULT,
										per_ref			CHAR(2) COLLATE DATABASE_DEFAULT,
										sub_ref			CHAR(5) COLLATE DATABASE_DEFAULT,
										num_ref			CHAR(14) COLLATE DATABASE_DEFAULT,
										recno			INT IDENTITY);
                          
	CREATE
	TABLE	#t_afecon_p(recno	INT IDENTITY(1,1),
								Cod_cta		CHAR(16) COLLATE DATABASE_DEFAULT NULL,
								Cod_suc		CHAR(3) COLLATE DATABASE_DEFAULT NULL, 
								Cod_cco		CHAR(10) COLLATE DATABASE_DEFAULT NULL, 
								Cod_cl1		VARCHAR(12) COLLATE DATABASE_DEFAULT NULL, 
								Cod_cl2		VARCHAR(12) COLLATE DATABASE_DEFAULT NULL, 
								Cod_cl3		VARCHAR(12) COLLATE DATABASE_DEFAULT NULL, 
								valor		MONEY NULL,
								base		MONEY NULL);

	CREATE
	TABLE	#t_afecon_ng(recno		INT IDENTITY(1,1),
									Cod_cta		CHAR(16) COLLATE DATABASE_DEFAULT NULL,
									Cod_suc		CHAR(3) COLLATE DATABASE_DEFAULT NULL, 
									Cod_cco		CHAR(10) COLLATE DATABASE_DEFAULT NULL, 
									Cod_cl1		VARCHAR(12) COLLATE DATABASE_DEFAULT NULL, 
									Cod_cl2		VARCHAR(12) COLLATE DATABASE_DEFAULT NULL, 
									Cod_cl3		VARCHAR(12) COLLATE DATABASE_DEFAULT NULL, 
									valor		MONEY NULL,
									base		MONEY NULL);

	DECLARE @afecon_ant TABLE(cod_suc		CHAR(3) COLLATE DATABASE_DEFAULT,
											cod_cco		CHAR(10) COLLATE DATABASE_DEFAULT,
											ind_con		CHAR(3) COLLATE DATABASE_DEFAULT,
											cod_cl1		VARCHAR(12) COLLATE DATABASE_DEFAULT,
											cod_cl2		VARCHAR(12) COLLATE DATABASE_DEFAULT,
											cod_cl3		VARCHAR(12) COLLATE DATABASE_DEFAULT,
											ant_doc		MONEY,
											recno		INT IDENTITY);

	--	SRS: 2015-0165
	DECLARE @cod_ica			VARCHAR(10);
	DECLARE @ind_cta_ica		TINYINT;
	DECLARE @cod_pai			CHAR(3);
	DECLARE @cod_dep			CHAR(2);
	DECLARE @cod_ciu			CHAR(5);

	--	SPR2016-0012
	DECLARE @dcta_gas			CHAR(16);
	DECLARE @dcta_ivang			CHAR(16);

	-- SNR2016-0056
	DECLARE @niv_dist			TINYINT;

	-- SRS2017-0716
	DECLARE @base_dist			MONEY;
	DECLARE @aBase_doc			MONEY;

	-- SNR2017-0239
	DECLARE @difcam_doc			BIT;
	DECLARE @ano_ref			CHAR(4);
	DECLARE @per_ref			CHAR(2);
	DECLARE @sub_ref			CHAR(5);
	DECLARE @num_ref			CHAR(14);
	DECLARE @ind_adc			SMALLINT;
	DECLARE @nat_cta			SMALLINT;
	DECLARE @cta_idc			CHAR(16);
	DECLARE @cta_gdc			CHAR(16);
	DECLARE @tas_fac			MONEY;
	DECLARE @dif_tas			MONEY;
	DECLARE @valdifc			MONEY;

	--	SPA2017-0120
	DECLARE @cta_taspac		CHAR(16);
	DECLARE @cta_sum1		CHAR(16);
	DECLARE @cta_sum2		CHAR(16);
	DECLARE @cta_sum3		CHAR(16);
	DECLARE @cta_sum4		CHAR(16);
	DECLARE @cta_res1		CHAR(16);
	DECLARE @cta_res2		CHAR(16);
	DECLARE @cta_res3		CHAR(16);
	DECLARE @cta_res4		CHAR(16);

	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	SET @num_dec=ISNULL(@num_dec,0);

	SET @pre_fac=0;

	SELECT @tip_doc=cod_tip 
	FROM gen_subtipodoc 
	WHERE cod_sub=@sub_tip;

	IF EXISTS(SELECT ind_tra 
					FROM cxp_inf_nif 
					WHERE ano_doc=@ano_doc AND per_doc=@per_doc AND sub_tip=@sub_tip AND num_doc=@num_doc AND ind_tra='X')
	BEGIN
		RETURN;
	END;
	ELSE
	BEGIN
		DELETE FROM cxp_inf_nif 
		WHERE ano_doc=@ano_doc 
			AND per_doc=@per_doc 
			AND sub_tip=@sub_tip 
			AND num_doc=@num_doc;
	END;

	-- Creación de tabla temporal con la misma estructura de Cxp_inf_nif
	SELECT *
		INTO #Cxp_inf_nif 
	FROM Cxp_inf_nif 
	WHERE ano_doc='??' 
		AND Per_doc='??' 
		AND sub_tip='??' 
		AND Num_doc='??';

	SELECT @wind_tip=tip_pro,@wcxp=cod_cta_niif, @nit_pro=nce, @cta_taspac = ncta_taspac, @cta_sum1=cta_imp_sum1_niif, @cta_sum2=cta_imp_sum2_niif , @cta_sum3=cta_imp_sum3_niif, @cta_sum4=cta_imp_sum4_niif
				, @cta_res1=cta_imp_res1_niif, @cta_res2=cta_imp_res2_niif , @cta_res3=cta_imp_res3_niif, @cta_res4=cta_imp_res4_niif
	FROM cxp_provee 
	WHERE provee=@cod_pro;

	SET @nit_pro=ISNULL(@nit_pro,@cod_pro);

	SELECT @ind_cxp=ind_cxp, @ind_ter=ind_ter,@ind_ctaret=ind_cta_ret,@ind_ctaant=ind_cta_ant,@ind_cta_ica=ind_cta_ica, @niv_dist = niv_asig_dist, @difcam_doc = difcam_doc  
	FROM cxp_param 
	WHERE cod_par='0';

	IF @ind_ter=1
	BEGIN
		SET @nit_pro=@cod_pro;
	END;

	SELECT @ind_mp=ind_mp, @fec_tas=fec_tas, @tasa_doc=tasa, @ind_tas=ind_tas,@apl_ori=apl_ori,@cod_pai=cod_pai,@cod_dep=cod_dep,@cod_ciu=cod_ciu,@des_mov=det_doc
				,@num_che=num_che
	FROM cxp_cabdoc 
	WHERE ano_doc=@ano_doc 
		AND per_doc=@per_doc 
		AND sub_tip=@sub_tip 
		AND num_doc=@num_doc;

	--	SI NO TIENE TES NOVASOFT DEJAMOS EL INDICADOR DE CTA DE ANTICIPO EN 1
	IF (SELECT ind_ins FROM sis_aplicacion WHERE cod_apl='TES')=0
	BEGIN
		SET @ind_ctaant=1;
	END;

	DELETE FROM @afecon_p;

	--	TRAEMOS NUMERO DE DECIMALES PARA REDONDEAR LOS VALORES ANTES DE SUBIRLOS A CONTABILIDAD DE LA TABLA gen_decapl
	--	SI NO SE HA DEFINIDO DECIMALES LO DEJAMOS EN 2
	--	JCESARS		ABRIL/2010
	SELECT @num_dec=dec_int 
	FROM gen_decapl 
	WHERE cod_apl='CXP' 
		AND tip_mon=@ind_mp;

	SET @num_dec=ISNULL(@num_dec,2);

	SELECT @val_val=SUM(val_doc) 
	FROM cxp_cuedoc 
	WHERE ano_doc=@ano_doc 
		AND per_doc=@per_doc 
		AND sub_tip=@sub_tip 
		AND num_doc=@num_doc;

	IF @val_val>0
	BEGIN
		-- DOCUMENTOS CREDITO
		IF @tip_doc BETWEEN '110' AND '139'
		BEGIN
			SELECT @pre_fac=COUNT(1),@tot_ant=SUM(ant_doc) 
			FROM cxp_cuedoc 
			WHERE ano_doc=@ano_doc 
				AND per_doc=@per_doc 
				AND sub_tip=@sub_tip 
				AND num_doc=@num_doc 
				AND pre_fac IS NOT NULL 
				AND pre_fac<>'' 
				AND pre_fac<>'0';

			SET @pre_fac=ISNULL(@pre_fac,0);

			INSERT INTO @afecon_p(cod_pro,cod_suc,cod_cco,ind_con,cod_cl1,cod_cl2,cod_cl3,ind_afe,tip_ret,por_iva,net_doc,val_iva,
							val_ret,val_doc,ant_doc,val_des,sub_doc,val_ica,ret_iva,val_tim,val_iva_ng,bas_rii,bas_rti,ret_riv_ng,mon_sum1,mon_sum2,mon_sum3,mon_sum4,
							mon_res1,mon_res2,mon_res3,mon_res4,base_iva_aiu,val_ctd,cod_ica)
			SELECT cod_pro,cod_suc,cod_cco,ind_con,cod_cl1,cod_cl2,cod_cl3,Ind_afe,tip_ret,por_iva,SUM(net_doc),SUM(val_iva),
					SUM(val_ret),SUM(val_doc),SUM(ant_doc),SUM(val_des),SUM(sub_doc),SUM(val_ica),SUM(ret_iva),SUM(val_tim),SUM(val_iva_ng),SUM(bas_rii),SUM(bas_rti),SUM(ret_riv_ng),
					SUM(mon_sum1),SUM(mon_sum2),SUM(mon_sum3),SUM(mon_sum4),SUM(mon_res1),SUM(mon_res2),SUM(mon_res3),SUM(mon_res4),SUM(base_iva_aiu),SUM(val_ctd),cod_ica
			FROM cxp_cuedoc WITH (NOLOCK)
			WHERE ano_doc=RTRIM(@ano_doc) 
				AND per_doc=RTRIM(@per_doc) 
				AND sub_tip=RTRIM(@sub_tip) 
				AND num_doc=RTRIM(@num_doc)
			GROUP BY cod_suc,cod_cco,cod_pro,ind_con,cod_cl1,cod_cl2,cod_cl3, Ind_afe,por_iva,tip_ret,cod_ica;

			SET @conta5=1;
			SELECT @conta6=ISNULL(COUNT(1),0) 
			FROM @afecon_p;

			SET @wreg=1;

			WHILE @conta5<=@conta6
			BEGIN
				SELECT @cod_pro=cod_pro,@cod_suc=cod_suc,@cod_cco=cod_cco,@ind_con=ind_con,@cod_cl1=cod_cl1,@cod_cl2=cod_cl2,@cod_cl3=cod_cl3,@ind_afe=ind_afe,
							@por_iva=por_iva,@net_doc=net_doc,@val_iva=val_iva,@val_ret=val_ret,@val_doc=val_doc,@ant_doc=ant_doc,@val_des=val_des,@sub_doc=sub_doc,
							@val_ica=val_ica,@ret_iva=ret_iva,@val_tim=val_tim,@tip_ret=tip_ret,@val_iva_ng=val_iva_ng,@bas_rii=bas_rii,@bas_rti=bas_rti,@ret_riv_ng=ret_riv_ng,
							@mon_sum1=mon_sum1,@mon_sum2=mon_sum2,@mon_sum3=mon_sum3,@mon_sum4=mon_sum4,@mon_res1=mon_res1,@mon_res2=mon_res2,@mon_res3=mon_res3
							,@mon_res4=mon_res4,@base_aiu=base_iva_aiu,@val_ctd=val_ctd,@cod_ica=cod_ica
				FROM @afecon_p
				WHERE recno=@conta5;

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
				SET @val_iva_ng=ROUND(@val_iva_ng,@num_dec);
				SET @bas_rii=ROUND(@bas_rii,@num_dec);
				SET @bas_rti=ROUND(@bas_rti,@num_dec);
				SET @ret_riv_ng=ROUND(@ret_riv_ng,@num_dec);
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

				-- SE CONSULTAN CUENTAS PARA DISTRIBUCION POR CENTRO DE COSTO 
				IF @niv_dist = 5
				BEGIN
					SELECT @dcta_gas = n_cta_gas, @dcta_ivang = n_cta_ivang
					FROM  cxp_distctas_escosto
					WHERE tip_mon = @ind_mp
						AND cod_suc = @cod_suc
						AND cod_cco = @cod_cco
						AND cod_cl1 = @cod_cl1
						AND cod_cl2 = @cod_cl2
						AND cod_cl3 = @cod_cl3;

					IF @@ROWCOUNT = 0
					BEGIN
						SET @dcta_gas = '0';
						SET @dcta_ivang = '0';
					END;
				END;
				ELSE
				BEGIN
					IF @niv_dist = 4
					BEGIN
						SELECT @dcta_gas = n_cta_gas, @dcta_ivang = n_cta_ivang
						FROM  cxp_distctas_escosto
						WHERE tip_mon = @ind_mp
							AND cod_suc = @cod_suc
							AND cod_cco = @cod_cco
							AND cod_cl1 = @cod_cl1
							AND cod_cl2 = @cod_cl2;

						IF @@ROWCOUNT = 0
						BEGIN
							SET @dcta_gas = '0';
							SET @dcta_ivang = '0';
						END;
					END;
					ELSE
					BEGIN
						IF @niv_dist = 3
						BEGIN
							SELECT @dcta_gas = n_cta_gas, @dcta_ivang = n_cta_ivang
							FROM  cxp_distctas_escosto
							WHERE tip_mon = @ind_mp
								AND cod_suc = @cod_suc
								AND cod_cco = @cod_cco
								AND cod_cl1 = @cod_cl1;

							IF @@ROWCOUNT = 0
							BEGIN
								SET @dcta_gas = '0';
								SET @dcta_ivang = '0';
							END;
						END;
						ELSE
						BEGIN
							IF @niv_dist = 2
							BEGIN
								SELECT @dcta_gas = n_cta_gas, @dcta_ivang = n_cta_ivang
								FROM  cxp_distctas_escosto
								WHERE tip_mon = @ind_mp
									AND cod_suc = @cod_suc
									AND cod_cco = @cod_cco;

								IF @@ROWCOUNT = 0
								BEGIN
									SET @dcta_gas = '0';
									SET @dcta_ivang = '0';
								END;
							END;
							ELSE
							BEGIN
								IF @niv_dist = 1
								BEGIN
									SELECT @dcta_gas = n_cta_gas, @dcta_ivang = n_cta_ivang
									FROM  cxp_distctas_escosto
									WHERE tip_mon = @ind_mp
										AND cod_suc = @cod_suc;

									IF @@ROWCOUNT = 0
									BEGIN
										SET @dcta_gas = '0';
										SET @dcta_ivang = '0';
									END;
								END;
								ELSE
								BEGIN
									SET @dcta_gas = '0';
									SET @dcta_ivang = '0';
								END;
							END;
						END;
					END;
				END;

				IF @base_aiu > 0
				BEGIN
					SET @base_cnt = @base_aiu;
				END;
				ELSE
				BEGIN
					SET @base_cnt = @sub_doc;
				END;
			
				SET @num_che=ISNULL(@num_che,'0');

				IF @ind_cxp=2 AND @apl_ori='CXP'
				BEGIN
					SELECT @wcxp=n_wcxp, @cta_taspac=cxp_taspac 
					FROM cxp_param_cnt 
					WHERE llave=@ind_con;
				END;

				EXEC sp_gen_trae_tasa_niif @wcxp, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;

					IF @cta_taspac <> '0'
					BEGIN
						SET @wcxp=@cta_taspac;
					END;
				END;

				-- FINANCIACION
				SET @val_fin = 0;

				IF @val_ctd <> @net_doc AND @val_ctd < @net_doc AND @val_ctd > 0
				BEGIN
					SET @val_fin=@net_doc-@val_ctd-@val_des;
				END;

				SET @net_doc = @net_doc - @val_fin;
				SET @Val_doc = @Val_doc - @val_fin;

				--CUENTA POR PAGAR
				IF @Val_doc>0
				BEGIN
					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, 
									cod_cl2, cod_cl3, cod_ter, deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc, @wcxp, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,
								@cod_cl3, @nit_pro, 0, @Val_doc, LEFT(RTRIM(@des_mov)+' Por Pagar',60),@base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);
				
					SET @wreg=@wreg+1;
				END;

				-- FINANCIACION
				IF @val_fin > 0
				BEGIN
					SELECT @n_cta_cpf=n_cta_cpf,@n_cta_gfi=n_cta_gfi
					FROM cxp_param_cnt
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @n_cta_cpf, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, 
									cod_cl2, cod_cl3, cod_ter, deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc, @n_cta_cpf, @cod_suc,@cod_cco,@cod_cl1,
								@cod_cl2,@cod_cl3, @nit_pro, 0, @val_fin, LEFT(RTRIM(@des_mov)+' (financiación)',60),@base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;

					EXEC sp_gen_trae_tasa_niif @n_cta_gfi, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, 
									cod_cl2, cod_cl3, cod_ter, deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc, @n_cta_gfi, @cod_suc,@cod_cco,@cod_cl1,
								@cod_cl2,@cod_cl3, @nit_pro,  @val_fin,0, LEFT(RTRIM(@des_mov)+' (financiación)',60),@base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- RETEIVA
				IF @ret_iva>0
				BEGIN
					SELECT @wriv=n_wrivf 
					FROM cxp_param_cnt 
					WHERE llave=@ind_con;
	
					EXEC sp_gen_trae_tasa_niif @wriv, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					IF @wind_tip=3
					BEGIN
						SET @base=@base_cnt;
					END;
					ELSE
					BEGIN
						SET @base=@val_iva+@val_iva_ng;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc,fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, 
									cod_cl2, cod_cl3, cod_ter, deb_mov, cre_mov, des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wriv,@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,
								@cod_cl3,@nit_pro,0,@ret_iva,LEFT(RTRIM(@des_mov)+' Retención de Iva',60),@base,@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);

					SET @wreg=@wreg+1;

					IF @wind_tip=3
					BEGIN
						SELECT @wriv=n_wivpf 
						FROM cxp_param_cnt 
						WHERE llave=@ind_con;

						EXEC sp_gen_trae_tasa_niif @wriv, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO #Cxp_inf_nif (ano_doc, per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,cod_cl1,
										cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas,difcam_doc)
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wriv,@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,
									@cod_cl3,@nit_pro,@ret_iva,0,LEFT(RTRIM(@des_mov)+' Retención de iva R.S.',60),@base_cnt,@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);

						SET @wreg=@wreg+1;
					END;
				END;

				-- RETEIVA NG SOLO PARA REGIMEN SIMPLIFICADO
				IF @ret_riv_ng>0 AND @wind_tip=3
				BEGIN
					SELECT @wriv_ng=n_wrivf 
					FROM cxp_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @wriv_ng, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @base=@base_cnt;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc,fch_doc, cod_cta, 
									cod_suc, cod_cco, cod_cl1, 
									cod_cl2, cod_cl3, cod_ter, deb_mov, cre_mov, des_mov,
									bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wriv_ng,
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,
								@cod_cl3,@nit_pro,0,@ret_riv_ng,LEFT(RTRIM(@des_mov)+' Retención de Iva',60),
								CASE WHEN @ret_iva>0 THEN 0 ELSE @base END,@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);

					SET @wreg=@wreg+1;

					SELECT @wriv_ng=n_fa_iva_ret_ng 
					FROM cxp_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @wriv_ng, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,cod_cl1,
									cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas,difcam_doc)
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wriv_ng,@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,
								@cod_cl3,@nit_pro,@ret_riv_ng,0,LEFT(RTRIM(@des_mov)+' Retención de iva R.S. NG',60),@base_cnt,@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- ICA
				IF @val_ica>0
				BEGIN
					SELECT @wica=n_wicaf 
					FROM cxp_param_cnt 
					WHERE llave=@ind_con;

					IF @ind_cta_ica = 2
						BEGIN
							SELECT @wica=cta_nif_com
							FROM gen_actividad
							WHERE cod_act=@cod_ica
								AND cod_ciu=@cod_ciu
								AND cod_dep=@cod_dep
								AND cod_pai=@cod_pai;
						END;

					EXEC sp_gen_trae_tasa_niif @wica, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wica, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @val_ica, 
								LEFT(RTRIM(@des_mov)+' Retención de ica',60), @bas_rii,@num_che,'','', 
								@ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- RETENCION
				IF @val_ret>0
				BEGIN
					IF @ind_ctaret=1
					BEGIN
						SELECT @wret=n_wretf 
						FROM cxp_param_cnt 
						WHERE llave=@ind_con;
					END;
					ELSE
					BEGIN
						SELECT @wret=cta_ret_niif 
						FROM gen_retencion 
						WHERE cod_ret=@tip_ret;
					END;

					EXEC sp_gen_trae_tasa_niif @wret, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wret, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @val_ret, 
								LEFT(RTRIM(@des_mov)+' Retención en la fuente',60), @bas_rti,@num_che,'','', 
								@ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- IVA
				IF @val_iva>0
				BEGIN
					SELECT @wiva=n_wivaf 
					FROM cxp_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @wiva, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wiva, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, @val_iva, 
								0,LEFT(RTRIM(@des_mov),70), @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- IVA NG
				IF @val_iva_ng>0
				BEGIN
					IF @ind_afe='0'
					BEGIN
						IF @dcta_ivang <> '0' 
						BEGIN
							EXEC sp_gen_trae_tasa_niif @dcta_ivang, @fec_tas, @tasa OUTPUT, @ind_mp;

							IF @ind_tas='S'
							BEGIN
								SET @tasa=@tasa_doc;
							END;

							INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
											fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
											deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
											fec_tas, tasa, ind_tas,difcam_doc)
							VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@dcta_ivang, 
										@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, @val_iva_ng, 
										0,LEFT(RTRIM(@des_mov),70), @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

							SET @wreg=@wreg+1;
						END;
						ELSE
						BEGIN
							SELECT @wivang=n_fa_iva_ng 
							FROM cxp_param_cnt 
							WHERE llave=@ind_con;

							EXEC sp_gen_trae_tasa_niif @wivang, @fec_tas, @tasa OUTPUT, @ind_mp;

							IF @ind_tas='S'
							BEGIN
								SET @tasa=@tasa_doc;
							END;

							INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
											fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
											deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
											fec_tas, tasa, ind_tas,difcam_doc)
							VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wivang, 
										@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, @val_iva_ng, 
										0,LEFT(RTRIM(@des_mov),70), @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

							SET @wreg=@wreg+1;
						END;
					END;
					ELSE
					BEGIN
						DELETE FROM #t_afecon_ng;
				
						INSERT INTO #t_afecon_ng(Cod_cta,Cod_suc,Cod_cco,Cod_cl1,Cod_cl2,Cod_cl3,valor,base)
						SELECT cta_ivang_niif, Cod_suc, Cod_cco, Cod_cl1, Cod_cl2, Cod_cl3, ROUND((Porcentaje/100)*@val_iva_ng,@num_dec) AS valor, ROUND((Porcentaje/100)*@base_cnt,@num_dec) AS base
						FROM Cxp_distriafe 
						WHERE Cod_afe= @Ind_afe;

						SELECT @gas_dist=ISNULL(SUM(valor),0), @base_dist=ISNULL(SUM(base),0) 
						FROM #t_afecon_ng;
								
						IF @gas_dist>0 AND @val_iva_ng<>@gas_dist
						BEGIN
							SELECT TOP 1 @conta7=recno 
							FROM #t_afecon_ng 
							ORDER BY valor DESC;
				
							UPDATE #t_afecon_ng SET valor=valor+(@val_iva_ng-@gas_dist), base=base+(@base_cnt-@base_dist) 
							WHERE recno=@conta7;
						END;
	
						SELECT @conta9=ISNULL(COUNT(1),0) 
						FROM #t_afecon_ng;

						SELECT @conta8=MIN(recno) 
						FROM #t_afecon_ng;

						SELECT @conta9=MAX(recno) 
						FROM #t_afecon_ng;

						SET @wreg=@wreg+1;

						WHILE @conta8<=@conta9
						BEGIN
							SELECT @Wven=Cod_cta, @aCod_suc=Cod_suc, @aCod_cco=Cod_cco, @aCod_cl1=Cod_cl1, 
							@aCod_cl2=cod_cl2, @aCod_cl3=cod_cl3, @aNet_doc=valor, @aBase_doc=base
							FROM #t_afecon_ng
							WHERE recno=@conta8;
				
							EXEC sp_gen_trae_tasa_niif @wven, @fec_tas, @tasa OUTPUT, @ind_mp;

							IF @ind_tas='S'
							BEGIN
								SET @tasa=@tasa_doc;
							END;

							INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
											fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
											deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
											fec_tas, tasa, ind_tas,difcam_doc)
							VALUES (@ano_doc, @per_doc, @sub_tip, @tip_doc, @num_doc,@wreg, 
										@fch_doc, @wven, @acod_suc, @acod_cco, @acod_cl1, @acod_cl2, @acod_cl3, 
										@nit_pro, @aNet_doc, 0,LEFT(RTRIM(@des_mov),60), @aBase_doc, @num_che, '', '', @ind_mp, @fec_tas, 
										@tasa, @ind_tas,0);

							SET @wreg=@wreg+1;
					
							SET @conta8=@conta8+1;
						END;
					END;
				END;

				-- TIMBRE
				IF @val_tim>0
				BEGIN
					SELECT @n_fa_tim=n_fa_tim 
					FROM cxp_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @n_fa_tim, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@n_fa_tim, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @val_tim, 
								LEFT(RTRIM(@des_mov)+' Impuesto de Timbre',60), @base_cnt,@num_che,'','', 
								@ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- DESCUENTO
				IF @val_des>0
				BEGIN
					SELECT @wdes=n_wdesf 
					FROM cxp_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @wdes, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wdes, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @val_des, 
								LEFT(RTRIM(@des_mov)+' Descuentos',60), 0 ,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

					-- ANTICIPOS
				IF @ind_ctaant=1
				BEGIN
					IF @ant_doc>0
					BEGIN
						SELECT @want=n_wantf 
						FROM cxp_param_cnt 
						WHERE llave=@ind_con;

						EXEC sp_gen_trae_tasa_niif @want, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
										fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
										deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
										fec_tas, tasa, ind_tas,difcam_doc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@want, 
									@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @ant_doc, 
									LEFT(RTRIM(@des_mov),60), @sub_doc,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

						SET @wreg=@wreg+1;

						EXEC sp_gen_trae_tasa_niif @wcxp, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
										fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
										deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
										fec_tas, tasa, ind_tas,difcam_doc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wcxp, 
									@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, @ant_doc, 
									0,LEFT(RTRIM(@des_mov)+' Anticipos',60), @sub_doc,@num_che,'','', @ind_mp, @fec_tas,	@tasa, @ind_tas,0);

						SET @wreg=@wreg+1;
					END;
				END;

				-- SUMA 1
				IF @mon_sum1>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @cta_sum1, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_sum1, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, @mon_sum1, 0, 
								LEFT(RTRIM(@des_mov)+' Impuesto Suma 1',60), @base_cnt,@num_che,'','', 
								@ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- SUMA 2
				IF @mon_sum2>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @cta_sum2, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_sum2, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, @mon_sum2, 0, 
								LEFT(RTRIM(@des_mov)+' Impuesto Suma 2',60), @base_cnt,@num_che,'','', 
								@ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- SUMA 3
				IF @mon_sum3>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @cta_sum3, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_sum3, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, @mon_sum3, 0, 
								LEFT(RTRIM(@des_mov)+' Impuesto Suma 3',60), @base_cnt,@num_che,'','', 
								@ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- SUMA 4
				IF @mon_sum4>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @cta_sum4, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_sum4, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, @mon_sum4, 0, 
								LEFT(RTRIM(@des_mov)+' Impuesto Suma 4',60), @base_cnt,@num_che,'','', 
								@ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- RESTA 1
				IF @mon_res1>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @cta_res1, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res1, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @mon_res1, 
								LEFT(RTRIM(@des_mov)+' Impuesto Resta 1',60), @base_cnt,@num_che,'','', 
								@ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- RESTA 2
				IF @mon_res2>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @cta_res2, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res2, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @mon_res2, 
								LEFT(RTRIM(@des_mov)+' Impuesto Resta 2',60), @base_cnt,@num_che,'','', 
								@ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- RESTA 3
				IF @mon_res3>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @cta_res3, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res3, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @mon_res3, 
								LEFT(RTRIM(@des_mov)+' Impuesto Resta 3',60), @base_cnt,@num_che,'','', 
								@ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- RESTA 4
				IF @mon_res4>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @cta_res4, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res4, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @mon_res4, 
								LEFT(RTRIM(@des_mov)+' Impuesto Resta 4',60), @base_cnt,@num_che,'','', 
								@ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- GASTO
				IF @Ind_afe='0'
				BEGIN
					-- SI SE ESTA AFECTANDO UNA PREFACTURA DE IMPORTACIONES NO SE CONTABILIZA EL GASTO ACA
					IF @pre_fac=0
					BEGIN
						IF @dcta_gas <>'0'
						BEGIN
							EXEC sp_gen_trae_tasa_niif @dcta_gas, @fec_tas, @tasa OUTPUT, @ind_mp;
					
							IF @ind_tas='S'
							BEGIN
								SET @tasa=@tasa_doc;
							END;

							INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
											fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
											deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
											fec_tas, tasa, ind_tas,difcam_doc)
							VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@dcta_gas, 
										@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, @net_doc, 0,LEFT(RTRIM(@des_mov),60), 
										@sub_doc,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

							SET @wreg=@wreg+1;
						END;
						ELSE
						BEGIN
							SELECT @wven=n_wvenf 
							FROM cxp_param_cnt 
							WHERE llave=@ind_con;

							EXEC sp_gen_trae_tasa_niif @wven, @fec_tas, @tasa OUTPUT, @ind_mp;
					
							IF @ind_tas='S'
							BEGIN
								SET @tasa=@tasa_doc;
							END;

							INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
											fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
											deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
											fec_tas, tasa, ind_tas,difcam_doc)
							VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wven, 
										@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, @net_doc, 0,LEFT(RTRIM(@des_mov),60), 
										@sub_doc,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

							SET @wreg=@wreg+1;
						END;
					END;
				END;
				ELSE
				BEGIN
					DELETE FROM #t_afecon_p;
				
					INSERT INTO #t_afecon_p(Cod_cta,Cod_suc,Cod_cco,Cod_cl1,Cod_cl2,Cod_cl3,valor, base)
					SELECT cod_cta_niif, Cod_suc, Cod_cco, Cod_cl1, Cod_cl2, Cod_cl3, ROUND((Porcentaje/100)*@Net_doc,@num_dec) AS valor, ROUND((Porcentaje/100)*@sub_doc,@num_dec) AS base
					FROM Cxp_distriafe 
					WHERE Cod_afe= @Ind_afe;

					SELECT @gas_dist=ISNULL(SUM(valor),0), @base_dist=ISNULL(SUM(base),0) 
					FROM #t_afecon_p;
								
					IF @gas_dist>0 AND @net_doc<>@gas_dist
					BEGIN
						SELECT TOP 1 @conta7=recno 
						FROM #t_afecon_p 
						ORDER BY valor DESC;
				
						UPDATE #t_afecon_p SET valor=valor+(@net_doc-@gas_dist), base=base+(@sub_doc-@base_dist) 
						WHERE recno=@conta7;
					END;

					SELECT @conta9=ISNULL(COUNT(1),0) 
					FROM #t_afecon_p;

					SELECT @conta8=MIN(recno) 
					FROM #t_afecon_p;

					SELECT @conta9=MAX(recno) 
					FROM #t_afecon_p;

					SET @wreg=@wreg+1;

					WHILE @conta8<=@conta9
					BEGIN
						SELECT @Wven=Cod_cta, @aCod_suc=Cod_suc, @aCod_cco=Cod_cco, @aCod_cl1=Cod_cl1, 
									@aCod_cl2=cod_cl2, @aCod_cl3=cod_cl3, @aNet_doc=valor, @aBase_doc=base
						FROM #t_afecon_p
						WHERE recno=@conta8;
				
						EXEC sp_gen_trae_tasa_niif @wven, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
										fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
										deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
										fec_tas, tasa, ind_tas,difcam_doc)
						VALUES (@ano_doc, @per_doc, @sub_tip, @tip_doc, @num_doc,@wreg, 
									@fch_doc, @wven, @acod_suc, @acod_cco, @acod_cl1, @acod_cl2, @acod_cl3, 
									@nit_pro, @aNet_doc, 0,LEFT(RTRIM(@des_mov),60), @aBase_doc, @num_che, '', '', @ind_mp, @fec_tas, 
									@tasa, @ind_tas,0);

						SET @wreg=@wreg+1;
					
						SET @conta8=@conta8+1;
					END;
				END;

				SET @conta5=@conta5+1;
			END;

			--	CONTABILIZAMOS ANTICIPO CON PLANTILA ORIGEN DE TES
			SELECT @tot_ant=SUM(ant_doc) 
			FROM cxp_cuedoc 
			WHERE ano_doc=@ano_doc 
				AND per_doc=@per_doc 
				AND sub_tip=@sub_tip 
				AND num_doc=@num_doc;

			IF @tot_ant>0 AND @ind_ctaant=2
			BEGIN
				-- SE FILTRA POR EL PRIMER REGISTRO DEL DOC DE TESORERIA PARA QUE NO SE SUME VARIAS VECES EL ANTICIPO
				--	JSARMIENTO ENERO/2013
				INSERT INTO @afecon_ant(cod_suc,cod_cco,ind_con,cod_cl1,cod_cl2,cod_cl3,ant_doc)
				SELECT c.cod_suc,c.cod_cco,t.ind_con,c.cod_cl1,c.cod_cl2,c.cod_cl3,SUM(ant_doc)
				FROM cxp_cuedoc AS c WITH (NOLOCK)
					INNER JOIN tes_cuedoc AS t ON c.ano_ant=t.ano_doc AND c.per_ant=t.per_doc AND c.sub_ant=t.sub_tip AND c.doc_ant=t.num_doc AND t.reg_doc=1
				WHERE c.ano_doc=RTRIM(@ano_doc) 
					AND c.per_doc=RTRIM(@per_doc) 
					AND c.sub_tip=RTRIM(@sub_tip) 
					AND c.num_doc=RTRIM(@num_doc)
				GROUP BY c.cod_suc,c.cod_cco,t.ind_con,c.cod_cl1,c.cod_cl2,c.cod_cl3;

				SET @conta10=1;
				SELECT @conta11=ISNULL(MAX(recno),0) 
				FROM @afecon_ant;

				WHILE @conta10<=@conta11
				BEGIN
					SELECT @cod_suc=cod_suc,@cod_cco=cod_cco,@ind_con=ind_con,@cod_cl1=cod_cl1,@cod_cl2=cod_cl2,@cod_cl3=cod_cl3,@ant_doc=ant_doc
					FROM @afecon_ant
					WHERE recno=@conta10;

					SELECT @want=n_ant_egr 
					FROM tes_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @want, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@want, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @ant_doc, 
								LEFT(RTRIM(@des_mov),60), @sub_doc,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;

					EXEC sp_gen_trae_tasa_niif @wcxp, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wcxp, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, @ant_doc, 
								0,LEFT(RTRIM(@des_mov)+' Anticipos',60), @sub_doc,@num_che,'','', @ind_mp, @fec_tas,	@tasa, @ind_tas,0);
				
					SET @wreg=@wreg+1;

					SET @conta10=@conta10+1;
				END;
			END;
		END;

		-- COMPROBANTE DE EGRESO
		IF @tip_doc BETWEEN '140' AND '149'
		BEGIN
			-- SE AGREGA A LA CONSULTA EL MENOR Y MAYOR VALOR PAGADO
			-- JSARMIENTO OCTUBRE/2010	
			INSERT INTO @afecon_p(cod_pro,cod_suc,cod_cco,ind_con,cod_cl1,cod_cl2,cod_cl3,ind_afe,net_doc,val_iva,
							val_ret,val_doc,ant_doc,val_des,sub_doc,val_ica,ret_iva,may_val,men_val,val_iva_ng,ret_riv_ng,base_iva_aiu,mon_sum1,mon_sum2,mon_sum3,mon_sum4,
							mon_res1,mon_res2,mon_res3,mon_res4,cod_ica,tip_ret,ano_ref,per_ref,sub_ref,num_ref)
			SELECT cod_pro,cod_suc,cod_cco,ind_con,cod_cl1,cod_cl2,cod_cl3,Ind_afe,SUM(net_doc),SUM(val_iva),
						SUM(val_ret),SUM(val_doc),SUM(ant_doc),SUM(val_des),SUM(sub_doc),SUM(val_ica),SUM(ret_iva),SUM(may_val),SUM(men_val),SUM(val_iva_ng),SUM(ret_riv_ng),
						SUM(base_iva_aiu),SUM(mon_sum1),SUM(mon_sum2),SUM(mon_sum3),SUM(mon_sum4),SUM(mon_res1),SUM(mon_res2),SUM(mon_res3),SUM(mon_res4),cod_ica,tip_ret,ano_ref,per_ref,sub_ref,num_ref
			FROM cxp_cuedoc WITH (NOLOCK)
			WHERE ano_doc=RTRIM(@ano_doc) 
				AND per_doc=RTRIM(@per_doc) 
				AND sub_tip=RTRIM(@sub_tip) 
				AND num_doc=RTRIM(@num_doc)
			GROUP BY cod_suc,cod_cco,cod_pro,ind_con,cod_cl1,cod_cl2,cod_cl3, Ind_afe,cod_ica,tip_ret,ano_ref,per_ref,sub_ref,num_ref;

			SET @conta5=1;
			SELECT @conta6=ISNULL(COUNT(1),0) 
			FROM @afecon_p;

			SELECT @wreg=1;

			WHILE @conta5<=@conta6
			BEGIN
				SELECT @cod_pro=cod_pro,@cod_suc=cod_suc,@cod_cco=cod_cco,@ind_con=ind_con,@cod_cl1=cod_cl1,@cod_cl2=cod_cl2,@cod_cl3=cod_cl3,@ind_afe=ind_afe,
							@net_doc=net_doc,@val_iva=val_iva,@val_ret=val_ret,@val_doc=val_doc,@ant_doc=ant_doc,@val_des=val_des,@sub_doc=sub_doc,
							@val_ica=val_ica,@ret_iva=ret_iva,@may_val=may_val,@men_val=men_val,@val_iva_ng=val_iva_ng,@ret_riv_ng=ret_riv_ng,@base_aiu=base_iva_aiu,
							@mon_sum1=mon_sum1,@mon_sum2=mon_sum2,@mon_sum3=mon_sum3,@mon_sum4=mon_sum4,@mon_res1=mon_res1,@mon_res2=mon_res2,@mon_res3=mon_res3
							,@mon_res4=mon_res4,@cod_ica=cod_ica,@tip_ret=tip_ret,@ano_ref=ano_ref,@per_ref=per_ref,@sub_ref=sub_ref,@num_ref=num_ref
				FROM @afecon_p
				WHERE recno=@conta5;

				SET @net_doc=ROUND(@net_doc,@num_dec);
				SET @val_iva=ROUND(@val_iva,@num_dec);
				SET @val_ret=ROUND(@val_ret,@num_dec);
				SET @val_doc=ROUND(@val_doc,@num_dec);
				SET @ant_doc=ROUND(@ant_doc,@num_dec);
				SET @val_des=ROUND(@val_des,@num_dec);
				SET @sub_doc=ROUND(@sub_doc,@num_dec);
				SET @val_ica=ROUND(@val_ica,@num_dec);
				SET @ret_iva=ROUND(@ret_iva,@num_dec);
				SET @ret_riv_ng=ROUND(@ret_riv_ng,@num_dec);
				SET @may_val=ROUND(@may_val,@num_dec);
				SET @men_val=ROUND(@men_val,@num_dec);
				SET @val_iva_ng=ROUND(@val_iva_ng,@num_dec);
				SET @ret_riv_ng=ROUND(@ret_riv_ng,@num_dec);
				SET @mon_sum1=ROUND(@mon_sum1,@num_dec);
				SET @mon_sum2=ROUND(@mon_sum2,@num_dec);
				SET @mon_sum3=ROUND(@mon_sum3,@num_dec);
				SET @mon_sum4=ROUND(@mon_sum4,@num_dec);
				SET @mon_res1=ROUND(@mon_res1,@num_dec);
				SET @mon_res2=ROUND(@mon_res2,@num_dec);
				SET @mon_res3=ROUND(@mon_res3,@num_dec);
				SET @mon_res4=ROUND(@mon_res4,@num_dec);

				SET @num_che=ISNULL(@num_che,'0');
				
				IF @base_aiu > 0
				BEGIN
					SET @base_cnt = @base_aiu;
				END;
				ELSE
				BEGIN
					SET @base_cnt = @sub_doc;
				END;

				--CUENTA POR PAGAR
				IF @ind_cxp=2
				BEGIN
					SELECT @wcxp=n_wcxp, @cta_taspac = ncxp_taspac 
					FROM cxp_param_cnt 
					WHERE llave=@ind_con;
				END;

				EXEC sp_gen_trae_tasa_niif @wcxp, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa = @tasa_doc;

					IF @cta_taspac <> '0'
					BEGIN
						SET @wcxp = @cta_taspac;
					END;
				END;

				INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
								fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
								deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
								fec_tas, tasa, ind_tas,difcam_doc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc, 
							@wcxp, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, @val_doc, 
							0,LEFT(RTRIM(@des_mov),60), @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

				SET @wreg=@wreg+1;

				SELECT @ind_adc=ind_adc, @nat_cta = nat_cta, @cta_idc = cta_idc
							, @cta_gdc = cta_gdc  
				FROM nif_puc 
				WHERE cod_cta=@wcxp;

				-- DIFERENCIA EN CAMBIO
				IF RTRIM(@cta_idc) = ''
				BEGIN
					SET @cta_idc = '0';
				END;

				IF RTRIM(@cta_gdc) = ''
				BEGIN
					SET @cta_gdc = '0';
				END;

				IF @difcam_doc = 1 AND @ind_mp NOT IN ( '00','99') AND @tip_doc = '140' AND @ind_adc = 0
				BEGIN
					SELECT @tas_fac = tasa
					FROM cxp_cabdoc WITH (NOLOCK)
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
							IF @nat_cta=1 
							BEGIN
								
								INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc,fch_doc, 
																		cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
																		deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
																		fec_tas, tasa, ind_tas,difcam_doc)
								VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc, 
											@wcxp, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro
											, 0
											, @valdifc
											,'AJUSTE POR DIFERENCIA EN CAMBIO', @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,1);
								SET @wreg=@wreg+1;

								INSERT INTO #Cxp_inf_nif (	ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc,fch_doc
																			, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter
																			, deb_mov
																			, cre_mov
																			, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, fec_tas, tasa, ind_tas,difcam_doc)
								VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc, 
											@cta_gdc, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro
											, @valdifc
											, 0
											,'AJUSTE POR DIFERENCIA EN CAMBIO', @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,1);
								SET @wreg=@wreg+1;
							END;
							ELSE
							BEGIN
								INSERT INTO #Cxp_inf_nif (	ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc,fch_doc
																			, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter
																			, deb_mov
																			, cre_mov
																			, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, fec_tas, tasa, ind_tas,difcam_doc)
								VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc, 
											@wcxp, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro
											, @valdifc
											, 0
											,'AJUSTE POR DIFERENCIA EN CAMBIO', @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,1);
								SET @wreg=@wreg+1;

								INSERT INTO #Cxp_inf_nif (	ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc,fch_doc
																			, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter
																			, deb_mov
																			, cre_mov
																			, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, fec_tas, tasa, ind_tas,difcam_doc)
								VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc, 
											@cta_gdc, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro
											, 0
											, @valdifc
											,'AJUSTE POR DIFERENCIA EN CAMBIO', @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,1);
								SET @wreg=@wreg+1
							END;
						END;
					END;

					IF @dif_tas > 0
						BEGIN
							IF @cta_idc <> '0'
							BEGIN
								IF @nat_cta = 1
								BEGIN
									INSERT INTO #Cxp_inf_nif (	ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc,fch_doc
																			, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter
																			, deb_mov
																			, cre_mov
																			, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, fec_tas, tasa, ind_tas,difcam_doc)
									VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc, 
												@wcxp, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro
												, @valdifc
												, 0
												,'AJUSTE POR DIFERENCIA EN CAMBIO', @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,1);
									SET @wreg=@wreg+1;

									INSERT INTO #Cxp_inf_nif (	ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc,fch_doc
																			, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter
																			, deb_mov
																			, cre_mov
																			, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, fec_tas, tasa, ind_tas,difcam_doc)
									VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc, 
												@cta_idc, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro
												, 0
												, @valdifc
												,'AJUSTE POR DIFERENCIA EN CAMBIO', @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,1);
									SET @wreg=@wreg+1;
								END;
								ELSE
								BEGIN
									
									INSERT INTO #Cxp_inf_nif (	ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc,fch_doc
																			, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter
																			, deb_mov
																			, cre_mov
																			, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, fec_tas, tasa, ind_tas,difcam_doc)
									VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc, 
												@wcxp, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro
												, 0
												, @valdifc
												,'AJUSTE POR DIFERENCIA EN CAMBIO', @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,1);
									SET @wreg=@wreg+1;
									
									INSERT INTO #Cxp_inf_nif (	ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc,fch_doc
																			, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter
																			, deb_mov
																			, cre_mov
																			, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, fec_tas, tasa, ind_tas,difcam_doc)
									VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc, 
												@cta_idc, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro
												, @valdifc
												, 0
												,'AJUSTE POR DIFERENCIA EN CAMBIO', @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,1);
									SET @wreg=@wreg+1;
								END;
							END;
						END;
				END;

				-- RETENCION
				IF @val_ret>0
				BEGIN
					IF @ind_ctaret=1
					BEGIN
						SELECT @wret=n_wreti 
						FROM cxp_param_cnt 
						WHERE llave=@ind_con;
					END;
					ELSE
					BEGIN
						SELECT @wret=cta_ret_niif 
						FROM gen_retencion 
						WHERE cod_ret=@tip_ret;
					END;

					EXEC sp_gen_trae_tasa_niif @wret, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wret, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @val_ret, 
								LEFT(RTRIM(@des_mov),60), @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- DESCUENTO
				IF @val_des>0
				BEGIN
					SELECT @wdes=n_wdesi 
					FROM cxp_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @wdes, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wdes, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @val_des, 
								LEFT(RTRIM(@des_mov),60), 0 ,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- IVA
				IF @val_iva>0
				BEGIN
					SELECT @wiva=n_wivai 
					FROM cxp_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @wiva, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wiva, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @val_iva, 
								LEFT(RTRIM(@des_mov),60), @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- IVA NG
				IF @val_iva_ng>0
				BEGIN
					SELECT @wivang=n_wivaing 
					FROM cxp_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @wivang, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wivang, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @val_iva_ng, 
								LEFT(RTRIM(@des_mov),60), @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- ICA
				IF @val_ica>0
				BEGIN
					SELECT @wica=n_wicai 
					FROM cxp_param_cnt 
					WHERE llave=@ind_con;

					IF @ind_cta_ica = 2
					BEGIN
						SELECT @wica=cta_nif_com
						FROM gen_actividad
						WHERE cod_act=@cod_ica
							AND cod_ciu=@cod_ciu
							AND cod_dep=@cod_dep
							AND cod_pai=@cod_pai;
					END;

					EXEC sp_gen_trae_tasa_niif @wica, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wica, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @val_ica, 
								LEFT(RTRIM(@des_mov),60), @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- RETEIVA
				IF @ret_iva>0
				BEGIN
					SELECT @wriv=n_wivai 
					FROM cxp_param_cnt 
					WHERE llave=@ind_con;
				
					EXEC sp_gen_trae_tasa_niif @wriv, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wriv, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @ret_iva, 
								LEFT(RTRIM(@des_mov),60), @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;
			
				-- RETEIVA NG SOLO PARE REGIMEN SIMPLIFICADO
				IF @ret_riv_ng>0 AND @wind_tip=3
				BEGIN
					SELECT @wriv_ng=n_wivai 
					FROM cxp_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @wriv_ng, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @base=@sub_doc;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc,fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, 
					cod_cl2, cod_cl3, cod_ter, deb_mov, cre_mov, des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wriv_ng,@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,
					@cod_cl3,@nit_pro,@ret_riv_ng,0,LEFT(RTRIM(@des_mov)+' Retención de Iva',60),@base_cnt,@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
					SET @wreg=@wreg+1;

					SELECT @wriv_ng=n_ce_iva_ret_ng 
					FROM cxp_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @wriv, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,cod_cl1,
									cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas,difcam_doc)
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wriv_ng,@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,
								@cod_cl3,@nit_pro,0,@ret_riv_ng,LEFT(RTRIM(@des_mov)+' Retención de iva R.S. NG',60),@base_cnt,@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- GASTO
				SELECT @wven=n_wsubi 
				FROM cxp_param_cnt 
				WHERE llave=@ind_con;

				EXEC sp_gen_trae_tasa_niif @wven, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
								fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
								deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
								fec_tas, tasa, ind_tas,difcam_doc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wven, 
							@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, 
							@val_doc-@val_des-@val_ret-@ret_iva-@val_ica-@men_val+@may_val, LEFT(RTRIM(@des_mov),60), 
							@sub_doc,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);
			
				SET @wreg=@wreg+1;
			
				-- MENOR VALOR			
				IF @men_val>0
				BEGIN
					SELECT @wmen=n_otr_dto 
					FROM cxp_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @wmen,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc,
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wmen,
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro,0,@men_val,LEFT(RTRIM(@des_mov),60),
								@base_cnt,@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);

					SET @wreg=@wreg+1;
				END;
			
				-- MAYOR VALOR
				IF @may_val>0
				BEGIN
					SELECT @wmay=n_otr_gas 
					FROM cxp_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @wmay,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc,
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr,
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wmay,
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro,@may_val,0,LEFT(RTRIM(@des_mov),60),
								@base_cnt,@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				--	IMPUESTOS ADICIONALES
				-- SUMA 1
				IF @mon_sum1>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @cta_sum1, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_sum1, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @mon_sum1, 
								LEFT(RTRIM(@des_mov),60), @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- SUMA 2
				IF @mon_sum2>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @cta_sum2, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_sum2, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @mon_sum2, 
								LEFT(RTRIM(@des_mov),60), @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- SUMA 3
				IF @mon_sum3>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @cta_sum3, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_sum3, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @mon_sum3, 
								LEFT(RTRIM(@des_mov),60), @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- SUMA 4
				IF @mon_sum4>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @cta_sum4, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
										fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
										deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
										fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_sum4, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @mon_sum4, 
								LEFT(RTRIM(@des_mov),60), @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- RESTA 1
				IF @mon_res1>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @cta_res1, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res1, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, @mon_res1, 0,LEFT(RTRIM(@des_mov),60), 
								@base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- RESTA 2
				IF @mon_res2>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @cta_res2, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res2, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, @mon_res2, 0,LEFT(RTRIM(@des_mov),60), 
								@base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- RESTA 3
				IF @mon_res3>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @cta_res3, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res3, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, @mon_res3, 0,LEFT(RTRIM(@des_mov),60), 
								@base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- RESTA 4
				IF @mon_res4>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @cta_res4, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res4, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, @mon_res4, 0,LEFT(RTRIM(@des_mov),60), 
								@base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				SET @conta5=@conta5+1;
			END;
		END;

		-- NOTAS CREDITO
		IF @tip_doc BETWEEN '150' AND '159'
		BEGIN
			INSERT INTO @afecon_p(cod_pro,cod_suc,cod_cco,ind_con,cod_cl1,cod_cl2,cod_cl3,ind_afe,net_doc,val_iva,
							val_ret,val_doc,ant_doc,val_des,sub_doc,val_ica,ret_iva,may_val,men_val,tip_ret,val_iva_ng,bas_rii,bas_rti,ret_riv_ng,mon_sum1,mon_sum2,mon_sum3,mon_sum4,
							mon_res1,mon_res2,mon_res3,mon_res4,base_iva_aiu,val_ctd,cod_ica)
			SELECT cod_pro,cod_suc,cod_cco,ind_con,cod_cl1,cod_cl2,cod_cl3,Ind_afe,SUM(net_doc),SUM(val_iva),
						SUM(val_ret),SUM(val_doc),SUM(ant_doc),SUM(val_des),SUM(sub_doc),SUM(val_ica),SUM(ret_iva),SUM(may_val),SUM(men_val),tip_ret,SUM(val_iva_ng),SUM(bas_rii),SUM(bas_rti),SUM(ret_riv_ng),
						SUM(mon_sum1),SUM(mon_sum2),SUM(mon_sum3),SUM(mon_sum4),SUM(mon_res1),SUM(mon_res2),SUM(mon_res3),SUM(mon_res4),SUM(base_iva_aiu),SUM(val_ctd),cod_ica
			FROM cxp_cuedoc
			WHERE ano_doc=RTRIM(@ano_doc) 
				AND per_doc=RTRIM(@per_doc) 
				AND sub_tip=RTRIM(@sub_tip) 
				AND num_doc=RTRIM(@num_doc)
			GROUP BY cod_suc,cod_cco,cod_pro,ind_con,cod_cl1,cod_cl2,cod_cl3, Ind_afe,tip_ret,cod_ica;

			SET @conta5=1;
			SELECT @conta6=ISNULL(COUNT(1),0) 
			FROM @afecon_p;

			SELECT @wreg=1;

			WHILE @conta5<=@conta6
			BEGIN
				SELECT @cod_pro=cod_pro,@cod_suc=cod_suc,@cod_cco=cod_cco,@ind_con=ind_con,@cod_cl1=cod_cl1,@cod_cl2=cod_cl2,@cod_cl3=cod_cl3,@ind_afe=ind_afe,
							@net_doc=net_doc,@val_iva=val_iva,@val_ret=val_ret,@val_doc=val_doc,@ant_doc=ant_doc,@val_des=val_des,@sub_doc=sub_doc,
							@val_ica=val_ica,@ret_iva=ret_iva,@may_val=may_val,@men_val=men_val,@tip_ret=tip_ret,@val_iva_ng=val_iva_ng,@bas_rii=bas_rii,@bas_rti=bas_rti,@ret_riv_ng=ret_riv_ng,
							@mon_sum1=mon_sum1,@mon_sum2=mon_sum2,@mon_sum3=mon_sum3,@mon_sum4=mon_sum4,@mon_res1=mon_res1,@mon_res2=mon_res2,@mon_res3=mon_res3,@mon_res4=mon_res4,
							@base_aiu=base_iva_aiu,@val_ctd=val_ctd,@cod_ica=cod_ica
				FROM @afecon_p
				WHERE recno=@conta5;

				SET @net_doc=ROUND(@net_doc,@num_dec);
				SET @val_iva=ROUND(@val_iva,@num_dec);
				SET @val_ret=ROUND(@val_ret,@num_dec);
				SET @val_doc=ROUND(@val_doc,@num_dec);
				SET @ant_doc=ROUND(@ant_doc,@num_dec);
				SET @val_des=ROUND(@val_des,@num_dec);
				SET @sub_doc=ROUND(@sub_doc,@num_dec);
				SET @val_ica=ROUND(@val_ica,@num_dec);
				SET @ret_iva=ROUND(@ret_iva,@num_dec);
				SET @may_val=ROUND(@may_val,@num_dec);
				SET @men_val=ROUND(@men_val,@num_dec);
				SET @val_iva_ng=ROUND(@val_iva_ng,@num_dec);
				SET @ret_riv_ng=ROUND(@ret_riv_ng,@num_dec);
				SET @mon_sum1=ROUND(@mon_sum1,@num_dec);
				SET @mon_sum2=ROUND(@mon_sum2,@num_dec);
				SET @mon_sum3=ROUND(@mon_sum3,@num_dec);
				SET @mon_sum4=ROUND(@mon_sum4,@num_dec);
				SET @mon_res1=ROUND(@mon_res1,@num_dec);
				SET @mon_res2=ROUND(@mon_res2,@num_dec);
				SET @mon_res3=ROUND(@mon_res3,@num_dec);
				SET @mon_res4=ROUND(@mon_res4,@num_dec);
				SET @val_ctd=ROUND(@val_ctd,@num_dec);

				SET @num_che=ISNULL(@num_che,'0');

				-- SE CONSULTAN CUENTAS PARA DISTRIBUCION POR CENTRO DE COSTO 
				IF @niv_dist = 5
				BEGIN
					SELECT @dcta_gas = n_cta_gas, @dcta_ivang = n_cta_ivang
					FROM  cxp_distctas_escosto
					WHERE tip_mon = @ind_mp
						AND cod_suc = @cod_suc
						AND cod_cco = @cod_cco
						AND cod_cl1 = @cod_cl1
						AND cod_cl2 = @cod_cl2
						AND cod_cl3 = @cod_cl3;

					IF @@ROWCOUNT = 0
					BEGIN
						SET @dcta_gas = '0';
						SET @dcta_ivang = '0';
					END;
				END;
				ELSE
				BEGIN
					IF @niv_dist = 4
					BEGIN
						SELECT @dcta_gas = n_cta_gas, @dcta_ivang = n_cta_ivang
						FROM  cxp_distctas_escosto
						WHERE tip_mon = @ind_mp
							AND cod_suc = @cod_suc
							AND cod_cco = @cod_cco
							AND cod_cl1 = @cod_cl1
							AND cod_cl2 = @cod_cl2;

						IF @@ROWCOUNT = 0
						BEGIN
							SET @dcta_gas = '0';
							SET @dcta_ivang = '0';
						END;
					END;
					ELSE
					BEGIN
						IF @niv_dist = 3
						BEGIN
							SELECT @dcta_gas = n_cta_gas, @dcta_ivang = n_cta_ivang
							FROM  cxp_distctas_escosto
							WHERE tip_mon = @ind_mp
								AND cod_suc = @cod_suc
								AND cod_cco = @cod_cco
								AND cod_cl1 = @cod_cl1;

							IF @@ROWCOUNT = 0
							BEGIN
								SET @dcta_gas = '0';
								SET @dcta_ivang = '0';
							END;
						END;
						ELSE
						BEGIN
							IF @niv_dist = 2
							BEGIN
								SELECT @dcta_gas = n_cta_gas, @dcta_ivang = n_cta_ivang
								FROM  cxp_distctas_escosto
								WHERE tip_mon = @ind_mp
									AND cod_suc = @cod_suc
									AND cod_cco = @cod_cco;

								IF @@ROWCOUNT = 0
								BEGIN
									SET @dcta_gas = '0';
									SET @dcta_ivang = '0';
								END;
							END;
							ELSE
							BEGIN
								IF @niv_dist = 1
								BEGIN
									SELECT @dcta_gas = n_cta_gas, @dcta_ivang = n_cta_ivang
									FROM  cxp_distctas_escosto
									WHERE tip_mon = @ind_mp
										AND cod_suc = @cod_suc;

									IF @@ROWCOUNT = 0
									BEGIN
										SET @dcta_gas = '0';
										SET @dcta_ivang = '0';
									END;
								END;
								ELSE
								BEGIN
									SET @dcta_gas = '0';
									SET @dcta_ivang = '0';
								END;
							END;
						END;
					END;
				END;

				IF @ind_cxp=2
				BEGIN
					SELECT @wcxp=fa_cxp, @cta_taspac = ncxp_taspac 
					FROM cxp_param_cnt 
					WHERE llave=@ind_con;
				END;

				EXEC sp_gen_trae_tasa_niif @wcxp, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;

					IF @cta_taspac <> '0'
					BEGIN
						SET @wcxp = @cta_taspac;
					END;
				END;

				IF @base_aiu > 0
				BEGIN
					SET @base_cnt = @base_aiu;
				END;
				ELSE
				BEGIN
					SET @base_cnt = @sub_doc;
				END;
			
				--	FINANCIACION
				SET @val_fin=0;

				IF @val_ctd <> @val_doc AND @val_ctd < @val_doc AND @val_ctd > 0
				BEGIN
					SET @val_fin=@val_doc-@val_ctd-@val_des;
				END;

				SET @net_doc = @net_doc - @val_fin;
				SET @val_doc = @val_doc - @val_fin;

				--CUENTA POR PAGAR
				INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
								fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
								deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
								fec_tas, tasa, ind_tas,difcam_doc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc, 
							@wcxp, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, @val_doc, 
							0,LEFT(RTRIM(@des_mov),60), @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

				SET @wreg=@wreg+1;

				--	FINANCIACION
				IF @val_fin>0
				BEGIN
					SELECT @n_cta_cpf=n_cta_cpf,@n_cta_gfi=n_cta_gfi
					FROM cxp_param_cnt
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @n_cta_gfi, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, 
									cod_cl2, cod_cl3, cod_ter, deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc, @n_cta_gfi, @cod_suc,@cod_cco,@cod_cl1,
								@cod_cl2,@cod_cl3, @nit_pro, 0, @val_fin, LEFT(RTRIM(@des_mov)+' (financiación)',60),@base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;

					EXEC sp_gen_trae_tasa_niif @n_cta_cpf, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, 
									cod_cl2, cod_cl3, cod_ter, deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc, @n_cta_cpf, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,
								@cod_cl3, @nit_pro,  @val_fin,0, LEFT(RTRIM(@des_mov)+' (financiación)',60),@base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- RETEIVA
				IF @ret_iva>0
				BEGIN
					SELECT @wriv=n_wrivn 
					FROM cxp_param_cnt 
					WHERE llave=@ind_con;
				
					EXEC sp_gen_trae_tasa_niif @wriv, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wriv, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, @ret_iva, 0,LEFT(RTRIM(@des_mov)+' Retención de Iva',60), 
								@base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;

					IF @wind_tip=3
					BEGIN
						SELECT @wriv=n_wivpn 
						FROM cxp_param_cnt 
						WHERE llave=@ind_con;

						EXEC sp_gen_trae_tasa_niif @wriv, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
										fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
										deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
										fec_tas, tasa, ind_tas,difcam_doc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wriv, 
									@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @ret_iva, 
									LEFT(RTRIM(@des_mov),60), @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

						SET @wreg=@wreg+1;
					END;
				END;

				-- RETEIVA NG SOLO PARE REGIMEN SIMPLIFICADO
				IF @ret_riv_ng>0 AND @wind_tip=3
				BEGIN
					SELECT @wriv_ng=n_wrivn 
					FROM cxp_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @wriv_ng, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SELECT @base=@sub_doc;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc,fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, 
									cod_cl2, cod_cl3, cod_ter, deb_mov, cre_mov, des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wriv_ng,@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,
								@cod_cl3,@nit_pro,@ret_riv_ng,0,LEFT(RTRIM(@des_mov)+' Retención de Iva',60),@base_cnt,@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);

					SET @wreg=@wreg+1;

					SELECT @wriv_ng=n_nd_iva_ret_ng 
					FROM cxp_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @wriv_ng, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,cod_cl1,
									cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas,difcam_doc)
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wriv_ng,@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,
								@cod_cl3,@nit_pro,0,@ret_riv_ng,LEFT(RTRIM(@des_mov)+' Retención de iva R.S. NG',60),@sub_doc,@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- ICA
				IF @val_ica>0
				BEGIN
					SELECT @wica=n_wican 
					FROM cxp_param_cnt 
					WHERE llave=@ind_con;
				
					IF @ind_cta_ica = 2
					BEGIN
						SELECT @wica=cta_nif_com
						FROM gen_actividad
						WHERE cod_act=@cod_ica
							AND cod_ciu=@cod_ciu
							AND cod_dep=@cod_dep
							AND cod_pai=@cod_pai;
					END;

					EXEC sp_gen_trae_tasa_niif @wica, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wica, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, @val_ica, 0,LEFT(RTRIM(@des_mov),60), 
								@bas_rii,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- RETENCION
				IF @val_ret>0
				BEGIN
					-- CONSULTAMOS PARAMETRO DE LA CTA DE RETENCION
					SELECT @ind_ctaret=ind_cta_ret 
					FROM cxp_param 
					WHERE cod_par='0';

					IF @ind_ctaret=1
					BEGIN
						SELECT @wret=n_wretn 
						FROM cxp_param_cnt 
						WHERE llave=@ind_con;
					END;
					ELSE
					BEGIN
						SELECT @wret=cta_ret_niif 
						FROM gen_retencion 
						WHERE cod_ret=@tip_ret;
					END;

					EXEC sp_gen_trae_tasa_niif @wret, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wret, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, @val_ret, 0,LEFT(RTRIM(@des_mov),60), 
								@bas_rti,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- IVA
				IF @val_iva>0
				BEGIN
					SELECT @wiva=n_wivan 
					FROM cxp_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @wiva, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wiva, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @val_iva, 
								LEFT(RTRIM(@des_mov),60), @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- IVA NG
				IF @val_iva_ng>0
				BEGIN
					IF @ind_afe='0'
					BEGIN
						IF @dcta_ivang <> '0'
						BEGIN
							EXEC sp_gen_trae_tasa_niif @dcta_ivang, @fec_tas, @tasa OUTPUT, @ind_mp;

							IF @ind_tas='S'
							BEGIN
								SET @tasa=@tasa_doc;
							END;

							INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
											fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
											deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
											fec_tas, tasa, ind_tas,difcam_doc)
							VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@dcta_ivang, 
										@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @val_iva_ng, 
										LEFT(RTRIM(@des_mov),60), @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

							SET @wreg=@wreg+1;
						END;
						ELSE
						BEGIN
							SELECT @wivang=n_nd_iva_ng 
							FROM cxp_param_cnt 
							WHERE llave=@ind_con;

							EXEC sp_gen_trae_tasa_niif @wivang, @fec_tas, @tasa OUTPUT, @ind_mp;

							IF @ind_tas='S'
							BEGIN
								SET @tasa=@tasa_doc;
							END;

							INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
											fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
											deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
											fec_tas, tasa, ind_tas,difcam_doc)
							VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wivang, 
										@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @val_iva_ng, 
										LEFT(RTRIM(@des_mov),60), @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

							SET @wreg=@wreg+1;
						END;
					END;
					ELSE
					BEGIN
						DELETE FROM #t_afecon_ng;
				
						INSERT INTO #t_afecon_ng(Cod_cta,Cod_suc,Cod_cco,Cod_cl1,Cod_cl2,Cod_cl3,valor,base)
						SELECT cta_ivang_niif, Cod_suc, Cod_cco, Cod_cl1, Cod_cl2, Cod_cl3, ROUND((Porcentaje/100)*@val_iva_ng,@num_dec) AS valor, ROUND((Porcentaje/100)*@base_cnt,@num_dec) AS base
						FROM Cxp_distriafe 
						WHERE Cod_afe= @Ind_afe;

						SELECT @gas_dist=ISNULL(SUM(valor),0), @base_dist=ISNULL(SUM(base),0) 
						FROM #t_afecon_ng;
								
						IF @gas_dist>0 AND @val_iva_ng<>@gas_dist
						BEGIN
							SELECT TOP 1 @conta7=recno 
							FROM #t_afecon_ng 
							ORDER BY valor DESC;
				
							UPDATE #t_afecon_ng SET valor=valor+(@val_iva_ng-@gas_dist), base=base+(@base_cnt-@base_dist) 
							WHERE recno=@conta7;
						END;
	
						SELECT @conta9=ISNULL(COUNT(1),0) 
						FROM #t_afecon_ng;

						SELECT @conta8=MIN(recno) 
						FROM #t_afecon_ng;

						SELECT @conta9=MAX(recno) 
						FROM #t_afecon_ng;

						SET @wreg=@wreg+1;

						WHILE @conta8<=@conta9
						BEGIN
							SELECT @Wven=Cod_cta, @aCod_suc=Cod_suc, @aCod_cco=Cod_cco, @aCod_cl1=Cod_cl1, 
							@aCod_cl2=cod_cl2, @aCod_cl3=cod_cl3, @aNet_doc=valor, @aBase_doc=base
							FROM #t_afecon_ng
							WHERE recno=@conta8;
				
							EXEC sp_gen_trae_tasa_niif @wven, @fec_tas, @tasa OUTPUT, @ind_mp;

							IF @ind_tas='S'
							BEGIN
								SET @tasa=@tasa_doc;
							END;

							INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
											fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
											deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
											fec_tas, tasa, ind_tas,difcam_doc)
							VALUES (@ano_doc, @per_doc, @sub_tip, @tip_doc, @num_doc,@wreg, 
										@fch_doc, @wven, @acod_suc, @acod_cco, @acod_cl1, @acod_cl2, @acod_cl3, 
										@nit_pro, 0, @aNet_doc, LEFT(RTRIM(@des_mov),60), @aBase_doc, @num_che, '', '', @ind_mp, @fec_tas, 
										@tasa, @ind_tas,0);

							SET @wreg=@wreg+1;
					
							SET @conta8=@conta8+1;
						END;
					END;
				END;

				-- DESCUENTO
				IF @val_des>0
				BEGIN
					SELECT @wdes=n_wdesn 
					FROM cxp_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @wdes, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wdes, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, @val_des, 0,LEFT(RTRIM(@des_mov),60), 
								0 ,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				--	IMPUESTOS ADICIONALES
				-- SUMA 1
				IF @mon_sum1>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @cta_sum1, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_sum1, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @mon_sum1, 
								LEFT(RTRIM(@des_mov),60), @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- SUMA 2
				IF @mon_sum2>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @cta_sum2, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_sum2, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @mon_sum2, 
								LEFT(RTRIM(@des_mov),60), @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- SUMA 3
				IF @mon_sum3>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @cta_sum3, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_sum3, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @mon_sum3, 
								LEFT(RTRIM(@des_mov),60), @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- SUMA 4
				IF @mon_sum4>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @cta_sum4, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_sum4, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @mon_sum4, 
								LEFT(RTRIM(@des_mov),60), @base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- RESTA 1
				IF @mon_res1>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @cta_res1, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res1, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, @mon_res1, 0,LEFT(RTRIM(@des_mov),60), 
								@base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- RESTA 2
				IF @mon_res2>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @cta_res2, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res2, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, @mon_res2, 0,LEFT(RTRIM(@des_mov),60), 
								@base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- RESTA 3
				IF @mon_res3>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @cta_res3, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res3, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, @mon_res3, 0,LEFT(RTRIM(@des_mov),60), 
								@base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- RESTA 4
				IF @mon_res4>0
				BEGIN
					EXEC sp_gen_trae_tasa_niif @cta_res4, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@cta_res4, 
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, @mon_res4, 0,LEFT(RTRIM(@des_mov),60), 
								@base_cnt,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

					SET @wreg=@wreg+1;
				END;

				-- GASTO
				IF @ind_afe='0'
				BEGIN
					IF @dcta_gas <>'0'
					BEGIN
						EXEC sp_gen_trae_tasa_niif @dcta_gas, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
										fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
										deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
										fec_tas, tasa, ind_tas,difcam_doc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@dcta_gas, 
									@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @net_doc, 
									LEFT(RTRIM(@des_mov),60), @sub_doc,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

						SET @wreg=@wreg+1;
					END;
					ELSE
					BEGIN
						SELECT @wven=n_wvenn 
						FROM cxp_param_cnt 
						WHERE llave=@ind_con;

						EXEC sp_gen_trae_tasa_niif @wven, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
										fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
										deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
										fec_tas, tasa, ind_tas,difcam_doc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wven, 
									@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @net_doc, 
									LEFT(RTRIM(@des_mov),60), @sub_doc,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

						SET @wreg=@wreg+1;
					END;
				END;
				ELSE
				BEGIN
					DELETE FROM #t_afecon_p;
				
					INSERT INTO #t_afecon_p(Cod_cta,Cod_suc,Cod_cco,Cod_cl1,Cod_cl2,Cod_cl3,valor,base)
					SELECT cod_cta_niif, Cod_suc, Cod_cco, Cod_cl1, Cod_cl2, Cod_cl3, ROUND((Porcentaje/100)*@Net_doc,@num_dec) AS valor, ROUND((Porcentaje/100)*@sub_doc,@num_dec) AS base
					FROM Cxp_distriafe 
					WHERE Cod_afe= @Ind_afe;

					SELECT @gas_dist=ISNULL(SUM(valor),0), @base_dist=ISNULL(SUM(base),0) 
					FROM #t_afecon_p;
								
					IF @gas_dist>0 AND @net_doc<>@gas_dist
					BEGIN
						SELECT TOP 1 @conta7=recno 
						FROM #t_afecon_p 
						ORDER BY valor DESC;
				
						UPDATE #t_afecon_p SET valor=valor+(@net_doc-@gas_dist), base=base+(@sub_doc-@base_dist) 
						WHERE recno=@conta7;
					END;

					SELECT @conta9=ISNULL(COUNT(1),0) 
					FROM #t_afecon_p;

					SELECT @conta8=MIN(recno) 
					FROM #t_afecon_p;

					SELECT @conta9=MAX(recno) 
					FROM #t_afecon_p;

					SET @wreg=@wreg+1;

					WHILE @conta8<=@conta9
					BEGIN
						SELECT @Wven=Cod_cta, @aCod_suc=Cod_suc, @aCod_cco=Cod_cco, @aCod_cl1=Cod_cl1, 
						@aCod_cl2=cod_cl2, @aCod_cl3=cod_cl3, @aNet_doc=valor, @aBase_doc=base
						FROM #t_afecon_p
						WHERE recno=@conta8;
				
						EXEC sp_gen_trae_tasa_niif @wven, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
										fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
										deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
										fec_tas, tasa, ind_tas,difcam_doc)
						VALUES (@ano_doc, @per_doc, @sub_tip, @tip_doc, @num_doc,@wreg, 
									@fch_doc, @wven, @acod_suc, @acod_cco, @acod_cl1, @acod_cl2, @acod_cl3, 
									@nit_pro, 0, @aNet_doc, LEFT(RTRIM(@des_mov),60), @aBase_doc, @num_che, '', '', @ind_mp, @fec_tas, 
									@tasa, @ind_tas,0);

						SET @wreg=@wreg+1;
					
						SET @conta8=@conta8+1;
					END;
				END;
			
				-- SE AGREGA LA AFECTACION CONTABLE PARA MAYOR Y MENOR VALOR
				-- MENOR VALOR			
				IF @men_val>0
				BEGIN
					SELECT @wmen=n_otr_dto 
					FROM cxp_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @wmen,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc,
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wmen,
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro,0,@men_val,LEFT(RTRIM(@des_mov),60),
								@base_cnt,@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);

					SET @wreg=@wreg+1;
				END;
			
				-- MAYOR VALOR
				IF @may_val>0
				BEGIN
					SELECT @wmay=n_otr_gas 
					FROM cxp_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @wmay,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc,
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr,
									fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc,@wmay,
								@cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro,@may_val,0,LEFT(RTRIM(@des_mov),60),
								@base_cnt,@num_che,'','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);

					SET @wreg=@wreg+1;
				END;
			
				SET @conta5=@conta5+1;
			END;
		END;

		-- ANTICIPOS
		IF @tip_doc BETWEEN '160' AND '169'
		BEGIN
			INSERT INTO @afecon_p(cod_pro,cod_suc,cod_cco,ind_con,cod_cl1,cod_cl2,cod_cl3,ind_afe,val_doc)
			SELECT cod_pro,cod_suc,cod_cco,ind_con,cod_cl1,cod_cl2,cod_cl3,Ind_afe,SUM(val_doc)
			FROM cxp_cuedoc WITH (NOLOCK)
			WHERE ano_doc=RTRIM(@ano_doc) 
				AND per_doc=RTRIM(@per_doc) 
				AND sub_tip=RTRIM(@sub_tip) 
				AND num_doc=RTRIM(@num_doc)
			GROUP BY cod_suc,cod_cco,cod_pro,ind_con,cod_cl1,cod_cl2,cod_cl3,Ind_afe;

			SET @conta5=1;
			SELECT @conta6=ISNULL(COUNT(1),0) 
			FROM @afecon_p;

			SELECT @wreg=1;

			WHILE @conta5<=@conta6
			BEGIN
				SELECT	@cod_pro=cod_pro,@cod_suc=cod_suc,@cod_cco=cod_cco,@ind_con=ind_con,@cod_cl1=cod_cl1,@cod_cl2=cod_cl2,@cod_cl3=cod_cl3,@ind_afe=ind_afe
							,@val_doc=val_doc
				FROM @afecon_p
				WHERE recno=@conta5;

				SET @val_doc=ROUND(@val_doc,@num_dec);

				SET @num_che=ISNULL(@num_che,'0');
			
				-- BANCOS
				SELECT @wban=n_wvena 
				FROM cxp_param_cnt 
				WHERE llave=@ind_con;

				EXEC sp_gen_trae_tasa_niif @wban, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
								fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
								deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
								fec_tas, tasa, ind_tas,difcam_doc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc, 
							@wban, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @val_doc, 
							LEFT(RTRIM(@des_mov),60), @val_doc,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

				SET @wreg=@wreg+1;

				-- ANTICIPOS
				SELECT @want=n_wanta 
				FROM cxp_param_cnt 
				WHERE llave=@ind_con;

				EXEC sp_gen_trae_tasa_niif @want, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
								fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
								deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
								fec_tas, tasa, ind_tas,difcam_doc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc, 
							@want, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, @val_doc, 
							0,LEFT(RTRIM(@des_mov),60), @val_doc,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

				SET @wreg=@wreg+1;

				SET @conta5=@conta5+1;
			END;
		END;

		-- CHEQUES POSTFECHADOS
		IF @tip_doc='170'
		BEGIN
			INSERT INTO @afecon_p(cod_pro,cod_suc,cod_cco,ind_con,cod_cl1,cod_cl2,cod_cl3,ind_afe,val_doc)
			SELECT cod_pro,cod_suc,cod_cco,ind_con,cod_cl1,cod_cl2,cod_cl3,Ind_afe,SUM(val_doc)
			FROM cxp_cuedoc WITH (NOLOCK)
			WHERE ano_doc=RTRIM(@ano_doc) 
				AND per_doc=RTRIM(@per_doc) 
				AND sub_tip=RTRIM(@sub_tip) 
				AND num_doc=RTRIM(@num_doc)
			GROUP BY cod_suc,cod_cco,cod_pro,ind_con,cod_cl1,cod_cl2,cod_cl3,Ind_afe;

			SET @conta5=1;
			SELECT @conta6=ISNULL(COUNT(1),0) 
			FROM @afecon_p;

			SELECT @wreg=1;

			WHILE @conta5<=@conta6
			BEGIN
				SELECT @cod_pro=cod_pro,@cod_suc=cod_suc,@cod_cco=cod_cco,@ind_con=ind_con,@cod_cl1=cod_cl1,@cod_cl2=cod_cl2,@cod_cl3=cod_cl3,@ind_afe=ind_afe,@val_doc=val_doc
				FROM @afecon_p
				WHERE recno=@conta5;

				SET @val_doc=ROUND(@val_doc,@num_dec);

				SET @num_che=ISNULL(@num_che,'0');

				-- DEUDORA CONTROL			
				SELECT @wddc=che_ddc 
				FROM cxp_param_cnt 
				WHERE llave=@ind_con;

				EXEC sp_gen_trae_tasa_niif @wddc, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
									fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
									deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
									fec_tas, tasa, ind_tas,difcam_doc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc, 
							@wddc, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, @val_doc, 0, 
							LEFT(RTRIM(@des_mov),60), @val_doc,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

				SET @wreg=@wreg+1;

				-- DEUDORA CONTROL CONTRAPARTIDA
				SELECT @wdcc=che_dcc 
				FROM cxp_param_cnt 
				WHERE llave=@ind_con;

				EXEC sp_gen_trae_tasa_niif @wdcc, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
								fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
								deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
								fec_tas, tasa, ind_tas,difcam_doc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc, 
							@wdcc, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0, @val_doc, 
							LEFT(RTRIM(@des_mov),60), @val_doc,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

				SET @wreg=@wreg+1;

				SET @conta5=@conta5+1;
			END;
		END;

		-- REVERSION CHEQUES POSTFECHADOS
		IF @tip_doc='171'
		BEGIN
			INSERT INTO @afecon_p(cod_pro,cod_suc,cod_cco,ind_con,cod_cl1,cod_cl2,cod_cl3,ind_afe,val_doc)
			SELECT cod_pro,cod_suc,cod_cco,ind_con,cod_cl1,cod_cl2,cod_cl3,Ind_afe,SUM(val_doc)
			FROM cxp_cuedoc WITH (NOLOCK)
			WHERE ano_doc=RTRIM(@ano_doc) 
				AND per_doc=RTRIM(@per_doc) 
				AND sub_tip=RTRIM(@sub_tip) 
				AND num_doc=RTRIM(@num_doc)
			GROUP BY cod_suc,cod_cco,cod_pro,ind_con,cod_cl1,cod_cl2,cod_cl3,Ind_afe;

			SET @conta5=1;
			SELECT @conta6=ISNULL(COUNT(1),0) 
			FROM @afecon_p;

			SELECT @wreg=1;

			WHILE @conta5<=@conta6
			BEGIN
				SELECT @cod_pro=cod_pro,@cod_suc=cod_suc,@cod_cco=cod_cco,@ind_con=ind_con,@cod_cl1=cod_cl1,@cod_cl2=cod_cl2,@cod_cl3=cod_cl3,@ind_afe=ind_afe
							,@val_doc=val_doc
				FROM @afecon_p
				WHERE recno=@conta5;

				SET @val_doc=ROUND(@val_doc,@num_dec);

				SET @num_che=ISNULL(@num_che,'0');

				-- DEUDORA CONTROL			
				SELECT @wddc=che_ddc 
				FROM cxp_param_cnt 
				WHERE llave=@ind_con;

				EXEC sp_gen_trae_tasa_niif @wddc, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
								fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
								deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
								fec_tas, tasa, ind_tas,difcam_doc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc, 
							@wddc, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, 0,@val_doc, 
							LEFT(RTRIM(@des_mov),60), @val_doc,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);
			
				SET @wreg=@wreg+1;

				-- DEUDORA CONTROL CONTRA
				SELECT @wdcc=che_dcc 
				FROM cxp_param_cnt 
				WHERE llave=@ind_con;

				EXEC sp_gen_trae_tasa_niif @wdcc, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				INSERT INTO #Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
								fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
								deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
								fec_tas, tasa, ind_tas,difcam_doc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@wreg,@fch_doc, 
							@wdcc, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,@nit_pro, @val_doc,0,
							LEFT(RTRIM(@des_mov),60), @val_doc,@num_che,'','', @ind_mp, @fec_tas, @tasa, @ind_tas,0);

				SET @wreg=@wreg+1;

				SET @conta5=@conta5+1;
			END;
		END;
	END;

	IF OBJECT_ID('Tempdb..#Cxp_inf_nif') IS NOT NULL
	BEGIN
		DELETE cxp_inf_nif
		WHERE ano_doc=RTRIM(@ano_doc) 
			AND per_doc=RTRIM(@per_doc) 
			AND sub_tip=RTRIM(@sub_tip) 
			AND num_doc=RTRIM(@num_doc);

		UPDATE C SET
		Cod_cco = CASE WHEN p.ind_cco=1 THEN c.Cod_cco ELSE '0' END ,
		Cod_cl1 = CASE WHEN p.ind_cl1=1 THEN c.Cod_cl1 ELSE '0' END ,
		Cod_cl2 = CASE WHEN p.ind_cl2=1 THEN c.Cod_cl2 ELSE '0' END ,
		Cod_cl3 = CASE WHEN p.ind_cl3=1 THEN c.Cod_cl3 ELSE '0' END ,
		bas_mov = CASE WHEN p.ind_bas=1 THEN c.bas_mov ELSE 0 END,
		cod_ter = CASE WHEN p.ind_ter=1 THEN '0' ELSE c.cod_ter END 
		FROM #Cxp_inf_nif AS C 
		INNER JOIN nif_puc AS p WITH (NOLOCK) ON c.cod_cta= p.cod_cta;

		SELECT ano_doc, per_doc, sub_tip, tip_doc, num_doc, IDENTITY(int, 1,1) AS Reg_doc , 
		cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, SUM(deb_mov) AS 
		deb_mov, SUM(cre_mov) AS cre_mov, fch_doc, cod_ter, ind_tra, des_mov, 
		SUM(bas_mov) AS bas_mov, num_che, ind_cos, ind_mr, fec_tas, tasa, ind_mod, ind_tas,difcam_doc
			INTO #Cxp_inf_nif1 
		FROM #Cxp_inf_nif 
		WHERE deb_mov>0
		GROUP BY ano_doc, per_doc, sub_tip, tip_doc, num_doc, cod_cta, cod_suc, cod_cco, 
				cod_cl1, cod_cl2, cod_cl3, fch_doc, cod_ter, ind_tra, des_mov, num_che, 
				ind_cos, ind_mr, fec_tas, tasa, ind_mod, ind_tas,difcam_doc
		ORDER BY ano_doc, per_doc, sub_tip, tip_doc, num_doc, cod_cta, cod_suc,difcam_doc;

		INSERT INTO #Cxp_inf_nif1 (ano_doc, per_doc, sub_tip, tip_doc, num_doc,cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, 
						deb_mov, cre_mov, fch_doc, cod_ter, ind_tra, des_mov, bas_mov, num_che, ind_cos, ind_mr, fec_tas, tasa, ind_mod, ind_tas,difcam_doc)
		SELECT ano_doc, per_doc, sub_tip, tip_doc, num_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, SUM(deb_mov) AS 
					deb_mov, SUM(cre_mov) AS cre_mov, fch_doc, cod_ter, ind_tra, des_mov, 
					SUM(bas_mov) AS bas_mov, num_che, ind_cos, ind_mr, fec_tas, tasa, ind_mod, ind_tas,difcam_doc
		FROM #Cxp_inf_nif 
		WHERE cre_mov>0
		GROUP BY ano_doc, per_doc, sub_tip, tip_doc, num_doc, cod_cta, cod_suc, cod_cco, 
				cod_cl1, cod_cl2, cod_cl3, fch_doc, cod_ter, ind_tra, des_mov, num_che, 
				ind_cos, ind_mr, fec_tas, tasa, ind_mod, ind_tas,difcam_doc
		ORDER BY ano_doc, per_doc, sub_tip, tip_doc, num_doc, cod_cta, cod_suc;

		INSERT INTO Cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, Reg_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, 
						deb_mov, cre_mov, fch_doc, cod_ter, ind_tra, des_mov, bas_mov, num_che, ind_cos, ind_mr, fec_tas, tasa, ind_mod, ind_tas,difcam_doc)
		SELECT ano_doc, per_doc, sub_tip, tip_doc, num_doc, LTRIM(RTRIM(CONVERT(CHAR,ROW_NUMBER() OVER (ORDER BY difcam_doc)))) , cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, deb_mov, cre_mov, 
					fch_doc, cod_ter, ind_tra, des_mov, bas_mov, num_che, ind_cos, ind_mr, fec_tas, tasa, ind_mod, ind_tas,difcam_doc 
		FROM #Cxp_inf_nif1
		ORDER BY ano_doc, per_doc, sub_tip, num_doc, Reg_doc;

		DROP TABLE #Cxp_inf_nif;
		DROP TABLE #Cxp_inf_nif1;

		-- CONTABILIZAMOS LAS FACTURAS AFECTANDO LAS PROVISIONES DE COSTOS DE NACIONALIZACION
		IF @pre_fac>0
		BEGIN
			EXEC sp_cxp_reverprov @ano_doc, @per_doc, @tip_doc, @num_doc, @cod_pro, @fch_doc;
		END;

		--  VALIDAMOS EL CUADRE DEL DOCUMENTO
		SELECT @max_aju=max_aju,@aju_deb=aju_deb,@aju_cre=aju_cre,@aju_suc=aju_suc,@aju_cco=aju_cco,
					@aju_cl1=aju_cl1,@aju_cl2=aju_cl2,@aju_cl3=aju_cl3,@aju_ter=aju_ter 
		FROM nif_cuadre_tipos 
		WHERE cod_tip=@tip_doc 
			AND tip_mon=@ind_mp;

		BEGIN
			SELECT @tot_deb=SUM(deb_mov), @tot_cre=SUM(cre_mov), @max_reg=MAX(CONVERT(INT,reg_doc))+1 
			FROM cxp_inf_nif 
			WHERE ano_doc=@ano_doc 
				AND per_doc=@per_doc 
				AND sub_tip=@sub_tip 
				AND num_doc=@num_doc;

			IF (@tot_deb-@tot_cre) BETWEEN @max_aju*-1 AND @max_aju AND @tot_deb<>@tot_cre
			BEGIN
				IF @tot_deb<@tot_cre
				BEGIN
					INSERT INTO cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, fch_doc, cod_cta, cod_suc, 
									cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, 
									ind_tra, ind_mr, fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc, @per_doc, @sub_tip, @tip_doc, @num_doc, LTRIM(STR(@max_reg)), 
								@fch_doc, @aju_deb, @aju_suc, @aju_cco, @aju_cl1, @aju_cl2, @aju_cl3, @aju_ter, ABS(@tot_deb-@tot_cre), 0, 
								'REGISTRO DE CUADRE X REDONDEO', 0, '', '', '', @ind_mp, @fec_tas, @tasa, @ind_tas,0);
				END;
				ELSE
				BEGIN
					INSERT INTO cxp_inf_nif (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, fch_doc, cod_cta, cod_suc, 
									cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, 
									ind_tra, ind_mr, fec_tas, tasa, ind_tas,difcam_doc)
					VALUES (@ano_doc, @per_doc, @sub_tip, @tip_doc, @num_doc, LTRIM(STR(@max_reg)), 
								@fch_doc, @aju_cre, @aju_suc, @aju_cco, @aju_cl1, @aju_cl2, @aju_cl3, @aju_ter, 0, ABS(@tot_deb-@tot_cre), 
								'REGISTRO DE CUADRE X REDONDEO', 0, '', '', '', @ind_mp, @fec_tas, @tasa, @ind_tas,0);
				END;
			END;
		END;
	END;
END;

```
