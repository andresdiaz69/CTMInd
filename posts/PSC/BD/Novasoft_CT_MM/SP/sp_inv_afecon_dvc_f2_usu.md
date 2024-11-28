# Stored Procedure: sp_inv_afecon_dvc_f2_usu

## Usa los objetos:
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
SE ADECUA A LA VERSION WEB
JSARMIENTO JUNIO/2014 SRS: 2014-0188
SE AGREGA LA CONTABILIZACION DE LA RETENCION DE ICA DE ACUERDO A PARAMETRO DE INVENTARIOS
JSARMIENTO FEBRERO/2015 SRS: 2015-0066
SE ADICIONA cod_cta_niif PARA PROVEEDOR Y CUENTAS DE IMPUESTO DE SUMA Y RESTA PARA NIIF, PARA QUE AL HACER LA 
CONTABILIZACION VISUALICE LA LOCAL Y LAS NIIF GJPULIDO SRS 2015-0499
SE AGREGA A LA CONTABILIZACION DE DEVOLUCION DE COMPRAS EL CALCULO DE VALORES EN MONEDA EXTRANJERA
JSARMIENTO OCTUBRE/2015 SRS: 2015-0781
SE CORRIGE LA CONSULTA DE INFORMACION DE PROVEEDOR PARA QUE SE REALICE POR CODIGO Y NO POR EL NIT
JSARMIENTO AGOSTO/2016 SRS2016-0629
SE CORRIGE LA ASIGNACION DE LA CUENTA CONTABLE DE PROVEEDOR DEPENDIENDO DEL PARAMETRO GENERAL DE INVENTARIOS
JSARMIENTO OCTUBRE/2016 SRS2016-0840
SE ASIGNA LA CUENTA DE GASTO E IVA NG SI CONCIDE CON LA INFORMACION DE DISTRIBUCION DE ESTRUCTURA DE COSTOS
JSARMIENTO NOVIEMBRE/2016 SPR2016-0012
SE CONSULTA LA CUENTA DE DISTRIBUCION DE ESTRUCTURA DE COSTOS DE ACUERDO AL NIVEL DE PARAMETROS GENERALES
JSARMIENTO DICIEMBRE/2016 SNR2016-0056
SE AGREGA A LA CONTABILIZACION DE DISTRIBUCION CONTABLE DE IVA NO GRAVADO LA BASE SI APLICA
SE CORRIGE LA ASIGNACION DE LA BASE DE IMPUESTOS EN DEVOLUCION DE COMPRA YA QUE SE VERIFICA LA BASE DE IMPUESTOS
SE MODIFICA LA CONTABILIZACION DE LA CUENTA DE AJUSTE DE COMPRAS PARA QUE SE AFECTE LA CUENTA NIIF Y NO LA LOCAL
JSARMIENTO AGOSTO/2017 SRS2017-0855
SE AGREGA DESCRIPCION A CADA MOVIMIENTO CONTABLE
JASRMIENTO SEPTIEMBRE/2017 SRS2017-1054*/
CREATE PROCEDURE [dbo].[sp_inv_afecon_dvc_f2_usu]
	@ano_doc	CHAR(4),
	@per_doc	CHAR(2),
	@sub_tip	CHAR(5),
	@num_doc	CHAR(14)

