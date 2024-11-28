# Stored Procedure: sp_web_inv_trnanu_usu

## Usa los objetos:
- [[act_activos]]
- [[act_cabdoc]]
- [[act_cuedoc]]
- [[act_hiscausa]]
- [[cnt_cabdoc]]
- [[cnt_cuedoc]]
- [[cxc_cabdoc]]
- [[cxc_cuedoc]]
- [[cxp_cabdoc]]
- [[cxp_cuedoc]]
- [[Fn_cnt_gruanudoc]]
- [[Fn_nif_gruanudoc]]
- [[gen_perapl]]
- [[gen_subtipodoc]]
- [[inv_cabdoc]]
- [[inv_cuedoc]]
- [[inv_inf_con]]
- [[inv_inf_nif]]
- [[inv_items]]
- [[inv_param_cnt]]
- [[inv_seriales]]
- [[inv_vencim]]
- [[nif_cabdoc]]
- [[nif_cuedoc]]
- [[opr_vencimientos]]
- [[ppe_activos]]
- [[ppe_cabdoc]]
- [[ppe_cuedoc]]
- [[ppe_hiscausa]]
- [[ptv_cuadre_caja]]
- [[ptv_detcuadre_caja]]
- [[sis_aplicacion]]
- [[sp_gen_borra_cxc]]
- [[v_gen_subtip_inv]]
- [[v_inv_acumen]]
- [[v_ptv_cuadre]]

