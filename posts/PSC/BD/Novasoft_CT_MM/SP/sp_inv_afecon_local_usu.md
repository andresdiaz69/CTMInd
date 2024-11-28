# Stored Procedure: sp_inv_afecon_local_usu

## Usa los objetos:
- [[cnt_cuadre_tipos]]
- [[cnt_puc]]
- [[cxc_cliente]]
- [[cxc_cuedoc]]
- [[cxc_param]]
- [[cxp_cuedoc]]
- [[Cxp_distriafe]]
- [[cxp_param]]
- [[cxp_param_cnt]]
- [[cxp_provee]]
- [[gen_actividad]]
- [[gen_cajas]]
- [[gen_decapl]]
- [[gen_imp_adic]]
- [[gen_retencion]]
- [[gen_subtipodoc]]
- [[inv_cabdoc]]
- [[inv_conceptos]]
- [[inv_cuedoc]]
- [[inv_distctas_escosto]]
- [[inv_inf_con]]
- [[inv_items]]
- [[inv_param_cnt]]
- [[pre_rubro]]
- [[ptv_egresos]]
- [[sp_gen_trae_tasa]]
- [[tes_bancos]]

```sql

/*2016/06/15 SRS2016-0351 Corrección Código de Sucursal en Cuenta Debito
SE CORRIGE LA CONSULTA DE INFORMACION DE CLIENTE PARA QUE SE REALICE POR CODIGO Y NO POR EL NIT
SE CORRIGE LA CONSULTA DE INFORMACION DE PROVEEDOR PARA QUE SE REALICE POR CODIGO Y NO POR EL NIT
JSARMIENTO AGOSTO/2016 SRS2016-0629
SE ASIGNA EL TERCERO DE CABEZA DE DOCUMENTOS EN LA CONTABILIZACION DE AJUSTES PESOS SUMA Y RESTA
JSARMIENTO OCTUBRE/2016 SRS2016-0829
SE DEJA EN COMENTARIO LA VALIDACION DE CUENTA CONTABLE DE VENTA NETA PARA QUE SIEMPRE SE TOME LA CUENTA DE INGRESO DE DEV. DE VENTAS
SE ASIGNA LA CUENTA DE EGRESO PARAMETRIZADA EN LA SECCION DE DEVOLUCIONES DE ITEM PARA LA CUENTA DE EGRESO EN LA DEVOLUCION DE COMPRAS
JSARMIENTO NOVIEMBRE/2016 SRS2016-0915
SE ASIGNA LA CUENTA DE GASTO, IVA NG, INGRESO Y COSTO DE ACUERDO AL MAESTRO DE DISTRIBUCIÓN DE ESTRUCTURA DE COSTOS Y GRUPO DE INVENTARIOS
JSARMIENTO NOVIEMBRE/2016 SPR2016-0012
SE CONSULTA LA CUENTA DE DISTRIBUCION DE ESTRUCTURA DE COSTOS DE ACUERDO AL NIVEL DE PARAMETROS GENERALES
JSARMIENTO DICIEMBRE/2016 SNR2016-0056
SE AGREGA A LA CONTABILIZACION DE DISTRIBUCION CONTABLE DE IVA NO GRAVADO LA BASE SI APLICA
SE CORRIGE LA ASIGNACION DE LA BASE DE IMPUESTOS EN DEVOLUCION DE COMPRA YA QUE SE VERIFICA LA BASE DE IMPUESTOS
JSARMIENTO AGOSTO/2017 SRS2017-0855
SE AGREGA DESCRIPCION AL MOVIMIENTO CONTABLE DE SALIDAS, TRASLADOS, AJUSTES, DISTRIBUCION DE GASTOS EN DEVOLUCION COMPRAS
JSARMIENTO SEPTIEMBRE/2017 SRS2017-1054*/
CREATE PROCEDURE [dbo].[sp_inv_afecon_local_usu]
	@ano_doc	CHAR(4),
	@per_doc	CHAR(2),
	@sub_tip	CHAR(5),
	@num_doc	CHAR(14),
	@fecha		DATETIME,
	@tip		CHAR(3)  --Parametro de tipo de contabilizacion
 
AS
BEGIN
	--CUENTAS
	DECLARE @ret_ven		VARCHAR(16);
	DECLARE @iva_ven		VARCHAR(16);
	DECLARE @imp_conv		VARCHAR(16);
	DECLARE @iva_ng			VARCHAR(16);
	DECLARE @cta_ing			VARCHAR(16);
	DECLARE @ven_net1		VARCHAR(16);
	DECLARE @inv_ven		VARCHAR(16);
	DECLARE @cos_ven		VARCHAR(16);
	DECLARE @ret_iva_c		VARCHAR(16);
	DECLARE @ret_ica_c		VARCHAR(16);
	DECLARE @des_ven		VARCHAR(16);
	DECLARE @cob_ica_c		VARCHAR(16);
	DECLARE @cta_cxc			VARCHAR(16);
	DECLARE @cta_cxp		VARCHAR(16);
	DECLARE @cta_egr			VARCHAR(16);
	DECLARE @ven_netc		VARCHAR(16);
	DECLARE @ret_vec			VARCHAR(16);
	DECLARE @aju_com		VARCHAR(16);
	DECLARE @iva_pag		VARCHAR(16);
	DECLARE @cos_uni		MONEY;
	DECLARE @ant_cxc		VARCHAR(16);
	DECLARE @ant_cxp		VARCHAR(16);

	--DOCUMENTOS
	DECLARE @item				VARCHAR(40);
	DECLARE @ven_net		MONEY;
	DECLARE @pre_tot			MONEY;
	DECLARE @mon_des		MONEY;
	DECLARE @mon_iva		MONEY;
	DECLARE @mon_iva_ng	MONEY;
	DECLARE @imp_con		MONEY;
	DECLARE @mon_ret		MONEY;
	DECLARE @ret_iva			MONEY;
	DECLARE @ret_ica			MONEY;
	DECLARE @cob_ica			MONEY;
	DECLARE @val_def			MONEY;
	DECLARE @cos_tot			MONEY;
	DECLARE @bas_mov		MONEY;
	DECLARE @cod_cl1			CHAR(12);
	DECLARE @cod_cl11		CHAR(12);
	DECLARE @cod_cl2			CHAR(12);
	DECLARE @cod_cl21		CHAR(12);
	DECLARE @cod_cl3			CHAR(12);
	DECLARE @cod_cl31		CHAR(12);
	DECLARE @cod_ter			CHAR(15);
	DECLARE @cod_ter1		CHAR(15);
	DECLARE @regc				VARCHAR(10);
	DECLARE @reg2				VARCHAR(10);
	DECLARE @reg				SMALLINT;
	DECLARE @reg1				SMALLINT;
	DECLARE @cod_suc		CHAR(3);
	DECLARE @cod_cco		CHAR(10);
	DECLARE @cod_cco1		CHAR(10);
	DECLARE @doc_ant		CHAR(14);
	DECLARE @provee			CHAR(15);
	DECLARE @ant_doc		MONEY;
	DECLARE @obs_orc		VARCHAR(70);
	DECLARE @cod_con		CHAR(3);


	--CUENTAS
	DECLARE @ter			SMALLINT;
	DECLARE @cco			SMALLINT;
	DECLARE @bas			SMALLINT;
	DECLARE @cl1			SMALLINT;
	DECLARE @cl2			SMALLINT;
	DECLARE @cl3			SMALLINT;

	--INDICADORES
	DECLARE @wind_cxc		SMALLINT;
	DECLARE @autoretene	SMALLINT;
	DECLARE @wind_cxp		SMALLINT;
	DECLARE @ind_tip			SMALLINT;
	DECLARE @afe_con		SMALLINT;
	DECLARE @ano				CHAR(4);
	DECLARE @per				CHAR(2);
	DECLARE @tipo				CHAR(3);
	DECLARE @num				CHAR(14);
	DECLARE @fec				DATETIME;
	DECLARE @suc				CHAR(3);
	DECLARE @ccosto			CHAR(10);

	DECLARE @cta				CHAR(16);
	DECLARE @tercero			CHAR(15);
	DECLARE @clasif1			CHAR(12);
	DECLARE @clasif2			CHAR(12);
	DECLARE @clasif3			CHAR(12);
	DECLARE @deb_mov		MONEY;
	DECLARE @cre_mov		MONEY;
	DECLARE @des				VARCHAR(70);
	DECLARE @base				MONEY;
	DECLARE @che				CHAR(10);
	DECLARE @cos				CHAR(1);
	DECLARE @tra				CHAR(1);
	DECLARE @nat				CHAR(1);

	--VARIABLES MULTIMONEDA
	DECLARE @ind_mp		CHAR(2);
	DECLARE @fec_tas		DATETIME;
	DECLARE @tasa			MONEY;
	DECLARE @prt_ext		MONEY;
	DECLARE @cot_ext		MONEY;
	DECLARE @des_ext	MONEY;
	DECLARE @tasa_doc	MONEY;
	DECLARE @ind_tas		CHAR(1);

	-- ANTICIPOS DE DEVOLUCIONES
	DECLARE @val_ant		MONEY;
	DECLARE @ano_ant	CHAR(4);
	DECLARE @per_ant	CHAR(2);
	DECLARE @sub_ant	CHAR(5);
	DECLARE @num_ant	CHAR(14);
	DECLARE @cta_ant		CHAR(16);

	-- AJUSTES POR INFLACION
	DECLARE @cta_axi			CHAR(16);
	DECLARE @cta_mon		CHAR(16);
	DECLARE @cta_axi_gas	CHAR(16);
	DECLARE @cos_unai		MONEY;
	DECLARE @cos_toa		MONEY;

	-- NIT PARA CONTABILIZAR
	DECLARE @ind_cli		SMALLINT;
	DECLARE @nit_cli		CHAR(15);
	DECLARE @ind_pro	SMALLINT;
	DECLARE @nit_pro		CHAR(15);

	--VARIABLES CUADRE DE DOCUMENTO
	DECLARE @tot_deb	MONEY;
	DECLARE @tot_cre		MONEY;
	DECLARE @ind_aju		BIT;
	DECLARE @max_aju	MONEY;
	DECLARE @aju_deb	CHAR(16);
	DECLARE @aju_cre		CHAR(16);
	DECLARE @aju_suc	CHAR(3);
	DECLARE @aju_cco	CHAR(10);
	DECLARE @aju_cl1		CHAR(16);
	DECLARE @aju_cl2		CHAR(16);
	DECLARE @aju_cl3		CHAR(16);
	DECLARE @aju_ter		CHAR(15);
	DECLARE @max_reg	SMALLINT;

	--REDONDEO DE DECIMALES
	DECLARE @num_dec	SMALLINT;

	-- PUNTO DE VENTA
	DECLARE @cod_egr	CHAR(3);
	DECLARE @ptv_otr		CHAR(16);
	DECLARE @ptv_caj		CHAR(16);

	DECLARE @tip_doc		CHAR(3);

	DECLARE @conta1		INT;

	DECLARE @cod_rubro		CHAR(17);
	DECLARE @cod_rubegr	CHAR(17);

	DECLARE @cod_cta	CHAR(16);
		
	DECLARE @ter_cia	CHAR(15),
				@ind_des	TINYINT;

	DECLARE	@suc_des	CHAR(3),
				@suc_cnt		CHAR(3);

	--	SRS	2011-0329
	DECLARE @tip_pro	SMALLINT;

	--	DISTRIBUCION GASTO	-	SRS 2012-0308
	DECLARE @ind_afe			CHAR(3);
	DECLARE @acod_suc		CHAR(3);
	DECLARE @acod_cco		CHAR(10);
	DECLARE @acod_cl1		VARCHAR(12);
	DECLARE @acod_cl2		VARCHAR(12);
	DECLARE @acod_cl3		VARCHAR(12);
	DECLARE @aNet_doc		MONEY;
	DECLARE @wven			CHAR(16);

	CREATE
	TABLE	#t_afecon_p
			(recno		INT IDENTITY(1,1),
			Cod_cta		CHAR(16) COLLATE DATABASE_DEFAULT NULL,
			Cod_suc	CHAR(3) COLLATE DATABASE_DEFAULT NULL, 
			Cod_cco		CHAR(10) COLLATE DATABASE_DEFAULT NULL, 
			Cod_cl1		VARCHAR(12) COLLATE DATABASE_DEFAULT NULL, 
			Cod_cl2		VARCHAR(12) COLLATE DATABASE_DEFAULT NULL, 
			Cod_cl3		VARCHAR(12) COLLATE DATABASE_DEFAULT NULL, 
			valor			MONEY NULL,
			base			MONEY NULL);

	CREATE
	TABLE	#t_afecon_ng
			(recno		INT IDENTITY(1,1),
			Cod_cta		CHAR(16) COLLATE DATABASE_DEFAULT NULL,
			Cod_suc	CHAR(3) COLLATE DATABASE_DEFAULT NULL, 
			Cod_cco		CHAR(10) COLLATE DATABASE_DEFAULT NULL, 
			Cod_cl1		VARCHAR(12) COLLATE DATABASE_DEFAULT NULL, 
			Cod_cl2		VARCHAR(12) COLLATE DATABASE_DEFAULT NULL, 
			Cod_cl3		VARCHAR(12) COLLATE DATABASE_DEFAULT NULL, 
			valor			MONEY NULL,
			base			MONEY NULL);

	DECLARE @gas_dist	MONEY;
	DECLARE @conta7	INT;
	DECLARE @conta8	INT;
	DECLARE @conta9	INT;

	DECLARE @conta101		INT;
	DECLARE @conta102		INT;

	--	SRS	2012-0487
	DECLARE @ret_iva_ng	MONEY;
	DECLARE @riv_com_ng	CHAR(16);

	DECLARE @ind_cnt_costo_vta BIT

	--	SRS 2013-0462
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

	-- ESTRUCTURA DE COSTOS DESTINO EN TRASLADOS(TIPO 003) SRS 2014-0039				
	DECLARE	@cco_des	CHAR(10),
				@cl1_des	VARCHAR(12),	
				@cl2_des	VARCHAR(12),
				@cl3_des	VARCHAR(12);	
		
	DECLARE	@cl1_cnt	VARCHAR(12),	
				@cl2_cnt	VARCHAR(12),
				@cl3_cnt	VARCHAR(12);			
					
	DECLARE @cta_pte	CHAR(16),
				@ind_act	TINYINT;

	--	SRS 2014-0088
	DECLARE @base_iva_aiu	MONEY;

	--	SRS: 2014-0114
	DECLARE @ind_cta_ret	TINYINT;
	DECLARE @cod_ret			CHAR(3);

	--	SRS: 2014-0188
	DECLARE @ind_cta_cxp	TINYINT;		-- 1. Proveedor  2. Item

	-- SRS: 2015-0013
	DECLARE @cod_cli	CHAR(15);

	--	SRS: 2015-0066
	DECLARE @cod_ica			VARCHAR(10);
	DECLARE @ind_cta_ica	SMALLINT;
	DECLARE @cta_ica			CHAR(16);
	DECLARE @pai_doc		CHAR(3);
	DECLARE @dep_doc		CHAR(2);
	DECLARE @ciu_doc			CHAR(5);

	--	SRS: 2015-0389
	DECLARE @ind_cnt_des	TINYINT;
	DECLARE @val_cnt			MONEY;

	-- SRS: 2015-0628
	DECLARE @cod_caja		CHAR(3);
	DECLARE @ind_tes			SMALLINT;
	DECLARE @cod_ban		VARCHAR(10);
	
	--	SPR2016-0012 VARIABLES DISTRIBUCION GRUPO Y ESTRUCTURA DE COSTOS
	DECLARE @cod_gru		CHAR(3);
	DECLARE @dcta_gas		CHAR(16);
	DECLARE @dcta_ivang	CHAR(16);
	DECLARE @dcta_costo	CHAR(16);
	DECLARE @dcta_ing		CHAR(16);

	-- SNR2016-0056
	DECLARE @niv_dist			TINYINT;

	--	SRS2017-0855
	DECLARE @bas_cnt		MONEY;
	DECLARE @bas_dist		MONEY;
	DECLARE @aBas_Doc		MONEY

	--	SRS2017-1054
	DECLARE @obs_inv		CHAR(70);
	DECLARE @obs_cto		CHAR(70);

	SET NOCOUNT ON;

	IF @tip IS NULL
	BEGIN
		RETURN;
	END;

	-- SI EXISTEN REGISTROS DE AFECTACION CONTABLE PARA ESE DOCUMENTO CANCELAMOS EL PROCESO
	SELECT @conta1=ISNULL(COUNT(1),0) FROM inv_inf_con WHERE ano_doc=@ano_doc AND Per_doc=@per_doc AND sub_tip=@sub_tip AND Num_doc=@num_doc;

	IF @conta1>0
	BEGIN
		RETURN;
	END;
	
	-- TRAEMOS NUMERO DE DECIMALES PARA REDONDEAR LOS VALORES ANTES DE SUBIRLOS A CONTABILIDAD
	SELECT @ind_mp=ind_mp,@pai_doc=pai_doc,@dep_doc=dep_doc,@ciu_doc=ciu_doc 
	FROM inv_cabdoc  
	WHERE ano_doc=@ano_doc AND per_doc=@per_doc AND sub_tip=@sub_tip AND num_doc=@num_doc;

	--	TRAEMOS NUMERO DE DECIMALES PARA REDONDEAR LOS VALORES ANTES DE SUBIRLOS A CONTABILIDAD DE LA TABLA gen_decapl
	--	SI NO SE HA DEFINIDO DECIMALES LO DEJAMOS EN 2
	--	JCESARS		ABRIL/2010
	SELECT @num_dec=dec_int FROM gen_decapl WHERE cod_apl='INV' AND tip_mon=@ind_mp;
	SELECT @num_dec=ISNULL(@num_dec,2);

	SET @ind_des = 0;
	 
	IF EXISTS( SELECT despa 
				FROM inv_cuedoc AS A INNER JOIN inv_cabdoc AS b ON a.ano_des=b.ano_doc AND a.per_des=b.per_doc AND a.sub_des=b.sub_tip AND a.despa=b.num_doc
				WHERE a.ano_doc=@ano_doc AND a.per_doc=@per_doc AND a.sub_tip=@sub_tip AND a.num_doc=@num_doc )
		SET @ind_des = 1;

	SELECT	ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,des_mov,
				bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas 
	INTO #inv_inf_con_det 
	FROM inv_inf_con WHERE ano_doc='XXXX';

	SELECT	cue.item,SUM(cue.pre_tot) AS pre_tot,SUM(cue.mon_des) AS mon_des,SUM(cue.mon_iva) AS mon_iva,SUM(cue.mon_iva_ng) AS mon_iva_ng,
				SUM(cue.imp_con) AS imp_con,SUM(cue.mon_ret) AS mon_ret,SUM(cue.ret_iva) AS ret_iva,SUM(cue.ret_ica) AS ret_ica,SUM(cue.cob_ica) AS cob_ica,
				SUM(cue.val_def) AS val_def,SUM(cue.cos_tot) AS cos_tot,SUM(cue.ven_net) AS ven_net,cab.cod_suc,cue.cod_cco,cab.cliente,cue.cod_cl1,cue.cod_cl2,cue.cod_cl3,
				cab.provee,SUM(cue.cos_uni) AS cos_uni,SUM(cue.prt_ext) AS prt_ext,SUM(cue.cot_ext) AS cot_ext,
				SUM(cue.des_ext) AS des_ext, SUM(cue.cos_unai) AS cos_unai, SUM(cue.cos_toa) AS cos_toa, cue.cod_egr, SUM(cue.val_ant) AS val_ant,cue.cod_rubro,
				ISNULL(cue.ind_afe,'0') AS ind_afe,SUM(ret_iva_ng) AS ret_iva_ng,SUM(mon_sum1) AS mon_sum1,SUM(mon_sum2) AS mon_sum2,
				SUM(cue.mon_sum3) AS mon_sum3,SUM(cue.mon_sum4) AS mon_sum4,SUM(cue.mon_res1) AS mon_res1,SUM(cue.mon_res2) AS mon_res2,
				SUM(cue.mon_res3) AS mon_res3,SUM(cue.mon_res4) AS mon_res4,SUM(cue.base_iva_aiu) AS base_iva_aiu,cue.cod_ret,cue.suc_des,cue.cco_des,cue.cl1_des,
				cue.cl2_des,cue.cl3_des,cue.cod_ica, ite.cod_grupo
	INTO #t_infcon
	FROM inv_cuedoc AS cue 
			INNER JOIN inv_cabdoc AS cab ON cab.ano_doc=cue.ano_doc AND cab.per_doc=cue.per_doc AND cab.sub_tip=cue.sub_tip AND cab.num_doc=cue.num_doc 
			INNER JOIN inv_items AS ite ON ite.cod_item = cue.item
	WHERE  cab.ano_doc=@ano_doc AND cab.per_doc=@per_doc AND cab.sub_tip=@sub_tip AND cab.num_doc=@num_doc
			AND item='xxxxxxxxx'
	GROUP BY item, ite.cod_grupo,cod_suc,cue.cod_cco,cliente,cue.cod_cl1,cue.cod_cl2,cue.cod_cl3,provee, cod_egr,cod_rubro,cue.ind_afe,cue.cod_ret,cue.suc_des,cue.cco_des,cue.cl1_des,
				cue.cl2_des,cue.cl3_des,cue.cod_ica;

	ALTER TABLE #t_infcon
		ADD registro INT IDENTITY;

	INSERT INTO #t_infcon(item,pre_tot,mon_des,mon_iva,mon_iva_ng,imp_con,mon_ret,ret_iva,ret_ica,cob_ica,
									val_def,cos_tot,ven_net,cod_suc,cue.cod_cco,cliente,cue.cod_cl1,cue.cod_cl2,cue.cod_cl3,
									provee,cos_uni,prt_ext,cot_ext,des_ext,cos_unai,cos_toa,cod_egr,val_ant,cod_rubro,ind_afe,ret_iva_ng,mon_sum1,mon_sum2,
									mon_sum3,mon_sum4,mon_res1,mon_res2,mon_res3,mon_res4,base_iva_aiu,cod_ret,suc_des,cco_des,cl1_des,
									cl2_des,cl3_des,cod_ica, cod_grupo)
	SELECT	cue.item,SUM(cue.pre_tot),SUM(cue.mon_des),SUM(cue.mon_iva),SUM(cue.mon_iva_ng),SUM(cue.imp_con),SUM(cue.mon_ret),SUM(cue.ret_iva),SUM(cue.ret_ica),SUM(cue.cob_ica),
				SUM(cue.val_def),SUM(cue.cos_tot),SUM(cue.ven_net),cab.cod_suc,cue.cod_cco,cliente,cue.cod_cl1,cue.cod_cl2,cue.cod_cl3,cab.provee,SUM(cue.cos_uni),SUM(cue.prt_ext),SUM(cue.cot_ext),
				SUM(cue.des_ext), SUM(cue.cos_unai), SUM(cue.cos_toa), cue.cod_egr, SUM(cue.val_ant),cue.cod_rubro,ISNULL(cue.ind_afe,'0'),SUM(cue.ret_iva_ng),SUM(cue.mon_sum1),SUM(cue.mon_sum2),SUM(cue.mon_sum3),
				SUM(cue.mon_sum4),SUM(cue.mon_res1),SUM(cue.mon_res2),SUM(cue.mon_res3),SUM(cue.mon_res4),sum(cue.base_iva_aiu),cue.cod_ret,cue.suc_des,cue.cco_des,cue.cl1_des,
				cue.cl2_des,cue.cl3_des,cue.cod_ica, ite.cod_grupo
	FROM inv_cuedoc AS cue 
			INNER JOIN inv_cabdoc AS cab ON cab.ano_doc=cue.ano_doc AND cab.per_doc=cue.per_doc AND cab.sub_tip=cue.sub_tip AND cab.num_doc=cue.num_doc 
			INNER JOIN inv_items AS ite ON ite.cod_item = cue.item
	WHERE  cab.ano_doc=@ano_doc AND cab.per_doc=@per_doc AND cab.sub_tip=@sub_tip AND cab.num_doc=@num_doc
	GROUP BY item, ite.cod_grupo,cod_suc,cue.cod_cco,cliente,cue.cod_cl1,cue.cod_cl2,cue.cod_cl3,provee, cod_egr,cod_rubro,cue.ind_afe,cue.cod_ret,cue.suc_des,cue.cco_des,cue.cl1_des,
				cue.cl2_des,cue.cl3_des,cue.cod_ica;

	SET @conta101=1;
	SELECT @conta102=ISNULL(COUNT(1),0) 
	FROM #t_infcon;

	SET @reg1=1;

	WHILE @conta101<=@conta102
	BEGIN
		SELECT @item=item,@pre_tot=pre_tot,@mon_des=mon_des,@mon_iva=mon_iva,@mon_iva_ng=mon_iva_ng,@imp_con=imp_con,@mon_ret=mon_ret,
					@ret_iva=ret_iva,@ret_ica=ret_ica,@cob_ica=cob_ica,@val_def=val_def,@cos_tot=cos_tot,@ven_net=ven_net,@cod_suc=cod_suc,@cod_cco=cod_cco,
					@cod_cli=cliente,@cod_cl1=cod_cl1,@cod_cl2=cod_cl2,@cod_cl3=cod_cl3,@provee=provee,@cos_uni=cos_uni,@prt_ext=prt_ext,@cot_ext=cot_ext,
					@des_ext=des_ext,@cos_unai=cos_unai,@cos_toa=cos_toa,@cod_egr=cod_egr,@val_ant=val_ant,@cod_rubro=cod_rubro,@ind_afe=ind_afe,@ret_iva_ng=ret_iva_ng,
					@mon_sum1=mon_sum1,@mon_sum2=mon_sum2,@mon_sum3=mon_sum3,@mon_sum4=mon_sum4,@mon_res1=mon_res1,@mon_res2=mon_res2,@mon_res3=mon_res3,
					@mon_res4=mon_res4,@base_iva_aiu=base_iva_aiu,@cod_ret=cod_ret,@suc_des=suc_des,@cco_des=cco_des,@cl1_des=cl1_des,@cl2_des=cl2_des,@cl3_des=cl3_des,@cod_ica=cod_ica,
					@cod_gru = cod_grupo
		FROM #t_infcon
		WHERE registro=@conta101;


		-- REDONDEAMOS VALORES A CONTABILIZAR SEGUN PARAMETRO DEL MAESTRO
		SELECT @pre_tot=ROUND(@pre_tot,@num_dec);
		SELECT @mon_des=ROUND(@mon_des,@num_dec);
		SELECT @mon_iva=ROUND(@mon_iva,@num_dec);
		SELECT @mon_iva_ng=ROUND(@mon_iva_ng,@num_dec);
		SELECT @imp_con=ROUND(@imp_con,@num_dec);
		SELECT @mon_ret=ROUND(@mon_ret,@num_dec);
		SELECT @ret_iva=ROUND(@ret_iva,@num_dec);
		SELECT @ret_ica=ROUND(@ret_ica,@num_dec);
		SELECT @cob_ica=ROUND(@cob_ica,@num_dec);
		SELECT @val_def=ROUND(@val_def,@num_dec);
		SELECT @cos_tot=ROUND(@cos_tot,@num_dec);
		SELECT @ven_net=ROUND(@ven_net,@num_dec);
		SELECT @cos_uni=ROUND(@cos_uni,@num_dec);
		SELECT @ret_iva_ng=ROUND(@ret_iva_ng,@num_dec);
		SELECT @mon_sum1=ROUND(@mon_sum1,@num_dec);
		SELECT @mon_sum2=ROUND(@mon_sum2,@num_dec);
		SELECT @mon_sum3=ROUND(@mon_sum3,@num_dec);
		SELECT @mon_sum4=ROUND(@mon_sum4,@num_dec);
		SELECT @mon_res1=ROUND(@mon_res1,@num_dec);
		SELECT @mon_res2=ROUND(@mon_res2,@num_dec);
		SELECT @mon_res3=ROUND(@mon_res3,@num_dec);
		SELECT @mon_res4=ROUND(@mon_res4,@num_dec);
		SELECT @base_iva_aiu=ROUND(@base_iva_aiu,@num_dec);
		
		SELECT @tip_doc=cod_tip FROM gen_subtipodoc WHERE cod_sub=@sub_tip;

		--	CONSULTA DE CUENTAS EN DISTRIBUCION DE GASTOS
		SELECT @niv_dist = niv_asig_dist
		FROM inv_param_cnt
		WHERE llave = '0';

		IF @niv_dist = 5
		BEGIN
			SELECT @dcta_gas = cta_gas, @dcta_ivang = cta_ivang, @dcta_costo = cta_costo, @dcta_ing = cta_ing
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
				SET @dcta_gas = 0;
				SET @dcta_ivang = 0;
				SET @dcta_costo = 0;
				SET @dcta_ing = 0;
			END;
		END;
		ELSE
		BEGIN
			IF @niv_dist = 4
			BEGIN
				SELECT @dcta_gas = cta_gas, @dcta_ivang = cta_ivang, @dcta_costo = cta_costo, @dcta_ing = cta_ing
				FROM inv_distctas_escosto
				WHERE tip_mon = @ind_mp
					AND cod_gru = @cod_gru
					AND cod_suc = @cod_suc
					AND cod_cco = @cod_cco
					AND cod_cl1 = @cod_cl1
					AND cod_cl2 = @cod_cl2;
		
				IF @@ROWCOUNT = 0
				BEGIN
					SET @dcta_gas = 0;
					SET @dcta_ivang = 0;
					SET @dcta_costo = 0;
					SET @dcta_ing = 0;
				END;
			END;
			ELSE
			BEGIN
				IF @niv_dist = 3
				BEGIN
					SELECT @dcta_gas = cta_gas, @dcta_ivang = cta_ivang, @dcta_costo = cta_costo, @dcta_ing = cta_ing
					FROM inv_distctas_escosto
					WHERE tip_mon = @ind_mp
						AND cod_gru = @cod_gru
						AND cod_suc = @cod_suc
						AND cod_cco = @cod_cco
						AND cod_cl1 = @cod_cl1;
		
					IF @@ROWCOUNT = 0
					BEGIN
						SET @dcta_gas = 0;
						SET @dcta_ivang = 0;
						SET @dcta_costo = 0;
						SET @dcta_ing = 0;
					END;
				END;
				ELSE
				BEGIN
					IF @niv_dist = 2
					BEGIN
						SELECT @dcta_gas = cta_gas, @dcta_ivang = cta_ivang, @dcta_costo = cta_costo, @dcta_ing = cta_ing
						FROM inv_distctas_escosto
						WHERE tip_mon = @ind_mp
							AND cod_gru = @cod_gru
							AND cod_suc = @cod_suc
							AND cod_cco = @cod_cco;
		
						IF @@ROWCOUNT = 0
						BEGIN
							SET @dcta_gas = 0;
							SET @dcta_ivang = 0;
							SET @dcta_costo = 0;
							SET @dcta_ing = 0;
						END;
					END;
					ELSE
					BEGIN
						IF @niv_dist = 1
						BEGIN
							SELECT @dcta_gas = cta_gas, @dcta_ivang = cta_ivang, @dcta_costo = cta_costo, @dcta_ing = cta_ing
							FROM inv_distctas_escosto
							WHERE tip_mon = @ind_mp
								AND cod_gru = @cod_gru
								AND cod_suc = @cod_suc;
		
							IF @@ROWCOUNT = 0
							BEGIN
								SET @dcta_gas = 0;
								SET @dcta_ivang = 0;
								SET @dcta_costo = 0;
								SET @dcta_ing = 0;
							END;
						END;
						ELSE
						BEGIN
							SET @dcta_gas = 0;
							SET @dcta_ivang = 0;
							SET @dcta_costo = 0;
							SET @dcta_ing = 0;
						END;
					END;
				END;
			END;
		END;

		--VENTAS
		IF @tip='VEN'
		BEGIN
			IF @pre_tot<>0
			BEGIN
				SELECT @ptv_otr=cod_cta 
				FROM ptv_egresos 
				WHERE cod_egr='00';

				SELECT @ptv_caj=cta_caj,@ind_cta_ret=cta_ret_ven, @ind_tes = ind_tes, @wind_cxc=ind_cxc,@autoretene=autoretene,@ant_cxc=ant_cxc,@afe_con=afe_con
							,@ind_cnt_costo_vta=ind_cnt_costo_vta,@ind_cta_ica=ind_cta_ica 
				FROM inv_param_cnt 
				WHERE llave='0';

				SELECT @ind_mp=ind_mp, @fec_tas=fec_tas, @tasa=tasa, @obs_orc=LEFT(obs_orc,70), @tasa_doc=tasa, @ind_tas=ind_tas, @cod_caja = cod_caja  
				FROM inv_cabdoc  
				WHERE  ano_doc=@ano_doc 
					AND per_doc=@per_doc 
					AND sub_tip=@sub_tip 
					AND num_doc=@num_doc;

				IF @ind_tes=1
				BEGIN
					SELECT @cod_ban=cod_ban FROM gen_cajas WHERE cod_caj=@cod_caja
					SELECT @ptv_caj=ctactb FROM tes_bancos WHERE bancos=@cod_ban
				END

				IF @wind_cxc=1
				BEGIN
					SELECT @cta_cxc=cod_cta, @nit_cli=nit_cli
					FROM cxc_cliente 
					WHERE cod_cli=@cod_cli;

					SELECT @ind_cli=ind_ter FROM cxc_param WHERE cod_par='0';

					IF @ind_cli=2
					BEGIN
						SET @cod_ter = @nit_cli;
					END
					ELSE
					BEGIN
						SET @cod_ter = @cod_cli
					END;
				END;
				ELSE
				BEGIN
					SELECT @cta_cxc=cue_cxc 
					FROM inv_param_cnt 
					WHERE llave='0';
				END;

				IF @ind_mp BETWEEN '01' AND '98'
				BEGIN 
					SET @pre_tot=ROUND(@prt_ext,@num_dec);
					SET @cos_tot=ROUND(@cot_ext,@num_dec);
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

					SET @val_def=CASE @autoretene WHEN 1 THEN @ven_net+@mon_iva+@mon_iva_ng+@imp_con-(@ret_iva)-(@ret_ica)+@cob_ica+@mon_sum1+@mon_sum2
																					+@mon_sum3+@mon_sum4 
																  ELSE @ven_net+@mon_iva+@mon_iva_ng+@imp_con-(@mon_ret)-(@ret_iva)-(@ret_ica)+@cob_ica+@mon_sum1+@mon_sum2
																			+@mon_sum3+@mon_sum4-@mon_res2-@mon_res3-@mon_res4 
										END;
					END;

				SELECT @ant_doc=ISNULL(@ant_doc,0);
				SELECT @ret_ven=ret_ven,@iva_ven=iva_ven,@des_ven=des_ven,@cta_ing=cta_ing,@ret_iva_c=ret_iva,@ret_ica_c=ret_ica,
							@inv_ven=inv_ven,@iva_ng=iva_ng,@imp_conv=imp_conv,@cos_ven=cos_ven,@cob_ica_c=cob_ica,@ven_netc=ven_net,
							@ret_vec=ret_vec 
				FROM inv_items 
				WHERE cod_item=@item;

				SELECT @ven_netc=ISNULL(@ven_netc,'0');

					--Precio de Venta
				--PRINT 'PRECIO'
				IF @ven_netc='0'
				BEGIN
					IF @dcta_ing <> '0'
					BEGIN
						SET @cta_ing = @dcta_ing;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_ing;

					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';

					IF @cco=1
						SELECT @cod_cco1=@cod_cco;
					ELSE
						SELECT @cod_cco1='0';

					IF @bas=1
						SELECT @bas_mov=@pre_tot-@mon_des;
					ELSE
						SELECT @bas_mov=0;

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					EXEC sp_gen_trae_tasa @cta_ing, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

					SELECT @reg2=CONVERT(CHAR(10),@reg1);
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															  des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas)
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg1,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_ing,@cod_ter1,0,@pre_tot,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					SELECT @reg1=@reg1+1;

					--Descuentos
					--PRINT 'DESCUENTO'
					IF @mon_des>0
					BEGIN
						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@des_ven;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=@pre_tot-@mon_des;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						EXEC sp_gen_trae_tasa @des_ven, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1)
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas)
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@des_ven ,@cod_ter1, @mon_des, 0,
									@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;
					END;
				END;
				ELSE
				BEGIN
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@ven_netc;

					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';

					IF @cco=1
						SELECT @cod_cco1=@cod_cco;
					ELSE
						SELECT @cod_cco1='0';

					IF @bas=1
						SELECT @bas_mov=@pre_tot-@mon_des;
					ELSE
						SELECT @bas_mov=0;

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					EXEC sp_gen_trae_tasa @ven_netc, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

					SELECT @reg2=CONVERT(CHAR(10),@reg1);
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas)
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@ven_netc ,@cod_ter1,0,@ven_net,
					@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					SELECT @reg1=@reg1+1;
				END;
				--Iva

				--PRINT 'IVA'
				IF @mon_iva<>0
				BEGIN
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@iva_ven;

					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';

					IF @cco=1
						SELECT @cod_cco1=@cod_cco;
					ELSE
						SELECT @cod_cco1='0';

					IF @bas=1
						SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					ELSE
						SELECT @bas_mov=0;

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					EXEC sp_gen_trae_tasa @iva_ven, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

					SELECT @reg2=CONVERT(CHAR(10),@reg1)
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas)
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@iva_ven ,@cod_ter1, 0, @mon_iva,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					SELECT @reg1=@reg1+1;
				END;

				--Iva NG
				--PRINT 'IVA NG'
				IF @mon_iva_ng<>0
				BEGIN
					IF @dcta_ivang <> '0'
					BEGIN
						SET @iva_ng = @dcta_ivang;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@iva_ng;

					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';

					IF @cco=1
						SELECT @cod_cco1=@cod_cco;
					ELSE
						SELECT @cod_cco1='0';

					IF @bas=1
						SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					ELSE
						SELECT @bas_mov=0;

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					EXEC sp_gen_trae_tasa @iva_ng, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

					SELECT @reg2=CONVERT(CHAR(10),@reg1)
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas)
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@iva_ng ,@cod_ter1, 0, @mon_iva_ng,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					SELECT @reg1=@reg1+1;
				END;

				--Impuesto Consumo
				--PRINT 'CONSUMO'
				IF @imp_con<>0
				BEGIN
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@imp_conv;

					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';

					IF @cco=1
						SELECT @cod_cco1=@cod_cco;
					ELSE
						SELECT @cod_cco1='0';

					IF @bas=1
						SELECT @bas_mov=@pre_tot-@mon_des;
					ELSE
						SELECT @bas_mov=0;

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					EXEC sp_gen_trae_tasa @imp_conv, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

					SELECT @reg2=CONVERT(CHAR(10),@reg1);
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas)
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@imp_conv ,@cod_ter1, 0, @imp_con,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					SELECT @reg1=@reg1+1;
				END;

				--Retencion
				IF @ind_cta_ret = 2
				BEGIN
					SELECT @ret_ven=ISNULL(cta_ret_ven,'0'),@ret_vec=ISNULL(cta_aut_ret,'0') 
					FROM gen_retencion 
					WHERE cod_ret=@cod_ret;
				END;
				
				IF @autoretene=1
				BEGIN
					--PRINT 'RETENCION'
					IF @mon_ret<>0
					BEGIN	
						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@ret_ven;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						EXEC sp_gen_trae_tasa @ret_ven, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@ret_ven ,@cod_ter1, 0, @mon_ret, 
									@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

						SELECT @reg1=@reg1+1;

						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@ret_vec;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						EXEC sp_gen_trae_tasa @ret_vec, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@ret_vec ,@cod_ter1, @mon_ret, 0,
									@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;
					END;
				END;
				ELSE
				BEGIN
					IF @mon_ret<>0
					BEGIN
						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@ret_ven;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						EXEC sp_gen_trae_tasa @ret_ven, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																	des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@ret_ven ,@cod_ter1,  @mon_ret, 0,
									@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;
					END;
				END;

				--Retencion de Iva
				--PRINT 'RETEIVA'
				IF @ret_iva<>0
				BEGIN
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@ret_iva_c;

					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';

					IF @cco=1
						SELECT @cod_cco1=@cod_cco;
					ELSE
						SELECT @cod_cco1='0';

					IF @bas=1
						SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					ELSE
						SELECT @bas_mov=0;

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					EXEC sp_gen_trae_tasa @ret_iva_c, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

					SELECT @reg2=CONVERT(CHAR(10),@reg1);
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@ret_iva_c ,@cod_ter1, @ret_iva, 0,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					SELECT @reg1=@reg1+1;
				END;

				--Retencion de Ica
				--PRINT 'RETEICA'
				IF @ret_ica<>0
				BEGIN
					IF @ind_cta_ica = 2 
					BEGIN
						SELECT @ret_ica_c = cod_cta_ven
						FROM gen_actividad
						WHERE cod_act=@cod_ica AND cod_pai=@pai_doc AND cod_dep=@dep_doc AND cod_ciu=@ciu_doc;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@ret_ica_c;

					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';

					IF @cco=1
						SELECT @cod_cco1=@cod_cco;
					ELSE
						SELECT @cod_cco1='0';

					IF @bas=1
						SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					ELSE
						SELECT @bas_mov=0;

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					EXEC sp_gen_trae_tasa @ret_ica_c, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

					SELECT @reg2=CONVERT(CHAR(10),@reg1);
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@ret_ica_c ,@cod_ter1, @ret_ica, 0,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					SELECT @reg1=@reg1+1;
				END;

				--Ica Cobrado
				--PRINT 'ICA'
				IF @ret_ica<>0
				BEGIN
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cob_ica_c;

					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';

					IF @cco=1
						SELECT @cod_cco1=@cod_cco;
					ELSE
						SELECT @cod_cco1='0';

					IF @bas=1
						SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					ELSE
						SELECT @bas_mov=0;

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					EXEC sp_gen_trae_tasa @cob_ica_c, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

					SELECT @reg2=CONVERT(CHAR(10),@reg1);
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cob_ica_c ,@cod_ter1, 0, @cob_ica,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					SELECT @reg1=@reg1+1;
				END;

				--IMPUESTO SUMA 1
				SELECT @apl_imp=apl_ven_sum1 FROM gen_imp_adic WHERE llave='0';

				IF @apl_imp=1
					SELECT @cta_sum1=cta_imp_sum1 FROM inv_items WHERE cod_item=@item;
				ELSE
					SELECT @cta_sum1=cta_imp_sum1 FROM cxc_cliente WHERE cod_cli=@cod_cli;

				IF @mon_sum1<>0
				BEGIN
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_sum1;

					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';

					IF @cco=1
						SELECT @cod_cco1=@cod_cco;
					ELSE
						SELECT @cod_cco1='0';

					IF @bas=1
						SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					ELSE
						SELECT @bas_mov=0;

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';
					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';
					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					EXEC sp_gen_trae_tasa @cta_sum1, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

					SELECT @reg2=CONVERT(CHAR(10),@reg1);
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_sum1 ,@cod_ter1, 0, @mon_sum1, 
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					SELECT @reg1=@reg1+1;
				END;

				--IMPUESTO SUMA 2
				SELECT @apl_imp=apl_ven_sum2 FROM gen_imp_adic WHERE llave='0';

				IF @apl_imp=1
					SELECT @cta_sum2=cta_imp_sum2 FROM inv_items WHERE cod_item=@item;
				ELSE
					SELECT @cta_sum2=cta_imp_sum2 FROM cxc_cliente WHERE cod_cli=@cod_cli;
			
				IF @mon_sum2<>0
				BEGIN
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_sum2;

					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';

					IF @cco=1
						SELECT @cod_cco1=@cod_cco;
					ELSE
						SELECT @cod_cco1='0';

					IF @bas=1
						SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					ELSE
						SELECT @bas_mov=0;

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					EXEC sp_gen_trae_tasa @cta_sum2, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

					SELECT @reg2=CONVERT(CHAR(10),@reg1);
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_sum2 ,@cod_ter1, 0, @mon_sum2,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					SELECT @reg1=@reg1+1;
				END;

				--IMPUESTO SUMA 3
				SELECT @apl_imp=apl_ven_sum3 FROM gen_imp_adic WHERE llave='0';

				IF @apl_imp=1
					SELECT @cta_sum3=cta_imp_sum3 FROM inv_items WHERE cod_item=@item;
				ELSE
					SELECT @cta_sum3=cta_imp_sum3 FROM cxc_cliente WHERE cod_cli=@cod_cli;

				IF @mon_sum3<>0
				BEGIN
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_sum3;

					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';

					IF @cco=1
						SELECT @cod_cco1=@cod_cco;
					ELSE
						SELECT @cod_cco1='0';

					IF @bas=1
						SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					ELSE
						SELECT @bas_mov=0;

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					EXEC sp_gen_trae_tasa @cta_sum3, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

					SELECT @reg2=CONVERT(CHAR(10),@reg1);
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_sum3 ,@cod_ter1, 0, @mon_sum3,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					SELECT @reg1=@reg1+1;
				END;

				--IMPUESTO SUMA 4
				SELECT @apl_imp=apl_ven_sum4 FROM gen_imp_adic WHERE llave='0';

				IF @apl_imp=1
					SELECT @cta_sum4=cta_imp_sum4 FROM inv_items WHERE cod_item=@item;
				ELSE
					SELECT @cta_sum4=cta_imp_sum4 FROM cxc_cliente WHERE cod_cli=@cod_cli;
			
				IF @mon_sum4<>0
				BEGIN
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_sum4;

					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';

					IF @cco=1
						SELECT @cod_cco1=@cod_cco;
					ELSE
						SELECT @cod_cco1='0';

					IF @bas=1
						SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					ELSE
						SELECT @bas_mov=0;

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					EXEC sp_gen_trae_tasa @cta_sum4, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

					SELECT @reg2=CONVERT(CHAR(10),@reg1);
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_sum4 ,@cod_ter1, 0, @mon_sum4,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					SELECT @reg1=@reg1+1;
				END;

				--IMPUESTO RESTA 1
				SELECT @apl_imp=apl_ven_res1 FROM gen_imp_adic WHERE llave='0';

				IF @apl_imp=1
					SELECT @cta_res1=cta_imp_res1,@cta_aut_res1=cta_aut_res1 FROM inv_items WHERE cod_item=@item;
				ELSE
					SELECT @cta_res1=cta_imp_res1,@cta_aut_res1=cta_aut_res1 FROM cxc_cliente WHERE cod_cli=@cod_cli;

				--IF @autoretene=1
				--BEGIN
					--PRINT 'RES1'
					IF @mon_res1<>0
					BEGIN
						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_res1;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						EXEC sp_gen_trae_tasa @cta_res1, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_res1 ,@cod_ter1, 0, @mon_res1, 
									@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;

						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_aut_res1;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						EXEC sp_gen_trae_tasa @cta_aut_res1, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_aut_res1 ,@cod_ter1, @mon_res1, 0,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;
					END;
			
				--IMPUESTO RESTA 2
				SELECT @apl_imp=apl_ven_res2 FROM gen_imp_adic WHERE llave='0';

				IF @apl_imp=1
					SELECT @cta_res2=cta_imp_res2,@cta_aut_res2=cta_aut_res2 FROM inv_items WHERE cod_item=@item;
				ELSE
					SELECT @cta_res2=cta_imp_res2,@cta_aut_res2=cta_aut_res2 FROM cxc_cliente WHERE cod_cli=@cod_cli;

				IF @autoretene=1
				BEGIN
					--PRINT 'RES2'
					IF @mon_res2<>0
					BEGIN
						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_res2;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						EXEC sp_gen_trae_tasa @cta_res2, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_res2 ,@cod_ter1, 0, @mon_res2, 
									@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;

						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_aut_res2;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						EXEC sp_gen_trae_tasa @cta_aut_res2, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_aut_res2 ,@cod_ter1, @mon_res2, 0,
									@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;
					END;
				END;
				ELSE
				BEGIN
					IF @mon_res2<>0
					BEGIN
						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_res2;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						EXEC sp_gen_trae_tasa @cta_res2, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_res2 ,@cod_ter1,  @mon_res2, 0,
									@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;
					END;
				END;

				--IMPUESTO RESTA 3
				SELECT @apl_imp=apl_ven_res3 FROM gen_imp_adic WHERE llave='0';

				IF @apl_imp=1
					SELECT @cta_res3=cta_imp_res3,@cta_aut_res3=cta_aut_res3 FROM inv_items WHERE cod_item=@item;
				ELSE
					SELECT @cta_res3=cta_imp_res3,@cta_aut_res3=cta_aut_res3 FROM cxc_cliente WHERE cod_cli=@cod_cli;

				IF @autoretene=1
				BEGIN
					--PRINT 'RES3'
					IF @mon_res3<>0
					BEGIN
						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_res3;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						ELSE
							SELECT @bas_mov=0;
						
						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						EXEC sp_gen_trae_tasa @cta_res3, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_res3 ,@cod_ter1, 0, @mon_res3, 
									@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;

						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_aut_res3;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						EXEC sp_gen_trae_tasa @cta_aut_res2, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_aut_res3 ,@cod_ter1, @mon_res3, 0,
									@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;
					END;
				END;
				ELSE
				BEGIN
					IF @mon_res3<>0
					BEGIN
						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_res3;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						EXEC sp_gen_trae_tasa @cta_res3, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																	des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_res3 ,@cod_ter1,  @mon_res3, 0,
									@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;
					END;
				END;

				--IMPUESTO RESTA 4
				SELECT @apl_imp=apl_ven_res4 FROM gen_imp_adic WHERE llave='0';

				IF @apl_imp=1
					SELECT @cta_res4=cta_imp_res4,@cta_aut_res4=cta_aut_res4 FROM inv_items WHERE cod_item=@item;
				ELSE
					SELECT @cta_res4=cta_imp_res4,@cta_aut_res4=cta_aut_res4 FROM cxc_cliente WHERE cod_cli=@cod_cli;

				IF @autoretene=1
				BEGIN
					--PRINT 'RES4'
					IF @mon_res4<>0
					BEGIN
						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_res4;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						EXEC sp_gen_trae_tasa @cta_res4, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_res4 ,@cod_ter1, 0, @mon_res4, 
									@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;

						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_aut_res4;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0'

						EXEC sp_gen_trae_tasa @cta_aut_res4, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_aut_res4 ,@cod_ter1, @mon_res4, 0,
									@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;
					END;
				END;
				ELSE
				BEGIN
					IF @mon_res4<>0
					BEGIN
						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_res4;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';
						
						EXEC sp_gen_trae_tasa @cta_res4, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_res4 ,@cod_ter1,  @mon_res4, 0,
										@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;
					END;
				END;
			
				--Anticipo
				--PRINT 'ANT'
				IF @tip_doc='510'
					SELECT @ant_doc=@val_ant;

				IF @ant_doc>0 AND @tip_doc='510'
				BEGIN
					IF @tip_doc='510'
						SELECT @ant_cxc=@ptv_otr;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@ant_cxc;

					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';

					IF @cco=1
						SELECT @cod_cco1=@cod_cco;
					ELSE
						SELECT @cod_cco1='0';

					IF @bas=1
						SELECT @bas_mov=@pre_tot-@mon_des;
					ELSE
						SELECT @bas_mov=0;


					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					EXEC sp_gen_trae_tasa @ant_cxc, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

					SELECT @reg2=CONVERT(CHAR(10),@reg1);
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@ant_cxc ,@cod_ter1, @ant_doc, 0,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					SELECT @reg1=@reg1+1;
				END

				--Cuenta por Cobrar
				IF @val_def<>0
				BEGIN
					--PRINT 'CXC'
					IF @tip_doc='510'
					BEGIN
						SELECT @cta_cxc=@ptv_caj;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_cxc;

 					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';

					IF @cco=1
						SELECT @cod_cco1=@cod_cco;
					ELSE
						SELECT @cod_cco1='0';

					IF @bas=1
						SELECT @bas_mov=@pre_tot-@mon_des;
					ELSE
						SELECT @bas_mov=0;

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					EXEC sp_gen_trae_tasa @cta_cxc, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

					SELECT @reg2=CONVERT(CHAR(10),@reg1);
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_cxc ,@cod_ter1, @val_def-@ant_doc, 0,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					SELECT @reg1=@reg1+1;
				END;

				--Inventarios
				IF @ind_cnt_costo_vta=1
				BEGIN
					IF @ind_des=0
					BEGIN
						--PRINT 'INV'
						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@inv_ven;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';
						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=@pre_tot-@mon_des;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						EXEC sp_gen_trae_tasa @inv_ven, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@inv_ven ,@cod_ter1, 0, @cos_tot,
									@obs_orc,@bas_mov,'0','X','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;
						
						--Costo
						--PRINT 'COSTO'
						IF @dcta_costo <> '0'
						BEGIN
							SET @cos_ven = @dcta_costo;
						END;

						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cos_ven;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter	
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=@pre_tot-@mon_des;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						EXEC sp_gen_trae_tasa @cos_ven, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31, @cos_ven ,@cod_ter1, @cos_tot, 0,
									@obs_orc,@bas_mov,'0','X','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;
				END;
				END;
			END;

			IF @pre_tot<0
			BEGIN
				UPDATE #inv_inf_con_det SET deb_mov=0,cre_mov=ABS(deb_mov) WHERE deb_mov<0;
				UPDATE #inv_inf_con_det SET cre_mov=0,deb_mov=ABS(cre_mov) WHERE cre_mov<0;
				UPDATE #inv_inf_con_det SET bas_mov=ABS(bas_mov);
			END;

		END;

		-- COMPRAS
		IF @tip='COM'
		BEGIN
			IF @pre_tot>0
			BEGIN
				SELECT @ind_tip=ind_tip,@ind_mp=ind_mp,@fec_tas=fec_tas,@obs_orc=LEFT(obs_orc,70),@tasa_doc=tasa,@ind_tas=ind_tas
				FROM inv_cabdoc 
				WHERE ano_doc=@ano_doc 
					AND per_doc=@per_doc 
					AND sub_tip=@sub_tip 
					AND num_doc=@num_doc;
			
				IF @ind_mp BETWEEN '01' AND '98'
				BEGIN 
					SET @pre_tot=ROUND(@prt_ext,@num_dec);
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


					SET @val_def=CASE @ind_tip WHEN '3' THEN @ven_net+@mon_iva+@mon_iva_ng+@imp_con-(@mon_ret)-(@ret_ica)+@mon_sum1+@mon_sum2
																				+@mon_sum3+@mon_sum4-(@mon_res1)-(@mon_res2)-(@mon_res3)-(@mon_res4)
																		ELSE @ven_net+@mon_iva+@mon_iva_ng+@imp_con-(@mon_ret)-(@ret_ica)-(@ret_iva)+@mon_sum1+@mon_sum2
																				+@mon_sum3+@mon_sum4-(@mon_res1)-(@mon_res2)-(@mon_res3)-(@mon_res4)
					END;
				END;
			
				SET @ant_doc=ISNULL(@ant_doc,0);
			
				SELECT @nit_pro=nce,@tip_pro=tip_pro
				FROM cxp_provee 
				WHERE provee=@provee;
			
				SET @cod_ter=@nit_pro;

				SELECT @wind_cxp=ind_cxp,@ind_cta_ret=cta_ret_com,@ind_cta_cxp=ind_cta_cxp,@ind_cta_ica=ind_cta_ica,@ind_cnt_des=ind_cnt_des 
				FROM inv_param_cnt 
				WHERE llave='0';

				IF @ind_cta_cxp = 1
				BEGIN
					IF @wind_cxp=1
					BEGIN
						SELECT @cta_cxp=cod_cta 
						FROM cxp_provee 
						WHERE provee=@provee;

						SELECT @ind_pro=ind_ter 
						FROM cxp_param 
						WHERE cod_par='0';

						SELECT @ant_cxp=fa_ant 
						FROM cxp_param_cnt 
						WHERE llave='0';
			
						IF @ind_pro=1
						BEGIN
							SET @cod_ter=@provee;
						END;
	
					END;
					ELSE
					BEGIN
						SELECT @cta_cxp=cue_cxp, @ant_cxp=ant_cxp 
						FROM inv_param_cnt 
						WHERE llave='0';
					END;
				END;
				ELSE
					SELECT @cta_cxp= cta_cxp_c 
					FROM inv_items 
					WHERE cod_item=@item;

				SELECT @ret_ven=ret_com,@iva_ven=iva_com,@des_ven=des_com,@cta_egr=cta_egr,
						@ret_iva_c=CASE @tip_pro WHEN 3 THEN riv_com_sim ELSE riv_com END,	--ASIGNAMOS LA CUENTA DEL RETEIVA SEGUN EL TIPO DE PROVEEDOR
						@riv_com_ng=riv_com_ng,
						@ret_ica_c=ica_com,@inv_ven=inv_com,@iva_ng=iva_ng,@imp_conv=imp_con,@cos_ven=cos_com,@iva_pag=iva_pag,@cod_rubegr=cod_rubro_egr
				FROM inv_items 
				WHERE cod_item=@item;

				IF EXISTS(SELECT pedido FROM inv_cuedoc WHERE ano_doc=@ano_doc AND per_doc=@per_doc AND sub_tip=@sub_tip AND num_doc=@num_doc AND pedido <> '0')
				BEGIN
					SELECT @cta_egr= cta_pte 
					FROM inv_items 
					WHERE cod_item=@item;
				END;

				--Precio de Venta
				--PRINT 'PRECIO'
				IF @dcta_gas <> '0'
				BEGIN
					SET @cta_egr = @dcta_gas;
				END;

				SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
				FROM cnt_puc 
				WHERE cod_cta=@cta_egr;

				IF @ter IN (2,3)
				BEGIN
					SET @cod_ter1=@cod_ter;
				END;
				ELSE
				BEGIN
					SET @cod_ter1='0';
				END;

				IF @cco=1
				BEGIN
					SET @cod_cco1=@cod_cco;
				END;
				ELSE
				BEGIN
					SET @cod_cco1='0';
				END;

				SET @bas_cnt = @pre_tot-@mon_des;

				IF @bas=1
				BEGIN
					SET @bas_mov=@bas_cnt;
				END;
				ELSE
				BEGIN
					SET @bas_mov=0;
				END;

				IF @cl1=1
				BEGIN
					SET @cod_cl11=@cod_cl1;
				END;
				ELSE
				BEGIN
					SET @cod_cl11='0';
				END;

				IF @cl2=1
				BEGIN
					SET @cod_cl21=@cod_cl2;
				END;
				ELSE
				BEGIN
					SET @cod_cl21='0';
				END;

				IF @cl3=1
				BEGIN
					SET @cod_cl31=@cod_cl3;
				END;
				ELSE
				BEGIN
					SET @cod_cl31='0';
				END;

				EXEC sp_gen_trae_tasa @cta_egr, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				IF @ind_cnt_des = 1
				BEGIN
					SET @val_cnt=@pre_tot;
				END;
				ELSE
				BEGIN
					SET @val_cnt=@ven_net;
				END;

				IF @Ind_afe='0' -- NO HAY DISTRIBUCIÓN DEL GASTO
				BEGIN
					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_egr ,@cod_ter1, @val_cnt, 0,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa,0,@ind_tas);

					SET @reg1=@reg1+1;
				END;
				ELSE
				BEGIN
					-- DISTRIBUCIÓN DEL GASTO
					DELETE FROM #t_afecon_p;
					
					INSERT INTO #t_afecon_p(Cod_cta,Cod_suc,Cod_cco,Cod_cl1,Cod_cl2,Cod_cl3,valor,base)
					SELECT Cod_cta, Cod_suc, Cod_cco, Cod_cl1, Cod_cl2, Cod_cl3, ROUND((Porcentaje/100)*@val_cnt,@num_dec) AS valor, ROUND((Porcentaje/100)*@bas_cnt,@num_dec) AS base
					FROM Cxp_distriafe 
					WHERE Cod_afe= @Ind_afe;

					SELECT @gas_dist=ISNULL(SUM(valor),0), @bas_dist= ISNULL(SUM(base),0)
					FROM #t_afecon_p;
								
					IF @gas_dist>0 AND @ven_net<>@gas_dist
					BEGIN
						SELECT TOP 1 @conta7=recno 
						FROM #t_afecon_p 
						ORDER BY valor DESC;
				
						UPDATE #t_afecon_p SET valor=valor+(@ven_net-@gas_dist), base=base+(@bas_cnt-@bas_dist) 
						WHERE recno=@conta7;
					END;

					SELECT @conta9=ISNULL(COUNT(1),0) 
					FROM #t_afecon_p;

					SELECT @conta8=MIN(recno) 
					FROM #t_afecon_p;

					SELECT @conta9=MAX(recno) 
					FROM #t_afecon_p;

					WHILE @conta8<=@conta9
					BEGIN

						SELECT @Wven=Cod_cta, @aCod_suc=Cod_suc, @aCod_cco=Cod_cco, @aCod_cl1=Cod_cl1, 
									@aCod_cl2=cod_cl2, @aCod_cl3=cod_cl3, @aNet_doc=valor, @aBas_Doc=base
						FROM #t_afecon_p
						WHERE recno=@conta8;

						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
						FROM cnt_puc 
						WHERE cod_cta=@Wven;

						IF @ter IN (2,3)
						BEGIN
							SET @cod_ter1=@cod_ter;
						END;
						ELSE
						BEGIN
							SET @cod_ter1='0';
						END;

						IF @cco=1
						BEGIN
							SET @cod_cco1=@acod_cco;
						END;
						ELSE
						BEGIN
							SET @cod_cco1='0';
						END;

						IF @bas=1
						BEGIN
							SET @bas_mov=@aBas_Doc;
						END;
						ELSE
						BEGIN
							SET @bas_mov=0;
						END;

						IF @cl1=1
						BEGIN
							SET @cod_cl11=@acod_cl1;
						END;
						ELSE
						BEGIN
							SET @cod_cl11='0';
						END;

						IF @cl2=1
						BEGIN
							SET @cod_cl21=@acod_cl2;
						END;
						ELSE
						BEGIN
							SET @cod_cl21='0';
						END;

						IF @cl3=1
						BEGIN
							SET @cod_cl31=@acod_cl3;
						END;
						ELSE
						BEGIN
							SET @cod_cl31='0';
						END;

						EXEC sp_gen_trae_tasa @wven, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						SET @reg2=CONVERT(CHAR(10),@reg1);

						INSERT INTO #inv_inf_con_det (ano_doc, per_doc, sub_tip,tip_doc, num_doc, reg_doc, fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, deb_mov, cre_mov, 
																	des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, fec_tas, tasa, ind_mod, ind_tas)
						VALUES (@ano_doc, @per_doc, @sub_tip,@tip_doc, @num_doc,@reg2, @fecha, @wven, @acod_suc, @cod_cco1, @cod_cl11, @cod_cl21, @cod_cl31, @cod_ter1, @aNet_doc, 0,
									LEFT(RTRIM(@obs_orc),60), @bas_mov, '', '', '', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

						SET @reg1=@reg1+1;

						SET @conta8=@conta8+1;
					END;
				END;

				--Descuentos
				--PRINT 'DESCUENTO'
				IF @mon_des>0 AND @ind_cnt_des = 1
				BEGIN
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@des_ven;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=@pre_tot-@mon_des;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @des_ven, @fec_tas, @tasa OUTPUT, @ind_mp

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@des_ven ,@cod_ter1, 0, @mon_des, 
					@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					
					SET @reg1=@reg1+1;

				END;

				--Iva
				--PRINT 'IVA'
				IF @mon_iva>0
				BEGIN
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@iva_ven;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @iva_ven, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,
															fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,
															deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,
															fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,
								@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@iva_ven ,@cod_ter1, 
								@mon_iva, 0,@obs_orc,@bas_mov,'0','','', @ind_mp, 
								@fec_tas, @tasa, 0, @ind_tas);

					SET @reg1=@reg1+1;
				END;

				--Iva NG
				--PRINT 'IVA NG'
				IF @mon_iva_ng>0
				BEGIN
					IF @dcta_ivang <> '0'
					BEGIN
						SET @iva_ng = @dcta_ivang;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@iva_ng;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					SET @bas_cnt = CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;

					IF @bas=1
					BEGIN
						SET @bas_mov= @bas_cnt;
					END
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @iva_ng, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					IF @Ind_afe='0' -- NO HAY DISTRIBUCIÓN DEL GASTO
					BEGIN
						SET @reg2=CONVERT(CHAR(10),@reg1);

						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,
																	cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																	des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas)
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,
									@cod_cl11,@cod_cl21,@cod_cl31,@iva_ng ,@cod_ter1, @mon_iva_ng, 0,
									@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

						SET @reg1=@reg1+1;
					END;
					ELSE
					BEGIN
						
						-- DISTRIBUCIÓN DEL GASTO/IVA NO GRAVADO
						DELETE FROM #t_afecon_ng;
					
						INSERT INTO #t_afecon_ng(Cod_cta,Cod_suc,Cod_cco,Cod_cl1,Cod_cl2,Cod_cl3,valor,base)
						SELECT cta_ivang, Cod_suc, Cod_cco, Cod_cl1, Cod_cl2, Cod_cl3, ROUND((Porcentaje/100)*@mon_iva_ng,@num_dec) AS valor, ROUND((Porcentaje/100)*@bas_cnt,@num_dec) AS base
						FROM Cxp_distriafe 
						WHERE Cod_afe= @Ind_afe;

						SELECT @gas_dist=ISNULL(SUM(valor),0), @bas_dist=ISNULL(SUM(base),0) 
						FROM #t_afecon_ng;
									
						IF @gas_dist>0 AND @mon_iva_ng<>@gas_dist
						BEGIN
							SELECT TOP 1 @conta7=recno 
							FROM #t_afecon_ng 
							ORDER BY valor DESC;
					
							UPDATE #t_afecon_ng SET valor=valor+(@mon_iva_ng-@gas_dist), base=(@bas_cnt-@bas_dist) 
							WHERE recno=@conta7;
						END;

						SELECT @conta9=ISNULL(COUNT(1),0) 
						FROM #t_afecon_ng;

						SELECT @conta8=MIN(recno) 
						FROM #t_afecon_ng;

						SELECT @conta9=MAX(recno) 
						FROM #t_afecon_ng;

						WHILE @conta8<=@conta9
						BEGIN

							SELECT @Wven=Cod_cta, @aCod_suc=Cod_suc, @aCod_cco=Cod_cco, @aCod_cl1=Cod_cl1, 
										@aCod_cl2=cod_cl2, @aCod_cl3=cod_cl3, @aNet_doc=valor, @aBas_Doc=base
							FROM #t_afecon_ng
							WHERE recno=@conta8;

							SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
							FROM cnt_puc 
							WHERE cod_cta=@Wven;

							IF @ter IN (2,3)
							BEGIN
								SET @cod_ter1=@cod_ter;
							END;
							ELSE
							BEGIN
								SET @cod_ter1='0';
							END;

							IF @cco=1
							BEGIN
								SET @cod_cco1=@acod_cco;
							END;
							ELSE
							BEGIN
								SET @cod_cco1='0';
							END;

							IF @bas=1
							BEGIN
								SET @bas_mov=@pre_tot-@mon_des;
							END;
							ELSE
							BEGIN
								SET @bas_mov=0;
							END;

							IF @cl1=1
							BEGIN
								SET @cod_cl11=@acod_cl1;
							END;
							ELSE
							BEGIN
								SET @cod_cl11='0';
							END;

							IF @cl2=1
							BEGIN
								SET @cod_cl21=@acod_cl2;
							END;
							ELSE
							BEGIN
								SET @cod_cl21='0';
							END;

							IF @cl3=1
							BEGIN
								SET @cod_cl31=@acod_cl3;
							END;
							ELSE
							BEGIN
								SET @cod_cl31='0';
							END;

							EXEC sp_gen_trae_tasa @wven, @fec_tas, @tasa OUTPUT, @ind_mp;

							IF @ind_tas='S'
							BEGIN
								SET @tasa=@tasa_doc;
							END;

							SET @reg2=CONVERT(CHAR(10),@reg1);

							INSERT INTO #inv_inf_con_det (ano_doc, per_doc, sub_tip,tip_doc, num_doc, reg_doc, 
																	fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
																	deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
																	fec_tas, tasa, ind_tas,ind_mod)
							VALUES (@ano_doc, @per_doc, @sub_tip,@tip_doc, @num_doc,@reg2, 
									@fecha, @wven, @acod_suc, @cod_cco1, @cod_cl11, @cod_cl21, @cod_cl31, 
									@cod_ter1, @aNet_doc, 0,LEFT(RTRIM(@obs_orc),60), @aBas_Doc, '', '', '', @ind_mp, @fec_tas, 
									@tasa, @ind_tas,0);

							SET @reg1=@reg1+1;

							SET @conta8=@conta8+1;
						END;
					END;
				END;

				--Impuesto Consumo
				--PRINT 'CONSUMO'
				IF @imp_con>0
				BEGIN
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@imp_conv;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=@pre_tot-@mon_des;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @imp_conv, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@imp_conv ,@cod_ter1, @imp_con, 0,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

					SET @reg1=@reg1+1;
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

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@ret_ven;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @ret_ven, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@ret_ven ,@cod_ter1, 0, @mon_ret,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

					SET @reg1=@reg1+1;
				END;

				--Retencion de Iva
				--PRINT 'RETEIVA'
				IF @ret_iva>0
				BEGIN
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@ret_iva_c;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						IF @ind_tip = 3
						BEGIN
							SET @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						END;
						ELSE
						BEGIN
							SET @bas_mov=ISNULL(@mon_iva,0)+ISNULL(@mon_iva_ng,0);
						END;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @ret_iva_c, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@ret_iva_c ,@cod_ter1, 0, @ret_iva, 
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					
					SET @reg1=@reg1+1;

					IF @ind_tip=3
					BEGIN
						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
						FROM cnt_puc 
						WHERE cod_cta=@iva_pag;

						IF @ter IN (2,3)
						BEGIN
							SET @cod_ter1=@cod_ter;
						END;
						ELSE
						BEGIN
							SET @cod_ter1='0';
						END;

						IF @cco=1
						BEGIN
							SET @cod_cco1=@cod_cco;
						END;
						ELSE
						BEGIN
							SET @cod_cco1='0';
						END;

						IF @bas=1
						BEGIN
							SET @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						END;
						ELSE
						BEGIN
							SET @bas_mov=0;
						END;

						IF @cl1=1
						BEGIN
							SET @cod_cl11=@cod_cl1;
						END;
						ELSE
						BEGIN
							SET @cod_cl11='0';
						END;

						IF @cl2=1
						BEGIN
							SET @cod_cl21=@cod_cl2;
						END;
						ELSE
						BEGIN
							SET @cod_cl21='0';
						END;

						IF @cl3=1
						BEGIN
							SET @cod_cl31=@cod_cl3;
						END;
						ELSE
						BEGIN
							SET @cod_cl31='0';
						END;

						EXEC sp_gen_trae_tasa @iva_pag, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						SET @reg2=CONVERT(CHAR(10),@reg1);

						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@iva_pag ,@cod_ter1,  @ret_iva,  0,
									@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

						SET @reg1=@reg1+1;
					END;
				END;

				IF @ret_iva_ng>0 AND @ind_tip=3
				BEGIN
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@ret_iva_c;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @ret_iva_c, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,
															cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,
								@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31, @ret_iva_c ,@cod_ter1, 0, @ret_iva_ng, 
								@obs_orc,CASE WHEN @ret_iva>0 THEN 0 ELSE @bas_mov END,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

					SET @reg1=@reg1+1;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@riv_com_ng;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=@pre_tot-@mon_des;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @iva_pag, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,
															cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,
								@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31, @riv_com_ng, @cod_ter1,  @ret_iva_ng,  0,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

					SET @reg1=@reg1+1;
				END;

				--Retencion de Ica
				--PRINT 'RETEICA'
				IF @ret_ica>0
				BEGIN
					IF @ind_cta_ica = 2
					BEGIN
						SELECT @ret_ica_c = cod_cta_com
						FROM gen_actividad
						WHERE cod_act=@cod_ica 
							AND cod_pai=@pai_doc 
							AND cod_dep=@dep_doc 
							AND cod_ciu=@ciu_doc;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@ret_ica_c;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @ret_ica_c, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@ret_ica_c ,@cod_ter1, 0, @ret_ica, 
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					
					SET @reg1=@reg1+1;
				END;

				--SUMA 1
				--PRINT 'SUMA1'
				IF @mon_sum1>0
				BEGIN
					SELECT @apl_imp=apl_com_sum1 
					FROM gen_imp_adic 
					WHERE llave='0';

					IF @apl_imp=1
					BEGIN
						SELECT @cta_sum1=cta_imp_sum1 
						FROM inv_items 
						WHERE cod_item=@item;
					END;
					ELSE
					BEGIN
						SELECT @cta_sum1=cta_imp_sum1 
						FROM cxp_provee 
						WHERE provee=@provee;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@cta_sum1;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @cta_sum1, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_sum1 ,@cod_ter1, @mon_sum1, 0,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

					SET @reg1=@reg1+1;
				END;

				--SUMA 2
				--PRINT 'SUMA2'
				IF @mon_sum2>0
				BEGIN
					SELECT @apl_imp=apl_com_sum2 
					FROM gen_imp_adic 
					WHERE llave='0';

					IF @apl_imp=1
					BEGIN
						SELECT @cta_sum2=cta_imp_sum2 
						FROM inv_items 
						WHERE cod_item=@item;
					END;
					ELSE
					BEGIN
						SELECT @cta_sum2=cta_imp_sum2 
						FROM cxp_provee 
						WHERE provee=@provee;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@cta_sum2;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;
					
					EXEC sp_gen_trae_tasa @cta_sum2, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_sum2 ,@cod_ter1, @mon_sum2, 0,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					
					SET @reg1=@reg1+1;
				END;

				--SUMA 3
				--PRINT 'SUMA3'
				IF @mon_sum3>0
				BEGIN
					SELECT @apl_imp=apl_com_sum3 
					FROM gen_imp_adic 
					WHERE llave='0';

					IF @apl_imp=1
					BEGIN
						SELECT @cta_sum3=cta_imp_sum3 
						FROM inv_items 
						WHERE cod_item=@item;
					END;
					ELSE
					BEGIN
						SELECT @cta_sum3=cta_imp_sum3 
						FROM cxp_provee 
						WHERE provee=@provee;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@cta_sum3;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @cta_sum3, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_sum3 ,@cod_ter1, @mon_sum3, 0,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

					SET @reg1=@reg1+1;
				END;

				--SUMA 4
				--PRINT 'SUMA4'
				IF @mon_sum4>0
				BEGIN
					SELECT @apl_imp=apl_com_sum4 
					FROM gen_imp_adic 
					WHERE llave='0';

					IF @apl_imp=1
					BEGIN
						SELECT @cta_sum4=cta_imp_sum4 
						FROM inv_items 
						WHERE cod_item=@item;
					END;
					ELSE
					BEGIN
						SELECT @cta_sum4=cta_imp_sum4 
						FROM cxp_provee 
						WHERE provee=@provee;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@cta_sum4;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @cta_sum4, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_sum4 ,@cod_ter1, @mon_sum4, 0,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					
					SET @reg1=@reg1+1;
				END;

				--RESTA 1
				--PRINT 'RESTA1'
				IF @mon_res1>0
				BEGIN
					SELECT @apl_imp=apl_com_res1 
					FROM gen_imp_adic 
					WHERE llave='0';

					IF @apl_imp=1
					BEGIN
						SELECT @cta_res1=cta_imp_res1 
						FROM inv_items 
						WHERE cod_item=@item;
					END;
					ELSE
					BEGIN
						SELECT @cta_res1=cta_imp_res1 
						FROM cxp_provee 
						WHERE provee=@provee;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@cta_res1;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @cta_res1, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_res1 ,@cod_ter1, 0, @mon_res1, 
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

					SET @reg1=@reg1+1;
				END;

				--RESTA 2
				--PRINT 'RESTA2'
				IF @mon_res2>0
				BEGIN
					SELECT @apl_imp=apl_com_res2 
					FROM gen_imp_adic 
					WHERE llave='0';

					IF @apl_imp=1
					BEGIN
						SELECT @cta_res2=cta_imp_res2 
						FROM inv_items 
						WHERE cod_item=@item;
					END;
					ELSE
					BEGIN
						SELECT @cta_res2=cta_imp_res2 
						FROM cxp_provee 
						WHERE provee=@provee;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@cta_res2;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @cta_res2, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_res2 ,@cod_ter1, 0, @mon_res2,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					
					SET @reg1=@reg1+1;
				END;

				--RESTA 3
				--PRINT 'RESTA3'
				IF @mon_res3>0
				BEGIN
					SELECT @apl_imp=apl_com_res3 
					FROM gen_imp_adic 
					WHERE llave='0';

					IF @apl_imp=1
					BEGIN
						SELECT @cta_res3=cta_imp_res3 
						FROM inv_items 
						WHERE cod_item=@item;
					END;
					ELSE
					BEGIN
						SELECT @cta_res3=cta_imp_res3 
						FROM cxp_provee 
						WHERE provee=@provee;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@cta_res3;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @cta_res3, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);
					
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_res3 ,@cod_ter1, 0, @mon_res3,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					
					SET @reg1=@reg1+1;
				END;

				--RESTA 4
				--PRINT 'RESTA4'
				IF @mon_res4>0
				BEGIN
					SELECT @apl_imp=apl_com_res4 
					FROM gen_imp_adic 
					WHERE llave='0';

					IF @apl_imp=1
					BEGIN
						SELECT @cta_res4=cta_imp_res4 
						FROM inv_items 
						WHERE cod_item=@item;
					END;
					ELSE
					BEGIN
						SELECT @cta_res4=cta_imp_res4 
						FROM cxp_provee 
						WHERE provee=@provee;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@cta_res4;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @cta_res4, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_res4 ,@cod_ter1,  0, @mon_res4,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

					SET @reg1=@reg1+1;
				END;

				--Cuenta por Pagar
				IF @val_def-@ant_doc>0
				BEGIN
					--PRINT  'CXP'
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@cta_cxp;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=@pre_tot-@mon_des;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @cta_cxp, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);
					
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,
															cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,
								@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_cxp ,@cod_ter1, 0, @val_def-@ant_doc, 
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					
					SET @reg1=@reg1+1;
				END;
			END;
		END;

		IF @tip IN('ENT','TRA')
		BEGIN
			IF @cos_tot>0
			BEGIN
				SELECT @cod_suc=cod_suc, @ind_mp=ind_mp, @fec_tas=fec_tas, @obs_orc=LEFT(obs_orc,70), @tasa_doc=tasa, @ind_tas=ind_tas,@cod_ter=ISNULL(cod_ter,'0'),
				@cod_cli=cliente
				FROM inv_cabdoc 
				WHERE ano_doc=@ano_doc AND per_doc=@per_doc AND sub_tip=@sub_tip AND num_doc=@num_doc;

				IF @provee <> '0' AND @provee IS NOT NULL
				BEGIN
					SELECT @cod_ter= nce FROM cxp_provee  WHERE provee=@provee;
				END;
				
				IF @cod_cli <> '0' AND @cod_cli IS NOT NULL	
				BEGIN
					SELECT @cod_ter= nit_cli FROM cxc_cliente  WHERE cod_cli=@cod_cli;
				END;

				IF @ind_mp BETWEEN '01' AND '98'
				BEGIN 
					SELECT @pre_tot=ROUND(@prt_ext,@num_dec);
					SELECT @cos_tot=ROUND(@cot_ext,@num_dec);
					SELECT @mon_des=ROUND(@des_ext,@num_dec);
					SELECT @val_def=ROUND(@prt_ext-@des_ext,@num_dec);
					SELECT @ven_net=ROUND(@prt_ext-@des_ext,@num_dec);
				END;
			
				SELECT @inv_ven=inv_com, @cos_ven= CASE @tip_doc WHEN '008' THEN cta_pte ELSE cos_com END
				FROM inv_items 
				WHERE cod_item=@item;

				--Inventarios
				--PRINT 'INV'
				SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@inv_ven;

				IF @ter IN (2,3)
					SELECT @cod_ter1=@cod_ter;
				ELSE
					SELECT @cod_ter1='0';

				IF @tip = 'TRA'
				BEGIN
					SET @suc_cnt = @suc_des;
					SET @cod_cco1 = @cco_des;
					SET @cl1_cnt = @cl1_des;
					SET @cl2_cnt = @cl2_des;
					SET @cl3_cnt = @cl3_des;
				END;
				ELSE
				BEGIN
					SET @suc_cnt = @cod_suc;
					SET @cod_cco1=@cod_cco;
					SET @cl1_cnt =@cod_cl1;
					SET @cl2_cnt =@cod_cl2;
					SET @cl3_cnt =@cod_cl3;
				END;
				
				IF @cco<>1
					SET @cod_cco1='0';
				IF @cl1<>1
					SET @cl1_cnt='0';
				IF @cl2<>1
					SET @cl2_cnt='0';
				IF @cl3<>1
					SET @cl3_cnt='0';
			
				IF @bas=1
					SELECT @bas_mov=@pre_tot-@mon_des;
				ELSE
					SELECT @bas_mov=0;

				EXEC sp_gen_trae_tasa @inv_ven, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
					SELECT @tasa=@tasa_doc;

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

				SELECT @reg2=CONVERT(CHAR(10),@reg1);
				INSERT INTO #inv_inf_con_det (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
														des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas)
				VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@suc_cnt,@cod_cco1,
							@cl1_cnt,@cl2_cnt,@cl3_cnt,@inv_ven,@cod_ter1, @cos_tot, 0, @obs_inv,@bas_mov,'0','X','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

				SELECT @reg1=@reg1+1;

				IF @tip<>'TRA'
				BEGIN
					--Costo
					--PRINT 'COSTO'
					IF @dcta_costo <> '0' AND @tip_doc <> '008'
					BEGIN
						SET @cos_ven = @dcta_costo;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cos_ven;

					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';
				
					SET @cod_cco1=@cod_cco;
					SET @cl1_cnt =@cod_cl1;
					SET @cl2_cnt =@cod_cl2;
					SET @cl3_cnt =@cod_cl3;

					IF @cco<>1
						SET @cod_cco1='0';

					IF @cl1<>1
						SET @cl1_cnt='0'	;

					IF @cl2<>1
						SET @cl2_cnt='0';

					IF @cl3<>1
							SET @cl3_cnt='0';

					IF @bas=1
						SELECT @bas_mov=@pre_tot-@mon_des;
					ELSE
						SELECT @bas_mov=0;

					EXEC sp_gen_trae_tasa @cos_ven, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

					SELECT @reg2=CONVERT(CHAR(10),@reg1)
					INSERT INTO #inv_inf_con_det (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas)
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,
								@cl1_cnt,@cl2_cnt,@cl3_cnt,@cos_ven ,@cod_ter1, 0, @cos_tot, @obs_cto,@bas_mov,'0','X','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

					SELECT @reg1=@reg1+1;
				END;
			END;
		END;

		IF @tip IN('SAL','TRA')
		BEGIN
			IF @cos_tot>0
			BEGIN
				SELECT @ind_mp=ind_mp, @fec_tas=fec_tas, @obs_orc=obs_orc, @tasa_doc=tasa, @ind_tas=ind_tas, @cod_con=cod_con, @cod_ter = cod_ter
				FROM inv_cabdoc 
				WHERE ano_doc=@ano_doc AND per_doc=@per_doc AND sub_tip=@sub_tip AND num_doc=@num_doc;
			
				IF @tip_doc ='006'
					SELECT @cod_ter= nit_cli FROM cxc_cliente WHERE cod_cli = @cod_cli;
				
				--- CAMBIO PARA TOMAR TERCERO EL NIT D PROVEEDOR(DEVOLUCIÓN DESPACHO) RAMIRO 29/08/2012	
				IF @tip_doc ='002'
					SELECT @cod_ter= nce FROM cxp_provee WHERE provee = @provee;

				SET @cod_ter = ISNULL(@cod_ter,'0');
						
				IF @ind_mp BETWEEN '01' AND '98'
				BEGIN 
					SELECT @pre_tot=ROUND(@prt_ext,@num_dec);
					SELECT @cos_tot=ROUND(@cot_ext,@num_dec);
					SELECT @mon_des=ROUND(@des_ext,@num_dec);
					SELECT @val_def=ROUND(@prt_ext-@des_ext,@num_dec);
					SELECT @ven_net=ROUND(@prt_ext-@des_ext,@num_dec);
				END
			
				SELECT @inv_ven=inv_ven,@cos_ven=cos_ven FROM inv_items WHERE cod_item=@item;

				IF @tip_doc = '002'
					SELECT @inv_ven=inv_com,@cos_ven= cta_pte 
					FROM inv_items 
					WHERE cod_item=@item;

				IF @cod_con <> '0'
				BEGIN
					SELECT @cod_cta = cod_cta FROM inv_conceptos WHERE cod_con = @cod_con;
					IF EXISTS(SELECT cod_cta FROM cnt_puc WHERE cod_cta=@cod_cta AND cod_cta <> '0')
						SET @cos_ven = @cod_cta;
				END;

				--Inventarios
				--PRINT 'INV'
				SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@inv_ven;

				IF @ter IN (2,3)
					SELECT @cod_ter1=@cod_ter;
				ELSE
					SELECT @cod_ter1='0';

				SET @cod_cco1=@cod_cco;
				SET @cl1_cnt =@cod_cl1;
				SET @cl2_cnt =@cod_cl2;
				SET @cl3_cnt =@cod_cl3;

				IF @cco<>1
					SET @cod_cco1='0';

				IF @cl1<>1
					SET @cl1_cnt='0'	;

				IF @cl2<>1
					SET @cl2_cnt='0';

				IF @cl3<>1
					SET @cl3_cnt='0';

				IF @bas=1
					SELECT @bas_mov=@pre_tot-@mon_des;
				ELSE
					SELECT @bas_mov=0;

				EXEC sp_gen_trae_tasa @inv_ven, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
					SELECT @tasa=@tasa_doc;

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

				SELECT @reg2=CONVERT(CHAR(10),@reg1);
				INSERT INTO #inv_inf_con_det (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas)
				VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,
							@cl1_cnt,@cl2_cnt,@cl3_cnt,@inv_ven ,@cod_ter1, 0, @cos_tot, @obs_inv,@bas_mov,'0','X','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
				SELECT @reg1=@reg1+1;

				IF @tip <> 'TRA'
				BEGIN 
					--Costo
					--PRINT 'COSTO'

					IF @cod_con <> '0'
				
					BEGIN
						SELECT @cos_ven = cod_cta FROM inv_conceptos WHERE cod_con = @cod_con;

						IF EXISTS(SELECT cod_cta FROM cnt_puc WHERE cod_cta=@cos_ven AND cod_cta <> '0')
							SET @cos_ven = @cos_ven;
					END;
					ELSE
					BEGIN
						SELECT @cos_ven=cos_ven FROM inv_items WHERE cod_item=@item;

						IF @dcta_costo <> '0'
						BEGIN
							SET @cos_ven = @dcta_costo;
						END;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cos_ven;

					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';

					IF @cco=1
						SELECT @cod_cco1=@cod_cco;
					ELSE
						SELECT @cod_cco1='0';

					IF @bas=1
						SELECT @bas_mov=@pre_tot-@mon_des;
					ELSE
						SELECT @bas_mov=0;

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					EXEC sp_gen_trae_tasa @cos_ven, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det (ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																	des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas)
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,
									@cos_ven ,@cod_ter1, @cos_tot, 0, @obs_cto,@bas_mov,'0','X','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;
					END;
			END;
		END;
		--VENTAS
		IF @tip='DVV'
		BEGIN
			IF @pre_tot>0
			BEGIN
				SELECT @ind_mp=ind_mp, @fec_tas=fec_tas, @obs_orc=LEFT(obs_orc,70), @tasa_doc=tasa, @ind_tas=ind_tas
				FROM inv_cabdoc 
				WHERE ano_doc=@ano_doc AND per_doc=@per_doc AND sub_tip=@sub_tip AND num_doc=@num_doc;

				SELECT @wind_cxc=ind_cxc,@autoretene=autoretene,@ind_cnt_costo_vta=ind_cnt_costo_vta,@ind_cta_ret=cta_ret_ven,@ind_cta_ica=ind_cta_ica 
				FROM inv_param_cnt 
				WHERE llave='0';

				IF @ind_mp BETWEEN '01' AND '98'
				BEGIN 
					SET @pre_tot=ROUND(@prt_ext,@num_dec);
					SET @cos_tot=ROUND(@cot_ext,@num_dec);
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

					SET @val_def=CASE @autoretene WHEN 1 THEN @ven_net+@mon_iva+@mon_iva_ng+@imp_con-(@ret_iva)-(@ret_ica)+@cob_ica+@mon_sum1+@mon_sum2
																					+@mon_sum3+@mon_sum4
																	ELSE @ven_net+@mon_iva+@mon_iva_ng+@imp_con-(@mon_ret)-(@ret_iva)-(@ret_ica)+@cob_ica+@mon_sum1
																			+@mon_sum2+@mon_sum3+@mon_sum4-(@mon_res2)-(@mon_res3)-(@mon_res4)
										END;
				END;

				IF @wind_cxc=1
				BEGIN
					SELECT @cta_cxc=cod_cta, @nit_cli=nit_cli 
					FROM cxc_cliente 
					WHERE cod_cli=@cod_cli;

					SELECT @ind_cli=ind_ter
					FROM cxc_param 
					WHERE cod_par='0';

					IF @ind_cli=2
					BEGIN
						SET @cod_ter=@nit_cli;
					END
					ELSE
					BEGIN
						SET @cod_ter = @cod_cli
					END;
				END;
				ELSE
					SELECT @cta_cxc=cue_cxc
					FROM inv_param_cnt 
					WHERE llave='0';
					
				SELECT @ret_ven=ret_ven,@iva_ven=iva_dvv,@des_ven=des_ven,@cta_ing=cta_ingd,@ret_iva_c=ret_iva,@ret_ica_c=ret_ica,
						@inv_ven=inv_ven,@iva_ng=iva_ng,@imp_conv=imp_conv,@cos_ven=cos_ven,@cob_ica_c=cob_ica,@ven_netc=ven_net,@ret_vec=ret_vec 
				FROM inv_items 
				WHERE cod_item=@item;

				SELECT @ven_netc=ISNULL(@ven_netc,'0');

					--Precio de Venta
				--PRINT 'PRECIO'
				IF @dcta_ing <> '0'
				BEGIN
					SET @cta_ing = @dcta_ing;
				END;
				SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_ing;

				IF @ter IN (2,3)
					SELECT @cod_ter1=@cod_ter;
				ELSE
					SELECT @cod_ter1='0';

				IF @cco=1
					SELECT @cod_cco1=@cod_cco;
				ELSE
					SELECT @cod_cco1='0';

				IF @bas=1
					SELECT @bas_mov=@pre_tot-@mon_des;
				ELSE
					SELECT @bas_mov=0;

				IF @cl1=1
					SELECT @cod_cl11=@cod_cl1;
				ELSE
					SELECT @cod_cl11='0';

				IF @cl2=1
					SELECT @cod_cl21=@cod_cl2;
				ELSE
					SELECT @cod_cl21='0';

				IF @cl3=1
					SELECT @cod_cl31=@cod_cl3;
				ELSE
					SELECT @cod_cl31='0';

				EXEC sp_gen_trae_tasa @cta_ing, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
					SELECT @tasa=@tasa_doc;

				SELECT @reg2=CONVERT(CHAR(10),@reg1);
				INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
														des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
				VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_ing,@cod_ter1,@pre_tot,0,@obs_orc,
							@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
				SELECT @reg1=@reg1+1;

				--Descuentos
				--PRINT 'DESCUENTO'
				IF @mon_des>0
				BEGIN
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@des_ven;

					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';

					IF @cco=1
						SELECT @cod_cco1=@cod_cco;
					ELSE
						SELECT @cod_cco1='0';

					IF @bas=1
						SELECT @bas_mov=@pre_tot-@mon_des;
					ELSE
						SELECT @bas_mov=0;

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					EXEC sp_gen_trae_tasa @des_ven, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

					SELECT @reg2=CONVERT(CHAR(10),@reg1);
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@des_ven ,@cod_ter1, 0,@mon_des, 
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					SELECT @reg1=@reg1+1;
				END;
				
				--Iva
				--PRINT 'IVA'
				IF @mon_iva>0
				BEGIN
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@iva_ven;

					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';

					IF @cco=1
						SELECT @cod_cco1=@cod_cco;
					ELSE
						SELECT @cod_cco1='0';

					IF @bas=1
						SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					ELSE
						SELECT @bas_mov=0;

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					EXEC sp_gen_trae_tasa @iva_ven, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc

					SELECT @reg2=CONVERT(CHAR(10),@reg1);
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@iva_ven ,@cod_ter1, @mon_iva, 0,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					SELECT @reg1=@reg1+1;
				END;

				--Iva NG
				--PRINT 'IVA NG'
				IF @mon_iva_ng>0
				BEGIN
					IF @dcta_ivang <> '0' 
					BEGIN
						SET @iva_ng = @dcta_ivang;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@iva_ng;

					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';

					IF @cco=1
						SELECT @cod_cco1=@cod_cco;
					ELSE
						SELECT @cod_cco1='0';

					IF @bas=1
						SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					ELSE
						SELECT @bas_mov=0;

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					EXEC sp_gen_trae_tasa @iva_ng, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

					SELECT @reg2=CONVERT(CHAR(10),@reg1);
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@iva_ng ,@cod_ter1, @mon_iva_ng, 0,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					SELECT @reg1=@reg1+1;
				END;

				--Impuesto Consumo
				--PRINT 'CONSUMO'
				IF @imp_con>0
				BEGIN
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@imp_conv;

					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';

					IF @cco=1
						SELECT @cod_cco1=@cod_cco;
					ELSE
						SELECT @cod_cco1='0';

					IF @bas=1
						SELECT @bas_mov=@pre_tot-@mon_des;
					ELSE
						SELECT @bas_mov=0;

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					EXEC sp_gen_trae_tasa @imp_conv, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

					SELECT @reg2=CONVERT(CHAR(10),@reg1);
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@imp_conv ,@cod_ter1, @imp_con, 0, 
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					SELECT @reg1=@reg1+1;
				END;

				--Retencion
				--PRINT 'RETENCION'
				IF @ind_cta_ret = 2
				BEGIN
					SELECT @ret_ven=cta_ret_ven,@ret_vec=cta_aut_ret FROM gen_retencion WHERE cod_ret=@cod_ret;
				END;

				IF @autoretene=1
				BEGIN
					IF @mon_ret>0
					BEGIN
						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@ret_vec;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';
						EXEC sp_gen_trae_tasa @ret_vec, @fec_tas, @tasa OUTPUT, @ind_mp

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas)
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@ret_vec ,@cod_ter1, 0, @mon_ret, 
									@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;
						
						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@ret_ven;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						EXEC sp_gen_trae_tasa @ret_ven, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,
																fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,
																deb_mov,cre_mov,des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,
																fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,
									@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@ret_ven ,@cod_ter1, 
									@mon_ret, 0, @obs_orc,@bas_mov,'0','','', @ind_mp,
									@fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;
					END;
				END;
				ELSE
				BEGIN
					IF @mon_ret>0
					BEGIN
						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@ret_ven;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						EXEC sp_gen_trae_tasa @ret_ven, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@ret_ven ,@cod_ter1, 0, @mon_ret, 
									@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

						SELECT @reg1=@reg1+1;
					END;
				END;

				--Retencion de Iva
				--PRINT 'RETEIVA'
				IF @ret_iva>0
				BEGIN
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@ret_iva_c;

					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';

					IF @cco=1
						SELECT @cod_cco1=@cod_cco;
					ELSE
						SELECT @cod_cco1='0';

					IF @bas=1
						SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					ELSE
						SELECT @bas_mov=0;

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					EXEC sp_gen_trae_tasa @ret_iva_c, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

					SELECT @reg2=CONVERT(CHAR(10),@reg1);
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@ret_iva_c ,@cod_ter1, 0, @ret_iva, 
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					SELECT @reg1=@reg1+1;
				END;

				--Retencion de Ica
				--PRINT  'RETEICA'
				IF @ret_ica>0
				BEGIN
					IF @ind_cta_ica = 2
					BEGIN
						SELECT @ret_ica_c=cod_cta_ven
						FROM gen_actividad
						WHERE cod_act=@cod_ica AND cod_pai=@pai_doc AND cod_dep=@dep_doc AND cod_ciu=@ciu_doc;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@ret_ica_c;

					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';

					IF @cco=1
						SELECT @cod_cco1=@cod_cco;
					ELSE
						SELECT @cod_cco1='0';

					IF @bas=1
						SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					ELSE
						SELECT @bas_mov=0;

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					EXEC sp_gen_trae_tasa @ret_ica_c, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

					SELECT @reg2=CONVERT(CHAR(10),@reg1);
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@ret_ica_c ,@cod_ter1, 0, @ret_ica, 
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					SELECT @reg1=@reg1+1;
				END;

				--Ica Cobrado
				--PRINT 'ICA'
				IF @ret_ica>0
				BEGIN
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cob_ica_c;

					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';

					IF @cco=1
						SELECT @cod_cco1=@cod_cco;
					ELSE
						SELECT @cod_cco1='0';

					IF @bas=1
						SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					ELSE
						SELECT @bas_mov=0;

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					EXEC sp_gen_trae_tasa @cob_ica_c, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

					SELECT @reg2=CONVERT(CHAR(10),@reg1);
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cob_ica_c ,@cod_ter1, @cob_ica, 0,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					SELECT @reg1=@reg1+1;
				END;

				--IMPUESTO SUMA 1
				SELECT @apl_imp=apl_ven_sum1 FROM gen_imp_adic WHERE llave='0';

				IF @apl_imp=1
					SELECT @cta_sum1=cta_imp_sum1 FROM inv_items WHERE cod_item=@item;
				ELSE
					SELECT @cta_sum1=cta_imp_sum1 FROM cxc_cliente WHERE cod_cli=@cod_cli;

				IF @mon_sum1<>0
				BEGIN
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_sum1;

					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';

					IF @cco=1
						SELECT @cod_cco1=@cod_cco;
					ELSE
						SELECT @cod_cco1='0';

					IF @bas=1
						SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					ELSE
						SELECT @bas_mov=0;

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					EXEC sp_gen_trae_tasa @cta_sum1, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

					SELECT @reg2=CONVERT(CHAR(10),@reg1);
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_sum1 ,@cod_ter1, @mon_sum1, 0,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					SELECT @reg1=@reg1+1;
				END;

				--IMPUESTO SUMA 2
				SELECT @apl_imp=apl_ven_sum2 FROM gen_imp_adic WHERE llave='0';

				IF @apl_imp=1
					SELECT @cta_sum2=cta_imp_sum2 FROM inv_items WHERE cod_item=@item;
				ELSE
					SELECT @cta_sum2=cta_imp_sum2 FROM cxc_cliente WHERE cod_cli=@cod_cli;

				IF @mon_sum2<>0
				BEGIN
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_sum2;

					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';

					IF @cco=1
						SELECT @cod_cco1=@cod_cco;
					ELSE
						SELECT @cod_cco1='0';

					IF @bas=1
						SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					ELSE
						SELECT @bas_mov=0;

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					EXEC sp_gen_trae_tasa @cta_sum2, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

					SELECT @reg2=CONVERT(CHAR(10),@reg1);
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_sum2 ,@cod_ter1, @mon_sum2, 0,
							@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					SELECT @reg1=@reg1+1;
				END;

				--IMPUESTO SUMA 3
				SELECT @apl_imp=apl_ven_sum3 FROM gen_imp_adic WHERE llave='0';

				IF @apl_imp=1
					SELECT @cta_sum3=cta_imp_sum3 FROM inv_items WHERE cod_item=@item;
				ELSE
					SELECT @cta_sum3=cta_imp_sum3 FROM cxc_cliente WHERE cod_cli=@cod_cli;

				IF @mon_sum3<>0
				BEGIN
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_sum3;

					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';

					IF @cco=1
						SELECT @cod_cco1=@cod_cco;
					ELSE
						SELECT @cod_cco1='0';

					IF @bas=1
						SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					ELSE
						SELECT @bas_mov=0;

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					EXEC sp_gen_trae_tasa @cta_sum3, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

					SELECT @reg2=CONVERT(CHAR(10),@reg1);
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_sum3 ,@cod_ter1, @mon_sum3, 0,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					SELECT @reg1=@reg1+1;
				END;

				--IMPUESTO SUMA 4
				SELECT @apl_imp=apl_ven_sum4 FROM gen_imp_adic WHERE llave='0';

				IF @apl_imp=1
					SELECT @cta_sum4=cta_imp_sum4 FROM inv_items WHERE cod_item=@item;
				ELSE
					SELECT @cta_sum4=cta_imp_sum4 FROM cxc_cliente WHERE cod_cli=@cod_cli;

				IF @mon_sum4<>0
				BEGIN
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_sum4;

					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';

					IF @cco=1
						SELECT @cod_cco1=@cod_cco;
					ELSE
						SELECT @cod_cco1='0';

					IF @bas=1
						SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					ELSE
						SELECT @bas_mov=0;

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					EXEC sp_gen_trae_tasa @cta_sum4, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

					SELECT @reg2=CONVERT(CHAR(10),@reg1);
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_sum4 ,@cod_ter1, @mon_sum4, 0,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					SELECT @reg1=@reg1+1;
				END;

				--IMPUESTO RESTA 1
				SELECT @apl_imp=apl_ven_res1 FROM gen_imp_adic WHERE llave='0';

				IF @apl_imp=1
					SELECT @cta_res1=cta_imp_res1,@cta_aut_res1=cta_aut_res1 FROM inv_items WHERE cod_item=@item;
				ELSE
					SELECT @cta_res1=cta_imp_res1,@cta_aut_res1=cta_aut_res1 FROM cxc_cliente WHERE cod_cli=@cod_cli;

				--IF @autoretene=1
				--BEGIN
					--PRINT 'RES1'
					IF @mon_res1<>0
					BEGIN
						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_res1;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						EXEC sp_gen_trae_tasa @cta_res1, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_res1 ,@cod_ter1, @mon_res1, 0,
									@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;

						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_aut_res1;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						EXEC sp_gen_trae_tasa @cta_aut_res1, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_aut_res1 ,@cod_ter1, 0, @mon_res1,
								@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas)
						SELECT @reg1=@reg1+1;
					END;

				--IMPUESTO RESTA 2
				SELECT @apl_imp=apl_ven_res2 FROM gen_imp_adic WHERE llave='0';

				IF @apl_imp=1
					SELECT @cta_res2=cta_imp_res2,@cta_aut_res2=cta_aut_res2 FROM inv_items WHERE cod_item=@item;
				ELSE
					SELECT @cta_res2=cta_imp_res2,@cta_aut_res2=cta_aut_res2 FROM cxc_cliente WHERE cod_cli=@cod_cli;

				IF @autoretene=1
				BEGIN
					--PRINT 'RES2'
					IF @mon_res2<>0
					BEGIN
						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_res2;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						EXEC sp_gen_trae_tasa @cta_res2, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_res2 ,@cod_ter1, @mon_res2, 0,
									@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;

						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_aut_res2;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';
						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';
						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						EXEC sp_gen_trae_tasa @cta_aut_res2, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_aut_res2 ,@cod_ter1, 0, @mon_res2,
									@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;
					END;
				END;
				ELSE
				BEGIN
					IF @mon_res2<>0
					BEGIN
						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_res2;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						EXEC sp_gen_trae_tasa @cta_res2, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_res2 ,@cod_ter1, 0, @mon_res2,
									@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;
					END;
				END;

				--IMPUESTO RESTA 3
				SELECT @apl_imp=apl_ven_res3 FROM gen_imp_adic WHERE llave='0';

				IF @apl_imp=1
					SELECT @cta_res3=cta_imp_res3,@cta_aut_res3=cta_aut_res3 FROM inv_items WHERE cod_item=@item;
				ELSE
					SELECT @cta_res3=cta_imp_res3,@cta_aut_res3=cta_aut_res3 FROM cxc_cliente WHERE cod_cli=@cod_cli;

				IF @autoretene=1
				BEGIN
					--PRINT 'RES3'
					IF @mon_res3<>0
					BEGIN
						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_res3;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						EXEC sp_gen_trae_tasa @cta_res3, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																	des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_res3 ,@cod_ter1, @mon_res3, 0,
									@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;

						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_aut_res3;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						EXEC sp_gen_trae_tasa @cta_aut_res2, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																	des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_aut_res3 ,@cod_ter1, 0, @mon_res3,
									@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;
					END;
				END;
				ELSE
				BEGIN
					IF @mon_res3<>0
					BEGIN
						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_res3;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						EXEC sp_gen_trae_tasa @cta_res3, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																	des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_res3 ,@cod_ter1, 0, @mon_res3,
									@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;
					END;
				END;

				--IMPUESTO RESTA 4
				SELECT @apl_imp=apl_ven_res4 FROM gen_imp_adic WHERE llave='0';

				IF @apl_imp=1
					SELECT @cta_res4=cta_imp_res4,@cta_aut_res4=cta_aut_res4 FROM inv_items WHERE cod_item=@item;
				ELSE
					SELECT @cta_res4=cta_imp_res4,@cta_aut_res4=cta_aut_res4 FROM cxc_cliente WHERE cod_cli=@cod_cli;

				IF @autoretene=1
				BEGIN
					--PRINT 'RES4'
					IF @mon_res4<>0
					BEGIN
						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_res4;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						EXEC sp_gen_trae_tasa @cta_res4, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																	des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_res4 ,@cod_ter1, @mon_res4, 0,
									@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;

						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_aut_res4;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						EXEC sp_gen_trae_tasa @cta_aut_res4, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																	des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_aut_res4 ,@cod_ter1, 0, @mon_res4,
									@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;
					END;
				END;
				ELSE
				BEGIN
					IF @mon_res4<>0
					BEGIN
						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_res4;

						IF @ter IN (2,3)
							SELECT @cod_ter1=@cod_ter;
						ELSE
							SELECT @cod_ter1='0';

						IF @cco=1
							SELECT @cod_cco1=@cod_cco;
						ELSE
							SELECT @cod_cco1='0';

						IF @bas=1
							SELECT @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						ELSE
							SELECT @bas_mov=0;

						IF @cl1=1
							SELECT @cod_cl11=@cod_cl1;
						ELSE
							SELECT @cod_cl11='0';

						IF @cl2=1
							SELECT @cod_cl21=@cod_cl2;
						ELSE
							SELECT @cod_cl21='0';

						IF @cl3=1
							SELECT @cod_cl31=@cod_cl3;
						ELSE
							SELECT @cod_cl31='0';

						EXEC sp_gen_trae_tasa @cta_res4, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
							SELECT @tasa=@tasa_doc;

						SELECT @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																	des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_res4 ,@cod_ter1, 0, @mon_res4,
									@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						SELECT @reg1=@reg1+1;
					END;
				END;

				--Cuenta por Cobrar
				--PRINT 'CXC'
				SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_cxc;

				IF @ter IN (2,3)
					SELECT @cod_ter1=@cod_ter;
				ELSE
					SELECT @cod_ter1='0';

				IF @cco=1
					SELECT @cod_cco1=@cod_cco;
				ELSE
					SELECT @cod_cco1='0';

				IF @bas=1
					SELECT @bas_mov=@pre_tot-@mon_des;
				ELSE
					SELECT @bas_mov=0;

				IF @cl1=1
					SELECT @cod_cl11=@cod_cl1;
				ELSE
					SELECT @cod_cl11='0';

				IF @cl2=1
					SELECT @cod_cl21=@cod_cl2;
				ELSE
					SELECT @cod_cl21='0';

				IF @cl3=1
					SELECT @cod_cl31=@cod_cl3;
				ELSE
					SELECT @cod_cl31='0';

				EXEC sp_gen_trae_tasa @cta_cxc, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
					SELECT @tasa=@tasa_doc;

				SELECT @reg2=CONVERT(CHAR(10),@reg1);
				INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
														des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
				VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_cxc ,@cod_ter1, 0, @val_def, 
							@obs_orc,@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
				SELECT @reg1=@reg1+1;
			
				--Inventarios
				IF @ind_cnt_costo_vta=1
				BEGIN
					--PRINT 'INV'
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@inv_ven;

					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';

					IF @cco=1
						SELECT @cod_cco1=@cod_cco;
					ELSE
						SELECT @cod_cco1='0';

					IF @bas=1
						SELECT @bas_mov=@pre_tot-@mon_des;
					ELSE
						SELECT @bas_mov=0;

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					EXEC sp_gen_trae_tasa @inv_ven, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

					SELECT @reg2=CONVERT(CHAR(10),@reg1);
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas)
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@inv_ven ,@cod_ter1, @cos_tot, 0, 
								@obs_orc,@bas_mov,'0','X','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					SELECT @reg1=@reg1+1;
					
					--Costo
					--PRINT 'COSTO'
					IF @dcta_costo <> '0'
					BEGIN
						SET @cos_ven = @dcta_costo;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cos_ven;

					IF @ter IN (2,3)
						SELECT @cod_ter1=@cod_ter;
					ELSE
						SELECT @cod_ter1='0';

					IF @cco=1
						SELECT @cod_cco1=@cod_cco;
					ELSE
						SELECT @cod_cco1='0';

					IF @bas=1
						SELECT @bas_mov=@pre_tot-@mon_des;
					ELSE
						SELECT @bas_mov=0;

					IF @cl1=1
						SELECT @cod_cl11=@cod_cl1;
					ELSE
						SELECT @cod_cl11='0';

					IF @cl2=1
						SELECT @cod_cl21=@cod_cl2;
					ELSE
						SELECT @cod_cl21='0';

					IF @cl3=1
						SELECT @cod_cl31=@cod_cl3;
					ELSE
						SELECT @cod_cl31='0';

					EXEC sp_gen_trae_tasa @cos_ven, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
						SELECT @tasa=@tasa_doc;

					SELECT @reg2=CONVERT(CHAR(10),@reg1);
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cos_ven ,@cod_ter1, 0,  @cos_tot,
								@obs_orc,@bas_mov,'0','X','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					SELECT @reg1=@reg1+1;
				END;
			END;
		END;

		-- DEVOLUCION COMPRAS
		IF @tip='DVC'
		BEGIN
			IF @pre_tot>0
			BEGIN
				SELECT @ind_tip=ind_tip, @ind_mp=ind_mp, @fec_tas=fec_tas, @obs_orc=LEFT(obs_orc,70), @tasa_doc=tasa, @ind_tas=ind_tas
				FROM inv_cabdoc 
				WHERE ano_doc=@ano_doc 
					AND per_doc=@per_doc 
					AND sub_tip=@sub_tip 
					AND num_doc=@num_doc;

				IF @ind_mp BETWEEN '01' AND '98'
				BEGIN 
					SET @pre_tot=ROUND(@prt_ext,@num_dec);
					SET @cos_tot=ROUND(@cot_ext,@num_dec);
					SET @mon_des=ROUND(@des_ext,@num_dec);
					SET @ven_net=ROUND(@prt_ext-@des_ext,@num_dec);
					SET @mon_iva=ROUND((@mon_iva/@tasa_doc),@num_dec);
					SET @mon_iva_ng=ROUND((@mon_iva_ng/@tasa_doc),@num_dec);
					SET @imp_con=ROUND((@imp_con/@tasa_doc),@num_dec);
					SET @mon_ret=ROUND((@mon_ret/@tasa_doc),@num_dec);
					SET @ret_iva=ROUND((@ret_iva/@tasa_doc),@num_dec);
					SET @ret_iva_ng=ROUND((@ret_iva_ng/@tasa_doc),@num_dec);
					SET @ret_ica=ROUND((@ret_ica/@tasa_doc),@num_dec);
					SET @mon_sum1=ROUND((@mon_sum1/@tasa_doc),@num_dec);
					SET @mon_sum2=ROUND((@mon_sum2/@tasa_doc),@num_dec);
					SET @mon_sum3=ROUND((@mon_sum3/@tasa_doc),@num_dec);
					SET @mon_sum4=ROUND((@mon_sum4/@tasa_doc),@num_dec);
					SET @mon_res1=ROUND((@mon_res1/@tasa_doc),@num_dec);
					SET @mon_res2=ROUND((@mon_res2/@tasa_doc),@num_dec);
					SET @mon_res3=ROUND((@mon_res3/@tasa_doc),@num_dec);
					SET @mon_res4=ROUND((@mon_res4/@tasa_doc),@num_dec);

					SET @val_def=CASE @ind_tip WHEN '3' THEN @ven_net+@mon_iva+@mon_iva_ng+@imp_con-(@mon_ret)-(@ret_ica)+@mon_sum1+@mon_sum2
																				+@mon_sum3+@mon_sum4-(@mon_res1)-(@mon_res2)-(@mon_res3)-(@mon_res4)
																		ELSE @ven_net+@mon_iva+@mon_iva_ng+@imp_con-(@mon_ret)-(@ret_ica)-(@ret_iva)+@mon_sum1+@mon_sum2
																				+@mon_sum3+@mon_sum4-(@mon_res1)-(@mon_res2)-(@mon_res3)-(@mon_res4)
					END;
				END;

				-- BUSCAMOS SI EN LAS DEVOLUCIONES SE ESTAN AFECTANDO ANTICIPOS
				SELECT @ano_ant=ano_ant, @per_ant=per_ant, @sub_ant=sub_ant, @num_ant=num_ant
				FROM inv_cabdoc
				WHERE ano_doc=@ano_doc 
					AND per_doc=@per_doc 
					AND sub_tip=@sub_tip 
					AND num_doc=@num_doc;

				SELECT @val_ant=SUM(val_doc) 
				FROM cxp_cuedoc 
				WHERE ano_doc=@ano_ant 
					AND per_doc=@per_ant 
					AND sub_tip=@sub_ant 
					AND num_doc=@num_ant;

				SET @val_ant=ISNULL(@val_ant,0);

				SELECT @wind_cxp=ind_cxp,@ind_cta_ica=ind_cta_ica,@ind_cnt_des=ind_cnt_des,@ind_cta_cxp=ind_cta_cxp,@ind_cta_ret=cta_ret_com
				FROM inv_param_cnt 
				WHERE llave='0';
			
				SELECT @nit_pro=nce,@tip_pro=tip_pro
				FROM cxp_provee 
				WHERE provee=@provee;

				SELECT @cod_ter=@nit_pro;
				
				IF @ind_cta_cxp = 1
				BEGIN
					IF @wind_cxp=1
					BEGIN
						SELECT @cta_cxp=cod_cta 
						FROM cxp_provee 
						WHERE provee=@provee;
			
						SELECT @ind_pro=ind_ter 
						FROM cxp_param 
						WHERE cod_par='0';
			
						IF @ind_pro=1
						BEGIN
							SET @cod_ter=@provee;
						END;
					END
					ELSE
					BEGIN
						SELECT @cta_cxp=cue_cxp 
						FROM inv_param_cnt 
						WHERE llave='0';
					END;
				END
				ELSE
				BEGIN
					SELECT @cta_cxp=cta_cxp_c 
					FROM inv_items 
					WHERE cod_item=@item;
				END;

				SELECT @ret_ven=ret_com,@iva_ven=iva_dvc,@des_ven=des_com,@cta_egr=cta_egrd,
							@ret_iva_c=CASE @tip_pro WHEN 3 THEN riv_com_sim ELSE riv_com END,	--ASIGNAMOS LA CUENTA DEL RETEIVA SEGUN EL TIPO DE PROVEEDOR
							@ret_ica_c=ica_com,
							@inv_ven=inv_com,@iva_ng=iva_ng,@imp_conv=imp_con,@cos_ven=cos_com,@iva_pag=iva_pag ,@cod_rubegr=cod_rubro_egr,@riv_com_ng=riv_com_ng
				FROM inv_items 
				WHERE cod_item=@item;

				--	SI EL CODIGO DEL RUBRO DEL REGISTRO DE COMPRA TIENE UN VALOR SE TRAE LA CUENTA DEL RUBRO Y NO DEL ITEM
				--	PARA HACER EL ASIENTO CONTABLE Y LA PARTIDA PRESUPUESTAL
				--	JCESARS	OCTUBRE/2011
				IF @cod_rubro<>'0' AND @cod_rubro IS NOT NULL
				BEGIN
					SELECT @cta_egr=cod_cue 
					FROM pre_rubro 
					WHERE cod_rub=@cod_rubro;
				END;
				ELSE
				BEGIN
					IF @cod_rubegr<>'0' AND @cod_rubegr IS NOT NULL
					BEGIN
						SELECT @cta_egr=cod_cue 
						FROM pre_rubro 
						WHERE cod_rub=@cod_rubegr;
					END;
				END;

					--Precio de Venta
				--PRINT 'PRECIO'
				IF @dcta_gas <>'0' 
				BEGIN
					SET @cta_egr = @dcta_gas;
				END;

				SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
				FROM cnt_puc 
				WHERE cod_cta=@cta_egr;

				IF @ter IN (2,3)
				BEGIN
					SET @cod_ter1=@cod_ter;
				END;
				ELSE
				BEGIN
					SET @cod_ter1='0';
				END;

				IF @cco=1
				BEGIN
					SET @cod_cco1=@cod_cco;
				END;
				ELSE
				BEGIN
					SET @cod_cco1='0';
				END;

				SET @bas_cnt = @pre_tot-@mon_des;

				IF @bas=1
				BEGIN
					SET @bas_mov=@bas_cnt;
				END;
				ELSE
				BEGIN
					SET @bas_mov=0;
				END;

				IF @cl1=1
				BEGIN
					SET @cod_cl11=@cod_cl1;
				END;
				ELSE
				BEGIN
					SET @cod_cl11='0';
				END;

				IF @cl2=1
				BEGIN
					SET @cod_cl21=@cod_cl2;
				END;
				ELSE
				BEGIN
					SET @cod_cl21='0';
				END;

				IF @cl3=1
				BEGIN
					SET @cod_cl31=@cod_cl3;
				END;
				ELSE
				BEGIN
					SET @cod_cl31='0';
				END;

				EXEC sp_gen_trae_tasa @cta_egr, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;
			
				IF @ind_cnt_des = 1
				BEGIN
					SET @val_cnt=@pre_tot;
				END;
				ELSE
				BEGIN
					SET @val_cnt=@ven_net;
				END;

				IF @ind_afe='0'  ---- NO HAY DISTRIBUCIÓN GASTO ---- 
				BEGIN
					SELECT @reg2=CONVERT(CHAR(10),@reg1);
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_egr ,@cod_ter1, 0,@val_cnt, 
								'DESCRIPCION PRECIO',@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

					SET @reg1=@reg1+1;
				END;
				ELSE
				BEGIN
					DELETE FROM #t_afecon_p;
				
					INSERT INTO #t_afecon_p(Cod_cta,Cod_suc,Cod_cco,Cod_cl1,Cod_cl2,Cod_cl3,valor,base)
					SELECT Cod_cta, Cod_suc, Cod_cco, Cod_cl1, Cod_cl2, Cod_cl3, ROUND((Porcentaje/100)*@val_cnt,@num_dec) AS valor,  ROUND((Porcentaje/100)*@bas_cnt,@num_dec) AS base
					FROM Cxp_distriafe 
					WHERE Cod_afe= @Ind_afe;

					SELECT @gas_dist=ISNULL(SUM(valor),0), @bas_dist = ISNULL(SUM(base),0) 
					FROM #t_afecon_p;
								
					IF @gas_dist>0 AND @pre_tot<>@gas_dist
					BEGIN
						SELECT TOP 1 @conta7=recno 
						FROM #t_afecon_p 
						ORDER BY valor DESC;
				
						UPDATE #t_afecon_p SET valor=valor+(@pre_tot-@gas_dist), base=base+(@bas_cnt-@bas_dist) 
						WHERE recno=@conta7;
					END;

					SELECT @conta9=ISNULL(COUNT(1),0) 
					FROM #t_afecon_p;

					SELECT @conta8=MIN(recno) 
					FROM #t_afecon_p;

					SELECT @conta9=MAX(recno) 
					FROM #t_afecon_p;

					WHILE @conta8<=@conta9
					BEGIN
						SELECT @Wven=Cod_cta, @aCod_suc=Cod_suc, @aCod_cco=Cod_cco, @aCod_cl1=Cod_cl1, 
						@aCod_cl2=cod_cl2, @aCod_cl3=cod_cl3, @aNet_doc=valor,@aBas_Doc=base
						FROM #t_afecon_p
						WHERE recno=@conta8;

						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
						FROM cnt_puc 
						WHERE cod_cta=@Wven;

						IF @ter IN (2,3)
						BEGIN
							SET @cod_ter1=@cod_ter;
						END;
						ELSE
						BEGIN
							SET @cod_ter1='0';
						END;

						IF @cco=1
						BEGIN
							SET @cod_cco1=@acod_cco;
						END;
						ELSE
						BEGIN
							SET @cod_cco1='0';
						END;

						IF @bas=1
						BEGIN
							SET @bas_mov=@aBas_Doc;
						END;
						ELSE
						BEGIN
							SET @bas_mov=0;
						END;

						IF @cl1=1
						BEGIN
							SET @cod_cl11=@acod_cl1;
						END;
						ELSE
						BEGIN
							SET @cod_cl11='0';
						END;

						IF @cl2=1
						BEGIN
							SET @cod_cl21=@acod_cl2;
						END;
						ELSE
						BEGIN
							SET @cod_cl21='0';
						END;

						IF @cl3=1
						BEGIN
							SET @cod_cl31=@acod_cl3;
						END;
						ELSE
						BEGIN
							SET @cod_cl31='0';
						END;
				
						EXEC sp_gen_trae_tasa @wven, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
						BEGIN   
							SET @tasa=@tasa_doc;
						END;

						SET @aNet_doc=ROUND(@aNet_doc,@num_dec);

						SET @reg2=CONVERT(CHAR(10),@reg1);

						INSERT INTO #inv_inf_con_det (ano_doc, per_doc, sub_tip,tip_doc, num_doc, reg_doc, 
																fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
																deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
																fec_tas, tasa, ind_tas,ind_mod)
						VALUES (@ano_doc, @per_doc, @sub_tip,@tip_doc, @num_doc,@reg2, 
									@fecha, @wven, @acod_suc, @cod_cco1, @cod_cl11, @cod_cl21, @cod_cl31, 
									@cod_ter1, 0,@aNet_doc, 'DESCRIPCION PRECIO', @bas_mov, '', '', '', @ind_mp, @fec_tas, 
									@tasa, @ind_tas,0);
						
						SET @reg1=@reg1+1;
	
						SET @conta8=@conta8+1;
					END;
				END;

				--Descuentos
				--PRINT 'DESCUENTO'
				IF @mon_des>0 AND @ind_cnt_des = 1
				BEGIN
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@des_ven;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=@pre_tot-@mon_des;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @des_ven, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@des_ven ,@cod_ter1,  @mon_des, 0,
								'DESCRIPCION DESCUENTO',@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					
					SET @reg1=@reg1+1;
				END;

				--Iva
				--PRINT 'IVA'
				IF @mon_iva>0
				BEGIN
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@iva_ven;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov= CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @iva_ven, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas)
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@iva_ven ,@cod_ter1, 0, @mon_iva, 
								'DESCRIPCION IVA',@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					
					SET @reg1=@reg1+1;
				END;

				--Iva NG
				--PRINT 'IVA NG'
				IF @mon_iva_ng>0
				BEGIN
					IF @dcta_ivang <> '0'
					BEGIN
						SET @iva_ng = @dcta_ivang;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@iva_ng;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					SET @bas_cnt = CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;

					IF @bas=1
					BEGIN
						SET @bas_mov=@bas_cnt;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @iva_ng, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					IF @Ind_afe='0' -- NO HAY DISTRIBUCIÓN DEL GASTO
					BEGIN
						SET @reg2=CONVERT(CHAR(10),@reg1)

						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,
																	cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																	des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas)
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,
									@cod_cl11,@cod_cl21,@cod_cl31,@iva_ng ,@cod_ter1, 0, @mon_iva_ng,
									'DESCRIPCION IVA NO GRAVADO',@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						
						SET @reg1=@reg1+1;
					END;
					ELSE
					BEGIN
						
						-- DISTRIBUCIÓN DEL GASTO/IVA NO GRAVADO
						DELETE FROM #t_afecon_ng;
					
						INSERT INTO #t_afecon_ng(Cod_cta,Cod_suc,Cod_cco,Cod_cl1,Cod_cl2,Cod_cl3,valor,base)
						SELECT cta_ivang, Cod_suc, Cod_cco, Cod_cl1, Cod_cl2, Cod_cl3, ROUND((Porcentaje/100)*@mon_iva_ng,@num_dec) AS valor, ROUND((Porcentaje/100)*@bas_cnt,@num_dec) AS base
						FROM Cxp_distriafe 
						WHERE Cod_afe= @Ind_afe;

						SELECT @gas_dist=ISNULL(SUM(valor),0), @bas_dist=ISNULL(SUM(base),0) 
						FROM #t_afecon_ng;
									
						IF @gas_dist>0 AND @mon_iva_ng<>@gas_dist
						BEGIN
							SELECT TOP 1 @conta7=recno 
							FROM #t_afecon_ng 
							ORDER BY valor DESC;
					
							UPDATE #t_afecon_ng SET valor=valor+(@mon_iva_ng-@gas_dist), base=base+(@bas_cnt-@bas_dist) 
							WHERE recno=@conta7;
						END;

						SELECT @conta9=ISNULL(COUNT(1),0) 
						FROM #t_afecon_ng;

						SELECT @conta8=MIN(recno) 
						FROM #t_afecon_ng;

						SELECT @conta9=MAX(recno) 
						FROM #t_afecon_ng;

						WHILE @conta8<=@conta9
						BEGIN

							SELECT @Wven=Cod_cta, @aCod_suc=Cod_suc, @aCod_cco=Cod_cco, @aCod_cl1=Cod_cl1, 
										@aCod_cl2=cod_cl2, @aCod_cl3=cod_cl3, @aNet_doc=valor, @aBas_Doc=base
							FROM #t_afecon_ng
							WHERE recno=@conta8;

							SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
							FROM cnt_puc 
							WHERE cod_cta=@Wven;

							IF @ter IN (2,3)
							BEGIN
								SET @cod_ter1=@cod_ter;
							END;
							ELSE
							BEGIN
								SET @cod_ter1='0';
							END;

							IF @cco=1
							BEGIN
								SET @cod_cco1=@acod_cco;
							END;
							ELSE
							BEGIN
								SET @cod_cco1='0';
							END;

							IF @bas=1
							BEGIN
								SET @bas_mov=@aBas_Doc;
							END;
							ELSE
							BEGIN
								SET @bas_mov=0;
							END;

							IF @cl1=1
							BEGIN
								SET @cod_cl11=@acod_cl1;
							END;
							ELSE
							BEGIN
								SET @cod_cl11='0';
							END;

							IF @cl2=1
							BEGIN
								SET @cod_cl21=@acod_cl2;
							END;
							ELSE
							BEGIN
								SET @cod_cl21='0';
							END;

							IF @cl3=1
							BEGIN
								SET @cod_cl31=@acod_cl3;
							END;
							ELSE
							BEGIN
								SET @cod_cl31='0';
							END;

							EXEC sp_gen_trae_tasa @wven, @fec_tas, @tasa OUTPUT, @ind_mp;

							IF @ind_tas='S'
							BEGIN
								SET @tasa=@tasa_doc;
							END;

							SET @reg2=CONVERT(CHAR(10),@reg1);
							
							INSERT INTO #inv_inf_con_det (ano_doc, per_doc, sub_tip,tip_doc, num_doc, reg_doc, 
																	fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, 
																	deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, 
																	fec_tas, tasa, ind_tas,ind_mod)
							VALUES (@ano_doc, @per_doc, @sub_tip,@tip_doc, @num_doc,@reg2, 
									@fecha, @wven, @acod_suc, @cod_cco1, @cod_cl11, @cod_cl21, @cod_cl31, 
									@cod_ter1, 0, @aNet_doc,'DESCRIPCION IVA NO GRAVADO', @bas_mov, '', '', '', @ind_mp, @fec_tas, 
									@tasa, @ind_tas,0);
							
							SET @reg1=@reg1+1;

							SET @conta8=@conta8+1;
						END;
					END;
				END;

				--Impuesto Consumo
				--PRINT 'CONSUMO'
				IF @imp_con>0
				BEGIN
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@imp_conv;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=@pre_tot-@mon_des;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @imp_conv, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@imp_conv ,@cod_ter1, 0, @imp_con, 
								'DESCRIPCION CONSUMO',@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					
					SET @reg1=@reg1+1;
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

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@ret_ven;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @ret_ven, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas)	
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@ret_ven ,@cod_ter1, @mon_ret, 0,
						'DESCRIPCION RETENCION',@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					
					SET @reg1=@reg1+1;
				END;

				--Retencion de Iva
				--PRINT 'RETEIVA'
				IF @ret_iva>0
				BEGIN
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@ret_iva_c;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						IF @ind_tip = 3
						BEGIN
							SET @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						END;
						ELSE
						BEGIN
							SET @bas_mov=ISNULL(@mon_iva,0)+ISNULL(@mon_iva_ng,0);
						END;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @ret_iva_c, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@ret_iva_c ,@cod_ter1,  @ret_iva, 0, 
								'DESCRIPCION RETEIVA',@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					
					SET @reg1=@reg1+1;
					
					IF @ind_tip=3
					BEGIN
						SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
						FROM cnt_puc 
						WHERE cod_cta=@iva_pag;

						IF @ter IN (2,3)
						BEGIN
							SET @cod_ter1=@cod_ter;
						END;
						ELSE
						BEGIN
							SET @cod_ter1='0';
						END;

						IF @cco=1
						BEGIN
							SET @cod_cco1=@cod_cco;
						END;
						ELSE
						BEGIN
							SET @cod_cco1='0';
						END;

						IF @bas=1
						BEGIN
							SET @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
						END;
						ELSE
						BEGIN
							SET @bas_mov=0;
						END;

						IF @cl1=1
						BEGIN
							SET @cod_cl11=@cod_cl1;
						END;
						ELSE
						BEGIN
							SET @cod_cl11='0';
						END;

						IF @cl2=1
						BEGIN
							SET @cod_cl21=@cod_cl2;
						END;
						ELSE
						BEGIN
							SET @cod_cl21='0';
						END;

						IF @cl3=1
						BEGIN
							SET @cod_cl31=@cod_cl3;
						END;
						ELSE
						BEGIN
							SET @cod_cl31='0';
						END;

						EXEC sp_gen_trae_tasa @iva_pag, @fec_tas, @tasa OUTPUT, @ind_mp;

						IF @ind_tas='S'
						BEGIN
							SET @tasa=@tasa_doc;
						END;

						
						SET @reg2=CONVERT(CHAR(10),@reg1);
						INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
						VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@iva_pag ,@cod_ter1,  0, @ret_iva,  
									'DESCRIPCION RETEIVA 2',@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
						
						SET @reg1=@reg1+1;
					END;
				END;

				IF @ret_iva_ng>0 AND @ind_tip=3
				BEGIN
					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@ret_iva_c;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @ret_iva_c, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31, @ret_iva_c ,@cod_ter1, @ret_iva_ng, 0,
								'DESCRIPCION RETEIVA',
							CASE WHEN @ret_iva>0 THEN 0 ELSE @bas_mov END,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					
					SET @reg1=@reg1+1;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@riv_com_ng;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @iva_pag, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
																des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31, @riv_com_ng, @cod_ter1,0,  @ret_iva_ng,
								'DESCRIPCION RETEIVA',@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					
					SET @reg1=@reg1+1;
				END;

				--Retencion de Ica
				--PRINT 'RETEICA'
				IF @ret_ica>0
				BEGIN
					IF @ind_cta_ica =2
					BEGIN
						SELECT @ret_ica_c=cod_cta_com
						FROM gen_actividad
						WHERE cod_act=@cod_ica 
							AND cod_pai=@pai_doc 
							AND cod_dep=@dep_doc 
							AND cod_ciu=@ciu_doc;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@ret_ica_c;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @ret_ica_c, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);
					
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@ret_ica_c ,@cod_ter1, @ret_ica, 0,
								'DESCRIPCION RETEICA',@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					
					SET @reg1=@reg1+1;
				END;

				--SUMA 1
				--PRINT 'SUMA1'
				IF @mon_sum1>0
				BEGIN
					SELECT @apl_imp=apl_com_sum1 
					FROM gen_imp_adic 
					WHERE llave='0';

					IF @apl_imp=1
					BEGIN
						SELECT @cta_sum1=cta_imp_sum1 
						FROM inv_items 
						WHERE cod_item=@item;
					END;
					ELSE
					BEGIN
						SELECT @cta_sum1=cta_imp_sum1 
						FROM cxp_provee 
						WHERE provee=@provee;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@cta_sum1;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @cta_sum1, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_sum1 ,@cod_ter1, 0, @mon_sum1,
								'DESCRIPCION IMPUESTO SUMA 1',@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					
					SET @reg1=@reg1+1;
				END;

				--SUMA 2
				--PRINT 'SUMA2'
				IF @mon_sum2>0
				BEGIN
					SELECT @apl_imp=apl_com_sum2 
					FROM gen_imp_adic 
					WHERE llave='0';

					IF @apl_imp=1
					BEGIN
						SELECT @cta_sum2=cta_imp_sum2 
						FROM inv_items 
						WHERE cod_item=@item;
					END;
					ELSE
					BEGIN
						SELECT @cta_sum2=cta_imp_sum2 
						FROM cxp_provee 
						WHERE provee=@provee;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@cta_sum2;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @cta_sum2, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_sum2 ,@cod_ter1, 0, @mon_sum2,
								'DESCRIPCION IMPUESTO SUMA 2',@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

					SET @reg1=@reg1+1;
				END;

				--SUMA 3
				--PRINT 'SUMA3'
				IF @mon_sum3>0
				BEGIN
					SELECT @apl_imp=apl_com_sum3 
					FROM gen_imp_adic 
					WHERE llave='0';

					IF @apl_imp=1
					BEGIN
						SELECT @cta_sum3=cta_imp_sum3 
						FROM inv_items 
						WHERE cod_item=@item;
					END;
					ELSE
					BEGIN
						SELECT @cta_sum3=cta_imp_sum3 
						FROM cxp_provee 
						WHERE provee=@provee;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@cta_sum3;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @cta_sum3, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_sum3 ,@cod_ter1, 0, @mon_sum3,
								'DESCRIPCION IMPUESTO SUMA 3',@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					
					SET @reg1=@reg1+1;
				END;

				--SUMA 4
				--PRINT 'SUMA4'
				IF @mon_sum4>0
				BEGIN
					SELECT @apl_imp=apl_com_sum4 
					FROM gen_imp_adic 
					WHERE llave='0';

					IF @apl_imp=1
					BEGIN
						SELECT @cta_sum4=cta_imp_sum4 
						FROM inv_items 
						WHERE cod_item=@item;
					END;
					ELSE
					BEGIN
						SELECT @cta_sum4=cta_imp_sum4 
						FROM cxp_provee 
						WHERE provee=@provee;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@cta_sum4;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @cta_sum4, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_sum4 ,@cod_ter1, 0, @mon_sum4,
								'DESCRIPCION IMPUESTO SUMA 4',@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

					SET @reg1=@reg1+1;
				END;

				--RESTA 1
				--PRINT 'RESTA1'
				IF @mon_res1>0
				BEGIN
					SELECT @apl_imp=apl_com_res1 
					FROM gen_imp_adic 
					WHERE llave='0';

					IF @apl_imp=1
					BEGIN
						SELECT @cta_res1=cta_imp_res1 
						FROM inv_items 
						WHERE cod_item=@item;
					END;
					ELSE
					BEGIN
						SELECT @cta_res1=cta_imp_res1 
						FROM cxp_provee 
						WHERE provee=@provee;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@cta_res1;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @cta_res1, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_res1 ,@cod_ter1, @mon_res1, 0,
								'DESCRIPCION IMPUESTO RESTA 1',@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
					
					SET @reg1=@reg1+1;
				END;

				--RESTA 2
				--PRINT 'RESTA2'
				IF @mon_res2>0
				BEGIN
					SELECT @apl_imp=apl_com_res2 
					FROM gen_imp_adic 
					WHERE llave='0';

					IF @apl_imp=1
					BEGIN
						SELECT @cta_res2=cta_imp_res2 
						FROM inv_items 
						WHERE cod_item=@item;
					END;
					ELSE
					BEGIN
						SELECT @cta_res2=cta_imp_res2 
						FROM cxp_provee 
						WHERE provee=@provee;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@cta_res2;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @cta_res2, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_res2 ,@cod_ter1, @mon_res2, 0,
								'DESCRIPCION IMPUESTO RESTA 2',@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

					SET @reg1=@reg1+1;
				END;

				--RESTA 3
				--PRINT 'RESTA3'
				IF @mon_res3>0
				BEGIN
					SELECT @apl_imp=apl_com_res3 
					FROM gen_imp_adic 
					WHERE llave='0';

					IF @apl_imp=1
					BEGIN
						SELECT @cta_res3=cta_imp_res3 
						FROM inv_items 
						WHERE cod_item=@item;
					END;
					ELSE
					BEGIN
						SELECT @cta_res3=cta_imp_res3 
						FROM cxp_provee 
						WHERE provee=@provee;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@cta_res3;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @cta_res3, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_res3 ,@cod_ter1, @mon_res3, 0,
								'DESCRIPCION IMPUESTO RESTA 3',@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

					SET @reg1=@reg1+1;
				END;

				--RESTA 4
				--PRINT 'RESTA4'
				IF @mon_res4>0
				BEGIN
					SELECT @apl_imp=apl_com_res4 
					FROM gen_imp_adic 
					WHERE llave='0';

					IF @apl_imp=1
					BEGIN
						SELECT @cta_res4=cta_imp_res4 
						FROM inv_items 
						WHERE cod_item=@item;
					END;
					ELSE
					BEGIN
						SELECT @cta_res4=cta_imp_res4 
						FROM cxp_provee 
						WHERE provee=@provee;
					END;

					SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
					FROM cnt_puc 
					WHERE cod_cta=@cta_res4;

					IF @ter IN (2,3)
					BEGIN
						SET @cod_ter1=@cod_ter;
					END;
					ELSE
					BEGIN
						SET @cod_ter1='0';
					END;

					IF @cco=1
					BEGIN
						SET @cod_cco1=@cod_cco;
					END;
					ELSE
					BEGIN
						SET @cod_cco1='0';
					END;

					IF @bas=1
					BEGIN
						SET @bas_mov=CASE @base_iva_aiu WHEN 0 THEN @pre_tot-@mon_des ELSE @base_iva_aiu END;
					END;
					ELSE
					BEGIN
						SET @bas_mov=0;
					END;

					IF @cl1=1
					BEGIN
						SET @cod_cl11=@cod_cl1;
					END;
					ELSE
					BEGIN
						SET @cod_cl11='0';
					END;

					IF @cl2=1
					BEGIN
						SET @cod_cl21=@cod_cl2;
					END;
					ELSE
					BEGIN
						SET @cod_cl21='0';
					END;

					IF @cl3=1
					BEGIN
						SET @cod_cl31=@cod_cl3;
					END;
					ELSE
					BEGIN
						SET @cod_cl31='0';
					END;

					EXEC sp_gen_trae_tasa @cta_res4, @fec_tas, @tasa OUTPUT, @ind_mp;

					IF @ind_tas='S'
					BEGIN
						SET @tasa=@tasa_doc;
					END;

					SET @reg2=CONVERT(CHAR(10),@reg1);

					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_res4 ,@cod_ter1, @mon_res4, 0,
								'DESCRIPCION IMPUESTO RESTA 4',@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

					SET @reg1=@reg1+1;
				END;

				--Cuenta por Pagar
				--PRINT 'CXP'
			
				SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
				FROM cnt_puc 
				WHERE cod_cta=@cta_cxp;

				IF @ter IN (2,3)
				BEGIN
					SET @cod_ter1=@cod_ter;
				END;
				ELSE
				BEGIN
					SET @cod_ter1='0';
				END;

				IF @cco=1
				BEGIN
					SET @cod_cco1=@cod_cco;
				END;
				ELSE
				BEGIN
					SET @cod_cco1='0';
				END;

				IF @bas=1
				BEGIN
					SET @bas_mov=@pre_tot-@mon_des;
				END;
				ELSE
				BEGIN
					SET @bas_mov=0;
				END;

				IF @cl1=1
				BEGIN
					SET @cod_cl11=@cod_cl1;
				END;
				ELSE
				BEGIN
					SET @cod_cl11='0';
				END;

				IF @cl2=1
				BEGIN
					SET @cod_cl21=@cod_cl2;
				END;
				ELSE
				BEGIN
					SET @cod_cl21='0';
				END;

				IF @cl3=1
				BEGIN
					SET @cod_cl31=@cod_cl3;
				END;
				ELSE
				BEGIN
					SET @cod_cl31='0';
				END;

				EXEC sp_gen_trae_tasa @cta_cxp, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				SET @reg2=CONVERT(CHAR(10),@reg1);

				INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
													des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
				VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_cxp ,@cod_ter1,  @val_def, 0,
							'DESCRIPCION CXP',@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
				
				SET @reg1=@reg1+1;
			END;
		END;

		--	AJUSTE PESOS ENTRADA
		IF @tip='APE'
		BEGIN
			IF @cos_uni>0
			BEGIN
				SELECT @cod_ter=@provee;

				SELECT @ind_mp=ind_mp, @fec_tas=fec_tas, @obs_orc=LEFT(obs_orc,70), @tasa_doc=tasa, @ind_tas=ind_tas, @cod_ter = cod_ter
				FROM inv_cabdoc 
				WHERE ano_doc=@ano_doc AND per_doc=@per_doc AND sub_tip=@sub_tip AND num_doc=@num_doc;

				SELECT @inv_ven=inv_com,@cos_ven=cos_com FROM inv_items WHERE cod_item=@item;

				--Inventarios
				--PRINT 'INV'
				SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@inv_ven;

				IF @ter IN (2,3)
					SELECT @cod_ter1=@cod_ter;
				ELSE
					SELECT @cod_ter1='0';

				IF @cco=1
					SELECT @cod_cco1=@cod_cco;
				ELSE
					SELECT @cod_cco1='0';

				IF @bas=1
					SELECT @bas_mov=@pre_tot-@mon_des;
				ELSE
					SELECT @bas_mov=0;

				IF @cl1=1
					SELECT @cod_cl11=@cod_cl1;
				ELSE
					SELECT @cod_cl11='0';

				IF @cl2=1
					SELECT @cod_cl21=@cod_cl2;
				ELSE
					SELECT @cod_cl21='0';

				IF @cl3=1
					SELECT @cod_cl31=@cod_cl3;
				ELSE
					SELECT @cod_cl31='0';

				EXEC sp_gen_trae_tasa @inv_ven, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
					SELECT @tasa=@tasa_doc;

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

				SELECT @reg2=CONVERT(CHAR(10),@reg1);
				INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
														des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
				VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@inv_ven ,@cod_ter1, @cos_uni, 0, 
							@obs_inv,@bas_mov,'0','X','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
				SELECT @reg1=@reg1+1;

				--Costo
				--PRINT 'COSTO'
				IF @dcta_costo <> '0'
				BEGIN
					SET @cos_ven = @dcta_costo;
				END;

				SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cos_ven;

				IF @ter IN (2,3)
					SELECT @cod_ter1=@cod_ter;
				ELSE
					SELECT @cod_ter1='0';

				IF @cco=1
					SELECT @cod_cco1=@cod_cco;
				ELSE
					SELECT @cod_cco1='0';

				IF @bas=1
					SELECT @bas_mov=@pre_tot-@mon_des;
				ELSE
					SELECT @bas_mov=0;

				IF @cl1=1
					SELECT @cod_cl11=@cod_cl1;
				ELSE
					SELECT @cod_cl11='0';

				IF @cl2=1
					SELECT @cod_cl21=@cod_cl2;
				ELSE
					SELECT @cod_cl21='0';

				IF @cl3=1
					SELECT @cod_cl31=@cod_cl3;
				ELSE
					SELECT @cod_cl31='0';

				EXEC sp_gen_trae_tasa @cos_ven, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
					SELECT @tasa=@tasa_doc;

				SELECT @reg2=CONVERT(CHAR(10),@reg1);
				INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
														des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
				VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cos_ven ,@cod_ter1, 0, @cos_uni, 
							@obs_cto,@bas_mov,'0','X','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
				SELECT @reg1=@reg1+1;
			END;
		END;

		--	AJUSTE PESOS SALIDA
		IF @tip='APS'
		BEGIN
			IF @cos_uni>0
			BEGIN
				SELECT @ind_mp=ind_mp, @fec_tas=fec_tas, @obs_orc=LEFT(obs_orc,70), @tasa_doc=tasa, @ind_tas=ind_tas, @cod_ter=cod_ter 
				FROM inv_cabdoc 
				WHERE ano_doc=@ano_doc AND per_doc=@per_doc AND sub_tip=@sub_tip AND num_doc=@num_doc;

				SELECT @inv_ven=inv_ven,@cos_ven=cos_ven FROM inv_items WHERE cod_item=@item;
				--Inventarios
				--PRINT 'INV'
				SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@inv_ven;

				IF @ter IN (2,3)
					SELECT @cod_ter1=@cod_ter;
				ELSE
					SELECT @cod_ter1='0';

				IF @cco=1
					SELECT @cod_cco1=@cod_cco;
				ELSE
					SELECT @cod_cco1='0';

				IF @bas=1
					SELECT @bas_mov=@pre_tot-@mon_des;
				ELSE
					SELECT @bas_mov=0;

				IF @cl1=1
					SELECT @cod_cl11=@cod_cl1;
				ELSE
					SELECT @cod_cl11='0';

				IF @cl2=1
					SELECT @cod_cl21=@cod_cl2;
				ELSE
					SELECT @cod_cl21='0';

				IF @cl3=1
					SELECT @cod_cl31=@cod_cl3;
				ELSE
					SELECT @cod_cl31='0';

				EXEC sp_gen_trae_tasa @inv_ven, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
					SELECT @tasa=@tasa_doc;

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

				SELECT @reg2=CONVERT(CHAR(10),@reg1);
				INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
														des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas)
				VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@inv_ven ,@cod_ter1, 0, @cos_uni, 
							@obs_inv,@bas_mov,'0','X','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
				SELECT @reg1=@reg1+1;

				--Costo
				--PRINT 'COSTO'
				IF @dcta_costo <> '0'
				BEGIN
					SET @cos_ven = @dcta_costo;
				END;

				SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cos_ven;

				IF @ter IN (2,3)
					SELECT @cod_ter1=@cod_ter;
				ELSE
					SELECT @cod_ter1='0';

				IF @cco=1
					SELECT @cod_cco1=@cod_cco;
				ELSE
					SELECT @cod_cco1='0';

				IF @bas=1
					SELECT @bas_mov=@pre_tot-@mon_des;
				ELSE
					SELECT @bas_mov=0;

				IF @cl1=1
					SELECT @cod_cl11=@cod_cl1;
				ELSE
					SELECT @cod_cl11='0';

				IF @cl2=1
					SELECT @cod_cl21=@cod_cl2;
				ELSE
					SELECT @cod_cl21='0';

				IF @cl3=1
					SELECT @cod_cl31=@cod_cl3;
				ELSE
					SELECT @cod_cl31='0';

				EXEC sp_gen_trae_tasa @cos_ven, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
					SELECT @tasa=@tasa_doc;

				SELECT @reg2=CONVERT(CHAR(10),@reg1);
				INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
														des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas)
				VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cos_ven ,@cod_ter1, @cos_uni, 0, 
							@obs_cto,@bas_mov,'0','X','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
				SELECT @reg1=@reg1+1;
			END;
		END;

		--	AJUSTES POR INFLACION
		IF @tip='AXI'
		BEGIN
			IF @cos_unai<>0
			BEGIN
				SELECT @cod_ter=@provee;

				SELECT @ind_mp=ind_mp, @fec_tas=fec_tas, @obs_orc=LEFT(obs_orc,70), @tasa_doc=tasa, @ind_tas=ind_tas
				FROM inv_cabdoc 
				WHERE ano_doc=@ano_doc AND per_doc=@per_doc AND sub_tip=@sub_tip AND num_doc=@num_doc;

				IF @ind_mp BETWEEN '01' AND '98'
				BEGIN 
					SELECT @pre_tot=ROUND(@prt_ext,@num_dec);
					SELECT @cos_tot=ROUND(@cot_ext,@num_dec);
					SELECT @mon_des=ROUND(@des_ext,@num_dec);
					SELECT @val_def=ROUND(@prt_ext-@des_ext,@num_dec);
					SELECT @ven_net=ROUND(@prt_ext-@des_ext,@num_dec);
				END;

				SELECT @cta_axi=cta_axi, @cta_mon=cta_mon FROM inv_items WHERE cod_item=@item;

				--Cuenta de Ajuste
				--PRINT 'AXI'
				SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_axi;

				IF @ter IN (2,3)
					SELECT @cod_ter1=@cod_ter;
				ELSE
					SELECT @cod_ter1='0';

				IF @cco=1
					SELECT @cod_cco1=@cod_cco;
				ELSE
					SELECT @cod_cco1='0';

				IF @bas=1
					SELECT @bas_mov=@pre_tot-@mon_des;
				ELSE
					SELECT @bas_mov=0;

				IF @cl1=1
					SELECT @cod_cl11=@cod_cl1;
				ELSE
					SELECT @cod_cl11='0';

				IF @cl2=1
					SELECT @cod_cl21=@cod_cl2;
				ELSE
					SELECT @cod_cl21='0';

				IF @cl3=1
					SELECT @cod_cl31=@cod_cl3;
				ELSE
					SELECT @cod_cl31='0';

				EXEC sp_gen_trae_tasa @cta_axi, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
					SELECT @tasa=@tasa_doc;

				SELECT @reg2=CONVERT(CHAR(10),@reg1);
				IF @cos_unai>0
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31, @cta_axi ,@cod_ter1, @cos_unai, 0, 
								'AJUSTES POR INFLACION '+@ano_doc+'-'+@per_doc+' SUC.:'+@cod_suc,@bas_mov,'0','X','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
				ELSE
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31, @cta_axi ,@cod_ter1, 0, ABS(@cos_unai), 
								'AJUSTES POR INFLACION '+@ano_doc+'-'+@per_doc+' SUC.:'+@cod_suc,@bas_mov,'0','X','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
				SELECT @reg1=@reg1+1;
				
				--Cuenta Corrección Monetaria
				--PRINT 'Corrección'
				SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_mon;

				IF @ter IN (2,3)
					SELECT @cod_ter1=@cod_ter;
				ELSE
					SELECT @cod_ter1='0';

				IF @cco=1
					SELECT @cod_cco1=@cod_cco;
				ELSE
					SELECT @cod_cco1='0';

				IF @bas=1
					SELECT @bas_mov=@pre_tot-@mon_des;
				ELSE
					SELECT @bas_mov=0;

				IF @cl1=1
					SELECT @cod_cl11=@cod_cl1;
				ELSE
					SELECT @cod_cl11='0';

				IF @cl2=1
					SELECT @cod_cl21=@cod_cl2;
				ELSE
					SELECT @cod_cl21='0';

				IF @cl3=1
					SELECT @cod_cl31=@cod_cl3;
				ELSE
					SELECT @cod_cl31='0';

				EXEC sp_gen_trae_tasa @cta_mon, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
					SELECT @tasa=@tasa_doc;

				SELECT @reg2=CONVERT(CHAR(10),@reg1);
				IF @cos_unai>0
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_mon ,@cod_ter1, 0, @cos_unai, 
								'AJUSTES POR INFLACION '+@ano_doc+'-'+@per_doc+' SUC.:'+@cod_suc, @bas_mov,'0','X','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
				ELSE
					INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
															des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
					VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_mon ,@cod_ter1, ABS(@cos_unai), 0, 
								'AJUSTES POR INFLACION '+@ano_doc+'-'+@per_doc+' SUC.:'+@cod_suc, @bas_mov,'0','X','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
				SELECT @reg1=@reg1+1;
			END;
		END;

		--- CONTABILIZACION DOCUMENTOS DE PUNTO DE VENTA DIFERENTES A FACTURAS

		-- EGRESOS
		IF @tip='PEG'
		BEGIN
			IF @val_def>0
			BEGIN
				SELECT @ind_mp=ind_mp, @fec_tas=fec_tas, @tasa_doc=tasa, @ind_tas=ind_tas, @cod_caja = cod_caja 
				FROM inv_cabdoc 
				WHERE ano_doc=@ano_doc AND per_doc=@per_doc AND sub_tip=@sub_tip AND num_doc=@num_doc;

				SELECT @obs_orc='EGRESO EN PUNTO DE VENTA';

				SELECT @ptv_otr=cod_cta 
				FROM ptv_egresos 
				WHERE cod_egr=@cod_egr;

				SELECT @ptv_caj=cta_caj, @ind_tes = ind_tes, @cod_ter = ter_caj 
				FROM inv_param_cnt 
				WHERE llave='0';

				IF @ind_tes = 1
				BEGIN
					SELECT @cod_ban=cod_ban FROM gen_cajas WHERE cod_caj=@cod_caja;
					SELECT @ptv_caj=ctactb, @cod_ter = nit FROM tes_bancos WHERE bancos=@cod_ban;
				END;

				-- Cuenta débito
				SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
				FROM cnt_puc 
				WHERE cod_cta=@ptv_otr;

				IF @ter IN (2,3)
					SELECT @cod_ter1=@cod_ter;
				ELSE
					SELECT @cod_ter1='0';

				IF @cco=1
					SELECT @cod_cco1=@cod_cco;
				ELSE
					SELECT @cod_cco1='0';

				IF @bas=1
					SELECT @bas_mov=0;
				ELSE
					SELECT @bas_mov=0;

				IF @cl1=1
					SELECT @cod_cl11=@cod_cl1;
				ELSE
					SELECT @cod_cl11='0';

				IF @cl2=1
					SELECT @cod_cl21=@cod_cl2;
				ELSE
					SELECT @cod_cl21='0';

				IF @cl3=1
					SELECT @cod_cl31=@cod_cl3;
				ELSE
					SELECT @cod_cl31='0';

				EXEC sp_gen_trae_tasa @ptv_otr, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
					SELECT @tasa=@tasa_doc;

				SELECT @reg2=CONVERT(CHAR(10),@reg1);
				INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
														des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
				VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31, @ptv_otr,@cod_ter1, @val_def, 0, 
							@obs_orc,@bas_mov,'0','X','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

				SELECT @reg1=@reg1+1;

				-- Cuenta débito
				SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@ptv_caj;

				IF @ter IN (2,3)
					SELECT @cod_ter1=@cod_ter;
				ELSE
					SELECT @cod_ter1='0';

				IF @cco=1
					SELECT @cod_cco1=@cod_cco;
				ELSE
					SELECT @cod_cco1='0';

				IF @bas=1
					SELECT @bas_mov=0;
				ELSE
					SELECT @bas_mov=0;

				IF @cl1=1
					SELECT @cod_cl11=@cod_cl1;
				ELSE
					SELECT @cod_cl11='0';

				IF @cl2=1
					SELECT @cod_cl21=@cod_cl2;
				ELSE
					SELECT @cod_cl21='0';

				IF @cl3=1
					SELECT @cod_cl31=@cod_cl3;
				ELSE
					SELECT @cod_cl31='0';

				EXEC sp_gen_trae_tasa @ptv_caj, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
					SELECT @tasa=@tasa_doc;

				SELECT @reg2=CONVERT(CHAR(10),@reg1);
				INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
														des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
				VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31, @ptv_caj,@cod_ter1, 0, @val_def, 
							@obs_orc,@bas_mov,'0','X','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

				SELECT @reg1=@reg1+1;
			END;
		END;

		-- ANTICIPOS
		IF @tip='PAN'
		BEGIN
			IF @val_ant>0
			BEGIN
				SELECT @ind_mp=ind_mp, @fec_tas=fec_tas, @tasa_doc=tasa, @ind_tas=ind_tas, @cod_caja=cod_caja  
				FROM inv_cabdoc 
				WHERE ano_doc=@ano_doc 
					AND per_doc=@per_doc 
					AND sub_tip=@sub_tip 
					AND num_doc=@num_doc;

				SELECT @obs_orc='ANTICIPO EN PUNTO DE VENTA';

				SELECT @ptv_otr=cod_cta FROM ptv_egresos WHERE cod_egr='00';
				SELECT @ptv_caj=cta_caj, @cod_ter=ter_caj, @ind_tes = ind_tes FROM inv_param_cnt WHERE llave='0';

				IF @ind_tes=1
				BEGIN
					SELECT @cod_ban=cod_ban FROM gen_cajas WHERE cod_caj=@cod_caja;
					SELECT @ptv_caj=ctactb, @cod_ter=nit FROM tes_bancos WHERE bancos=@cod_ban;
				END;

				SET @ptv_otr = ISNULL(@ptv_otr,'0');

				-- Cuenta débito
				SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
				FROM cnt_puc 
				WHERE cod_cta=@ptv_otr;

				IF @ter IN (2,3)
				BEGIN
					SET @cod_ter1=@cod_ter;
				END;
				ELSE
				BEGIN
					SET @cod_ter1='0';
				END;

				IF @cco=1
				BEGIN
					SET @cod_cco1=@cod_cco;
				END;
				ELSE
				BEGIN
					SET @cod_cco1='0';
				END;

				IF @bas=1
				BEGIN
					SET @bas_mov=0;
				END;
				ELSE
				BEGIN
					SET @bas_mov=0;
				END;

				IF @cl1=1
				BEGIN
					SET @cod_cl11=@cod_cl1;
				END;
				ELSE
				BEGIN
					SET @cod_cl11='0';
				END;

				IF @cl2=1
				BEGIN
					SET @cod_cl21=@cod_cl2;
				END;
				ELSE
				BEGIN
					SET @cod_cl21='0';
				END;

				IF @cl3=1
				BEGIN
					SET @cod_cl31=@cod_cl3;
				END;
				ELSE
				BEGIN
					SET @cod_cl31='0';
				END;

				EXEC sp_gen_trae_tasa @ptv_otr, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				SET @reg2=CONVERT(CHAR(10),@reg1);

				INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
														des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
				VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31, @ptv_otr,@cod_ter1, 0, @val_ant, 
							@obs_orc,@bas_mov,'0','X','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

				SET @reg1=@reg1+1;

				-- Cuenta débito
				SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@ptv_caj;

				IF @ter IN (2,3)
				BEGIN
					SET @cod_ter1=@cod_ter;
				END;
				ELSE
				BEGIN
					SET @cod_ter1='0';
				END;

				IF @cco=1
				BEGIN
					SET @cod_cco1=@cod_cco;
				END;
				ELSE
				BEGIN
					SET @cod_cco1='0';
				END;

				IF @bas=1
				BEGIN
					SET @bas_mov=0;
				END;
				ELSE
				BEGIN
					SET @bas_mov=0;
				END;

				IF @cl1=1
				BEGIN
					SET @cod_cl11=@cod_cl1;
				END;
				ELSE
				BEGIN
					SET @cod_cl11='0';
				END;

				IF @cl2=1
				BEGIN
					SET @cod_cl21=@cod_cl2;
				END;
				ELSE
				BEGIN
					SET @cod_cl21='0';
				END;

				IF @cl3=1
				BEGIN
					SET @cod_cl31=@cod_cl3;
				END;
				ELSE
				BEGIN
					SET @cod_cl31='0';
				END;

				EXEC sp_gen_trae_tasa @ptv_caj, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
					SELECT @tasa=@tasa_doc;

				SELECT @reg2=CONVERT(CHAR(10),@reg1);
				INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
														des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
				VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31, @ptv_caj,@cod_ter1, @val_ant, 0, 
							@obs_orc,@bas_mov,'0','X','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

				SELECT @reg1=@reg1+1;
			END;
		END;

		-- ANTICIPOS
		IF @tip='PDA'
		BEGIN
			IF @val_ant>0
			BEGIN
				SELECT @ind_mp=ind_mp, @fec_tas=fec_tas, @tasa_doc=tasa, @ind_tas=ind_tas,@cod_caja=cod_caja  
				FROM inv_cabdoc 
				WHERE ano_doc=@ano_doc 
					AND per_doc=@per_doc 
					AND sub_tip=@sub_tip 
					AND num_doc=@num_doc;

				SELECT @ptv_otr=cod_cta FROM ptv_egresos WHERE cod_egr='00';
				SELECT @ptv_caj=cta_caj, @cod_ter=ter_caj, @ind_tes = 1 FROM inv_param_cnt WHERE llave='0';

				SELECT @obs_orc='DEVOLUCION ANT. EN PUNTO DE VENTA';

				SET @ptv_otr = ISNULL(@ptv_otr,'0');
				IF @ind_tes=1
				BEGIN
					SELECT @cod_ban=cod_ban FROM gen_cajas WHERE cod_caj=@cod_caja;
					SELECT @ptv_caj=ctactb, @cod_ter=nit FROM tes_bancos WHERE bancos=@cod_ban;
				END;

				-- Cuenta débito
				SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas 
				FROM cnt_puc 
				WHERE cod_cta=@ptv_otr;

				IF @ter IN (2,3)
				BEGIN
					SET @cod_ter1=@cod_ter;
				END;
				ELSE
				BEGIN
					SET @cod_ter1='0';
				END;

				IF @cco=1
				BEGIN
					SET @cod_cco1=@cod_cco;
				END;
				ELSE
				BEGIN
					SET @cod_cco1='0';
				END;

				IF @bas=1
				BEGIN
					SET @bas_mov=0;
				END;
				ELSE
				BEGIN
					SET @bas_mov=0;
				END;

				IF @cl1=1
				BEGIN
					SET @cod_cl11=@cod_cl1;
				END;
				ELSE
				BEGIN
					SET @cod_cl11='0';
				END;

				IF @cl2=1
				BEGIN
					SET @cod_cl21=@cod_cl2;
				END;
				ELSE
				BEGIN
					SET @cod_cl21='0';
				END;

				IF @cl3=1
				BEGIN
					SET @cod_cl31=@cod_cl3;
				END;
				ELSE
				BEGIN
					SET @cod_cl31='0';
				END;

				EXEC sp_gen_trae_tasa @ptv_otr, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				SET @reg2=CONVERT(CHAR(10),@reg1);

				INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
														des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas)
				VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31, @ptv_otr,@cod_ter1,@val_ant, 0, 
							@obs_orc,@bas_mov,'0','X','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

				SELECT @reg1=@reg1+1;

				-- Cuenta débito
				SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@ptv_caj;

				IF @ter IN (2,3)
				BEGIN
					SET @cod_ter1=@cod_ter;
				END;
				ELSE
				BEGIN
					SET @cod_ter1='0';
				END;

				IF @cco=1
				BEGIN
					SET @cod_cco1=@cod_cco;
				END;
				ELSE
				BEGIN
					SET @cod_cco1='0';
				END;

				IF @bas=1
				BEGIN
					SET @bas_mov=0;
				END;
				ELSE
				BEGIN
					SET @bas_mov=0;
				END;

				IF @cl1=1
				BEGIN
					SET @cod_cl11=@cod_cl1;
				END;
				ELSE
				BEGIN
					SET @cod_cl11='0';
				END;

				IF @cl2=1
				BEGIN
					SET @cod_cl21=@cod_cl2;
				END;
				ELSE
				BEGIN
					SET @cod_cl21='0';
				END;

				IF @cl3=1
				BEGIN
					SET @cod_cl31=@cod_cl3;
				END;
				ELSE
				BEGIN
					SET @cod_cl31='0';
				END;

				EXEC sp_gen_trae_tasa @ptv_caj, @fec_tas, @tasa OUTPUT, @ind_mp;

				IF @ind_tas='S'
				BEGIN
					SET @tasa=@tasa_doc;
				END;

				SET @reg2=CONVERT(CHAR(10),@reg1);
				INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
														des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
				VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31, @ptv_caj,@cod_ter1, 0,@val_ant,  
							@obs_orc,@bas_mov,'0','X','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

				SELECT @reg1=@reg1+1;
			END;
		END;

		SET @conta101=@conta101+1;
	END;

	---- CONTABILIZAMOS ANTICIPOS PARA COMPRAS
	IF @tip='COM'
	BEGIN

		-- CAMBIOS LA CONSULTA DE LOS VALORES DE ANTICIPOS AL CUERPO DE DOCUMENTOS DE CXP
		SELECT @ant_doc=SUM(ant_doc) FROM cxp_cuedoc WHERE ano_doc=@ano_doc AND per_doc=@per_doc AND sub_tip=@sub_tip AND num_doc=@num_doc;
		SELECT @ant_doc=ISNULL(@ant_doc,0);
		--Anticipos
		--PRINT  'ANT'
		IF @ant_doc>0
		BEGIN

			SELECT @ant_cxp=fa_ant FROM cxp_param_cnt WHERE llave='0';

			SELECT @ind_pro=ind_ter FROM cxp_param WHERE cod_par='0';

			SELECT @nit_pro=nce,@tip_pro=tip_pro
			FROM cxp_provee 
			WHERE provee=@provee;
			
			SELECT @cod_ter=@nit_pro;

			IF @ind_pro=1
			BEGIN
				SET @cod_ter=@provee;
			END;

			SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@ant_cxp;

			IF @ter IN (2,3)
				SELECT @cod_ter1=@cod_ter;
			ELSE
				SELECT @cod_ter1='0';

			IF @cco=1
				SELECT @cod_cco1=@cod_cco;
			ELSE
				SELECT @cod_cco1='0';

			IF @bas=1
				SELECT @bas_mov=0;
			ELSE
				SELECT @bas_mov=0;

			IF @cl1=1
				SELECT @cod_cl11=@cod_cl1;
			ELSE
				SELECT @cod_cl11='0';

			IF @cl2=1
				SELECT @cod_cl21=@cod_cl2;
			ELSE
				SELECT @cod_cl21='0';

			IF @cl3=1
				SELECT @cod_cl31=@cod_cl3;
			ELSE
				SELECT @cod_cl31='0';

			EXEC sp_gen_trae_tasa @ant_cxp, @fec_tas, @tasa OUTPUT, @ind_mp;

			IF @ind_tas='S'
				SELECT @tasa=@tasa_doc;

			SELECT @reg2=CONVERT(CHAR(10),@reg1);
			INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
													des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
			VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@ant_cxp ,@cod_ter1, 0, @ant_doc, 
						'CRUCE ANTICIPO/NOTAS',@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
			SELECT @reg1=@reg1+1;

			SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_cxp;

			IF @ter IN (2,3)
				SELECT @cod_ter1=@cod_ter;
			ELSE
				SELECT @cod_ter1='0';

			IF @cco=1
				SELECT @cod_cco1=@cod_cco;
			ELSE
				SELECT @cod_cco1='0';

			IF @bas=1
				SELECT @bas_mov=@pre_tot-@mon_des;
			ELSE
				SELECT @bas_mov=0;

			IF @cl1=1
				SELECT @cod_cl11=@cod_cl1;
			ELSE
				SELECT @cod_cl11='0';

			IF @cl2=1
				SELECT @cod_cl21=@cod_cl2;
			ELSE
				SELECT @cod_cl21='0';

			IF @cl3=1
				SELECT @cod_cl31=@cod_cl3;
			ELSE
				SELECT @cod_cl31='0';

			EXEC sp_gen_trae_tasa @cta_cxp, @fec_tas, @tasa OUTPUT, @ind_mp;

			IF @ind_tas='S'
				SELECT @tasa=@tasa_doc;

			SELECT @reg2=CONVERT(CHAR(10),@reg1);
			INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
													des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
			VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_cxp ,@cod_ter1, @ant_doc, 0, 
						'CRUCE ANTICIPO/NOTAS',@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
			SELECT @reg1=@reg1+1;
		END;
	END;

	---- CONTABILIZAMOS ANTICIPOS PARA DEVOLUCIONES EN COMPRAS
	IF @tip='DVC'
	BEGIN

		SELECT @ant_doc=ant_doc FROM inv_cabdoc WHERE ano_doc=@ano_doc AND per_doc=@per_doc AND sub_tip=@sub_tip AND num_doc=@num_doc;
		--Anticipos
		--PRINT  'ANT'
		IF @ant_doc>0
		BEGIN
			SELECT @ant_cxp=fa_ant FROM cxp_param_cnt WHERE llave='0';

			SELECT @ind_pro=ind_ter FROM cxp_param WHERE cod_par='0';

			SELECT @nit_pro=nce,@tip_pro=tip_pro
			FROM cxp_provee 
			WHERE provee=@provee;
			
			SELECT @cod_ter=@nit_pro;

			IF @ind_pro=1
			BEGIN
				SET @cod_ter=@provee;
			END;

			SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@ant_cxp;

			IF @ter IN (2,3)
				SELECT @cod_ter1=@cod_ter;
			ELSE
				SELECT @cod_ter1='0';

			IF @cco=1
				SELECT @cod_cco1=@cod_cco;
			ELSE
				SELECT @cod_cco1='0';

			IF @bas=1
				SELECT @bas_mov=0;
			ELSE
				SELECT @bas_mov=0;

			IF @cl1=1
				SELECT @cod_cl11=@cod_cl1;
			ELSE
				SELECT @cod_cl11='0';

			IF @cl2=1
				SELECT @cod_cl21=@cod_cl2;
			ELSE
				SELECT @cod_cl21='0';

			IF @cl3=1
				SELECT @cod_cl31=@cod_cl3;
			ELSE
				SELECT @cod_cl31='0';

			EXEC sp_gen_trae_tasa @ant_cxp, @fec_tas, @tasa OUTPUT, @ind_mp;

			IF @ind_tas='S'
				SELECT @tasa=@tasa_doc;

			SELECT @reg2=CONVERT(CHAR(10),@reg1);
			INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
													des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
			VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@ant_cxp ,@cod_ter1, @ant_doc, 0, 
						'CRUCE ANTICIPO/NOTAS',@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
			SELECT @reg1=@reg1+1

			SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_cxp;

			IF @ter IN (2,3)
				SELECT @cod_ter1=@cod_ter;
			ELSE
				SELECT @cod_ter1='0';

			IF @cco=1
				SELECT @cod_cco1=@cod_cco;
			ELSE
				SELECT @cod_cco1='0';

			IF @bas=1
				SELECT @bas_mov=@pre_tot-@mon_des;
			ELSE
				SELECT @bas_mov=0;

			IF @cl1=1
				SELECT @cod_cl11=@cod_cl1;
			ELSE
				SELECT @cod_cl11='0';

			IF @cl2=1
				SELECT @cod_cl21=@cod_cl2;
			ELSE
				SELECT @cod_cl21='0';

			IF @cl3=1
				SELECT @cod_cl31=@cod_cl3;
			ELSE
				SELECT @cod_cl31='0';

			EXEC sp_gen_trae_tasa @cta_cxp, @fec_tas, @tasa OUTPUT, @ind_mp;

			IF @ind_tas='S'
				SELECT @tasa=@tasa_doc;

			SELECT @reg2=CONVERT(CHAR(10),@reg1);
			INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
													des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
			VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_cxp ,@cod_ter1, 0, @ant_doc, 
						'CRUCE ANTICIPO/NOTAS',@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
			SELECT @reg1=@reg1+1;
		END;
	END;

	-- VENTAS
	IF @tip='VEN' AND @tip_doc<>'510'
	BEGIN
		IF @wind_cxc=1
		BEGIN
			SELECT @cta_cxc=cod_cta, @nit_cli=nit_cli FROM cxc_cliente WHERE cod_cli=@cod_ter;
			SELECT @ind_cli=ind_ter FROM cxc_param WHERE cod_par='0';

			IF @ind_cli=2
			BEGIN
				SET @cod_ter=@nit_cli;
			END;
			ELSE
			BEGIN
				SET @cod_ter=@cod_cli
			END;
		END;
		ELSE
			SELECT @cta_cxc=cue_cxc FROM inv_param_cnt WHERE llave='0';

		SELECT @ant_cxc=ant_cxc FROM inv_param_cnt WHERE llave='0';

		-- CAMBIOS LA CONSULTA DE LOS VALORES DE ANTICIPOS AL CUERPO DE DOCUMENTOS DE CXC
		SELECT @ant_doc=SUM(ant_doc) 
		FROM cxc_cuedoc 
		WHERE ano_doc=@ano_doc AND per_doc=@per_doc AND sub_tip=@sub_tip AND num_doc=@num_doc;
	
		SELECT @ant_doc=ISNULL(@ant_doc,0);

		IF @ant_doc>0
		BEGIN
			SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@ant_cxc;

			IF @ter IN (2,3)
				SELECT @cod_ter1=@cod_ter;
			ELSE
				SELECT @cod_ter1='0';

			IF @cco=1
				SELECT @cod_cco1=@cod_cco;
			ELSE
				SELECT @cod_cco1='0';

			IF @cl1=1
				SELECT @cod_cl11=@cod_cl1;
			ELSE
				SELECT @cod_cl11='0';

			IF @cl2=1
				SELECT @cod_cl21=@cod_cl2;
			ELSE
				SELECT @cod_cl21='0';

			IF @cl3=1
				SELECT @cod_cl31=@cod_cl3;
			ELSE
				SELECT @cod_cl31='0';

			SELECT @bas_mov=0;

			EXEC sp_gen_trae_tasa @ant_cxc, @fec_tas, @tasa OUTPUT, @ind_mp;

			IF @ind_tas='S'
				SELECT @tasa=@tasa_doc;

			SELECT @reg2=CONVERT(CHAR(10),@reg1);
			INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
													des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
			VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@ant_cxc ,@cod_ter1, @ant_doc, 0,
						'CRUCE ANTICIPOS/NOTAS',@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
			SELECT @reg1=@reg1+1;

			SELECT @ter=ind_ter,@cco=ind_cco,@cl1=ind_cl1,@cl2=ind_cl2,@cl3=ind_cl3,@bas=ind_bas FROM cnt_puc WHERE cod_cta=@cta_cxc;

			IF @ter IN (2,3)
				SELECT @cod_ter1=@cod_ter;
			ELSE
				SELECT @cod_ter1='0';

			IF @cco=1
				SELECT @cod_cco1=@cod_cco;
			ELSE
				SELECT @cod_cco1='0';

			IF @bas=1
				SELECT @bas_mov=@pre_tot-@mon_des;
			ELSE
				SELECT @bas_mov=0;

			IF @cl1=1
				SELECT @cod_cl11=@cod_cl1;
			ELSE
				SELECT @cod_cl11='0';

			IF @cl2=1
				SELECT @cod_cl21=@cod_cl2;
			ELSE
				SELECT @cod_cl21='0';

			IF @cl3=1
				SELECT @cod_cl31=@cod_cl3;
			ELSE
				SELECT @cod_cl31='0';

			EXEC sp_gen_trae_tasa @cta_cxc, @fec_tas, @tasa OUTPUT, @ind_mp;

			IF @ind_tas='S'
				SELECT @tasa=@tasa_doc;

			SELECT @reg2=CONVERT(CHAR(10),@reg1);
			INSERT INTO #inv_inf_con_det(ano_doc,per_doc,sub_tip,tip_doc,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,
													des_mov,bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas) 
			VALUES(@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg2,@fecha,@cod_suc,@cod_cco1,@cod_cl11,@cod_cl21,@cod_cl31,@cta_cxc ,@cod_ter1, 0, @ant_doc, 
						'CRUCE ANTICIPOS/NOTAS',@bas_mov,'0','','', @ind_mp, @fec_tas, @tasa, 0, @ind_tas);
			SELECT @reg1=@reg1+1;
		END;
	END;

	--Se insertan los registros en la tabla INV_INF_CON, agrupados por cuenta, Debitos
	DECLARE cur_docs2 CURSOR FOR
	SELECT ano_doc,per_doc,sub_tip,tip_doc,num_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,
	SUM(deb_mov),des_mov,SUM(bas_mov),num_che,ind_cos,ind_tra, ind_mr, fec_tas, tasa
	FROM #inv_inf_con_det
	WHERE deb_mov<>0
	GROUP BY ano_doc,per_doc,sub_tip,tip_doc,num_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,des_mov,num_che,ind_cos,ind_tra, ind_mr, fec_tas, tasa
	ORDER BY ano_doc,per_doc,sub_tip,tip_doc,num_doc,cod_cta;

	SELECT @doc_ant='0';
	SELECT @reg1=0;
	SELECT @reg=0;

	OPEN cur_docs2;

	FETCH NEXT FROM cur_docs2 INTO @ano,@per,@sub_tip,@tipo,@num,@fec,@suc,@ccosto,@clasif1,@clasif2,@clasif3,@cta,@tercero,
	@deb_mov,@des,@base,@che,@cos,@tra, @ind_mp, @fec_tas, @tasa;
	WHILE (@@FETCH_STATUS <> -1) 
	BEGIN
		IF @doc_ant<>@num_doc
			SELECT @reg=1;

		SELECT @regc=CONVERT(CHAR(10),@reg);

		INSERT INTO inv_inf_con (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, fch_doc, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_cta, cod_ter, 
											deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, fec_tas, tasa, ind_mod, ind_tas)
		VALUES (@ano,@per,@sub_tip,@tipo,@num,@regc,@fec,@suc,@ccosto,@clasif1,@clasif2,@clasif3,@cta,@tercero,
					@deb_mov,0,@des,@base,@che,@cos,@tra, @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

		SELECT @reg=@reg+1;

		SELECT @doc_ant=@num_doc;

		FETCH NEXT FROM cur_docs2 INTO @ano,@per,@sub_tip,@tipo,@num,@fec,@suc,@ccosto,@clasif1,@clasif2,@clasif3,@cta,@tercero,
		@deb_mov,@des,@base,@che,@cos,@tra, @ind_mp, @fec_tas, @tasa;
	END;

	CLOSE cur_docs2;
	DEALLOCATE cur_docs2;

	DECLARE cur_docs3 CURSOR FOR
	SELECT ano_doc,per_doc,sub_tip,tip_doc,num_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,
	SUM(cre_mov),des_mov,SUM(bas_mov),num_che,ind_cos,ind_tra, ind_mr, fec_tas, tasa
	FROM #inv_inf_con_det
	WHERE cre_mov<>0
	GROUP BY ano_doc,per_doc,sub_tip,tip_doc,num_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,
	des_mov,num_che,ind_cos,ind_tra, ind_mr, fec_tas, tasa
	ORDER BY ano_doc,per_doc,sub_tip,tip_doc,num_doc,cod_cta;

	SELECT @doc_ant='0';

	SELECT @reg=@reg+1;

	OPEN cur_docs3;

	FETCH NEXT FROM cur_docs3 INTO @ano,@per,@sub_tip,@tipo,@num,@fec,@suc,@ccosto,@clasif1,@clasif2,@clasif3,@cta,@tercero,
	@cre_mov,@des,@base,@che,@cos,@tra, @ind_mp, @fec_tas, @tasa;

	WHILE (@@FETCH_STATUS <> -1) 
	BEGIN
		IF @doc_ant<>@num_doc
		BEGIN
			SELECT @reg=MAX(CONVERT(SMALLINT,reg_doc)) FROM inv_inf_con WHERE ano_doc=@ano AND per_doc=@per AND sub_tip=@sub_tip AND num_doc=@num;
			SELECT @reg=ISNULL(@reg,0);
			SELECT @reg=@reg+1;
		END;

		SELECT @regc=CONVERT(CHAR(10),@reg);

		INSERT INTO inv_inf_con (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, fch_doc, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_cta, cod_ter, 
										deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, fec_tas, tasa, ind_mod,ind_tas)
		VALUES (@ano,@per,@sub_tip,@tipo,@num,@regc,@fec,@suc,@ccosto,@clasif1,@clasif2,@clasif3,@cta,@tercero,
					0,@cre_mov,@des,@base,@che,@cos,@tra, @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

		SELECT @reg=@reg+1;

		SELECT @doc_ant=@num_doc;
	
		FETCH NEXT FROM cur_docs3 INTO @ano,@per,@sub_tip,@tipo,@num,@fec,@suc,@ccosto,@clasif1,@clasif2,@clasif3,@cta,@tercero,
		@cre_mov,@des,@base,@che,@cos,@tra, @ind_mp, @fec_tas, @tasa;
	END;

	CLOSE cur_docs3;
	DEALLOCATE cur_docs3;

	DROP TABLE #inv_inf_con_det;

	--  VALIDAMOS EL CUADRE DEL DOCUMENTO
	SELECT @max_aju=max_aju,@aju_deb=aju_deb,@aju_cre=aju_cre,@aju_suc=aju_suc,@aju_cco=aju_cco,
	@aju_cl1=aju_cl1,@aju_cl2=aju_cl2,@aju_cl3=aju_cl3,@aju_ter=aju_ter
	FROM cnt_cuadre_tipos 
	WHERE cod_tip=@tip_doc AND tip_mon=@ind_mp;

	IF @@ROWCOUNT>0
	BEGIN
		SELECT @tot_deb=SUM(deb_mov), @tot_cre=SUM(cre_mov), @max_reg=MAX(CONVERT(SMALLINT,reg_doc)) 
		FROM inv_inf_con 
		WHERE ano_doc=@ano_doc AND per_doc=@per_doc AND sub_tip=@sub_tip AND num_doc=@num_doc;

		IF (@tot_deb-@tot_cre) BETWEEN @max_aju*-1 AND @max_aju AND @tot_deb<>@tot_cre
		BEGIN
			IF @tot_deb<@tot_cre
				INSERT INTO inv_inf_con (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, fch_doc, cod_cta, cod_suc, 
													cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, 
													ind_tra, ind_mr, fec_tas, tasa)
				VALUES (@ano_doc, @per_doc, @sub_tip, @tip_doc, @num_doc, CONVERT(CHAR,@max_reg+1), 
							@fecha, @aju_deb, @aju_suc, @aju_cco, @aju_cl1, @aju_cl2, @aju_cl3, @aju_ter, ABS(@tot_deb-@tot_cre), 0, 
							'REGISTRO DE CUADRE X REDONDEO', 0, '', '', '', @ind_mp, @fec_tas, @tasa);
			ELSE
				INSERT INTO inv_inf_con (ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, fch_doc, cod_cta, cod_suc, 
													cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, 
													ind_tra, ind_mr, fec_tas, tasa)
				VALUES (@ano_doc, @per_doc, @sub_tip, @tip_doc, @num_doc, CONVERT(CHAR,@max_reg+1), 
							@fecha, @aju_cre, @aju_suc, @aju_cco, @aju_cl1, @aju_cl2, @aju_cl3, @aju_ter, 0, ABS(@tot_deb-@tot_cre), 
							'REGISTRO DE CUADRE X REDONDEO', 0, '', '', '', @ind_mp, @fec_tas, @tasa);
		END;
	END;
END;

```
