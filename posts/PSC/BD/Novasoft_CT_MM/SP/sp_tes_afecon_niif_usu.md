# Stored Procedure: sp_tes_afecon_niif_usu

## Usa los objetos:
- [[cxc_cabdoc]]
- [[cxc_impuestos]]
- [[cxc_impxdocumento]]
- [[cxc_param]]
- [[cxp_cabdoc]]
- [[cxp_param]]
- [[gen_actividad]]
- [[gen_decapl]]
- [[gen_retencion]]
- [[nif_cuadre_tipos]]
- [[nif_puc]]
- [[sp_gen_trae_tasa_niif]]
- [[tes_bancos]]
- [[tes_cabdoc]]
- [[tes_cuedoc]]
- [[tes_inf_nif]]
- [[tes_param]]
- [[tes_param_cnt]]

```sql

/*SE ASIGNA LA CUENTA DE ICA DE ACUERDO A PARAMETRO DE CXC Y CXP POR PLANTILLA O POR ACTIVIDAD
SE ASIGNA CUENTA DE RTE FTE DE ACUERDO A PARAMETROSDE CXC Y CXP POR PLANTILLA O CODIGO DE RTE FTE
JSARMIENTO MARZO/2015 SRS: 2015-0172
SE ADICIONAN VARIABLES PARA EL MANEJO DE MOVIMIENTO DEBITO CHEQUES POSFECHADOS, SE MODIFICAN  
LAS CONSULTAS PARA QUE COLOQUE LA CUENTA CONTABLE CORRECTA DE ACUERDO AL MOVIMIENTO  2015-0276
SE ADICIONA PARAMETRO DE CTA.CONTABLE DE BANCOS P/NIIF SE SEPARA DE LA LOCAL, SE CAMBIA CUENTA CONTABLE
DEL CTE.Y PROVEEDORES PARA QUE BUSQUE LA DE NIIF Y NO LA CTA. LOCAL GJPULIDO SRS No. 2015-0499
EN LOS DOCUMENTOS DEBITOS, SI EL VALOR BASE ES CERO, SE ASIGNA EL NETO
JSARMIENTO ABRIL/2016 SRS2016-0257
SE MODIFICA LA CONTABILIZACION DE INTERES DE CLIENTE EN RECIBOS DE CAJA PARA QUE SE UTILICE LA CUENTA CONTABLE NIIF
JSARMIENTO JULIO/2016 SRS2016-0395
SE AGREGA LA CONTABILIZACION DE MAYOR Y MENOR VALOR PARA LOS DOCUMENTOS CREDITO
JSARMIENTO OCTUBRE/2016 SRS2016-0860
SE AGREGA AJUSTE POR DIFERENCIA EN CAMBIO PARA LAS CUENTAS EN MONEDA EXTRANJERA DE ACUERDO A INDICADOR DE PARAMETROS GENERALES
JSARMIENTO DICIEMBRE/2017 SNR2017-0239
AYVEGA AGOSTO/2018 SNR2018-0147 SE AGREGA PROCEDIMIENTO PARA CONTABILIZACION DE USUARIO*/
CREATE PROCEDURE [dbo].[sp_tes_afecon_niif_usu]
	@ano_doc	CHAR(4),
	@per_doc	CHAR(2),
	@sub_tip	CHAR(5),
	@num_doc	CHAR(14),
	@banco		CHAR(10),
	@fch_doc	DATETIME

AS
BEGIN
	DECLARE @wind_tip	SMALLINT;
	DECLARE @wcxc		CHAR(16);
	DECLARE @wreg		SMALLINT;
	DECLARE @val_val	MONEY;
	DECLARE @tot_doc	MONEY;
	DECLARE @ret_doc	MONEY;
	DECLARE @des_doc	MONEY;
	DECLARE @iva_ret	MONEY;
	DECLARE @ica_doc	MONEY;
	DECLARE @net_doc	MONEY;
	DECLARE @bas_mov	MONEY;
	DECLARE @men_val	MONEY;
	DECLARE @may_val	MONEY;
	DECLARE @bas_doc	MONEY;
	DECLARE @des_mov	CHAR(70);
	DECLARE @num_che	CHAR(10);
	DECLARE @numche		CHAR(10);
	DECLARE @cod_ter	CHAR(15);
	DECLARE @cod_suc	CHAR(3);
	DECLARE @cod_cco	CHAR(10);
	DECLARE @cod_cl1	CHAR(12);
	DECLARE @cod_cl2	CHAR(12);
	DECLARE @cod_cl3	CHAR(12);
	DECLARE @ind_con	CHAR(3);
	DECLARE @wdes		CHAR(16);
	DECLARE @wret		CHAR(16);
	DECLARE @wiva		CHAR(16);
	DECLARE @wica		CHAR(16);
	DECLARE @wriv		CHAR(16);
	DECLARE @wven		CHAR(16);
	DECLARE @want		CHAR(16);
	DECLARE @wban		CHAR(16);
	DECLARE @wmen		CHAR(16);
	DECLARE @wmay		CHAR(16);
	DECLARE @wcon		CHAR(16);
	DECLARE @wbco		CHAR(16);

	-- VARIABLES PARA MOVIMIENTO DEBITO CHEQUE POSFECHADOS
	DECLARE @nwddc		CHAR(16);
	DECLARE @nwdcc		CHAR(16);
	

	-- VARIABLES PARA AGRUPAR CONTABILIZACION DEL BANCO
	DECLARE @cadena		VARCHAR(1500);
	DECLARE @i_cco		SMALLINT;
	DECLARE @i_cl1		SMALLINT;
	DECLARE @i_cl2		SMALLINT;
	DECLARE @i_cl3		SMALLINT;
	DECLARE @i_ter		SMALLINT;
	DECLARE @i_bas		SMALLINT;

	--VARIABLES BIMONEDA
	DECLARE @ind_mp		CHAR(2);
	DECLARE @fec_tas	DATETIME;
	DECLARE @tasa		MONEY;
	DECLARE @tasa_doc	MONEY;
	DECLARE @ind_tas	CHAR(1);

	--VARIABLES CUADRE DE DOCUMENTO
	DECLARE @tot_deb	MONEY;
	DECLARE @tot_cre	MONEY;
	DECLARE @ind_aju	BIT;
	DECLARE @max_aju	MONEY;
	DECLARE @aju_deb	CHAR(16);
	DECLARE @aju_cre	CHAR(16);
	DECLARE @aju_suc	CHAR(3);
	DECLARE @aju_cco	CHAR(10);
	DECLARE @aju_cl1	CHAR(16);
	DECLARE @aju_cl2	CHAR(16);
	DECLARE @aju_cl3	CHAR(16);
	DECLARE @aju_ter	CHAR(15);
	DECLARE @max_reg	CHAR(10);

	DECLARE @tip_doc	CHAR(3);

	--REDONDEO DE DECIMALES
	DECLARE @num_dec	SMALLINT;

	-- CONTABILIZACION INTERESES
	DECLARE @cta_int	CHAR(16);
	DECLARE @val_int	MONEY;

	DECLARE @nit_ban	CHAR(15);

	-- INTERFACE A CNT DETALLADA
	DECLARE @cnt_det	BIT;

	-- NUMERO CONCILIACION
	DECLARE @num_concil	VARCHAR(30);

	DECLARE @tinfon TABLE(ano_doc	CHAR(4) COLLATE DATABASE_DEFAULT,
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
									num_concil	VARCHAR(30) COLLATE DATABASE_DEFAULT,
									ind_adc		SMALLINT,
									registro	INT PRIMARY KEY identity);

	DECLARE @tinfonF TABLE(ano_doc	CHAR(4) COLLATE DATABASE_DEFAULT,
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
									num_concil	VARCHAR(30) COLLATE DATABASE_DEFAULT,
									ind_adc		SMALLINT,
									registro	INT PRIMARY KEY identity);

	--	IMPUESTOS
	DECLARE @tot_imp	MONEY;
	DECLARE @tot_impt	MONEY;
	DECLARE @cta_imp	CHAR(16);
	DECLARE @wreg2		SMALLINT;		

	DECLARE @impuestos TABLE(	cuenta		CHAR(16) COLLATE DATABASE_DEFAULT,
											valor			MONEY,
											registro		INT);

	DECLARE @conta1		INT;
	DECLARE @conta2		INT;

	DECLARE @tBanco TABLE(cod_cco	CHAR(10) COLLATE DATABASE_DEFAULT,
									cod_suc		CHAR(3) COLLATE DATABASE_DEFAULT,
									cod_ter		CHAR(15) COLLATE DATABASE_DEFAULT,
									cod_cl1		VARCHAR(12) COLLATE DATABASE_DEFAULT,
									cod_cl2		VARCHAR(12) COLLATE DATABASE_DEFAULT,
									cod_cl3		VARCHAR(12) COLLATE DATABASE_DEFAULT,
									neto			MONEY,
									cre_mov		MONEY,
									recno			INT,
									num_concil	VARCHAR(39) COLLATE DATABASE_DEFAULT,
									cod_ica		VARCHAR(10) COLLATE DATABASE_DEFAULT,
									cod_ret		CHAR(3) COLLATE DATABASE_DEFAULT);

	DECLARE @conta3		INT;
	DECLARE @conta4		INT;

	DECLARE @ano_anu	CHAR(4);
	DECLARE @per_anu	CHAR(2);
	DECLARE @sub_anu	CHAR(3);
	DECLARE @num_anu	CHAR(14);

	--	BASE AIU
	DECLARE @base_aiu	MONEY;
	DECLARE @base_cnt	MONEY;

	-- SRS: 2014-0994
	DECLARE @ind_cta_bco		BIT;
	DECLARE @ter_bco			VARCHAR(15);

	--SRS: 2015-0172
	DECLARE @ind_cta_ica	TINYINT;
	DECLARE @ind_cta_ret	TINYINT;
	DECLARE @cod_ret		CHAR(3);
	DECLARE @cod_ica		VARCHAR(10);
	DECLARE @cod_pai		CHAR(3);
	DECLARE @cod_dep		CHAR(2);
	DECLARE @cod_ciu		CHAR(5);

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
	
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	SELECT @conta1=ISNULL(COUNT(1),0) 
	FROM tes_inf_nif 
	WHERE ano_doc=@ano_doc 
		AND Per_doc=@per_doc 
		AND sub_tip=@sub_tip 
		AND Num_doc=@num_doc;

	IF @conta1>0
	BEGIN
		RETURN;
	END;

	SELECT @wbco=ctactb_niif,@nit_ban=ISNULL(nit,'0') 
	FROM tes_bancos 
	WHERE bancos=@banco;

	SELECT @ind_mp=ind_mp,@fec_tas=fec_tas,@tasa_doc=tasa,@num_che=num_che,@ind_tas=ind_tas,@tip_doc=tip_doc,@cod_pai=cod_pai,@cod_dep=cod_dep,@cod_ciu=cod_ciu, @des_mov=descrip 
	FROM tes_cabdoc
	WHERE ano_doc=@ano_doc 
		AND per_doc=@per_doc 
		AND sub_tip=@sub_tip 
		AND num_doc=@num_doc;

	SELECT @val_val=SUM(tot_doc),@tot_impt=SUM(tot_imp) 
	FROM tes_cuedoc 
	WHERE ano_doc=@ano_doc 
		AND per_doc=@per_doc 
		AND sub_tip=@sub_tip 
		AND num_doc=@num_doc;

	--	TRAEMOS NUMERO DE DECIMALES PARA REDONDEAR LOS VALORES ANTES DE SUBIRLOS A CONTABILIDAD DE LA TABLA gen_decapl
	--	SI NO SE HA DEFINIDO DECIMALES LO DEJAMOS EN 2
	--	JCESARS		ABRIL/2010
	SELECT @num_dec=dec_int 
	FROM gen_decapl 
	WHERE cod_apl='TES' 
		AND tip_mon=@ind_mp;

	SET @num_dec=ISNULL(@num_dec,2);

	-- CONTABILIZACION DETALLADA  JSARMIENTO FEBRERO/2013 SRS:2013-0167
	SELECT @cnt_det=cnt_det,@ind_cta_bco=ter_doc_cnt, @difcam_doc = difcam_doc  
	FROM tes_param 
	WHERE cod_par='0';

	IF @val_val>0
	BEGIN
		-- DOCUMENTOS DEBITO
		IF @tip_doc IN ( '040','060','220','260','410','420','430')
		BEGIN
			SET @wreg2=1;

			IF @tip_doc IN ('040','220')
			BEGIN
				SELECT @ind_cta_ica=ind_cta_ica,@ind_cta_ret=ind_cta_ret
				FROM cxc_param
				WHERE cod_par='0';
			END;

			IF @cnt_det=0
			BEGIN
				DECLARE c1 CURSOR FOR
				SELECT cod_suc,cod_cco,cod_ter,ind_con,cod_cl1,cod_cl2,cod_cl3,cuenta_con_niif,
						SUM(net_doc),SUM(tot_doc),SUM(des_doc),SUM(ret_doc),SUM(ica_doc),SUM(iva_ret),SUM(may_val),SUM(men_val),SUM(bas_doc),SUM(val_int),SUM(tot_imp),
						num_concil,cod_ica,cod_ret,ano_ref, per_ref, sub_ref, num_ref
				FROM tes_cuedoc
				WHERE ano_doc=RTRIM(@ano_doc) 
					AND per_doc=RTRIM(@per_doc) 
					AND sub_tip=RTRIM(@sub_tip) 
					AND num_doc=RTRIM(@num_doc)
				GROUP BY cod_suc,cod_cco,cod_ter,ind_con,cod_cl1,cod_cl2,cod_cl3,cuenta_con_niif,num_concil,cod_ica,cod_ret,ano_ref, per_ref, sub_ref, num_ref;
			END;
			ELSE
			BEGIN
				DECLARE c1 CURSOR FOR
				SELECT cod_suc,cod_cco,cod_ter,ind_con,cod_cl1,cod_cl2,cod_cl3,cuenta_con_niif,
						net_doc,tot_doc,des_doc,ret_doc,ica_doc,iva_ret,may_val,men_val,bas_doc,val_int,tot_imp,num_concil,cod_ica,cod_ret,ano_ref, per_ref, sub_ref, num_ref
				FROM tes_cuedoc
				WHERE ano_doc=RTRIM(@ano_doc) 
					AND per_doc=RTRIM(@per_doc) 
					AND sub_tip=RTRIM(@sub_tip) 
					AND num_doc=RTRIM(@num_doc);
			END;
			OPEN c1;
			SET @wreg=1;
			FETCH NEXT FROM c1 INTO @cod_suc,@cod_cco,@cod_ter,@ind_con,@cod_cl1,@cod_cl2,@cod_cl3,@wcon,@net_doc,@tot_doc,@des_doc,@ret_doc,@ica_doc,
												@iva_ret,@may_val,@men_val,@bas_doc,@val_int,@tot_imp,@num_concil,@cod_ica,@cod_ret,@ano_ref, @per_ref, @sub_ref, @num_ref;
			WHILE @@FETCH_STATUS<>-1
			BEGIN
				SELECT @des_mov=descrip 
				FROM tes_cabdoc 
				WHERE ano_doc=@ano_doc 
				AND per_doc=@per_doc 
				AND sub_tip=@sub_tip 
				AND num_doc=@num_doc;

				SET @num_che=ISNULL(@num_che,'0');
				SET @bas_doc=ISNULL(@bas_doc,0);

				-- REDONDEAMOS PARA ENVIAR INFORMACION A CNT
				SET @net_doc=ROUND(@net_doc,@num_dec);
				SET @tot_doc=ROUND(@tot_doc,@num_dec);
				SET @des_doc=ROUND(@des_doc,@num_dec);
				SET @ret_doc=ROUND(@ret_doc,@num_dec);
				SET @ica_doc=ROUND(@ica_doc,@num_dec);
				SET @iva_ret=ROUND(@iva_ret,@num_dec);
				SET @may_val=ROUND(@may_val,@num_dec);
				SET @men_val=ROUND(@men_val,@num_dec);
				SET @bas_doc=ROUND(@bas_doc,@num_dec);
				SET @val_int=ROUND(@val_int,@num_dec);
				SET @tot_imp=ROUND(@tot_imp,@num_dec);

				IF @bas_doc = 0
				BEGIN
					SET @bas_doc = @net_doc;
				END;

				EXEC sp_gen_trae_tasa_niif @wbco,@fec_tas,@tasa OUTPUT,@ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
				FROM nif_puc 
				WHERE cod_cta=@wbco;

				IF @ind_cta_bco = 0
				BEGIN
					SET @ter_bco=@cod_ter;
				END;
				ELSE
				BEGIN
					SET @ter_bco=@nit_ban;
				END;

				-- CUENTA DEL BANCO
				INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,cod_cl1,
								cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,num_che,
								ind_cos,ind_tra,ind_mr,fec_tas,tasa,bas_mov,ind_tas,num_concil,ind_adc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@wbco,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
							CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,CASE @i_ter WHEN 1 THEN '0' ELSE @ter_bco END,@net_doc,0,@des_mov,@num_che,
							'','',@ind_mp,@fec_tas,@tasa,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,0);
				SET @wreg=@wreg+1;

				-- RETENCION
				IF @ret_doc>0
				BEGIN
					SELECT @wret=n_wreti 
					FROM tes_param_cnt 
					WHERE llave=@ind_con;

					IF @ind_cta_ret = 2
					BEGIN
						SELECT @wret=ISNULL(cta_ret_ven,'0')
						FROM gen_retencion 
						WHERE cod_ret=@cod_ret;
					END;

					EXEC sp_gen_trae_tasa_niif @wret,@fec_tas,@tasa OUTPUT,@ind_mp;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@wret;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,cod_cl1,
									cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,
									ind_mr,fec_tas,tasa,bas_mov,ind_tas,num_concil,ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@wret,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,@ret_doc,0,@des_mov,@num_che,'','',
								@ind_mp,@fec_tas,@tasa,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,0);
					SET @wreg=@wreg+1;
				END;

				-- RETEIVA
				IF @iva_ret>0
				BEGIN
					SELECT @wriv=n_wivai 
					FROM tes_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @wriv,@fec_tas,@tasa OUTPUT,@ind_mp;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@wriv;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,cod_cl1,
									cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,
									ind_mr,fec_tas,tasa,bas_mov,ind_tas,num_concil,ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@wriv,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,@iva_ret,0,@des_mov,@num_che,'','',
								@ind_mp,@fec_tas,@tasa,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,0);
					SET @wreg=@wreg+1;
				END;

				-- MAYOR VALOR
				IF @may_val>0
				BEGIN
					SELECT @wmay= n_wmayi 
					FROM tes_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @wmay,@fec_tas,@tasa OUTPUT,@ind_mp;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@wmay;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,cod_cl1,
									cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,
									ind_mr,fec_tas,tasa,bas_mov,ind_tas,num_concil,ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@wmay,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,0,@may_val,@des_mov,@num_che,'','',
								@ind_mp,@fec_tas,@tasa,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,0);
					
					SET @wreg=@wreg+1;
				END;

				-- MENOR VALOR
				IF @men_val>0
				BEGIN
					SELECT @wmen=n_wmemi 
					FROM tes_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @wmen,@fec_tas,@tasa OUTPUT,@ind_mp;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@wmen;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,cod_cl1,
									cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,
									ind_mr,fec_tas,tasa,bas_mov,ind_tas,num_concil,ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@wmen,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,@men_val,0,@des_mov,@num_che,'','',
								@ind_mp,@fec_tas,@tasa,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,0);
					SET @wreg=@wreg+1;
				END;

				-- ICA
				IF @ica_doc>0
				BEGIN
					SELECT @wica=n_wicai 
					FROM tes_param_cnt 
					WHERE llave=@ind_con;

					IF @ind_cta_ica = 2
					BEGIN
						SELECT @wica=cta_nif_ven
						FROM gen_actividad
						WHERE cod_pai=@cod_pai 
								AND cod_dep=@cod_dep 
								AND cod_ciu=@cod_ciu 
								AND cod_act=@cod_ica;
					END;
					EXEC sp_gen_trae_tasa_niif @wica,@fec_tas,@tasa OUTPUT,@ind_mp;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@wica;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,cod_cl1,
									cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,
									ind_mr,fec_tas,tasa,bas_mov,ind_tas,num_concil,ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@wica,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,@ica_doc,0,@des_mov,@num_che,'','',
								@ind_mp,@fec_tas,@tasa,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,0);
					SET @wreg=@wreg+1;
				END;

				-- DESCUENTO
				IF @des_doc>0
				BEGIN
					SELECT @wdes=n_wdesi 
					FROM tes_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @wdes,@fec_tas,@tasa OUTPUT,@ind_mp;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@wdes;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,cod_cl1,
									cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,
									ind_mr,fec_tas,tasa,bas_mov,ind_tas,num_concil,ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@wdes,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,@des_doc,0,@des_mov,@num_che,'','',
								@ind_mp,@fec_tas,@tasa,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,0);
					SET @wreg=@wreg+1;
				END;

				-- INTERESES
				IF @val_int>0
				BEGIN
					SELECT @cta_int=n_cta_int 
					FROM tes_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @cta_int,@fec_tas,@tasa OUTPUT,@ind_mp;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@cta_int;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,cod_cl1,
									cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,
									ind_mr,fec_tas,tasa,bas_mov,ind_tas,num_concil,ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@cta_int,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,0,@val_int,@des_mov,@num_che,'','',
								@ind_mp,@fec_tas,@tasa,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,0);
					
					SET @wreg=@wreg+1;
				END;	

				-- CONTRAPARTIDA
				EXEC sp_gen_trae_tasa_niif @wcon,@fec_tas,@tasa OUTPUT,@ind_mp;

				SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas,@ind_adc=ind_adc, @nat_cta = nat_cta, @cta_idc = cta_idc 
							, @cta_gdc = cta_gdc
				FROM nif_puc 
				WHERE cod_cta=@wcon;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				IF @cod_ter='0' AND @tip_doc IN ('260')
				BEGIN
					SET @cod_ter=@nit_ban;
				END;

				INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,cod_cl1,
								cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,
								ind_mr,fec_tas,tasa,bas_mov,ind_tas,num_concil,ind_adc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@wcon,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
							CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,0,@tot_doc,@des_mov,@num_che,'','',
							@ind_mp,@fec_tas,@tasa,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,0);
				SET @wreg=@wreg+1;

				--	DIFERENCIA EN CAMBIO

				IF RTRIM(@cta_idc) = ''
				BEGIN
					SET @cta_idc = '0'
				END;

				IF RTRIM(@cta_gdc) = ''
				BEGIN
					SET @cta_gdc = '0'
				END;

				IF @difcam_doc = 1 AND @ind_mp NOT IN ('00','99') AND @tip_doc = '040' AND @ind_adc = 0
				BEGIN
					SELECT @tas_fac = tasa
					FROM cxc_cabdoc WITH (NOLOCK)
					WHERE num_doc = @num_ref
						AND sub_tip = @sub_ref
						AND per_doc = @per_ref
						AND ano_doc = @ano_ref; 

					SET @dif_tas = @tasa - @tas_fac;
					SET @valdifc = ROUND(ABS(@tot_doc * @dif_tas),@num_dec);

					IF @dif_tas<0
					BEGIN
						IF @cta_gdc <> '0'
						BEGIN
							SELECT @cco_dif=ind_cco,@cl1_dif=ind_cl1,@cl2_dif=ind_cl2,@cl3_dif=ind_cl3,@ter_dif=ind_ter,@bas_dif=ind_bas
							FROM nif_puc 
							WHERE cod_cta=@cta_gdc;

							IF @nat_cta=1 
							BEGIN
								INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc
																,cod_cta
																,cod_suc
																,cod_cco
																,cod_cl1
																,cod_cl2,cod_cl3
																,cod_ter
																,deb_mov
																,cre_mov
																,des_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa
																,bas_mov
																,ind_tas,num_concil,ind_adc)
								VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc
											,@wcon
											,@cod_suc
											,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END
											,CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
											CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END
											,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END
											,CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END
											,0
											,@valdifc
											,'AJUSTE POR DIFERENCIA EN CAMBIO',@num_che,'','',
											@ind_mp,@fec_tas,@tasa
											,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,1);
								SET @wreg=@wreg+1

								INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc
																,cod_cta
																,cod_suc
																,cod_cco
																,cod_cl1
																,cod_cl2,cod_cl3
																,cod_ter
																,deb_mov
																,cre_mov
																,des_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa
																,bas_mov
																,ind_tas,num_concil,ind_adc)
								VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc
											,@cta_gdc
											,@cod_suc
											,CASE @cco_dif WHEN 1 THEN @cod_cco ELSE '0' END
											,CASE @cl1_dif WHEN 1 THEN @cod_cl1 ELSE '0' END,
											CASE @cl2_dif WHEN 1 THEN @cod_cl2 ELSE '0' END
											,CASE @cl3_dif WHEN 1 THEN @cod_cl3 ELSE '0' END
											,CASE @ter_dif WHEN 1 THEN '0' ELSE @cod_ter END
											,@valdifc
											,0
											,'AJUSTE POR DIFERENCIA EN CAMBIO',@num_che,'','',
											@ind_mp,@fec_tas,@tasa
											,CASE @bas_dif WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,1);
								SET @wreg=@wreg+1
							END;
							ELSE
							BEGIN
								INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc
																,cod_cta
																,cod_suc
																,cod_cco
																,cod_cl1
																,cod_cl2,cod_cl3
																,cod_ter
																,deb_mov
																,cre_mov
																,des_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa
																,bas_mov
																,ind_tas,num_concil,ind_adc)
								VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc
											,@wcon
											,@cod_suc
											,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END
											,CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
											CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END
											,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END
											,CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END
											,@valdifc
											,0
											,'AJUSTE POR DIFERENCIA EN CAMBIO',@num_che,'','',
											@ind_mp,@fec_tas,@tasa
											,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,1);
								SET @wreg=@wreg+1

								INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc
																,cod_cta
																,cod_suc
																,cod_cco
																,cod_cl1
																,cod_cl2,cod_cl3
																,cod_ter
																,deb_mov
																,cre_mov
																,des_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa
																,bas_mov
																,ind_tas,num_concil,ind_adc)
								VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc
											,@cta_gdc
											,@cod_suc
											,CASE @cco_dif WHEN 1 THEN @cod_cco ELSE '0' END
											,CASE @cl1_dif WHEN 1 THEN @cod_cl1 ELSE '0' END,
											CASE @cl2_dif WHEN 1 THEN @cod_cl2 ELSE '0' END
											,CASE @cl3_dif WHEN 1 THEN @cod_cl3 ELSE '0' END
											,CASE @ter_dif WHEN 1 THEN '0' ELSE @cod_ter END
											,0
											,@valdifc
											,'AJUSTE POR DIFERENCIA EN CAMBIO',@num_che,'','',
											@ind_mp,@fec_tas,@tasa
											,CASE @bas_dif WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,1);
								SET @wreg=@wreg+1
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
									INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc
																,cod_cta
																,cod_suc
																,cod_cco
																,cod_cl1
																,cod_cl2,cod_cl3
																,cod_ter
																,deb_mov
																,cre_mov
																,des_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa
																,bas_mov
																,ind_tas,num_concil,ind_adc)
									VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc
												,@wcon
												,@cod_suc
												,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END
												,CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
												CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END
												,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END
												,CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END
												,@valdifc
												,0
												,'AJUSTE POR DIFERENCIA EN CAMBIO',@num_che,'','',
												@ind_mp,@fec_tas,@tasa
												,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,1);
									SET @wreg=@wreg+1

									INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc
																,cod_cta
																,cod_suc
																,cod_cco
																,cod_cl1
																,cod_cl2,cod_cl3
																,cod_ter
																,deb_mov
																,cre_mov
																,des_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa
																,bas_mov
																,ind_tas,num_concil,ind_adc)
									VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc
												,@cta_idc
												,@cod_suc
												,CASE @cco_dif WHEN 1 THEN @cod_cco ELSE '0' END
												,CASE @cl1_dif WHEN 1 THEN @cod_cl1 ELSE '0' END,
												CASE @cl2_dif WHEN 1 THEN @cod_cl2 ELSE '0' END
												,CASE @cl3_dif WHEN 1 THEN @cod_cl3 ELSE '0' END
												,CASE @ter_dif WHEN 1 THEN '0' ELSE @cod_ter END
												,0
												,@valdifc
												,'AJUSTE POR DIFERENCIA EN CAMBIO',@num_che,'','',
												@ind_mp,@fec_tas,@tasa
												,CASE @bas_dif WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,1);
									SET @wreg=@wreg+1
								END;
								ELSE
								BEGIN
									INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc
																,cod_cta
																,cod_suc
																,cod_cco
																,cod_cl1
																,cod_cl2,cod_cl3
																,cod_ter
																,deb_mov
																,cre_mov
																,des_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa
																,bas_mov
																,ind_tas,num_concil,ind_adc)
									VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc
												,@wcon
												,@cod_suc
												,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END
												,CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
												CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END
												,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END
												,CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END
												,0
												,@valdifc
												,'AJUSTE POR DIFERENCIA EN CAMBIO',@num_che,'','',
												@ind_mp,@fec_tas,@tasa
												,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,1);
									SET @wreg=@wreg+1

									INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc
																,cod_cta
																,cod_suc
																,cod_cco
																,cod_cl1
																,cod_cl2,cod_cl3
																,cod_ter
																,deb_mov
																,cre_mov
																,des_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa
																,bas_mov
																,ind_tas,num_concil,ind_adc)
									VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc
												,@cta_idc
												,@cod_suc
												,CASE @cco_dif WHEN 1 THEN @cod_cco ELSE '0' END
												,CASE @cl1_dif WHEN 1 THEN @cod_cl1 ELSE '0' END,
												CASE @cl2_dif WHEN 1 THEN @cod_cl2 ELSE '0' END
												,CASE @cl3_dif WHEN 1 THEN @cod_cl3 ELSE '0' END
												,CASE @ter_dif WHEN 1 THEN '0' ELSE @cod_ter END
												,@valdifc
												,0
												,'AJUSTE POR DIFERENCIA EN CAMBIO',@num_che,'','',
												@ind_mp,@fec_tas,@tasa
												,CASE @bas_dif WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,1);
									SET @wreg=@wreg+1
								END;
							END;
						END;
				END;

				--	IMPUESTOS
				IF @tot_imp>0 AND @wreg2=1
				BEGIN
					DELETE FROM @impuestos;
							
					INSERT INTO @impuestos(cuenta,valor,registro)
					SELECT b.n_cod_cta,a.valor,ROW_NUMBER() OVER(ORDER BY recno) 
					FROM cxc_impxdocumento AS a 
					INNER JOIN cxc_impuestos AS b ON a.cod_imp=b.cod_imp
					WHERE ano_doc=@ano_doc 
						AND per_doc=@per_doc 
						AND sub_tip=@sub_tip 
						AND num_doc=@num_doc;
			
					SET @conta1=1
					SELECT @conta2=COUNT(1) 
					FROM @impuestos;
			
					WHILE @conta1<=@conta2
					BEGIN

						SELECT @cta_imp=cuenta,@tot_impt=valor 
						FROM @impuestos 
						WHERE registro=@conta1;
					
						EXEC sp_gen_trae_tasa_niif @cta_imp,@fec_tas,@tasa OUTPUT,@ind_mp;

						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@cta_imp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,
										deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,bas_mov,ind_tas,num_concil,ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@cta_imp,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,
									@tot_impt,0,@des_mov,@num_che,'','',@ind_mp,@fec_tas,@tasa,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,0);
						SET @wreg=@wreg+1;
				
						SET @conta1=@conta1+1;
						SET @wreg2=@wreg;
					END;
				END;
		
				FETCH NEXT FROM c1 INTO @cod_suc,@cod_cco,@cod_ter,@ind_con,@cod_cl1,@cod_cl2,@cod_cl3,@wcon,@net_doc,@tot_doc,@des_doc,@ret_doc,@ica_doc,
													@iva_ret,@may_val,@men_val,@bas_doc,@val_int,@tot_imp,@num_concil,@cod_ica,@cod_ret,@ano_ref, @per_ref, @sub_ref, @num_ref;
			END;
			CLOSE c1;
			DEALLOCATE c1;

			--- Contabilizacion de la reversion de posfechados	
			IF @tip_doc BETWEEN '040' AND '069'
			BEGIN
				IF @cnt_det = 0
				BEGIN
					DECLARE cur_cpf CURSOR FOR
					SELECT cod_suc,cod_cco,cod_ter,ind_con,cod_cl1,cod_cl2,cod_cl3,cuenta_con_niif,num_che,numche,
							SUM(net_doc),SUM(tot_doc),SUM(des_doc),SUM(ret_doc),SUM(ica_doc),SUM(iva_ret),SUM(may_val),SUM(men_val),SUM(bas_doc),num_concil
					FROM tes_cuedoc
					WHERE ano_doc=RTRIM(@ano_doc) 
						AND per_doc=RTRIM(@per_doc) 
						AND sub_tip=RTRIM(@sub_tip) 
						AND num_doc=RTRIM(@num_doc)
						AND num_che NOT IN ('0') 
						AND numche NOT IN ('0')
						AND num_che IS NOT NULL  
						AND numche IS NOT NULL 
					GROUP BY cod_suc,cod_cco,cod_ter,ind_con,cod_cl1,cod_cl2,cod_cl3,cuenta_con_niif,num_che,numche,num_concil;
				END;
				ELSE
				BEGIN
					DECLARE cur_cpf CURSOR FOR
					SELECT cod_suc,cod_cco,cod_ter,ind_con,cod_cl1,cod_cl2,cod_cl3,cuenta_con_niif,num_che,numche,
							net_doc,tot_doc,des_doc,ret_doc,ica_doc,iva_ret,may_val,men_val,bas_doc,num_concil
					FROM tes_cuedoc
					WHERE ano_doc=RTRIM(@ano_doc) 
						AND per_doc=RTRIM(@per_doc) 
						AND sub_tip=RTRIM(@sub_tip) 
						AND num_doc=RTRIM(@num_doc)
						AND num_che NOT IN ('0') 
						AND numche NOT IN ('0')
						AND num_che IS NOT NULL  
						AND numche IS NOT NULL; 
				END;
				OPEN cur_cpf;
				FETCH NEXT FROM cur_cpf INTO @cod_suc,@cod_cco,@cod_ter,@ind_con,@cod_cl1,@cod_cl2,@cod_cl3,@wcon,@num_che,@numche,@net_doc,@tot_doc,@des_doc,@ret_doc,
															@ica_doc,@iva_ret,@may_val,@men_val,@bas_doc,@num_concil;
				WHILE @@FETCH_STATUS<>-1
				BEGIN
					SELECT @des_mov=RTRIM(descrip)+' cheque '+RTRIM(@num_che)+' posf. '+@numche 
					FROM tes_cabdoc 
					WHERE ano_doc=@ano_doc 
					AND per_doc=@per_doc 
					AND sub_tip=@sub_tip 
					AND num_doc=@num_doc;

					SET @num_che=ISNULL(@num_che,'0');
					SET @bas_doc=ISNULL(@net_doc,0);

					SELECT @nwddc=n_wdcd 
					FROM tes_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @nwddc,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc
					END;
					
					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@nwddc;

					INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,cod_cl1,
									cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,
									ind_mr,fec_tas,tasa,bas_mov,ind_tas,num_concil,ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@nwddc,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,@net_doc,0,@des_mov,@num_che,'','',@ind_mp,
								@fec_tas,@tasa,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,0);
					SET @wreg=@wreg+1;
	
					SELECT @nwdcc=n_wddd 
					FROM tes_param_cnt 
					WHERE llave=@ind_con;
				
					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@nwdcc;
	
					EXEC sp_gen_trae_tasa_niif @nwdcc,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,cod_cl1,
									cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,
									ind_mr,fec_tas,tasa,bas_mov,ind_tas,num_concil,ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@nwdcc,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,0,@net_doc,@des_mov,@num_che,'','',
								@ind_mp,@fec_tas,@tasa,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,0);

					SET @wreg=@wreg+1;

					FETCH NEXT FROM cur_cpf INTO @cod_suc,@cod_cco,@cod_ter,@ind_con,@cod_cl1,@cod_cl2,@cod_cl3,@wcon,@num_che,@numche,@net_doc,@tot_doc,@des_doc,
																@ret_doc,@ica_doc,@iva_ret,@may_val,@men_val,@bas_doc,@num_concil;
				END;
				CLOSE cur_cpf;
				DEALLOCATE cur_cpf;
			END;
		END;

		-- DOCUMENTOS CREDITO
		IF @tip_doc IN ('140','160','230','240','250','310','320','312','141')
		BEGIN
			IF @tip_doc IN ('140','230')
			BEGIN
				SELECT @ind_cta_ica=ind_cta_ica,@ind_cta_ret=ind_cta_ret
				FROM cxp_param
				WHERE cod_par='0';
			END;

			SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas FROM nif_puc WHERE cod_cta=@wbco;

			DELETE FROM @tBanco;

			IF @cnt_det = 0
			BEGIN
				INSERT INTO @tBanco(cod_suc,neto,cod_ter,cod_cco,cod_cl1,cod_cl2,cod_cl3,recno,num_concil,cod_ica,cod_ret)
				SELECT cod_suc,SUM(net_doc),CASE @i_ter WHEN 1 THEN '0' ELSE cod_ter END AS cod_ter,
					CASE @i_cco WHEN 1 THEN cod_cco ELSE '0' END  AS cod_cco,
					CASE @i_cl1 WHEN 1 THEN cod_cl1 ELSE '0' END  AS cod_cl1,
					CASE @i_cl2 WHEN 1 THEN cod_cl2 ELSE '0' END  AS cod_cl2,
					CASE @i_cl3 WHEN 1 THEN cod_cl3 ELSE '0' END  AS cod_cl3,ROW_NUMBER() OVER(ORDER BY cod_suc,cod_ter,cod_cco,cod_cl1,cod_cl2,cod_cl3),num_concil,cod_ica,cod_ret
				FROM tes_cuedoc 
				WHERE ano_doc=@ano_doc 
					AND Per_doc=@per_doc 
					AND sub_tip=@sub_tip 
					AND Num_doc=@num_doc
				GROUP BY cod_suc,cod_ter,cod_cco,cod_cl1,cod_cl2,cod_cl3,num_concil,cod_ica,cod_ret;
			END;
			ELSE
			BEGIN
				INSERT INTO @tBanco(cod_suc,neto,cod_ter,cod_cco,cod_cl1,cod_cl2,cod_cl3,recno,num_concil,cod_ica,cod_ret)
				SELECT cod_suc,net_doc,CASE @i_ter WHEN 1 THEN '0' ELSE cod_ter END AS cod_ter,
						CASE @i_cco WHEN 1 THEN cod_cco ELSE '0' END  AS cod_cco,
						CASE @i_cl1 WHEN 1 THEN cod_cl1 ELSE '0' END  AS cod_cl1,
						CASE @i_cl2 WHEN 1 THEN cod_cl2 ELSE '0' END  AS cod_cl2,
						CASE @i_cl3 WHEN 1 THEN cod_cl3 ELSE '0' END  AS cod_cl3,ROW_NUMBER() OVER(ORDER BY cod_suc,cod_ter,cod_cco,cod_cl1,cod_cl2,cod_cl3),num_concil,cod_ica,cod_ret
				FROM tes_cuedoc 
				WHERE ano_doc=@ano_doc 
					AND Per_doc=@per_doc 
					AND sub_tip=@sub_tip 
					AND Num_doc=@num_doc;
			END;

			SET @conta3=1;
			SELECT @conta4=ISNULL(COUNT(1),0) FROM @tBanco;

			WHILE @conta3<=@conta4
			BEGIN

				SELECT @cod_suc=cod_suc,@net_doc=neto,@cod_ter=cod_ter,@cod_cco=cod_cco,@cod_cl1=cod_cl1,@cod_cl2=cod_cl2,@cod_cl3=cod_cl3,
						@num_concil=num_concil,@cod_ica=cod_ica,@cod_ret=cod_ret
				FROM @tBanco
				WHERE recno=@conta3;

				SELECT @des_mov=descrip,@ano_anu=ano_anu,@per_anu=per_anu,@sub_anu=sub_anu,@num_anu=num_anu
				FROM tes_cabdoc 
				WHERE ano_doc=@ano_doc 
					AND per_doc=@per_doc 
					AND sub_tip=@sub_tip 
					AND num_doc=@num_doc;

				SET @num_che=ISNULL(@num_che,'0');
				SET @bas_doc=ISNULL(@net_doc,0);

				-- REDONDEAMOS PARA ENVIAR INFORMACION A CNT
				SET @net_doc=ROUND(@net_doc,@num_dec);

				EXEC sp_gen_trae_tasa_niif @wbco,@fec_tas,@tasa OUTPUT,@ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				-- SI EL DOCUMENTO NO PIDE TERCERO Y LA CUENTA SI ASIGNAMOS EL NIT DEL BANCO
				-- SE DEJA EN COMENTARIO PARA QUE SIEMPRE SE ASIGNE EL NIT DEL BANCO
				-- JSARMIENTO ABRIL/2014
			
				IF @ind_cta_bco = 0
				BEGIN
					SET @ter_bco=@cod_ter;
				END;
				ELSE
				BEGIN
					SET @ter_bco=@nit_ban;
				END;

				-- CUENTA DEL BANCO
				INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,cod_cl1,
								cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,
								ind_mr,fec_tas,tasa,bas_mov,ind_tas,num_concil,ind_adc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@wbco,@cod_suc,@cod_cco,@cod_cl1,
							@cod_cl2,@cod_cl3,CASE @i_ter WHEN 1 THEN '0' ELSE @ter_bco END,0,@net_doc,@des_mov,@num_che,'','',
							@ind_mp,@fec_tas,@tasa,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,0);

				SELECT @wreg=@wreg+1;

				SET @conta3=@conta3+1;
			END;

			-- SE CONTABILIZAN LOS DEMAS REGISTROS DEL DOCUMENTO
			IF @cnt_det = 0
			BEGIN
				DECLARE cCre1 CURSOR FOR
				SELECT cod_suc,cod_cco,cod_ter,ind_con,cod_cl1,cod_cl2,cod_cl3,cuenta_con_niif,SUM(net_doc),SUM(tot_doc),SUM(des_doc),SUM(ret_doc),
						SUM(ica_doc),SUM(iva_ret),SUM(may_val),SUM(men_val),SUM(bas_doc),SUM(tot_imp),num_concil,SUM(base_iva_aiu),SUM(val_int),ano_ref, per_ref, sub_ref, num_ref
				FROM tes_cuedoc
				WHERE ano_doc=RTRIM(@ano_doc) 
					AND per_doc=RTRIM(@per_doc) 
					AND sub_tip=RTRIM(@sub_tip) 
					AND num_doc=RTRIM(@num_doc)
				GROUP BY cod_suc,cod_cco,cod_ter,ind_con,cod_cl1,cod_cl2,cod_cl3,cuenta_con_niif,num_concil,ano_ref, per_ref, sub_ref, num_ref;
			END;
			ELSE
			BEGIN
				DECLARE cCre1 CURSOR FOR
				SELECT cod_suc,cod_cco,cod_ter,ind_con,cod_cl1,cod_cl2,cod_cl3,cuenta_con_niif,net_doc,tot_doc,des_doc,ret_doc,
						ica_doc,iva_ret,may_val,men_val,bas_doc,tot_imp,num_concil,base_iva_aiu,val_int,ano_ref, per_ref, sub_ref, num_ref 
				FROM tes_cuedoc
				WHERE ano_doc=RTRIM(@ano_doc) 
					AND per_doc=RTRIM(@per_doc) 
					AND sub_tip=RTRIM(@sub_tip) 
					AND num_doc=RTRIM(@num_doc);
			END;

			OPEN cCre1;

			SET @wreg2=1;

			FETCH NEXT FROM cCre1 INTO @cod_suc,@cod_cco,@cod_ter,@ind_con,@cod_cl1,@cod_cl2,@cod_cl3,@wcon,@net_doc,@tot_doc,@des_doc,@ret_doc,@ica_doc,@iva_ret,
													@may_val,@men_val,@bas_doc,@tot_imp,@num_concil,@base_aiu,@val_int,@ano_ref, @per_ref, @sub_ref, @num_ref;
			WHILE @@FETCH_STATUS<>-1
			BEGIN
				SELECT @des_mov=descrip 
				FROM tes_cabdoc 
				WHERE ano_doc=@ano_doc 
					AND per_doc=@per_doc 
					AND sub_tip=@sub_tip 
					AND num_doc=@num_doc;

				SET @num_che=ISNULL(@num_che,'0');
				SET @bas_doc=ISNULL(@tot_doc,0);

				-- REDONDEAMOS PARA ENVIAR INFORMACION A CNT
				SET @net_doc=ROUND(@net_doc,@num_dec);
				SET @tot_doc=ROUND(@tot_doc,@num_dec);
				SET @des_doc=ROUND(@des_doc,@num_dec);
				SET @ret_doc=ROUND(@ret_doc,@num_dec);
				SET @ica_doc=ROUND(@ica_doc,@num_dec);
				SET @iva_ret=ROUND(@iva_ret,@num_dec);
				SET @may_val=ROUND(@may_val,@num_dec);
				SET @men_val=ROUND(@men_val,@num_dec);
				SET @bas_doc=ROUND(@bas_doc,@num_dec);
				SET @tot_imp=ROUND(@tot_imp,@num_dec);
				SET @val_int=ROUND(@val_int,@num_dec);

				-- SI EL DOCUMENTO NO PIDE TERCERO Y LA CUENTA SI ASIGNAMOS EL NIT DEL BANCO
				IF @cod_ter='0' AND @tip_doc IN ('230','240','250')
				BEGIN
					SET @cod_ter=@nit_ban;
				END;

				IF @base_aiu > 0
				BEGIN
					SET @base_cnt = @base_aiu;
				END;
				ELSE
				BEGIN
					SET @base_cnt = @bas_doc;
				END;

				-- RETENCION
				IF @ret_doc>0
				BEGIN
					SELECT @wret=n_wretn FROM tes_param_cnt WHERE llave=@ind_con;

					IF @ind_cta_ret = 2
					BEGIN
						SELECT @wret=ISNULL(cta_ret,'0')
						FROM gen_retencion 
						WHERE cod_ret=@cod_ret;
					END;

					EXEC sp_gen_trae_tasa_niif @wret,@fec_tas,@tasa OUTPUT,@ind_mp;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@wret;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,
									cod_cl1,cod_cl2,cod_cl3,
									cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,bas_mov,ind_tas,num_concil,ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@wret,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,0,@ret_doc,@des_mov,@num_che,'','',@ind_mp,@fec_tas,@tasa,CASE @i_bas WHEN 1 THEN @base_cnt ELSE 0 END,@ind_tas,@num_concil,0);
					SET @wreg=@wreg+1;
				END;

				-- RETEIVA
				IF @iva_ret>0
				BEGIN
					SELECT @wriv=n_wrivn 
					FROM tes_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @wriv,@fec_tas,@tasa OUTPUT,@ind_mp;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@wriv;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,
									cod_cl1,cod_cl2,cod_cl3,
									cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,bas_mov,ind_tas,num_concil,ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@wriv,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,0,@iva_ret,@des_mov,@num_che,'','',@ind_mp,@fec_tas,@tasa,CASE @i_bas WHEN 1 THEN @base_cnt ELSE 0 END,@ind_tas,@num_concil,0);
					SELECT @wreg=@wreg+1;
				END;

				-- MAYOR VALOR
				IF @may_val>0
				BEGIN
					SELECT @wmay=n_otr_gasto 
					FROM tes_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @wmay,@fec_tas,@tasa OUTPUT,@ind_mp;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@wmay;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,
									cod_cl1,cod_cl2,cod_cl3,
									cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,bas_mov,ind_tas,num_concil,ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@wmay,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,@may_val,0,@des_mov,@num_che,'','',@ind_mp,@fec_tas,@tasa,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,0);
					SET @wreg=@wreg+1;
				END;

				-- MENOR VALOR
				IF @men_val>0
				BEGIN
					SELECT @wmen=n_otr_desn 
					FROM tes_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @wmen,@fec_tas,@tasa OUTPUT,@ind_mp;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@wmen;
				
					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,
									cod_cl1,cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,bas_mov,ind_tas,num_concil,ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@wmen,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,0,@men_val,@des_mov,@num_che,'','',@ind_mp,@fec_tas,@tasa,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,0);
					SET @wreg=@wreg+1;
				END;

				-- ICA
				IF @ica_doc>0
				BEGIN
					SELECT @wica=n_wican 
					FROM tes_param_cnt 
					WHERE llave=@ind_con;

					IF @ind_cta_ica = 2
					BEGIN
						SELECT @wica=cta_nif_com
						FROM gen_actividad
						WHERE cod_pai=@cod_pai 
								AND cod_dep=@cod_dep 
								AND cod_ciu=@cod_ciu 
								AND cod_act=@cod_ica;
					END;

					EXEC sp_gen_trae_tasa_niif @wica,@fec_tas,@tasa OUTPUT,@ind_mp;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@wica;
				
					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,
									cod_cl1,cod_cl2,cod_cl3,
									cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,bas_mov,ind_tas,num_concil,ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@wica,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,0,@ica_doc,@des_mov,@num_che,'','',@ind_mp,@fec_tas,@tasa,CASE @i_bas WHEN 1 THEN @base_cnt ELSE 0 END,@ind_tas,@num_concil,0);
					SET @wreg=@wreg+1;
				END;

				-- DESCUENTO
				IF @des_doc>0
				BEGIN
					SELECT @wdes=n_wdesn 
					FROM tes_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @wdes,@fec_tas,@tasa OUTPUT,@ind_mp;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas
					FROM nif_puc 
					WHERE cod_cta=@wdes;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,
									cod_cl1,cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,bas_mov,ind_tas,num_concil,ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@wdes,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,0,@des_doc,@des_mov,@num_che,'','',@ind_mp,@fec_tas,@tasa,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,0);
					SET @wreg=@wreg+1;
				END;

				-- INTERESES
				IF @val_int>0
				BEGIN
					SELECT @cta_int=n_cta_int 
					FROM tes_param_cnt 
					WHERE llave=@ind_con;

					EXEC sp_gen_trae_tasa_niif @cta_int,@fec_tas,@tasa OUTPUT,@ind_mp;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@cta_int;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,cod_cl1,cod_cl2,
									cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,bas_mov,ind_tas,num_concil,ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@cta_int,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,@val_int,0,@des_mov,@num_che,'','',@ind_mp,@fec_tas,@tasa,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,0);
					SET @wreg=@wreg+1;
				END;	

				-- CONTRAPARTIDA
				EXEC sp_gen_trae_tasa_niif @wcon,@fec_tas,@tasa OUTPUT,@ind_mp;

				SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas,@ind_adc=ind_adc, @nat_cta = nat_cta, @cta_idc = cta_idc
							, @cta_gdc = cta_gdc  
				FROM nif_puc 
				WHERE cod_cta=@wcon;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,
								cod_cl1,cod_cl2,cod_cl3,
								cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,bas_mov,ind_tas,num_concil,ind_adc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@wcon,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
							CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
							CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,@tot_doc,0,@des_mov,@num_che,'','',@ind_mp,@fec_tas,@tasa,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,0);
				SET @wreg=@wreg+1
				
				--	DIFERENCIA EN CAMBIO
				IF RTRIM(@cta_idc) = ''
				BEGIN
					SET @cta_idc = '0'
				END;

				IF RTRIM(@cta_gdc) = ''
				BEGIN
					SET @cta_gdc = '0'
				END;

				IF @difcam_doc = 1 AND @ind_mp NOT IN ('00','99') AND @tip_doc IN ('140','141') AND @ind_adc = 0
				BEGIN
					SELECT @tas_fac = tasa
					FROM cxp_cabdoc WITH (NOLOCK)
					WHERE num_doc = @num_ref
						AND sub_tip = @sub_ref
						AND per_doc = @per_ref
						AND ano_doc = @ano_ref; 

					SET @dif_tas = @tasa - @tas_fac;
					SET @valdifc = ROUND(ABS(@tot_doc * @dif_tas),@num_dec);

					IF @dif_tas<0
					BEGIN
						IF @cta_gdc <> '0'
						BEGIN
							SELECT @cco_dif=ind_cco,@cl1_dif=ind_cl1,@cl2_dif=ind_cl2,@cl3_dif=ind_cl3,@ter_dif=ind_ter,@bas_dif=ind_bas
							FROM nif_puc 
							WHERE cod_cta=@cta_gdc;

							IF @nat_cta=1 
							BEGIN
								INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc
																,cod_cta
																,cod_suc
																,cod_cco
																,cod_cl1
																,cod_cl2,cod_cl3
																,cod_ter
																,deb_mov
																,cre_mov
																,des_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa
																,bas_mov
																,ind_tas,num_concil,ind_adc)
								VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc
											,@wcon
											,@cod_suc
											,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END
											,CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
											CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END
											,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END
											,CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END
											,0
											,@valdifc
											,'AJUSTE POR DIFERENCIA EN CAMBIO',@num_che,'','',
											@ind_mp,@fec_tas,@tasa
											,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,1);
								SET @wreg=@wreg+1

								INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc
																,cod_cta
																,cod_suc
																,cod_cco
																,cod_cl1
																,cod_cl2,cod_cl3
																,cod_ter
																,deb_mov
																,cre_mov
																,des_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa
																,bas_mov
																,ind_tas,num_concil,ind_adc)
								VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc
											,@cta_gdc
											,@cod_suc
											,CASE @cco_dif WHEN 1 THEN @cod_cco ELSE '0' END
											,CASE @cl1_dif WHEN 1 THEN @cod_cl1 ELSE '0' END,
											CASE @cl2_dif WHEN 1 THEN @cod_cl2 ELSE '0' END
											,CASE @cl3_dif WHEN 1 THEN @cod_cl3 ELSE '0' END
											,CASE @ter_dif WHEN 1 THEN '0' ELSE @cod_ter END
											,@valdifc
											,0
											,'AJUSTE POR DIFERENCIA EN CAMBIO',@num_che,'','',
											@ind_mp,@fec_tas,@tasa
											,CASE @bas_dif WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,1);
								SET @wreg=@wreg+1
							END;
							ELSE
							BEGIN
								INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc
																,cod_cta
																,cod_suc
																,cod_cco
																,cod_cl1
																,cod_cl2,cod_cl3
																,cod_ter
																,deb_mov
																,cre_mov
																,des_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa
																,bas_mov
																,ind_tas,num_concil,ind_adc)
								VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc
											,@wcon
											,@cod_suc
											,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END
											,CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
											CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END
											,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END
											,CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END
											,@valdifc
											,0
											,'AJUSTE POR DIFERENCIA EN CAMBIO',@num_che,'','',
											@ind_mp,@fec_tas,@tasa
											,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,1);
								SET @wreg=@wreg+1

								INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc
																,cod_cta
																,cod_suc
																,cod_cco
																,cod_cl1
																,cod_cl2,cod_cl3
																,cod_ter
																,deb_mov
																,cre_mov
																,des_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa
																,bas_mov
																,ind_tas,num_concil,ind_adc)
								VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc
											,@cta_gdc
											,@cod_suc
											,CASE @cco_dif WHEN 1 THEN @cod_cco ELSE '0' END
											,CASE @cl1_dif WHEN 1 THEN @cod_cl1 ELSE '0' END,
											CASE @cl2_dif WHEN 1 THEN @cod_cl2 ELSE '0' END
											,CASE @cl3_dif WHEN 1 THEN @cod_cl3 ELSE '0' END
											,CASE @ter_dif WHEN 1 THEN '0' ELSE @cod_ter END
											,0
											,@valdifc
											,'AJUSTE POR DIFERENCIA EN CAMBIO',@num_che,'','',
											@ind_mp,@fec_tas,@tasa
											,CASE @bas_dif WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,1);
								SET @wreg=@wreg+1
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
									INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc
																,cod_cta
																,cod_suc
																,cod_cco
																,cod_cl1
																,cod_cl2,cod_cl3
																,cod_ter
																,deb_mov
																,cre_mov
																,des_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa
																,bas_mov
																,ind_tas,num_concil,ind_adc)
									VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc
												,@wcon
												,@cod_suc
												,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END
												,CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
												CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END
												,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END
												,CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END
												,@valdifc
												,0
												,'AJUSTE POR DIFERENCIA EN CAMBIO',@num_che,'','',
												@ind_mp,@fec_tas,@tasa
												,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,1);
									SET @wreg=@wreg+1

									INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc
																,cod_cta
																,cod_suc
																,cod_cco
																,cod_cl1
																,cod_cl2,cod_cl3
																,cod_ter
																,deb_mov
																,cre_mov
																,des_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa
																,bas_mov
																,ind_tas,num_concil,ind_adc)
									VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc
												,@cta_idc
												,@cod_suc
												,CASE @cco_dif WHEN 1 THEN @cod_cco ELSE '0' END
												,CASE @cl1_dif WHEN 1 THEN @cod_cl1 ELSE '0' END,
												CASE @cl2_dif WHEN 1 THEN @cod_cl2 ELSE '0' END
												,CASE @cl3_dif WHEN 1 THEN @cod_cl3 ELSE '0' END
												,CASE @ter_dif WHEN 1 THEN '0' ELSE @cod_ter END
												,0
												,@valdifc
												,'AJUSTE POR DIFERENCIA EN CAMBIO',@num_che,'','',
												@ind_mp,@fec_tas,@tasa
												,CASE @bas_dif WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,1);
									SET @wreg=@wreg+1
								END;
								ELSE
								BEGIN
									INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc
																,cod_cta
																,cod_suc
																,cod_cco
																,cod_cl1
																,cod_cl2,cod_cl3
																,cod_ter
																,deb_mov
																,cre_mov
																,des_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa
																,bas_mov
																,ind_tas,num_concil,ind_adc)
									VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc
												,@wcon
												,@cod_suc
												,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END
												,CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
												CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END
												,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END
												,CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END
												,0
												,@valdifc
												,'AJUSTE POR DIFERENCIA EN CAMBIO',@num_che,'','',
												@ind_mp,@fec_tas,@tasa
												,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,1);
									SET @wreg=@wreg+1

									INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc
																,cod_cta
																,cod_suc
																,cod_cco
																,cod_cl1
																,cod_cl2,cod_cl3
																,cod_ter
																,deb_mov
																,cre_mov
																,des_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa
																,bas_mov
																,ind_tas,num_concil,ind_adc)
									VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc
												,@cta_idc
												,@cod_suc
												,CASE @cco_dif WHEN 1 THEN @cod_cco ELSE '0' END
												,CASE @cl1_dif WHEN 1 THEN @cod_cl1 ELSE '0' END,
												CASE @cl2_dif WHEN 1 THEN @cod_cl2 ELSE '0' END
												,CASE @cl3_dif WHEN 1 THEN @cod_cl3 ELSE '0' END
												,CASE @ter_dif WHEN 1 THEN '0' ELSE @cod_ter END
												,@valdifc
												,0
												,'AJUSTE POR DIFERENCIA EN CAMBIO',@num_che,'','',
												@ind_mp,@fec_tas,@tasa
												,CASE @bas_dif WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,1);
									SET @wreg=@wreg+1
								END;
							END;
						END;
				END;

				--	IMPUESTOS
				IF @tot_imp>0 AND @wreg2=1
				BEGIN
					DELETE FROM @impuestos;
							
					INSERT INTO @impuestos(cuenta,valor,registro)
					SELECT b.n_cod_cta,a.valor,ROW_NUMBER() OVER(ORDER BY recno) 
					FROM cxc_impxdocumento AS a 
					INNER JOIN cxc_impuestos AS b ON a.cod_imp=b.cod_imp
					WHERE ano_doc=@ano_anu 
						AND per_doc=@per_anu 
						AND sub_tip=@sub_anu 
						AND num_doc=@num_anu;
				
					SET @conta1=1;
					SELECT @conta2=COUNT(1) 
					FROM @impuestos;
			
					WHILE @conta1<=@conta2
					BEGIN

						SELECT @cta_imp=cuenta,@tot_impt=valor 
						FROM @impuestos 
						WHERE registro=@conta1;
					
						EXEC sp_gen_trae_tasa_niif @cta_imp,@fec_tas,@tasa OUTPUT,@ind_mp;

						SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
						FROM nif_puc 
						WHERE cod_cta=@cta_imp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
										cod_cco,
										cod_cl1,
										cod_cl2,
										cod_cl3,
										cod_ter,
										deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,bas_mov,ind_tas,num_concil,ind_adc)
						VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@cta_imp,@cod_suc,
									CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
									CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
									CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,
									CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
									CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,
									0,@tot_impt,@des_mov,@num_che,'','',@ind_mp,@fec_tas,@tasa,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,0);
						
						SET @wreg=@wreg+1;
				
						SET @conta1=@conta1+1;
					END;
				END;

				SET @wreg2=@wreg;

				FETCH NEXT FROM cCre1 INTO @cod_suc,@cod_cco,@cod_ter,@ind_con,@cod_cl1,@cod_cl2,@cod_cl3,@wcon,@net_doc,@tot_doc,@des_doc,@ret_doc,@ica_doc,@iva_ret,@may_val,
														@men_val,@bas_doc,@tot_imp,@num_concil,@base_aiu,@val_int,@ano_ref, @per_ref, @sub_ref, @num_ref;
			END;
			CLOSE cCre1;
			DEALLOCATE cCre1;

			--- Contabilizacion de la reversion de posfechados CXP
			IF @tip_doc BETWEEN '140' AND '169'
			BEGIN
				IF @cnt_det = 0
				BEGIN
					DECLARE cur_cpf CURSOR FOR
					SELECT cod_suc,cod_cco,cod_ter,ind_con,cod_cl1,cod_cl2,cod_cl3,cuenta_con_niif,num_che,numche,
							SUM(net_doc),SUM(tot_doc),SUM(des_doc),SUM(ret_doc),SUM(ica_doc),SUM(iva_ret),SUM(may_val),SUM(men_val),SUM(bas_doc),num_concil
					FROM tes_cuedoc
					WHERE ano_doc=RTRIM(@ano_doc) 
						AND per_doc=RTRIM(@per_doc) 
						AND sub_tip=RTRIM(@sub_tip) 
						AND num_doc=RTRIM(@num_doc)
						AND num_che NOT IN ('0') 
						AND numche NOT IN ('0')
						AND num_che IS NOT NULL  
						AND numche IS NOT NULL 
					GROUP BY cod_suc,cod_cco,cod_ter,ind_con,cod_cl1,cod_cl2,cod_cl3,cuenta_con_niif,num_che,numche,num_concil;
				END;
				ELSE
				BEGIN
					DECLARE cur_cpf CURSOR FOR
					SELECT cod_suc,cod_cco,cod_ter,ind_con,cod_cl1,cod_cl2,cod_cl3,cuenta_con_niif,num_che,numche,
							net_doc,tot_doc,des_doc,ret_doc,ica_doc,iva_ret,may_val,men_val,bas_doc,num_concil
					FROM tes_cuedoc
					WHERE ano_doc=RTRIM(@ano_doc) 
						AND per_doc=RTRIM(@per_doc) 
						AND sub_tip=RTRIM(@sub_tip) 
						AND num_doc=RTRIM(@num_doc)
						AND num_che NOT IN ('0') 
						AND numche NOT IN ('0')
						AND num_che IS NOT NULL  
						AND numche IS NOT NULL; 
				END;
				OPEN cur_cpf;
				FETCH NEXT FROM cur_cpf INTO @cod_suc,@cod_cco,@cod_ter,@ind_con,@cod_cl1,@cod_cl2,@cod_cl3,@wcon,@num_che,@numche,@net_doc,@tot_doc,@des_doc,@ret_doc,@ica_doc,
															@iva_ret,@may_val,@men_val,@bas_doc,@num_concil;
				WHILE @@FETCH_STATUS<>-1
				BEGIN
					SELECT @des_mov=RTRIM(descrip)+' cheque '+RTRIM(@num_che)+' posf. '+@numche 
					FROM tes_cabdoc 
					WHERE ano_doc=@ano_doc 
						AND per_doc=@per_doc 
						AND sub_tip=@sub_tip 
						AND num_doc=@num_doc;

					SET @num_che=ISNULL(@num_che,'0');
					SET @bas_doc=ISNULL(@net_doc,0);

					SELECT @nwddc=n_wdcc 
					FROM tes_param_cnt 
					WHERE llave=@ind_con;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@nwddc;

					-- REDONDEAMOS PARA ENVIAR INFORMACION A CNT
					SET @net_doc=ROUND(@net_doc,@num_dec);
					SET @tot_doc=ROUND(@tot_doc,@num_dec);
					SET @des_doc=ROUND(@des_doc,@num_dec);
					SET @ret_doc=ROUND(@ret_doc,@num_dec);
					SET @ica_doc=ROUND(@ica_doc,@num_dec);
					SET @iva_ret=ROUND(@iva_ret,@num_dec);
					SET @may_val=ROUND(@may_val,@num_dec);
					SET @men_val=ROUND(@men_val,@num_dec);
					SET @bas_doc=ROUND(@bas_doc,@num_dec);

					EXEC sp_gen_trae_tasa_niif @nwddc,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,
									cod_cl1,cod_cl2,cod_cl3,
									cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,bas_mov,ind_tas,num_concil,ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@nwddc,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,@net_doc,0,@des_mov,@num_che,'','',@ind_mp,@fec_tas,@tasa,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,0);
				
					SET @wreg=@wreg+1;
	
					SELECT @nwdcc=n_wddc 
					FROM tes_param_cnt 
					WHERE llave=@ind_con;

					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter,@i_bas=ind_bas 
					FROM nif_puc 
					WHERE cod_cta=@nwdcc;
	
					EXEC sp_gen_trae_tasa_niif @nwdcc,@fec_tas,@tasa OUTPUT,@ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,
									cod_cl1,	cod_cl2,cod_cl3,
									cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,bas_mov,ind_tas,num_concil,ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@nwdcc,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,
								CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,
								CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,0,@net_doc,@des_mov,@num_che,'','',@ind_mp,@fec_tas,@tasa,CASE @i_bas WHEN 1 THEN @bas_doc ELSE 0 END,@ind_tas,@num_concil,0);
				
					SET @wreg=@wreg+1;
					FETCH NEXT FROM cur_cpf INTO @cod_suc,@cod_cco,@cod_ter,@ind_con,@cod_cl1,@cod_cl2,@cod_cl3,@wcon,@num_che,@numche,@net_doc,@tot_doc,@des_doc,@ret_doc,@ica_doc,
																@iva_ret,@may_val,@men_val,@bas_doc,@num_concil;
				END;
				CLOSE cur_cpf;
				DEALLOCATE cur_cpf;
			END;
		END;

		-- CHEQUES POSFECHADOS PROVEEDORES
		IF @tip_doc = '170'
		BEGIN
			IF @cnt_det =0
			BEGIN
				DECLARE cur_cpf CURSOR FOR
				SELECT cod_suc,cod_cco,cod_ter,ind_con,cod_cl1,cod_cl2,cod_cl3,cuenta_con_niif,SUM(net_doc),SUM(tot_doc),SUM(des_doc),SUM(ret_doc),
						SUM(ica_doc),SUM(iva_ret),SUM(may_val),SUM(men_val),num_concil 
				FROM tes_cuedoc
				WHERE ano_doc=RTRIM(@ano_doc) 
					AND per_doc=RTRIM(@per_doc) 
					AND sub_tip=RTRIM(@sub_tip) 
					AND num_doc=RTRIM(@num_doc)
				GROUP BY cod_suc,cod_cco,cod_ter,ind_con,cod_cl1,cod_cl2,cod_cl3,cuenta_con_niif,num_concil;
			END;
			ELSE
			BEGIN
				DECLARE cur_cpf CURSOR FOR
				SELECT cod_suc,cod_cco,cod_ter,ind_con,cod_cl1,cod_cl2,cod_cl3,cuenta_con_niif,net_doc,tot_doc,des_doc,ret_doc,
						ica_doc,iva_ret,may_val,men_val,num_concil 
				FROM tes_cuedoc
				WHERE ano_doc=RTRIM(@ano_doc) 
					AND per_doc=RTRIM(@per_doc) 
					AND sub_tip=RTRIM(@sub_tip) 
					AND num_doc=RTRIM(@num_doc);
			END;

			OPEN cur_cpf;
			SELECT @wreg=1;
			FETCH NEXT FROM cur_cpf INTO @cod_suc,@cod_cco,@cod_ter,@ind_con,@cod_cl1,@cod_cl2,@cod_cl3,@wcon,@net_doc,@tot_doc,@des_doc,@ret_doc,@ica_doc,@iva_ret,
														@may_val,@men_val,@num_concil;	
			WHILE @@FETCH_STATUS<>-1
			BEGIN
				SELECT @des_mov=descrip 
				FROM tes_cabdoc 
				WHERE ano_doc=@ano_doc 
					AND per_doc=@per_doc 
					AND sub_tip=@sub_tip 
					AND num_doc=@num_doc;

				SET @num_che=ISNULL(@num_che,'0');
				SET @bas_doc=ISNULL(@tot_doc,0);

				SELECT @nwddc=n_wdcc 
				FROM tes_param_cnt 
				WHERE llave=@ind_con;
			
				-- REDONDEAMOS PARA ENVIAR INFORMACION A CNT
				SET @net_doc=ROUND(@net_doc,@num_dec);
				SET @tot_doc=ROUND(@tot_doc,@num_dec);
				SET @des_doc=ROUND(@des_doc,@num_dec);
				SET @ret_doc=ROUND(@ret_doc,@num_dec);
				SET @ica_doc=ROUND(@ica_doc,@num_dec);
				SET @iva_ret=ROUND(@iva_ret,@num_dec);
				SET @may_val=ROUND(@may_val,@num_dec);
				SET @men_val=ROUND(@men_val,@num_dec);

				SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter 
				FROM nif_puc 
				WHERE cod_cta=@nwddc;

				EXEC sp_gen_trae_tasa_niif @nwddc,@fec_tas,@tasa OUTPUT,@ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,cod_cl1,
								cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,
								ind_mr,fec_tas,tasa,ind_tas,num_concil,ind_adc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@nwddc,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
							CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,@tot_doc,0,@des_mov,@num_che,'','',
							@ind_mp,@fec_tas,@tasa,@ind_tas,@num_concil,0);
			
				SET @wreg=@wreg+1;
			
				SELECT @nwdcc=n_wdcc 
				FROM tes_param_cnt 
				WHERE llave=@ind_con;

				EXEC sp_gen_trae_tasa_niif @nwdcc,@fec_tas,@tasa OUTPUT,@ind_mp;
			
				SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter 
				FROM nif_puc 
				WHERE cod_cta=@nwdcc;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,cod_cl1,
								cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,
								ind_mr,fec_tas,tasa,ind_tas,num_concil,ind_adc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@nwdcc,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
							CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,0,@tot_doc,@des_mov,@num_che,'','',
							@ind_mp,@fec_tas,@tasa,@ind_tas,@num_concil,0);
				SET @wreg=@wreg+1;

				FETCH NEXT FROM cur_cpf INTO @cod_suc,@cod_cco,@cod_ter,@ind_con,@cod_cl1,@cod_cl2,@cod_cl3,@wcon,@net_doc,@tot_doc,@des_doc,@ret_doc,@ica_doc,@iva_ret,
															@may_val,@men_val,@num_concil;
			END;
			CLOSE cur_cpf;
			DEALLOCATE cur_cpf;
		END;

		-- CHEQUES POSFECHADOS Cartera
		IF @tip_doc = '070'
		BEGIN
			-- SE AGREGA EL NUMERO DE CHEQUE AL INSERT DE TES_INF_NIF PARA QUE SE CREE EL DOCUMENTO CON LA INFORMACION
			-- JSARMIENTO JUNIO/2010
			IF @cnt_det = 0
			BEGIN
				DECLARE c1 CURSOR FOR
				SELECT cod_suc,cod_cco,cod_ter,ind_con,cod_cl1,cod_cl2,cod_cl3,cuenta_con_niif,SUM(net_doc),SUM(tot_doc),SUM(des_doc),SUM(ret_doc),
					SUM(ica_doc),SUM(iva_ret),SUM(may_val),SUM(men_val),num_che,num_concil 
				FROM tes_cuedoc
				WHERE ano_doc=RTRIM(@ano_doc) 
					AND per_doc=RTRIM(@per_doc) 
					AND sub_tip=RTRIM(@sub_tip) 
					AND num_doc=RTRIM(@num_doc)
				GROUP BY cod_suc,cod_cco,cod_ter,ind_con,cod_cl1,cod_cl2,cod_cl3,cuenta_con_niif,num_che,num_concil;
			END;
			ELSE
			BEGIN
				DECLARE c1 CURSOR FOR
				SELECT cod_suc,cod_cco,cod_ter,ind_con,cod_cl1,cod_cl2,cod_cl3,cuenta_con_niif,net_doc,tot_doc,des_doc,ret_doc,
						ica_doc,iva_ret,may_val,men_val,num_che,num_concil 
				FROM tes_cuedoc
				WHERE ano_doc=RTRIM(@ano_doc) 
					AND per_doc=RTRIM(@per_doc) 
					AND sub_tip=RTRIM(@sub_tip) 
					AND num_doc=RTRIM(@num_doc);
			END;

			OPEN c1;
			SELECT @wreg=1;
			FETCH NEXT FROM c1 INTO @cod_suc,@cod_cco,@cod_ter,@ind_con,@cod_cl1,@cod_cl2,@cod_cl3,@wcon,@net_doc,@tot_doc,
													@des_doc,@ret_doc,@ica_doc,@iva_ret,@may_val,@men_val,@num_che,@num_concil;
			WHILE @@FETCH_STATUS<>-1
			BEGIN
				SELECT @des_mov=descrip 
				FROM tes_cabdoc 
				WHERE ano_doc=@ano_doc 
					AND per_doc=@per_doc 
					AND sub_tip=@sub_tip 
					AND num_doc=@num_doc;

				SET @num_che=ISNULL(@num_che,'0');
				SET @bas_doc=ISNULL(@tot_doc,0);

				SELECT @nwddc=n_wddd 
				FROM tes_param_cnt 
				WHERE llave=@ind_con;

				-- REDONDEAMOS PARA ENVIAR INFORMACION A CNT
				SET @net_doc=ROUND(@net_doc,@num_dec);
				SET @tot_doc=ROUND(@tot_doc,@num_dec);
				SET @des_doc=ROUND(@des_doc,@num_dec);
				SET @ret_doc=ROUND(@ret_doc,@num_dec);
				SET @ica_doc=ROUND(@ica_doc,@num_dec);
				SET @iva_ret=ROUND(@iva_ret,@num_dec);
				SET @may_val=ROUND(@may_val,@num_dec);
				SET @men_val=ROUND(@men_val,@num_dec);

				SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter 
				FROM nif_puc 
				WHERE cod_cta=@nwddc;
			
				EXEC sp_gen_trae_tasa_niif @nwddc,@fec_tas,@tasa OUTPUT,@ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,cod_cl1,
								cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,
								ind_mr,fec_tas,tasa,ind_tas,num_concil,ind_adc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@nwddc,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
							CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,@tot_doc,0,@des_mov,@num_che,'','',
							@ind_mp,@fec_tas,@tasa,@ind_tas,@num_concil,0);
				SET @wreg=@wreg+1;

				SELECT @nwdcc=n_wdcd 
				FROM tes_param_cnt 
				WHERE llave=@ind_con;

				EXEC sp_gen_trae_tasa_niif @nwdcc,@fec_tas,@tasa OUTPUT,@ind_mp;

				SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter 
				FROM nif_puc 
				WHERE cod_cta=@nwdcc;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,cod_cl1,
								cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,
								ind_mr,fec_tas,tasa,ind_tas,num_concil,ind_adc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@nwdcc,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
							CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,0,@tot_doc,@des_mov,@num_che,'','',
							@ind_mp,@fec_tas,@tasa,@ind_tas,@num_concil,0);
				SET @wreg=@wreg+1;

				FETCH NEXT FROM c1 INTO @cod_suc,@cod_cco,@cod_ter,@ind_con,@cod_cl1,@cod_cl2,@cod_cl3,@wcon,@net_doc,@tot_doc,@des_doc,@ret_doc,@ica_doc,@iva_ret,
													@may_val,@men_val,@num_che,@num_concil;
			END;
			CLOSE c1;
			DEALLOCATE c1;
		END;

		-- REVERSION CHEQUES POSFECHADOS PROVEEDORES
		IF @tip_doc = '171'
		BEGIN
			IF @cnt_det = 0
			BEGIN
				DECLARE cur_cpf CURSOR FOR
				SELECT cod_suc,cod_cco,cod_ter,ind_con,cod_cl1,cod_cl2,cod_cl3,cuenta_con_niif,SUM(net_doc),SUM(tot_doc),SUM(des_doc),SUM(ret_doc),
						SUM(ica_doc),SUM(iva_ret),SUM(may_val),SUM(men_val),num_concil 
				FROM tes_cuedoc
				WHERE ano_doc=RTRIM(@ano_doc) 
					AND per_doc=RTRIM(@per_doc) 
					AND sub_tip=RTRIM(@sub_tip) 
					AND num_doc=RTRIM(@num_doc)
				GROUP BY cod_suc,cod_cco,cod_ter,ind_con,cod_cl1,cod_cl2,cod_cl3,cuenta_con_niif,num_concil;
			END;
			ELSE
			BEGIN
				DECLARE cur_cpf CURSOR FOR
				SELECT cod_suc,cod_cco,cod_ter,ind_con,cod_cl1,cod_cl2,cod_cl3,cuenta_con_niif,net_doc,tot_doc,des_doc,ret_doc,
						ica_doc,iva_ret,may_val,men_val,num_concil
				FROM tes_cuedoc
				WHERE ano_doc=RTRIM(@ano_doc) 
					AND per_doc=RTRIM(@per_doc) 
					AND sub_tip=RTRIM(@sub_tip) 
					AND num_doc=RTRIM(@num_doc);
			END;

			OPEN cur_cpf;
			SELECT @wreg=1;
			FETCH NEXT FROM cur_cpf INTO @cod_suc,@cod_cco,@cod_ter,@ind_con,@cod_cl1,@cod_cl2,@cod_cl3,@wcon,@net_doc,@tot_doc,@des_doc,@ret_doc,@ica_doc,@iva_ret,@may_val,
															@men_val,@num_concil;
			WHILE @@FETCH_STATUS<>-1
			BEGIN
				SELECT @des_mov=descrip 
				FROM tes_cabdoc 
				WHERE ano_doc=@ano_doc 
				AND per_doc=@per_doc 
				AND sub_tip=@sub_tip 
				AND num_doc=@num_doc;

				SET @num_che=ISNULL(@num_che,'0');
				SET @bas_doc=ISNULL(@tot_doc,0);

				SELECT @nwddc=n_wddc 
				FROM tes_param_cnt 
				WHERE llave=@ind_con;

				-- REDONDEAMOS PARA ENVIAR INFORMACION A CNT
				SET @net_doc=ROUND(@net_doc,@num_dec);
				SET @tot_doc=ROUND(@tot_doc,@num_dec);
				SET @des_doc=ROUND(@des_doc,@num_dec);
				SET @ret_doc=ROUND(@ret_doc,@num_dec);
				SET @ica_doc=ROUND(@ica_doc,@num_dec);
				SET @iva_ret=ROUND(@iva_ret,@num_dec);
				SET @may_val=ROUND(@may_val,@num_dec);
				SET @men_val=ROUND(@men_val,@num_dec);

				SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter 
				FROM nif_puc 
				WHERE cod_cta=@nwddc;
			
				EXEC sp_gen_trae_tasa_niif @nwddc,@fec_tas,@tasa OUTPUT,@ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,cod_cl1,
								cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,
								ind_mr,fec_tas,tasa,ind_tas,num_concil,ind_adc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@nwddc,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
							CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,0,@tot_doc,@des_mov,@num_che,'','',
							@ind_mp,@fec_tas,@tasa,@ind_tas,@num_concil,0);
				SET @wreg=@wreg+1;

				SELECT @nwdcc=n_wdcc 
				FROM tes_param_cnt 
				WHERE llave=@ind_con;

				EXEC sp_gen_trae_tasa_niif @nwdcc,@fec_tas,@tasa OUTPUT,@ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter 
				FROM nif_puc 
				WHERE cod_cta=@nwdcc;
			
				INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,cod_cl1,
								cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,
								ind_mr,fec_tas,tasa,ind_tas,num_concil,ind_adc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@nwdcc,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
							CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,@tot_doc,0,@des_mov,@num_che,'','',
							@ind_mp,@fec_tas,@tasa,@ind_tas,@num_concil,0);
				SET @wreg=@wreg+1;
				FETCH NEXT FROM cur_cpf INTO @cod_suc,@cod_cco,@cod_ter,@ind_con,@cod_cl1,@cod_cl2,@cod_cl3,@wcon,@net_doc,@tot_doc,@des_doc,@ret_doc,@ica_doc,@iva_ret,@may_val,
															@men_val,@num_concil;
			END;
			CLOSE cur_cpf;
			DEALLOCATE cur_cpf;
		END;

		-- REVERSION CHEQUES POSFECHADOS Cartera
		IF @tip_doc = '071'
		BEGIN
			IF @cnt_det = 0
			BEGIN
				DECLARE c1 CURSOR FOR
				SELECT cod_suc,cod_cco,cod_ter,ind_con,cod_cl1,cod_cl2,cod_cl3,cuenta_con_niif,SUM(net_doc),SUM(tot_doc),SUM(des_doc),SUM(ret_doc),
						SUM(ica_doc),SUM(iva_ret),SUM(may_val),SUM(men_val),num_concil 
				FROM tes_cuedoc
				WHERE ano_doc=RTRIM(@ano_doc) 
					AND per_doc=RTRIM(@per_doc) 
					AND sub_tip=RTRIM(@sub_tip) 
					AND num_doc=RTRIM(@num_doc)
				GROUP BY cod_suc,cod_cco,cod_ter,ind_con,cod_cl1,cod_cl2,cod_cl3,cuenta_con_niif,num_concil;
			END;
			ELSE
			BEGIN
				DECLARE c1 CURSOR FOR
				SELECT cod_suc,cod_cco,cod_ter,ind_con,cod_cl1,cod_cl2,cod_cl3,cuenta_con_niif,net_doc,tot_doc,des_doc,ret_doc,
						ica_doc,iva_ret,may_val,men_val,num_concil 
				FROM tes_cuedoc
				WHERE ano_doc=RTRIM(@ano_doc) 
					AND per_doc=RTRIM(@per_doc) 
					AND sub_tip=RTRIM(@sub_tip) 
					AND num_doc=RTRIM(@num_doc);
			END;

			OPEN c1;
			SELECT @wreg=1;
			FETCH NEXT FROM c1 INTO @cod_suc,@cod_cco,@cod_ter,@ind_con,@cod_cl1,@cod_cl2,@cod_cl3,@wcon,@net_doc,@tot_doc,@des_doc,@ret_doc,
												@ica_doc,@iva_ret,@may_val,@men_val,@num_concil;
			WHILE @@FETCH_STATUS<>-1
			BEGIN
				SELECT @des_mov=descrip 
				FROM tes_cabdoc 
				WHERE ano_doc=@ano_doc 
					AND per_doc=@per_doc 
					AND sub_tip=@sub_tip 
					AND num_doc=@num_doc;

				SET @num_che=ISNULL(@num_che,'0');
				SET @bas_doc=ISNULL(@tot_doc,0);

				SELECT @nwddc=n_wddd 
				FROM tes_param_cnt 
				WHERE llave=@ind_con;

				-- REDONDEAMOS PARA ENVIAR INFORMACION A CNT
				SET @net_doc=ROUND(@net_doc,@num_dec);
				SET @tot_doc=ROUND(@tot_doc,@num_dec);
				SET @des_doc=ROUND(@des_doc,@num_dec);
				SET @ret_doc=ROUND(@ret_doc,@num_dec);
				SET @ica_doc=ROUND(@ica_doc,@num_dec);
				SET @iva_ret=ROUND(@iva_ret,@num_dec);
				SET @may_val=ROUND(@may_val,@num_dec);
				SET @men_val=ROUND(@men_val,@num_dec);

				SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter 
				FROM nif_puc 
				WHERE cod_cta=@nwddc;
			
				EXEC sp_gen_trae_tasa_niif @nwddc,@fec_tas,@tasa OUTPUT,@ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,cod_cl1,
								cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,
								ind_mr,fec_tas,tasa,ind_tas,num_concil,ind_adc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@nwddc,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
							CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,0,@tot_doc,@des_mov,@num_che,'','',
							@ind_mp,@fec_tas,@tasa,@ind_tas,@num_concil,0);
				SET @wreg=@wreg+1;

				SELECT @nwdcc=n_wdcd 
				FROM tes_param_cnt 
				WHERE llave=@ind_con;

				EXEC sp_gen_trae_tasa_niif @nwdcc,@fec_tas,@tasa OUTPUT,@ind_mp;

				SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter 
				FROM nif_puc 
				WHERE cod_cta=@nwdcc;
			
				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,cod_cco,cod_cl1,
								cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,num_che,ind_cos,ind_tra,
								ind_mr,fec_tas,tasa,ind_tas,num_concil,ind_adc)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,@wreg),@fch_doc,@nwdcc,@cod_suc,CASE @i_cco WHEN 1 THEN @cod_cco ELSE '0' END,CASE @i_cl1 WHEN 1 THEN @cod_cl1 ELSE '0' END,
							CASE @i_cl2 WHEN 1 THEN @cod_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @cod_cl3 ELSE '0' END,CASE @i_ter WHEN 1 THEN '0' ELSE @cod_ter END,@tot_doc,0,@des_mov,@num_che,'','',
							@ind_mp,@fec_tas,@tasa,@ind_tas,@num_concil,0);
				SET @wreg=@wreg+1;

				FETCH NEXT FROM c1 INTO @cod_suc,@cod_cco,@cod_ter,@ind_con,@cod_cl1,@cod_cl2,@cod_cl3,@wcon,@net_doc,@tot_doc,@des_doc,@ret_doc,
													@ica_doc,@iva_ret,@may_val,@men_val,@num_concil;
			END;
			CLOSE c1;
			DEALLOCATE c1;
		END;

		--  VALIDAMOS EL CUADRE DEL DOCUMENTO
		SELECT @max_aju=max_aju,@aju_deb=aju_deb,@aju_cre=aju_cre
		FROM nif_cuadre_tipos 
		WHERE cod_tip=@tip_doc AND tip_mon=@ind_mp;

		IF @@ROWCOUNT>0
		BEGIN
			SELECT @tot_deb=SUM(deb_mov),@tot_cre=SUM(cre_mov),@max_reg=MAX(reg_doc) 
			FROM @tinfon 
			WHERE ano_doc=@ano_doc 
				AND per_doc=@per_doc 
				AND sub_tip=@sub_tip 
				AND num_doc=@num_doc;

			IF (@tot_deb-@tot_cre) BETWEEN @max_aju*-1 AND @max_aju AND @tot_deb<>@tot_cre
			BEGIN
		
				SELECT TOP 1 @aju_suc=cod_suc,@aju_cco=cod_cco,@aju_cl1=cod_cl1,@aju_cl2=cod_cl2,@aju_cl3=cod_cl3,@aju_ter=cod_ter 
				FROM tes_cuedoc 
				WHERE ano_doc=@ano_doc 
					AND per_doc=@per_doc 
					AND sub_tip=@sub_tip 
					AND num_doc=@num_doc;
		
				IF @tot_deb<@tot_cre
				BEGIN
					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter 
					FROM nif_puc 
					WHERE cod_cta=@aju_deb;

					INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
									cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,
									ind_tra,ind_mr,fec_tas,tasa,ind_tas,ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,CONVERT(SMALLINT,@max_reg)+1),
								@fch_doc,@aju_deb,@aju_suc,CASE @i_cco WHEN 1 THEN @aju_cco ELSE '0' END,CASE @i_cl1 WHEN 1 THEN @aju_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @aju_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @aju_cl3 ELSE '0' END,CASE @i_ter WHEN 1 THEN '0' ELSE @aju_ter END,ABS(@tot_deb-@tot_cre),0,
								'REGISTRO DE CUADRE X REDONDEO',0,'','','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
				END;
				ELSE
				BEGIN
					SELECT @i_cco=ind_cco,@i_cl1=ind_cl1,@i_cl2=ind_cl2,@i_cl3=ind_cl3,@i_ter=ind_ter FROM nif_puc WHERE cod_cta=@aju_cre;

					INSERT INTO @tinfon (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_cta,cod_suc,
									cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_ter,deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,
									ind_tra,ind_mr,fec_tas,tasa,ind_tas,ind_adc)
					VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,CONVERT(CHAR,CONVERT(SMALLINT,@max_reg)+1),
								@fch_doc,@aju_cre,@aju_suc,CASE @i_cco WHEN 1 THEN @aju_cco ELSE '0' END,CASE @i_cl1 WHEN 1 THEN @aju_cl1 ELSE '0' END,
								CASE @i_cl2 WHEN 1 THEN @aju_cl2 ELSE '0' END,CASE @i_cl3 WHEN 1 THEN @aju_cl3 ELSE '0' END,CASE @i_ter WHEN 1 THEN '0' ELSE @aju_ter END,0,ABS(@tot_deb-@tot_cre),
								'REGISTRO DE CUADRE X REDONDEO',0,'','','',@ind_mp,@fec_tas,@tasa,@ind_tas,0);
				END;
			END;
		END;

		-- insertamos registros agrupados sumatoria débitos
		IF @cnt_det = 0
		BEGIN
			INSERT INTO @tinfonF(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,
							deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas,num_concil,ind_adc)
			SELECT ano_doc,per_doc,sub_tip,tip_doc,num_doc,0,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,
					SUM(deb_mov),SUM(cre_mov),des_mov,sum(bas_mov),num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas,num_concil,ind_adc
			FROM @tinfon
			WHERE deb_mov<>0
			GROUP BY ano_doc,per_doc,sub_tip,tip_doc,num_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,des_mov,num_che,
			ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas,num_concil,ind_adc;
		END;
		ELSE
		BEGIN
			INSERT INTO @tinfonF(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,
								deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas,num_concil,ind_adc)
			SELECT ano_doc,per_doc,sub_tip,tip_doc,num_doc,0,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,
					deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas,num_concil,ind_adc	
			FROM @tinfon
			WHERE deb_mov<>0;
		END;

		-- insertamos registros agrupados sumatoria créditos
		IF @cnt_det = 0
		BEGIN
			INSERT INTO @tinfonF(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,
							deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas,num_concil,ind_adc)
			SELECT ano_doc,per_doc,sub_tip,tip_doc,num_doc,0,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,
					SUM(deb_mov),SUM(cre_mov),des_mov,SUM(bas_mov),num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas,num_concil,ind_adc	
			FROM @tinfon
			WHERE cre_mov<>0
			GROUP BY ano_doc,per_doc,sub_tip,tip_doc,num_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,des_mov,num_che,
						ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas,num_concil,ind_adc;
		END;
		ELSE
		BEGIN
			INSERT INTO @tinfonF(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,
								deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas,num_concil,ind_adc)
			SELECT ano_doc,per_doc,sub_tip,tip_doc,num_doc,0,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,
				deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas,num_concil,ind_adc	
			FROM @tinfon
			WHERE cre_mov<>0;
		END;

		INSERT INTO tes_inf_nif(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,
						deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas,num_concil,difcam_doc)
		SELECT ano_doc,per_doc,sub_tip,tip_doc,num_doc,LTRIM(RTRIM(CONVERT(CHAR,ROW_NUMBER() OVER (ORDER BY ind_adc)))),fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,
				deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_tas,num_concil,ind_adc
		FROM @tinfonF
		ORDER BY ind_adc;
	
	END;
	RETURN(0);
END;

```