AS
BEGIN
	DECLARE @fecha		DATETIME;

	--CUENTAS
	DECLARE @ret_ven	VARCHAR(16);
	DECLARE @iva_ven	VARCHAR(16);
	DECLARE @imp_conv	VARCHAR(16);
	DECLARE @iva_ng		VARCHAR(16);
	DECLARE @inv_ven	VARCHAR(16);
	DECLARE @cos_ven	VARCHAR(16);
	DECLARE @ret_iva_c	VARCHAR(16);
	DECLARE @ret_ica_c	VARCHAR(16);
	DECLARE @des_ven	VARCHAR(16);
	DECLARE @cta_cxp	VARCHAR(16);
	DECLARE @icta_cxp	VARCHAR(16);
	DECLARE @cta_egrd	VARCHAR(16);
	DECLARE @aju_com	VARCHAR(16);
	DECLARE @iva_pag	VARCHAR(16);
	DECLARE @cos_unai	MONEY;
	DECLARE @ant_cxp	VARCHAR(16);

	--DOCUMENTOS
	DECLARE @item			VARCHAR(40);
	DECLARE @ven_net		MONEY;
	DECLARE @pre_tot		MONEY;
	DECLARE @mon_des		MONEY;
	DECLARE @mon_iva		MONEY;
	DECLARE @mon_iva_ng	MONEY;
	DECLARE @imp_con		MONEY;
	DECLARE @mon_ret		MONEY;
	DECLARE @ret_iva		MONEY;
	DECLARE @ret_ica		MONEY;
	DECLARE @cob_ica		MONEY;
	DECLARE @val_def		MONEY;
	DECLARE @cos_toa		MONEY;
	DECLARE @bas_mov		MONEY;
	DECLARE @cod_cl1		VARCHAR(12);
	DECLARE @cod_cl2		VARCHAR(12);
	DECLARE @cod_cl3		VARCHAR(12);
	DECLARE @cod_ter		CHAR(15);
	DECLARE @reg1			SMALLINT;
	DECLARE @cod_suc		CHAR(3);
	DECLARE @cod_cco		CHAR(10);
	DECLARE @provee		CHAR(15);
	DECLARE @ant_doc		MONEY;
	DECLARE @obs_orc		VARCHAR(100);
	DECLARE @cod_ret		CHAR(3);
	
	--INDICADORES
	DECLARE @wind_cxp		SMALLINT;
	DECLARE @ind_tip		SMALLINT;
	DECLARE @ind_cta_ret	TINYINT;

	--VARIABLES MULTIMONEDA
	DECLARE @ind_mp	CHAR(2);
	DECLARE @fec_tas	DATETIME;
	DECLARE @tasa		MONEY;
	DECLARE @prt_ext	MONEY;
	DECLARE @cot_ext	MONEY;
	DECLARE @des_ext	MONEY;
	DECLARE @tasa_doc	MONEY;
	DECLARE @ind_tas	CHAR(1);

	-- NIT PARA CONTABILIZAR
	DECLARE @ind_pro	SMALLINT;
	DECLARE @nit_pro	CHAR(15);

	--REDONDEO DE DECIMALES
	DECLARE @num_dec	SMALLINT;
				
	DECLARE @vr_aju_com	MONEY;	
		
	DECLARE @val_tot	MONEY;		

	DECLARE @acod_suc		CHAR(3);
	DECLARE @acod_cco		CHAR(10);
	DECLARE @acod_cl1		VARCHAR(12);
	DECLARE @acod_cl2		VARCHAR(12);
	DECLARE @acod_cl3		VARCHAR(12);
	DECLARE @aNet_doc		MONEY,
				@ind_afe			CHAR(3),
				@wven				CHAR(16);				
				
	DECLARE @cta_cpf		CHAR(16),
				@cta_gfi		CHAR(16),
				@val_fin		MONEY,
				@val_tcd		MONEY;
	
	DECLARE @docs	TABLE (item			VARCHAR(40)	COLLATE DATABASE_DEFAULT,
								   pre_tot			MONEY,
								   mon_des		MONEY,
								   mon_iva			MONEY,
								   mon_iva_ng	MONEY,
								   imp_con			MONEY,
								   cod_ret			CHAR(3) COLLATE DATABASE_DEFAULT,
								   mon_ret			MONEY,
								   ret_iva			MONEY,
								   ret_ica			MONEY,
								   cob_ica			MONEY,
								   val_def			MONEY,
								   cos_toa			MONEY,
								   ven_net			MONEY,
								   cod_cco			CHAR(10)	COLLATE DATABASE_DEFAULT,
								   cod_cl1			VARCHAR(12)	COLLATE DATABASE_DEFAULT,
								   cod_cl2			VARCHAR(12)	COLLATE DATABASE_DEFAULT,
								   cod_cl3			VARCHAR(12)	COLLATE DATABASE_DEFAULT,
								   cos_unai			MONEY,
								   prt_ext			MONEY,
								   cot_ext			MONEY,
								   des_ext			MONEY,
								   val_tot			MONEY,
								   val_tcd			MONEY,
								   ind_afe			CHAR(3)	COLLATE DATABASE_DEFAULT,
								   mon_sum1		MONEY,
								   mon_sum2		MONEY,
								   mon_sum3		MONEY,
								   mon_sum4		MONEY,
								   mon_res1		MONEY,
								   mon_res2		MONEY,
								   mon_res3		MONEY,
								   mon_res4		MONEY,
								   cod_ica			VARCHAR(10) COLLATE DATABASE_DEFAULT,
								   cod_gru			CHAR(3) COLLATE DATABASE_DEFAULT, 
								   base_iva_aiu	MONEY,
								   recno				INT PRIMARY KEY IDENTITY
								);
	
	DECLARE @conteo1	INT;
	DECLARE @conteo2	INT;
	DECLARE @conteo3	INT;
	DECLARE @conteo4	INT;

	DECLARE @ind_cta_cxp	TINYINT;		-- 1. Proveedor  2. Item

	DECLARE @dis_dvc	TABLE(Cod_cta	CHAR(16)	COLLATE DATABASE_DEFAULT,
									  Cod_suc		CHAR(3)	COLLATE DATABASE_DEFAULT,
									  Cod_cco		CHAR(10)	COLLATE DATABASE_DEFAULT,
									  Cod_cl1		VARCHAR(12)	COLLATE DATABASE_DEFAULT,
									  Cod_cl2		VARCHAR(12)	COLLATE DATABASE_DEFAULT,
									  Cod_cl3		VARCHAR(12)	COLLATE DATABASE_DEFAULT,
									  val_dis			MONEY,
									  bas_dis		MONEY,
									  id				INT PRIMARY KEY
									  );

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
	DECLARE @base_imp			MONEY;
	DECLARE @base_iva_aiu		MONEY;
	DECLARE @aBas_Doc			MONEY;
	DECLARE @base_rii			MONEY;

	SET NOCOUNT ON;
	
	SELECT  @ind_tip=ind_tip, @ind_mp=ind_mp, @fec_tas=fec_tas, @tasa=tasa, @obs_orc=obs_orc, @tasa_doc=tasa, @ind_tas=ind_tas, @fecha=fecha,@ant_doc=ant_doc,
				@pai_doc=pai_doc,@dep_doc=dep_doc,@ciu_doc=ciu_doc, @cod_suc=cod_suc, @provee=provee
	FROM inv_cabdoc  
	WHERE  ano_doc=@ano_doc 
			AND per_doc=@per_doc 
			AND sub_tip=@sub_tip 
			AND num_doc=@num_doc;

	-- TRAEMOS NUMERO DE DECIMALES PARA REDONDEAR LOS VALORES ANTES DE SUBIRLOS A CONTABILIDAD
	SELECT @num_dec=dec_int 
	FROM gen_decapl 
	WHERE cod_apl='INV' 
			AND tip_mon=@ind_mp;

	SET @num_dec=ISNULL(@num_dec,4);

	SELECT @wind_cxp=ind_cxp,@cta_cpf=cta_cpf, @cta_gfi=cta_gfi,@ind_cta_cxp=ind_cta_cxp,@ind_cta_ret=cta_ret_com,@ind_cta_ica=ind_cta_ica, @niv_dist = niv_asig_dist 
	FROM inv_param_cnt 
	WHERE llave='0';

	SET @cod_ter=@provee;

	IF @ind_cta_cxp=1
	BEGIN
		IF @wind_cxp=1
		BEGIN
			SELECT @cta_cxp=cod_cta_niif, @nit_pro=nce 
			FROM cxp_provee 
			WHERE provee=@provee;

			SELECT @ind_pro=ind_ter
			FROM cxp_param
			WHERE cod_par='0';

			SELECT  @cta_cpf=n_cta_cpf, @cta_gfi=n_cta_gfi, @ant_cxp=fa_ant 
			FROM cxp_param_cnt 
			WHERE llave='0';
			
			IF @ind_pro=2
			BEGIN
				SET @cod_ter=@nit_pro;
			END;
		END;
		ELSE
		BEGIN
			SELECT @cta_cxp=cue_cxp FROM inv_param_cnt WHERE llave='0';
		END;
	END;
	
	INSERT INTO @docs(item,pre_tot,mon_des,mon_iva,mon_iva_ng,imp_con,cue.cod_ret,mon_ret,ret_iva,ret_ica,
								cob_ica,val_def,cos_toa,ven_net,cod_cco,cod_cl1,cod_cl2,cod_cl3,
								cos_unai,prt_ext,cot_ext,des_ext,val_tot,val_tcd,ind_afe,mon_sum1,
								mon_sum2,mon_sum3,mon_sum4,mon_res1,mon_res2,mon_res3,mon_res4,cod_ica,cod_gru,base_iva_aiu)
	SELECT cue.item,SUM(cue.pre_tot),SUM(cue.mon_des),SUM(cue.mon_iva),SUM(cue.mon_iva_ng),SUM(cue.imp_con),cue.cod_ret,SUM(cue.mon_ret),SUM(cue.ret_iva),SUM(cue.ret_ica),
			SUM(cue.cob_ica),SUM(cue.val_def),SUM(cue.cos_toa),SUM(cue.ven_net),cue.cod_cco,cue.cod_cl1,cue.cod_cl2,cue.cod_cl3,
			SUM(cue.cos_unai),SUM(cue.prt_ext),SUM(cue.cot_ext),SUM(cue.des_ext),SUM(cue.val_tot), SUM(cue.val_tcd),ISNULL(cue.ind_afe,'0'),SUM(cue.mon_sum1),
			SUM(cue.mon_sum2),SUM(cue.mon_sum3),SUM(cue.mon_sum4),SUM(cue.mon_res1),SUM(cue.mon_res2),SUM(cue.mon_res3),SUM(cue.mon_res4),cue.cod_ica,ite.cod_grupo,SUM(base_iva_aiu)
	FROM inv_cuedoc AS cue 
		INNER JOIN inv_items AS ite ON ite.cod_item = cue.item
	WHERE  cue.ano_doc=@ano_doc 
		AND cue.per_doc=@per_doc 
		AND cue.sub_tip=@sub_tip 
		AND cue.num_doc=@num_doc
	GROUP BY cue.item,ite.cod_grupo,cue.cod_cco,cue.cod_cl1,cue.cod_cl2,cue.cod_cl3,cue.cod_egr,cue.ind_afe,cue.cod_ret,cue.cod_ica;

	SELECT @conteo1 = COUNT(1) FROM @docs;
	SET @conteo1 = ISNULL(@conteo1,0);

	SET @conteo2 = 1;

	WHILE @conteo2 <= @conteo1 
	BEGIN
		SELECT @item=item,@pre_tot=pre_tot,@mon_des=mon_des,@mon_iva=mon_iva,@mon_iva_ng=mon_iva_ng,@imp_con=imp_con,@mon_ret=mon_ret,@ret_iva=ret_iva,
					@ret_ica=ret_ica,@cob_ica=cob_ica,@val_def=val_def,@cos_toa=cos_toa,@ven_net=ven_net,@cod_cco=cod_cco,
					@cod_cl1=cod_cl1,@cod_cl2=cod_cl2,@cod_cl3=cod_cl3,@cos_unai=cos_unai,@prt_ext=prt_ext,@cot_ext=cot_ext,@des_ext=des_ext,
					@val_tot=val_tot,@val_tcd=val_tcd,@ind_afe=ind_afe,@mon_sum1=mon_sum1,@mon_sum2=mon_sum2,@mon_sum3=mon_sum3,@mon_sum4=mon_sum4,
					@mon_res1=mon_res1,@mon_res2=mon_res2,@mon_res3=mon_res3,@mon_res4=mon_res4,@cod_ret=cod_ret,
					@cod_ica=cod_ica,@cod_gru=cod_gru,@base_iva_aiu=base_iva_aiu
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
			SET @cos_unai=ROUND(@cos_unai,@num_dec);
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
		END;
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
			END;
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
				END;
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
					END;
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
						END;
						ELSE
						BEGIN
							SET @dcta_gasto = 0;
							SET @dcta_ivang = 0;
						END;
					END;
				END;
			END;
		END;

		-- DEVOLUCION COMPRAS
		BEGIN
			IF @pre_tot>0
			BEGIN
				IF @ind_mp BETWEEN '01' AND '98'
				BEGIN 
					SET @pre_tot=ROUND(@prt_ext,@num_dec);
					SET @cos_toa=ROUND(@cot_ext,@num_dec);
					SET @mon_des=ROUND(@des_ext,@num_dec);
					SET @ven_net=ROUND(@prt_ext-@des_ext,@num_dec);
					SET @mon_iva=ROUND((@mon_iva/@tasa_doc),@num_dec);
					SET @mon_iva_ng=ROUND((@mon_iva_ng/@tasa_doc),@num_dec);
					SET @imp_con=ROUND((@imp_con/@tasa_doc),@num_dec);
					SET @mon_ret=ROUND((@mon_ret/@tasa_doc),@num_dec);
					SET @ret_iva=ROUND((@ret_iva/@tasa_doc),@num_dec);
					SET @ret_ica=ROUND((@ret_ica/@tasa_doc),@num_dec);
					SET @mon_sum1=ROUND((@mon_sum1/@tasa_doc),@num_dec);
					SET @mon_sum2=ROUND((@mon_sum2/@tasa_doc),@num_dec);
					SET @mon_sum3=ROUND((@mon_sum3/@tasa_doc),@num_dec);
					SET @mon_sum4=ROUND((@mon_sum4/@tasa_doc),@num_dec);
					SET @mon_res1=ROUND((@mon_res1/@tasa_doc),@num_dec);
					SET @mon_res2=ROUND((@mon_res2/@tasa_doc),@num_dec);
					SET @mon_res3=ROUND((@mon_res3/@tasa_doc),@num_dec);
					SET @mon_res4=ROUND((@mon_res4/@tasa_doc),@num_dec);
					SET @val_tcd=ROUND((@val_tcd/@tasa_doc),@num_dec);
					
					SET @val_def=CASE @ind_tip WHEN '3' THEN @ven_net+@mon_iva+@mon_iva_ng+@imp_con-(@mon_ret)-(@ret_ica)+@mon_sum1+@mon_sum2
																				+@mon_sum3+@mon_sum4-(@mon_res1)-(@mon_res2)-(@mon_res3)-(@mon_res4)
																		ELSE @ven_net+@mon_iva+@mon_iva_ng+@imp_con-(@mon_ret)-(@ret_ica)-(@ret_iva)+@mon_sum1+@mon_sum2
																				+@mon_sum3+@mon_sum4-(@mon_res1)-(@mon_res2)-(@mon_res3)-(@mon_res4)
					END;


				END;
				
				SELECT @ret_ven=n_ret_com,@iva_ven=iva_dvc,@des_ven=n_des_com,@cta_egrd=n_cta_egrd,@ret_iva_c=n_riv_com,@ret_ica_c=n_ica_com,
						@inv_ven=n_inv_com,@iva_ng=n_iva_ng,@imp_conv=n_imp_con,@cos_ven=n_cos_com,@iva_pag=n_iva_pag,@aju_com=n_aju_dev,@icta_cxp=n_cta_cxp_c  
				FROM inv_items 
				WHERE cod_item=@item;

				IF @ind_cta_cxp = 2
				BEGIN
					SET @cta_cxp=@icta_cxp;
				END;
				
				 --Cálculo de Bases de contabilizacion
				SET @bas_mov=@pre_tot-@mon_des;
				SET @base_imp = CASE WHEN @base_iva_aiu = 0 THEN @bas_mov ELSE @base_iva_aiu END;

				--- FINANCIACIÓN
				SET @val_fin=0;

				IF @val_tcd <> @pre_tot AND @val_tcd < @pre_tot AND @val_tcd > 0
				BEGIN
					SET @val_fin=@pre_tot-@val_tcd;
				END;

				IF @ind_afe='0'  ---- NO HAY DISTRIBUCIÓN GASTO ---- 
				BEGIN
					IF @dcta_gasto <> '0'
					BEGIN
						SET @cta_egrd=@dcta_gasto;
					END;

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_egrd, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @cos_toa, 'DESCRIPCION PRECIO', @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
				END;
				ELSE 
				BEGIN 
					-- DISTRIBUCIÓN DEL GASTO
					DELETE FROM @dis_dvc;

					INSERT INTO @dis_dvc(Cod_cta,Cod_suc,Cod_cco,Cod_cl1,Cod_cl2,Cod_cl3,val_dis,bas_dis
													,id)
					SELECT cod_cta_niif, Cod_suc, Cod_cco, Cod_cl1, Cod_cl2, Cod_cl3, (Porcentaje/100)*(@pre_tot - @val_fin), (Porcentaje/100)*@bas_mov
								,ROW_NUMBER() OVER (ORDER BY Cod_afe, Cod_cta, cod_cta_niif, cta_ivang, cta_ivang_niif, Cod_suc, Cod_cco, Cod_cl1, Cod_cl2, Cod_cl3)
					FROM Cxp_distriafe 
					WHERE Cod_afe= @Ind_afe;
					
					SELECT @conteo3=COUNT(1) 
					FROM @dis_dvc;

					SET @conteo3 = ISNULL(@conteo3,0);

					SET @conteo4 = 1;
					
					WHILE @conteo4<= @conteo3
					BEGIN
						SELECT @Wven=cod_cta, @aCod_suc=Cod_suc, @aCod_cco=Cod_cco, @aCod_cl1=Cod_cl1, @aCod_cl2=Cod_cl2, @aCod_cl3=Cod_cl3, @aNet_doc=val_dis, @aBas_Doc=bas_dis
						FROM @dis_dvc
						WHERE id=@conteo4;

						EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@wven, @acod_suc, @acod_cco, @acod_cl1, @acod_cl2, @acod_cl3,
						@cod_ter, @aNet_doc, 'DESCRIPCION PRECIO', @aBas_Doc ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';

						SET @conteo4 = @conteo4 + 1;
					END;
				END;
			
				--- FINANCIACIÓN
				IF @val_fin > 0
				BEGIN 
					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_cpf, @cod_suc,@cod_cco,@cod_cl1,
					@cod_cl2,@cod_cl3,@cod_ter, @val_fin, 'CUENTA FINANCIACION', @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
			
					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_gfi, @cod_suc,@cod_cco,@cod_cl1,
					@cod_cl2,@cod_cl3,@cod_ter, @val_fin, 'CUENTA ACTIVO DIFERIDO', @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
				END;

				SET @reg1=@reg1+1;
				
				--Ajuste costo promedio
				--PRINT 'Ajuste costo promedio'
				IF @cos_toa <> @val_tcd AND @ind_afe='0'
				BEGIN
					IF @cos_toa > @val_tcd
					BEGIN
						SET @vr_aju_com = @cos_toa - @val_tcd;
						
						EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@aju_com, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
						@cod_ter, @vr_aju_com, 'AJUSTE COSTO PROMEDIO CON VALOR DE FINANCIACION', @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
					END;
					ELSE
					BEGIN
						SET @vr_aju_com = @val_tcd - @cos_toa;
						
						EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@aju_com, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
						@cod_ter, @vr_aju_com, 'AJUSTE COSTO PROMEDIO CON VALOR DE FINANCIACION', @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
					END;
				END;
						
				--Descuentos
				--PRINT 'DESCUENTO'
				IF @mon_des>0
				BEGIN
					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@des_ven, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @mon_des, 'DESCRIPCION DESCUENTO', @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
				END;

				--Iva
				--PRINT 'IVA'
				IF @mon_iva>0
				BEGIN
					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@iva_ven, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @mon_iva, 'DESCRIPCION IVA', @base_imp ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
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
						EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@iva_ng, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
						@cod_ter, @mon_iva_ng, 'DESCRIPCION IVA NO GRAVADO', @base_imp ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
					END;
					ELSE 
					BEGIN 
						-- DISTRIBUCIÓN DEL GASTO
						DELETE FROM @dis_dvc;

						INSERT INTO @dis_dvc(Cod_cta,Cod_suc,Cod_cco,Cod_cl1,Cod_cl2,Cod_cl3,val_dis,bas_dis
														,id)
						SELECT cta_ivang_niif, Cod_suc, Cod_cco, Cod_cl1, Cod_cl2, Cod_cl3, (Porcentaje/100)*@mon_iva_ng, (Porcentaje/100)*@base_imp
									,ROW_NUMBER() OVER (ORDER BY Cod_afe, Cod_cta, cod_cta_niif, cta_ivang, cta_ivang_niif, Cod_suc, Cod_cco, Cod_cl1, Cod_cl2, Cod_cl3)
						FROM Cxp_distriafe 
						WHERE Cod_afe= @Ind_afe;

						SELECT @conteo3 = COUNT(1) 
						FROM @dis_dvc;

						SET @conteo3 = ISNULL(@conteo3,0);

						SET @conteo4 = 1;

						WHILE @conteo4 <= @conteo3
						BEGIN
							SELECT @Wven=Cod_cta, @aCod_suc=Cod_suc, @aCod_cco=cod_cco, @aCod_cl1=cod_cl1, @aCod_cl2=cod_cl2, @aCod_cl3=cod_cl3, @aNet_doc=val_dis, @aBas_Doc=bas_dis
							FROM @dis_dvc
							WHERE id=@conteo4;
						
							EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@wven, @acod_suc, @acod_cco, @acod_cl1, @acod_cl2, @acod_cl3,
							@cod_ter, @aNet_doc, 'DESCRIPCION IVA NO GRAVADO', @aBas_Doc ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';

							SET @conteo4 = @conteo4 + 1;
						END;
					END;
					
				END;

				--Impuesto Consumo
				IF @imp_con>0
				BEGIN
					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@imp_conv, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @imp_con, 'DESCRIPCION CONSUMO', @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
				END;

				--Retencion
				--PRINT 'RETENCION'
				IF @mon_ret>0
				BEGIN
					IF @ind_cta_ret = 2
					BEGIN
						SELECT @ret_ven=cta_ret 
						FROM gen_retencion 
						WHERE cod_ret=@cod_ret;
					END;
							
					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@ret_ven, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @mon_ret, 'DESCRIPCION RETENCION', @base_imp ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
				END;
				
				--Retencion de Iva
				--PRINT 'RETEIVA'
				IF @ret_iva>0
				BEGIN
					SET @base_rii= CASE @ind_tip WHEN 3 THEN @base_imp ELSE @mon_iva+@mon_iva_ng END;

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@ret_iva_c, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @ret_iva, 'DESCRIPCION RETEIVA', @base_rii ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';

					IF @ind_tip=3
					BEGIN
						EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@iva_pag, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
						@cod_ter, @ret_iva, 'DESCRIPCION RETEIVA', @base_imp ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
					END;
				END;

				--Retencion de Ica
				--PRINT 'RETEICA'
				IF @ret_ica>0
				BEGIN
					IF @ind_cta_ica=2
					BEGIN
						SELECT @ret_ica_c=cta_nif_com
						FROM gen_actividad
						WHERE cod_act=@cod_ica 
								AND cod_pai=@pai_doc 
								AND cod_dep=@dep_doc 
								AND cod_ciu=@ciu_doc;
					END;

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@ret_ica_c, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @ret_ica, 'DESCRIPCION RETEICA', @base_imp ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
				END;

				--Impuestos Adicionales
				--Suma1
				IF @mon_sum1 > 0
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

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_sum1, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @mon_sum1, 'DESCRIPCION IMPUESTO SUMA 1', @base_imp ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
				END;

				--Suma2
				IF @mon_sum2 > 0
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

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_sum2, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @mon_sum2, 'DESCRIPCION IMPUESTO SUMA 2', @base_imp ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
				END;

				--Suma3
				IF @mon_sum3 > 0
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

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_sum3, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @mon_sum3, 'DESCRIPCION IMPUESTO SUMA 3', @base_imp ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
				END;

				--Suma4
				IF @mon_sum4 > 0
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

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_sum4, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @mon_sum4, 'DESCRIPCION IMPUESTO SUMA 4', @base_imp ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
				END;

				--Resta1
				IF @mon_res1 > 0
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

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_res1, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @mon_res1, 'DESCRIPCION IMPUESTO RESTA 1', @base_imp ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
				END;

				--Resta2
				IF @mon_res2 > 0
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

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_res2, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @mon_res2, 'DESCRIPCION IMPUESTO RESTA 2', @base_imp ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
				END;

				--Resta3
				IF @mon_res3 > 0
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

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_res3, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @mon_res3, 'DESCRIPCION IMPUESTO RESTA 3', @base_imp ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
				END;

				--Resta4
				IF @mon_res4 > 0
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

					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_res4, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @mon_res4, 'DESCRIPCION IMPUESTO RESTA 4', @base_imp ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
				END;

				--Cuenta por Pagar
				SET @val_def=@val_def-@val_fin;

				EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_cxp, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
				@cod_ter, @val_def, 'DESCRIPCION CXP', @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
			END;
		END;

		SET @conteo2 = @conteo2 + 1;
	END;
	
	-- CONTABILIZAMOS ANTICIPOS PARA DEVOLUCIONES EN COMPRAS
	BEGIN
		--Anticipos
		IF @ant_doc>0
		BEGIN
			EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@ant_cxp, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
			@cod_ter, @ant_doc, 'DESCRIPCION ANTICIPO', @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
			
			EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cta_cxp, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
			@cod_ter, @ant_doc, 'DESCRIPCION ANTICIPO', @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
		END;
	END;
END;

```
