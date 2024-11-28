# Stored Procedure: sp_inv_afecon_ent_f2_usu

## Usa los objetos:
- [[cxc_cliente]]
- [[cxp_provee]]
- [[gen_decapl]]
- [[gen_subtipodoc]]
- [[inv_cabdoc]]
- [[inv_cuedoc]]
- [[inv_distctas_escosto]]
- [[inv_items]]
- [[inv_param_cnt]]
- [[sis_empresa]]
- [[sp_inv_nif_reg]]

```sql

/*2013/11/28 Ramiro: Se crea para implementaciòn NIIF
2014/05/12 Ramiro: Descuentos por volumen NIIF
SE ADECUA A LA VERSION WEB
JSARMIENTO JUNIO/2014 SRS: 2014-0188
SE CORRIGE EL CALCULO DE COSTO PARA LOS DESPACHOS DE COMPRAS
JSARMIENTO FEBRERO/2015 SRS: 2015-0066
SE CALCULA EL COSTO CUANDO LA MONEDA ES EXTRANJERA
JSARMIENTO OCTUBRE/2015 SRS: 2015-0781
SE ASIGNA LA CUENTA DE COSTO SI COINCIDE CON LA TABLA DE DISTRIBUCION DE ESTRUCTURA DE COSTO
JSARMIENTO NOVIEMBRE/2016 SPR2016-0012
SE CONSULTA LA CUENTA DE DISTRIBUCION DE ESTRUCTURA DE COSTOS DE ACUERDO AL NIVEL DE PARAMETROS GENERALES
JSARMIENTO DICIEMBRE/2016 SNR2016-0056
SE AGREGA DESCRIPCION AL MOVIMIENTO CONTABLE DE ENTRADAS
JSARMIENTO SEPTIEMBRE/2017 SRS2017-1054*/
CREATE PROCEDURE [dbo].[sp_inv_afecon_ent_f2_usu]
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

	--DOCUMENTOS
	DECLARE @item				VARCHAR(40);
	DECLARE @pre_tot			MONEY;
	DECLARE @prt_ext			MONEY;
	DECLARE @cot_ext			MONEY;
	DECLARE @mon_des		MONEY;
	DECLARE @mon_iva		MONEY;
	DECLARE @mon_iva_ng	MONEY;
	DECLARE @cos_tot			MONEY;
	DECLARE @cos_toa		MONEY;
	DECLARE @bas_mov		MONEY;
	DECLARE @cod_cl1			VARCHAR(12);
	DECLARE @cod_cl2			VARCHAR(12);
	DECLARE @cod_cl3			VARCHAR(12);
	DECLARE @cod_ter			CHAR(15);
	DECLARE @cod_suc		CHAR(3);
	DECLARE @cod_cco		CHAR(10);
	DECLARE @cod_cco1		CHAR(10);
	DECLARE @provee			CHAR(15);
	DECLARE @obs_orc		VARCHAR(70);
	DECLARE @ind_cons		CHAR(1);
	DECLARE @tip_doc			CHAR(3);
	DECLARE	@suc_cnt		CHAR(3);
	DECLARE @cod_cli			CHAR(15);	

	--VARIABLES MULTIMONEDA
	DECLARE @ind_mp		CHAR(2);
	DECLARE @fec_tas		DATETIME;
	DECLARE @des_ext	MONEY;
	DECLARE @tasa_doc	MONEY;
	DECLARE @ind_tas		CHAR(1);

	--REDONDEO DE DECIMALES
	DECLARE @num_dec	SMALLINT;

	DECLARE @cod_con	CHAR(3);
	DECLARE @ter_cia		CHAR(15);
			
	DECLARE	@suc_des	CHAR(3);

	DECLARE @ind_afe	CHAR(3);
				
	-- ESTRUCTURA DE COSTOS DESTINO EN TRASLADOS(TIPO 003)				
	DECLARE	@cco_des	CHAR(10),
			@cl1_des			VARCHAR(12),	
			@cl2_des			VARCHAR(12),
			@cl3_des			VARCHAR(12);
		
	DECLARE	@cl1_cnt	VARCHAR(12),	
			@cl2_cnt			VARCHAR(12),
			@cl3_cnt			VARCHAR(12);
	
	DECLARE	@val_tcd	MONEY,	
			@val_fin			MONEY;
	
	DECLARE @docs TABLE (suc_des		CHAR(3) COLLATE DATABASE_DEFAULT,
									 item				VARCHAR(40) COLLATE DATABASE_DEFAULT,
									 cco_des		CHAR(3) COLLATE DATABASE_DEFAULT,
									 cl1_des			VARCHAR(12) COLLATE DATABASE_DEFAULT,
									 cl2_des			VARCHAR(12) COLLATE DATABASE_DEFAULT,
									 cl3_des			VARCHAR(12) COLLATE DATABASE_DEFAULT,
									 cod_cco		CHAR(10) COLLATE DATABASE_DEFAULT,
									 cod_cl1			VARCHAR(12) COLLATE DATABASE_DEFAULT,
									 cod_cl2			VARCHAR(12) COLLATE DATABASE_DEFAULT,
									 cod_cl3			VARCHAR(12) COLLATE DATABASE_DEFAULT,
									 pre_tot			MONEY,
									 mon_des		MONEY,
									 mon_iva		MONEY,
									 mon_iva_ng	MONEY,
									 cos_tot			MONEY,
									 cos_toa		MONEY,
									 des_ext		MONEY,
									 ind_afe			CHAR(3) COLLATE DATABASE_DEFAULT,
									 prt_ext			MONEY,
									 cot_ext			MONEY,
									 val_tcd			MONEY,
									 provee			CHAR(15) COLLATE DATABASE_DEFAULT,
									 cod_cli			CHAR(15) COLLATE DATABASE_DEFAULT,
									 cod_ter			CHAR(15) COLLATE DATABASE_DEFAULT,
									 cod_gru		CHAR(3) COLLATE DATABASE_DEFAULT,
									 recno			INT PRIMARY KEY IDENTITY
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

	-- Se consulta el tipo de documento
	SELECT @tip_doc=cod_tip 
	FROM gen_subtipodoc 
	WHERE cod_sub=@sub_tip;

	-- leemos el tercero para los documentos 011 y 111
	SELECT @ter_cia = REPLACE(REPLACE(SUBSTRING(RTRIM(emp_nit),1,15),'.',''),'-','') 
	FROM sis_empresa;

	SELECT @cod_suc=cod_suc,@ind_mp=ind_mp, @fec_tas=fec_tas, @obs_orc=SUBSTRING(obs_orc,1,70), @tasa_doc=tasa, @ind_tas=ind_tas,@fecha=fecha, @cod_con=cod_con
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

	INSERT INTO @docs(suc_des,item,cco_des,cl1_des,cl2_des,cl3_des,cod_cco,cod_cl1,cod_cl2,cod_cl3,pre_tot,mon_des,mon_iva,mon_iva_ng,cos_tot,cos_toa,
								des_ext,ind_afe,prt_ext,cot_ext,val_tcd,provee,cod_cli,cod_ter,cod_gru)
	SELECT cue.suc_des,item,cue.cco_des,cue.cl1_des,cue.cl2_des,cue.cl3_des,cue.cod_cco,cue.cod_cl1,cue.cod_cl2,cue.cod_cl3,
			SUM(pre_tot),SUM(mon_des),SUM(mon_iva),SUM(mon_iva_ng),SUM(cue.cos_tot),SUM(cue.cos_toa),
			SUM(cue.des_ext), ISNULL(cue.ind_afe,'0'),SUM(cue.prt_ext),SUM(cue.cot_ext),SUM(cue.val_tcd),cab.provee,cab.cliente,cab.cod_ter,ite.cod_grupo
	FROM inv_cuedoc AS cue 
		INNER JOIN inv_cabdoc AS cab ON cab.ano_doc=cue.ano_doc AND cab.per_doc=cue.per_doc AND cab.sub_tip=cue.sub_tip AND cab.num_doc=cue.num_doc 
		INNER JOIN inv_items AS ite ON ite.cod_item=cue.item
	WHERE  cab.ano_doc=@ano_doc 
			AND cab.per_doc=@per_doc 
			AND cab.sub_tip=@sub_tip 
			AND cab.num_doc=@num_doc
	GROUP BY cue.suc_des,cue.item,ite.cod_grupo,cab.cod_suc,cue.cod_cco,cab.cliente,cab.provee,cue.cod_cl1,cue.cod_cl2,cue.cod_cl3,cab.provee, cue.ind_afe,cue.prt_ext,
	cue.cco_des,cue.cl1_des,cue.cl2_des,cue.cl3_des,cue.cod_cco,cue.cod_cl1,cue.cod_cl2,cue.cod_cl3,cab.cod_ter;

	SELECT @conteo1 = COUNT(1) FROM @docs;
	SET @conteo1 = ISNULL(@conteo1,0);

	SET @conteo2 = 1;

	WHILE @conteo2 <= @conteo1
	BEGIN
		SELECT @suc_des=suc_des,@item=item, @cco_des=cco_des,@cl1_des=cl1_des,@cl2_des=cl2_des,@cl3_des=cl3_des,@cod_cco=cod_cco,@cod_cl1=cod_cl1,@cod_cl2=cod_cl2,
					@cod_cl3=cod_cl3,@pre_tot=pre_tot,@mon_des=mon_des,@mon_iva=mon_iva,@mon_iva_ng=mon_iva_ng,@cos_toa=cos_toa,@des_ext=des_ext, @ind_afe=ind_afe,
					@prt_ext=prt_ext,@cot_ext=cot_ext,@val_tcd=val_tcd,@provee=provee,@cos_tot=cos_tot,@cod_ter=cod_ter,@cod_cli=cod_cli,@cod_gru=cod_gru
		FROM @docs
		WHERE recno=@conteo2;

		-- REDONDEAMOS VALORES A CONTABILIZAR SEGUN PARAMETRO DEL MAESTRO
		IF @ind_mp IN ('00','99')
		BEGIN
			SET @pre_tot=ROUND(@pre_tot,@num_dec);
			SET @mon_des=ROUND(@mon_des,@num_dec);
			SET @mon_iva=ROUND(@mon_iva,@num_dec);
			SET @mon_iva_ng=ROUND(@mon_iva_ng,@num_dec);
			SET @cos_toa=ROUND(@cos_toa,@num_dec);
			SET @val_tcd=ROUND(@val_tcd,@num_dec);
			SET @cos_tot=ROUND(@cos_tot,@num_dec);
		END;
		ELSE
		BEGIN
			SET @pre_tot=ROUND(@prt_ext,@num_dec);
			SET @cos_toa=ROUND(@cot_ext,@num_dec);
			SET @mon_des=ROUND(@des_ext,@num_dec);
			SET @cos_tot=ROUND(@cot_ext,@num_dec);
		END;

		BEGIN
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

			--- FINANCIACIÓN
			SET @val_fin=0;

			IF @val_tcd <> @cos_tot AND @val_tcd < @cos_tot AND @val_tcd > 0
				SET @val_fin=@cos_tot-@val_tcd;

			IF @tip_doc IN ('001','008')
			BEGIN
				IF @ind_mp IN ('00','99')
				BEGIN
					SET @cos_toa = @val_tcd;
				END;
				ELSE
				BEGIN
					SET @cos_toa = @val_tcd/@tasa_doc;
				END;
			END;
			
			IF @cos_toa>0
			BEGIN
				IF @provee <> '0' AND @provee IS NOT NULL
				BEGIN
					SELECT @cod_ter= nce FROM cxp_provee  WHERE provee=@provee;
				END;	
				
				IF @cod_cli <> '0' AND @cod_cli IS NOT NULL
				BEGIN
					SELECT @cod_ter= nit_cli FROM cxc_cliente  WHERE cod_cli=@cod_cli;
				END;
				
				SET @cod_ter = ISNULL(@cod_ter,'0');

				SELECT @inv_ven=n_inv_com,@cos_ven= CASE @tip_doc WHEN '008' THEN n_sal_con ELSE n_cos_com END 
				FROM inv_items 
				WHERE cod_item=@item;
			
				SET @pre_tot = @pre_tot - @val_fin;

				--Inventarios
				IF @tip_doc = '003'
				BEGIN
					SET @suc_cnt =@suc_des;
					SET @cod_cco1=@cco_des;
					SET @cl1_cnt =@cl1_des;
					SET @cl2_cnt =@cl2_des;
					SET @cl3_cnt =@cl3_des;
				END;	
				ELSE
				BEGIN
					SET @suc_cnt = @cod_suc;
					SET @cod_cco1=@cod_cco;
					SET @cl1_cnt =@cod_cl1;
					SET @cl2_cnt =@cod_cl2;
					SET @cl3_cnt =@cod_cl3;
				END;

				SET @bas_mov=@pre_tot-@mon_des;

				IF @dcta_costo <> '0'  AND @tip_doc<> '008'
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

				EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@inv_ven, @suc_cnt,@cod_cco1,@cl1_cnt,@cl2_cnt,@cl3_cnt,
				@cod_ter, @cos_toa, @obs_inv, @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';

				IF @tip_doc<>'003'
				BEGIN
					--Costo
					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cos_ven, @cod_suc,@cod_cco1,@cl1_cnt,@cl2_cnt,@cl3_cnt,
					@cod_ter, @cos_toa, @obs_cto, @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';
				END;	
			END;
		END;
		
		SET @conteo2 = @conteo2 + 1;
	END;
END;

```
