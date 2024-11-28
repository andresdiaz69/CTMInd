# Stored Procedure: sp_inv_afecon_niif_usu

## Usa los objetos:
- [[gen_decapl]]
- [[gen_subtipodoc]]
- [[inv_cabdoc]]
- [[inv_inf_nif]]
- [[nif_cuadre_tipos]]

```sql

/* SE REALIZA EL ENVÍO DEL TIPO DE DOCUMENTO EN LA INSERCION DE INFORMACION CONTABLE
JSARMIENTO OCTUBRE/2015 SRS: 2015-0803
SE REALIZA LA HOMOLOGACION DE ERRORES PARA ENTERPRISE WEB
JSARMIENTO FEBRERO/2017 SNR2017-0033
SE VALIDA LA NULIDAD DE VARIABLE DE REDONDEO DE APLICACION
JSARMIENTO OCTUBRE/2017 PAQ ACTUALIZACION 3.2.1*/
CREATE PROCEDURE [dbo].[sp_inv_afecon_niif_usu]
	@ano_doc	CHAR(4),
	@per_doc	CHAR(2),
	@sub_tip	CHAR(5),
	@num_doc	CHAR(14),
	@fecha		DATETIME,
	@tip		CHAR(3)  --Parametro de tipo de contabilizacion

AS
BEGIN
	DECLARE @reg		SMALLINT;
	DECLARE @reg1	SMALLINT;

	DECLARE @doc_ant	CHAR(14);
	DECLARE @tip_doc	CHAR(3);
	DECLARE @fec			DATETIME;
	DECLARE @suc			CHAR(3);
	DECLARE @ccosto	CHAR(10);
	DECLARE @cl1			VARCHAR(12);
	DECLARE @cl2			VARCHAR(12);
	DECLARE @cl3			VARCHAR(12);
	DECLARE @cta			CHAR(16);
	DECLARE @tercero	CHAR(15);
	DECLARE @deb_mov	MONEY;
	DECLARE @cre_mov	MONEY;
	DECLARE @des			VARCHAR(70);
	DECLARE @base		MONEY;
	DECLARE @che		CHAR(10);
	DECLARE @cos			CHAR(1);
	DECLARE @tra			CHAR(1);

	--VARIABLES MULTIMONEDA
	DECLARE @ind_mp	CHAR(2);
	DECLARE @fec_tas	DATETIME;
	DECLARE @tasa		MONEY;
	DECLARE @ind_tas	CHAR(1);

	----VARIABLES CUADRE DE DOCUMENTO
	DECLARE @tot_deb	MONEY;
	DECLARE @tot_cre	MONEY;
	DECLARE @max_aju	MONEY;
	DECLARE @aju_deb	CHAR(16);
	DECLARE @aju_cre	CHAR(16);
	DECLARE @aju_suc	CHAR(3);
	DECLARE @aju_cco	CHAR(10);
	DECLARE @aju_cl1	CHAR(16);
	DECLARE @aju_cl2	CHAR(16);
	DECLARE @aju_cl3	CHAR(16);
	DECLARE @aju_ter	CHAR(15);
	DECLARE @max_reg	SMALLINT;

	--REDONDEO DE DECIMALES
	DECLARE @num_dec	SMALLINT;

	DECLARE @cad		VARCHAR(500),
			@mensaje		VARCHAR(500),
			@error			VARCHAR(100);

	DECLARE @afecon_deb TABLE (	fecha		DATETIME,
											   cod_suc	CHAR(3) COLLATE DATABASE_DEFAULT,
											   cod_cco	CHAR(10) COLLATE DATABASE_DEFAULT,
											   cod_cl1	VARCHAR(12) COLLATE DATABASE_DEFAULT,
											   cod_cl2	VARCHAR(12) COLLATE DATABASE_DEFAULT,
											   cod_cl3	VARCHAR(12) COLLATE DATABASE_DEFAULT,
											   cod_cta	CHAR(16) COLLATE DATABASE_DEFAULT,
											   cod_ter	CHAR(15) COLLATE DATABASE_DEFAULT,
											   deb_mov	MONEY,
											   des_mov	CHAR(70) COLLATE DATABASE_DEFAULT,
											   bas_mov	MONEY,
											   num_che	CHAR(10) COLLATE DATABASE_DEFAULT,
											   ind_cos	CHAR(1) COLLATE DATABASE_DEFAULT,
											   ind_tra	CHAR(1) COLLATE DATABASE_DEFAULT,
											   fec_tas	DATETIME,
											   tasa		MONEY,
											   ind_tas	CHAR(1) COLLATE DATABASE_DEFAULT,
											   recno		INT PRIMARY KEY IDENTITY);

	DECLARE @afecon_cre TABLE (	fecha		DATETIME,
											   cod_suc	CHAR(3) COLLATE DATABASE_DEFAULT,
											   cod_cco	CHAR(10) COLLATE DATABASE_DEFAULT,
											   cod_cl1	VARCHAR(12) COLLATE DATABASE_DEFAULT,
											   cod_cl2	VARCHAR(12) COLLATE DATABASE_DEFAULT,
											   cod_cl3	VARCHAR(12) COLLATE DATABASE_DEFAULT,
											   cod_cta	CHAR(16) COLLATE DATABASE_DEFAULT,
											   cod_ter	CHAR(15) COLLATE DATABASE_DEFAULT,
											   cre_mov	MONEY,
											   des_mov	CHAR(70) COLLATE DATABASE_DEFAULT,
											   bas_mov	MONEY,
											   num_che	CHAR(10) COLLATE DATABASE_DEFAULT,
											   ind_cos	CHAR(1) COLLATE DATABASE_DEFAULT,
											   ind_tra	CHAR(1) COLLATE DATABASE_DEFAULT,
											   fec_tas	DATETIME,
											   tasa		MONEY,
											   ind_tas	CHAR(1) COLLATE DATABASE_DEFAULT,
											   recno		INT PRIMARY KEY IDENTITY);

	DECLARE @conteo1	INT;
	DECLARE @conteo2	INT;
							
	SET NOCOUNT ON;

	IF @tip IS NULL
	BEGIN
		RETURN;
	END

	-- VALIDACIÓN CONTABILIZACIÓN ANTERIOR
	IF EXISTS(SELECT ind_tra FROM inv_inf_nif WHERE ano_doc=@ano_doc AND per_doc=@per_doc AND sub_tip=@sub_tip AND num_doc=@num_doc AND ind_tra='X')
	BEGIN
		RETURN;
	END;

	SELECT	ano_doc,per_doc,tip_doc,sub_tip,num_doc,reg_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,deb_mov,cre_mov,des_mov,
				bas_mov,num_che,ind_cos,ind_tra,ind_mr,fec_tas,tasa,ind_mod,ind_tas 
	INTO #inv_inf_nif_det 
	FROM inv_inf_nif 
	WHERE ano_doc='XXXX';

	SELECT @tip_doc = cod_tip 
	FROM gen_subtipodoc 
	WHERE cod_sub=@sub_tip;

	--	SE CONSULTA PARAMETRO DE TIPO DE AFECTACION
	BEGIN TRY;
		BEGIN TRANSACTION;
			DELETE FROM inv_inf_nif 
			WHERE ano_doc=@ano_doc 
				AND per_doc=@per_doc 
				AND sub_tip=@sub_tip 
				AND num_doc=@num_doc;

			IF @tip <> 'TRA'
			BEGIN
				SET @cad='SP_inv_afecon_'+@tip+'_f2_usu '+QUOTENAME(@ano_doc,CHAR(39))+','+QUOTENAME(@per_doc,CHAR(39))+','+QUOTENAME(@sub_tip,CHAR(39));
				SET @cad=@cad+','+QUOTENAME(RTRIM(@num_doc),CHAR(39));
				EXEC (@cad);
			END;
			ELSE
			BEGIN
				SET @cad='SP_inv_afecon_ent_f2_usu '+QUOTENAME(@ano_doc,CHAR(39))+','+QUOTENAME(@per_doc,CHAR(39))+','+QUOTENAME(@sub_tip,CHAR(39));
				SET @cad=@cad+','+QUOTENAME(RTRIM(@num_doc),CHAR(39));
				EXEC (@cad);
				SET @cad='SP_inv_afecon_sal_f2_usu '+QUOTENAME(@ano_doc,CHAR(39))+','+QUOTENAME(@per_doc,CHAR(39))+','+QUOTENAME(@sub_tip,CHAR(39));
				SET @cad=@cad+','+QUOTENAME(RTRIM(@num_doc),CHAR(39));
				EXEC (@cad);
			END;

			-- TRAEMOS NUMERO DE DECIMALES PARA REDONDEAR LOS VALORES ANTES DE SUBIRLOS A CONTABILIDAD E INDICADOR DE TESORERIA
			SELECT @ind_mp=ind_mp 
			FROM inv_cabdoc 
			WHERE ano_doc=@ano_doc 
				AND per_doc=@per_doc 
				AND sub_tip=@sub_tip 
				AND num_doc=@num_doc;

			SELECT @num_dec=dec_int 
			FROM gen_decapl 
			WHERE cod_apl='INV' 
				AND tip_mon=@ind_mp;

			SET @num_dec = ISNULL(@num_dec,2);

			SET @doc_ant='0';
			SET @reg1=0;

			--Se insertan los registros en la tabla inv_inf_nif, agrupados por cuenta, Debitos
			INSERT INTO @afecon_deb (	fecha,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,
													deb_mov,des_mov,bas_mov,
													num_che,ind_cos,ind_tra,fec_tas,tasa,ind_tas)
			SELECT	fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,
						ROUND(SUM(deb_mov),@num_dec),des_mov,ROUND(SUM(bas_mov),@num_dec),
						num_che,ind_cos,ind_tra, fec_tas, tasa, ind_tas
			FROM #inv_inf_nif_det
			WHERE deb_mov<>0
			GROUP BY ano_doc,per_doc,tip_doc,sub_tip,num_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,des_mov,num_che,ind_cos,ind_tra, ind_mr, fec_tas, tasa, ind_tas
			ORDER BY ano_doc,per_doc,sub_tip,num_doc,cod_cta;
			
			SELECT @conteo1 = COUNT(1) 
			FROM @afecon_deb;
			
			SET @conteo1 = ISNULL(@conteo1,0);

			SET @conteo2 = 1;

			WHILE @conteo2 <= @conteo1
			BEGIN
				SELECT	@fec=fecha,@suc=cod_suc,@ccosto=cod_cco,@cl1=cod_cl1,@cl2=cod_cl2,@cl3=cod_cl3,@cta=cod_cta,@tercero=cod_ter,@deb_mov=deb_mov,@des=des_mov,
							@base=bas_mov,@che=num_che,@cos=ind_cos,@tra=ind_tra, @fec_tas=fec_tas, @tasa=tasa,@ind_tas=ind_tas
				FROM @afecon_deb
				WHERE recno=@conteo2;

				IF @doc_ant<>@num_doc
				BEGIN
					SET @reg=1;
				END;

				INSERT INTO inv_inf_nif (	ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, fch_doc, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_cta, cod_ter, 
													deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, fec_tas, tasa, ind_mod, ind_tas)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg,@fec,@suc,@ccosto,@cl1,@cl2,@cl3,@cta,@tercero,
							@deb_mov,0,@des,@base,@che,@cos,@tra, @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

				SET @reg=@reg+1;

				SET @doc_ant=@num_doc;

				SET @conteo2 = @conteo2 + 1;
			END;
			
			SET @doc_ant='0';
			SET @conteo1=0;
			
			SET @reg1=@reg1+1;

			INSERT INTO @afecon_cre (	fecha,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,
													cre_mov,des_mov,bas_mov,num_che,ind_cos,ind_tra,fec_tas,tasa,ind_tas)
			SELECT	fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,
						ROUND(SUM(cre_mov),@num_dec),des_mov,ROUND(SUM(bas_mov),@num_dec),num_che,ind_cos,ind_tra, fec_tas, tasa, ind_tas
			FROM #inv_inf_nif_det
			WHERE cre_mov<>0
			GROUP BY ano_doc,per_doc,tip_doc,sub_tip,num_doc,fch_doc,cod_suc,cod_cco,cod_cl1,cod_cl2,cod_cl3,cod_cta,cod_ter,des_mov,num_che,ind_cos,ind_tra, ind_mr, fec_tas, tasa, ind_tas
			ORDER BY ano_doc,per_doc,sub_tip,num_doc,cod_cta;
			
			SELECT @conteo1= COUNT(1) 
			FROM @afecon_cre;
			
			SET @conteo1 = ISNULL(@conteo1,0);

			SET @conteo2 = 1;

			WHILE @conteo2<=@conteo1
			BEGIN
				SELECT	@fec=fecha,@suc=cod_suc,@ccosto=cod_cco,@cl1=cod_cl1,@cl2=cod_cl2,@cl3=cod_cl3,@cta=cod_cta,@tercero=cod_ter,@cre_mov=cre_mov,@des=des_mov,
							@base=bas_mov,@che=num_che,@cos=ind_cos,@tra=ind_tra, @fec_tas=fec_tas, @tasa=tasa, @ind_tas=ind_tas
				FROM @afecon_cre
				WHERE recno=@conteo2;

				IF @doc_ant<>@num_doc
				BEGIN
					SELECT @reg=MAX(reg_doc) 
					FROM inv_inf_nif 
					WHERE ano_doc=@ano_doc 
						AND per_doc=@per_doc 
						AND sub_tip=@sub_tip 
						AND num_doc=@num_doc;

					SET @reg=@reg+1;
				END;

				INSERT INTO inv_inf_nif (	ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, fch_doc, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_cta, cod_ter, 
													deb_mov, cre_mov, des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, fec_tas, tasa, ind_mod,ind_tas)
				VALUES (@ano_doc,@per_doc,@sub_tip,@tip_doc,@num_doc,@reg,@fec,@suc,@ccosto,@cl1,@cl2,@cl3,@cta,@tercero,
							0,@cre_mov,@des,@base,@che,@cos,@tra, @ind_mp, @fec_tas, @tasa, 0, @ind_tas);

				SET @reg=@reg+1;
				SET @doc_ant=@num_doc;
				
				SET @conteo2 = @conteo2 + 1;
			END;

			DROP TABLE #inv_inf_nif_det;

			--  VALIDAMOS EL CUADRE DEL DOCUMENTO
			BEGIN 
				SELECT  @max_aju=max_aju, @aju_deb=aju_deb, @aju_cre=aju_cre, @aju_suc=aju_suc, @aju_cco=aju_cco, 
				@aju_cl1=aju_cl1, @aju_cl2=aju_cl2, @aju_cl3=aju_cl3, @aju_ter=aju_ter 
				FROM nif_cuadre_tipos 
				WHERE cod_tip=@tip_doc 
					AND tip_mon=@ind_mp;

				IF @@ROWCOUNT > 0 AND @max_aju <> 0 AND @max_aju IS NOT NULL
				BEGIN
					SELECT @tot_deb=SUM(deb_mov), @tot_cre=SUM(cre_mov), @max_reg=MAX(CONVERT(SMALLINT,reg_doc))
					FROM inv_inf_nif 
					WHERE ano_doc=@ano_doc 
						AND per_doc=@per_doc 
						AND sub_tip=@sub_tip 
						AND num_doc=@num_doc;

					IF (@tot_deb-@tot_cre) BETWEEN @max_aju*-1 AND @max_aju AND @tot_deb<>@tot_cre
					BEGIN
						IF @tot_deb<@tot_cre
						BEGIN
							INSERT INTO inv_inf_nif (	ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
																fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, deb_mov, cre_mov, 
																des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, fec_tas, tasa)
							VALUES (@ano_doc, @per_doc, @sub_tip, @tip_doc, @num_doc, (@max_reg+1), 
										@fecha, @aju_deb, @aju_suc, @aju_cco, @aju_cl1, @aju_cl2, @aju_cl3, @aju_ter, ABS(@tot_deb-@tot_cre), 0, 
										'REGISTRO DE CUADRE X REDONDEO', 0, '', '', '', @ind_mp, @fec_tas, @tasa);
						END;
						ELSE
						BEGIN
							INSERT INTO inv_inf_nif (	ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, 
																fch_doc, cod_cta, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, cod_ter, deb_mov, cre_mov, 
																des_mov, bas_mov, num_che, ind_cos, ind_tra, ind_mr, fec_tas, tasa)
							VALUES (@ano_doc, @per_doc, @sub_tip, @tip_doc, @num_doc, (@max_reg+1), 
										@fecha, @aju_cre, @aju_suc, @aju_cco, @aju_cl1, @aju_cl2, @aju_cl3, @aju_ter, 0, ABS(@tot_deb-@tot_cre), 
										'REGISTRO DE CUADRE X REDONDEO', 0, '', '', '', @ind_mp, @fec_tas, @tasa);
						END;
					END;
				END;
			END;
		
		IF @@TRANCOUNT > 0
		BEGIN
			COMMIT TRANSACTION;
		END;
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
		BEGIN
			ROLLBACK TRANSACTION;
		END;

		THROW;

	END CATCH;
END;

```
