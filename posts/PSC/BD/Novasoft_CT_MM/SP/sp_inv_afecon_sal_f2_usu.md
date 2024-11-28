# Stored Procedure: sp_inv_afecon_sal_f2_usu

## Usa los objetos:
- [[cxc_cliente]]
- [[cxp_provee]]
- [[gen_decapl]]
- [[gen_subtipodoc]]
- [[inv_cabdoc]]
- [[inv_conceptos]]
- [[inv_cuedoc]]
- [[inv_distctas_escosto]]
- [[inv_items]]
- [[inv_param_cnt]]
- [[nif_puc]]
- [[sis_empresa]]
- [[sp_inv_nif_reg]]

```sql

/*2013/11/28 Ramiro: Se crea para implementacion NIIF
SE ADECUA A LA VERSION WEB
JSARMIENTO JUNIO/2014 SRS: 2014-0188
SE ASIGNA LA CUENTA DE COSTO SI COINCIDE CON LA TABLA DE DISTRIBUCION DE ESTRUCTURA DE COSTO
JSARMIENTO NOVIEMBRE/2016 SPR2016-0012
SE CONSULTA LA CUENTA DE DISTRIBUCION DE ESTRUCTURA DE COSTOS DE ACUERDO AL NIVEL DE PARAMETROS GENERALES
JSARMIENTO DICIEMBRE/2016 SNR2016-0056
SE AGREGA DESCRIPCION AL MOVIMIENTO CONTABLE DE SALIDAS
JSARMIENTO SEPTIEMBRE/2017 SRS2017-1054*/
CREATE PROCEDURE [dbo].[sp_inv_afecon_sal_f2_usu]
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
	DECLARE @item			VARCHAR(40);
	DECLARE @pre_tot		MONEY;
	DECLARE @prt_ext		MONEY;
	DECLARE @cot_ext		MONEY;
	DECLARE @mon_des	MONEY;
	DECLARE @cos_toa	MONEY;
	DECLARE @bas_mov	MONEY;
	DECLARE @cod_cl1		VARCHAR(12);
	DECLARE @cod_cl2		VARCHAR(12);
	DECLARE @cod_cl3		VARCHAR(12);
	DECLARE @cod_ter		CHAR(15);
	DECLARE @cod_suc	CHAR(3);
	DECLARE @cod_cco	CHAR(10);
	DECLARE @provee		CHAR(15);
	DECLARE @obs_orc	VARCHAR(70);
	DECLARE @tip_doc		CHAR(3);

	--VARIABLES MULTIMONEDA
	DECLARE @ind_mp		CHAR(2);
	DECLARE @fec_tas		DATETIME;
	DECLARE @des_ext	MONEY;
	DECLARE @tasa_doc	MONEY;
	DECLARE @ind_tas		CHAR(1);

	--REDONDEO DE DECIMALES
	DECLARE @num_dec	SMALLINT;

	DECLARE @cod_cta	CHAR(16),
				@cod_con		CHAR(3);
	DECLARE @ter_cia		CHAR(15);
	DECLARE @ter_cab		CHAR(15);
			
	DECLARE @val_tot	MONEY;		

	DECLARE @ind_afe	CHAR(3);				

	DECLARE @docs TABLE(item		VARCHAR(40) COLLATE DATABASE_DEFAULT,
									cod_cco		CHAR(10) COLLATE DATABASE_DEFAULT,
									cod_cl1		VARCHAR(12) COLLATE DATABASE_DEFAULT,
									cod_cl2		VARCHAR(12) COLLATE DATABASE_DEFAULT,
									cod_cl3		VARCHAR(12) COLLATE DATABASE_DEFAULT,
									pre_tot		MONEY,
									mon_des	MONEY,
									cos_toa		MONEY,
									des_ext		MONEY,
									ind_afe		CHAR(3) COLLATE DATABASE_DEFAULT,
									prt_ext		MONEY,
									cot_ext		MONEY,
									cod_gru		CHAR(3) COLLATE DATABASE_DEFAULT,
									recno			INT PRIMARY KEY IDENTITY);

	DECLARE @conteo1	INT;
	DECLARE @conteo2	INT;
	
	--	SPR2016-0012
	DECLARE @dcta_costo	CHAR(16);
	DECLARE @cod_grupo	CHAR(3);
	
	-- SNR2016-0056
	DECLARE @niv_dist			TINYINT;

	--	SRS2017-1054
	DECLARE @obs_inv	VARCHAR(70);
	DECLARE @obs_cto	VARCHAR(70);
								
	SET NOCOUNT ON

	BEGIN
		SELECT @niv_dist = niv_asig_dist
		FROM inv_param_cnt
		WHERE llave = '0';

		-- leemos el tercero para los documentos 011 y 111
		SELECT @ter_cia = SUBSTRING(RTRIM(REPLACE(REPLACE(emp_nit,'.',''),'-','')),1,15) 
		FROM sis_empresa;

		SELECT @tip_doc=cod_tip 
		FROM gen_subtipodoc 
		WHERE cod_sub=@sub_tip;

		SELECT @cod_ter= cliente ,@cod_suc=cod_suc, @ind_mp=ind_mp, @fec_tas=fec_tas, @obs_orc=SUBSTRING(obs_orc,1,70), @tasa_doc=tasa, @ind_tas=ind_tas,@fecha=fecha, @cod_con=cod_con,
					@provee=provee,@ter_cab=cod_ter
		FROM inv_cabdoc  
		WHERE  ano_doc=@ano_doc 
			AND per_doc=@per_doc 
			AND sub_tip=@sub_tip 
			AND num_doc=@num_doc;

		-- TRAEMOS NUMERO DE DECIMALES PARA REDONDEAR LOS VALORES ANTES DE SUBIRLOS A CONTABILIDAD E INDICADOR DE TESORERIA
		SELECT @num_dec=dec_int FROM gen_decapl 
		WHERE cod_apl='INV' 
			AND tip_mon=@ind_mp;

		INSERT INTO @docs (item,cod_cco,cod_cl1,cod_cl2,cod_cl3,pre_tot,mon_des,cos_toa,des_ext,ind_afe,prt_ext,cot_ext,cod_gru)
		SELECT item,cue.cod_cco,cue.cod_cl1,cue.cod_cl2,cue.cod_cl3,SUM(pre_tot),SUM(mon_des),SUM(cue.cos_toa),SUM(cue.des_ext), ISNULL(cue.ind_afe,'0'),
		SUM(cue.prt_ext),SUM(cue.cot_ext),ite.cod_grupo
		FROM inv_cuedoc AS cue 
			INNER JOIN inv_cabdoc AS cab ON cab.ano_doc=cue.ano_doc AND cab.per_doc=cue.per_doc AND cab.sub_tip=cue.sub_tip AND cab.num_doc=cue.num_doc 
			INNER JOIN inv_items AS ite ON ite.cod_item = cue.item
		WHERE  cab.ano_doc=@ano_doc 
			AND cab.per_doc=@per_doc 
			AND cab.sub_tip=@sub_tip 
			AND cab.num_doc=@num_doc
		GROUP BY cue.item,ite.cod_grupo,cab.cod_suc,cue.cod_cco,cab.cliente,cab.provee,cue.cod_cl1,cue.cod_cl2,cue.cod_cl3,cue.ind_afe,cue.prt_ext;

		SELECT @conteo1= COUNT(1) 
		FROM @docs;

		SET @conteo1 = ISNULL(@conteo1,0);

		SET @conteo2 = 1;

		WHILE @conteo2 <= @conteo1 
		BEGIN
			SELECT	@item=item,@cod_cco=cod_cco,@cod_cl1=cod_cl1,@cod_cl2=cod_cl2,@cod_cl3=cod_cl3,@pre_tot=pre_tot,@mon_des=mon_des,
						@cos_toa=cos_toa,@des_ext=des_ext, @ind_afe=ind_afe,@prt_ext=prt_ext,@cot_ext=cot_ext,@cod_grupo=cod_gru
			FROM @docs
			WHERE recno=@conteo2;

			SET @pre_tot=ROUND(@pre_tot,@num_dec);
			SET @mon_des=ROUND(@mon_des,@num_dec);
			SET @cos_toa=ROUND(@cos_toa,@num_dec);
			
			IF @ind_mp BETWEEN '01' AND '98'
				BEGIN 
					SET @pre_tot=ROUND(@prt_ext,@num_dec);
					SET @cos_toa=ROUND(@cot_ext,@num_dec);
					SET @mon_des=ROUND(@des_ext,@num_dec);
				END;
			
			-- SE ASIGNAN CUENTAS DE DISTRIBUCION POR ESTRUCTURA DE COSTOS
			IF @niv_dist = 5
			BEGIN
				SELECT @dcta_costo=ncta_costo
				FROM inv_distctas_escosto
				WHERE tip_mon = @ind_mp
					AND cod_gru = @cod_grupo
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
						AND cod_gru = @cod_grupo
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
							AND cod_gru = @cod_grupo
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
								AND cod_gru = @cod_grupo
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
									AND cod_gru = @cod_grupo
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

			IF @cos_toa>0
			BEGIN	
				IF @tip_doc ='006'
				BEGIN
					SELECT @cod_ter= nit_cli 
					FROM cxc_cliente 
					WHERE cod_cli = @cod_ter;
				END;

				--- CAMBIO PARA TOMAR TERCERO EL NIT D PROVEEDOR(DEVOLUCIÓN DESPACHO) RAMIRO 29/08/2012	
				IF @tip_doc ='002'
				BEGIN
					SELECT @cod_ter= nce 
					FROM cxp_provee 
					WHERE provee = @provee;	
				END;

				IF  (@cod_ter ='0' OR @cod_ter IS NULL)
				BEGIN
					SET @cod_ter = @ter_cab;
				END
		
				SELECT @inv_ven=n_inv_ven,@cos_ven=n_cos_ven 
				FROM inv_items 
				WHERE cod_item=@item;

				IF @dcta_costo <> '0'
				BEGIN
					SET @cos_ven = @dcta_costo;
				END;

				IF @tip_doc = '002'
				BEGIN
					SELECT @inv_ven=n_inv_com,@cos_ven= n_sal_con 
					FROM inv_items 
					WHERE cod_item=@item;
				END;

				IF @cod_con <> '0'
				BEGIN
					SELECT @cod_cta = cod_cta 
					FROM inv_conceptos 
					WHERE cod_con = @cod_con;

					IF EXISTS(SELECT cod_cta FROM nif_puc WHERE cod_cta=@cod_cta AND cod_cta <> '0')
					BEGIN
						SET @cos_ven = @cod_cta;
					END;
				END;

				--Inventarios
				SET @bas_mov=@pre_tot-@mon_des;

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
		
				EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@inv_ven, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
				@cod_ter, @cos_toa, @obs_inv, @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'C';

				IF @tip_doc <> '003'
				BEGIN 
					--Costo
					EXEC sp_inv_nif_reg @ano_doc,@per_doc,@sub_tip,@num_doc,@fecha,@cos_ven, @cod_suc,@cod_cco,@cod_cl1,@cod_cl2,@cod_cl3,
					@cod_ter, @cos_toa, @obs_cto, @bas_mov ,'', @ind_mp, @fec_tas, @tasa_doc, @ind_tas,'D';
				END;	
			END;

			SET @conteo2 = @conteo2 +1;
		END;
	END;
END;

```