```sql

/*PROCEDIMIENTO DE ANULACION DE DOCUMENTOS DE INVENTARIOS QUE SE DISPARAN DESDE EL PROCEDIMIENTO sp_web_inv_trnanu 
SRS	2013-0441
JCESARS		ABRIL/2013
SE AUMENTA EL SALDO DEL VENCIMIENTO DE CONTRATO DE OPERACIONES CUANDO SE ELIMINA UN DOCUMENTO
SE BORRAN LOS VENCIMIENTOS DE LA TABLA INV_VENCIM
SE CORRIGE LOS FILTROS SOBRE EL ANTICIPO PARA QUE SE REALICE POR SUBTIPO DE DOCUMENTO
JSARMIENTO MARZO/2015 SRS: 2014-0934
SE AGREGA LA ACTUALIZACION DE SERIALES CUANDO SE BORRA UN DOCUMENTO
JSARMIENTO JULIO/2015 SRS: 2015-0574
SE AGREGA EL BORRADO DE DETALLE DE PAGO DE PUNTO DE VENTA
SE AGREGA EL BORRADO DE CXC PARA PUNTO DE VENTA
JSARMIENTO MARZO/2016 SRS: 2016-0628*/
CREATE PROCEDURE [dbo].[sp_web_inv_trnanu_usu]
	@ano_doc	CHAR(4),
	@per_doc	CHAR(2),
	@sub_tip	CHAR(5),
	@num_doc	CHAR(14)

AS
BEGIN
	DECLARE @wind_cxc		SMALLINT;
	DECLARE @wind_cxp		SMALLINT;   
	DECLARE @wind_cnt		SMALLINT;
	DECLARE @wanu_cnt	SMALLINT;
	DECLARE @wind_anu		SMALLINT;
	DECLARE @val_doc		MONEY;
	DECLARE @sal_doc		MONEY;
	DECLARE @error			VARCHAR(120);
	DECLARE @ind_blq		BIT;
	DECLARE @usuario		VARCHAR(30);

	-- VARIABLES PARA DEVOLUCIONES
	DECLARE @marca		CHAR(1);
	DECLARE @ano_dev	CHAR(4);
	DECLARE @per_dev	CHAR(2);
	DECLARE @sub_dev	CHAR(5);
	DECLARE @num_dev	CHAR(14);
	DECLARE @ano_ant	CHAR(4);
	DECLARE @per_ant	CHAR(2);
	DECLARE @sub_ant	CHAR(5);
	DECLARE @num_ant	CHAR(14);
	DECLARE @num_ref	CHAR(14);
	DECLARE @nat_doc	CHAR(1);
	DECLARE @wconta1	SMALLINT;
	DECLARE @item		VARCHAR(40);
	DECLARE @bodega	CHAR(3);
	DECLARE @wcad1		VARCHAR(300);
	DECLARE @cantidad	MONEY;
	DECLARE @sal_ped	MONEY;
	DECLARE @des_ped	MONEY;
	DECLARE @saldo		MONEY;
	DECLARE @ind_tra	CHAR(1);
	DECLARE @ind_act	BIT;
	DECLARE @ind_ppe	BIT;
	DECLARE @creg		SMALLINT;
	DECLARE @ano_act	CHAR(4);
	DECLARE @per_act	CHAR(2);
	DECLARE @sub_act	CHAR(5);
	DECLARE @num_act	CHAR(14);
	DECLARE @ano_ppe	CHAR(4);
	DECLARE @per_ppe	CHAR(2);
	DECLARE @sub_ppe	CHAR(5);
	DECLARE @num_ppe	CHAR(14);
	DECLARE @pedido		CHAR(14);
	DECLARE @cod_pla	CHAR(14);


	DECLARE @anu_ent	SMALLINT;

	DECLARE @doc_cnt	BIT;

	DECLARE @ind_uni	SMALLINT;	--Verificamos que el ítem maneje unidades para controlar la anulación

	DECLARE @serie		CHAR(40);
	DECLARE @num_ing	CHAR(14);
	DECLARE @bod_serie	CHAR(3);

	DECLARE @fecha		DATETIME;
	DECLARE @cod_suc	CHAR(3);
	DECLARE @tip_doc	CHAR(3);

	DECLARE @tra_act	BIT;
	DECLARE @tra_ppe	BIT;

	--	REFACTURABLES
	DECLARE @ano_fac	CHAR(4);
	DECLARE @per_fac	CHAR(2);
	DECLARE @sub_fac	CHAR(5);
	DECLARE @num_fac	CHAR(14);
	DECLARE @ind_refac	BIT;

	--	SRS: 2014-0188
	DECLARE @wanu_nif	SMALLINT;


	--  SRS: 2015-0062
	DECLARE @wanu_act	SMALLINT;
	DECLARE @wanu_ppe	SMALLINT;

	DECLARE @ind_oper	BIT;

	-- SRS: 2016-0628
	DECLARE @sub_cxc	CHAR(5);
	DECLARE @val_rcj	MONEY;
	DECLARE @bor_rcj	BIT;
	DECLARE @num_rcj	CHAR(14);

	SET NOCOUNT ON;

	SELECT @tip_doc=cod_tip FROM gen_subtipodoc WHERE cod_sub=@sub_tip;

	SET @doc_cnt=1;

	SET @pedido='0';

	SELECT @ind_act=ind_ins FROM sis_aplicacion WHERE cod_apl='ACT';
	SELECT @ind_ppe=ind_ins FROM sis_aplicacion WHERE cod_apl='PPE';

	SET @error='0';
	SET @val_doc=0;
	SET @sal_doc=0;

	-- VALIDACION TABLA DE PERIODOS
	SELECT @ind_blq=ind_blq 
	FROM gen_perapl 
	WHERE cod_apl='INV' 
		AND ano_per=@ano_doc 
		AND mes_per=@per_doc;

	IF @ind_blq=1
	BEGIN
		SET @error='PERIODO DE LA APLICACION ORIGEN (INVENTARIOS) ESTA BLOQUEADO, IMPOSIBLE ANULAR.';
		SELECT 'MENSAJE'=@error;
		RETURN;
	END;

	SELECT @fecha=fecha,@ano_fac=ano_odp,@per_fac=per_odp,@sub_fac=sub_odp,@num_fac=ord_pro--,@ind_refac=ind_refac
	FROM inv_cabdoc 
	WHERE ano_doc=@ano_doc 
		AND per_doc=@per_doc 
		AND sub_tip=@sub_tip 
		AND num_doc=@num_doc;

	-- CONSULTAMOS LA NATURALEZA DEL DOCUMENTO
	SELECT @nat_doc=nat_doc 
	FROM v_gen_subtip_inv 
	WHERE cod_sub=@sub_tip;

	SELECT @wind_cxc=ind_cxc,@wind_cxp=ind_cxp,@wind_cnt=ind_cnt,@wind_anu=ind_anu,@anu_ent=anu_ent
	FROM inv_param_cnt 
	WHERE llave='0';

	-- VERIFICAMOS QUE EL GRUPO DEL USUARIO SI TENGA PERMITIDO ANULAR DOCUMENTOS EN CONTABILIDAD
	SET @usuario=Suser_Sname();
	SELECT @wanu_cnt=dbo.Fn_cnt_gruanudoc(@usuario);

	-- VERIFICAMOS QUE EL GRUPO DEL USUARIO SI TENGA PERMITIDO ANULAR DOCUMENTOS EN CONTABILIDAD NIIF
	SELECT @wanu_nif=dbo.Fn_nif_gruanudoc(@usuario);

	--	CONSULTAMOS ESTADO Y SALDO DE LA REQUISICION
	IF @tip_doc='101'
	BEGIN
		IF (SELECT COUNT(1)	FROM inv_cuedoc 
			WHERE ano_doc=@ano_doc AND per_doc=@per_doc AND sub_tip=@sub_tip AND num_doc=@num_doc 
			AND (ind_aut<>0 OR sal_ped<>cantidad)) > 0
		BEGIN
			SET @error='REQUISICION YA PROCESADA. IMPOSIBLE ANULAR.';
			SELECT 'mensaje'=@error;
			RETURN;
		END;
	END;

	-- ANULACION DE PEDIDOS Y ORDENES DE COMPRA
	IF @tip_doc IN ('005','007')
	BEGIN
		SELECT @cantidad=SUM(cantidad),@sal_ped=SUM(sal_ped) 
		FROM inv_cuedoc 
		WHERE ano_doc=@ano_doc 
			AND per_doc=@per_doc 
			AND sub_tip=@sub_tip 
			AND num_doc=@num_doc;

		IF @cantidad<>@sal_ped
		BEGIN
			SET @error='DOCUMENTO AFECTADO POR UN DESPACHO,IMPOSIBLE ANULAR.';
			SELECT 'MENSAJE'=@error;
			RETURN;
		END;

		-- VERIFICAMOS QUE LA FACTURA POR REFACTURABLE SE PUEDA ANULAR
		--IF @tip_doc='007' AND @ind_refac=1 AND ISNULL(LEN(@sub_fac),0)>1
		IF @tip_doc='007' AND ISNULL(LEN(@sub_fac),0)>1
		BEGIN
				EXEC sp_gen_borra_cxc @ano_fac,@per_fac,@sub_fac,@num_fac,@error OUTPUT,'INV';

				IF @error<>'0'
				BEGIN
					SELECT 'MENSAJE'='FACTURA No.'+RTRIM(@sub_fac)+'-'+RTRIM(@num_fac)+'. '+@error;
					RETURN;
				END;
		END;

		IF @tip_doc='005'
		BEGIN
			DELETE FROM ptv_cuadre_caja 
			WHERE ano_doc=@ano_doc 
				AND per_doc=@per_doc 
				AND sub_tip=@sub_tip 
				AND num_doc=@num_doc;
		END;
	END;

	-- ANULACION DE DESPACHOS DE VENTAS Y COMPRAS
	IF @tip_doc IN ('006','008')
	BEGIN

		SELECT @cantidad=SUM(cantidad),@des_ped=SUM(des_ped) 
		FROM inv_cuedoc 
		WHERE ano_doc=@ano_doc 
			AND per_doc=@per_doc 
			AND sub_tip=@sub_tip 
			AND num_doc=@num_doc;

		IF @cantidad<>@des_ped
		BEGIN
			SET @error='DOCUMENTO AFECTADO POR UNA FACTURA O POR UNA DEVOLUCION DE DESPACHO,IMPOSIBLE ANULAR.';
			SELECT 'MENSAJE'=@error;
			RETURN;
		END;
		ELSE
		BEGIN
			SELECT @pedido=pedido 
			FROM inv_cuedoc
			WHERE ano_doc=@ano_doc 
				AND per_doc=@per_doc 
				AND sub_tip=@sub_tip 
				AND num_doc=@num_doc
				AND pedido>'0';

			SET @pedido=ISNULL(@pedido,'0');
		END;

	END;

	-- VERIFICACION DOCUMENTO IMPRESO
	SELECT @marca=marca 
	FROM inv_cabdoc 
	WHERE ano_doc=@ano_doc 
		AND per_doc=@per_doc 
		AND sub_tip=@sub_tip 
		AND num_doc=@num_doc;

	IF @marca='X'
	BEGIN
		SET @error='DOCUMENTO YA IMPRESO,IMPOSIBLE ANULAR.';
		SELECT 'MENSAJE'=@error;
		RETURN;
	END;

	IF @nat_doc='+'
	BEGIN
		-- SI EL DOCUMENTO ES 010 O 110 Y ESTA HECHO SOBRE DESPACHOS NO SE VALIDA
		IF  @tip_doc='110'
		BEGIN
			SELECT @pedido=pedido 
			FROM inv_cuedoc 
			WHERE ano_doc=@ano_doc 
				AND per_doc=@per_doc 
				AND sub_tip=@sub_tip 
				AND num_doc=@num_doc
				AND pedido>'0';

			SET @pedido=ISNULL(@pedido,'0');

			-- AGREGAMOS VALIDACION PARA NO ANULAR CUANDO ES UNA FACTURA DE REFACTURABLE Y TIENE ASIGNADA ORDEN DE FACTURACION
			IF (SELECT COUNT(1) FROM inv_cuedoc 
				WHERE ano_doc=@ano_doc AND per_doc=@per_doc AND sub_tip=@sub_tip AND num_doc=@num_doc AND ind_refac=1 AND ord_fact IS NOT NULL AND ord_fact <> '0')>0
			BEGIN
				SET @error='FACTURA CON ORDEN DE FACTURACION ASIGNADA,IMPOSIBLE ANULAR ESTE DOCUMENTO.';
				SELECT 'MENSAJE'=@error;
				RETURN;
			END;

				DELETE FROM inv_seriales
				WHERE ano_com = @ano_doc
					AND per_com = @per_doc
					AND sub_com = @sub_tip
					AND num_com = @num_doc
					AND num_ing = '0'
					AND num_ven = '0'
					AND num_sal = '0';
				IF @@ROWCOUNT = 0
				BEGIN
					UPDATE inv_seriales
						SET ano_com = '0',
							per_com = '0',
							sub_com = '0',
							num_com = '0',
							fec_com = NULL
					WHERE ano_com = @ano_doc
					AND per_com = @per_doc
					AND sub_com = @sub_tip
					AND num_com = @num_doc
					AND num_ven = '0'
					AND num_sal = '0';
				END;
		END;	

		IF @tip_doc='110' AND @pedido<>'0'
		BEGIN
			PRINT 'NO ENTRA';
		END;
		ELSE
		BEGIN
			-- SE CONTROLA LA ANULACION DE ENTRADAS
			IF @anu_ent=1
			BEGIN
				-- VERIFICAMOS QUE NO EXISTAN DOCUMENTOS POSTERIORES
				SELECT @wconta1=COUNT(1) 
				FROM inv_cabdoc AS cab 
				INNER JOIN inv_cuedoc AS cue ON cab.ano_doc=cue.ano_doc AND cab.per_doc=cue.per_doc AND cab.sub_tip=cue.sub_tip AND cue.num_doc=cab.num_doc
				INNER JOIN v_gen_subtip_inv AS sub ON cab.sub_tip=sub.cod_sub
				INNER JOIN inv_items AS ite ON cue.item=ite.cod_item
				WHERE ind_uni=1 
					AND fecha>=@fecha 
					AND nat_doc='-' 
					AND item IN (SELECT item FROM inv_cuedoc WHERE ano_doc=@ano_doc AND per_doc=@per_doc AND sub_tip=@sub_tip AND num_doc=@num_doc);

				SET @wconta1=ISNULL(@wconta1,0);

				IF @wconta1>0
				BEGIN
					SET @error='EXISTEN DOCUMENTOS DIGITADOS POSTERIORMENTE,IMPOSIBLE ANULAR ESTE DOCUMENTO.';
					SELECT 'MENSAJE'=@error;
					RETURN;
				END;

				-- VERIFICAMOS QUE AL ANULAR EL DOCUMENTO EL SALDO NO QUE DE EN ROJO

				SELECT item,bodega,SUM(cantidad) AS cantidad
				INTO #t_cantdoc
				FROM inv_cuedoc AS a 
					INNER JOIN inv_items AS b ON a.item=b.cod_item 
				WHERE ano_doc=@ano_doc 
					AND per_doc=@per_doc 
					AND sub_tip=@sub_tip 
					AND num_doc=@num_doc 
					AND b.ind_uni=1
				GROUP BY item,bodega;

				SELECT a.item,a.bodega,a.cantidad,b.tot_uni AS total
				INTO #t_salitem
				FROM #t_cantdoc AS a 
					INNER JOIN v_inv_acumen AS b ON a.item=b.cod_item AND a.bodega=b.cod_bod
				WHERE b.ano_acu=@ano_doc 
					AND periodo=@per_doc;
			
				SELECT @wconta1=COUNT(1) 
				FROM #t_salitem 
				WHERE total-cantidad < 0;

				SET @wconta1=ISNULL(@wconta1,0);

				DROP TABLE #t_salitem;
				DROP TABLE #t_cantdoc;

				IF @wconta1>0
				BEGIN
					SET @error='LA ANULACION DE ESTE DOCUMENTO IMPLICA SALDOS EN ROJO PARA LOS ITEMS.';
					SELECT 'MENSAJE'=@error;
					RETURN;
				END;
			END;
		END;
	END;

	IF  @tip_doc='011'
	BEGIN
		-- AGREGAMOS VALIDACION PARA NO ANULAR CUANDO ES UNA FACTURA DE REFACTURABLE Y TIENE ASIGNADA ORDEN DE FACTURACION
		IF (SELECT COUNT(1) FROM inv_cuedoc 
			WHERE ano_doc=@ano_doc AND per_doc=@per_doc AND sub_tip=@sub_tip AND num_doc=@num_doc AND ind_refac=1 AND ord_fact IS NOT NULL AND ord_fact <> '0')>0
		BEGIN
			SET @error='SALIDA DE ALMACÉN CON ORDEN DE FACTURACION ASIGNADA,IMPOSIBLE ANULAR ESTE DOCUMENTO.';
			SELECT 'MENSAJE'=@error;
			RETURN;
		END;
	END;	


	--VERIFICACION EN CUENTAS POR COBRAR
	IF @wind_cxc=1
	BEGIN
		IF @tip_doc IN ('010','302','510')
		BEGIN
			IF @tip_doc='302'
			BEGIN
				IF EXISTS(SELECT * FROM inv_cabdoc 
						  WHERE ano_doc=@ano_doc AND per_doc=@per_doc AND sub_tip=@sub_tip AND num_doc=@num_doc AND num_dev IS NULL)
				BEGIN
					SELECT @ano_dev=ano_ant,@per_dev=per_ant,@sub_dev=sub_ant,@num_dev=num_ant
					FROM inv_cabdoc 
					WHERE ano_doc=@ano_doc 
						AND per_doc=@per_doc 
						AND sub_tip=@sub_tip 
						AND num_doc=@num_doc;
				END;
				ELSE
				BEGIN
					SELECT @ano_dev=ano_dev,@per_dev=per_dev,@sub_dev=sub_dev,@num_dev=num_dev
					FROM inv_cabdoc 
					WHERE ano_doc=@ano_doc 
						AND per_doc=@per_doc 
						AND sub_tip=@sub_tip 
						AND num_doc=@num_doc;
				END;
			END;
			ELSE
			BEGIN
				SELECT @ano_dev=@ano_doc,@per_dev=@per_doc,@sub_dev=@sub_tip,@num_dev=@num_doc;
			END;

			-- VALIDAMOS SI LA FACTURA YA PASO Y TIENE PERMISO DE ANULACION
			SELECT @creg=COUNT(1) 
			FROM cxc_cabdoc 
			WHERE ano_doc=@ano_dev 
				AND per_doc=@per_dev 
				AND sub_tip=@sub_dev 
				AND num_doc=@num_dev;

			IF @creg>1 AND @wind_anu<>1
			BEGIN
				SET @error='NO TIENE AUTORIZACION DE ANULAR DOCUMENTOS EN CUENTAS POR COBRAR.';
				SELECT 'MENSAJE'=@error;
			END;
			ELSE
			BEGIN
				-- VERIFICAMOS QUE EL PERIODO EN CXC NO ESTE BLOQUEADO
				SELECT @ind_blq=ind_blq 
				FROM gen_perapl 
				WHERE cod_apl='CXC' 
					AND ano_per=@ano_doc 
					AND mes_per=@per_doc;

				IF @ind_blq=1
				BEGIN
					SET @error='PERIODO BLOQUEADO EN CUENTAS POR COBRAR.';
					SELECT 'MENSAJE'=@error;
					RETURN;
				END;
		
				IF @tip_doc IN ('010','510')
				BEGIN
					IF @tip_doc = '510'
					BEGIN
						SET @sub_cxc = '01510';	
					END;
					ELSE
					BEGIN
						SET @sub_cxc = @sub_tip;	
					END;

					SELECT @val_rcj = SUM(val_doc), @num_rcj = num_doc
					FROM cxc_cuedoc 
					WHERE num_ref=RTRIM(@num_doc)
						AND sub_ref=@sub_cxc 
						AND per_ref=@per_doc 
						AND ano_ref=@ano_doc 
						AND tip_doc = '049'
					GROUP BY num_doc;
					
					SET @val_rcj = ISNULL(@val_rcj,0);

					SELECT @val_doc=SUM(val_doc),@sal_doc=SUM(sal_doc) 
					FROM cxc_cuedoc 
					WHERE ano_doc=@ano_doc 
						AND per_doc=@per_doc 
						AND sub_tip=@sub_cxc 
						AND num_doc=RTRIM(@num_doc);

					SET @bor_rcj = 0;

					IF (@val_doc = (@sal_doc + @val_rcj))
					BEGIN
						SET @bor_rcj = 1
					END;					

					IF @val_doc<>@sal_doc AND @bor_rcj = 0
					BEGIN
						SET @error='DOCUMENTO DE CUENTAS POR COBRAR AFECTADO';
						SELECT 'MENSAJE'=@error;
						RETURN;
					END;
					ELSE
					BEGIN
						-- SE BORRA CUERPO DE RECIBO DE CAJA DESDE PTV
						DELETE cxc_cuedoc
						WHERE num_ref=RTRIM(@num_doc)
							AND sub_ref=@sub_cxc 
							AND per_ref=@per_doc 
							AND ano_ref=@ano_doc 
							AND tip_doc = '049';

						IF @@ROWCOUNT=-1
						BEGIN
							SET @error='ERROR ANULANDO REGISTROS DEL CUERPO DE CUENTAS POR COBRAR';
							SELECT 'MENSAJE'=@error;
							RETURN;
						END;

						-- SE BORRA CUERPO DE FACTURA DE VENTA
						DELETE cxc_cuedoc 
						WHERE ano_doc=@ano_doc 
							AND per_doc=@per_doc 
							AND sub_tip=@sub_cxc 
							AND num_doc=@num_doc;

						IF @@ROWCOUNT=-1
						BEGIN
							SET @error='ERROR ANULANDO REGISTROS DEL CUERPO DE CUENTAS POR COBRAR';
							SELECT 'MENSAJE'=@error;
							RETURN;
						END;
						
						-- SE BORRA CABEZA DE RECIBO DE CAJA DESDE PTV
						DELETE FROM cxc_cabdoc
						WHERE num_doc=RTRIM(@num_rcj)
							AND sub_tip='049' 
							AND per_doc=@per_doc 
							AND ano_doc=@ano_doc 
							AND tip_doc = '049';

						IF @@ROWCOUNT=-1
						BEGIN
							SET @error='ERROR ANULANDO REGISTROS DE LA CABEZA DE CUENTAS POR COBRAR';
							SELECT 'MENSAJE'=@error;
							RETURN;
						END;

						-- SE BORRA CABEZA DE FACTURA DE VENTA	
						DELETE cxc_cabdoc 
						WHERE ano_doc=@ano_doc 
							AND per_doc=@per_doc 
							AND sub_tip=@sub_cxc 
							AND num_doc=@num_doc;

						IF @@ROWCOUNT=-1
						BEGIN
							SET @error='ERROR ANULANDO REGISTROS DE LA CABEZA DE CUENTAS POR COBRAR';
							SELECT 'MENSAJE'=@error;
							RETURN;
						END;
					END;
				END;

				IF @tip_doc='302'
				BEGIN
					IF EXISTS(SELECT * FROM inv_cabdoc 
					WHERE ano_doc=@ano_doc AND per_doc=@per_doc AND sub_tip=@sub_tip AND num_doc=@num_doc AND num_dev IS NULL)
					BEGIN
						SELECT @ano_dev=ano_ant,@per_dev=per_ant,@sub_dev=sub_ant,@num_dev=num_ant
						FROM inv_cabdoc 
						WHERE ano_doc=@ano_doc 
							AND per_doc=@per_doc 
							AND sub_tip=@sub_tip 
							AND num_doc=@num_doc;
					END;
					ELSE
					BEGIN
						SELECT @ano_dev=ano_dev,@per_dev=per_dev,@sub_dev=sub_dev,@num_dev=num_dev
						FROM inv_cabdoc 
						WHERE ano_doc=@ano_doc 
							AND per_doc=@per_doc 
							AND sub_tip=@sub_tip 
							AND num_doc=@num_doc;
					END;

					SET @ano_dev=ISNULL(@ano_dev,'0');
					SET @per_dev=ISNULL(@per_dev,'0');
					SET @sub_dev=ISNULL(@sub_dev,'0');
					SET @num_dev=ISNULL(@num_dev,'0');

					SET @ano_ant=ISNULL(@ano_ant,'0');
					SET @per_ant=ISNULL(@per_ant,'0');
					SET @sub_ant=ISNULL(@sub_ant,'0');
					SET @num_ant=ISNULL(@num_ant,'0');

					--IF @marca='T'
					BEGIN
						-- EVALUAMOS SI LA DEVOLUCION CREO UN ANTICIPO
						IF @num_ant<>'0'
						BEGIN
							-- EVALUAMOS SI EL ANTICIPO YA FUE CRUZADO CON OTRA FACTURA
							SELECT @num_ref=MAX(num_ref) 
							FROM cxc_cuedoc 
							WHERE ano_doc=@ano_ant 
								AND per_doc=@per_ant 
								AND sub_tip=@sub_ant 
								AND num_doc=@num_ant;

							SET @num_ref=ISNULL(@num_ref,'0');

							IF @num_ref<>'0'
							BEGIN
								SET @error='ANTICIPO CON DOCUMENTO DE REFERENCIA: 160-'+RTRIM(@num_ref)+' IMPOSIBLE ANULAR.';
								SELECT 'MENSAJE'=@error;
								RETURN;
							END;
							ELSE
							BEGIN
								DELETE cxc_cuedoc 
								WHERE ano_doc=@ano_ant 
									AND per_doc=@per_ant 
									AND sub_tip=@sub_ant 
									AND num_doc=@num_ant;

								IF @@ROWCOUNT=-1
								BEGIN
									SET @error='ERROR ANULANDO EL CUERPO DEL ANTICIPO.';
									SELECT 'MENSAJE'=@error;
									RETURN;
								END;
		
								DELETE cxc_cabdoc 
								WHERE ano_doc=@ano_ant 
									AND per_doc=@per_ant 
									AND sub_tip=@sub_ant 
									AND num_doc=@num_ant

								IF @@ROWCOUNT=-1
								BEGIN
									SET @error='ERROR ANULANDO LA CABEZA DEL ANTICIPO.';
									SELECT 'MENSAJE'=@error;
									RETURN;
								END;
							END;
						END;
		
						-- EVALUAMOS SI LA DEVOLUCION CREO UNA NOTA DEBITO EN CUENTAS POR COBRAR
						IF @num_dev<>'0'
						BEGIN
							DELETE cxc_cuedoc 
							WHERE ano_doc=@ano_dev 
								AND per_doc=@per_dev 
								AND sub_tip=@sub_dev 
								AND num_doc=@num_dev;

							IF @@ROWCOUNT=-1
							BEGIN
								SET @error='ERROR ANULANDO EL CUERPO DE LA NOTA DEBITO.';
								SELECT 'MENSAJE'=@error;
								RETURN;
							END;
		
							DELETE cxc_cabdoc 
							WHERE ano_doc=@ano_dev 
								AND per_doc=@per_dev 
								AND sub_tip=@sub_dev 
								AND num_doc=@num_dev;
							IF @@ROWCOUNT=-1
							BEGIN
								SET @error='ERROR ANULANDO LA CABEZA DE LA NOTA DEBITO.';
								SELECT 'MENSAJE'=@error;
								RETURN;
							END;
						END;
					END;
				END;
			END;
		END;
	END;

	--VERIFICACION EN CUENTAS POR PAGAR
	IF @wind_cxp=1
	BEGIN
		IF @tip_doc IN ('110','301')
		BEGIN
			IF @tip_doc='301'
			BEGIN
				SELECT @ano_dev=ano_dev,@per_dev=per_dev,@sub_dev=sub_dev,@num_dev=num_dev
				FROM inv_cabdoc 
				WHERE ano_doc=@ano_doc 
					AND per_doc=@per_doc 
					AND sub_tip=@sub_tip 
					AND num_doc=@num_doc;
			END;
			ELSE
			BEGIN
				SELECT @ano_dev=@ano_doc,@per_dev=@per_doc,@sub_dev=@sub_tip,@num_dev=@num_doc;
			END;

			SELECT @creg=COUNT(1) 
			FROM cxp_cabdoc 
			WHERE ano_doc=@ano_dev 
				AND per_doc=@per_dev 
				AND sub_tip=@sub_dev 
				AND num_doc=@num_dev;

			IF @creg>1 AND @wind_anu<>1
			BEGIN
				SET @error='NO TIENE AUTORIZACION DE ANULAR DOCUMENTOS EN CUENTAS POR PAGAR.';
				SELECT 'MENSAJE'=@error;
				RETURN;
			END;
			ELSE
			BEGIN
				-- VERIFICAMOS QUE EL PERIODO EN CXP NO ESTE BLOQUEADO
				SELECT @ind_blq=ind_blq 
				FROM gen_perapl 
				WHERE cod_apl='CXP' 
					AND ano_per=@ano_doc 
					AND mes_per=@per_doc;
				IF @ind_blq=1
				BEGIN
					SET @error='PERIODO BLOQUEADO EN CUENTAS POR PAGAR.';
					SELECT 'MENSAJE'=@error;
					RETURN;
				END;

				IF @tip_doc='110'
				BEGIN
					SELECT @val_doc=SUM(val_doc),@sal_doc=SUM(sal_doc) 
					FROM cxp_cuedoc 
					WHERE ano_doc=@ano_doc 
						AND per_doc=@per_doc 
						AND sub_tip=@sub_tip 
						AND num_doc=@num_doc;

					IF @val_doc<>@sal_doc
					BEGIN
						SET @error='DOCUMENTO DE CUENTAS POR PAGAR AFECTADO';
						SELECT 'MENSAJE'=@error;
						RETURN;
					END;
					ELSE
					BEGIN
						DELETE cxp_cuedoc 
						WHERE ano_doc=@ano_doc 
							AND per_doc=@per_doc 
							AND sub_tip=@sub_tip 
							AND num_doc=@num_doc;

						IF @@ROWCOUNT=-1
						BEGIN
							SET @error='ERROR ANULANDO REGISTROS DEL CUERPO DE CUENTAS POR PAGAR';
							SELECT 'MENSAJE'=@error;
							RETURN;
						END;
		
						DELETE cxp_cabdoc 
						WHERE ano_doc=@ano_doc 
							AND per_doc=@per_doc 
							AND sub_tip=@sub_tip 
							AND num_doc=@num_doc;

						IF @@ROWCOUNT=-1
						BEGIN
							SET @error='ERROR ANULANDO REGISTROS DE LA CABEZA DE CUENTAS POR PAGAR';
							SELECT 'MENSAJE'=@error;
							RETURN;
						END;
					END;
				END;
		
				IF @tip_doc='301'
				BEGIN
					SELECT @ano_dev=ano_dev,@per_dev=per_dev,@sub_dev=sub_dev,@num_dev=num_dev,
					@ano_ant=ano_ant,@per_ant=per_ant,@sub_ant=sub_ant,@num_ant=num_ant,@marca=marca
					FROM inv_cabdoc 
					WHERE ano_doc=@ano_doc 
						AND per_doc=@per_doc 
						AND sub_tip=@sub_tip 
						AND num_doc=@num_doc;
		
					SET @ano_dev=ISNULL(@ano_dev,'0');
					SET @per_dev=ISNULL(@per_dev,'0');
					SET @sub_dev=ISNULL(@sub_dev,'0');
					SET @num_dev=ISNULL(@num_dev,'0');
		
					SET @ano_ant=ISNULL(@ano_ant,'0');
					SET @per_ant=ISNULL(@per_ant,'0');
					SET @sub_ant=ISNULL(@sub_ant,'0');
					SET @num_ant=ISNULL(@num_ant,'0');
		
					IF @marca='T'
					BEGIN
						-- EVALUAMOS SI LA DEVOLUCION CREO UN ANTICIPO
						IF @ano_ant<>'0'
						BEGIN
							-- EVALUAMOS SI EL ANTICIPO YA FUE CRUZADO CON OTRA FACTURA
							SELECT @num_ref=MAX(num_ref) 
							FROM cxp_cuedoc 
							WHERE ano_doc=@ano_ant 
								AND per_doc=@per_ant 
								AND sub_tip=@sub_ant 
								AND num_doc=@num_ant;

							SET @num_ref=ISNULL(@num_ref,'0');

							IF @num_ref<>'0'
							BEGIN
								SET @error='ANTICIPO CON DOCUMENTO DE REFERENCIA: 160-'+RTRIM(@num_ref)+' IMPOSIBLE ANULAR.';
								SELECT 'MENSAJE'=@error;
								RETURN;
							END;
							ELSE
							BEGIN
								DELETE cxp_cuedoc 
								WHERE ano_doc=@ano_ant 
								AND per_doc=@per_ant 
									AND sub_tip=@sub_ant 
									AND num_doc=@num_ant;

								IF @@ROWCOUNT=-1
								BEGIN
									SET @error='ERROR ANULANDO EL CUERPO DEL ANTICIPO.';
									SELECT 'MENSAJE'=@error;
									RETURN;
								END;
		
								DELETE cxp_cabdoc 
								WHERE ano_doc=@ano_ant 
									AND per_doc=@per_ant 
									AND sub_tip=@sub_ant AND num_doc=@num_ant;

								IF @@ROWCOUNT=-1
								BEGIN
									SET @error='ERROR ANULANDO LA CABEZA DEL ANTICIPO.';
									SELECT 'MENSAJE'=@error;
									RETURN;
								END;
							END;
						END;
		
						-- EVALUAMOS SI LA DEVOLUCION CREO UNA NOTA DEBITO EN CUENTAS POR PAGAR
						IF @ano_dev<>'0'
						BEGIN
							DELETE cxp_cuedoc 
							WHERE ano_doc=@ano_dev 
								AND per_doc=@per_dev 
								AND sub_tip=@sub_dev 
								AND num_doc=@num_dev;
							IF @@ROWCOUNT=-1
							BEGIN
								SET @error='ERROR ANULANDO EL CUERPO DE LA NOTA DEBITO.';
								SELECT 'MENSAJE'=@error;
								RETURN;
							END;
		
							DELETE cxp_cabdoc 
							WHERE ano_doc=@ano_dev 
								AND per_doc=@per_dev 
								AND sub_tip=@sub_dev 
								AND num_doc=@num_dev;
							IF @@ROWCOUNT=-1
							BEGIN
								SET @error='ERROR ANULANDO LA CABEZA DE LA NOTA DEBITO.';
								SELECT 'MENSAJE'=@error;
								RETURN;
							END;
						END;
					END;
				END;
			END;
		END;
	END;

	--VERIFICACION ANULACION EN ACTIVOS FIJOS
	IF @ind_act=1
	BEGIN

		SELECT @ano_act=cab.ano_doc,@per_act=cab.per_doc,@sub_act=cab.sub_tip,@num_act=cab.num_doc 
		FROM act_cabdoc AS cab 
			 INNER JOIN act_cuedoc AS cue ON cab.ano_doc = cue.ano_doc AND  cab.per_doc = cue.per_doc AND cab.sub_tip = cue.sub_tip AND cab.num_doc = cue.num_doc
			 INNER JOIN act_activos AS act ON cab.ano_doc = act.ano_ing AND  cab.per_doc = act.per_ing AND cab.sub_tip = act.sub_ing AND cab.num_doc = act.num_ing
			 INNER JOIN act_hiscausa AS his ON act.cod_pla = his.cod_pla
		WHERE cab.ano_ref=@ano_doc 
			AND cab.per_ref=@per_doc 
			AND cab.sub_ref=@sub_tip 
			AND cab.num_ref=@num_doc;

 		IF @@ROWCOUNT>0
		BEGIN
			SET @error='DOCUMENTO AFECTADO EN ACTIVOS FIJOS, NO SE PUEDE ANULAR';
			SELECT 'MENSAJE'=@error;
			RETURN;
		END;
	END;

	--VERIFICACION ANULACION EN PROPIEDAD PLANTA Y EQUIPO
	IF @ind_ppe=1
	BEGIN
		SELECT @ano_ppe=cab.ano_doc,@per_ppe=cab.per_doc,@sub_ppe=cab.sub_tip,@num_ppe=cab.num_doc --cab.ano_doc,cab.per_doc,cab.sub_tip,cab.num_doc--, act.cod_pla
		FROM ppe_cabdoc AS cab 
			 INNER JOIN ppe_cuedoc AS cue ON cab.ano_doc = cue.ano_doc AND  cab.per_doc = cue.per_doc AND cab.sub_tip = cue.sub_tip AND cab.num_doc = cue.num_doc
			 INNER JOIN ppe_activos AS ppe ON cab.ano_doc = ppe.ano_ing AND  cab.per_doc = ppe.per_ing AND cab.sub_tip = ppe.sub_ing AND cab.num_doc = ppe.num_ing
			 INNER JOIN ppe_hiscausa AS his ON ppe.cod_pla = his.cod_pla
		WHERE cab.ano_ref=@ano_doc 
			AND cab.per_ref=@per_doc 
			AND cab.sub_ref=@sub_tip 
			AND cab.num_ref=@num_doc;

		IF @@ROWCOUNT>0
		BEGIN
			SET @error='DOCUMENTO AFECTADO EN PROPIEDAD PLANTA Y EQUIPO, NO SE PUEDE ANULAR';
			SELECT 'MENSAJE'=@error;
			RETURN;
		END;
	END;

	IF @wind_cnt=1 AND @error='0'
	BEGIN
		SELECT @ind_tra=MAX(ind_tra) 
		FROM inv_inf_con 
		WHERE ano_doc=@ano_doc 
			AND per_doc=@per_doc 
			AND sub_tip=@sub_tip 
			AND num_doc=@num_doc;

		IF @ind_tra='X'
		BEGIN
			IF @wanu_cnt=1
			BEGIN
				DELETE cnt_cuedoc 
				WHERE ano_doc=@ano_doc 
					AND per_doc=@per_doc 
					AND sub_tip=@sub_tip 
					AND num_doc=@num_doc;
				IF @@ROWCOUNT=-1
				BEGIN
					SET @error='ERROR ANULANDO REGISTROS DEL CUERPO DE CONTABILIDAD';
					SELECT 'MENSAJE'=@error;
					RETURN;
				END;
	
				DELETE cnt_cabdoc 
				WHERE ano_doc=@ano_doc 
					AND per_doc=@per_doc 
					AND sub_tip=@sub_tip 
					AND num_doc=@num_doc;

				IF @@ROWCOUNT=-1
				BEGIN
					SET @error='ERROR ANULANDO REGISTROS DE LA CABEZA DE CONTABILIDAD';
					SELECT 'MENSAJE'=@error;
					RETURN;
				END;
 
				DELETE inv_inf_con 
				WHERE ano_doc=@ano_doc 
					AND per_doc=@per_doc 
					AND sub_tip=@sub_tip 
					AND num_doc=@num_doc;

				IF @@ROWCOUNT=-1
				BEGIN
					SET @error='ERROR ANULANDO REGISTROS DE INFORMACION CONTABLE';
					SELECT 'MENSAJE'=@error;
					RETURN;
				END;
			END;
			ELSE
			BEGIN
				SET @error='NO ESTA AUTORIZADO PARA ANULAR DOCUMENTOS EN CONTABILIDAD.';
				SELECT 'MENSAJE'=@error;
				RETURN;
			END;

			--	ANULACION NIIF
			IF @wanu_nif=1
			BEGIN
				DELETE nif_cuedoc 
				WHERE ano_doc=@ano_doc 
					AND per_doc=@per_doc 
					AND sub_tip=@sub_tip 
					AND num_doc=@num_doc;

				IF @@ROWCOUNT=-1
				BEGIN
					SET @error='ERROR ANULANDO REGISTROS DEL CUERPO DE CONTABILIDAD NIIF';
					SELECT 'MENSAJE'=@error;
					RETURN;
				END;
	
				DELETE nif_cabdoc 
				WHERE ano_doc=@ano_doc 
					AND per_doc=@per_doc 
					AND sub_tip=@sub_tip 
					AND num_doc=@num_doc;

				IF @@ROWCOUNT=-1
				BEGIN
					SET @error='ERROR ANULANDO REGISTROS DE LA CABEZA DE CONTABILIDAD NIIF';
					SELECT 'MENSAJE'=@error;
					RETURN;
				END;
 
				DELETE inv_inf_nif 
				WHERE ano_doc=@ano_doc 
					AND per_doc=@per_doc 
					AND sub_tip=@sub_tip 
					AND num_doc=@num_doc;

				IF @@ROWCOUNT=-1
				BEGIN
					SET @error='ERROR ANULANDO REGISTROS DE INFORMACION CONTABLE NIIF';
					SELECT 'MENSAJE'=@error;
					RETURN;
				END;
			END;
			ELSE
			BEGIN
				SET @error='NO ESTA AUTORIZADO PARA ANULAR DOCUMENTOS EN CONTABILIDAD Y CONTABILIDAD NIIF.';
				SELECT 'MENSAJE'=@error;
				RETURN;
			END;

		END;
		ELSE
		BEGIN
			DELETE inv_inf_con 
			WHERE ano_doc=@ano_doc 
				AND per_doc=@per_doc 
				AND sub_tip=@sub_tip 
				AND num_doc=@num_doc;

			IF @@ROWCOUNT=-1
			BEGIN
				SET @error='ERROR ANULANDO REGISTROS DE INFORMACION CONTABLE';
				SELECT 'MENSAJE'=@error;
				RETURN;
			END;

			DELETE inv_inf_nif 
			WHERE ano_doc=@ano_doc 
				AND per_doc=@per_doc 
				AND sub_tip=@sub_tip 
				AND num_doc=@num_doc;

			IF @@ROWCOUNT=-1
			BEGIN
				SET @error='ERROR ANULANDO REGISTROS DE INFORMACION CONTABLE';
				SELECT 'MENSAJE'=@error;
				RETURN;
			END;
		END;
	END;

	SELECT @ind_oper = ind_ins 
	FROM sis_aplicacion
	WHERE cod_apl = 'OPR';

	IF @ind_oper = 1
	BEGIN
		IF @tip_doc ='010'
		BEGIN
			WITH vencim AS (SELECT cue.num_cto,SUM(cue.ven_net) AS ven_net
								FROM inv_cuedoc AS cue
								INNER JOIN inv_items AS ite ON cue.item=ite.cod_item
								WHERE cue.ano_doc=@ano_doc
									AND cue.per_doc=@per_doc
									AND cue.sub_tip=@sub_tip
									AND cue.num_doc=@num_doc
									AND ite.ind_aiu = 0
								GROUP BY cue.num_cto
								)
			UPDATE opr_vencimientos SET sal_ven = sal_ven + ven.ven_net
			FROM vencim AS ven 
			INNER JOIN opr_vencimientos AS opr ON ven.num_cto=opr.num_cto 
			WHERE opr.ano_doc = @ano_doc
				AND opr.per_doc = @per_doc
				AND opr.sub_tip = @sub_tip
				AND opr.num_doc = @num_doc;

			UPDATE opr_vencimientos SET ano_doc = NULL, per_doc=NULL, sub_tip=NULL, num_doc=NULL
			WHERE ano_doc = @ano_doc
				AND per_doc = @per_doc
				AND sub_tip = @sub_tip
				AND num_doc = @num_doc;
		END;
	END;

	DELETE inv_vencim 
	WHERE ano_doc=@ano_doc 
		AND per_doc=@per_doc 
		AND sub_tip=@sub_tip 
		AND num_doc=@num_doc;

	-- VALIDACION DE SERIALES
	IF @tip_doc IN ('000','001','008','111','202','302')
	BEGIN
		DELETE FROM inv_seriales
		WHERE ano_ing = @ano_doc
			AND per_ing = @per_doc
			AND sub_ing = @sub_tip
			AND num_ing = @num_doc
			AND num_ven = '0'
			AND num_sal = '0';
	END;

	IF @tip_doc IN ('002','003','006','011','201','301')
	BEGIN
		UPDATE inv_seriales SET ano_sal='0',per_sal='0',sub_sal='0',num_sal='0',estado=1,fec_sal=null,cod_cliente='0'
		WHERE ano_sal = @ano_doc
			AND per_sal = @per_doc
			AND sub_sal = @sub_tip
			AND num_sal = @num_doc
	END

	IF @tip_doc IN ('010')
	BEGIN
		UPDATE inv_seriales SET ano_ven='0',per_ven='0',sub_ven='0',num_ven='0',estado=1,fec_ven=null,cod_cliente='0'
		WHERE ano_ven = @ano_doc
			AND per_ven = @per_doc
			AND sub_ven = @sub_tip
			AND num_ven = @num_doc
	END

	IF @tip_doc IN ('302','510','530')
	BEGIN
		DELETE FROM ptv_detcuadre_caja
		WHERE ano_doc=@ano_doc
			AND per_doc=@per_doc
			AND sub_tip=@sub_tip
			AND num_doc=@num_doc;
	END;

	IF ((SELECT COUNT(1) FROM v_ptv_cuadre 
		WHERE ano_doc=@ano_doc AND per_doc=@per_doc AND sub_tip=@sub_tip AND num_doc=@num_doc AND ind_cons=1) > 0)
	BEGIN
		SELECT @error='FACTURA YA DEPOSITADA, IMPOSIBLE ANULAR.......'
	END;

	SELECT 'MENSAJE'=@error
END;

```
